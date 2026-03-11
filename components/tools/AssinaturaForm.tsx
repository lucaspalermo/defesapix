'use client';

import { useState } from 'react';
import { Bell, Lock, Loader2 } from 'lucide-react';
import PaymentModal from '@/components/tools/PaymentModal';
import toast from 'react-hot-toast';
import { track } from '@/lib/track';

export default function AssinaturaForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState<{
    paymentId: string;
    pixQrCode: string;
    pixCopiaECola: string;
    valor: number;
  } | null>(null);
  const [sucesso, setSucesso] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !cpf) {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/asaas/assinatura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, cpf: cpf.replace(/\D/g, '') }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao criar assinatura');

      track('assinatura_iniciada', { valor: 19 });
      setPayment({
        paymentId: data.paymentId,
        pixQrCode: data.pixQrCode,
        pixCopiaECola: data.pixCopiaECola,
        valor: data.valor,
      });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao processar');
    } finally {
      setLoading(false);
    }
  };

  if (sucesso) {
    return (
      <div className="card border-green-500/20 text-center py-10">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
          <Bell className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="font-black text-xl text-white mb-2">Assinatura ativada!</h3>
        <p className="text-white/60 text-sm mb-2">
          Seu monitoramento de CPF está ativo. Você receberá alertas por email.
        </p>
        <p className="text-xs text-white/40">
          Obrigado por confiar na DefesaPix.
        </p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="card border-blue-500/20 space-y-5">
        <div className="text-center mb-2">
          <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-1">Assinatura mensal</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-lg text-white/50">R$</span>
            <span className="text-4xl font-black text-white">19</span>
            <span className="text-sm text-white/40">/mês</span>
          </div>
        </div>

        <div>
          <label className="label">Nome completo</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)}
            className="input" placeholder="Seu nome" required />
        </div>

        <div>
          <label className="label">E-mail</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)}
            type="email" className="input" placeholder="seu@email.com" required />
        </div>

        <div>
          <label className="label">CPF</label>
          <input value={cpf} onChange={(e) => setCpf(e.target.value)}
            className="input" placeholder="000.000.000-00" required />
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60">
          {loading
            ? <><Loader2 className="w-5 h-5 animate-spin" /> Processando...</>
            : <><Lock className="w-5 h-5" /> Assinar por R$19/mês</>}
        </button>

        <p className="text-xs text-white/30 text-center">
          Pagamento via PIX. Cancele quando quiser, sem multa.
        </p>
      </form>

      {payment && (
        <PaymentModal
          paymentId={payment.paymentId}
          pixQrCode={payment.pixQrCode}
          pixCopiaECola={payment.pixCopiaECola}
          valor={payment.valor}
          produto="Alerta DefesaPix (mensal)"
          onPaid={() => { setSucesso(true); setPayment(null); }}
          onClose={() => setPayment(null)}
        />
      )}
    </>
  );
}
