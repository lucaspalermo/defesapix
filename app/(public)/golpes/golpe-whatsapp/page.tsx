import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, Shield, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do WhatsApp e Clonagem: O Que Fazer? Guia 2025',
  description:
    'Seu WhatsApp foi clonado ou você recebeu pedido de dinheiro via número clonado? Saiba o que fazer, como denunciar e como se proteger de responsabilidade.',
  keywords: ['clonagem whatsapp', 'golpe whatsapp o que fazer', 'numero clonado whatsapp', 'golpe whatsapp como denunciar'],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-whatsapp' },
};

const faqItems = [
  {
    question: 'Como saber se meu WhatsApp foi clonado?',
    answer: 'Sinais de clonagem: você para de receber mensagens, amigos relatam mensagens estranhas vindas do seu número, você recebe um código de verificação que não solicitou, ou o WhatsApp exibe mensagem de "número já registrado em outro dispositivo".',
  },
  {
    question: 'Sou responsável pelas dívidas feitas com meu número clonado?',
    answer: 'Não, desde que você possa provar a clonagem. O Boletim de Ocorrência é fundamental para isso. Registre o BO imediatamente e notifique a ANATEL. A jurisprudência tem protegido vítimas de clonagem de responsabilidade por dívidas criadas pelos golpistas.',
  },
  {
    question: 'Como recuperar meu WhatsApp clonado?',
    answer: 'Acesse o WhatsApp, insira seu número, solicite o código SMS e registre novamente. O golpista perde o acesso. Depois, ative a "Verificação em duas etapas" nas configurações para evitar nova clonagem.',
  },
  {
    question: 'O que fazer se minha família mandou dinheiro achando ser eu?',
    answer: 'Oriente seus familiares a registrarem BO e solicitarem o cancelamento das transferências Pix (via MED se aplicável). Colete prints das conversas do WhatsApp como prova. Faça queixa na Meta (Facebook) pelo aplicativo.',
  },
];


const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe do WhatsApp e Clonagem: O Que Fazer? Guia 2025',
  description: 'Seu WhatsApp foi clonado ou você recebeu pedido de dinheiro via número clonado? Saiba o que fazer, como denunciar e como se proteger de responsabilidade.',
  author: { '@type': 'Organization', name: 'DefesaPix', url: 'https://defesapix.com.br' },
  publisher: {
    '@type': 'Organization',
    name: 'DefesaPix',
    logo: { '@type': 'ImageObject', url: 'https://defesapix.com.br/favicon.svg' },
  },
  datePublished: '2025-01-20',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'pt-BR',
  url: 'https://defesapix.com.br/golpes/golpe-whatsapp',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://defesapix.com.br/golpes/golpe-whatsapp' },
  image: 'https://defesapix.com.br/opengraph-image',
};

export default function GolpeWhatsAppPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe WhatsApp' }]} />
      <HowToSchema
        name="WhatsApp Clonado: O que fazer para recuperar e se proteger"
        description="Passo a passo para recuperar WhatsApp clonado, registrar BO e proteger seus contatos contra golpes."
        totalTime="PT24H"
        steps={[
          { name: 'Identifique o golpe', text: 'Confirme que voce foi vitima e reuna todas as evidencias disponiveis.' },
          { name: 'Acesse o Kit Completo DefesaPix', text: 'Em defesapix.com.br, preencha seus dados e receba o plano de acao completo com 5 documentos juridicos por R$47.', url: '/ferramentas/pacote-completo' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/golpes" className="hover:text-white">Golpes</Link>
            <span>/</span>
            <span className="text-white">Clonagem WhatsApp</span>
          </div>

          <div className="alert-warning mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <strong>Ação imediata:</strong> Recupere seu número agora e avise seus contatos para não enviarem dinheiro.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Golpe do WhatsApp:<br />
            <span className="gradient-text">Clonagem e o Que Fazer</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Seu WhatsApp foi clonado e estão usando seu número para pedir dinheiro aos seus contatos?
            Veja o passo a passo para recuperar o controle e proteger sua reputação.
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

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">Seus direitos legais</h2>
            <div className="space-y-3">
              {[
                { lei: 'Lei 14.155/2021', desc: 'Agrava penas para crimes digitais, incluindo clonagem de aplicativos de comunicação' },
                { lei: 'Código Penal — Art. 171', desc: 'Estelionato praticado com identidade falsa tem pena majorada' },
                { lei: 'CDC — Art. 42', desc: 'Proteção contra cobrança abusiva de valores contraídos por terceiros' },
              ].map((item) => (
                <div key={item.lei} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="badge-green shrink-0 text-xs font-mono">{item.lei}</span>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="card border-green-500/30 bg-green-500/5 text-center">
            <h3 className="font-bold text-white text-xl mb-3">Gere o BO completo em 2 minutos</h3>
            <p className="text-white/70 mb-6">Modelo profissional com tipificação correta para crime de estelionato digital.</p>
            <Link href="/ferramentas/pacote-completo" className="btn-primary">
              <Shield className="w-4 h-4" />
              Kit Completo — R$47
            </Link>
          </div>
        </div>
      </article>

      <FAQSection items={faqItems} />

      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-4">Leia também no blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { titulo: 'Golpe do WhatsApp: como identificar e se proteger', href: '/blog/golpe-whatsapp-como-identificar-se-proteger' },
              { titulo: 'Golpe do falso funcionário do banco: como funciona', href: '/blog/golpe-falso-funcionario-banco' },
              { titulo: 'Engenharia social: a base de 90% dos golpes digitais', href: '/blog/engenharia-social-o-que-e-como-se-proteger' },
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
