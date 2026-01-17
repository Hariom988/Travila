// prisma/seed.ts
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
const hotel1 = await prisma.hotel.create({
  data: {
    name: "Azure Paradise Resort",
    location: "Maldives",
    description: "Overwater bungalows with direct ocean access and private infinity pools.",
    pricePerNight: 1200.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2574&auto=format&fit=crop"],
    facilities: ["Pool", "Spa", "WiFi", "Private Beach", "Bar"]
  }
});

const hotel2 = await prisma.hotel.create({
  data: {
    name: "Tech Plaza Tokyo",
    location: "Tokyo, Japan",
    description: "Located in the heart of Shinjuku, perfect for business travelers with high-speed internet.",
    pricePerNight: 220.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["WiFi", "Conference Room", "Gym", "Restaurant", "Laundry"]
  }
});

const hotel3 = await prisma.hotel.create({
  data: {
    name: "Elysian Suites",
    location: "Paris, France",
    description: "Classic French architecture with views of the Eiffel Tower and gourmet room service.",
    pricePerNight: 850.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Spa", "WiFi", "Room Service", "Bar", "Pet Friendly"]
  }
});

const hotel4 = await prisma.hotel.create({
  data: {
    name: "Backpacker Haven",
    location: "Lisbon, Portugal",
    description: "A vibrant hostel with shared social spaces, perfect for meeting fellow travelers.",
    pricePerNight: 35.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1555854743-e3c2f6a581ad?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["WiFi", "Shared Kitchen", "Lockers", "Laundry"]
  }
});

const hotel5 = await prisma.hotel.create({
  data: {
    name: "Alpine Peaks Lodge",
    location: "Zermatt, Switzerland",
    description: "Cozy timber lodge with fireplace, offering ski-in/ski-out access.",
    pricePerNight: 400.00,
    available: false, // Good for testing availability filter
    images: ["https://images.unsplash.com/photo-1512918760532-3ad860030ce1?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Fireplace", "Spa", "Restaurant", "WiFi", "Gym"]
  }
});

const hotel6 = await prisma.hotel.create({
  data: {
    name: "Sunshine Family Stay",
    location: "Orlando, USA",
    description: "Spacious suites near theme parks with a massive kids' pool area.",
    pricePerNight: 180.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Pool", "Parking", "WiFi", "Breakfast Included", "Family Rooms"]
  }
});

const hotel7 = await prisma.hotel.create({
  data: {
    name: "Dune Palace",
    location: "Dubai, UAE",
    description: "Experience luxury in the desert with camel rides and gold-accented interiors.",
    pricePerNight: 600.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2525&auto=format&fit=crop"],
    facilities: ["Pool", "AC", "Restaurant", "Spa", "Parking"]
  }
});

const hotel8 = await prisma.hotel.create({
  data: {
    name: "Green Canopy Eco-Lodge",
    location: "Monteverde, Costa Rica",
    description: "Sustainable treehouses immersed in the cloud forest.",
    pricePerNight: 150.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2674&auto=format&fit=crop"],
    facilities: ["Hiking", "Breakfast Included", "WiFi", "Parking"]
  }
});

const hotel9 = await prisma.hotel.create({
  data: {
    name: "Villa Antica",
    location: "Rome, Italy",
    description: "Stay in a renovated 16th-century villa just steps from the Colosseum.",
    pricePerNight: 280.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1529290130-4ca3753253ae?q=80&w=2676&auto=format&fit=crop"],
    facilities: ["WiFi", "Terrace", "Bar", "AC"]
  }
});

const hotel10 = await prisma.hotel.create({
  data: {
    name: "Urban Loft Berlin",
    location: "Berlin, Germany",
    description: "Industrial-chic design with a rooftop bar and co-working space.",
    pricePerNight: 95.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop"],
    facilities: ["WiFi", "Bar", "Pet Friendly", "Work Space"]
  }
});

const hotel11 = await prisma.hotel.create({
  data: {
    name: "Bamboo Beach Huts",
    location: "Phuket, Thailand",
    description: "Simple, elegant bamboo huts right on the sand.",
    pricePerNight: 60.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Beach Access", "WiFi", "Restaurant", "Massage"]
  }
});

const hotel12 = await prisma.hotel.create({
  data: {
    name: "Tuscan Vineyard Estate",
    location: "Florence, Italy",
    description: "Relax in the rolling hills with wine tasting tours included.",
    pricePerNight: 250.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Pool", "Parking", "Breakfast Included", "WiFi"]
  }
});

const hotel13 = await prisma.hotel.create({
  data: {
    name: "Pod Inn",
    location: "Osaka, Japan",
    description: "Efficient and futuristic sleeping pods for the solo traveler.",
    pricePerNight: 25.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["WiFi", "Shared Bathroom", "24h Check-in"]
  }
});

const hotel14 = await prisma.hotel.create({
  data: {
    name: "Savanna King Camp",
    location: "Nairobi, Kenya",
    description: "Luxury tents with views of the wildlife migration.",
    pricePerNight: 750.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Pool", "Meals Included", "Guide", "Bar"]
  }
});

const hotel15 = await prisma.hotel.create({
  data: {
    name: "Marina Bay View",
    location: "Singapore",
    description: "Iconic hotel with the world's largest rooftop infinity pool.",
    pricePerNight: 450.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1565031491318-a3f2a7043c79?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Pool", "Gym", "Spa", "WiFi", "Restaurant"]
  }
});

const hotel16 = await prisma.hotel.create({
  data: {
    name: "Bondi Breeze",
    location: "Sydney, Australia",
    description: "Surf-inspired rooms overlooking the famous Bondi Beach.",
    pricePerNight: 320.00,
    available: false,
    images: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["WiFi", "Parking", "Beach Access", "AC"]
  }
});

const hotel17 = await prisma.hotel.create({
  data: {
    name: "Lake Louise Cabin",
    location: "Banff, Canada",
    description: "Rustic wooden cabins with breathtaking lake and mountain views.",
    pricePerNight: 210.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Fireplace", "Parking", "Hiking", "Kitchen"]
  }
});

const hotel18 = await prisma.hotel.create({
  data: {
    name: "Gaudi's Retreat",
    location: "Barcelona, Spain",
    description: "Colorful and quirky rooms inspired by Catalan modernism.",
    pricePerNight: 190.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1525596662741-e94ff9f26de1?q=80&w=2574&auto=format&fit=crop"],
    facilities: ["WiFi", "Rooftop Bar", "AC", "Breakfast Included"]
  }
});

const hotel19 = await prisma.hotel.create({
  data: {
    name: "Central Park Suites",
    location: "New York City, USA",
    description: "Executive suites with panoramic views of Central Park.",
    pricePerNight: 550.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1496417263034-38ec4f0d6b21?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Gym", "Conference Room", "WiFi", "Concierge"]
  }
});

const hotel20 = await prisma.hotel.create({
  data: {
    name: "Aurora Ice Hotel",
    location: "Reykjavik, Iceland",
    description: "A once-in-a-lifetime experience sleeping in rooms sculpted from ice.",
    pricePerNight: 650.00,
    available: true,
    images: ["https://images.unsplash.com/photo-1518182170546-0766be6f5a56?q=80&w=2670&auto=format&fit=crop"],
    facilities: ["Bar", "Spa", "Breakfast Included", "Parking"]
  }
});
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