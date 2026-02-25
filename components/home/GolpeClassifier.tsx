'use client';

import { useState } from 'react';
import { AlertTriangle, Zap, ChevronRight, Clock, FileText, CheckCircle, TrendingUp, Shield } from 'lucide-react';
import { classifyGolpe, type ClassificationResult } from '@/lib/golpe-classifier';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

const URGENCIA_CONFIG = {
  CRITICA: { label: 'URGÊNCIA CRÍTICA', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/40' },
  ALTA: { label: 'URGÊNCIA ALTA', color: 'text-orange-400', bg: 'bg-orange-500/20 border-orange-500/40' },
  MEDIA: { label: 'URGÊNCIA MÉDIA', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/40' },
  BAIXA: { label: 'URGÊNCIA BAIXA', color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/40' },
};

const DOC_LINKS: Record<string, string> = {
  CONTESTACAO_MED: '/ferramentas/gerador-contestacao-med',
  BOLETIM_OCORRENCIA: '/ferramentas/gerador-bo',
  NOTIFICACAO_BANCO: '/ferramentas/notificacao-banco',
  PETICAO_JUDICIAL: '/parceiros',
  NOTIFICACAO_PROCON: '/ferramentas/notificacao-banco',
};

export default function GolpeClassifier() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClassify = async () => {
    if (!descricao.trim() || descricao.length < 20) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const valorNum = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    setResult(classifyGolpe(descricao, valorNum));
    setLoading(false);
  };

  const urgConfig = result ? URGENCIA_CONFIG[result.urgencia] : null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="card border-green-500/20">
        {!result ? (
          <>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Classificador de Golpes</h3>
                <p className="text-sm text-white/50">Descreva o que aconteceu e receba seu plano em segundos</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label">O que aconteceu? (descreva com detalhes)</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Exemplo: Recebi uma mensagem do meu 'banco' dizendo que minha conta seria bloqueada. Cliquei no link e fiz uma transferência via Pix de R$3.000 para uma conta que achei ser do banco..."
                  rows={5}
                  className="input resize-none"
                />
                <p className="text-xs text-white/30 mt-1">{descricao.length} caracteres (mínimo: 20)</p>
              </div>

              <div>
                <label className="label">Valor aproximado perdido (R$)</label>
                <input
                  type="text"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  placeholder="Ex: 3.000,00"
                  className="input"
                />
              </div>

              <button
                onClick={handleClassify}
                disabled={loading || descricao.length < 20}
                className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analisando seu caso...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Analisar e gerar plano de ação
                  </>
                )}
              </button>

              <p className="text-xs text-white/30 text-center">
                Seus dados são confidenciais e protegidos pela LGPD. Não armazenamos informações sem seu consentimento.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Classification Result */}
            <div className="space-y-6">
              {/* Header */}
              <div className={`border rounded-xl p-4 ${urgConfig!.bg}`}>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-6 h-6 ${urgConfig!.color}`} />
                    <div>
                      <span className={`text-xs font-bold ${urgConfig!.color} uppercase tracking-wider block`}>
                        {urgConfig!.label}
                      </span>
                      <h3 className="font-bold text-white text-lg">{result.titulo}</h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-white/50 block">Prob. de recuperação</span>
                    <span className="text-2xl font-bold text-green-400">{result.probabilidadeRecuperacao}%</span>
                  </div>
                </div>
              </div>

              <p className="text-white/70 leading-relaxed">{result.descricao}</p>

              {/* Prazo Legal */}
              <div className="alert-warning">
                <Clock className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Prazo legal:</span>
                  <span className="text-sm">{result.prazoLegal}</span>
                </div>
              </div>

              {/* Recovery probability bar */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Probabilidade de recuperação</span>
                  <span className="font-bold text-green-400">{result.probabilidadeRecuperacao}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${result.probabilidadeRecuperacao}%` }}
                  />
                </div>
              </div>

              {/* Action Plan */}
              <div>
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  Seu plano de ação personalizado
                </h4>
                <div className="space-y-3">
                  {result.acoes.map((acao) => (
                    <div
                      key={acao.ordem}
                      className={`border rounded-xl p-4 ${acao.obrigatoria ? 'border-green-500/30 bg-green-500/5' : 'border-white/10 bg-white/5'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${acao.obrigatoria ? 'bg-green-500 text-white' : 'bg-white/20 text-white/60'}`}>
                          {acao.ordem}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                            <h5 className="font-semibold text-white text-sm">{acao.titulo}</h5>
                            <span className={`badge text-xs ${acao.obrigatoria ? 'badge-green' : 'badge-blue'}`}>
                              {acao.obrigatoria ? 'Obrigatório' : 'Recomendado'}
                            </span>
                          </div>
                          <p className="text-xs text-white/60 mb-2">{acao.descricao}</p>
                          <div className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-1 text-xs text-yellow-400">
                              <Clock className="w-3 h-3" />
                              {acao.prazo}
                            </span>
                            {acao.documentoGerado && (
                              <Link
                                href={DOC_LINKS[acao.documentoGerado] || '/ferramentas'}
                                className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 font-medium"
                              >
                                <FileText className="w-3 h-3" />
                                Gerar documento
                                <ChevronRight className="w-3 h-3" />
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link href="/ferramentas" className="btn-primary justify-center">
                  <FileText className="w-4 h-4" />
                  Gerar todos os documentos
                </Link>
                <button
                  onClick={() => setResult(null)}
                  className="btn-secondary justify-center"
                >
                  Nova análise
                </button>
              </div>

              <p className="text-xs text-white/30 text-center">
                Confusão? Conte com nossa rede de parceiros jurídicos para uma análise aprofundada do seu caso.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
