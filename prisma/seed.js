const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();

async function hashPassword(password) {
  return bcryptjs.hash(password, 10);
}

async function main() {
  try {
    const hashedPassword = await hashPassword('admin123');

    const admin = await prisma.user.create({
      data: {
        email: 'admin@hotelproject.com',
        password: hashedPassword,
        name: 'Hotel Admin',
        role: 'ADMIN',
      },
    });

    console.log('Admin created:', admin.email);
  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();