import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, FileText, CheckCircle, Shield } from 'lucide-react';
import FAQSection from '@/components/home/FAQSection';
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema';
import HowToSchema from '@/components/seo/HowToSchema';

export const metadata: Metadata = {
  title: 'Boleto Falso: O Que Fazer? Guia Completo | Central de Defesa Digital',
  description: 'Pagou um boleto falso ou adulterado? Saiba como contestar o pagamento, notificar o banco e recuperar o valor. Passo a passo detalhado.',
  alternates: { canonical: 'https://defesapix.com.br/golpes/golpe-boleto' },
};

const faqItems = [
  { question: 'Como identificar um boleto falso antes de pagar?', answer: 'Confira: (1) O CNPJ/CPF do beneficiário bate com a empresa/pessoa que você quer pagar? (2) O valor e a data de vencimento estão corretos? (3) O nome do beneficiário no banco bate com o esperado? Use o aplicativo do banco para confirmar o beneficiário antes de pagar.' },
  { question: 'Paguei boleto errado. O banco é obrigado a devolver?', answer: 'Depende. Se o boleto foi gerado/adulterado na plataforma do próprio banco, sim. Se o boleto era de outra empresa e você pagou o valor errado, o processo é de contestação junto ao banco destinatário. O CDC Art. 42 proíbe cobrança abusiva mas a devolução voluntária por pagamento incorreto é regulada pelo BACEN.' },
  { question: 'Qual é o prazo para contestar um boleto falso?', answer: 'Não há prazo legal fixo, mas quanto mais rápido melhor. Boletos com compensação recente (em até 48h úteis) têm mais chance de cancelamento. Para fraude documentada, você tem até 5 anos para ação judicial (CDC).' },
];

export default function GolpeBoletoPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Tipos de Golpe', href: '/golpes' }, { name: 'Golpe Boleto' }]} />
      <HowToSchema
        name="Boleto Falso: O que fazer para contestar e recuperar o valor"
        description="Passo a passo para contestar pagamento de boleto falso ou adulterado junto ao banco e órgãos competentes."
        totalTime="PT48H"
        steps={[
          { name: 'Ligue para o banco imediatamente', text: 'Relate o pagamento de boleto falso e solicite cancelamento ou contestação. Anote o protocolo.' },
          { name: 'Registre o Boletim de Ocorrência', text: 'Documente a fraude com o número do boleto, valor e dados do beneficiário fraudulento.', url: '/ferramentas/gerador-bo' },
          { name: 'Notifique o banco formalmente', text: 'Gere a notificação extrajudicial ao seu banco citando o CDC e pedindo devolução formal.', url: '/ferramentas/notificacao-banco' },
          { name: 'Registre no Banco Central', text: 'Reclamação formal no BACEN sobre falha do sistema bancário que permitiu o boleto adulterado.' },
        ]}
      />
      <section className="bg-hero-gradient py-16 bg-grid-pattern">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/golpes" className="hover:text-white">Golpes</Link><span>/</span>
            <span className="text-white">Boleto Falso</span>
          </div>
          <h1 className="font-heading font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-white mb-4">
            Boleto Falso:<br />
            <span className="gradient-text">O Que Fazer Agora</span>
          </h1>
          <p className="text-xl text-white/70 mb-8">
            Pagou um boleto falso ou com código adulterado? Saiba como contestar
            e quais são as chances de recuperar o valor.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/ferramentas/notificacao-banco" className="btn-primary"><FileText className="w-5 h-5" />Notificar banco</Link>
            <Link href="/ferramentas/gerador-bo" className="btn-secondary"><CheckCircle className="w-5 h-5" />Gerar BO</Link>
          </div>
        </div>
      </section>

      <article className="section">
        <div className="container max-w-4xl space-y-10">
          <section>
            <h2 className="font-heading font-bold text-2xl text-white mb-6">Passo a passo: O que fazer</h2>
            <div className="space-y-3">
              {[
                { step: 1, titulo: 'Ligue para o banco imediatamente', desc: 'Relate o pagamento de boleto falso e solicite cancelamento ou contestação. Anote o protocolo.', urgencia: 'IMEDIATO' },
                { step: 2, titulo: 'Registre o Boletim de Ocorrência', desc: 'Documente a fraude com o número do boleto, valor e dados do beneficiário fraudulento.', urgencia: '2H' },
                { step: 3, titulo: 'Notifique o banco formalmente', desc: 'Gere a notificação extrajudicial ao seu banco citando o CDC e pedindo devolução formal.', urgencia: '24H' },
                { step: 4, titulo: 'Registre no Banco Central', desc: 'Reclamação formal no BACEN sobre falha do sistema bancário que permitiu o boleto adulterado.', urgencia: '48H' },
              ].map((item) => {
                const isUrgent = item.urgencia === 'IMEDIATO';
                return (
                <div key={item.step} className={`border rounded-xl p-4 transition-all duration-200 ${isUrgent ? 'border-red-500/25 bg-red-500/[0.04] hover:border-red-500/45' : 'border-ember-500/20 bg-ember-500/[0.03] hover:border-ember-500/40'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0 ${isUrgent ? 'bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_14px_rgba(239,68,68,0.35)]' : 'bg-gradient-to-br from-ember-500 to-ember-700 shadow-[0_0_14px_rgba(249,115,22,0.3)]'}`}>{item.step}</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold text-white text-sm">{item.titulo}</h3>
                        <span className="badge-yellow text-xs">{item.urgencia}</span>
                      </div>
                      <p className="text-sm text-white/60">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </section>

          <div className="card border-green-500/30 bg-green-500/5 text-center">
            <h3 className="font-heading font-bold text-white text-xl mb-3">Gere a notificação formal ao banco</h3>
            <p className="text-white/70 mb-6">Documento baseado no CDC que gera protocolo e responsabilidade legal.</p>
            <Link href="/ferramentas/notificacao-banco" className="btn-primary">
              <Shield className="w-4 h-4" />
              Gerar notificação
            </Link>
          </div>
        </div>
      </article>

      <FAQSection items={faqItems} />
    </>
  );
}
