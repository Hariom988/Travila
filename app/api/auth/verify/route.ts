// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d'
);

export async function GET(request: NextRequest) {
  try {
    console.log('Verify endpoint called');
    
    // Get token from cookie
    const token = request.cookies.get('adminToken')?.value;

    console.log('Token found:', !!token);

    if (!token) {
      console.log('No token in cookie');
      return NextResponse.json(
        { authenticated: false, error: 'No token found' },
        { status: 401 }
      );
    }

    // Verify token
    const verified = await jwtVerify(token, JWT_SECRET);
    const payload = verified.payload;

    console.log('Token verified:', payload);

    return NextResponse.json(
      { 
        authenticated: true, 
        user: {
          id: payload.id,
          email: payload.email,
          role: payload.role,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}