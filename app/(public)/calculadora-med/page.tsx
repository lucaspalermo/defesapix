import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MedCalculator from '@/components/home/MedCalculator';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Calculadora de Prazo MED — Descubra seu prazo para recuperar Pix',
  description:
    'Calcule quanto tempo você ainda tem para acionar o MED (Mecanismo Especial de Devolução) e recuperar valores perdidos em golpe Pix. Ferramenta gratuita.',
  alternates: { canonical: 'https://defesapix.com.br/calculadora-med' },
  keywords: [
    'calculadora MED',
    'prazo MED pix',
    'mecanismo especial devolução prazo',
    '72 horas pix golpe',
    'recuperar pix prazo',
  ],
};

const faqItems = [
  {
    question: 'Qual o prazo para acionar o MED?',
    answer: 'Você pode solicitar o MED em até 80 dias após a transação, mas o ideal é agir nas primeiras 72 horas, quando as chances de o dinheiro ainda estar na conta do golpista são maiores.',
  },
  {
    question: 'O que acontece depois de 72 horas?',
    answer: 'Após 72 horas, o MED ainda pode ser acionado (até 80 dias), mas a probabilidade de recuperação cai significativamente, pois os golpistas costumam movimentar os valores rapidamente.',
  },
  {
    question: 'O MED funciona para qualquer valor?',
    answer: 'Sim, o MED pode ser acionado para qualquer valor de Pix. Não há valor mínimo ou máximo para solicitar a devolução.',
  },
  {
    question: 'E se o prazo do MED já expirou?',
    answer: 'Mesmo após o prazo de 80 dias, você ainda pode: reclamar no Procon, registrar B.O., recorrer ao Banco Central (Meu BC), ou entrar com ação no Juizado Especial Cível.',
  },
];

export default function CalculadoraMedPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Calculadora MED', href: '/calculadora-med' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MedCalculator />

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-2xl">
          <h2 className="section-title text-center mb-10">Dúvidas sobre o prazo MED</h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="card">
                <h3 className="font-semibold text-white text-sm mb-2">{item.question}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/ferramentas/pacote-completo" className="btn-primary inline-flex text-base px-8 py-4">
              Gerar meus documentos agora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="border-t border-white/[0.05] py-10">
        <div className="container max-w-2xl">
          <h2 className="text-lg font-bold text-white mb-4">Leia também</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/med-mecanismo-especial-devolucao-pix" className="text-sm text-green-400 hover:text-green-300 transition-colors">O que é o MED? Guia completo</Link>
            <Link href="/blog/como-recuperar-dinheiro-golpe-pix-2025" className="text-sm text-green-400 hover:text-green-300 transition-colors">Como recuperar dinheiro de golpe Pix em 2026</Link>
            <Link href="/golpes/golpe-pix" className="text-sm text-green-400 hover:text-green-300 transition-colors">Golpe Pix: guia completo</Link>
            <Link href="/ferramentas/gerador-contestacao-med" className="text-sm text-green-400 hover:text-green-300 transition-colors">Gerar Contestação MED</Link>
            <Link href="/ferramentas/diagnostico" className="text-sm text-white/50 hover:text-white transition-colors">Diagnóstico gratuito</Link>
          </div>
        </div>
      </section>
    </>
  );
}
