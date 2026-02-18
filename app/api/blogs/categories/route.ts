// app/api/blogs/categories/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';
import { logActivity } from '@/lib/activity-logger';

// GET - Public: fetch all unique categories that have published blogs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const all = searchParams.get('all'); // admin: get all categories even with no published blogs

    const where = all ? {} : { published: true };

    const blogs = await prisma.blog.findMany({
      where,
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    const categories = blogs.map((b: { category: string }) => b.category).filter(Boolean);

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST - Admin only: this endpoint isn't needed for creation
// Categories are derived from blog posts themselves.
// But we expose a PATCH to rename a category across all blogs at once.
export async function PATCH(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) return unauthorizedResponse();

    const body = await request.json();
    const { oldCategory, newCategory } = body;

    if (!oldCategory?.trim() || !newCategory?.trim()) {
      return NextResponse.json({ error: 'Both oldCategory and newCategory are required' }, { status: 400 });
    }

    const result = await prisma.blog.updateMany({
      where: { category: oldCategory.trim() },
      data: { category: newCategory.trim() },
    });

    await logActivity(
      auth.id,
      'RENAME_CATEGORY',
      `Renamed category "${oldCategory}" to "${newCategory}" (${result.count} posts updated)`
    );

    return NextResponse.json({
      success: true,
      message: `Renamed "${oldCategory}" to "${newCategory}" across ${result.count} post(s)`,
      count: result.count,
    });
  } catch (error) {
    console.error('Error renaming category:', error);
    return NextResponse.json({ error: 'Failed to rename category' }, { status: 500 });
  }
}