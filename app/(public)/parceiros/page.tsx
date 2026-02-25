import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, MapPin, Phone, CheckCircle, Star, ArrowRight, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Parceiros Jurídicos Especializados em Golpes Digitais | Central de Defesa Digital',
  description:
    'Rede de advogados e escritórios especializados em crimes digitais e recuperação financeira. Consulta gratuita de 30 minutos para casos acima de R$5.000.',
  alternates: { canonical: 'https://centraldefesadigital.com.br/parceiros' },
};

const PARCEIROS = [
  {
    nome: 'Escritório Silva & Associados',
    tipo: 'Escritório de Advocacia',
    especialidades: ['Golpe Pix', 'Fraude Bancária', 'Crimes Digitais'],
    cidade: 'São Paulo, SP',
    oab: 'OAB/SP 123.456',
    descricao: 'Especialistas em direito digital com mais de 10 anos de experiência em recuperação de valores via MED e ações judiciais contra bancos.',
    estrelas: 5,
    casosResolvidos: 247,
    consultaGratuita: true,
    whatsapp: '11999999999',
  },
  {
    nome: 'Dr. João Carvalho',
    tipo: 'Advogado Individual',
    especialidades: ['Investimento Falso', 'Criptomoedas', 'Estelionato'],
    cidade: 'Rio de Janeiro, RJ',
    oab: 'OAB/RJ 89.012',
    descricao: 'Advogado criminalista especializado em crimes financeiros digitais e recuperação de ativos em esquemas de investimento fraudulento.',
    estrelas: 5,
    casosResolvidos: 183,
    consultaGratuita: true,
    whatsapp: '21999999999',
  },
  {
    nome: 'Digital Law Consultoria',
    tipo: 'Consultoria Jurídica',
    especialidades: ['LGPD', 'Phishing', 'Fraude de Cartão'],
    cidade: 'Belo Horizonte, MG',
    oab: 'OAB/MG 45.678',
    descricao: 'Consultoria especializada em direito digital com foco em proteção de dados e recuperação de prejuízos causados por crimes cibernéticos.',
    estrelas: 4,
    casosResolvidos: 156,
    consultaGratuita: false,
    whatsapp: '31999999999',
  },
  {
    nome: 'Dra. Ana Paula Mendes',
    tipo: 'Advogada Individual',
    especialidades: ['Golpe Pix', 'Golpe do Amor', 'WhatsApp'],
    cidade: 'Curitiba, PR',
    oab: 'OAB/PR 34.567',
    descricao: 'Advogada especialista em crimes cibernéticos com foco em vítimas de golpes afetivos e recuperação via mecanismos bancários.',
    estrelas: 5,
    casosResolvidos: 128,
    consultaGratuita: true,
    whatsapp: '41999999999',
  },
];

export default function ParceirosPage() {
  return (
    <>
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-5xl text-center">
          <span className="badge-green mb-4">Rede Jurídica</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Parceiros Jurídicos<br />
            <span className="gradient-text">especializados em golpes digitais</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-6">
            Quando documentos não são suficientes, nossa rede de advogados parceiros
            especializados em crimes digitais pode te ajudar.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Consulta gratuita (30 min)</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Advogados verificados</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Especialistas em golpes digitais</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-5xl">
          {/* When to use a lawyer */}
          <div className="card border-yellow-500/20 mb-12">
            <h2 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-yellow-400" />
              Quando você precisa de um advogado?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Valor acima de R$5.000 e o banco negou o MED',
                'Banco ou empresa se recusou a devolver valores',
                'Você quer mover ação judicial por danos morais',
                'O golpe envolveu outras vítimas (ação coletiva)',
                'Você tem dúvidas sobre sua responsabilidade',
                'O processo está há mais de 30 dias sem resolução',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Partner list */}
          <div className="space-y-6 mb-12">
            {PARCEIROS.map((parceiro, idx) => (
              <div key={idx} className="card hover:border-green-500/30 transition-all">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-bold text-white text-lg">{parceiro.nome}</h3>
                      {parceiro.consultaGratuita && (
                        <span className="badge-green text-xs">Consulta gratuita</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/50 mb-3 flex-wrap">
                      <span className="flex items-center gap-1"><Scale className="w-3.5 h-3.5" /> {parceiro.oab}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {parceiro.cidade}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {parceiro.casosResolvidos} casos</span>
                    </div>
                    <p className="text-sm text-white/60 mb-4 leading-relaxed">{parceiro.descricao}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {parceiro.especialidades.map((esp) => (
                        <span key={esp} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-lg">{esp}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: parceiro.estrelas }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-white/40 ml-1">({parceiro.casosResolvidos} avaliações)</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:w-48 shrink-0">
                    <a
                      href={`https://wa.me/55${parceiro.whatsapp}?text=Olá, vim pela Central de Defesa Digital e gostaria de uma consulta.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary justify-center text-sm py-2.5"
                    >
                      <Phone className="w-4 h-4" />
                      {parceiro.consultaGratuita ? 'Consulta gratuita' : 'Agendar consulta'}
                    </a>
                    <span className="text-xs text-white/40 text-center">
                      {parceiro.consultaGratuita ? '30 min grátis via WhatsApp' : 'Via WhatsApp'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Become a partner */}
          <div className="card border-green-500/20 text-center">
            <h3 className="font-bold text-white text-xl mb-3">É advogado especializado em crimes digitais?</h3>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              Faça parte da nossa rede e receba casos qualificados de vítimas que já geraram
              os documentos iniciais e estão prontas para avançar juridicamente.
            </p>
            <Link href="/sobre" className="btn-secondary">
              Quero ser parceiro
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
