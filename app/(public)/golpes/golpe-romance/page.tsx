import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe do Amor (Romance Scam): O Que Fazer? | Central de Defesa Digital',
  description: 'Foi vítima de romance scam? Saiba como documentar, denunciar e proteger sua identidade após golpe afetivo digital.',
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-romance' },
};

const faqItems = [
  { question: 'O que é romance scam (golpe do amor)?', answer: 'Romance scam é um golpe onde criminosos criam perfis falsos em apps de namoro ou redes sociais para criar um relacionamento virtual com a vítima. Após ganhar confiança, pedem dinheiro com histórias de emergência, investimentos ou passagem de avião para "se encontrarem".' },
  { question: 'É possível recuperar dinheiro enviado em romance scam?', answer: 'É difícil mas não impossível. Se o dinheiro foi via Pix, o MED pode funcionar nos primeiros 72h. Se foi via transferência bancária, a contestação junto ao banco é possível. Para valores grandes, ação judicial com bloqueio de ativos é viável com advogado parceiro.' },
  { question: 'Como denunciar o perfil falso nas redes sociais?', answer: 'No Instagram/Facebook: clique nos 3 pontinhos do perfil > Denunciar. No Tinder/Bumble: há opção de denúncia dentro do chat. Registre prints de TUDO antes de denunciar, pois o perfil pode ser deletado.' },
];

export default function GolpeRomancePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Romance' }]} />
      <HowToSchema
        name="Golpe do Amor (Romance Scam): O que fazer após ser vítima"
        description="Passo a passo para documentar, denunciar e proteger sua identidade após golpe afetivo digital."
        totalTime="PT24H"
        steps={[
          { name: 'Pare todo contato imediatamente', text: 'Bloqueie e denuncie o perfil. Não responda mais nenhuma mensagem, mesmo que pareça urgente.' },
          { name: 'Salve TODAS as evidências', text: 'Prints de conversas, transferências, perfil, fotos recebidas. Não delete nada — é prova judicial.' },
          { name: 'Acione o MED se foi via Pix', text: 'Se a transferência foi recente (menos de 72h), acione o MED pelo seu banco imediatamente.', url: '/ferramentas/gerador-contestacao-med' },
          { name: 'Registre o BO com detalhes', text: 'Inclua todos os dados do golpista: nome usado, perfis, número de conta, valores e datas.', url: '/ferramentas/gerador-bo' },
          { name: 'Denuncie nas plataformas', text: 'Reporte o perfil no Instagram, Facebook, Tinder, WhatsApp. Isso ajuda a proteger outras vítimas.' },
        ]}
      />
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/golpes" className="hover:text-white">Golpes</Link><span>/</span>
            <span className="text-white">Golpe do Amor</span>
          </div>
          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Golpe do Amor:<br />
            <span className="gradient-text">Romance Scam no Brasil</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Relacionamento virtual que resultou em perda de dinheiro. Você não está sozinho.
            Veja como documentar, denunciar e se proteger.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/gerador-bo" className="btn-primary"><FileText className="w-5 h-5" />Gerar BO</Link>
            <Link href="/parceiros" className="btn-secondary"><CheckCircle className="w-5 h-5" />Consultar advogado</Link>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container max-w-4xl space-y-10">
          <div className="alert-info">
            <Heart className="w-5 h-5 shrink-0" />
            <div>
              <strong className="block">Você não tem culpa.</strong>
              <p className="text-sm mt-1">Romance scammers são criminosos profissionais que manipulam emoções conscientemente. Não se culpe. Foque em proteger suas finanças e identidade.</p>
            </div>
          </div>

          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-6">O que fazer agora</h2>
            <div className="space-y-3">
              {[
                { step: 1, titulo: 'Pare todo contato imediatamente', desc: 'Bloqueie e denuncie o perfil. Não responda mais nenhuma mensagem, mesmo que pareça urgente.', urgencia: 'AGORA' },
                { step: 2, titulo: 'Salve TODAS as evidências', desc: 'Prints de conversas, transfers, perfil, fotos recebidas. Não delete nada — é prova judicial.', urgencia: 'AGORA' },
                { step: 3, titulo: 'Acione o MED se foi via Pix', desc: 'Se a transferência foi recente (< 72h), acione o MED pelo seu banco imediatamente.', urgencia: 'URGENTE' },
                { step: 4, titulo: 'Registre o BO com detalhes', desc: 'Inclua todos os dados do golpista: nome usado, perfis, número de conta, valores e datas.', urgencia: '4H' },
                { step: 5, titulo: 'Denuncie nas plataformas', desc: 'Reporte o perfil no Instagram, Facebook, Tinder, WhatsApp. Isso ajuda a proteger outras vítimas.', urgencia: '24H' },
              ].map((item) => {
                const isUrgent = ['AGORA', 'URGENTE'].includes(item.urgencia);
                return (
                <div key={item.step} className={`border rounded-xl p-4 transition-all duration-200 ${isUrgent ? 'border-red-500/25 bg-red-500/[0.04] hover:border-red-500/45' : 'border-white/[0.08] hover:border-white/[0.16]'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0 ${isUrgent ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_14px_rgba(239,68,68,0.35)]' : 'bg-gradient-to-br from-violet-500 to-violet-700 shadow-[0_0_14px_rgba(139,92,246,0.3)]'}`}>{item.step}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-white text-sm">{item.titulo}</h3>
                        <span className={`badge text-xs ${isUrgent ? 'badge-red' : 'badge-yellow'}`}>{item.urgencia}</span>
                      </div>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </section>
        </div>
      </article>

      <FAQSection items={faqItems} />
    </>
  );
}
