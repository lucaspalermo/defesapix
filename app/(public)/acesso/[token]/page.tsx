'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Shield, FileText, Loader2, AlertTriangle, Copy, CheckCircle, Mail } from 'lucide-react';
import { baixarPDF } from '@/lib/pdf-generator';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Documento {
  id: string;
  tipo: string;
  titulo: string;
  conteudo: string;
}

interface DadosAcesso {
  produto: string;
  dataPagamento: string;
  documentos: Documento[];
}

const TIPO_LABELS: Record<string, string> = {
  CONTESTACAO_MED: 'Contestação MED',
  BOLETIM_OCORRENCIA: 'Boletim de Ocorrência',
  NOTIFICACAO_BANCO: 'Notificação Bancária',
  QUEIXA_BACEN: 'Reclamação BACEN',
  NOTIFICACAO_PROCON: 'Reclamação Procon',
};

export default function AcessoDocumentosPage() {
  const { token } = useParams<{ token: string }>();
  const [dados, setDados] = useState<DadosAcesso | null>(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch(`/api/documentos/acesso/${token}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then(setDados)
      .catch(() => setErro('Documentos não encontrados ou link expirado.'))
      .finally(() => setLoading(false));
  }, [token]);

  const handleDownload = async (doc: Documento) => {
    setDownloading(doc.id);
    try {
      const filename = `${doc.titulo.toLowerCase().replace(/\s+/g, '-')}-defesapix.pdf`;
      await baixarPDF(doc.conteudo, filename, doc.titulo);
      toast.success('PDF baixado!');
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadAll = async () => {
    if (!dados) return;
    setDownloading('all');
    try {
      const allText = dados.documentos
        .map((d) => d.conteudo)
        .join('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n');
      await baixarPDF(allText, 'kit-recuperacao-defesapix.pdf', 'Kit de Recuperação');
      toast.success('Kit completo baixado!');
    } finally {
      setDownloading(null);
    }
  };

  const handleCopy = async (doc: Documento) => {
    await navigator.clipboard.writeText(doc.conteudo);
    setCopied(doc.id);
    toast.success('Texto copiado!');
    setTimeout(() => setCopied(null), 3000);
  };

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-ember-400 animate-spin mx-auto mb-4" />
          <p className="text-white/50">Carregando seus documentos...</p>
        </div>
      </section>
    );
  }

  if (erro || !dados) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center py-20">
        <div className="container max-w-lg text-center">
          <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Documentos não encontrados</h1>
          <p className="text-white/50 mb-8">
            Este link pode estar incorreto ou os documentos ainda não foram processados.
            Se você acabou de pagar, aguarde alguns minutos e tente novamente.
          </p>
          <Link href="/ferramentas/pacote-completo" className="btn-primary justify-center py-3">
            Ir para o Kit Completo
          </Link>
        </div>
      </section>
    );
  }

  const dataFmt = new Date(dados.dataPagamento).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  });

  return (
    <>
      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-3xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto mb-5">
            <Shield className="w-7 h-7 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Seus documentos</h1>
          <p className="text-white/50 mb-2">
            Compra realizada em {dataFmt} — {dados.documentos.length} documento{dados.documentos.length > 1 ? 's' : ''}
          </p>
          <p className="text-xs text-white/30">
            Salve este link nos favoritos para acessar novamente a qualquer momento.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl space-y-4">
          {/* Botão baixar tudo */}
          <button
            onClick={handleDownloadAll}
            disabled={downloading === 'all'}
            className="btn-primary w-full justify-center py-4 text-base"
          >
            {downloading === 'all' ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Gerando PDF...</>
            ) : (
              <><FileText className="w-5 h-5" /> Baixar todos os documentos (PDF)</>
            )}
          </button>

          {/* Lista de documentos */}
          {dados.documentos.map((doc) => (
            <div key={doc.id} className="card border-white/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-green-400" />
                  {TIPO_LABELS[doc.tipo] || doc.titulo}
                </h3>
                <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-bold">
                  PAGO
                </span>
              </div>

              <div className="bg-white/[0.03] rounded-xl p-4 mb-3 max-h-48 overflow-y-auto">
                <pre className="text-xs text-white/60 whitespace-pre-wrap font-sans leading-relaxed">
                  {doc.conteudo.slice(0, 500)}
                  {doc.conteudo.length > 500 && '...'}
                </pre>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDownload(doc)}
                  disabled={downloading === doc.id}
                  className="btn-primary py-2 text-sm flex-1 justify-center"
                >
                  {downloading === doc.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <><FileText className="w-4 h-4" /> Baixar PDF</>
                  )}
                </button>
                <button
                  onClick={() => handleCopy(doc)}
                  className={`btn-secondary py-2 text-sm flex-1 justify-center ${copied === doc.id ? 'border-green-500/40 text-green-400' : ''}`}
                >
                  {copied === doc.id ? (
                    <><CheckCircle className="w-4 h-4" /> Copiado!</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copiar texto</>
                  )}
                </button>
              </div>
            </div>
          ))}

          {/* Aviso */}
          <div className="text-center pt-4">
            <p className="text-xs text-white/30">
              Seus documentos ficam disponíveis neste link permanentemente.
              Em caso de dúvida, entre em contato: contato@defesapix.com.br
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
