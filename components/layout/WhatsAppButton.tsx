'use client';

import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5565999585783';
const WHATSAPP_MESSAGE = encodeURIComponent(
  'Olá! Sofri um golpe digital e preciso de ajuda para recuperar meu dinheiro.'
);

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-105 group"
    >
      <MessageCircle className="w-6 h-6" fill="currentColor" />
      <span className="hidden sm:inline text-sm">Precisa de ajuda?</span>
    </a>
  );
}
