'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText, Plus, Zap, Eye, EyeOff, Trash2, CheckCircle,
  Clock, ArrowLeft, Loader2, Sparkles, Tag,
} from 'lucide-react';

interface Artigo {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  tags: string[];
  tempoLeitura: number;
  visualizacoes: number;
  publicado: boolean;
  publishedAt: string | null;
  createdAt: string;
}

const TEMAS_SUGERIDOS = [
  { tema: 'Golpe de perda de conta do Instagram: como os golpistas roubam perfis e como recuperar', categoria: 'Golpes', tags: ['Instagram', 'Redes Sociais', 'Phishing'] },
  { tema: 'Como recuperar conta do WhatsApp roubada/clonada: guia atualizado 2025', categoria: 'Golpes', tags: ['WhatsApp', 'Clonagem', 'Verificação'] },
  { tema: 'Golpe do Pix errado: como funciona e por que você NÃO deve devolver', categoria: 'Pix & MED', tags: ['Pix', 'Golpe', 'Devolução'] },
  { tema: 'Golpe do falso suporte técnico da Apple/Google: como funciona e como se proteger', categoria: 'Golpes', tags: ['Suporte', 'Apple', 'Google'] },
  { tema: 'Golpe do FGTS falso: sites que roubam dados prometendo saques', categoria: 'Golpes', tags: ['FGTS', 'CPF', 'Phishing'] },
  { tema: 'Golpe de empréstimo consignado para aposentados: como funciona e como denunciar', categoria: 'Golpes', tags: ['Consignado', 'Idoso', 'INSS'] },
  { tema: 'Golpe de clonagem de cartão por aproximação (NFC): mito ou realidade?', categoria: 'Prevenção', tags: ['Cartão', 'NFC', 'Contactless'] },
  { tema: 'Golpe da maquininha adulterada: como delivery e corrida de app são usados', categoria: 'Golpes', tags: ['Maquininha', 'Delivery', 'iFood'] },
  { tema: 'Como proteger suas redes sociais de hackers: guia prático de segurança', categoria: 'Prevenção', tags: ['Segurança', 'Redes Sociais', '2FA'] },
  { tema: 'Novo golpe do Pix via SMS falso do banco: como identificar', categoria: 'Pix & MED', tags: ['Pix', 'SMS', 'Banco'] },
];

const CATEGORIAS = ['Golpes', 'Pix & MED', 'Direito Digital', 'Prevenção', 'Tutoriais', 'Defesa do Consumidor', 'Investimentos'];

export default function AdminArtigosPage() {
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [tema, setTema] = useState('');
  const [categoria, setCategoria] = useState('Golpes');
  const [tagsInput, setTagsInput] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchArtigos = async () => {
    try {
      const res = await fetch('/api/admin/artigos');
      if (res.ok) {
        const data = await res.json();
        setArtigos(data.artigos);
      }
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => { fetchArtigos(); }, []);

  const generateArticle = async () => {
    if (!tema || tema.length < 10) {
      setMessage({ type: 'error', text: 'Tema deve ter pelo menos 10 caracteres' });
      return;
    }

    setGenerating(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/artigos/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tema,
          categoria,
          tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: `Artigo "${data.artigo.titulo}" gerado como rascunho!` });
        setTema('');
        setTagsInput('');
        setShowForm(false);
        fetchArtigos();
      } else {
        setMessage({ type: 'error', text: data.error || 'Erro ao gerar' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    }
    setGenerating(false);
  };

  const togglePublish = async (id: string, publicado: boolean) => {
    try {
      const res = await fetch('/api/admin/artigos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, publicado: !publicado }),
      });
      if (res.ok) fetchArtigos();
    } catch { /* silent */ }
  };

  const deleteArticle = async (id: string, titulo: string) => {
    if (!confirm(`Deletar "${titulo}"?`)) return;
    try {
      const res = await fetch('/api/admin/artigos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchArtigos();
    } catch { /* silent */ }
  };

  const publicados = artigos.filter((a) => a.publicado);
  const rascunhos = artigos.filter((a) => !a.publicado);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Blog — Artigos</h1>
          <p className="text-sm text-white/40">{artigos.length} artigos ({publicados.length} publicados)</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-sm py-2 px-4"
        >
          <Sparkles className="w-4 h-4" />
          Gerar com IA
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mb-6 p-4 rounded-xl border text-sm ${
          message.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {message.text}
        </div>
      )}

      {/* Generate Form */}
      {showForm && (
        <div className="card mb-8 border-ember-500/20">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-ember-400" />
            Gerar artigo com IA
          </h2>

          <div className="space-y-4">
            <div>
              <label className="label">Tema do artigo</label>
              <textarea
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Ex: Golpe de perda de conta do Instagram: como os golpistas roubam perfis e como recuperar"
                className="input min-h-[80px]"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Categoria</label>
                <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="select">
                  {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Tags (separadas por vírgula)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Instagram, Phishing, Redes Sociais"
                  className="input"
                />
              </div>
            </div>

            {/* Suggested topics */}
            <div>
              <label className="label">Temas sugeridos (clique para usar)</label>
              <div className="flex flex-wrap gap-2">
                {TEMAS_SUGERIDOS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTema(s.tema);
                      setCategoria(s.categoria);
                      setTagsInput(s.tags.join(', '));
                    }}
                    className="text-xs text-white/40 hover:text-ember-400 bg-white/[0.04] hover:bg-ember-500/10 border border-white/[0.06] hover:border-ember-500/20 px-3 py-1.5 rounded-lg transition-all"
                  >
                    {s.tema.length > 60 ? s.tema.slice(0, 60) + '...' : s.tema}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateArticle}
              disabled={generating || tema.length < 10}
              className="btn-primary py-3 w-full justify-center disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gerando artigo (pode levar 30s)...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Gerar artigo
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Articles List */}
      {loading ? (
        <div className="text-center py-20 text-white/30">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-3" />
          Carregando artigos...
        </div>
      ) : artigos.length === 0 ? (
        <div className="text-center py-20">
          <FileText className="w-12 h-12 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 mb-4">Nenhum artigo ainda. Gere o primeiro com IA!</p>
          <button onClick={() => setShowForm(true)} className="btn-primary text-sm py-2 px-4">
            <Sparkles className="w-4 h-4" />
            Gerar primeiro artigo
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Drafts */}
          {rascunhos.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Rascunhos ({rascunhos.length})
              </h2>
              <div className="space-y-3">
                {rascunhos.map((artigo) => (
                  <ArticleRow key={artigo.id} artigo={artigo} onToggle={togglePublish} onDelete={deleteArticle} />
                ))}
              </div>
            </div>
          )}

          {/* Published */}
          {publicados.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Publicados ({publicados.length})
              </h2>
              <div className="space-y-3">
                {publicados.map((artigo) => (
                  <ArticleRow key={artigo.id} artigo={artigo} onToggle={togglePublish} onDelete={deleteArticle} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ArticleRow({
  artigo,
  onToggle,
  onDelete,
}: {
  artigo: Artigo;
  onToggle: (id: string, publicado: boolean) => void;
  onDelete: (id: string, titulo: string) => void;
}) {
  return (
    <div className="card flex flex-col sm:flex-row gap-4 items-start">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            artigo.publicado ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'
          }`}>
            {artigo.publicado ? 'Publicado' : 'Rascunho'}
          </span>
          <span className="badge-blue text-xs">{artigo.categoria}</span>
        </div>
        <h3 className="font-semibold text-white text-sm truncate">{artigo.titulo}</h3>
        <p className="text-xs text-white/40 mt-1 line-clamp-1">{artigo.resumo}</p>
        <div className="flex items-center gap-4 mt-2 text-xs text-white/30">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{artigo.tempoLeitura} min</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{artigo.visualizacoes} views</span>
          <span>{new Date(artigo.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
        {artigo.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {artigo.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="flex items-center gap-0.5 text-[0.65rem] bg-white/[0.05] text-white/30 px-1.5 py-0.5 rounded">
                <Tag className="w-2.5 h-2.5" />{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {artigo.publicado && (
          <a
            href={`/blog/${artigo.slug}`}
            target="_blank"
            className="p-2 rounded-lg hover:bg-white/5 text-white/30 hover:text-white transition-colors"
            title="Ver no blog"
          >
            <Eye className="w-4 h-4" />
          </a>
        )}
        <button
          onClick={() => onToggle(artigo.id, artigo.publicado)}
          className={`p-2 rounded-lg transition-colors ${
            artigo.publicado
              ? 'hover:bg-amber-500/10 text-amber-400/60 hover:text-amber-400'
              : 'hover:bg-green-500/10 text-green-400/60 hover:text-green-400'
          }`}
          title={artigo.publicado ? 'Despublicar' : 'Publicar'}
        >
          {artigo.publicado ? <EyeOff className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
        </button>
        <button
          onClick={() => onDelete(artigo.id, artigo.titulo)}
          className="p-2 rounded-lg hover:bg-red-500/10 text-red-400/60 hover:text-red-400 transition-colors"
          title="Deletar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
