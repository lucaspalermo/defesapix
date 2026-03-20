/**
 * GET /api/documentos/acesso/[token]
 * Retorna documentos associados a um pagamento pelo token (Payment.id).
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  if (!token || token.length < 10) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 400 });
  }

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: token },
      select: {
        id: true,
        status: true,
        produto: true,
        createdAt: true,
        documentos: {
          select: {
            id: true,
            tipo: true,
            titulo: true,
            conteudo: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!payment || payment.status !== 'PAID') {
      return NextResponse.json({ error: 'Documentos não encontrados' }, { status: 404 });
    }

    if (!payment.documentos.length) {
      return NextResponse.json({ error: 'Nenhum documento salvo para este pagamento' }, { status: 404 });
    }

    return NextResponse.json({
      produto: payment.produto,
      dataPagamento: payment.createdAt,
      documentos: payment.documentos,
    });
  } catch (error) {
    console.error('[DOCS] Erro ao buscar documentos:', error);
    return NextResponse.json({ error: 'Erro ao buscar documentos' }, { status: 500 });
  }
}
