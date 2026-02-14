import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';
import { logActivity } from '@/lib/activity-logger';
export const maxDuration = 60;
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
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotel' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
    }

    const { id } = await params;
    const body = await request.json();
    const { name, location, description, pricePerNight, images, facilities } = body;

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

    await logActivity(
      auth.id,
      'UPDATE_HOTEL',
      `Updated hotel: ${hotel.name}`
    );

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
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
    }

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

    const activeBookingCount = await prisma.hotelBooking.count({
      where: {
        hotelId: id,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (activeBookingCount > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete hotel "${hotel.name}" because it has ${activeBookingCount} active booking(s) (PENDING or CONFIRMED). Please cancel these bookings first before deletion.`,
          activeBookingCount,
          hotelName: hotel.name,
        },
        { status: 400 }
      );
    }

    await prisma.hotelBooking.deleteMany({
      where: {
        hotelId: id,
        status: 'CANCELLED',
      },
    });

    await prisma.hotel.delete({
      where: { id },
    });

    await logActivity(
      auth.id,
      'DELETE_HOTEL',
      `Deleted hotel: ${hotel.name}`
    );

    return NextResponse.json(
      {
        success: true,
        message: 'Hotel deleted successfully',
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error deleting hotel:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete hotel' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
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

    // Log activity
    await logActivity(
      auth.id,
      'TOGGLE_HOTEL',
      `${available ? 'Activated' : 'Deactivated'} hotel: ${hotel.name}`
    );

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