import type { Metadata } from 'next';
import { Zap, Shield, FileText, Bell, Clock, Scale, Building2, CheckCircle } from 'lucide-react';
import PacoteCompleto from '@/components/tools/PacoteCompleto';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductSchema from '@/components/seo/ProductSchema';

export const metadata: Metadata = {
  title: 'Kit Completo de Recuperação — Documentos Jurídicos em 15 minutos | R$47',
  description:
    'Gere de uma só vez: Contestação MED, Boletim de Ocorrência, Notificação Bancária, Reclamação BACEN e Reclamação Procon. Preencha uma vez, receba tudo. R$47 — sem mensalidade.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/pacote-completo' },
};

const BENEFICIOS = [
  { icon: Shield, label: 'Contestação MED', desc: 'Bloqueio cautelar via Pix (72h)', color: 'text-red-400' },
  { icon: FileText, label: 'Boletim de Ocorrência', desc: 'Delegacia eletrônica', color: 'text-blue-400' },
  { icon: Bell, label: 'Notificação Bancária', desc: 'CDC + Resolução BACEN', color: 'text-green-400' },
  { icon: Scale, label: 'Reclamação BACEN', desc: 'Banco Central (MeuBC)', color: 'text-amber-400' },
  { icon: Building2, label: 'Reclamação Procon', desc: 'consumidor.gov.br', color: 'text-purple-400' },
];

export default function PacoteCompletoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Kit Completo' }]} />
      <ProductSchema name="Kit Completo de Recuperação" description="B.O., Contestação MED, Notificação Bancária, Reclamação BACEN e Reclamação Procon em um único pacote." price={47} url="/ferramentas/pacote-completo" />

      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-4xl">
          {/* Urgency badge */}
          <div className="alert-danger mb-6 max-w-2xl mx-auto">
            <Clock className="w-5 h-5 shrink-0" />
            <span>
              <strong>Prazo crítico:</strong> O MED deve ser acionado em até 72h.
              Quanto mais rápido, maior a chance de recuperação.
            </span>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-400">R$47 — pagamento único</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Todos os documentos que você precisa<br />
              <span className="gradient-text">prontos em 15 minutos</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
              Preencha seus dados uma única vez. Receba documentos com linguagem jurídica profissional
              + guia passo a passo personalizado por tipo de golpe.
            </p>

            {/* Comparison line */}
            <p className="text-sm text-white/40 mb-8">
              <span className="line-through text-white/25">Advogado: R$500–R$2.000</span>
              {' '}→ DefesaPix: <span className="text-ember-400 font-bold">R$47</span> (mesma qualidade)
            </p>

            {/* Benefit cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto mb-6">
              {BENEFICIOS.map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
                  <Icon className={`w-5 h-5 ${color} mb-2`} />
                  <p className="text-sm font-semibold text-white leading-tight">{label}</p>
                  <p className="text-xs text-white/50 mt-1">{desc}</p>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-2">
              {['Guia passo a passo', 'IA melhora o texto', 'Garantia 7 dias', 'Pagamento seguro via Pix'].map((t) => (
                <span key={t} className="text-[0.6rem] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/35 border border-white/[0.08]">
                  <CheckCircle className="w-3 h-3 inline mr-1 text-green-500/50" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <PacoteCompleto />
        </div>
      </section>
    </>
  );
}
