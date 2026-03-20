/**
 * POST /api/documentos/salvar
 * Salva documentos gerados no banco de dados após pagamento confirmado.
 * Retorna um token de acesso para o cliente recuperar seus documentos.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DOC_TYPE_MAP: Record<string, string> = {
  bo: 'BOLETIM_OCORRENCIA',
  med: 'CONTESTACAO_MED',
  notificacao: 'NOTIFICACAO_BANCO',
  bacen: 'QUEIXA_BACEN',
  procon: 'NOTIFICACAO_PROCON',
};

const DOC_TITLE_MAP: Record<string, string> = {
  bo: 'Boletim de Ocorrência',
  med: 'Contestação MED',
  notificacao: 'Notificação Bancária',
  bacen: 'Reclamação BACEN',
  procon: 'Reclamação Procon',
};

export async function POST(req: NextRequest) {
  try {
    const { paymentId, documentos, email, nome } = await req.json() as {
      paymentId: string;
      documentos: { key: string; texto: string }[];
      email: string;
      nome: string;
    };

    if (!paymentId || !documentos?.length) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // Buscar pagamento pelo gatewayId (Asaas ID)
    const payment = await prisma.payment.findUnique({
      where: { gatewayId: paymentId },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Pagamento não encontrado' }, { status: 404 });
    }

    // Salvar cada documento
    for (const doc of documentos) {
      const tipo = DOC_TYPE_MAP[doc.key];
      if (!tipo) continue;

      await prisma.documento.create({
        data: {
          tipo: tipo as any,
          titulo: DOC_TITLE_MAP[doc.key] || doc.key,
          conteudo: doc.texto,
          pago: true,
          paymentId: payment.id,
        },
      }).catch(() => {}); // ignora duplicatas
    }

    // O token de acesso é o ID interno do pagamento (cuid - difícil de adivinhar)
    return NextResponse.json({
      success: true,
      accessToken: payment.id,
      accessUrl: `/acesso/${payment.id}`,
    });
  } catch (error) {
    console.error('[DOCS] Erro ao salvar documentos:', error);
    return NextResponse.json({ error: 'Erro ao salvar' }, { status: 500 });
  }
}
