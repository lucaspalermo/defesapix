'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FileText, Eye, Lock, CheckCircle, Phone, Mail, ExternalLink, Zap, ArrowRight } from 'lucide-react';
import { gerarTextoMED } from '@/lib/pdf-generator';
import { BANK_CONTACTS } from '@/lib/bank-contacts';
import CountdownMED from './CountdownMED';
import EmailCapture from './EmailCapture';
import Link from 'next/link';

const schema = z.object({
  nomeVitima: z.string().min(3, 'Nome muito curto'),
  cpfVitima: z.string().min(11, 'CPF inválido').max(14),
  emailVitima: z.string().email('E-mail inválido'),
  banco: z.string().min(2, 'Informe o banco'),
  agencia: z.string().min(1, 'Informe a agência'),
  conta: z.string().min(1, 'Informe a conta'),
  valorTransferido: z.string().min(1, 'Informe o valor'),
  dataOcorrencia: z.string().min(1, 'Informe a data'),
  chavePixDestinatario: z.string().min(1, 'Informe a chave Pix do golpista'),
  descricaoGolpe: z.string().min(50, 'Descreva com mais detalhes (mín. 50 caracteres)'),
  numeroBo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const BANCOS = ['Nubank', 'Itaú', 'Bradesco', 'Santander', 'Banco do Brasil', 'Caixa', 'Inter', 'C6 Bank', 'PicPay', 'Mercado Pago', 'Outro'];

export default function GeradorMED() {
  const [step, setStep] = useState<'form' | 'preview'>('form');
  const [documentText, setDocumentText] = useState('');
  const [currentData, setCurrentData] = useState<FormData | null>(null);
  const [valorDisplay, setValorDisplay] = useState('');

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (!digits) { setValorDisplay(''); setValue('valorTransferido', ''); return; }
    const cents = parseInt(digits, 10);
    const formatted = (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setValorDisplay(formatted);
    setValue('valorTransferido', formatted, { shouldValidate: true });
  };

  const banco = watch('banco');
  const dataOcorrencia = watch('dataOcorrencia');
  const bankContact = BANK_CONTACTS[banco];

  const onSubmit = (data: FormData) => {
    const valorNum = parseFloat(data.valorTransferido.replace(/\./g, '').replace(',', '.')) || 0;
    const text = gerarTextoMED({
      nomeVitima: data.nomeVitima,
      cpfVitima: data.cpfVitima,
      banco: data.banco,
      agencia: data.agencia,
      conta: data.conta,
      valorTransferido: valorNum,
      dataOcorrencia: data.dataOcorrencia,
      chavePixDestinatario: data.chavePixDestinatario,
      descricaoGolpe: data.descricaoGolpe,
      numeroBo: data.numeroBo,
    });
    setDocumentText(text);
    setCurrentData(data);
    setStep('preview');
  };

  // ─── FORM ──────────────────────────────────────────────────────────────────
  if (step === 'form') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Live countdown */}
        {dataOcorrencia && <CountdownMED dataOcorrencia={dataOcorrencia} />}

        <div className="card border-green-500/20">
          <h2 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-400" />
            Dados para a Contestação MED
          </h2>

          {/* Personal */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider border-b border-white/10 pb-2">
              Seus dados (vítima)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Nome completo *</label>
                <input {...register('nomeVitima')} className="input" placeholder="Seu nome completo" />
                {errors.nomeVitima && <p className="text-red-400 text-xs mt-1">{errors.nomeVitima.message}</p>}
              </div>
              <div>
                <label className="label">CPF *</label>
                <input {...register('cpfVitima')} className="input" placeholder="000.000.000-00" />
                {errors.cpfVitima && <p className="text-red-400 text-xs mt-1">{errors.cpfVitima.message}</p>}
              </div>
            </div>
            <div>
              <label className="label">E-mail *</label>
              <input {...register('emailVitima')} type="email" className="input" placeholder="seu@email.com" />
              {errors.emailVitima && <p className="text-red-400 text-xs mt-1">{errors.emailVitima.message}</p>}
            </div>
          </div>

          {/* Bank */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider border-b border-white/10 pb-2">
              Dados bancários (sua conta)
            </h3>
            <div>
              <label className="label">Banco *</label>
              <select {...register('banco')} className="select">
                <option value="">Selecione seu banco...</option>
                {BANCOS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              {errors.banco && <p className="text-red-400 text-xs mt-1">{errors.banco.message}</p>}
            </div>

            {/* Bank contact card — shown live when bank is selected */}
            {bankContact && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
                  Como acionar o MED no {banco}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-white/70">SAC: <span className="text-white font-mono">{bankContact.sac}</span></span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <FileText className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span className="text-white/60 text-xs">{bankContact.instrucaoMED}</span>
                </div>
                {bankContact.emailFraude && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="text-white/70">Fraudes: <span className="text-white">{bankContact.emailFraude}</span></span>
                  </div>
                )}
                <a
                  href={bankContact.linkMeuBC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 mt-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Registrar no BACEN (MeuBC) →
                </a>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Agência *</label>
                <input {...register('agencia')} className="input" placeholder="0000" />
                {errors.agencia && <p className="text-red-400 text-xs mt-1">{errors.agencia.message}</p>}
              </div>
              <div>
                <label className="label">Conta *</label>
                <input {...register('conta')} className="input" placeholder="00000-0" />
                {errors.conta && <p className="text-red-400 text-xs mt-1">{errors.conta.message}</p>}
              </div>
            </div>
          </div>

          {/* Transaction */}
          <div className="space-y-4 mb-8">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider border-b border-white/10 pb-2">
              Dados da transação fraudulenta
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Valor transferido *</label>
                <input
                  value={valorDisplay}
                  onChange={handleValorChange}
                  inputMode="numeric"
                  className="input"
                  placeholder="0,00"
                />
                {errors.valorTransferido && <p className="text-red-400 text-xs mt-1">{errors.valorTransferido.message}</p>}
              </div>
              <div>
                <label className="label">Data do golpe *</label>
                <input {...register('dataOcorrencia')} type="date" className="input" />
                {errors.dataOcorrencia && <p className="text-red-400 text-xs mt-1">{errors.dataOcorrencia.message}</p>}
              </div>
            </div>
            <div>
              <label className="label">Chave Pix do destinatário (golpista) *</label>
              <input
                {...register('chavePixDestinatario')}
                className="input"
                placeholder="CPF, e-mail, telefone ou chave aleatória do golpista"
              />
              {errors.chavePixDestinatario && <p className="text-red-400 text-xs mt-1">{errors.chavePixDestinatario.message}</p>}
            </div>
            <div>
              <label className="label">Número do BO (se já registrou)</label>
              <input {...register('numeroBo')} className="input" placeholder="Opcional — número do boletim de ocorrência" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider border-b border-white/10 pb-2">
              Descrição do golpe
            </h3>
            <div>
              <label className="label">Descreva detalhadamente como ocorreu o golpe *</label>
              <textarea
                {...register('descricaoGolpe')}
                rows={5}
                className="input resize-none"
                placeholder="Ex: Recebi uma ligação de alguém que se identificou como funcionário do banco..."
              />
              {errors.descricaoGolpe && <p className="text-red-400 text-xs mt-1">{errors.descricaoGolpe.message}</p>}
              <p className="text-xs text-white/30 mt-1">{watch('descricaoGolpe')?.length || 0} / mín. 50 caracteres</p>
            </div>
          </div>
        </div>

        <div className="alert-info">
          <Lock className="w-5 h-5 shrink-0" />
          <p className="text-sm">
            Seus dados são processados localmente e não são armazenados sem sua autorização.
            O documento é gerado no seu próprio navegador.
          </p>
        </div>

        <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
          <Eye className="w-5 h-5" />
          Prévia do documento gratuita
        </button>
      </form>
    );
  }

  // ─── PREVIEW ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="card border-green-500/20">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h2 className="font-bold text-white">Contestação MED gerada!</h2>
          </div>
          <span className="badge-green">Pronta para uso</span>
        </div>

        {/* Countdown in preview */}
        {currentData?.dataOcorrencia && (
          <div className="mb-4">
            <CountdownMED dataOcorrencia={currentData.dataOcorrencia} />
          </div>
        )}

        {/* Document preview */}
        <div className="relative">
          <div className="bg-navy-700 rounded-xl p-5 font-mono text-xs text-white/70 whitespace-pre-wrap max-h-72 overflow-y-auto select-none">
            {documentText.substring(0, 600) + '\n\n[...DOCUMENTO COMPLETO NO KIT DE 5 DOCUMENTOS...]'}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-800 to-transparent rounded-b-xl flex items-end justify-center pb-4">
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <Lock className="w-3 h-3" />
              Documento completo disponível no Kit Completo
            </div>
          </div>
        </div>
      </div>

      {/* Email capture */}
      <EmailCapture tipo="Golpe via Pix" dataOcorrencia={currentData?.dataOcorrencia} />

      {/* Bank contact card */}
      {currentData?.banco && BANK_CONTACTS[currentData.banco] && (
        <div className="card border-blue-500/20">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">
            Como entregar o documento — {currentData.banco}
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-green-400 shrink-0" />
              <span className="text-white/70">SAC: <span className="text-white font-mono">{BANK_CONTACTS[currentData.banco].sac}</span></span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <FileText className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span className="text-white/60 text-xs">{BANK_CONTACTS[currentData.banco].instrucaoMED}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-white/70 text-xs">Ouvidoria: {BANK_CONTACTS[currentData.banco].ouvidoria}</span>
            </div>
            <a
              href={BANK_CONTACTS[currentData.banco].linkMeuBC}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 mt-1"
            >
              <ExternalLink className="w-3 h-3" />
              Registrar também no BACEN →
            </a>
          </div>
        </div>
      )}

      {/* CTA — Kit Completo */}
      <div className="card border-orange-500/20 bg-orange-500/5">
        <div className="text-center">
          <h3 className="font-bold text-white text-lg mb-2">Baixe a contestação MED completa + 4 documentos extras</h3>
          <p className="text-white/60 text-sm mb-4">
            O Kit Completo inclui: Contestação MED + B.O. + Notificação Bancária + Reclamação BACEN + Reclamação Procon — tudo preenchido com seus dados.
          </p>
          <div className="flex items-baseline gap-1 justify-center mb-4">
            <span className="text-white/50 text-sm">R$</span>
            <span className="text-4xl font-black text-white">47</span>
            <span className="text-white/40 text-sm ml-1">pagamento único</span>
          </div>
          <Link
            href="/ferramentas/pacote-completo"
            className="btn-primary w-full justify-center py-3.5 text-base"
          >
            <Zap className="w-5 h-5" />
            Obter Kit Completo — 5 Documentos
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-white/25 mt-3">
            Pagamento seguro via PIX · Garantia de 7 dias
          </p>
        </div>
      </div>

      <button onClick={() => setStep('form')} className="btn-secondary w-full justify-center">
        Editar dados
      </button>
    </div>
  );
}
