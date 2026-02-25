import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { CreditCard, ArrowLeft, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = { title: 'Pagamentos — Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

const STATUS_COLORS: Record<string, string> = {
  PAID: 'bg-green-500/20 text-green-400',
  PENDING: 'bg-amber-500/20 text-amber-400',
  FAILED: 'bg-red-500/20 text-red-400',
  REFUNDED: 'bg-purple-500/20 text-purple-400',
};

export default async function AdminPagamentosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');
  const cur = await prisma.user.findUnique({ where: { id: (session.user as any).id }, select: { role: true } });
  if (cur?.role !== 'ADMIN') redirect('/dashboard');

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [payments, totalRevenue, monthRevenue] = await Promise.all([
    prisma.payment.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: { id: true, gatewayId: true, amount: true, produto: true, status: true, createdAt: true },
    }),
    prisma.payment.aggregate({ where: { status: 'PAID' }, _sum: { amount: true }, _count: true }),
    prisma.payment.aggregate({ where: { status: 'PAID', createdAt: { gte: startOfMonth } }, _sum: { amount: true }, _count: true }),
  ]);

  const totalFmt = Number(totalRevenue._sum.amount ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const monthFmt = Number(monthRevenue._sum.amount ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <Link href="/admin" className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-6">
        <ArrowLeft className="w-3 h-3" /> Voltar ao painel
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="font-heading font-black text-2xl text-white">Pagamentos</h1>
          <p className="text-sm text-white/40">{payments.length} transações</p>
        </div>
      </div>

      {/* Revenue summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="card border-green-500/20 bg-green-500/5">
          <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
          <p className="font-black text-xl text-green-400">R${monthFmt}</p>
          <p className="text-xs text-white/30">Receita do mês ({monthRevenue._count} vendas)</p>
        </div>
        <div className="card border-white/[0.07]">
          <CreditCard className="w-5 h-5 text-white/40 mb-2" />
          <p className="font-black text-xl text-white">R${totalFmt}</p>
          <p className="text-xs text-white/30">Receita total ({totalRevenue._count} vendas)</p>
        </div>
      </div>

      <div className="space-y-2">
        {payments.length === 0 ? (
          <p className="text-white/30 text-sm">Nenhum pagamento registrado.</p>
        ) : (
          payments.map((p) => (
            <div key={p.id} className="card flex items-center gap-4 py-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                p.status === 'PAID' ? 'bg-green-500/20' : 'bg-amber-500/20'
              }`}>
                <CreditCard className={`w-4 h-4 ${p.status === 'PAID' ? 'text-green-400' : 'text-amber-400'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{p.produto}</p>
                <p className="text-xs text-white/25 truncate font-mono">{p.gatewayId}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold ${p.status === 'PAID' ? 'text-green-400' : 'text-white'}`}>
                  R$ {Number(p.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2 mt-1 justify-end">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${STATUS_COLORS[p.status] ?? 'bg-white/10 text-white/40'}`}>
                    {p.status}
                  </span>
                  <p className="text-[10px] text-white/20">
                    {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
