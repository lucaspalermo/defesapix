import type { Metadata } from 'next';
import { Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da plataforma DefesaPix — saiba como coletamos, usamos e protegemos seus dados pessoais.',
  robots: { index: false, follow: false },
};

export default function PrivacidadePage() {
  return (
    <>
      <section className="bg-hero-gradient py-20 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-gradient flex items-center justify-center mx-auto mb-6 shadow-green-glow">
            <Lock className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Última atualização: 25 de fevereiro de 2026
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl space-y-12">

          {/* 1. Introdução */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introdução</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                A DefesaPix (defesapix.com.br) valoriza a privacidade e a proteção dos dados pessoais de seus
                usuários. Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos
                suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei n.º 13.709/2018 — LGPD).
              </p>
              <p className="text-white/70 leading-relaxed">
                Ao utilizar nossa plataforma, você declara que leu e compreendeu esta Política e consente com o
                tratamento de seus dados pessoais conforme aqui descrito.
              </p>
            </div>
          </div>

          {/* 2. Dados Coletados */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">2. Dados Coletados</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Coletamos os seguintes tipos de dados pessoais, de acordo com a finalidade de cada serviço:
              </p>

              <h3 className="text-lg font-bold text-white mb-3">2.1 Dados de Identificação</h3>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2 mb-6">
                <li>Nome completo</li>
                <li>Endereço de e-mail</li>
                <li>CPF (necessário para geração de documentos jurídicos)</li>
                <li>Número de telefone (opcional)</li>
              </ul>

              <h3 className="text-lg font-bold text-white mb-3">2.2 Dados do Caso</h3>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2 mb-6">
                <li>Descrição do golpe sofrido</li>
                <li>Tipo de golpe (Pix, WhatsApp, boleto, etc.)</li>
                <li>Valor envolvido na fraude</li>
                <li>Data e hora da ocorrência</li>
                <li>Dados bancários relacionados (banco, agência, conta)</li>
                <li>Dados do destinatário da transferência (quando disponíveis)</li>
                <li>Evidências e comprovantes fornecidos pelo usuário</li>
              </ul>

              <h3 className="text-lg font-bold text-white mb-3">2.3 Dados de Navegação</h3>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2">
                <li>Endereço IP</li>
                <li>Tipo de navegador e sistema operacional</li>
                <li>Páginas acessadas e tempo de permanência</li>
                <li>Dados de cookies e tecnologias semelhantes</li>
                <li>Origem do acesso (referrer)</li>
              </ul>
            </div>
          </div>

          {/* 3. Finalidade da Coleta */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. Finalidade da Coleta</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Os dados pessoais são coletados e tratados para as seguintes finalidades:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2">
                <li><strong className="text-white">Prestação do serviço:</strong> geração de documentos jurídicos personalizados (contestação MED, boletim de ocorrência, notificação bancária)</li>
                <li><strong className="text-white">Classificação do caso:</strong> análise do tipo de golpe e geração do plano de ação personalizado</li>
                <li><strong className="text-white">Comunicação:</strong> envio de notificações sobre o andamento do caso, prazos legais e atualizações relevantes</li>
                <li><strong className="text-white">Melhoria do serviço:</strong> análise estatística anônima para aprimorar a plataforma e os modelos de documentos</li>
                <li><strong className="text-white">Segurança:</strong> prevenção de fraudes, proteção contra uso indevido e garantia da integridade do sistema</li>
                <li><strong className="text-white">Obrigação legal:</strong> cumprimento de obrigações legais e regulatórias aplicáveis</li>
              </ul>
            </div>
          </div>

          {/* 4. Base Legal — LGPD */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">4. Base Legal — LGPD</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                O tratamento de dados pessoais pela DefesaPix está fundamentado nas seguintes bases legais previstas na LGPD:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2">
                <li><strong className="text-white">Consentimento (art. 7º, I):</strong> para coleta de dados durante o cadastro e uso da plataforma</li>
                <li><strong className="text-white">Execução de contrato (art. 7º, V):</strong> para prestação dos serviços contratados pelo usuário</li>
                <li><strong className="text-white">Legítimo interesse (art. 7º, IX):</strong> para melhorias na plataforma e comunicações relevantes</li>
                <li><strong className="text-white">Cumprimento de obrigação legal (art. 7º, II):</strong> quando exigido por lei ou regulamentação</li>
              </ul>
            </div>
          </div>

          {/* 5. Armazenamento e Segurança */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">5. Armazenamento e Segurança</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso
                não autorizado, perda, destruição ou qualquer forma de tratamento inadequado:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2 mb-4">
                <li>Criptografia SSL/TLS 256-bit em todas as transmissões de dados</li>
                <li>Criptografia de dados sensíveis em repouso (at-rest encryption)</li>
                <li>Autenticação segura com hash de senhas (bcrypt)</li>
                <li>Acesso restrito aos dados apenas por pessoal autorizado</li>
                <li>Monitoramento contínuo de segurança e logs de acesso</li>
                <li>Backups regulares com criptografia</li>
                <li>Servidores hospedados em provedores com certificação ISO 27001</li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                Os dados pessoais são armazenados pelo período necessário à prestação do serviço e ao cumprimento de
                obrigações legais. Após o término da finalidade, os dados são eliminados ou anonimizados, salvo
                quando a retenção for exigida por lei.
              </p>
            </div>
          </div>

          {/* 6. Compartilhamento de Dados */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">6. Compartilhamento de Dados</h2>
            <div className="card border-yellow-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                <strong className="text-white">A DefesaPix não vende, aluga ou cede seus dados pessoais a terceiros
                para fins comerciais ou publicitários.</strong>
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                Seus dados podem ser compartilhados apenas nas seguintes hipóteses:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2">
                <li><strong className="text-white">Advogados parceiros:</strong> quando o usuário solicitar expressamente o encaminhamento de seu caso para um advogado da rede parceira</li>
                <li><strong className="text-white">Processadores de pagamento:</strong> dados estritamente necessários para o processamento de transações financeiras (ex.: Stripe, Mercado Pago)</li>
                <li><strong className="text-white">Prestadores de serviço:</strong> empresas que auxiliam na operação da plataforma (hospedagem, e-mail), sempre sob contratos de confidencialidade e em conformidade com a LGPD</li>
                <li><strong className="text-white">Autoridades competentes:</strong> quando exigido por lei, ordem judicial ou procedimento legal</li>
              </ul>
            </div>
          </div>

          {/* 7. Direitos do Titular */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">7. Direitos do Titular dos Dados</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Em conformidade com a LGPD (art. 18), você tem os seguintes direitos sobre seus dados pessoais:
              </p>
              <ul className="list-disc list-inside text-white/70 leading-relaxed space-y-2 mb-4">
                <li><strong className="text-white">Confirmação e acesso:</strong> confirmar a existência de tratamento e acessar seus dados</li>
                <li><strong className="text-white">Correção:</strong> solicitar a retificação de dados incompletos, inexatos ou desatualizados</li>
                <li><strong className="text-white">Anonimização ou eliminação:</strong> solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos</li>
                <li><strong className="text-white">Portabilidade:</strong> solicitar a portabilidade dos dados a outro fornecedor de serviço</li>
                <li><strong className="text-white">Eliminação:</strong> solicitar a eliminação dos dados tratados com base no consentimento</li>
                <li><strong className="text-white">Informação:</strong> ser informado sobre as entidades com as quais seus dados foram compartilhados</li>
                <li><strong className="text-white">Revogação do consentimento:</strong> revogar o consentimento a qualquer momento</li>
                <li><strong className="text-white">Oposição:</strong> opor-se ao tratamento quando realizado em desconformidade com a LGPD</li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                Para exercer qualquer desses direitos, envie um e-mail para{' '}
                <a href="mailto:privacidade@defesapix.com.br" className="text-green-400 underline hover:text-green-300 transition-colors">
                  privacidade@defesapix.com.br
                </a>{' '}
                com o assunto &quot;Solicitação LGPD&quot;. Responderemos em até 15 dias úteis, conforme previsto na legislação.
              </p>
            </div>
          </div>

          {/* 8. Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">8. Cookies e Tecnologias de Rastreamento</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                A DefesaPix utiliza cookies e tecnologias semelhantes para melhorar a experiência do usuário. Os tipos
                de cookies utilizados são:
              </p>

              <h3 className="text-lg font-bold text-white mb-3">8.1 Cookies Essenciais</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Necessários para o funcionamento básico da plataforma, como autenticação, segurança e preferências
                de sessão. Não podem ser desativados.
              </p>

              <h3 className="text-lg font-bold text-white mb-3">8.2 Cookies de Análise</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Utilizados para entender como os usuários interagem com a plataforma, permitindo melhorias contínuas.
                Coletam dados anonimizados sobre navegação, páginas visitadas e tempo de permanência.
              </p>

              <h3 className="text-lg font-bold text-white mb-3">8.3 Cookies de Marketing</h3>
              <p className="text-white/70 leading-relaxed mb-4">
                Utilizados para exibir anúncios relevantes e medir a eficácia de campanhas publicitárias. Podem ser
                desativados nas configurações do navegador.
              </p>

              <p className="text-white/70 leading-relaxed">
                Você pode gerenciar suas preferências de cookies a qualquer momento nas configurações do seu navegador.
                A desativação de cookies não essenciais pode afetar funcionalidades da plataforma.
              </p>
            </div>
          </div>

          {/* 9. Transferência Internacional */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">9. Transferência Internacional de Dados</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed">
                Alguns de nossos prestadores de serviço (hospedagem, processamento de pagamento, envio de e-mails)
                podem estar localizados fora do Brasil. Nesses casos, a transferência internacional de dados é realizada
                em conformidade com a LGPD (arts. 33 a 36), garantindo que os destinatários ofereçam nível adequado
                de proteção de dados ou mediante cláusulas contratuais específicas.
              </p>
            </div>
          </div>

          {/* 10. Menores de Idade */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">10. Menores de Idade</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed">
                A plataforma DefesaPix não é destinada a menores de 18 anos. Não coletamos intencionalmente dados
                pessoais de crianças ou adolescentes. Caso um responsável legal identifique que um menor forneceu
                dados pessoais sem autorização, entre em contato pelo e-mail{' '}
                <a href="mailto:privacidade@defesapix.com.br" className="text-green-400 underline hover:text-green-300 transition-colors">
                  privacidade@defesapix.com.br
                </a>{' '}
                para que possamos providenciar a exclusão imediata.
              </p>
            </div>
          </div>

          {/* 11. Alterações nesta Política */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">11. Alterações nesta Política</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed">
                Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em nossas
                práticas ou na legislação aplicável. A versão atualizada será sempre publicada nesta página com a
                data de última atualização. Alterações significativas serão comunicadas por e-mail aos usuários
                cadastrados.
              </p>
            </div>
          </div>

          {/* 12. Contato e Encarregado de Dados */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">12. Contato e Encarregado de Dados (DPO)</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Para dúvidas, solicitações ou reclamações relacionadas a esta Política de Privacidade ou ao tratamento
                de seus dados pessoais, entre em contato com nosso Encarregado de Dados (DPO):
              </p>
              <ul className="text-white/70 leading-relaxed space-y-2">
                <li>
                  <strong className="text-white">E-mail do DPO:</strong>{' '}
                  <a href="mailto:privacidade@defesapix.com.br" className="text-green-400 underline hover:text-green-300 transition-colors">
                    privacidade@defesapix.com.br
                  </a>
                </li>
                <li>
                  <strong className="text-white">E-mail geral:</strong>{' '}
                  <a href="mailto:contato@defesapix.com.br" className="text-green-400 underline hover:text-green-300 transition-colors">
                    contato@defesapix.com.br
                  </a>
                </li>
              </ul>
              <p className="text-white/70 leading-relaxed mt-4">
                Você também tem o direito de apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD)
                caso entenda que seus direitos não foram adequadamente atendidos.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border border-white/10 rounded-xl p-6 text-sm text-white/40">
            <strong className="text-white/60 block mb-2">Compromisso com sua Privacidade</strong>
            A DefesaPix se compromete a tratar seus dados pessoais com responsabilidade e transparência. Seus dados
            nunca serão vendidos a terceiros. Utilizamos as melhores práticas de segurança da informação para
            garantir a integridade e confidencialidade das suas informações.
          </div>

        </div>
      </section>
    </>
  );
}
