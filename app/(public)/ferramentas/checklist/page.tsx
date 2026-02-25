import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, ArrowRight, Zap, CheckCircle, Clock } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Checklist de Ação para Vítimas de Golpe Digital — Passo a Passo',
  description:
    'Saiba exatamente o que fazer após sofrer um golpe digital. Guia personalizado com prazos legais, ordem de prioridade e documentos necessários.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/checklist' },
};

export default function ChecklistPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Checklist' }]} />

      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-3xl text-center">
          <span className="badge badge-yellow mb-4">Incluso no Kit Completo — R$47</span>
          <h1 className="text-4xl font-bold text-white mb-4">
            Checklist de Ação Pós-Golpe
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Passo a passo personalizado por tipo de golpe, com prazos legais e prioridades.
            Siga na ordem certa e não perca nenhum prazo.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl space-y-6">

          <div className="card border-white/10">
            <h2 className="font-bold text-white text-lg mb-4">O que o guia passo a passo inclui</h2>
            <ul className="space-y-3">
              {[
                'Ações em ordem de prioridade e urgência',
                'Prazos legais específicos (72h MED, 30 dias banco, 60 dias cartão)',
                'Links diretos para delegacia eletrônica, MeuBC e consumidor.gov.br',
                'Instruções para cada documento: onde protocolar, como enviar',
                'Dicas específicas por tipo de golpe (Pix, WhatsApp, cartão, celular)',
                'Contatos oficiais do seu banco (SAC, Ouvidoria)',
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
              <strong className="block text-sm">A ordem importa</strong>
              <p className="text-sm text-white/70 mt-1">
                Cada passo depende do anterior. Registrar o BO antes de acionar o MED é fundamental.
                O guia garante que você faz tudo na sequência correta.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="card border-ember-500/30 bg-gradient-to-b from-ember-500/10 to-transparent text-center">
            <h3 className="font-bold text-white text-lg mb-2">
              Documentos + guia passo a passo em um único pacote
            </h3>
            <p className="text-sm text-white/60 mb-6">
              O Kit Completo gera todos os documentos preenchidos + o guia personalizado
              por tipo de golpe. Tudo pronto para agir em 15 minutos.
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
