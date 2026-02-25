'use client';

import { useState } from 'react';
import { TrendingUp, ArrowRight, CheckCircle, AlertTriangle, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

const BANCOS = [
  'Nubank', 'Itaú', 'Bradesco', 'Santander', 'Banco do Brasil',
  'Caixa Econômica Federal', 'Inter', 'C6 Bank', 'PicPay', 'Mercado Pago', 'Outro',
];

const TIPOS_GOLPE = [
  { value: 'PIX', label: 'Golpe via Pix (MED disponível)', base: 65 },
  { value: 'CARTAO', label: 'Fraude no Cartão', base: 80 },
  { value: 'BOLETO', label: 'Boleto Falso', base: 45 },
  { value: 'WHATSAPP', label: 'Clonagem de WhatsApp', base: 40 },
  { value: 'INVESTIMENTO', label: 'Investimento Falso', base: 20 },
  { value: 'ROMANCE', label: 'Golpe do Amor', base: 25 },
  { value: 'EMPREGO', label: 'Emprego Falso', base: 30 },
  { value: 'CLONE_APP', label: 'App/Site Falso', base: 55 },
  { value: 'OUTRO', label: 'Outro tipo de golpe', base: 35 },
];

interface SimResult {
  probabilidade: number;
  categoria: 'ALTA' | 'MEDIA' | 'BAIXA';
  caminhos: { nome: string; prob: number; desc: string; link?: string }[];
  alertas: string[];
  proximos: string[];
}

function calcularSimulacao(dados: {
  tipo: string;
  valor: number;
  horasDecorridas: number;
  banco: string;
  temBO: boolean;
  acionouBanco: boolean;
}): SimResult {
  const tipoInfo = TIPOS_GOLPE.find((t) => t.value === dados.tipo);
  let prob = tipoInfo?.base || 35;

  // Time decay
  if (dados.horasDecorridas <= 72) prob += 20;
  else if (dados.horasDecorridas <= 168) prob += 10;
  else if (dados.horasDecorridas > 720) prob -= 20;

  // BO boost
  if (dados.temBO) prob += 10;
  if (dados.acionouBanco) prob += 5;

  // Value adjustments
  if (dados.valor < 1000) prob += 10;
  else if (dados.valor > 50000) prob -= 15;

  prob = Math.max(5, Math.min(95, prob));

  const categoria: SimResult['categoria'] =
    prob >= 60 ? 'ALTA' : prob >= 35 ? 'MEDIA' : 'BAIXA';

  const caminhos: SimResult['caminhos'] = [];

  if (dados.tipo === 'PIX' || dados.tipo === 'CLONE_APP') {
    caminhos.push({
      nome: 'MED — Mecanismo Especial de Devolução',
      prob: dados.horasDecorridas <= 72 ? 70 : dados.horasDecorridas <= 720 ? 55 : 35,
      desc: 'Solicitação ao banco para bloqueio cautelar dos valores (Resolução BCB 93/2021)',
      link: '/ferramentas/gerador-contestacao-med',
    });
  }

  if (dados.tipo === 'CARTAO') {
    caminhos.push({
      nome: 'Contestação de transação no cartão',
      prob: 80,
      desc: 'CDC Art. 42 — contestação de compras não reconhecidas em até 60 dias',
    });
  }

  caminhos.push({
    nome: 'Notificação bancária + BACEN',
    prob: 50,
    desc: 'Notificação formal ao banco + reclamação no Banco Central do Brasil',
    link: '/ferramentas/notificacao-banco',
  });

  caminhos.push({
    nome: 'Procon',
    prob: 40,
    desc: 'Intermediação gratuita entre você e o banco/empresa envolvida',
  });

  if (dados.valor > 5000) {
    caminhos.push({
      nome: 'Ação judicial (JEC ou TJ)',
      prob: 35,
      desc: 'Para valores mais altos, ação judicial pode ser viável com advogado parceiro',
      link: '/parceiros',
    });
  }

  const alertas: string[] = [];
  if (dados.horasDecorridas > 72 && dados.tipo === 'PIX') {
    alertas.push('Atenção: já passaram 72h. Mesmo assim, ative o MED pois o prazo total é de 80 dias.');
  }
  if (!dados.temBO) {
    alertas.push('Registre o BO o quanto antes. Ele é necessário para todos os processos seguintes.');
  }
  if (!dados.acionouBanco) {
    alertas.push('Ligue imediatamente para o SAC do seu banco e abra uma solicitação formal.');
  }

  const proximos = [
    !dados.temBO ? 'Registrar BO online' : null,
    !dados.acionouBanco ? 'Ligar para SAC do banco' : null,
    dados.tipo === 'PIX' ? 'Gerar contestação MED' : null,
    'Gerar notificação formal ao banco',
    'Registrar no Banco Central (Meu BC)',
  ].filter(Boolean) as string[];

  return { probabilidade: prob, categoria, caminhos, alertas, proximos };
}

export default function SimuladorRecuperacao() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    tipo: '',
    valor: '',
    horasDecorridas: '',
    banco: '',
    temBO: '',
    acionouBanco: '',
  });
  const [result, setResult] = useState<SimResult | null>(null);

  const updateForm = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSimulate = () => {
    const result = calcularSimulacao({
      tipo: form.tipo,
      valor: parseFloat(form.valor.replace(/[^\d,]/g, '').replace(',', '.')) || 0,
      horasDecorridas: parseFloat(form.horasDecorridas) || 0,
      banco: form.banco,
      temBO: form.temBO === 'sim',
      acionouBanco: form.acionouBanco === 'sim',
    });
    setResult(result);
    setStep(3);
  };

  const corCategoria = {
    ALTA: { text: 'text-green-400', bg: 'bg-green-500', badge: 'badge-green', label: 'Alta probabilidade' },
    MEDIA: { text: 'text-yellow-400', bg: 'bg-yellow-500', badge: 'badge-yellow', label: 'Probabilidade moderada' },
    BAIXA: { text: 'text-red-400', bg: 'bg-red-500', badge: 'badge-red', label: 'Probabilidade baixa' },
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Golpe Info */}
      {step === 1 && (
        <div className="card border-green-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="font-bold text-white">Informações do golpe</h2>
              <p className="text-sm text-white/50">Passo 1 de 2</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="label">Tipo de golpe sofrido</label>
              <select
                value={form.tipo}
                onChange={(e) => updateForm('tipo', e.target.value)}
                className="select"
              >
                <option value="">Selecione o tipo de golpe...</option>
                {TIPOS_GOLPE.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Valor perdido (R$)</label>
              <input
                type="text"
                value={form.valor}
                onChange={(e) => updateForm('valor', e.target.value)}
                placeholder="Ex: 3.500,00"
                className="input"
              />
            </div>

            <div>
              <label className="label">Há quantas horas ocorreu o golpe?</label>
              <select
                value={form.horasDecorridas}
                onChange={(e) => updateForm('horasDecorridas', e.target.value)}
                className="select"
              >
                <option value="">Selecione...</option>
                <option value="12">Menos de 12 horas (hoje)</option>
                <option value="36">Entre 12 e 48 horas</option>
                <option value="60">Entre 2 e 3 dias</option>
                <option value="120">Entre 3 e 7 dias</option>
                <option value="360">Entre 1 semana e 1 mês</option>
                <option value="720">Entre 1 e 3 meses</option>
                <option value="1500">Mais de 3 meses</option>
              </select>
            </div>

            <div>
              <label className="label">Banco da vítima</label>
              <select
                value={form.banco}
                onChange={(e) => updateForm('banco', e.target.value)}
                className="select"
              >
                <option value="">Selecione seu banco...</option>
                {BANCOS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!form.tipo || !form.valor || !form.horasDecorridas}
              className="btn-primary w-full justify-center py-4 disabled:opacity-50"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Actions taken */}
      {step === 2 && (
        <div className="card border-green-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="font-bold text-white">O que você já fez?</h2>
              <p className="text-sm text-white/50">Passo 2 de 2</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="label">Já registrou Boletim de Ocorrência?</label>
              <div className="grid grid-cols-2 gap-3">
                {['sim', 'nao'].map((val) => (
                  <button
                    key={val}
                    onClick={() => updateForm('temBO', val)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${form.temBO === val ? 'border-green-500 bg-green-500/20 text-white' : 'border-white/20 text-white/60 hover:border-white/40'}`}
                  >
                    {val === 'sim' ? '✓ Sim, já registrei' : '✗ Não, ainda não'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label">Já entrou em contato com seu banco?</label>
              <div className="grid grid-cols-2 gap-3">
                {['sim', 'nao'].map((val) => (
                  <button
                    key={val}
                    onClick={() => updateForm('acionouBanco', val)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${form.acionouBanco === val ? 'border-green-500 bg-green-500/20 text-white' : 'border-white/20 text-white/60 hover:border-white/40'}`}
                  >
                    {val === 'sim' ? '✓ Sim, já liguei' : '✗ Não, ainda não'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">
                Voltar
              </button>
              <button
                onClick={handleSimulate}
                disabled={!form.temBO || !form.acionouBanco}
                className="btn-primary flex-1 justify-center disabled:opacity-50"
              >
                <TrendingUp className="w-5 h-5" />
                Simular
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Result */}
      {step === 3 && result && (
        <div className="space-y-6">
          {/* Main result */}
          <div className="card border-green-500/20">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div>
                <h2 className="font-bold text-white text-xl">Resultado da Simulação</h2>
                <span className={`badge ${corCategoria[result.categoria].badge} mt-2`}>
                  {corCategoria[result.categoria].label}
                </span>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/50 mb-1">Probabilidade estimada</p>
                <p className={`text-5xl font-bold ${corCategoria[result.categoria].text}`}>
                  {result.probabilidade}%
                </p>
              </div>
            </div>

            <div className="progress-bar mb-6">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${result.categoria === 'ALTA' ? 'bg-green-gradient' : result.categoria === 'MEDIA' ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${result.probabilidade}%` }}
              />
            </div>

            <p className="text-sm text-white/50">
              * Estimativa baseada em dados do Banco Central, Febraban e jurisprudência brasileira.
              Cada caso é único e os resultados podem variar.
            </p>
          </div>

          {/* Alerts */}
          {result.alertas.length > 0 && (
            <div className="alert-warning">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <div className="space-y-2">
                <strong className="block text-sm">Atenção importante:</strong>
                {result.alertas.map((a, i) => (
                  <p key={i} className="text-sm">{a}</p>
                ))}
              </div>
            </div>
          )}

          {/* Caminhos */}
          <div className="card">
            <h3 className="font-bold text-white mb-4">Caminhos disponíveis</h3>
            <div className="space-y-3">
              {result.caminhos.map((c) => (
                <div key={c.nome} className="border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                    <span className="font-semibold text-white text-sm">{c.nome}</span>
                    <span className={`badge ${c.prob >= 60 ? 'badge-green' : c.prob >= 40 ? 'badge-yellow' : 'badge-red'}`}>
                      ~{c.prob}% chance
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mb-2">{c.desc}</p>
                  {c.link && (
                    <Link href={c.link} className="text-xs text-green-400 hover:text-green-300 font-semibold flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      Gerar documento →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="card">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-400" />
              Próximos passos recomendados
            </h3>
            <ol className="space-y-3">
              {result.proximos.map((p, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  {p}
                </li>
              ))}
            </ol>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/ferramentas" className="btn-primary justify-center">
              <FileText className="w-4 h-4" />
              Gerar documentos
            </Link>
            <button onClick={() => { setStep(1); setResult(null); setForm({ tipo: '', valor: '', horasDecorridas: '', banco: '', temBO: '', acionouBanco: '' }); }} className="btn-secondary justify-center">
              Nova simulação
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
