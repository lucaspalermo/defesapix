import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, ExternalLink } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe de Investimento e Criptomoedas: O Que Fazer?',
  description: 'Perdeu dinheiro em investimento falso ou criptomoedas fraudulentas? Veja como denunciar à CVM, Polícia Federal e Banco Central.',
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-investimento' },
};

const faqItems = [
  { question: 'Como identificar um esquema Ponzi ou pirâmide financeira?', answer: 'Principais sinais: retorno garantido muito acima da Selic (ex: 10% ao mês), pressão para recrutar novos investidores, ausência de registro na CVM, empresa sem sede física verificável, e prometem "renda passiva" sem explicar de onde vem o retorno.' },
  { question: 'A CVM pode ajudar a recuperar dinheiro de investimento falso?', answer: 'A CVM pode investigar e responsabilizar os responsáveis, mas não garante devolução dos valores. No entanto, as ações da CVM frequentemente levam a processos criminais que resultam em bloqueio de ativos dos golpistas, aumentando as chances de recuperação parcial.' },
  { question: 'Posso recuperar bitcoin ou criptomoeda enviada para golpistas?', answer: 'É muito difícil recuperar criptomoedas por reversão direta, mas há caminhos: (1) se enviou via exchange brasileira regulamentada, pode pedir reversão; (2) análise blockchain pode rastrear destino dos fundos; (3) ação judicial com ordem de bloqueio de ativos.' },
];

export default function GolpeInvestimentoPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Investimento' }]} />
      <HowToSchema
        name="Golpe de Investimento: O que fazer para denunciar e recuperar valores"
        description="Passo a passo para denunciar golpe de investimento ou criptomoeda fraudulenta à Polícia Federal, CVM e Banco Central."
        totalTime="PT72H"
        steps={[
          { name: 'Registre BO na Polícia Federal', text: 'Golpes de investimento são crimes federais. Registre BO na PF imediatamente com todos os comprovantes.', url: '/ferramentas/pacote-completo' },
          { name: 'Denuncie à CVM', text: 'Denuncie à Comissão de Valores Mobiliários para investigação e bloqueio de ativos dos responsáveis.' },
          { name: 'Registre no Banco Central', text: 'Se houve movimentação financeira, registre reclamação formal no Banco Central.' },
          { name: 'Denuncie ao COAF', text: 'Registre denúncia no Conselho de Controle de Atividades Financeiras para casos de lavagem de dinheiro.' },
        ]}
      />
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/golpes" className="hover:text-white">Golpes</Link><span>/</span>
            <span className="text-white">Investimento Fraudulento</span>
          </div>
          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Golpe de Investimento:<br />
            <span className="gradient-text">O Que Fazer em 2025</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Pirâmides financeiras, criptomoedas falsas e investimentos fraudulentos.
            Saiba como denunciar e recuperar valores com os órgãos certos.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/pacote-completo" className="btn-primary"><FileText className="w-5 h-5" />Kit Completo — R$47</Link>
            <Link href="/parceiros" className="btn-secondary"><CheckCircle className="w-5 h-5" />Consultar advogado</Link>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container max-w-4xl space-y-10">
          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-4">O que fazer após golpe de investimento</h2>
            <div className="space-y-3">
              {[
                { step: 1, org: 'Polícia Federal', desc: 'Golpes de investimento são crimes federais. Registre BO na PF imediatamente.', href: 'https://www.gov.br/pf', urgencia: 'IMEDIATO', color: 'red'   },
                { step: 2, org: 'CVM — Comissão de Valores Mobiliários', desc: 'Denuncie à CVM para investigação e bloqueio de ativos dos responsáveis.', href: 'https://www.cvm.gov.br', urgencia: '24H', color: 'ember' },
                { step: 3, org: 'Banco Central', desc: 'Se houve movimentação financeira, registre no Banco Central.', href: 'https://www.bcb.gov.br', urgencia: '48H', color: 'blue'  },
                { step: 4, org: 'COAF', desc: 'Conselho de Controle de Atividades Financeiras — para lavagem de dinheiro.', href: 'https://www.gov.br/coaf', urgencia: '72H', color: 'gold'  },
              ].map((item) => (
                <div key={item.step} className={`border rounded-xl p-4 transition-all duration-200 ${item.color === 'red' ? 'border-red-500/25 bg-red-500/[0.04] hover:border-red-500/45' : item.color === 'ember' ? 'border-ember-500/20 bg-ember-500/[0.03] hover:border-ember-500/40' : item.color === 'blue' ? 'border-blue-500/20 bg-blue-500/[0.03] hover:border-blue-500/40' : 'border-gold-500/20 bg-gold-500/[0.03] hover:border-gold-500/40'}`}>
                  <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0 ${item.color === 'red' ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_14px_rgba(239,68,68,0.35)]' : item.color === 'ember' ? 'bg-gradient-to-br from-ember-500 to-ember-700 shadow-[0_0_14px_rgba(249,115,22,0.3)]' : item.color === 'blue' ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_14px_rgba(59,130,246,0.3)]' : 'bg-gradient-to-br from-gold-500 to-gold-700 shadow-[0_0_14px_rgba(245,158,11,0.3)]'}`}>{item.step}</div>
                      <h3 className="font-heading font-bold text-white text-sm">{item.org}</h3>
                    </div>
                    <span className={`badge text-xs ${item.color === 'red' ? 'badge-red' : 'badge-yellow'}`}>{item.urgencia}</span>
                  </div>
                  <p className="text-sm text-white/60 mb-2">{item.desc}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />Acessar site oficial
                  </a>
                </div>
              ))}
            </div>
          </section>

          <div className="card border-yellow-500/20 bg-yellow-500/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Para casos acima de R$5.000</h3>
                <p className="text-sm text-white/70 mb-4">Golpes de investimento geralmente envolvem valores altos e requerem ação jurídica especializada. Nossos parceiros oferecem consulta gratuita de 30 minutos.</p>
                <Link href="/parceiros" className="btn-primary text-sm py-2">Consultar advogado especializado</Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <FAQSection items={faqItems} />

      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-4">Leia também no blog</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { titulo: 'Golpe de Investimento e Criptomoedas: como denunciar', href: '/blog/golpe-investimento-criptomoeda-brasil' },
              { titulo: 'Conta laranja no Pix: consequências legais', href: '/blog/conta-laranja-pix-consequencias-legais' },
              { titulo: 'Lei 14.155/2021: penas mais duras para fraudes digitais', href: '/blog/lei-14155-2021-fraude-digital-penas' },
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
