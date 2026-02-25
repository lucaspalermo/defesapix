import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Shield, AlertTriangle, CheckCircle, ExternalLink, Video, FileText } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Educação Digital — Como se Proteger de Golpes Online',
  description:
    'Guias completos, vídeos e recursos educativos para se proteger de golpes digitais. Aprenda a identificar fraudes antes de ser vítima.',
  alternates: { canonical: 'https://defesapix.com.br/educacao' },
};

const ALERTAS_GOLPE = [
  'Urgência extrema (\"você tem 1 hora ou sua conta será bloqueada\")',
  'Pede transferência para \"conta segura\" do banco',
  'Link enviado por SMS ou WhatsApp com endereço estranho',
  'Oferta de emprego com salário muito acima do mercado',
  'Rendimento garantido ou muito acima da SELIC',
  'Pedido de senha, código SMS ou token bancário',
  'QR Code em papel físico fora de contexto seguro',
  'Perfil de relacionamento que rapidamente pede dinheiro',
];

const PROTECOES = [
  { icon: Shield, titulo: 'Ative o limite Pix diário', desc: 'Defina um limite baixo para Pix no período noturno (00h-6h). Isso limita danos em caso de golpe.' },
  { icon: Shield, titulo: 'Use apenas o app oficial do banco', desc: 'Baixe apenas da App Store ou Google Play. Verifique o nome do desenvolvedor.' },
  { icon: Shield, titulo: 'Nunca transfira por pedido telefônico', desc: 'Bancos nunca pedem para você fazer transferências para proteger sua conta.' },
  { icon: Shield, titulo: 'Ative autenticação em dois fatores', desc: 'Configure 2FA em todos os apps bancários e financeiros que você usa.' },
  { icon: Shield, titulo: 'Verifique o domínio dos sites', desc: 'Sites bancários legítimos têm https e o domínio exato do banco (ex: bradesco.com.br).' },
  { icon: Shield, titulo: 'Não clique em links de SMS', desc: 'Banks do not send login links via SMS. Access your bank directly through the official app.' },
];

const RECURSOS_EXTERNOS = [
  { titulo: 'Banco Central — Guia de Segurança Pix', href: 'https://www.bcb.gov.br/estabilidadefinanceira/pix', desc: 'Informações oficiais do BACEN' },
  { titulo: 'Febraban — Cartilha Anti-Fraude', href: 'https://portal.febraban.org.br', desc: 'Federação Brasileira de Bancos' },
  { titulo: 'Safernet — Crimes Cibernéticos', href: 'https://new.safernet.org.br', desc: 'ONG de proteção digital' },
  { titulo: 'ANATEL — Chip Clonado', href: 'https://www.gov.br/anatel', desc: 'Denuncie clonagem de número' },
  { titulo: 'Gov.br — Delegacia Digital', href: 'https://delegaciavirtual.sinesp.gov.br', desc: 'BO online para vários estados' },
];

export default function EducacaoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Educação' }]} />
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-5xl text-center">
          <span className="badge-green mb-4">Educação Digital</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Aprenda a se proteger<br />
            <span className="gradient-text">antes de ser vítima</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Conhecimento é a melhor defesa. Aprenda a identificar golpes, proteger seus dados
            e o que fazer se algo acontecer.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl space-y-16">
          {/* Red flags */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">🚩 Sinais de alerta — nunca ignore</h2>
            <p className="text-white/60 mb-6">Se você identificar qualquer um desses sinais, pare imediatamente e confirme pelo canal oficial.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALERTAS_GOLPE.map((alerta) => (
                <div key={alerta} className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-white/80">{alerta}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Protections */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">🛡️ Como se proteger</h2>
            <p className="text-white/60 mb-6">Ações simples que reduzem drasticamente o risco de ser vítima.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROTECOES.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.titulo} className="card hover:border-green-500/30 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-green-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2 text-sm">{p.titulo}</h3>
                    <p className="text-xs text-white/60 leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action plan if victim */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">⚡ Se você já foi vítima</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: '1', emoji: '📵', titulo: 'Bloqueie tudo', desc: 'Cartões, app do banco e acesso online imediatamente.' },
                { step: '2', emoji: '📞', titulo: 'Ligue para o banco', desc: 'SAC do banco — solicite MED se for golpe Pix.' },
                { step: '3', emoji: '🚓', titulo: 'Registre o BO', desc: 'Online ou presencialmente — é documento essencial.' },
                { step: '4', emoji: '📄', titulo: 'Gere os documentos', desc: 'Use nossas ferramentas para gerar todos os documentos necessários.' },
              ].map((item) => (
                <div key={item.step} className="card text-center">
                  <span className="text-3xl mb-3 block">{item.emoji}</span>
                  <span className="badge-green text-xs mb-2">Passo {item.step}</span>
                  <h3 className="font-bold text-white mb-2 text-sm">{item.titulo}</h3>
                  <p className="text-xs text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/ferramentas" className="btn-primary">
                <FileText className="w-4 h-4" />
                Ir para ferramentas de defesa
              </Link>
            </div>
          </div>

          {/* External resources */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">📚 Recursos oficiais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECURSOS_EXTERNOS.map((res) => (
                <a
                  key={res.href}
                  href={res.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card hover:border-green-500/30 transition-all group flex items-start gap-3"
                >
                  <ExternalLink className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white text-sm group-hover:text-green-400 transition-colors">{res.titulo}</h3>
                    <p className="text-xs text-white/40 mt-0.5">{res.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
