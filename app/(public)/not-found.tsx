import Link from 'next/link';
import { Shield, ArrowRight, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-20">
      <div className="container max-w-lg text-center">
        <div className="w-16 h-16 rounded-2xl bg-ember-500/20 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-ember-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-3">Página não encontrada</h1>
        <p className="text-white/50 mb-8">
          A página que você procura não existe ou foi movida.
          Se você sofreu um golpe, use as opções abaixo.
        </p>

        <div className="space-y-3">
          <Link
            href="/ferramentas/diagnostico"
            className="btn-primary w-full justify-center py-3"
          >
            <Search className="w-5 h-5" />
            Diagnóstico Gratuito
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/ferramentas/pacote-completo"
            className="btn-secondary w-full justify-center py-3"
          >
            Kit Completo — R$47
          </Link>
          <Link
            href="/"
            className="block text-sm text-white/30 hover:text-white/60 transition-colors mt-4"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </section>
  );
}
