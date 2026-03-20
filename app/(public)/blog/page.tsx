import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight, Tag, Sparkles } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Blog — Segurança Digital e Recuperação de Golpes',
  description:
    'Artigos, guias e dicas sobre como se proteger de golpes digitais, o que fazer após ser vítima e como recuperar dinheiro. Conteúdo gratuito e atualizado semanalmente.',
  alternates: { canonical: 'https://defesapix.com.br/blog' },
};

export const revalidate = 3600; // Revalidate every 1 hour

const ARTIGOS = [
  {
    slug: 'med-mecanismo-especial-devolucao-pix',
    titulo: 'MED: O que é o Mecanismo Especial de Devolução do Pix e como acionar?',
    resumo: 'Tudo sobre a Resolução BCB 93/2021 que criou o MED. Saiba como funciona, quais são os prazos e como aumentar suas chances de recuperação.',
    categoria: 'Pix & MED',
    tags: ['MED', 'Pix', 'BACEN'],
    tempoLeitura: 8,
    publishedAt: '2025-01-15',
    destaque: true,
  },
  {
    slug: 'golpe-whatsapp-como-identificar-se-proteger',
    titulo: 'Golpe do WhatsApp: Como identificar, se proteger e denunciar',
    resumo: 'Os 7 tipos mais comuns de golpe via WhatsApp e o passo a passo para denunciar à Polícia, Meta e às autoridades competentes.',
    categoria: 'Golpes',
    tags: ['WhatsApp', 'Clonagem', 'BO'],
    tempoLeitura: 6,
    publishedAt: '2025-01-20',
    destaque: false,
  },
  {
    slug: 'banco-responsavel-golpe-digital-stj',
    titulo: 'O banco é responsável pelos golpes digitais? O que diz o STJ',
    resumo: 'Análise da jurisprudência do STJ sobre responsabilidade dos bancos em casos de fraude digital. Quando você pode processar o banco?',
    categoria: 'Direito Digital',
    tags: ['STJ', 'Banco', 'Responsabilidade'],
    tempoLeitura: 12,
    publishedAt: '2025-02-01',
    destaque: true,
  },
  {
    slug: 'golpe-investimento-criptomoeda-brasil',
    titulo: 'Golpe de Investimento e Criptomoedas: Como denunciar e recuperar valores',
    resumo: 'O que fazer quando você perdeu dinheiro em investimentos falsos ou criptomoedas fraudulentas. CVM, Polícia Federal e o que esperar.',
    categoria: 'Investimentos',
    tags: ['Criptomoeda', 'CVM', 'Pirâmide'],
    tempoLeitura: 10,
    publishedAt: '2025-02-05',
    destaque: false,
  },
  {
    slug: 'como-registrar-bo-online-golpe-digital',
    titulo: 'Como registrar Boletim de Ocorrência online para golpe digital',
    resumo: 'Guia passo a passo para registrar o BO eletrônico em todos os estados do Brasil. Links, dicas e o que informar corretamente.',
    categoria: 'Tutoriais',
    tags: ['BO', 'Delegacia', 'Tutorial'],
    tempoLeitura: 7,
    publishedAt: '2025-02-10',
    destaque: false,
  },
  {
    slug: 'procon-banco-central-reclamacao-golpe',
    titulo: 'Procon e Banco Central: Como e quando fazer reclamação após golpe',
    resumo: 'Entenda a diferença entre reclamar no Procon e no BACEN, quando cada um é mais eficaz e como fazer o processo de forma correta.',
    categoria: 'Defesa do Consumidor',
    tags: ['Procon', 'BACEN', 'Reclamação'],
    tempoLeitura: 9,
    publishedAt: '2025-02-14',
    destaque: false,
  },
  {
    slug: 'como-proteger-idoso-golpe-digital',
    titulo: 'Como proteger idosos de golpes digitais: guia para filhos e netos',
    resumo: 'Dicas práticas para proteger seus pais e avós de golpes via Pix, WhatsApp e ligações falsas.',
    categoria: 'Prevenção',
    tags: ['Idoso', 'Prevenção', 'Família'],
    tempoLeitura: 7,
    publishedAt: '2025-02-18',
    destaque: true,
  },
  {
    slug: 'golpe-falso-funcionario-banco',
    titulo: 'Golpe do falso funcionário do banco: como funciona e como se defender',
    resumo: 'Entenda como os golpistas se passam por atendentes bancários e como se proteger.',
    categoria: 'Golpes',
    tags: ['Banco', 'Engenharia Social'],
    tempoLeitura: 8,
    publishedAt: '2025-02-20',
    destaque: false,
  },
  {
    slug: 'pix-agendado-golpe-comprovante-falso',
    titulo: 'Pix agendado e comprovante falso: como não cair nesse golpe',
    resumo: 'Golpistas usam Pix agendado e comprovantes editados para simular pagamentos.',
    categoria: 'Pix & MED',
    tags: ['Pix', 'Comprovante', 'Fraude'],
    tempoLeitura: 5,
    publishedAt: '2025-02-22',
    destaque: false,
  },
  {
    slug: 'lei-14155-2021-fraude-digital-penas',
    titulo: 'Lei 14.155/2021: Penas mais duras para fraudes digitais no Brasil',
    resumo: 'Entenda como a Lei 14.155 agravou as penas para golpes digitais.',
    categoria: 'Direito Digital',
    tags: ['Lei 14.155', 'Código Penal'],
    tempoLeitura: 8,
    publishedAt: '2025-02-25',
    destaque: true,
  },
  {
    slug: 'juizado-especial-civel-golpe-digital',
    titulo: 'Juizado Especial Cível: como processar o banco após golpe digital',
    resumo: 'Guia para entrar com ação no JEC. Gratuito até 20 salários mínimos.',
    categoria: 'Direito Digital',
    tags: ['JEC', 'Juizado'],
    tempoLeitura: 10,
    publishedAt: '2025-03-01',
    destaque: false,
  },
  {
    slug: 'golpe-marketplace-olx-mercado-livre',
    titulo: 'Golpe em marketplace: OLX, Mercado Livre e Facebook',
    resumo: 'Os golpes mais comuns em plataformas de compra e venda.',
    categoria: 'Golpes',
    tags: ['OLX', 'Marketplace'],
    tempoLeitura: 7,
    publishedAt: '2025-03-05',
    destaque: false,
  },
  {
    slug: 'como-recuperar-dinheiro-golpe-pix-2025',
    titulo: 'Como recuperar dinheiro de golpe Pix em 2025: guia atualizado',
    resumo: 'Passo a passo atualizado para maximizar recuperação via MED.',
    categoria: 'Pix & MED',
    tags: ['Pix', 'MED', '2025'],
    tempoLeitura: 12,
    publishedAt: '2025-03-08',
    destaque: true,
  },
  {
    slug: 'golpe-qr-code-pix-como-funciona',
    titulo: 'Golpe do QR Code Pix: como funciona e como evitar',
    resumo: 'Como golpistas substituem QR Codes para redirecionar pagamentos.',
    categoria: 'Pix & MED',
    tags: ['QR Code', 'Pix'],
    tempoLeitura: 5,
    publishedAt: '2025-03-10',
    destaque: false,
  },
  {
    slug: 'seguro-celular-vale-a-pena',
    titulo: 'Seguro de celular vale a pena? Análise completa',
    resumo: 'O que os seguros realmente cobrem em caso de roubo ou fraude.',
    categoria: 'Prevenção',
    tags: ['Seguro', 'Celular'],
    tempoLeitura: 8,
    publishedAt: '2025-03-12',
    destaque: false,
  },
  {
    slug: 'direitos-consumidor-banco-digital',
    titulo: 'Seus direitos como cliente de banco digital',
    resumo: 'Bancos digitais têm as mesmas obrigações legais que os tradicionais.',
    categoria: 'Direito Digital',
    tags: ['Banco Digital', 'CDC'],
    tempoLeitura: 9,
    publishedAt: '2025-03-15',
    destaque: false,
  },
  {
    slug: 'golpe-falso-leilao-sites-fraudulentos',
    titulo: 'Golpe do falso leilão online',
    resumo: 'Sites que imitam Receita Federal e DETRAN para roubar dinheiro.',
    categoria: 'Golpes',
    tags: ['Leilão', 'Site Falso'],
    tempoLeitura: 6,
    publishedAt: '2025-03-18',
    destaque: false,
  },
  {
    slug: 'como-bloquear-celular-roubado-imei',
    titulo: 'Como bloquear celular roubado: IMEI, chip e apps',
    resumo: 'Guia urgente para bloquear tudo em até 5 minutos após roubo.',
    categoria: 'Tutoriais',
    tags: ['IMEI', 'Bloqueio'],
    tempoLeitura: 6,
    publishedAt: '2025-03-20',
    destaque: false,
  },
  {
    slug: 'engenharia-social-o-que-e-como-se-proteger',
    titulo: 'Engenharia social: a base de 90% dos golpes digitais',
    resumo: 'Entenda a técnica de manipulação usada em quase todos os golpes.',
    categoria: 'Prevenção',
    tags: ['Engenharia Social', 'Prevenção'],
    tempoLeitura: 9,
    publishedAt: '2025-03-22',
    destaque: false,
  },
  {
    slug: 'conta-laranja-pix-consequencias-legais',
    titulo: 'Conta laranja no Pix: consequências legais',
    resumo: 'Emprestou sua conta? Entenda as consequências criminais.',
    categoria: 'Direito Digital',
    tags: ['Conta Laranja', 'Pix'],
    tempoLeitura: 7,
    publishedAt: '2025-03-25',
    destaque: false,
  },
  {
    slug: 'cai-em-um-golpe-o-que-fazer-primeiro',
    titulo: 'Caí em um Golpe: O Que Fazer Primeiro? Guia de Emergência 2026',
    resumo: 'Acabou de cair em um golpe? Veja os primeiros passos urgentes para maximizar suas chances de recuperar o dinheiro.',
    categoria: 'Tutoriais',
    tags: ['Golpe', 'Emergência', '2026'],
    tempoLeitura: 5,
    publishedAt: '2026-03-11',
    destaque: true,
  },
  {
    slug: 'golpe-instagram-como-identificar-2026',
    titulo: 'Golpe no Instagram em 2026: Como Identificar e O Que Fazer',
    resumo: 'Perfis falsos, promoções fraudulentas e lojas fake. Saiba como identificar golpes no Instagram.',
    categoria: 'Golpes',
    tags: ['Instagram', 'Golpe', '2026'],
    tempoLeitura: 7,
    publishedAt: '2026-03-15',
    destaque: false,
  },
  {
    slug: 'golpe-emprestimo-falso-como-evitar',
    titulo: 'Golpe do Empréstimo Falso: Como Funciona e O Que Fazer',
    resumo: 'Pagou taxa antecipada para liberar empréstimo? Descubra como funciona o golpe do crédito falso.',
    categoria: 'Golpes',
    tags: ['Empréstimo', 'Golpe'],
    tempoLeitura: 6,
    publishedAt: '2026-03-14',
    destaque: false,
  },
  {
    slug: 'como-saber-se-e-golpe-checklist',
    titulo: 'Como Saber se é Golpe: Checklist Definitivo para 2026',
    resumo: 'Recebeu uma oferta suspeita? Use nosso checklist com 15 sinais para identificar golpes digitais.',
    categoria: 'Prevenção',
    tags: ['Prevenção', 'Checklist', '2026'],
    tempoLeitura: 5,
    publishedAt: '2026-03-13',
    destaque: false,
  },
  {
    slug: 'golpe-tinder-romance-online',
    titulo: 'Golpe do Tinder e Apps de Relacionamento: Como Se Proteger',
    resumo: 'Conheceu alguém online que pediu dinheiro? Entenda o golpe do romance digital.',
    categoria: 'Golpes',
    tags: ['Tinder', 'Romance', 'Golpe'],
    tempoLeitura: 7,
    publishedAt: '2026-03-12',
    destaque: false,
  },
  {
    slug: 'golpe-nubank-inter-c6-banco-digital',
    titulo: 'Golpe em Banco Digital: Nubank, Inter, C6 — O Que Fazer',
    resumo: 'Teve sua conta invadida em banco digital? Saiba como agir e responsabilizar o banco.',
    categoria: 'Golpes',
    tags: ['Nubank', 'Inter', 'C6', 'Banco Digital'],
    tempoLeitura: 6,
    publishedAt: '2026-03-10',
    destaque: false,
  },
  {
    slug: 'como-denunciar-golpe-internet-2026',
    titulo: 'Como Denunciar Golpe na Internet em 2026: Todos os Canais',
    resumo: 'Guia com todos os canais de denúncia para golpes digitais no Brasil.',
    categoria: 'Tutoriais',
    tags: ['Denúncia', 'Golpe', '2026'],
    tempoLeitura: 6,
    publishedAt: '2026-03-09',
    destaque: false,
  },
  {
    slug: 'pix-para-pessoa-errada-como-recuperar',
    titulo: 'Fiz Pix para Pessoa Errada: Como Recuperar o Dinheiro',
    resumo: 'Enviou Pix para conta errada? Veja o que fazer para conseguir o dinheiro de volta.',
    categoria: 'Pix & MED',
    tags: ['Pix', 'Erro', 'Recuperação'],
    tempoLeitura: 5,
    publishedAt: '2026-03-08',
    destaque: false,
  },
  {
    slug: 'golpe-telegram-grupo-investimento',
    titulo: 'Golpe no Telegram: Grupos de Investimento e Sinais Falsos',
    resumo: 'Entrou num grupo de investimento no Telegram e perdeu dinheiro? Entenda como funciona.',
    categoria: 'Investimentos',
    tags: ['Telegram', 'Investimento', 'Golpe'],
    tempoLeitura: 6,
    publishedAt: '2026-03-07',
    destaque: false,
  },
  {
    slug: 'direitos-vitima-golpe-digital-2026',
    titulo: 'Seus Direitos Como Vítima de Golpe Digital em 2026',
    resumo: 'Conheça todos os seus direitos legais após cair em um golpe digital.',
    categoria: 'Direito Digital',
    tags: ['Direitos', 'CDC', 'Lei', '2026'],
    tempoLeitura: 8,
    publishedAt: '2026-03-06',
    destaque: false,
  },
];

const CATEGORIAS = ['Todos', 'Pix & MED', 'Golpes', 'Direito Digital', 'Investimentos', 'Tutoriais', 'Defesa do Consumidor', 'Prevenção'];

export default async function BlogPage() {
  // Fetch dynamic articles from database
  const dbArtigos = await prisma.artigo.findMany({
    where: { publicado: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      slug: true,
      titulo: true,
      resumo: true,
      categoria: true,
      tags: true,
      tempoLeitura: true,
      publishedAt: true,
    },
  }).catch(() => []);

  // Merge: DB articles first (newer), then static ones that aren't duplicated
  const dbSlugs = new Set(dbArtigos.map((a) => a.slug));
  const staticNonDuplicated = ARTIGOS.filter((a) => !dbSlugs.has(a.slug));

  const dynamicArticles = dbArtigos.map((a) => ({
    slug: a.slug,
    titulo: a.titulo,
    resumo: a.resumo,
    categoria: a.categoria,
    tags: a.tags,
    tempoLeitura: a.tempoLeitura,
    publishedAt: a.publishedAt?.toISOString().split('T')[0] || '',
    destaque: false,
    fromDb: true,
  }));

  const allArticles = [
    ...dynamicArticles,
    ...staticNonDuplicated.map((a) => ({ ...a, fromDb: false })),
  ];

  const destaques = allArticles.filter((a) => 'destaque' in a && a.destaque);
  const demais = allArticles.filter((a) => !('destaque' in a && a.destaque));

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Blog' }]} />
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-5xl text-center">
          <span className="badge-green mb-4">Conteúdo Educativo</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog — Defesa contra Golpes Digitais
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Artigos, guias e análises jurídicas escritos por especialistas em segurança digital
            e direito do consumidor. Gratuito e atualizado semanalmente.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          {/* Destaques */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-6">Artigos em destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {destaques.map((artigo) => (
                <Link
                  key={artigo.slug}
                  href={`/blog/${artigo.slug}`}
                  className="card group hover:border-green-500/30 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="badge-green text-xs">{artigo.categoria}</span>
                    <span className="badge-blue text-xs">Destaque</span>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-3 group-hover:text-green-400 transition-colors leading-snug">
                    {artigo.titulo}
                  </h3>
                  <p className="text-sm text-white/60 mb-4 leading-relaxed">{artigo.resumo}</p>
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {artigo.tempoLeitura} min de leitura
                    </div>
                    <span>{new Date(artigo.publishedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* All posts */}
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Todos os artigos</h2>
            <div className="space-y-4">
              {demais.map((artigo) => (
                <Link
                  key={artigo.slug}
                  href={`/blog/${artigo.slug}`}
                  className="card group hover:border-green-500/30 transition-all flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge-blue text-xs">{artigo.categoria}</span>
                    </div>
                    <h3 className="font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                      {artigo.titulo}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">{artigo.resumo}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {artigo.tags.map((tag) => (
                        <span key={tag} className="flex items-center gap-1 text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded">
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-white/40">
                      <Clock className="w-3 h-3" />
                      {artigo.tempoLeitura} min
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Internal Links — SEO */}
          <div className="mt-16 border-t border-white/10 pt-10">
            <h2 className="text-xl font-bold text-white mb-6">Navegue por tipo de golpe</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Golpe Pix', href: '/golpes/golpe-pix' },
                { label: 'WhatsApp Clonado', href: '/golpes/golpe-whatsapp' },
                { label: 'Boleto Falso', href: '/golpes/golpe-boleto' },
                { label: 'Investimento Falso', href: '/golpes/golpe-investimento' },
                { label: 'Golpe do Amor', href: '/golpes/golpe-romance' },
                { label: 'Emprego Falso', href: '/golpes/golpe-emprego' },
                { label: 'Roubo de Celular', href: '/golpes/roubo-celular' },
                { label: 'Falso Advogado', href: '/golpes/golpe-falso-advogado' },
              ].map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="text-sm text-white/50 hover:text-ember-400 transition-colors p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-ember-500/20 text-center"
                >
                  {g.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Ferramentas Links — SEO */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-6">Ferramentas úteis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/ferramentas/diagnostico" className="card hover:border-green-500/30 group text-center">
                <h3 className="font-semibold text-white text-sm group-hover:text-green-400 transition-colors">Diagnóstico Gratuito</h3>
                <p className="text-xs text-white/40 mt-1">Descubra sua chance de recuperação em 30s</p>
              </Link>
              <Link href="/ferramentas/gerador-contestacao-med" className="card hover:border-green-500/30 group text-center">
                <h3 className="font-semibold text-white text-sm group-hover:text-green-400 transition-colors">Gerar Contestação MED</h3>
                <p className="text-xs text-white/40 mt-1">Documento oficial para o banco</p>
              </Link>
              <Link href="/ferramentas/pacote-completo" className="card hover:border-ember-500/30 group text-center">
                <h3 className="font-semibold text-white text-sm group-hover:text-ember-400 transition-colors">Kit Completo — R$47</h3>
                <p className="text-xs text-white/40 mt-1">3 documentos prontos em 15 min</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
