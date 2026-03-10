import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CheckCircle, FileText, Lock } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Golpe de Sextorsão: O Que Fazer? Guia Completo',
  description:
    'Estão ameaçando divulgar fotos ou vídeos íntimos? Saiba como agir contra sextorsão, seus direitos legais e como denunciar. Guia completo com orientações jurídicas.',
  keywords: [
    'sextorsão o que fazer',
    'chantagem fotos intimas',
    'extorsão sexual internet',
    'golpe nudes',
    'ameaça divulgar fotos',
    'revenge porn brasil',
  ],
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-sextorsao' },
};

const faqItems = [
  {
    question: 'O que é sextorsão?',
    answer: 'Sextorsão é um crime onde o golpista ameaça divulgar fotos ou vídeos íntimos da vítima caso ela não pague um valor em dinheiro. Pode acontecer após vazamento de dados, invasão de contas ou interações em apps de relacionamento.',
  },
  {
    question: 'Devo pagar o que o golpista está pedindo?',
    answer: 'NÃO. Pagar não garante que o material será apagado. Na maioria dos casos, o golpista continua pedindo mais dinheiro. A recomendação é não pagar, guardar todas as provas e denunciar imediatamente.',
  },
  {
    question: 'Sextorsão é crime? Qual a pena?',
    answer: 'Sim. Sextorsão configura extorsão (Art. 158 do Código Penal, pena de 4 a 10 anos) e pode acumular com outros crimes como invasão de dispositivo (Lei 14.155/2021) e registro não autorizado de imagem íntima (Art. 216-B CP).',
  },
  {
    question: 'Como denunciar sextorsão anonimamente?',
    answer: 'Você pode denunciar pelo SaferNet (denuncie.org.br), pela Delegacia de Crimes Cibernéticos do seu estado, ou pelo Disque 100 (se a vítima for menor de idade). O B.O. pode ser registrado online em muitos estados.',
  },
  {
    question: 'O golpista realmente tem minhas fotos ou é blefe?',
    answer: 'Em muitos casos, o golpista envia e-mails em massa dizendo ter fotos íntimas sem realmente possuí-las. Se a mensagem não contém nenhuma prova real (foto, vídeo ou dado pessoal específico), provavelmente é blefe. Mesmo assim, registre B.O. por segurança.',
  },
];

const schemaArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Golpe de Sextorsão: O Que Fazer? Guia Completo',
  description: 'Guia completo sobre como agir contra sextorsão e chantagem com fotos ou vídeos íntimos.',
  author: { '@type': 'Organization', name: 'DefesaPix' },
  publisher: { '@type': 'Organization', name: 'DefesaPix' },
  datePublished: '2025-02-20',
  dateModified: new Date().toISOString().split('T')[0],
};

export default function GolpeSextorsaoPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe de Sextorsão' }]} />
      <HowToSchema
        name="Sextorsão e chantagem com fotos íntimas: o que fazer"
        description="Passo a passo para agir contra sextorsão e proteger seus direitos."
        totalTime="PT48H"
        steps={[
          { name: 'Identifique o golpe', text: 'Confirme que voce foi vitima e reuna todas as evidencias disponiveis.' },
          { name: 'Acesse o Kit Completo DefesaPix', text: 'Em defesapix.com.br, preencha seus dados e receba o plano de acao completo com 5 documentos juridicos por R$47.', url: '/ferramentas/pacote-completo' },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }} />

      {/* Hero */}
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/golpes" className="hover:text-white transition-colors">Tipos de Golpe</Link>
            <span>/</span>
            <span className="text-white">Golpe de Sextorsão</span>
          </div>

          <div className="alert-danger mb-8">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <strong>Importante:</strong> NÃO pague o golpista e NÃO apague as conversas. Guarde todas as provas
              (prints, e-mails, mensagens) antes de qualquer ação.
            </div>
          </div>

          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Ameaças com Fotos ou<br />
            <span className="gradient-text">Vídeos Íntimos?</span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Alguém está ameaçando divulgar suas fotos ou vídeos íntimos pedindo dinheiro?
            Isso é crime. Saiba como se proteger e denunciar.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/pacote-completo" className="btn-primary">
              <FileText className="w-5 h-5" />
              Kit Completo — R$47
            </Link>
            <Link href="/ferramentas/checklist" className="btn-secondary">
              <CheckCircle className="w-5 h-5" />
              Ver checklist completo
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="section">
        <div className="container max-w-4xl">
          {/* What is it */}
          <section className="prose-section mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">O que é sextorsão?</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              A <strong className="text-white">sextorsão</strong> é um crime em que o golpista obtém ou alega possuir fotos ou vídeos íntimos
              da vítima e exige pagamento para não divulgá-los. As formas mais comuns são:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { titulo: 'E-mail de blefe', desc: 'Golpista envia e-mail em massa alegando ter invadido sua câmera e gravado vídeos íntimos. Geralmente é mentira.' },
                { titulo: 'App de relacionamento', desc: 'Criminoso troca fotos íntimas com a vítima em apps de namoro e depois usa o material para chantagear.' },
                { titulo: 'Invasão de contas', desc: 'Hacker invade nuvem, celular ou redes sociais e encontra fotos íntimas para usar como chantagem.' },
                { titulo: 'Perfil falso', desc: 'Golpista cria perfil falso, seduz a vítima por semanas, obtém material íntimo e inicia a extorsão.' },
              ].map((tipo) => (
                <div key={tipo.titulo} className="card border-white/10">
                  <h3 className="font-bold text-white text-sm mb-1">{tipo.titulo}</h3>
                  <p className="text-sm text-white/55">{tipo.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Solution Paywall */}
          <section className="mb-12">
            <h2 className="font-heading font-bold text-2xl text-white mb-4">Caiu nesse golpe? Existe solucao.</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Existem prazos legais que nao podem ser perdidos e documentos juridicos especificos que voce precisa protocolar corretamente. Um erro no documento pode comprometer toda a sua recuperacao.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Documentos', value: '5', sub: 'prontos para protocolar' },
                { label: 'Tempo', value: '15 min', sub: 'para gerar tudo' },
                { label: 'Investimento', value: 'R$47', sub: 'pagamento unico' },
              ].map((item) => (
                <div key={item.label} className="card text-center border-ember-500/20">
                  <p className="text-xs text-white/50 mb-1">{item.label}</p>
                  <p className="text-2xl font-bold text-ember-400">{item.value}</p>
                  <p className="text-xs text-white/40">{item.sub}</p>
                </div>
              ))}
            </div>
            <div className="card border-ember-500/30 bg-gradient-to-br from-ember-500/[0.08] to-red-500/[0.05]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-ember-500/20 border border-ember-500/30 flex items-center justify-center shrink-0">
                  <Lock className="w-6 h-6 text-ember-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-white text-lg mb-2">Plano de Acao Completo + 5 Documentos</h3>
                  <p className="text-sm text-white/60 mb-4">
                    No Kit Completo voce recebe o passo a passo detalhado e personalizado para o seu tipo de golpe, com todos os documentos juridicos prontos:
                  </p>
                  <div className="space-y-2 mb-6">
                    {['Contestacao MED personalizada', 'Boletim de Ocorrencia completo', 'Notificacao Bancaria formal', 'Reclamacao BACEN', 'Reclamacao Procon'].map((doc) => (
                      <div key={doc} className="flex items-center gap-2 text-sm text-white/40">
                        <Lock className="w-3 h-3 text-ember-400/60" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/ferramentas/pacote-completo" className="btn-primary">
                    <FileText className="w-4 h-4" />
                    Acessar Kit Completo — R$47
                  </Link>
                  <p className="text-xs text-white/30 mt-3">Preencha seus dados uma vez. Receba tudo pronto em 15 minutos.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Seus direitos legais</h2>
            <div className="space-y-3">
              {[
                { lei: 'CP — Art. 158', desc: 'Extorsão: constranger alguém mediante ameaça para obter vantagem econômica — pena de 4 a 10 anos' },
                { lei: 'CP — Art. 216-B', desc: 'Registro não autorizado de conteúdo com cena de nudez ou ato sexual — pena de detenção de 6 meses a 1 ano' },
                { lei: 'Lei 12.737/2012', desc: 'Invasão de dispositivo informático (Lei Carolina Dieckmann) — pena de 3 meses a 1 ano' },
                { lei: 'Lei 14.155/2021', desc: 'Agrava penas para fraude e invasão de dispositivo por meio digital — reclusão de 4 a 8 anos' },
                { lei: 'Marco Civil — Art. 21', desc: 'Provedor deve remover conteúdo íntimo divulgado sem autorização após notificação da vítima' },
              ].map((item) => (
                <div key={item.lei} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="badge-green shrink-0 font-mono text-xs">{item.lei}</span>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="card border-green-500/30 bg-green-500/5 text-center">
            <h3 className="font-bold text-white text-xl mb-3">Pronto para denunciar?</h3>
            <p className="text-white/70 mb-6">
              Gere o B.O. e a documentação jurídica necessária para denunciar a sextorsão.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ferramentas/pacote-completo" className="btn-primary">
                <FileText className="w-4 h-4" />
                Kit Completo — R$47
              </Link>
              <Link href="/ferramentas/pacote-completo" className="btn-secondary">
                Denunciar agora
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <FAQSection items={faqItems} />

      {/* Related */}
      <section className="section border-t border-white/10">
        <div className="container max-w-4xl">
          <h2 className="text-xl font-bold text-white mb-6">Conteúdo relacionado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { titulo: 'Golpe do Falso Sequestro', href: '/golpes/golpe-falso-sequestro', emoji: '📞' },
              { titulo: 'Golpe de Phishing', href: '/golpes/golpe-phishing', emoji: '🎣' },
              { titulo: 'Golpe via Pix', href: '/golpes/golpe-pix', emoji: '⚡' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="card hover:border-green-500/30 transition-all group">
                <span className="text-2xl mb-2 block">{item.emoji}</span>
                <span className="text-sm font-semibold text-white/80 group-hover:text-green-400 transition-colors">
                  {item.titulo} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
