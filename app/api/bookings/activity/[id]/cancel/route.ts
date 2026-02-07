// app/api/bookings/activity/[id]/cancel/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma';
import { logActivity } from '@/lib/activity-logger';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'a131878d308104875e624401c5bb3a31e40f8c9b893a6274b38451df3303479d'
);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
    const { id } = await params;

    // 3. VERIFY BOOKING EXISTS AND BELONGS TO USER
    const booking = await prisma.activityBooking.findUnique({
      where: { id },
      include: {
        activity: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    if (!booking) {
      return NextResponse.json(
        { 
          error: 'Booking not found',
          code: 'BOOKING_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // 4. VERIFY BOOKING BELONGS TO THE USER
    if (booking.userId !== userId) {
      return NextResponse.json(
        { 
          error: 'Unauthorized - This booking does not belong to you',
          code: 'UNAUTHORIZED'
        },
        { status: 403 }
      );
    }

    // 5. CHECK IF BOOKING CAN BE CANCELLED
    if (booking.status === 'CANCELLED') {
      return NextResponse.json(
        { 
          error: 'Booking is already cancelled',
          code: 'ALREADY_CANCELLED'
        },
        { status: 400 }
      );
    }

    // 6. CHECK IF ACTIVITY DATE HAS PASSED (OPTIONAL - adjust based on your policy)
    const activityDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (activityDate < today) {
      return NextResponse.json(
        { 
          error: 'Cannot cancel activities that have already occurred',
          code: 'ACTIVITY_ALREADY_OCCURRED'
        },
        { status: 400 }
      );
    }

    // 7. UPDATE BOOKING STATUS TO CANCELLED
    const cancelledBooking = await prisma.activityBooking.update({
      where: { id },
      data: {
        status: 'CANCELLED'
      },
      include: {
        activity: {
          select: {
            id: true,
            name: true,
            location: true,
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

    // 8. LOG ACTIVITY
    await logActivity(
      userId,
      'ACTIVITY_BOOKING_CANCELLED',
      `Cancelled ${booking.activity.name} booking for ${booking.people} people (Refund: ₹${booking.totalPrice})`
    );

    // 9. RETURN SUCCESS RESPONSE
    return NextResponse.json(
      {
        success: true,
        message: 'Activity booking cancelled successfully',
        booking: {
          id: cancelledBooking.id,
          activityId: cancelledBooking.activityId,
          activityName: cancelledBooking.activity.name,
          status: cancelledBooking.status,
          refundAmount: cancelledBooking.totalPrice.toString(),
          cancelledAt: new Date().toISOString()
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Activity booking cancellation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to cancel booking',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}