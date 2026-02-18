
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

    const blog = await prisma.blog.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    prisma.blog.update({
      where: { id: blog.id },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {});

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
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
    const { title, excerpt, content, featuredImage, category, author, tags, published } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: {
        title: title.trim(),
        excerpt: excerpt?.trim() || '',
        content: content?.trim() || '',
        featuredImage: featuredImage?.trim() || '',
        category: category || 'Travel Tips',
        author: author?.trim() || 'HikinHigh Team',
        tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
        published: published ?? false,
      },
    });

    await logActivity(auth.id, 'UPDATE_BLOG', `Updated blog: "${blog.title}"`);

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
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

    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    await prisma.blog.delete({ where: { id } });

    await logActivity(auth.id, 'DELETE_BLOG', `Deleted blog: "${blog.title}"`);

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
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

    const blog = await prisma.blog.update({
      where: { id },
      data: { published },
    });

    await logActivity(
      auth.id,
      'TOGGLE_BLOG',
      `${published ? 'Published' : 'Unpublished'} blog: "${blog.title}"`
    );

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}