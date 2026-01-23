// app/api/hotels/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single hotel
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const hotel = await prisma.hotel.findUnique({
      where: { id },
    });

    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    const safeData = JSON.parse(JSON.stringify({
      ...hotel,
      pricePerNight: hotel.pricePerNight.toString(),
    }));

    return NextResponse.json(safeData);
  } catch (error: any) {
    console.error('Error fetching hotel:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotel' },
      { status: 500 }
    );
  }
}

// PUT - Update hotel
export async function PUT(
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
    const { name, location, description, pricePerNight, images, facilities } = body;

    // Validation
    if (!name?.trim() || !location?.trim() || !pricePerNight) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.update({
      where: { id },
      data: {
        name: name.trim(),
        location: location.trim(),
        description: description?.trim() || '',
        pricePerNight: parseFloat(pricePerNight),
        images: Array.isArray(images) ? images : [],
        facilities: Array.isArray(facilities) ? facilities : [],
      },
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
    console.error('Error updating hotel:', error);
    return NextResponse.json(
      { error: 'Failed to update hotel' },
      { status: 500 }
    );
  }
}