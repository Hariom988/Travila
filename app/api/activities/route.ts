
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';
export const maxDuration = 60;
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d'
);

export async function POST(request: NextRequest) {
  try {
    // Verify user authentication
    const token = request.cookies.get('userToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required', code: 'UNAUTHORIZED' },
        { status: 401 }
      );
    }

    let verified;
    try {
      verified = await jwtVerify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid or expired token', code: 'INVALID_TOKEN' },
        { status: 401 }
      );
    }

    const userId = verified.payload.id as string;
    const body = await request.json();
    
    const { activityId, date, people, totalPrice } = body;

    // Validation
    if (!activityId || !date || !people || !totalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields', code: 'MISSING_FIELDS' },
        { status: 400 }
      );
    }

    if (people < 1) {
      return NextResponse.json(
        { error: 'At least 1 person is required', code: 'INVALID_PEOPLE' },
        { status: 400 }
      );
    }

    const activityDate = new Date(date);

    if (activityDate < new Date()) {
      return NextResponse.json(
        { error: 'Activity date cannot be in the past', code: 'PAST_DATE' },
        { status: 400 }
      );
    }

    // Verify activity exists
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!activity) {
      return NextResponse.json(
        { error: 'Activity not found', code: 'ACTIVITY_NOT_FOUND' },
        { status: 404 }
      );
    }

    // Create booking
    const booking = await prisma.activityBooking.create({
      data: {
        userId,
        activityId,
        date: activityDate,
        people: parseInt(people.toString()),
        totalPrice: parseFloat(totalPrice.toString()),
        status: 'PENDING',
      },
      include: {
        activity: {
          select: {
            id: true,
            name: true,
            location: true,
            pricePerPerson: true,
            duration: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Activity booking created successfully',
        booking: {
          id: booking.id,
          activityId: booking.activityId,
          activityName: booking.activity.name,
          date: booking.date.toISOString(),
          people: booking.people,
          totalPrice: booking.totalPrice.toString(),
          status: booking.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Activity booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}

// GET user's activity bookings
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('userToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    let verified;
    try {
      verified = await jwtVerify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const userId = verified.payload.id as string;

    const bookings = await prisma.activityBooking.findMany({
      where: { userId },
      include: {
        activity: {
          select: {
            name: true,
            location: true,
            pricePerPerson: true,
            duration: true,
            images: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching activity bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}