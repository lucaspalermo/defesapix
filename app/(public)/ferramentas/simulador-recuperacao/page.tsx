import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Diagnóstico Gratuito — Caí num golpe, o que fazer?',
  description:
    'Descubra em 30 segundos se você pode recuperar seu dinheiro. Análise gratuita do seu caso.',
  alternates: { canonical: 'https://defesapix.com.br/ferramentas/diagnostico' },
};

export default function SimuladorPage() {
  redirect('/ferramentas/diagnostico');
}
