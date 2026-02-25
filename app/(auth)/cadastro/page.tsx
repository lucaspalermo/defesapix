'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function CadastroPage() {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [terms,    setTerms]    = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms) { setError('Aceite os termos para continuar.'); return; }
    if (password.length < 6) { setError('A senha deve ter ao menos 6 caracteres.'); return; }

    setLoading(true);
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? 'Erro ao criar conta. Tente novamente.');
      setLoading(false);
      return;
    }

    // Auto-login após registro
    await signIn('credentials', { email: email.trim().toLowerCase(), password, redirect: false });
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#09090F] flex items-center justify-center px-4 py-16 bg-grid-pattern">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember-500 to-ember-700 flex items-center justify-center shadow-ember-glow">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-bold text-white block leading-none text-sm">Central de</span>
            <span className="font-heading font-bold text-ember-400 block leading-none">Defesa Digital</span>
          </div>
        </Link>

        <div className="card border-white/10">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">Criar conta gratuita</h1>
          <p className="text-white/40 text-sm text-center mb-6">
            Salve seus casos e acompanhe o andamento.
          </p>

          <div className="bg-green-500/[0.06] border border-green-500/15 rounded-xl p-4 mb-6">
            <p className="text-xs text-green-400 font-semibold mb-2 uppercase tracking-wider">Incluso gratuitamente:</p>
            <ul className="space-y-1.5">
              {[
                'Classificação de golpe e plano de ação',
                'Checklist interativo personalizado',
                'Simulador de probabilidade de recuperação',
                'Acesso a guias jurídicos atualizados',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-white/60">
                  <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-5 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Nome completo</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="input pl-10"
                  autoComplete="name"
                />
              </div>
            </div>

            <div>
              <label className="label">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com.br"
                  className="input pl-10"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="input pl-10"
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-0.5 accent-ember-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-white/50 cursor-pointer leading-relaxed">
                Concordo com os{' '}
                <Link href="/termos" className="text-ember-400 hover:underline">Termos de Uso</Link> e a{' '}
                <Link href="/privacidade" className="text-ember-400 hover:underline">Política de Privacidade</Link>.
                Meus dados são tratados conforme a LGPD.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Criando conta...</>
              ) : (
                <>Criar conta gratuita <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Já tem conta?{' '}
            <Link href="/login" className="text-ember-400 hover:text-ember-300 font-semibold">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
