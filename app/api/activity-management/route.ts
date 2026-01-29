// app/api/activity-management/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';
import { logActivity } from '@/lib/activity-logger';

// GET all activities - PUBLIC (for displaying on website)
export async function GET(request: NextRequest) {
  try {
    const activities = await prisma.activity.findMany({
      select: {
        id: true,
        name: true,
        location: true,
        description: true,
        pricePerPerson: true,
        duration: true,
        images: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const safeActivities = activities.map(activity => ({
      ...activity,
      pricePerPerson: activity.pricePerPerson.toString(),
    }));

    return NextResponse.json(safeActivities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST - Create new activity - ADMIN ONLY
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) {
      return unauthorizedResponse();
    }

    const body = await request.json();
    const { name, location, description, pricePerPerson, duration, images } = body;

    if (!name?.trim() || !location?.trim() || !pricePerPerson || !duration?.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.create({
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
      'CREATE_ACTIVITY',
      `Created activity: ${activity.name} in ${activity.location}`
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          ...activity,
          pricePerPerson: activity.pricePerPerson.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}