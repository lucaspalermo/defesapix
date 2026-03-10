import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { classifyGolpe } from '@/lib/golpe-classifier';
import { z } from 'zod';
import { getApiUser } from '@/lib/api-auth';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const casoSchema = z.object({
  nomeVitima: z.string().min(3).max(200),
  emailVitima: z.string().email().max(254),
  telefoneVitima: z.string().max(20).optional(),
  tipoGolpe: z.enum(['PIX', 'WHATSAPP', 'BOLETO', 'ROMANCE', 'EMPREGO', 'INVESTIMENTO', 'CLONE_APP', 'PHISHING', 'CARTAO', 'CONSIGNADO', 'OUTRO']),
  descricao: z.string().min(20).max(5000),
  valorPerdido: z.number().positive().max(100_000_000),
  dataOcorrencia: z.string(),
  bancoVitima: z.string().max(100).optional(),
  chavePixUsada: z.string().max(200).optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 10 casos por IP por hora
    const ip = getClientIp(req);
    const rl = rateLimit(`casos-post:${ip}`, { max: 10, windowSec: 3600 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Muitas requisições. Tente novamente mais tarde.' }, { status: 429 });
    }

    const body = await req.json();
    const data = casoSchema.parse(body);

    // Normalizar email
    const emailNormalizado = data.emailVitima.toLowerCase().trim();

    // Vincular ao usuário se autenticado
    const user = await getApiUser(req);

    const classification = classifyGolpe(data.descricao, data.valorPerdido);

    const caso = await prisma.caso.create({
      data: {
        userId: user?.id ?? undefined,
        nomeVitima: data.nomeVitima.trim(),
        emailVitima: emailNormalizado,
        telefoneVitima: data.telefoneVitima,
        tipoGolpe: data.tipoGolpe,
        descricao: data.descricao,
        valorPerdido: data.valorPerdido,
        dataOcorrencia: new Date(data.dataOcorrencia),
        bancoVitima: data.bancoVitima,
        chavePixUsada: data.chavePixUsada,
        score: classification.probabilidadeRecuperacao,
        prioridade: classification.urgencia === 'CRITICA' || classification.urgencia === 'ALTA' ? 'ALTA' : 'MEDIA',
        ipAddress: ip,
        userAgent: req.headers.get('user-agent') ?? undefined,
        acoes: {
          createMany: {
            data: classification.acoes.map((acao) => ({
              descricao: `${acao.titulo}: ${acao.descricao}`,
              dataLimite: /^\d+h$/.test(acao.prazo)
                ? new Date(Date.now() + parseInt(acao.prazo, 10) * 3600000)
                : undefined,
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
  try {
    // Requer autenticação — retorna apenas casos do usuário logado
    const user = await getApiUser(req);
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const casos = await prisma.caso.findMany({
      where: { userId: user.id },
      include: { acoes: true, documentos: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ casos });
  } catch (error) {
    console.error('[CASOS] Error:', error);
    return NextResponse.json({ error: 'Erro ao buscar casos' }, { status: 500 });
  }
}
