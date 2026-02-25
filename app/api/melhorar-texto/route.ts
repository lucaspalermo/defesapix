import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

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
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'Serviço de IA indisponível' }, { status: 503 });
    }

    const { texto, tipo } = await req.json();
    if (!texto || typeof texto !== 'string') {
      return NextResponse.json({ error: 'Texto não fornecido' }, { status: 400 });
    }

    const tipoLabel = tipo === 'bo' ? 'Boletim de Ocorrência'
      : tipo === 'med' ? 'Contestação MED (Mecanismo Especial de Devolução)'
      : tipo === 'notificacao' ? 'Notificação Extrajudicial ao Banco'
      : 'documento jurídico';

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      temperature: 0.3,
      max_tokens: 4000,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Aprimore o seguinte ${tipoLabel}:\n\n${texto}` },
      ],
    });

    const textoMelhorado = completion.choices[0]?.message?.content;
    if (!textoMelhorado) {
      return NextResponse.json({ error: 'Não foi possível melhorar o texto' }, { status: 500 });
    }

    return NextResponse.json({ textoMelhorado });
  } catch (error) {
    console.error('[MELHORAR_TEXTO]', error);
    return NextResponse.json({ error: 'Erro ao processar texto' }, { status: 500 });
  }
}
