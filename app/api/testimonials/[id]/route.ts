import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';
import { logActivity } from '@/lib/activity-logger';

export const maxDuration = 60;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();
    const { name, location, country, image, rating, text, tour, isIndian, published, order } = body;

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json({ error: 'Name and text are required' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: name.trim(),
        location: location?.trim() || '',
        country: country?.trim() || '',
        image: image?.trim() || '',
        rating: parseInt(rating?.toString() || '5'),
        text: text.trim(),
        tour: tour?.trim() || '',
        isIndian: isIndian ?? false,
        published: published ?? true,
        order: parseInt(order?.toString() || '0'),
      },
    });

    await logActivity(auth.id, 'UPDATE_TESTIMONIAL', `Updated testimonial from: ${testimonial.name}`);

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) return unauthorizedResponse();

    const { id } = await params;

    const testimonial = await prisma.testimonial.findUnique({ where: { id } });
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    await prisma.testimonial.delete({ where: { id } });

    await logActivity(auth.id, 'DELETE_TESTIMONIAL', `Deleted testimonial from: ${testimonial.name}`);

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) return unauthorizedResponse();

    const { id } = await params;
    const body = await request.json();
    const { published } = body;

    if (typeof published !== 'boolean') {
      return NextResponse.json({ error: 'Invalid published status' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: { published },
    });

    await logActivity(
      auth.id,
      'TOGGLE_TESTIMONIAL',
      `${published ? 'Published' : 'Unpublished'} testimonial from: ${testimonial.name}`
    );

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}