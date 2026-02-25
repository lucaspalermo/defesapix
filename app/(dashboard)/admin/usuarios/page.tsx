import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Users, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = { title: 'Usuários — Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AdminUsuariosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');
  const cur = await prisma.user.findUnique({ where: { id: (session.user as any).id }, select: { role: true } });
  if (cur?.role !== 'ADMIN') redirect('/dashboard');

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: { id: true, name: true, email: true, phone: true, plan: true, role: true, createdAt: true },
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <Link href="/admin" className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-6">
        <ArrowLeft className="w-3 h-3" /> Voltar ao painel
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Users className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h1 className="font-heading font-black text-2xl text-white">Usuários</h1>
          <p className="text-sm text-white/40">{users.length} cadastrados</p>
        </div>
      </div>

      <div className="space-y-2">
        {users.length === 0 ? (
          <p className="text-white/30 text-sm">Nenhum usuário cadastrado.</p>
        ) : (
          users.map((u) => (
            <div key={u.id} className="card flex items-center gap-4 py-3">
              <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{u.name || 'Sem nome'}</p>
                <p className="text-xs text-white/30 truncate">{u.email}{u.phone ? ` · ${u.phone}` : ''}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  u.role === 'ADMIN' ? 'bg-ember-500/20 text-ember-400' : 'bg-white/10 text-white/40'
                }`}>
                  {u.role === 'ADMIN' ? 'Admin' : u.plan}
                </span>
                <p className="text-[10px] text-white/20 mt-1">
                  {new Date(u.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
