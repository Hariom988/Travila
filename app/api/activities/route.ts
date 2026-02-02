// app/api/activities/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth } from '@/lib/apiAuth';

// GET all activities - Admin only
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const activities = await prisma.activityLog.findMany({
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: { timestamp: 'desc' },
      take: 200,
    });

    // Format timestamp
    const formattedActivities = activities.map((activity: typeof activities[0]) => ({
      ...activity,
      timestamp: activity.timestamp.toISOString(),
    }));

    return NextResponse.json(formattedActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}