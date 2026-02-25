import type { Metadata } from 'next';
import NotificacaoBanco from '@/components/tools/NotificacaoBanco';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductSchema from '@/components/seo/ProductSchema';

export const metadata: Metadata = {
  title: 'Gerador de Notificação Formal ao Banco — Golpe Digital',
  description:
    'Gere a notificação extrajudicial oficial ao banco. Baseada no CDC e Resolução BACEN 4.658/2018. Cria protocolo de responsabilidade legal para recuperação de valores.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/notificacao-banco' },
};

export default function NotificacaoBancoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Notificação Bancária' }]} />
      <ProductSchema name="Notificação Formal ao Banco" description="Gere a notificação extrajudicial oficial ao banco baseada no CDC e Resolução BACEN. Incluso no Kit Completo de 5 documentos." price={47} url="/ferramentas/pacote-completo" />
      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Notificação Formal ao Banco
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Notificação extrajudicial formal que gera protocolo de responsabilidade legal e
            pressiona o banco a analisar seu caso em até 5 dias úteis.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-3xl">
          <NotificacaoBanco />
        </div>
      </section>
    </>
  );
}
