const { PrismaClient } = require('@prisma/client');
const bcryptjs = require('bcryptjs');

const prisma = new PrismaClient();
const activities = [
  {
    name: 'Taj Mahal Sunrise Tour',
    location: 'Agra, Uttar Pradesh',
    description: 'Experience the breathtaking beauty of Taj Mahal at sunrise with a guided tour including breakfast at a heritage hotel.',
    pricePerPerson: 2500,
    duration: '4 hours',
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657f1aabb?w=500',
    ],
  },
  {
    name: 'Goa Beach & Water Sports',
    location: 'Goa',
    description: 'Enjoy water sports activities including parasailing, jet skiing, and banana boat rides at Baga Beach with professional instructors.',
    pricePerPerson: 3500,
    duration: '3 hours',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500',
    ],
  },
  {
    name: 'Houseboat Backwater Cruise',
    location: 'Kochi, Kerala',
    description: 'Serene cruise through Kerala backwaters on a traditional houseboat with lunch, sunset views, and local culture experience.',
    pricePerPerson: 4000,
    duration: '6 hours',
    images: [
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500',
    ],
  },
  {
    name: 'Rajasthan Desert Safari',
    location: 'Jaisalmer, Rajasthan',
    description: 'Thrilling camel safari across the golden Thar Desert with a traditional folk performance and dinner under the stars.',
    pricePerPerson: 3000,
    duration: '5 hours',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500',
    ],
  },
  {
    name: 'Himalayan Trekking Adventure',
    location: 'Manali, Himachal Pradesh',
    description: 'Exciting trek through the Himalayan mountains with stunning views, camping, and authentic local food experiences.',
    pricePerPerson: 5500,
    duration: 'Full Day (8 hours)',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    ],
  },
  {
    name: 'Taj Mahal & Agra Fort Tour',
    location: 'Agra, Uttar Pradesh',
    description: 'Comprehensive guided tour of Taj Mahal and Agra Fort with skip-the-line access and expert historical commentary.',
    pricePerPerson: 2000,
    duration: '5 hours',
    images: [
      'https://images.unsplash.com/photo-1564507592333-c60657f1aabb?w=500',
    ],
  },
  {
    name: 'Ayurveda Wellness Retreat',
    location: 'Kottayam, Kerala',
    description: 'Traditional Ayurvedic treatments, yoga sessions, and wellness programs with accommodation in a serene retreat center.',
    pricePerPerson: 6000,
    duration: '2 Days',
    images: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500',
    ],
  },
  {
    name: 'Mumbai City Food Tour',
    location: 'Mumbai, Maharashtra',
    description: 'Culinary journey through Mumbai exploring street food, local eateries, and famous food markets with a food guide.',
    pricePerPerson: 1800,
    duration: '3 hours',
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561231?w=500',
    ],
  },
  {
    name: 'White Water Rafting Adventure',
    location: 'Rishikesh, Uttarakhand',
    description: 'Thrilling white water rafting in the Ganges River with professional guides, safety equipment, and riverside picnic.',
    pricePerPerson: 2800,
    duration: '4 hours',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    ],
  },
  {
    name: 'Jaipur Pink City Heritage Walk',
    location: 'Jaipur, Rajasthan',
    description: 'Walking tour of Jaipur exploring historic palaces, vibrant markets, and architectural marvels of the Pink City with cultural insights.',
    pricePerPerson: 1500,
    duration: '4 hours',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    ],
  },
];
async function hashPassword(password) {
  return bcryptjs.hash(password, 10);
}

async function main() {
  try {
    // {    const hashedPassword = await hashPassword('admin123');
    // const admin = await prisma.user.upsert({
    //   where: { email: 'admin@hotelproject.com' },
    //   update: {},
    //   create: {
    //     email: 'admin@hotelproject.com',
    //     password: hashedPassword,
    //     name: 'Hotel Admin',
    //     role: 'ADMIN',
    //   },
    // });
    // console.log('✅ Admin user ensured:', admin.email);}
    for (const activity of activities) {
      await prisma.activity.create({
        data: {
          name: activity.name,
          location: activity.location,
          description: activity.description,
          pricePerPerson: activity.pricePerPerson,
          duration: activity.duration,
          images: activity.images,
        },
      });
    }
    console.log('✓ Created 10 dummy activities');
    console.log('\nActivities created:');
    activities.forEach((a) => console.log(`  - ${a.name} (₹${a.pricePerPerson})`));
  } catch (error) {
    console.error('Error seeding activities:', error);
    process.exit(1);

  } finally {
    await prisma.$disconnect();
  }
}

main();