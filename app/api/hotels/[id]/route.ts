// app/api/hotels/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
        images: images || [],
        facilities: facilities || [],
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

// DELETE - Remove hotel
export async function DELETE(
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

    // Check if hotel exists
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        bookings: true,
      },
    });

    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    // Check if hotel has active bookings
    const activeBookings = hotel.bookings.filter(
      b => b.status === 'PENDING' || b.status === 'CONFIRMED'
    );

    if (activeBookings.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete hotel with active bookings' },
        { status: 400 }
      );
    }

    // Delete the hotel
    await prisma.hotel.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: 'Hotel deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }
    console.error('Error deleting hotel:', error);
    return NextResponse.json(
      { error: 'Failed to delete hotel' },
      { status: 500 }
    );
  }
}