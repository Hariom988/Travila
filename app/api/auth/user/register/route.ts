import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
export async function POST(request: NextRequest) {
try {
const body = await request.json();
const { name, email, phone, password, confirmPassword } = body;
// Validation
if (!name?.trim() || !email?.trim() || !phone?.trim() || !password || !confirmPassword) {
  return NextResponse.json(
    { error: 'All fields are required' },
    { status: 400 }
  );
}

if (password !== confirmPassword) {
  return NextResponse.json(
    { error: 'Passwords do not match' },
    { status: 400 }
  );
}

if (password.length < 6) {
  return NextResponse.json(
    { error: 'Password must be at least 6 characters' },
    { status: 400 }
  );
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return NextResponse.json(
    { error: 'Invalid email format' },
    { status: 400 }
  );
}

const phoneRegex = /^[0-9]{10}$/;
if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
  return NextResponse.json(
    { error: 'Phone number must be 10 digits' },
    { status: 400 }
  );
}

// Check if email exists
const existingUser = await prisma.user.findUnique({
  where: { email: email.toLowerCase().trim() },
});

if (existingUser) {
  return NextResponse.json(
    { error: 'Email already registered' },
    { status: 400 }
  );
}

// Hash password
const hashedPassword = await hashPassword(password);

// Create user
const user = await prisma.user.create({
  data: {
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    role: 'USER',
  },
});

const { password: _, ...userWithoutPassword } = user;

return NextResponse.json(
  {
    success: true,
    message: 'Registration successful',
    user: userWithoutPassword,
  },
  { status: 201 }
);
} catch (error) {
console.error('Registration error:', error);
return NextResponse.json(
{ error: 'Registration failed' },
{ status: 500 }
);
}
}