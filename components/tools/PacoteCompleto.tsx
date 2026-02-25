'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Zap, CheckCircle, FileText, Shield, Bell, Lock, Phone, Mail, ExternalLink, Loader2, Scale, Building2, Sparkles,
} from 'lucide-react';
import {
  gerarTextoMED, gerarTextoBO, gerarTextoNotificacaoBanco,
  gerarTextoReclamacaoBACEN, gerarTextoReclamacaoProcon,
} from '@/lib/pdf-generator';
import { BANK_CONTACTS } from '@/lib/bank-contacts';
import CountdownMED from './CountdownMED';
import PaymentModal from '@/components/tools/PaymentModal';
import GuiaPosCompra from '@/components/tools/GuiaPosCompra';
import toast from 'react-hot-toast';

interface PaymentData { paymentId: string; pixQrCode: string; pixCopiaECola: string; valor: number; }

const schema = z.object({
  nome: z.string().min(3, 'Nome muito curto'),
  cpf: z.string().min(11, 'CPF inválido').max(14),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  endereco: z.string().optional(),
  banco: z.string().optional(),
  agencia: z.string().optional(),
  conta: z.string().optional(),
  valor: z.string().optional(),
  dataOcorrencia: z.string().min(1, 'Informe a data'),
  chavePixDestinatario: z.string().optional(),
  tipoGolpe: z.string().min(1, 'Selecione o tipo de golpe'),
  descricao: z.string().min(80, 'Descreva com mais detalhes (mín. 80 caracteres)'),
  numeroBo: z.string().optional(),
  dadosInfrator: z.string().optional(),
});

type FormData = z.infer<typeof schema>;
type DocKey = 'bo' | 'med' | 'notificacao' | 'bacen' | 'procon';

const BANCOS = ['Nubank', 'Itaú', 'Bradesco', 'Santander', 'Banco do Brasil', 'Caixa', 'Inter', 'C6 Bank', 'PicPay', 'Mercado Pago', 'Outro'];

const TIPOS_GOLPE = [
  'Golpe via Pix',
  'Clonagem de WhatsApp',
  'Boleto Falso',
  'App/Site Falso de Banco',
  'Golpe por Telefone',
  'Fraude em Cartão',
  'Investimento Fraudulento',
  'Roubo/Furto de Celular',
  'Outro',
];

interface GolpeConfig {
  showBanco: boolean;
  showAgenciaConta: boolean;
  showValor: boolean;
  bancoLabel: string;
  valorLabel: string;
  infratorLabel: string;
  infratorPlaceholder: string;
  descPlaceholder: string;
  docs: DocKey[];
}

const GOLPE_CONFIG: Record<string, GolpeConfig> = {
  'Golpe via Pix': {
    showBanco: true, showAgenciaConta: true, showValor: true,
    bancoLabel: 'Banco da sua conta *',
    valorLabel: 'Valor transferido (R$) *',
    infratorLabel: 'Outros dados do golpista (opcional)',
    infratorPlaceholder: 'Nome, telefone, redes sociais do golpista...',
    descPlaceholder: 'Descreva como aconteceu: quem te contatou, o que disseram, como você fez o Pix...',
    docs: ['bo', 'med', 'notificacao', 'bacen', 'procon'],
  },
  'Clonagem de WhatsApp': {
    showBanco: false, showAgenciaConta: false, showValor: true,
    bancoLabel: '',
    valorLabel: 'Valor do prejuízo (R$)',
    infratorLabel: 'Número do WhatsApp e dados do golpista',
    infratorPlaceholder: '(11) 99999-9999, perfil usado, quem foi contactado...',
    descPlaceholder: 'Como percebeu a clonagem, o que o golpista fez, quem foi contactado, valores pedidos...',
    docs: ['bo', 'procon'],
  },
  'Boleto Falso': {
    showBanco: true, showAgenciaConta: true, showValor: true,
    bancoLabel: 'Banco onde pagou o boleto *',
    valorLabel: 'Valor do boleto (R$) *',
    infratorLabel: 'Dados do boleto falso e empresa cobrada',
    infratorPlaceholder: 'Banco emitente, linha digitável, empresa que pagava...',
    descPlaceholder: 'Como recebeu o boleto, o que achava que estava pagando, como percebeu a fraude...',
    docs: ['bo', 'notificacao', 'bacen', 'procon'],
  },
  'App/Site Falso de Banco': {
    showBanco: true, showAgenciaConta: true, showValor: true,
    bancoLabel: 'Banco da sua conta *',
    valorLabel: 'Valor perdido (R$) *',
    infratorLabel: 'URL ou nome do site/app falso',
    infratorPlaceholder: 'www.exemplo.com, nome do app na loja...',
    descPlaceholder: 'Como encontrou o site/app, o que pediu, que dados você colocou, quando percebeu...',
    docs: ['bo', 'notificacao', 'bacen', 'procon'],
  },
  'Golpe por Telefone': {
    showBanco: false, showAgenciaConta: false, showValor: true,
    bancoLabel: '',
    valorLabel: 'Valor do prejuízo (R$)',
    infratorLabel: 'Número que ligou e empresa que fingiu ser',
    infratorPlaceholder: '0800-123-4567, empresa que fingiu ser, o que pediram...',
    descPlaceholder: 'Quem ligou, o que disseram, que dados pediu, o que você fez...',
    docs: ['bo', 'procon'],
  },
  'Fraude em Cartão': {
    showBanco: true, showAgenciaConta: false, showValor: true,
    bancoLabel: 'Banco do cartão *',
    valorLabel: 'Valor total das compras fraudulentas (R$) *',
    infratorLabel: 'Dados do cartão e transações não reconhecidas',
    infratorPlaceholder: 'Final 1234, Visa, compras em loja X no valor de R$...',
    descPlaceholder: 'Quando percebeu as compras, se o cartão estava com você, valores e lojas...',
    docs: ['bo', 'notificacao', 'bacen', 'procon'],
  },
  'Investimento Fraudulento': {
    showBanco: true, showAgenciaConta: true, showValor: true,
    bancoLabel: 'Banco de onde saiu o dinheiro *',
    valorLabel: 'Valor total investido (R$) *',
    infratorLabel: 'Plataforma/site do investimento fraudulento',
    infratorPlaceholder: 'Nome do site, perfil no Instagram, promessas feitas...',
    descPlaceholder: 'Como conheceu a plataforma, o que prometeram, quanto investiu, quando parou de receber...',
    docs: ['bo', 'notificacao', 'bacen', 'procon'],
  },
  'Roubo/Furto de Celular': {
    showBanco: false, showAgenciaConta: false, showValor: false,
    bancoLabel: '',
    valorLabel: '',
    infratorLabel: 'Dados do aparelho roubado',
    infratorPlaceholder: 'Modelo do celular, IMEI (na caixa/nota fiscal), cor, operadora...',
    descPlaceholder: 'Onde e quando aconteceu, como foi abordado, se acessaram seus apps bancários, prejuízo financeiro...',
    docs: ['bo'],
  },
  'Outro': {
    showBanco: true, showAgenciaConta: true, showValor: true,
    bancoLabel: 'Banco *',
    valorLabel: 'Valor do prejuízo (R$) *',
    infratorLabel: 'Dados do infrator (opcional)',
    infratorPlaceholder: 'Nome, conta bancária, telefone, redes sociais...',
    descPlaceholder: 'Descreva cronologicamente como o golpe aconteceu...',
    docs: ['bo', 'notificacao', 'bacen', 'procon'],
  },
};

const DOC_META: Record<DocKey, { label: string; icon: typeof FileText; color: string }> = {
  bo: { label: 'Boletim de Ocorrência', icon: FileText, color: 'text-blue-400' },
  med: { label: 'Contestação MED', icon: Shield, color: 'text-red-400' },
  notificacao: { label: 'Notificação Bancária', icon: Bell, color: 'text-green-400' },
  bacen: { label: 'Reclamação BACEN', icon: Scale, color: 'text-amber-400' },
  procon: { label: 'Reclamação Procon', icon: Building2, color: 'text-purple-400' },
};

interface Docs {
  texts: Partial<Record<DocKey, string>>;
  docList: DocKey[];
  data: FormData;
  valorNum: number;
}

export default function PacoteCompleto() {
  const [docs, setDocs] = useState<Docs | null>(null);
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payment, setPayment] = useState<PaymentData | null>(null);
  const [valorDisplay, setValorDisplay] = useState('');
  const [melhorandoDescricao, setMelhorandoDescricao] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, getValues, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (!digits) { setValorDisplay(''); setValue('valor', ''); return; }
    const cents = parseInt(digits, 10);
    const formatted = (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setValorDisplay(formatted);
    setValue('valor', formatted, { shouldValidate: true });
  };

  const banco = watch('banco');
  const dataOcorrencia = watch('dataOcorrencia');
  const tipoGolpe = watch('tipoGolpe');
  const isPix = tipoGolpe === 'Golpe via Pix';
  const config = tipoGolpe ? GOLPE_CONFIG[tipoGolpe] || GOLPE_CONFIG['Outro'] : null;
  const bankContact = banco ? BANK_CONTACTS[banco] : undefined;

  const handleMelhorarDescricao = async () => {
    const descricao = getValues('descricao');
    if (!descricao || descricao.length < 30) {
      toast.error('Escreva pelo menos 30 caracteres antes de aprimorar.');
      return;
    }
    setMelhorandoDescricao(true);
    try {
      const res = await fetch('/api/melhorar-texto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: descricao, tipo: 'descricao' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao melhorar texto');
      setValue('descricao', data.textoMelhorado, { shouldValidate: true });
      toast.success('Descrição aprimorada com IA!');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao aprimorar');
    } finally {
      setMelhorandoDescricao(false);
    }
  };

  const gerarDocs = (data: FormData): Docs => {
    const valorNum = data.valor ? (parseFloat(data.valor.replace(/\./g, '').replace(',', '.')) || 0) : 0;
    const bancoVal = data.banco || 'Não informado';
    const agenciaVal = data.agencia || 'N/A';
    const contaVal = data.conta || 'N/A';
    const cfg = GOLPE_CONFIG[data.tipoGolpe] || GOLPE_CONFIG['Outro'];
    const docList = cfg.docs;
    const texts: Partial<Record<DocKey, string>> = {};

    if (docList.includes('bo')) {
      texts.bo = gerarTextoBO({
        nomeVitima: data.nome, cpfVitima: data.cpf,
        enderecoVitima: data.endereco || 'Não informado', telefoneVitima: data.telefone,
        emailVitima: data.email, dataOcorrencia: data.dataOcorrencia,
        localOcorrencia: 'Internet / Aplicativo bancário', tipoGolpe: data.tipoGolpe,
        descricaoDetalhada: data.descricao, valorPrejuizo: valorNum,
        dadosInfrator: data.dadosInfrator,
      });
    }
    if (docList.includes('med')) {
      texts.med = gerarTextoMED({
        nomeVitima: data.nome, cpfVitima: data.cpf, banco: bancoVal,
        agencia: agenciaVal, conta: contaVal, valorTransferido: valorNum,
        dataOcorrencia: data.dataOcorrencia, chavePixDestinatario: data.chavePixDestinatario || 'N/A',
        descricaoGolpe: data.descricao, numeroBo: data.numeroBo,
      });
    }
    if (docList.includes('notificacao')) {
      texts.notificacao = gerarTextoNotificacaoBanco({
        nomeVitima: data.nome, cpfVitima: data.cpf, banco: bancoVal,
        agencia: agenciaVal, conta: contaVal, dataOcorrencia: data.dataOcorrencia,
        valorPrejuizo: valorNum, tipoFraude: data.tipoGolpe, descricao: data.descricao,
        pedidos: [
          `Devolução integral de R$ ${valorNum.toFixed(2).replace('.', ',')} em até 5 dias úteis`,
          'Fornecimento de número de protocolo desta notificação',
          'Comunicação ao Banco Central do Brasil (BACEN) sobre o incidente',
          'Investigação interna e medidas para prevenir recorrência',
          'Manifestação formal em até 5 (cinco) dias úteis',
          ...(data.tipoGolpe === 'Golpe via Pix' ? ['Acionamento imediato do MED — Resolução BCB 93/2021'] : []),
        ],
      });
    }
    if (docList.includes('bacen')) {
      texts.bacen = gerarTextoReclamacaoBACEN({
        nomeVitima: data.nome, cpfVitima: data.cpf, banco: bancoVal,
        agencia: agenciaVal, conta: contaVal, dataOcorrencia: data.dataOcorrencia,
        valorPrejuizo: valorNum, tipoFraude: data.tipoGolpe, descricao: data.descricao,
      });
    }
    if (docList.includes('procon')) {
      texts.procon = gerarTextoReclamacaoProcon({
        nomeVitima: data.nome, cpfVitima: data.cpf, banco: bancoVal,
        dataOcorrencia: data.dataOcorrencia, valorPrejuizo: valorNum,
        tipoFraude: data.tipoGolpe, descricao: data.descricao,
      });
    }

    return { texts, docList, data, valorNum };
  };

  const startPayment = async (data: FormData) => {
    setPaying(true);
    try {
      const res = await fetch('/api/asaas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto: 'PACOTE_EMERGENCIA', nome: data.nome, email: data.email, cpf: data.cpf.replace(/\D/g, '') }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error ?? 'Erro ao criar pagamento');
      setPayment({ paymentId: result.paymentId, pixQrCode: result.pixQrCode, pixCopiaECola: result.pixCopiaECola, valor: result.valor });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao iniciar pagamento');
    } finally {
      setPaying(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    const newDocs = gerarDocs(data);
    setDocs(newDocs);
    await startPayment(data);
  };

  // ─── VIEW: FORM ──────────────────────────────────────────────────────────────
  if (!docs) {
    const docCount = config?.docs.length ?? 0;

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {isPix && dataOcorrencia && <CountdownMED dataOcorrencia={dataOcorrencia} />}

        <div className="card border-orange-500/20">
          <h2 className="font-bold text-white text-lg mb-5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-400" />
            Kit de Recuperação
          </h2>

          {/* ── Seus dados ── */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Seus dados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Nome completo *</label>
                <input {...register('nome')} className="input" placeholder="Nome completo" />
                {errors.nome && <p className="text-red-400 text-xs mt-1">{errors.nome.message}</p>}
              </div>
              <div>
                <label className="label">CPF *</label>
                <input {...register('cpf')} className="input" placeholder="000.000.000-00" />
                {errors.cpf && <p className="text-red-400 text-xs mt-1">{errors.cpf.message}</p>}
              </div>
              <div>
                <label className="label">E-mail *</label>
                <input {...register('email')} type="email" className="input" placeholder="seu@email.com" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="label">Telefone *</label>
                <input {...register('telefone')} className="input" placeholder="(11) 99999-9999" />
                {errors.telefone && <p className="text-red-400 text-xs mt-1">{errors.telefone.message}</p>}
              </div>
            </div>
            <div>
              <label className="label">Endereço completo (opcional — para o BO)</label>
              <input {...register('endereco')} className="input" placeholder="Rua, número, bairro, cidade — UF" />
            </div>
          </div>

          {/* ── Tipo de golpe ── */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">O que aconteceu?</h3>
            <div>
              <label className="label">Tipo de golpe *</label>
              <select {...register('tipoGolpe')} className="select">
                <option value="">Selecione o que aconteceu...</option>
                {TIPOS_GOLPE.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              {errors.tipoGolpe && <p className="text-red-400 text-xs mt-1">{errors.tipoGolpe.message}</p>}
            </div>

            {config && (
              <div className="flex flex-wrap gap-2">
                {config.docs.map((key) => (
                  <span key={key} className="text-[0.65rem] px-2 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">
                    {DOC_META[key].label}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Campos dinâmicos ── */}
          {config && (
            <>
              {config.showBanco && (
                <div className="space-y-4 mb-6">
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Dados bancários</h3>
                  <div>
                    <label className="label">{config.bancoLabel}</label>
                    <select {...register('banco')} className="select">
                      <option value="">Selecione o banco...</option>
                      {BANCOS.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  {config.showAgenciaConta && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">Agência *</label>
                        <input {...register('agencia')} className="input" placeholder="0000" />
                      </div>
                      <div>
                        <label className="label">Conta *</label>
                        <input {...register('conta')} className="input" placeholder="00000-0" />
                      </div>
                    </div>
                  )}
                  {bankContact && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                      <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Contato oficial — {banco}</p>
                      <div className="flex items-start gap-2 text-sm">
                        <Phone className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span className="text-white/70">SAC: <span className="text-white font-mono">{bankContact.sac}</span></span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <Mail className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span className="text-white/70">Ouvidoria: <span className="text-white">{bankContact.ouvidoria}</span></span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <FileText className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <span className="text-white/60 text-xs">{bankContact.instrucaoMED}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4 mb-6">
                <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Detalhes da ocorrência</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {config.showValor && (
                    <div>
                      <label className="label">{config.valorLabel}</label>
                      <input value={valorDisplay} onChange={handleValorChange} inputMode="numeric" className="input" placeholder="0,00" />
                    </div>
                  )}
                  <div>
                    <label className="label">Data da ocorrência *</label>
                    <input {...register('dataOcorrencia')} type="date" className="input" />
                    {errors.dataOcorrencia && <p className="text-red-400 text-xs mt-1">{errors.dataOcorrencia.message}</p>}
                  </div>
                </div>
                {isPix && (
                  <div>
                    <label className="label">Chave Pix do golpista *</label>
                    <input {...register('chavePixDestinatario')} className="input" placeholder="CPF, e-mail, telefone ou chave aleatória" />
                  </div>
                )}
                <div>
                  <label className="label">{config.infratorLabel}</label>
                  <textarea {...register('dadosInfrator')} rows={2} className="input resize-none"
                    placeholder={config.infratorPlaceholder} />
                </div>
                <div>
                  <label className="label">Descrição detalhada *</label>
                  <textarea {...register('descricao')} rows={5} className="input resize-none"
                    placeholder={config.descPlaceholder} />
                  {errors.descricao && <p className="text-red-400 text-xs mt-1">{errors.descricao.message}</p>}
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-white/30">{watch('descricao')?.length || 0} / mín. 80 caracteres</p>
                    <button type="button" onClick={handleMelhorarDescricao} disabled={melhorandoDescricao}
                      className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 disabled:opacity-50 transition-colors">
                      {melhorandoDescricao
                        ? <><Loader2 className="w-3 h-3 animate-spin" /> Aprimorando...</>
                        : <><Sparkles className="w-3 h-3" /> Aprimorar com IA</>}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="label">Número do BO (se já registrou)</label>
                  <input {...register('numeroBo')} className="input" placeholder="Opcional" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── CTA: Pagar + gerar ── */}
        {config && (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {['Documentos jurídicos prontos', 'Guia passo a passo', 'Melhoria com IA', 'Garantia 7 dias'].map((t) => (
                <span key={t} className="text-[0.65rem] px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  <CheckCircle className="w-3 h-3 inline mr-1" />{t}
                </span>
              ))}
            </div>
            <button type="submit" disabled={paying}
              className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
              {paying
                ? <><Loader2 className="w-5 h-5 animate-spin" /> Processando...</>
                : <><Lock className="w-5 h-5" /> Pagar R$47 — gerar {docCount} documento{docCount > 1 ? 's' : ''}</>}
            </button>
            <p className="text-xs text-white/30 text-center">Pagamento seguro via PIX (Asaas). Garantia de 7 dias.</p>
          </div>
        )}

        {payment && (
          <PaymentModal
            paymentId={payment.paymentId}
            pixQrCode={payment.pixQrCode}
            pixCopiaECola={payment.pixCopiaECola}
            valor={payment.valor}
            produto={`Kit ${config?.docs.length ?? 0} Documento${(config?.docs.length ?? 0) > 1 ? 's' : ''}`}
            onPaid={() => { setPaid(true); setPayment(null); }}
            onClose={() => setPayment(null)}
          />
        )}
      </form>
    );
  }

  // ─── VIEW: PAID — documentos + guia passo a passo ─────────────────────────
  if (docs && paid) {
    const allDocsText = docs.docList
      .map((key) => docs.texts[key])
      .filter(Boolean)
      .join('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n');

    return (
      <GuiaPosCompra
        textoDocumento={allDocsText}
        nomeArquivoPDF="kit-recuperacao-central-defesa-digital.pdf"
        tituloPDF="Kit de Recuperação"
        tipoGolpe={docs.data.tipoGolpe}
        nomeVitima={docs.data.nome}
        emailVitima={docs.data.email}
        tipoDocumento="pacote"
      />
    );
  }

  // ─── VIEW: AGUARDANDO PAGAMENTO ───────────────────────────────────────────
  if (docs && !paid) {
    const docCount = docs.docList.length;

    return (
      <div className="space-y-6">
        {docs.docList.includes('med') && docs.data.dataOcorrencia && <CountdownMED dataOcorrencia={docs.data.dataOcorrencia} />}

        <div className="card border-orange-500/20 text-center">
          <h3 className="font-bold text-white text-xl mb-2">Seus documentos estão prontos!</h3>
          <p className="text-white/60 text-sm mb-6">
            Finalize o pagamento para acessar {docCount > 1 ? `os ${docCount} documentos` : 'o documento'} + guia completo.
          </p>

          <ul className="text-sm text-white/60 space-y-2 mb-6 text-left max-w-sm mx-auto">
            {docs.docList.map((key) => (
              <li key={key} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                {DOC_META[key].label}
              </li>
            ))}
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              Guia passo a passo personalizado
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
              Melhoria com IA (linguagem de advogado)
            </li>
          </ul>

          <button onClick={() => startPayment(docs.data)} disabled={paying}
            className="btn-primary w-full justify-center py-4 text-base mb-3 disabled:opacity-60">
            {paying
              ? <><Loader2 className="w-5 h-5 animate-spin" /> Processando...</>
              : <><Lock className="w-5 h-5" /> Pagar R$47 via Pix</>}
          </button>
          <p className="text-xs text-white/30">Pagamento seguro via PIX (Asaas). Garantia de 7 dias.</p>
        </div>

        <button onClick={() => setDocs(null)} className="btn-secondary w-full justify-center text-sm">
          Voltar ao formulário
        </button>

        {payment && (
          <PaymentModal
            paymentId={payment.paymentId}
            pixQrCode={payment.pixQrCode}
            pixCopiaECola={payment.pixCopiaECola}
            valor={payment.valor}
            produto={`Kit ${docCount} Documento${docCount > 1 ? 's' : ''}`}
            onPaid={() => { setPaid(true); setPayment(null); }}
            onClose={() => setPayment(null)}
          />
        )}
      </div>
    );
  }

  return null;
}
