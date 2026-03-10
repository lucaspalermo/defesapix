import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe da Maquininha: O Que Fazer? Guia Completo',
  description:
    'Cobraram valor errado na maquininha ou passaram seu cartão duas vezes? Saiba como contestar cobranças indevidas, seus direitos e como recuperar o dinheiro.',
  keywords: [
    'golpe da maquininha',
    'maquininha valor errado',
    'cobrança dobrada maquininha',
    'golpe visor quebrado maquininha',
    'fraude maquininha cartão',
    'contestar cobrança maquininha',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-maquininha' },
};

const faqItems = [
  {
    question: 'Como funciona o golpe da maquininha?',
    answer: 'O golpista usa uma maquininha com visor quebrado, escurecido ou posicionado de forma que a vítima não consiga ver o valor digitado. O valor cobrado é muito maior do que o combinado. Também pode envolver cobrança dupla ou maquininha adulterada.',
  },
  {
    question: 'O que fazer se cobraram valor errado na maquininha?',
    answer: 'Entre em contato imediatamente com o banco emissor do cartão para contestar a transação. Guarde o comprovante da maquininha (se tiver), anote o horário e local, e registre um B.O. O banco tem obrigação de investigar.',
  },
  {
    question: 'Posso pedir estorno de cobrança duplicada na maquininha?',
    answer: 'Sim. Pelo CDC, cobrança indevida deve ser devolvida em dobro. Entre em contato com o banco e com o estabelecimento. Se não resolverem, registre reclamação no Procon e no BACEN.',
  },
  {
    question: 'Maquininha com visor quebrado é golpe?',
    answer: 'Nem sempre, mas é o método mais comum do golpe da maquininha. NUNCA passe seu cartão em maquininha com visor que não permita visualizar claramente o valor. Peça para usar outra máquina ou pague de outra forma.',
  },
  {
    question: 'Ambulante ou vendedor de rua pode aplicar golpe da maquininha?',
    answer: 'Sim, esse golpe é comum em vendedores ambulantes, entregadores e taxistas. Sempre confira o valor no visor ANTES de digitar a senha. Se o visor estiver quebrado ou ilegível, recuse o pagamento naquela máquina.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe da Maquininha: O Que Fazer? Guia Completo',
  description: 'Guia completo sobre como agir após cair no golpe da maquininha adulterada ou com valor errado.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-02-20',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpeMaquininhaPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe da Maquininha' }]} />
      <HowToSchema
        name="Golpe da maquininha: o que fazer"
        description="Passo a passo para contestar cobranças indevidas na maquininha e recuperar seu dinheiro."
        totalTime="PT48H"
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
            <span className="text-white">Golpe da Maquininha</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Ação imediata:</strong> Se cobraram um valor diferente do combinado na maquininha, entre em contato
              com seu banco AGORA para contestar a transação.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Cobraram Valor Errado<br />
            <span className="gradient-text">na Maquininha?</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Visor quebrado, valor adulterado ou cobrança duplicada na maquininha?
            Saiba exatamente o que fazer para contestar e recuperar seu dinheiro.
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
            <h2 className="text-2xl font-bold text-white mb-4">O que é o golpe da maquininha?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              O <strong className="text-white">golpe da maquininha</strong> ocorre quando criminosos manipulam máquinas de cartão
              para cobrar valores diferentes do combinado. É um dos golpes presenciais mais comuns no Brasil. As modalidades incluem:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { titulo: 'Visor quebrado', desc: 'Maquininha com visor escurecido, trincado ou coberto para que a vítima não veja o valor real digitado.' },
                { titulo: 'Valor adulterado', desc: 'Golpista digita valor muito maior que o combinado (ex: R$500 ao invés de R$50) e entrega a maquininha para a vítima digitar a senha.' },
                { titulo: 'Cobrança dupla', desc: 'Golpista alega que a primeira tentativa "não passou" e pede para passar o cartão novamente, cobrando duas vezes.' },
                { titulo: 'Troca de maquininha', desc: 'Golpista troca a maquininha por outra cadastrada em nome diferente para dificultar o rastreamento.' },
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

          {/* Legal Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Seus direitos legais</h2>
            <div className="space-y-3">
              {[
                { lei: 'CDC — Art. 42', desc: 'É vedada cobrança de valores indevidos — a devolução deve ser em dobro, acrescida de correção monetária' },
                { lei: 'CDC — Art. 14', desc: 'O fornecedor de serviços responde independentemente de culpa por defeitos na prestação do serviço' },
                { lei: 'CP — Art. 171', desc: 'Estelionato: obter vantagem ilícita induzindo alguém a erro — pena de 1 a 5 anos de reclusão' },
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
              { titulo: 'Golpe do Delivery Falso', href: '/golpes/golpe-delivery', emoji: '🛵' },
              { titulo: 'Golpe do Cartão', href: '/golpes/golpe-cartao', emoji: '💳' },
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
