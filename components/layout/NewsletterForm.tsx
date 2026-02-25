'use client';

import { useState } from 'react';
import { Zap, CheckCircle } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch { /* silent */ }
    setStatus('ok');
  };

  return (
    <div className="relative overflow-hidden border-b border-white/[0.05] py-14">
      <div className="absolute inset-0 bg-gradient-to-r from-ember-900/20 via-transparent to-ember-900/10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-ember-500/[0.06] rounded-full blur-[60px]" />

      <div className="container relative text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-ember-400 uppercase tracking-widest mb-4 bg-ember-500/[0.07] border border-ember-500/20 px-3.5 py-1.5 rounded-full">
          <Zap className="w-3 h-3" />
          Alertas gratuitos
        </div>

        <h3 className="font-heading text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
          Receba alertas de novos golpes digitais
        </h3>
        <p className="text-white/35 mb-7 text-sm">
          Orientações semanais e alertas de golpes em circulação no Brasil.
        </p>

        {status === 'ok' ? (
          <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
            <CheckCircle className="w-5 h-5" />
            Inscrito com sucesso! Você receberá nossos alertas.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com.br"
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder-white/25 focus:outline-none focus:border-ember-500/40 focus:bg-white/[0.07] transition-all"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary text-sm px-6 py-3 shrink-0 disabled:opacity-50"
            >
              {status === 'loading' ? 'Inscrevendo...' : 'Quero receber'}
            </button>
          </form>
        )}
        <p className="text-white/20 text-xs mt-3">Sem spam. Cancele quando quiser. LGPD compliant.</p>
      </div>
    </div>
  );
}
