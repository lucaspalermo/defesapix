'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { CheckCircle, Copy, Clock, X, Loader2, AlertTriangle, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';
import { track } from '@/lib/track';

interface Props {
  paymentId: string;
  pixQrCode: string;        // base64 PNG
  pixCopiaECola: string;    // payload string
  valor: number;
  produto: string;
  onPaid: () => void;
  onClose: () => void;
}

const POLL_INTERVAL = 3000;  // 3 segundos
const EXPIRY_SECS   = 10 * 60; // 10 minutos

export default function PaymentModal({
  paymentId, pixQrCode, pixCopiaECola, valor, produto, onPaid, onClose,
}: Props) {
  const [paidState, setPaidState]   = useState<'pending' | 'paid' | 'expired'>('pending');
  const [copied, setCopied]         = useState(false);
  const [timeLeft, setTimeLeft]     = useState(EXPIRY_SECS);
  const calledOnPaid                = useRef(false);

  /* ── Countdown ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaidState('expired');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* ── Polling de status ── */
  const checkStatus = useCallback(async () => {
    try {
      const res  = await fetch(`/api/asaas/status?id=${paymentId}`);
      const data = await res.json() as { pago?: boolean; status?: string };
      if (data.pago && !calledOnPaid.current) {
        calledOnPaid.current = true;
        setPaidState('paid');
        track('pagamento_confirmado', { produto, valor });
        setTimeout(onPaid, 1800);
      }
    } catch { /* ignora erros de rede durante polling */ }
  }, [paymentId, onPaid]);

  useEffect(() => {
    if (paidState !== 'pending') return;
    const poll = setInterval(checkStatus, POLL_INTERVAL);
    return () => clearInterval(poll);
  }, [paidState, checkStatus]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pixCopiaECola);
      setCopied(true);
      toast.success('Código copiado! Cole no seu banco.');
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error('Não foi possível copiar. Selecione manualmente.');
    }
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  const valorFmt = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#111228] border border-white/[0.09] rounded-3xl shadow-[0_40px_120px_rgba(0,0,0,0.9)] overflow-hidden">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <div>
            <p className="text-xs text-white/35 uppercase tracking-widest font-semibold">Pagamento via PIX</p>
            <p className="font-black text-xl text-white">{valorFmt}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.10] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>

        {/* ── Conteúdo ─────────────────────────────── */}
        <div className="p-6">

          {/* ESTADO: pendente / polling */}
          {paidState === 'pending' && (
            <>
              {/* Countdown */}
              <div className={`flex items-center justify-center gap-2 text-sm font-bold mb-5 ${
                timeLeft < 120 ? 'text-red-400' : timeLeft < 300 ? 'text-amber-400' : 'text-white/50'
              }`}>
                <Clock className="w-4 h-4" />
                Expira em {mins}:{secs}
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-5">
                {pixQrCode ? (
                  <div className="p-3 bg-white rounded-2xl shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`data:image/png;base64,${pixQrCode}`}
                      alt="QR Code PIX"
                      width={180}
                      height={180}
                      className="rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="w-[180px] h-[180px] rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-white/20" />
                  </div>
                )}
              </div>

              {/* Instrução */}
              <p className="text-center text-sm text-white/50 mb-5">
                Abra o app do seu banco → <strong className="text-white">Pix → Pagar com QR Code</strong><br />
                ou use o código abaixo:
              </p>

              {/* Copia-e-cola */}
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 mb-5">
                <p className="text-[0.65rem] text-white/30 uppercase tracking-wider mb-2 font-semibold">
                  PIX Copia e Cola
                </p>
                <p className="font-mono text-xs text-white/50 break-all leading-relaxed mb-3">
                  {pixCopiaECola.substring(0, 80)}…
                </p>
                <button
                  onClick={copy}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    copied
                      ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                      : 'bg-ember-500/15 border border-ember-500/30 text-ember-400 hover:bg-ember-500/25'
                  }`}
                >
                  {copied ? (
                    <><CheckCircle className="w-4 h-4" /> Copiado!</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copiar código PIX</>
                  )}
                </button>
              </div>

              {/* Polling indicator */}
              <div className="flex items-center justify-center gap-2 text-xs text-white/25">
                <Loader2 className="w-3 h-3 animate-spin" />
                Aguardando confirmação do pagamento...
              </div>
            </>
          )}

          {/* ESTADO: pago */}
          {paidState === 'paid' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-black text-xl text-white mb-2">Pagamento confirmado!</h3>
              <p className="text-white/50 text-sm mb-1">{produto}</p>
              <p className="font-bold text-green-400 text-lg">{valorFmt}</p>
              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-white/40">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Gerando seu documento...
              </div>
            </div>
          )}

          {/* ESTADO: expirado */}
          {paidState === 'expired' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="font-black text-xl text-white mb-2">QR Code expirado</h3>
              <p className="text-white/50 text-sm mb-6">
                O código PIX venceu. Gere um novo pagamento para continuar.
              </p>
              <button onClick={onClose} className="btn-primary w-full justify-center">
                Tentar novamente
              </button>
            </div>
          )}
        </div>

        {/* ── Footer ────────────────────────────────── */}
        {paidState === 'pending' && (
          <div className="px-6 pb-5">
            <p className="text-center text-[0.65rem] text-white/20 leading-relaxed">
              Pagamento processado via Asaas • Transação segura e criptografada<br />
              O documento é liberado automaticamente após a confirmação do PIX.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
