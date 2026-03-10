import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/blog/[slug] — Get single published article from DB
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const artigo = await prisma.artigo.findUnique({
      where: { slug },
    });

    if (!artigo || !artigo.publicado) {
      return NextResponse.json({ error: 'Artigo não encontrado' }, { status: 404 });
    }

    // Increment view count (fire and forget)
    prisma.artigo.update({
      where: { id: artigo.id },
      data: { visualizacoes: { increment: 1 } },
    }).catch(() => {});

    return NextResponse.json({ artigo });
  } catch {
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
