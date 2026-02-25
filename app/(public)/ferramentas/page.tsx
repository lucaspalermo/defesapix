import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp, FileText, Shield, CheckSquare, Bell, ArrowRight, Lock, Zap, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ferramentas Jurídicas para Vítimas de Golpe Digital | Central de Defesa Digital',
  description:
    'Simulador de recuperação, contestação MED, Boletim de Ocorrência, notificação bancária e checklist personalizado. Comece grátis, PDF em minutos.',
  alternates: { canonical: 'https://centraldefesadigital.com.br/ferramentas' },
};

const TOOLS = [
  {
    icon: Zap,
    titulo: 'Pacote Emergência — 3 Documentos PDF',
    desc: 'MED + BO + Notificação Bancária num único formulário. Preencha uma vez, baixe 3 PDFs prontos para usar. Para quem precisa agir agora.',
    href: '/ferramentas/pacote-completo',
    tag: 'R$47 — Mais popular',
    tagColor: 'badge-yellow',
    destaque: true,
    sub: 'Melhor custo-benefício',
  },
  {
    icon: TrendingUp,
    titulo: 'Simulador de Recuperação',
    desc: 'Descubra a probabilidade de recuperar seu dinheiro com base no tipo de golpe, valor perdido e tempo decorrido.',
    href: '/ferramentas/simulador-recuperacao',
    tag: 'Gratuito',
    tagColor: 'badge-green',
    destaque: false,
    sub: null,
  },
  {
    icon: FileText,
    titulo: 'Contestação MED (Pix)',
    desc: 'Documento oficial para acionar o Mecanismo Especial de Devolução do Banco Central. Inclui countdown do prazo de 72h.',
    href: '/ferramentas/gerador-contestacao-med',
    tag: 'PDF R$29',
    tagColor: 'badge-yellow',
    destaque: false,
    sub: 'Preview grátis · PDF pago',
  },
  {
    icon: Shield,
    titulo: 'Boletim de Ocorrência (BO)',
    desc: 'Modelo completo do BO digital para crimes de estelionato, roubo de celular e golpes via Pix. Necessário para acionar o banco.',
    href: '/ferramentas/gerador-bo',
    tag: 'PDF R$19',
    tagColor: 'badge-yellow',
    destaque: false,
    sub: 'Preview grátis · PDF pago',
  },
  {
    icon: Bell,
    titulo: 'Notificação Formal ao Banco',
    desc: 'Notificação extrajudicial que cria responsabilidade legal formal e protocolo. O banco tem 30 dias para responder.',
    href: '/ferramentas/notificacao-banco',
    tag: 'PDF R$29',
    tagColor: 'badge-yellow',
    destaque: false,
    sub: 'Preview grátis · PDF pago',
  },
  {
    icon: CheckSquare,
    titulo: 'Checklist de Ação Personalizado',
    desc: 'Lista interativa com todos os passos em ordem de prioridade e prazos legais, gerada para o seu tipo de golpe específico.',
    href: '/ferramentas/checklist',
    tag: 'Gratuito',
    tagColor: 'badge-green',
    destaque: false,
    sub: null,
  },
];

export default function FerramentasPage() {
  return (
    <>
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <span className="badge-green mb-4">Ferramentas Jurídicas</span>
          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] text-white mb-4">
            Ferramentas para se defender<br />
            <span className="gradient-text">de golpes digitais</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Documentos jurídicos criados por especialistas em direito digital.
            Preview grátis — PDF pago. Sem burocracia.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 gap-4">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              const isPaid = tool.tag.startsWith('PDF') || tool.tag.startsWith('R$4');
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`card group hover:-translate-y-0.5 transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center gap-5 ${
                    tool.destaque
                      ? 'border-ember-500/40 bg-ember-500/5 hover:border-ember-500/60'
                      : 'hover:border-white/20'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                    tool.destaque ? 'bg-gradient-to-br from-ember-500 to-ember-700 shadow-ember-glow' : 'bg-white/[0.06] border border-white/[0.08]'
                  }`}>
                    <Icon className={`w-7 h-7 ${tool.destaque ? 'text-white' : 'text-white/50 group-hover:text-ember-400 transition-colors'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                      <h2 className={`font-bold text-lg transition-colors ${tool.destaque ? 'text-white group-hover:text-ember-300' : 'text-white group-hover:text-ember-400'}`}>
                        {tool.titulo}
                      </h2>
                      <span className={`badge ${tool.tagColor}`}>{tool.tag}</span>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{tool.desc}</p>
                    {tool.sub && (
                      <p className={`text-xs mt-1.5 font-medium ${isPaid ? 'text-amber-500/70' : 'text-green-500/70'}`}>
                        {tool.sub}
                      </p>
                    )}
                  </div>
                  <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-all shrink-0 hidden sm:block ${tool.destaque ? 'text-ember-400/50 group-hover:text-ember-400' : 'text-white/20 group-hover:text-white/50'}`} />
                </Link>
              );
            })}
          </div>

          {/* Pricing reminder */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            {[
              { label: 'Preview do documento', valor: 'Grátis', cor: 'text-green-400' },
              { label: 'Download em PDF', valor: 'R$19 – R$29', cor: 'text-amber-400' },
              { label: '3 documentos completos', valor: 'R$47', cor: 'text-ember-400' },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <p className={`font-black text-base ${item.cor}`}>{item.valor}</p>
                <p className="text-xs text-white/35 mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Security notice */}
          <div className="mt-8 alert-info">
            <Lock className="w-5 h-5 shrink-0" />
            <div>
              <strong className="block text-sm">Seus dados estão protegidos</strong>
              <p className="text-sm text-white/60 mt-1">
                Os documentos são gerados localmente no seu navegador. Nenhum dado sensível é
                armazenado sem sua autorização explícita. Conformidade total com a LGPD.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
