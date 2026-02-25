/**
 * POST /api/asaas/webhook
 * Recebe notificações do Asaas sobre mudanças de status de pagamento.
 *
 * Configurar no painel Asaas:
 *   URL: https://defesapix.com.br/api/asaas/webhook
 *   Eventos: PAYMENT_RECEIVED, PAYMENT_CONFIRMED
 *   Token: valor definido em ASAAS_WEBHOOK_TOKEN
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('asaas-access-token');
    const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;

    if (expectedToken && authHeader !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { event, payment } = body as {
      event: string;
      payment: { id: string; status: string; value: number; externalReference?: string };
    };

    console.log('[ASAAS WEBHOOK]', event, payment?.id, payment?.status);

    if (event === 'PAYMENT_RECEIVED' || event === 'PAYMENT_CONFIRMED') {
      // Extract produto from externalReference (format: cdd-PRODUTO-timestamp)
      let produto = 'PACOTE_EMERGENCIA';
      if (payment.externalReference) {
        const parts = payment.externalReference.split('-');
        if (parts.length >= 2) {
          produto = parts.slice(1, -1).join('_');
        }
      }

      const validProdutos = ['BO_INDIVIDUAL', 'MED', 'NOTIFICACAO_BANCO', 'PACOTE_EMERGENCIA', 'REVISAO_ESPECIALISTA', 'PLANO_MENSAL'];
      if (!validProdutos.includes(produto)) {
        produto = 'PACOTE_EMERGENCIA';
      }

      try {
        await prisma.payment.upsert({
          where: { gatewayId: payment.id },
          create: {
            gatewayId: payment.id,
            amount: payment.value,
            status: 'PAID',
            produto: produto as any,
          },
          update: { status: 'PAID' },
        });
        console.log(`[ASAAS WEBHOOK] Payment saved: R$${payment.value} — ID: ${payment.id}`);
      } catch (dbError) {
        console.error('[ASAAS WEBHOOK] DB error:', dbError);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[ASAAS WEBHOOK] Error:', error);
    return NextResponse.json({ received: true });
  }
}
