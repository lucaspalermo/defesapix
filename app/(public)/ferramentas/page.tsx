import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Lock, Zap, Search, Shield, Clock, CheckCircle, FileText, Bell, Scale, Building2 } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Recupere seu Dinheiro — Kit de Documentos Jurídicos para Golpe Digital',
  description:
    'Diagnóstico gratuito do seu caso + Kit Completo com até 5 documentos jurídicos prontos por R$47. Contestação MED, BO, notificação bancária, reclamação BACEN e Procon.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas' },
};

const DOCS = [
  { icon: Shield, label: 'Contestação MED', color: 'text-red-400' },
  { icon: FileText, label: 'Boletim de Ocorrência', color: 'text-blue-400' },
  { icon: Bell, label: 'Notificação Bancária', color: 'text-green-400' },
  { icon: Scale, label: 'Reclamação BACEN', color: 'text-amber-400' },
  { icon: Building2, label: 'Reclamação Procon', color: 'text-purple-400' },
];

export default function FerramentasPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas' }]} />

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <div className="alert-danger mb-6 max-w-2xl mx-auto">
            <Clock className="w-5 h-5 shrink-0" />
            <span>
              <strong>Tempo é fundamental:</strong> O MED deve ser acionado em até 72h. Quanto mais rápido, maior a chance.
            </span>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] text-white mb-4">
            Recupere seu dinheiro<br />
            <span className="gradient-text">em 15 minutos</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Documentos jurídicos com linguagem profissional, prontos para protocolar
            em banco, delegacia, BACEN e Procon.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl space-y-6">

          {/* ── PASSO 1: Diagnóstico ─────────────────────────────────── */}
          <Link
            href="/ferramentas/diagnostico"
            className="card group hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center gap-5 border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Search className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                <span className="text-[0.65rem] font-bold text-emerald-400 uppercase tracking-wider">Passo 1</span>
                <span className="badge badge-green">Gratuito — 30 segundos</span>
              </div>
              <h2 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                Diagnóstico do seu caso
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Descubra sua chance de recuperação, quais documentos precisa e os prazos que não pode perder.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-emerald-400/50 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
          </Link>

          {/* ── PASSO 2: Kit Completo ─────────────────────────────────── */}
          <Link
            href="/ferramentas/pacote-completo"
            className="card group hover:-translate-y-0.5 transition-all duration-200 border-ember-500/40 bg-ember-500/5 hover:border-ember-500/60"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform bg-gradient-to-br from-ember-500 to-ember-700 shadow-ember-glow">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <span className="text-[0.65rem] font-bold text-ember-400 uppercase tracking-wider">Passo 2</span>
                  <span className="badge badge-yellow">R$47 — pagamento único</span>
                </div>
                <h2 className="font-bold text-lg text-white group-hover:text-ember-300 transition-colors">
                  Kit Completo de Recuperação
                </h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Preencha uma vez, receba até 5 documentos jurídicos profissionais + guia passo a passo completo.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-ember-400/50 group-hover:text-ember-400 group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
            </div>

            {/* Documents grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5 pt-5 border-t border-white/[0.06]">
              {DOCS.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03]">
                  <Icon className={`w-4 h-4 ${color} shrink-0`} />
                  <span className="text-xs text-white/60 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </Link>

          {/* ── Comparativo ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
              <p className="text-xs text-white/30 uppercase tracking-wider mb-2">Com advogado particular</p>
              <p className="text-2xl font-black text-white/40 line-through">R$500 — R$2.000</p>
              <p className="text-xs text-white/25 mt-1">Consulta + documentos + acompanhamento</p>
            </div>
            <div className="p-5 rounded-xl bg-ember-500/10 border border-ember-500/20 text-center">
              <p className="text-xs text-ember-400 uppercase tracking-wider font-bold mb-2">Com DefesaPix</p>
              <p className="text-2xl font-black text-white">R$47 <span className="text-sm font-normal text-white/40">pagamento único</span></p>
              <p className="text-xs text-white/40 mt-1">Mesmos documentos + guia completo + IA</p>
            </div>
          </div>

          {/* ── Trust badges ───────────────────────────────────────────── */}
          <div className="flex flex-wrap justify-center gap-3">
            {['Linguagem de advogado', 'PDF pronto para protocolar', 'Garantia 7 dias', 'LGPD compliant'].map((t) => (
              <span key={t} className="text-[0.65rem] px-3 py-1.5 rounded-full bg-white/[0.04] text-white/40 border border-white/[0.08]">
                <CheckCircle className="w-3 h-3 inline mr-1 text-green-500/60" />{t}
              </span>
            ))}
          </div>

          {/* Security notice */}
          <div className="alert-info">
            <Lock className="w-5 h-5 shrink-0" />
            <div>
              <strong className="block text-sm">Seus dados estão protegidos</strong>
              <p className="text-sm text-white/60 mt-1">
                Documentos gerados localmente no navegador. Nenhum dado armazenado sem autorização.
                Conformidade com a LGPD.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
