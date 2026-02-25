'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, CheckCircle, ExternalLink, FileText, Lock, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { gerarTextoBO, baixarPDF } from '@/lib/pdf-generator';
import PaymentModal from '@/components/tools/PaymentModal';
import Link from 'next/link';
import toast from 'react-hot-toast';

const TIPOS_GOLPE_BO = [
  'Golpe via Pix',
  'Roubo de Celular + Transferência Fraudulenta',
  'Clonagem de WhatsApp',
  'Boleto Falso',
  'Golpe do Amor / Romance Scam',
  'Emprego Falso',
  'Investimento Fraudulento',
  'Aplicativo/Site Falso de Banco',
  'Phishing / E-mail Falso',
  'Fraude em Cartão',
  'Golpe do Falso Advogado',
  'Golpe de Consignado',
  'Outro',
];

const schema = z.object({
  nomeVitima: z.string().min(3, 'Nome muito curto'),
  cpfVitima: z.string().min(11, 'CPF inválido'),
  rgVitima: z.string().optional(),
  enderecoVitima: z.string().min(10, 'Informe o endereço completo'),
  telefoneVitima: z.string().min(10, 'Telefone inválido'),
  emailVitima: z.string().email('E-mail inválido'),
  dataOcorrencia: z.string().min(1, 'Informe a data'),
  localOcorrencia: z.string().min(1, 'Informe o local (ex: Internet / App bancário)'),
  tipoGolpe: z.string().min(1, 'Selecione o tipo de golpe'),
  descricaoDetalhada: z.string().min(100, 'Descreva com mais detalhes (mín. 100 caracteres)'),
  valorPrejuizo: z.string().min(1, 'Informe o valor'),
  dadosInfrator: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface PaymentData { paymentId: string; pixQrCode: string; pixCopiaECola: string; valor: number; }

export default function GeradorBO() {
  const [preview,     setPreview]     = useState('');
  const [gerado,      setGerado]      = useState(false);
  const [isPaid,      setIsPaid]      = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [paying,      setPaying]      = useState(false);
  const [payment,     setPayment]     = useState<PaymentData | null>(null);

  const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const valorNum = parseFloat(data.valorPrejuizo.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const texto = gerarTextoBO({
      nomeVitima: data.nomeVitima,
      cpfVitima: data.cpfVitima,
      rgVitima: data.rgVitima,
      enderecoVitima: data.enderecoVitima,
      telefoneVitima: data.telefoneVitima,
      emailVitima: data.emailVitima,
      dataOcorrencia: data.dataOcorrencia,
      localOcorrencia: data.localOcorrencia,
      tipoGolpe: data.tipoGolpe,
      descricaoDetalhada: data.descricaoDetalhada,
      valorPrejuizo: valorNum,
      dadosInfrator: data.dadosInfrator,
    });
    setPreview(texto);
    setGerado(true);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await baixarPDF(preview, 'boletim-ocorrencia-central-defesa-digital.pdf', 'Modelo de Boletim de Ocorrência');
      toast.success('BO em PDF baixado!');
    } finally {
      setDownloading(false);
    }
  };

  const handlePagamento = async (produto: 'BO_INDIVIDUAL' | 'PACOTE_EMERGENCIA') => {
    setPaying(true);
    try {
      const { nomeVitima, emailVitima } = getValues();
      const res = await fetch('/api/asaas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto, nome: nomeVitima, email: emailVitima }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erro ao criar pagamento');
      setPayment({ paymentId: data.paymentId, pixQrCode: data.pixQrCode, pixCopiaECola: data.pixCopiaECola, valor: data.valor });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Erro ao iniciar pagamento');
    } finally {
      setPaying(false);
    }
  };

  // ── PREVIEW + PAYMENT ────────────────────────────────────────────────────────
  if (gerado) {
    return (
      <div className="space-y-6">
        <div className="alert-success">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <div>
            <strong className="block">Modelo de BO gerado com sucesso!</strong>
            <p className="text-sm mt-1">Prévia abaixo. Baixe o PDF personalizado para levar à delegacia.</p>
          </div>
        </div>

        {/* Preview ─────────────────────────────────────── */}
        <div className="card">
          <div className="relative">
            <pre className={`font-mono text-xs text-white/70 whitespace-pre-wrap max-h-72 overflow-y-auto ${!isPaid ? 'select-none' : ''}`}>
              {isPaid ? preview : preview.substring(0, 420) + '\n\n[...CONTEÚDO COMPLETO NO PDF...]'}
            </pre>
            {!isPaid && (
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-800 to-transparent rounded-b-xl flex items-end justify-center pb-3">
                <div className="flex items-center gap-2 text-white/40 text-xs">
                  <Lock className="w-3 h-3" />
                  Documento completo disponível após pagamento
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delegacia links — sempre visíveis (informacional) */}
        <div className="card border-blue-500/20">
          <h3 className="font-semibold text-white mb-3 text-sm">Onde registrar o BO online?</h3>
          <div className="space-y-2">
            {[
              { label: 'Delegacia Eletrônica SP', href: 'https://www.delegaciaeletronica.policiacivil.sp.gov.br', desc: '24h' },
              { label: 'Delegacia Virtual Nacional (SINESP)', href: 'https://delegaciavirtual.sinesp.gov.br', desc: 'Vários estados' },
              { label: 'Polícia Civil MG', href: 'https://www.delegaciaonline.mg.gov.br', desc: '24h' },
            ].map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group">
                <div>
                  <span className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">{link.label}</span>
                  <span className="text-xs text-white/40 block">{link.desc}</span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-green-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Payment gate ────────────────────────────────── */}
        {!isPaid ? (
          <div className="card border-orange-500/20 bg-orange-500/5">
            <h3 className="font-bold text-white text-lg mb-1">Baixar o BO personalizado em PDF</h3>
            <p className="text-white/60 text-sm mb-6">
              Documento com tipificação legal completa, pronto para protocolar presencialmente ou na delegacia eletrônica.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: BO only */}
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 flex flex-col">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Só o BO</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-white/50 text-sm">R$</span>
                  <span className="text-3xl font-black text-white">19</span>
                </div>
                <p className="text-xs text-white/40 mb-5">pagamento único</p>
                <ul className="text-xs text-white/60 space-y-1.5 mb-6 flex-1">
                  {['BO personalizado em PDF', 'Tipificação penal completa', 'Pronto para protocolo'].map((i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-green-400 shrink-0" />{i}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePagamento('BO_INDIVIDUAL')}
                  disabled={paying}
                  className="btn-secondary w-full justify-center py-3 text-sm disabled:opacity-60"
                >
                  {paying ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Aguarde...</>
                  ) : (
                    <><FileText className="w-4 h-4" /> Pagar R$19 e baixar</>
                  )}
                </button>
              </div>

              {/* Option 2: Pacote R$47 — highlighted */}
              <div className="relative rounded-2xl border-2 border-orange-500/50 bg-orange-500/10 p-5 flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[0.65rem] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                  Melhor valor
                </div>
                <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3">Pacote Emergência</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-white/50 text-sm">R$</span>
                  <span className="text-3xl font-black text-white">47</span>
                </div>
                <p className="text-xs text-white/40 mb-5">pagamento único</p>
                <ul className="text-xs text-white/60 space-y-1.5 mb-6 flex-1">
                  {[
                    'BO em PDF (este documento)',
                    'Contestação MED (Pix)',
                    'Notificação bancária formal',
                    'Contatos oficiais do banco',
                    'Todos gerados com seus dados',
                  ].map((i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3 h-3 text-orange-400 shrink-0" />{i}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/ferramentas/pacote-completo"
                  className="btn-primary w-full justify-center py-3 text-sm"
                >
                  <Zap className="w-4 h-4" />
                  Obter Pacote — R$47
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <p className="text-xs text-white/25 text-center mt-4">
              Pagamento seguro via PIX (Asaas). Garantia de 7 dias.
            </p>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn-primary flex-1 justify-center"
            >
              <FileText className="w-4 h-4" />
              {downloading ? 'Gerando PDF...' : 'Baixar PDF novamente'}
            </button>
            <Link href="/ferramentas/pacote-completo" className="btn-secondary flex-1 justify-center text-sm">
              Gerar MED + Notificação →
            </Link>
          </div>
        )}

        <button onClick={() => setGerado(false)} className="btn-ghost w-full justify-center text-sm">
          Editar dados
        </button>

        {payment && (
          <PaymentModal
            paymentId={payment.paymentId}
            pixQrCode={payment.pixQrCode}
            pixCopiaECola={payment.pixCopiaECola}
            valor={payment.valor}
            produto="Boletim de Ocorrência"
            onPaid={() => {
              setIsPaid(true);
              setPayment(null);
              setTimeout(handleDownload, 300);
            }}
            onClose={() => setPayment(null)}
          />
        )}
      </div>
    );
  }

  // ── FORM ─────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="card border-green-500/20">
        <h2 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          Dados para o Boletim de Ocorrência
        </h2>

        {/* Personal */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider border-b border-white/10 pb-2">Seus dados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Nome completo *</label>
              <input {...register('nomeVitima')} className="input" placeholder="Nome completo" />
              {errors.nomeVitima && <p className="text-red-400 text-xs mt-1">{errors.nomeVitima.message}</p>}
            </div>
            <div>
              <label className="label">CPF *</label>
              <input {...register('cpfVitima')} className="input" placeholder="000.000.000-00" />
              {errors.cpfVitima && <p className="text-red-400 text-xs mt-1">{errors.cpfVitima.message}</p>}
            </div>
            <div>
              <label className="label">RG (opcional)</label>
              <input {...register('rgVitima')} className="input" placeholder="00.000.000-0" />
            </div>
            <div>
              <label className="label">Telefone *</label>
              <input {...register('telefoneVitima')} className="input" placeholder="(11) 99999-9999" />
              {errors.telefoneVitima && <p className="text-red-400 text-xs mt-1">{errors.telefoneVitima.message}</p>}
            </div>
          </div>
          <div>
            <label className="label">E-mail *</label>
            <input {...register('emailVitima')} type="email" className="input" placeholder="seu@email.com" />
            {errors.emailVitima && <p className="text-red-400 text-xs mt-1">{errors.emailVitima.message}</p>}
          </div>
          <div>
            <label className="label">Endereço completo *</label>
            <input {...register('enderecoVitima')} className="input" placeholder="Rua, número, complemento, bairro, cidade — UF, CEP" />
            {errors.enderecoVitima && <p className="text-red-400 text-xs mt-1">{errors.enderecoVitima.message}</p>}
          </div>
        </div>

        {/* Crime */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider border-b border-white/10 pb-2">Dados do crime</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Data do ocorrido *</label>
              <input {...register('dataOcorrencia')} type="date" className="input" />
              {errors.dataOcorrencia && <p className="text-red-400 text-xs mt-1">{errors.dataOcorrencia.message}</p>}
            </div>
            <div>
              <label className="label">Valor do prejuízo (R$) *</label>
              <input {...register('valorPrejuizo')} className="input" placeholder="0,00" />
              {errors.valorPrejuizo && <p className="text-red-400 text-xs mt-1">{errors.valorPrejuizo.message}</p>}
            </div>
          </div>
          <div>
            <label className="label">Local/meio do crime *</label>
            <input {...register('localOcorrencia')} className="input" placeholder="Ex: Internet / Aplicativo bancário / WhatsApp" />
            {errors.localOcorrencia && <p className="text-red-400 text-xs mt-1">{errors.localOcorrencia.message}</p>}
          </div>
          <div>
            <label className="label">Tipo de crime *</label>
            <select {...register('tipoGolpe')} className="select">
              <option value="">Selecione...</option>
              {TIPOS_GOLPE_BO.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.tipoGolpe && <p className="text-red-400 text-xs mt-1">{errors.tipoGolpe.message}</p>}
          </div>
          <div>
            <label className="label">Descrição detalhada dos fatos *</label>
            <textarea
              {...register('descricaoDetalhada')}
              rows={6}
              className="input resize-none"
              placeholder="Descreva cronologicamente como o golpe aconteceu, o que foi dito/prometido, que ações você tomou, etc. Seja o mais específico possível."
            />
            {errors.descricaoDetalhada && <p className="text-red-400 text-xs mt-1">{errors.descricaoDetalhada.message}</p>}
            <p className="text-xs text-white/30 mt-1">{watch('descricaoDetalhada')?.length || 0} / mín. 100 caracteres</p>
          </div>
          <div>
            <label className="label">Dados do infrator (se conhecidos)</label>
            <textarea
              {...register('dadosInfrator')}
              rows={3}
              className="input resize-none"
              placeholder="Ex: Nome usado, conta bancária, telefone, e-mail, redes sociais, etc."
            />
          </div>
        </div>
      </div>

      <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
        <Shield className="w-5 h-5" />
        Gerar modelo de BO
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
