/**
 * GET /api/cron/emails
 * Processa emails agendados (pós-venda: 24h, 72h, indicação, review).
 * Configurar no Vercel Cron (vercel.json) para rodar a cada hora.
 *
 * Proteção: CRON_SECRET ou ASAAS_WEBHOOK_TOKEN
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://defesapix.com.br';

export async function GET(req: NextRequest) {
  // Validar token (Vercel Cron envia Authorization header)
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET || process.env.ASAAS_WEBHOOK_TOKEN;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = new Date().toISOString();

    // Buscar emails agendados que já passaram do horário
    const eventos = await prisma.evento.findMany({
      where: {
        tipo: { startsWith: 'email_agendado_' },
        createdAt: { gte: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) }, // últimos 8 dias
      },
      orderBy: { createdAt: 'asc' },
      take: 50,
    });

    let enviados = 0;
    let ignorados = 0;

    for (const evento of eventos) {
      try {
        const dados = JSON.parse(evento.dados || '{}');
        if (dados.enviado) { ignorados++; continue; }
        if (!dados.enviarEm || dados.enviarEm > now) { ignorados++; continue; }

        // Enviar email
        const res = await fetch(`${BASE_URL}/api/email/pos-venda`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-internal-token': process.env.ASAAS_WEBHOOK_TOKEN!,
          },
          body: JSON.stringify({
            email: dados.email,
            nome: dados.nome,
            tipo: dados.emailTipo,
            produto: dados.produto,
            paymentId: dados.paymentId,
          }),
        });

        if (res.ok) {
          // Marcar como enviado
          dados.enviado = true;
          dados.enviadoEm = now;
          await prisma.evento.update({
            where: { id: evento.id },
            data: { dados: JSON.stringify(dados) },
          });
          enviados++;
        }
      } catch {
        // Ignora erros individuais
      }
    }

    return NextResponse.json({ success: true, enviados, ignorados, total: eventos.length });
  } catch (error) {
    console.error('[CRON] Erro ao processar emails:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
