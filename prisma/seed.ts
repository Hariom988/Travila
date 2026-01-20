// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
import * as bcrypt from 'bcryptjs';
async function main() {
const adminEmail = "admin001@gmail.com";
const rawPassword = "admin@12345"; 
const hashedPassword = await bcrypt.hash(rawPassword, 12);
const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      name: "Admin",
      password: hashedPassword,
    },
  });
console.log(admin);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })