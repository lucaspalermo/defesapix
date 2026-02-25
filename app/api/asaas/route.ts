/**
 * POST /api/asaas
 * Cria cobrança PIX no Asaas e retorna QR code + copia-e-cola.
 * Body: { produto, nome, email }
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  criarCliente,
  criarCobrancaPIX,
  obterPixQrCode,
  ASAAS_PRODUTOS,
  type ProdutoAsaas,
} from '@/lib/asaas';

export async function POST(req: NextRequest) {
  try {
    const { produto, nome, email } = await req.json() as {
      produto: ProdutoAsaas;
      nome?: string;
      email?: string;
    };

    if (!produto || !(produto in ASAAS_PRODUTOS)) {
      return NextResponse.json({ error: 'Produto inválido' }, { status: 400 });
    }

    // 1. Criar cliente no Asaas
    const cliente = await criarCliente(
      nome  || 'Cliente',
      email || `cliente-${Date.now()}@defesapix.com.br`,
    );

    // 2. Criar cobrança PIX
    const cobranca = await criarCobrancaPIX(cliente.id, produto);

    // 3. Obter QR code PIX
    const pix = await obterPixQrCode(cobranca.id);

    return NextResponse.json({
      paymentId:     cobranca.id,
      pixQrCode:     pix.encodedImage,   // base64 PNG
      pixCopiaECola: pix.payload,        // copia-e-cola string
      valor:         ASAAS_PRODUTOS[produto].valor,
      expiresAt:     pix.expirationDate,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Erro ao criar pagamento';
    console.error('[ASAAS] Erro ao criar cobrança:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
