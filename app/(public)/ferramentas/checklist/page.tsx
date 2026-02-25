import type { Metadata } from 'next';
import ChecklistTool from '@/components/tools/ChecklistTool';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Checklist de Ação para Vítimas de Golpe Digital | Central de Defesa Digital',
  description:
    'Checklist interativo e personalizado com todos os passos que você deve tomar após sofrer um golpe digital. Em ordem de urgência e com prazos legais.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/checklist' },
};

export default function ChecklistPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Checklist' }]} />
      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <span className="badge-green mb-4">Gratuito</span>
          <h1 className="text-4xl font-bold text-white mb-4">Checklist de Ação</h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Passo a passo personalizado com tudo que você precisa fazer, em ordem de urgência.
            Nenhum prazo importante será perdido.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-3xl">
          <ChecklistTool />
        </div>
      </section>
    </>
  );
}
