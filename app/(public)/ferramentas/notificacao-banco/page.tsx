import type { Metadata } from 'next';
import Link from 'next/link';
import { Bell, Shield, ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductSchema from '@/components/seo/ProductSchema';

export const metadata: Metadata = {
  title: 'Notificação Formal ao Banco — Golpe Digital | Gere em Minutos',
  description:
    'Gere a notificação extrajudicial oficial ao banco. CDC e Resolução BACEN. Cria protocolo de responsabilidade legal. Incluso no Kit Completo por R$47.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/notificacao-banco' },
};

export default function NotificacaoBancoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Notificação Bancária' }]} />
      <ProductSchema name="Notificação Formal ao Banco" description="Notificação extrajudicial baseada no CDC e Resolução BACEN. Incluso no Kit Completo." price={47} url="/ferramentas/pacote-completo" />

      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-3xl text-center">
          <span className="badge badge-yellow mb-4">Incluso no Kit Completo — R$47</span>
          <h1 className="text-4xl font-bold text-white mb-4">
            Notificação Formal ao Banco
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Notificação extrajudicial que gera protocolo de responsabilidade legal.
            O banco é obrigado a responder em até 5 dias úteis.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl space-y-6">

          <div className="card border-white/10">
            <h2 className="font-bold text-white text-lg mb-4">O que está incluso na Notificação</h2>
            <ul className="space-y-3">
              {[
                'Fundamentação no Código de Defesa do Consumidor (CDC)',
                'Referência à Resolução BACEN 4.658/2018',
                'Pedido formal de devolução dos valores',
                'Prazo de 5 dias úteis para manifestação do banco',
                'Notificação de que o BACEN será acionado em caso de omissão',
                'Linguagem jurídica profissional aceita por todos os bancos',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="alert-info">
            <Clock className="w-5 h-5 shrink-0" />
            <div>
              <strong className="block text-sm">Por que notificar o banco formalmente?</strong>
              <p className="text-sm text-white/70 mt-1">
                A notificação cria um protocolo oficial de responsabilidade. Se o banco não responder
                em 5 dias úteis, isso fortalece seu caso em uma ação judicial ou reclamação no BACEN.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="card border-ember-500/30 bg-gradient-to-b from-ember-500/10 to-transparent text-center">
            <h3 className="font-bold text-white text-lg mb-2">
              A notificação é apenas 1 dos 5 documentos que você precisa
            </h3>
            <p className="text-sm text-white/60 mb-6">
              Para pressionar o banco de todos os lados: notificação direta + MED + BACEN + Procon + BO.
              O Kit Completo gera tudo de uma vez.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/diagnostico" className="btn-secondary justify-center">
                <Shield className="w-4 h-4" />
                Fazer diagnóstico grátis
              </Link>
              <Link href="/ferramentas/pacote-completo" className="btn-primary justify-center">
                <Zap className="w-4 h-4" />
                Gerar Kit Completo — R$47
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
