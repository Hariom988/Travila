// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const hotel3 = await prisma.hotel.create({
    data: {
    name: "Urban Skyline Hotel",
    location: "New York City, USA",
    description: "Experience the heartbeat of Manhattan with floor-to-ceiling windows and a rooftop lounge.",
    pricePerNight: 350.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["WiFi", "Gym", "Rooftop Bar", "Conference Room"]
  }
  })
  const hotel4 = await prisma.hotel.create({
   data: {
    name: "Alpine Serenity Lodge",
    location: "Zermatt, Switzerland",
    description: "A cozy mountain retreat offering ski-in/ski-out access and breathtaking views of the Matterhorn.",
    pricePerNight: 420.00,
    available: false,
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2580&auto=format&fit=crop"],
    facilities: ["Fireplace", "Spa", "Ski Storage", "Heated Pool"]
  }
  })
  const hotel5 = await prisma.hotel.create({
   data: {
    name: "Zen Garden Roan",
    location: "Kyoto, Japan",
    description: "Traditional Japanese inn featuring tatami mats, sliding doors, and a peaceful private garden.",
    pricePerNight: 200.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2574&auto=format&fit=crop"],
    facilities: ["WiFi", "Tea Room", "Public Bath", "Garden"]
  }
  })
  const hotel6 = await prisma.hotel.create({
   data: {
    name: "Golden Dunes Palace",
    location: "Dubai, UAE",
    description: "Luxury in the middle of the desert with regal architecture and sunset camel rides.",
    pricePerNight: 650.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Pool", "AC", "Restaurant", "Desert Safari"]
  }
  })
  const hotel7 = await prisma.hotel.create({
   data:  {
    name: "Azure Cliff Suites",
    location: "Santonin, Greece",
    description: "Iconic white-washed architecture overlooking the Aegean Sea, perfect for romantic getaways.",
    pricePerNight: 550.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1613395877344-13d4c280d04f?q=80&w=2674&auto=format&fit=crop"],
    facilities: ["Infinity Pool", "Free Breakfast", "WiFi", "Balcony"]
  }
  })
  const hotel8 = await prisma.hotel.create({
   data:   {
    name: "Ubud Rainforest Sanctuary",
    location: "Bali, Indonesia",
    description: "Immerse yourself in nature with eco-friendly bamboo villas surrounded by lush jungle.",
    pricePerNight: 150.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2638&auto=format&fit=crop"],
    facilities: ["Yoga Deck", "Pool", "Spa", "Organic Restaurant"]
  }
  })
  const hotel9 = await prisma.hotel.create({
   data:   {
    name: "Le Petit Chare",
    location: "Paris, France",
    description: "A boutique hotel with vintage decor, located just steps away from the Eiffel Tower.",
    pricePerNight: 280.00,
    available: false,
    images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["WiFi", "Concierge", "Bar", "Pet Friendly"]
  }
  })
  const hotel10 = await prisma.hotel.create({
   data:   {
    name: "Savannah Wildlife Camp",
    location: "Kruger National Park, South Africa",
    description: "Luxury tented accommodation offering an authentic safari experience and game drives.",
    pricePerNight: 800.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Guided Tours", "Outdoor Shower", "Bonfire", "All-Inclusive"]
  }
  })
  console.log({ hotel3,hotel4,hotel5,hotel6,hotel7,hotel8,hotel9,hotel10  })
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