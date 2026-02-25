import type { Metadata } from 'next';
import { Zap, Shield, FileText, Bell, Clock, Scale, Building2 } from 'lucide-react';
import PacoteCompleto from '@/components/tools/PacoteCompleto';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductSchema from '@/components/seo/ProductSchema';

export const metadata: Metadata = {
  title: 'Kit Completo de Recuperação — 5 Documentos Jurídicos em 15 minutos',
  description:
    'Gere de uma só vez: Contestação MED, Boletim de Ocorrência, Notificação Bancária, Reclamação BACEN e Reclamação Procon. Preencha uma vez, baixe 5 PDFs. R$47 — sem mensalidade.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/pacote-completo' },
};

const BENEFICIOS = [
  { icon: FileText, label: 'Contestação MED', desc: 'Aciona o Mecanismo Especial de Devolução (Pix)', color: 'text-red-400' },
  { icon: Shield, label: 'Boletim de Ocorrência', desc: 'Modelo pronto para delegacia eletrônica', color: 'text-blue-400' },
  { icon: Bell, label: 'Notificação Bancária', desc: 'Notificação formal com base no CDC e BACEN', color: 'text-green-400' },
  { icon: Scale, label: 'Reclamação BACEN', desc: 'Reclamação formal ao Banco Central (MeuBC)', color: 'text-purple-400' },
  { icon: Building2, label: 'Reclamação Procon', desc: 'Para consumidor.gov.br ou Procon estadual', color: 'text-amber-400' },
];

export default function PacoteCompletoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Kit Completo' }]} />
      <ProductSchema name="Kit Completo de Recuperação — 5 Documentos" description="B.O., Contestação MED, Notificação Bancária, Reclamação BACEN e Reclamação Procon em um único pacote." price={47} url="/ferramentas/pacote-completo" />
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
              <span className="text-sm font-semibold text-orange-400">Kit Completo — R$47</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              5 documentos jurídicos em 15 minutos
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Preencha seus dados uma única vez e gere todos os documentos que você precisa
              para acionar o banco, a polícia, o BACEN e o Procon.
            </p>

            {/* Benefit cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
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
