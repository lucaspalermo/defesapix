'use client';

import { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, CheckCircle, Download, ArrowRight, FileText, Zap } from 'lucide-react';
import { gerarChecklistGolpe, baixarPDF, type ChecklistItem } from '@/lib/pdf-generator';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const TIPOS = [
  { value: 'PIX', label: '💸 Golpe via Pix' },
  { value: 'WHATSAPP', label: '📱 Clonagem de WhatsApp' },
  { value: 'BOLETO', label: '📄 Boleto Falso' },
  { value: 'ROMANCE', label: '❤️ Golpe do Amor' },
  { value: 'EMPREGO', label: '💼 Emprego Falso' },
  { value: 'INVESTIMENTO', label: '📈 Investimento Falso' },
  { value: 'CLONE_APP', label: '🏦 App/Site Falso' },
  { value: 'OUTRO', label: '🔍 Outro tipo' },
];

export default function ChecklistTool() {
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [gerado, setGerado] = useState(false);

  const handleGerar = () => {
    const valorNum = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
    const checklist = gerarChecklistGolpe(tipo, valorNum);
    setItems(checklist);
    setGerado(true);
  };

  const toggleItem = (id: string) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, completado: !item.completado } : item));
  };

  const completados = items.filter((i) => i.completado).length;
  const progresso = items.length > 0 ? Math.round((completados / items.length) * 100) : 0;

  const handleDownload = async () => {
    const tipoLabel = TIPOS.find((t) => t.value === tipo)?.label || tipo;
    const text = [
      'CHECKLIST DE AÇÃO PERSONALIZADO',
      `Tipo de golpe: ${tipoLabel}`,
      `Valor perdido: R$ ${valor}`,
      `Progresso: ${completados}/${items.length} itens concluídos`,
      `Gerado em: ${new Date().toLocaleDateString('pt-BR')}`,
      '',
      '━'.repeat(60),
      '',
      ...items.map((item, i) =>
        `[${item.completado ? '✓' : ' '}] ${i + 1}. ${item.titulo}\n    Prazo: ${item.prazo}\n    ${item.descricao}\n`
      ),
      '━'.repeat(60),
      '',
      'DefesaPix — defesapix.com.br',
      'Documentos jurídicos completos disponíveis no site.',
    ].join('\n');

    await baixarPDF(text, 'checklist-central-defesa-digital.pdf', `Checklist — ${tipoLabel}`);
  };

  if (!gerado) {
    return (
      <div className="card border-green-500/20">
        <h2 className="font-bold text-white text-lg mb-6 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-green-400" />
          Gere seu checklist personalizado
        </h2>

        <div className="space-y-5">
          <div>
            <label className="label">Que tipo de golpe você sofreu?</label>
            <div className="grid grid-cols-2 gap-2">
              {TIPOS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTipo(t.value)}
                  className={cn(
                    'p-3 rounded-xl border text-sm font-medium text-left transition-all',
                    tipo === t.value
                      ? 'border-green-500 bg-green-500/20 text-white'
                      : 'border-white/20 text-white/60 hover:border-white/40 hover:bg-white/5'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Valor perdido (R$)</label>
            <input
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="input"
              placeholder="Ex: 2.500,00"
            />
          </div>

          <button
            onClick={handleGerar}
            disabled={!tipo}
            className="btn-primary w-full justify-center py-4 disabled:opacity-50"
          >
            <CheckSquare className="w-5 h-5" />
            Gerar checklist personalizado
          </button>
        </div>
      </div>
    );
  }

  const progressColor = progresso === 100 ? 'bg-green-500' : progresso > 60 ? 'bg-ember-500' : progresso > 30 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="card border-white/[0.08]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-ember-400" />
            Seu progresso
          </h2>
          <span className={cn(
            'text-base font-black tabular-nums',
            progresso === 100 ? 'text-green-400' : progresso > 50 ? 'text-amber-400' : 'text-red-400'
          )}>
            {completados}/{items.length}
          </span>
        </div>

        {/* Modern progress bar */}
        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden mb-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${progressColor}`}
            style={{ width: `${progresso}%` }}
          />
        </div>

        <p className="text-xs text-white/35">
          {progresso === 100
            ? '✓ Todos os passos concluídos. Guarde os documentos gerados.'
            : `${progresso}% concluído — siga os passos para aumentar suas chances de recuperação.`}
        </p>

        {progresso === 100 && (
          <div className="mt-3 flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2">
            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
            Checklist completo! Baixe o PDF para guardar seu histórico.
          </div>
        )}
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'border rounded-2xl p-4 cursor-pointer transition-all duration-200 select-none',
              item.completado
                ? 'border-green-500/25 bg-green-500/[0.04] opacity-60'
                : item.urgente
                ? 'border-red-500/30 bg-red-500/[0.04] hover:border-red-500/50 hover:bg-red-500/[0.07]'
                : 'border-white/[0.07] hover:border-white/[0.15] hover:bg-white/[0.02]'
            )}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <div className={cn(
                'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200',
                item.completado
                  ? 'border-green-500 bg-green-500'
                  : item.urgente
                  ? 'border-red-400/50'
                  : 'border-white/20'
              )}>
                {item.completado && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className={cn(
                    'font-semibold text-sm transition-all',
                    item.completado ? 'line-through text-white/30' : 'text-white'
                  )}>
                    {item.titulo}
                  </h3>
                  {item.urgente && !item.completado && (
                    <span className="badge-red text-[0.6rem]">
                      <Zap className="w-2.5 h-2.5 inline -mt-px" /> Urgente
                    </span>
                  )}
                </div>
                {!item.completado && (
                  <p className="text-xs text-white/40 mb-2 leading-relaxed">{item.descricao}</p>
                )}
                <div className={cn(
                  'flex items-center gap-1 text-[0.7rem] font-medium',
                  item.completado ? 'text-white/20' : 'text-amber-500/70'
                )}>
                  <Clock className="w-3 h-3" />
                  Prazo: {item.prazo}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={handleDownload} className="btn-secondary justify-center">
          <Download className="w-4 h-4" />
          Baixar PDF
        </button>
        <Link href="/ferramentas/pacote-completo" className="btn-primary justify-center text-sm">
          <FileText className="w-4 h-4" />
          Gerar documentos →
        </Link>
      </div>

      <button
        onClick={() => { setGerado(false); setTipo(''); setValor(''); setItems([]); }}
        className="text-xs text-white/25 hover:text-white/50 transition-colors w-full text-center py-1"
      >
        Recomeçar checklist
      </button>
    </div>
  );
}
