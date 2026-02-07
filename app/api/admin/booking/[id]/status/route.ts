// app/api/admin/booking/[id]/status/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';
import { logActivity } from '@/lib/activity-logger';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. VERIFY ADMIN AUTHENTICATION
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    // 2. PARSE REQUEST BODY
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    const { status } = body;

    // 3. VALIDATE STATUS
    const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: 'Invalid status. Must be PENDING, CONFIRMED, or CANCELLED',
          code: 'INVALID_STATUS'
        },
        { status: 400 }
      );
    }

    // 4. DETERMINE IF HOTEL OR ACTIVITY BOOKING
    const hotelBooking = await prisma.hotelBooking.findUnique({
      where: { id },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            location: true
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

    const activityBooking = await prisma.activityBooking.findUnique({
      where: { id },
      include: {
        activity: {
          select: {
            id: true,
            name: true,
            location: true
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

    // 5. CHECK IF BOOKING EXISTS
    if (!hotelBooking && !activityBooking) {
      return NextResponse.json(
        {
          error: 'Booking not found',
          code: 'BOOKING_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    const isHotel = !!hotelBooking;

    // 6. UPDATE BOOKING STATUS
    if (isHotel) {
      const updated = await prisma.hotelBooking.update({
        where: { id },
        data: { status: status as any },
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

      // 7. LOG ACTIVITY
      await logActivity(
        auth.id,
        `HOTEL_BOOKING_${status}`,
        `${status === 'CONFIRMED' ? 'Confirmed' : status === 'CANCELLED' ? 'Cancelled' : 'Updated'} hotel booking for ${updated.user.name} at ${updated.hotel.name} (Booking ID: ${id})`
      );

      // 8. RETURN SUCCESS RESPONSE
      return NextResponse.json(
        {
          success: true,
          message: `Hotel booking ${status.toLowerCase()} successfully`,
          booking: {
            id: updated.id,
            bookingType: 'HOTEL',
            hotelName: updated.hotel.name,
            hotelLocation: updated.hotel.location,
            userName: updated.user.name,
            userEmail: updated.user.email,
            totalPrice: updated.totalPrice.toString(),
            status: updated.status,
            startDate: updated.startDate.toISOString(),
            endDate: updated.endDate.toISOString()
          }
        },
        { status: 200 }
      );
    } else {
      const updated = await prisma.activityBooking.update({
        where: { id },
        data: { status: status as any },
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

      // 7. LOG ACTIVITY
      await logActivity(
        auth.id,
        `ACTIVITY_BOOKING_${status}`,
        `${status === 'CONFIRMED' ? 'Confirmed' : status === 'CANCELLED' ? 'Cancelled' : 'Updated'} activity booking for ${updated.user.name} for ${updated.activity.name} (Booking ID: ${id})`
      );

      // 8. RETURN SUCCESS RESPONSE
      return NextResponse.json(
        {
          success: true,
          message: `Activity booking ${status.toLowerCase()} successfully`,
          booking: {
            id: updated.id,
            bookingType: 'ACTIVITY',
            activityName: updated.activity.name,
            activityLocation: updated.activity.location,
            userName: updated.user.name,
            userEmail: updated.user.email,
            totalPrice: updated.totalPrice.toString(),
            status: updated.status,
            date: updated.date.toISOString(),
            people: updated.people
          }
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Booking status update error:', error);
    return NextResponse.json(
      {
        error: 'Failed to update booking status',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}