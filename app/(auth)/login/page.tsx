'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

function LoginForm() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const router       = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl  = searchParams.get('callbackUrl') ?? '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email:    email.trim().toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('E-mail ou senha incorretos. Verifique e tente novamente.');
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#09090F] flex items-center justify-center px-4 py-16 bg-grid-pattern">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ember-500 to-ember-700 flex items-center justify-center shadow-ember-glow">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-heading font-bold text-white block leading-none text-sm">Central de</span>
            <span className="font-heading font-bold text-ember-400 block leading-none">Defesa Digital</span>
          </div>
        </Link>

        <div className="card border-white/10">
          <h1 className="text-2xl font-bold text-white mb-2 text-center">Entrar na sua conta</h1>
          <p className="text-white/40 text-sm text-center mb-8">
            Acesse seu histórico de casos e documentos gerados.
          </p>

          {error && (
            <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-5 text-sm text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="••••••••"
                  className="input pl-10"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Entrando...</>
              ) : (
                <>Entrar <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Não tem conta?{' '}
            <Link href="/cadastro" className="text-ember-400 hover:text-ember-300 font-semibold">
              Criar conta gratuita
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-white/20 mt-6">
          Ao entrar, você concorda com nossos{' '}
          <Link href="/termos" className="hover:text-white/40">Termos de Uso</Link> e{' '}
          <Link href="/privacidade" className="hover:text-white/40">Política de Privacidade</Link>.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
