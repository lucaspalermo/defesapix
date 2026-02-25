import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/analytics — record an event (public, no auth)
export async function POST(req: NextRequest) {
  try {
    const { tipo, pagina, dados } = await req.json();

    if (!tipo) {
      return NextResponse.json({ error: 'tipo obrigatório' }, { status: 400 });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      'unknown';
    const userAgent = req.headers.get('user-agent') ?? undefined;

    await prisma.evento.create({
      data: {
        tipo,
        pagina: pagina ?? undefined,
        dados: dados ? JSON.stringify(dados) : undefined,
        ip,
        userAgent,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[ANALYTICS]', error);
    return NextResponse.json({ ok: true }); // never fail client-side
  }
}
