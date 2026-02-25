import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog — Segurança Digital e Recuperação de Golpes | Central de Defesa Digital',
  description:
    'Artigos, guias e dicas sobre como se proteger de golpes digitais, o que fazer após ser vítima e como recuperar dinheiro. Conteúdo gratuito e atualizado semanalmente.',
  alternates: { canonical: 'https://defesapix.com.br/blog' },
};

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
];

const CATEGORIAS = ['Todos', 'Pix & MED', 'Golpes', 'Direito Digital', 'Investimentos', 'Tutoriais', 'Defesa do Consumidor'];

export default function BlogPage() {
  const destaques = ARTIGOS.filter((a) => a.destaque);
  const demais = ARTIGOS.filter((a) => !a.destaque);

  return (
    <>
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

          {/* Newsletter CTA */}
          <div className="mt-16 card border-green-500/20 text-center">
            <h3 className="font-bold text-white text-xl mb-2">Receba novos artigos por e-mail</h3>
            <p className="text-white/60 mb-6">1 e-mail por semana. Zero spam. Cancele quando quiser.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="seu@email.com.br" className="input flex-1" />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Quero receber
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
