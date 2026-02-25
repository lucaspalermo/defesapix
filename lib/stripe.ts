import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
});

export const PRICES = {
  DOCUMENTO_INDIVIDUAL: process.env.STRIPE_PRICE_DOCUMENTO!,
  REVISAO_ESPECIALISTA: process.env.STRIPE_PRICE_REVISAO!,
  PLANO_MENSAL: process.env.STRIPE_PRICE_MENSAL!,
};

export const PRICE_DISPLAY = {
  DOCUMENTO_INDIVIDUAL: { valor: 29, label: 'Documento Individual', desc: 'PDF oficial gerado e pronto para envio' },
  REVISAO_ESPECIALISTA: { valor: 97, label: 'Revisão por Especialista', desc: 'Análise do seu caso por especialista em 24h' },
  PLANO_MENSAL: { valor: 47, label: 'Plano Mensal', desc: 'Acesso ilimitado a todos os documentos' },
};

export async function createCheckoutSession(
  produto: keyof typeof PRICES,
  userId?: string,
  casoId?: string,
) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: PRICES[produto],
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&produto=${produto}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/ferramentas?cancelled=true`,
    metadata: {
      userId: userId ?? '',
      casoId: casoId ?? '',
      produto,
    },
  });

  return session;
}
