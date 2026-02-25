// DefesaPix — Scam Classifier & Action Planner

export type TipoGolpe =
  | 'PIX'
  | 'WHATSAPP'
  | 'BOLETO'
  | 'ROMANCE'
  | 'EMPREGO'
  | 'INVESTIMENTO'
  | 'CLONE_APP'
  | 'PHISHING'
  | 'CARTAO'
  | 'CONSIGNADO'
  | 'OUTRO';

export interface ClassificationResult {
  tipo: TipoGolpe;
  confianca: number; // 0-100
  titulo: string;
  descricao: string;
  urgencia: 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAIXA';
  probabilidadeRecuperacao: number; // 0-100
  prazoLegal: string;
  acoes: AcaoRecomendada[];
}

export interface AcaoRecomendada {
  ordem: number;
  titulo: string;
  descricao: string;
  prazo: string;
  obrigatoria: boolean;
  documentoGerado?: string;
  link?: string;
}

// Keyword mapping for classification
const KEYWORDS: Record<TipoGolpe, string[]> = {
  PIX: ['pix', 'chave pix', 'transferência', 'transferencia', 'qr code', 'pix enviado', 'falso funcionário', 'banco falso'],
  WHATSAPP: ['whatsapp', 'zap', 'clonaram', 'clone', 'número clonado', 'pedindo dinheiro', 'sequestro'],
  BOLETO: ['boleto', 'boleto falso', 'código de barras', 'pagamento boleto', 'boleto adulterado'],
  ROMANCE: ['romance', 'namoro', 'relacionamento', 'perfil falso', 'pessoa que conheci', 'internet', 'aplicativo de namoro'],
  EMPREGO: ['emprego falso', 'vaga', 'trabalho', 'home office', 'taxa', 'cadastro pago', 'treinamento pago'],
  INVESTIMENTO: ['investimento', 'criptomoeda', 'bitcoin', 'rendimento', 'rentabilidade', 'retorno garantido', 'pirâmide'],
  CLONE_APP: ['aplicativo falso', 'app falso', 'banco falso', 'site falso', 'link suspeito', 'phishing', 'clone'],
  PHISHING: ['e-mail falso', 'link', 'senha', 'dados', 'cartão', 'atualização cadastral', 'cpf bloqueado'],
  CARTAO: ['cartão', 'cartao', 'crédito', 'debito', 'maquininha', 'compra', 'fraude cartão'],
  CONSIGNADO: ['consignado', 'empréstimo', 'inss', 'aposentadoria', 'benefício', 'antecipação'],
  OUTRO: [],
};

const GOLPE_META: Record<TipoGolpe, { titulo: string; descricao: string; urgencia: ClassificationResult['urgencia']; probabilidade: number; prazo: string }> = {
  PIX: {
    titulo: 'Golpe via Pix',
    descricao: 'Transferência Pix realizada para conta fraudulenta. O mecanismo MED do Banco Central pode bloquear os valores em até 72h.',
    urgencia: 'CRITICA',
    probabilidade: 65,
    prazo: '72 horas para MED — aja agora!',
  },
  WHATSAPP: {
    titulo: 'Clonagem de WhatsApp',
    descricao: 'Seu número foi clonado e usado para aplicar golpes em seus contatos, ou você foi vítima de pedido de dinheiro via número clonado.',
    urgencia: 'ALTA',
    probabilidade: 45,
    prazo: 'Registre BO em até 24h para proteger sua identidade.',
  },
  BOLETO: {
    titulo: 'Boleto Falso / Adulterado',
    descricao: 'Pagamento de boleto falso ou com código de barras adulterado. Registre contestação junto ao banco imediatamente.',
    urgencia: 'ALTA',
    probabilidade: 40,
    prazo: 'Conteste em até 5 dias úteis.',
  },
  ROMANCE: {
    titulo: 'Golpe do Amor / Romance Scam',
    descricao: 'Perfil falso criou relacionamento virtual para extrair dinheiro. Documente todas as conversas.',
    urgencia: 'MEDIA',
    probabilidade: 25,
    prazo: 'Registre BO e preserve todas as evidências digitais.',
  },
  EMPREGO: {
    titulo: 'Golpe de Emprego Falso',
    descricao: 'Oferta de emprego falsa com cobrança de taxas ou depósito de cheques fraudulentos.',
    urgencia: 'MEDIA',
    probabilidade: 30,
    prazo: 'Acione órgãos de proteção ao consumidor.',
  },
  INVESTIMENTO: {
    titulo: 'Golpe de Investimento / Pirâmide',
    descricao: 'Esquema de investimento fraudulento com promessa de retorno garantido acima do mercado.',
    urgencia: 'ALTA',
    probabilidade: 20,
    prazo: 'Denuncie à CVM (Comissão de Valores Mobiliários) e Polícia Federal.',
  },
  CLONE_APP: {
    titulo: 'Aplicativo / Site Falso',
    descricao: 'Você acessou um aplicativo ou site falso que coletou seus dados ou realizou transações não autorizadas.',
    urgencia: 'CRITICA',
    probabilidade: 55,
    prazo: 'Bloqueie cartões e troque senhas imediatamente.',
  },
  PHISHING: {
    titulo: 'Phishing / E-mail Falso',
    descricao: 'Clique em link falso que capturou dados bancários ou pessoais.',
    urgencia: 'ALTA',
    probabilidade: 50,
    prazo: 'Notifique o banco em até 24h.',
  },
  CARTAO: {
    titulo: 'Fraude no Cartão de Crédito/Débito',
    descricao: 'Compras não reconhecidas ou clonagem do cartão.',
    urgencia: 'CRITICA',
    probabilidade: 75,
    prazo: 'Conteste as transações em até 60 dias (CDC Art. 42).',
  },
  CONSIGNADO: {
    titulo: 'Golpe de Empréstimo Consignado',
    descricao: 'Empréstimo consignado contratado sem seu consentimento ou com taxas abusivas.',
    urgencia: 'ALTA',
    probabilidade: 60,
    prazo: 'Registre reclamação no Banco Central e INSS em até 7 dias.',
  },
  OUTRO: {
    titulo: 'Golpe Digital',
    descricao: 'Fraude digital identificada. Nosso sistema irá analisar seu caso para determinar o melhor plano de ação.',
    urgencia: 'MEDIA',
    probabilidade: 35,
    prazo: 'Preserve evidências e registre BO o quanto antes.',
  },
};

function getActionsForGolpe(tipo: TipoGolpe, valor: number): AcaoRecomendada[] {
  const acoes: AcaoRecomendada[] = [];

  // Universal first actions
  acoes.push({
    ordem: 1,
    titulo: 'Registre o Boletim de Ocorrência',
    descricao: 'O BO é o documento base para todos os processos. Pode ser feito online em minutos.',
    prazo: 'Agora',
    obrigatoria: true,
    documentoGerado: 'BOLETIM_OCORRENCIA',
    link: 'https://www.delegaciaeletronica.policiacivil.sp.gov.br',
  });

  if (tipo === 'PIX' || tipo === 'CLONE_APP' || tipo === 'PHISHING') {
    acoes.push({
      ordem: 2,
      titulo: 'Acione o Mecanismo MED (Devolução de Pix)',
      descricao: 'Solicite ao seu banco o acionamento do Mecanismo Especial de Devolução. Os valores podem ser bloqueados em 72h.',
      prazo: 'Urgente — dentro de 72h',
      obrigatoria: true,
      documentoGerado: 'CONTESTACAO_MED',
    });
  }

  acoes.push({
    ordem: tipo === 'PIX' ? 3 : 2,
    titulo: 'Envie Notificação Formal ao Banco',
    descricao: 'Notifique formalmente sua instituição financeira, gerando protocolo e responsabilidade legal.',
    prazo: '24 horas',
    obrigatoria: true,
    documentoGerado: 'NOTIFICACAO_BANCO',
  });

  if (valor > 5000) {
    acoes.push({
      ordem: acoes.length + 1,
      titulo: 'Registre Reclamação no Banco Central',
      descricao: 'O BACEN fiscaliza as instituições financeiras. Uma reclamação formal acelera o processo.',
      prazo: '48 horas',
      obrigatoria: true,
      link: 'https://www.bcb.gov.br/meubc',
    });
  }

  acoes.push({
    ordem: acoes.length + 1,
    titulo: 'Registre no Procon',
    descricao: 'O Procon pode intermediar a resolução e aplicar multas à instituição financeira.',
    prazo: '72 horas',
    obrigatoria: false,
    documentoGerado: 'NOTIFICACAO_PROCON',
    link: 'https://www.procon.sp.gov.br',
  });

  if (tipo === 'INVESTIMENTO') {
    acoes.push({
      ordem: acoes.length + 1,
      titulo: 'Denuncie à CVM / Polícia Federal',
      descricao: 'Golpes de investimento são crimes federais. A CVM e a PF investigam esses casos.',
      prazo: '48 horas',
      obrigatoria: true,
      link: 'https://www.cvm.gov.br',
    });
  }

  if (valor > 10000) {
    acoes.push({
      ordem: acoes.length + 1,
      titulo: 'Considere Ação Judicial',
      descricao: 'Para valores acima de R$10.000, uma ação judicial pode ser viável. Nossos parceiros jurídicos podem avaliar seu caso.',
      prazo: '7 dias',
      obrigatoria: false,
      documentoGerado: 'PETICAO_JUDICIAL',
    });
  }

  return acoes;
}

export function classifyGolpe(descricao: string, valor: number = 0): ClassificationResult {
  const text = descricao.toLowerCase();
  const scores: Record<TipoGolpe, number> = {} as Record<TipoGolpe, number>;

  for (const [tipo, keywords] of Object.entries(KEYWORDS)) {
    scores[tipo as TipoGolpe] = keywords.reduce((score, keyword) => {
      return score + (text.includes(keyword) ? 1 : 0);
    }, 0);
  }

  // Find best match
  let bestTipo: TipoGolpe = 'OUTRO';
  let bestScore = 0;

  for (const [tipo, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestTipo = tipo as TipoGolpe;
    }
  }

  const meta = GOLPE_META[bestTipo];
  const confianca = bestScore > 0 ? Math.min(95, 50 + bestScore * 15) : 40;

  // Adjust probability based on amount
  let prob = meta.probabilidade;
  if (valor < 1000) prob = Math.min(prob + 10, 90);
  if (valor > 50000) prob = Math.max(prob - 15, 10);

  return {
    tipo: bestTipo,
    confianca,
    titulo: meta.titulo,
    descricao: meta.descricao,
    urgencia: meta.urgencia,
    probabilidadeRecuperacao: prob,
    prazoLegal: meta.prazo,
    acoes: getActionsForGolpe(bestTipo, valor),
  };
}

export function getGolpeInfo(tipo: TipoGolpe) {
  return GOLPE_META[tipo];
}

export const TIPOS_GOLPE_LABELS: Record<TipoGolpe, string> = {
  PIX: 'Golpe via Pix',
  WHATSAPP: 'Clonagem de WhatsApp',
  BOLETO: 'Boleto Falso',
  ROMANCE: 'Golpe do Amor',
  EMPREGO: 'Emprego Falso',
  INVESTIMENTO: 'Investimento Fraudulento',
  CLONE_APP: 'App/Site Falso',
  PHISHING: 'Phishing',
  CARTAO: 'Fraude no Cartão',
  CONSIGNADO: 'Consignado Irregular',
  OUTRO: 'Outro',
};
