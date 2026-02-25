import type { Metadata } from 'next';
import Link from 'next/link';
import { FolderOpen, FileText, TrendingUp, CheckSquare, Plus, ArrowRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | Central de Defesa Digital',
  robots: { index: false },
};

// Mock data — in production, fetch from Prisma
const MOCK_CASOS = [
  {
    id: 'caso_1',
    tipoGolpe: 'Golpe via Pix',
    valorPerdido: 4800,
    dataOcorrencia: '2025-01-10',
    status: 'EM_ANDAMENTO',
    score: 68,
    acoesPendentes: 2,
  },
];

const MOCK_DOCUMENTOS = [
  { id: 'doc_1', tipo: 'Contestação MED', createdAt: '2025-01-10', pago: true },
  { id: 'doc_2', tipo: 'Boletim de Ocorrência', createdAt: '2025-01-10', pago: false },
];

export default function DashboardPage() {
  const valorTotalEmRisco = MOCK_CASOS.reduce((sum, c) => sum + c.valorPerdido, 0);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Bom dia, Usuário! 👋</h1>
        <p className="text-white/50 text-sm">
          Acompanhe o andamento dos seus casos e documentos.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Casos abertos', value: MOCK_CASOS.length, icon: FolderOpen, color: 'text-blue-400' },
          { label: 'Documentos gerados', value: MOCK_DOCUMENTOS.length, icon: FileText, color: 'text-green-400' },
          { label: 'Valor em disputa', value: `R$${(valorTotalEmRisco / 1000).toFixed(1)}k`, icon: TrendingUp, color: 'text-yellow-400' },
          { label: 'Ações pendentes', value: MOCK_CASOS.reduce((s, c) => s + c.acoesPendentes, 0), icon: CheckSquare, color: 'text-red-400' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-white/50">{stat.label}</p>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Alert: Pending actions */}
      {MOCK_CASOS.some((c) => c.acoesPendentes > 0) && (
        <div className="alert-warning mb-6">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div>
            <strong className="block text-sm">Ações urgentes pendentes</strong>
            <p className="text-sm mt-1">
              Você tem {MOCK_CASOS.reduce((s, c) => s + c.acoesPendentes, 0)} ação(ões) pendente(s) que podem impactar suas chances de recuperação.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cases */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Meus Casos</h2>
            <Link href="/meus-casos" className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {MOCK_CASOS.length === 0 ? (
            <div className="card border-dashed border-white/20 text-center py-10">
              <FolderOpen className="w-10 h-10 text-white/20 mx-auto mb-3" />
              <p className="text-white/50 text-sm mb-4">Nenhum caso registrado ainda.</p>
              <Link href="/ferramentas" className="btn-primary text-sm">
                <Plus className="w-4 h-4" />
                Registrar caso
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {MOCK_CASOS.map((caso) => (
                <div key={caso.id} className="card">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-semibold text-white text-sm">{caso.tipoGolpe}</h3>
                      <p className="text-xs text-white/40">{new Date(caso.dataOcorrencia).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <span className={`badge text-xs ${caso.status === 'EM_ANDAMENTO' ? 'badge-yellow' : 'badge-green'}`}>
                      {caso.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-bold">R$ {caso.valorPerdido.toLocaleString('pt-BR')}</span>
                    <span className="text-xs text-green-400">{caso.score}% recuperação</span>
                  </div>

                  <div className="progress-bar mb-3">
                    <div className="progress-fill" style={{ width: `${caso.score}%` }} />
                  </div>

                  {caso.acoesPendentes > 0 && (
                    <div className="flex items-center gap-2 text-xs text-yellow-400">
                      <Clock className="w-3 h-3" />
                      {caso.acoesPendentes} ação(ões) pendente(s)
                    </div>
                  )}
                </div>
              ))}
              <Link href="/ferramentas" className="btn-secondary w-full justify-center text-sm py-2.5">
                <Plus className="w-4 h-4" />
                Adicionar caso
              </Link>
            </div>
          )}
        </div>

        {/* Documents */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Documentos Gerados</h2>
            <Link href="/documentos" className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">
              Ver todos <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {MOCK_DOCUMENTOS.map((doc) => (
              <div key={doc.id} className="card flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">{doc.tipo}</p>
                  <p className="text-xs text-white/40">{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
                {doc.pago ? (
                  <button className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Baixar
                  </button>
                ) : (
                  <Link href="/ferramentas" className="text-xs text-yellow-400 hover:text-yellow-300">
                    Desbloquear
                  </Link>
                )}
              </div>
            ))}

            <Link href="/ferramentas" className="card border-dashed border-white/20 flex items-center gap-3 hover:border-green-500/30 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Plus className="w-5 h-5 text-white/40" />
              </div>
              <span className="text-sm text-white/50 group-hover:text-white/70">Gerar novo documento</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
