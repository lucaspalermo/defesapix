import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Settings, ArrowLeft, CheckCircle, XCircle, Shield } from 'lucide-react';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = { title: 'Configurações — Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

export default async function AdminConfigPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');
  const cur = await prisma.user.findUnique({ where: { id: (session.user as any).id }, select: { role: true } });
  if (cur?.role !== 'ADMIN') redirect('/dashboard');

  // Check which integrations are configured
  const checks = [
    { label: 'Banco de Dados (PostgreSQL)', ok: !!process.env.DATABASE_URL, key: 'DATABASE_URL' },
    { label: 'Asaas (Pagamentos PIX)', ok: !!process.env.ASAAS_API_KEY, key: 'ASAAS_API_KEY' },
    { label: 'Asaas Webhook Token', ok: !!process.env.ASAAS_WEBHOOK_TOKEN, key: 'ASAAS_WEBHOOK_TOKEN' },
    { label: 'SMTP (Emails)', ok: !!process.env.SMTP_PASS, key: 'SMTP_PASS' },
    { label: 'NextAuth Secret', ok: !!process.env.NEXTAUTH_SECRET, key: 'NEXTAUTH_SECRET' },
    { label: 'Anthropic API (IA)', ok: !!process.env.ANTHROPIC_API_KEY, key: 'ANTHROPIC_API_KEY' },
    { label: 'Google Analytics', ok: true, key: 'G-VN5PQZYBCD' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <Link href="/admin" className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-6">
        <ArrowLeft className="w-3 h-3" /> Voltar ao painel
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
          <Settings className="w-5 h-5 text-white/60" />
        </div>
        <div>
          <h1 className="font-heading font-black text-2xl text-white">Configurações</h1>
          <p className="text-sm text-white/40">Status das integrações</p>
        </div>
      </div>

      {/* Integration status */}
      <div className="card mb-8">
        <h2 className="font-bold text-white mb-5 flex items-center gap-2">
          <Shield className="w-5 h-5 text-ember-400" />
          Integrações do Sistema
        </h2>
        <div className="space-y-3">
          {checks.map((c) => (
            <div key={c.key} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              {c.ok ? (
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">{c.label}</p>
                <p className="text-xs text-white/25 font-mono">{c.key}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                c.ok ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {c.ok ? 'Configurado' : 'Faltando'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Admin info */}
      <div className="card">
        <h2 className="font-bold text-white mb-4">Informações</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/40">Admin logado</span>
            <span className="text-white">{session.user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Email de notificações</span>
            <span className="text-white">l.simports@hotmail.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Domínio</span>
            <span className="text-white">defesapix.com.br</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40">Plataforma</span>
            <span className="text-white">Next.js + Vercel + Neon PostgreSQL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
