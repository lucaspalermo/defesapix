import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email, nome, documento, titulo } = await req.json();
    if (!email || !documento) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    if (process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? 'smtp.resend.com',
        port: Number(process.env.SMTP_PORT ?? 465),
        secure: true,
        auth: {
          user: process.env.SMTP_USER ?? 'resend',
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Central de Defesa Digital" <${process.env.EMAIL_FROM ?? 'noreply@defesapix.com.br'}>`,
        to: email,
        subject: `📄 Seu documento: ${titulo} — Central de Defesa Digital`,
        html: templateDocumento(nome ?? 'Cliente', titulo, documento),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[EMAIL_DOCS]', error);
    return NextResponse.json({ success: true });
  }
}

function templateDocumento(nome: string, titulo: string, documento: string): string {
  const docHtml = documento.replace(/\n/g, '<br>').replace(/━+/g, '<hr style="border:none;border-top:1px solid rgba(255,255,255,0.1);margin:12px 0">');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>${titulo}</title></head>
<body style="margin:0;padding:0;background:#09090F;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px">
    <div style="border-bottom:2px solid #F97316;padding-bottom:16px;margin-bottom:28px">
      <p style="margin:0;color:#F97316;font-size:18px;font-weight:bold">CENTRAL DE DEFESA DIGITAL</p>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.4);font-size:12px">defesapix.com.br</p>
    </div>

    <h2 style="color:#fff;font-size:20px;margin:0 0 8px">${nome}, aqui está seu documento</h2>
    <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0 0 24px">${titulo}</p>

    <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin:0 0 24px">
      <p style="color:rgba(255,255,255,0.6);font-size:12px;font-family:monospace;line-height:1.7;white-space:pre-wrap;word-wrap:break-word">${docHtml}</p>
    </div>

    <div style="background:#1a1a2e;border:1px solid rgba(249,115,22,0.3);border-radius:12px;padding:16px;margin:0 0 24px">
      <p style="color:#F97316;margin:0 0 8px;font-weight:bold;font-size:14px">⚠️ Próximos passos</p>
      <ol style="color:rgba(255,255,255,0.7);padding-left:20px;margin:0;font-size:13px;line-height:1.9">
        <li>Registre o B.O. na Delegacia Eletrônica do seu estado</li>
        <li>Ligue para o SAC do banco e peça a contestação</li>
        <li>Registre reclamação no Banco Central (bcb.gov.br/meubc)</li>
      </ol>
    </div>

    <a href="https://defesapix.com.br/ferramentas"
       style="display:inline-block;background:#F97316;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px">
      Ver guia completo →
    </a>

    <p style="color:rgba(255,255,255,0.25);font-size:11px;margin-top:36px;border-top:1px solid rgba(255,255,255,0.06);padding-top:16px">
      Central de Defesa Digital · defesapix.com.br<br>
      Guarde este e-mail — ele contém seu documento completo.
    </p>
  </div>
</body>
</html>`;
}
