'use client';

import { useState, useEffect } from 'react';
import { X, Shield, FileText, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LeadCapturePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('kit_popup_dismissed');
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
    localStorage.setItem('kit_popup_dismissed', Date.now().toString());
  };

  if (!show) return null;

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
          <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-red-400" />
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest mb-3 bg-red-500/[0.07] border border-red-500/20 px-3 py-1.5 rounded-full">
            <Clock className="w-3 h-3" />
            Prazo MED: 72 horas
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">
            Caiu num golpe? O tempo está contra você.
          </h3>
          <p className="text-white/45 text-sm leading-relaxed">
            Gere Contestação MED, Boletim de Ocorrência e Notificação Bancária em 15 minutos. 5 documentos prontos para usar.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/ferramentas/pacote-completo"
            onClick={dismiss}
            className="btn-primary w-full justify-center py-3 text-sm"
          >
            <FileText className="w-4 h-4" />
            Kit Completo — R$47
          </Link>
          <Link
            href="/ferramentas/diagnostico"
            onClick={dismiss}
            className="btn-secondary w-full justify-center py-2.5 text-sm"
          >
            Fazer diagnóstico primeiro
          </Link>
        </div>

        <p className="text-white/20 text-xs mt-3 text-center">Pagamento único via Pix. Sem mensalidade.</p>
      </div>
    </div>
  );
}
