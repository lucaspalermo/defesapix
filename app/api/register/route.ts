import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (exists) {
      return NextResponse.json({ error: 'E-mail já cadastrado' }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name:     name?.trim() || null,
        email:    email.toLowerCase().trim(),
        password: hashed,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[REGISTER]', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
