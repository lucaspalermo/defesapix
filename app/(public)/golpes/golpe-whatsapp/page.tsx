import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, Phone, Shield } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';

export const metadata: Metadata = {
  title: 'Golpe do WhatsApp e Clonagem: O Que Fazer? Guia 2025 | Central de Defesa Digital',
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
            <Link href="/ferramentas/gerador-bo" className="btn-primary">
              <FileText className="w-5 h-5" />
              Gerar BO agora
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
          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">Passo a passo: O que fazer agora</h2>
            <div className="space-y-4">
              {[
                { passo: 1, titulo: 'Recupere o número imediatamente', desc: 'Abra o WhatsApp, insira seu número e solicite novo código. O golpista perde o acesso automaticamente.', urgencia: 'IMEDIATO' },
                { passo: 2, titulo: 'Avise seus contatos', desc: 'Poste um story ou envie mensagem em grupo avisando sobre a clonagem. Peça para ninguém enviar dinheiro.', urgencia: 'URGENTE' },
                { passo: 3, titulo: 'Registre Boletim de Ocorrência', desc: 'O BO protege você de responsabilidades pelas dívidas criadas pelos golpistas com seu número.', urgencia: 'PRIMEIRAS 4H' },
                { passo: 4, titulo: 'Notifique a ANATEL', desc: 'Registre reclamação no site da ANATEL sobre o uso indevido do seu número telefônico.', urgencia: '24H' },
                { passo: 5, titulo: 'Denuncie ao WhatsApp (Meta)', desc: 'No app: Configurações > Ajuda > Fale conosco. Relate a clonagem para bloquear o número fraudulento.', urgencia: '24H' },
                { passo: 6, titulo: 'Ative verificação em duas etapas', desc: 'Configurações > Conta > Verificação em duas etapas. Isso impede nova clonagem.', urgencia: 'DEPOIS' },
              ].map((step) => {
                const isUrgent = ['IMEDIATO', 'URGENTE'].includes(step.urgencia);
                const isMedium = ['PRIMEIRAS 4H', '24H'].includes(step.urgencia);
                return (
                <div key={step.passo} className={`border rounded-xl p-4 transition-all duration-200 ${isUrgent ? 'border-red-500/25 bg-red-500/[0.04] hover:border-red-500/45' : isMedium ? 'border-ember-500/20 bg-ember-500/[0.03] hover:border-ember-500/40' : 'border-white/[0.08] hover:border-white/[0.15]'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0 ${isUrgent ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_14px_rgba(239,68,68,0.35)]' : isMedium ? 'bg-gradient-to-br from-ember-500 to-ember-700 shadow-[0_0_14px_rgba(249,115,22,0.3)]' : 'bg-gradient-to-br from-white/20 to-white/10 text-white/60'}`}>{step.passo}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-white text-sm">{step.titulo}</h3>
                        <span className={`badge text-xs ${isUrgent ? 'badge-red' : isMedium ? 'badge-yellow' : 'badge-blue'}`}>{step.urgencia}</span>
                      </div>
                      <p className="text-sm text-white/60">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
            <Link href="/ferramentas/gerador-bo" className="btn-primary">
              <Shield className="w-4 h-4" />
              Gerar Boletim de Ocorrência
            </Link>
          </div>
        </div>
      </article>

      <FAQSection items={faqItems} />
    </>
  );
}
