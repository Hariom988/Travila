// app/api/admin/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';

/**
 * GET /api/admin/bookings
 * Fetch all hotel and activity bookings with user and item details
 * Admin only - requires adminToken
 */
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
    }

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type'); // 'hotel', 'activity', or null for all
    const status = searchParams.get('status'); // 'PENDING', 'CONFIRMED', 'CANCELLED'
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Validate status if provided
    const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    // Build where clause for filtering
    const statusFilter = status ? { status: status as any } : undefined;

    // Fetch hotel bookings if type is null or 'hotel'
    let hotelBookings: any[] = [];
    if (!type || type === 'hotel') {
      try {
        hotelBookings = await prisma.hotelBooking.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
            hotel: {
              select: {
                id: true,
                name: true,
                location: true,
                pricePerNight: true,
                images: true,
              },
            },
          },
          where: statusFilter,
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
        });
      } catch (hotelError) {
        console.error('Error fetching hotel bookings:', hotelError);
        hotelBookings = [];
      }
    }

    // Fetch activity bookings if type is null or 'activity'
    let activityBookings: any[] = [];
    if (!type || type === 'activity') {
      try {
        activityBookings = await prisma.activityBooking.findMany({
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
              },
            },
            activity: {
              select: {
                id: true,
                name: true,
                location: true,
                duration: true,
                pricePerPerson: true,
                images: true,
              },
            },
          },
          where: statusFilter,
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset,
        });
      } catch (activityError) {
        console.error('Error fetching activity bookings:', activityError);
        activityBookings = [];
      }
    }

    // Format hotel bookings
    const formattedHotelBookings = hotelBookings.map((booking) => {
      const nights = Math.ceil(
        (new Date(booking.endDate).getTime() -
          new Date(booking.startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return {
        id: booking.id,
        bookingType: 'HOTEL',
        itemId: booking.hotelId,
        itemName: booking.hotel.name,
        itemLocation: booking.hotel.location,
        itemImage: booking.hotel.images?.[0] || null,
        userId: booking.user.id,
        userName: booking.user.name || 'N/A',
        userEmail: booking.user.email,
        userPhone: booking.user.phone || 'N/A',
        startDate: booking.startDate.toISOString(),
        endDate: booking.endDate.toISOString(),
        nights: nights,
        rooms: 1,
        pricePerUnit: booking.hotel.pricePerNight.toString(),
        totalPrice: booking.totalPrice.toString(),
        status: booking.status,
        paymentId: booking.paymentId,
        createdAt: booking.createdAt.toISOString(),
      };
    });

    // Format activity bookings
    const formattedActivityBookings = activityBookings.map((booking) => {
      return {
        id: booking.id,
        bookingType: 'ACTIVITY',
        itemId: booking.activityId,
        itemName: booking.activity.name,
        itemLocation: booking.activity.location,
        itemImage: booking.activity.images?.[0] || null,
        userId: booking.user.id,
        userName: booking.user.name || 'N/A',
        userEmail: booking.user.email,
        userPhone: booking.user.phone || 'N/A',
        date: booking.date.toISOString(),
        people: booking.people,
        duration: booking.activity.duration,
        pricePerUnit: booking.activity.pricePerPerson.toString(),
        totalPrice: booking.totalPrice.toString(),
        status: booking.status,
        paymentId: booking.paymentId,
        createdAt: booking.createdAt.toISOString(),
      };
    });

    // Combine and sort by creation date
    const allBookings = [
      ...formattedHotelBookings,
      ...formattedActivityBookings,
    ].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Get counts
    let totalHotelBookings = 0;
    let totalActivityBookings = 0;

    if (!type || type === 'hotel') {
      totalHotelBookings = await prisma.hotelBooking.count(
        statusFilter ? { where: statusFilter } : undefined
      );
    }

    if (!type || type === 'activity') {
      totalActivityBookings = await prisma.activityBooking.count(
        statusFilter ? { where: statusFilter } : undefined
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: allBookings,
        pagination: {
          total: totalHotelBookings + totalActivityBookings,
          limit,
          offset,
          returned: allBookings.length,
        },
        stats: {
          totalHotelBookings,
          totalActivityBookings,
          totalBookings: totalHotelBookings + totalActivityBookings,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: String(error) },
      { status: 500 }
    );
  }
}