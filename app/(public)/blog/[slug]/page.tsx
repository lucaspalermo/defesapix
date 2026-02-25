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
  'como-proteger-idoso-golpe-digital': {
    titulo: 'Como proteger idosos de golpes digitais: guia para filhos e netos',
    resumo: 'Dicas práticas para proteger seus pais e avós de golpes via Pix, WhatsApp e ligações falsas.',
    categoria: 'Prevenção',
    tags: ['Idoso', 'Prevenção', 'Família'],
    tempoLeitura: 7,
    publishedAt: '2025-02-18',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Por que idosos são alvo preferencial?

Segundo a Febraban, pessoas acima de 60 anos representam mais de 30% das vítimas de golpes digitais no Brasil. Os motivos incluem menor familiaridade com tecnologia, confiança em autoridades e urgência diante de situações de pressão.

## Golpes mais comuns contra idosos

### Falso atendente de banco
Ligação dizendo que há "movimentação suspeita" na conta. Pedem dados ou transferência para "conta segura".

### WhatsApp do filho/neto
Mensagem de número novo dizendo "troquei de número" seguida de pedido urgente de Pix.

### Consignado não autorizado
Contratação de empréstimo usando dados do aposentado sem consentimento.

### Falso técnico de informática
Ligação oferecendo "suporte técnico" para instalar programa que dá acesso remoto ao celular.

## Como proteger seus familiares

- **Configure verificação em duas etapas** no WhatsApp e e-mail
- **Limite valores de Pix** pelo app do banco (limite diário e noturno)
- **Combinem uma palavra-chave** para confirmar pedidos de dinheiro por mensagem
- **Instale antivírus** no celular e computador
- **Ensine a regra de ouro**: banco NUNCA liga pedindo senha, dados ou transferência
- **Ative notificações** de transações no app do banco
- **Bloqueie ligações** de números desconhecidos

## O que fazer se já caiu no golpe

1. Acione o MED pelo banco imediatamente (se foi via Pix)
2. Registre B.O. na delegacia eletrônica
3. Ligue para o 135 (INSS) se for golpe de consignado
4. Documente tudo com nossas ferramentas gratuitas
    `,
  },
  'golpe-falso-funcionario-banco': {
    titulo: 'Golpe do falso funcionário do banco: como funciona e como se defender',
    resumo: 'Entenda como os golpistas se passam por atendentes bancários, os scripts que usam e como se proteger.',
    categoria: 'Golpes',
    tags: ['Banco', 'Engenharia Social', 'Telefone'],
    tempoLeitura: 8,
    publishedAt: '2025-02-20',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Como funciona o golpe

O golpista liga para a vítima se identificando como funcionário do banco. Usa dados reais da vítima (nome completo, CPF, últimos dígitos do cartão) para parecer legítimo. O cenário típico:

1. **Ligação alarmante**: "Detectamos uma compra suspeita de R$3.999 no seu cartão"
2. **Confirmação de dados**: Pedem que você confirme dados pessoais "por segurança"
3. **Ação urgente**: Pedem transferência para "conta segura" ou instalação de app de segurança
4. **Resultado**: Dinheiro transferido para conta do golpista

## Por que é tão convincente

- Usam **dados vazados** para parecer que têm acesso ao seu cadastro
- O número de telefone pode aparecer como o do banco (spoofing)
- Falam com **tom profissional** e usam termos bancários corretos
- Criam **urgência extrema** para que você aja sem pensar

## Como se proteger

- **Desligue e ligue você** para o número oficial do banco (no cartão ou app)
- Bancos **nunca pedem senha, token ou transferência** por telefone
- Bancos **nunca pedem instalação** de aplicativos por telefone
- **Não confirme dados** — se o banco está ligando, eles já têm seus dados
- **Desconfie de urgência** — golpistas sempre criam pressão de tempo

## Responsabilidade do banco

O STJ entende que bancos são responsáveis quando golpistas usam dados que deveriam ser protegidos pelo sistema bancário. Se o golpe foi facilitado por vazamento de dados do banco, você tem direito a ressarcimento.
    `,
  },
  'pix-agendado-golpe-comprovante-falso': {
    titulo: 'Pix agendado e comprovante falso: como não cair nesse golpe',
    resumo: 'Golpistas usam Pix agendado e comprovantes editados para simular pagamentos. Saiba como verificar.',
    categoria: 'Pix & MED',
    tags: ['Pix', 'Comprovante', 'Fraude'],
    tempoLeitura: 5,
    publishedAt: '2025-02-22',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O golpe do Pix agendado

O golpista mostra um comprovante de Pix agendado (não efetivado) como se fosse um pagamento realizado. A vítima entrega o produto ou serviço, e depois descobre que o Pix nunca foi confirmado.

## O golpe do comprovante falso

Outra variação: o golpista edita uma imagem de comprovante Pix com dados falsos (valor, data, destinatário) usando aplicativos de edição.

## Como identificar

- **Pix agendado**: o comprovante mostra "agendado" ou "pendente" em vez de "realizado" ou "concluído"
- **Comprovante falso**: verifique se o dinheiro realmente caiu na sua conta pelo extrato do banco, não pelo comprovante
- **Horário suspeito**: Pix agendados para madrugada ou finais de semana podem ser cancelados antes da efetivação

## Como se proteger

1. **Sempre confirme no extrato** do seu banco antes de entregar produto ou serviço
2. **Não confie apenas no comprovante** mostrado pelo comprador
3. **Aguarde a confirmação** do banco antes de liberar qualquer coisa
4. **Use notificações em tempo real** do app do banco para verificar recebimentos

## Se caiu no golpe

Se você entregou um produto baseado em comprovante falso, registre B.O. com prints do comprovante falso e dados do golpista. Se houve Pix reverso (MED acionado contra você de forma fraudulenta), conteste com o banco imediatamente.
    `,
  },
  'lei-14155-2021-fraude-digital-penas': {
    titulo: 'Lei 14.155/2021: Penas mais duras para fraudes digitais no Brasil',
    resumo: 'Entenda como a Lei 14.155 agravou as penas para golpes digitais e o que isso muda para as vítimas.',
    categoria: 'Direito Digital',
    tags: ['Lei 14.155', 'Código Penal', 'Fraude'],
    tempoLeitura: 8,
    publishedAt: '2025-02-25',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O que mudou com a Lei 14.155/2021

A **Lei 14.155, de 27 de maio de 2021**, alterou o Código Penal para tornar mais graves os crimes de invasão de dispositivo, furto e estelionato cometidos de forma eletrônica ou pela internet.

## Principais mudanças

### Invasão de dispositivo (Art. 154-A)
- **Antes**: detenção de 3 meses a 1 ano
- **Depois**: reclusão de 1 a 4 anos + multa
- Se causar prejuízo econômico: pena aumentada de 1/3 a 2/3

### Furto mediante fraude eletrônica (Art. 155, §4º-B)
- **Pena**: reclusão de 4 a 8 anos + multa
- Inclui uso de programa malicioso, engenharia social ou qualquer meio fraudulento

### Estelionato digital (Art. 171, §2º-A)
- **Pena**: reclusão de 4 a 8 anos + multa
- Quando praticado por meio de redes sociais, contatos telefônicos ou envio de mensagens eletrônicas

### Agravantes
- Pena aumentada de 1/3 a 2/3 se o crime for contra **idoso ou vulnerável**
- Se praticado usando **servidor fora do Brasil**: pena aumentada de 1/3 a 2/3

## O que isso muda para as vítimas

1. **B.O. mais eficaz**: a tipificação correta (art. 171, §2º-A) pode acelerar investigações
2. **Maior pressão sobre golpistas**: penas de até 8 anos de reclusão
3. **Proteção especial para idosos**: agravantes específicas
4. **Competência federal**: quando o golpe usar servidor no exterior

## Como usar a seu favor

Ao registrar o B.O. e a notificação ao banco, cite expressamente a Lei 14.155/2021 e os artigos aplicáveis. Isso demonstra conhecimento dos seus direitos e pode acelerar o processo.
    `,
  },
  'juizado-especial-civel-golpe-digital': {
    titulo: 'Juizado Especial Cível: como processar o banco após golpe digital',
    resumo: 'Guia completo para entrar com ação no JEC contra bancos que se recusam a devolver valores de golpe. Gratuito até 20 salários mínimos.',
    categoria: 'Direito Digital',
    tags: ['JEC', 'Juizado', 'Ação Judicial'],
    tempoLeitura: 10,
    publishedAt: '2025-03-01',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Quando procurar o Juizado Especial

O Juizado Especial Cível (JEC) é a última instância administrativa/judicial para casos onde o banco negou o MED, não respondeu às reclamações no BACEN e Procon, ou se recusa a devolver os valores.

## Vantagens do JEC

- **Gratuito** para causas de até 20 salários mínimos (não precisa pagar custas)
- **Não precisa de advogado** para causas de até 20 salários mínimos
- **Rápido**: audiência geralmente em 30 a 90 dias
- **Simples**: petição pode ser escrita de forma simples, sem termos jurídicos
- **Presencial ou online**: muitos JECs aceitam petição digital

## Valores

- **Até 20 salários mínimos**: não precisa de advogado, sem custas
- **De 20 a 40 salários mínimos**: precisa de advogado, com custas reduzidas
- **Acima de 40 salários mínimos**: Justiça Comum (precisa de advogado)

## O que pedir na ação

1. **Devolução dos valores** perdidos no golpe (dano material)
2. **Indenização por dano moral**: R$5.000 a R$20.000 é o padrão
3. **Tutela de urgência**: bloqueio dos valores na conta do golpista

## Documentos necessários

- B.O. registrado
- Comprovantes de transferência
- Protocolo do MED e resposta do banco
- Protocolo de reclamação no BACEN
- Protocolo de reclamação no Procon
- Notificação formal enviada ao banco
- Prints de conversas com o golpista

## Fundamentação legal

Cite na sua petição:
- **Súmula 479 do STJ** (responsabilidade do banco)
- **CDC, art. 14** (responsabilidade objetiva)
- **Resolução BCB 93/2021** (MED)
- **Lei 14.155/2021** (fraude eletrônica)

## Taxa de sucesso

Segundo levantamentos de escritórios especializados, a taxa de sucesso em ações contra bancos por golpes digitais no JEC é de aproximadamente 70-80%, especialmente quando a vítima esgotou todas as vias administrativas primeiro.
    `,
  },
  'golpe-marketplace-olx-mercado-livre': {
    titulo: 'Golpe em marketplace: OLX, Mercado Livre e Facebook — como se proteger',
    resumo: 'Os golpes mais comuns em plataformas de compra e venda e como evitar perder dinheiro em transações online.',
    categoria: 'Golpes',
    tags: ['OLX', 'Mercado Livre', 'Marketplace'],
    tempoLeitura: 7,
    publishedAt: '2025-03-05',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Os golpes mais comuns em marketplaces

### Falso vendedor
Anuncia produto a preço atrativo, recebe o Pix e desaparece. O perfil geralmente é recente e sem avaliações.

### Falso comprador
Envia comprovante falso de Pix e pede para retirar o produto antes da confirmação do pagamento.

### Golpe do frete
Vendedor pede pagamento de "frete" fora da plataforma. A vítima paga e o produto nunca é enviado.

### Phishing por link
Enviam link falso dizendo ser "o anúncio atualizado" ou "comprovante de pagamento" que leva a site clonado.

### Golpe da troca
Na entrega presencial, o golpista troca o produto por um defeituoso ou falso no momento da transação.

## Como se proteger

- **Nunca negocie fora da plataforma** (chat externo, WhatsApp)
- **Use o sistema de pagamento** da plataforma (Mercado Pago, OLX Pay)
- **Verifique a reputação** do vendedor/comprador antes de negociar
- **Confirme o recebimento** do Pix no extrato antes de entregar o produto
- **Em entregas presenciais**: vá acompanhado e verifique o produto na hora
- **Desconfie de preços** muito abaixo do mercado

## Se caiu no golpe

1. Denuncie o anúncio e o perfil na plataforma
2. Registre B.O. com prints do anúncio e conversas
3. Se pagou via Pix: acione o MED em até 72h
4. Registre no Procon e BACEN
    `,
  },
  'como-recuperar-dinheiro-golpe-pix-2025': {
    titulo: 'Como recuperar dinheiro de golpe Pix em 2025: guia atualizado',
    resumo: 'Passo a passo atualizado para 2025 sobre como maximizar suas chances de recuperar valores perdidos em golpes via Pix.',
    categoria: 'Pix & MED',
    tags: ['Pix', 'MED', 'Recuperação', '2025'],
    tempoLeitura: 12,
    publishedAt: '2025-03-08',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O cenário em 2025

O Pix se tornou o meio de pagamento mais usado no Brasil, com mais de 150 milhões de usuários. Junto com a popularização, os golpes evoluíram — mas os mecanismos de defesa também.

## Novidades em 2025

### MED 2.0
O Banco Central anunciou melhorias no Mecanismo Especial de Devolução para 2025:
- Rastreamento de valores em múltiplas contas (cascateamento)
- Prazo estendido para análise em casos complexos
- Maior integração entre bancos para bloqueio rápido

### Limites Pix
Desde 2024, os limites noturnos são obrigatórios e os bancos devem oferecer personalização de limites por tipo de transação.

## O passo a passo atualizado

### Primeiras 2 horas (CRÍTICO)
1. Ligue para o SAC do banco e peça o MED
2. Anote o protocolo
3. Bloqueie a chave Pix usada na fraude

### Primeiras 24 horas
4. Registre B.O. na delegacia eletrônica
5. Gere a contestação MED formal com nossa ferramenta
6. Envie notificação formal ao banco

### Primeira semana
7. Registre reclamação no Banco Central (Meu BC)
8. Registre no Procon do seu estado
9. Acompanhe o andamento do MED

### Se o banco negar
10. Recorra à Ouvidoria do banco (prazo de resposta: 10 dias)
11. Acione Procon para mediação
12. Avalie ação no Juizado Especial Cível

## Estatísticas de recuperação

- MED acionado em até 72h: **65% de sucesso**
- MED acionado em até 7 dias: **45% de sucesso**
- MED acionado após 30 dias: **menos de 20%**
- Ação judicial (JEC): **70-80% favorável ao consumidor**

## Documentos essenciais

Use nossas ferramentas para gerar todos os documentos necessários em minutos, com fundamentação legal atualizada.
    `,
  },
  'golpe-qr-code-pix-como-funciona': {
    titulo: 'Golpe do QR Code Pix: como funciona e como evitar',
    resumo: 'Entenda como golpistas substituem QR Codes legítimos para redirecionar pagamentos Pix.',
    categoria: 'Pix & MED',
    tags: ['QR Code', 'Pix', 'Fraude'],
    tempoLeitura: 5,
    publishedAt: '2025-03-10',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Como funciona o golpe

O golpista substitui QR Codes legítimos por códigos que apontam para sua própria conta. Isso pode acontecer em:

- **Estabelecimentos físicos**: adesivo com QR Code falso colado sobre o original
- **Boletos e cobranças**: QR Code adulterado no documento
- **Sites e e-mails**: QR Code que leva a página de pagamento falsa
- **Redes sociais**: QR Code em lives ou posts prometendo promoções

## Casos reais

Restaurantes e lojas têm sido alvo frequente. O golpista visita o estabelecimento e cola um adesivo com QR Code falso sobre o original. Clientes pagam achando que estão pagando a loja.

## Como se proteger

1. **Confira o nome do destinatário** antes de confirmar o Pix
2. **Verifique se o QR Code não é um adesivo** colado por cima
3. **Desconfie de QR Codes** em cartazes improvisados ou mal impressos
4. **Prefira digitar a chave Pix** manualmente quando possível
5. **Em caso de dúvida**, peça ao estabelecimento para confirmar os dados

## Se pagou para QR Code falso

Se o Pix foi para pessoa física quando deveria ser para a empresa, acione o MED imediatamente pelo banco. O estabelecimento pode ser responsabilizado se não monitorava seus QR Codes.
    `,
  },
  'seguro-celular-vale-a-pena': {
    titulo: 'Seguro de celular vale a pena? O que cobre em caso de roubo e golpe',
    resumo: 'Análise completa dos seguros de celular disponíveis no Brasil e o que realmente cobrem em caso de roubo ou fraude digital.',
    categoria: 'Prevenção',
    tags: ['Seguro', 'Celular', 'Roubo'],
    tempoLeitura: 8,
    publishedAt: '2025-03-12',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O que o seguro de celular cobre

A maioria dos seguros de celular no Brasil cobre:
- **Roubo e furto qualificado**: substituição do aparelho
- **Dano acidental**: tela quebrada, queda na água
- **Defeitos fora da garantia**: problemas técnicos

## O que geralmente NÃO cobre

- **Transações fraudulentas**: Pix feito por golpista após roubo
- **Golpes de engenharia social**: você forneceu dados voluntariamente
- **Perda**: esqueceu o celular em algum lugar
- **Furto simples**: sem violência ou arrombamento

## Golpes digitais após roubo de celular

O maior prejuízo de um celular roubado hoje não é o aparelho — são as transações financeiras. Golpistas:

1. Acessam apps de banco com o celular desbloqueado
2. Fazem Pix para contas laranjas
3. Contratam empréstimos
4. Alteram senhas de e-mail e redes sociais

## Proteção além do seguro

- **Ative o bloqueio de tela** com biometria e PIN forte
- **Use pasta segura** para apps de banco
- **Configure limites de Pix** baixos para transações via celular
- **Tenha o IMEI anotado** em local seguro para bloqueio rápido
- **Ative o Find My Device** (Android) ou Find My iPhone (iOS)

## Vale a pena?

Para quem tem celular acima de R$2.000 e usa apps bancários, o seguro pode valer. Mas a melhor proteção é a prevenção: limites de Pix baixos, biometria e ação rápida em caso de roubo.
    `,
  },
  'direitos-consumidor-banco-digital': {
    titulo: 'Seus direitos como cliente de banco digital: o que a lei garante',
    resumo: 'Bancos digitais têm as mesmas obrigações que tradicionais. Conheça seus direitos como consumidor de serviços financeiros digitais.',
    categoria: 'Direito Digital',
    tags: ['Banco Digital', 'CDC', 'BACEN'],
    tempoLeitura: 9,
    publishedAt: '2025-03-15',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Bancos digitais e a lei

Nubank, Inter, C6, PicPay e outros bancos digitais estão sujeitos às **mesmas leis e regulamentações** que os bancos tradicionais. Isso inclui:

- Código de Defesa do Consumidor (CDC)
- Resoluções do Banco Central
- Lei Geral de Proteção de Dados (LGPD)
- Normas do Conselho Monetário Nacional

## Seus direitos principais

### Atendimento
- Direito a SAC gratuito e acessível
- Ouvidoria com prazo de resposta de 10 dias úteis
- Atendimento presencial se necessário (nem todos oferecem)

### Segurança
- O banco deve manter sistemas de segurança adequados
- Responsabilidade objetiva por falhas de segurança (CDC, art. 14)
- Monitoramento de transações atípicas

### Transparência
- Taxas e tarifas devem ser claras e informadas previamente
- Contratos em linguagem acessível
- Extrato detalhado de todas as transações

### Contestação
- Direito de contestar qualquer transação não reconhecida
- Prazo para resposta: 5 dias úteis (compras em cartão)
- MED para transações Pix (Resolução BCB 93/2021)

## Problemas mais comuns

1. **Conta bloqueada sem aviso**: bancos digitais frequentemente bloqueiam contas por "análise de segurança"
2. **Atendimento difícil**: chatbots que não resolvem, falta de telefone
3. **MED negado**: banco alega que a vítima "autorizou" a transação
4. **Cobrança indevida**: assinaturas ou tarifas não contratadas

## Como reclamar

1. SAC do banco (primeira tentativa)
2. Ouvidoria (se SAC não resolver)
3. Banco Central — Meu BC (reclamação formal)
4. Procon (mediação)
5. Consumidor.gov.br (plataforma federal)
6. Juizado Especial Cível (última instância)
    `,
  },
  'golpe-falso-leilao-sites-fraudulentos': {
    titulo: 'Golpe do falso leilão online: sites que imitam a Receita Federal e DETRAN',
    resumo: 'Como identificar sites de leilão fraudulentos que se passam por órgãos oficiais para roubar dinheiro de compradores.',
    categoria: 'Golpes',
    tags: ['Leilão', 'Site Falso', 'Receita Federal'],
    tempoLeitura: 6,
    publishedAt: '2025-03-18',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Como funciona o golpe

Golpistas criam sites que imitam leilões oficiais da Receita Federal, DETRAN ou Justiça. Anunciam carros, eletrônicos e imóveis a preços muito abaixo do mercado. A vítima faz o "lance", paga via Pix e nunca recebe o produto.

## Sinais de alerta

- **Preços absurdamente baixos**: carro de R$60.000 por R$15.000
- **Site com erros**: português incorreto, layout amador
- **Pagamento via Pix para pessoa física**: leilões oficiais usam GRU ou depósito judicial
- **URL suspeita**: leilao-receita-federal.com em vez de gov.br
- **Urgência**: "últimas horas", "apenas 3 unidades"

## Como verificar se é legítimo

1. Leilões da Receita Federal estão em **receita.economia.gov.br**
2. Leilões judiciais estão nos sites dos **tribunais** (TJ, TRF)
3. O leiloeiro deve ter registro na **JUCERJA** ou junta comercial do estado
4. Verifique o CNPJ do leiloeiro no site da Receita Federal
5. Leilões oficiais **nunca** pedem pagamento via Pix para pessoa física

## Se caiu no golpe

1. Registre B.O. imediatamente com prints do site e comprovante
2. Acione o MED se pagou via Pix
3. Denuncie o site em SaferNet (safernet.org.br)
4. Registre no Procon e Consumidor.gov.br
    `,
  },
  'como-bloquear-celular-roubado-imei': {
    titulo: 'Como bloquear celular roubado: IMEI, chip e apps bancários — passo a passo',
    resumo: 'Guia urgente para bloquear IMEI, chip SIM e aplicativos bancários após roubo de celular em até 5 minutos.',
    categoria: 'Tutoriais',
    tags: ['IMEI', 'Roubo', 'Bloqueio', 'Celular'],
    tempoLeitura: 6,
    publishedAt: '2025-03-20',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Aja nos primeiros 5 minutos

Após roubo de celular, cada minuto conta. Golpistas começam a acessar apps bancários em segundos.

## Passo 1: Ligue para o banco (IMEDIATO)

Ligue para a central do banco e peça:
- Bloqueio temporário da conta
- Bloqueio de todos os dispositivos móveis
- Redução do limite de Pix para zero

## Passo 2: Bloqueie o chip (IMEDIATO)

Ligue para a operadora e peça o bloqueio do SIM:
- **Vivo**: 1058
- **Claro**: 1052
- **TIM**: 1056
- **Oi**: 1057

## Passo 3: Bloqueie o IMEI

O IMEI (número do celular) pode ser bloqueado para que o aparelho não funcione com nenhum chip:
- Registre o B.O. com o número IMEI
- Ligue para a operadora com o número do B.O.
- A operadora bloqueia o IMEI em até 24h

**Como descobrir seu IMEI**: disque *#06# no celular, ou verifique na caixa do aparelho.

## Passo 4: Acesse remotamente

- **Android**: acessar android.com/find e apagar dados remotamente
- **iPhone**: acessar icloud.com/find e ativar "Apagar iPhone"

## Passo 5: Desconecte contas

Acesse por outro dispositivo e desconecte sessões:
- WhatsApp Web: desconectar dispositivos
- Google: Minha Conta > Segurança > Gerenciar dispositivos
- Redes sociais: altere senhas e desconecte sessões

## Passo 6: Registre o B.O.

O B.O. com o IMEI é necessário para o bloqueio oficial e para qualquer contestação bancária posterior.

## Dica preventiva

Anote seu IMEI AGORA e guarde em local seguro. Disque *#06# no celular.
    `,
  },
  'engenharia-social-o-que-e-como-se-proteger': {
    titulo: 'Engenharia social: o que é e por que é a base de 90% dos golpes digitais',
    resumo: 'Entenda a técnica usada em quase todos os golpes digitais e aprenda a reconhecer as táticas de manipulação.',
    categoria: 'Prevenção',
    tags: ['Engenharia Social', 'Psicologia', 'Prevenção'],
    tempoLeitura: 9,
    publishedAt: '2025-03-22',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O que é engenharia social

Engenharia social é a técnica de manipulação psicológica usada para enganar pessoas e fazer com que revelem dados confidenciais ou tomem ações prejudiciais. Não é um ataque técnico — é um ataque à mente humana.

## As 6 armas da persuasão usadas por golpistas

### 1. Urgência
"Sua conta será bloqueada em 30 minutos se não confirmar seus dados."

### 2. Autoridade
"Aqui é do departamento de segurança do Banco do Brasil."

### 3. Medo
"Detectamos uma compra de R$5.000 no seu cartão. Foi você?"

### 4. Reciprocidade
"Estamos devolvendo R$500 que foram cobrados a mais. Confirme seus dados."

### 5. Escassez
"Últimas 3 vagas para o curso. Garanta a sua agora."

### 6. Prova social
"Mais de 10.000 pessoas já investiram. Você vai ficar de fora?"

## Como se defender

- **Pare e pense**: golpistas criam urgência para que você não pense
- **Verifique por outro canal**: se o "banco" ligou, desligue e ligue para o número oficial
- **Nunca compartilhe**: senha, token, código SMS, CVV — ninguém legítimo pede isso
- **Desconfie de ofertas**: se parece bom demais, provavelmente é golpe
- **Fale com alguém**: antes de transferir dinheiro, conte para um familiar ou amigo

## Estatísticas

- 90% dos golpes digitais usam engenharia social como vetor principal
- O Brasil é o 2º país com mais ataques de phishing no mundo
- Prejuízos com golpes digitais no Brasil: R$2,5 bilhões em 2023
    `,
  },
  'conta-laranja-pix-consequencias-legais': {
    titulo: 'Conta laranja no Pix: o que é e quais as consequências legais',
    resumo: 'Emprestou sua conta para receber Pix? Entenda as consequências criminais de ser "laranja" em golpes digitais.',
    categoria: 'Direito Digital',
    tags: ['Conta Laranja', 'Crime', 'Pix'],
    tempoLeitura: 7,
    publishedAt: '2025-03-25',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O que é conta laranja

Conta laranja é uma conta bancária usada por golpistas para receber e movimentar dinheiro de fraudes. O titular da conta — o "laranja" — pode ou não saber que está participando de um crime.

## Como as pessoas se tornam laranjas

### Voluntariamente
- Oferta de dinheiro fácil: "Receba R$500 só por emprestar sua conta por 1 dia"
- Redes sociais: anúncios no Instagram e Telegram oferecendo "renda extra"
- Pressão de conhecidos: amigo ou parente pede para usar a conta "rapidinho"

### Involuntariamente
- Dados roubados usados para abrir conta digital falsa em seu nome
- Golpe de emprego que pede "conta para receber pagamentos"
- Phishing que captura dados e permite abertura de conta

## Consequências legais

### Estelionato (Art. 171, CP)
Emprestar conscientemente a conta para receber valores de golpe configura coautoria em estelionato. Pena: 1 a 5 anos de reclusão + multa.

### Lavagem de dinheiro (Lei 9.613/1998)
Movimentar dinheiro de origem criminosa pode configurar lavagem. Pena: 3 a 10 anos de reclusão + multa.

### Associação criminosa (Art. 288, CP)
Se houver participação recorrente, pode configurar organização criminosa. Pena: 1 a 3 anos (ou mais, se armada).

## E se eu não sabia?

Mesmo não sabendo, o titular da conta pode ser responsabilizado. Os bancos e a polícia investigam movimentações atípicas e o ônus de provar que não participou recai sobre o titular.

## Como se proteger

- **NUNCA empreste sua conta** bancária para terceiros
- **Desconfie de ofertas** de dinheiro fácil
- **Monitore suas contas** regularmente
- **Se descobrir conta** aberta em seu nome: registre B.O. e conteste no banco
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

  const articleUrl = `https://defesapix.com.br/blog/${slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artigo.titulo,
    description: artigo.resumo,
    author: { '@type': 'Organization', name: 'DefesaPix', url: 'https://defesapix.com.br' },
    publisher: {
      '@type': 'Organization',
      name: 'DefesaPix',
      logo: { '@type': 'ImageObject', url: 'https://defesapix.com.br/favicon.svg' },
    },
    datePublished: artigo.publishedAt,
    dateModified: artigo.publishedAt,
    keywords: artigo.tags.join(', '),
    url: articleUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
    image: 'https://defesapix.com.br/opengraph-image',
    inLanguage: 'pt-BR',
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
