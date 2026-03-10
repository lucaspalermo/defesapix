import Link from 'next/link';
import { CheckCircle, X, Zap, Shield, Star, ArrowRight, Scale, Bell } from 'lucide-react';

const PLANS = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    priceLabel: '',
    desc: 'Para começar sua defesa agora',
    cta: 'Começar grátis',
    ctaHref: '/ferramentas',
    highlight: false,
    features: [
      { text: 'Classificação de golpe por IA', included: true },
      { text: 'Plano de ação básico', included: true },
      { text: 'Checklist interativo', included: true },
      { text: 'Guias educativos', included: true },
      { text: 'Simulador de recuperação', included: true },
      { text: 'Calculadora de prazo MED', included: true },
      { text: '5 documentos em PDF', included: false },
      { text: 'Petição para Juizado', included: false },
      { text: 'Monitoramento de CPF', included: false },
    ],
  },
  {
    id: 'emergencia',
    name: 'Kit Completo',
    price: 47,
    priceLabel: 'pagamento único',
    desc: '5 documentos prontos em 15 minutos',
    cta: 'Gerar documentos agora',
    ctaHref: '/ferramentas/pacote-completo',
    highlight: true,
    badge: 'Mais popular',
    features: [
      { text: 'Tudo do plano gratuito', included: true },
      { text: 'Contestação MED personalizada', included: true },
      { text: 'Boletim de Ocorrência completo', included: true },
      { text: 'Notificação Bancária (CDC)', included: true },
      { text: 'Reclamação BACEN', included: true },
      { text: 'Reclamação Procon', included: true },
      { text: 'Guia pós-compra com passo a passo', included: true },
      { text: 'Petição para Juizado Especial', included: false },
      { text: 'Monitoramento de CPF', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Kit Premium',
    price: 97,
    priceLabel: 'pagamento único',
    desc: 'Processe o banco sem advogado',
    cta: 'Kit Premium — R$97',
    ctaHref: '/ferramentas/pacote-completo',
    highlight: false,
    badge: 'Máxima proteção',
    features: [
      { text: 'Tudo do Kit Completo (5 docs)', included: true },
      { text: 'Petição Inicial para JEC', included: true },
      { text: 'Fundamentação legal completa', included: true },
      { text: 'Cálculo de dano moral incluído', included: true },
      { text: 'Pedido de tutela de urgência', included: true },
      { text: 'Sem advogado (até 20 SM)', included: true },
      { text: 'Suporte prioritário', included: true },
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="precos" className="section bg-navy-800/30">
      <div className="container">
        <div className="text-center mb-16">
          <span className="badge-green mb-4">Preços Transparentes</span>
          <h2 className="section-title">
            Comece grátis. Pague só pelo que precisar.
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Sem mensalidades obrigatórias. Sem pegadinha. Você escolhe o nível de ajuda que precisa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.highlight
                  ? 'bg-green-gradient shadow-green-glow border-2 border-green-500/50'
                  : 'card'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 ${plan.highlight ? 'bg-white text-green-600' : 'bg-green-500 text-white'} text-xs font-bold px-4 py-1 rounded-full`}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-white text-lg mb-1">{plan.name}</h3>
                <p className="text-sm text-white/60 mb-4">{plan.desc}</p>
                <div className="flex items-baseline gap-1">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-bold text-white">Grátis</span>
                  ) : (
                    <>
                      <span className="text-lg text-white/60">R$</span>
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                    </>
                  )}
                </div>
                {plan.priceLabel && (
                  <p className="text-xs text-white/40 mt-1">{plan.priceLabel}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-white/80' : 'text-white/30'}`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.ctaHref}
                className={`w-full text-center font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  plan.highlight
                    ? 'bg-navy-900 text-white hover:bg-navy-800'
                    : plan.id === 'free'
                    ? 'btn-secondary'
                    : 'btn-primary'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Assinatura Mensal */}
        <div className="mt-8 card border-blue-500/20 bg-blue-500/5 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
            <Bell className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-white">Alerta DefesaPix</h4>
              <span className="text-xs font-bold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full">R$19/mês</span>
            </div>
            <p className="text-sm text-white/60">
              Monitoramento contínuo do seu CPF + alertas de golpes novos + dicas de prevenção semanais.
              Proteja-se antes que o golpe aconteça.
            </p>
          </div>
          <Link href="/ferramentas/pacote-completo" className="btn-secondary whitespace-nowrap shrink-0">
            Assinar
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Guarantee */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-4">
            <Shield className="w-6 h-6 text-green-400 shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-white text-sm">Garantia de 7 dias</p>
              <p className="text-xs text-white/60">Se não ficar satisfeito, devolvemos 100% do valor sem perguntas.</p>
            </div>
          </div>
        </div>

        {/* JEC banner */}
        <div className="mt-6 card border-violet-500/20 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center shrink-0">
            <Scale className="w-6 h-6 text-violet-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-bold text-white mb-1">Banco negou? Processe sem advogado.</h4>
            <p className="text-sm text-white/60">
              O Kit Premium inclui a <strong className="text-white">Petição Inicial para o Juizado Especial Cível</strong> —
              gratuito para causas até 20 salários mínimos, sem precisar de advogado.
            </p>
          </div>
          <Link href="/ferramentas/pacote-completo" className="btn-primary whitespace-nowrap shrink-0">
            Kit Premium — R$97
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
