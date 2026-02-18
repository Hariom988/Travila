
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/apiAuth';

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
    });
    return NextResponse.json({ success: true, categories: categories.map((c:{name:string}) => c.name) });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) return unauthorizedResponse();

    const { name } = await request.json();
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const category = await prisma.blogCategory.create({
      data: { name: name.trim() },
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) return unauthorizedResponse();

    const { oldName, newName } = await request.json();
    if (!oldName?.trim() || !newName?.trim()) {
      return NextResponse.json({ error: 'Both oldName and newName are required' }, { status: 400 });
    }

    const [updated, postsUpdated] = await prisma.$transaction([
      prisma.blogCategory.update({
        where: { name: oldName.trim() },
        data: { name: newName.trim() },
      }),
      prisma.blog.updateMany({
        where: { category: oldName.trim() },
        data: { category: newName.trim() },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Renamed "${oldName}" to "${newName}" — ${postsUpdated.count} post(s) updated`,
      count: postsUpdated.count,
    });
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'A category with that name already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to rename category' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth) return unauthorizedResponse();

    const { name } = await request.json();
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    await prisma.blogCategory.delete({ where: { name: name.trim() } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}