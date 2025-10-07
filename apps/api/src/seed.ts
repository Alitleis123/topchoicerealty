import { connectDB } from './db.js';
import { User } from './models/User.js';
import { Listing } from './models/Listing.js';
import { hashPassword } from './services/auth.js';
import mongoose from 'mongoose';

const SEED_PASSWORD = 'test12345';

const agents = [
  {
    email: 'john.doe@topchoicerealty.com',
    name: 'Top Choice Realty Team',
    phone: '929-488-3666',
    photoUrl: '/src/assets/topchoicerealtypfp.jpg',
    bio: 'Our passion is Our clients. 🏠 Serving New York and New Jersey with dedication and expertise. Committed to finding you the perfect home.',
    role: 'agent' as const,
  },
  {
    email: 'jane.lee@topchoicerealty.com',
    name: 'Top Choice Realty',
    phone: '929-488-3666',
    photoUrl: '/src/assets/topchoicerealtypfp.jpg',
    bio: 'Expert real estate services across NY & NJ. Our passion is helping families find their dream homes. Professional, dedicated, and client-focused.',
    role: 'agent' as const,
  },
];

const neighborhoods = [
  'St. George',
  'Stapleton',
  'Tottenville',
  'Great Kills',
  'New Dorp',
  'Annadale',
  'Eltingville',
  'Huguenot',
];

const sampleListings = [
  {
    title: 'Beautiful Colonial Home with Water Views',
    address: '123 Seaside Ave',
    neighborhood: 'Great Kills',
    price: 750000,
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    description:
      'Stunning colonial-style home featuring breathtaking water views. This spacious property includes a modern kitchen with granite countertops, hardwood floors throughout, and a large backyard perfect for entertaining. Close to schools, shopping, and transportation.',
    imageUrls: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    ],
    status: 'active' as const,
  },
  {
    title: 'Modern Townhouse in Prime Location',
    address: '456 Victory Blvd',
    neighborhood: 'St. George',
    price: 625000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    description:
      'Contemporary townhouse in the heart of St. George. Features include an open floor plan, stainless steel appliances, central air, and a private rooftop deck with Manhattan views. Walk to ferry, restaurants, and cultural attractions.',
    imageUrls: [
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600607688960-e095ff83135b?w=800',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800',
    ],
    status: 'active' as const,
  },
  {
    title: 'Spacious Ranch with Updated Kitchen',
    address: '789 Hylan Blvd',
    neighborhood: 'New Dorp',
    price: 550000,
    beds: 3,
    baths: 2,
    sqft: 1600,
    description:
      'Charming ranch home with recently renovated kitchen and bathrooms. Large living room with fireplace, finished basement, and two-car garage. Beautifully landscaped yard with patio. Excellent condition and move-in ready.',
    imageUrls: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800',
      'https://images.unsplash.com/photo-1600566752229-250ed79470c1?w=800',
    ],
    status: 'active' as const,
  },
  {
    title: 'Luxury Waterfront Estate',
    address: '1000 Ocean Terrace',
    neighborhood: 'Tottenville',
    price: 1250000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    description:
      'Magnificent waterfront estate offering unparalleled luxury and privacy. Custom-built home with high-end finishes, gourmet kitchen, home theater, and wine cellar. Private dock and beach access. Truly one-of-a-kind property.',
    imageUrls: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    ],
    status: 'active' as const,
  },
  {
    title: 'Cozy Cape Cod Starter Home',
    address: '234 Richmond Ave',
    neighborhood: 'Eltingville',
    price: 425000,
    beds: 2,
    baths: 1,
    sqft: 1200,
    description:
      'Perfect starter home or investment property! Well-maintained Cape Cod style home with eat-in kitchen, hardwood floors, and full basement. Nice-sized yard with shed. Great opportunity for first-time buyers.',
    imageUrls: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ],
    status: 'active' as const,
  },
  {
    title: 'Updated Split-Level with Pool',
    address: '567 Amboy Rd',
    neighborhood: 'Huguenot',
    price: 685000,
    beds: 4,
    baths: 3,
    sqft: 2200,
    description:
      'Beautifully updated split-level home featuring an in-ground pool and spacious deck. Modern kitchen with island, renovated bathrooms, and finished basement with home office. Quiet neighborhood close to schools and parks.',
    imageUrls: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800',
    ],
    status: 'pending' as const,
  },
  {
    title: 'Classic Victorian with Original Details',
    address: '890 Castleton Ave',
    neighborhood: 'Stapleton',
    price: 595000,
    beds: 3,
    baths: 2,
    sqft: 2000,
    description:
      'Meticulously maintained Victorian home with original architectural details. High ceilings, decorative moldings, and stained glass windows. Updated systems while preserving historic charm. Large corner lot with wrap-around porch.',
    imageUrls: [
      'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800',
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
      'https://images.unsplash.com/photo-1600566752229-250ed79470c1?w=800',
    ],
    status: 'sold' as const,
  },
  {
    title: 'Brand New Construction',
    address: '345 Arthur Kill Rd',
    neighborhood: 'Annadale',
    price: 799000,
    beds: 4,
    baths: 3.5,
    sqft: 2800,
    description:
      'Never lived in! Brand new construction with all the latest features and finishes. Open concept living, chef\'s kitchen with quartz countertops, smart home technology, and energy-efficient systems. Two-car garage and professionally landscaped.',
    imageUrls: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    ],
    status: 'active' as const,
  },
];

async function seed() {
  try {
    console.log('🌱 Starting seed process...');

    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Listing.deleteMany({});

    // Create agents
    console.log('👤 Creating agents...');
    const passwordHash = await hashPassword(SEED_PASSWORD);

    const createdAgents = await User.insertMany(
      agents.map((agent) => ({
        ...agent,
        passwordHash,
      }))
    );

    console.log(`✅ Created ${createdAgents.length} agents:`);
    createdAgents.forEach((agent) => {
      console.log(`   - ${agent.name} (${agent.email})`);
    });

    // Create listings (distribute among agents)
    console.log('🏠 Creating listings...');
    const listingsWithAgents = sampleListings.map((listing, index) => ({
      ...listing,
      agentId: createdAgents[index % createdAgents.length]._id,
    }));

    const createdListings = await Listing.insertMany(listingsWithAgents);

    console.log(`✅ Created ${createdListings.length} listings`);

    console.log('\n🎉 Seed completed successfully!');
    console.log('\n📝 Test accounts:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    createdAgents.forEach((agent) => {
      console.log(`Email:    ${agent.email}`);
      console.log(`Password: ${SEED_PASSWORD}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });

    await mongoose.disconnect();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();

