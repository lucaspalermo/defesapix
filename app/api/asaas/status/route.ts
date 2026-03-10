/**
 * GET /api/asaas/status?id={paymentId}
 * Verifica o status de uma cobrança no Asaas.
 * Usado pelo PaymentModal para polling a cada 3s.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verificarPagamento } from '@/lib/asaas';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  // Rate limit: 60 polls por 5 min por IP
  const ip = getClientIp(req);
  const rl = rateLimit(`asaas-status:${ip}`, { max: 60, windowSec: 300 });
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Rate limit', status: 'PENDING', pago: false }, { status: 429 });
  }

  const id = req.nextUrl.searchParams.get('id');

  if (!id || !/^pay_[a-zA-Z0-9_]+$/.test(id)) {
    return NextResponse.json({ error: 'ID inválido' }, { status: 400 });
  }

  try {
    const payment = await verificarPagamento(id);

    return NextResponse.json({
      status: payment.status,
      pago:   payment.status === 'RECEIVED' || payment.status === 'CONFIRMED',
    });
  } catch (error: unknown) {
    console.error('[ASAAS] Erro ao verificar status');
    return NextResponse.json({ error: 'Erro ao verificar', status: 'PENDING', pago: false }, { status: 200 });
    // Retorna 200 mesmo em erro para o polling continuar sem travar
  }
}
