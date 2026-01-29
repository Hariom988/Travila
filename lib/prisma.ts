// lib/prisma.ts - PERMANENT FIX
import { PrismaClient } from '@prisma/client';

// Declare global variable for Prisma Client
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create Prisma Client instance with proper connection handling
export const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

// In development, store the client in global to prevent multiple instances
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Add connection lifecycle management
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});