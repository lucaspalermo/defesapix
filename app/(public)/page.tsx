import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Shield, AlertTriangle, CheckCircle, ArrowRight,
  Zap, FileText, ChevronRight, Clock, Star, Lock,
  TrendingUp, Users, Building2, ShieldCheck, Scale,
  Smartphone, CreditCard, Heart, Briefcase, TrendingDown,
  Globe, BarChart3, Database, PhoneOff,
} from 'lucide-react';
import GolpeClassifier from '@/components/home/GolpeClassifier';
import PricingSection from '@/components/home/PricingSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsSection from '@/components/home/StatsSection';
import FAQSection from '@/components/home/FAQSection';
import ReviewSchema from '@/components/seo/ReviewSchema';

export const metadata: Metadata = {
  title: 'Golpe Pix: O Que Fazer? Recupere seu Dinheiro',
  description:
    'Caiu num golpe via Pix? Diagnóstico gratuito em 30s + Kit Completo com 5 documentos jurídicos por R$47. Contestação MED, BO, notificação bancária. Prazo MED: 72h — aja agora.',
  alternates: { canonical: 'https://defesapix.com.br' },
};

const GOLPE_TYPES = [
  { Icon: Zap,         label: 'Golpe via Pix',      href: '/golpes/golpe-pix',          badge: 'CRÍTICA', color: 'red'    },
  { Icon: Smartphone,  label: 'Clonagem WhatsApp',  href: '/golpes/golpe-whatsapp',     badge: 'ALTA',    color: 'orange' },
  { Icon: FileText,    label: 'Boleto Falso',        href: '/golpes/golpe-boleto',       badge: 'ALTA',    color: 'orange' },
  { Icon: Heart,       label: 'Golpe do Amor',       href: '/golpes/golpe-romance',      badge: 'MÉDIA',   color: 'pink'   },
  { Icon: Briefcase,   label: 'Emprego Falso',       href: '/golpes/golpe-emprego',      badge: 'MÉDIA',   color: 'yellow' },
  { Icon: BarChart3,   label: 'Investimento Falso',  href: '/golpes/golpe-investimento', badge: 'ALTA',    color: 'orange' },
  { Icon: Globe,       label: 'App / Site Falso',    href: '/golpes/golpe-clone-app',    badge: 'CRÍTICA', color: 'red'    },
];

const STEPS = [
  { n: '01', Icon: AlertTriangle, title: 'Descreva o golpe', desc: 'Conte o que aconteceu. Nossa IA classifica o tipo automaticamente em segundos.' },
  { n: '02', Icon: Zap,           title: 'Receba seu plano', desc: 'Plano de ação com prioridades, prazos legais e documentos necessários.' },
  { n: '03', Icon: FileText,      title: 'Gere documentos',  desc: 'MED, BO, notificação bancária — todos prontos, corretos e no formato certo.' },
  { n: '04', Icon: BarChart3,     title: 'Acompanhe o caso', desc: 'Dashboard com o andamento e lembretes dos prazos críticos.' },
];

const FEATURES = [
  { icon: Clock,       badge: 'ember',  title: 'Resposta em 72h',     desc: 'O MED pode bloquear valores em até 72h. Cada hora conta.' },
  { icon: FileText,    badge: 'gold',   title: 'Documentos Jurídicos', desc: 'Modelos redigidos por especialistas em direito digital.' },
  { icon: ShieldCheck, badge: 'green',  title: 'LGPD Compliant',      desc: 'Seus dados nunca são vendidos. Conformidade total com a LGPD.' },
  { icon: Users,       badge: 'blue',   title: 'Rede de Parceiros',   desc: 'Acesso a advogados especializados em crimes digitais.' },
  { icon: Database,    badge: 'violet', title: 'Histórico do Caso',   desc: 'Acompanhe cada passo da sua recuperação no dashboard.' },
  { icon: Lock,        badge: 'green',  title: 'Acesso Seguro',        desc: 'SSL, autenticação e criptografia. Só você acessa seus dados.' },
];

const faqItems = [
  { question: 'Golpe Pix: o que fazer imediatamente?', answer: 'Aja imediatamente: (1) Ligue para o SAC do seu banco e solicite o acionamento do MED; (2) Registre um Boletim de Ocorrência online; (3) Guarde todos os comprovantes da transação; (4) Use a DefesaPix para gerar todos os documentos em minutos.' },
  { question: 'O que é o MED (Mecanismo Especial de Devolução)?', answer: 'O MED é um mecanismo do Banco Central (Resolução BCB nº 93/2021) que permite bloquear valores enviados via Pix em casos de fraude. O banco tem 72 horas para analisar e, se comprovada a fraude, bloquear os recursos. Você tem 80 dias para solicitar.' },
  { question: 'Dá para recuperar dinheiro após golpe Pix?', answer: 'Sim, é possível, mas depende da rapidez da ação. O MED tem conseguido devolver valores em casos onde o dinheiro ainda está na conta fraudulenta. Nossa plataforma aumenta suas chances ao garantir que todos os passos corretos sejam seguidos dentro dos prazos legais.' },
  { question: 'Preciso de advogado para recuperar dinheiro de golpe?', answer: 'Para a maioria dos casos, você pode iniciar o processo sem advogado usando nossos documentos modelo. Para valores acima de R$10.000 ou casos complexos, recomendamos nossos parceiros jurídicos, que oferecem avaliação gratuita.' },
  { question: 'Em quanto tempo posso recuperar o dinheiro?', answer: 'O prazo varia: o MED pode desbloquear em 7 a 20 dias; a contestação bancária leva em média 30 dias; ação judicial pode levar meses. Por isso é fundamental agir imediatamente com os documentos corretos.' },
];

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#09090F] bg-diagonal-pattern pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-ember-600/[0.06] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-600/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-900/50 text-red-300 rounded-full px-4 py-2 text-xs font-bold mb-8 uppercase tracking-wider">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                </span>
                Ative o MED em até 72h — cada hora conta
              </div>

              <h1 className="font-heading text-[clamp(2.4rem,5vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] text-white mb-6">
                Sofreu um{' '}
                <span className="gradient-text">Golpe Digital</span>?
                <br />
                Aja agora.
                <br />
                <span className="text-white/50 font-bold text-[0.72em]">Recupere seu dinheiro.</span>
              </h1>

              <p className="text-lg text-white/40 leading-relaxed mb-8 max-w-xl">
                A maior plataforma brasileira para recuperação após golpes digitais. Documentos jurídicos em minutos, plano de ação personalizado e rede de especialistas.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href="/ferramentas/diagnostico" className="btn-primary text-base px-8 py-4">
                  <Shield className="w-5 h-5" />
                  Diagnosticar meu caso grátis
                </Link>
                <Link href="/ferramentas/pacote-completo" className="btn-secondary text-base px-8 py-4">
                  <Zap className="w-4 h-4" />
                  Kit Completo — R$47
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/30">
                {['Sem advogado necessário', 'Documentos em 15 min', 'R$47 pagamento único'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Case card com float animation */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-ember-500/[0.06] rounded-3xl blur-[60px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-500/[0.06] rounded-full blur-3xl" />

              <div className="relative w-full max-w-sm float-card">
                {/* Floating success badge */}
                <div className="absolute -top-4 -right-4 z-10 flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-green-glow whitespace-nowrap animate-bounce-icon">
                  <CheckCircle className="w-3 h-3" />
                  73% chance de recuperação
                </div>

                <div className="bg-[#111228] border border-white/[0.09] rounded-2xl p-5 shadow-[0_24px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(249,115,22,0.06)]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                      {/* Animated shield icon */}
                      <div className="relative w-8 h-8">
                        <div className="absolute -inset-1 rounded-xl bg-ember-gradient opacity-30 blur-sm animate-pulse-slow" />
                        <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-ember-500 to-ember-700 flex items-center justify-center shadow-ember-glow">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[0.55rem] text-white/20 font-mono tracking-widest uppercase">Caso #CDD-2847</p>
                        <p className="text-sm font-bold text-white leading-tight">Golpe via Pix</p>
                      </div>
                    </div>
                    {/* Pulsing critical badge */}
                    <div className="flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 text-red-400 text-[0.65rem] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                      </span>
                      Crítica
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2.5 mb-5 bg-white/[0.02] rounded-xl p-3.5 border border-white/[0.04]">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/30 flex items-center gap-1.5">
                        <TrendingDown className="w-3 h-3 text-red-400" />
                        Valor perdido
                      </span>
                      <span className="font-mono font-black text-white tracking-tight">R$ 4.800,00</span>
                    </div>
                    <div className="h-px bg-white/[0.05]" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/30 flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3 text-green-400" />
                        Prob. recuperação
                      </span>
                      <span className="font-black text-green-400">73%</span>
                    </div>
                    <div className="h-px bg-white/[0.05]" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/30 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-ember-400" />
                        Prazo MED
                      </span>
                      {/* Animated countdown */}
                      <span className="countdown-badge">
                        <Zap className="w-3 h-3" /> 68:14:33
                      </span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-5">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/30">Score de recuperação</span>
                      <span className="text-white/45 font-mono">73/100</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">
                      <div className="h-full rounded-full w-3/4" style={{ background: 'linear-gradient(90deg, #F97316, #10B981)' }} />
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/15">
                      <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      <span className="text-xs text-green-300 font-medium">BO registrado com sucesso</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-ember-500/15 border border-ember-500/30 animate-pulse">
                      <Zap className="w-3.5 h-3.5 text-ember-400 shrink-0" />
                      <span className="text-xs text-ember-300 font-bold">Acionar MED — URGENTE</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03]">
                      <div className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" />
                      <span className="text-xs text-white/25">Notificar banco formalmente</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.03]">
                      <div className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0" />
                      <span className="text-xs text-white/25">Acompanhar resposta bancária</span>
                    </div>
                  </div>
                </div>

                {/* Bottom floating card */}
                <div className="absolute -bottom-4 -left-4 bg-[#111228] border border-white/[0.08] rounded-xl px-3 py-2.5 flex items-center gap-2.5 shadow-xl">
                  <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                    <Star className="w-3.5 h-3.5 text-green-400" fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">4.847 casos</p>
                    <p className="text-[0.62rem] text-white/30 mt-0.5">resolvidos este mês</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════ */}
      <StatsSection />

      {/* ══ TIPO DE GOLPE ══════════════════════════════════════ */}
      <section className="py-12 border-b border-white/[0.05] bg-[#0B0B12]">
        <div className="container">
          <p className="text-center text-[0.62rem] font-black text-white/18 uppercase tracking-[0.2em] mb-7">
            Qual tipo de golpe você sofreu?
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {GOLPE_TYPES.map((g) => {
              const { Icon } = g;
              const colorMap = {
                red:    { bg: 'bg-red-500/10',    border: 'border-red-500/20',    icon: 'text-red-400',    hover: 'hover:border-red-500/40 hover:bg-red-500/15' },
                orange: { bg: 'bg-ember-500/10',  border: 'border-ember-500/20',  icon: 'text-ember-400',  hover: 'hover:border-ember-500/40 hover:bg-ember-500/15' },
                yellow: { bg: 'bg-amber-500/10',  border: 'border-amber-500/20',  icon: 'text-amber-400',  hover: 'hover:border-amber-500/40 hover:bg-amber-500/15' },
                pink:   { bg: 'bg-pink-500/10',   border: 'border-pink-500/20',   icon: 'text-pink-400',   hover: 'hover:border-pink-500/40 hover:bg-pink-500/15' },
              };
              const c = colorMap[g.color as keyof typeof colorMap] || colorMap.orange;
              return (
                <Link
                  key={g.href}
                  href={g.href}
                  className={`group flex flex-col items-center text-center gap-2 p-3.5 rounded-2xl border ${c.bg} ${c.border} ${c.hover} transition-all duration-200 hover:-translate-y-0.5`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.05] border border-white/[0.06] group-hover:scale-110 transition-transform ${c.icon}`}>
                    <Icon className="w-4.5 h-4.5" strokeWidth={1.75} />
                  </div>
                  <span className="text-[0.72rem] font-semibold text-white/50 group-hover:text-white transition-colors leading-tight">{g.label}</span>
                  <span className={`text-[0.55rem] font-black uppercase tracking-wide px-1.5 py-0.5 rounded-full ${
                    g.badge === 'CRÍTICA' ? 'bg-red-500/20 text-red-400' :
                    g.badge === 'ALTA'    ? 'bg-amber-500/20 text-amber-400' :
                                           'bg-blue-500/20 text-blue-400'
                  }`}>{g.badge}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ EMERGÊNCIA RÁPIDA ════════════════════════════════════ */}
      <section className="py-7 border-b border-white/[0.05] bg-[#0C0810]">
        <div className="container">
          <p className="text-center text-[0.62rem] font-black text-red-400/60 uppercase tracking-[0.2em] mb-4">
            Situação de emergência? Vá direto ao ponto
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto">
            <Link
              href="/golpes/roubo-celular"
              className="group flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/25 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <PhoneOff className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight">Celular roubado agora</p>
                <p className="text-xs text-white/40 mt-0.5">Bloqueie SIM, banco e IMEI</p>
              </div>
              <ArrowRight className="w-4 h-4 text-red-400/40 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/ferramentas/pacote-completo"
              className="group flex items-center gap-3 p-4 rounded-2xl bg-ember-500/10 border border-ember-500/25 hover:bg-ember-500/20 hover:border-ember-500/50 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-ember-500/20 border border-ember-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Zap className="w-4 h-4 text-ember-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight">Golpe Pix — Agir agora</p>
                <p className="text-xs text-white/40 mt-0.5">3 documentos em 15 minutos</p>
              </div>
              <ArrowRight className="w-4 h-4 text-ember-400/40 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/golpes/golpe-falso-advogado"
              className="group flex items-center gap-3 p-4 rounded-2xl bg-violet-500/10 border border-violet-500/25 hover:bg-violet-500/20 hover:border-violet-500/50 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Scale className="w-4 h-4 text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight">Falso advogado me ligou</p>
                <p className="text-xs text-white/40 mt-0.5">Verifique OAB antes de pagar</p>
              </div>
              <ArrowRight className="w-4 h-4 text-violet-400/40 shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CLASSIFIER ══════════════════════════════════════════ */}
      <section className="section bg-[#0D0D15]">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-ember-400 uppercase tracking-widest mb-4 bg-ember-500/[0.07] border border-ember-500/20 px-4 py-2 rounded-full">
              <Zap className="w-3 h-3" />
              Ferramenta Gratuita
            </div>
            <h2 className="section-title">
              Descreva o golpe.<br />
              Receba seu <span className="gradient-text">plano em 30 segundos</span>
            </h2>
            <p className="section-subtitle mx-auto text-center mt-4">
              Nossa IA classifica o tipo de golpe e gera um plano personalizado com documentos e prazos legais.
            </p>
          </div>
          <GolpeClassifier />
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════ */}
      <section id="como-funciona" className="section">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">Como funciona?</h2>
            <p className="section-subtitle mx-auto text-center">Do relato ao documento oficial em 4 passos simples.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((step, idx) => {
              const { Icon } = step;
              return (
                <div key={step.n} className="card group hover:border-ember-500/25 relative overflow-hidden">
                  {/* Step connector line (desktop) */}
                  {idx < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-7 -right-3 w-6 h-px bg-gradient-to-r from-ember-500/40 to-transparent z-10" />
                  )}
                  {/* Number + Icon double badge */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="step-badge">
                      <span className="font-heading font-black text-white text-sm relative z-10">{step.n}</span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-ember-500/10 group-hover:border-ember-500/20 transition-all">
                      <Icon className="w-4 h-4 text-white/30 group-hover:text-ember-400 transition-colors group-hover:animate-bounce-icon" strokeWidth={1.75} />
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/35 leading-relaxed">{step.desc}</p>
                  {/* shimmer overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-ember-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/ferramentas/diagnostico" className="btn-primary px-8 py-4 text-base">
              Diagnosticar meu caso grátis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FEATURES ════════════════════════════════════════════ */}
      <section className="section bg-[#0D0D15]">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="section-title">Tudo que você precisa para se defender</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="card group hover:border-white/[0.12] flex gap-4 items-start grad-border">
                  {/* Distinct colored icon per feature */}
                  <div className={`icon-badge icon-badge-${f.badge} shrink-0`}>
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white mb-1 text-[0.95rem]">{f.title}</h3>
                    <p className="text-sm text-white/35 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ GOLPE TYPE CARDS ════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-white/30 uppercase tracking-widest mb-4 bg-white/[0.04] border border-white/[0.07] px-4 py-2 rounded-full">
              <Shield className="w-3 h-3" />
              Biblioteca de defesa
            </div>
            <h2 className="section-title">Guias completos por tipo de golpe</h2>
            <p className="section-subtitle mx-auto text-center">
              Orientações jurídicas atualizadas para cada situação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                Icon: Zap,       badge: 'red',    titulo: 'Golpe via Pix',
                href: '/golpes/golpe-pix',
                desc: 'Entenda o MED, os prazos legais e como agir para maximizar suas chances de recuperação.',
                tags: ['MED', '72 horas', 'BACEN'],
                urgencia: 'CRÍTICA',
                stat: '65% recuperam',  statColor: 'text-green-400',
              },
              {
                Icon: Smartphone, badge: 'orange', titulo: 'Clonagem de WhatsApp',
                href: '/golpes/golpe-whatsapp',
                desc: 'Como provar que seu número foi clonado e se proteger de responsabilidade civil.',
                tags: ['BO', 'ANATEL', 'Proteção'],
                urgencia: 'ALTA',
                stat: 'Registre em 24h', statColor: 'text-ember-400',
              },
              {
                Icon: FileText,  badge: 'orange', titulo: 'Boleto Falso',
                href: '/golpes/golpe-boleto',
                desc: 'Como identificar boletos adulterados e contestar pagamentos indevidos junto ao banco.',
                tags: ['Contestação', 'CDC', 'Banco'],
                urgencia: 'ALTA',
                stat: 'CDC obriga estorno', statColor: 'text-ember-400',
              },
              {
                Icon: Heart,     badge: 'violet', titulo: 'Golpe do Amor',
                href: '/golpes/golpe-romance',
                desc: 'Romance scam: como documentar e denunciar perfis falsos que extraem dinheiro.',
                tags: ['Evidências', 'Polícia', 'Meta'],
                urgencia: 'MÉDIA',
                stat: 'Preserve prints',  statColor: 'text-blue-400',
              },
              {
                Icon: Briefcase, badge: 'gold',   titulo: 'Emprego Falso',
                href: '/golpes/golpe-emprego',
                desc: 'Golpe de vaga falsa: como recuperar taxas pagas e denunciar os responsáveis.',
                tags: ['Procon', 'MTE', 'Denúncia'],
                urgencia: 'MÉDIA',
                stat: 'Procon ressarce',  statColor: 'text-gold-400',
              },
              {
                Icon: BarChart3, badge: 'ember',  titulo: 'Investimento Fraudulento',
                href: '/golpes/golpe-investimento',
                desc: 'Pirâmides e criptomoedas falsas: como acionar CVM e Polícia Federal.',
                tags: ['CVM', 'PF', 'Crypto'],
                urgencia: 'ALTA',
                stat: 'CVM investiga',    statColor: 'text-ember-400',
              },
              {
                Icon: PhoneOff,  badge: 'red',    titulo: 'Roubo de Celular',
                href: '/golpes/roubo-celular',
                desc: 'Protocolo de emergência: bloqueie SIM, banco e IMEI nos primeiros minutos após o roubo.',
                tags: ['SIM', 'IMEI', 'Banco'],
                urgencia: 'CRÍTICA',
                stat: 'Aja em 5 minutos', statColor: 'text-red-400',
              },
              {
                Icon: Scale,     badge: 'violet', titulo: 'Falso Advogado',
                href: '/golpes/golpe-falso-advogado',
                desc: 'Prometeram recuperar seu dinheiro e pediram honorários? Verifique OAB e denuncie.',
                tags: ['OAB', 'Estelionato', 'BO'],
                urgencia: 'ALTA',
                stat: 'Verifique OAB grátis', statColor: 'text-violet-400',
              },
            ].map((g) => {
              const { Icon } = g;
              const urgBorder  = g.urgencia === 'CRÍTICA' ? 'hover:border-red-500/35'    : g.urgencia === 'ALTA' ? 'hover:border-ember-500/35' : 'hover:border-blue-500/25';
              const urgGlow    = g.urgencia === 'CRÍTICA' ? 'group-hover:shadow-[0_0_40px_rgba(239,68,68,0.12)]' : g.urgencia === 'ALTA' ? 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.10)]' : 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.09)]';
              const badgeCls   = g.urgencia === 'CRÍTICA' ? 'badge-red' : g.urgencia === 'ALTA' ? 'badge-yellow' : 'badge-blue';
              return (
                <Link
                  key={g.href}
                  href={g.href}
                  className={`card group flex flex-col transition-all duration-300 hover:-translate-y-1 ${urgBorder} ${urgGlow}`}
                >
                  {/* Top row: icon badge + urgency */}
                  <div className="flex items-start justify-between mb-5">
                    <div className={`icon-badge icon-badge-${g.badge} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className={
                      g.urgencia === 'CRÍTICA' ? 'badge-red' :
                      g.urgencia === 'ALTA'    ? 'badge-yellow' :
                                                 'badge-blue'
                    }>
                      {g.urgencia}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-white mb-2 text-[0.95rem] group-hover:text-ember-300 transition-colors leading-snug">
                    {g.titulo}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/35 mb-4 leading-relaxed flex-1">{g.desc}</p>

                  {/* Stat highlight */}
                  <div className="flex items-center gap-1.5 mb-4 text-[0.72rem] font-bold">
                    <CheckCircle className={`w-3.5 h-3.5 ${g.statColor} shrink-0`} />
                    <span className={g.statColor}>{g.stat}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {g.tags.map((tag) => (
                      <span key={tag} className="text-[0.62rem] font-semibold bg-white/[0.05] border border-white/[0.07] text-white/30 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                    <span className="text-[0.78rem] font-semibold text-ember-400/50 group-hover:text-ember-400 transition-colors">
                      Ver guia completo
                    </span>
                    <div className="w-6 h-6 rounded-full bg-ember-500/[0.08] border border-ember-500/20 flex items-center justify-center group-hover:bg-ember-500/20 group-hover:translate-x-0.5 transition-all duration-200">
                      <ChevronRight className="w-3.5 h-3.5 text-ember-400/60 group-hover:text-ember-400" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SOCIAL PROOF + PRICING + FAQ ═══════════════════════ */}
      <ReviewSchema reviews={[
        { author: 'M. Santos', rating: 5, text: 'Em menos de 1 hora, a Central gerou meu MED, BO e notificação bancária. Em 12 dias, recebi R$ 4.800 de volta.', date: '2025-01-10' },
        { author: 'J. Ferreira', rating: 5, text: 'Meu WhatsApp foi clonado. A plataforma me ajudou a registrar o BO correto e notificar as autoridades.', date: '2025-01-18' },
        { author: 'A. Lima', rating: 5, text: 'Perdi R$15k num esquema de criptomoedas. O site me conectou com um advogado parceiro que abriu processo.', date: '2025-01-25' },
        { author: 'P. Rodrigues', rating: 5, text: 'Paguei um boleto adulterado. Com o modelo da plataforma, contestei no banco e recuperei tudo em 8 dias.', date: '2025-02-02' },
        { author: 'C. Mendes', rating: 5, text: 'O passo a passo me acalmou e o MED funcionou. Recuperei R$ 2.300 em 15 dias.', date: '2025-02-08' },
        { author: 'R. Costa', rating: 4, text: 'A plataforma me ajudou a documentar tudo e entender meus direitos. O processo judicial está em andamento.', date: '2025-02-14' },
      ]} />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection items={faqItems} />

      {/* ══ FINAL CTA ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-ember-900/35 via-[#09090F] to-[#09090F]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-ember-500/[0.08] rounded-full blur-[80px]" />
        <div className="absolute inset-0 bg-diagonal-pattern" />

        <div className="container relative text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-ember-400 uppercase tracking-widest mb-6 bg-ember-500/[0.07] border border-ember-500/20 px-4 py-2 rounded-full">
            <AlertTriangle className="w-3 h-3" />
            Não perca mais tempo
          </div>

          <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-black text-white leading-[1.05] tracking-tight mb-5">
            Cada hora sem agir<br />
            <span className="gradient-text">reduz suas chances</span>
          </h2>

          <p className="text-lg text-white/35 mb-10 max-w-xl mx-auto">
            O MED tem janela de 72 horas. Gere seus documentos agora e dê o primeiro passo para recuperar seu dinheiro.
          </p>

          <Link href="/ferramentas" className="btn-primary inline-flex text-lg px-10 py-5">
            <Shield className="w-5 h-5" />
            Criar meu plano de defesa — grátis
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-white/20 text-sm mt-5">Sem cartão de crédito. Sem compromisso.</p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-10 border-t border-white/[0.05]">
            {[
              { Icon: Building2,  label: 'BACEN',      desc: 'Regulado',   color: 'text-blue-400/60',   bg: 'bg-blue-500/[0.08]',  border: 'border-blue-500/[0.12]' },
              { Icon: Lock,       label: 'LGPD',       desc: 'Protegido',  color: 'text-green-400/60',  bg: 'bg-green-500/[0.08]', border: 'border-green-500/[0.12]' },
              { Icon: ShieldCheck,label: 'SSL 256-bit', desc: 'Criptografado', color: 'text-ember-400/60', bg: 'bg-ember-500/[0.08]', border: 'border-ember-500/[0.12]' },
              { Icon: Scale,      label: 'Procon',     desc: 'Auditado',   color: 'text-gold-400/60',   bg: 'bg-gold-500/[0.08]',  border: 'border-gold-500/[0.12]' },
            ].map(({ Icon, label, desc, color, bg, border }) => (
              <div key={label} className="flex items-center gap-2.5 group">
                <div className={`w-9 h-9 rounded-xl ${bg} border ${border} flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                  <Icon className={`w-4 h-4 ${color} transition-colors duration-300`} />
                </div>
                <div className="text-left">
                  <span className="block text-[0.65rem] font-bold text-white/30 uppercase tracking-wider leading-none">{label}</span>
                  <span className="block text-[0.6rem] text-white/15 mt-0.5 leading-none">{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
