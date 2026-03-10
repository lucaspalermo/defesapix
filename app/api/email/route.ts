import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { templateBoasVindas } from '@/lib/email-templates';
import { isValidEmail } from '@/lib/sanitize';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// POST /api/email — Lead capture + welcome email
export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 emails por IP por hora
    const ip = getClientIp(req);
    const rl = rateLimit(`email:${ip}`, { max: 5, windowSec: 3600 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Muitas requisições' }, { status: 429 });
    }

    const { email, nome, tipo, dataOcorrencia } = await req.json();

    if (!email || !nome) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    // Calculate hours remaining until MED deadline
    let horasRestantes = 72;
    if (dataOcorrencia && typeof dataOcorrencia === 'string') {
      const parts = dataOcorrencia.split('-').map(Number);
      if (parts.length === 3 && parts.every(n => !isNaN(n))) {
        const [y, m, d] = parts;
        const deadline = new Date(y, m - 1, d);
        if (!isNaN(deadline.getTime())) {
          deadline.setHours(deadline.getHours() + 72);
          horasRestantes = Math.max(0, (deadline.getTime() - Date.now()) / 3_600_000);
        }
      }
    }

    // Sanitizar inputs para o template
    const nomeSafe = (nome as string).slice(0, 100);
    const tipoSafe = ((tipo as string) ?? 'Golpe digital').slice(0, 100);

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
        from: `"DefesaPix" <${process.env.EMAIL_FROM ?? 'noreply@defesapix.com.br'}>`,
        to: email,
        subject: `Lembretes de prazo ativados — ${tipoSafe}`,
        html: templateBoasVindas(nomeSafe, tipoSafe, horasRestantes),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[EMAIL] Erro ao enviar email');
    return NextResponse.json({ error: 'Erro ao enviar email' }, { status: 500 });
  }
}
