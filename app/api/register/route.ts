import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { isValidEmail, isStrongPassword } from '@/lib/sanitize';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 registros por IP por hora
    const ip = getClientIp(req);
    const rl = rateLimit(`register:${ip}`, { max: 5, windowSec: 3600 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Muitas tentativas. Aguarde antes de tentar novamente.' }, { status: 429 });
    }

    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email e senha são obrigatórios' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const passwordCheck = isStrongPassword(password);
    if (!passwordCheck.valid) {
      return NextResponse.json({ error: passwordCheck.message }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (exists) {
      return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name:     name?.trim().slice(0, 100) || null,
        email:    email.toLowerCase().trim(),
        password: hashed,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[REGISTER] Erro ao registrar usuário');
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
