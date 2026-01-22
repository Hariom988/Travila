import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d';

export async function GET(request: NextRequest) {
  try {
    console.log('Verify endpoint called');
    const token = request.cookies.get('adminToken')?.value;

    console.log('Token found:', !!token);

    if (!token) {
      console.log('No token in cookie');
      return NextResponse.json(
        { authenticated: false, error: 'No token found' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token verified:', decoded);

    return NextResponse.json(
      { authenticated: true, user: decoded },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Invalid token' },
      { status: 401 }
    );
  }
}