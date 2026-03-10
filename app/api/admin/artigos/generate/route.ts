import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const SYSTEM_PROMPT = `Você é um jornalista e estrategista de conteúdo especializado em segurança digital e direito do consumidor no Brasil. Você escreve para o blog da DefesaPix — uma plataforma que ajuda vítimas de golpes digitais a recuperar seu dinheiro gerando documentos jurídicos (Contestação MED, BO, Notificação Bancária, Reclamação BACEN, Reclamação Procon) por R$47.

OBJETIVO DO ARTIGO:
O artigo é um FUNIL DE VENDAS. Ele deve:
1. EXPLICAR EM DETALHES como o golpe funciona — o passo a passo dos criminosos, as táticas de engenharia social, os sinais de que é golpe
2. CRIAR URGÊNCIA — mostrar que o tempo é limitado (72h para MED, prazos bancários, etc.)
3. MENCIONAR que existem documentos necessários para resolver (BO, MED, Notificação Bancária) mas NÃO ENSINAR como fazer esses documentos
4. DIRECIONAR PARA O PAGAMENTO — a solução completa com todos os documentos prontos está disponível no Kit Completo por R$47 em defesapix.com.br

REGRA CRÍTICA: O artigo NÃO deve dar a solução completa de graça. Ele deve:
- Explicar O QUE aconteceu (como o golpe funciona)
- Explicar O QUE a vítima precisa fazer de forma geral (registrar BO, acionar MED, notificar banco)
- Explicar POR QUE precisa agir rápido (prazos legais)
- MAS NÃO ensinar como redigir os documentos, quais campos preencher, ou dar modelos prontos
- Sempre deixar claro que erros nos documentos podem prejudicar a recuperação e que a DefesaPix gera tudo corretamente por R$47

Regras de formatação:
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
2. "Como esse golpe funciona" — passo a passo DETALHADO dos golpistas (essa é a parte mais rica do artigo)
3. "Sinais de alerta" — como identificar antes de cair
4. "Caiu nesse golpe? O tempo está contra você" — mencione os prazos legais (72h MED, 30 dias banco, etc.), diga que precisa de BO, contestação MED e notificação bancária, mas NÃO dê os modelos
5. "Por que os documentos corretos fazem toda a diferença" — explique que documentos mal preenchidos são rejeitados, que cada banco tem exigências diferentes, e que a DefesaPix gera os 5 documentos personalizados em 15 minutos por R$47
6. "Como se proteger" — prevenção para não cair novamente
7. Conclusão com CTA forte: "Não perca mais tempo. Na DefesaPix, você preenche seus dados uma vez e recebe os 5 documentos prontos para protocolar — Contestação MED, BO, Notificação Bancária, Reclamação BACEN e Reclamação Procon. Tudo por R$47, sem precisar de advogado. Acesse defesapix.com.br agora."

Insira pelo menos 2 CTAs intermediários ao longo do texto (após seção 2 e após seção 4) com frases como:
- "Precisa resolver agora? Acesse o Kit Completo da DefesaPix por R$47"
- "Gere todos os documentos em 15 minutos em defesapix.com.br"`;

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

    // Generate GuiaGolpe (step-by-step guide page) alongside the blog article
    let guia = null;
    try {
      const guiaMsg = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 3000,
        messages: [
          {
            role: 'user',
            content: `Baseado neste tema de golpe: "${tema}"

Gere um guia estruturado de defesa para vítimas. Este guia é um FUNIL DE VENDAS — deve mostrar O QUE fazer mas direcionar para o Kit Completo R$47 da DefesaPix para obter os documentos prontos.

Responda SOMENTE com JSON puro (sem \`\`\`, sem explicação):

{
  "titulo": "Nome curto do golpe (max 50 chars)",
  "subtitulo": "Frase de apoio explicando o guia (max 100 chars)",
  "descricao": "Meta description SEO com 150-160 chars",
  "urgencia": "CRITICA ou ALTA ou MEDIA",
  "icone": "Shield ou Phone ou CreditCard ou Mail ou Smartphone ou Heart ou Briefcase ou Globe ou AlertTriangle",
  "passos": [
    {"step": "1", "urgencia": "Imediato", "titulo": "Titulo do passo", "desc": "Ação geral que a vítima deve tomar (sem dar modelo de documento)"},
    {"step": "2", "urgencia": "Nas primeiras 24h", "titulo": "...", "desc": "..."},
    {"step": "3", "urgencia": "Em até 48h", "titulo": "...", "desc": "..."},
    {"step": "4", "urgencia": "Em até 7 dias", "titulo": "...", "desc": "..."},
    {"step": "5", "urgencia": "Documentação", "titulo": "Gere os documentos no Kit Completo", "desc": "Acesse defesapix.com.br e gere Contestação MED, BO, Notificação Bancária, Reclamação BACEN e Procon em 15 minutos por R$47. Documentos personalizados e prontos para protocolar."}
  ],
  "faq": [
    {"question": "Pergunta frequente sobre este golpe?", "answer": "Resposta útil que mencione o Kit Completo R$47 quando relevante."},
    {"question": "...", "answer": "..."},
    {"question": "...", "answer": "..."},
    {"question": "Como gerar os documentos para resolver meu caso?", "answer": "Na DefesaPix você preenche seus dados uma vez e recebe 5 documentos prontos (Contestação MED, BO, Notificação Bancária, Reclamação BACEN e Procon) por R$47. Acesse defesapix.com.br."}
  ],
  "conteudo": "Conteúdo Markdown (800-1500 palavras) que: 1) Explica COMO o golpe funciona em detalhes 2) Mostra os direitos da vítima e leis aplicáveis 3) Menciona que precisa de documentos específicos para resolver mas NÃO dá modelos 4) Inclui CTAs para o Kit Completo R$47 da DefesaPix 5) Deixa claro que documentos mal feitos são rejeitados e que a DefesaPix gera tudo corretamente"
}

Regras:
- Mínimo 5 passos (o último SEMPRE deve ser o CTA para o Kit Completo R$47)
- Mínimo 4 perguntas FAQ (a última SEMPRE sobre como gerar os documentos na DefesaPix)
- Cite prazos legais reais (72h MED, 120 dias chargeback, etc)
- NÃO dê modelos de documentos, formulários ou textos prontos para copiar
- Os passos devem dizer O QUE fazer, mas para o COMO (documentos) direcionar para defesapix.com.br
- Tom empático e urgente
- Português brasileiro`,
          },
        ],
      });

      const guiaText = guiaMsg.content[0]?.type === 'text' ? guiaMsg.content[0].text : '';
      const guiaJsonMatch = guiaText.match(/\{[\s\S]*\}/);
      if (guiaJsonMatch) {
        const guiaData = JSON.parse(guiaJsonMatch[0]);
        const guiaSlug = slugify(guiaData.titulo || tema);

        // Check for duplicate slug in guias
        const existingGuia = await prisma.guiaGolpe.findUnique({ where: { slug: guiaSlug } });
        const finalGuiaSlug = existingGuia ? `${guiaSlug}-${Date.now().toString(36)}` : guiaSlug;

        guia = await prisma.guiaGolpe.create({
          data: {
            slug: finalGuiaSlug,
            titulo: guiaData.titulo || tema.slice(0, 50),
            subtitulo: guiaData.subtitulo || null,
            descricao: guiaData.descricao || meta.resumo || tema.slice(0, 155),
            conteudo: guiaData.conteudo || '',
            passos: JSON.stringify(Array.isArray(guiaData.passos) ? guiaData.passos : []),
            faq: JSON.stringify(Array.isArray(guiaData.faq) ? guiaData.faq : []),
            categoria: categoria || 'Golpes',
            tags: Array.isArray(meta.tags) ? meta.tags : (tags || []),
            urgencia: ['CRITICA', 'ALTA', 'MEDIA'].includes(guiaData.urgencia) ? guiaData.urgencia : 'ALTA',
            icone: guiaData.icone || 'Shield',
            publicado: false,
            artigoSlug: finalSlug,
            seoTitle: `${guiaData.titulo}: O Que Fazer | DefesaPix`.slice(0, 60),
            seoDesc: guiaData.descricao || meta.seoDesc || null,
          },
        });
      }
    } catch (guiaError) {
      console.error('[ARTIGOS] Erro ao gerar guia de golpe:', guiaError);
      // Non-fatal: article was already saved
    }

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
      guia: guia ? {
        id: guia.id,
        slug: guia.slug,
        titulo: guia.titulo,
        publicado: guia.publicado,
      } : null,
    });
  } catch (error: unknown) {
    console.error('[ARTIGOS] Erro ao gerar artigo:', error);
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: 'Erro ao gerar artigo', detail: message }, { status: 500 });
  }
}
