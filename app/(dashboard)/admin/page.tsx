import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users, FileText, CreditCard, BarChart3, Shield,
  TrendingUp, AlertTriangle, CheckCircle, Settings,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Painel Admin | Central de Defesa Digital',
  robots: { index: false, follow: false },
};

// Stats placeholders — replace with prisma queries once DB is connected
const STATS = [
  { label: 'Usuários cadastrados',   value: '—',  icon: Users,      color: 'icon-badge-blue'   },
  { label: 'Casos registrados',      value: '—',  icon: FileText,   color: 'icon-badge-ember'  },
  { label: 'Documentos gerados',     value: '—',  icon: Shield,     color: 'icon-badge-green'  },
  { label: 'Receita total (mês)',     value: '—',  icon: CreditCard, color: 'icon-badge-gold'   },
];

const MENU = [
  { label: 'Usuários',       href: '/admin/usuarios',    icon: Users,       desc: 'Gerenciar contas e planos' },
  { label: 'Casos',          href: '/admin/casos',       icon: FileText,    desc: 'Visualizar todos os casos' },
  { label: 'Pagamentos',     href: '/admin/pagamentos',  icon: CreditCard,  desc: 'Histórico de transações' },
  { label: 'Configurações',  href: '/admin/config',      icon: Settings,    desc: 'Configurações do sistema' },
];

export default function AdminPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-xs text-white/30 mb-3 uppercase tracking-widest font-semibold">
          <Shield className="w-3.5 h-3.5 text-ember-400" />
          Painel Administrativo
        </div>
        <h1 className="font-heading font-black text-3xl text-white mb-1">
          Central de Defesa Digital
        </h1>
        <p className="text-white/40 text-sm">Visão geral do sistema</p>
      </div>

      {/* Status notice — DB not connected yet */}
      <div className="flex items-start gap-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl px-5 py-4 mb-8">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-300 font-semibold text-sm mb-1">Banco de dados não conectado</p>
          <p className="text-amber-200/60 text-xs leading-relaxed">
            Configure <code className="bg-amber-500/20 px-1 rounded">DATABASE_URL</code> no <code className="bg-amber-500/20 px-1 rounded">.env.local</code>,
            rode <code className="bg-amber-500/20 px-1 rounded">npx prisma db push</code> e depois{' '}
            <code className="bg-amber-500/20 px-1 rounded">npx tsx prisma/seed.ts</code> para criar o usuário admin.
          </p>
        </div>
      </div>

      {/* Stats grid */}
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

      {/* Quick actions */}
      <h2 className="font-bold text-white mb-4">Seções do painel</h2>
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

      {/* Setup checklist */}
      <div className="card border-green-500/20">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          Checklist de configuração para ir ao ar
        </h3>
        <div className="space-y-2 text-sm">
          {[
            { item: 'Conta Asaas criada (sandbox → produção)',    done: false },
            { item: 'DATABASE_URL configurado (Supabase/Neon)',   done: false },
            { item: 'npx prisma db push executado',               done: false },
            { item: 'npx tsx prisma/seed.ts executado (admin)',   done: false },
            { item: 'NEXTAUTH_SECRET gerado e configurado',       done: false },
            { item: 'SMTP_PASS configurado (Resend API key)',      done: false },
            { item: 'Deploy feito na Vercel',                     done: false },
            { item: 'Domínio centraldefesadigital.com.br apontado para Vercel', done: false },
          ].map(({ item, done }) => (
            <div key={item} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.02]">
              <div className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center ${
                done ? 'bg-green-500 border-green-500' : 'border-white/20'
              }`}>
                {done && <CheckCircle className="w-3 h-3 text-white" />}
              </div>
              <span className={done ? 'text-white/30 line-through' : 'text-white/60'}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
