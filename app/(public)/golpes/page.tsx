import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Zap, Smartphone, FileText, Heart, Briefcase, BarChart3,
  Globe, PhoneOff, Scale, ArrowRight, Shield, AlertTriangle,
  CreditCard, Mail, Banknote, Phone, ExternalLink,
  Truck, Camera, Monitor, CreditCard as CreditCardIcon, ArrowLeftRight, PhoneCall,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  Shield, Phone, FileText, AlertTriangle, Zap, Smartphone, Heart,
  Briefcase, BarChart3, Globe, PhoneOff, Scale, CreditCard, Mail, ExternalLink, Banknote,
};

export const metadata: Metadata = {
  title: 'Tipos de Golpe Digital: Guias Completos',
  description:
    'Guias completos para cada tipo de golpe digital no Brasil: Pix, WhatsApp, boleto falso, roubo de celular, falso advogado e mais. Orientações jurídicas atualizadas.',
  keywords: [
    'tipos de golpe digital',
    'golpe pix o que fazer',
    'golpe whatsapp',
    'boleto falso',
    'roubo celular golpe',
    'golpe investimento',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes' },
};

const GOLPES = [
  {
    Icon: Zap,
    titulo: 'Golpe via Pix',
    href: '/golpes/golpe-pix',
    urgencia: 'CRÍTICA' as const,
    desc: 'MED, bloqueio de valores e recuperação de dinheiro. O prazo de 72h é crítico — cada minuto conta.',
    tags: ['MED', 'BACEN', '72h'],
    stat: '65% recuperam com MED ativo',
  },
  {
    Icon: PhoneOff,
    titulo: 'Roubo de Celular',
    href: '/golpes/roubo-celular',
    urgencia: 'CRÍTICA' as const,
    desc: 'Protocolo de emergência: bloqueie SIM, banco e IMEI nos primeiros 5 minutos após o roubo.',
    tags: ['SIM', 'IMEI', 'Banco'],
    stat: 'Aja nos primeiros 5 minutos',
  },
  {
    Icon: Globe,
    titulo: 'App / Site Falso',
    href: '/golpes/golpe-clone-app',
    urgencia: 'CRÍTICA' as const,
    desc: 'Clones de apps bancários e sites falsos que capturam senhas, CPF e dados de cartão.',
    tags: ['Phishing', 'Banco', 'CDC'],
    stat: 'CDC obriga ressarcimento',
  },
  {
    Icon: Smartphone,
    titulo: 'Clonagem de WhatsApp',
    href: '/golpes/golpe-whatsapp',
    urgencia: 'ALTA' as const,
    desc: 'Número clonado: golpista se passa por você para pedir dinheiro a familiares e amigos.',
    tags: ['BO', 'ANATEL', 'WhatsApp'],
    stat: 'Registre BO em 24h',
  },
  {
    Icon: FileText,
    titulo: 'Boleto Falso',
    href: '/golpes/golpe-boleto',
    urgencia: 'ALTA' as const,
    desc: 'Boleto adulterado ou gerado fraudulentamente para desviar pagamentos para contas de ladrões.',
    tags: ['Contestação', 'CDC', 'Banco'],
    stat: 'CDC obriga estorno',
  },
  {
    Icon: BarChart3,
    titulo: 'Investimento Fraudulento',
    href: '/golpes/golpe-investimento',
    urgencia: 'ALTA' as const,
    desc: 'Pirâmides, criptomoedas e aplicações falsas — como acionar CVM e Polícia Federal.',
    tags: ['CVM', 'PF', 'Crypto'],
    stat: 'CVM investiga e autua',
  },
  {
    Icon: Scale,
    titulo: 'Falso Advogado',
    href: '/golpes/golpe-falso-advogado',
    urgencia: 'ALTA' as const,
    desc: 'Prometeram recuperar seu dinheiro e pediram honorários antecipados. Verifique OAB.',
    tags: ['OAB', 'Estelionato', 'BO'],
    stat: 'OAB gratuita em cna.oab.org.br',
  },
  {
    Icon: Heart,
    titulo: 'Golpe do Amor',
    href: '/golpes/golpe-romance',
    urgencia: 'MÉDIA' as const,
    desc: 'Romance scam: perfis falsos que conquistam vítimas para extrair dinheiro ao longo de meses.',
    tags: ['Evidências', 'Polícia', 'Meta'],
    stat: 'Preserve todas as conversas',
  },
  {
    Icon: Briefcase,
    titulo: 'Emprego Falso',
    href: '/golpes/golpe-emprego',
    urgencia: 'MÉDIA' as const,
    desc: 'Vaga falsa usada para cobrar taxas de cadastro, pedir documentos ou solicitar equipamentos.',
    tags: ['Procon', 'MTE', 'Denúncia'],
    stat: 'Procon pode ressarcir',
  },
  {
    Icon: CreditCard,
    titulo: 'Cartão Clonado',
    href: '/golpes/golpe-cartao',
    urgencia: 'ALTA' as const,
    desc: 'Compras não reconhecidas no cartão de crédito ou débito. Chargeback e contestação bancária.',
    tags: ['Chargeback', 'CDC', 'Banco'],
    stat: 'Contestação em até 120 dias',
  },
  {
    Icon: Mail,
    titulo: 'Phishing',
    href: '/golpes/golpe-phishing',
    urgencia: 'ALTA' as const,
    desc: 'E-mails, SMS e sites falsos que imitam bancos e empresas para roubar senhas e dados.',
    tags: ['E-mail', 'SMS', 'Site falso'],
    stat: 'Troque senhas imediatamente',
  },
  {
    Icon: Banknote,
    titulo: 'Consignado Fraudulento',
    href: '/golpes/golpe-consignado',
    urgencia: 'ALTA' as const,
    desc: 'Empréstimo consignado contratado sem autorização — descontos indevidos na folha ou INSS.',
    tags: ['INSS', 'Consignado', 'CDC'],
    stat: 'CDC garante cancelamento',
  },
  {
    Icon: Truck,
    titulo: 'Golpe do Delivery',
    href: '/golpes/golpe-delivery',
    urgencia: 'ALTA' as const,
    desc: 'Maquininha adulterada, taxa extra falsa ou app de delivery clonado para roubar dados.',
    tags: ['Maquininha', 'App', 'CDC'],
    stat: 'CDC obriga estorno',
  },
  {
    Icon: Camera,
    titulo: 'Sextorsão',
    href: '/golpes/golpe-sextorsao',
    urgencia: 'CRÍTICA' as const,
    desc: 'Chantagem com fotos ou vídeos íntimos — reais ou fabricados. Crime com pena de até 5 anos.',
    tags: ['Lei 13.718', 'BO', 'Extorsão'],
    stat: 'NÃO pague — denuncie',
  },
  {
    Icon: Monitor,
    titulo: 'Falso Suporte Técnico',
    href: '/golpes/golpe-falso-suporte',
    urgencia: 'ALTA' as const,
    desc: 'Golpista liga se passando por suporte de banco ou empresa e pede acesso remoto ao celular.',
    tags: ['Acesso remoto', 'Banco', 'CDC'],
    stat: 'Banco nunca pede acesso',
  },
  {
    Icon: CreditCardIcon,
    titulo: 'Golpe da Maquininha',
    href: '/golpes/golpe-maquininha',
    urgencia: 'ALTA' as const,
    desc: 'Visor quebrado, valor adulterado, cobrança dupla ou troca de maquininha no momento do pagamento.',
    tags: ['Chargeback', 'CDC', 'Cartão'],
    stat: 'Contestação em até 120 dias',
  },
  {
    Icon: ArrowLeftRight,
    titulo: 'Golpe do Pix Errado',
    href: '/golpes/golpe-pix-errado',
    urgencia: 'ALTA' as const,
    desc: 'Golpista envia Pix "por engano", pede devolução para outra conta e depois aciona MED contra você.',
    tags: ['MED reverso', 'Pix', 'BO'],
    stat: 'NÃO devolva sem confirmar',
  },
  {
    Icon: PhoneCall,
    titulo: 'Falso Sequestro',
    href: '/golpes/golpe-falso-sequestro',
    urgencia: 'CRÍTICA' as const,
    desc: 'Ligação simulando sequestro de familiar com choro e pressão para transferência Pix imediata.',
    tags: ['Extorsão', 'Pix', 'BO'],
    stat: 'DESLIGUE e confirme',
  },
];

const urgMap = {
  CRÍTICA: { badge: 'badge-red',    border: 'hover:border-red-500/40',    glow: 'group-hover:shadow-[0_0_40px_rgba(239,68,68,0.12)]' },
  ALTA:    { badge: 'badge-yellow', border: 'hover:border-amber-500/35',   glow: 'group-hover:shadow-[0_0_40px_rgba(249,115,22,0.10)]' },
  MÉDIA:   { badge: 'badge-blue',   border: 'hover:border-blue-500/25',    glow: 'group-hover:shadow-[0_0_40px_rgba(59,130,246,0.09)]' },
};

export default async function GolpesIndexPage() {
  // Fetch DB-based guides
  let dbGuias: { slug: string; titulo: string; descricao: string; urgencia: string; icone: string; tags: string[]; categoria: string }[] = [];
  try {
    dbGuias = await prisma.guiaGolpe.findMany({
      where: { publicado: true },
      select: { slug: true, titulo: true, descricao: true, urgencia: true, icone: true, tags: true, categoria: true },
      orderBy: { publishedAt: 'desc' },
    });
  } catch { /* DB unavailable */ }

  // Filter out any DB guides whose slug matches a static one
  const staticHrefs = new Set(GOLPES.map(g => g.href));
  const dynamicGuias = dbGuias.filter(g => !staticHrefs.has(`/golpes/${g.slug}`));

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe' }]} />
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient py-14 bg-grid-pattern">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Tipos de Golpe</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="icon-badge icon-badge-red">
              <Shield className="w-5 h-5" />
            </div>
            <span className="badge-red text-xs">Biblioteca de defesa</span>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Qual tipo de golpe<br />
            <span className="gradient-text">você sofreu?</span>
          </h1>
          <p className="text-lg text-white/60 mb-8 leading-relaxed max-w-2xl">
            Guias jurídicos completos para cada tipo de golpe digital. Orientações atualizadas, prazos legais e documentos prontos para usar.
          </p>

          {/* Urgency note */}
          <div className="inline-flex items-center gap-2.5 bg-red-950/60 border border-red-500/30 rounded-xl px-4 py-2.5 text-sm text-red-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Golpe via Pix ou roubo de celular? <strong className="text-white">Aja nas próximas horas</strong> — os prazos são críticos.</span>
          </div>
        </div>
      </section>

      {/* ── Cards ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GOLPES.map((g) => {
              const { Icon } = g;
              const u = urgMap[g.urgencia];
              return (
                <Link
                  key={g.href}
                  href={g.href}
                  className={`card group flex flex-col transition-all duration-300 hover:-translate-y-1 ${u.border} ${u.glow}`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="icon-badge icon-badge-ember group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className={`badge ${u.badge}`}>{g.urgencia}</span>
                  </div>

                  <h2 className="font-heading font-bold text-white mb-2 text-[0.95rem] group-hover:text-ember-300 transition-colors leading-snug">
                    {g.titulo}
                  </h2>

                  <p className="text-sm text-white/40 mb-4 leading-relaxed flex-1">{g.desc}</p>

                  <p className="text-[0.72rem] font-bold text-green-400 mb-4">{g.stat}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {g.tags.map((tag) => (
                      <span key={tag} className="text-[0.62rem] font-semibold bg-white/[0.05] border border-white/[0.07] text-white/30 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                    <span className="text-[0.78rem] font-semibold text-ember-400/50 group-hover:text-ember-400 transition-colors">
                      Ver guia completo
                    </span>
                    <ArrowRight className="w-4 h-4 text-ember-400/40 group-hover:text-ember-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Dynamic DB-based guides */}
          {dynamicGuias.length > 0 && (
            <>
              <h2 className="font-heading font-bold text-white text-xl mt-12 mb-6">Outros golpes identificados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {dynamicGuias.map((g) => {
                  const Icon = ICON_MAP[g.icone] || Shield;
                  const urgLabel = g.urgencia === 'CRITICA' ? 'CRÍTICA' : g.urgencia === 'ALTA' ? 'ALTA' : 'MÉDIA';
                  const u = urgMap[urgLabel] || urgMap['MÉDIA'];
                  return (
                    <Link
                      key={g.slug}
                      href={`/golpes/${g.slug}`}
                      className={`card group flex flex-col transition-all duration-300 hover:-translate-y-1 ${u.border} ${u.glow}`}
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div className="icon-badge icon-badge-ember group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-5 h-5" strokeWidth={1.75} />
                        </div>
                        <span className={`badge ${u.badge}`}>{urgLabel}</span>
                      </div>
                      <h2 className="font-heading font-bold text-white mb-2 text-[0.95rem] group-hover:text-ember-300 transition-colors leading-snug">
                        {g.titulo}
                      </h2>
                      <p className="text-sm text-white/40 mb-4 leading-relaxed flex-1">{g.descricao.slice(0, 120)}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {g.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[0.62rem] font-semibold bg-white/[0.05] border border-white/[0.07] text-white/30 px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                        <span className="text-[0.78rem] font-semibold text-ember-400/50 group-hover:text-ember-400 transition-colors">
                          Ver guia completo
                        </span>
                        <ArrowRight className="w-4 h-4 text-ember-400/40 group-hover:text-ember-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* CTA */}
          <div className="mt-14 card border-ember-500/25 bg-ember-500/5 text-center">
            <h3 className="font-bold text-white text-xl mb-2">Não sabe qual é o seu caso?</h3>
            <p className="text-white/60 text-sm mb-6">
              Descreva o que aconteceu em até 3 linhas e nossa IA identifica o golpe e gera seu plano de ação.
            </p>
            <Link href="/#classificador" className="btn-primary mx-auto">
              <Zap className="w-4 h-4" />
              Identificar meu golpe — grátis
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
