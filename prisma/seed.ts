// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // 1. Create a dummy Hotel
  const hotel1 = await prisma.hotel.create({
    data: {
      name: "Grand Luxury Resort",
      location: "Maldives",
      description: "A 5-star experience with over water villas and crystal clear waters.",
      pricePerNight: 500.00,
      available: true,
      images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2649&auto=format&fit=crop"],
      facilities: ["WiFi", "Pool", "Spa", "Private Beach"]
    }
  })

  const hotel2 = await prisma.hotel.create({
    data: {
      name: "Mountain View Cabin",
      location: "Swiss Alps",
      description: "Cozy cabin with fireplace and breathtaking mountain views.",
      pricePerNight: 250.00,
      available: true,
      images: ["https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2649&auto=format&fit=crop"],
      facilities: ["WiFi", "Fireplace", "Hiking Trails"]
    }
  })

  // 2. Create a dummy Activity
  const activity1 = await prisma.activity.create({
    data: {
      name: "Scuba Diving Adventure",
      location: "Maldives",
      description: "Explore the coral reefs with professional guides.",
      pricePerPerson: 120.00,
      duration: "3 hours",
      images: ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop"]
    }
  })

  console.log({ hotel1, hotel2, activity1 })
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