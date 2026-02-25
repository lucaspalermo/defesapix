'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-navy-800/30">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Perguntas frequentes</h2>
          <p className="section-subtitle mx-auto text-center">
            As dúvidas mais comuns de quem sofreu um golpe digital.
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                'border rounded-2xl overflow-hidden transition-all duration-200',
                open === idx
                  ? 'border-green-500/40 bg-green-500/5'
                  : 'border-white/10 bg-navy-800/50'
              )}
            >
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-white text-sm md:text-base">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-white/40 shrink-0 transition-transform duration-200',
                    open === idx ? 'rotate-180 text-green-400' : ''
                  )}
                />
              </button>
              {open === idx && (
                <div className="px-5 pb-5">
                  <p className="text-white/70 text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
