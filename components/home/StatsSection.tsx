'use client';

import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 847, prefix: 'R$', suffix: 'M+', label: 'Perdidos em golpes digitais (2023)', format: 'raw', color: 'ember' },
  { value: 2,   prefix: '',   suffix: '/min', label: 'Brasileiros vítimas por minuto',   format: 'raw', color: 'red'   },
  { value: 65,  prefix: '',   suffix: '%',    label: 'Taxa de recuperação via MED',      format: 'raw', color: 'green' },
  { value: 4800,prefix: '',   suffix: '+',    label: 'Casos resolvidos pela plataforma', format: 'raw', color: 'green' },
];

function AnimatedCounter({ target }: { target: number }) {
  const [current, setCurrent] = useState(0);
  const ref     = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const steps     = 60;
    const increment = target / steps;
    let step        = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return <span ref={ref}>{current.toLocaleString('pt-BR')}</span>;
}

export default function StatsSection() {
  return (
    <section className="relative py-10 bg-[#0D0D15] border-y border-white/[0.05] overflow-hidden">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-ember-900/10 via-transparent to-green-900/10 pointer-events-none" />

      <div className="container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/[0.06]">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center lg:px-8">
              {/* Number */}
              <div className="font-heading font-black text-[2.25rem] md:text-[2.75rem] leading-none tracking-tight mb-2">
                <span className={stat.color === 'ember' ? 'text-ember-400' : stat.color === 'green' ? 'text-green-400' : 'text-red-400'}>
                  {stat.prefix}
                </span>
                <span className="text-white">
                  <AnimatedCounter target={stat.value} />
                </span>
                <span className={stat.color === 'ember' ? 'text-ember-400' : stat.color === 'green' ? 'text-green-400' : 'text-red-400'}>
                  {stat.suffix}
                </span>
              </div>
              {/* Label */}
              <p className="text-xs text-white/30 leading-tight font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[0.65rem] text-white/15 mt-7 font-medium">
          Fontes: Febraban · Banco Central do Brasil · Serasa Experian — 2023/2024
        </p>
      </div>
    </section>
  );
}
