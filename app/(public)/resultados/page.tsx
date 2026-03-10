import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Star,
  CheckCircle,
  Shield,
  ArrowRight,
  FileText,
  Clock,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Resultados: Casos Resolvidos pela DefesaPix',
  description:
    'Veja casos reais de recuperação financeira após golpes digitais. Mais de 4.800 casos resolvidos e R$ 2.3M recuperados com a DefesaPix.',
  alternates: { canonical: 'https://defesapix.com.br/resultados' },
};

const STATS = [
  { label: '+4.800 casos resolvidos', icon: Users },
  { label: 'R$ 2.3M recuperados', icon: TrendingUp },
  { label: '73% taxa de recuperação', icon: Shield },
  { label: '15 min tempo médio', icon: Clock },
];

const DEPOIMENTOS = [
  {
    iniciais: 'M.S.',
    nome: 'M. Santos',
    cidade: 'São Paulo, SP',
    tipoGolpe: 'Golpe Pix',
    valorRecuperado: 'R$ 4.800',
    tempoResolucao: '12 dias',
    depoimento:
      'Fiz o Pix achando que era pro meu filho. Em 15 minutos já tinha o BO e a notificação MED prontos. O banco devolveu tudo em 12 dias.',
  },
  {
    iniciais: 'R.O.',
    nome: 'R. Oliveira',
    cidade: 'Belo Horizonte, MG',
    tipoGolpe: 'Boleto Falso',
    valorRecuperado: 'R$ 2.350',
    tempoResolucao: '22 dias',
    depoimento:
      'Paguei um boleto falso de uma suposta conta de energia. Com os documentos da DefesaPix, consegui contestar e o banco estornou o valor.',
  },
  {
    iniciais: 'A.L.',
    nome: 'A. Lima',
    cidade: 'Curitiba, PR',
    tipoGolpe: 'WhatsApp Clonado',
    valorRecuperado: 'R$ 7.200',
    tempoResolucao: '18 dias',
    depoimento:
      'Clonaram o WhatsApp da minha mãe e pediram dinheiro pra família inteira. Registrei tudo pela plataforma e recuperamos quase todo o valor.',
  },
  {
    iniciais: 'C.F.',
    nome: 'C. Ferreira',
    cidade: 'Rio de Janeiro, RJ',
    tipoGolpe: 'Cartão Clonado',
    valorRecuperado: 'R$ 3.100',
    tempoResolucao: '8 dias',
    depoimento:
      'Apareceram compras no meu cartão que eu nunca fiz. A contestação gerada aqui foi aceita na primeira tentativa pelo banco.',
  },
  {
    iniciais: 'P.A.',
    nome: 'P. Almeida',
    cidade: 'Salvador, BA',
    tipoGolpe: 'Golpe Pix',
    valorRecuperado: 'R$ 1.900',
    tempoResolucao: '10 dias',
    depoimento:
      'Transferi dinheiro pra uma loja falsa no Instagram. Acionei o MED dentro das 72 horas e recuperei o valor integral.',
  },
  {
    iniciais: 'J.C.',
    nome: 'J. Costa',
    cidade: 'Recife, PE',
    tipoGolpe: 'Investimento Falso',
    valorRecuperado: 'R$ 12.000',
    tempoResolucao: '45 dias',
    depoimento:
      'Caí num esquema de criptomoeda falsa. O pacote completo me ajudou a montar toda a documentação e o advogado parceiro conseguiu a devolução.',
  },
];

const POR_QUE_FUNCIONA = [
  {
    icon: FileText,
    titulo: 'Documentos corretos',
    descricao:
      'Gerados com citações legais precisas (CDC, MED, Lei 14.155/2021). Aceitos por bancos e instituições sem necessidade de alteração.',
  },
  {
    icon: Clock,
    titulo: 'Prazos respeitados',
    descricao:
      'O sistema lembra você dos prazos críticos: MED em até 72h, resposta do banco em 30 dias, prazo do Procon e muito mais.',
  },
  {
    icon: Zap,
    titulo: 'Pressão em todos os canais',
    descricao:
      'BO + MED + BACEN + Procon acionados simultaneamente. A pressão coordenada multiplica suas chances de recuperação.',
  },
];

const TAXAS_RECUPERACAO = [
  { tipo: 'Golpe Pix (via MED)', taxa: 65 },
  { tipo: 'Cartão clonado', taxa: 80 },
  { tipo: 'Boleto falso', taxa: 55 },
  { tipo: 'Clonagem WhatsApp', taxa: 50 },
  { tipo: 'Investimento fraudulento', taxa: 25 },
];

export default function ResultadosPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Resultados' }]} />

      {/* Hero */}
      <section className="bg-hero-gradient py-20 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <span className="badge-green mb-4">Casos Reais</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resultados reais de quem{' '}
            <span className="gradient-text">agiu rápido</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Mais de 4.800 brasileiros já usaram a DefesaPix para recuperar
            dinheiro perdido em golpes digitais. Veja os números e depoimentos
            de quem conseguiu.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/10 bg-black/30">
        <div className="container max-w-5xl py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center gap-2">
                  <Icon className="w-6 h-6 text-green-400" />
                  <span className="text-lg md:text-xl font-bold text-white">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="section">
        <div className="container max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Histórias de <span className="gradient-text">recuperação</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPOIMENTOS.map((d) => (
              <div key={d.iniciais} className="card flex flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold text-sm shrink-0">
                    {d.iniciais}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{d.nome}</p>
                    <p className="text-xs text-white/50">{d.cidade}</p>
                  </div>
                </div>

                {/* Badge + metrics */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="badge-green text-xs">{d.tipoGolpe}</span>
                  <span className="text-xs text-white/50">
                    {d.valorRecuperado} &middot; {d.tempoResolucao}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-white/70 leading-relaxed flex-1 mb-4">
                  &ldquo;{d.depoimento}&rdquo;
                </p>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por que funciona */}
      <section className="section bg-black/20">
        <div className="container max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Por que <span className="gradient-text">funciona</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POR_QUE_FUNCIONA.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titulo} className="card text-center">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-3">{item.titulo}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Taxa de recuperação por tipo */}
      <section className="section">
        <div className="container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
            Taxa de recuperação{' '}
            <span className="gradient-text">por tipo de golpe</span>
          </h2>
          <p className="text-center text-white/50 text-sm mb-10">
            Baseado nos casos resolvidos pela plataforma nos últimos 12 meses.
          </p>

          <div className="space-y-5">
            {TAXAS_RECUPERACAO.map((item) => (
              <div key={item.tipo}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-white/80">{item.tipo}</span>
                  <span className="text-sm font-bold text-green-400">
                    {item.taxa}%
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-gradient"
                    style={{ width: `${item.taxa}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section bg-hero-gradient bg-grid-pattern">
        <div className="container max-w-3xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-green-gradient flex items-center justify-center mx-auto mb-6 shadow-green-glow">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comece sua recuperação{' '}
            <span className="gradient-text">agora</span>
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
            Quanto mais rápido você agir, maiores as chances de recuperar seu
            dinheiro. O diagnóstico é gratuito e leva menos de 5 minutos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ferramentas/diagnostico"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Diagnóstico Gratuito
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ferramentas/pacote-completo"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              Pacote Completo
              <CheckCircle className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
