/**
 * GET /api/asaas/status?id={paymentId}
 * Verifica o status de uma cobrança.
 * Primeiro verifica no banco local (webhook pode já ter confirmado),
 * depois faz fallback para API do Asaas.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verificarPagamento } from '@/lib/asaas';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';

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
    // 1. Verificar no banco local primeiro (webhook pode já ter confirmado)
    const localPayment = await prisma.payment.findUnique({
      where: { gatewayId: id },
      select: { status: true },
    }).catch(() => null);

    if (localPayment?.status === 'PAID') {
      return NextResponse.json({ status: 'CONFIRMED', pago: true });
    }

    // 2. Fallback: verificar na API do Asaas
    const payment = await verificarPagamento(id);
    const pago = payment.status === 'RECEIVED' || payment.status === 'CONFIRMED';

    // 3. Se a API diz que foi pago mas o banco local ainda não sabe, atualizar
    if (pago && localPayment) {
      await prisma.payment.update({
        where: { gatewayId: id },
        data: { status: 'PAID' },
      }).catch(() => {});
    }

    return NextResponse.json({
      status: payment.status,
      pago,
    });
  } catch (error: unknown) {
    console.error('[ASAAS] Erro ao verificar status');
    return NextResponse.json({ error: 'Erro ao verificar', status: 'PENDING', pago: false }, { status: 200 });
  }
}
