import type { Metadata } from 'next';
import GeradorBO from '@/components/tools/GeradorBO';

export const metadata: Metadata = {
  title: 'Modelo de Boletim de Ocorrência para Golpe Digital | Central de Defesa Digital',
  description:
    'Gere o modelo completo do Boletim de Ocorrência para crimes digitais. Estelionato digital, golpe Pix, WhatsApp, boleto falso. Conforme o Código Penal e Lei 14.155/2021.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/gerador-bo' },
};

export default function GeradorBOPage() {
  return (
    <>
      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <span className="badge-green mb-4">Gratuito</span>
          <h1 className="text-4xl font-bold text-white mb-4">
            Modelo de Boletim de Ocorrência
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Gere o modelo correto para registrar o BO de estelionato digital.
            Inclui tipificação penal, fundamentos legais e todas as informações necessárias.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container max-w-3xl">
          <GeradorBO />
        </div>
      </section>
    </>
  );
}
