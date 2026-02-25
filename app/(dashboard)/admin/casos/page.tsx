import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = { title: 'Casos — Admin', robots: { index: false } };
export const dynamic = 'force-dynamic';

const STATUS_COLORS: Record<string, string> = {
  ABERTO: 'bg-blue-500/20 text-blue-400',
  EM_ANDAMENTO: 'bg-amber-500/20 text-amber-400',
  RESOLVIDO: 'bg-green-500/20 text-green-400',
  ARQUIVADO: 'bg-white/10 text-white/40',
};

export default async function AdminCasosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');
  const cur = await prisma.user.findUnique({ where: { id: (session.user as any).id }, select: { role: true } });
  if (cur?.role !== 'ADMIN') redirect('/dashboard');

  const casos = await prisma.caso.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true, nomeVitima: true, emailVitima: true, tipoGolpe: true,
      valorPerdido: true, status: true, dataOcorrencia: true, createdAt: true,
    },
  });

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <Link href="/admin" className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors mb-6">
        <ArrowLeft className="w-3 h-3" /> Voltar ao painel
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-ember-500/20 flex items-center justify-center">
          <FileText className="w-5 h-5 text-ember-400" />
        </div>
        <div>
          <h1 className="font-heading font-black text-2xl text-white">Casos</h1>
          <p className="text-sm text-white/40">{casos.length} registrados</p>
        </div>
      </div>

      <div className="space-y-2">
        {casos.length === 0 ? (
          <p className="text-white/30 text-sm">Nenhum caso registrado.</p>
        ) : (
          casos.map((c) => (
            <div key={c.id} className="card flex items-center gap-4 py-3">
              <div className="w-9 h-9 rounded-full bg-ember-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-ember-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{c.nomeVitima}</p>
                <p className="text-xs text-white/30 truncate">
                  {c.tipoGolpe} · {c.emailVitima}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-white">
                  R$ {Number(c.valorPerdido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex items-center gap-2 mt-1 justify-end">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${STATUS_COLORS[c.status] ?? 'bg-white/10 text-white/40'}`}>
                    {c.status}
                  </span>
                  <p className="text-[10px] text-white/20">
                    {new Date(c.createdAt).toLocaleDateString('pt-BR')}
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
