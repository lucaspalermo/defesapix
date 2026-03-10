/**
 * Helper de autenticação para API routes.
 * Usa getToken do next-auth/jwt para validar JWT em rotas de API.
 */

import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export interface ApiUser {
  id: string;
  email: string;
  role: string;
}

/**
 * Retorna o usuário autenticado ou null.
 */
export async function getApiUser(req: NextRequest): Promise<ApiUser | null> {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.id || !token?.email) return null;

  return {
    id: token.id as string,
    email: token.email as string,
    role: (token.role as string) ?? 'USER',
  };
}

/**
 * Retorna o usuário autenticado ou responde com 401.
 */
export async function requireAuth(req: NextRequest): Promise<ApiUser | NextResponse> {
  const user = await getApiUser(req);
  if (!user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }
  return user;
}

/**
 * Retorna o usuário admin ou responde com 403.
 */
export async function requireAdmin(req: NextRequest): Promise<ApiUser | NextResponse> {
  const result = await requireAuth(req);
  if (result instanceof NextResponse) return result;
  if (result.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 });
  }
  return result;
}
