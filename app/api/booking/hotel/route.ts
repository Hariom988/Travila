// app/api/bookings/hotel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d'
);

interface BookingData {
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  totalPrice: number;
}

// Verify user authentication
async function verifyUserAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('userToken')?.value;
    
    if (!token) {
      return null;
    }

    const verified = await jwtVerify(token, JWT_SECRET);
    
    return {
      id: verified.payload.id as string,
      email: verified.payload.email as string,
      role: verified.payload.role as string,
    };
  } catch (error) {
    console.error('Auth verification failed:', error);
    return null;
  }
}

// POST - Create hotel booking
export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const auth = await verifyUserAuth(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required', requiresAuth: true },
        { status: 401 }
      );
    }

    const body: BookingData = await request.json();
    const { hotelId, checkIn, checkOut, rooms, adults, totalPrice } = body;

    // Validate required fields
    if (!hotelId || !checkIn || !checkOut || !rooms || !totalPrice) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return NextResponse.json(
        { error: 'Check-in date cannot be in the past' },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'Check-out date must be after check-in date' },
        { status: 400 }
      );
    }

    // Verify hotel exists and is available
    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      return NextResponse.json(
        { error: 'Hotel not found' },
        { status: 404 }
      );
    }

    if (!hotel.available) {
      return NextResponse.json(
        { error: 'This hotel is currently unavailable for booking' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.hotelBooking.create({
      data: {
        userId: auth.id,
        hotelId: hotelId,
        startDate: checkInDate,
        endDate: checkOutDate,
        totalPrice: totalPrice,
        status: 'CONFIRMED', // Since no payment gateway, auto-confirm
      },
      include: {
        hotel: {
          select: {
            name: true,
            location: true,
            images: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Hotel booked successfully!',
        booking: {
          id: booking.id,
          hotelName: booking.hotel.name,
          hotelLocation: booking.hotel.location,
          checkIn: booking.startDate.toISOString(),
          checkOut: booking.endDate.toISOString(),
          totalPrice: booking.totalPrice.toString(),
          status: booking.status,
          guestName: booking.user.name,
          guestEmail: booking.user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

// GET - Fetch user's bookings
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyUserAuth(request);
    
    if (!auth) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const bookings = await prisma.hotelBooking.findMany({
      where: {
        userId: auth.id,
      },
      include: {
        hotel: {
          select: {
            name: true,
            location: true,
            images: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedBookings = bookings.map((booking: typeof bookings[number]) => ({
      id: booking.id,
      hotelName: booking.hotel.name,
      hotelLocation: booking.hotel.location,
      hotelImage: booking.hotel.images[0] || null,
      checkIn: booking.startDate.toISOString(),
      checkOut: booking.endDate.toISOString(),
      totalPrice: booking.totalPrice.toString(),
      status: booking.status,
      bookingDate: booking.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}