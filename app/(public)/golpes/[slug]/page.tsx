import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  AlertTriangle, Clock, CheckCircle, FileText, ArrowRight,
  Shield, Phone, ExternalLink, Zap, Smartphone, Heart,
  Briefcase, BarChart3, Globe, PhoneOff, Scale, CreditCard, Mail,
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
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  Shield, Phone, FileText, AlertTriangle, Zap, Smartphone, Heart,
  Briefcase, BarChart3, Globe, PhoneOff, Scale, CreditCard, Mail, ExternalLink,
};

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

  let passos: { step: string; urgencia: string; titulo: string; desc: string }[] = [];
  try { passos = JSON.parse(guia.passos); } catch { /* empty */ }

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
      {passos.length > 0 && (
        <HowToSchema
          name={`${guia.titulo}: o que fazer`}
          description={guia.descricao}
          totalTime="PT2H"
          steps={passos.map((p) => ({ name: p.titulo, text: p.desc }))}
        />
      )}
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

      {/* Steps */}
      {passos.length > 0 && (
        <article className="section">
          <div className="container max-w-4xl">
            <h2 className="font-heading font-bold text-2xl text-white mb-6">O que fazer agora — passo a passo</h2>
            <div className="space-y-4">
              {passos.map((passo, idx) => {
                const cor = idx === 0 ? 'red' : idx < 3 ? 'orange' : 'blue';
                const borderCls = cor === 'red' ? 'border-red-500/30 bg-red-500/5' : cor === 'orange' ? 'border-ember-500/30 bg-ember-500/5' : 'border-blue-500/30 bg-blue-500/5';
                const badgeCls = cor === 'red' ? 'badge-red' : cor === 'orange' ? 'badge-yellow' : 'badge-blue';
                return (
                  <div key={idx} className={`border rounded-2xl p-5 ${borderCls}`}>
                    <div className="flex items-start gap-4">
                      <div className="step-badge shrink-0" style={{ marginBottom: 0 }}>
                        <span className="font-heading font-black text-white text-sm relative z-10">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`badge text-xs ${badgeCls}`}>{passo.urgencia}</span>
                          <h3 className="font-bold text-white text-sm">{passo.titulo}</h3>
                        </div>
                        <p className="text-sm text-white/70">{passo.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA after steps */}
            <div className="mt-8 card border-green-500/30 bg-green-500/5 text-center">
              <h3 className="font-bold text-white text-xl mb-3">Precisa dos documentos?</h3>
              <p className="text-white/70 mb-6">
                Gere Contestação MED, Boletim de Ocorrência e Notificação Bancária em 15 minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/ferramentas/pacote-completo" className="btn-primary">
                  <FileText className="w-4 h-4" />
                  Kit Completo — R$47
                </Link>
                <Link href="/ferramentas/diagnostico" className="btn-secondary">
                  Diagnóstico grátis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </article>
      )}

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
