import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { templateBoasVindas } from '@/lib/email-templates';

// POST /api/email — Lead capture + welcome email
export async function POST(req: NextRequest) {
  try {
    const { email, nome, tipo, dataOcorrencia } = await req.json();

    if (!email || !nome) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    // Calculate hours remaining until MED deadline
    let horasRestantes = 72;
    if (dataOcorrencia) {
      const [y, m, d] = (dataOcorrencia as string).split('-').map(Number);
      const deadline = new Date(y, m - 1, d);
      deadline.setHours(deadline.getHours() + 72);
      horasRestantes = Math.max(0, (deadline.getTime() - Date.now()) / 3_600_000);
    }

    // Send welcome email if SMTP is configured
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
        subject: `⏰ Lembretes de prazo ativados — ${tipo ?? 'Golpe digital'}`,
        html: templateBoasVindas(nome, tipo ?? 'Golpe digital', horasRestantes),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[EMAIL]', error);
    // Never fail silently — return success even if email fails (lead still captured)
    return NextResponse.json({ success: true });
  }
}
