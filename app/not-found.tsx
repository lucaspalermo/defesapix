import Link from 'next/link';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Página não encontrada | DefesaPix',
  description: 'A página que você procura não existe ou foi movida. Confira nossas ferramentas e guias para se proteger de golpes digitais.',
  robots: { index: false, follow: true },
};

const SUGESTOES = [
  { href: '/',              label: 'Página inicial',           desc: 'Voltar ao início' },
  { href: '/ferramentas',   label: 'Ferramentas',              desc: 'Gere B.O., MED e notificações' },
  { href: '/golpes/golpe-pix', label: 'Golpe Pix — O que fazer', desc: 'Guia completo de recuperação' },
  { href: '/blog',          label: 'Blog',                     desc: 'Artigos sobre defesa digital' },
  { href: '/educacao',      label: 'Educação',                 desc: 'Aprenda a se proteger' },
  { href: '/parceiros',     label: 'Parceiros Jurídicos',      desc: 'Advogados especializados' },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-navy-900 flex items-center justify-center px-4 py-24">
        <div className="max-w-2xl w-full text-center">
          {/* Código 404 */}
          <p className="text-8xl font-black text-ember-500/30 select-none mb-2">404</p>

          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
            Página não encontrada
          </h1>

          <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
            O endereço que você acessou não existe ou foi movido. Use os links abaixo para continuar navegando.
          </p>

          {/* Grid de sugestões */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {SUGESTOES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group flex flex-col items-start p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-ember-500/30 hover:bg-ember-500/[0.06] transition-all text-left"
              >
                <span className="font-bold text-white group-hover:text-ember-400 transition-colors">
                  {s.label}
                </span>
                <span className="text-sm text-white/40">{s.desc}</span>
              </Link>
            ))}
          </div>

          {/* CTA principal */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-ember-500 hover:bg-ember-600 text-white font-bold text-sm transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
