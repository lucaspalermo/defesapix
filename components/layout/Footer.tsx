import Link from 'next/link';
import { Shield, Instagram, Youtube, Facebook, Mail, ExternalLink, Zap } from 'lucide-react';

const FOOTER_LINKS = {
  'Tipos de Golpe': [
    { label: 'Golpe via Pix',             href: '/golpes/golpe-pix' },
    { label: 'Clonagem de WhatsApp',      href: '/golpes/golpe-whatsapp' },
    { label: 'Boleto Falso',              href: '/golpes/golpe-boleto' },
    { label: 'Golpe do Amor',             href: '/golpes/golpe-romance' },
    { label: 'Emprego Falso',             href: '/golpes/golpe-emprego' },
    { label: 'Investimento Fraudulento',  href: '/golpes/golpe-investimento' },
    { label: 'App / Site Falso',          href: '/golpes/golpe-clone-app' },
  ],
  Ferramentas: [
    { label: 'Simulador de Recuperação', href: '/ferramentas/simulador-recuperacao' },
    { label: 'Contestação MED (Pix)',    href: '/ferramentas/gerador-contestacao-med' },
    { label: 'Boletim de Ocorrência',    href: '/ferramentas/gerador-bo' },
    { label: 'Notificação Bancária',     href: '/ferramentas/notificacao-banco' },
    { label: 'Checklist de Ação',        href: '/ferramentas/checklist' },
  ],
  Empresa: [
    { label: 'Sobre Nós',          href: '/sobre' },
    { label: 'Blog Educativo',     href: '/blog' },
    { label: 'Educação Digital',   href: '/educacao' },
    { label: 'Parceiros Jurídicos',href: '/parceiros' },
    { label: 'Planos e Preços',    href: '/#precos' },
  ],
  Legal: [
    { label: 'Termos de Uso',            href: '/termos' },
    { label: 'Política de Privacidade',  href: '/privacidade' },
    { label: 'Política de Cookies',      href: '/cookies' },
    { label: 'LGPD',                     href: '/lgpd' },
  ],
};

const EXTERNAL_RESOURCES = [
  { label: 'BACEN — Registrato',   href: 'https://registrato.bcb.gov.br',                                    desc: 'Verifique operações em seu nome' },
  { label: 'BACEN — Meu BC',       href: 'https://www.bcb.gov.br/meubc',                                     desc: 'Reclamação no Banco Central' },
  { label: 'Delegacia Eletrônica', href: 'https://www.delegaciaeletronica.policiacivil.sp.gov.br',           desc: 'BO online 24 horas' },
  { label: 'Procon SP',            href: 'https://www.procon.sp.gov.br',                                     desc: 'Defesa do consumidor' },
  { label: 'CVM — Denúncia',       href: 'https://www.cvm.gov.br',                                           desc: 'Golpes de investimento' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050508] border-t border-white/[0.05]">

      {/* ── NEWSLETTER ─────────────────────────────────────── */}
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

          <form className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              placeholder="seu@email.com.br"
              className="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white text-sm placeholder-white/25 focus:outline-none focus:border-ember-500/40 focus:bg-white/[0.07] transition-all"
            />
            <button
              type="submit"
              className="btn-primary text-sm px-6 py-3 shrink-0"
            >
              Quero receber
            </button>
          </form>
          <p className="text-white/20 text-xs mt-3">Sem spam. Cancele quando quiser. LGPD compliant.</p>
        </div>
      </div>

      {/* ── MAIN FOOTER ────────────────────────────────────── */}
      <div className="container py-14">

        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ember-500 to-ember-700 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                <Shield className="w-[1.1rem] h-[1.1rem] text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-none">
                <span className="block text-[0.6rem] font-bold text-white/25 tracking-[0.14em] uppercase">Central de</span>
                <span className="block font-heading text-[1rem] font-bold text-white tracking-tight mt-0.5">
                  Defesa <span className="text-ember-400">Digital</span>
                </span>
              </div>
            </Link>

            <p className="text-white/30 text-sm leading-relaxed mb-6 max-w-[16rem]">
              A maior plataforma brasileira de recuperação após golpes digitais. Documentos oficiais em minutos.
            </p>

            {/* Social */}
            <div className="flex items-center gap-2">
              {[
                { href: 'https://www.instagram.com/centraldefesadigital', Icon: Instagram },
                { href: 'https://www.youtube.com/@centraldefesadigital',  Icon: Youtube },
                { href: 'https://www.facebook.com/centraldefesadigital',  Icon: Facebook },
                { href: 'mailto:contato@defesapix.com.br',     Icon: Mail },
              ].map(({ href, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-ember-500/15 hover:border-ember-500/30 text-white/30 hover:text-ember-400 flex items-center justify-center transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[0.65rem] font-black text-white/25 uppercase tracking-[0.14em] mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-ember-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* External resources */}
        <div className="border-t border-white/[0.05] pt-10 mb-10">
          <h4 className="text-[0.65rem] font-black text-white/20 uppercase tracking-[0.14em] mb-4">
            Recursos Oficiais do Governo
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {EXTERNAL_RESOURCES.map((res) => (
              <a
                key={res.href}
                href={res.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06] hover:border-ember-500/20 transition-all group"
              >
                <ExternalLink className="w-3 h-3 text-ember-500/50 group-hover:text-ember-500 mt-0.5 shrink-0 transition-colors" />
                <div>
                  <span className="block text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors leading-tight">{res.label}</span>
                  <span className="block text-[0.65rem] text-white/20 mt-0.5 group-hover:text-white/35 transition-colors leading-tight">{res.desc}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs text-center md:text-left">
            © {year} Central de Defesa Digital. Todos os direitos reservados.
            {' '}CNPJ: XX.XXX.XXX/0001-XX
          </p>
          <div className="flex items-center gap-5">
            {['Termos', 'Privacidade', 'Cookies'].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="text-xs text-white/20 hover:text-white/50 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-5 text-[0.65rem] text-white/12 leading-relaxed text-center max-w-3xl mx-auto">
          A Central de Defesa Digital não é um escritório de advocacia e não presta serviços jurídicos.
          Os documentos gerados são modelos orientativos e não substituem aconselhamento jurídico profissional.
        </p>
      </div>
    </footer>
  );
}
