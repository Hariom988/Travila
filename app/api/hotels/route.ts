// app/api/hotels/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all hotels
export async function GET(request: NextRequest) {
  try {
    const hotels = await prisma.hotel.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        pricePerNight: true,
        available: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convert Decimal to string for JSON serialization
    const safeHotels = hotels.map(hotel => ({
      ...hotel,
      pricePerNight: hotel.pricePerNight.toString(),
    }));

    return NextResponse.json(safeHotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
}

// POST - Create new hotel
export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.cookies.get('adminToken')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, location, description, pricePerNight, images, facilities } = body;

    // Validation
    if (!name?.trim() || !location?.trim() || !pricePerNight) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const hotel = await prisma.hotel.create({
      data: {
        name: name.trim(),
        location: location.trim(),
        description: description?.trim() || '',
        pricePerNight: parseFloat(pricePerNight),
        images: images || [],
        facilities: facilities || [],
        available: true,
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
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating hotel:', error);
    return NextResponse.json(
      { error: 'Failed to create hotel' },
      { status: 500 }
    );
  }
}