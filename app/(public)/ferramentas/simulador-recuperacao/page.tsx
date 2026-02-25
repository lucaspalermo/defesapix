import type { Metadata } from 'next';
import SimuladorRecuperacao from '@/components/tools/SimuladorRecuperacao';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Simulador de Recuperação de Pix e Golpe Digital',
  description:
    'Calcule sua probabilidade de recuperar o dinheiro perdido em golpe digital. Baseado no tipo de golpe, valor, banco e tempo decorrido. Gratuito.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/simulador-recuperacao' },
};

export default function SimuladorPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Simulador de Recuperação' }]} />
      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <span className="badge-green mb-4">Ferramenta Gratuita</span>
          <h1 className="text-4xl font-bold text-white mb-4">
            Simulador de Recuperação
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Descubra sua probabilidade de recuperar o dinheiro e quais caminhos têm maior chance de sucesso.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-3xl">
          <SimuladorRecuperacao />
        </div>
      </section>
    </>
  );
}
