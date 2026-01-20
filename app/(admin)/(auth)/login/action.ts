"use server";

import { prisma } from "@/lib/prisma"; // Make sure your prisma path is correct
import bcrypt from "bcryptjs";

export async function authenticateAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) return { error: "Invalid email or password" };

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return { error: "Invalid email or password" };

    return { success: true };
  } catch (error) {
     console.error("SERVER ACTION ERROR:", error);
    return { error: "Database connection failed" };
  }
}