import type { Metadata } from 'next';
import { Zap, Shield, FileText, Bell, Clock } from 'lucide-react';
import PacoteCompleto from '@/components/tools/PacoteCompleto';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductSchema from '@/components/seo/ProductSchema';

export const metadata: Metadata = {
  title: 'Pacote Emergência — 3 Documentos Jurídicos em 15 minutos | Central de Defesa Digital',
  description:
    'Gere de uma só vez: Contestação MED, Boletim de Ocorrência e Notificação Bancária. Preencha uma vez, baixe 3 PDFs prontos para protocolo. R$47 — sem mensalidade.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/pacote-completo' },
};

const BENEFICIOS = [
  { icon: Shield, label: 'Contestação MED', desc: 'Aciona o Mecanismo Especial de Devolução (Pix)', color: 'text-red-400' },
  { icon: FileText, label: 'Boletim de Ocorrência', desc: 'Modelo pronto para delegacia eletrônica', color: 'text-blue-400' },
  { icon: Bell, label: 'Notificação Bancária', desc: 'Notificação formal com base no CDC e BACEN', color: 'text-green-400' },
];

export default function PacoteCompletoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Pacote Completo' }]} />
      <ProductSchema name="Pacote Emergência — 3 Documentos Completos" description="B.O., Contestação MED e Notificação Bancária em um pacote com desconto." price={47} url="/ferramentas/pacote-completo" />
      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-4xl">
          {/* Urgency badge */}
          <div className="alert-danger mb-6 max-w-2xl mx-auto">
            <Clock className="w-5 h-5 shrink-0" />
            <span>
              <strong>Prazo crítico:</strong> O MED deve ser acionado em até 72h após o golpe.
              Quanto mais rápido, maior a chance de recuperação.
            </span>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-semibold text-orange-400">Pacote Emergência — R$47</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              3 documentos jurídicos em 15 minutos
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Preencha seus dados uma única vez e gere todos os documentos que você precisa
              para acionar o banco, a polícia e o BACEN.
            </p>

            {/* Benefit cards */}
            <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto">
              {BENEFICIOS.map(({ icon: Icon, label, desc, color }) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-left"
                >
                  <Icon className={`w-5 h-5 ${color} mb-2`} />
                  <p className="text-sm font-semibold text-white leading-tight">{label}</p>
                  <p className="text-xs text-white/50 mt-1">{desc}</p>
                </div>
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
