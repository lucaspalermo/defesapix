import { NextRequest, NextResponse } from 'next/server';

// Stripe não configurado — este projeto usa Asaas para pagamentos via PIX.

export async function POST(_req: NextRequest) {
  return NextResponse.json(
    { error: 'Pagamento via Stripe não configurado. Use /api/asaas para pagamentos via PIX.' },
    { status: 501 },
  );
}
