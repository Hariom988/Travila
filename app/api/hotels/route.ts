import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    if (!prisma.hotel) {
      throw new Error('Prisma hotel model not found');
    }

    const hotels = await prisma.hotel.findMany();

    return NextResponse.json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}