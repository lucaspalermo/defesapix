import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Zap, Clock, CheckCircle, ArrowRight, FileText, AlertTriangle, Star } from 'lucide-react';
import MedCalculator from '@/components/home/MedCalculator';

export const metadata: Metadata = {
  title: 'Golpe Pix: O Que Fazer? Guia Completo para Recuperar seu Dinheiro [2025]',
  description:
    'Caiu num golpe Pix? Saiba exatamente o que fazer nos primeiros minutos: acione o MED, registre BO, notifique o banco. Guia completo com documentos prontos. Prazo de 72h.',
  alternates: { canonical: 'https://defesapix.com.br/golpe-pix-o-que-fazer' },
  keywords: [
    'golpe pix o que fazer',
    'cai num golpe pix',
    'como recuperar dinheiro golpe pix',
    'golpe pix como agir',
    'pix golpe recuperar',
    'MED pix como acionar',
    'prazo 72 horas pix golpe',
    'golpe pix banco devolve',
  ],
  openGraph: {
    title: 'Golpe Pix: O Que Fazer? Guia Completo [2025]',
    description: 'Recupere seu dinheiro após golpe Pix. Documentos prontos em 15 minutos. Prazo MED: 72h.',
    type: 'article',
  },
};

const PASSOS = [
  {
    n: 1,
    titulo: 'Ligue para o banco AGORA',
    desc: 'Ligue para o SAC e peça o acionamento do MED (Mecanismo Especial de Devolução). Informe que foi vítima de golpe. O atendente vai registrar a ocorrência e bloquear valores na conta do golpista.',
    tempo: 'Imediato',
    icon: Zap,
  },
  {
    n: 2,
    titulo: 'Registre o Boletim de Ocorrência',
    desc: 'Faça o B.O. online na Delegacia Eletrônica do seu estado. Inclua: comprovante do Pix, prints de conversas, dados da conta destino. O B.O. é obrigatório para o MED.',
    tempo: '15 minutos',
    icon: FileText,
  },
  {
    n: 3,
    titulo: 'Envie notificação formal ao banco',
    desc: 'Protocole uma notificação extrajudicial no banco com base no CDC (Art. 14). Isso cria registro oficial e ampara um eventual processo judicial.',
    tempo: '10 minutos',
    icon: Shield,
  },
  {
    n: 4,
    titulo: 'Reclame no Banco Central',
    desc: 'Acesse o portal Meu BC (bcb.gov.br) e registre reclamação. O BACEN monitora e pode aplicar sanções ao banco que não acionar o MED corretamente.',
    tempo: '10 minutos',
    icon: AlertTriangle,
  },
];

export default function GolpePixOQueFazerPage() {
  const faqItems = [
    { question: 'O banco é obrigado a devolver o dinheiro do golpe Pix?', answer: 'O banco é obrigado a analisar e acionar o MED em até 72 horas. Se comprovada a fraude e os valores ainda estiverem na conta do golpista, o banco deve devolver. Se o banco negar indevidamente, você pode processar no Juizado Especial Cível.' },
    { question: 'Quanto tempo demora para recuperar o dinheiro?', answer: 'O MED pode bloquear valores em 7 a 20 dias. A contestação bancária leva em média 30 dias. Em casos judiciais, pode levar de 3 a 12 meses.' },
    { question: 'Posso recuperar Pix mesmo sem BO?', answer: 'É possível acionar o MED sem BO, mas o boletim fortalece muito seu caso. Recomendamos registrar o BO online antes de qualquer coisa.' },
    { question: 'Quanto custa para gerar os documentos?', answer: 'O diagnóstico é gratuito. O Kit Completo com 3 documentos (MED + BO + Notificação Bancária) custa R$47 — pagamento único, sem mensalidade.' },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'O que fazer após cair num golpe Pix',
    description: 'Passo a passo para recuperar dinheiro perdido em golpe via Pix usando o MED.',
    totalTime: 'PT45M',
    step: PASSOS.map((p) => ({
      '@type': 'HowToStep',
      name: p.titulo,
      text: p.desc,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#09090F] bg-diagonal-pattern pt-16 pb-20">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-red-600/[0.06] rounded-full blur-[100px] pointer-events-none" />
        <div className="container max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-900/50 text-red-300 rounded-full px-4 py-2 text-xs font-bold mb-6 uppercase tracking-wider">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
            </span>
            Prazo MED: 72 horas
          </div>

          <h1 className="font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-[1.2] tracking-[-0.01em] text-white mb-6">
            Caiu num <span className="gradient-text">Golpe Pix</span>?
            <br />Saiba o que fazer agora.
          </h1>

          <p className="text-lg text-white/50 leading-relaxed mb-8 max-w-xl mx-auto">
            Siga os 4 passos abaixo para maximizar suas chances de recuperar o dinheiro. Cada hora sem agir reduz suas chances.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/ferramentas/pacote-completo" className="btn-primary text-base px-8 py-4">
              <Zap className="w-5 h-5" />
              Gerar documentos — R$47
            </Link>
            <Link href="/ferramentas/diagnostico" className="btn-secondary text-base px-8 py-4">
              Diagnóstico grátis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Passos */}
      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="section-title text-center mb-12">
            4 passos para recuperar seu dinheiro
          </h2>

          <div className="space-y-6">
            {PASSOS.map((passo) => {
              const Icon = passo.icon;
              return (
                <div key={passo.n} className="card flex gap-5 items-start">
                  <div className="step-badge shrink-0">
                    <span className="font-heading font-black text-white text-sm relative z-10">{String(passo.n).padStart(2, '0')}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-heading font-bold text-white">{passo.titulo}</h3>
                      <span className="text-xs text-ember-400 font-bold bg-ember-500/10 border border-ember-500/20 px-2 py-0.5 rounded-full">{passo.tempo}</span>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{passo.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <MedCalculator />

      {/* Social Proof */}
      <section className="section bg-[#0D0D15]">
        <div className="container max-w-3xl">
          <h2 className="section-title text-center mb-10">Quem já recuperou</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { nome: 'M. Santos', cidade: 'SP', valor: 'R$ 4.800', dias: '12 dias', texto: 'Acionei o MED em menos de 24h e recebi o dinheiro de volta.' },
              { nome: 'C. Mendes', cidade: 'MG', valor: 'R$ 2.300', dias: '15 dias', texto: 'O passo a passo me acalmou e o MED funcionou.' },
              { nome: 'P. Rodrigues', cidade: 'PE', valor: 'R$ 890', dias: '8 dias', texto: 'Contestei no banco e recuperei tudo.' },
              { nome: 'L. Oliveira', cidade: 'RJ', valor: 'R$ 6.200', dias: '20 dias', texto: 'Graças aos documentos gerados pela plataforma, o banco devolveu.' },
            ].map((t, i) => (
              <div key={i} className="card">
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-white/60 mb-3">"{t.texto}"</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">{t.nome} — {t.cidade}</span>
                  <span className="text-green-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {t.valor} em {t.dias}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="section-title text-center mb-10">Perguntas frequentes sobre golpe Pix</h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="card">
                <h3 className="font-semibold text-white text-sm mb-2">{item.question}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-ember-900/30 via-[#09090F] to-[#09090F]">
        <div className="container text-center max-w-2xl">
          <h2 className="font-heading text-3xl font-extrabold text-white mb-4">
            Não perca mais tempo
          </h2>
          <p className="text-white/45 mb-8">
            Gere seus documentos agora e dê o primeiro passo para recuperar seu dinheiro.
          </p>
          <Link href="/ferramentas/pacote-completo" className="btn-primary inline-flex text-lg px-10 py-5">
            <Shield className="w-5 h-5" />
            Kit Completo — R$47
          </Link>
          <p className="text-white/20 text-sm mt-4">Garantia de 7 dias. Pagamento único.</p>
        </div>
      </section>

      {/* Internal links */}
      <section className="border-t border-white/[0.05] py-10">
        <div className="container max-w-3xl">
          <h2 className="text-lg font-bold text-white mb-4">Leia também</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog/med-mecanismo-especial-devolucao-pix" className="text-sm text-green-400 hover:text-green-300 transition-colors">O que é o MED? Guia completo</Link>
            <Link href="/blog/banco-responsavel-golpe-digital-stj" className="text-sm text-green-400 hover:text-green-300 transition-colors">Banco é responsável? O que diz o STJ</Link>
            <Link href="/blog/como-registrar-bo-online-golpe-digital" className="text-sm text-green-400 hover:text-green-300 transition-colors">Como registrar BO online</Link>
            <Link href="/calculadora-med" className="text-sm text-green-400 hover:text-green-300 transition-colors">Calculadora de Prazo MED</Link>
            <Link href="/golpes/golpe-pix" className="text-sm text-white/50 hover:text-white transition-colors">Guia completo Golpe Pix</Link>
            <Link href="/ferramentas" className="text-sm text-white/50 hover:text-white transition-colors">Todas as ferramentas</Link>
          </div>
        </div>
      </section>
    </>
  );
}
