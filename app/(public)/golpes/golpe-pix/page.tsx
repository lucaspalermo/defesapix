import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Clock, FileText, ArrowRight, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe via Pix: O Que Fazer? Guia Completo 2025',
  description:
    'Caiu num golpe via Pix? Saiba exatamente o que fazer em 2025. MED, Boletim de Ocorrência, notificação bancária — tudo explicado passo a passo. Recupere seu dinheiro.',
  keywords: [
    'golpe pix o que fazer',
    'recuperar dinheiro golpe pix',
    'MED mecanismo especial devolucao pix',
    'contestacao pix',
    'fui vitima de golpe pix',
    'como recuperar pix enviado por engano fraude',
    'prazo contestacao pix',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-pix' },
};

const faqItems = [
  {
    question: 'Qual é o prazo para acionar o MED após um golpe Pix?',
    answer: 'O MED pode ser solicitado até 80 dias após a transação. No entanto, quanto mais rápido você acionar, maior a chance de os valores ainda estarem na conta do golpista. O ideal é acionar em até 72 horas.',
  },
  {
    question: 'O banco é obrigado a devolver o dinheiro de golpe Pix?',
    answer: 'O banco não é automaticamente obrigado a devolver, mas deve analisar o caso. Se houver falha nos sistemas de segurança do banco ou se o golpe se enquadrar no MED, a devolução pode ser exigida. Em casos de negligência do banco, o CDC garante indenização.',
  },
  {
    question: 'Pix enviado por engano é diferente de golpe Pix?',
    answer: 'Sim. Pix enviado por engano (para destinatário errado) tem processo diferente — é a Devolução de Pix simples, que pode ser feita em até 90 dias. Golpe Pix (fraude) usa o MED e tem mais proteções legais.',
  },
  {
    question: 'E se o banco negar o MED?',
    answer: 'Se o banco negar, você pode: (1) recorrer à Ouvidoria do banco; (2) registrar reclamação no BACEN; (3) recorrer ao Procon; (4) ajuizar ação no Juizado Especial (JEC). Nossos parceiros jurídicos podem avaliar seu caso gratuitamente.',
  },
  {
    question: 'Qual a diferença entre MED e contestação bancária?',
    answer: 'O MED é específico para transações Pix fraudulentas, regulamentado pelo Banco Central. A contestação bancária é mais ampla e pode incluir qualquer transação não reconhecida. Para golpes Pix, o MED é mais eficaz.',
  },
  {
    question: 'Golpe do falso funcionário do banco: o banco tem responsabilidade?',
    answer: 'Sim. O STJ tem entendimento de que bancos são responsáveis por danos causados a consumidores em golpes digitais, pois devem manter sistemas de segurança eficazes (responsabilidade objetiva do CDC). Procure um advogado para avaliar seu caso específico.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe via Pix: O Que Fazer? Guia Completo 2025',
  description: 'Guia completo sobre como agir após cair em golpe via Pix. MED, BO, notificação bancária e mais.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-01-01',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpePixPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Pix' }]} />
      <HowToSchema
        name="Golpe Pix: O que fazer para recuperar seu dinheiro"
        description="Passo a passo completo para recuperar dinheiro após golpe via Pix usando o MED, B.O. e notificação bancária."
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
            <span className="text-white">Golpe via Pix</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Urgência Crítica:</strong> Se o golpe ocorreu há menos de 72 horas, cada minuto conta.
              O MED pode bloquear os valores imediatamente.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Golpe via Pix: O Que Fazer?<br />
            <span className="gradient-text">Guia Completo 2025</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Você foi vítima de um golpe via Pix — transferência enviada para um golpista.
            Saiba exatamente o que fazer para maximizar suas chances de recuperar o dinheiro,
            dentro dos prazos legais.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/pacote-completo" className="btn-primary">
              <FileText className="w-5 h-5" />
              Kit Completo — R$47
            </Link>
          </div>
        </div>
      </section>

      {/* MED Banner */}
      <section className="bg-red-600/20 border-y border-red-500/30 py-6">
        <div className="container max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Clock className="w-8 h-8 text-red-400 shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-white">O MED tem prazo de 72 horas para maior eficácia</h2>
              <p className="text-sm text-white/70">Mecanismo Especial de Devolução do Banco Central — Resolução BCB nº 93/2021</p>
            </div>
            <Link href="/ferramentas/pacote-completo" className="btn-danger shrink-0">
              Acionar MED agora
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="section">
        <div className="container max-w-4xl">
          {/* Table of contents */}
          <div className="card mb-12 border-green-500/20">
            <h2 className="font-bold text-white mb-4">Neste guia:</h2>
            <ol className="space-y-2 text-sm">
              {['O que é golpe via Pix', 'Tipos mais comuns', 'O que é o MED', 'Seus direitos legais', 'Perguntas frequentes'].map((item, i) => (
                <li key={item} className="flex items-center gap-2 text-white/60 hover:text-green-400 transition-colors">
                  <span className="text-green-500 font-mono font-bold text-xs">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          {/* Section: What is it */}
          <section className="prose-section mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">O que é golpe via Pix?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              O <strong className="text-white">golpe via Pix</strong> ocorre quando um criminoso engana a vítima para que ela
              realize uma transferência Pix para uma conta sob controle do golpista.
              Diferentemente de clonagem de cartão, no golpe Pix a vítima realiza a transação
              conscientemente, mas enganada — o que torna a recuperação mais complexa, porém não impossível.
            </p>
            <p className="text-white/70 leading-relaxed">
              Segundo dados do Banco Central e da Febraban, os golpes via Pix representaram a maior
              parcela dos prejuízos financeiros digitais no Brasil em 2023, superando R$ 847 milhões.
              O crescimento explosivo do Pix como meio de pagamento aumentou exponencialmente as tentativas de fraude.
            </p>
          </section>

          {/* Section: Types */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-6">Tipos mais comuns de golpe via Pix</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { titulo: 'Falso funcionário do banco', desc: 'Golpista se passa por atendente do seu banco, alega problema na conta e pede Pix para "regularizar".' },
                { titulo: 'Golpe do link falso', desc: 'Você recebe um link (SMS, e-mail ou WhatsApp) levando a um site clone do seu banco onde faz transferências.' },
                { titulo: 'Golpe da central de atendimento', desc: 'Ligação informando sobre "fraudes na conta" que levam a vítima a fazer Pix para "conta segura".' },
                { titulo: 'Golpe do parente em aperto', desc: 'Mensagem via WhatsApp de "familiar" em emergência pedindo Pix urgente.' },
                { titulo: 'Golpe do QR Code falso', desc: 'QR Code substituído em lojas ou recibos, redirecionando o pagamento para conta do golpista.' },
                { titulo: 'Golpe da compra online', desc: 'Vendedor falso em marketplace que solicita Pix antecipado e nunca entrega o produto.' },
              ].map((tipo) => (
                <div key={tipo.titulo} className="card border-white/10 group hover:border-red-500/25 transition-all duration-200">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-red-500/20 transition-colors">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" strokeWidth={2} />
                    </div>
                    <h3 className="font-heading font-semibold text-white text-sm leading-snug">{tipo.titulo}</h3>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed pl-10">{tipo.desc}</p>
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

          {/* Section: MED */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-4">O que é o MED (Mecanismo Especial de Devolução)?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              O MED foi criado pelo Banco Central pela <strong className="text-white">Resolução BCB nº 93/2021</strong>
              especificamente para casos de fraude via Pix. Ele permite que a instituição bancária
              da vítima solicite o bloqueio cautelar dos valores na conta do destinatário.
            </p>
          </section>

          {/* Legal Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Seus direitos legais</h2>
            <div className="space-y-3">
              {[
                { lei: 'CDC — Art. 14', desc: 'Responsabilidade do banco por falha nos sistemas de segurança' },
                { lei: 'Resolução BCB 93/2021', desc: 'MED — obrigação do banco de investigar fraudes Pix' },
                { lei: 'Lei 14.155/2021', desc: 'Agrava penas para crimes praticados em ambiente digital' },
                { lei: 'LGPD — Art. 46', desc: 'Proteção de dados e responsabilidade por violações de segurança' },
                { lei: 'Código Penal — Art. 171', desc: 'Estelionato: pena de 1 a 5 anos, majorada em meio digital' },
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
            <h3 className="font-bold text-white text-xl mb-3">Pronto para agir?</h3>
            <p className="text-white/70 mb-6">
              Gere todos os documentos necessários em minutos. Contestação MED, BO e notificação bancária.
            </p>
            <Link href="/ferramentas/pacote-completo" className="btn-primary">
              <FileText className="w-4 h-4" />
              Kit Completo — R$47
            </Link>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <FAQSection items={faqItems} />

      {/* Related Articles */}
      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-6">Conteúdo relacionado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { titulo: 'Clonagem de WhatsApp', href: '/golpes/golpe-whatsapp', emoji: '📱' },
              { titulo: 'App/Site Falso de Banco', href: '/golpes/golpe-clone-app', emoji: '🏦' },
              { titulo: 'Ferramenta: Gerador de MED', href: '/ferramentas/pacote-completo', emoji: '⚡' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card hover:border-green-500/30 transition-all group">
                <span className="text-2xl mb-2 block">{item.emoji}</span>
                <span className="text-sm font-semibold text-white/80 group-hover:text-green-400 transition-colors">
                  {item.titulo} →
                </span>
              </Link>
            ))}
          </div>

          <h3 className="text-lg font-bold text-white mt-8 mb-4">Leia também no blog</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { titulo: 'MED: O que é e como acionar o Mecanismo Especial de Devolução', href: '/blog/med-mecanismo-especial-devolucao-pix' },
              { titulo: 'Como recuperar dinheiro de golpe Pix em 2025', href: '/blog/como-recuperar-dinheiro-golpe-pix-2025' },
              { titulo: 'Golpe do QR Code Pix: como funciona e como evitar', href: '/blog/golpe-qr-code-pix-como-funciona' },
              { titulo: 'O banco é responsável pelos golpes digitais? O que diz o STJ', href: '/blog/banco-responsavel-golpe-digital-stj' },
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
