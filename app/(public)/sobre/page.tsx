import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Target, Heart, Users, CheckCircle, Mail, ArrowRight } from 'lucide-react';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';

export const metadata: Metadata = {
  title: 'Sobre Nós | Central de Defesa Digital',
  description: 'Conheça a Central de Defesa Digital — a maior plataforma brasileira de recuperação financeira após golpes digitais.',
  alternates: { canonical: 'https://defesapix.com.br/sobre' },
};

export default function SobrePage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Sobre' }]} />
      <section className="bg-hero-gradient py-20 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-gradient flex items-center justify-center mx-auto mb-6 shadow-green-glow">
            <Shield className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Central de Defesa Digital
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            A maior plataforma brasileira focada em recuperação financeira após golpes digitais.
            Nascemos para democratizar o acesso à defesa jurídica digital.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl space-y-16">
          {/* Mission */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, titulo: 'Nossa Missão', desc: 'Empoderar vítimas de golpes digitais com as ferramentas, documentos e conhecimento necessários para lutar por seus direitos, de forma acessível e sem burocracia.' },
              { icon: Heart, titulo: 'Nossos Valores', desc: 'Transparência total nos preços. Sem pegadinhas. Proteção de dados absoluta (LGPD). Conteúdo educativo gratuito. Parceiros jurídicos verificados.' },
              { icon: Users, titulo: 'Nossa Visão', desc: 'Ser a referência nacional em defesa digital, onde toda vítima de golpe digital sabe que tem um aliado confiável e gratuito para começar sua defesa.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titulo} className="card text-center">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-3">{item.titulo}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Story */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Nossa história</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                A Central de Defesa Digital nasceu de uma necessidade real: vítimas de golpes digitais
                no Brasil têm acesso limitado a informações claras e documentos corretos para se defender.
                Enquanto os golpistas se tornam cada vez mais sofisticados, a maioria das pessoas não
                sabe nem por onde começar.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                Criamos uma plataforma que democratiza o acesso à defesa jurídica digital. Com o MED
                do Banco Central, o CDC e a Lei 14.155/2021, há mais ferramentas do que nunca para
                vítimas de crimes digitais — mas poucos sabem como usá-las corretamente.
              </p>
              <p className="text-white/70 leading-relaxed">
                Hoje, ajudamos milhares de brasileiros por mês a entender seus direitos, gerar documentos
                corretos e tomar as ações certas dentro dos prazos legais. Porque cada hora pode fazer a
                diferença entre recuperar ou não o seu dinheiro.
              </p>
            </div>
          </div>

          {/* Commitments */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Nossos compromissos</h2>
            <div className="space-y-3">
              {[
                'Conteúdo educativo sempre gratuito e atualizado',
                'Documentos revisados por especialistas em direito digital',
                'Proteção total de dados conforme LGPD',
                'Parceiros jurídicos verificados e especializados',
                'Preços transparentes sem letras miúdas',
                'Garantia de 7 dias em todos os pagamentos',
                'Nunca venderemos seus dados ou contato para terceiros',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                  <span className="text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact / Partner CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card border-green-500/20">
              <Mail className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="font-bold text-white mb-2">Fale conosco</h3>
              <p className="text-sm text-white/60 mb-4">
                Dúvidas, sugestões ou para reportar erros no conteúdo.
              </p>
              <a href="mailto:contato@defesapix.com.br" className="btn-secondary text-sm py-2">
                contato@defesapix.com.br
              </a>
            </div>
            <div className="card border-yellow-500/20">
              <Shield className="w-8 h-8 text-yellow-400 mb-4" />
              <h3 className="font-bold text-white mb-2">Seja um parceiro jurídico</h3>
              <p className="text-sm text-white/60 mb-4">
                Advogados especializados em crimes digitais: faça parte da nossa rede.
              </p>
              <a href="mailto:parceiros@defesapix.com.br" className="btn-secondary text-sm py-2">
                parceiros@defesapix.com.br
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border border-white/10 rounded-xl p-6 text-sm text-white/40">
            <strong className="text-white/60 block mb-2">Importante — Aviso Legal</strong>
            A Central de Defesa Digital é uma plataforma de tecnologia e conteúdo educativo. Não somos
            um escritório de advocacia e não prestamos serviços jurídicos. Os documentos disponibilizados
            são modelos orientativos redigidos com base na legislação vigente, mas não substituem
            aconselhamento jurídico profissional. Para casos complexos, recomendamos consultar um
            advogado especializado.
          </div>
        </div>
      </section>
    </>
  );
}
