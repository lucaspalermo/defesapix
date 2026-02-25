import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

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

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ error: 'Serviço de IA indisponível' }, { status: 503 });
    }

    const { texto, tipo } = await req.json();
    if (!texto || typeof texto !== 'string') {
      return NextResponse.json({ error: 'Texto não fornecido' }, { status: 400 });
    }

    const tipoLabel = tipo === 'bo' ? 'Boletim de Ocorrência'
      : tipo === 'med' ? 'Contestação MED (Mecanismo Especial de Devolução)'
      : tipo === 'notificacao' ? 'Notificação Extrajudicial ao Banco'
      : tipo === 'bacen' ? 'Reclamação ao Banco Central (BACEN)'
      : tipo === 'procon' ? 'Reclamação ao Procon / consumidor.gov.br'
      : 'documento jurídico';

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4000,
      system: SYSTEM_PROMPT,
      messages: [
        { role: 'user', content: `Aprimore o seguinte ${tipoLabel}:\n\n${texto}` },
      ],
    });

    const block = message.content[0];
    const textoMelhorado = block?.type === 'text' ? block.text : null;
    if (!textoMelhorado) {
      return NextResponse.json({ error: 'Não foi possível melhorar o texto' }, { status: 500 });
    }

    return NextResponse.json({ textoMelhorado });
  } catch (error) {
    console.error('[MELHORAR_TEXTO]', error);
    return NextResponse.json({ error: 'Erro ao processar texto' }, { status: 500 });
  }
}
