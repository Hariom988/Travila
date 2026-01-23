import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d'
);

// Define protected routes that require authentication
const protectedRoutes = ['/admin/dashboard', '/admin/dashboard/:path*'];
const publicRoutes = ['/admin/login', '/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => {
    // Simple pattern matching for routes with :path*
    const routePattern = route.replace(':path*', '.*');
    return new RegExp(`^${routePattern}$`).test(pathname);
  });

  const isPublicRoute = publicRoutes.includes(pathname);

  // If route is not protected, allow access
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get('adminToken')?.value;

  // If no token and route is protected, redirect to login
  if (!token) {
    console.log('No token found, redirecting to login');
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verify the JWT token
  try {
    await jwtVerify(token, JWT_SECRET);
    console.log('Token verified successfully');
    // Token is valid, allow access
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed:', error);
    // Token is invalid, redirect to login
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    // Protect admin routes
    '/admin/:path*',
    // Exclude static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
};