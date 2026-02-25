import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import ProductSchema from '@/components/seo/ProductSchema';

export const metadata: Metadata = {
  title: 'Modelo de Boletim de Ocorrência para Golpe Digital — Gere em Minutos',
  description:
    'Gere o modelo completo do Boletim de Ocorrência para crimes digitais. Estelionato, golpe Pix, WhatsApp, boleto falso. Incluso no Kit Completo por R$47.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/gerador-bo' },
};

export default function GeradorBOPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Boletim de Ocorrência' }]} />
      <ProductSchema name="Modelo de Boletim de Ocorrência para Golpe Digital" description="Modelo completo do B.O. com tipificação penal e fundamentos legais. Incluso no Kit Completo." price={47} url="/ferramentas/pacote-completo" />

      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-3xl text-center">
          <span className="badge badge-yellow mb-4">Incluso no Kit Completo — R$47</span>
          <h1 className="text-4xl font-bold text-white mb-4">
            Modelo de Boletim de Ocorrência
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Modelo profissional do B.O. para crimes digitais com tipificação penal correta
            (Art. 171, Lei 14.155/2021) e fundamentação legal completa.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl space-y-6">

          <div className="card border-white/10">
            <h2 className="font-bold text-white text-lg mb-4">O que está incluso no B.O.</h2>
            <ul className="space-y-3">
              {[
                'Tipificação penal correta (Art. 171 CP — Estelionato)',
                'Referência à Lei 14.155/2021 (crimes digitais)',
                'Descrição cronológica dos fatos',
                'Qualificação completa da vítima e do infrator',
                'Pedidos formais de investigação',
                'Formato aceito por delegacias eletrônicas de todos os estados',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="alert-warning">
            <Clock className="w-5 h-5 shrink-0" />
            <div>
              <strong className="block text-sm">Por que o B.O. é fundamental?</strong>
              <p className="text-sm text-white/70 mt-1">
                O Boletim de Ocorrência é pré-requisito para acionar o MED, contestar no banco e
                registrar reclamação no BACEN. Sem ele, os outros processos ficam bloqueados.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="card border-ember-500/30 bg-gradient-to-b from-ember-500/10 to-transparent text-center">
            <h3 className="font-bold text-white text-lg mb-2">
              O B.O. é apenas 1 dos 5 documentos que você precisa
            </h3>
            <p className="text-sm text-white/60 mb-6">
              Com o Kit Completo você recebe o B.O. + Contestação MED + Notificação Bancária +
              Reclamação BACEN + Reclamação Procon — tudo preenchido com seus dados, pronto para protocolar.
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
