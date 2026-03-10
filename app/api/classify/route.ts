import { NextRequest, NextResponse } from 'next/server';
import { classifyGolpe } from '@/lib/golpe-classifier';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 20 classificações por IP por hora
    const ip = getClientIp(req);
    const rl = rateLimit(`classify:${ip}`, { max: 20, windowSec: 3600 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Muitas requisições. Tente novamente mais tarde.' }, { status: 429 });
    }

    const { descricao, valor } = await req.json();

    if (!descricao || typeof descricao !== 'string' || descricao.length < 10 || descricao.length > 5000) {
      return NextResponse.json({ error: 'Descrição deve ter entre 10 e 5000 caracteres' }, { status: 400 });
    }

    const valorNum = typeof valor === 'number' && valor >= 0 && valor <= 100_000_000 ? valor : 0;

    const result = classifyGolpe(descricao, valorNum);
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: 'Erro na classificação' }, { status: 500 });
  }
}
