<<<<<<< HEAD
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
=======
import { PrismaClient } from '@prisma/client';
>>>>>>> admin

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
<<<<<<< HEAD
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
=======
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = prisma;

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
>>>>>>> admin
