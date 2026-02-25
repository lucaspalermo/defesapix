import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/newsletter — subscribe email
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      create: { email },
      update: { ativo: true },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[NEWSLETTER]', error);
    return NextResponse.json({ ok: true }); // never fail visually
  }
}
