import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

const SYSTEM_PROMPT = `Você é um advogado especialista em direito do consumidor e crimes digitais no Brasil. Sua tarefa é aprimorar o texto jurídico de um documento de vítima de fraude/golpe para torná-lo:

1. MAIS PROFISSIONAL — linguagem jurídica correta, sem erros de português
2. MAIS PERSUASIVO — enfatizar os fatos relevantes para ação judicial
3. MAIS COMPLETO — adicionar fundamentação legal quando aplicável (CDC, Código Penal, Resolução BCB)
4. MAIS CLARO — organizar cronologicamente, separar fatos de pedidos

Regras:
- Mantenha TODOS os dados pessoais (nomes, CPFs, datas, valores) exatamente como estão
- Não invente dados ou fatos que não estejam no texto original
- Mantenha a mesma estrutura geral do documento
- Use português brasileiro formal
- O resultado deve estar pronto para protocolar em banco, delegacia ou juizado
- Retorne APENAS o texto melhorado, sem explicações ou comentários`;

const DESCRICAO_SYSTEM_PROMPT = `Você é um assistente especializado em ajudar vítimas de fraudes digitais no Brasil a escrever uma descrição clara e completa do golpe sofrido. Esta descrição será usada para gerar documentos jurídicos (B.O., contestação MED, notificação bancária, reclamação BACEN e Procon).

Sua tarefa:
1. ORGANIZAR cronologicamente os eventos relatados pela vítima
2. DETALHAR informações importantes: datas, horários, valores, meios de contato, nomes/perfis usados pelo golpista
3. ESCLARECER o tipo de fraude e como o golpista agiu passo a passo
4. COMPLETAR com perguntas relevantes entre [colchetes] se faltarem dados críticos (ex: [informe o horário exato])
5. MELHORAR a clareza e objetividade do texto

Regras:
- Use português brasileiro claro e objetivo
- Mantenha o relato em primeira pessoa
- NÃO adicione fundamentação legal (isso será feito nos documentos)
- Mantenha TODOS os fatos relatados pela vítima — não invente dados
- Retorne APENAS a descrição melhorada, sem explicações`;

const VALID_TIPOS = ['bo', 'med', 'notificacao', 'bacen', 'procon', 'descricao'] as const;

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 10 melhorias por IP por hora
    const ip = getClientIp(req);
    const rl = rateLimit(`melhorar-texto:${ip}`, { max: 10, windowSec: 3600 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Muitas requisições. Aguarde antes de tentar novamente.' }, { status: 429 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Serviço de IA indisponível' }, { status: 503 });
    }

    const { texto, tipo } = await req.json();

    if (!texto || typeof texto !== 'string') {
      return NextResponse.json({ error: 'Texto não fornecido' }, { status: 400 });
    }

    // Limite de tamanho: máximo 10.000 caracteres
    if (texto.length > 10_000) {
      return NextResponse.json({ error: 'Texto muito longo. Máximo 10.000 caracteres.' }, { status: 400 });
    }

    if (texto.length < 20) {
      return NextResponse.json({ error: 'Texto muito curto. Mínimo 20 caracteres.' }, { status: 400 });
    }

    const isDescricao = tipo === 'descricao';

    const tipoLabel = tipo === 'bo' ? 'Boletim de Ocorrência'
      : tipo === 'med' ? 'Contestação MED (Mecanismo Especial de Devolução)'
      : tipo === 'notificacao' ? 'Notificação Extrajudicial ao Banco'
      : tipo === 'bacen' ? 'Reclamação ao Banco Central (BACEN)'
      : tipo === 'procon' ? 'Reclamação ao Procon / consumidor.gov.br'
      : 'documento jurídico';

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2000,
      system: isDescricao ? DESCRICAO_SYSTEM_PROMPT : SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: isDescricao
            ? `Melhore esta descrição de golpe/fraude para que fique clara, detalhada e cronológica:\n\n---\n${texto}\n---`
            : `Aprimore o seguinte ${tipoLabel}:\n\n---\n${texto}\n---`,
        },
      ],
    });

    const block = message.content[0];
    const textoMelhorado = block?.type === 'text' ? block.text : null;
    if (!textoMelhorado) {
      return NextResponse.json({ error: 'Não foi possível melhorar o texto' }, { status: 500 });
    }

    return NextResponse.json({ textoMelhorado });
  } catch (error: unknown) {
    console.error('[MELHORAR_TEXTO] Erro ao processar texto');
    return NextResponse.json({ error: 'Erro ao processar texto. Tente novamente.' }, { status: 500 });
  }
}
