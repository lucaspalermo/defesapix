import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do Falso Suporte Técnico: O Que Fazer? Guia Completo',
  description:
    'Ligaram dizendo ser suporte técnico do banco ou Microsoft? Saiba como agir contra o golpe do falso suporte, proteger suas contas e recuperar seu dinheiro.',
  keywords: [
    'golpe falso suporte técnico',
    'golpe ligação banco',
    'golpe acesso remoto',
    'golpe suporte microsoft',
    'golpe teamviewer anydesk',
    'falso funcionário banco',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-falso-suporte' },
};

const faqItems = [
  {
    question: 'Como funciona o golpe do falso suporte técnico?',
    answer: 'O golpista liga ou envia pop-up dizendo que seu computador/celular está infectado ou que há movimentação suspeita na conta. Ele convence a vítima a instalar um programa de acesso remoto (AnyDesk, TeamViewer) e, com o controle do dispositivo, faz transferências ou rouba dados.',
  },
  {
    question: 'Banco liga pedindo para instalar aplicativo?',
    answer: 'NÃO. Nenhum banco legítimo pede para você instalar programas de acesso remoto, fornecer senhas ou códigos de segurança por telefone. Se receber esse tipo de ligação, desligue imediatamente e ligue para o número oficial do banco.',
  },
  {
    question: 'Instalei o AnyDesk/TeamViewer para o golpista. O que faço?',
    answer: 'Desinstale o programa imediatamente, troque TODAS as senhas (banco, e-mail, redes sociais) em outro dispositivo, entre em contato com o banco para bloquear operações e registre um B.O.',
  },
  {
    question: 'O banco deve devolver o dinheiro roubado pelo acesso remoto?',
    answer: 'Depende do caso. Pelo CDC e Súmula 479 do STJ, o banco tem responsabilidade objetiva por falhas de segurança. Porém, se ficar provado que o cliente agiu com negligência extrema, o banco pode contestar. Uma notificação formal bem fundamentada aumenta suas chances.',
  },
  {
    question: 'Como diferenciar ligação real do banco de golpe?',
    answer: 'O banco nunca pede: senha, código do token, instalação de apps, transferência para "conta segura" ou dados do cartão por telefone. Na dúvida, desligue e ligue você mesmo para o número que está no cartão ou no app oficial.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe do Falso Suporte Técnico: O Que Fazer? Guia Completo',
  description: 'Guia completo sobre como agir após cair no golpe do falso suporte técnico com acesso remoto.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-02-20',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpeFalsoSuportePage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Falso Suporte Técnico' }]} />
      <HowToSchema
        name="Golpe do falso suporte técnico: o que fazer"
        description="Passo a passo para agir após cair no golpe do falso suporte técnico e recuperar seu dinheiro."
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
            <span className="text-white">Golpe Falso Suporte Técnico</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Ação imediata:</strong> Se você instalou um programa de acesso remoto a pedido de um desconhecido,
              desinstale AGORA e troque todas as suas senhas em outro dispositivo.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Caiu no Golpe do<br />
            <span className="gradient-text">Falso Suporte Técnico?</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Alguém ligou dizendo ser do banco ou suporte técnico e pediu acesso remoto ao seu celular ou computador?
            Saiba o que fazer para proteger suas contas e recuperar seu dinheiro.
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
            <h2 className="text-2xl font-bold text-white mb-4">O que é o golpe do falso suporte técnico?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              O <strong className="text-white">golpe do falso suporte técnico</strong> ocorre quando criminosos se passam por funcionários
              de bancos, empresas de tecnologia ou operadoras para obter acesso remoto ao dispositivo da vítima. As modalidades mais comuns são:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { titulo: 'Falso funcionário do banco', desc: 'Golpista liga dizendo que há movimentação suspeita na conta e pede para instalar app de acesso remoto para "resolver".' },
                { titulo: 'Pop-up de vírus falso', desc: 'Janela aparece no navegador dizendo que o computador está infectado e mostra número de telefone para "suporte".' },
                { titulo: 'Suporte Microsoft/Apple falso', desc: 'Ligação ou e-mail alegando ser da Microsoft ou Apple pedindo acesso remoto para "correção de segurança".' },
                { titulo: 'Golpe da conta segura', desc: 'Golpista convence a vítima a transferir dinheiro para uma "conta segura" enquanto controla o dispositivo remotamente.' },
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
                { lei: 'CDC — Art. 14', desc: 'O banco responde objetivamente por falhas de segurança nos serviços prestados' },
                { lei: 'Súmula 479 STJ', desc: 'Bancos respondem por danos causados por fraudes de terceiros em operações bancárias' },
                { lei: 'Lei 14.155/2021', desc: 'Agrava penas para fraude eletrônica e invasão de dispositivo — reclusão de 4 a 8 anos' },
                { lei: 'CP — Art. 171', desc: 'Estelionato: obter vantagem ilícita induzindo alguém a erro — pena de 1 a 5 anos' },
                { lei: 'Resolução BACEN 4.893/2021', desc: 'Obriga instituições financeiras a manter política de segurança cibernética e prevenir fraudes' },
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
              { titulo: 'Golpe de Phishing', href: '/golpes/golpe-phishing', emoji: '🎣' },
              { titulo: 'Golpe via Pix', href: '/golpes/golpe-pix', emoji: '⚡' },
              { titulo: 'Golpe do Cartão', href: '/golpes/golpe-cartao', emoji: '💳' },
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
