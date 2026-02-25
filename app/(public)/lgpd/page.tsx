import type { Metadata } from 'next';
import { Scale } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LGPD — Seus Direitos | DefesaPix',
  description: 'Conheça seus direitos de titular de dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD). Saiba como exercê-los na plataforma DefesaPix.',
  robots: { index: false, follow: false },
};

export default function LGPDPage() {
  return (
    <>
      <section className="bg-hero-gradient py-20 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-gradient flex items-center justify-center mx-auto mb-6 shadow-green-glow">
            <Scale className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            LGPD — Seus Direitos
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Lei Geral de Proteção de Dados Pessoais (Lei n.º 13.709/2018)
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl space-y-12">

          {/* 1. O que é a LGPD */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">1. O que é a LGPD</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                A Lei Geral de Proteção de Dados Pessoais (LGPD), Lei n.º 13.709/2018, é a legislação brasileira
                que regula o tratamento de dados pessoais por pessoas físicas e jurídicas, de direito público ou
                privado, com o objetivo de proteger os direitos fundamentais de liberdade e privacidade.
              </p>
              <p className="text-white/70 leading-relaxed">
                A DefesaPix atua em total conformidade com a LGPD, garantindo transparência, segurança e respeito
                aos direitos dos titulares de dados.
              </p>
            </div>
          </div>

          {/* 2. Seus Direitos */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">2. Seus Direitos como Titular de Dados</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-6">
                Conforme o artigo 18 da LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <div className="space-y-4">
                {[
                  { titulo: 'Confirmação de tratamento', desc: 'Direito de saber se a DefesaPix realiza tratamento dos seus dados pessoais.' },
                  { titulo: 'Acesso aos dados', desc: 'Direito de obter uma cópia dos dados pessoais que mantemos sobre você.' },
                  { titulo: 'Correção de dados', desc: 'Direito de solicitar a correção de dados incompletos, inexatos ou desatualizados.' },
                  { titulo: 'Anonimização, bloqueio ou eliminação', desc: 'Direito de solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.' },
                  { titulo: 'Portabilidade', desc: 'Direito de solicitar a portabilidade dos seus dados a outro fornecedor de serviço ou produto.' },
                  { titulo: 'Eliminação de dados tratados com consentimento', desc: 'Direito de solicitar a eliminação de dados pessoais tratados com base no seu consentimento, exceto nos casos previstos em lei.' },
                  { titulo: 'Informação sobre compartilhamento', desc: 'Direito de saber com quais entidades públicas e privadas compartilhamos seus dados.' },
                  { titulo: 'Revogação do consentimento', desc: 'Direito de revogar o consentimento a qualquer momento, de forma gratuita e facilitada.' },
                ].map((d) => (
                  <div key={d.titulo} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">{d.titulo}:</strong>{' '}
                      <span className="text-white/70">{d.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Bases Legais */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. Bases Legais para Tratamento</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                A DefesaPix trata seus dados pessoais com base nas seguintes hipóteses legais previstas no artigo 7º da LGPD:
              </p>
              <div className="space-y-3">
                {[
                  { base: 'Consentimento (art. 7º, I)', uso: 'Newsletter, cookies de análise, comunicações de marketing' },
                  { base: 'Execução de contrato (art. 7º, V)', uso: 'Prestação de serviços contratados — geração de documentos, pagamentos' },
                  { base: 'Exercício regular de direitos (art. 7º, VI)', uso: 'Defesa em processos judiciais, administrativos ou arbitrais' },
                  { base: 'Legítimo interesse (art. 7º, IX)', uso: 'Melhoria dos serviços, segurança da plataforma, prevenção a fraudes' },
                  { base: 'Cumprimento de obrigação legal (art. 7º, II)', uso: 'Obrigações fiscais e regulatórias' },
                ].map((b) => (
                  <div key={b.base} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-white">{b.base}:</strong>{' '}
                      <span className="text-white/70">{b.uso}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Dados Coletados */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">4. Dados que Coletamos</h2>
            <div className="card border-green-500/20 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Dados fornecidos por você:</h3>
                <p className="text-white/70 leading-relaxed">
                  Nome, e-mail, CPF (para pagamentos PIX), telefone (opcional), e informações inseridas nos
                  formulários de geração de documentos (relato do golpe, dados bancários, valores envolvidos).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Dados coletados automaticamente:</h3>
                <p className="text-white/70 leading-relaxed">
                  Endereço IP, tipo de navegador, sistema operacional, páginas visitadas, data e hora de acesso,
                  cookies e identificadores de sessão.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Dados sensíveis:</h3>
                <p className="text-white/70 leading-relaxed">
                  A DefesaPix <strong className="text-amber-400">não coleta dados sensíveis</strong> (origem racial, opinião política,
                  convicção religiosa, dados de saúde, etc.). Os relatos de golpes fornecidos pelos usuários são
                  tratados com confidencialidade e utilizados exclusivamente para a geração dos documentos solicitados.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Segurança */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">5. Medidas de Segurança</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Adotamos medidas técnicas e administrativas aptas a proteger seus dados pessoais:
              </p>
              <ul className="space-y-2 text-white/70">
                {[
                  'Criptografia SSL/TLS 256-bit em todas as comunicações',
                  'Banco de dados hospedado com criptografia em repouso (Neon PostgreSQL)',
                  'Autenticação segura com hash bcrypt para senhas',
                  'Controle de acesso baseado em funções (RBAC)',
                  'Pagamentos processados via gateway certificado PCI-DSS (Asaas)',
                  'Monitoramento contínuo de acessos não autorizados',
                  'Backups periódicos com retenção controlada',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 6. Retenção */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">6. Tempo de Retenção dos Dados</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Seus dados pessoais são armazenados pelo tempo necessário para cumprir as finalidades descritas
                nesta política, observando os seguintes critérios:
              </p>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Dados de conta:</strong> enquanto a conta estiver ativa ou por 5 anos após inatividade</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Documentos gerados:</strong> 90 dias após a geração, podendo ser excluídos a pedido</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Dados de pagamento:</strong> conforme obrigações fiscais (mínimo 5 anos)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Logs de acesso:</strong> 6 meses conforme Marco Civil da Internet (Lei 12.965/2014)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 7. Como exercer seus direitos */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">7. Como Exercer seus Direitos</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Para exercer qualquer dos direitos listados acima, envie um e-mail para:
              </p>
              <p className="text-lg font-bold text-ember-400 mb-4">
                contato@defesapix.com.br
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                Em sua solicitação, informe:
              </p>
              <ul className="space-y-2 text-white/70 mb-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  Seu nome completo e e-mail cadastrado na plataforma
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  Descrição clara do direito que deseja exercer
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  Documento de identificação para verificação
                </li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                Responderemos sua solicitação em até <strong className="text-white">15 dias úteis</strong>, conforme
                previsto no artigo 18, §5º da LGPD.
              </p>
            </div>
          </div>

          {/* 8. ANPD */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">8. Autoridade Nacional de Proteção de Dados</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Caso entenda que o tratamento de seus dados pessoais viola a LGPD, você tem o direito de
                apresentar reclamação junto à Autoridade Nacional de Proteção de Dados (ANPD):
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">Site:</strong> gov.br/anpd<br />
                <strong className="text-white">E-mail:</strong> encarregado@anpd.gov.br
              </p>
            </div>
          </div>

          {/* Links relacionados */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Link href="/privacidade" className="text-sm text-ember-400 hover:text-ember-300 underline underline-offset-4">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="text-sm text-ember-400 hover:text-ember-300 underline underline-offset-4">
              Termos de Uso
            </Link>
            <Link href="/cookies" className="text-sm text-ember-400 hover:text-ember-300 underline underline-offset-4">
              Política de Cookies
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
