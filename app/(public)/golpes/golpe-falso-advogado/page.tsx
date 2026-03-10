import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle, Shield, FileText, Lock,
  X, UserX,
} from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do Falso Advogado: Como Identificar e se Defender',
  description:
    'Prometeram recuperar seu dinheiro e pediram honorários antecipados? Saiba como identificar o golpe do falso advogado, verificar o registro na OAB e denunciar.',
  keywords: [
    'golpe falso advogado',
    'advogado falso recuperação dinheiro',
    'verificar advogado oab',
    'fraude escritório de advocacia',
    'golpe honorários antecipados',
    'falso advogado o que fazer',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-falso-advogado' },
};

const ALERTAS = [
  { sinal: 'Cobrou honorários 100% antecipados, antes de qualquer trabalho', detalhe: 'Advogados sérios cobram parcialmente após resultados, ou com contrato claro de retainer.' },
  { sinal: 'Prometeu garantia de recuperação total do dinheiro', detalhe: 'Nenhum advogado sério garante resultado. O exercício da advocacia proíbe expressamente promessas de êxito.' },
  { sinal: 'Entrou em contato sem que você tivesse procurado', detalhe: 'Especialmente via WhatsApp, e-mail ou redes sociais — advocacia por WhatsApp frio é vedada pelo Código de Ética da OAB.' },
  { sinal: 'Pediu sigilo absoluto e urgência para o pagamento', detalhe: 'Fraudes sempre criam urgência artificial para impedir que você verifique as informações.' },
  { sinal: 'O pagamento é para conta pessoal (CPF), não jurídica (CNPJ)', detalhe: 'Escritórios de advocacia recebem em conta jurídica do escritório ou do advogado (que tem CNPJ como autônomo, mas a nota fiscal existe).' },
  { sinal: 'Não apresentou número de registro na OAB quando pedido', detalhe: 'Todo advogado é obrigado a informar seu número de inscrição na OAB. A recusa é sinal certo de fraude.' },
  { sinal: 'Alega ter "contatos internos" no banco ou na Justiça', detalhe: 'Isso não existe em um Estado de Direito. É uma técnica para parecer mais poderoso e confiável.' },
];

const DIREITOS = [
  { lei: 'CP — Art. 171', desc: 'Estelionato: pena de 1 a 5 anos, majorada em meio digital (Lei 14.155/2021)' },
  { lei: 'CP — Art. 307', desc: 'Falsa identidade profissional: usar título de advogado sem registro — pena de 3 meses a 1 ano' },
  { lei: 'EOAB — Art. 34', desc: 'Vedado ao advogado: garantir resultado, captar clientes por meios vedados, cobrar previamente sem acordo' },
  { lei: 'CDC — Art. 39', desc: 'Práticas abusivas — venda sob pressão e cobrança de serviço não prestado são ilegais' },
];

const faqItems = [
  {
    question: 'Como o golpista me encontrou se eu já fui vítima de um golpe?',
    answer: 'Golpistas monitoram grupos de vítimas em redes sociais, compram listas de dados vazados e respondem a postagens públicas sobre golpes. A segunda vítimização é muito comum — pessoas desesperadas por recuperar dinheiro são alvos fáceis.',
  },
  {
    question: 'Posso verificar se o advogado é real pelo WhatsApp ou Instagram?',
    answer: 'Não — perfis podem ser falsos. A única verificação confiável é pelo site oficial da OAB (cna.oab.org.br). Nome, foto e redes sociais podem ser copiados facilmente.',
  },
  {
    question: 'Paguei uma "taxa de liberação" — ainda dá para recuperar?',
    answer: 'Se foi via Pix dentro de 72h, o MED pode bloquear valores. Se foi há mais tempo, o caminho é BO + notificação bancária + contestação judicial. Não pague nenhuma taxa adicional que cobrem.',
  },
  {
    question: 'O falso advogado usou o nome de um advogado real — como denunciar?',
    answer: 'Registre BO por falsa identidade (Art. 307 do CP) e notifique a OAB da seccional do advogado real, que pode alertar o sistema e processar o golpista por uso indevido do registro.',
  },
  {
    question: 'Advogado de verdade cobra antecipado?',
    answer: 'Pode cobrar parte dos honorários inicialmente, sim — mas com contrato formal, nota fiscal e registro no Conselho. O que é vedado é prometer resultado garantido e cobrar tudo antes de fazer qualquer coisa. Qualquer cobrança deve ter documento.',
  },
];


const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe do Falso Advogado: Como Identificar e se Defender',
  description: 'Prometeram recuperar seu dinheiro e pediram honorários antecipados? Saiba como identificar o golpe do falso advogado e denunciar.',
  author: { '@type': 'Organization', name: 'DefesaPix', url: 'https://defesapix.com.br' },
  publisher: {
    '@type': 'Organization',
    name: 'DefesaPix',
    logo: { '@type': 'ImageObject', url: 'https://defesapix.com.br/favicon.svg' },
  },
  datePublished: '2025-02-10',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'pt-BR',
  url: 'https://defesapix.com.br/golpes/golpe-falso-advogado',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://defesapix.com.br/golpes/golpe-falso-advogado' },
  image: 'https://defesapix.com.br/opengraph-image',
};

export default function GolpeFalsoAdvogadoPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Falso Advogado' }]} />
      <HowToSchema
        name="Golpe do Falso Advogado: Como identificar e agir"
        description="Passo a passo para verificar registro na OAB, denunciar falso advogado e recuperar valores pagos em honorários fraudulentos."
        totalTime="PT168H"
        steps={[
          { name: 'Identifique o golpe', text: 'Confirme que você foi vítima e reúna todas as evidências disponíveis.' },
          { name: 'Acesse o Kit Completo DefesaPix', text: 'Em defesapix.com.br, preencha seus dados e receba o plano de ação completo com 5 documentos jurídicos por R$47.', url: '/ferramentas/pacote-completo' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-hero-gradient py-14 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/golpes" className="hover:text-white transition-colors">Tipos de Golpe</Link>
            <span>/</span>
            <span className="text-white">Golpe do Falso Advogado</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Golpe sobre golpe:</strong> Pessoas que já sofreram fraudes são os principais alvos.
              O golpista se aproveita do desespero para cobrar "honorários" sem prestar nenhum serviço.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Golpe do Falso Advogado:<br />
            <span className="gradient-text">Como Identificar e Agir</span>
          </h1>

          <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-2xl">
            Um "advogado" entrou em contato prometendo recuperar seu dinheiro?
            Antes de pagar, leia os sinais de alerta abaixo.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/ferramentas/pacote-completo" className="btn-primary">
              <FileText className="w-5 h-5" />
              Kit Completo — R$47
            </Link>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container max-w-4xl">

          {/* Sinais de alerta ───────────────────────────────── */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-6 flex items-center gap-2">
              <UserX className="w-6 h-6 text-red-400" />
              7 sinais de que é um golpe
            </h2>
            <div className="space-y-3">
              {ALERTAS.map((a, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{a.sinal}</p>
                    <p className="text-xs text-white/50">{a.detalhe}</p>
                  </div>
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

          {/* Direitos ────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-xl text-white mb-4">Seus direitos legais</h2>
            <div className="space-y-3">
              {DIREITOS.map((item) => (
                <div key={item.lei} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="badge-green shrink-0 font-mono text-xs">{item.lei}</span>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA ─────────────────────────────────────────────── */}
          <div className="card border-green-500/30 bg-green-500/5 text-center">
            <h3 className="font-bold text-white text-xl mb-3">
              Já pagou ao golpista? Ainda dá tempo de agir.
            </h3>
            <p className="text-white/70 mb-6 text-sm">
              Gere contestação MED (Pix), BO por estelionato e notificação bancária.
              Tudo personalizado com seus dados em 15 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/pacote-completo" className="btn-primary">
                <FileText className="w-4 h-4" />
                Pacote Emergência — 3 documentos
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

      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-6">Conteúdo relacionado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { titulo: 'Golpe via Pix — MED', href: '/golpes/golpe-pix' },
              { titulo: 'Golpe do Emprego Falso', href: '/golpes/golpe-emprego' },
              { titulo: 'Pacote Emergência — 3 PDFs', href: '/ferramentas/pacote-completo' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card hover:border-green-500/30 transition-all group">
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
