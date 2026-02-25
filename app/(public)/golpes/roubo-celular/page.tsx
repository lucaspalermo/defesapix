import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle, Phone, Shield, FileText, ArrowRight, CheckCircle,
  Lock, Wifi, CreditCard, Key, Clock, ExternalLink, Scale,
} from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Celular Roubado: O Que Fazer Agora? Guia de Emergência | Central de Defesa Digital',
  description:
    'Roubaram seu celular? Aja nos próximos 5 minutos: bloqueie o SIM, congele o banco, bloqueie o IMEI. Guia de emergência com números diretos das operadoras.',
  keywords: [
    'celular roubado o que fazer',
    'roubo de celular bloqueio',
    'bloquear chip celular roubado',
    'bloquear banco celular roubado',
    'bloquear imei celular roubado',
    'celular furtado o que fazer',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/roubo-celular' },
};

const OPERADORAS = [
  { nome: 'Claro',  numero: '1052',           opcao: '*100',        cor: 'red',    desc: 'Bloqueio de linha 24h' },
  { nome: 'Vivo',   numero: '1058',           opcao: '0800 723 3030', cor: 'violet', desc: 'Bloqueio de linha 24h' },
  { nome: 'TIM',    numero: '1056',           opcao: '0800 741 4141', cor: 'blue',   desc: 'Bloqueio de linha 24h' },
  { nome: 'Oi',     numero: '1057',           opcao: '0800 031 0031', cor: 'yellow', desc: 'Bloqueio de linha 24h' },
];

const STEPS = [
  {
    n: '1', tempo: 'AGORA — 0 a 2 min', cor: 'red',
    title: 'Ligue para sua operadora e bloqueie o SIM',
    desc: 'O criminoso pode usar seu chip para confirmar transações bancárias via SMS. Esse é o passo mais urgente de todos.',
    action: 'Ligue de qualquer telefone',
    icon: Phone,
  },
  {
    n: '2', tempo: 'AGORA — 2 a 5 min', cor: 'red',
    title: 'Bloqueie seu banco pelo app em outro dispositivo',
    desc: 'Se tiver acesso em outro celular ou computador, entre no app do banco e bloqueie cartões, Pix e transferências. Depois ligue para o SAC para bloqueio total.',
    action: 'SAC do banco — bloqueio emergencial',
    icon: CreditCard,
  },
  {
    n: '3', tempo: 'PRIMEIROS 15 MIN', cor: 'orange',
    title: 'Troque a senha do Google (Android) ou Apple ID (iPhone)',
    desc: 'O acesso à conta principal do sistema operacional dá ao ladrão acesso a e-mails, autenticadores e backups de senhas.',
    links: [
      { texto: 'Conta Google → Segurança', href: 'https://myaccount.google.com/security' },
      { texto: 'Apple ID → iforgot.apple.com', href: 'https://iforgot.apple.com' },
    ],
    icon: Key,
  },
  {
    n: '4', tempo: 'PRIMEIROS 30 MIN', cor: 'orange',
    title: 'Bloqueie o IMEI via Anatel',
    desc: 'O bloqueio do IMEI impede que o aparelho funcione em qualquer operadora no Brasil, tornando-o inútil para revenda.',
    links: [
      { texto: 'Anatel — Bloqueio de IMEI', href: 'https://sistemas.anatel.gov.br/fcd' },
      { texto: 'Ligar para Anatel: 1331', href: 'tel:1331' },
    ],
    icon: Shield,
  },
  {
    n: '5', tempo: 'PRIMEIRA HORA', cor: 'yellow',
    title: 'Altere senhas de apps financeiros e e-mail principal',
    desc: 'Priorize: WhatsApp Web (desconecte todos os dispositivos), Instagram/Facebook, e-mail, e-wallets (PayPal, Mercado Pago).',
    action: 'Desconecte sessões ativas via web browser em outro dispositivo',
    icon: Wifi,
  },
  {
    n: '6', tempo: 'PRIMEIRAS 2H', cor: 'blue',
    title: 'Registre o Boletim de Ocorrência',
    desc: 'O BO por roubo ou furto de celular é necessário para o bloqueio do IMEI e para qualquer contestação bancária subsequente. Pode ser feito online.',
    link: '/ferramentas/gerador-bo',
    linkText: 'Gerar modelo de BO gratuito →',
    icon: FileText,
  },
  {
    n: '7', tempo: 'PRIMEIRAS 4H', cor: 'blue',
    title: 'Verifique transações não autorizadas',
    desc: 'Se o criminoso realizou transações com seu celular antes do bloqueio, acione o MED (para Pix) e/ou solicite contestação bancária imediatamente.',
    link: '/ferramentas/gerador-contestacao-med',
    linkText: 'Acionar MED para Pix fraudulentos →',
    icon: Lock,
  },
];

const BANCOS_EMERGENCIA = [
  { banco: 'Nubank',          sac: '0800 591 2117' },
  { banco: 'Itaú',            sac: '0800 728 0728' },
  { banco: 'Bradesco',        sac: '0800 704 8383' },
  { banco: 'Santander',       sac: '0800 702 3535' },
  { banco: 'Banco do Brasil', sac: '0800 729 0722' },
  { banco: 'Caixa',           sac: '0800 726 0101' },
  { banco: 'Inter',           sac: '3003 4070'     },
  { banco: 'C6 Bank',         sac: '3003 6116'     },
  { banco: 'PicPay',          sac: '3003 3699'     },
  { banco: 'Mercado Pago',    sac: '0800 637 7246' },
];

const faqItems = [
  {
    question: 'Tenho quanto tempo antes que o ladrão acesse meu banco?',
    answer: 'Se você usa autenticação por SMS, o ladrão pode acessar contas em minutos. Apps de banco com biometria dão mais tempo, mas não conte com isso. Aja nos primeiros 5 minutos: bloqueie o SIM na operadora e ligue para o banco.',
  },
  {
    question: 'Se o ladrão fez Pix com meu celular, dá para recuperar?',
    answer: 'Sim, se agir rápido. O Mecanismo Especial de Devolução (MED) do Banco Central pode bloquear valores ainda na conta do destinatário. Acione o SAC do banco imediatamente e gere a contestação MED. A eficácia diminui com o tempo.',
  },
  {
    question: 'Devo pagar a taxa de desbloqueio que os ladrões estão pedindo?',
    answer: 'NUNCA. Não existe taxa legítima de "desbloqueio". Isso é um segundo golpe — os criminosos cobram para "devolver" o celular ou as senhas. Não pague e registre BO imediatamente.',
  },
  {
    question: 'Posso rastrear o celular após o roubo?',
    answer: 'Se o aparelho ainda estiver ligado: Android via google.com/android/find, iPhone via icloud.com/find. Use a função "Modo Perdido" para bloquear remotamente. Mas não arrisque sua segurança para recuperar o aparelho — deixe isso para a polícia.',
  },
  {
    question: 'O que é o bloqueio de IMEI e como funciona?',
    answer: 'O IMEI é o número único do aparelho. O bloqueio via Anatel impede que o celular funcione em qualquer operadora brasileira. Você precisará do número IMEI (geralmente na caixa do aparelho ou em conta.operadora.com.br) e do BO registrado.',
  },
];

const colorBorder: Record<string, string> = {
  red:    'border-red-500/40 bg-red-500/5',
  orange: 'border-ember-500/35 bg-ember-500/5',
  yellow: 'border-amber-500/30 bg-amber-500/5',
  blue:   'border-blue-500/25 bg-blue-500/5',
};
const colorBadge: Record<string, string> = {
  red: 'badge-red', orange: 'badge-yellow', yellow: 'badge-yellow', blue: 'badge-blue',
};
const colorIcon: Record<string, string> = {
  red: 'icon-badge-red', orange: 'icon-badge-ember', yellow: 'icon-badge-gold', blue: 'icon-badge-blue',
};
const opColor: Record<string, string> = {
  red: 'border-red-500/30 bg-red-500/10', violet: 'border-violet-500/30 bg-violet-500/10',
  blue: 'border-blue-500/30 bg-blue-500/10', yellow: 'border-amber-500/30 bg-amber-500/10',
};

export default function RouboCelularPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Roubo de Celular' }]} />
      <HowToSchema
        name="Celular Roubado: O que fazer nos primeiros minutos"
        description="Protocolo de emergência para bloquear SIM, banco, IMEI e proteger suas contas após roubo ou furto de celular."
        totalTime="PT4H"
        steps={[
          { name: 'Ligue para sua operadora e bloqueie o SIM', text: 'O criminoso pode usar seu chip para confirmar transações bancárias via SMS. Esse é o passo mais urgente de todos.' },
          { name: 'Bloqueie seu banco pelo app em outro dispositivo', text: 'Se tiver acesso em outro celular ou computador, entre no app do banco e bloqueie cartões, Pix e transferências.' },
          { name: 'Troque a senha do Google ou Apple ID', text: 'O acesso à conta principal do sistema operacional dá ao ladrão acesso a e-mails, autenticadores e backups de senhas.' },
          { name: 'Bloqueie o IMEI via Anatel', text: 'O bloqueio do IMEI impede que o aparelho funcione em qualquer operadora no Brasil, tornando-o inútil para revenda.' },
          { name: 'Altere senhas de apps financeiros e e-mail principal', text: 'Priorize: WhatsApp Web, Instagram/Facebook, e-mail, e-wallets (PayPal, Mercado Pago).' },
          { name: 'Registre o Boletim de Ocorrência', text: 'O BO por roubo ou furto é necessário para o bloqueio do IMEI e para qualquer contestação bancária subsequente.', url: '/ferramentas/gerador-bo' },
          { name: 'Verifique transações não autorizadas', text: 'Se o criminoso realizou transações com seu celular antes do bloqueio, acione o MED para Pix e solicite contestação bancária.', url: '/ferramentas/gerador-contestacao-med' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient py-14 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/golpes" className="hover:text-white transition-colors">Tipos de Golpe</Link>
            <span>/</span>
            <span className="text-white">Roubo de Celular</span>
          </div>

          {/* Emergency banner */}
          <div className="flex items-center gap-3 bg-red-900/60 border border-red-500/60 rounded-2xl px-5 py-4 mb-8 animate-pulse">
            <div className="relative w-8 h-8 shrink-0">
              <span className="absolute inset-0 rounded-full bg-red-500/40 animate-ping" />
              <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-red-600">
                <AlertTriangle className="w-4 h-4 text-white" />
              </span>
            </div>
            <div>
              <p className="font-black text-red-300 text-sm uppercase tracking-wide">EMERGÊNCIA — Aja nos próximos 5 minutos</p>
              <p className="text-red-200/70 text-xs mt-0.5">Cada minuto que passa aumenta o risco de acesso às suas contas.</p>
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Celular Roubado:<br />
            <span className="text-red-400">Faça isso AGORA</span>
          </h1>
          <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-2xl">
            Protocolo de emergência para bloquear SIM, banco e IMEI nos primeiros minutos.
            Sem formulário, sem espera — números diretos abaixo.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="#operadoras" className="btn-primary">
              <Phone className="w-5 h-5" />
              Ver números das operadoras
            </Link>
            <Link href="/ferramentas/gerador-bo" className="btn-secondary">
              <FileText className="w-5 h-5" />
              Registrar BO de roubo
            </Link>
          </div>
        </div>
      </section>

      {/* ── Operadoras ───────────────────────────────────────── */}
      <section id="operadoras" className="py-8 bg-red-950/30 border-y border-red-500/20">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-5 h-5 text-red-400" />
            <h2 className="font-bold text-white">Passo 1 — Ligue agora para a sua operadora</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {OPERADORAS.map((op) => (
              <div key={op.nome} className={`rounded-2xl border p-4 ${opColor[op.cor]}`}>
                <p className="font-bold text-white text-sm mb-1">{op.nome}</p>
                <p className="font-mono text-2xl font-black text-white mb-1">{op.numero}</p>
                <p className="text-xs text-white/50">{op.opcao}</p>
                <p className="text-xs text-white/40 mt-1">{op.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-3">
            Ligue de qualquer celular ou telefone fixo. Diga que seu chip foi roubado e solicite bloqueio imediato.
          </p>
        </div>
      </section>

      {/* ── Steps ────────────────────────────────────────────── */}
      <article className="section">
        <div className="container max-w-4xl">
          <h2 className="font-heading font-bold text-2xl text-white mb-8">Protocolo completo — do minuto 0 às próximas horas</h2>

          <div className="space-y-4">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className={`border rounded-2xl p-5 transition-all duration-200 ${colorBorder[step.cor] ?? 'border-white/10 bg-white/5'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`icon-badge ${colorIcon[step.cor]} shrink-0`}>
                      <Icon className="w-4 h-4" strokeWidth={1.75} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`badge text-xs ${colorBadge[step.cor]}`}>{step.tempo}</span>
                        <h3 className="font-bold text-white text-sm">Passo {step.n}: {step.title}</h3>
                      </div>
                      <p className="text-sm text-white/70 mb-3">{step.desc}</p>
                      {'action' in step && step.action && (
                        <p className="text-xs text-white/50 italic">{step.action}</p>
                      )}
                      {'links' in step && step.links && (
                        <div className="flex flex-wrap gap-3 mt-2">
                          {step.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-semibold"
                            >
                              {l.texto}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      )}
                      {'link' in step && step.link && (
                        <Link
                          href={step.link}
                          className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-semibold mt-2"
                        >
                          {step.linkText}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banks emergency ──────────────────────────────────── */}
          <div className="mt-12">
            <h2 className="font-heading font-bold text-xl text-white mb-5">SAC dos bancos — bloqueio de emergência</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {BANCOS_EMERGENCIA.map((b) => (
                <div key={b.banco} className="card border-white/10 text-center p-3">
                  <p className="text-xs text-white/50 mb-1">{b.banco}</p>
                  <p className="font-mono text-sm font-bold text-white">{b.sac}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/30 mt-3">
              Diga: "Quero bloquear minha conta emergencialmente — meu celular foi roubado".
              Solicite bloqueio de Pix, cartões e transferências.
            </p>
          </div>

          {/* Checklist ────────────────────────────────────────── */}
          <div className="mt-12 card border-green-500/20">
            <h2 className="font-bold text-white mb-5 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Checklist de recuperação — salve e acompanhe
            </h2>
            <div className="space-y-2">
              {[
                { item: 'Chip bloqueado na operadora', urgencia: 'IMEDIATO' },
                { item: 'Banco/cartões bloqueados (SAC)', urgencia: 'IMEDIATO' },
                { item: 'Senha Google Account / Apple ID alterada', urgencia: '15 MIN' },
                { item: 'IMEI bloqueado no site da Anatel', urgencia: '30 MIN' },
                { item: 'WhatsApp desconectado (todos os dispositivos)', urgencia: '1H' },
                { item: 'E-mail principal com nova senha', urgencia: '1H' },
                { item: 'Instagram / Facebook com nova senha', urgencia: '1H' },
                { item: 'BO registrado (furto/roubo de celular)', urgencia: '2H' },
                { item: 'Transações não autorizadas verificadas', urgencia: '4H' },
                { item: 'MED acionado (se houve Pix não autorizado)', urgencia: '72H' },
              ].map(({ item, urgencia }) => (
                <div key={item} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded border border-white/20 shrink-0" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                  <span className={`text-[0.6rem] font-black uppercase px-2 py-0.5 rounded-full shrink-0 ${
                    urgencia === 'IMEDIATO' ? 'bg-red-500/20 text-red-400' :
                    urgencia === '15 MIN' || urgencia === '30 MIN' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>{urgencia}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legal section ────────────────────────────────────── */}
          <div className="mt-12">
            <h2 className="font-heading font-bold text-xl text-white mb-4">Seus direitos legais</h2>
            <div className="space-y-3">
              {[
                { lei: 'CP — Art. 157', desc: 'Roubo: subtração mediante violência ou grave ameaça — pena: 4 a 10 anos' },
                { lei: 'CP — Art. 155', desc: 'Furto: subtração sem violência — pena: 1 a 4 anos (qualificado para celular)' },
                { lei: 'CDC — Art. 14', desc: 'Banco é responsável por transações fraudulentas realizadas com dados obtidos via roubo' },
                { lei: 'Lei 14.155/2021', desc: 'Crimes digitais praticados com dados obtidos mediante violência têm penas majoradas' },
                { lei: 'Resolução BCB 93/2021', desc: 'MED aplica-se a Pix realizados por terceiros mediante fraude ou roubo' },
              ].map((item) => (
                <div key={item.lei} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="badge-green shrink-0 font-mono text-xs">{item.lei}</span>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Money recovery section ───────────────────────────── */}
          <div className="mt-12">
            <div className="flex items-start gap-3 bg-amber-950/40 border border-amber-500/40 rounded-2xl px-5 py-4 mb-6">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-amber-300 mb-1">Se já fizeram transferências com seu celular</p>
                <p className="text-amber-200/70 text-sm">
                  Você pode recuperar o dinheiro. A probabilidade depende do tempo decorrido desde o roubo e do caminho escolhido.
                </p>
              </div>
            </div>

            <h2 className="font-heading font-bold text-xl text-white mb-5">Probabilidade de recuperação do dinheiro</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {([
                {
                  prazo: 'Menos de 72h',
                  prob: 'Alta',
                  corText: 'text-green-400',
                  corBorder: 'border-green-500/30 bg-green-500/5',
                  desc: 'MED ainda ativo. Banco é obrigado a tentar devolução imediata via Bacen. Acione agora.',
                  emoji: '🟢',
                },
                {
                  prazo: '72h a 80 dias',
                  prob: 'Média',
                  corText: 'text-amber-400',
                  corBorder: 'border-amber-500/30 bg-amber-500/5',
                  desc: 'MED encerrado. CDC Art. 14 garante contestação bancária por falha de segurança.',
                  emoji: '🟡',
                },
                {
                  prazo: 'Acima de 80 dias',
                  prob: 'Baixa / Judicial',
                  corText: 'text-red-400',
                  corBorder: 'border-red-500/30 bg-red-500/5',
                  desc: 'Contestação bancária encerrada. Caminho via Juizado Especial Cível ou ação ordinária.',
                  emoji: '🔴',
                },
              ] as const).map(({ prazo, prob, corText, corBorder, desc, emoji }) => (
                <div key={prazo} className={`card ${corBorder}`}>
                  <div className="text-2xl mb-2">{emoji}</div>
                  <p className="text-xs text-white/40 uppercase tracking-wide mb-1">{prazo}</p>
                  <p className={`font-black text-lg mb-2 ${corText}`}>{prob}</p>
                  <p className="text-xs text-white/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <h3 className="font-bold text-white mb-4">Os 3 caminhos para recuperar o dinheiro</h3>
            <div className="space-y-3 mb-6">
              {([
                {
                  num: '1',
                  titulo: 'MED — Mecanismo Especial de Devolução (Pix)',
                  prazo: 'Até 72h após o Pix',
                  corNum: 'bg-green-500/20 text-green-400',
                  corBorder: 'border-green-500/30 bg-green-500/5',
                  badgeCls: 'badge-green',
                  desc: 'Acionado via SAC do banco. O Banco Central bloqueia o valor na conta do destinatário e inicia a devolução. Mais eficaz quando acionado em até 72 horas do Pix fraudulento.',
                  cta: { texto: 'Gerar Contestação MED', href: '/ferramentas/gerador-contestacao-med' },
                },
                {
                  num: '2',
                  titulo: 'Contestação Bancária — CDC Art. 14',
                  prazo: 'Até 80 dias',
                  corNum: 'bg-amber-500/20 text-amber-400',
                  corBorder: 'border-amber-500/30 bg-amber-500/5',
                  badgeCls: 'badge-yellow',
                  desc: 'O banco tem responsabilidade objetiva por transações realizadas via fraude. Formalize via notificação extrajudicial com o BO anexo. O banco tem 30 dias para responder.',
                  cta: { texto: 'Gerar Notificação ao Banco', href: '/ferramentas/notificacao-banco' },
                },
                {
                  num: '3',
                  titulo: 'Juizado Especial Cível (JEC)',
                  prazo: 'Qualquer momento',
                  corNum: 'bg-blue-500/20 text-blue-400',
                  corBorder: 'border-blue-500/30 bg-blue-500/5',
                  badgeCls: 'badge-blue',
                  desc: 'Causas até R$20.000 dispensam advogado. Apresente o BO, extratos bancários e histórico da contestação. STJ consolida responsabilidade objetiva dos bancos em fraudes eletrônicas.',
                  cta: null,
                },
              ] as const).map(({ num, titulo, prazo, corNum, corBorder, badgeCls, desc, cta }) => (
                <div key={num} className={`border rounded-2xl p-5 ${corBorder}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${corNum}`}>
                      {num}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className="font-bold text-white text-sm">{titulo}</h4>
                        <span className={`badge text-[0.6rem] ${badgeCls}`}>{prazo}</span>
                      </div>
                      <p className="text-sm text-white/60 mb-3">{desc}</p>
                      {cta && (
                        <Link href={cta.href} className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-semibold">
                          {cta.texto}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3 mb-2">
              <Scale className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <p className="text-xs text-white/60 leading-relaxed">
                <span className="text-white font-semibold">STJ — Responsabilidade objetiva dos bancos:</span>{' '}
                O Superior Tribunal de Justiça consolidou o entendimento de que instituições financeiras respondem
                independentemente de culpa por fraudes eletrônicas contra clientes, incluindo roubo de celular
                com posterior acesso a contas (REsp 2.025.303, AgRg AREsp 2.168.532 e outros).
              </p>
            </div>
          </div>

          {/* CTA ──────────────────────────────────────────────── */}
          <div className="mt-12 card border-green-500/30 bg-green-500/5 text-center">
            <h3 className="font-bold text-white text-xl mb-3">Se houve transações não autorizadas</h3>
            <p className="text-white/70 mb-6 text-sm">
              Gere a Contestação MED, o BO e a Notificação Bancária em minutos —
              todos personalizados com seus dados.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/pacote-completo" className="btn-primary">
                <FileText className="w-4 h-4" />
                Pacote Emergência — 3 documentos
              </Link>
              <Link href="/ferramentas/gerador-bo" className="btn-secondary">
                <Shield className="w-4 h-4" />
                Gerar BO de roubo (grátis)
              </Link>
            </div>
          </div>
        </div>
      </article>

      <FAQSection items={faqItems} />

      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-6">Conteúdo relacionado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { titulo: 'Golpe via Pix — MED', href: '/golpes/golpe-pix' },
              { titulo: 'Clonagem de WhatsApp', href: '/golpes/golpe-whatsapp' },
              { titulo: 'Pacote Emergência — 3 PDFs', href: '/ferramentas/pacote-completo' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card hover:border-green-500/30 transition-all group">
                <span className="text-sm font-semibold text-white/80 group-hover:text-green-400 transition-colors">
                  {item.titulo} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
