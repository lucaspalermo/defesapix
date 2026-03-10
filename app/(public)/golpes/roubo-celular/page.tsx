import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle, Shield, FileText, Lock,
} from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Celular Roubado: O Que Fazer Agora? Guia de Emergência',
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


const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Celular Roubado: O Que Fazer Agora? Guia de Emergência',
  description: 'Roubaram seu celular? Aja nos próximos 5 minutos: bloqueie o SIM, congele o banco, bloqueie o IMEI. Guia de emergência completo.',
  author: { '@type': 'Organization', name: 'DefesaPix', url: 'https://defesapix.com.br' },
  publisher: {
    '@type': 'Organization',
    name: 'DefesaPix',
    logo: { '@type': 'ImageObject', url: 'https://defesapix.com.br/favicon.svg' },
  },
  datePublished: '2025-02-18',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'pt-BR',
  url: 'https://defesapix.com.br/golpes/roubo-celular',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://defesapix.com.br/golpes/roubo-celular' },
  image: 'https://defesapix.com.br/opengraph-image',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Roubo de Celular' }]} />
      <HowToSchema
        name="Celular Roubado: O que fazer nos primeiros minutos"
        description="Protocolo de emergência para bloquear SIM, banco, IMEI e proteger suas contas após roubo ou furto de celular."
        totalTime="PT4H"
        steps={[
          { name: 'Identifique o golpe', text: 'Confirme que você foi vítima e reúna todas as evidências disponíveis.' },
          { name: 'Acesse o Kit Completo DefesaPix', text: 'Em defesapix.com.br, preencha seus dados e receba o plano de ação completo com 5 documentos jurídicos por R$47.', url: '/ferramentas/pacote-completo' },
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
            O tempo é o fator mais importante para proteger suas contas e seu dinheiro.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/ferramentas/pacote-completo" className="btn-primary">
              <FileText className="w-5 h-5" />
              Kit Completo — R$47
            </Link>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container max-w-4xl">

          {/* Solution Paywall */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-4">Caiu nesse golpe? Existe solucao.</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Existem prazos legais que nao podem ser perdidos e documentos juridicos especificos que voce precisa protocolar corretamente. Um erro no documento pode comprometer toda a sua recuperacao.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Documentos', value: '5', sub: 'prontos para protocolar' },
                { label: 'Tempo', value: '15 min', sub: 'para gerar tudo' },
                { label: 'Investimento', value: 'R$47', sub: 'pagamento unico' },
              ].map((item) => (
                <div key={item.label} className="card text-center border-ember-500/20">
                  <p className="text-xs text-white/50 mb-1">{item.label}</p>
                  <p className="text-2xl font-bold text-ember-400">{item.value}</p>
                  <p className="text-xs text-white/40">{item.sub}</p>
                </div>
              ))}
            </div>
            <div className="card border-ember-500/30 bg-gradient-to-br from-ember-500/[0.08] to-red-500/[0.05]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-ember-500/20 border border-ember-500/30 flex items-center justify-center shrink-0">
                  <Lock className="w-6 h-6 text-ember-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-lg mb-2">Plano de Acao Completo + 5 Documentos</h3>
                  <p className="text-sm text-white/60 mb-4">
                    No Kit Completo voce recebe o passo a passo detalhado e personalizado para o seu tipo de golpe, com todos os documentos juridicos prontos:
                  </p>
                  <div className="space-y-2 mb-6">
                    {['Contestacao MED personalizada', 'Boletim de Ocorrencia completo', 'Notificacao Bancaria formal', 'Reclamacao BACEN', 'Reclamacao Procon'].map((doc) => (
                      <div key={doc} className="flex items-center gap-2 text-sm text-white/40">
                        <Lock className="w-3 h-3 text-ember-400/60" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/ferramentas/pacote-completo" className="btn-primary">
                    <FileText className="w-4 h-4" />
                    Acessar Kit Completo — R$47
                  </Link>
                  <p className="text-xs text-white/30 mt-3">Preencha seus dados uma vez. Receba tudo pronto em 15 minutos.</p>
                </div>
              </div>
            </div>
          </section>

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
              <Link href="/ferramentas/pacote-completo" className="btn-secondary">
                <Shield className="w-4 h-4" />
                Kit Completo — R$47
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
