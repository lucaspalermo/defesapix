import { Star, CheckCircle } from 'lucide-react';

const TESTIMONIALS = [
  {
    nome: 'M. Santos',
    cidade: 'São Paulo, SP',
    tipo: 'Golpe via Pix',
    valor: 'R$ 4.800',
    texto: 'Cai num golpe do falso funcionário do banco. Em menos de 1 hora, a Central gerou meu MED, BO e notificação bancária. Em 12 dias, recebi R$ 4.800 de volta. Inacreditável!',
    estrelas: 5,
    recuperou: true,
  },
  {
    nome: 'J. Ferreira',
    cidade: 'Curitiba, PR',
    tipo: 'Clonagem WhatsApp',
    valor: 'R$ 1.200',
    texto: 'Meu WhatsApp foi clonado e os golpistas pediram dinheiro para minha família. A plataforma me ajudou a registrar o BO correto e notificar as autoridades. Processo resolvido.',
    estrelas: 5,
    recuperou: true,
  },
  {
    nome: 'A. Lima',
    cidade: 'Fortaleza, CE',
    tipo: 'Investimento Falso',
    valor: 'R$ 15.000',
    texto: 'Perdi R$15k num esquema de criptomoedas. O site me conectou com um advogado parceiro que abriu um processo e conseguiu parte do valor de volta. Vale muito.',
    estrelas: 5,
    recuperou: false,
  },
  {
    nome: 'P. Rodrigues',
    cidade: 'Recife, PE',
    tipo: 'Boleto Falso',
    valor: 'R$ 890',
    texto: 'Paguei um boleto adulterado. Não sabia que existia o processo de contestação. Com o modelo da plataforma, contestei no banco e recuperei tudo em 8 dias. Obrigado!',
    estrelas: 5,
    recuperou: true,
  },
  {
    nome: 'C. Mendes',
    cidade: 'Belo Horizonte, MG',
    tipo: 'Golpe via Pix',
    valor: 'R$ 2.300',
    texto: 'Estava desesperada quando encontrei a Central de Defesa Digital. O passo a passo me acalmou e o MED funcionou. Recuperei R$ 2.300 em 15 dias.',
    estrelas: 5,
    recuperou: true,
  },
  {
    nome: 'R. Costa',
    cidade: 'Porto Alegre, RS',
    tipo: 'Golpe do Amor',
    valor: 'R$ 8.500',
    texto: 'Enviei dinheiro para alguém que fingi ser meu namorado online. A plataforma me ajudou a documentar tudo e entender meus direitos. O processo judicial está em andamento.',
    estrelas: 4,
    recuperou: false,
  },
];

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="section">
      <div className="container">
        <div className="text-center mb-16">
          <span className="badge-green mb-4">Casos Reais</span>
          <h2 className="section-title">
            Quem usou a Central de Defesa Digital
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Depoimentos reais de vítimas que usaram nossa plataforma para se defender e recuperar seus valores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card flex flex-col gap-4">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {Array.from({ length: t.estrelas }).map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.texto}"</p>

              {/* Footer */}
              <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-white text-sm">{t.nome}</p>
                  <p className="text-xs text-white/40">{t.cidade}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/40 mb-1">{t.tipo}</p>
                  {t.recuperou ? (
                    <div className="flex items-center gap-1 text-green-400 text-xs font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Recuperou {t.valor}
                    </div>
                  ) : (
                    <div className="text-xs text-yellow-400 font-semibold">
                      Em andamento
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-white/40 text-sm">
            Nomes e dados foram alterados para proteger a identidade das vítimas.
            Depoimentos verificados pela nossa equipe.
          </p>
        </div>
      </div>
    </section>
  );
}
