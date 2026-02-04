// app/api/bookings/hotel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import { logActivity } from '@/lib/activity-logger';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d'
);

/**
 * POST /api/bookings/hotel
 * Create a new hotel booking
 * 
 * Requires: userToken (httpOnly cookie)
 * Body: {
 *   hotelId: string,
 *   startDate: string (YYYY-MM-DD),
 *   endDate: string (YYYY-MM-DD),
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

    const { hotelId, startDate, endDate, totalPrice } = body;

    // 4. VALIDATE REQUIRED FIELDS
    if (!hotelId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json(
        {
          error: 'Missing required fields: hotelId, startDate, endDate, totalPrice',
          code: 'MISSING_FIELDS'
        },
        { status: 400 }
      );
    }

    // 5. VALIDATE DATE FORMAT
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return NextResponse.json(
        { 
          error: 'Invalid date format. Use YYYY-MM-DD',
          code: 'INVALID_DATE_FORMAT'
        },
        { status: 400 }
      );
    }

    // 6. VALIDATE DATE LOGIC
    if (startDateObj >= endDateObj) {
      return NextResponse.json(
        { 
          error: 'End date must be after start date',
          code: 'INVALID_DATE_RANGE'
        },
        { status: 400 }
      );
    }

    // 7. VALIDATE PRICE
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

    // 8. VERIFY HOTEL EXISTS
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
      select: {
        id: true,
        name: true,
        available: true
      }
    });

    if (!hotel) {
      return NextResponse.json(
        { 
          error: 'Hotel not found',
          code: 'HOTEL_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    if (!hotel.available) {
      return NextResponse.json(
        { 
          error: 'Hotel is currently not available for booking',
          code: 'HOTEL_UNAVAILABLE'
        },
        { status: 400 }
      );
    }

    // 9. VERIFY USER EXISTS
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

    // 10. CREATE BOOKING
    const booking = await prisma.hotelBooking.create({
      data: {
        userId,
        hotelId,
        startDate: startDateObj,
        endDate: endDateObj,
        totalPrice: price,
        status: 'PENDING'
      },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            location: true,
            pricePerNight: true
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

    // 11. LOG ACTIVITY
    await logActivity(
      userId,
      'HOTEL_BOOKING_CREATED',
      `Booked ${hotel.name} from ${startDate} to ${endDate} for ₹${price}`
    );

    // 12. CALCULATE NIGHTS
    const nights = Math.ceil(
      (endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24)
    );

    // 13. RETURN SUCCESS RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: 'Hotel booking created successfully',
        booking: {
          id: booking.id,
          hotelId: booking.hotelId,
          hotelName: booking.hotel.name,
          hotelLocation: booking.hotel.location,
          startDate: booking.startDate.toISOString(),
          endDate: booking.endDate.toISOString(),
          nights,
          totalPrice: booking.totalPrice.toString(),
          status: booking.status,
          createdAt: booking.createdAt.toISOString()
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Hotel booking error:', error);
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
 * GET /api/bookings/hotel
 * Get user's hotel bookings
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

    // 3. FETCH USER'S HOTEL BOOKINGS
    const bookings = await prisma.hotelBooking.findMany({
      where: { userId },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            location: true,
            pricePerNight: true,
            images: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // 4. FORMAT RESPONSE
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      hotelId: booking.hotelId,
      hotelName: booking.hotel.name,
      hotelLocation: booking.hotel.location,
      hotelImage: booking.hotel.images?.[0] || null,
      startDate: booking.startDate.toISOString(),
      endDate: booking.endDate.toISOString(),
      totalPrice: booking.totalPrice.toString(),
      status: booking.status,
      createdAt: booking.createdAt.toISOString()
    }));

    return NextResponse.json(formattedBookings, { status: 200 });

  } catch (error) {
    console.error('Error fetching hotel bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}