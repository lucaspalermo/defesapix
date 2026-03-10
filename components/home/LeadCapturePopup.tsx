'use client';

import { useState, useEffect } from 'react';
import { X, Shield, Zap } from 'lucide-react';

export default function LeadCapturePopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok'>('idle');

  useEffect(() => {
    const dismissed = localStorage.getItem('lead_popup_dismissed');
    if (dismissed) return;

    // Show after 25 seconds or 40% scroll
    const timer = setTimeout(() => setShow(true), 25000);

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.4) {
        setShow(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('lead_popup_dismissed', Date.now().toString());
  };

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
    setTimeout(dismiss, 2500);
  };

  if (!show || status === 'ok') {
    if (status === 'ok') {
      return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111228] border border-green-500/30 rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-white mb-2">Guia enviado!</h3>
            <p className="text-white/50 text-sm">Confira sua caixa de entrada.</p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111228] border border-ember-500/30 rounded-2xl p-6 max-w-md mx-4 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative">
        <button
          onClick={dismiss}
          className="absolute top-3 right-3 p-2 text-white/30 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-ember-400 uppercase tracking-widest mb-3 bg-ember-500/[0.07] border border-ember-500/20 px-3 py-1.5 rounded-full">
            <Zap className="w-3 h-3" />
            Gratuito
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">
            Guia: 5 Passos Após Cair num Golpe Pix
          </h3>
          <p className="text-white/45 text-sm leading-relaxed">
            Checklist completo com prazos, contatos e documentos que você precisa para aumentar suas chances de recuperação.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com.br"
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder-white/25 focus:outline-none focus:border-ember-500/40 transition-all"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full justify-center py-3 text-sm disabled:opacity-50"
          >
            {status === 'loading' ? 'Enviando...' : 'Quero o guia grátis'}
          </button>
        </form>

        <p className="text-white/20 text-xs mt-3 text-center">Sem spam. LGPD compliant.</p>
      </div>
    </div>
  );
}
