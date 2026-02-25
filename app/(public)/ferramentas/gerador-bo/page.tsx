import type { Metadata } from 'next';
import GeradorBO from '@/components/tools/GeradorBO';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductSchema from '@/components/seo/ProductSchema';

export const metadata: Metadata = {
  title: 'Modelo de Boletim de Ocorrência para Golpe Digital',
  description:
    'Gere o modelo completo do Boletim de Ocorrência para crimes digitais. Estelionato digital, golpe Pix, WhatsApp, boleto falso. Conforme o Código Penal e Lei 14.155/2021.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/gerador-bo' },
};

export default function GeradorBOPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Gerador de B.O.' }]} />
      <ProductSchema name="Modelo de Boletim de Ocorrência para Golpe Digital" description="Gere o modelo completo do B.O. para crimes digitais com tipificação penal e fundamentos legais. Incluso no Kit Completo de 5 documentos." price={47} url="/ferramentas/pacote-completo" />
      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <span className="badge-green mb-4">Modelo profissional</span>
          <h1 className="text-4xl font-bold text-white mb-4">
            Modelo de Boletim de Ocorrência
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Preencha seus dados e gere o modelo completo para registrar seu B.O. na Delegacia Eletrônica ou presencialmente.
            Inclui tipificação penal correta e fundamentos legais.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-3xl">
          <GeradorBO />
        </div>
      </section>
    </>
  );
}
