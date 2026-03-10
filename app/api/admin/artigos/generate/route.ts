import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const SYSTEM_PROMPT = `Você é um jornalista especializado em segurança digital e direito do consumidor no Brasil. Sua tarefa é escrever artigos completos para o blog da DefesaPix, uma plataforma que ajuda vítimas de golpes digitais.

Regras:
- Escreva em português brasileiro claro e acessível
- O artigo deve ter entre 1500-2500 palavras
- Use Markdown com ## para H2 e ### para H3
- Inclua dados e estatísticas quando relevante
- Cite leis brasileiras relevantes (CDC, Código Penal, Resolução BCB, Lei 14.155/2021)
- Inclua passos práticos que a vítima pode seguir
- NO final, adicione uma seção "O que fazer se você foi vítima" com passos práticos
- Tom: informativo, empático, profissional
- NÃO use emojis
- NÃO mencione o nome DefesaPix no conteúdo (apenas na CTA final)
- Retorne APENAS o conteúdo Markdown do artigo, sem frontmatter

Estrutura ideal:
1. Introdução contextualizada (o que está acontecendo, dados)
2. Como o golpe funciona (passo a passo dos golpistas)
3. Sinais de alerta (como identificar antes de cair)
4. O que fazer se você foi vítima (passos práticos com prazos)
5. Como se prevenir (dicas de proteção)
6. Conclusão com CTA`;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as { role?: string }).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'IA indisponível' }, { status: 503 });
    }

    const { tema, categoria, tags } = await req.json();

    if (!tema || typeof tema !== 'string' || tema.length < 10) {
      return NextResponse.json({ error: 'Tema deve ter pelo menos 10 caracteres' }, { status: 400 });
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // Generate the article content
    const contentMsg = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Escreva um artigo completo sobre: "${tema}"\n\nCategoria: ${categoria || 'Golpes'}\nTags sugeridas: ${(tags || []).join(', ') || 'a definir'}`,
        },
      ],
    });

    const conteudo = contentMsg.content[0]?.type === 'text' ? contentMsg.content[0].text : '';
    if (!conteudo) {
      return NextResponse.json({ error: 'Falha ao gerar conteúdo' }, { status: 500 });
    }

    // Generate SEO metadata
    const metaMsg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Para o seguinte artigo sobre "${tema}", gere em JSON:
{
  "titulo": "título SEO otimizado (max 65 chars, inclua palavra-chave principal)",
  "slug": "slug-url-amigavel-seo (só letras minúsculas, números e hifens)",
  "resumo": "meta description SEO (max 155 chars, inclua CTA implícito)",
  "seoTitle": "título SEO para tag title (max 60 chars)",
  "seoDesc": "meta description (max 155 chars)",
  "tempoLeitura": número estimado de minutos,
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}

Retorne APENAS o JSON, sem markdown.`,
        },
      ],
    });

    const metaText = metaMsg.content[0]?.type === 'text' ? metaMsg.content[0].text : '';
    let meta;
    try {
      meta = JSON.parse(metaText.trim());
    } catch {
      return NextResponse.json({ error: 'Falha ao gerar metadados', raw: metaText }, { status: 500 });
    }

    // Save as draft in database
    const artigo = await prisma.artigo.create({
      data: {
        slug: meta.slug,
        titulo: meta.titulo,
        conteudo,
        resumo: meta.resumo,
        categoria: categoria || 'Golpes',
        tags: meta.tags || tags || [],
        autorNome: 'Equipe DefesaPix',
        tempoLeitura: meta.tempoLeitura || 8,
        publicado: false,
        seoTitle: meta.seoTitle,
        seoDesc: meta.seoDesc,
      },
    });

    return NextResponse.json({
      success: true,
      artigo: {
        id: artigo.id,
        slug: artigo.slug,
        titulo: artigo.titulo,
        resumo: artigo.resumo,
        tempoLeitura: artigo.tempoLeitura,
        publicado: artigo.publicado,
      },
    });
  } catch (error: unknown) {
    console.error('[ARTIGOS] Erro ao gerar artigo:', error);
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: 'Erro ao gerar artigo', detail: message }, { status: 500 });
  }
}
