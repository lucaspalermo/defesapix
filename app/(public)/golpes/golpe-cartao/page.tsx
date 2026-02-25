import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CreditCard, CheckCircle, FileText, ArrowRight, Shield, Phone } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do Cartão de Crédito: O Que Fazer? Guia Completo',
  description:
    'Cartão clonado ou compra não reconhecida? Saiba como contestar transações, bloquear o cartão e recuperar seu dinheiro. Guia completo com prazos e direitos legais.',
  keywords: [
    'cartão clonado o que fazer',
    'compra não reconhecida cartão crédito',
    'contestar transação cartão',
    'golpe cartão de crédito',
    'fraude cartão crédito débito',
    'chargeback cartão brasil',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-cartao' },
};

const STEPS = [
  {
    step: '1', urgencia: 'IMEDIATO',
    title: 'Bloqueie o cartão pelo app do banco',
    desc: 'Acesse o app do seu banco e bloqueie o cartão imediatamente. A maioria permite bloqueio temporário ou definitivo com um toque.',
    icon: CreditCard,
    cor: 'red',
  },
  {
    step: '2', urgencia: 'PRIMEIRAS 2H',
    title: 'Ligue para a central do cartão',
    desc: 'Informe as transações não reconhecidas e solicite a contestação formal (chargeback). Anote o número do protocolo.',
    icon: Phone,
    cor: 'orange',
  },
  {
    step: '3', urgencia: 'PRIMEIRAS 24H',
    title: 'Registre o Boletim de Ocorrência',
    desc: 'O B.O. é essencial para a contestação formal junto ao banco e para qualquer ação judicial posterior.',
    icon: Shield,
    cor: 'orange',
    link: '/ferramentas/pacote-completo',
    linkText: 'Kit Completo — R$47 →',
  },
  {
    step: '4', urgencia: '48H',
    title: 'Notifique o banco formalmente por escrito',
    desc: 'Envie notificação extrajudicial documentando as transações fraudulentas e exigindo o estorno com base no CDC.',
    icon: FileText,
    cor: 'yellow',
    link: '/ferramentas/pacote-completo',
    linkText: 'Kit Completo — R$47 →',
  },
];

const faqItems = [
  {
    question: 'Qual o prazo para contestar compra não reconhecida no cartão?',
    answer: 'A maioria dos bancos aceita contestação em até 120 dias após a transação. No entanto, quanto antes você agir, maior a chance de sucesso do chargeback. O ideal é contestar em até 48 horas.',
  },
  {
    question: 'O banco é obrigado a devolver o dinheiro de compra fraudulenta?',
    answer: 'Sim. Pelo Código de Defesa do Consumidor (CDC), o banco é responsável pela segurança do serviço. Se a transação foi fraudulenta e você contestou formalmente, o banco deve estornar o valor. Se negar, cabe ação judicial.',
  },
  {
    question: 'O que é chargeback e como funciona?',
    answer: 'Chargeback é o processo de contestação de uma transação junto à bandeira do cartão (Visa, Mastercard, etc.). O banco solicita o estorno ao estabelecimento que recebeu o pagamento. O processo leva de 7 a 45 dias.',
  },
  {
    question: 'Cartão com chip pode ser clonado?',
    answer: 'Cartões com chip EMV são mais seguros, mas ainda vulneráveis a: compras online (sem chip), golpes de engenharia social, skimmers sofisticados e vazamento de dados. A clonagem "virtual" (dados do cartão) é mais comum que a física.',
  },
  {
    question: 'Preciso trocar o cartão após fraude?',
    answer: 'Sim, sempre solicite um novo cartão com novo número após qualquer fraude. Mesmo que as transações tenham sido estornadas, os dados antigos podem estar comprometidos em bancos de dados de golpistas.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe do Cartão de Crédito: O Que Fazer? Guia Completo',
  description: 'Guia completo sobre como agir após clonagem de cartão ou compra fraudulenta.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-02-20',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpeCartaoPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Cartão' }]} />
      <HowToSchema
        name="Cartão clonado ou compra não reconhecida: o que fazer"
        description="Passo a passo para contestar transações fraudulentas no cartão de crédito ou débito e recuperar o valor."
        totalTime="PT48H"
        steps={[
          { name: 'Bloqueie o cartão pelo app', text: 'Bloqueie imediatamente pelo app do banco para impedir novas transações fraudulentas.' },
          { name: 'Ligue para a central e conteste', text: 'Informe as transações não reconhecidas e solicite o chargeback. Anote o protocolo.' },
          { name: 'Registre o Boletim de Ocorrência', text: 'Documente a fraude com todos os detalhes das transações não reconhecidas.', url: '/ferramentas/pacote-completo' },
          { name: 'Notifique o banco formalmente', text: 'Envie notificação extrajudicial exigindo estorno com base no CDC.', url: '/ferramentas/pacote-completo' },
          { name: 'Solicite novo cartão', text: 'Peça um cartão novo com número diferente para garantir que os dados antigos não sejam reutilizados.' },
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
            <span className="text-white">Golpe do Cartão</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Ação imediata:</strong> Se você identificou compras não reconhecidas, bloqueie o cartão AGORA
              pelo app do seu banco antes de continuar lendo.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Cartão Clonado ou Compra<br />
            <span className="gradient-text">Não Reconhecida?</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Identificou transações que você não fez no seu cartão de crédito ou débito?
            Saiba exatamente o que fazer para contestar, bloquear e recuperar seu dinheiro.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/pacote-completo" className="btn-primary">
              <FileText className="w-5 h-5" />
              Kit Completo — R$47
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
          {/* What is it */}
          <section className="prose-section mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">O que é clonagem de cartão?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              A <strong className="text-white">clonagem de cartão</strong> ocorre quando criminosos obtêm os dados do seu cartão
              (número, validade, CVV) e realizam compras fraudulentas em seu nome. Isso pode acontecer por:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { titulo: 'Skimming', desc: 'Dispositivos instalados em caixas eletrônicos ou maquininhas que copiam dados do cartão.' },
                { titulo: 'Vazamento de dados', desc: 'Lojas online hackeadas que expõem dados de cartões dos clientes.' },
                { titulo: 'Phishing', desc: 'Sites e e-mails falsos que enganam a vítima para fornecer dados do cartão.' },
                { titulo: 'Engenharia social', desc: 'Golpista liga se passando por banco e pede dados do cartão por telefone.' },
              ].map((tipo) => (
                <div key={tipo.titulo} className="card border-white/10">
                  <h3 className="font-bold text-white text-sm mb-1">{tipo.titulo}</h3>
                  <p className="text-sm text-white/55">{tipo.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Steps */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-6">O que fazer — passo a passo</h2>
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

          {/* Legal Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Seus direitos legais</h2>
            <div className="space-y-3">
              {[
                { lei: 'CDC — Art. 14', desc: 'O banco responde objetivamente por falhas de segurança nos serviços prestados' },
                { lei: 'CDC — Art. 42', desc: 'É vedada cobrança de valores indevidos — a devolução deve ser em dobro' },
                { lei: 'Resolução BACEN 4.893/2021', desc: 'Obriga instituições financeiras a manter política de segurança cibernética' },
                { lei: 'Lei 14.155/2021', desc: 'Agrava penas para fraude eletrônica — reclusão de 4 a 8 anos' },
                { lei: 'Súmula 479 STJ', desc: 'Bancos respondem por danos causados por fraudes de terceiros em operações bancárias' },
              ].map((item) => (
                <div key={item.lei} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="badge-green shrink-0 font-mono text-xs">{item.lei}</span>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="card border-green-500/30 bg-green-500/5 text-center">
            <h3 className="font-bold text-white text-xl mb-3">Pronto para contestar?</h3>
            <p className="text-white/70 mb-6">
              Gere o B.O. e a notificação formal ao banco com fundamentação legal completa.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/pacote-completo" className="btn-primary">
                <FileText className="w-4 h-4" />
                Kit Completo — R$47
              </Link>
              <Link href="/ferramentas/pacote-completo" className="btn-secondary">
                Notificação ao banco
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <FAQSection items={faqItems} />

      {/* Related */}
      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-6">Conteúdo relacionado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { titulo: 'Golpe via Pix', href: '/golpes/golpe-pix', emoji: '⚡' },
              { titulo: 'App / Site Falso (Phishing)', href: '/golpes/golpe-phishing', emoji: '🎣' },
              { titulo: 'Notificação ao Banco', href: '/ferramentas/pacote-completo', emoji: '📄' },
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
