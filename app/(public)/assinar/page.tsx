import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AssinaturaForm from '@/components/tools/AssinaturaForm';
import { Shield, Bell, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Alerta DefesaPix — Monitoramento de CPF R$19/mês',
  description: 'Monitore seu CPF, receba alertas de golpes novos e dicas de prevenção semanais. Proteja-se antes que o golpe aconteça. R$19/mês.',
  alternates: { canonical: 'https://defesapix.com.br/assinar' },
};

export default function AssinarPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <Bell className="w-4 h-4" />
              Monitoramento contínuo
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Alerta DefesaPix
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Proteja-se <strong className="text-white">antes</strong> que o golpe aconteça. Monitoramento do seu CPF + alertas de novas fraudes + dicas semanais de prevenção.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefits */}
            <div className="space-y-6">
              <div className="card">
                <h2 className="font-bold text-white text-lg mb-4">O que você recebe:</h2>
                <ul className="space-y-3">
                  {[
                    'Monitoramento contínuo do seu CPF',
                    'Alertas imediatos de atividade suspeita',
                    'Relatório semanal de segurança digital',
                    'Dicas de prevenção contra golpes novos',
                    'Prioridade no suporte DefesaPix',
                    'Acesso antecipado a novos recursos',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card border-amber-500/20 bg-amber-500/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white text-sm mb-1">Por que monitorar?</p>
                    <p className="text-xs text-white/60">
                      Em 2024, o Brasil registrou mais de 4.5 milhões de tentativas de fraude. Muitas vítimas só descobrem quando é tarde demais. O monitoramento antecipado pode evitar prejuízos de milhares de reais.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl px-5 py-3">
                <Shield className="w-5 h-5 text-green-400 shrink-0" />
                <div>
                  <p className="font-semibold text-white text-sm">Cancele quando quiser</p>
                  <p className="text-xs text-white/50">Sem fidelidade, sem multa. Cancelamento a qualquer momento.</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <AssinaturaForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
