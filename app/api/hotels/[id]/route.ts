import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const hotel = await prisma.hotel.findUnique({
      where: { id: id },
    });

    if (!hotel) {
      return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    // Decimal fields (price) ko handle karne ke liye simple logic
    const safeData = JSON.parse(JSON.stringify(hotel));
    return NextResponse.json(safeData);

  } catch (error: any) {
    console.error("PRISMA ERROR:", error.message);
    return NextResponse.json(
      { error: 'Database Connection Error', detail: error.message },
      { status: 500 }
    );
  }
}