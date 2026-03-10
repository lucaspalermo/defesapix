import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, FileText, CheckCircle, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'App ou Site Falso de Banco: O Que Fazer?',
  description: 'Acessou um aplicativo ou site falso do banco? Saiba o que fazer imediatamente para proteger sua conta e recuperar valores perdidos.',
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-clone-app' },
};

const faqItems = [
  { question: 'Como identificar um app falso do banco?', answer: 'Verifique: (1) Baixou da App Store ou Google Play oficial? (2) O nome do desenvolvedor bate com o banco? (3) A URL começa com https e tem o domínio oficial do banco? (4) Tem avaliações consistentes e histórico longo?' },
  { question: 'Acesso a site falso compromete minha conta automaticamente?', answer: 'Depende do que foi inserido. Se você digitou sua senha e token, sim — troque imediatamente. Se apenas visualizou, o risco é menor mas monitore transações. Contate o banco se suspeitar de qualquer comprometimento.' },
  { question: 'O banco é responsável se eu baixei um app falso?', answer: 'Parcialmente. O banco tem obrigação de combater aplicativos falsos (solicitar remoção às lojas) e de manter sistemas de detecção de fraude. O STJ tem entendido que o banco deve ressarcir em casos onde os sistemas de segurança falharam.' },
];


const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'App ou Site Falso de Banco: O Que Fazer?',
  description: 'Acessou um aplicativo ou site falso do banco? Saiba o que fazer imediatamente para proteger sua conta e recuperar valores perdidos.',
  author: { '@type': 'Organization', name: 'DefesaPix', url: 'https://defesapix.com.br' },
  publisher: {
    '@type': 'Organization',
    name: 'DefesaPix',
    logo: { '@type': 'ImageObject', url: 'https://defesapix.com.br/favicon.svg' },
  },
  datePublished: '2025-02-01',
  dateModified: new Date().toISOString().split('T')[0],
  inLanguage: 'pt-BR',
  url: 'https://defesapix.com.br/golpes/golpe-clone-app',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://defesapix.com.br/golpes/golpe-clone-app' },
  image: 'https://defesapix.com.br/opengraph-image',
};

export default function GolpeCloneAppPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Clone de App' }]} />
      <HowToSchema
        name="App ou Site Falso de Banco: O que fazer para proteger sua conta"
        description="Passo a passo de emergência para proteger sua conta bancária após acessar app ou site falso de banco."
        totalTime="PT24H"
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
            <span className="text-white">App/Site Falso</span>
          </div>

          <div className="alert-danger mb-6">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div><strong>Urgência crítica:</strong> Bloqueie todos os cartões e troque senhas AGORA antes de qualquer outra coisa.</div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            App ou Site Falso:<br />
            <span className="gradient-text">Proteja sua Conta Agora</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Você acessou um clone de aplicativo bancário ou site falso.
            Aja imediatamente para limitar os danos.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/pacote-completo" className="btn-primary"><FileText className="w-5 h-5" />Kit Completo — R$47</Link>
            <Link href="/ferramentas/pacote-completo" className="btn-secondary"><CheckCircle className="w-5 h-5" />Kit Completo — R$47</Link>
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
        </div>
      </article>

      <FAQSection items={faqItems} />

      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-4">Leia também no blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { titulo: 'Engenharia social: a base de 90% dos golpes digitais', href: '/blog/engenharia-social-o-que-e-como-se-proteger' },
              { titulo: 'Como bloquear celular roubado: IMEI, chip e apps', href: '/blog/como-bloquear-celular-roubado-imei' },
              { titulo: 'Seus direitos como cliente de banco digital', href: '/blog/direitos-consumidor-banco-digital' },
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
