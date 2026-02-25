/**
 * GET /api/asaas/status?id={paymentId}
 * Verifica o status de uma cobrança no Asaas.
 * Usado pelo PaymentModal para polling a cada 3s.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verificarPagamento } from '@/lib/asaas';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id obrigatório' }, { status: 400 });
  }

  try {
    const payment = await verificarPagamento(id);

    return NextResponse.json({
      status: payment.status,
      pago:   payment.status === 'RECEIVED' || payment.status === 'CONFIRMED',
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Erro ao verificar pagamento';
    console.error('[ASAAS] Erro ao verificar status:', msg);
    return NextResponse.json({ error: msg, status: 'PENDING', pago: false }, { status: 200 });
    // Retorna 200 mesmo em erro para o polling continuar sem travar
  }
}
