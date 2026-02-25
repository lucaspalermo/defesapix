import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Banknote, CheckCircle, FileText, ArrowRight, Shield, Phone } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do Empréstimo Consignado: O Que Fazer? | DefesaPix',
  description:
    'Descobriu empréstimo consignado que não contratou? Saiba como cancelar, recuperar valores descontados indevidamente e seus direitos legais. Guia completo.',
  keywords: [
    'golpe emprestimo consignado',
    'emprestimo consignado nao contratei',
    'cancelar emprestimo consignado fraude',
    'desconto indevido folha pagamento',
    'golpe consignado aposentado',
    'fraude emprestimo INSS',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-consignado' },
};

const STEPS = [
  {
    step: '1', urgencia: 'IMEDIATO',
    title: 'Ligue para o banco que concedeu o empréstimo',
    desc: 'Solicite o cancelamento imediato e informe que você não autorizou a operação. Peça o protocolo e a cópia do contrato.',
    icon: Phone,
    cor: 'red',
  },
  {
    step: '2', urgencia: 'PRIMEIRAS 24H',
    title: 'Registre o Boletim de Ocorrência',
    desc: 'Documente a fraude. Informe que houve contratação de empréstimo consignado sem sua autorização.',
    icon: Shield,
    cor: 'orange',
    link: '/ferramentas/gerador-bo',
    linkText: 'Gerar modelo de BO →',
  },
  {
    step: '3', urgencia: '48H',
    title: 'Notifique o banco formalmente',
    desc: 'Envie notificação extrajudicial exigindo cancelamento do contrato e devolução dos valores descontados.',
    icon: FileText,
    cor: 'yellow',
    link: '/ferramentas/notificacao-banco',
    linkText: 'Gerar notificação →',
  },
  {
    step: '4', urgencia: '72H',
    title: 'Registre no INSS e Banco Central',
    desc: 'Se é aposentado/pensionista, registre reclamação no Meu INSS. Todos devem registrar no BACEN.',
    icon: Banknote,
    cor: 'blue',
  },
];

const faqItems = [
  {
    question: 'Descobri um empréstimo consignado que não fiz. O que aconteceu?',
    answer: 'Golpistas obtêm dados pessoais (CPF, dados funcionais, matrícula) e contratam empréstimos em nome da vítima. O valor é creditado em conta controlada pelo golpista, mas os descontos vão na sua folha de pagamento ou benefício do INSS.',
  },
  {
    question: 'O banco é obrigado a cancelar empréstimo consignado fraudulento?',
    answer: 'Sim. Pelo CDC (art. 14), o banco é responsável pela segurança da contratação. Se não houve assinatura ou biometria válida, o contrato é nulo e o banco deve cessar as cobranças e devolver valores descontados.',
  },
  {
    question: 'Posso pedir indenização por empréstimo consignado fraudulento?',
    answer: 'Sim. Além do cancelamento e devolução dos valores, a jurisprudência reconhece dano moral nos casos de consignado fraudulento. Os valores variam de R$5.000 a R$15.000, dependendo do caso e do tribunal.',
  },
  {
    question: 'Como evitar golpe de consignado?',
    answer: 'Nunca forneça dados pessoais por telefone. Desconfie de ofertas de empréstimo por SMS ou WhatsApp. Verifique regularmente o extrato do INSS (Meu INSS) e o contracheque. Ative alertas de movimentação bancária.',
  },
  {
    question: 'Aposentados são o principal alvo?',
    answer: 'Sim. Aposentados e pensionistas do INSS são os principais alvos porque têm margem consignável fixa e dados mais acessíveis. O INSS tem canal específico para denunciar fraudes: ligue 135 ou acesse Meu INSS.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe do Empréstimo Consignado: O Que Fazer?',
  description: 'Guia completo sobre fraude em empréstimo consignado — como cancelar, recuperar valores e seus direitos.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-02-20',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpeConsignadoPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Consignado' }]} />
      <HowToSchema
        name="Empréstimo consignado fraudulento: como cancelar e recuperar valores"
        description="Passo a passo para cancelar empréstimo consignado contratado sem autorização e recuperar valores descontados."
        totalTime="PT72H"
        steps={[
          { name: 'Ligue para o banco', text: 'Solicite cancelamento imediato e peça cópia do contrato e protocolo de atendimento.' },
          { name: 'Registre o Boletim de Ocorrência', text: 'Documente a fraude informando que não autorizou a contratação.', url: '/ferramentas/gerador-bo' },
          { name: 'Notifique o banco formalmente', text: 'Envie notificação exigindo cancelamento e devolução dos valores descontados.', url: '/ferramentas/notificacao-banco' },
          { name: 'Registre no INSS e BACEN', text: 'Reclame no Meu INSS (aposentados) e no Banco Central para pressão regulatória.' },
          { name: 'Procure o Procon ou advogado', text: 'Se o banco não resolver em 10 dias, acione Procon ou Juizado Especial para indenização.' },
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
            <span className="text-white">Golpe Consignado</span>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Empréstimo Consignado<br />
            <span className="gradient-text">que Você Não Contratou?</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Descobriu descontos na folha de pagamento ou no benefício do INSS de um empréstimo
            que nunca pediu? Saiba como cancelar, recuperar o dinheiro e ser indenizado.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/notificacao-banco" className="btn-primary">
              <FileText className="w-5 h-5" />
              Notificar o banco
            </Link>
            <Link href="/ferramentas/gerador-bo" className="btn-secondary">
              <Shield className="w-5 h-5" />
              Gerar modelo de B.O.
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="section">
        <div className="container max-w-4xl">
          {/* What is it */}
          <section className="prose-section mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Como funciona o golpe do consignado</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              O <strong className="text-white">golpe do empréstimo consignado</strong> acontece quando criminosos contratam
              empréstimos em nome de servidores públicos, aposentados ou pensionistas do INSS, usando dados pessoais obtidos
              de forma ilícita. O valor é depositado em conta controlada pelo golpista, mas as parcelas são descontadas
              diretamente da folha de pagamento ou benefício da vítima.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { titulo: 'Correspondente bancário falso', desc: 'Golpistas se apresentam como representantes de bancos, especialmente em porta de agências do INSS.' },
                { titulo: 'Ligação com oferta irrecusável', desc: 'Telefonema oferecendo empréstimo com taxas baixíssimas. Pedem dados "para simulação" e contratam sem autorização.' },
                { titulo: 'Vazamento de dados', desc: 'Dados de servidores e aposentados são vendidos na dark web e usados para contratação remota.' },
                { titulo: 'Portabilidade fraudulenta', desc: 'Golpista solicita portabilidade do seu empréstimo existente para outro banco, embolsando a diferença.' },
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
                  <div key={step.step} className={`border rounded-2xl p-5 transition-all duration-200 ${step.cor === 'red' ? 'border-red-500/30 bg-red-500/5' : step.cor === 'orange' ? 'border-ember-500/30 bg-ember-500/5' : step.cor === 'yellow' ? 'border-gold-500/30 bg-gold-500/5' : 'border-blue-500/30 bg-blue-500/5'}`}>
                    <div className="flex items-start gap-4">
                      <div className="icon-badge icon-badge-ember shrink-0">
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`badge text-xs ${step.cor === 'red' ? 'badge-red' : step.cor === 'orange' ? 'badge-yellow' : step.cor === 'yellow' ? 'badge-yellow' : 'badge-blue'}`}>
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
                { lei: 'CDC — Art. 14', desc: 'Banco responde por falha na segurança da contratação do empréstimo' },
                { lei: 'CDC — Art. 39, III', desc: 'É vedado enviar produto ou serviço sem solicitação prévia do consumidor' },
                { lei: 'Lei 10.820/2003', desc: 'Regulamenta o consignado e exige autorização expressa para desconto' },
                { lei: 'IN INSS 28/2008', desc: 'Aposentados podem solicitar exclusão de consignado pelo canal 135' },
                { lei: 'Súmula 479 STJ', desc: 'Bancos respondem por fraudes praticadas por terceiros em operações bancárias' },
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
            <h3 className="font-bold text-white text-xl mb-3">Precisa cancelar o consignado?</h3>
            <p className="text-white/70 mb-6">
              Gere a notificação formal ao banco e o B.O. com todos os fundamentos legais.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/notificacao-banco" className="btn-primary">
                <FileText className="w-4 h-4" />
                Notificar o banco
              </Link>
              <Link href="/ferramentas/gerador-bo" className="btn-secondary">
                <Shield className="w-4 h-4" />
                Gerar modelo de B.O.
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
              { titulo: 'Golpe via Pix', href: '/golpes/golpe-pix', emoji: '⚡' },
              { titulo: 'Golpe do Cartão', href: '/golpes/golpe-cartao', emoji: '💳' },
              { titulo: 'Notificação ao Banco', href: '/ferramentas/notificacao-banco', emoji: '📄' },
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
