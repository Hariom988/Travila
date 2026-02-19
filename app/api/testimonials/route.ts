import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';
import { logActivity } from '@/lib/activity-logger';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const publishedOnly = searchParams.get('published') === 'true';
    const isIndian = searchParams.get('isIndian');

    const where: any = {};
    if (publishedOnly) where.published = true;
    if (isIndian === 'true') where.isIndian = true;
    if (isIndian === 'false') where.isIndian = false;

    const testimonials = await prisma.testimonial.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) return unauthorizedResponse();

    const body = await request.json();
    const { name, location, country, image, rating, text, tour, isIndian, published, order } = body;

    if (!name?.trim() || !text?.trim()) {
      return NextResponse.json({ error: 'Name and text are required' }, { status: 400 });
    }

    const testimonial = await prisma.testimonial.create({
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

    await logActivity(auth.id, 'CREATE_TESTIMONIAL', `Created testimonial from: ${testimonial.name}`);

    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}