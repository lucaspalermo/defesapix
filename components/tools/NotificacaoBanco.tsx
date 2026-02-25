'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bell, CheckCircle, Lock, ArrowRight, Zap } from 'lucide-react';
import { gerarTextoNotificacaoBanco } from '@/lib/pdf-generator';
import Link from 'next/link';

const schema = z.object({
  nomeVitima: z.string().min(3),
  cpfVitima: z.string().min(11),
  emailVitima: z.string().email('E-mail inválido'),
  banco: z.string().min(2),
  agencia: z.string().min(1),
  conta: z.string().min(1),
  dataOcorrencia: z.string().min(1),
  valorPrejuizo: z.string().min(1),
  tipoFraude: z.string().min(1),
  descricao: z.string().min(80, 'Descreva com mais detalhes (mín. 80 caracteres)'),
  pedidoDevolucao: z.boolean().default(true),
  pedidoProcoloco: z.boolean().default(true),
  pedidoMED: z.boolean().default(false),
  pedidoBACEN: z.boolean().default(false),
});

type FormData = z.infer<typeof schema>;

const BANCOS = ['Nubank', 'Itaú', 'Bradesco', 'Santander', 'Banco do Brasil', 'Caixa', 'Inter', 'C6 Bank', 'PicPay', 'Mercado Pago', 'Outro'];
const TIPOS_FRAUDE = ['Golpe via Pix', 'Clonagem de WhatsApp', 'Boleto Falso', 'App/Site Falso', 'Golpe por telefone (vishing)', 'Fraude no cartão', 'Empréstimo não solicitado', 'Outro'];

export default function NotificacaoBanco() {
  const [preview, setPreview] = useState('');
  const [gerado, setGerado] = useState(false);
  const [valorDisplay, setValorDisplay] = useState('');

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { pedidoDevolucao: true, pedidoProcoloco: true },
  });

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (!digits) { setValorDisplay(''); setValue('valorPrejuizo', ''); return; }
    const cents = parseInt(digits, 10);
    const formatted = (cents / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    setValorDisplay(formatted);
    setValue('valorPrejuizo', formatted, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    const valorNum = parseFloat(data.valorPrejuizo.replace(/\./g, '').replace(',', '.')) || 0;
    const pedidos = [
      data.pedidoDevolucao ? `Devolução integral de R$ ${valorNum.toFixed(2).replace('.', ',')} em até 5 dias úteis` : null,
      data.pedidoProcoloco ? 'Fornecimento de número de protocolo desta notificação' : null,
      data.pedidoMED ? 'Acionamento imediato do Mecanismo Especial de Devolução (MED) — Resolução BCB 93/2021' : null,
      data.pedidoBACEN ? 'Comunicação obrigatória ao Banco Central do Brasil (BACEN) sobre o incidente' : null,
      'Investigação interna sobre a fraude e medidas para prevenir recorrência',
      'Manifestação formal sobre o caso em até 5 (cinco) dias úteis',
    ].filter(Boolean) as string[];

    const texto = gerarTextoNotificacaoBanco({
      nomeVitima: data.nomeVitima,
      cpfVitima: data.cpfVitima,
      banco: data.banco,
      agencia: data.agencia,
      conta: data.conta,
      dataOcorrencia: data.dataOcorrencia,
      valorPrejuizo: valorNum,
      tipoFraude: data.tipoFraude,
      descricao: data.descricao,
      pedidos,
    });
    setPreview(texto);
    setGerado(true);
  };

  if (gerado) {
    return (
      <div className="space-y-6">
        <div className="alert-success">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <div>
            <strong className="block">Notificação gerada com sucesso!</strong>
            <p className="text-sm mt-1">Prévia do documento abaixo. Obtenha o Kit Completo para baixar o documento com base legal completa.</p>
          </div>
        </div>

        <div className="card">
          <div className="relative">
            <pre className="font-mono text-xs text-white/70 whitespace-pre-wrap max-h-72 overflow-y-auto select-none">
              {preview.substring(0, 500) + '\n\n[...DOCUMENTO COMPLETO NO KIT DE 5 DOCUMENTOS...]'}
            </pre>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-800 to-transparent rounded-b-xl flex items-end justify-center pb-3">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Lock className="w-3 h-3" />
                Documento completo disponível no Kit Completo
              </div>
            </div>
          </div>
        </div>

        {/* CTA — Kit Completo */}
        <div className="card border-orange-500/20 bg-orange-500/5">
          <div className="text-center">
            <h3 className="font-bold text-white text-lg mb-2">Baixe a notificação completa + 4 documentos extras</h3>
            <p className="text-white/60 text-sm mb-4">
              O Kit Completo inclui: Notificação Bancária + Contestação MED + B.O. + Reclamação BACEN + Reclamação Procon — tudo preenchido com seus dados.
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

        <button onClick={() => setGerado(false)} className="btn-secondary w-full justify-center text-sm">
          Editar dados
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="card border-green-500/20">
        <h2 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-green-400" />
          Notificação Formal ao Banco
        </h2>

        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Seus dados</h3>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div>
            <label className="label">E-mail *</label>
            <input {...register('emailVitima')} type="email" className="input" placeholder="seu@email.com" />
            {errors.emailVitima && <p className="text-red-400 text-xs mt-1">{errors.emailVitima.message}</p>}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Banco a ser notificado</h3>
          <select {...register('banco')} className="select">
            <option value="">Selecione o banco...</option>
            {BANCOS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          {errors.banco && <p className="text-red-400 text-xs mt-1">{errors.banco.message}</p>}
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
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Detalhes da fraude</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Data do ocorrido *</label>
              <input {...register('dataOcorrencia')} type="date" className="input" />
            </div>
            <div>
              <label className="label">Valor do prejuízo (R$) *</label>
              <input
                value={valorDisplay}
                onChange={handleValorChange}
                inputMode="numeric"
                className="input"
                placeholder="0,00"
              />
            </div>
          </div>
          <div>
            <label className="label">Tipo de fraude *</label>
            <select {...register('tipoFraude')} className="select">
              <option value="">Selecione...</option>
              {TIPOS_FRAUDE.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Descreva o ocorrido *</label>
            <textarea {...register('descricao')} rows={5} className="input resize-none"
              placeholder="Descreva como a fraude aconteceu, quais ações você tomou e como o banco deveria ter prevenido o incidente..." />
            {errors.descricao && <p className="text-red-400 text-xs mt-1">{errors.descricao.message}</p>}
            <p className="text-xs text-white/30 mt-1">{watch('descricao')?.length || 0} / mín. 80 caracteres</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Pedidos a incluir</h3>
          {[
            { name: 'pedidoDevolucao' as const, label: 'Devolução integral dos valores' },
            { name: 'pedidoProcoloco' as const, label: 'Fornecimento de protocolo' },
            { name: 'pedidoMED' as const, label: 'Acionamento do MED (Pix)' },
            { name: 'pedidoBACEN' as const, label: 'Comunicação ao BACEN' },
          ].map((item) => (
            <label key={item.name} className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...register(item.name)} className="accent-green-500 w-4 h-4" />
              <span className="text-sm text-white/70">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
        <Bell className="w-5 h-5" />
        Gerar notificação
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
