// lib/api-auth.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d'
);

export interface AuthPayload {
  id: string;
  email: string;
  role: string;
}


export async function verifyAdminAuth(
  request: NextRequest
): Promise<AuthPayload | null> {
  try {
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      console.log('No token provided');
      return null;
    }

    const verified = await jwtVerify(token, JWT_SECRET);
    
    return {
      id: verified.payload.id as string,
      email: verified.payload.email as string,
      role: verified.payload.role as string,
    };
  } catch (error) {
    console.error('Auth verification failed:', error);
    return null;
  }
}

/**
 * Middleware wrapper for protecting API routes
 * Usage in your route:
 * 
 * export async function POST(request: NextRequest) {
 *   const auth = await verifyAdminAuth(request);
 *   if (!auth) {
 *     return NextResponse.json(
 *       { error: 'Unauthorized' },
 *       { status: 401 }
 *     );
 *   }
 *   
 *   // Your protected code here
 * }
 */

/**
 * Check if user is admin
 */
export function isAdmin(auth: AuthPayload | null): boolean {
  return auth?.role === 'ADMIN';
}

/**
 * Unauthorized response helper
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized - Admin access required' },
    { status: 401 }
  );
}