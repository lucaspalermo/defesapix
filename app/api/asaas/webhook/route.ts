/**
 * POST /api/asaas/webhook
 * Recebe notificações do Asaas sobre mudanças de status de pagamento.
 *
 * Configurar no painel Asaas:
 *   URL: https://defesapix.com.br/api/asaas/webhook
 *   Eventos: PAYMENT_RECEIVED, PAYMENT_CONFIRMED, PAYMENT_OVERDUE
 *   Token: valor definido em ASAAS_WEBHOOK_TOKEN (mesmo token configurado no painel Asaas)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ASAAS_PRODUTOS, verificarPagamento } from '@/lib/asaas';
import nodemailer from 'nodemailer';

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL ?? 'admin@defesapix.com.br';
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://defesapix.com.br';

/**
 * Dispara sequência de emails pós-venda:
 * - Imediato: "Seus documentos estão prontos"
 * - 24h: "Já usou seus documentos?"
 * - 72h: "Hora de intensificar a pressão"
 * - 5 dias: "Indique um amigo"
 * - 7 dias: "Como foi sua experiência?" (review)
 */
async function dispararEmailsPosVenda(paymentId: string, produto: string) {
  try {
    // Buscar dados do pagamento no Asaas para obter customer email
    const paymentData = await verificarPagamento(paymentId) as any;
    if (!paymentData?.customer) return;

    // Buscar customer data
    const API_KEY = process.env.ASAAS_API_KEY;
    const baseUrl = process.env.ASAAS_ENV === 'sandbox'
      ? 'https://sandbox.asaas.com/api/v3'
      : 'https://api.asaas.com/v3';

    const customerRes = await fetch(`${baseUrl}/customers/${paymentData.customer}`, {
      headers: { access_token: API_KEY!, 'Content-Type': 'application/json' },
    });
    const customer = await customerRes.json();
    if (!customer?.email) return;

    const emailPayload = {
      email: customer.email,
      nome: customer.name || 'Cliente',
      produto,
      paymentId,
    };

    const headers = {
      'Content-Type': 'application/json',
      'x-internal-token': process.env.ASAAS_WEBHOOK_TOKEN!,
    };

    // Email imediato: documentos entregues
    await fetch(`${BASE_URL}/api/email/pos-venda`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...emailPayload, tipo: 'imediato' }),
    }).catch(() => {});

    // Agendar emails futuros via eventos no banco (cron-like)
    const agendamentos = [
      { tipo: 'followup_24h', delay: '24h', emailTipo: '24h' },
      { tipo: 'followup_72h', delay: '72h', emailTipo: '72h' },
      { tipo: 'indicacao', delay: '5d', emailTipo: 'indicacao' },
      { tipo: 'review', delay: '7d', emailTipo: 'review' },
    ];

    for (const ag of agendamentos) {
      await prisma.evento.create({
        data: {
          tipo: `email_agendado_${ag.tipo}`,
          dados: JSON.stringify({
            ...emailPayload,
            emailTipo: ag.emailTipo,
            delay: ag.delay,
            enviarEm: getEnviarEm(ag.delay),
            enviado: false,
          }),
        },
      }).catch(() => {});
    }
  } catch (err) {
    console.error('[WEBHOOK] Erro ao disparar emails pós-venda:', err);
  }
}

function getEnviarEm(delay: string): string {
  const now = new Date();
  if (delay === '24h') now.setHours(now.getHours() + 24);
  else if (delay === '72h') now.setHours(now.getHours() + 72);
  else if (delay === '5d') now.setDate(now.getDate() + 5);
  else if (delay === '7d') now.setDate(now.getDate() + 7);
  return now.toISOString();
}

async function notificarVenda(valor: number, produto: string, paymentId: string) {
  if (!process.env.SMTP_PASS) return;

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
      subject: `Nova venda! ${valorFmt} — ${produto}`,
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

    <p style="color:rgba(255,255,255,0.2);font-size:11px;text-align:center;margin-top:24px">
      Email automático do sistema DefesaPix
    </p>
  </div>
</body>
</html>`,
    });
  } catch (emailErr) {
    console.error('[WEBHOOK] Falha ao enviar email de venda');
  }
}

export async function POST(req: NextRequest) {
  try {
    // Validação OBRIGATÓRIA do token de webhook
    const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN;
    if (!expectedToken) {
      console.error('[WEBHOOK] ASAAS_WEBHOOK_TOKEN não configurado');
      return NextResponse.json({ error: 'Webhook não configurado' }, { status: 500 });
    }

    const authHeader = req.headers.get('asaas-access-token');
    if (authHeader !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { event, payment } = body as {
      event: string;
      payment: { id: string; status: string; value: number; externalReference?: string };
    };

    if (!event || !payment?.id) {
      return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
    }

    if (event === 'PAYMENT_RECEIVED' || event === 'PAYMENT_CONFIRMED') {
      // Extract produto from externalReference (format: cdd-PRODUTO-timestamp)
      let produto = 'PACOTE_EMERGENCIA';
      if (payment.externalReference) {
        const parts = payment.externalReference.split('-');
        if (parts.length >= 2) {
          produto = parts.slice(1, -1).join('_');
        }
      }

      const validProdutos = ['BO_INDIVIDUAL', 'MED', 'NOTIFICACAO_BANCO', 'PACOTE_EMERGENCIA', 'KIT_PREMIUM', 'REVISAO_ESPECIALISTA', 'PLANO_MENSAL'];
      if (!validProdutos.includes(produto)) {
        produto = 'PACOTE_EMERGENCIA';
      }

      // Verificar se o valor é compatível com o produto
      const produtoInfo = ASAAS_PRODUTOS[produto as keyof typeof ASAAS_PRODUTOS];
      if (produtoInfo && Math.abs(payment.value - produtoInfo.valor) > 1) {
        console.error(`[WEBHOOK] Valor incompatível: esperado R$${produtoInfo.valor}, recebido R$${payment.value}`);
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
          update: { status: 'PAID', amount: payment.value },
        });

        // Track analytics event
        await prisma.evento.create({
          data: {
            tipo: 'venda_confirmada',
            dados: JSON.stringify({ valor: payment.value, produto, paymentId: payment.id }),
          },
        }).catch(() => {});

        // Notify admin by email
        await notificarVenda(payment.value, produto, payment.id);

        // Disparar sequência de emails pós-venda para o cliente
        // Buscar email do cliente via Asaas payment customer
        if (produto !== 'PLANO_MENSAL') {
          dispararEmailsPosVenda(payment.id, produto).catch(() => {});
        }
      } catch (dbError) {
        console.error('[WEBHOOK] Erro no banco de dados');
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[WEBHOOK] Erro ao processar webhook');
    return NextResponse.json({ received: true });
  }
}
