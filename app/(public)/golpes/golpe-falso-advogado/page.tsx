import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle, Shield, FileText, ArrowRight, CheckCircle,
  X, ExternalLink, Phone, Scale, UserX,
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

const STEPS = [
  {
    n: '1', urgencia: 'IMEDIATO', cor: 'red',
    title: 'Não faça mais nenhum pagamento',
    desc: 'Se reconheceu o golpe antes de pagar, ótimo. Se já pagou, pare imediatamente qualquer transferência adicional — o golpista vai pedir "taxas" e "impostos" sucessivamente.',
  },
  {
    n: '2', urgencia: 'AGORA', cor: 'red',
    title: 'Verifique a inscrição na OAB',
    desc: 'Todo advogado registrado no Brasil tem inscrição na OAB. A consulta é gratuita e pública. Busque pelo nome, número de OAB ou CPF.',
    links: [
      { texto: 'Consultar advogado no CFJ/OAB', href: 'https://cna.oab.org.br' },
    ],
  },
  {
    n: '3', urgencia: 'PRIMEIRAS 24H', cor: 'orange',
    title: 'Registre Boletim de Ocorrência',
    desc: 'Registre BO por estelionato (Art. 171 do Código Penal). Inclua todos os dados: nome do suposto advogado, número de OAB apresentado, contas bancárias usadas, conversas de WhatsApp.',
    link: '/ferramentas/gerador-bo',
    linkText: 'Gerar modelo de BO (gratuito) →',
  },
  {
    n: '4', urgencia: 'PRIMEIRAS 48H', cor: 'orange',
    title: 'Notifique o banco e acione o MED (se foi Pix)',
    desc: 'Se o pagamento foi via Pix, o MED pode bloquear os valores ainda na conta do golpista. Aja dentro de 72 horas da transação para melhor resultado.',
    link: '/ferramentas/pacote-completo',
    linkText: 'Gerar contestação MED + BO + Notificação →',
  },
  {
    n: '5', urgencia: 'PRIMEIROS 5 DIAS', cor: 'blue',
    title: 'Denuncie à OAB da sua seccional',
    desc: 'Se o golpista usou um número de OAB de outra pessoa (roubo de identidade profissional), a OAB pode investigar e alertar outros potenciais vítimas.',
    links: [
      { texto: 'OAB nacional — ouvidoria', href: 'https://www.oab.org.br' },
    ],
  },
  {
    n: '6', urgencia: 'PRIMEIROS 7 DIAS', cor: 'blue',
    title: 'Denuncie ao PROCON e ao BACEN',
    desc: 'O PROCON recebe reclamações contra serviços não prestados. O BACEN recebe denúncias sobre transações fraudulentas via Pix.',
    links: [
      { texto: 'Meu BC — BACEN', href: 'https://www.bcb.gov.br/meubc' },
      { texto: 'Consumidor.gov.br', href: 'https://www.consumidor.gov.br' },
    ],
  },
];

const COMO_VERIFICAR = [
  'Acesse cna.oab.org.br (Cadastro Nacional de Advogados)',
  'Busque pelo nome completo ou número de inscrição apresentado',
  'Verifique se a inscrição está ATIVA (não suspensa ou cancelada)',
  'Confirme o estado de inscrição (cada estado tem sua seccional)',
  'Se o número de OAB não existir ou for de outra pessoa — é fraude',
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Falso Advogado' }]} />
      <HowToSchema
        name="Golpe do Falso Advogado: Como identificar e agir"
        description="Passo a passo para verificar registro na OAB, denunciar falso advogado e recuperar valores pagos em honorários fraudulentos."
        totalTime="PT168H"
        steps={[
          { name: 'Não faça mais nenhum pagamento', text: 'Se reconheceu o golpe antes de pagar, ótimo. Se já pagou, pare imediatamente qualquer transferência adicional.' },
          { name: 'Verifique a inscrição na OAB', text: 'Todo advogado registrado no Brasil tem inscrição na OAB. Acesse cna.oab.org.br e busque pelo nome ou número de OAB.' },
          { name: 'Registre Boletim de Ocorrência', text: 'Registre BO por estelionato (Art. 171 do CP). Inclua todos os dados: nome do suposto advogado, número de OAB, contas usadas, conversas.', url: '/ferramentas/gerador-bo' },
          { name: 'Notifique o banco e acione o MED', text: 'Se o pagamento foi via Pix, o MED pode bloquear os valores ainda na conta do golpista. Aja dentro de 72 horas.', url: '/ferramentas/pacote-completo' },
          { name: 'Denuncie à OAB da sua seccional', text: 'Se o golpista usou um número de OAB de outra pessoa, a OAB pode investigar e alertar outros potenciais vítimas.' },
          { name: 'Denuncie ao PROCON e ao BACEN', text: 'O PROCON recebe reclamações contra serviços não prestados. O BACEN recebe denúncias sobre transações fraudulentas via Pix.' },
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
            Antes de pagar, verifique o registro na OAB e leia os sinais de alerta abaixo.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://cna.oab.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Scale className="w-5 h-5" />
              Verificar advogado na OAB agora
              <ExternalLink className="w-4 h-4" />
            </a>
            <Link href="/ferramentas/gerador-bo" className="btn-secondary">
              <FileText className="w-5 h-5" />
              Gerar BO (grátis)
            </Link>
          </div>
        </div>
      </section>

      {/* ── Verify OAB banner ────────────────────────────────── */}
      <section className="py-6 bg-blue-950/30 border-y border-blue-500/20">
        <div className="container max-w-4xl">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Scale className="w-8 h-8 text-blue-400 shrink-0" />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-white text-sm">Verificação de advogado — gratuita e imediata</h2>
              <p className="text-xs text-white/60 mt-0.5">
                Acesse cna.oab.org.br e busque pelo nome ou número de OAB. Se não aparecer, é fraude.
              </p>
            </div>
            <a
              href="https://cna.oab.org.br"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary shrink-0 text-sm"
            >
              Consultar agora
              <ExternalLink className="w-4 h-4" />
            </a>
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

          {/* Como verificar OAB ─────────────────────────────── */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-xl text-white mb-5">Como verificar se o advogado é real</h2>
            <div className="card border-blue-500/20 mb-4">
              <ol className="space-y-3">
                {COMO_VERIFICAR.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 text-[0.65rem] font-bold text-blue-400 mt-0.5">
                      {idx + 1}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
              <a
                href="https://cna.oab.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-semibold mt-4"
              >
                <ExternalLink className="w-4 h-4" />
                Acessar Cadastro Nacional de Advogados →
              </a>
            </div>
          </section>

          {/* Steps ─────────────────────────────────────────── */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-6">O que fazer — passo a passo</h2>
            <div className="space-y-4">
              {STEPS.map((step) => {
                const corBorder = step.cor === 'red' ? 'border-red-500/30 bg-red-500/5' :
                                  step.cor === 'orange' ? 'border-ember-500/30 bg-ember-500/5' :
                                  'border-blue-500/20 bg-blue-500/5';
                const badgeCls = step.cor === 'red' ? 'badge-red' : step.cor === 'orange' ? 'badge-yellow' : 'badge-blue';
                const iconBadge = step.cor === 'red' ? 'icon-badge-red' : step.cor === 'orange' ? 'icon-badge-ember' : 'icon-badge-blue';
                return (
                  <div key={step.n} className={`border rounded-2xl p-5 ${corBorder}`}>
                    <div className="flex items-start gap-4">
                      <div className={`icon-badge ${iconBadge} shrink-0`}>
                        <span className="font-heading font-black text-white text-sm">{step.n}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`badge text-xs ${badgeCls}`}>{step.urgencia}</span>
                          <h3 className="font-bold text-white text-sm">Passo {step.n}: {step.title}</h3>
                        </div>
                        <p className="text-sm text-white/70 mb-3">{step.desc}</p>
                        {'links' in step && step.links && (
                          <div className="flex flex-wrap gap-3">
                            {step.links.map((l) => (
                              <a
                                key={l.href}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-semibold"
                              >
                                {l.texto}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                        {'link' in step && step.link && (
                          <Link
                            href={step.link}
                            className="inline-flex items-center gap-1 text-sm text-green-400 hover:text-green-300 font-semibold"
                          >
                            {step.linkText}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
              <Link href="/ferramentas/gerador-bo" className="btn-secondary">
                <Shield className="w-4 h-4" />
                Gerar só o BO (grátis)
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
