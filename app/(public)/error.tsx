'use client';

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="card max-w-md w-full text-center p-8">
        <div className="icon-badge icon-badge-red w-16 h-16 mx-auto mb-6 text-2xl">!</div>
        <h2 className="text-xl font-heading font-bold text-white mb-3">
          Algo deu errado
        </h2>
        <p className="text-white/50 text-sm mb-6">
          Ocorreu um erro inesperado. Tente recarregar a página.
        </p>
        <button onClick={reset} className="btn-primary mx-auto">
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
