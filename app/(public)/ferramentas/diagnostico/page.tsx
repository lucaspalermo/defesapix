import type { Metadata } from 'next';
import { Clock, Shield, Search, CheckCircle, Users } from 'lucide-react';
import DiagnosticoGratuito from '@/components/tools/DiagnosticoGratuito';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Diagnóstico Gratuito — Caí num golpe, o que fazer?',
  description:
    'Descubra em 30 segundos se você pode recuperar seu dinheiro. Análise gratuita do seu caso: chance de recuperação, prazos e documentos necessários.',
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
            Caiu num golpe — o que fazer agora?
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-4">
            Responda 3 perguntas e descubra sua chance de recuperação,
            quais documentos você precisa e os prazos que não pode perder.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/50 mb-6">
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-green-400" />
              Sem cadastro
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-green-400" />
              Resultado em 30 segundos
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-green-400" />
              +4.800 casos resolvidos
            </span>
          </div>

          {/* Trust badges para Google Ads Quality Score */}
          <div className="flex flex-wrap justify-center gap-2">
            {['BACEN regulado', 'LGPD protegido', 'SSL criptografado', 'Garantia 7 dias'].map((badge) => (
              <span key={badge} className="text-[0.6rem] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/30 border border-white/[0.08]">
                <CheckCircle className="w-3 h-3 inline mr-1 text-green-500/50" />{badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          <DiagnosticoGratuito />

          {/* Disclaimer — compliance Google Ads */}
          <p className="text-xs text-white/25 leading-relaxed text-center mt-8 max-w-2xl mx-auto">
            Este diagnóstico é uma análise automatizada com fins informativos e educativos. Não constitui parecer jurídico. A DefesaPix não é um escritório de advocacia. Resultados podem variar conforme cada caso.
          </p>
        </div>
      </section>
    </>
  );
}
