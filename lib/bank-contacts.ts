// Central de Defesa Digital — Contatos oficiais dos bancos para acionamento de fraude/MED

export interface BankContact {
  sac: string;
  ouvidoria: string;
  emailFraude: string | null;
  instrucaoMED: string;   // Passo a passo no app para acionar o MED
  linkMeuBC: string;      // Link direto para o portal do BACEN
  linkOuvidoria: string | null;
}

export const BANK_CONTACTS: Record<string, BankContact> = {
  Nubank: {
    sac: '0800 591 2117',
    ouvidoria: 'ouvidoria@nubank.com.br',
    emailFraude: 'fraude@nubank.com.br',
    instrucaoMED: 'App Nubank → Menu (ícone ☰) → Ajuda → "Tive um problema com uma transferência Pix"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: 'https://nubank.com.br/ouvidoria',
  },
  Itaú: {
    sac: '0800 728 0728',
    ouvidoria: 'ouvidoria@itau.com.br',
    emailFraude: null,
    instrucaoMED: 'App Itaú → Pix → histórico → selecione a transação → "Contestar transferência"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: 'https://www.itau.com.br/atendimento-itau/ouvidoria',
  },
  Bradesco: {
    sac: '0800 704 8383',
    ouvidoria: 'ouvidoria@bradesco.com.br',
    emailFraude: null,
    instrucaoMED: 'App Bradesco → Pix → Minhas Transações → selecione → "Solicitar Devolução"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: 'https://banco.bradesco/ouvidoria',
  },
  Santander: {
    sac: '0800 702 3535',
    ouvidoria: 'ouvidoria@santander.com.br',
    emailFraude: null,
    instrucaoMED: 'App Santander → Pix → Histórico → selecione a transação → "Contestar"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: 'https://www.santander.com.br/ouvidoria',
  },
  'Banco do Brasil': {
    sac: '0800 729 0722',
    ouvidoria: 'ouvidoria@bb.com.br',
    emailFraude: null,
    instrucaoMED: 'App BB → Pix → Comprovantes → selecione a transação → "Contestar Transação"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: 'https://www.bb.com.br/ouvidoria',
  },
  Caixa: {
    sac: '0800 726 0101',
    ouvidoria: 'ouvidoria@caixa.gov.br',
    emailFraude: null,
    instrucaoMED: 'App Caixa → Pix → Extrato Pix → selecione a transação → "Reportar Problema"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: 'https://www.caixa.gov.br/ouvidoria',
  },
  Inter: {
    sac: '3003 4070',
    ouvidoria: 'ouvidoria@bancointer.com.br',
    emailFraude: 'seguranca@bancointer.com.br',
    instrucaoMED: 'App Inter → Pix → Extrato → selecione → "Solicitar Devolução"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: 'https://www.bancointer.com.br/ouvidoria',
  },
  'C6 Bank': {
    sac: '3003 6116',
    ouvidoria: 'ouvidoria@c6bank.com.br',
    emailFraude: null,
    instrucaoMED: 'App C6 Bank → Pix → Histórico → selecione a transação → "Contestar"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: null,
  },
  PicPay: {
    sac: '3003 3699',
    ouvidoria: 'ouvidoria@picpay.com',
    emailFraude: 'fraude@picpay.com',
    instrucaoMED: 'App PicPay → Atividades → selecione o pagamento → "Contestar Transação"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: null,
  },
  'Mercado Pago': {
    sac: '0800 637 7246',
    ouvidoria: 'ouvidoria@mercadopago.com.br',
    emailFraude: null,
    instrucaoMED: 'App Mercado Pago → Atividade → selecione a transação → "Há um problema com este pagamento"',
    linkMeuBC: 'https://www.bcb.gov.br/meubc',
    linkOuvidoria: null,
  },
};
