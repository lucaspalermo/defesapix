'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Menu, X, ChevronDown, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  {
    label: 'Tipos de Golpe',
    href: '/golpes',
    children: [
      { label: 'Golpe via Pix', href: '/golpes/golpe-pix', desc: 'MED, bloqueio e recuperação de valores' },
      { label: 'Clonagem WhatsApp', href: '/golpes/golpe-whatsapp', desc: 'Número clonado, golpista se passa por você' },
      { label: 'Boleto Falso', href: '/golpes/golpe-boleto', desc: 'Boleto adulterado ou gerado fraudulentamente' },
      { label: 'Golpe do Amor', href: '/golpes/golpe-romance', desc: 'Romance scam e perfis falsos' },
      { label: 'Emprego Falso', href: '/golpes/golpe-emprego', desc: 'Vaga de emprego usada para extorquir' },
      { label: 'Investimento Fraudulento', href: '/golpes/golpe-investimento', desc: 'Pirâmides e aplicações falsas' },
      { label: 'App / Site Falso', href: '/golpes/golpe-clone-app', desc: 'Clones de apps bancários e sites falsos' },
    ],
  },
  {
    label: 'Ferramentas',
    href: '/ferramentas',
    children: [
      { label: 'Simulador de Recuperação', href: '/ferramentas/simulador-recuperacao', desc: 'Calcule sua probabilidade de recuperar' },
      { label: 'Contestação MED', href: '/ferramentas/gerador-contestacao-med', desc: 'Acione o Mecanismo Especial de Devolução' },
      { label: 'Boletim de Ocorrência', href: '/ferramentas/gerador-bo', desc: 'Gere o BO completo e correto' },
      { label: 'Notificação ao Banco', href: '/ferramentas/notificacao-banco', desc: 'Notifique formalmente sua instituição' },
      { label: 'Checklist de Ação', href: '/ferramentas/checklist', desc: 'Passo a passo personalizado do seu caso' },
    ],
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Educação', href: '/educacao' },
  { label: 'Parceiros', href: '/parceiros' },
];

export default function Header() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── URGENCY BAR ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-red-950 border-b border-red-900/60 py-1.5 px-4">
        <div className="container flex items-center justify-center gap-3 text-sm">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-red-100 font-medium">
            Sofreu golpe via Pix?{' '}
            <span className="font-bold text-white">Você tem 72 horas</span> para acionar o MED.
          </span>
          <Link
            href="/ferramentas/gerador-contestacao-med"
            className="hidden sm:inline-flex items-center gap-1 text-[0.7rem] font-bold text-red-950 bg-red-400 hover:bg-red-300 px-3 py-1 rounded-full transition-colors shrink-0"
          >
            <Zap className="w-3 h-3" />
            Acionar agora
          </Link>
        </div>
      </div>

      {/* ── MAIN HEADER ─────────────────────────────────────────── */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[rgba(9,9,15,0.95)] backdrop-blur-xl border-b border-white/[0.06]'
            : 'bg-[#09090F]',
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between h-[4.25rem]">

            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-9 h-9">
                {/* outer pulsing ring */}
                <div className="absolute -inset-[3px] rounded-[14px] bg-gradient-to-br from-ember-500 to-ember-700 opacity-0 group-hover:opacity-30 blur transition-all duration-500" />
                {/* middle orbit ring */}
                <svg className="absolute -inset-[6px] w-[calc(100%+12px)] h-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="url(#logoRing)" strokeWidth="1.5" strokeDasharray="4 6" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="logoRing" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#F97316" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#EA580C" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
                {/* main icon */}
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-ember-500 to-ember-700 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] group-hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] transition-all duration-300">
                  <Shield className="w-[1.1rem] h-[1.1rem] text-white group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
                </div>
              </div>
              <div className="hidden sm:block leading-none">
                <span className="block text-[0.6rem] font-bold text-white/30 tracking-[0.14em] uppercase">Central de</span>
                <span className="block font-heading text-[1.05rem] font-bold text-white tracking-tight leading-none mt-0.5">
                  Defesa <span className="text-ember-400">Digital</span>
                </span>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden lg:flex items-center">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-[0.875rem] font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown className={cn('w-3 h-3 opacity-40 transition-transform duration-200', activeDropdown === link.label && 'rotate-180')} />
                    )}
                  </Link>

                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 pt-2 w-64 z-50">
                      <div className="bg-[#111228] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
                        <div className="p-1.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-colors group"
                            >
                              <div className="mt-[0.4rem] w-1.5 h-1.5 rounded-full bg-ember-500/40 group-hover:bg-ember-500 transition-colors shrink-0" />
                              <div>
                                <span className="block text-[0.8rem] font-semibold text-white/75 group-hover:text-white transition-colors">
                                  {child.label}
                                </span>
                                <span className="block text-[0.7rem] text-white/30 mt-0.5 group-hover:text-white/45 transition-colors leading-snug">
                                  {child.desc}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA BUTTONS */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/login" className="px-3.5 py-2 text-sm font-medium text-white/45 hover:text-white transition-colors rounded-lg hover:bg-white/[0.06]">
                Entrar
              </Link>
              <Link href="/ferramentas" className="btn-primary text-sm py-2 px-4">
                <Shield className="w-3.5 h-3.5" />
                Quero me defender
              </Link>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.07] transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/[0.06] bg-[#09090F]">
            <div className="container py-3 space-y-0.5">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center px-4 py-2.5 rounded-xl text-white/65 hover:text-white hover:bg-white/[0.06] font-medium text-sm transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-3 ml-5 border-l border-white/[0.06] space-y-0.5 my-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 rounded-lg text-xs text-white/35 hover:text-ember-400 hover:bg-white/[0.04] transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2">
                <Link href="/login" className="btn-ghost justify-center text-sm" onClick={() => setMobileOpen(false)}>
                  Entrar
                </Link>
                <Link href="/ferramentas" className="btn-primary justify-center text-sm" onClick={() => setMobileOpen(false)}>
                  <Shield className="w-4 h-4" />
                  Quero me defender
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
