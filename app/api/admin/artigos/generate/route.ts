import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const SYSTEM_PROMPT = `Você é um jornalista e estrategista de conteúdo especializado em segurança digital e direito do consumidor no Brasil. Você escreve para o blog da DefesaPix — uma plataforma que ajuda vítimas de golpes digitais a recuperar seu dinheiro gerando documentos jurídicos (Contestação MED, BO, Notificação Bancária) por R$47.

OBJETIVO DUPLO de cada artigo:
1. EDUCAR — ensinar a vítima exatamente o que aconteceu e o que ela precisa fazer
2. CONVERTER — mostrar que fazer tudo sozinho é demorado/arriscado e que a plataforma gera os documentos corretos em 15 minutos

Regras:
- Português brasileiro claro e acessível (a vítima está assustada, seja empático)
- 1500-2500 palavras
- Use Markdown: ## para H2, ### para H3, **negrito** para ênfase, - para listas
- Cite leis brasileiras (CDC, Código Penal, Resolução BCB nº 93/2021, Lei 14.155/2021)
- Inclua dados/estatísticas reais quando possível
- Tom: informativo, empático, urgente quando necessário
- NÃO use emojis
- Retorne APENAS o conteúdo Markdown, sem frontmatter ou blocos de código

Estrutura obrigatória:
1. Introdução com gancho emocional + dados de contexto
2. "Como esse golpe funciona" — passo a passo dos golpistas
3. "Sinais de alerta" — como identificar antes de cair
4. "Caiu nesse golpe? Faça isso agora" — passos urgentes com prazos (enfatize o prazo de 72h do MED quando aplicável)
5. "Documentos que você precisa" — liste os documentos (MED, BO, Notificação Bancária) e explique que erros neles podem prejudicar a recuperação
6. "Como se proteger" — prevenção
7. Conclusão com CTA: "Na DefesaPix, você gera todos os documentos necessários em menos de 15 minutos por R$47 — sem precisar de advogado. Comece com o diagnóstico gratuito em defesapix.com.br"`;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

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

    // Generate SEO metadata in a single call with robust parsing
    const metaMsg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: `Gere metadados SEO para um artigo sobre: "${tema}"

Responda SOMENTE com JSON puro (sem \`\`\`, sem explicação, sem texto antes ou depois):
{"titulo":"titulo SEO max 65 chars","resumo":"meta description max 155 chars","seoTitle":"title tag max 60 chars","seoDesc":"description max 155 chars","tempoLeitura":8,"tags":["tag1","tag2","tag3"]}`,
        },
      ],
    });

    const metaText = metaMsg.content[0]?.type === 'text' ? metaMsg.content[0].text : '';

    // Robust JSON extraction — find the JSON object even with surrounding text
    let meta;
    try {
      const jsonMatch = metaText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      meta = JSON.parse(jsonMatch[0]);
    } catch {
      // Fallback: generate metadata from the tema string
      meta = {
        titulo: tema.slice(0, 65),
        resumo: tema.slice(0, 155),
        seoTitle: tema.slice(0, 60),
        seoDesc: tema.slice(0, 155),
        tempoLeitura: 8,
        tags: (tags || []).length > 0 ? tags : ['Golpe', 'Segurança Digital'],
      };
    }

    // Generate slug from titulo
    const baseSlug = slugify(meta.titulo || tema);

    // Check for duplicate slug
    const existing = await prisma.artigo.findUnique({ where: { slug: baseSlug } });
    const finalSlug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

    // Save as draft in database
    const artigo = await prisma.artigo.create({
      data: {
        slug: finalSlug,
        titulo: meta.titulo || tema.slice(0, 65),
        conteudo,
        resumo: meta.resumo || tema.slice(0, 155),
        categoria: categoria || 'Golpes',
        tags: Array.isArray(meta.tags) ? meta.tags : (tags || []),
        autorNome: 'Equipe DefesaPix',
        tempoLeitura: typeof meta.tempoLeitura === 'number' ? meta.tempoLeitura : 8,
        publicado: false,
        seoTitle: meta.seoTitle || null,
        seoDesc: meta.seoDesc || null,
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
