// Central de Defesa Digital — Email templates (HTML)

export function templateBoasVindas(nome: string, tipo: string, horasRestantes: number): string {
  const critico = horasRestantes < 24 && horasRestantes > 0;
  const expirado = horasRestantes <= 0;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Central de Defesa Digital</title></head>
<body style="margin:0;padding:0;background:#09090F;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px">

    <div style="border-bottom:2px solid #F97316;padding-bottom:16px;margin-bottom:28px">
      <p style="margin:0;color:#F97316;font-size:18px;font-weight:bold;letter-spacing:0.5px">
        CENTRAL DE DEFESA DIGITAL
      </p>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.4);font-size:12px">
        defesapix.com.br
      </p>
    </div>

    <h2 style="color:#fff;font-size:22px;margin:0 0 12px">Olá, ${nome}!</h2>
    <p style="color:rgba(255,255,255,0.7);margin:0 0 20px">
      Recebemos o registro do seu caso de <strong style="color:#fff">${tipo}</strong>.
      Vamos te ajudar a recuperar seu dinheiro com as ferramentas certas.
    </p>

    ${critico ? `
    <div style="background:#450a0a;border:1px solid #ef4444;border-radius:12px;padding:16px;margin:0 0 20px">
      <p style="color:#fca5a5;margin:0;font-weight:bold;font-size:14px">
        ⚠️ ATENÇÃO: Menos de 24h para o prazo do MED expirar!
      </p>
      <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:13px">
        Acesse o app do seu banco agora e solicite o Mecanismo Especial de Devolução.
      </p>
    </div>
    ` : ''}

    ${expirado ? `
    <div style="background:#1c1400;border:1px solid #d97706;border-radius:12px;padding:16px;margin:0 0 20px">
      <p style="color:#fcd34d;margin:0;font-weight:bold;font-size:14px">
        ℹ️ Prazo MED expirado — outros caminhos disponíveis
      </p>
      <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:13px">
        Ainda é possível registrar BO, enviar notificação bancária formal e reclamar no BACEN.
      </p>
    </div>
    ` : ''}

    <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:20px;margin:0 0 24px">
      <p style="color:#10B981;margin:0 0 12px;font-weight:bold;font-size:14px">Próximos passos:</p>
      <ol style="color:rgba(255,255,255,0.7);padding-left:20px;margin:0;font-size:13px;line-height:1.8">
        <li>Registre o Boletim de Ocorrência (BO) na delegacia eletrônica</li>
        <li>Envie a contestação MED ao banco (pelo app ou presencialmente)</li>
        <li>Protocole a notificação formal ao banco por e-mail ou SAC</li>
        <li>Registre reclamação no BACEN: <a href="https://www.bcb.gov.br/meubc" style="color:#10B981">bcb.gov.br/meubc</a></li>
      </ol>
    </div>

    <a href="https://defesapix.com.br/ferramentas"
       style="display:inline-block;background:#F97316;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px">
      Acessar meus documentos →
    </a>

    <p style="color:rgba(255,255,255,0.3);font-size:11px;margin-top:36px;border-top:1px solid rgba(255,255,255,0.08);padding-top:16px">
      Central de Defesa Digital · defesapix.com.br<br>
      Você recebeu este e-mail porque ativou lembretes de prazo.
    </p>
  </div>
</body>
</html>`;
}

export function templateLembrete24h(nome: string, tipo: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Lembrete — Central de Defesa Digital</title></head>
<body style="margin:0;padding:0;background:#09090F;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px">

    <div style="border-bottom:2px solid #F97316;padding-bottom:16px;margin-bottom:28px">
      <p style="margin:0;color:#F97316;font-size:18px;font-weight:bold">CENTRAL DE DEFESA DIGITAL</p>
    </div>

    <div style="background:#450a0a;border:1px solid #ef4444;border-radius:12px;padding:20px;margin:0 0 24px">
      <h2 style="color:#fca5a5;margin:0 0 8px;font-size:18px">⏰ Prazo do MED expira em 24h!</h2>
      <p style="color:rgba(255,255,255,0.7);margin:0;font-size:13px">
        ${nome}, você já acionou o MED pelo app do seu banco para o caso de <strong style="color:#fff">${tipo}</strong>?
      </p>
    </div>

    <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0 0 20px">
      Se ainda não acionou, este é o momento mais importante. O Mecanismo Especial de Devolução
      expira em menos de 24 horas — após isso, a recuperação fica muito mais difícil.
    </p>

    <a href="https://defesapix.com.br/ferramentas/gerador-contestacao-med"
       style="display:inline-block;background:#F97316;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px;margin-bottom:24px">
      Acessar documento MED →
    </a>

    <p style="color:rgba(255,255,255,0.3);font-size:11px;margin-top:24px;border-top:1px solid rgba(255,255,255,0.08);padding-top:16px">
      Central de Defesa Digital · defesapix.com.br
    </p>
  </div>
</body>
</html>`;
}

export function templateLembrete48h(nome: string, tipo: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Lembrete — Central de Defesa Digital</title></head>
<body style="margin:0;padding:0;background:#09090F;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px">

    <div style="border-bottom:2px solid #F97316;padding-bottom:16px;margin-bottom:28px">
      <p style="margin:0;color:#F97316;font-size:18px;font-weight:bold">CENTRAL DE DEFESA DIGITAL</p>
    </div>

    <h2 style="color:#fff;font-size:20px;margin:0 0 12px">Ainda dá tempo, ${nome}!</h2>
    <p style="color:rgba(255,255,255,0.7);font-size:14px;margin:0 0 20px">
      Faltam aproximadamente <strong style="color:#fff">48 horas</strong> para o prazo do MED
      expirar no seu caso de <strong style="color:#fff">${tipo}</strong>.
    </p>

    <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:20px;margin:0 0 24px">
      <p style="color:#10B981;margin:0 0 12px;font-weight:bold;font-size:14px">O que fazer agora:</p>
      <ul style="color:rgba(255,255,255,0.7);padding-left:20px;margin:0;font-size:13px;line-height:1.9">
        <li>Acione o MED pelo app do seu banco</li>
        <li>Ligue para o SAC e solicite o bloqueio cautelar</li>
        <li>Envie o documento de contestação por e-mail à ouvidoria do banco</li>
      </ul>
    </div>

    <a href="https://defesapix.com.br/ferramentas/gerador-contestacao-med"
       style="display:inline-block;background:#F97316;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px">
      Ver documento MED →
    </a>

    <p style="color:rgba(255,255,255,0.3);font-size:11px;margin-top:32px;border-top:1px solid rgba(255,255,255,0.08);padding-top:16px">
      Central de Defesa Digital · defesapix.com.br
    </p>
  </div>
</body>
</html>`;
}
