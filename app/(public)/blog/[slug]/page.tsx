import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, Tag, Share2, FileText } from 'lucide-react';

// Static blog content (in production, fetched from Prisma)
const ARTIGOS: Record<string, {
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: string;
  tags: string[];
  tempoLeitura: number;
  publishedAt: string;
  autorNome: string;
}> = {
  'med-mecanismo-especial-devolucao-pix': {
    titulo: 'MED: O que é o Mecanismo Especial de Devolução do Pix e como acionar?',
    resumo: 'Tudo sobre a Resolução BCB 93/2021 que criou o MED. Saiba como funciona, quais são os prazos e como aumentar suas chances de recuperação.',
    categoria: 'Pix & MED',
    tags: ['MED', 'Pix', 'BACEN', 'Resolução BCB 93/2021'],
    tempoLeitura: 8,
    publishedAt: '2025-01-15',
    autorNome: 'Equipe Central de Defesa Digital',
    conteudo: `
## O que é o MED?

O **Mecanismo Especial de Devolução (MED)** foi criado pelo Banco Central do Brasil pela **Resolução BCB nº 93, de 23 de novembro de 2021**, e representa um avanço significativo na proteção de usuários do sistema de pagamentos instantâneos Pix.

O MED é um processo que permite ao pagador solicitar a devolução de valores transferidos via Pix em dois casos específicos:

1. **Fraude** (golpe, estelionato, phishing, etc.)
2. **Operacional** (erro do usuário ao inserir dados, falha técnica)

## Como funciona na prática?

Quando você solicita a ativação do MED ao seu banco, o seguinte acontece:

1. Seu banco (banco pagador) envia a solicitação ao banco do destinatário
2. O banco destinatário tem até **7 dias corridos** para bloquear os valores na conta do golpista
3. Se o bloqueio ocorrer, os valores ficam retidos por até **96 horas** adicionais
4. O Banco Central analisa a situação e determina a devolução

## Qual é o prazo para acionar o MED?

Você pode solicitar o MED em até **80 dias após a data da transação**. No entanto, a eficácia do MED diminui com o tempo, pois os golpistas tendem a mover os valores rapidamente.

**Por isso, o ideal é acionar o MED em até 72 horas após o golpe.**

## Quais são os requisitos para o MED?

Para que o MED seja aceito, é necessário:

- Comprovar que a transação foi realizada em decorrência de fraude ou erro
- Apresentar Boletim de Ocorrência (recomendado)
- Preencher o formulário específico do seu banco
- Apresentar evidências da fraude (prints, comprovantes, etc.)

## E se o banco negar o MED?

Se o seu banco negar a solicitação de MED, você pode:

1. **Recorrer à Ouvidoria do banco** com os documentos do caso
2. **Registrar reclamação no Banco Central** pelo portal Meu BC
3. **Acionamento do Procon** para mediação
4. **Ação judicial** no Juizado Especial Cível (JEC) — gratuito para valores até 40 salários mínimos

## Taxa de sucesso do MED

Segundo dados do Banco Central, o MED tem conseguido recuperar valores em aproximadamente 65% dos casos onde é acionado dentro do prazo adequado. Esse percentual cai para menos de 30% quando o MED é solicitado após 30 dias do golpe.

## Como gerar o documento de contestação MED?

Use nossa ferramenta gratuita para gerar o documento oficial de contestação MED, com todos os fundamentos legais e formatação correta para entrega ao seu banco.
    `,
  },
  'banco-responsavel-golpe-digital-stj': {
    titulo: 'O banco é responsável pelos golpes digitais? O que diz o STJ',
    resumo: 'Análise da jurisprudência do STJ sobre responsabilidade dos bancos em casos de fraude digital. Quando você pode processar o banco?',
    categoria: 'Direito Digital',
    tags: ['STJ', 'Banco', 'Responsabilidade', 'CDC'],
    tempoLeitura: 12,
    publishedAt: '2025-02-01',
    autorNome: 'Equipe Central de Defesa Digital',
    conteudo: `
## Responsabilidade objetiva dos bancos

O Superior Tribunal de Justiça (STJ) tem posição consolidada de que as **instituições financeiras respondem objetivamente** pelos danos causados a seus clientes em decorrência de fraudes praticadas por terceiros.

Isso está baseado no **artigo 14 do Código de Defesa do Consumidor (CDC)**, que estabelece a responsabilidade pelo fato do serviço — ou seja, o banco responde independentemente de culpa quando seus serviços causam dano ao consumidor.

## O que diz a Súmula 479 do STJ?

A **Súmula 479 do STJ** é clara:

> *"As instituições financeiras respondem objetivamente pelos danos gerados por fortuito interno relativo a fraudes e delitos praticados por terceiros no âmbito de operações bancárias."*

Isso significa que, se um golpista se aproveita de falhas nos sistemas de segurança do banco para lesar você, o banco é responsável.

## Quando o banco NÃO é responsável?

O STJ faz a distinção entre **fortuito interno** e **fortuito externo**:

- **Fortuito interno**: relacionado ao risco do negócio bancário → banco é responsável
- **Fortuito externo**: evento externo, imprevisível e irresistível → banco pode ser isento

Exemplos de casos onde o banco pode não ser responsável:
- Quando a vítima forneceu voluntariamente senha e token ao golpista
- Quando o golpe ocorreu por negligência grave do próprio cliente

## Dano moral em casos de golpe bancário

Além da devolução dos valores, o STJ tem reconhecido o direito a **indenização por dano moral** nos casos em que:

- O banco demorou para responder a reclamações
- O banco negou indevidamente a devolução
- O cliente ficou sem acesso a valores essenciais para sobrevivência

Os valores de indenização por dano moral variam, em geral, de R$5.000 a R$20.000.

## Como usar essa informação a seu favor?

Ao notificar seu banco formalmente, mencione explicitamente a Súmula 479 do STJ e o CDC. Isso demonstra que você conhece seus direitos e aumenta a pressão para uma resolução rápida.

Nossa ferramenta de **Notificação Formal ao Banco** já inclui essas referências legais automaticamente.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(ARTIGOS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artigo = ARTIGOS[slug];
  if (!artigo) return { title: 'Artigo não encontrado' };

  return {
    title: `${artigo.titulo} | Central de Defesa Digital`,
    description: artigo.resumo,
    keywords: artigo.tags,
    alternates: { canonical: `https://centraldefesadigital.com.br/blog/${slug}` },
    openGraph: {
      title: artigo.titulo,
      description: artigo.resumo,
      type: 'article',
      publishedTime: artigo.publishedAt,
      authors: [artigo.autorNome],
    },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artigo = ARTIGOS[slug];
  if (!artigo) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artigo.titulo,
    description: artigo.resumo,
    author: { '@type': 'Organization', name: artigo.autorNome },
    publisher: { '@type': 'Organization', name: 'Central de Defesa Digital' },
    datePublished: artigo.publishedAt,
    dateModified: artigo.publishedAt,
    keywords: artigo.tags.join(', '),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="bg-hero-gradient py-12 bg-grid-pattern">
        <div className="container max-w-3xl">
          <Link href="/blog" className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-green text-xs">{artigo.categoria}</span>
            <div className="flex items-center gap-1 text-xs text-white/40">
              <Clock className="w-3 h-3" />
              {artigo.tempoLeitura} min de leitura
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{artigo.titulo}</h1>
          <p className="text-lg text-white/70 mb-6">{artigo.resumo}</p>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <span>{artigo.autorNome}</span>
            <span>•</span>
            <span>{new Date(artigo.publishedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container max-w-3xl">
          {/* Content */}
          <div className="prose prose-invert max-w-none mb-12">
            {artigo.conteudo.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.slice(3)}</h2>;
              if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-green-500 pl-4 py-2 my-4 text-white/70 italic">{line.slice(2)}</blockquote>;
              if (line.startsWith('- ')) return <li key={i} className="text-white/70 ml-4 mb-1">{line.slice(2)}</li>;
              if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. '))
                return <li key={i} className="text-white/70 ml-4 mb-1 list-decimal">{line.slice(3)}</li>;
              if (line.trim() === '') return <div key={i} className="mb-4" />;
              return <p key={i} className="text-white/70 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {artigo.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs bg-white/10 text-white/60 px-3 py-1.5 rounded-full">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="card border-green-500/20 bg-green-500/5 text-center">
            <h3 className="font-bold text-white text-xl mb-3">Precisa de ajuda prática?</h3>
            <p className="text-white/70 mb-6">Use nossas ferramentas para gerar documentos jurídicos em minutos.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas" className="btn-primary">
                <FileText className="w-4 h-4" />
                Acessar ferramentas
              </Link>
              <Link href="/ferramentas/checklist" className="btn-secondary">
                Ver checklist de ação
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
