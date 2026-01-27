// app/api/auth/user/google/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d';
const JWT_EXPIRY = '7d';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { googleId, email, name } = body;

    // Validation
    if (!googleId || !email) {
      return NextResponse.json(
        { error: 'Invalid Google auth data' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists by email
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    let user;

    if (!existingUser) {
      // Create new user
      user = await prisma.user.create({
        data: {
          name: name || 'Google User',
          email: normalizedEmail,
          googleId: googleId,
          password: await hashPassword(Math.random().toString(36).slice(-32)),
          role: 'USER',
        },
      });
    } else {
      // User exists - update googleId if not already set
      if (!existingUser.googleId) {
        user = await prisma.user.update({
          where: { email: normalizedEmail },
          data: { googleId: googleId },
        });
      } else {
        user = existingUser;
      }
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: 'Google login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: 'userToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { error: 'Google authentication failed' },
      { status: 500 }
    );
  }
}