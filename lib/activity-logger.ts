// lib/activity-logger.ts
import { prisma } from './prisma';

export async function logActivity(
  userId: string,
  action: string,
  details: string = ''
) {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        details,
      },
    });
  } catch (error) {
    console.error('Failed to log activity:', error);
    // Don't throw - logging should never break the app
  }
}

export async function getAdminActivities(limit = 100) {
  try {
    return await prisma.activityLog.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
      orderBy: { timestamp: 'desc' },
      take: limit,
    });
  } catch (error) {
    console.error('Failed to fetch activities:', error);
    return [];
  }
}