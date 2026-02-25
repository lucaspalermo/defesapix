'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, CheckCircle, ExternalLink, Lock, Zap, ArrowRight } from 'lucide-react';
import { gerarTextoBO } from '@/lib/pdf-generator';
import Link from 'next/link';

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

export default function GeradorBO() {
  const [preview, setPreview] = useState('');
  const [gerado, setGerado] = useState(false);
  const [valorDisplay, setValorDisplay] = useState('');

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
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

  // ── PREVIEW ─────────────────────────────────────────────────────────────────
  if (gerado) {
    return (
      <div className="space-y-6">
        <div className="alert-success">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <div>
            <strong className="block">Modelo de BO pronto!</strong>
            <p className="text-sm mt-1">Este é um rascunho profissional com tipificação penal correta. Use-o para preencher o BO oficial na Delegacia Eletrônica do seu estado.</p>
          </div>
        </div>

        <div className="card">
          <div className="relative">
            <pre className="font-mono text-xs text-white/70 whitespace-pre-wrap max-h-72 overflow-y-auto select-none">
              {preview.substring(0, 420) + '\n\n[...DOCUMENTO COMPLETO NO KIT DE 5 DOCUMENTOS...]'}
            </pre>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-800 to-transparent rounded-b-xl flex items-end justify-center pb-3">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <Lock className="w-3 h-3" />
                Documento completo disponível no Kit Completo
              </div>
            </div>
          </div>
        </div>

        {/* Delegacia links */}
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

        {/* CTA — Kit Completo */}
        <div className="card border-orange-500/20 bg-orange-500/5">
          <div className="text-center">
            <h3 className="font-bold text-white text-lg mb-2">Baixe este B.O. completo + 4 documentos extras</h3>
            <p className="text-white/60 text-sm mb-4">
              O Kit Completo inclui: B.O. + Contestação MED + Notificação Bancária + Reclamação BACEN + Reclamação Procon — tudo preenchido com seus dados.
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

        <button onClick={() => setGerado(false)} className="btn-ghost w-full justify-center text-sm">
          Editar dados
        </button>
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
              <input
                value={valorDisplay}
                onChange={handleValorChange}
                inputMode="numeric"
                className="input"
                placeholder="0,00"
              />
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
