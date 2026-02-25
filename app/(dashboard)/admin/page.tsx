import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import {
  Users, FileText, CreditCard, Shield,
  CheckCircle, Settings, FolderOpen,
} from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Painel Admin | Central de Defesa Digital',
  robots: { index: false, follow: false },
};

const MENU = [
  { label: 'Usuarios',      href: '/admin/usuarios',   icon: Users,      desc: 'Gerenciar contas e planos' },
  { label: 'Casos',         href: '/admin/casos',      icon: FileText,   desc: 'Visualizar todos os casos' },
  { label: 'Pagamentos',    href: '/admin/pagamentos', icon: CreditCard, desc: 'Historico de transacoes' },
  { label: 'Configuracoes', href: '/admin/config',     icon: Settings,   desc: 'Configuracoes do sistema' },
];

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const currentUser = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: { role: true },
  });
  if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalUsers, totalCasos, totalDocumentos, revenueData, recentUsers, recentCasos] =
    await Promise.all([
      prisma.user.count(),
      prisma.caso.count(),
      prisma.documento.count(),
      prisma.payment.aggregate({
        where: { status: 'PAID', createdAt: { gte: startOfMonth } },
        _sum: { amount: true },
      }),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, plan: true, role: true, createdAt: true },
      }),
      prisma.caso.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, tipoGolpe: true, valorPerdido: true, status: true, nomeVitima: true, createdAt: true },
      }),
    ]);

  const receitaMes = Number(revenueData._sum.amount ?? 0);

  const STATS = [
    { label: 'Usuarios cadastrados', value: totalUsers.toString(), icon: Users, color: 'icon-badge-blue' },
    { label: 'Casos registrados', value: totalCasos.toString(), icon: FolderOpen, color: 'icon-badge-ember' },
    { label: 'Documentos gerados', value: totalDocumentos.toString(), icon: Shield, color: 'icon-badge-green' },
    {
      label: 'Receita do mes',
      value: `R$${receitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      icon: CreditCard,
      color: 'icon-badge-gold',
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-white/30 mb-3 uppercase tracking-widest font-semibold">
          <Shield className="w-3.5 h-3.5 text-ember-400" />
          Painel Administrativo
        </div>
        <h1 className="font-heading font-black text-3xl text-white mb-1">Central de Defesa Digital</h1>
        <p className="text-white/40 text-sm">Visao geral do sistema</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card border-white/[0.07]">
              <div className={`icon-badge ${s.color} mb-4`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="font-black text-2xl text-white mb-0.5">{s.value}</p>
              <p className="text-xs text-white/35">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Sections */}
      <h2 className="font-bold text-white mb-4">Secoes do painel</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {MENU.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="card group hover:border-ember-500/30 hover:-translate-y-0.5 transition-all flex items-center gap-4"
            >
              <div className="icon-badge icon-badge-ember group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white text-sm group-hover:text-ember-400 transition-colors">{item.label}</p>
                <p className="text-xs text-white/35 mt-0.5">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-bold text-white mb-4">Usuarios recentes</h2>
          <div className="space-y-2">
            {recentUsers.length === 0 ? (
              <p className="text-white/30 text-sm">Nenhum usuario cadastrado.</p>
            ) : (
              recentUsers.map((u) => (
                <div key={u.id} className="card flex items-center gap-3 py-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{u.name || 'Sem nome'}</p>
                    <p className="text-xs text-white/30 truncate">{u.email}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        u.role === 'ADMIN' ? 'bg-ember-500/20 text-ember-400' : 'bg-white/10 text-white/40'
                      }`}
                    >
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

        <div>
          <h2 className="font-bold text-white mb-4">Casos recentes</h2>
          <div className="space-y-2">
            {recentCasos.length === 0 ? (
              <p className="text-white/30 text-sm">Nenhum caso registrado.</p>
            ) : (
              recentCasos.map((c) => (
                <div key={c.id} className="card flex items-center gap-3 py-3">
                  <div className="w-8 h-8 rounded-full bg-ember-500/20 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5 text-ember-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{c.nomeVitima}</p>
                    <p className="text-xs text-white/30">{c.tipoGolpe} &middot; {c.status}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-white">
                      R$ {Number(c.valorPerdido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-white/20 mt-1">
                      {new Date(c.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
