import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Shield, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do Empréstimo Consignado: O Que Fazer?',
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
          { name: 'Identifique o golpe', text: 'Confirme que voce foi vitima e reuna todas as evidencias disponiveis.' },
          { name: 'Acesse o Kit Completo DefesaPix', text: 'Em defesapix.com.br, preencha seus dados e receba o plano de acao completo com 5 documentos juridicos por R$47.', url: '/ferramentas/pacote-completo' },
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
            <Link href="/ferramentas/pacote-completo" className="btn-primary">
              <FileText className="w-5 h-5" />
              Kit Completo — R$47
            </Link>
            <Link href="/ferramentas/pacote-completo" className="btn-secondary">
              <Shield className="w-5 h-5" />
              Kit Completo — R$47
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

          {/* Solution Paywall */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-4">Caiu nesse golpe? Existe solucao.</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              O consignado fraudulento tem prazos legais curtos para contestacao e exige documentos juridicos especificos para cancelamento e devolucao dos valores. Um erro no documento pode comprometer toda a sua recuperacao.
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
              <Link href="/ferramentas/pacote-completo" className="btn-primary">
                <FileText className="w-4 h-4" />
                Kit Completo — R$47
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

      {/* Related */}
      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-6">Conteúdo relacionado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { titulo: 'Golpe via Pix', href: '/golpes/golpe-pix', emoji: '⚡' },
              { titulo: 'Golpe do Cartão', href: '/golpes/golpe-cartao', emoji: '💳' },
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
