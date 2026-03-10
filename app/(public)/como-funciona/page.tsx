import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield, FileText, CheckCircle, ArrowRight,
  Clock, Zap, X, Scale, Lock,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Como Funciona a DefesaPix — Recupere seu Dinheiro em 4 Passos',
  description:
    'Veja como a DefesaPix funciona: diagnóstico gratuito com IA, geração de 5 documentos jurídicos personalizados e guia passo a passo para recuperar seu dinheiro após golpe digital.',
  alternates: { canonical: 'https://defesapix.com.br/como-funciona' },
};

const STEPS = [
  {
    n: '01',
    Icon: Zap,
    title: 'Descreva o golpe',
    desc: 'Use nosso diagnóstico gratuito com IA. Descreva o que aconteceu com suas palavras. Nossa inteligência artificial identifica o tipo de golpe, a urgência e os documentos necessários.',
    badge: 'Grátis',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    time: '30 segundos',
  },
  {
    n: '02',
    Icon: Shield,
    title: 'Escolha seu Kit',
    desc: 'Kit Completo (R$47) com 5 documentos essenciais ou Kit Premium (R$97) com 6 documentos + petição para Juizado Especial Cível. Pagamento via Pix, liberação instantânea.',
    badge: 'A partir de R$47',
    badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    time: '1 minuto',
  },
  {
    n: '03',
    Icon: FileText,
    title: 'Preencha seus dados',
    desc: 'Preencha um único formulário com seus dados pessoais e os detalhes do golpe. Nosso sistema gera todos os documentos personalizados com as citações legais corretas (CDC, Súmula 479 STJ, Resolução BCB 93/2021).',
    badge: 'Automatizado',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    time: '10 minutos',
  },
  {
    n: '04',
    Icon: CheckCircle,
    title: 'Protocole e recupere',
    desc: 'Baixe todos os documentos em PDF. Siga o guia passo a passo incluído. Cada documento indica exatamente onde e como protocolar.',
    badge: 'Download imediato',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
    time: '5 minutos',
  },
];

const ANTES = [
  'Horas pesquisando leis',
  'Documentos rejeitados por erros',
  'Perde prazos legais',
  'Golpista move o dinheiro',
];

const DEPOIS = [
  '15 minutos para tudo',
  'Documentos com fundamentação legal correta',
  'Prazos respeitados automaticamente',
  'MED bloqueia valores rapidamente',
];

const DOCS_KIT_COMPLETO = [
  {
    title: 'Boletim de Ocorrência (BO)',
    desc: 'Modelo completo pronto para registro na delegacia, com todos os detalhes do golpe já preenchidos.',
  },
  {
    title: 'Contestação MED',
    desc: 'Solicitação formal do Mecanismo Especial de Devolução ao banco, com fundamentação na Resolução BCB nº 93/2021.',
  },
  {
    title: 'Notificação Bancária Formal',
    desc: 'Notificação extrajudicial ao banco com base no CDC, exigindo providências e responsabilização.',
  },
  {
    title: 'Reclamação BACEN',
    desc: 'Reclamação formal ao Banco Central contra a instituição financeira, forçando resposta obrigatória.',
  },
  {
    title: 'Reclamação Procon',
    desc: 'Reclamação ao Procon para instaurar processo administrativo contra o banco por falha na segurança.',
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Como Funciona' }]} />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="bg-hero-gradient py-20 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-gradient flex items-center justify-center mx-auto mb-6 shadow-green-glow">
            <Shield className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            Como a <span className="gradient-text">DefesaPix</span> funciona
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Recuperar seu dinheiro após um golpe digital não precisa ser complicado.
            Em 4 passos simples, você tem todos os documentos jurídicos prontos para agir.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ferramentas/diagnostico" className="btn-primary">
              Começar diagnóstico grátis <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/ferramentas/pacote-completo" className="btn-secondary">
              Ver Kit Completo — R$47
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 4 STEPS ══════════════════════════════════════════ */}
      <section className="section">
        <div className="container max-w-5xl">
          <h2 className="section-title text-center mb-4">4 passos para recuperar seu dinheiro</h2>
          <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
            Do diagnóstico ao protocolo — tudo em menos de 15 minutos.
          </p>

          <div className="relative space-y-8">
            {/* Connecting line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-green-500/40 via-green-500/20 to-transparent hidden md:block" />

            {STEPS.map((step) => {
              const Icon = step.Icon;
              return (
                <div key={step.n} className="card relative flex flex-col md:flex-row gap-6 items-start border-white/5 hover:border-green-500/20 transition-colors">
                  {/* Step number */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-green-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-green-500 font-bold">PASSO {step.n}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${step.badgeColor}`}>
                        {step.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.desc}</p>
                    <div className="flex items-center gap-2 mt-3 text-sm text-white/40">
                      <Clock className="w-4 h-4" />
                      <span>{step.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ ANTES VS DEPOIS ══════════════════════════════════ */}
      <section className="section bg-white/[0.02]">
        <div className="container max-w-5xl">
          <h2 className="section-title text-center mb-12">Antes vs Depois da DefesaPix</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SEM DefesaPix */}
            <div className="card border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <X className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-bold text-red-400 text-lg">Sem DefesaPix</h3>
              </div>
              <ul className="space-y-4">
                {ANTES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400/60 shrink-0 mt-0.5" />
                    <span className="text-white/60">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* COM DefesaPix */}
            <div className="card border-green-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-bold text-green-400 text-lg">Com DefesaPix</h3>
              </div>
              <ul className="space-y-4">
                {DEPOIS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400/60 shrink-0 mt-0.5" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══ O QUE ESTÁ INCLUÍDO — KIT COMPLETO ═══════════════ */}
      <section className="section">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-4">
              Kit Completo — R$47
            </span>
            <h2 className="section-title mb-3">O que está incluído</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              5 documentos jurídicos personalizados, com fundamentação legal correta, prontos para protocolar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCS_KIT_COMPLETO.map((doc, i) => (
              <div key={doc.title} className="card border-white/5 hover:border-green-500/20 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-xs font-mono text-green-500/60">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-bold text-white mb-2 text-sm">{doc.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{doc.desc}</p>
              </div>
            ))}

            {/* Bonus: Guia */}
            <div className="card border-white/5 hover:border-green-500/20 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="text-xs font-mono text-yellow-500/60">BONUS</span>
              </div>
              <h3 className="font-bold text-white mb-2 text-sm">Guia Passo a Passo</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Instruções detalhadas de onde e como protocolar cada documento, com prazos e dicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ KIT PREMIUM ══════════════════════════════════════ */}
      <section className="section bg-white/[0.02]">
        <div className="container max-w-4xl">
          <div className="card border-yellow-500/20 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-yellow-500/[0.05] rounded-full blur-[80px] pointer-events-none" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5">
                  Kit Premium — R$97
                </span>
                <span className="text-xs text-white/40">Tudo do Kit Completo +</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Petição Inicial para <span className="text-yellow-400">Juizado Especial Cível</span>
              </h2>

              <p className="text-white/60 leading-relaxed mb-6 max-w-3xl">
                Processe o banco sem precisar de advogado para causas de até 20 salários mínimos.
                Petição completa com fundamentação jurídica robusta, pronta para protocolar no JEC mais perto de você.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Scale, label: 'Súmula 479 STJ', desc: 'Responsabilidade objetiva do banco' },
                  { icon: Shield, label: 'CDC art. 14', desc: 'Defeito na prestação do serviço' },
                  { icon: Lock, label: 'Lei 14.155/2021', desc: 'Fraude em dispositivo eletrônico' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                      <Icon className="w-5 h-5 text-yellow-400 mb-2" />
                      <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                      <p className="text-xs text-white/50">{item.desc}</p>
                    </div>
                  );
                })}
              </div>

              <Link href="/ferramentas/pacote-completo" className="btn-primary bg-yellow-500 hover:bg-yellow-400 text-black font-bold">
                Kit Premium — R$97 <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA FINAL ════════════════════════════════════════ */}
      <section className="section">
        <div className="container max-w-3xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-gradient flex items-center justify-center mx-auto mb-6 shadow-green-glow">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-heading">
            Pronto para recuperar seu dinheiro?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Comece pelo diagnóstico gratuito. Em 30 segundos você sabe exatamente o que precisa fazer.
            Sem compromisso, sem cadastro.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/ferramentas/diagnostico" className="btn-primary text-lg px-8 py-4">
              Comece pelo diagnóstico grátis <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/ferramentas/pacote-completo" className="btn-secondary text-lg px-8 py-4">
              Kit Completo — R$47
            </Link>
          </div>
          <p className="text-xs text-white/30 mt-6">
            Pagamento seguro via Pix. Garantia de 7 dias. Documentos gerados instantaneamente.
          </p>
        </div>
      </section>
    </>
  );
}
