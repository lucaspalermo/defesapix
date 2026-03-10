import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/blog — List published articles from DB
export async function GET() {
  try {
    const artigos = await prisma.artigo.findMany({
      where: { publicado: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        slug: true,
        titulo: true,
        resumo: true,
        categoria: true,
        tags: true,
        tempoLeitura: true,
        publishedAt: true,
        autorNome: true,
      },
    });

    return NextResponse.json({ artigos });
  } catch {
    return NextResponse.json({ artigos: [] });
  }
}
