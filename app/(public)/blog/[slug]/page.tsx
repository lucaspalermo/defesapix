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
  'golpe-whatsapp-como-identificar-se-proteger': {
    titulo: 'Golpe do WhatsApp: Como identificar, se proteger e denunciar',
    resumo: 'Os 7 tipos mais comuns de golpe via WhatsApp e o passo a passo para denunciar à Polícia, Meta e às autoridades competentes.',
    categoria: 'Golpes',
    tags: ['WhatsApp', 'Clonagem', 'BO', 'Verificação em duas etapas'],
    tempoLeitura: 6,
    publishedAt: '2025-01-20',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Os 7 tipos de golpe via WhatsApp

O WhatsApp é o aplicativo de mensagens mais usado no Brasil, com mais de 120 milhões de usuários. Isso o torna o alvo favorito dos golpistas. Conheça os tipos mais comuns:

### 1. Clonagem de WhatsApp

O golpista liga para a vítima se passando por uma empresa (banco, operadora, loja) e pede o código de verificação de 6 dígitos enviado por SMS. Com esse código, ele assume o controle do WhatsApp da vítima e começa a pedir dinheiro aos contatos.

### 2. WhatsApp falso (perfil fake)

O criminoso cria uma conta nova com a foto da vítima e envia mensagens aos contatos dizendo que "trocou de número". Em seguida, pede transferências urgentes via Pix.

### 3. Golpe do empréstimo

Mensagem oferecendo empréstimo rápido sem consulta ao SPC/Serasa. A vítima paga uma "taxa de liberação" e nunca recebe o dinheiro.

### 4. Golpe da promoção falsa

Links maliciosos disfarçados de promoções de grandes marcas. Ao clicar, a vítima é redirecionada para sites que roubam dados pessoais.

### 5. Golpe do falso suporte técnico

O golpista se passa pelo suporte do WhatsApp e pede dados pessoais ou código de verificação para "atualizar a conta".

### 6. Golpe do grupo falso

Convites para grupos falsos que simulam empresas ou órgãos oficiais. Dentro do grupo, os golpistas aplicam fraudes de investimento ou pedem dados.

### 7. Golpe do QR Code

O criminoso envia um QR Code dizendo que é para "verificação de segurança". Na verdade, o QR Code vincula o WhatsApp da vítima ao WhatsApp Web do golpista.

## Como se proteger

- **Ative a verificação em duas etapas**: Configurações > Conta > Verificação em duas etapas
- **Nunca compartilhe o código de 6 dígitos** enviado por SMS com ninguém
- **Desconfie de pedidos de dinheiro** por mensagem, mesmo de conhecidos
- **Confirme por ligação** antes de enviar qualquer valor
- **Não clique em links suspeitos** recebidos por mensagem

## O que fazer se foi vítima

1. **Recupere sua conta**: abra o WhatsApp, insira seu número e solicite novo código
2. **Avise seus contatos** imediatamente através de outra rede social ou telefone
3. **Registre um Boletim de Ocorrência** — pode ser online na delegacia do seu estado
4. **Denuncie ao WhatsApp**: Configurações > Ajuda > Fale conosco
5. **Se houve transferência via Pix**: acione o MED pelo seu banco em até 72 horas

## Denúncia formal

Além do B.O., você pode denunciar em:
- **ANATEL**: para uso indevido do número
- **Procon**: para fraudes envolvendo empresas
- **Banco Central**: se houve falha do banco na segurança do Pix
    `,
  },
  'golpe-investimento-criptomoeda-brasil': {
    titulo: 'Golpe de Investimento e Criptomoedas: Como denunciar e recuperar valores',
    resumo: 'O que fazer quando você perdeu dinheiro em investimentos falsos ou criptomoedas fraudulentas. CVM, Polícia Federal e o que esperar.',
    categoria: 'Investimentos',
    tags: ['Criptomoeda', 'CVM', 'Pirâmide', 'Investimento falso'],
    tempoLeitura: 10,
    publishedAt: '2025-02-05',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Como funcionam os golpes de investimento

Os golpes de investimento no Brasil cresceram exponencialmente com a popularização das criptomoedas e plataformas online. Segundo a CVM (Comissão de Valores Mobiliários), o número de alertas sobre ofertas irregulares de investimento dobrou nos últimos 3 anos.

## Tipos mais comuns

### Pirâmide financeira

O "investimento" promete retornos altos e consistentes. Na prática, o dinheiro dos novos participantes paga os antigos, até que o esquema desmorona.

**Sinais de alerta:**
- Promessa de retorno fixo acima de 2% ao mês
- Incentivo forte para recrutar novas pessoas
- Falta de produto ou serviço real por trás do investimento
- Empresa sem registro na CVM ou BACEN

### Corretora de criptomoedas falsa

Plataformas que simulam exchanges reais de criptomoedas. A vítima "investe", vê o saldo crescer na tela, mas quando tenta sacar, descobre que o dinheiro sumiu.

### Trader/Guru falso no Instagram

Perfis nas redes sociais que ostentam riqueza e prometem ensinar o "método secreto" para enriquecer com day trade ou cripto. Cobram cursos caros e gerenciam carteiras das vítimas.

### Esquema de forex não regulamentado

Plataformas de câmbio e forex que não possuem autorização do Banco Central ou CVM para operar no Brasil.

## O que fazer se foi vítima

### 1. Documente tudo

Salve prints de tela da plataforma, comprovantes de transferências, conversas com o "consultor", e-mails e qualquer material promocional.

### 2. Registre Boletim de Ocorrência

O B.O. é essencial para qualquer ação judicial posterior. Tipifique como estelionato (art. 171 do Código Penal).

### 3. Denuncie à CVM

A Comissão de Valores Mobiliários tem canal específico para denúncias: acesse o site da CVM e registre a denúncia com todos os documentos.

### 4. Denuncie à Polícia Federal

Se o golpe envolver criptomoedas ou operações internacionais, a Polícia Federal tem competência para investigar.

### 5. Acione o MED se foi via Pix

Se as transferências foram feitas via Pix, acione o MED pelo seu banco imediatamente.

### 6. Registre no Procon e Banco Central

Múltiplos registros criam pressão institucional e ajudam nas investigações.

## Chances de recuperação

As chances dependem do tipo de golpe e da rapidez da ação:
- **Pix recente (< 72h)**: MED tem taxa de 65% de sucesso
- **Transferência bancária**: contestação junto ao banco pode funcionar
- **Criptomoeda**: recuperação mais difícil, mas não impossível via ação judicial
- **Ação judicial**: Juizado Especial Cível para valores até 40 salários mínimos

## Como verificar se um investimento é legítimo

- Consulte a **lista de empresas autorizadas** no site da CVM (cvm.gov.br)
- Verifique o **CNPJ** no site da Receita Federal
- Pesquise reclamações no **Reclame Aqui** e **Consumidor.gov.br**
- Desconfie de **retornos garantidos** acima da taxa Selic
    `,
  },
  'como-registrar-bo-online-golpe-digital': {
    titulo: 'Como registrar Boletim de Ocorrência online para golpe digital',
    resumo: 'Guia passo a passo para registrar o BO eletrônico em todos os estados do Brasil. Links, dicas e o que informar corretamente.',
    categoria: 'Tutoriais',
    tags: ['BO', 'Delegacia', 'Tutorial', 'Golpe Digital'],
    tempoLeitura: 7,
    publishedAt: '2025-02-10',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Por que o B.O. é essencial?

O Boletim de Ocorrência é o documento mais importante na recuperação de valores perdidos em golpes digitais. Ele serve como:

- **Prova formal** da ocorrência do crime
- **Requisito** para acionar o MED (Mecanismo Especial de Devolução)
- **Base** para ações judiciais contra o banco ou golpista
- **Proteção** contra responsabilização por dívidas criadas em seu nome

## Passo a passo para registrar o BO online

### 1. Acesse a Delegacia Eletrônica do seu estado

Todos os estados brasileiros já possuem delegacias eletrônicas que permitem o registro de B.O. online para crimes digitais.

### 2. Selecione o tipo de ocorrência

Escolha a categoria que melhor se aplica ao seu caso:
- **Estelionato (art. 171, CP)** — para golpes em geral
- **Fraude eletrônica (art. 171, §2º-A, CP)** — específico para golpes digitais
- **Invasão de dispositivo (art. 154-A, CP)** — para clonagem de WhatsApp

### 3. Preencha os dados do fato

Informe com o máximo de detalhes:
- **Data e hora** exata do golpe
- **Valor** total transferido
- **Chave Pix** ou dados bancários do golpista
- **Como o golpe aconteceu** (descrição detalhada)
- **Meios utilizados** (WhatsApp, Instagram, telefone, e-mail)

### 4. Anexe evidências

Os seguintes documentos fortalecem seu B.O.:
- Prints de conversas com o golpista
- Comprovantes de transferência (Pix, TED, boleto)
- Screenshots do perfil do golpista
- E-mails ou mensagens recebidas
- Número de protocolo do MED (se já acionado)

### 5. Revise e protocole

Após o envio, você receberá um número de protocolo. Guarde esse número — ele será necessário para todos os processos posteriores.

## Dicas para um B.O. eficaz

- **Seja detalhista**: quanto mais informações, melhor para a investigação
- **Use termos técnicos**: mencione "Pix", "MED", "chave aleatória" quando aplicável
- **Inclua valores exatos**: some todas as transferências
- **Mencione testemunhas**: se alguém presenciou o golpe ou pode confirmar
- **Tipifique corretamente**: estelionato digital (art. 171, §2º-A) tem pena maior

## Prazo para registrar

Não há prazo máximo para registrar um B.O., mas quanto mais rápido, melhor. Para acionar o MED do Banco Central, o ideal é registrar em até 72 horas após o golpe.

## E se eu registrar pessoalmente?

Se preferir ir à delegacia, leve todos os documentos impressos. Algumas delegacias especializadas em crimes cibernéticos podem oferecer investigação mais aprofundada.
    `,
  },
  'procon-banco-central-reclamacao-golpe': {
    titulo: 'Procon e Banco Central: Como e quando fazer reclamação após golpe',
    resumo: 'Entenda a diferença entre reclamar no Procon e no BACEN, quando cada um é mais eficaz e como fazer o processo de forma correta.',
    categoria: 'Defesa do Consumidor',
    tags: ['Procon', 'BACEN', 'Reclamação', 'CDC'],
    tempoLeitura: 9,
    publishedAt: '2025-02-14',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Procon vs. Banco Central: qual usar?

Quando você é vítima de um golpe digital envolvendo bancos, duas reclamações podem ser muito eficazes: no **Procon** e no **Banco Central**. Mas cada uma tem um papel diferente.

## Reclamação no Banco Central

### Quando usar
- O banco **negou o MED** sem justificativa adequada
- O banco **demorou** para responder sua solicitação
- O banco se recusa a fornecer informações sobre a transação
- Você quer registrar uma reclamação formal que fica no histórico regulatório do banco

### Como fazer

1. Acesse o portal **Meu BC** (meubc.bcb.gov.br)
2. Faça login com sua conta Gov.br
3. Selecione "Registrar reclamação"
4. Escolha a instituição financeira
5. Descreva detalhadamente o problema
6. Anexe documentos relevantes

### Prazo de resposta
O banco tem **10 dias úteis** para responder à reclamação via BACEN. Se não responder, isso conta negativamente no ranking de reclamações do Banco Central.

### Por que é eficaz
O Banco Central monitora ativamente as reclamações e usa esses dados para:
- Fiscalizar as instituições financeiras
- Aplicar multas e sanções
- Publicar o ranking de reclamações (que afeta a reputação do banco)

## Reclamação no Procon

### Quando usar
- O banco se recusa a devolver valores indevidamente
- Houve **falha na prestação do serviço** bancário
- Você quer uma **mediação** entre você e o banco
- Você precisa de um protocolo adicional para ação judicial

### Como fazer

1. Acesse o **Procon do seu estado** (presencial ou online)
2. Reúna documentos: B.O., comprovantes, protocolo do MED
3. Preencha o formulário de reclamação
4. Detalhe o problema e o que você deseja como resolução
5. Acompanhe o andamento pelo número de protocolo

### Prazo de resposta
O Procon notifica a empresa, que tem em média **10 a 30 dias** para se manifestar, dependendo do estado.

### Base legal
O Procon atua com base no **Código de Defesa do Consumidor (CDC)**:
- **Art. 14**: responsabilidade objetiva do fornecedor por falhas no serviço
- **Art. 6º, VI**: direito à prevenção e reparação de danos
- **Art. 39**: práticas abusivas vedadas

## Estratégia combinada

A melhor estratégia é usar **ambos** ao mesmo tempo:

1. **Primeiro**: acione o MED pelo banco (dentro de 72h)
2. **Segundo**: registre o B.O. (mesmo dia ou dia seguinte)
3. **Terceiro**: registre reclamação no BACEN (se o banco negar ou demorar)
4. **Quarto**: registre no Procon (para pressão adicional e mediação)
5. **Quinto**: se nada funcionar, Juizado Especial Cível (gratuito até 20 salários mínimos)

## Dica importante

Cada protocolo gerado (MED, B.O., BACEN, Procon) fortalece seu caso. Em uma eventual ação judicial, o juiz verá que você esgotou todas as vias administrativas antes de recorrer à Justiça — isso aumenta significativamente suas chances de ganhar.
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
    alternates: { canonical: `https://defesapix.com.br/blog/${slug}` },
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
