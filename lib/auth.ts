// lib/auth.ts
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

const SALT_ROUNDS = 10;
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Find admin by email and verify password
export async function authenticateAdmin(
  email: string,
  password: string
) {
  try {
    // Find user with ADMIN role
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // User doesn't exist
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Check if user is admin
    if (user.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized access' };
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Success: return user data without password
    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: userWithoutPassword,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

// Create new admin user (for setup/registration)
export async function createAdminUser(
  email: string,
  password: string,
  name: string
) {
  try {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: 'Email already exists' };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN',
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return {
      success: true,
      data: userWithoutPassword,
    };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return { success: false, error: 'Failed to create admin' };
  }
}