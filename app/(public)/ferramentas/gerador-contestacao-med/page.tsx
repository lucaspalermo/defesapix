import type { Metadata } from 'next';
import GeradorMED from '@/components/tools/GeradorMED';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductSchema from '@/components/seo/ProductSchema';

export const metadata: Metadata = {
  title: 'Gerador de Contestação MED — Mecanismo Especial de Devolução Pix',
  description:
    'Gere o documento oficial para acionar o MED e recuperar dinheiro de golpe via Pix. Baseado na Resolução BCB nº 93/2021. Preenchimento guiado em minutos.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/gerador-contestacao-med' },
};

export default function GeradorMEDPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Contestação MED' }]} />
      <ProductSchema name="Contestação MED — Mecanismo Especial de Devolução" description="Gere o documento oficial de contestação MED para recuperar dinheiro de golpe via Pix. Incluso no Kit Completo de 5 documentos." price={47} url="/ferramentas/pacote-completo" />
      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="alert-danger mb-6 max-w-2xl mx-auto">
            <span className="font-bold">72 horas:</span> Para máxima eficácia, o MED deve ser acionado o mais rápido possível.
          </div>
          <div className="text-center">
            <span className="badge-green mb-4">Resolução BCB nº 93/2021</span>
            <h1 className="text-4xl font-bold text-white mb-4">
              Gerador de Contestação MED
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Preencha o formulário abaixo e gere o documento oficial para solicitar ao seu banco o
              acionamento do Mecanismo Especial de Devolução (MED) do Banco Central.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-3xl">
          <GeradorMED />
        </div>
      </section>
    </>
  );
}
