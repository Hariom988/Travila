import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('adminToken')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { available } = body;

    if (typeof available !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid availability status' },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.update({
      where: { id },
      data: { available },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...hotel,
          pricePerNight: hotel.pricePerNight.toString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }
    console.error('Error updating hotel availability:', error);
    return NextResponse.json(
      { error: 'Failed to update hotel availability' },
      { status: 500 }
    );
  }
}