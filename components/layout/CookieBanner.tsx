'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    } else if (consent === 'accepted' && typeof (window as any).gtag === 'function') {
      // Restaura consentimento de sessão anterior
      (window as any).gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    // Atualiza consentimento do GA4
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('cookie_consent', 'declined');
    // Desabilita GA4 quando o usuário recusa
    if (typeof window !== 'undefined') {
      (window as unknown as Record<string, unknown>)['ga-disable-G-VN5PQZYBCD'] = true;
      if (typeof (window as any).gtag === 'function') {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-navy-800 border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-white/70 leading-relaxed">
          <span className="text-white font-semibold">Usamos cookies</span> para melhorar sua experiência e analisar o tráfego do site (Google Analytics).
          Ao continuar, você concorda com nossa{' '}
          <Link href="/cookies" className="text-green-400 underline hover:text-green-300 transition-colors">
            Política de Cookies
          </Link>{' '}
          e{' '}
          <Link href="/privacidade" className="text-green-400 underline hover:text-green-300 transition-colors">
            Privacidade
          </Link>.
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 rounded-xl transition-all"
          >
            Recusar
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm font-semibold bg-green-500 hover:bg-green-400 text-white rounded-xl transition-all"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
