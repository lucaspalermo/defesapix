import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/guias — List all guias
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const guias = await prisma.guiaGolpe.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        titulo: true,
        descricao: true,
        categoria: true,
        tags: true,
        urgencia: true,
        publicado: true,
        publishedAt: true,
        artigoSlug: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ guias });
  } catch {
    return NextResponse.json({ guias: [] });
  }
}

// PATCH /api/admin/guias — Toggle publish
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const { id, publicado } = await req.json();

    const guia = await prisma.guiaGolpe.update({
      where: { id },
      data: {
        publicado,
        publishedAt: publicado ? new Date() : null,
      },
    });

    return NextResponse.json({ guia: { id: guia.id, publicado: guia.publicado } });
  } catch {
    return NextResponse.json({ error: 'Erro ao atualizar' }, { status: 500 });
  }
}

// DELETE /api/admin/guias — Delete guia
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const { id } = await req.json();
    await prisma.guiaGolpe.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro ao deletar' }, { status: 500 });
  }
}
