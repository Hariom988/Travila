import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';
import { logActivity } from '@/lib/activity-logger';
export const maxDuration = 60;
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

    const response = NextResponse.json(safeActivities);
    response.headers.set("Content-Type", "application/json");
    return response;
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities', details: String(error) },
      { status: 500 }
    );
  }
}

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