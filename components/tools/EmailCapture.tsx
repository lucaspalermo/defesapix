'use client';

import { useState } from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  tipo: string;
  dataOcorrencia?: string;
}

export default function EmailCapture({ tipo, dataOcorrencia }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [lgpd, setLgpd] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ nome?: string; email?: string; lgpd?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (nome.trim().length < 2) e.nome = 'Nome muito curto';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido';
    if (!lgpd) e.lgpd = 'Aceite para continuar';
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    try {
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: nome.trim(), email: email.trim(), tipo, dataOcorrencia }),
      });
      setSubmitted(true);
      toast.success('Lembretes ativados!');
    } catch {
      toast.error('Erro ao ativar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
        <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-white">Lembretes ativados!</p>
          <p className="text-xs text-white/50">Você receberá alertas antes do prazo do MED expirar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-green-500/20 bg-green-500/5">
      <div className="flex items-center gap-2 mb-1">
        <Bell className="w-4 h-4 text-green-400" />
        <p className="text-sm font-semibold text-white">Ativar lembretes de prazo (grátis)</p>
      </div>
      <p className="text-xs text-white/50 mb-4">
        Receba alertas por e-mail 48h e 24h antes do prazo do MED. Não requer conta.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="input py-2 text-sm"
              placeholder="Seu nome"
            />
            {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome}</p>}
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input py-2 text-sm"
              placeholder="seu@email.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={lgpd}
            onChange={(e) => setLgpd(e.target.checked)}
            className="accent-green-500 mt-0.5 shrink-0"
          />
          <span className="text-xs text-white/50">
            Aceito receber lembretes e concordo com a{' '}
            <a href="/sobre#privacidade" className="text-green-400 hover:underline">
              política de privacidade
            </a>.
          </span>
        </label>
        {errors.lgpd && <p className="text-red-400 text-xs">{errors.lgpd}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-2.5 text-sm"
        >
          <Bell className="w-4 h-4" />
          {loading ? 'Ativando...' : 'Ativar lembretes gratuitos'}
        </button>
      </form>
    </div>
  );
}
