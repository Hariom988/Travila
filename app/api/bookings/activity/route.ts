// app/api/bookings/activity/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import { logActivity } from '@/lib/activity-logger';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d'
);

/**
 * POST /api/bookings/activity
 * Create a new activity booking
 * 
 * Requires: userToken (httpOnly cookie)
 * Body: {
 *   activityId: string,
 *   date: string (YYYY-MM-DD),
 *   people: number,
 *   totalPrice: string
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. VERIFY USER IS AUTHENTICATED
    const token = request.cookies.get('userToken')?.value;

    if (!token) {
      return NextResponse.json(
        { 
          error: 'Authentication required',
          code: 'UNAUTHORIZED'
        },
        { status: 401 }
      );
    }

    // 2. VERIFY JWT TOKEN
    let verified;
    try {
      verified = await jwtVerify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { 
          error: 'Invalid or expired token',
          code: 'INVALID_TOKEN'
        },
        { status: 401 }
      );
    }

    const userId = verified.payload.id as string;

    // 3. PARSE REQUEST BODY
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    const { activityId, date, people, totalPrice } = body;

    // 4. VALIDATE REQUIRED FIELDS
    if (!activityId || !date || !people || !totalPrice) {
      return NextResponse.json(
        {
          error: 'Missing required fields: activityId, date, people, totalPrice',
          code: 'MISSING_FIELDS'
        },
        { status: 400 }
      );
    }

    // 5. VALIDATE DATE FORMAT
    const activityDate = new Date(date);

    if (isNaN(activityDate.getTime())) {
      return NextResponse.json(
        { 
          error: 'Invalid date format. Use YYYY-MM-DD',
          code: 'INVALID_DATE_FORMAT'
        },
        { status: 400 }
      );
    }

    // 6. VALIDATE DATE IS NOT IN PAST
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activityDate < today) {
      return NextResponse.json(
        { 
          error: 'Activity date cannot be in the past',
          code: 'PAST_DATE'
        },
        { status: 400 }
      );
    }

    // 7. VALIDATE PEOPLE COUNT
    const peopleCount = parseInt(people.toString());
    if (isNaN(peopleCount) || peopleCount < 1) {
      return NextResponse.json(
        { 
          error: 'Number of people must be at least 1',
          code: 'INVALID_PEOPLE'
        },
        { status: 400 }
      );
    }

    // 8. VALIDATE PRICE
    const price = parseFloat(totalPrice.toString());
    if (isNaN(price) || price <= 0) {
      return NextResponse.json(
        { 
          error: 'Total price must be a positive number',
          code: 'INVALID_PRICE'
        },
        { status: 400 }
      );
    }

    // 9. VERIFY ACTIVITY EXISTS
    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      select: {
        id: true,
        name: true,
        pricePerPerson: true
      }
    });

    if (!activity) {
      return NextResponse.json(
        { 
          error: 'Activity not found',
          code: 'ACTIVITY_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // 10. VERIFY USER EXISTS
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true }
    });

    if (!user) {
      return NextResponse.json(
        { 
          error: 'User not found',
          code: 'USER_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // 11. CREATE BOOKING
    const booking = await prisma.activityBooking.create({
      data: {
        userId,
        activityId,
        date: activityDate,
        people: peopleCount,
        totalPrice: price,
        status: 'PENDING'
      },
      include: {
        activity: {
          select: {
            id: true,
            name: true,
            location: true,
            duration: true,
            pricePerPerson: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    // 12. LOG ACTIVITY
    await logActivity(
      userId,
      'ACTIVITY_BOOKING_CREATED',
      `Booked ${activity.name} for ${peopleCount} people on ${date} for ₹${price}`
    );

    // 13. RETURN SUCCESS RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: 'Activity booking created successfully',
        booking: {
          id: booking.id,
          activityId: booking.activityId,
          activityName: booking.activity.name,
          activityLocation: booking.activity.location,
          date: booking.date.toISOString(),
          people: booking.people,
          totalPrice: booking.totalPrice.toString(),
          status: booking.status,
          createdAt: booking.createdAt.toISOString()
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Activity booking error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create booking',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/bookings/activity
 * Get user's activity bookings
 * 
 * Requires: userToken (httpOnly cookie)
 */
export async function GET(request: NextRequest) {
  try {
    // 1. VERIFY USER IS AUTHENTICATED
    const token = request.cookies.get('userToken')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // 2. VERIFY JWT TOKEN
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

    // 3. FETCH USER'S ACTIVITY BOOKINGS
    const bookings = await prisma.activityBooking.findMany({
      where: { userId },
      include: {
        activity: {
          select: {
            id: true,
            name: true,
            location: true,
            duration: true,
            pricePerPerson: true,
            images: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // 4. FORMAT RESPONSE
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      activityId: booking.activityId,
      activityName: booking.activity.name,
      activityLocation: booking.activity.location,
      activityImage: booking.activity.images?.[0] || null,
      date: booking.date.toISOString(),
      people: booking.people,
      duration: booking.activity.duration,
      totalPrice: booking.totalPrice.toString(),
      status: booking.status,
      createdAt: booking.createdAt.toISOString()
    }));

    return NextResponse.json(formattedBookings, { status: 200 });

  } catch (error) {
    console.error('Error fetching activity bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}