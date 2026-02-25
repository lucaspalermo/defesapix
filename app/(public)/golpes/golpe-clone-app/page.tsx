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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Clone de App' }]} />
      <HowToSchema
        name="App ou Site Falso de Banco: O que fazer para proteger sua conta"
        description="Passo a passo de emergência para proteger sua conta bancária após acessar app ou site falso de banco."
        totalTime="PT24H"
        steps={[
          { name: 'Bloqueie todos os cartões', text: 'Ligue para o banco ou use o app oficial (se não comprometido) e bloqueie todos os cartões imediatamente.' },
          { name: 'Troque todas as senhas', text: 'Senha do app, senha do internet banking, senha do cartão. Faça isso de outro dispositivo se possível.' },
          { name: 'Acione o MED se houver Pix perdido', text: 'Se houve transferência Pix fraudulenta, acione o MED pelo SAC do banco imediatamente.', url: '/ferramentas/gerador-contestacao-med' },
          { name: 'Registre o Boletim de Ocorrência', text: 'Documente o acidente com detalhes: URL do site falso, prints, valor perdido.', url: '/ferramentas/gerador-bo' },
          { name: 'Denuncie à empresa responsável', text: 'Reporte o app falso à App Store/Google Play e o site à SaferNet Brasil.' },
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
            <Link href="/ferramentas/gerador-contestacao-med" className="btn-primary"><FileText className="w-5 h-5" />Gerar MED urgente</Link>
            <Link href="/ferramentas/gerador-bo" className="btn-secondary"><CheckCircle className="w-5 h-5" />Gerar BO</Link>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container max-w-4xl space-y-10">
          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-6">Ações imediatas — faça agora</h2>
            <div className="space-y-3">
              {[
                { step: 1, titulo: 'Bloqueie todos os cartões', desc: 'Ligue para o banco ou use o app oficial (se não comprometido) e bloqueie todos os cartões imediatamente.', urgencia: 'AGORA' },
                { step: 2, titulo: 'Troque todas as senhas', desc: 'Senha do app, senha do internet banking, senha do cartão. Faça isso de outro dispositivo se possível.', urgencia: 'AGORA' },
                { step: 3, titulo: 'Acione o MED se houver Pix perdido', desc: 'Se houve transferência Pix fraudulenta, acione o MED pelo SAC do banco imediatamente.', urgencia: 'URGENTE' },
                { step: 4, titulo: 'Registre o Boletim de Ocorrência', desc: 'Documente o acidente com detalhes: URL do site falso, prints, valor perdido.', urgencia: '4H' },
                { step: 5, titulo: 'Denuncie à empresa responsável', desc: 'Reporte o app falso à App Store/Google Play e o site à SaferNet Brasil.', urgencia: '24H' },
              ].map((item) => {
                const isCritical = item.urgencia === 'AGORA';
                const isUrgent   = item.urgencia === 'URGENTE';
                return (
                <div key={item.step} className={`border rounded-xl p-4 transition-all duration-200 ${isCritical ? 'border-red-500/30 bg-red-500/5 hover:border-red-500/50' : isUrgent ? 'border-ember-500/25 bg-ember-500/[0.04] hover:border-ember-500/45' : 'border-white/[0.08] hover:border-white/[0.16]'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0 ${isCritical ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_14px_rgba(239,68,68,0.35)]' : isUrgent ? 'bg-gradient-to-br from-ember-500 to-ember-700 shadow-[0_0_14px_rgba(249,115,22,0.3)]' : 'bg-gradient-to-br from-white/20 to-white/10 text-white/60'}`}>{item.step}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-white text-sm">{item.titulo}</h3>
                        <span className={`badge text-xs ${item.urgencia === 'AGORA' ? 'badge-red' : 'badge-yellow'}`}>{item.urgencia}</span>
                      </div>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </section>

          <div className="card border-green-500/30 bg-green-500/5 text-center">
            <Lock className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="font-heading font-bold text-white text-xl mb-3">Proteja-se agora</h3>
            <p className="text-white/70 mb-6">Gere o MED e o BO para os documentos mais críticos do seu caso.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/gerador-contestacao-med" className="btn-primary text-sm">Gerar MED</Link>
              <Link href="/ferramentas/gerador-bo" className="btn-secondary text-sm">Gerar BO</Link>
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
