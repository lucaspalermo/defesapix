import type { Metadata } from 'next';
import { Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de Uso da plataforma DefesaPix — leia atentamente antes de utilizar nossos serviços.',
  robots: { index: false, follow: false },
};

export default function TermosPage() {
  return (
    <>
      <section className="bg-hero-gradient py-20 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-gradient flex items-center justify-center mx-auto mb-6 shadow-green-glow">
            <Shield className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Termos de Uso
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Última atualização: 25 de fevereiro de 2026
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl space-y-12">

          {/* 1. Aceitação dos Termos */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">1. Aceitação dos Termos</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Ao acessar e utilizar a plataforma DefesaPix (defesapix.com.br), você concorda integralmente com estes
                Termos de Uso. Caso não concorde com qualquer disposição aqui prevista, solicitamos que não utilize nossos
                serviços.
              </p>
              <p className="text-white/70 leading-relaxed">
                Estes termos podem ser atualizados periodicamente. Recomendamos que os consulte regularmente. O uso
                continuado da plataforma após alterações constitui aceitação das novas condições.
              </p>
            </div>
          </div>

          {/* 2. Descrição do Serviço */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">2. Descrição do Serviço</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                A DefesaPix é uma plataforma de tecnologia que auxilia vítimas de golpes digitais (especialmente fraudes
                via PIX) na geração de documentos jurídicos modelo, incluindo:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2 mb-4">
                <li>Contestação MED (Mecanismo Especial de Devolução)</li>
                <li>Boletim de Ocorrência (modelo para registro)</li>
                <li>Notificação extrajudicial ao banco</li>
                <li>Plano de ação personalizado com prazos legais</li>
                <li>Conteúdo educativo sobre prevenção e recuperação</li>
                <li>Conexão com rede de advogados parceiros especializados</li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                A plataforma também oferece ferramentas gratuitas de classificação de golpes e orientação
                inicial sobre os passos a seguir após uma fraude digital.
              </p>
            </div>
          </div>

          {/* 3. Aviso Legal — Natureza dos Documentos */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. Aviso Legal — Natureza dos Documentos</h2>
            <div className="card border-yellow-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">Importante:</strong> A DefesaPix é uma plataforma de tecnologia e conteúdo
                educativo. <strong className="text-white">Não somos um escritório de advocacia</strong> e não prestamos
                serviços de assessoria ou consultoria jurídica.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                Os documentos gerados pela plataforma são <strong className="text-white">modelos orientativos</strong>,
                redigidos com base na legislação brasileira vigente (Código de Defesa do Consumidor, Resolução BCB
                n.º 93/2021, Lei 14.155/2021, entre outras). Eles não substituem o aconselhamento jurídico profissional
                e individualizado.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                A utilização dos documentos é de responsabilidade exclusiva do usuário. Para casos de maior complexidade
                ou valores elevados, recomendamos fortemente a consulta com um advogado especializado em direito digital.
              </p>
              <p className="text-white/70 leading-relaxed">
                A DefesaPix não garante resultados específicos, tais como recuperação de valores, bloqueio de contas
                ou êxito em processos judiciais ou administrativos.
              </p>
            </div>
          </div>

          {/* 4. Responsabilidades do Usuário */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">4. Responsabilidades do Usuário</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">Ao utilizar a plataforma, o usuário se compromete a:</p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2">
                <li>Fornecer informações verdadeiras, completas e atualizadas sobre o caso relatado</li>
                <li>Não utilizar a plataforma para fins ilícitos, fraudulentos ou em desacordo com a legislação vigente</li>
                <li>Não fornecer dados falsos com a intenção de gerar documentos para fraudes ou denúncias inverídicas</li>
                <li>Manter a confidencialidade de suas credenciais de acesso (login e senha)</li>
                <li>Verificar a adequação dos documentos gerados ao seu caso específico antes de utilizá-los</li>
                <li>Respeitar os direitos de propriedade intelectual da plataforma sobre seu conteúdo e ferramentas</li>
              </ul>
            </div>
          </div>

          {/* 5. Proteção de Dados — LGPD */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">5. Proteção de Dados — LGPD</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                A DefesaPix está em conformidade com a Lei Geral de Proteção de Dados (Lei n.º 13.709/2018 — LGPD).
                Os dados pessoais coletados são tratados exclusivamente para as finalidades descritas em nossa{' '}
                <a href="/privacidade" className="text-green-400 underline hover:text-green-300 transition-colors">
                  Política de Privacidade
                </a>.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                Não vendemos, compartilhamos ou cedemos dados pessoais de nossos usuários a terceiros para fins
                comerciais ou publicitários. Os dados são utilizados exclusivamente para a prestação do serviço
                contratado e para melhorias internas da plataforma.
              </p>
              <p className="text-white/70 leading-relaxed">
                O usuário pode exercer seus direitos previstos na LGPD (acesso, retificação, exclusão, portabilidade,
                entre outros) entrando em contato pelo e-mail{' '}
                <a href="mailto:privacidade@defesapix.com.br" className="text-green-400 underline hover:text-green-300 transition-colors">
                  privacidade@defesapix.com.br
                </a>.
              </p>
            </div>
          </div>

          {/* 6. Pagamentos e Política de Reembolso */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">6. Pagamentos e Política de Reembolso</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                A plataforma oferece ferramentas gratuitas e serviços pagos. Os valores são informados de forma
                transparente antes da contratação, sem cobranças ocultas.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">Garantia de 7 dias:</strong> Em conformidade com o art. 49 do Código de
                Defesa do Consumidor, o usuário tem o direito de desistir da compra em até 7 (sete) dias corridos a
                contar da data da aquisição, sem necessidade de justificativa, com reembolso integral do valor pago.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                Para solicitar reembolso, entre em contato pelo e-mail{' '}
                <a href="mailto:contato@defesapix.com.br" className="text-green-400 underline hover:text-green-300 transition-colors">
                  contato@defesapix.com.br
                </a>{' '}
                informando o e-mail utilizado na compra e o motivo da solicitação. O reembolso será processado em até
                10 dias úteis, pelo mesmo meio de pagamento utilizado na aquisição.
              </p>
              <p className="text-white/70 leading-relaxed">
                Os pagamentos são processados por plataformas de pagamento terceirizadas com certificação de segurança
                PCI-DSS. A DefesaPix não armazena dados de cartão de crédito em seus servidores.
              </p>
            </div>
          </div>

          {/* 7. Limitação de Responsabilidade */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">7. Limitação de Responsabilidade</h2>
            <div className="card border-yellow-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                A DefesaPix não se responsabiliza por:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2 mb-4">
                <li>Resultados obtidos pelo usuário com o uso dos documentos gerados pela plataforma</li>
                <li>Decisões tomadas por instituições financeiras, órgãos públicos ou autoridades judiciais</li>
                <li>Danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso ou da impossibilidade de uso da plataforma</li>
                <li>Atrasos ou falhas no serviço causados por eventos de força maior, falhas de terceiros ou indisponibilidade de sistemas externos</li>
                <li>Informações incorretas ou incompletas fornecidas pelo usuário</li>
                <li>Uso indevido dos documentos pelo usuário ou por terceiros</li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                A responsabilidade total da DefesaPix, em qualquer hipótese, estará limitada ao valor efetivamente
                pago pelo usuário pelo serviço contratado.
              </p>
            </div>
          </div>

          {/* 8. Propriedade Intelectual */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">8. Propriedade Intelectual</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Todo o conteúdo da plataforma — incluindo textos, modelos de documentos, design, logotipos, software,
                algoritmos, marcas e código-fonte — é de propriedade exclusiva da DefesaPix ou de seus licenciadores,
                sendo protegido pela legislação brasileira de propriedade intelectual.
              </p>
              <p className="text-white/70 leading-relaxed">
                É vedada a reprodução, distribuição, modificação ou uso comercial de qualquer conteúdo da plataforma
                sem autorização prévia e expressa da DefesaPix.
              </p>
            </div>
          </div>

          {/* 9. Modificações nos Termos */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">9. Modificações nos Termos</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed">
                A DefesaPix reserva-se o direito de modificar estes Termos de Uso a qualquer momento, mediante
                publicação da versão atualizada nesta página. Alterações significativas serão comunicadas por e-mail
                aos usuários cadastrados. O uso continuado da plataforma após a publicação das alterações implica
                aceitação automática dos novos termos.
              </p>
            </div>
          </div>

          {/* 10. Legislação Aplicável e Foro */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">10. Legislação Aplicável e Foro</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed">
                Estes Termos de Uso são regidos pela legislação da República Federativa do Brasil. Qualquer litígio
                decorrente destes termos será submetido ao foro da comarca do domicílio do consumidor, conforme
                previsto no Código de Defesa do Consumidor.
              </p>
            </div>
          </div>

          {/* 11. Contato */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">11. Contato</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Para dúvidas, sugestões ou reclamações sobre estes Termos de Uso, entre em contato conosco:
              </p>
              <ul className="text-white/70 leading-relaxed space-y-2">
                <li>
                  <strong className="text-white">E-mail geral:</strong>{' '}
                  <a href="mailto:contato@defesapix.com.br" className="text-green-400 underline hover:text-green-300 transition-colors">
                    contato@defesapix.com.br
                  </a>
                </li>
                <li>
                  <strong className="text-white">Privacidade e dados:</strong>{' '}
                  <a href="mailto:privacidade@defesapix.com.br" className="text-green-400 underline hover:text-green-300 transition-colors">
                    privacidade@defesapix.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border border-white/10 rounded-xl p-6 text-sm text-white/40">
            <strong className="text-white/60 block mb-2">Aviso Legal</strong>
            A DefesaPix é uma plataforma de tecnologia e conteúdo educativo. Não somos um escritório de advocacia
            e não prestamos serviços jurídicos. Os documentos disponibilizados são modelos orientativos redigidos com
            base na legislação vigente, mas não substituem aconselhamento jurídico profissional.
          </div>

        </div>
      </section>
    </>
  );
}
