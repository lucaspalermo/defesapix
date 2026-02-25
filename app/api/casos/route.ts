import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { classifyGolpe } from '@/lib/golpe-classifier';
import { z } from 'zod';

const casoSchema = z.object({
  nomeVitima: z.string().min(3),
  emailVitima: z.string().email(),
  telefoneVitima: z.string().optional(),
  tipoGolpe: z.enum(['PIX', 'WHATSAPP', 'BOLETO', 'ROMANCE', 'EMPREGO', 'INVESTIMENTO', 'CLONE_APP', 'PHISHING', 'CARTAO', 'CONSIGNADO', 'OUTRO']),
  descricao: z.string().min(20),
  valorPerdido: z.number().positive(),
  dataOcorrencia: z.string(),
  bancoVitima: z.string().optional(),
  chavePixUsada: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = casoSchema.parse(body);

    const classification = classifyGolpe(data.descricao, data.valorPerdido);

    const caso = await prisma.caso.create({
      data: {
        nomeVitima: data.nomeVitima,
        emailVitima: data.emailVitima,
        telefoneVitima: data.telefoneVitima,
        tipoGolpe: data.tipoGolpe,
        descricao: data.descricao,
        valorPerdido: data.valorPerdido,
        dataOcorrencia: new Date(data.dataOcorrencia),
        bancoVitima: data.bancoVitima,
        chavePixUsada: data.chavePixUsada,
        score: classification.probabilidadeRecuperacao,
        prioridade: classification.urgencia === 'CRITICA' ? 'ALTA' : classification.urgencia === 'ALTA' ? 'ALTA' : 'MEDIA',
        ipAddress: req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? undefined,
        userAgent: req.headers.get('user-agent') ?? undefined,
        acoes: {
          createMany: {
            data: classification.acoes.map((acao) => ({
              descricao: `${acao.titulo}: ${acao.descricao}`,
              dataLimite: acao.prazo.includes('h') ? new Date(Date.now() + parseInt(acao.prazo) * 3600000) : undefined,
            })),
          },
        },
      },
      include: { acoes: true },
    });

    return NextResponse.json({
      success: true,
      casoId: caso.id,
      classification,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 });
    }
    console.error('[CASOS] Error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'E-mail obrigatório' }, { status: 400 });
  }

  try {
    const casos = await prisma.caso.findMany({
      where: { emailVitima: email },
      include: { acoes: true, documentos: true },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ casos });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar casos' }, { status: 500 });
  }
}
