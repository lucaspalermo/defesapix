import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe de Emprego Falso: O Que Fazer? | Central de Defesa Digital',
  description: 'Foi vítima de vaga de emprego falsa? Saiba como denunciar ao MTE, Procon e Polícia, e recuperar taxas pagas indevidamente.',
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-emprego' },
};

const faqItems = [
  { question: 'Quais são as formas mais comuns do golpe de emprego?', answer: 'Principais tipos: (1) Taxa de cadastro ou treinamento para garantir vaga; (2) Depósito de cheque falso com pedido de devolução de parte; (3) Vaga de trabalho em casa com compra de "kit de trabalho"; (4) Empresa inexistente que pede dados pessoais e bancários.' },
  { question: 'Empresa pode cobrar taxa para processo seletivo?', answer: 'Não. É ilegal cobrar qualquer taxa do candidato para participar de processo seletivo. Isso é caracterizado como estelionato. Nenhuma empresa legítima cobra do candidato.' },
  { question: 'Como verificar se uma vaga é legítima?', answer: 'Verifique: (1) CNPJ da empresa no site da Receita Federal; (2) Empresa tem site oficial e presença real? (3) A vaga está publicada nos canais oficiais da empresa? (4) Você encontra avaliações da empresa no Glassdoor/LinkedIn?' },
];

export default function GolpeEmpregoPage() {
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
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Emprego' }]} />
      <HowToSchema
        name="Golpe de Emprego Falso: O que fazer para denunciar e recuperar taxas"
        description="Passo a passo para denunciar vaga de emprego falsa e recuperar taxas pagas indevidamente."
        totalTime="PT72H"
        steps={[
          { name: 'Registre Boletim de Ocorrência', text: 'Estelionato — Art. 171 CP. Registre BO com dados da empresa falsa e comprovante de pagamento.', url: '/ferramentas/gerador-bo' },
          { name: 'Denuncie ao Ministério do Trabalho (MTE)', text: 'Denuncie vagas falsas e cobrança ilegal de candidatos ao emprego no portal do MTE.' },
          { name: 'Registre reclamação no Procon', text: 'Relação de consumo indevida — cobrança abusiva de taxas de candidatura é ilegal.' },
          { name: 'Denuncie à Polícia Federal', text: 'Se a empresa falsa atua em vários estados ou há suspeita de organização criminosa.' },
        ]}
      />
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/golpes" className="hover:text-white">Golpes</Link><span>/</span>
            <span className="text-white">Emprego Falso</span>
          </div>
          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Golpe de Emprego Falso:<br />
            <span className="gradient-text">Defenda Seus Direitos</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Pagou taxa para uma vaga de emprego ou teve seus dados usados em fraude?
            Saiba como denunciar e recuperar os valores.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/gerador-bo" className="btn-primary"><FileText className="w-5 h-5" />Gerar BO</Link>
            <Link href="/ferramentas/checklist" className="btn-secondary"><CheckCircle className="w-5 h-5" />Ver checklist</Link>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container max-w-4xl space-y-10">
          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-6">Onde denunciar</h2>
            <div className="space-y-3">
              {[
                { org: 'Polícia Civil (BO)',           desc: 'Estelionato — Art. 171 CP. Registre BO com dados da empresa falsa e comprovante de pagamento.', href: '/ferramentas/gerador-bo', interno: true,  badge: 'red'    },
                { org: 'Ministério do Trabalho (MTE)', desc: 'Denuncie vagas falsas e cobrança ilegal de candidatos ao emprego.', href: 'https://www.gov.br/trabalho-e-previdencia', interno: false, badge: 'ember'  },
                { org: 'Procon',                       desc: 'Relação de consumo indevida — cobrança abusiva de taxas de candidatura.', href: 'https://www.procon.sp.gov.br', interno: false, badge: 'gold'   },
                { org: 'Polícia Federal',               desc: 'Se a empresa falsa atua em vários estados ou suspeita de organização criminosa.', href: 'https://www.gov.br/pf', interno: false, badge: 'blue'   },
              ].map((item) => (
                <div key={item.org} className="card group hover:border-white/[0.12] transition-all duration-200">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`icon-badge icon-badge-${item.badge} shrink-0 group-hover:scale-105 transition-transform`}>
                        <FileText className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading font-bold text-white mb-1 text-sm">{item.org}</h3>
                        <p className="text-sm text-white/60">{item.desc}</p>
                      </div>
                    </div>
                    {item.interno ? (
                      <Link href={item.href} className="btn-primary text-xs py-1.5 px-3 whitespace-nowrap shrink-0">Acessar →</Link>
                    ) : (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-1.5 px-3 whitespace-nowrap shrink-0">
                        <ExternalLink className="w-3 h-3" />Acessar
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>

      <FAQSection items={faqItems} />
    </>
  );
}
