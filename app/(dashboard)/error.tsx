'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <div className="card max-w-md w-full text-center p-8">
        <div className="icon-badge icon-badge-red w-16 h-16 mx-auto mb-6 text-2xl">!</div>
        <h2 className="text-xl font-heading font-bold text-white mb-3">
          Erro no painel
        </h2>
        <p className="text-white/50 text-sm mb-6">
          Ocorreu um erro ao carregar esta página. Tente novamente.
        </p>
        <button onClick={reset} className="btn-primary mx-auto">
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
