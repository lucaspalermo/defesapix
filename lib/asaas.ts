/**
 * Cliente da API Asaas — Pagamentos via PIX
 * Documentação: https://docs.asaas.com
 */

const BASE_URL =
  process.env.ASAAS_ENV === 'sandbox'
    ? 'https://sandbox.asaas.com/api/v3'
    : 'https://api.asaas.com/v3';

const API_KEY = process.env.ASAAS_API_KEY!;

async function asaasRequest<T = unknown>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' = 'GET',
  body?: object,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      access_token: API_KEY,
      'Content-Type': 'application/json',
      'User-Agent': 'CentralDefesaDigital/1.0',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  const data = await res.json();

  if (!res.ok) {
    const msg = data?.errors?.[0]?.description ?? data?.message ?? 'Erro Asaas';
    throw new Error(msg);
  }

  return data as T;
}

// ─── Produtos e preços ─────────────────────────────────────────────────────────

export const ASAAS_PRODUTOS = {
  BO_INDIVIDUAL:     { valor: 19, descricao: 'Boletim de Ocorrência — DefesaPix' },
  MED:               { valor: 29, descricao: 'Contestação MED — DefesaPix' },
  NOTIFICACAO_BANCO: { valor: 29, descricao: 'Notificação Bancária — DefesaPix' },
  PACOTE_EMERGENCIA: { valor: 47, descricao: 'Pacote Emergência (3 PDFs) — DefesaPix' },
} as const;

export type ProdutoAsaas = keyof typeof ASAAS_PRODUTOS;

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface AsaasCustomer {
  id: string;
  name: string;
  email: string;
}

export interface AsaasPayment {
  id: string;
  status: string;
  value: number;
  invoiceUrl: string;
  externalReference?: string;
}

export interface AsaasPixQrCode {
  encodedImage: string;   // base64 PNG
  payload: string;        // copia-e-cola
  expirationDate: string;
}

// ─── Funções ──────────────────────────────────────────────────────────────────

/**
 * Cria ou encontra cliente no Asaas.
 * CPF é obrigatório em produção para cobranças PIX.
 */
export async function criarCliente(nome: string, email: string, cpf?: string): Promise<AsaasCustomer> {
  return asaasRequest<AsaasCustomer>('/customers', 'POST', {
    name:     nome || 'Cliente',
    email:    email || `cliente-${Date.now()}@defesapix.com.br`,
    cpfCnpj:  cpf || undefined,
  });
}

/**
 * Cria cobrança PIX.
 * Vencimento: amanhã (PIX tem vencimento obrigatório, mas pode ser pago antes).
 */
export async function criarCobrancaPIX(
  customerId: string,
  produto: ProdutoAsaas,
): Promise<AsaasPayment> {
  const { valor, descricao } = ASAAS_PRODUTOS[produto];

  const vencimento = new Date();
  vencimento.setDate(vencimento.getDate() + 1);
  const dueDate = vencimento.toISOString().split('T')[0];

  return asaasRequest<AsaasPayment>('/payments', 'POST', {
    customer:          customerId,
    billingType:       'PIX',
    value:             valor,
    dueDate,
    description:       descricao,
    externalReference: `cdd-${produto}-${Date.now()}`,
  });
}

/**
 * Retorna o QR Code PIX de uma cobrança.
 */
export async function obterPixQrCode(paymentId: string): Promise<AsaasPixQrCode> {
  return asaasRequest<AsaasPixQrCode>(`/payments/${paymentId}/pixQrCode`);
}

/**
 * Verifica o status atual de uma cobrança.
 * Status possíveis: PENDING, RECEIVED, CONFIRMED, OVERDUE, REFUNDED
 */
export async function verificarPagamento(paymentId: string): Promise<AsaasPayment> {
  return asaasRequest<AsaasPayment>(`/payments/${paymentId}`);
}
