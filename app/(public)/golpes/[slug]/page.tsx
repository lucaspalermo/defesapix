import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle, CheckCircle, FileText, Lock,
} from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600;

// Map of static slugs that have their own dedicated page files
const STATIC_GOLPE_SLUGS = [
  'golpe-pix', 'golpe-whatsapp', 'golpe-boleto', 'golpe-romance',
  'golpe-emprego', 'golpe-investimento', 'golpe-clone-app',
  'golpe-falso-advogado', 'roubo-celular', 'golpe-cartao',
  'golpe-phishing', 'golpe-consignado',
  'golpe-delivery', 'golpe-sextorsao', 'golpe-falso-suporte',
  'golpe-maquininha', 'golpe-pix-errado', 'golpe-falso-sequestro',
];


async function getGuia(slug: string) {
  if (STATIC_GOLPE_SLUGS.includes(slug)) return null; // Let static page handle it
  const guia = await prisma.guiaGolpe.findUnique({ where: { slug } }).catch(() => null);
  if (!guia || !guia.publicado) return null;
  return guia;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guia = await getGuia(slug);
  if (!guia) return {};

  return {
    title: guia.seoTitle || guia.titulo,
    description: guia.seoDesc || guia.descricao,
    keywords: guia.tags,
    alternates: { canonical: `https://defesapix.com.br/golpes/${slug}` },
    openGraph: {
      title: guia.titulo,
      description: guia.descricao,
      type: 'article',
    },
  };
}

export default async function GolpeDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guia = await getGuia(slug);
  if (!guia) notFound();

  let faqItems: { question: string; answer: string }[] = [];
  try { faqItems = JSON.parse(guia.faq); } catch { /* empty */ }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const urgBanner = guia.urgencia === 'CRITICA'
    ? { bg: 'bg-red-600/20', border: 'border-red-500/30', text: 'Urgência Crítica' }
    : guia.urgencia === 'ALTA'
    ? { bg: 'bg-amber-600/20', border: 'border-amber-500/30', text: 'Urgência Alta' }
    : { bg: 'bg-blue-600/20', border: 'border-blue-500/30', text: 'Atenção' };

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: guia.titulo }]} />
      <HowToSchema
        name={`${guia.titulo}: o que fazer`}
        description={guia.descricao}
        totalTime="PT2H"
        steps={[
          { name: 'Identifique o golpe', text: 'Confirme que voce foi vitima e reuna todas as evidencias disponiveis.' },
          { name: 'Acesse o Kit Completo DefesaPix', text: 'Em defesapix.com.br, preencha seus dados e receba o plano de acao completo com 5 documentos juridicos por R$47.', url: '/ferramentas/pacote-completo' },
        ]}
      />
      {faqItems.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* Hero */}
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/golpes" className="hover:text-white transition-colors">Tipos de Golpe</Link>
            <span>/</span>
            <span className="text-white">{guia.titulo}</span>
          </div>

          <div className={`alert-danger mb-8`}>
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>{urgBanner.text}:</strong> {guia.subtitulo || 'Leia o guia completo e aja rapidamente.'}
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-[-0.02em] text-white mb-4">
            {guia.titulo}
          </h1>

          {guia.subtitulo && (
            <p className="text-xl text-white/70 mb-8 leading-relaxed">{guia.subtitulo}</p>
          )}

          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/pacote-completo" className="btn-primary">
              <FileText className="w-5 h-5" />
              Kit Completo — R$47
            </Link>
            <Link href="/ferramentas/diagnostico" className="btn-secondary">
              <CheckCircle className="w-5 h-5" />
              Diagnóstico grátis
            </Link>
          </div>
        </div>
      </section>

      {/* Solution Paywall */}
      <article className="section">
        <div className="container max-w-4xl">
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
        </div>
      </article>

      {/* Full content (Markdown) */}
      <section className="section bg-[#0D0D15]">
        <div className="container max-w-4xl">
          <div className="prose prose-invert max-w-none">
            {guia.conteudo.split('\n').map((line, i) => {
              if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.slice(4)}</h3>;
              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.slice(3)}</h2>;
              if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-green-500 pl-4 py-2 my-4 text-white/70 italic">{line.slice(2)}</blockquote>;
              if (line.startsWith('- ')) return <li key={i} className="text-white/70 ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
              if (/^\d+\.\s/.test(line))
                return <li key={i} className="text-white/70 ml-4 mb-1 list-decimal" dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
              if (line.trim() === '') return <div key={i} className="mb-4" />;
              return <p key={i} className="text-white/70 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && <FAQSection items={faqItems} />}

      {/* Related */}
      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-6">Conteúdo relacionado</h2>
          <div className="flex flex-wrap gap-3">
            {guia.artigoSlug && (
              <Link href={`/blog/${guia.artigoSlug}`} className="text-sm text-green-400 hover:text-green-300 transition-colors">
                Artigo completo no blog
              </Link>
            )}
            <Link href="/golpes/golpe-pix" className="text-sm text-green-400 hover:text-green-300 transition-colors">Golpe Pix</Link>
            <Link href="/golpes/golpe-whatsapp" className="text-sm text-green-400 hover:text-green-300 transition-colors">Golpe WhatsApp</Link>
            <Link href="/ferramentas/diagnostico" className="text-sm text-green-400 hover:text-green-300 transition-colors">Diagnóstico grátis</Link>
            <Link href="/ferramentas/pacote-completo" className="text-sm text-ember-400 hover:text-ember-300 transition-colors">Kit Completo — R$47</Link>
            <Link href="/calculadora-med" className="text-sm text-green-400 hover:text-green-300 transition-colors">Calculadora MED</Link>
            <Link href="/golpes" className="text-sm text-white/50 hover:text-white transition-colors">Todos os golpes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
