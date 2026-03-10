/**
 * POST /api/asaas/assinatura
 * Cria assinatura mensal no Asaas (Alerta DefesaPix R$19/mês) e retorna QR code PIX.
 * Body: { nome, email, cpf }
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  criarCliente,
  criarAssinatura,
  obterPrimeiraCobrancaAssinatura,
  ASAAS_PRODUTOS,
} from '@/lib/asaas';
import { isValidCPF, isValidEmail } from '@/lib/sanitize';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rl = rateLimit(`asaas-sub:${ip}`, { max: 3, windowSec: 3600 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Muitas tentativas. Aguarde antes de tentar novamente.' }, { status: 429 });
    }

    const { nome, email, cpf } = await req.json() as {
      nome?: string;
      email?: string;
      cpf?: string;
    };

    if (!cpf) {
      return NextResponse.json({ error: 'CPF é obrigatório para pagamento via PIX' }, { status: 400 });
    }

    if (!isValidCPF(cpf)) {
      return NextResponse.json({ error: 'CPF inválido' }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório para a assinatura' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const nomeCliente = (nome || 'Cliente').slice(0, 100).replace(/[<>"']/g, '');

    // 1. Criar cliente no Asaas
    const cliente = await criarCliente(nomeCliente, email, cpf);

    // 2. Criar assinatura mensal
    const assinatura = await criarAssinatura(cliente.id, 'PLANO_MENSAL');

    // 3. Obter QR Code da primeira cobrança
    const { payment, pix } = await obterPrimeiraCobrancaAssinatura(assinatura.id);

    // Salvar payment no banco
    await prisma.payment.create({
      data: {
        gatewayId: payment.id,
        amount: ASAAS_PRODUTOS.PLANO_MENSAL.valor,
        status: 'PENDING',
        produto: 'PLANO_MENSAL',
      },
    }).catch(() => {});

    return NextResponse.json({
      subscriptionId: assinatura.id,
      paymentId:      payment.id,
      pixQrCode:      pix.encodedImage,
      pixCopiaECola:  pix.payload,
      valor:          ASAAS_PRODUTOS.PLANO_MENSAL.valor,
      expiresAt:      pix.expirationDate,
      ciclo:          'MENSAL',
    });
  } catch (error: unknown) {
    console.error('[ASAAS] Erro ao criar assinatura:', error);
    return NextResponse.json({ error: 'Erro ao criar assinatura. Tente novamente.' }, { status: 500 });
  }
}
