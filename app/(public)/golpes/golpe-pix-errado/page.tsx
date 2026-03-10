import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do Pix Errado: O Que Fazer? Guia Completo',
  description:
    'Recebeu um Pix "por engano" e pediram para devolver? Cuidado, pode ser golpe! Saiba como funciona o golpe do Pix errado e como se proteger.',
  keywords: [
    'golpe pix errado',
    'golpe pix engano',
    'golpe devolver pix',
    'pix errado o que fazer',
    'golpe pix devolução',
    'MED pix fraude',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-pix-errado' },
};

const faqItems = [
  {
    question: 'Como funciona o golpe do Pix errado?',
    answer: 'O golpista faz um Pix real para sua conta e depois entra em contato pedindo a devolução para uma conta DIFERENTE da original. Quando você devolve, ele aciona o MED (Mecanismo Especial de Devolução) no banco alegando fraude, e recebe o dinheiro de volta duas vezes.',
  },
  {
    question: 'Recebi um Pix por engano. Devo devolver?',
    answer: 'Sim, você tem obrigação legal de devolver (Art. 884 do Código Civil — vedação ao enriquecimento sem causa). Porém, NUNCA devolva para uma conta diferente da que enviou. Use sempre a função "devolver" do seu app bancário, que retorna o valor para a conta de origem.',
  },
  {
    question: 'O que é o MED e como é usado no golpe?',
    answer: 'O MED (Mecanismo Especial de Devolução) é um sistema do Banco Central que permite estornar Pix em caso de fraude. No golpe, o criminoso envia o Pix, pede devolução para outra conta e depois aciona o MED alegando que foi vítima, recebendo o valor duas vezes.',
  },
  {
    question: 'Como me proteger do golpe do Pix errado?',
    answer: 'Se receber um Pix inesperado: 1) Não devolva para conta diferente da origem; 2) Use sempre a função "devolver Pix" do app do banco; 3) Não se deixe pressionar por mensagens urgentes; 4) Em caso de dúvida, ligue para seu banco.',
  },
  {
    question: 'Caí no golpe do Pix errado. Consigo recuperar o dinheiro?',
    answer: 'Sim, é possível. Você precisa registrar B.O., notificar o banco formalmente e acionar o MED. Os documentos jurídicos corretos e a fundamentação legal adequada aumentam significativamente suas chances de recuperação.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe do Pix Errado: O Que Fazer? Guia Completo',
  description: 'Guia completo sobre como agir contra o golpe do Pix errado e do pedido de devolução fraudulento.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-02-20',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpePixErradoPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe do Pix Errado' }]} />
      <HowToSchema
        name="Golpe do Pix errado: o que fazer"
        description="Passo a passo para agir após cair no golpe do Pix errado e recuperar seu dinheiro."
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
            <span className="text-white">Golpe do Pix Errado</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Atenção:</strong> Se alguém pediu para você devolver um Pix para uma conta DIFERENTE da que enviou,
              NÃO faça a transferência. Use apenas a função &quot;devolver&quot; do app do banco.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Caiu no Golpe do<br />
            <span className="gradient-text">Pix Errado?</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Recebeu um Pix &quot;por engano&quot; e pediram para devolver para outra conta?
            Esse é um dos golpes mais comuns do Pix. Saiba como agir.
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
            <h2 className="text-2xl font-bold text-white mb-4">O que é o golpe do Pix errado?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              O <strong className="text-white">golpe do Pix errado</strong> é uma fraude em que o golpista envia um Pix real para sua conta
              e depois pede a devolução para uma conta diferente da de origem. Ao devolver, ele aciona o MED e recebe o dinheiro de volta duas vezes. As variações incluem:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { titulo: 'Devolução para conta diferente', desc: 'Golpista envia Pix da conta A, mas pede devolução para conta B. Depois aciona MED na conta A e recebe de volta.' },
                { titulo: 'Pressão por urgência', desc: 'Golpista liga ou manda mensagem desesperada dizendo que precisa do dinheiro urgente e pressiona para devolução rápida.' },
                { titulo: 'Comprovante falso', desc: 'Golpista envia comprovante falso de Pix de valor maior e pede a "diferença" de volta.' },
                { titulo: 'Golpe do Pix agendado', desc: 'Golpista agenda um Pix, mostra o comprovante de agendamento como se fosse efetivado e cancela antes de debitar.' },
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
                { lei: 'Resolução BCB 103/2021', desc: 'Institui o MED (Mecanismo Especial de Devolução) para casos de fraude via Pix' },
                { lei: 'CDC — Art. 14', desc: 'O banco responde objetivamente por falhas de segurança nos serviços prestados' },
                { lei: 'CC — Art. 884', desc: 'Vedação ao enriquecimento sem causa — obrigação de restituir o que foi recebido indevidamente' },
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
              Gere o B.O. e acione o MED com a documentação jurídica correta.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/pacote-completo" className="btn-primary">
                <FileText className="w-4 h-4" />
                Kit Completo — R$47
              </Link>
              <Link href="/ferramentas/pacote-completo" className="btn-secondary">
                Acionar o MED
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
              { titulo: 'Golpe do Cartão', href: '/golpes/golpe-cartao', emoji: '💳' },
              { titulo: 'Golpe de Phishing', href: '/golpes/golpe-phishing', emoji: '🎣' },
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
