import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import {
  FileText, Plus, CheckCircle, Lock, Download, Shield,
} from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Documentos | Central de Defesa Digital',
  robots: { index: false },
};

const TIPO_DOC_LABELS: Record<string, string> = {
  CONTESTACAO_MED: 'Contestacao MED',
  BOLETIM_OCORRENCIA: 'Boletim de Ocorrencia',
  NOTIFICACAO_BANCO: 'Notificacao ao Banco',
  QUEIXA_BACEN: 'Queixa Bacen',
  NOTIFICACAO_PROCON: 'Notificacao Procon',
  PETICAO_JUDICIAL: 'Peticao Judicial',
  CHECKLIST: 'Checklist',
};

const TIPO_DOC_DESC: Record<string, string> = {
  CONTESTACAO_MED: 'Documento para acionar o Mecanismo Especial de Devolucao junto ao banco',
  BOLETIM_OCORRENCIA: 'Modelo de B.O. para registrar na delegacia online',
  NOTIFICACAO_BANCO: 'Notificacao formal ao banco sobre a fraude',
  QUEIXA_BACEN: 'Queixa formal ao Banco Central',
  NOTIFICACAO_PROCON: 'Notificacao ao PROCON sobre a fraude',
  PETICAO_JUDICIAL: 'Peticao para acao judicial',
  CHECKLIST: 'Checklist de acoes a tomar',
};

export default async function DocumentosPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const userId = (session.user as any).id as string;

  const documentos = await prisma.documento.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      caso: {
        select: { tipoGolpe: true, nomeVitima: true },
      },
    },
  });

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Meus Documentos</h1>
          <p className="text-white/50 text-sm">
            {documentos.length === 0
              ? 'Nenhum documento gerado ainda.'
              : `${documentos.length} documento(s) gerado(s)`}
          </p>
        </div>
        <Link href="/ferramentas" className="btn-primary text-sm">
          <Plus className="w-4 h-4" />
          Gerar documento
        </Link>
      </div>

      {documentos.length === 0 ? (
        <div className="card border-dashed border-white/20 text-center py-16">
          <FileText className="w-12 h-12 text-white/15 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-white mb-2">Nenhum documento gerado</h2>
          <p className="text-white/40 text-sm mb-6 max-w-md mx-auto">
            Utilize nossas ferramentas para gerar documentos juridicos como contestacao MED, boletim de ocorrencia e notificacao bancaria.
          </p>
          <Link href="/ferramentas" className="btn-primary text-sm inline-flex">
            <Shield className="w-4 h-4" />
            Ir para ferramentas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentos.map((doc) => (
            <div key={doc.id} className="card">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  doc.pago ? 'bg-green-500/20' : 'bg-white/10'
                }`}>
                  <FileText className={`w-5 h-5 ${doc.pago ? 'text-green-400' : 'text-white/40'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm">
                    {TIPO_DOC_LABELS[doc.tipo] ?? doc.tipo}
                  </h3>
                  <p className="text-xs text-white/30 mt-0.5">
                    {TIPO_DOC_DESC[doc.tipo] ?? ''}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
                    <span>{new Date(doc.createdAt).toLocaleDateString('pt-BR')}</span>
                    {doc.caso && (
                      <span className="text-white/25">&middot; {doc.caso.tipoGolpe}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                {doc.pago ? (
                  <>
                    <span className="flex items-center gap-1.5 text-xs text-green-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Pago
                    </span>
                    <button className="flex items-center gap-1.5 text-xs font-semibold text-green-400 hover:text-green-300 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      Baixar PDF
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-1.5 text-xs text-white/30">
                      <Lock className="w-3.5 h-3.5" />
                      Bloqueado
                    </span>
                    <Link
                      href="/ferramentas"
                      className="flex items-center gap-1.5 text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      Desbloquear
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
