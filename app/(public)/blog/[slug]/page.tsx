import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, ArrowLeft, Tag, Share2, FileText, BookOpen } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const revalidate = 3600;

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
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O que é o MED?

O **Mecanismo Especial de Devolução (MED)** foi criado pelo Banco Central do Brasil pela **Resolução BCB nº 93, de 23 de novembro de 2021**, e representa um avanço significativo na proteção de usuários do sistema de pagamentos instantâneos Pix.

O MED é um processo que permite ao pagador solicitar a devolução de valores transferidos via Pix em dois casos específicos:

1. **Fraude** (golpe, estelionato, phishing, etc.)
2. **Operacional** (erro do usuário ao inserir dados, falha técnica)

## Qual e o prazo para acionar o MED?

Voce pode solicitar o MED em ate **80 dias apos a data da transacao**. No entanto, a eficacia do MED diminui com o tempo, pois os golpistas tendem a mover os valores rapidamente.

**Por isso, o ideal e acionar o MED em ate 72 horas apos o golpe.**

## Taxa de sucesso do MED

Segundo dados do Banco Central, o MED tem conseguido recuperar valores em aproximadamente 65% dos casos onde e acionado dentro do prazo adequado. Esse percentual cai para menos de 30% quando o MED e solicitado apos 30 dias do golpe.

## Precisa resolver agora?

Nao perca tempo tentando montar os documentos sozinho — erros podem comprometer sua recuperacao. No Kit Completo da DefesaPix voce recebe o passo a passo personalizado + 5 documentos juridicos prontos por R$47. [Acesse agora](https://defesapix.com.br/ferramentas/pacote-completo).
    `,
  },
  'banco-responsavel-golpe-digital-stj': {
    titulo: 'O banco é responsável pelos golpes digitais? O que diz o STJ',
    resumo: 'Análise da jurisprudência do STJ sobre responsabilidade dos bancos em casos de fraude digital. Quando você pode processar o banco?',
    categoria: 'Direito Digital',
    tags: ['STJ', 'Banco', 'Responsabilidade', 'CDC'],
    tempoLeitura: 12,
    publishedAt: '2025-02-01',
    autorNome: 'Equipe DefesaPix',
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

## Caiu no golpe do WhatsApp?

Se voce ja foi vitima, o tempo e critico — especialmente se houve transferencia via Pix. Existem varios orgaos e documentos envolvidos na recuperacao, e cada um tem prazos e exigencias especificas.

## Precisa resolver agora?

Nao perca tempo tentando montar os documentos sozinho — erros podem comprometer sua recuperacao. No Kit Completo da DefesaPix voce recebe o passo a passo personalizado + 5 documentos juridicos prontos por R$47. [Acesse agora](https://defesapix.com.br/ferramentas/pacote-completo).
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

## Caiu em golpe de investimento?

A recuperacao de valores perdidos em golpes de investimento e possivel, mas depende da rapidez da acao e dos documentos corretos. O processo envolve varios orgaos — CVM, Policia Federal, Banco Central, Procon — e cada um exige documentacao especifica com fundamentacao legal.

Quanto mais rapido voce age, maiores as chances. Transferencias via Pix recentes tem taxa de recuperacao significativamente maior do que casos antigos.

## Precisa resolver agora?

Nao perca tempo tentando montar os documentos sozinho — erros podem comprometer sua recuperacao. No Kit Completo da DefesaPix voce recebe o passo a passo personalizado + 5 documentos juridicos prontos por R$47. [Acesse agora](https://defesapix.com.br/ferramentas/pacote-completo).

## Como verificar se um investimento é legítimo

- Consulte se a empresa tem **registro na CVM**
- Verifique o **CNPJ** — empresas legítimas são transparentes
- Pesquise **reclamações** em plataformas de avaliação
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

## Precisa resolver agora?

Nao perca tempo tentando montar os documentos sozinho — erros podem comprometer sua recuperacao. No Kit Completo da DefesaPix voce recebe o passo a passo personalizado + 5 documentos juridicos prontos por R$47. [Acesse agora](https://defesapix.com.br/ferramentas/pacote-completo).

## O B.O. sozinho não resolve — você precisa de mais documentos

O Boletim de Ocorrência é apenas o primeiro passo. Para maximizar suas chances de recuperação, você também precisa de:

- **Contestação MED** — documento formal para acionar o Mecanismo Especial de Devolução
- **Notificação Bancária** — notificação extrajudicial ao banco com fundamentação no CDC
- **Reclamação BACEN** — pressão regulatória no Banco Central
- **Reclamação Procon** — mediação oficial do órgão de defesa do consumidor

Cada um desses documentos tem exigências específicas de formato, fundamentação legal e linguagem. **Documentos mal redigidos são rejeitados ou ignorados pelos bancos.**

## Gere todos os documentos em 15 minutos

Na **DefesaPix**, você preenche seus dados uma vez e recebe os 5 documentos prontos para protocolar — B.O., Contestação MED, Notificação Bancária, Reclamação BACEN e Reclamação Procon. Tudo por **R$47**, sem precisar de advogado. Acesse **defesapix.com.br** agora.
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

### Por que e eficaz
O Banco Central monitora ativamente as reclamacoes e usa esses dados para fiscalizar instituicoes financeiras, aplicar multas e sancoes, e publicar o ranking de reclamacoes (que afeta a reputacao do banco). O banco tem **10 dias uteis** para responder.

## Reclamacao no Procon

### Quando usar
- O banco se recusa a devolver valores indevidamente
- Houve **falha na prestacao do servico** bancario
- Voce quer uma **mediacao** entre voce e o banco
- Voce precisa de um protocolo adicional para acao judicial

### Base legal
O Procon atua com base no **Codigo de Defesa do Consumidor (CDC)**:
- **Art. 14**: responsabilidade objetiva do fornecedor por falhas no servico
- **Art. 6o, VI**: direito a prevencao e reparacao de danos
- **Art. 39**: praticas abusivas vedadas

## Por que usar ambos ao mesmo tempo?

Cada protocolo gerado (MED, B.O., BACEN, Procon) fortalece seu caso. Em uma eventual acao judicial, o juiz vera que voce esgotou todas as vias administrativas antes de recorrer a Justica — isso aumenta significativamente suas chances de ganhar.

Porem, preencher reclamacoes no BACEN, Procon e banco com a fundamentacao legal correta pode levar horas — e erros de redacao fazem o banco ignorar sua solicitacao.

## Precisa resolver agora?

Nao perca tempo tentando montar os documentos sozinho — erros podem comprometer sua recuperacao. No Kit Completo da DefesaPix voce recebe o passo a passo personalizado + 5 documentos juridicos prontos por R$47. [Acesse agora](https://defesapix.com.br/ferramentas/pacote-completo).
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

## Seu familiar já caiu? Aja rápido

Se o golpe já aconteceu, o tempo é crítico. Existem prazos legais curtos e documentos específicos que precisam ser protocolados corretamente — um erro pode comprometer toda a recuperação.

Na **DefesaPix**, você gera os 5 documentos personalizados em 15 minutos por **R$47** — sem precisar de advogado. Ideal para ajudar seu familiar a resolver rapidamente. Acesse **defesapix.com.br**.
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

## Caiu no golpe do falso funcionário? Não perca tempo

Se você já transferiu dinheiro ou deu acesso ao golpista, precisa agir nas próximas horas. O **prazo do MED é de 72 horas** e cada documento (B.O., Contestação MED, Notificação Bancária) precisa estar correto para o banco aceitar.

Na **DefesaPix**, gere todos os 5 documentos em 15 minutos por **R$47**. Documentos personalizados com fundamentação legal, prontos para protocolar. Acesse **defesapix.com.br**.
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

Se você entregou um produto baseado em comprovante falso ou teve Pix reverso acionado contra você, o tempo é crítico. Existem documentos específicos e prazos legais que precisam ser seguidos corretamente para recuperar o valor.

## Precisa dos documentos corretos para contestar?

Registrar o B.O. é apenas o primeiro passo. Para recuperar o valor, você precisa de Contestação MED, Notificação Bancária e reclamações no BACEN e Procon — todos com fundamentação legal correta.

Na **DefesaPix**, gere os 5 documentos personalizados em 15 minutos por **R$47**. Acesse **defesapix.com.br**.
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

O Juizado Especial Cível (JEC) é a última instância para casos onde o banco negou o MED, não respondeu às reclamações no BACEN e Procon, ou se recusa a devolver os valores.

## Vantagens do JEC

- **Gratuito** para causas de até 20 salários mínimos (não precisa pagar custas)
- **Não precisa de advogado** para causas de até 20 salários mínimos
- **Rápido**: audiência geralmente em 30 a 90 dias

## O que você pode conseguir

- **Devolução dos valores** perdidos no golpe (dano material)
- **Indenização por dano moral**: R$5.000 a R$20.000 é o padrão
- **Tutela de urgência**: bloqueio dos valores na conta do golpista

## Taxa de sucesso

Segundo levantamentos de escritórios especializados, a taxa de sucesso em ações contra bancos por golpes digitais no JEC é de aproximadamente **70-80%**, especialmente quando a vítima esgotou todas as vias administrativas primeiro — e é exatamente por isso que os documentos certos fazem toda a diferença.

## Como entrar com a ação sem advogado?

Para processar o banco no Juizado Especial, você precisa de uma petição inicial com fundamentação legal correta, além de todos os protocolos administrativos anteriores (BO, MED, BACEN, Procon, Notificação Bancária). Erros na petição ou documentação incompleta resultam em ação indeferida.

No **Kit Premium da DefesaPix** por **R$97**, você recebe a **Petição Inicial para o Juizado Especial Cível** pronta, com fundamentação legal completa (Súmula 479 STJ, CDC art. 14, Lei 14.155/2021), além dos 5 documentos do Kit Completo. Tudo personalizado para o seu caso. Acesse **defesapix.com.br**.
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

Se você perdeu dinheiro em marketplace, existem prazos legais e documentos jurídicos específicos que precisam ser protocolados corretamente para maximizar suas chances de recuperação. Quanto mais rápido você age, maiores as chances.

Na **DefesaPix**, gere os 5 documentos personalizados em 15 minutos por **R$47**. Acesse **defesapix.com.br**.
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

## A recuperacao e possivel — mas o tempo e critico

Os dados mostram que quanto mais rapido voce age, maiores as chances. Quem aciona os mecanismos corretos nas primeiras 72 horas tem chances significativamente maiores de recuperar o valor. Apos 30 dias, as chances caem drasticamente.

O processo envolve varios orgaos (banco, Banco Central, Procon, delegacia) e cada um exige documentos especificos com fundamentacao legal correta. Documentos mal redigidos sao rejeitados ou ignorados.

## Precisa resolver agora?

Nao perca tempo tentando montar os documentos sozinho — erros podem comprometer sua recuperacao. No Kit Completo da DefesaPix voce recebe o passo a passo personalizado + 5 documentos juridicos prontos por R$47. [Acesse agora](https://defesapix.com.br/ferramentas/pacote-completo).
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

Existem varios canais de reclamacao — SAC, Ouvidoria, Banco Central, Procon, Juizado — mas cada um tem prazos, exigencias e fundamentacao legal especifica. Documentos mal redigidos sao ignorados.

Na **DefesaPix**, gere os 5 documentos personalizados (incluindo Reclamacao BACEN e Procon) em 15 minutos por **R$47**. Acesse **defesapix.com.br**.
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

- Leilões oficiais estão em sites com domínio **.gov.br**
- O leiloeiro deve ter registro em junta comercial
- Leilões oficiais **nunca** pedem pagamento via Pix para pessoa física
- Preços absurdamente baixos são o principal sinal de golpe

## Se caiu no golpe

Se você perdeu dinheiro em falso leilão, existem prazos legais e documentos específicos que precisam ser protocolados corretamente. Quanto mais rápido agir, maiores as chances de recuperação.

Na **DefesaPix**, gere os 5 documentos personalizados em 15 minutos por **R$47**. Acesse **defesapix.com.br**.
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

## O que pode acontecer apos o roubo

O maior prejuizo de um celular roubado hoje nao e o aparelho em si — sao as transacoes financeiras. Golpistas conseguem acessar apps de banco, fazer transferencias Pix para contas laranjas, contratar emprestimos e alterar senhas de e-mail e redes sociais em questao de minutos.

Por isso, agir rapidamente e fundamental. Voce precisa bloquear o chip, o IMEI, os apps bancarios e desconectar suas contas — tudo em uma sequencia especifica e com os documentos corretos.

## Dica preventiva

Anote seu IMEI e guarde em local seguro — você vai precisar dele em caso de roubo.

## Precisa resolver agora?

Nao perca tempo tentando montar os documentos sozinho — erros podem comprometer sua recuperacao. No Kit Completo da DefesaPix voce recebe o passo a passo personalizado + 5 documentos juridicos prontos por R$47. [Acesse agora](https://defesapix.com.br/ferramentas/pacote-completo).
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

## Já caiu em um golpe de engenharia social?

Se você foi manipulado e transferiu dinheiro, o tempo é essencial. O prazo do MED é de **72 horas** e os documentos precisam ter fundamentação legal correta para o banco aceitar a contestação.

Na **DefesaPix**, gere B.O., Contestação MED, Notificação Bancária, Reclamação BACEN e Procon em 15 minutos por **R$47**. Acesse **defesapix.com.br**.
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

## Sua conta foi usada como laranja sem seu conhecimento?

Se você descobriu que sua conta foi usada para receber valores de golpes, precisa agir imediatamente para se proteger criminalmente. Um B.O. bem redigido e uma notificação bancária com fundamentação legal são essenciais.

Na **DefesaPix**, gere os documentos necessários em 15 minutos por **R$47**. Proteja-se legalmente. Acesse **defesapix.com.br**.
    `,
  },
  'golpe-instagram-como-identificar-2026': {
    titulo: 'Golpe no Instagram em 2026: Como Identificar e O Que Fazer',
    resumo: 'Perfis falsos, promoções fraudulentas, lojas fake e golpe do investimento no Instagram. Saiba como identificar e proteger seu dinheiro.',
    categoria: 'Golpes',
    tags: ['Instagram', 'Golpe', 'Redes Sociais', '2026'],
    tempoLeitura: 7,
    publishedAt: '2026-03-15',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Golpes no Instagram explodiram em 2026

O Instagram se tornou o terreno favorito dos golpistas. Perfis clonados, lojas falsas, sorteios inexistentes e promessas de investimento multiplicam as vítimas todos os dias. Se você caiu em um golpe pelo Instagram, saiba que **não está sozinho** — e que existe um caminho para agir.

## Os golpes mais comuns no Instagram

### 1. Perfil clonado pedindo Pix
O golpista copia foto e nome de um amigo ou familiar e envia mensagem pedindo dinheiro urgente. A vítima, achando que está ajudando alguém próximo, transfere via Pix.

### 2. Loja falsa com preços irresistíveis
Perfis com milhares de seguidores (comprados), fotos profissionais de produtos e preços 70% abaixo do mercado. Após o pagamento, o produto nunca chega e o perfil desaparece.

### 3. Golpe do investimento
Stories de "renda extra", "robô do Pix", "multiplicador de dinheiro". Prometem retorno de 200-500% em dias. É pirâmide financeira — o dinheiro nunca volta.

### 4. Sorteio falso
Perfis que imitam grandes marcas anunciam sorteios. Para "participar", pedem dados pessoais, CPF ou até pagamento de "taxa de envio".

## Os sinais de que é golpe

- Preço muito abaixo do mercado
- Perfil criado recentemente
- Poucos posts mas muitos seguidores
- Só aceita Pix (sem cartão ou boleto)
- Pressão para decidir rápido ("últimas unidades!")
- Não tem CNPJ ou endereço verificável

## O que fazer se caiu no golpe

Você precisa agir rápido. O **MED (Mecanismo Especial de Devolução)** tem prazo de **72 horas** para ser acionado. Além disso, um Boletim de Ocorrência, notificação bancária e reclamações nos órgãos competentes são fundamentais.

Montar esses documentos sozinho pode levar dias e conter erros que comprometem sua chance de recuperação. Com o **Kit Completo da DefesaPix**, você gera os **5 documentos jurídicos necessários em 15 minutos por apenas R$47** — com linguagem profissional e citações legais corretas.

**Acesse agora: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**

Não sabe se tem chance de recuperar? Faça nosso **Diagnóstico Gratuito** em 30 segundos: [defesapix.com.br/ferramentas/diagnostico](https://defesapix.com.br/ferramentas/diagnostico)
    `,
  },
  'golpe-emprestimo-falso-como-evitar': {
    titulo: 'Golpe do Empréstimo Falso: Como Funciona e O Que Fazer',
    resumo: 'Pagou taxa antecipada para liberar empréstimo? Descubra como funciona o golpe do crédito falso e como recuperar seu dinheiro.',
    categoria: 'Golpes',
    tags: ['Empréstimo', 'Golpe', 'Crédito', 'Taxa Antecipada'],
    tempoLeitura: 6,
    publishedAt: '2026-03-14',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O golpe do empréstimo que mais cresce no Brasil

O golpe do empréstimo falso é um dos que mais crescem em 2026. Funciona assim: a vítima procura crédito (geralmente com nome negativado), encontra uma "financeira" que aprova na hora e cobra uma **taxa antecipada via Pix** para liberar o valor. Após o pagamento, o empréstimo nunca é liberado e o golpista desaparece.

## Como o golpe funciona

1. **Anúncio atrativo**: "Empréstimo para negativados, aprovação imediata, sem consulta ao SPC"
2. **Contato por WhatsApp**: Um "consultor" pede seus dados e simula uma análise
3. **Aprovação garantida**: Diz que seu crédito foi aprovado (valores altos, parcelas baixas)
4. **Taxa antecipada**: Pede Pix de R$200 a R$2.000 como "taxa de seguro", "taxa de abertura" ou "IOF antecipado"
5. **Sumiço**: Após o pagamento, bloqueiam seu número

## Sinais de alerta

- Empréstimo aprovado sem análise de crédito real
- Cobrança de qualquer valor ANTES da liberação do crédito
- Contato apenas por WhatsApp (sem agência física)
- CNPJ inexistente ou inválido
- Juros muito abaixo do mercado

**Importante**: Nenhuma instituição financeira legítima cobra taxa antecipada para liberar empréstimo. Isso é proibido pelo Banco Central.

## Caiu nesse golpe? Aja agora

O dinheiro enviado via Pix pode ser recuperado pelo **MED**, mas o prazo é de **apenas 72 horas**. Você precisa de um Boletim de Ocorrência detalhado, contestação MED e notificação bancária — tudo com fundamentação legal.

O **Kit Completo da DefesaPix** gera todos esses documentos automaticamente por **R$47**. Em 15 minutos você tem tudo pronto para agir.

**Gere seus documentos agora: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**
    `,
  },
  'como-saber-se-e-golpe-checklist': {
    titulo: 'Como Saber se é Golpe: Checklist Definitivo para 2026',
    resumo: 'Recebeu uma oferta suspeita? Use nosso checklist com 15 sinais para identificar golpes digitais antes de perder dinheiro.',
    categoria: 'Prevenção',
    tags: ['Prevenção', 'Checklist', 'Golpe', 'Dicas', '2026'],
    tempoLeitura: 5,
    publishedAt: '2026-03-13',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## 15 sinais de que você está prestes a cair num golpe

Antes de fazer qualquer Pix, transferência ou pagamento, passe pela lista abaixo. Se 3 ou mais itens se aplicam, **pare imediatamente**.

### Sinais financeiros
1. **Preço muito abaixo do mercado** (50-80% de desconto)
2. **Só aceita Pix** — sem opção de cartão ou boleto
3. **Cobram taxa antecipada** para liberar algo (empréstimo, prêmio, produto)
4. **Prometem retorno financeiro garantido** (investimento, robô do Pix)
5. **Pix para pessoa física** em vez de CNPJ da empresa

### Sinais de comunicação
6. **Urgência extrema** ("só hoje", "últimas vagas", "expira em 1 hora")
7. **Contato apenas por WhatsApp** ou Telegram
8. **Português com erros** ou linguagem genérica
9. **Pedem dados sensíveis** (senha, código SMS, token)
10. **Link com domínio estranho** (letras trocadas, .xyz, .top)

### Sinais de identidade
11. **Perfil/site criado recentemente**
12. **CNPJ inexistente** ou de outra empresa quando consultado
13. **Sem endereço físico** verificável
14. **Avaliações fake** (todas 5 estrelas, textos genéricos)
15. **Se passam por banco, governo ou marca** famosa

## Já caiu? Não espere

Se você já transferiu dinheiro e se deu conta de que é golpe, o tempo é seu maior aliado. O MED tem prazo de **72 horas** e cada minuto que passa diminui sua chance de recuperação.

O **Kit Completo da DefesaPix** gera todos os documentos necessários (BO, MED, notificações) em **15 minutos por R$47**. Sem advogado, sem complicação.

**Aja agora: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**
    `,
  },
  'golpe-tinder-romance-online': {
    titulo: 'Golpe do Tinder e Apps de Relacionamento: Como Se Proteger',
    resumo: 'Conheceu alguém online que pediu dinheiro? Entenda como funciona o golpe do romance digital e o que fazer se for vítima.',
    categoria: 'Golpes',
    tags: ['Tinder', 'Romance', 'Golpe', 'App de Namoro'],
    tempoLeitura: 7,
    publishedAt: '2026-03-12',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O golpe do amor que custa caro

O golpe do romance é um dos mais devastadores — financeira e emocionalmente. Funciona em apps como Tinder, Bumble, Happn e até Instagram. O golpista cria um perfil atraente, desenvolve um relacionamento ao longo de semanas ou meses, e começa a pedir dinheiro.

## Como funciona

1. **Perfil perfeito**: Fotos atraentes (roubadas da internet), profissão de prestígio (médico, militar, engenheiro no exterior)
2. **Conexão emocional**: Semanas de conversa diária, mensagens carinhosas, planos futuros juntos
3. **A emergência**: Surge um problema: doença, acidente, conta bloqueada, passagem para "finalmente se encontrarem"
4. **O pedido**: "Preciso de ajuda urgente, vou devolver assim que puder"
5. **Escalada**: Os pedidos aumentam. A vítima, já emocionalmente envolvida, continua enviando dinheiro
6. **O sumiço**: Eventualmente o golpista desaparece ou inventa outra emergência

## Valores perdidos

Vítimas de golpe do romance no Brasil perdem em média **R$15.000 a R$50.000** ao longo de meses. Algumas perdem economias de uma vida inteira.

## Sinais de alerta

- Nunca aceita videochamada (ou inventa desculpas)
- Sempre tem uma "emergência" que requer Pix
- Relacionamento evolui muito rápido emocionalmente
- Mora "no exterior" ou "viaja muito a trabalho"
- Perfil com poucas fotos e sem amigos/interações reais

## Caiu no golpe do romance?

Sabemos que é difícil aceitar. Mas cada dia que você demora para agir, menor a chance de recuperação. O **MED tem prazo de 72 horas** para os Pix mais recentes, e um B.O. detalhado é essencial para qualquer processo.

O **Kit Completo da DefesaPix** gera os 5 documentos jurídicos que você precisa em **15 minutos por R$47**. Aja com discrição e rapidez.

**Comece agora: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**
    `,
  },
  'cai-em-um-golpe-o-que-fazer-primeiro': {
    titulo: 'Caí em um Golpe: O Que Fazer Primeiro? Guia de Emergência 2026',
    resumo: 'Acabou de cair em um golpe? Veja os primeiros passos urgentes para maximizar suas chances de recuperar o dinheiro.',
    categoria: 'Tutoriais',
    tags: ['Golpe', 'Emergência', 'Primeiro Passo', 'Recuperação', '2026'],
    tempoLeitura: 5,
    publishedAt: '2026-03-11',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Você acabou de cair em um golpe. E agora?

Respire fundo. Você não é a primeira pessoa — e infelizmente não será a última. O mais importante agora é **agir rápido**. As primeiras horas são decisivas para recuperar seu dinheiro.

## A janela de oportunidade

- **Primeiras 72 horas**: MED (Mecanismo Especial de Devolução) pode bloquear o dinheiro na conta do golpista
- **Primeiras 24 horas**: Maior chance de os valores ainda estarem na conta
- **Após 72 horas**: MED ainda pode ser tentado (até 80 dias), mas a chance de recuperação cai drasticamente

## O que você NÃO deve fazer

- Não entre em pânico e tome decisões precipitadas
- Não tente negociar com o golpista
- Não envie mais dinheiro (mesmo que ameacem)
- Não apague conversas ou comprovantes
- Não espere "para ver se resolve sozinho"

## O que você PRECISA fazer

Você precisa de **5 documentos específicos** para maximizar suas chances:

1. **Boletim de Ocorrência** detalhado com todas as evidências
2. **Contestação MED** com fundamentação na Resolução BCB 93/2021
3. **Notificação Bancária** citando o CDC e a responsabilidade do banco
4. **Reclamação no Banco Central** via MeuBC
5. **Reclamação no Procon** via consumidor.gov.br

Cada documento precisa de **linguagem jurídica correta** e **citações legais específicas**. Um erro pode comprometer todo o processo.

## A solução mais rápida

O **Kit Completo da DefesaPix** gera todos os 5 documentos automaticamente em **15 minutos**, personalizados com seus dados, por apenas **R$47**. É 10x mais barato que um advogado e fica pronto na hora.

Quanto mais rápido você agir, maior a chance de recuperação. **Não espere até amanhã.**

**Gere seus documentos agora: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**
    `,
  },
  'golpe-nubank-inter-c6-banco-digital': {
    titulo: 'Golpe em Banco Digital: Nubank, Inter, C6 — O Que Fazer',
    resumo: 'Teve sua conta Nubank, Inter ou C6 invadida? Saiba como agir quando o golpe acontece em banco digital.',
    categoria: 'Golpes',
    tags: ['Nubank', 'Inter', 'C6', 'Banco Digital', 'Golpe'],
    tempoLeitura: 6,
    publishedAt: '2026-03-10',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Golpes em bancos digitais: por que são tão comuns?

Bancos digitais como Nubank, Inter, C6 Bank, PicPay e PagBank concentram a maioria dos golpes Pix no Brasil. Não porque são inseguros — mas porque são os mais usados. Isso os torna alvo preferencial dos golpistas.

## Tipos de golpe mais comuns em bancos digitais

### Acesso remoto ao app
Golpista liga se passando por "suporte do banco", convence a vítima a instalar app de acesso remoto (AnyDesk, TeamViewer) e faz transferências diretamente do celular.

### Roubo de celular + app desbloqueado
Com o celular roubado e o app bancário logado, o criminoso transfere todo o saldo via Pix em minutos.

### SIM Swap (troca de chip)
Golpista clona seu número de celular, recebe o código SMS de verificação e acessa sua conta bancária.

### Phishing
Email ou SMS falso imitando o banco: "Seu cartão foi bloqueado, clique aqui". O link leva a um site falso que captura seus dados.

## O banco é responsável?

A jurisprudência brasileira (Súmula 479 do STJ) determina que **instituições financeiras respondem objetivamente por falhas de segurança**. Isso significa que, se o banco falhou em proteger sua conta, ele pode ser obrigado a devolver o dinheiro.

## O que você precisa para responsabilizar o banco

Documentos com fundamentação legal adequada — citando o CDC, a Súmula 479 do STJ e a Resolução BCB 93/2021. Um simples email de reclamação não é suficiente.

O **Kit Completo da DefesaPix** gera automaticamente todos os documentos com as citações legais corretas, personalizados para o seu caso, em **15 minutos por R$47**.

**Recupere seu dinheiro: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**
    `,
  },
  'como-denunciar-golpe-internet-2026': {
    titulo: 'Como Denunciar Golpe na Internet em 2026: Todos os Canais',
    resumo: 'Guia com todos os canais de denúncia para golpes digitais no Brasil: polícia, BACEN, Procon, CVM e mais.',
    categoria: 'Tutoriais',
    tags: ['Denúncia', 'Golpe', 'Delegacia', 'BACEN', '2026'],
    tempoLeitura: 6,
    publishedAt: '2026-03-09',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Por que denunciar é essencial

Denunciar não é só uma questão de justiça — é uma **estratégia de recuperação**. Cada órgão que você aciona cria pressão sobre o banco e sobre o golpista, aumentando significativamente suas chances de receber o dinheiro de volta.

## Os 5 canais de denúncia

### 1. Boletim de Ocorrência (Polícia)
Documento base para qualquer processo. Sem B.O., você não consegue acionar MED, processar o banco ou fazer reclamação formal.

### 2. Contestação MED (Banco)
O Mecanismo Especial de Devolução é a via mais rápida para bloquear e recuperar valores transferidos via Pix. Prazo: **72 horas** para máxima eficácia.

### 3. Banco Central (MeuBC)
Reclamação formal que o banco é obrigado a responder em 10 dias. Cria registro oficial e pressão institucional.

### 4. Procon (consumidor.gov.br)
Gratuito e sem necessidade de advogado. O banco precisa responder publicamente, o que gera pressão reputacional.

### 5. CVM (para golpes de investimento)
Se o golpe envolveu criptomoedas, ações ou investimentos, a CVM pode investigar e punir os responsáveis.

## O problema: cada canal exige um documento diferente

Cada órgão tem requisitos específicos de formato, informações e fundamentação legal. Um B.O. mal redigido pode prejudicar todo o processo. Uma contestação MED sem as citações legais corretas pode ser negada pelo banco.

## A solução

O **Kit Completo da DefesaPix** gera **todos os 5 documentos de uma vez**, com a fundamentação legal correta para cada órgão, personalizados com os dados do seu caso. Tudo em **15 minutos por R$47**.

Você preenche um único formulário e recebe tudo pronto — com um guia passo a passo de onde entregar cada documento.

**Comece agora: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**
    `,
  },
  'pix-para-pessoa-errada-como-recuperar': {
    titulo: 'Fiz Pix para Pessoa Errada: Como Recuperar o Dinheiro',
    resumo: 'Enviou Pix para conta errada por engano? Veja o que fazer para conseguir o dinheiro de volta.',
    categoria: 'Pix & MED',
    tags: ['Pix', 'Erro', 'Recuperação', 'Devolução'],
    tempoLeitura: 5,
    publishedAt: '2026-03-08',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Pix errado: o dinheiro pode voltar

Enviou um Pix para a chave errada? Calma — existe um processo de devolução. Mas a pessoa que recebeu **não é obrigada a devolver voluntariamente**, e você pode precisar de medidas legais.

## A diferença entre erro e golpe

- **Pix por engano**: Você digitou a chave errada ou confundiu o destinatário
- **Golpe do Pix**: Alguém te enganou para transferir (MED se aplica, prazo de 72h)

Para Pix por engano, o processo é diferente do MED, mas igualmente documentado.

## O que a lei diz

O Código Civil (Art. 884) determina que **enriquecimento sem causa é ilegal**. Quem recebe um Pix por engano e se recusa a devolver está cometendo **apropriação indébita** (Art. 169 do Código Penal), com pena de 1 mês a 1 ano de detenção.

## O que fazer

1. **Contate seu banco** imediatamente e informe o erro
2. **Tente contato** com o destinatário (se possível)
3. **Se recusar a devolver**: você precisará de documentação formal

## Quando a pessoa se recusa a devolver

É mais comum do que parece. Nesse caso, você precisa de uma **notificação extrajudicial** formal, com fundamentação no Código Civil e no Código Penal, para pressionar a devolução. Se não funcionar, o próximo passo é o Juizado Especial (sem advogado, sem custo).

O **Kit Completo da DefesaPix** gera a notificação bancária e todos os documentos necessários por **R$47**, prontos para usar imediatamente.

**Recupere seu Pix: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**
    `,
  },
  'golpe-telegram-grupo-investimento': {
    titulo: 'Golpe no Telegram: Grupos de Investimento e Sinais Falsos',
    resumo: 'Entrou num grupo de investimento no Telegram e perdeu dinheiro? Entenda como funciona e o que fazer.',
    categoria: 'Golpes',
    tags: ['Telegram', 'Investimento', 'Golpe', 'Sinais'],
    tempoLeitura: 6,
    publishedAt: '2026-03-07',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## O Telegram virou o WhatsApp dos golpistas

Grupos de Telegram prometendo "sinais de investimento", "robô do Pix" e "renda passiva" multiplicaram em 2026. A promessa é sempre a mesma: deposite um valor e receba 200-500% de retorno.

## Como funciona o golpe

### Fase 1: Recrutamento
Anúncios no Instagram, TikTok ou YouTube com prints de "lucros" e depoimentos falsos. Direcionam para um grupo no Telegram.

### Fase 2: Grupo VIP
No grupo, um "mentor" posta prints de ganhos e depoimentos de outros membros (que são cúmplices ou bots). Cria senso de comunidade e urgência.

### Fase 3: Primeiro depósito
Pedem depósito via Pix (R$100 a R$5.000) em uma "plataforma de investimento" ou diretamente para uma conta.

### Fase 4: O retorno falso
Alguns golpes mostram um "saldo" crescendo na plataforma. Você acha que está lucrando, mas é só um número na tela. Quando tenta sacar, descobrem que precisa "depositar mais para liberar o saque".

### Fase 5: O colapso
O grupo é deletado, o "mentor" desaparece, a plataforma sai do ar.

## Quanto as pessoas perdem

O valor médio perdido em golpes de grupo de investimento no Telegram varia de **R$500 a R$20.000**. Alguns investem tudo que têm após ver "lucros" iniciais (que eram falsos).

## Caiu nesse golpe?

Você tem direito de buscar recuperação. O primeiro passo é documentar tudo corretamente — prints, comprovantes de Pix, dados do grupo — e formalizar a denúncia nos órgãos corretos.

O **Kit Completo da DefesaPix** gera automaticamente o B.O., contestação MED, notificação bancária e reclamações formais — tudo em **15 minutos por R$47**.

**Aja agora: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**
    `,
  },
  'direitos-vitima-golpe-digital-2026': {
    titulo: 'Seus Direitos Como Vítima de Golpe Digital em 2026',
    resumo: 'Conheça todos os seus direitos legais após cair em um golpe digital. CDC, MED, Lei 14.155 e mais.',
    categoria: 'Direito Digital',
    tags: ['Direitos', 'CDC', 'Lei', 'Vítima', '2026'],
    tempoLeitura: 8,
    publishedAt: '2026-03-06',
    autorNome: 'Equipe DefesaPix',
    conteudo: `
## Você tem mais direitos do que imagina

Muitas vítimas de golpes digitais acham que "não tem mais jeito" ou que "a culpa foi minha". A verdade é que a legislação brasileira protege fortemente o consumidor, e os bancos têm responsabilidades que muitos desconhecem.

## Seus direitos garantidos por lei

### CDC — Código de Defesa do Consumidor
- **Art. 14**: O banco responde objetivamente por falhas de segurança. Não importa se foi "culpa" sua — se o banco falhou em proteger a transação, ele é responsável.
- **Art. 42**: Você não pode ser ameaçado ou constrangido pelo banco ao buscar seus direitos.

### Súmula 479 do STJ
"As instituições financeiras respondem objetivamente pelos danos gerados por fortuito interno relativo a fraudes e delitos praticados por terceiros."

Traduzindo: **o banco é responsável** por golpes que exploram falhas nos sistemas dele.

### Lei 14.155/2021
Aumentou as penas para fraudes digitais:
- Estelionato digital: **4 a 8 anos de reclusão**
- Se cometido contra idoso ou vulnerável: pena aumentada em 1/3 a 2/3

### Resolução BCB 93/2021 — MED
Criou o Mecanismo Especial de Devolução para Pix. O banco é **obrigado** a acionar o MED quando solicitado pela vítima.

### Juizado Especial Cível (JEC)
Para causas de até 20 salários mínimos, você pode processar o banco **sem advogado e sem custas judiciais**.

## O problema: conhecer seus direitos não é suficiente

Saber que você tem direitos é importante. Mas para exercê-los, você precisa de **documentos formais com a fundamentação legal correta**. Um B.O. genérico, uma contestação sem citações legais ou uma notificação sem prazo não produzem resultado.

## A solução profissional por R$47

O **Kit Completo da DefesaPix** gera 5 documentos jurídicos personalizados — cada um com as citações legais exatas para o seu tipo de golpe. Linguagem profissional, formatação correta, fundamentação sólida. Tudo em 15 minutos.

É o equivalente a pagar 10x menos que um advogado, com resultado imediato.

**Exerça seus direitos agora: [defesapix.com.br/ferramentas/pacote-completo](https://defesapix.com.br/ferramentas/pacote-completo)**
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(ARTIGOS).map((slug) => ({ slug }));
}

async function getArtigo(slug: string) {
  // Try static first
  if (ARTIGOS[slug]) return { ...ARTIGOS[slug], source: 'static' as const };
  // Fallback to database
  const dbArtigo = await prisma.artigo.findUnique({ where: { slug } }).catch(() => null);
  if (dbArtigo && dbArtigo.publicado) {
    // Increment views (fire and forget)
    prisma.artigo.update({ where: { id: dbArtigo.id }, data: { visualizacoes: { increment: 1 } } }).catch(() => {});
    return {
      titulo: dbArtigo.titulo,
      resumo: dbArtigo.resumo,
      conteudo: dbArtigo.conteudo,
      categoria: dbArtigo.categoria,
      tags: dbArtigo.tags,
      tempoLeitura: dbArtigo.tempoLeitura,
      publishedAt: dbArtigo.publishedAt?.toISOString().split('T')[0] || '',
      autorNome: dbArtigo.autorNome,
      source: 'db' as const,
    };
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigo(slug);
  if (!artigo) return { title: 'Artigo não encontrado' };

  return {
    title: `${artigo.titulo}`,
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
  const artigo = await getArtigo(slug);
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
              if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-white mt-8 mb-3">{line.slice(4)}</h3>;
              if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">{line.slice(3)}</h2>;
              if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-green-500 pl-4 py-2 my-4 text-white/70 italic">{line.slice(2)}</blockquote>;
              if (line.startsWith('- ')) return <li key={i} className="text-white/70 ml-4 mb-1" dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
              if (/^\d+\.\s/.test(line))
                return <li key={i} className="text-white/70 ml-4 mb-1 list-decimal" dangerouslySetInnerHTML={{ __html: line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
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

          {/* Related Articles */}
          {await (async () => {
            // Get DB articles for related
            const dbRelated = await prisma.artigo.findMany({
              where: { publicado: true, slug: { not: slug } },
              select: { slug: true, titulo: true, categoria: true, tags: true, tempoLeitura: true },
            }).catch(() => []);

            const allRelated = [
              ...Object.entries(ARTIGOS)
                .filter(([s]) => s !== slug)
                .map(([s, a]) => ({ slug: s, titulo: a.titulo, categoria: a.categoria, tags: a.tags, tempoLeitura: a.tempoLeitura })),
              ...dbRelated.filter((d) => !ARTIGOS[d.slug]),
            ];

            const related = allRelated
              .map((a) => {
                let score = 0;
                if (a.categoria === artigo.categoria) score += 3;
                score += a.tags.filter((t) => artigo.tags.includes(t)).length;
                return { ...a, score };
              })
              .sort((a, b) => b.score - a.score)
              .slice(0, 3);

            return related.length > 0 ? (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-400" />
                  Artigos relacionados
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="card hover:border-green-500/30 transition-all group">
                      <span className="badge-green text-xs mb-2 inline-block">{r.categoria}</span>
                      <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                        {r.titulo}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        {r.tempoLeitura} min
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* Cross-links to Golpes & Ferramentas */}
          <div className="mt-10 border-t border-white/10 pt-8">
            <h3 className="text-lg font-bold text-white mb-4">Conteúdo relacionado</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/golpes/golpe-pix" className="text-sm text-green-400 hover:text-green-300 transition-colors">Golpe Pix →</Link>
              <Link href="/golpes/golpe-whatsapp" className="text-sm text-green-400 hover:text-green-300 transition-colors">Golpe WhatsApp →</Link>
              <Link href="/ferramentas/gerador-contestacao-med" className="text-sm text-green-400 hover:text-green-300 transition-colors">Contestação MED</Link>
              <Link href="/ferramentas/gerador-bo" className="text-sm text-green-400 hover:text-green-300 transition-colors">Boletim de Ocorrência</Link>
              <Link href="/ferramentas/notificacao-banco" className="text-sm text-green-400 hover:text-green-300 transition-colors">Notificação Bancária</Link>
              <Link href="/golpes" className="text-sm text-white/50 hover:text-white transition-colors">Ver todos os golpes →</Link>
              <Link href="/blog" className="text-sm text-white/50 hover:text-white transition-colors">Ver todos os artigos →</Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
