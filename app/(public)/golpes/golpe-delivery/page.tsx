import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do Delivery Falso: O Que Fazer? Guia Completo',
  description:
    'Caiu no golpe do delivery falso? Saiba como agir contra fraudes com entregadores falsos, apps clonados e cobranças indevidas na maquininha. Guia completo com direitos legais.',
  keywords: [
    'golpe delivery falso',
    'golpe entregador ifood',
    'golpe maquininha delivery',
    'fraude app entrega',
    'golpe entrega falsa',
    'cobrança indevida delivery',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-delivery' },
};

const faqItems = [
  {
    question: 'Como funciona o golpe do delivery falso?',
    answer: 'O golpista se passa por entregador de apps como iFood ou Rappi, e na hora da entrega alega que precisa cobrar uma taxa extra ou que houve erro no pagamento. Ele apresenta uma maquininha com valor adulterado ou visor quebrado para cobrar valores muito acima do correto.',
  },
  {
    question: 'O que fazer se cobraram valor errado na maquininha do delivery?',
    answer: 'Primeiro, entre em contato imediatamente com o banco para contestar a transação. Registre um B.O. e guarde todos os comprovantes (prints do app, comprovante da maquininha). Você tem direito ao estorno pelo CDC.',
  },
  {
    question: 'O iFood ou Rappi são responsáveis pelo golpe do entregador?',
    answer: 'Sim. Pelo CDC, a plataforma responde solidariamente por danos causados durante a prestação do serviço. Você pode acionar tanto a plataforma quanto o banco para recuperar o valor.',
  },
  {
    question: 'Como identificar um app de delivery falso?',
    answer: 'Verifique se o app está na loja oficial (Google Play / App Store), confira o desenvolvedor, leia as avaliações e nunca baixe apps por links recebidos via SMS ou WhatsApp. Apps falsos geralmente pedem dados bancários na instalação.',
  },
  {
    question: 'Posso recusar pagamento na maquininha do entregador?',
    answer: 'Se você já pagou pelo app, não há motivo para pagar novamente na maquininha. Recuse qualquer cobrança adicional. Se o entregador insistir, não aceite a entrega e registre reclamação no app imediatamente.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe do Delivery Falso: O Que Fazer? Guia Completo',
  description: 'Guia completo sobre como agir após cair no golpe do delivery falso com entregadores e apps fraudulentos.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-02-20',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpeDeliveryPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Delivery Falso' }]} />
      <HowToSchema
        name="Golpe do delivery falso: o que fazer"
        description="Passo a passo para agir após cair no golpe do delivery falso e recuperar seu dinheiro."
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
            <span className="text-white">Golpe Delivery Falso</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Ação imediata:</strong> Se cobraram um valor errado na maquininha, entre em contato com seu banco
              AGORA para contestar a transação antes de continuar lendo.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Caiu no Golpe do<br />
            <span className="gradient-text">Delivery Falso?</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Entregador cobrou valor errado na maquininha ou você baixou um app de delivery falso?
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
            <h2 className="text-2xl font-bold text-white mb-4">O que é o golpe do delivery falso?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              O <strong className="text-white">golpe do delivery falso</strong> ocorre quando criminosos se aproveitam do sistema de entregas
              por aplicativo para aplicar fraudes financeiras na vítima. As modalidades mais comuns são:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { titulo: 'Maquininha adulterada', desc: 'Entregador apresenta maquininha com visor quebrado ou valor alterado, cobrando muito mais que o pedido.' },
                { titulo: 'Taxa extra falsa', desc: 'Golpista alega que há taxa adicional não paga pelo app e exige pagamento na hora da entrega.' },
                { titulo: 'App clonado', desc: 'Aplicativo falso que imita iFood, Rappi ou 99Food para roubar dados bancários e do cartão.' },
                { titulo: 'Entrega fantasma', desc: 'Entregador marca como entregue sem entregar, ou entrega produto diferente e cobra o valor original.' },
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
                { lei: 'CDC — Art. 14', desc: 'A plataforma de delivery e o banco respondem objetivamente por falhas de segurança nos serviços prestados' },
                { lei: 'CDC — Art. 42', desc: 'É vedada cobrança de valores indevidos — a devolução deve ser em dobro' },
                { lei: 'CDC — Art. 39', desc: 'É prática abusiva condicionar a entrega ao pagamento de valor não previamente acordado' },
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
              { titulo: 'Golpe da Maquininha', href: '/golpes/golpe-maquininha', emoji: '💳' },
              { titulo: 'Golpe do Cartão', href: '/golpes/golpe-cartao', emoji: '🔒' },
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
