import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  // 1. Update the type definition to expect a Promise
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 2. Await the params object (Required for Next.js 15)
    const { id } = await params;

    // 3. DEBUG: Check if your ID in schema.prisma is Int or String
    // If your schema uses @default(autoincrement()) -> It is an Int.
    // If your schema uses @default(cuid()) or @default(uuid()) -> It is a String.
    
    // CASE A: If your ID is a String (CUID/UUID), use this:
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: id, 
      },
    });

    /* 
    // CASE B: If your ID is an Integer, use this instead:
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: parseInt(id), // You must convert string to number
      },
    });
    */

    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error("API Error:", error); // Log the error to see details in terminal
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }   
}