import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';
import { logActivity } from '@/lib/activity-logger';

// ✅ GET single activity - PUBLIC (NO authentication required)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const activity = await prisma.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    const safeData = JSON.parse(JSON.stringify({
      ...activity,
      pricePerPerson: activity.pricePerPerson.toString(),
    }));

    return NextResponse.json(safeData);
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}

// ✅ DELETE - Delete activity - ADMIN ONLY
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
    }

    const { id } = await params;

    const activity = await prisma.activity.findUnique({
      where: { id },
    });

    if (!activity) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    // Check for PENDING or CONFIRMED bookings (ignore CANCELLED)
    const activeBookingCount = await prisma.activityBooking.count({
      where: {
        activityId: id,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (activeBookingCount > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete activity "${activity.name}" because it has ${activeBookingCount} active booking(s) (PENDING or CONFIRMED). Please cancel these bookings first before deletion.`,
          activeBookingCount,
          activityName: activity.name,
        },
        { status: 400 }
      );
    }

    // Delete all CANCELLED bookings first (clean up)
    await prisma.activityBooking.deleteMany({
      where: {
        activityId: id,
        status: 'CANCELLED',
      },
    });

    // Now delete the activity
    await prisma.activity.delete({
      where: { id },
    });

    // Log activity
    await logActivity(
      auth.id,
      'DELETE_ACTIVITY',
      `Deleted activity: ${activity.name}`
    );

    return NextResponse.json(
      { success: true, message: 'Activity deleted successfully' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error deleting activity:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete activity' },
      { status: 500 }
    );
  }
}

// ✅ PUT - Update activity - ADMIN ONLY
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
    }

    const { id } = await params;
    const body = await request.json();
    const { name, location, description, pricePerPerson, duration, images } = body;

    if (!name?.trim() || !location?.trim() || !pricePerPerson || !duration?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.update({
      where: { id },
      data: {
        name: name.trim(),
        location: location.trim(),
        description: description?.trim() || '',
        pricePerPerson: parseFloat(pricePerPerson),
        duration: duration.trim(),
        images: Array.isArray(images) ? images : [],
      },
    });

    // Log activity
    await logActivity(
      auth.id,
      'UPDATE_ACTIVITY',
      `Updated activity: ${activity.name}`
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          ...activity,
          pricePerPerson: activity.pricePerPerson.toString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }
    console.error('Error updating activity:', error);
    return NextResponse.json(
      { error: 'Failed to update activity' },
      { status: 500 }
    );
  }
}