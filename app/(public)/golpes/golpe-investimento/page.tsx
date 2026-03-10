import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe de Investimento e Criptomoedas: O Que Fazer?',
  description: 'Perdeu dinheiro em investimento falso ou criptomoedas fraudulentas? Veja como denunciar à CVM, Polícia Federal e Banco Central.',
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-investimento' },
};

const faqItems = [
  { question: 'Como identificar um esquema Ponzi ou pirâmide financeira?', answer: 'Principais sinais: retorno garantido muito acima da Selic (ex: 10% ao mês), pressão para recrutar novos investidores, ausência de registro na CVM, empresa sem sede física verificável, e prometem "renda passiva" sem explicar de onde vem o retorno.' },
  { question: 'A CVM pode ajudar a recuperar dinheiro de investimento falso?', answer: 'A CVM pode investigar e responsabilizar os responsáveis, mas não garante devolução dos valores. No entanto, as ações da CVM frequentemente levam a processos criminais que resultam em bloqueio de ativos dos golpistas, aumentando as chances de recuperação parcial.' },
  { question: 'Posso recuperar bitcoin ou criptomoeda enviada para golpistas?', answer: 'É muito difícil recuperar criptomoedas por reversão direta, mas há caminhos: (1) se enviou via exchange brasileira regulamentada, pode pedir reversão; (2) análise blockchain pode rastrear destino dos fundos; (3) ação judicial com ordem de bloqueio de ativos.' },
];


const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe de Investimento e Criptomoedas: O Que Fazer?',
  description: 'Perdeu dinheiro em investimento falso ou criptomoedas fraudulentas? Veja como denunciar à CVM, Polícia Federal e Banco Central.',
  author: { '@type': 'Organization', name: 'DefesaPix', url: 'https://defesapix.com.br' },
  publisher: {
    '@type': 'Organization',
    name: 'DefesaPix',
    logo: { '@type': 'ImageObject', url: 'https://defesapix.com.br/favicon.svg' },
  },
  datePublished: '2025-02-12',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'pt-BR',
  url: 'https://defesapix.com.br/golpes/golpe-investimento',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://defesapix.com.br/golpes/golpe-investimento' },
  image: 'https://defesapix.com.br/opengraph-image',
};

export default function GolpeInvestimentoPage() {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Investimento' }]} />
      <HowToSchema
        name="Golpe de Investimento: O que fazer para denunciar e recuperar valores"
        description="Passo a passo para denunciar golpe de investimento ou criptomoeda fraudulenta à Polícia Federal, CVM e Banco Central."
        totalTime="PT72H"
        steps={[
          { name: 'Identifique o golpe', text: 'Confirme que você foi vítima e reúna todas as evidências disponíveis.' },
          { name: 'Acesse o Kit Completo DefesaPix', text: 'Em defesapix.com.br, preencha seus dados e receba o plano de ação completo com 5 documentos jurídicos por R$47.', url: '/ferramentas/pacote-completo' },
        ]}
      />
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/golpes" className="hover:text-white">Golpes</Link><span>/</span>
            <span className="text-white">Investimento Fraudulento</span>
          </div>
          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Golpe de Investimento:<br />
            <span className="gradient-text">O Que Fazer em 2025</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Pirâmides financeiras, criptomoedas falsas e investimentos fraudulentos.
            Saiba como denunciar e recuperar valores com os órgãos certos.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/pacote-completo" className="btn-primary"><FileText className="w-5 h-5" />Kit Completo — R$47</Link>
            <Link href="/parceiros" className="btn-secondary"><CheckCircle className="w-5 h-5" />Consultar advogado</Link>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container max-w-4xl space-y-10">
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

          <div className="card border-yellow-500/20 bg-yellow-500/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Para casos acima de R$5.000</h3>
                <p className="text-sm text-white/70 mb-4">Golpes de investimento geralmente envolvem valores altos e requerem ação jurídica especializada. Nossos parceiros oferecem consulta gratuita de 30 minutos.</p>
                <Link href="/parceiros" className="btn-primary text-sm py-2">Consultar advogado especializado</Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <FAQSection items={faqItems} />

      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-4">Leia também no blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { titulo: 'Golpe de Investimento e Criptomoedas: como denunciar', href: '/blog/golpe-investimento-criptomoeda-brasil' },
              { titulo: 'Conta laranja no Pix: consequências legais', href: '/blog/conta-laranja-pix-consequencias-legais' },
              { titulo: 'Lei 14.155/2021: penas mais duras para fraudes digitais', href: '/blog/lei-14155-2021-fraude-digital-penas' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all group">
                <span className="text-green-400 shrink-0">📄</span>
                <span className="text-sm text-white/70 group-hover:text-green-400 transition-colors">{item.titulo}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
