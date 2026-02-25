import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Mail, CheckCircle, FileText, ArrowRight, Shield, Globe, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Phishing: Como Identificar e Se Proteger de E-mails e Sites Falsos | DefesaPix',
  description:
    'Recebeu e-mail ou SMS suspeito? Saiba identificar phishing, proteger seus dados e o que fazer se clicou em link falso. Guia completo com exemplos reais.',
  keywords: [
    'phishing o que fazer',
    'e-mail falso banco',
    'site falso como identificar',
    'sms falso banco golpe',
    'link falso golpe',
    'como saber se email é golpe',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-phishing' },
};

const STEPS = [
  {
    step: '1', urgencia: 'IMEDIATO',
    title: 'Não clique em mais nada',
    desc: 'Se você clicou em um link suspeito, feche a página imediatamente. Não insira nenhum dado pessoal, senha ou código.',
    icon: Shield,
    cor: 'red',
  },
  {
    step: '2', urgencia: 'PRIMEIRAS 30MIN',
    title: 'Troque suas senhas',
    desc: 'Se você inseriu dados em um site falso, troque imediatamente a senha do banco, e-mail e redes sociais. Use senhas únicas e fortes.',
    icon: Lock,
    cor: 'red',
  },
  {
    step: '3', urgencia: 'PRIMEIRAS 2H',
    title: 'Ligue para o banco',
    desc: 'Informe que seus dados podem ter sido comprometidos. Solicite bloqueio de transações suspeitas e monitoramento da conta.',
    icon: Globe,
    cor: 'orange',
  },
  {
    step: '4', urgencia: '24H',
    title: 'Registre o Boletim de Ocorrência',
    desc: 'Documente o golpe com prints do e-mail/SMS falso, URL do site e quaisquer dados que foram expostos.',
    icon: FileText,
    cor: 'yellow',
    link: '/ferramentas/gerador-bo',
    linkText: 'Gerar modelo de BO →',
  },
];

const faqItems = [
  {
    question: 'Como identificar um e-mail de phishing?',
    answer: 'Sinais comuns: remetente com domínio estranho (ex: banco@gmail.com), erros de português, urgência extrema ("sua conta será bloqueada"), links que não apontam para o site oficial, pedido de dados pessoais ou senhas. Bancos NUNCA pedem senha por e-mail.',
  },
  {
    question: 'Cliquei em um link falso, o que acontece?',
    answer: 'Se apenas clicou mas não inseriu dados: o risco é menor, mas limpe cookies e verifique se não foi instalado malware. Se inseriu dados: troque todas as senhas imediatamente, ligue para o banco e monitore suas contas por 90 dias.',
  },
  {
    question: 'SMS do banco pode ser golpe?',
    answer: 'Sim. O "smishing" (phishing por SMS) é muito comum. Golpistas enviam SMS se passando pelo banco com links falsos. Regra de ouro: nunca clique em links recebidos por SMS. Acesse o app do banco diretamente.',
  },
  {
    question: 'O banco é responsável se eu cair em phishing?',
    answer: 'Depende. Se o phishing explorou falha nos sistemas do banco (ex: site clonado com certificado similar), o banco pode ser responsabilizado pelo CDC. Se o cliente forneceu dados voluntariamente, a responsabilidade é compartilhada.',
  },
  {
    question: 'Como denunciar sites de phishing?',
    answer: 'Denuncie em: (1) SaferNet Brasil (safernet.org.br); (2) Google Safe Browsing (safebrowsing.google.com); (3) CERT.br (cert.br); (4) Diretamente ao banco que está sendo imitado. Quanto mais denúncias, mais rápido o site é derrubado.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Phishing: Como Identificar e Se Proteger',
  description: 'Guia completo sobre phishing — como identificar e-mails falsos, sites clonados e o que fazer se você caiu.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-02-20',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpePhishingPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Phishing' }]} />
      <HowToSchema
        name="Phishing: O que fazer se clicou em link falso ou site clonado"
        description="Passo a passo para proteger suas contas e dados após cair em golpe de phishing por e-mail, SMS ou site falso."
        totalTime="PT24H"
        steps={[
          { name: 'Não clique em mais nada', text: 'Feche a página falsa imediatamente. Não insira nenhum dado adicional.' },
          { name: 'Troque suas senhas', text: 'Altere a senha do banco, e-mail e redes sociais. Ative autenticação em dois fatores.' },
          { name: 'Ligue para o banco', text: 'Informe o ocorrido e solicite monitoramento da conta e bloqueio de transações suspeitas.' },
          { name: 'Registre o B.O.', text: 'Documente o golpe com prints do e-mail/SMS falso e URL do site.', url: '/ferramentas/gerador-bo' },
          { name: 'Denuncie o site falso', text: 'Denuncie em SaferNet, Google Safe Browsing e diretamente ao banco imitado.' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />

      {/* Hero */}
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/golpes" className="hover:text-white transition-colors">Tipos de Golpe</Link>
            <span>/</span>
            <span className="text-white">Phishing</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Se você clicou em um link suspeito:</strong> troque suas senhas AGORA
              antes de continuar lendo este guia.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Phishing: E-mails e Sites<br />
            <span className="gradient-text">Falsos que Roubam Dados</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Phishing é a principal porta de entrada para golpes digitais no Brasil. Aprenda
            a identificar mensagens falsas, proteger seus dados e o que fazer se já caiu.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/gerador-bo" className="btn-primary">
              <FileText className="w-5 h-5" />
              Gerar modelo de B.O.
            </Link>
            <Link href="/ferramentas/checklist" className="btn-secondary">
              <CheckCircle className="w-5 h-5" />
              Ver checklist completo
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="section">
        <div className="container max-w-4xl">
          {/* What is phishing */}
          <section className="prose-section mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">O que é phishing?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              <strong className="text-white">Phishing</strong> é um tipo de golpe em que criminosos se passam por empresas,
              bancos ou órgãos oficiais para enganar vítimas e roubar dados pessoais, senhas e informações financeiras.
              O nome vem de &quot;fishing&quot; (pescaria) — os golpistas &quot;jogam a isca&quot; e esperam que a vítima morda.
            </p>
          </section>

          {/* Types */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-6">Tipos mais comuns de phishing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { titulo: 'E-mail phishing', desc: 'E-mail falso se passando pelo banco, Receita Federal ou empresa pedindo para "confirmar dados" ou "atualizar cadastro".', icon: Mail },
                { titulo: 'Smishing (SMS)', desc: 'Mensagem de texto com link falso: "Compra aprovada de R$2.999 no seu cartão. Não reconhece? Clique aqui."', icon: AlertTriangle },
                { titulo: 'Site clonado', desc: 'Cópia idêntica do site do seu banco. A URL é ligeiramente diferente (ex: bancodobrasil.com.br → bancodobrasil.net).', icon: Globe },
                { titulo: 'Vishing (telefone)', desc: 'Ligação se passando por central do banco pedindo confirmação de senha, token ou código de segurança.', icon: Shield },
              ].map((tipo) => {
                const Icon = tipo.icon;
                return (
                  <div key={tipo.titulo} className="card border-white/10 group hover:border-red-500/25 transition-all">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3.5 h-3.5 text-red-400" strokeWidth={2} />
                      </div>
                      <h3 className="font-heading font-semibold text-white text-sm leading-snug">{tipo.titulo}</h3>
                    </div>
                    <p className="text-sm text-white/55 leading-relaxed pl-10">{tipo.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* How to identify */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Como identificar phishing</h2>
            <div className="card border-green-500/20 space-y-3">
              {[
                'O remetente usa domínio suspeito (banco@gmail.com, suporte@banco-seguro.xyz)',
                'Erros de gramática e formatação — empresas legítimas revisam suas mensagens',
                'Tom de urgência extrema: "Sua conta será bloqueada em 24h"',
                'Link que não aponta para o site oficial — passe o mouse para ver a URL real',
                'Pedido de dados que o banco NUNCA pede por e-mail: senha, CVV, token',
                'Ofertas boas demais: "Você ganhou R$10.000! Clique para resgatar"',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  <p className="text-white/70 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-6">O que fazer se caiu em phishing</h2>
            <div className="space-y-4">
              {STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className={`border rounded-2xl p-5 transition-all duration-200 ${step.cor === 'red' ? 'border-red-500/30 bg-red-500/5' : step.cor === 'orange' ? 'border-ember-500/30 bg-ember-500/5' : 'border-gold-500/30 bg-gold-500/5'}`}>
                    <div className="flex items-start gap-4">
                      <div className="icon-badge icon-badge-ember shrink-0">
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`badge text-xs ${step.cor === 'red' ? 'badge-red' : 'badge-yellow'}`}>
                            {step.urgencia}
                          </span>
                          <h3 className="font-bold text-white text-sm">Passo {step.step}: {step.title}</h3>
                        </div>
                        <p className="text-sm text-white/70 mb-3">{step.desc}</p>
                        {step.link && (
                          <Link href={step.link} className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-semibold">
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
          </section>

          {/* CTA */}
          <div className="card border-green-500/30 bg-green-500/5 text-center">
            <h3 className="font-bold text-white text-xl mb-3">Precisa documentar o golpe?</h3>
            <p className="text-white/70 mb-6">
              Gere o B.O. e a notificação ao banco com referências legais automaticamente incluídas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/gerador-bo" className="btn-primary">
                <FileText className="w-4 h-4" />
                Gerar modelo de B.O.
              </Link>
              <Link href="/ferramentas/checklist" className="btn-secondary">
                <CheckCircle className="w-4 h-4" />
                Ver checklist completo
              </Link>
            </div>
          </div>
        </div>
      </article>

      <FAQSection items={faqItems} />

      {/* Related */}
      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-6">Conteúdo relacionado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { titulo: 'Golpe do Cartão', href: '/golpes/golpe-cartao', emoji: '💳' },
              { titulo: 'App / Site Falso', href: '/golpes/golpe-clone-app', emoji: '🏦' },
              { titulo: 'Golpe via Pix', href: '/golpes/golpe-pix', emoji: '⚡' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card hover:border-green-500/30 transition-all group">
                <span className="text-2xl mb-2 block">{item.emoji}</span>
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
