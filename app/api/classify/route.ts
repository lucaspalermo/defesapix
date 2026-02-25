import { NextRequest, NextResponse } from 'next/server';
import { classifyGolpe } from '@/lib/golpe-classifier';

export async function POST(req: NextRequest) {
  try {
    const { descricao, valor } = await req.json();

    if (!descricao || descricao.length < 10) {
      return NextResponse.json({ error: 'Descrição muito curta' }, { status: 400 });
    }

    const result = classifyGolpe(descricao, valor ?? 0);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: 'Erro na classificação' }, { status: 500 });
  }
}
