
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';
import { logActivity } from '@/lib/activity-logger';

export async function GET(request: NextRequest) {
  try {
    const hotels = await prisma.hotel.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        description: true,
        pricePerNight: true,
        available: true,
        facilities: true,
        images: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeHotels = hotels.map(hotel => ({
      ...hotel,
      pricePerNight: hotel.pricePerNight.toString(),
    }));

    const response = NextResponse.json(safeHotels);
    response.headers.set("Content-Type", "application/json; charset=utf-8");
    return response;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { name, location, description, pricePerNight, images, facilities } = body;

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
        images: Array.isArray(images) ? images : [],
        facilities: Array.isArray(facilities) ? facilities : [],
        available: true,
      },
    });

    await logActivity(
      auth.id,
      'CREATE_HOTEL',
      `Created hotel: ${hotel.name} in ${hotel.location}`
    );

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