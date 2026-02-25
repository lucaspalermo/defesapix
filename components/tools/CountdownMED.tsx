'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface Props {
  dataOcorrencia: string; // "YYYY-MM-DD"
}

export default function CountdownMED({ dataOcorrencia }: Props) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!dataOcorrencia) { setRemaining(null); return; }

    // Parse as local midnight to avoid timezone shifts
    const [y, m, d] = dataOcorrencia.split('-').map(Number);
    const deadline = new Date(y, m - 1, d);
    deadline.setHours(deadline.getHours() + 72);

    const update = () => setRemaining(deadline.getTime() - Date.now());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [dataOcorrencia]);

  if (!dataOcorrencia || remaining === null) return null;

  const isExpired = remaining <= 0;
  const abs = Math.abs(remaining);
  const hh = Math.floor(abs / 3_600_000);
  const mm = Math.floor((abs % 3_600_000) / 60_000);
  const ss = Math.floor((abs % 60_000) / 1_000);
  const hoursLeft = remaining / 3_600_000;

  let ring = 'border-green-500/30 bg-green-500/10';
  let col = 'text-green-400';
  let label = 'Ainda no prazo — aja com urgência';
  let pulse = '';

  if (isExpired) {
    ring = 'border-red-500/50 bg-red-900/20';
    col = 'text-red-400';
    label = 'Prazo MED expirado — veja outros caminhos';
  } else if (hoursLeft < 24) {
    ring = 'border-red-500/40 bg-red-500/10';
    col = 'text-red-400';
    label = 'CRÍTICO — acione o MED agora';
    pulse = 'animate-pulse';
  } else if (hoursLeft < 48) {
    ring = 'border-amber-500/40 bg-amber-500/10';
    col = 'text-amber-400';
    label = 'Atenção — aja hoje';
  }

  return (
    <div className={`rounded-xl border p-4 ${ring} ${pulse}`}>
      <div className="flex items-center gap-3">
        <div className={col}>
          {isExpired ? (
            <AlertTriangle className="w-5 h-5" />
          ) : hoursLeft > 60 ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Clock className="w-5 h-5" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold uppercase tracking-wider ${col}`}>{label}</p>
          {isExpired ? (
            <p className="text-white/60 text-sm mt-0.5">
              Ainda é possível registrar BO e enviar notificação formal ao banco.
            </p>
          ) : (
            <p className="text-white font-mono text-lg font-bold mt-0.5">
              {String(hh).padStart(2, '0')}:{String(mm).padStart(2, '0')}:{String(ss).padStart(2, '0')}
              <span className="text-white/40 text-xs ml-2 font-sans font-normal">restantes para o MED</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
