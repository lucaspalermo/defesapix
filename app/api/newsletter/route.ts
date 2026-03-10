import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isValidEmail } from '@/lib/sanitize';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// POST /api/newsletter — subscribe email
export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 por IP por hora
    const ip = getClientIp(req);
    const rl = rateLimit(`newsletter:${ip}`, { max: 5, windowSec: 3600 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Muitas tentativas' }, { status: 429 });
    }

    const { email } = await req.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const emailNormalizado = email.toLowerCase().trim().slice(0, 254);

    await prisma.newsletterSubscriber.upsert({
      where: { email: emailNormalizado },
      create: { email: emailNormalizado },
      update: { ativo: true },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[NEWSLETTER] Erro ao salvar inscrição');
    return NextResponse.json({ error: 'Erro ao processar inscrição' }, { status: 500 });
  }
}
