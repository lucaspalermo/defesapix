import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// POST /api/analytics — record an event (public, no auth)
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Rate limit: 100 eventos por IP por minuto
    const rl = rateLimit(`analytics:${ip}`, { max: 100, windowSec: 60 });
    if (!rl.allowed) {
      return NextResponse.json({ ok: true });
    }

    const { tipo, pagina, dados } = await req.json();

    if (!tipo || typeof tipo !== 'string') {
      return NextResponse.json({ ok: true });
    }

    // Limitar tamanhos
    const tipoSafe = tipo.slice(0, 50);

    // Limitar tamanho dos dados (máx 1KB)
    let dadosStr: string | undefined;
    if (dados) {
      const serialized = JSON.stringify(dados);
      dadosStr = serialized.length <= 1024 ? serialized : undefined;
    }

    const userAgent = req.headers.get('user-agent') ?? undefined;

    await prisma.evento.create({
      data: {
        tipo: tipoSafe,
        pagina: typeof pagina === 'string' ? pagina.slice(0, 500) : undefined,
        dados: dadosStr,
        ip,
        userAgent: userAgent?.slice(0, 500),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: true }); // never fail client-side
  }
}
