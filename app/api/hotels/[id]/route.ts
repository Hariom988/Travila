// app/api/hotels/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';

// GET single hotel (public - remove auth if you want public access)
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

// PUT - Update hotel (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
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

// app/api/hotels/[id]/availability/route.ts
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify authentication
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