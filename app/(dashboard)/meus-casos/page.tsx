import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import {
  FolderOpen, Plus, Clock, CheckCircle, AlertTriangle,
  ArrowRight, Shield, TrendingUp,
} from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Meus Casos',
  robots: { index: false },
};

const TIPO_GOLPE_LABELS: Record<string, string> = {
  PIX: 'Golpe via Pix',
  WHATSAPP: 'Clonagem WhatsApp',
  BOLETO: 'Boleto Falso',
  ROMANCE: 'Golpe do Amor',
  EMPREGO: 'Emprego Falso',
  INVESTIMENTO: 'Investimento Fraudulento',
  CLONE_APP: 'App / Site Falso',
  PHISHING: 'Phishing',
  CARTAO: 'Golpe do Cartão',
  CONSIGNADO: 'Golpe do Consignado',
  OUTRO: 'Outro',
};

const STATUS_CONFIG: Record<string, { label: string; class: string }> = {
  ABERTO: { label: 'Aberto', class: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  EM_ANDAMENTO: { label: 'Em andamento', class: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  RESOLVIDO: { label: 'Resolvido', class: 'bg-green-500/20 text-green-400 border-green-500/30' },
  ARQUIVADO: { label: 'Arquivado', class: 'bg-white/10 text-white/40 border-white/20' },
};

export default async function MeusCasosPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const userId = (session.user as any).id as string;

  const casos = await prisma.caso.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      acoes: true,
      documentos: {
        select: { id: true, tipo: true, pago: true },
      },
    },
  });

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Meus Casos</h1>
          <p className="text-white/50 text-sm">
            {casos.length === 0
              ? 'Nenhum caso registrado ainda.'
              : `${casos.length} caso(s) registrado(s)`}
          </p>
        </div>
        <Link href="/ferramentas" className="btn-primary text-sm">
          <Plus className="w-4 h-4" />
          Novo caso
        </Link>
      </div>

      {casos.length === 0 ? (
        <div className="card border-dashed border-white/20 text-center py-16">
          <FolderOpen className="w-12 h-12 text-white/15 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Nenhum caso registrado</h2>
          <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
            Registre seu caso utilizando nossas ferramentas para acompanhar o andamento e gerar os documentos necessarios.
          </p>
          <Link href="/ferramentas" className="btn-primary text-sm inline-flex">
            <Shield className="w-4 h-4" />
            Registrar meu caso
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {casos.map((caso) => {
            const acoesPendentes = caso.acoes.filter((a) => !a.completado).length;
            const acoesTotal = caso.acoes.length;
            const acoesConcluidas = acoesTotal - acoesPendentes;
            const progresso = acoesTotal > 0 ? Math.round((acoesConcluidas / acoesTotal) * 100) : 0;
            const status = STATUS_CONFIG[caso.status] ?? STATUS_CONFIG.ABERTO;

            return (
              <div key={caso.id} className="card">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-white">
                          {TIPO_GOLPE_LABELS[caso.tipoGolpe] ?? caso.tipoGolpe}
                        </h3>
                        <p className="text-xs text-white/40 mt-0.5">
                          Registrado em {new Date(caso.createdAt).toLocaleDateString('pt-BR')} &middot; Ocorrencia em {new Date(caso.dataOcorrencia).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${status.class}`}>
                        {status.label}
                      </span>
                    </div>

                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{caso.descricao}</p>

                    {/* Stats row */}
                    <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-bold">R$ {Number(caso.valorPerdido).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-white/60">{caso.score}% chance de recuperacao</span>
                      </div>
                      {caso.documentos.length > 0 && (
                        <span className="text-white/40 text-xs">
                          {caso.documentos.length} documento(s)
                        </span>
                      )}
                    </div>

                    {/* Tracking badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[
                        { label: 'B.O.', done: caso.boRegistrado },
                        { label: 'MED', done: caso.medAcionado },
                        { label: 'Banco notificado', done: caso.bancioNotificado },
                        { label: 'PROCON', done: caso.proconAcionado },
                      ].map((item) => (
                        <span
                          key={item.label}
                          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg border ${
                            item.done
                              ? 'bg-green-500/10 border-green-500/20 text-green-400'
                              : 'bg-white/5 border-white/10 text-white/30'
                          }`}
                        >
                          {item.done ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                          {item.label}
                        </span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    {acoesTotal > 0 && (
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-white/40">Progresso das acoes</span>
                          <span className="text-white/60 font-medium">{acoesConcluidas}/{acoesTotal}</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all"
                            style={{ width: `${progresso}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {acoesPendentes > 0 && (
                      <div className="flex items-center gap-2 text-xs text-yellow-400 mt-3">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {acoesPendentes} acao(oes) pendente(s)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
