/**
 * POST /api/asaas/webhook
 * Recebe notificações do Asaas sobre mudanças de status de pagamento.
 *
 * Configurar no painel Asaas:
 *   URL: https://defesapix.com.br/api/asaas/webhook
 *   Eventos: PAYMENT_RECEIVED, PAYMENT_CONFIRMED
 *   Token: valor definido em ASAAS_WEBHOOK_TOKEN
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

const ADMIN_EMAIL = 'l.simports@hotmail.com';

async function notificarVenda(valor: number, produto: string, paymentId: string) {
  if (!process.env.SMTP_PASS) return; // skip if SMTP not configured

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.resend.com',
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER ?? 'resend',
        pass: process.env.SMTP_PASS,
      },
    });

    const valorFmt = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    await transporter.sendMail({
      from: `"DefesaPix" <${process.env.EMAIL_FROM ?? 'noreply@defesapix.com.br'}>`,
      to: ADMIN_EMAIL,
      subject: `💰 Nova venda! ${valorFmt} — ${produto}`,
      html: `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><title>Nova Venda</title></head>
<body style="margin:0;padding:0;background:#09090F;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:500px;margin:0 auto;padding:32px 24px">
    <div style="border-bottom:2px solid #10B981;padding-bottom:16px;margin-bottom:24px">
      <p style="margin:0;color:#10B981;font-size:18px;font-weight:bold">NOVA VENDA REALIZADA</p>
      <p style="margin:4px 0 0;color:rgba(255,255,255,0.4);font-size:12px">DefesaPix — Painel Admin</p>
    </div>

    <div style="background:rgba(16,185,129,0.1);border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:20px;margin-bottom:20px;text-align:center">
      <p style="color:rgba(255,255,255,0.5);margin:0 0 8px;font-size:13px">Valor recebido</p>
      <p style="color:#10B981;margin:0;font-size:32px;font-weight:bold">${valorFmt}</p>
    </div>

    <table style="width:100%;border-collapse:collapse">
      <tr>
        <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.06)">Produto</td>
        <td style="padding:10px 0;color:#fff;font-size:13px;font-weight:bold;text-align:right;border-bottom:1px solid rgba(255,255,255,0.06)">${produto}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.06)">ID Pagamento</td>
        <td style="padding:10px 0;color:#fff;font-size:13px;text-align:right;border-bottom:1px solid rgba(255,255,255,0.06)">${paymentId}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:13px">Data/Hora</td>
        <td style="padding:10px 0;color:#fff;font-size:13px;text-align:right">${data}</td>
      </tr>
    </table>

    <div style="margin-top:24px;text-align:center">
      <a href="https://defesapix.com.br/admin" style="display:inline-block;background:#F97316;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:14px">
        Ver no Painel Admin
      </a>
    </div>

    <p style="color:rgba(255,255,255,0.2);font-size:11px;text-align:center;margin-top:24px">
      Email automático do sistema DefesaPix
    </p>
  </div>
</body>
</html>`,
    });

    console.log(`[WEBHOOK] Email de venda enviado para ${ADMIN_EMAIL}`);
  } catch (emailErr) {
    console.error('[WEBHOOK] Falha ao enviar email de venda:', emailErr);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('asaas-access-token');
    const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;

    if (expectedToken && authHeader !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { event, payment } = body as {
      event: string;
      payment: { id: string; status: string; value: number; externalReference?: string };
    };

    console.log('[ASAAS WEBHOOK]', event, payment?.id, payment?.status);

    if (event === 'PAYMENT_RECEIVED' || event === 'PAYMENT_CONFIRMED') {
      // Extract produto from externalReference (format: cdd-PRODUTO-timestamp)
      let produto = 'PACOTE_EMERGENCIA';
      if (payment.externalReference) {
        const parts = payment.externalReference.split('-');
        if (parts.length >= 2) {
          produto = parts.slice(1, -1).join('_');
        }
      }

      const validProdutos = ['BO_INDIVIDUAL', 'MED', 'NOTIFICACAO_BANCO', 'PACOTE_EMERGENCIA', 'REVISAO_ESPECIALISTA', 'PLANO_MENSAL'];
      if (!validProdutos.includes(produto)) {
        produto = 'PACOTE_EMERGENCIA';
      }

      try {
        await prisma.payment.upsert({
          where: { gatewayId: payment.id },
          create: {
            gatewayId: payment.id,
            amount: payment.value,
            status: 'PAID',
            produto: produto as any,
          },
          update: { status: 'PAID' },
        });
        console.log(`[ASAAS WEBHOOK] Payment saved: R$${payment.value} — ID: ${payment.id}`);

        // Track analytics event
        await prisma.evento.create({
          data: {
            tipo: 'venda_confirmada',
            dados: JSON.stringify({ valor: payment.value, produto, paymentId: payment.id }),
          },
        }).catch(() => {});

        // Notify admin by email
        await notificarVenda(payment.value, produto, payment.id);
      } catch (dbError) {
        console.error('[ASAAS WEBHOOK] DB error:', dbError);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[ASAAS WEBHOOK] Error:', error);
    return NextResponse.json({ received: true });
  }
}
