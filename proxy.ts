
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d'
);

const protectedRoutes = ['/admin/dashboard'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get('adminToken')?.value;

  if (!token) {
    console.log('❌ No token found, redirecting to login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const decoded = verifyTokenSync(token);
    
    if (!decoded) {
      console.log('❌ Token verification failed, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    console.log('✅ Token verified, allowing access');
    return NextResponse.next();
  } catch (error) {
    console.log('❌ Token error:', error);
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
}

function verifyTokenSync(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    
    if (payload.exp) {
      const expirationTime = payload.exp * 1000; 
      if (Date.now() > expirationTime) {
        console.log('❌ Token expired');
        return false;
      }
    }

    return true;
  } catch (error) {
    console.log('❌ Token parse error:', error);
    return false;
  }
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/((?!admin/login|api|_next/static|_next/image|favicon.ico).*)',
  ],
};