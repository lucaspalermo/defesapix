'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Shield, Zap, FileText, HelpCircle } from 'lucide-react';

interface Mensagem {
  role: 'user' | 'assistant';
  content: string;
}

const PERGUNTAS_RAPIDAS = [
  { texto: 'Como funciona a DefesaPix?', icon: Shield },
  { texto: 'Caí num golpe Pix, o que faço?', icon: Zap },
  { texto: 'O que vem no Kit Completo?', icon: FileText },
  { texto: 'Já paguei, como acesso meus documentos?', icon: HelpCircle },
];

export default function Chatbot() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [input, setInput] = useState('');
  const [enviando, setEnviando] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagens]);

  useEffect(() => {
    if (aberto && inputRef.current) {
      inputRef.current.focus();
    }
  }, [aberto]);

  const enviar = async (texto: string) => {
    if (!texto.trim() || enviando) return;

    const novaMensagem: Mensagem = { role: 'user', content: texto.trim() };
    setMensagens((prev) => [...prev, novaMensagem]);
    setInput('');
    setEnviando(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensagem: texto.trim(),
          historico: mensagens.slice(-6),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensagens((prev) => [
          ...prev,
          { role: 'assistant', content: data.error || 'Desculpe, ocorreu um erro. Tente novamente.' },
        ]);
        return;
      }

      setMensagens((prev) => [
        ...prev,
        { role: 'assistant', content: data.resposta },
      ]);
    } catch {
      setMensagens((prev) => [
        ...prev,
        { role: 'assistant', content: 'Erro de conexão. Verifique sua internet e tente novamente.' },
      ]);
    } finally {
      setEnviando(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    enviar(input);
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setAberto(!aberto)}
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          aberto
            ? 'bg-white/10 border border-white/20 hover:bg-white/15'
            : 'bg-gradient-to-br from-ember-500 to-ember-700 hover:from-ember-400 hover:to-ember-600 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
        }`}
        aria-label={aberto ? 'Fechar chat' : 'Abrir chat'}
      >
        {aberto ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Janela do chat */}
      {aberto && (
        <div className="fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-40px)] h-[500px] max-h-[calc(100vh-120px)] bg-[#0a0a14] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-ember-600/20 to-ember-800/20 border-b border-white/10 px-4 py-3 flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-ember-500 to-ember-700 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Assistente DefesaPix</p>
              <p className="text-[0.65rem] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                Online — respostas em segundos
              </p>
            </div>
          </div>

          {/* Mensagens */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Mensagem de boas-vindas */}
            {mensagens.length === 0 && (
              <div className="space-y-3">
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl rounded-tl-sm p-3">
                  <p className="text-sm text-white/80">
                    Olá! Sou o assistente da DefesaPix. Posso te ajudar com dúvidas sobre golpes, recuperação de dinheiro, MED, BO e documentos jurídicos.
                  </p>
                  <p className="text-xs text-white/40 mt-2">
                    O que gostaria de saber?
                  </p>
                </div>

                {/* Perguntas rápidas */}
                <div className="space-y-1.5">
                  {PERGUNTAS_RAPIDAS.map(({ texto, icon: Icon }) => (
                    <button
                      key={texto}
                      onClick={() => enviar(texto)}
                      className="w-full text-left text-xs px-3 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60 hover:text-white hover:bg-ember-500/10 hover:border-ember-500/20 transition-all flex items-center gap-2"
                    >
                      <Icon className="w-3.5 h-3.5 text-ember-400 shrink-0" />
                      {texto}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Histórico de mensagens */}
            {mensagens.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-ember-500/20 border border-ember-500/30 text-white rounded-br-sm'
                      : 'bg-white/[0.04] border border-white/[0.08] text-white/80 rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Indicador de digitação */}
            {enviando && (
              <div className="flex justify-start">
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl rounded-bl-sm p-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-ember-400 animate-spin" />
                  <span className="text-xs text-white/40">Digitando...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-white/10 p-3 flex gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida..."
              maxLength={500}
              disabled={enviando}
              className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-ember-500/40 disabled:opacity-50 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || enviando}
              className="w-10 h-10 rounded-xl bg-ember-500 hover:bg-ember-400 disabled:opacity-30 disabled:hover:bg-ember-500 flex items-center justify-center transition-all shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
