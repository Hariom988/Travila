import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany();

    return NextResponse.json(hotels);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
}