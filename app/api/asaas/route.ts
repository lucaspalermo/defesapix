/**
 * POST /api/asaas
 * Cria cobrança PIX no Asaas e retorna QR code + copia-e-cola.
 * Body: { produto, nome, email, cpf }
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  criarCliente,
  criarCobrancaPIX,
  obterPixQrCode,
  ASAAS_PRODUTOS,
  type ProdutoAsaas,
} from '@/lib/asaas';
import { isValidCPF, isValidEmail } from '@/lib/sanitize';
import { rateLimit, getClientIp } from '@/lib/rate-limit';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 pagamentos por IP por hora
    const ip = getClientIp(req);
    const rl = rateLimit(`asaas-post:${ip}`, { max: 5, windowSec: 3600 });
    if (!rl.allowed) {
      return NextResponse.json({ error: 'Muitas tentativas. Aguarde antes de tentar novamente.' }, { status: 429 });
    }

    const { produto, nome, email, cpf } = await req.json() as {
      produto: ProdutoAsaas;
      nome?: string;
      email?: string;
      cpf?: string;
    };

    if (!produto || !(produto in ASAAS_PRODUTOS)) {
      return NextResponse.json({ error: 'Produto inválido' }, { status: 400 });
    }

    if (!cpf) {
      return NextResponse.json({ error: 'CPF é obrigatório para pagamento via PIX' }, { status: 400 });
    }

    // Validar CPF
    if (!isValidCPF(cpf)) {
      return NextResponse.json({ error: 'CPF inválido' }, { status: 400 });
    }

    // Validar email se fornecido
    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    // Sanitizar nome
    const nomeCliente = (nome || 'Cliente').slice(0, 100).replace(/[<>"']/g, '');
    const emailCliente = email || `cliente-${Date.now()}@defesapix.com.br`;

    // 1. Criar cliente no Asaas
    const cliente = await criarCliente(nomeCliente, emailCliente, cpf);

    // 2. Criar cobrança PIX (preço definido server-side pelo produto)
    const cobranca = await criarCobrancaPIX(cliente.id, produto);

    // 3. Obter QR code PIX
    const pix = await obterPixQrCode(cobranca.id);

    // Salvar payment no banco com status PENDING para o webhook poder linkar depois
    await prisma.payment.create({
      data: {
        gatewayId: cobranca.id,
        amount: ASAAS_PRODUTOS[produto].valor,
        status: 'PENDING',
        produto: produto as any,
      },
    }).catch(() => {}); // se já existir, ignora

    return NextResponse.json({
      paymentId:     cobranca.id,
      pixQrCode:     pix.encodedImage,
      pixCopiaECola: pix.payload,
      valor:         ASAAS_PRODUTOS[produto].valor,
      expiresAt:     pix.expirationDate,
    });
  } catch (error: unknown) {
    console.error('[ASAAS] Erro ao criar cobrança');
    return NextResponse.json({ error: 'Erro ao criar pagamento. Tente novamente.' }, { status: 500 });
  }
}
