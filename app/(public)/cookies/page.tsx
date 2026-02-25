import type { Metadata } from 'next';
import { Cookie } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de Cookies da plataforma DefesaPix — saiba como utilizamos cookies e tecnologias semelhantes para melhorar sua experiência.',
  robots: { index: false, follow: false },
};

export default function CookiesPage() {
  return (
    <>
      <section className="bg-hero-gradient py-20 bg-grid-pattern">
        <div className="container max-w-4xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-gradient flex items-center justify-center mx-auto mb-6 shadow-green-glow">
            <Cookie className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Política de Cookies
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Última atualização: 25 de fevereiro de 2026
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl space-y-12">

          {/* 1. O que são Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">1. O que são Cookies</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um site.
                Eles permitem que o site reconheça seu dispositivo e armazene informações sobre suas preferências
                ou ações anteriores.
              </p>
              <p className="text-white/70 leading-relaxed">
                A DefesaPix utiliza cookies e tecnologias semelhantes para garantir o funcionamento adequado da
                plataforma, melhorar sua experiência de navegação e analisar o uso dos nossos serviços.
              </p>
            </div>
          </div>

          {/* 2. Tipos de Cookies */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">2. Tipos de Cookies que Utilizamos</h2>
            <div className="card border-green-500/20 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">2.1 Cookies Essenciais</h3>
                <p className="text-white/70 leading-relaxed">
                  São necessários para o funcionamento básico da plataforma. Incluem cookies de sessão para
                  autenticação, preferências de segurança e proteção contra fraudes. Sem eles, a plataforma
                  não funciona corretamente. <strong className="text-white">Base legal:</strong> legítimo interesse
                  e execução de contrato.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">2.2 Cookies de Desempenho e Análise</h3>
                <p className="text-white/70 leading-relaxed">
                  Utilizamos o Google Analytics (ID: G-VN5PQZYBCD) para coletar dados anônimos sobre como
                  os visitantes interagem com o site — páginas visitadas, tempo de permanência, origem do
                  tráfego e taxa de rejeição. Esses dados nos ajudam a melhorar continuamente a plataforma.
                  <strong className="text-white"> Base legal:</strong> consentimento.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">2.3 Cookies de Funcionalidade</h3>
                <p className="text-white/70 leading-relaxed">
                  Armazenam suas preferências (como tema, idioma e dados de formulários preenchidos anteriormente)
                  para oferecer uma experiência mais personalizada. <strong className="text-white">Base legal:</strong> consentimento.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Cookies de Terceiros */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">3. Cookies de Terceiros</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Alguns cookies são definidos por serviços de terceiros que aparecem em nossas páginas:
              </p>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Google Analytics</strong> — análise de tráfego e comportamento de navegação (google.com/policies/privacy)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Asaas</strong> — processamento seguro de pagamentos via PIX (asaas.com/politica-de-privacidade)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Vercel</strong> — hospedagem e entrega de conteúdo (vercel.com/legal/privacy-policy)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4. Gerenciamento */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">4. Como Gerenciar seus Cookies</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Você pode controlar e/ou excluir cookies a qualquer momento através das configurações do seu navegador.
                A maioria dos navegadores permite:
              </p>
              <ul className="space-y-2 text-white/70 mb-4">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  Ver quais cookies estão armazenados e excluí-los individualmente
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  Bloquear cookies de terceiros
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  Bloquear cookies de sites específicos
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  Bloquear todos os cookies
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0" />
                  Excluir todos os cookies ao fechar o navegador
                </li>
              </ul>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-amber-400">Atenção:</strong> desativar cookies essenciais pode prejudicar o funcionamento
                da plataforma, incluindo login, geração de documentos e processamento de pagamentos.
              </p>
            </div>
          </div>

          {/* 5. Tempo de Armazenamento */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">5. Tempo de Armazenamento</h2>
            <div className="card border-green-500/20">
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Cookies de sessão:</strong> expiram quando você fecha o navegador</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Cookies persistentes:</strong> permanecem por até 12 meses ou até serem excluídos manualmente</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-ember-500 mt-2 shrink-0" />
                  <span><strong className="text-white">Cookies do Google Analytics:</strong> até 26 meses conforme configuração padrão do GA4</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 6. Alterações */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">6. Alterações nesta Política</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed">
                Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças em nossos
                serviços ou na legislação aplicável. Recomendamos que você revise esta página regularmente.
                A data da última atualização será sempre indicada no topo desta página.
              </p>
            </div>
          </div>

          {/* 7. Contato */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">7. Contato</h2>
            <div className="card border-green-500/20">
              <p className="text-white/70 leading-relaxed mb-4">
                Para dúvidas sobre esta Política de Cookies ou sobre o uso de seus dados pessoais, entre em contato:
              </p>
              <p className="text-white/70 leading-relaxed">
                <strong className="text-white">E-mail:</strong> contato@defesapix.com.br
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
            <Link href="/lgpd" className="text-sm text-ember-400 hover:text-ember-300 underline underline-offset-4">
              LGPD — Seus Direitos
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
