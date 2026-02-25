import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle, Clock, Zap, AlertTriangle } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductSchema from '@/components/seo/ProductSchema';

export const metadata: Metadata = {
  title: 'Contestação MED — Mecanismo Especial de Devolução Pix | Gere em Minutos',
  description:
    'Gere o documento oficial para acionar o MED e recuperar dinheiro de golpe via Pix. Resolução BCB nº 93/2021. Incluso no Kit Completo por R$47.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/gerador-contestacao-med' },
};

export default function GeradorMEDPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Contestação MED' }]} />
      <ProductSchema name="Contestação MED — Mecanismo Especial de Devolução" description="Documento oficial de contestação MED para recuperar dinheiro de golpe via Pix. Incluso no Kit Completo." price={47} url="/ferramentas/pacote-completo" />

      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-3xl">
          <div className="alert-danger mb-6 max-w-2xl mx-auto">
            <Clock className="w-5 h-5 shrink-0" />
            <span>
              <strong>72 horas:</strong> O MED deve ser acionado o mais rápido possível para bloquear os valores.
            </span>
          </div>
          <div className="text-center">
            <span className="badge badge-yellow mb-4">Incluso no Kit Completo — R$47</span>
            <h1 className="text-4xl font-bold text-white mb-4">
              Contestação MED — Mecanismo Especial de Devolução
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Documento oficial para solicitar ao banco o bloqueio cautelar dos valores
              enviados via Pix em caso de fraude. Baseado na Resolução BCB nº 93/2021.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl space-y-6">

          <div className="card border-white/10">
            <h2 className="font-bold text-white text-lg mb-4">O que está incluso na Contestação MED</h2>
            <ul className="space-y-3">
              {[
                'Fundamentação na Resolução BCB nº 93/2021',
                'Solicitação formal de bloqueio cautelar dos valores',
                'Referência ao prazo de 72h para análise pelo banco',
                'Descrição detalhada da fraude e dados da transação',
                'Pedido de devolução integral dos valores',
                'Formato aceito por todos os bancos brasileiros',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="alert-warning">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <strong className="block text-sm">Não perca o prazo do MED</strong>
              <p className="text-sm text-white/70 mt-1">
                O banco tem 72h para analisar seu pedido. Quanto mais rápido você acionar,
                maior a chance de os valores ainda estarem na conta do fraudador.
                O prazo total para solicitação é de 80 dias.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="card border-ember-500/30 bg-gradient-to-b from-ember-500/10 to-transparent text-center">
            <h3 className="font-bold text-white text-lg mb-2">
              A contestação MED é apenas 1 dos 5 documentos que você precisa
            </h3>
            <p className="text-sm text-white/60 mb-6">
              Para maximizar sua chance de recuperação, você precisa acionar MED + BO + banco + BACEN + Procon.
              O Kit Completo gera tudo de uma vez com seus dados.
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
