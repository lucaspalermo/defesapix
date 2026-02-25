import type { Metadata } from 'next';
import { Clock, Shield, Search } from 'lucide-react';
import DiagnosticoGratuito from '@/components/tools/DiagnosticoGratuito';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Diagnóstico Gratuito — Caí num golpe, o que fazer?',
  description:
    'Descubra em 30 segundos se você pode recuperar seu dinheiro. Análise gratuita do seu caso: chance de recuperação, prazos, e documentos necessários.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/diagnostico' },
  openGraph: {
    title: 'Diagnóstico Gratuito — Caí num golpe, o que fazer?',
    description: 'Descubra em 30 segundos se você pode recuperar seu dinheiro. Análise gratuita.',
    url: 'https://defesapix.com.br/ferramentas/diagnostico',
  },
};

export default function DiagnosticoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Ferramentas', href: '/ferramentas' }, { name: 'Diagnóstico Gratuito' }]} />
      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          {/* Urgency badge */}
          <div className="alert-danger mb-6 max-w-2xl mx-auto">
            <Clock className="w-5 h-5 shrink-0" />
            <span>
              <strong>Tempo é fundamental:</strong> Quanto mais rápido agir, maior a chance de recuperar o dinheiro.
            </span>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-4">
            <Search className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400">100% Gratuito</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Caí num golpe — o que fazer agora?
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Responda 3 perguntas e descubra sua chance de recuperação,
            quais documentos você precisa e os prazos que não pode perder.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-green-400" />
              Sem cadastro
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-green-400" />
              Resultado em 30 segundos
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <DiagnosticoGratuito />
        </div>
      </section>
    </>
  );
}
