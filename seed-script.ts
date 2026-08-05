import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

async function main() {
  console.log('Seeding data...')

  // 1. Seed Hero Sliders
  const heroSlides = [
    { image: '/dessie-city-hall.png', title: 'ደሴ ከተማ አስተዳደር', subtitle: 'Welcome to Dessie City Administration — Serving 500,000+ Citizens with Excellence', tag: 'GOVERNANCE' },
    { image: '/dessie-smart-center.png', title: 'Dessie Smart City 2025', subtitle: 'Advanced Digital Control Center — Real-Time City Monitoring & Governance', tag: 'TECHNOLOGY' },
    { image: '/heritage-landscape.png', title: 'ደሴ — የባህልና ቅርስ ከተማ', subtitle: 'Rich Amhara Culture, Ancient Heritage & Highland Traditions of Dessie', tag: 'CULTURE & HERITAGE' },
    { image: '/heritage-church.png', title: 'ቅዱስ ቦታዎችና ታሪክ', subtitle: 'Historic Ethiopian Orthodox Churches & Sacred Sites of Wollo — Centuries of Faith', tag: 'HISTORY' },
    { image: '/heritage-market.png', title: 'ደሴ ገበያ — ባህላዊ ሕይወት', subtitle: 'The Vibrant Dessie Merkato — Traditional Trade, Crafts & Community Life', tag: 'CULTURE' },
    { image: '/project-smart-city.png', title: 'Digital Dessie — ዲጂታል ደሴ', subtitle: 'Smart Governance, E-Services & IoT Infrastructure for 450,000+ Residents', tag: 'TECHNOLOGY' },
    { image: '/news-smart-city.png', title: 'ቴክኖሎጂ ለሁሉም — Tech For All', subtitle: 'Smart City Sensors, Digital Kiosks & Modern Governance Across Dessie City', tag: 'TECHNOLOGY' },
    { image: '/dessie-service-center.png', title: 'ዘመናዊ አገልግሎት ማዕከል', subtitle: 'Integrated One-Stop Service Hall — All Government Services Under One Roof', tag: 'SERVICES' },
    { image: '/news-infrastructure.png', title: 'Building the Future of ደሴ', subtitle: 'Modern Roads, Water Systems & Urban Infrastructure for All 12 Kebeles', tag: 'INFRASTRUCTURE' }
  ]

  await db.sliderImage.deleteMany({ where: { sliderType: 'hero' } })
  for (const [index, slide] of heroSlides.entries()) {
    await db.sliderImage.create({
      data: {
        ...slide,
        sliderType: 'hero',
        order: index,
        isActive: true,
        approvalStatus: 'approved'
      }
    })
  }

  // 2. Seed Promo Sliders
  const promoSlides = [
    { image: '/promo-cbe-real.png', title: 'Commercial Bank of Ethiopia', subtitle: 'Get your CBE card + 500 Birr Bonus! Full range of banking services at your nearest branch.', tag: 'BANKING', accentColor: '#6B21A8' },
    { image: '/promo-awash-real.png', title: 'Awash Bank', subtitle: '24/7 e-Branch ATM service across Dessie. Nurturing like the river — your trusted banking partner.', tag: 'BANKING', accentColor: '#1D4ED8' },
    { image: '/promo-dashen-real.png', title: 'Dashen Bank', subtitle: 'Pay with ease, shop with confidence. Visa card and modern digital banking solutions.', tag: 'BANKING', accentColor: '#1E3A5F' },
    { image: '/promo-ethiotel-real.jpeg', title: 'Ethio Telecom', subtitle: '50% discount on mobile transactions! Fast 4G/LTE and fiber internet keeping Dessie connected.', tag: 'TELECOM', accentColor: '#166534' },
    { image: '/promo-smart-city.png', title: 'Smart Dessie 2025', subtitle: 'Digital transformation is here — access all city services online with our new Smart City platform.', tag: 'GOVERNMENT', accentColor: '#0d4a28' },
    { image: '/promo-invest.png', title: 'Invest in Dessie', subtitle: 'New 500-hectare industrial zone with tax incentives. Join 15,000+ businesses thriving here.', tag: 'INVESTMENT', accentColor: '#92400E' },
    { image: '/promo-tourism.png', title: 'Visit Dessie', subtitle: 'Explore heritage sites, highland landscapes, and vibrant culture in the heart of Amhara Region.', tag: 'TOURISM', accentColor: '#0d4a28' }
  ]

  await db.sliderImage.deleteMany({ where: { sliderType: 'promo' } })
  for (const [index, slide] of promoSlides.entries()) {
    await db.sliderImage.create({
      data: {
        ...slide,
        sliderType: 'promo',
        order: index,
        isActive: true,
        approvalStatus: 'approved'
      }
    })
  }

  // 3. Seed Projects
  const projects = [
    { title: 'Smart City Platform', description: 'Digital infrastructure for smart governance, including IoT sensors, data analytics, and citizen-facing digital services platform.', image: '/project-smart-city.png', category: 'technology', status: 'In Progress', startDate: '2024-01-01', endDate: '2025-12-31', progress: 85, budget: 'ETB 120M', location: 'City Hall', department: 'IT Department', contractor: 'Ethio Telecom & Huawei', objectives: 'Digitize all city services and improve administrative efficiency by 40%.', photos: JSON.stringify(['/dessie-smart-center.png', '/project-smart-city.png']), citizensBenefited: 450000 },
    { title: 'Industrial Zone Phase 1', description: 'Developing a 500-hectare industrial zone with modern infrastructure to attract manufacturing and processing industries.', image: '/project-industrial.png', category: 'economy', status: 'In Progress', startDate: '2023-06-01', endDate: '2026-06-01', progress: 60, budget: 'ETB 500M', location: 'Kombolcha Road Corridor', department: 'Investment Bureau', contractor: 'CCCC Construction', objectives: 'Attract 50+ foreign investors and create 15,000 local jobs.', photos: JSON.stringify(['/project-industrial.png']), citizensBenefited: 15000 },
    { title: 'Road Network Expansion', description: 'Expanding and upgrading 120 km of city roads, including new arterial routes, pedestrian walkways, and drainage systems.', image: '/project-road.png', category: 'infrastructure', status: 'Completed', startDate: '2022-01-01', endDate: '2024-12-31', progress: 100, budget: 'ETB 350M', location: 'Citywide', department: 'Road Authority', contractor: 'Defense Construction', objectives: 'Reduce traffic congestion by 30% and improve road safety.', photos: JSON.stringify(['/project-road.png', '/news-infrastructure.png']), citizensBenefited: 300000 },
    { title: 'Water Treatment Plant', description: 'State-of-the-art water treatment facility to serve 150,000 residents, ensuring clean and reliable water supply.', image: '/project-water.png', category: 'infrastructure', status: 'In Progress', startDate: '2024-03-01', endDate: '2025-10-01', progress: 45, budget: 'ETB 280M', location: 'Borkena River Valley', department: 'Water & Sewerage', contractor: 'WaterWorks Enterprise', objectives: 'Increase clean water coverage to 95% of the city population.', photos: JSON.stringify(['/project-water.png']), citizensBenefited: 150000 },
    { title: 'Digital Learning Centers', description: '10 community digital learning centers equipped with computers, internet access, and vocational training tools.', image: '/project-education.png', category: 'education', status: 'Planned', startDate: '2025-09-01', endDate: '2027-09-01', progress: 0, budget: 'ETB 45M', location: 'All 10 Sub-cities', department: 'Education Bureau', contractor: 'TBA', objectives: 'Bridge the digital divide for 10,000 students annually.', photos: JSON.stringify(['/project-education.png']), citizensBenefited: 10000 },
    { title: 'New Hospital Construction', description: 'A 300-bed modern hospital to serve the growing population with emergency, surgical, and maternal health services.', image: '/project-healthcare.png', category: 'health', status: 'In Progress', startDate: '2023-01-01', endDate: '2025-06-01', progress: 70, budget: 'ETB 850M', location: 'Southern District', department: 'Health Bureau', contractor: 'Yotek Construction', objectives: 'Provide specialized healthcare services locally to reduce referrals to Addis Ababa.', photos: JSON.stringify(['/project-healthcare.png']), citizensBenefited: 500000 },
    { title: 'Affordable Housing Project', description: 'Affordable housing projects and urban development for growing families.', image: '/project-housing.png', category: 'housing', status: 'In Progress', startDate: '2022-05-01', endDate: '2026-05-01', progress: 40, budget: 'ETB 1.2B', location: 'Gerado Area', department: 'Housing Development', contractor: 'Flintstone Homes', objectives: 'Build 5,000 condominium units for low and middle-income citizens.', photos: JSON.stringify(['/project-housing.png']), citizensBenefited: 25000 },
    { title: 'Solar Energy Grid', description: 'Solar and renewable energy installations to power the city sustainably.', image: '/promo-invest.png', category: 'energy', status: 'Planned', startDate: '2026-01-01', endDate: '2028-01-01', progress: 0, budget: 'ETB 200M', location: 'Tossa Mountain Ridge', department: 'Energy Authority', contractor: 'TBA', objectives: 'Generate 50MW of renewable energy to supplement the national grid.', photos: JSON.stringify(['/promo-invest.png']), citizensBenefited: 500000 }
  ]

  await db.project.deleteMany({})
  for (const project of projects) {
    await db.project.create({
      data: {
        ...project,
        approvalStatus: 'approved'
      }
    })
  }

  // 4. Seed Hotels updaed updated
  const hotels = [
    { name: 'Dessie Grand Hotel', rating: 4, priceRange: 'ETB 3,500-8,000', location: 'City Center', phone: '+251 33 111 2233', email: 'info@dessiegrand.com', description: 'The premier hotel in Dessie offering luxury rooms, conference facilities, and fine dining with panoramic city views.', image: '/hotel-building.png' },
    { name: 'Mountain View Lodge', rating: 4, priceRange: 'ETB 2,800-6,500', location: 'Hillside', phone: '+251 33 111 4455', email: 'booking@mviewlodge.com', description: 'A peaceful hillside retreat with stunning mountain views, spa services, and traditional Ethiopian cuisine.', image: '/hotel-lobby.png' },
    { name: 'Blue Nile Hotel', rating: 3, priceRange: 'ETB 1,800-4,000', location: 'Piazza', phone: '+251 33 111 6677', email: 'reservations@blueniledessie.com', description: 'Conveniently located near the city center with comfortable rooms, free parking, and a popular restaurant.', image: '/hotel-room.png' },
    { name: 'Tana International', rating: 4, priceRange: 'ETB 2,500-5,500', location: 'Bole Road', phone: '+251 33 111 8899', email: 'info@tanaintl.com', description: 'Modern international-standard hotel with business center, fitness facility, and 24-hour room service.', image: '/hotel-food.png' },
    { name: 'Wollo Heritage Hotel', rating: 3, priceRange: 'ETB 1,500-3,500', location: 'Old Town', phone: '+251 33 111 1100', email: 'stay@wolloheritage.com', description: 'A charming hotel showcasing Wollo cultural heritage with traditional architecture and warm hospitality.', image: '/hotel-building.png' },
    { name: 'Starlight Resort & Spa', rating: 5, priceRange: 'ETB 5,000-15,000', location: 'Kombolcha Road', phone: '+251 33 111 3344', email: 'luxury@starlightdessie.com', description: 'The finest 5-star resort in the region featuring a full spa, infinity pool, gourmet dining, and event venues.', image: '/hotel-room.png' }
  ]

  await db.hotel.deleteMany({})
  for (const hotel of hotels) {
    await db.hotel.create({
      data: {
        ...hotel,
        approvalStatus: 'approved'
      }
    })
  }

  // 5. Seed Cabinet Members
  const cabinetMembers = [
    {
      name: 'Samuel Mollalign',
      title: 'City Mayor',
      department: "Mayor's Office",
      photo: '/cabinet_samuel.svg',
      bio: 'Samuel Mollalign serves as the Mayor of Dessie City Administration, leading the city toward sustainable urban development, smart governance, and prosperity for all citizens.',
      email: 'mayor@dessiecity.gov.et',
      phone: '+251-33-111-XXXX',
      order: 0,
    },
    {
      name: 'Mr. Ashenafi Alemayhu',
      title: 'Deputy Mayor',
      department: 'Urban Development',
      photo: '/cabinet_ashenafi.png',
      bio: 'Oversees urban development and coordinates key city administration initiatives.',
      email: 'deputy@dessiecity.gov.et',
      phone: '+251-33-111-XXXX',
      order: 1,
    },
    {
      name: 'Mr. Shemels Getachew',
      title: 'Cabinet Member',
      department: 'Urban Development',
      photo: '/cabinet_shemels.png',
      bio: 'Manages urban planning and infrastructure development programs.',
      email: 'urban@dessiecity.gov.et',
      phone: '+251-33-111-XXXX',
      order: 2,
    },
    {
      name: 'Mr. Seid Kassawu',
      title: 'Cabinet Member',
      department: 'Education Bureau',
      photo: '/cabinet_seid.png',
      bio: 'Leads education reform and digital learning initiatives across the city.',
      email: 'education@dessiecity.gov.et',
      phone: '+251-33-111-XXXX',
      order: 3,
    },
  ]

  await db.cabinetMember.deleteMany({})
  for (const member of cabinetMembers) {
    await db.cabinetMember.create({
      data: {
        ...member,
        socialLinks: '{}',
        approvalStatus: 'approved',
      }
    })
  }

  console.log('Seeded successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
