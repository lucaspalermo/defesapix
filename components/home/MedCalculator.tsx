'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, AlertTriangle, CheckCircle, Zap, ArrowRight } from 'lucide-react';

export default function MedCalculator() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<{
    horasRestantes: number;
    diasRestantes: number;
    status: 'urgente' | 'atencao' | 'expirado' | 'dentro';
    message: string;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    const golpeDate = new Date(date + 'T00:00:00');
    const now = new Date();
    const diffMs = now.getTime() - golpeDate.getTime();
    const diffHours = diffMs / 3_600_000;
    const horasRestantes72h = Math.max(0, 72 - diffHours);
    const diasRestantes80d = Math.max(0, 80 - diffMs / 86_400_000);

    if (diffHours < 0) {
      setResult(null);
      return;
    }

    if (horasRestantes72h > 24) {
      setResult({
        horasRestantes: horasRestantes72h,
        diasRestantes: diasRestantes80d,
        status: 'dentro',
        message: `Você ainda tem ${Math.floor(horasRestantes72h)}h dentro da janela crítica de 72h. Aja agora para maximizar suas chances.`,
      });
    } else if (horasRestantes72h > 0) {
      setResult({
        horasRestantes: horasRestantes72h,
        diasRestantes: diasRestantes80d,
        status: 'urgente',
        message: `URGENTE: Restam apenas ${Math.floor(horasRestantes72h)}h${Math.floor((horasRestantes72h % 1) * 60)}min da janela de 72h! Acione o MED imediatamente.`,
      });
    } else if (diasRestantes80d > 0) {
      setResult({
        horasRestantes: 0,
        diasRestantes: diasRestantes80d,
        status: 'atencao',
        message: `A janela de 72h já passou, mas você ainda tem ${Math.floor(diasRestantes80d)} dias dentro do prazo de 80 dias para solicitar o MED. As chances são menores, mas ainda é possível.`,
      });
    } else {
      setResult({
        horasRestantes: 0,
        diasRestantes: 0,
        status: 'expirado',
        message: 'O prazo de 80 dias do MED já expirou. Mas você ainda pode: contestar pelo Procon, registrar BO e entrar com ação no Juizado Especial Cível.',
      });
    }
  };

  const statusConfig = {
    urgente: { bg: 'bg-red-500/10', border: 'border-red-500/30', icon: AlertTriangle, iconColor: 'text-red-400' },
    dentro: { bg: 'bg-green-500/10', border: 'border-green-500/30', icon: CheckCircle, iconColor: 'text-green-400' },
    atencao: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', icon: Clock, iconColor: 'text-amber-400' },
    expirado: { bg: 'bg-white/5', border: 'border-white/10', icon: Clock, iconColor: 'text-white/40' },
  };

  return (
    <section id="calculadora-med" className="section bg-[#0D0D15]">
      <div className="container max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-ember-400 uppercase tracking-widest mb-4 bg-ember-500/[0.07] border border-ember-500/20 px-4 py-2 rounded-full">
            <Clock className="w-3 h-3" />
            Ferramenta Gratuita
          </div>
          <h2 className="section-title">Calculadora de Prazo MED</h2>
          <p className="section-subtitle mx-auto text-center">
            Descubra quanto tempo você ainda tem para acionar o Mecanismo Especial de Devolução do Pix.
          </p>
        </div>

        <div className="card max-w-lg mx-auto">
          <form onSubmit={calculate} className="space-y-4">
            <div>
              <label htmlFor="golpe-date" className="label">Quando aconteceu o golpe?</label>
              <input
                id="golpe-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="input"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center py-3">
              <Zap className="w-4 h-4" />
              Calcular meu prazo
            </button>
          </form>

          {result && (() => {
            const cfg = statusConfig[result.status];
            const Icon = cfg.icon;
            return (
              <div className={`mt-6 p-5 rounded-xl ${cfg.bg} border ${cfg.border}`}>
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${cfg.iconColor} shrink-0 mt-0.5`} />
                  <div>
                    <p className="text-white text-sm font-semibold mb-1">
                      {result.status === 'urgente' && 'Prazo crítico!'}
                      {result.status === 'dentro' && 'Dentro do prazo ideal'}
                      {result.status === 'atencao' && 'Fora da janela de 72h'}
                      {result.status === 'expirado' && 'Prazo MED expirado'}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">{result.message}</p>

                    {result.status !== 'expirado' && (
                      <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <Link href="/ferramentas/pacote-completo" className="btn-primary text-sm py-2 px-4">
                          <Zap className="w-3.5 h-3.5" />
                          Gerar documentos agora
                        </Link>
                        <Link href="/ferramentas/diagnostico" className="btn-secondary text-sm py-2 px-4">
                          Diagnóstico grátis
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}

                    {result.status === 'expirado' && (
                      <div className="mt-4">
                        <Link href="/ferramentas/diagnostico" className="btn-secondary text-sm py-2 px-4">
                          Ver outras opções
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
