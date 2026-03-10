import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do Falso Sequestro: O Que Fazer? Guia Completo',
  description:
    'Recebeu ligação dizendo que sequestraram alguém da sua família? Saiba como identificar o golpe do falso sequestro, manter a calma e denunciar.',
  keywords: [
    'golpe falso sequestro',
    'golpe sequestro telefone',
    'ligação falso sequestro',
    'golpe resgate falso',
    'extorsão telefone sequestro',
    'falso sequestro o que fazer',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-falso-sequestro' },
};

const faqItems = [
  {
    question: 'Como funciona o golpe do falso sequestro?',
    answer: 'O golpista liga para a vítima (geralmente de presídio) simulando que sequestrou um familiar. Usa gritos e choro ao fundo para criar pânico e exige pagamento imediato via Pix ou depósito. Na maioria dos casos, o suposto sequestrado está seguro em casa.',
  },
  {
    question: 'Como saber se é falso sequestro ou real?',
    answer: 'Tente ligar para o familiar supostamente sequestrado de outro telefone. O golpista não deixa você desligar justamente para impedir essa verificação. Se possível, peça para outra pessoa fazer a ligação enquanto você mantém o golpista na linha.',
  },
  {
    question: 'Paguei o resgate do falso sequestro. Consigo recuperar?',
    answer: 'Sim, é possível. Se o pagamento foi via Pix, você pode acionar o MED (Mecanismo Especial de Devolução). Registre B.O. imediatamente e notifique o banco com a documentação correta para aumentar suas chances.',
  },
  {
    question: 'O golpe do falso sequestro é crime? Qual a pena?',
    answer: 'Sim. Configura extorsão (Art. 158 do Código Penal), com pena de 4 a 10 anos de reclusão. Se cometido de presídio, a pena é agravada. Com a Lei 14.155/2021, fraudes eletrônicas têm penas ainda maiores.',
  },
  {
    question: 'Como os golpistas conseguem meu número de telefone?',
    answer: 'Geralmente por ligações aleatórias em massa (discagem sequencial), vazamentos de dados, redes sociais ou listas telefônicas. Eles não precisam saber seus dados — usam informações genéricas e a própria vítima acaba fornecendo nomes e detalhes no desespero.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe do Falso Sequestro: O Que Fazer? Guia Completo',
  description: 'Guia completo sobre como agir diante do golpe do falso sequestro por telefone.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-02-20',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpeFalsoSeqestroPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe do Falso Sequestro' }]} />
      <HowToSchema
        name="Golpe do falso sequestro: o que fazer"
        description="Passo a passo para agir após cair no golpe do falso sequestro e recuperar seu dinheiro."
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
            <span className="text-white">Golpe do Falso Sequestro</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Mantenha a calma:</strong> Se estiver recebendo uma ligação de falso sequestro AGORA,
              NÃO desligue — peça para outra pessoa ligar para o familiar supostamente sequestrado.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Ligaram Dizendo que<br />
            <span className="gradient-text">Sequestraram Alguém?</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Recebeu ligação exigindo resgate de um familiar? Na maioria dos casos é golpe.
            Saiba como identificar, manter a calma e denunciar.
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
            <h2 className="text-2xl font-bold text-white mb-4">O que é o golpe do falso sequestro?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              O <strong className="text-white">golpe do falso sequestro</strong> é uma extorsão por telefone em que o criminoso simula
              ter sequestrado um familiar da vítima e exige pagamento imediato. É um dos golpes mais antigos e ainda muito eficaz. As táticas incluem:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { titulo: 'Simulação de choro', desc: 'Golpista coloca uma pessoa (ou gravação) chorando e gritando ao fundo para simular o sequestrado.' },
                { titulo: 'Pressão psicológica', desc: 'Criminoso não deixa a vítima desligar, grita ameaças e exige pagamento imediato para criar pânico.' },
                { titulo: 'Pix ou depósito urgente', desc: 'Exige transferência via Pix ou depósito em conta de terceiros, sempre com urgência extrema.' },
                { titulo: 'Informações genéricas', desc: 'Usa frases vagas como "peguei seu filho" e espera que a própria vítima revele nomes e detalhes.' },
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
                { lei: 'CP — Art. 158', desc: 'Extorsão: constranger alguém mediante ameaça para obter vantagem econômica — pena de 4 a 10 anos' },
                { lei: 'CP — Art. 158 §1°', desc: 'Aumento de pena se cometido por duas ou mais pessoas ou com uso de simulação de sequestro' },
                { lei: 'Lei 14.155/2021', desc: 'Agrava penas para fraude eletrônica — reclusão de 4 a 8 anos' },
                { lei: 'CDC — Art. 14', desc: 'Banco responde objetivamente por falhas de segurança se a transferência foi via conta bancária' },
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
            <h3 className="font-bold text-white text-xl mb-3">Pronto para denunciar?</h3>
            <p className="text-white/70 mb-6">
              Gere o B.O. e a documentação necessária para denunciar e tentar recuperar o valor.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/pacote-completo" className="btn-primary">
                <FileText className="w-4 h-4" />
                Kit Completo — R$47
              </Link>
              <Link href="/ferramentas/pacote-completo" className="btn-secondary">
                Registrar denúncia
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
              { titulo: 'Golpe de Sextorsão', href: '/golpes/golpe-sextorsao', emoji: '🔐' },
              { titulo: 'Golpe via Pix', href: '/golpes/golpe-pix', emoji: '⚡' },
              { titulo: 'Golpe do Falso Suporte', href: '/golpes/golpe-falso-suporte', emoji: '📞' },
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
