// Central de Defesa Digital — PDF Document Generator
// Uses jsPDF for client-side PDF generation

/**
 * Gera e faz download de um PDF profissional a partir de texto formatado.
 * Usa dynamic import para garantir execução apenas no browser (evita SSR issues).
 */
export async function baixarPDF(
  texto: string,
  nomeArquivo: string,
  titulo: string,
): Promise<void> {
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW  = doc.internal.pageSize.getWidth();   // 210
  const pageH  = doc.internal.pageSize.getHeight();  // 297
  const mL     = 20;
  const mR     = 20;
  const mTop   = 32;
  const mBot   = 18;
  const cW     = pageW - mL - mR; // 170
  const lineH  = 5;
  const today  = new Date().toLocaleDateString('pt-BR');
  let y = mTop;

  const drawHeader = () => {
    // Orange top rule
    doc.setDrawColor(249, 115, 22);
    doc.setLineWidth(0.9);
    doc.line(mL, 10, pageW - mR, 10);

    // Brand name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(249, 115, 22);
    doc.text('CENTRAL DE DEFESA DIGITAL', mL, 17);

    // URL
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 165);
    doc.text('centraldefesadigital.com.br', mL, 22);

    // Document title (right side)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(40, 40, 60);
    doc.text(titulo.toUpperCase(), pageW - mR, 17, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 165);
    doc.text(`Gerado em ${today}`, pageW - mR, 22, { align: 'right' });

    // Separator under header
    doc.setDrawColor(210, 210, 225);
    doc.setLineWidth(0.25);
    doc.line(mL, 26, pageW - mR, 26);
  };

  const drawFooter = (pageNum: number) => {
    const fY = pageH - 8;
    doc.setDrawColor(210, 210, 225);
    doc.setLineWidth(0.2);
    doc.line(mL, fY - 3, pageW - mR, fY - 3);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 175);
    doc.text('Documento jurídico — Central de Defesa Digital', mL, fY);
    doc.text(`Página ${pageNum}`, pageW - mR, fY, { align: 'right' });
  };

  const checkBreak = (extra = lineH) => {
    if (y + extra > pageH - mBot) {
      doc.addPage();
      drawHeader();
      y = mTop;
    }
  };

  drawHeader();

  for (const raw of texto.split('\n')) {
    const line = raw.trimEnd();

    // Separator lines → horizontal rule
    if (/^[━─=]{3,}$/.test(line.trim())) {
      checkBreak(4);
      doc.setDrawColor(200, 200, 215);
      doc.setLineWidth(0.2);
      doc.line(mL, y - 1, pageW - mR, y - 1);
      y += 3;
      continue;
    }

    // Empty line
    if (!line.trim()) {
      y += lineH * 0.55;
      continue;
    }

    // Detect section headers: ALL CAPS, no numbers/slashes, short enough
    const isSectionHeader =
      line.length > 3 &&
      line === line.toUpperCase() &&
      !/^\d+[.)]\s/.test(line) &&
      !line.includes('R$') &&
      !line.includes('/') &&
      !/^\w{2}:/.test(line);

    // Detect Roman numeral headers like "I — DOS FATOS:"
    const isRomanHeader = /^[IVX]+\s*[—–-]/.test(line);

    // Bold labels ending with ":"
    const isLabel = line.endsWith(':') && line.length < 55 && !line.startsWith(' ');

    if (isSectionHeader || isRomanHeader) {
      y += 2;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 20, 45);
    } else if (isLabel) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(35, 35, 55);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(50, 50, 70);
    }

    const wrapped = doc.splitTextToSize(line, cW);
    for (const wl of wrapped) {
      checkBreak();
      doc.text(wl, mL, y);
      y += lineH;
    }

    if (isSectionHeader || isRomanHeader) y += 1;
  }

  // Footers on all pages
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const total = (doc.internal as any).getNumberOfPages() as number;
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    drawFooter(p);
  }

  doc.save(nomeArquivo);
}

export interface DocumentoMED {
  nomeVitima: string;
  cpfVitima: string;
  agencia: string;
  conta: string;
  banco: string;
  valorTransferido: number;
  dataOcorrencia: string;
  chavePixDestinatario: string;
  descricaoGolpe: string;
  numeroBo?: string;
}

export interface DocumentoBO {
  nomeVitima: string;
  cpfVitima: string;
  rgVitima?: string;
  enderecoVitima: string;
  telefoneVitima: string;
  emailVitima: string;
  dataOcorrencia: string;
  localOcorrencia: string;
  tipoGolpe: string;
  descricaoDetalhada: string;
  valorPrejuizo: number;
  dadosInfrator?: string;
}

export interface DocumentoNotificacaoBanco {
  nomeVitima: string;
  cpfVitima: string;
  banco: string;
  agencia: string;
  conta: string;
  dataOcorrencia: string;
  valorPrejuizo: number;
  tipoFraude: string;
  descricao: string;
  pedidos: string[];
}

// Template generators (returns formatted text for PDF)

export function gerarTextoMED(dados: DocumentoMED): string {
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  return `
SOLICITAÇÃO DE ACIONAMENTO DO MECANISMO ESPECIAL DE DEVOLUÇÃO (MED)
Resolução BCB nº 93/2021 — Banco Central do Brasil

Data: ${dataAtual}

AO BANCO ${dados.banco.toUpperCase()}
Setor de Segurança / Prevenção a Fraudes

IDENTIFICAÇÃO DO SOLICITANTE:
Nome completo: ${dados.nomeVitima}
CPF: ${dados.cpfVitima}
Agência: ${dados.agencia}
Conta: ${dados.conta}

DADOS DA TRANSAÇÃO FRAUDULENTA:
Data da ocorrência: ${dados.dataOcorrencia}
Valor transferido: R$ ${dados.valorTransferido.toFixed(2).replace('.', ',')}
Chave Pix do destinatário: ${dados.chavePixDestinatario}

RELATO DOS FATOS:
${dados.descricaoGolpe}

${dados.numeroBo ? `Número do Boletim de Ocorrência: ${dados.numeroBo}` : ''}

FUNDAMENTO LEGAL:
Com base na Resolução BCB nº 93/2021, que institui o Mecanismo Especial de Devolução (MED),
solicito o imediato bloqueio cautelar dos valores e a devolução ao meu favor, visto que:

1. A transação foi realizada mediante FRAUDE, sem minha anuência consciente;
2. Os valores se encontram em posse ilícita do destinatário;
3. Existe indício claro de infração penal (estelionato — Art. 171 do Código Penal).

PEDIDOS:
1. Acionamento IMEDIATO do Mecanismo MED para bloqueio dos valores;
2. Devolução integral de R$ ${dados.valorTransferido.toFixed(2).replace('.', ',')} à minha conta;
3. Registro formal desta ocorrência;
4. Comunicação ao BACEN conforme obrigação regulatória;
5. Fornecimento de protocolo desta solicitação.

Declaro, sob as penas da lei, que as informações acima são verdadeiras.

${dados.nomeVitima}
CPF: ${dados.cpfVitima}

Data: ${dataAtual}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Documento gerado pela Central de Defesa Digital
www.centraldefesadigital.com.br
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}

export function gerarTextoBO(dados: DocumentoBO): string {
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  return `
MODELO DE BOLETIM DE OCORRÊNCIA — ESTELIONATO DIGITAL
(Para uso em Delegacia Eletrônica ou presencialmente)

Data de elaboração: ${dataAtual}

━━━━━━━━━━━━━━━━━━━━━━
DADOS DA VÍTIMA
━━━━━━━━━━━━━━━━━━━━━━
Nome: ${dados.nomeVitima}
CPF: ${dados.cpfVitima}
${dados.rgVitima ? `RG: ${dados.rgVitima}` : ''}
Endereço: ${dados.enderecoVitima}
Telefone: ${dados.telefoneVitima}
E-mail: ${dados.emailVitima}

━━━━━━━━━━━━━━━━━━━━━━
FATOS OCORRIDOS
━━━━━━━━━━━━━━━━━━━━━━
Data do fato: ${dados.dataOcorrencia}
Local: ${dados.localOcorrencia}
Tipo de crime: Estelionato Digital — ${dados.tipoGolpe}
Valor do prejuízo: R$ ${dados.valorPrejuizo.toFixed(2).replace('.', ',')}

NARRATIVA DOS FATOS:
${dados.descricaoDetalhada}

${dados.dadosInfrator ? `DADOS DO INFRATOR (se conhecidos):\n${dados.dadosInfrator}` : ''}

━━━━━━━━━━━━━━━━━━━━━━
TIPIFICAÇÃO PENAL
━━━━━━━━━━━━━━━━━━━━━━
• Estelionato (Art. 171 do Código Penal) — pena: 1 a 5 anos de reclusão
• Estelionato em meio eletrônico (Art. 171, §2º, "b" do CP) — majorante
• Lei 14.155/2021 — crimes praticados em ambiente digital
• Lei Carolina Dieckmann (12.737/2012) — acesso não autorizado a dispositivos

PROVAS E EVIDÊNCIAS DISPONÍVEIS:
□ Prints de conversas (WhatsApp/e-mail)
□ Comprovante de transferência
□ Dados do destinatário fraudulento
□ Histórico de transações bancárias
□ Outros: ___________________________

Declaro ser verdade o relatado acima, sob as penas do Art. 299 do Código Penal.

___________________________________
${dados.nomeVitima}
CPF: ${dados.cpfVitima}
Data: ${dataAtual}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Documento gerado pela Central de Defesa Digital
www.centraldefesadigital.com.br
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}

export function gerarTextoNotificacaoBanco(dados: DocumentoNotificacaoBanco): string {
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  return `
NOTIFICAÇÃO EXTRAJUDICIAL
(Enviada via protocolo na agência e pelos canais oficiais do banco)

${dataAtual}

AO ${dados.banco.toUpperCase()}
Ouvidoria / Departamento Jurídico / Setor de Fraudes

NOTIFICANTE: ${dados.nomeVitima}
CPF: ${dados.cpfVitima}
Agência: ${dados.agencia} | Conta: ${dados.conta}

ASSUNTO: CONTESTAÇÃO DE TRANSAÇÃO FRAUDULENTA E EXIGÊNCIA DE DEVOLUÇÃO

Eu, ${dados.nomeVitima}, portador do CPF ${dados.cpfVitima}, venho, por meio desta,
NOTIFICAR FORMALMENTE essa instituição financeira acerca dos seguintes fatos:

I — DOS FATOS:
Em ${dados.dataOcorrencia}, sofri fraude do tipo "${dados.tipoFraude}", resultando
em prejuízo financeiro de R$ ${dados.valorPrejuizo.toFixed(2).replace('.', ',')}.

${dados.descricao}

II — DO DIREITO:
Conforme o Código de Defesa do Consumidor (Lei 8.078/90), em especial os artigos
14 (responsabilidade pelo fato do serviço) e 42 (proibição de cobrança abusiva),
essa instituição tem o dever de:
• Zelar pela segurança das transações realizadas em sua plataforma;
• Adotar mecanismos antifraude eficazes;
• Ressarcir danos decorrentes de falhas nos seus sistemas de segurança.

Adicionalmente, a Resolução BACEN nº 4.658/2018 obriga as instituições financeiras
a manter sistemas robustos de prevenção a fraudes.

III — DOS PEDIDOS:
${dados.pedidos.map((p, i) => `${i + 1}. ${p}`).join('\n')}

IV — DO PRAZO:
Concedo prazo de 5 (cinco) dias úteis para manifestação formal, sob pena de:
• Registro de reclamação no Banco Central (www.bcb.gov.br/meubc);
• Registro de reclamação no Procon;
• Propositura de ação judicial com pedido de dano moral.

Aguardo providências.

Atenciosamente,

___________________________________
${dados.nomeVitima}
CPF: ${dados.cpfVitima}
${dataAtual}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Documento gerado pela Central de Defesa Digital
www.centraldefesadigital.com.br | contato@centraldefesadigital.com.br
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}

export function gerarChecklistGolpe(tipo: string, valor: number): ChecklistItem[] {
  const items: ChecklistItem[] = [
    { id: '1', titulo: 'Registrar Boletim de Ocorrência', descricao: 'BO online ou presencial na delegacia mais próxima', prazo: 'Agora', completado: false, urgente: true },
    { id: '2', titulo: 'Notificar o banco formalmente', descricao: 'Ligue para o SAC e vá pessoalmente à agência', prazo: '24h', completado: false, urgente: true },
    { id: '3', titulo: 'Bloquear cartões e alterar senhas', descricao: 'Bloqueie todos os cartões vinculados ao banco afetado', prazo: 'Imediato', completado: false, urgente: true },
    { id: '4', titulo: 'Salvar todas as evidências', descricao: 'Screenshots, comprovantes, conversas e e-mails', prazo: 'Agora', completado: false, urgente: true },
  ];

  if (tipo === 'PIX' || tipo === 'CLONE_APP') {
    items.push({ id: '5', titulo: 'Solicitar acionamento do MED', descricao: 'Mecanismo Especial de Devolução — máximo 72h após o golpe', prazo: '72h', completado: false, urgente: true });
  }

  items.push(
    { id: '6', titulo: 'Registrar reclamação no BACEN', descricao: 'Acesse www.bcb.gov.br/meubc', prazo: '48h', completado: false, urgente: false },
    { id: '7', titulo: 'Registrar reclamação no Procon', descricao: 'Intermediação gratuita entre consumidor e empresa', prazo: '72h', completado: false, urgente: false },
    { id: '8', titulo: 'Verificar se CPF foi usado em outros golpes', descricao: 'Consulte o Registrato do Banco Central', prazo: '1 semana', completado: false, urgente: false },
  );

  if (valor > 10000) {
    items.push({ id: '9', titulo: 'Consultar advogado especializado', descricao: 'Avalie viabilidade de ação judicial — nossos parceiros oferecem consulta gratuita', prazo: '7 dias', completado: false, urgente: false });
  }

  return items;
}

export interface ChecklistItem {
  id: string;
  titulo: string;
  descricao: string;
  prazo: string;
  completado: boolean;
  urgente: boolean;
}
