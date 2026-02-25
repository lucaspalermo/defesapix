'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, ChevronDown, ChevronUp, Copy, ExternalLink, FileText, Mail, Phone, Shield, AlertTriangle, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { baixarPDF } from '@/lib/pdf-generator';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Props {
  textoDocumento: string;
  nomeArquivoPDF: string;
  tituloPDF: string;
  tipoGolpe: string;
  nomeVitima: string;
  emailVitima: string;
  tipoDocumento: 'bo' | 'med' | 'notificacao' | 'pacote';
}

const STORAGE_KEY = 'defesapix_documentos';

interface DocSalvo {
  tipo: string;
  titulo: string;
  texto: string;
  data: string;
  nome: string;
}

function salvarDocumento(doc: DocSalvo) {
  try {
    const existentes: DocSalvo[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existentes.push(doc);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existentes));
  } catch { /* localStorage indisponível */ }
}

export default function GuiaPosCompra({ textoDocumento, nomeArquivoPDF, tituloPDF, tipoGolpe, nomeVitima, emailVitima, tipoDocumento }: Props) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [textoMelhorado, setTextoMelhorado] = useState('');
  const [melhorando, setMelhorando] = useState(false);
  const [usarMelhorado, setUsarMelhorado] = useState(false);

  const isPix = tipoGolpe.includes('Pix');
  const isWhatsApp = tipoGolpe.includes('WhatsApp');
  const isCartao = tipoGolpe.includes('Cartão');
  const isInvestimento = tipoGolpe.includes('Investimento');
  const textoAtivo = usarMelhorado && textoMelhorado ? textoMelhorado : textoDocumento;

  const handleMelhorarIA = async () => {
    setMelhorando(true);
    try {
      const res = await fetch('/api/melhorar-texto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: textoDocumento, tipo: tipoDocumento }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao melhorar texto');
      setTextoMelhorado(data.textoMelhorado);
      setUsarMelhorado(true);
      toast.success('Texto aprimorado com IA!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao melhorar texto');
    } finally {
      setMelhorando(false);
    }
  };

  // Salvar documento no localStorage ao montar
  useEffect(() => {
    salvarDocumento({
      tipo: tipoDocumento,
      titulo: tituloPDF,
      texto: textoDocumento,
      data: new Date().toISOString(),
      nome: nomeVitima,
    });
  }, [tipoDocumento, tituloPDF, textoDocumento, nomeVitima]);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await baixarPDF(textoAtivo, nomeArquivoPDF, tituloPDF);
      toast.success('PDF baixado!');
    } finally {
      setDownloading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textoAtivo);
    setCopied(true);
    toast.success('Texto copiado! Cole na Delegacia Eletrônica.');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleEnviarEmail = async () => {
    setSendingEmail(true);
    try {
      await fetch('/api/email/documentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailVitima, nome: nomeVitima, documento: textoAtivo, titulo: tituloPDF }),
      });
      setEmailSent(true);
      toast.success(`Documento enviado para ${emailVitima}`);
    } catch {
      toast.error('Não foi possível enviar. Baixe o PDF como alternativa.');
    } finally {
      setSendingEmail(false);
    }
  };

  const toggleStep = (id: string) => setExpandedStep(prev => prev === id ? null : id);
  const toggle = (id: string) => setChecklist(prev => ({ ...prev, [id]: !prev[id] }));

  const steps = [
    {
      id: 'salvar',
      titulo: 'Salvar seus documentos em lugar seguro',
      desc: 'Baixe o PDF e envie para seu e-mail para não perder.',
      prazo: 'AGORA',
      detalhes: [
        '1. Clique no botão "Baixar PDF" acima — o arquivo vai para a pasta de Downloads do seu celular ou computador',
        '2. Clique em "Enviar por e-mail" — você vai receber uma cópia no seu e-mail ' + emailVitima,
        '3. Se quiser, envie também para um familiar de confiança por WhatsApp',
        '',
        '💡 Dica: Esses documentos são a sua prova. Guarde bem — você vai precisar deles nas próximas etapas.',
      ],
      links: [],
    },
    {
      id: 'bo',
      titulo: 'Registrar o B.O. oficial na Delegacia Eletrônica',
      desc: 'Use o texto do seu modelo para preencher o formulário online.',
      prazo: 'AGORA',
      detalhes: [
        '📱 COMO FAZER (passo a passo):',
        '',
        '1. Clique no link da Delegacia Eletrônica do seu estado (abaixo)',
        '2. Procure o botão "Registrar Ocorrência" ou "Nova Ocorrência" e clique nele',
        '3. Quando pedir o tipo de crime, escolha "Estelionato" ou "Fraude / Estelionato"',
        '4. Preencha seus dados pessoais (nome, CPF, endereço) — são os mesmos que você já colocou aqui',
        '5. Quando chegar no campo "Relato dos fatos" ou "Descrição da ocorrência":',
        '   → Volte para esta página',
        '   → Clique no botão "Copiar texto" (lá em cima)',
        '   → Volte para o site da delegacia',
        '   → Clique no campo de texto e aperte Ctrl+V (ou segure no campo e toque em "Colar" no celular)',
        '6. Confira se todos os dados estão corretos',
        '7. Clique em "Enviar" ou "Registrar"',
        '8. IMPORTANTE: Anote o número do B.O. que vai aparecer na tela — você vai precisar dele!',
        '',
        '⚠️ Se o site pedir para criar conta ou fazer login, faça isso primeiro (geralmente pede CPF e um e-mail).',
        '',
        '⚠️ Se der erro no site, tente outro link abaixo. O SINESP funciona para a maioria dos estados.',
      ],
      links: [
        { label: 'Delegacia Virtual Nacional (SINESP) — funciona na maioria dos estados', href: 'https://delegaciavirtual.sinesp.gov.br' },
        { label: 'Delegacia Eletrônica de São Paulo (SP)', href: 'https://www.delegaciaeletronica.policiacivil.sp.gov.br' },
        { label: 'Delegacia Online de Minas Gerais (MG)', href: 'https://www.delegaciaonline.mg.gov.br' },
        { label: 'Delegacia Online do Rio de Janeiro (RJ)', href: 'https://dedfrj.pcivil.rj.gov.br' },
        { label: 'Delegacia Online do Paraná (PR)', href: 'https://www.delegaciaeletronica.pr.gov.br' },
        { label: 'Delegacia Online da Bahia (BA)', href: 'https://delegaciavirtual.ssp.ba.gov.br' },
      ],
    },
    {
      id: 'banco',
      titulo: 'Ligar para o banco e contestar a transação',
      desc: 'Ligue agora, peça a contestação formal e anote o protocolo.',
      prazo: 'AGORA',
      detalhes: [
        '📞 O QUE FAZER:',
        '',
        '1. Abra o aplicativo do seu banco e procure o número do SAC (geralmente fica em "Ajuda" ou "Atendimento")',
        '2. Ligue para o SAC do banco',
        '3. Quando o atendente atender, fale exatamente isso:',
        '',
        `"Boa tarde, meu nome é ${nomeVitima}. Eu fui vítima de um golpe e preciso registrar uma contestação de transação fraudulenta. Preciso que seja aberto um protocolo de contestação."`,
        '',
        '4. O atendente vai pedir seus dados (CPF, conta, valor). Informe tudo.',
        '5. PEÇA E ANOTE:',
        '   → O número do protocolo de atendimento',
        '   → O nome do atendente',
        '   → Se foi aberto pedido de contestação formal',
        '',
        '6. Se o atendente disser que "não pode fazer nada", fale:',
        '',
        '"Eu tenho direito à contestação conforme o Código de Defesa do Consumidor, artigo 14. Preciso que abra o protocolo. Se não for possível, por favor me transfira para a Ouvidoria."',
        '',
        '📋 NÚMEROS DOS PRINCIPAIS BANCOS:',
        '   • Nubank: 0800 591 2117',
        '   • Itaú: 0800 728 0728',
        '   • Bradesco: 0800 704 8383',
        '   • Santander: 0800 702 3535',
        '   • Banco do Brasil: 0800 729 0722',
        '   • Caixa: 0800 726 0101',
        '   • Inter: 3003 4070',
        '   • C6 Bank: 3003 6116',
        '   • PicPay: 3003 3699',
        '   • Mercado Pago: 0800 637 7246',
      ],
      links: [],
    },
    // ── Passo específico: MED (somente Pix) ──
    ...(isPix ? [{
      id: 'med',
      titulo: 'Pedir o MED no banco (prazo máximo: 72 horas)',
      desc: 'O MED bloqueia o dinheiro na conta do golpista. É a melhor chance de recuperar.',
      prazo: 'URGENTE',
      detalhes: [
        '⏰ O QUE É O MED:',
        'MED = Mecanismo Especial de Devolução. É uma regra do Banco Central que obriga os bancos a bloquearem o dinheiro na conta de quem recebeu o Pix, SE você pedir dentro de 72 horas.',
        '',
        '📱 COMO PEDIR PELO APP DO BANCO:',
        '',
        '1. Abra o app do seu banco',
        '2. Vá em "Pix" → "Extrato" ou "Histórico de Pix"',
        '3. Encontre a transferência que foi o golpe e toque nela',
        '4. Procure um botão como "Contestar", "Reportar problema" ou "Solicitar devolução"',
        '5. Selecione o motivo: "Fraude" ou "Golpe"',
        '6. Confirme a solicitação',
        '',
        '📞 SE NÃO ENCONTRAR NO APP:',
        '',
        'Ligue para o SAC do banco e fale:',
        `"Preciso solicitar o acionamento do MED — Mecanismo Especial de Devolução — para uma transferência Pix fraudulenta. Meu nome é ${nomeVitima}."`,
        '',
        '⚠️ IMPORTANTE:',
        '• O prazo é de 72 horas a partir da transferência',
        '• Se o banco negar, registre reclamação no Banco Central (próximo passo)',
        '• O banco é OBRIGADO a aceitar o pedido dentro do prazo',
      ],
      links: [],
    }] : []),
    // ── Passo específico: WhatsApp ──
    ...(isWhatsApp ? [{
      id: 'whatsapp',
      titulo: 'Proteger seu WhatsApp e avisar seus contatos',
      desc: 'Recupere o acesso e avise as pessoas que podem ter sido enganadas.',
      prazo: 'AGORA',
      detalhes: [
        '📱 RECUPERAR O ACESSO:',
        '',
        '1. Desinstale e reinstale o WhatsApp no seu celular',
        '2. Abra o WhatsApp e coloque seu número de telefone',
        '3. Você vai receber um código por SMS — digite esse código',
        '4. Se pedir, digite o PIN de verificação em duas etapas',
        '5. O golpista será desconectado automaticamente',
        '',
        '🔒 ATIVAR PROTEÇÃO (para não acontecer de novo):',
        '',
        '1. Abra WhatsApp → Configurações → Conta → Verificação em duas etapas',
        '2. Crie um PIN de 6 dígitos (diferente de senhas que já usa)',
        '3. Adicione um e-mail de recuperação',
        '',
        '📢 AVISAR SEUS CONTATOS:',
        '',
        '1. Publique um story/status no WhatsApp avisando que foi clonado',
        '2. Peça para as pessoas NÃO fazerem transferências se receberem mensagens pedindo dinheiro',
        '3. Avise especialmente as pessoas que o golpista já contatou',
        '',
        '⚠️ Se o golpista pediu dinheiro para seus contatos e eles transferiram, oriente-os a também registrar B.O. e acionar o MED (se foi Pix).',
      ],
      links: [
        { label: 'Suporte WhatsApp — Conta roubada', href: 'https://faq.whatsapp.com/1131652977717250/' },
      ],
    }] : []),
    // ── Passo específico: Cartão ──
    ...(isCartao ? [{
      id: 'cartao',
      titulo: 'Bloquear cartão e solicitar estorno (chargeback)',
      desc: 'Bloqueie o cartão imediatamente e peça o estorno das compras fraudulentas.',
      prazo: 'AGORA',
      detalhes: [
        '🔒 BLOQUEAR O CARTÃO:',
        '',
        '1. Abra o app do banco → Cartões → Bloquear cartão',
        '2. Selecione o cartão que foi fraudado e confirme o bloqueio',
        '3. Se não conseguir pelo app, ligue para o SAC do banco (números no passo anterior)',
        '',
        '💳 PEDIR ESTORNO (CHARGEBACK):',
        '',
        '1. No app do banco, vá na fatura do cartão',
        '2. Encontre as compras que você NÃO reconhece',
        '3. Toque em cada compra e selecione "Não reconheço" ou "Contestar"',
        '4. Se não tiver essa opção no app, ligue para o SAC e fale:',
        '',
        `"Preciso contestar compras não reconhecidas no meu cartão. Meu nome é ${nomeVitima}. Solicito o estorno (chargeback) conforme o artigo 14 do CDC."`,
        '',
        '5. ANOTE o número de protocolo da contestação',
        '',
        '📋 PEDIR NOVO CARTÃO:',
        '',
        '1. Depois de bloquear, solicite um novo cartão com número diferente',
        '2. O banco não pode cobrar taxa pelo novo cartão neste caso',
        '',
        '⚠️ O prazo para contestar compras no cartão é de até 90 dias após a fatura.',
      ],
      links: [],
    }] : []),
    {
      id: 'bacen',
      titulo: 'Registrar reclamação no Banco Central (BACEN)',
      desc: 'Isso cria pressão oficial sobre o banco para resolver seu caso.',
      prazo: '24H',
      detalhes: [
        '🏛️ POR QUE FAZER ISSO:',
        'Quando você registra uma reclamação no Banco Central, o banco PRECISA responder em até 10 dias. Isso cria pressão real para resolverem seu caso.',
        '',
        '📱 COMO FAZER (passo a passo):',
        '',
        '1. Abra o site: bcb.gov.br/meubc',
        '2. Clique em "Entrar" e faça login com sua conta Gov.br',
        '   (Se não tiver conta Gov.br, clique em "Criar conta" — é gratuito, só precisa do CPF)',
        '3. Depois de entrar, clique em "Registrar reclamação"',
        '4. Escolha o banco que você quer reclamar',
        '5. No tipo de reclamação, selecione "Pix" ou "Fraude/Golpe"',
        '6. Descreva o que aconteceu:',
        '',
        `"Fui vítima de golpe/fraude. Registrei B.O. e solicitei contestação ao banco, mas meu caso não foi resolvido. Solicito providências conforme Resolução BCB 93/2021."`,
        '',
        '7. Informe o número do protocolo do banco (aquele que você anotou no passo anterior)',
        '8. Clique em "Enviar"',
        '',
        '💡 Dica: Se você ainda não tem o protocolo do banco, ligue primeiro (passo anterior) e depois volte aqui.',
      ],
      links: [
        { label: 'Abrir site do Banco Central (MeuBC)', href: 'https://www.bcb.gov.br/meubc' },
      ],
    },
    {
      id: 'procon',
      titulo: 'Registrar no Procon (se o banco não resolver)',
      desc: 'O Procon intermedia entre você e o banco gratuitamente.',
      prazo: '5 DIAS',
      detalhes: [
        '🏢 QUANDO USAR O PROCON:',
        'Se o banco não resolver em 5 dias úteis após sua reclamação, o Procon pode intermediar.',
        '',
        '📱 COMO FAZER:',
        '',
        '1. Acesse o site do Procon do seu estado (o link mais comum é procon.sp.gov.br para SP)',
        '2. Procure "Registrar reclamação" ou "Nova reclamação"',
        '3. Selecione a categoria "Banco / Instituição Financeira"',
        '4. Descreva o problema e anexe:',
        '   → Cópia do B.O. (o PDF que você baixou)',
        '   → Comprovante da transferência',
        '   → Número do protocolo do banco',
        '5. Envie e aguarde — o Procon notifica o banco e cobra uma resposta',
        '',
        '💡 O serviço do Procon é 100% gratuito.',
      ],
      links: [
        { label: 'Procon SP', href: 'https://www.procon.sp.gov.br' },
        { label: 'Consumidor.gov.br (funciona para todos os estados)', href: 'https://consumidor.gov.br' },
      ],
    },
    // ── Passo específico: CVM (investimento fraudulento) ──
    ...(isInvestimento ? [{
      id: 'cvm',
      titulo: 'Denunciar na CVM (investimento fraudulento)',
      desc: 'A Comissão de Valores Mobiliários investiga fraudes em investimentos.',
      prazo: '7 DIAS',
      detalhes: [
        '📊 POR QUE DENUNCIAR NA CVM:',
        'A CVM regula o mercado de investimentos no Brasil. Se alguém ofereceu investimento fraudulento, a CVM pode investigar e até bloquear a empresa.',
        '',
        '📱 COMO FAZER:',
        '',
        '1. Acesse o site da CVM (link abaixo)',
        '2. Clique em "Denúncias e Reclamações"',
        '3. Preencha o formulário com:',
        '   → Nome da empresa/pessoa que ofereceu o investimento',
        '   → Como foi o contato (WhatsApp, Instagram, site)',
        '   → Valores investidos e promessas feitas',
        '   → Links, prints e comprovantes que tiver',
        '4. Envie a denúncia',
        '',
        '💡 Guarde os prints de tudo: conversas, sites, comprovantes de transferência, promessas de rentabilidade.',
      ],
      links: [
        { label: 'CVM — Denúncias e Reclamações', href: 'https://www.gov.br/cvm/pt-br/canais_atendimento/reclamacoes' },
      ],
    }] : []),
    {
      id: 'senhas',
      titulo: 'Trocar todas as senhas e proteger suas contas',
      desc: 'Evite que o golpista acesse suas outras contas.',
      prazo: 'AGORA',
      detalhes: [
        '🔒 O QUE TROCAR AGORA:',
        '',
        '1. SENHA DO BANCO:',
        '   → Abra o app do banco → Configurações → Segurança → Alterar senha',
        '   → Use uma senha diferente da anterior',
        '',
        '2. SENHA DO E-MAIL:',
        '   → Se o golpista sabe seu e-mail, troque a senha',
        '   → Gmail: myaccount.google.com → Segurança → Senha',
        '',
        '3. CARTÕES:',
        '   → No app do banco, vá em "Cartões" → "Bloquear cartão"',
        '   → Bloqueie e peça um novo com número diferente',
        '',
        '4. ATIVE A VERIFICAÇÃO EM DUAS ETAPAS:',
        '   → No app do banco: Configurações → Segurança → Verificação em duas etapas',
        '   → No e-mail: Configurações → Segurança → Verificação em duas etapas',
        '   → No WhatsApp: Configurações → Conta → Verificação em duas etapas',
        '',
        '💡 Dica: Use senhas diferentes para cada serviço. Nunca use a mesma senha do banco em outros sites.',
      ],
      links: [],
    },
  ];

  return (
    <div className="space-y-5">
      {/* ── Alerta principal ── */}
      <div className="alert-warning">
        <AlertTriangle className="w-5 h-5 shrink-0" />
        <div>
          <strong className="block">Importante: o documento sozinho não resolve.</strong>
          <p className="text-sm mt-1">Siga cada passo abaixo para registrar oficialmente e ter a melhor chance de recuperar seu dinheiro.</p>
        </div>
      </div>

      {/* ── Download + Copiar + Email ── */}
      <div className="card border-green-500/20">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-400" />
          Seu documento está pronto
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button onClick={handleDownload} disabled={downloading} className="btn-primary justify-center py-3">
            <FileText className="w-4 h-4" />
            {downloading ? 'Baixando...' : 'Baixar PDF'}
          </button>
          <button
            onClick={handleCopy}
            className={`btn-secondary justify-center py-3 ${copied ? 'border-green-500/40 text-green-400' : ''}`}
          >
            {copied ? <><CheckCircle className="w-4 h-4" /> Copiado!</> : <><Copy className="w-4 h-4" /> Copiar texto</>}
          </button>
          <button
            onClick={handleEnviarEmail}
            disabled={sendingEmail || emailSent}
            className={`btn-secondary justify-center py-3 ${emailSent ? 'border-green-500/40 text-green-400' : ''}`}
          >
            {emailSent ? (
              <><CheckCircle className="w-4 h-4" /> Enviado!</>
            ) : sendingEmail ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
            ) : (
              <><Mail className="w-4 h-4" /> Enviar por e-mail</>
            )}
          </button>
        </div>
        <p className="text-xs text-white/40 mt-3">
          Seus documentos ficam salvos neste navegador. Use &quot;Enviar por e-mail&quot; para ter uma cópia segura em {emailVitima}.
        </p>
      </div>

      {/* ── Aprimorar com IA ── */}
      <div className="card border-purple-500/20 bg-purple-500/5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-bold text-white text-sm mb-1">Aprimorar texto com IA</h3>
            <p className="text-xs text-white/50 mb-3">
              Melhora a linguagem jurídica, adiciona fundamentos legais e deixa o documento mais profissional — ideal para usar em ação judicial.
            </p>
            {!textoMelhorado ? (
              <button
                onClick={handleMelhorarIA}
                disabled={melhorando}
                className="btn-secondary justify-center py-2.5 text-sm border-purple-500/30 hover:border-purple-500/50"
              >
                {melhorando ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Aprimorando...</>
                ) : (
                  <><Sparkles className="w-4 h-4 text-purple-400" /> Aprimorar documento</>
                )}
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-300 font-medium">Texto aprimorado!</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUsarMelhorado(true)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${usarMelhorado ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20'}`}
                  >
                    Versão aprimorada
                  </button>
                  <button
                    onClick={() => setUsarMelhorado(false)}
                    className={`text-xs px-3 py-1.5 rounded-lg transition-all ${!usarMelhorado ? 'bg-green-500/20 text-green-300 border border-green-500/40' : 'bg-white/5 text-white/50 border border-white/10 hover:border-white/20'}`}
                  >
                    Versão original
                  </button>
                </div>
                <p className="text-[0.65rem] text-white/30">Os botões acima (PDF, copiar, e-mail) usam a versão selecionada.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Passo a passo detalhado ── */}
      <div className="card border-red-500/15">
        <h3 className="font-bold text-white mb-1 flex items-center gap-2">
          <Shield className="w-5 h-5 text-red-400" />
          Passo a passo para recuperar seu dinheiro
        </h3>
        <p className="text-xs text-white/40 mb-5">Siga na ordem. Toque em cada passo para ver as instruções completas.</p>

        <div className="space-y-3">
          {steps.map((step, i) => {
            const isChecked = checklist[step.id] || false;
            const isExpanded = expandedStep === step.id;
            const isUrgent = ['AGORA', 'URGENTE'].includes(step.prazo);
            return (
              <div key={step.id} className={`border rounded-xl transition-all duration-200 overflow-hidden ${isChecked ? 'border-green-500/30 bg-green-500/5' : isUrgent ? 'border-red-500/20 bg-red-500/[0.03]' : 'border-white/[0.08]'}`}>
                {/* Header do passo */}
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggle(step.id)}
                      className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${isChecked ? 'border-green-500 bg-green-500' : 'border-white/20 hover:border-white/40'}`}
                    >
                      {isChecked ? <CheckCircle className="w-4 h-4 text-white" /> : <span className="text-xs font-bold text-white/40">{i + 1}</span>}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className={`font-bold text-sm ${isChecked ? 'text-green-400 line-through' : 'text-white'}`}>{step.titulo}</h4>
                        <span className={`text-[0.6rem] font-black px-2 py-0.5 rounded-full ${isUrgent ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white/50'}`}>{step.prazo}</span>
                      </div>
                      <p className={`text-xs ${isChecked ? 'text-white/30' : 'text-white/60'}`}>{step.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center shrink-0 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-white/50" /> : <ChevronDown className="w-4 h-4 text-white/50" />}
                    </button>
                  </div>
                </div>

                {/* Detalhes expandidos */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0">
                    <div className="ml-10 border-t border-white/[0.06] pt-4">
                      <div className="bg-white/[0.03] rounded-xl p-4 space-y-1.5">
                        {step.detalhes.map((linha, j) => {
                          if (!linha) return <div key={j} className="h-2" />;
                          const isTitle = linha.startsWith('📱') || linha.startsWith('📞') || linha.startsWith('⏰') || linha.startsWith('🏛️') || linha.startsWith('🏢') || linha.startsWith('🔒') || linha.startsWith('📋') || linha.startsWith('📄') || linha.startsWith('💳') || linha.startsWith('📢') || linha.startsWith('📊');
                          const isWarning = linha.startsWith('⚠️');
                          const isTip = linha.startsWith('💡');
                          const isQuote = linha.startsWith('"') && linha.endsWith('"');
                          if (isQuote) {
                            return (
                              <div key={j} className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 my-2">
                                <p className="text-sm text-green-300 italic">{linha}</p>
                                <button
                                  onClick={() => { navigator.clipboard.writeText(linha.slice(1, -1)); toast.success('Texto copiado!'); }}
                                  className="text-xs text-green-400 hover:text-green-300 mt-2 flex items-center gap-1"
                                >
                                  <Copy className="w-3 h-3" /> Copiar este texto
                                </button>
                              </div>
                            );
                          }
                          return (
                            <p key={j} className={`text-xs leading-relaxed ${isTitle ? 'text-white font-bold mt-2' : isWarning ? 'text-amber-400 font-medium mt-2' : isTip ? 'text-green-400 mt-2' : 'text-white/60'}`}>
                              {linha}
                            </p>
                          );
                        })}
                      </div>

                      {/* Links do passo */}
                      {step.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {step.links.map((link) => (
                            link.href.startsWith('/') ? (
                              <Link key={link.href} href={link.href} className="text-xs bg-green-500/10 text-green-400 hover:bg-green-500/20 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors">
                                <ArrowRight className="w-3 h-3" />{link.label}
                              </Link>
                            ) : (
                              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="text-xs bg-white/5 text-green-400 hover:bg-white/10 px-3 py-2 rounded-lg flex items-center gap-1.5 transition-colors">
                                <ExternalLink className="w-3 h-3" />{link.label}
                              </a>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
