/**
 * Seed script — cria usuário admin inicial
 * Executar: npx tsx prisma/seed.ts
 * Pré-requisito: DATABASE_URL configurado e npx prisma db push executado
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  const email    = 'l.simports@hotmail.com';
  const password = process.env.ADMIN_PASSWORD ?? '2262144Lu$';
  const hashed   = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where:  { email },
    update: { role: 'ADMIN', plan: 'PRO', password: hashed },
    create: {
      email,
      name:     'Admin',
      password: hashed,
      role:     'ADMIN',
      plan:     'PRO',
    },
  });

  console.log(`✅ Admin criado/atualizado: ${admin.email} (role: ${admin.role})`);
  console.log('🔐 Acesso: /login → e-mail + senha configurada');
  console.log('🛡️  Painel admin: /admin');
}

main()
  .catch((e) => { console.error('❌ Erro no seed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
