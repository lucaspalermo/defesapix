'use client';

import { useState } from 'react';
import {
  Search, ArrowRight, AlertTriangle, Clock, Shield, FileText,
  CheckCircle, Zap, Lock, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { track } from '@/lib/track';

/* ── Config por tipo de golpe ───────────────────────────────────────────── */
interface GolpeDiag {
  label: string;
  base: number;          // probabilidade base de recuperação
  docs: string[];        // documentos necessários
  prazoChave: string;    // prazo mais urgente
  caminhos: string[];    // caminhos de recuperação resumidos
  alertaUrgente?: string;
}

const GOLPES: Record<string, GolpeDiag> = {
  PIX: {
    label: 'Golpe via Pix',
    base: 65,
    docs: ['Contestação MED', 'Boletim de Ocorrência', 'Notificação Bancária', 'Reclamação BACEN', 'Reclamação Procon'],
    prazoChave: 'MED — 72 horas para acionar',
    caminhos: ['MED (bloqueio cautelar dos valores)', 'Notificação formal ao banco', 'Reclamação ao Banco Central', 'Procon / consumidor.gov.br', 'Juizado Especial (valores maiores)'],
    alertaUrgente: 'O Mecanismo Especial de Devolução (MED) tem prazo de 72h. Cada hora conta.',
  },
  WHATSAPP: {
    label: 'Clonagem de WhatsApp',
    base: 40,
    docs: ['Boletim de Ocorrência', 'Reclamação Procon'],
    prazoChave: 'Recuperar acesso ao WhatsApp — imediato',
    caminhos: ['Recuperação da conta WhatsApp', 'BO para registro criminal', 'Procon contra a operadora (se chip clonado)'],
  },
  BOLETO: {
    label: 'Boleto Falso',
    base: 45,
    docs: ['Boletim de Ocorrência', 'Notificação Bancária', 'Reclamação BACEN', 'Reclamação Procon'],
    prazoChave: 'Contestação bancária — até 30 dias',
    caminhos: ['Contestação no banco pagador', 'Notificação formal com base no CDC', 'Reclamação BACEN', 'Procon / consumidor.gov.br'],
  },
  APP_FALSO: {
    label: 'App/Site Falso de Banco',
    base: 55,
    docs: ['Boletim de Ocorrência', 'Notificação Bancária', 'Reclamação BACEN', 'Reclamação Procon'],
    prazoChave: 'Bloqueio de conta — imediato',
    caminhos: ['Bloqueio imediato da conta', 'Notificação ao banco com base no CDC', 'Reclamação BACEN', 'Procon'],
    alertaUrgente: 'Troque TODAS as senhas bancárias imediatamente. O golpista pode ter acesso às suas contas.',
  },
  TELEFONE: {
    label: 'Golpe por Telefone',
    base: 35,
    docs: ['Boletim de Ocorrência', 'Reclamação Procon'],
    prazoChave: 'Registrar BO — o quanto antes',
    caminhos: ['BO para registro criminal', 'Procon contra empresa envolvida', 'Juizado Especial (valores maiores)'],
  },
  CARTAO: {
    label: 'Fraude em Cartão',
    base: 80,
    docs: ['Boletim de Ocorrência', 'Notificação Bancária', 'Reclamação BACEN', 'Reclamação Procon'],
    prazoChave: 'Contestação — até 60 dias (Art. 42 CDC)',
    caminhos: ['Bloqueio do cartão', 'Contestação de transações (chargeback)', 'Notificação formal ao banco', 'Reclamação BACEN'],
    alertaUrgente: 'Bloqueie o cartão AGORA pelo app do banco se ainda não bloqueou.',
  },
  INVESTIMENTO: {
    label: 'Investimento Fraudulento',
    base: 20,
    docs: ['Boletim de Ocorrência', 'Notificação Bancária', 'Reclamação BACEN', 'Reclamação Procon'],
    prazoChave: 'Denúncia à CVM — sem prazo, mas aja rápido',
    caminhos: ['BO por estelionato', 'Notificação ao banco de origem', 'Denúncia à CVM', 'Reclamação BACEN', 'Ação judicial'],
  },
  ROUBO_CELULAR: {
    label: 'Roubo/Furto de Celular',
    base: 30,
    docs: ['Boletim de Ocorrência'],
    prazoChave: 'Bloqueio do aparelho e contas — IMEDIATO',
    caminhos: ['Bloqueio remoto do celular', 'Bloqueio do chip (operadora)', 'Bloqueio do IMEI (Anatel)', 'BO online', 'Trocar senhas de apps bancários'],
    alertaUrgente: 'Bloqueie o celular remotamente AGORA e ligue para seu banco para bloquear o app.',
  },
  OUTRO: {
    label: 'Outro tipo de golpe',
    base: 35,
    docs: ['Boletim de Ocorrência', 'Notificação Bancária', 'Reclamação BACEN', 'Reclamação Procon'],
    prazoChave: 'Registrar BO — o quanto antes',
    caminhos: ['BO online', 'Notificação ao banco', 'Reclamação BACEN', 'Procon / consumidor.gov.br'],
  },
};

const TEMPOS = [
  { value: '6', label: 'Hoje (menos de 12h)', bonus: 25 },
  { value: '24', label: 'Ontem (12-24h)', bonus: 20 },
  { value: '48', label: '2-3 dias atrás', bonus: 15 },
  { value: '96', label: '4-7 dias', bonus: 5 },
  { value: '360', label: '1-4 semanas', bonus: 0 },
  { value: '1000', label: '1-3 meses', bonus: -10 },
  { value: '3000', label: 'Mais de 3 meses', bonus: -20 },
];

/* ── Cálculo ────────────────────────────────────────────────────────────── */
interface DiagResult {
  prob: number;
  categoria: 'ALTA' | 'MEDIA' | 'BAIXA';
  golpe: GolpeDiag;
  horasRestantesMED: number | null;
  valorNum: number;
  tempoLabel: string;
}

function calcular(tipo: string, valor: string, tempo: string): DiagResult {
  const golpe = GOLPES[tipo] || GOLPES['OUTRO'];
  const tempoInfo = TEMPOS.find((t) => t.value === tempo) || TEMPOS[6];
  const valorNum = parseFloat(valor.replace(/\./g, '').replace(',', '.')) || 0;
  const horas = parseFloat(tempo) || 0;

  let prob = golpe.base + tempoInfo.bonus;

  // valor: mais fácil recuperar valores menores
  if (valorNum > 0 && valorNum < 1000) prob += 10;
  else if (valorNum > 50000) prob -= 10;

  prob = Math.max(5, Math.min(95, prob));

  const categoria: DiagResult['categoria'] =
    prob >= 60 ? 'ALTA' : prob >= 35 ? 'MEDIA' : 'BAIXA';

  // MED countdown (only for Pix)
  const horasRestantesMED = tipo === 'PIX' ? Math.max(0, 72 - horas) : null;

  return { prob, categoria, golpe, horasRestantesMED, valorNum, tempoLabel: tempoInfo.label };
}

/* ── Componente ─────────────────────────────────────────────────────────── */
export default function DiagnosticoGratuito() {
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [valorDisplay, setValorDisplay] = useState('');
  const [tempo, setTempo] = useState('');
  const [result, setResult] = useState<DiagResult | null>(null);
  const [email, setEmail] = useState('');
  const [emailSalvo, setEmailSalvo] = useState(false);

  const handleValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (!digits) { setValorDisplay(''); setValor(''); return; }
    const cents = parseInt(digits, 10);
    const formatted = (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setValorDisplay(formatted);
    setValor(formatted);
  };

  const handleDiagnosticar = () => {
    if (!tipo || !tempo) return;
    const res = calcular(tipo, valor, tempo);
    setResult(res);
    track('diagnostico_completo', { golpe: res.golpe.label, prob: res.prob, valor: res.valorNum });
  };

  const handleSalvarEmail = async () => {
    if (!email || !email.includes('@')) return;
    try {
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nome: 'Visitante', tipo: result?.golpe.label ?? 'Golpe digital' }),
      });
    } catch { /* silent */ }
    setEmailSalvo(true);
  };

  const corCategoria = {
    ALTA: { text: 'text-green-400', bg: 'bg-green-500', ring: 'ring-green-500/30', label: 'Alta chance', emoji: '' },
    MEDIA: { text: 'text-yellow-400', bg: 'bg-yellow-500', ring: 'ring-yellow-500/30', label: 'Chance moderada', emoji: '' },
    BAIXA: { text: 'text-red-400', bg: 'bg-red-500', ring: 'ring-red-500/30', label: 'Chance baixa — mas ainda possível', emoji: '' },
  };

  /* ── FORMULÁRIO ─────────────────────────────────────────────────────────── */
  if (!result) {
    return (
      <div className="space-y-6">
        <div className="card border-emerald-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-bold text-white">Diagnóstico do seu caso</h2>
              <p className="text-sm text-white/50">3 perguntas rápidas — resultado imediato</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Tipo de golpe */}
            <div>
              <label className="label">O que aconteceu com você?</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="select">
                <option value="">Selecione...</option>
                {Object.entries(GOLPES).map(([key, g]) => (
                  <option key={key} value={key}>{g.label}</option>
                ))}
              </select>
            </div>

            {/* Valor */}
            <div>
              <label className="label">Valor do prejuízo (R$)</label>
              <input
                value={valorDisplay}
                onChange={handleValor}
                inputMode="numeric"
                className="input"
                placeholder="0,00 (opcional)"
              />
              <p className="text-xs text-white/30 mt-1">Deixe em branco se não houve prejuízo financeiro direto</p>
            </div>

            {/* Tempo */}
            <div>
              <label className="label">Quando aconteceu?</label>
              <select value={tempo} onChange={(e) => setTempo(e.target.value)} className="select">
                <option value="">Selecione...</option>
                {TEMPOS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleDiagnosticar}
              disabled={!tipo || !tempo}
              className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
              Analisar meu caso gratuitamente
            </button>

            <p className="text-xs text-white/30 text-center flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" /> Seus dados não são armazenados. Análise 100% gratuita.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── RESULTADO ──────────────────────────────────────────────────────────── */
  const cor = corCategoria[result.categoria];
  const isPix = result.horasRestantesMED !== null;
  const medUrgente = isPix && result.horasRestantesMED! > 0 && result.horasRestantesMED! <= 72;

  return (
    <div className="space-y-6">
      {/* Urgência MED */}
      {medUrgente && (
        <div className="alert-danger animate-pulse-slow">
          <Clock className="w-5 h-5 shrink-0" />
          <div>
            <strong className="block text-sm">Prazo MED: {Math.floor(result.horasRestantesMED!)}h restantes</strong>
            <p className="text-sm text-white/70">
              O Mecanismo Especial de Devolução precisa ser acionado em até 72h.
              {result.horasRestantesMED! <= 24 && ' MENOS DE 24H RESTANTES — aja agora!'}
            </p>
          </div>
        </div>
      )}

      {/* Alerta urgente do tipo de golpe */}
      {result.golpe.alertaUrgente && (
        <div className="alert-warning">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{result.golpe.alertaUrgente}</p>
        </div>
      )}

      {/* Card principal — probabilidade */}
      <div className={`card border-white/10 ring-1 ${cor.ring}`}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">Seu diagnóstico</p>
            <h2 className="font-bold text-white text-xl">{result.golpe.label}</h2>
            {result.valorNum > 0 && (
              <p className="text-sm text-white/50 mt-1">
                Prejuízo: R$ {result.valorNum.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} — {result.tempoLabel.toLowerCase()}
              </p>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs text-white/40 mb-1">Chance de recuperação</p>
            <p className={`text-5xl font-bold ${cor.text}`}>{result.prob}%</p>
            <p className={`text-xs font-semibold ${cor.text} mt-1`}>{cor.label}</p>
          </div>
        </div>

        <div className="progress-bar mb-2">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${cor.bg}`}
            style={{ width: `${result.prob}%` }}
          />
        </div>
        <p className="text-[0.65rem] text-white/30">
          * Estimativa baseada em dados do BCB, Febraban e jurisprudência. Cada caso é único.
        </p>
      </div>

      {/* Prazo-chave */}
      <div className="card border-amber-500/20 bg-amber-500/5">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-white text-sm">Prazo mais importante</p>
            <p className="text-sm text-white/70 mt-1">{result.golpe.prazoChave}</p>
          </div>
        </div>
      </div>

      {/* ── O que você precisa (travado) ──────────────────────────────────── */}
      <div className="card border-orange-500/30 bg-gradient-to-b from-orange-500/10 to-transparent">
        <div className="text-center">
          <h3 className="font-bold text-white text-xl mb-2">
            Seu plano de recuperação está pronto
          </h3>
          <p className="text-sm text-white/60 mb-6">
            Identificamos {result.golpe.docs.length} documento{result.golpe.docs.length > 1 ? 's' : ''} jurídico{result.golpe.docs.length > 1 ? 's' : ''} que você precisa
            e {result.golpe.caminhos.length} passo{result.golpe.caminhos.length > 1 ? 's' : ''} para recuperar seu dinheiro.
          </p>

          {/* Itens travados — só mostra quantidade, não o conteúdo */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <Lock className="w-3.5 h-3.5 text-white/25" />
              </div>
              <p className="text-2xl font-bold text-white">{result.golpe.docs.length}</p>
              <p className="text-xs text-white/40 mt-1">Documentos jurídicos</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <Lock className="w-3.5 h-3.5 text-white/25" />
              </div>
              <p className="text-2xl font-bold text-white">{result.golpe.caminhos.length}</p>
              <p className="text-xs text-white/40 mt-1">Passos para recuperação</p>
            </div>
          </div>

          {/* Linhas borradas simulando conteúdo travado */}
          <div className="space-y-2 mb-6 select-none">
            {Array.from({ length: Math.min(result.golpe.docs.length, 4) }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-4 h-4 rounded bg-white/10 shrink-0" />
                <div className="flex-1 h-3 rounded bg-white/[0.08] blur-[4px]" />
                <Lock className="w-3.5 h-3.5 text-white/15 shrink-0" />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-5">
            {[
              'Linguagem de advogado',
              'Guia passo a passo completo',
              'PDF pronto para protocolar',
              'Garantia 7 dias',
            ].map((t) => (
              <span key={t} className="text-[0.65rem] px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                <CheckCircle className="w-3 h-3 inline mr-1" />{t}
              </span>
            ))}
          </div>

          <Link href="/ferramentas/pacote-completo" className="btn-primary w-full justify-center py-4 text-base">
            <Zap className="w-5 h-5" />
            Desbloquear plano completo — R$47
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-xs text-white/30 mt-3">
            Pagamento único via Pix. Sem mensalidade. Garantia de 7 dias.
          </p>
        </div>
      </div>

      {/* ── Email capture ─────────────────────────────────────────────────── */}
      <div className="card border-white/10">
        {!emailSalvo ? (
          <>
            <p className="text-sm text-white/60 mb-3">
              Quer receber este diagnóstico por e-mail com dicas personalizadas?
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="input flex-1"
              />
              <button onClick={handleSalvarEmail} className="btn-secondary shrink-0">
                Enviar
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-4 h-4" />
            Diagnóstico enviado! Verifique seu e-mail.
          </div>
        )}
      </div>

      {/* Nova análise */}
      <button
        onClick={() => { setResult(null); setTipo(''); setValor(''); setValorDisplay(''); setTempo(''); setEmailSalvo(false); setEmail(''); }}
        className="btn-secondary w-full justify-center text-sm"
      >
        Fazer nova análise
      </button>
    </div>
  );
}
