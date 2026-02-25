import Link from 'next/link';
import { CheckCircle, X, Zap, Shield, Star, ArrowRight } from 'lucide-react';

const PLANS = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    desc: 'Para começar sua defesa agora',
    cta: 'Começar grátis',
    ctaHref: '/ferramentas',
    highlight: false,
    features: [
      { text: 'Classificação de golpe', included: true },
      { text: 'Plano de ação básico', included: true },
      { text: 'Checklist interativo', included: true },
      { text: 'Guias educativos', included: true },
      { text: 'Simulador de recuperação', included: true },
      { text: 'Modelo de BO em PDF (gratuito)', included: true },
      { text: '3 documentos em PDF', included: false },
      { text: 'Contatos oficiais do banco', included: false },
      { text: 'Revisão por especialista', included: false },
    ],
  },
  {
    id: 'emergencia',
    name: 'Pacote Emergência',
    price: 47,
    desc: '3 documentos prontos em 15 minutos',
    cta: 'Acionar agora',
    ctaHref: '/ferramentas/pacote-completo',
    highlight: true,
    badge: 'Mais popular',
    features: [
      { text: 'Tudo do plano gratuito', included: true },
      { text: 'Contestação MED em PDF', included: true },
      { text: 'Notificação bancária em PDF', included: true },
      { text: 'Contatos oficiais do banco', included: true },
      { text: 'Lembretes de prazo por e-mail', included: true },
      { text: 'Download imediato dos 3 PDFs', included: true },
      { text: 'Revisão por especialista', included: false },
      { text: 'Indicação de advogado', included: false },
    ],
  },
  {
    id: 'revisao',
    name: 'Revisão Especialista',
    price: 97,
    desc: 'Análise humana do seu caso em 24h',
    cta: 'Solicitar revisão',
    ctaHref: '/parceiros',
    highlight: false,
    badge: 'Recomendado',
    features: [
      { text: 'Tudo do Pacote Emergência', included: true },
      { text: 'Análise por especialista em 24h', included: true },
      { text: 'Relatório personalizado do caso', included: true },
      { text: 'Histórico completo do caso', included: true },
      { text: 'Orientação por e-mail', included: true },
      { text: 'Indicação de advogado parceiro', included: true },
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
                {plan.price > 0 && (
                  <p className="text-xs text-white/40 mt-1">pagamento único</p>
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

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-4">
            <Shield className="w-6 h-6 text-green-400 shrink-0" />
            <div className="text-left">
              <p className="font-semibold text-white text-sm">Garantia de 7 dias</p>
              <p className="text-xs text-white/60">Se não ficar satisfeito, devolvemos 100% do valor sem perguntas.</p>
            </div>
          </div>
        </div>

        {/* Partner lawyers banner */}
        <div className="mt-8 card border-yellow-500/20 flex flex-col md:flex-row items-center gap-6 max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="font-bold text-white mb-1">Precisa de um advogado?</h4>
            <p className="text-sm text-white/60">
              Nossa rede de parceiros jurídicos especializados em crimes digitais oferece
              consulta gratuita de 30 min para casos acima de R$5.000.
            </p>
          </div>
          <Link href="/parceiros" className="btn-secondary whitespace-nowrap shrink-0">
            Ver parceiros
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
