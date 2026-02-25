/**
 * POST /api/asaas/webhook
 * Recebe notificações do Asaas sobre mudanças de status de pagamento.
 *
 * Configurar no painel Asaas:
 *   URL: https://centraldefesadigital.com.br/api/asaas/webhook
 *   Eventos: PAYMENT_RECEIVED, PAYMENT_CONFIRMED
 *   Token: valor definido em ASAAS_WEBHOOK_TOKEN
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Verificar token de autenticação do webhook
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
      // Opcional: salvar no banco quando disponível
      // try {
      //   await prisma.payment.upsert({
      //     where: { gatewayId: payment.id },
      //     create: { gatewayId: payment.id, amount: payment.value, status: 'PAID', produto: 'DOCUMENTO_INDIVIDUAL' },
      //     update: { status: 'PAID' },
      //   });
      // } catch {}

      console.log(`[ASAAS WEBHOOK] Pagamento confirmado: R$${payment.value} — ID: ${payment.id}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[ASAAS WEBHOOK] Erro:', error);
    return NextResponse.json({ received: true }); // sempre 200 para Asaas não retentar
  }
}
