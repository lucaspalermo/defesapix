import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

// POST /api/stripe — Create checkout session
export async function POST(req: NextRequest) {
  try {
    const { produto, casoId } = await req.json();

    const PRICE_MAP: Record<string, { amount: number; name: string }> = {
      DOCUMENTO_INDIVIDUAL: { amount: 2900, name: 'Documento Individual' },
      PACOTE_EMERGENCIA: { amount: 4700, name: 'Pacote Emergência — 3 Documentos PDF' },
      REVISAO_ESPECIALISTA: { amount: 9700, name: 'Revisão por Especialista' },
      PLANO_MENSAL: { amount: 4700, name: 'Plano Mensal' },
    };

    const priceInfo = PRICE_MAP[produto];
    if (!priceInfo) {
      return NextResponse.json({ error: 'Produto inválido' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: `Central de Defesa Digital — ${priceInfo.name}` },
            unit_amount: priceInfo.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&produto=${produto}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/ferramentas`,
      metadata: { produto, casoId: casoId ?? '' },
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('[STRIPE] Error:', error);
    return NextResponse.json({ error: 'Erro ao criar sessão de pagamento' }, { status: 500 });
  }
}

// POST /api/stripe/webhook — Handle Stripe webhooks
export async function PUT(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 });

  let event: Stripe.Event;
  const body = await req.text();

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { produto, casoId } = session.metadata ?? {};

    await prisma.payment.create({
      data: {
        stripeSessionId: session.id,
        stripePaymentId: session.payment_intent as string,
        amount: (session.amount_total ?? 0) / 100,
        status: 'PAID',
        produto: produto as any,
      },
    });
  }

  return NextResponse.json({ received: true });
}
