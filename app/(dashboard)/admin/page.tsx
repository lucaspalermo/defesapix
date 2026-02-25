import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import {
  Users, FileText, CreditCard, Shield, Settings, FolderOpen,
  TrendingUp, Eye, Search, Zap, Clock, BarChart3, Activity,
} from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Painel Admin',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const MENU = [
  { label: 'Usuarios', href: '/admin/usuarios', icon: Users, desc: 'Gerenciar contas e planos' },
  { label: 'Casos', href: '/admin/casos', icon: FileText, desc: 'Visualizar todos os casos' },
  { label: 'Pagamentos', href: '/admin/pagamentos', icon: CreditCard, desc: 'Historico de transacoes' },
  { label: 'Configuracoes', href: '/admin/config', icon: Settings, desc: 'Configuracoes do sistema' },
];

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'agora';
  if (mins < 60) return `${mins}m atrás`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h atrás`;
  const days = Math.floor(hrs / 24);
  return `${days}d atrás`;
}

const EVENT_LABELS: Record<string, { label: string; color: string; icon: string }> = {
  diagnostico_completo: { label: 'Diagnóstico completo', color: 'text-emerald-400', icon: '🔍' },
  pagamento_iniciado: { label: 'Pagamento iniciado', color: 'text-amber-400', icon: '⏳' },
  pagamento_confirmado: { label: 'Pagamento confirmado', color: 'text-green-400', icon: '✅' },
  venda_confirmada: { label: 'Venda confirmada (webhook)', color: 'text-green-400', icon: '💰' },
  cta_clicado: { label: 'CTA clicado', color: 'text-blue-400', icon: '👆' },
  page_view: { label: 'Visita', color: 'text-white/40', icon: '👁' },
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const currentUser = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    select: { role: true },
  });
  if (currentUser?.role !== 'ADMIN') redirect('/dashboard');

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalUsers,
    totalCasos,
    totalDocumentos,
    revenueMonth,
    revenueToday,
    paymentsToday,
    paymentsMonth,
    // Analytics events
    diagnosticosHoje,
    diagnosticosSemana,
    diagnosticosMes,
    pagamentosIniciadosHoje,
    pagamentosConfirmadosHoje,
    // Page views
    pageViewsHoje,
    pageViewsSemana,
    // Unique visitors (unique IPs today)
    visitantesHoje,
    // Recent events
    recentEvents,
    // Recent payments
    recentPayments,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.caso.count(),
    prisma.documento.count(),
    prisma.payment.aggregate({
      where: { status: 'PAID', createdAt: { gte: startOfMonth } },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.payment.aggregate({
      where: { status: 'PAID', createdAt: { gte: startOfToday } },
      _sum: { amount: true },
      _count: true,
    }),
    prisma.payment.count({ where: { status: 'PAID', createdAt: { gte: startOfToday } } }),
    prisma.payment.count({ where: { status: 'PAID', createdAt: { gte: startOfMonth } } }),
    // Diagnosticos
    prisma.evento.count({ where: { tipo: 'diagnostico_completo', createdAt: { gte: startOfToday } } }),
    prisma.evento.count({ where: { tipo: 'diagnostico_completo', createdAt: { gte: startOfWeek } } }),
    prisma.evento.count({ where: { tipo: 'diagnostico_completo', createdAt: { gte: startOfMonth } } }),
    prisma.evento.count({ where: { tipo: 'pagamento_iniciado', createdAt: { gte: startOfToday } } }),
    prisma.evento.count({ where: { tipo: 'pagamento_confirmado', createdAt: { gte: startOfToday } } }),
    // Page views
    prisma.evento.count({ where: { tipo: 'page_view', createdAt: { gte: startOfToday } } }),
    prisma.evento.count({ where: { tipo: 'page_view', createdAt: { gte: startOfWeek } } }),
    // Unique visitors
    prisma.evento.findMany({
      where: { createdAt: { gte: startOfToday }, ip: { not: null } },
      distinct: ['ip'],
      select: { ip: true },
    }),
    // Recent events
    prisma.evento.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { id: true, tipo: true, pagina: true, dados: true, ip: true, createdAt: true },
    }),
    // Recent payments
    prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: { id: true, gatewayId: true, amount: true, produto: true, status: true, createdAt: true },
    }),
  ]);

  const receitaMes = Number(revenueMonth._sum.amount ?? 0);
  const receitaHoje = Number(revenueToday._sum.amount ?? 0);
  const visitantesCount = visitantesHoje.length;

  // Conversion rate: diagnosticos that led to payment initiation (today)
  const taxaConversao = diagnosticosHoje > 0
    ? Math.round((pagamentosIniciadosHoje / diagnosticosHoje) * 100)
    : 0;

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-white/30 mb-3 uppercase tracking-widest font-semibold">
          <Shield className="w-3.5 h-3.5 text-ember-400" />
          Painel Administrativo
        </div>
        <h1 className="font-heading font-black text-3xl text-white mb-1">DefesaPix</h1>
        <p className="text-white/40 text-sm">Analytics em tempo real — {now.toLocaleDateString('pt-BR')}</p>
      </div>

      {/* ── RECEITA ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card border-green-500/20 bg-green-500/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-xs text-white/40 font-semibold">Receita Hoje</p>
          </div>
          <p className="font-black text-2xl text-green-400">
            R${receitaHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-white/30 mt-1">{paymentsToday} venda{paymentsToday !== 1 ? 's' : ''}</p>
        </div>

        <div className="card border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-xs text-white/40 font-semibold">Receita do Mês</p>
          </div>
          <p className="font-black text-2xl text-white">
            R${receitaMes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-white/30 mt-1">{paymentsMonth} venda{paymentsMonth !== 1 ? 's' : ''}</p>
        </div>

        <div className="card border-blue-500/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Eye className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-xs text-white/40 font-semibold">Visitantes Hoje</p>
          </div>
          <p className="font-black text-2xl text-white">{visitantesCount}</p>
          <p className="text-xs text-white/30 mt-1">{pageViewsHoje} views · 7d: {pageViewsSemana}</p>
        </div>

        <div className="card border-amber-500/20">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-xs text-white/40 font-semibold">Taxa Conversão</p>
          </div>
          <p className="font-black text-2xl text-white">{taxaConversao}%</p>
          <p className="text-xs text-white/30 mt-1">Diagnóstico → Pagamento</p>
        </div>
      </div>

      {/* ── FUNIL ──────────────────────────────────────────────────── */}
      <div className="card mb-8">
        <h2 className="font-bold text-white mb-5 flex items-center gap-2">
          <Activity className="w-5 h-5 text-ember-400" />
          Funil de Conversão — Hoje
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Diagnósticos', value: diagnosticosHoje, week: diagnosticosSemana, month: diagnosticosMes, color: 'text-emerald-400', bg: 'bg-emerald-500/10', Icon: Search },
            { label: 'Pagamentos Iniciados', value: pagamentosIniciadosHoje, color: 'text-amber-400', bg: 'bg-amber-500/10', Icon: Clock },
            { label: 'Pagamentos Confirmados', value: pagamentosConfirmadosHoje, color: 'text-green-400', bg: 'bg-green-500/10', Icon: Zap },
            { label: 'Receita', value: `R$${receitaHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, color: 'text-green-400', bg: 'bg-green-500/10', Icon: CreditCard },
          ].map((item) => (
            <div key={item.label} className={`p-4 rounded-xl ${item.bg} border border-white/[0.06] text-center`}>
              <item.Icon className={`w-5 h-5 ${item.color} mx-auto mb-2`} />
              <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
              <p className="text-xs text-white/40 mt-1">{item.label}</p>
              {'week' in item && (
                <p className="text-[10px] text-white/25 mt-2">
                  7d: {item.week} · 30d: {item.month}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── OVERVIEW GERAL ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Usuários cadastrados', value: totalUsers, icon: Users, color: 'text-blue-400' },
          { label: 'Casos registrados', value: totalCasos, icon: FolderOpen, color: 'text-ember-400' },
          { label: 'Documentos gerados', value: totalDocumentos, icon: Shield, color: 'text-green-400' },
          { label: 'Vendas do mês', value: paymentsMonth, icon: CreditCard, color: 'text-amber-400' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card border-white/[0.07]">
              <Icon className={`w-5 h-5 ${s.color} mb-3`} />
              <p className="font-black text-2xl text-white mb-0.5">{s.value}</p>
              <p className="text-xs text-white/35">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* ── ATIVIDADE RECENTE + PAGAMENTOS ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Timeline de eventos */}
        <div>
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Atividade Recente
          </h2>
          <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
            {recentEvents.length === 0 ? (
              <p className="text-white/30 text-sm">Nenhum evento registrado ainda.</p>
            ) : (
              recentEvents.map((ev) => {
                const meta = EVENT_LABELS[ev.tipo] || { label: ev.tipo, color: 'text-white/50', icon: '📌' };
                let extraInfo = '';
                if (ev.dados) {
                  try {
                    const d = JSON.parse(ev.dados);
                    if (d.golpe) extraInfo = d.golpe;
                    if (d.valor) extraInfo += ` · R$${Number(d.valor).toFixed(2)}`;
                    if (d.prob) extraInfo += ` · ${d.prob}%`;
                  } catch { /* ignore */ }
                }
                return (
                  <div key={ev.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
                    <span className="text-sm mt-0.5">{meta.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${meta.color}`}>{meta.label}</p>
                      {extraInfo && <p className="text-xs text-white/30 truncate">{extraInfo}</p>}
                      {ev.pagina && <p className="text-[10px] text-white/20 truncate">{ev.pagina}</p>}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-white/25">{timeAgo(ev.createdAt)}</p>
                      {ev.ip && ev.ip !== 'unknown' && (
                        <p className="text-[9px] text-white/15 mt-0.5">{ev.ip.substring(0, 15)}</p>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Pagamentos recentes */}
        <div>
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-green-400" />
            Pagamentos Recentes
          </h2>
          <div className="space-y-2">
            {recentPayments.length === 0 ? (
              <p className="text-white/30 text-sm">Nenhum pagamento ainda.</p>
            ) : (
              recentPayments.map((p) => (
                <div key={p.id} className="card flex items-center gap-3 py-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    p.status === 'PAID' ? 'bg-green-500/20' : 'bg-amber-500/20'
                  }`}>
                    <CreditCard className={`w-3.5 h-3.5 ${
                      p.status === 'PAID' ? 'text-green-400' : 'text-amber-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.produto}</p>
                    <p className="text-xs text-white/30 truncate">{p.gatewayId}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${p.status === 'PAID' ? 'text-green-400' : 'text-white'}`}>
                      R$ {Number(p.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-white/20 mt-1">
                      {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ── SEÇÕES DO PAINEL ──────────────────────────────────────── */}
      <h2 className="font-bold text-white mb-4">Seções do painel</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
    </div>
  );
}
