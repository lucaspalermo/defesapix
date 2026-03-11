/**
 * POST /api/email/pos-venda
 * Envia sequência de emails pós-compra.
 * Chamado internamente pelo webhook após confirmação de pagamento.
 *
 * Body: { email, nome, tipo, produto, paymentId }
 * tipo: "imediato" | "24h" | "72h" | "indicacao" | "review"
 */

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import {
  templateDocumentosEntregues,
  templateFollowUp24h,
  templateFollowUp72h,
  templateIndicacao,
  templatePedidoReview,
} from '@/lib/email-templates';

function getTransporter() {
  if (!process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.resend.com',
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER ?? 'resend',
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    // Validar token interno (mesma chave do webhook)
    const authToken = req.headers.get('x-internal-token');
    if (authToken !== process.env.ASAAS_WEBHOOK_TOKEN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, nome, tipo, produto, paymentId } = await req.json();
    if (!email || !nome || !tipo) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    const transporter = getTransporter();
    if (!transporter) {
      return NextResponse.json({ error: 'SMTP não configurado' }, { status: 503 });
    }

    const from = `"DefesaPix" <${process.env.EMAIL_FROM ?? 'noreply@defesapix.com.br'}>`;
    const nomeSafe = nome.slice(0, 100);

    switch (tipo) {
      case 'imediato':
        await transporter.sendMail({
          from, to: email,
          subject: `Seus documentos estão prontos, ${nomeSafe}!`,
          html: templateDocumentosEntregues(nomeSafe),
        });
        break;

      case '24h':
        await transporter.sendMail({
          from, to: email,
          subject: `${nomeSafe}, você já usou seus documentos?`,
          html: templateFollowUp24h(nomeSafe, produto || 'Golpe digital'),
        });
        break;

      case '72h':
        await transporter.sendMail({
          from, to: email,
          subject: `${nomeSafe}, hora de intensificar a pressão`,
          html: templateFollowUp72h(nomeSafe, produto || 'Golpe digital'),
        });
        break;

      case 'indicacao':
        // Gerar código de referência simples baseado no paymentId
        const codigoRef = (paymentId || '').slice(-8) || Math.random().toString(36).slice(2, 10);
        await transporter.sendMail({
          from, to: email,
          subject: `${nomeSafe}, ajude quem precisa — compartilhe a DefesaPix`,
          html: templateIndicacao(nomeSafe, codigoRef),
        });
        break;

      case 'review':
        await transporter.sendMail({
          from, to: email,
          subject: `${nomeSafe}, como foi sua experiência com a DefesaPix?`,
          html: templatePedidoReview(nomeSafe),
        });
        break;

      default:
        return NextResponse.json({ error: 'Tipo de email inválido' }, { status: 400 });
    }

    return NextResponse.json({ success: true, tipo });
  } catch (error) {
    console.error('[EMAIL POS-VENDA] Erro:', error);
    return NextResponse.json({ error: 'Erro ao enviar email' }, { status: 500 });
  }
}
