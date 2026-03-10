import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/admin/artigos — List all articles
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const artigos = await prisma.artigo.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        titulo: true,
        resumo: true,
        categoria: true,
        tags: true,
        tempoLeitura: true,
        visualizacoes: true,
        publicado: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ artigos });
  } catch (error) {
    console.error('[ARTIGOS] Erro ao listar');
    return NextResponse.json({ error: 'Erro ao listar artigos' }, { status: 500 });
  }
}

// PATCH /api/admin/artigos — Update article (publish/unpublish/edit)
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const { id, publicado, titulo, resumo, conteudo, categoria, tags, seoTitle, seoDesc } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (typeof publicado === 'boolean') {
      data.publicado = publicado;
      if (publicado) data.publishedAt = new Date();
    }
    if (titulo) data.titulo = titulo;
    if (resumo) data.resumo = resumo;
    if (conteudo) data.conteudo = conteudo;
    if (categoria) data.categoria = categoria;
    if (tags) data.tags = tags;
    if (seoTitle) data.seoTitle = seoTitle;
    if (seoDesc) data.seoDesc = seoDesc;

    const artigo = await prisma.artigo.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, artigo: { id: artigo.id, publicado: artigo.publicado } });
  } catch (error) {
    console.error('[ARTIGOS] Erro ao atualizar');
    return NextResponse.json({ error: 'Erro ao atualizar artigo' }, { status: 500 });
  }
}

// DELETE /api/admin/artigos — Delete article
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
    }

    await prisma.artigo.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ARTIGOS] Erro ao deletar');
    return NextResponse.json({ error: 'Erro ao deletar artigo' }, { status: 500 });
  }
}
