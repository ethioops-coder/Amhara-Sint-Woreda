'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
import useSWR from 'swr'
import { fetcherArray } from '@/lib/fetcher'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { useLang } from '@/lib/LangContext'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import type { PageId } from '@/lib/types'
import {
  FileText, Briefcase, Building2, MapPin, Receipt, Heart,
  Stethoscope, GraduationCap, Bus, Zap, MessageSquare, Calendar,
  ChevronDown, ChevronLeft, ChevronRight, Users, Ruler, Landmark,
  Banknote, UserCheck, Factory, Route, CheckCircle, Mountain, Music,
  Star, CloudSun, Droplets, Wind, Sunrise, ArrowRight, Sparkles,
  Clock, Gavel, Navigation, Phone, Building, Mail, Shield, Download, BookOpen, Scale, ClipboardList, Newspaper, Search, User, Share2, CalendarDays
} from 'lucide-react'

/* ─────────────────── Animated Counter ─────────────────── */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const controls = animate(motionVal, value, {
            duration: 2,
            ease: 'easeOut',
          })
          const unsub = motionVal.on('change', (v) => {
            el.textContent = `${Math.round(v).toLocaleString()}${suffix}`
          })
          controls.then(() => {
            el.textContent = `${value.toLocaleString()}${suffix}`
            unsub()
          })
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value, suffix, motionVal])

  return <span ref={ref}>0{suffix}</span>
}

/* ─────────────────── Data Constants ─────────────────── */
const serviceCards = [
  { title: 'Birth Registration', icon: FileText, desc: 'Register births and obtain official certificates for newborns.' },
  { title: 'Business License', icon: Briefcase, desc: 'Apply for and renew business operating licenses online.' },
  { title: 'Building Permit', icon: Building2, desc: 'Submit building plans and obtain construction permits.' },
  { title: 'Land Services', icon: MapPin, desc: 'Access land registration, title deeds, and land use information.' },
  { title: 'Tax Payment', icon: Receipt, desc: 'Pay city taxes, property taxes, and other municipal fees.' },
  { title: 'Marriage Registration', icon: Heart, desc: 'Register marriages and obtain official marriage certificates.' },
  { title: 'Health Services', icon: Stethoscope, desc: 'Access public health programs, clinics, and health information.' },
  { title: 'Education', icon: GraduationCap, desc: 'Find schools, scholarship programs, and educational resources.' },
  { title: 'Transportation', icon: Bus, desc: 'Public transit schedules, routes, and transportation services.' },
  { title: 'Water & Electricity', icon: Zap, desc: 'Utility connections, billing, and service requests.' },
  { title: 'Complaints', icon: MessageSquare, desc: 'Submit and track complaints and service feedback.' },
  { title: 'Appointments', icon: Calendar, desc: 'Book appointments with city offices and departments.' },
]

const serviceDetails: Record<string, {
  fullDescription: string
  requirements: string[]
  documents: string[]
  steps: string[]
  fees: string
  processingTime: string
  office: string
  contact: string
  hours: string
}> = {
  'Birth Registration': {
    fullDescription: 'Register births within 30 days of delivery and obtain official birth certificates from the City Civil Registry Office. This service is available at all kebele administration offices across Dessie city.',
    requirements: ['Child born within Dessie city limits', 'Parent or legal guardian must apply', 'Hospital birth notification or witness testimony', 'Valid identification of parent/guardian'],
    documents: ['Hospital birth notification', 'Parent ID card (copy)', 'Marriage certificate (if applicable)', 'Two passport-size photos of child'],
    steps: ['Visit your nearest kebele office', 'Submit required documents', 'Information verified by registrar', 'Certificate issued within 3 working days', 'Collect certificate in person'],
    fees: 'Free for all citizens', processingTime: '3 working days', office: 'Civil Registry Office, City Hall', contact: '+251 33 111 2233', hours: 'Mon–Fri, 8:30 AM – 5:00 PM'
  },
  'Business License': {
    fullDescription: 'Apply for new business operating licenses or renew existing ones. All businesses operating within Dessie city must hold a valid license from the Trade & Industry Bureau.',
    requirements: ['Ethiopian citizen or legally registered foreign entity', 'Valid business name reservation', 'Duly filled application form', 'Compliance with zoning regulations'],
    documents: ['Completed application form', 'Trade name reservation certificate', 'Lease agreement or ownership document', 'Passport-size photos (2)', 'Previous license (for renewal)', 'Tax clearance certificate'],
    steps: ['Submit application online or at Trade Bureau', 'Pay processing fee at designated bank', 'Document review by licensing officer', 'Site inspection (if required)', 'License issued and collected'],
    fees: 'ETB 500 – 5,000 (varies by business type)', processingTime: '5–10 working days', office: 'Trade & Industry Bureau, 2nd Floor City Hall', contact: '+251 33 111 2244', hours: 'Mon–Fri, 8:30 AM – 5:00 PM'
  },
  'Building Permit': {
    fullDescription: 'Submit building plans and obtain construction permits for residential, commercial, and industrial buildings within Dessie city jurisdiction.',
    requirements: ['Land ownership or lease agreement', 'Approved architectural plan', 'Structural engineering approval', 'Environmental impact assessment (for large projects)'],
    documents: ['Land lease/title deed', 'Architectural drawings (3 sets)', 'Structural analysis report', 'Geotechnical survey report', 'Contractor license copy', 'Neighbor consent letters (if applicable)'],
    steps: ['Submit application with all documents', 'Technical review by engineering dept', 'Site verification inspection', 'Pay permit fee', 'Permit certificate issued'],
    fees: 'ETB 2,000 – 50,000 (based on project size)', processingTime: '10–21 working days', office: 'Works & Urban Development Bureau', contact: '+251 33 111 2255', hours: 'Mon–Fri, 8:30 AM – 4:30 PM'
  },
  'Land Services': {
    fullDescription: 'Access land registration, title deeds, land use certificates, and land transfer services. Manage your property records through the Land Administration Office.',
    requirements: ['Proof of land acquisition or allocation', 'Valid identification', 'No outstanding land disputes', 'Compliance with city master plan'],
    documents: ['Land allocation letter or purchase agreement', 'Previous title deed (if transferring)', 'ID card or passport', 'Passport photos (3)', 'Tax payment receipts', 'Neighborhood clearance letter'],
    steps: ['Submit application at Land Office', 'Document verification and review', 'Field survey and boundary confirmation', 'Public notice period (14 days)', 'New title deed issued'],
    fees: 'ETB 1,000 – 10,000', processingTime: '14–30 working days', office: 'Land Administration Bureau', contact: '+251 33 111 2266', hours: 'Mon–Fri, 8:30 AM – 4:30 PM'
  },
  'Tax Payment': {
    fullDescription: 'Pay city taxes including property tax, business tax, and other municipal fees. View your tax records and download payment receipts online.',
    requirements: ['Registered taxpayer or property owner', 'Active tax identification number (TIN)', 'Current tax assessment notice'],
    documents: ['TIN certificate', 'Tax assessment notice', 'Property ownership document (for property tax)', 'Previous payment receipts (optional)'],
    steps: ['View your tax assessment online or at office', 'Calculate total amount due', 'Pay at designated bank or online', 'Obtain payment receipt', 'Update your tax records'],
    fees: 'Varies by tax type and assessment', processingTime: 'Immediate (online) / 1–2 days (office)', office: 'Revenue Bureau, Ground Floor City Hall', contact: '+251 33 111 2277', hours: 'Mon–Fri, 8:00 AM – 5:00 PM'
  },
  'Marriage Registration': {
    fullDescription: 'Register marriages and obtain official marriage certificates. This service is provided by the Civil Registry Office in collaboration with kebele administrations.',
    requirements: ['Both parties must be present', 'Minimum age of 18 years', 'No existing marriage (or legal divorce decree)', 'Two adult witnesses'],
    documents: ['Valid ID cards of both parties', 'Passport-size photos (2 each)', 'Divorce decree or death certificate (if applicable)', 'Parental consent (if under 18)', 'Witness ID copies (2)'],
    steps: ['Book appointment online or at kebele office', 'Appear in person with partner and witnesses', 'Submit all required documents', 'Marriage officer conducts ceremony / registration', 'Marriage certificate issued same day'],
    fees: 'ETB 200', processingTime: 'Same day', office: 'Civil Registry Office, City Hall', contact: '+251 33 111 2233', hours: 'Mon–Fri, 8:30 AM – 5:00 PM'
  },
  'Health Services': {
    fullDescription: 'Access public health programs, community clinics, vaccination schedules, health education resources, and emergency health services across Dessie city.',
    requirements: ['Resident of Dessie city', 'Valid identification', 'Health card (for repeat visits)'],
    documents: ['ID card', 'Health insurance card (if applicable)', 'Previous medical records (if available)', 'Referral letter (for specialist care)'],
    steps: ['Visit nearest health center or hospital', 'Register at reception', 'Consultation with health professional', 'Receive treatment or referral', 'Follow-up as scheduled'],
    fees: 'Free for basic services; minimal fees for specialized care', processingTime: 'Varies by service', office: 'City Health Bureau', contact: '+251 33 111 2288', hours: '24/7 emergency; clinics Mon–Fri 8:00 AM – 5:00 PM'
  },
  'Education': {
    fullDescription: 'Find information about public schools, scholarship programs, adult education, and educational resources available through the Dessie City Education Bureau.',
    requirements: ['Resident of Dessie city (for public schools)', 'Age-appropriate enrollment', 'Previous academic records (for transfers)', 'Meet scholarship eligibility criteria'],
    documents: ['Student ID or birth certificate', 'Previous school transcripts', 'Parent/guardian ID', 'Passport photos (2)', 'Scholarship application form (if applicable)'],
    steps: ['Visit the Education Bureau or school', 'Submit enrollment or scholarship application', 'Document review and verification', 'Placement or award notification', 'Registration and enrollment confirmed'],
    fees: 'Free for public schools; scholarship applications are free', processingTime: '3–7 working days for scholarship review', office: 'Education Bureau, City Hall Annex', contact: '+251 33 111 2299', hours: 'Mon–Fri, 8:30 AM – 4:30 PM'
  },
  'Transportation': {
    fullDescription: 'Access public transit schedules, routes, transportation permits, and driver license services. Plan your commute and stay informed about road conditions.',
    requirements: ['Valid ID for services', 'Vehicle registration (for transit permits)', 'Medical certificate (for driver license)'],
    documents: ['Application form', 'ID card', 'Medical fitness certificate', 'Vehicle registration document', 'Insurance certificate', 'Previous license (for renewal)'],
    steps: ['Visit Transportation Office or check online', 'Submit application and documents', 'Pay applicable fees', 'Attend testing/inspection if required', 'Receive permit or license'],
    fees: 'ETB 300 – 2,000 (varies by service)', processingTime: '5–15 working days', office: 'Transportation Bureau', contact: '+251 33 111 3300', hours: 'Mon–Fri, 8:30 AM – 5:00 PM'
  },
  'Water & Electricity': {
    fullDescription: 'Request new utility connections, pay bills, report service issues, and manage your water and electricity accounts through the Municipal Utility Office.',
    requirements: ['Property ownership or rental agreement', 'Valid identification', 'No outstanding utility bills (for new connection)', 'Compliance with building codes'],
    documents: ['ID card', 'Property deed or lease agreement', 'Building permit copy', 'Completed connection application', 'Previous bill receipts (for transfers)'],
    steps: ['Submit application at Utility Office', 'Site assessment and inspection', 'Pay connection fee', 'Installation scheduled', 'Service activated and meter installed'],
    fees: 'Connection: ETB 2,000 – 15,000; Monthly bills vary', processingTime: '7–14 working days for new connections', office: 'Municipal Utility Office', contact: '+251 33 111 3311', hours: 'Mon–Fri, 8:00 AM – 5:00 PM'
  },
  'Complaints': {
    fullDescription: 'Submit, track, and resolve complaints about city services. All complaints are logged, assigned, and tracked until resolution with status updates via SMS or email.',
    requirements: ['Describe the issue clearly', 'Provide your contact information', 'Include evidence if available (photos, documents)', 'Complaint must relate to city services'],
    documents: ['ID card (optional)', 'Supporting evidence (photos, documents)', 'Previous complaint reference (for follow-up)'],
    steps: ['Submit complaint online or at office', 'Receive complaint reference number', 'Complaint reviewed and assigned', 'Investigation conducted', 'Resolution communicated; you can rate the outcome'],
    fees: 'Free', processingTime: '3–14 working days (varies by complexity)', office: 'Customer Service Center, City Hall', contact: '+251 33 111 2222', hours: 'Mon–Fri, 8:00 AM – 5:00 PM'
  },
  'Appointments': {
    fullDescription: 'Book appointments with city offices and departments to avoid long wait times. Schedule visits for permits, registrations, consultations, and other services.',
    requirements: ['Valid identification', 'Know which department you need', 'Contact phone number for confirmation'],
    documents: ['ID card', 'Relevant service documents (depending on purpose)'],
    steps: ['Select department and service type', 'Choose preferred date and time slot', 'Provide your contact details', 'Receive confirmation via SMS/email', 'Visit on schedule with required documents'],
    fees: 'Free', processingTime: 'Instant booking', office: 'All City Offices', contact: '+251 33 111 2222', hours: 'Mon–Fri, 8:30 AM – 5:00 PM'
  },
}

const statCards = [
  { label: 'Population', value: 450000, suffix: '+', icon: Users },
  { label: 'Area', value: 254, suffix: ' km²', icon: Ruler },
  { label: 'Kebeles', value: 12, suffix: '', icon: MapPin },
  { label: 'Hospitals', value: 8, suffix: '', icon: Stethoscope },
  { label: 'Health Centers', value: 15, suffix: '', icon: Heart },
  { label: 'Schools', value: 45, suffix: '+', icon: GraduationCap },
  { label: 'Universities', value: 3, suffix: '', icon: GraduationCap },
  { label: 'Annual Budget', value: 2, suffix: '.8B ETB', icon: Banknote },
]

const heroSlides = [
  // Default Main Image
  {
    image: '/dessie-city-hall.png',
    title: 'ደሴ ከተማ አስተዳደር',
    subtitle: 'Welcome to Dessie City Administration — Serving 500,000+ Citizens with Excellence',
    tag: 'GOVERNANCE',
  },
  {
    image: '/dessie-smart-center.png',
    title: 'Dessie Smart City 2025',
    subtitle: 'Advanced Digital Control Center — Real-Time City Monitoring & Governance',
    tag: 'TECHNOLOGY',
  },
  {
    image: '/heritage-landscape.png',
    title: 'ደሴ — የባህልና ቅርስ ከተማ',
    subtitle: 'Rich Amhara Culture, Ancient Heritage & Highland Traditions of Dessie',
    tag: 'CULTURE & HERITAGE',
  },
  {
    image: '/heritage-church.png',
    title: 'ቅዱስ ቦታዎችና ታሪክ',
    subtitle: 'Historic Ethiopian Orthodox Churches & Sacred Sites of Wollo — Centuries of Faith',
    tag: 'HISTORY',
  },
  {
    image: '/heritage-market.png',
    title: 'ደሴ ገበያ — ባህላዊ ሕይወት',
    subtitle: 'The Vibrant Dessie Merkato — Traditional Trade, Crafts & Community Life',
    tag: 'CULTURE',
  },
  {
    image: '/project-smart-city.png',
    title: 'Digital Dessie — ዲጂታል ደሴ',
    subtitle: 'Smart Governance, E-Services & IoT Infrastructure for 450,000+ Residents',
    tag: 'TECHNOLOGY',
  },
  {
    image: '/news-smart-city.png',
    title: 'ቴክኖሎጂ ለሁሉም — Tech For All',
    subtitle: 'Smart City Sensors, Digital Kiosks & Modern Governance Across Dessie City',
    tag: 'TECHNOLOGY',
  },
  {
    image: '/dessie-service-center.png',
    title: 'ዘመናዊ አገልግሎት ማዕከል',
    subtitle: 'Integrated One-Stop Service Hall — All Government Services Under One Roof',
    tag: 'SERVICES',
  },
  {
    image: '/news-infrastructure.png',
    title: 'Building the Future of ደሴ',
    subtitle: 'Modern Roads, Water Systems & Urban Infrastructure for All 12 Kebeles',
    tag: 'INFRASTRUCTURE',
  },
]

const hotelImagesAll = [
  ['/hotel-building.png', '/hotel-room.png', '/hotel-food.png'],
  ['/hotel-lobby.png', '/hotel-building.png', '/hotel-room.png'],
  ['/hotel-room.png', '/hotel-food.png', '/hotel-lobby.png'],
  ['/hotel-food.png', '/hotel-room.png', '/hotel-building.png'],
  ['/hotel-building.png', '/hotel-lobby.png', '/hotel-food.png'],
  ['/hotel-room.png', '/hotel-building.png', '/hotel-lobby.png'],
]

const hotels = [
  { name: 'Dessie Grand Hotel', stars: 4, price: 'ETB 3,500-8,000', location: 'City Center', phone: '+251 33 111 2233', email: 'info@dessiegrand.com', desc: 'The premier hotel in Dessie offering luxury rooms, conference facilities, and fine dining with panoramic city views.' },
  { name: 'Mountain View Lodge', stars: 4, price: 'ETB 2,800-6,500', location: 'Hillside', phone: '+251 33 111 4455', email: 'booking@mviewlodge.com', desc: 'A peaceful hillside retreat with stunning mountain views, spa services, and traditional Ethiopian cuisine.' },
  { name: 'Blue Nile Hotel', stars: 3, price: 'ETB 1,800-4,000', location: 'Piazza', phone: '+251 33 111 6677', email: 'reservations@blueniledessie.com', desc: 'Conveniently located near the city center with comfortable rooms, free parking, and a popular restaurant.' },
  { name: 'Tana International', stars: 4, price: 'ETB 2,500-5,500', location: 'Bole Road', phone: '+251 33 111 8899', email: 'info@tanaintl.com', desc: 'Modern international-standard hotel with business center, fitness facility, and 24-hour room service.' },
  { name: 'Wollo Heritage Hotel', stars: 3, price: 'ETB 1,500-3,500', location: 'Old Town', phone: '+251 33 111 1100', email: 'stay@wolloheritage.com', desc: 'A charming hotel showcasing Wollo cultural heritage with traditional architecture and warm hospitality.' },
  { name: 'Starlight Resort & Spa', stars: 5, price: 'ETB 5,000-15,000', location: 'Kombolcha Road', phone: '+251 33 111 3344', email: 'luxury@starlightdessie.com', desc: 'The finest 5-star resort in the region featuring a full spa, infinity pool, gourmet dining, and event venues.' },
]

const featuredProjects = [
  { title: 'Smart City', desc: 'Digital transformation of all city services and citizen engagement platforms.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80', color: 'emerald' },
  { title: 'Industrial Zone', desc: '500 Haktar zone to attract manufacturing investment and create jobs.', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', color: 'amber' },
  { title: 'Road Network', desc: 'Expanding arterial roads, walkways, and modern traffic management.', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80', color: 'blue' },
  { title: 'Water & Sanitation', desc: 'Modern water supply and sanitation infrastructure for all residents.', image: 'https://images.unsplash.com/photo-1519822550275-9e6b46142e03?auto=format&fit=crop&w=1200&q=80', color: 'cyan' },
  { title: 'Education Hub', desc: 'New schools, vocational centers, and digital learning programs.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80', color: 'purple' },
  { title: 'Healthcare', desc: 'Upgrading hospitals, clinics, and community health programs citywide.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80', color: 'red' },
  { title: 'Housing', desc: 'Affordable housing projects and urban development for growing families.', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80', color: 'orange' },
  { title: 'Green Energy', desc: 'Solar and renewable energy installations to power the city sustainably.', image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80', color: 'lime' },
]

const heritagePlaces = [
  { name: 'Dessie Fortress (Yekatit 12 Monument)', image: '/heritage-fortress.png', description: 'A historic stone fortress that played a significant role during the Italian occupation. Today it stands as a memorial and museum honoring the heroes who fought for Ethiopian independence.' },
  { name: 'Tossa Mountain Heritage Site', image: '/heritage-landscape.png', description: 'A sacred mountain site offering panoramic views of Dessie and the surrounding Amhara highlands. The site features ancient rock formations and holds cultural significance for the local community.' },
  { name: 'Borkena River Valley', image: '/heritage-waterfall.png', description: 'The scenic Borkena River valley features beautiful waterfalls, lush vegetation, and diverse birdlife. It is a popular destination for nature lovers and photographers.' },
  { name: 'Kidane Mehret Church', image: '/heritage-church.png', description: 'An historic Ethiopian Orthodox church dating back over a century, featuring beautiful traditional architecture, religious murals, and a peaceful courtyard garden.' },
  { name: 'Dessie Traditional Market (Merkato)', image: '/heritage-market.png', description: 'A vibrant open-air market where locals trade traditional goods, spices, handmade crafts, and agricultural products. Experience authentic Amhara culture and cuisine.' },
  { name: 'Battle of Dessie Memorial Site', image: '/heritage-memorial.png', description: 'A memorial site commemorating the historic Battle of Dessie during the Second Italo-Ethiopian War. The site includes monuments, information panels, and a small museum.' },
]

const promoSlides = [
  { image: '/promo-cbe-real.png', title: 'Commercial Bank of Ethiopia', subtitle: 'Get your CBE card + 500 Birr Bonus! Full range of banking services at your nearest branch.', tag: 'BANKING', accent: '#6B21A8' },
  { image: '/promo-awash-real.png', title: 'Awash Bank', subtitle: '24/7 e-Branch ATM service across Dessie. Nurturing like the river — your trusted banking partner.', tag: 'BANKING', accent: '#1D4ED8' },
  { image: '/promo-dashen-real.png', title: 'Dashen Bank', subtitle: 'Pay with ease, shop with confidence. Visa card and modern digital banking solutions.', tag: 'BANKING', accent: '#1E3A5F' },
  { image: '/promo-ethiotel-real.jpeg', title: 'Ethio Telecom', subtitle: '50% discount on mobile transactions! Fast 4G/LTE and fiber internet keeping Dessie connected.', tag: 'TELECOM', accent: '#166534' },
  { image: '/promo-smart-city.png', title: 'Smart Dessie 2025', subtitle: 'Digital transformation is here — access all city services online with our new Smart City platform.', tag: 'GOVERNMENT', accent: '#0d4a28' },
  { image: '/promo-invest.png', title: 'Invest in Dessie', subtitle: 'New 500-hectare industrial zone with tax incentives. Join 15,000+ businesses thriving here.', tag: 'INVESTMENT', accent: '#92400E' },
  { image: '/promo-tourism.png', title: 'Visit Dessie', subtitle: 'Explore heritage sites, highland landscapes, and vibrant culture in the heart of Amhara Region.', tag: 'TOURISM', accent: '#0d4a28' },
]

const cityLandmarks = [
  { name: 'Dessie Alamude Building', image: '/building-alamude.png', desc: 'The iconic Alamude Building stands as a symbol of modern Dessie, housing government offices and civic services.' },
  { name: 'Dessie Referral Hospital', image: '/building-hospital.png', desc: 'The main referral hospital serving over 200,000 residents with modern medical facilities and emergency care.' },
  { name: 'Wollo University Campus', image: '/building-university.png', desc: 'A prestigious higher education institution offering diverse academic programs and research opportunities.' },
  { name: 'Dessie Modern School', image: '/building-school.png', desc: "One of 45+ schools providing quality education from primary to secondary level for the city's youth." },
  { name: 'Dessie Commercial Center', image: '/building-commercial.png', desc: 'The bustling commercial district featuring modern shops, banks, and business offices.' },
  { name: 'Dessie Stadium', image: '/building-stadium.png', desc: 'A modern sports facility hosting football matches, athletics, and community cultural events.' },
  { name: 'Dessie-Kombolcha Highway', image: '/building-road.png', desc: 'The main arterial road connecting Dessie to Kombolcha, a vital trade and transport corridor.' },
  { name: 'City Administration Hall', image: '/dessie-city-hall.png', desc: 'The seat of Dessie City Administration where governance, planning, and civic decisions are made.' },
]

const cityOfficials = [
  { name: 'Hon. Samuel Mollalign', role: 'Mayor of Dessie City', photo: '/mayor-photo.png', social: { facebook: '#', telegram: '#', email: 'mayor@dessiecity.gov.et', phone: '+251 33 111 0001' } },
  { name: 'Ato Getachew Hailu', role: 'Deputy Mayor', photo: '/official-deputy.png', social: { facebook: '#', telegram: '#', email: 'deputy@dessiecity.gov.et', phone: '+251 33 111 0002' } },
  { name: 'W/ro Tigist Mekonnen', role: 'City Council Speaker', photo: '/official-speaker.png', social: { facebook: '#', telegram: '#', email: 'speaker@dessiecity.gov.et', phone: '+251 33 111 0003' } },
  { name: 'Ato Yonas Tesfaye', role: 'City Manager', photo: '/official-manager.png', social: { facebook: '#', telegram: '#', email: 'manager@dessiecity.gov.et', phone: '+251 33 111 0004' } },
]

const cabinetMembers = [
  { name: 'Ato Abebe Kebede', role: 'Head of Finance', photo: '/official_abebe.svg' },
  { name: 'W/ro Hiwot Alemu', role: 'Head of Education', photo: '/official_hiwot.svg' },
  { name: 'Ato Dawit Assefa', role: 'Head of Infrastructure', photo: '/official_dawit.svg' },
  { name: 'W/ro Mekdes Tadesse', role: 'Head of Health', photo: '/official_mekdes.svg' },
  { name: 'Ato Tadesse Girma', role: 'Head of Trade', photo: '/official_tadesse.svg' },
  { name: 'W/ro Selamawit Bekele', role: 'Head of Social Affairs', photo: '/official_selamawit.svg' },
]

const staticHomeNews = [
  { id: 'static-1', title: 'DESSIE SMART CITY CONTROL CENTER LAUNCHED', date: 'Jul 12, 2025', category: 'Smart City', image: '/news-smart-city.png', excerpt: 'The new smart city monitoring center features a massive CCTV wall with real-time surveillance of the entire city — a major milestone in digital governance.' },
  { id: 'static-2', title: 'MODERN ONE-STOP SERVICE CENTER OPENS FOR CITIZENS', date: 'Jul 10, 2025', category: 'News', image: '/news-meeting.png', excerpt: 'Dessie citizens can now access 40+ government services at a single modern center staffed with professional officers in uniform.' },
  { id: 'static-3', title: 'NEW CITIZEN SERVICE HALL WITH INTEGRATED SERVICES', date: 'Jul 8, 2025', category: 'Infrastructure', image: '/news-infrastructure.png', excerpt: 'The state-of-the-art service hall integrates Ethiopost, telecom, banking, and government services under one elegant roof.' },
  { id: 'static-4', title: 'ANNUAL DESSIE CULTURAL FESTIVAL DATES ANNOUNCED', date: 'Jun 25, 2025', category: 'Culture', image: '/news-culture.png', excerpt: 'The week-long festival will showcase traditional music, dance, crafts, and cuisine from the Amhara Region.' },
  { id: 'static-5', title: 'NEW CITY HOSPITAL WING INAUGURATED WITH 200 BEDS', date: 'Jun 20, 2025', category: 'Health', image: '/news-health.png', excerpt: 'The new wing features modern medical equipment, pediatric wards, and a 24/7 emergency department.' },
  { id: 'static-6', title: 'MODERN WATER TREATMENT PLANT BEGINS OPERATIONS', date: 'Jun 15, 2025', category: 'Infrastructure', image: '/news-infrastructure.png', excerpt: 'The new facility provides clean drinking water to an additional 100,000 residents across Dessie.' },
]

const socialIcons = [
  { name: 'Facebook', color: '#1877F2', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
  { name: 'X (Twitter)', color: '#000000', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
  { name: 'Telegram', color: '#2CA5E0', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' },
  { name: 'YouTube', color: '#FF0000', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' },
  { name: 'LinkedIn', color: '#0A66C2', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
  { name: 'TikTok', color: '#000000', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>' },
]

/* ─────────────────── Pagination Component ─────────────────── */
function GreenPagination({
  totalItems,
  perPage,
  currentPage,
  onPageChange,
}: {
  totalItems: number
  perPage: number
  currentPage: number
  onPageChange: (p: number) => void
}) {
  const totalPages = Math.ceil(totalItems / perPage)
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="w-8 h-8 rounded-full bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#155d33] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
            currentPage === i ? 'bg-[#1a6b3c] text-white' : 'bg-white text-[#1a1a1a] border border-[#e2e8e0] hover:border-[#1a6b3c]'
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="w-8 h-8 rounded-full bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#155d33] transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  const navigateTo = (page: string, extra?: any) => {
    if (page === 'service-detail') {
      router.push(`/services/${encodeURIComponent(extra?.serviceId || '')}`);
    } else if (page === 'vacancy-detail') {
      router.push(`/vacancies/${encodeURIComponent(extra?.vacancyId || '')}`);
    } else if (page === 'news-detail') {
      router.push(`/news/${encodeURIComponent(extra?.newsId || '')}`);
    } else if (page === 'bids-detail') {
      router.push(`/bids/${encodeURIComponent(extra?.bidId || '')}`);
    } else {
      router.push(`/${page === 'home' ? '' : page}`);
    }
  };
  const { lang } = useLang()
  const isAm = lang === 'am'
  const { toast } = useToast()

  const { data: dbNews } = useSWR('/api/admin/news', fetcherArray, { revalidateOnFocus: false, dedupingInterval: 60000 })
  const { data: dbHeroSlides } = useSWR('/api/admin/sliders?sliderType=hero', fetcherArray, { revalidateOnFocus: false, dedupingInterval: 60000 })
  const { data: dbPromoSlides } = useSWR('/api/admin/sliders?sliderType=promo', fetcherArray, { revalidateOnFocus: false, dedupingInterval: 60000 })
  const { data: dbProjects } = useSWR('/api/admin/projects', fetcherArray, { revalidateOnFocus: false, dedupingInterval: 60000 })

  const homeNews = useMemo(() => {
    if (dbNews && dbNews.length > 0) {
      const published = dbNews.filter((a: any) => a.approvalStatus === 'approved' || a.status === 'published')
      if (published.length > 0) {
        return published.map((a: any) => ({
          id: a.id,
          title: a.title,
          date: new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          category: a.category || 'News',
          image: (() => {
            const img = a.image || '/news-meeting.png'
            if (img.trim().startsWith('[')) { try { const arr = JSON.parse(img); return arr[0] || '/news-meeting.png' } catch { return '/news-meeting.png' } }
            return img
          })(),
          excerpt: a.excerpt || '',
        }))
      }
    }
    return staticHomeNews;
  }, [dbNews]);

  const heroSlidesDynamic = useMemo(() => {
    if (dbHeroSlides && dbHeroSlides.length > 0) {
      return dbHeroSlides.filter((s: any) => s.isActive)
    }
    return heroSlides;
  }, [dbHeroSlides]);

  const promoSlidesDynamic = useMemo(() => {
    if (dbPromoSlides && dbPromoSlides.length > 0) {
      return dbPromoSlides.filter((s: any) => s.isActive)
    }
    return promoSlides;
  }, [dbPromoSlides]);

  const dynamicProjects = useMemo(() => {
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.filter((p: any) => p.approvalStatus === 'approved').map((p: any) => {
        let img = '';
        
        // Dynamic fallback based on title keywords
        const lowerTitle = p.title.toLowerCase();
        if (lowerTitle.includes('smart') || lowerTitle.includes('digital')) {
          img = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80';
        } else if (lowerTitle.includes('industrial') || lowerTitle.includes('zone')) {
          img = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80';
        } else if (lowerTitle.includes('road') || lowerTitle.includes('transport')) {
          img = 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80';
        } else if (lowerTitle.includes('water') || lowerTitle.includes('sanitation')) {
          img = 'https://images.unsplash.com/photo-1519822550275-9e6b46142e03?auto=format&fit=crop&w=1200&q=80';
        } else if (lowerTitle.includes('housing') || lowerTitle.includes('residential')) {
          img = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
        } else if (lowerTitle.includes('education') || lowerTitle.includes('school')) {
          img = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80';
        } else if (lowerTitle.includes('health') || lowerTitle.includes('clinic')) {
          img = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80';
        } else {
          img = 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80'; // Green energy/city fallback
        }

        if (p.image && typeof p.image === 'string' && p.image.length > 5) {
          img = p.image;
        }
        return {
          title: p.title,
          desc: p.description,
          image: img,
          color: 'blue' // Default color
        }
      })
    }
    return featuredProjects;
  }, [dbProjects]);

  /* ── Slider State ── */
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── Service Pagination ── */
  const [servicePage, setServicePage] = useState(0)

  /* ── Hotel State ── */
  const [hotelPage, setHotelPage] = useState(0)
  const [hotelImageIndices, setHotelImageIndices] = useState<Record<number, number>>({})
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingHotel, setBookingHotel] = useState<string>('')
  const [bookingForm, setBookingForm] = useState({
    name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '', roomType: '', requests: ''
  })

  /* ── Project Pagination ── */
  const [projectPage, setProjectPage] = useState(0)
  /* ── Heritage Pagination ── */
  const [heritagePage, setHeritagePage] = useState(0)
  const HERITAGE_PER_PAGE = 3
  /* ── Landmarks Pagination ── */
  const [landmarkPage, setLandmarkPage] = useState(0)
  const LANDMARK_PER_PAGE = 4

  /* ── Jobs & Bids ── */
  const [latestVacancies, setLatestVacancies] = useState<any[]>([])
  const [latestBids, setLatestBids] = useState<any[]>([])
  const [loadingJB, setLoadingJB] = useState(true)
  const [jbTab, setJbTab] = useState<'vacancies' | 'bids'>('vacancies')
  const [jbPage, setJbPage] = useState(0)
  const JB_PER_PAGE = 4
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [jbFilter, setJbFilter] = useState('All')

  /* ── Promo Slider ── */
  const [promoSlide, setPromoSlide] = useState(0)
  const promoInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  /* ── News Pagination ── */
  const [newsPage, setNewsPage] = useState(0)

  /* ── Resources Pagination ── */
  const [resCategory, setResCategory] = useState(0)
  const [resPage, setResPage] = useState(0)
  const RES_PER_PAGE = 3

  /* ── Newsletter ── */
  const [email, setEmail] = useState('')
  const [subscribing, setSubscribing] = useState(false)

  /* ── Fetch jobs & bids ── */
  useEffect(() => {
    Promise.all([
      fetch('/api/vacancies').then(r => r.json()).catch(() => []),
      fetch('/api/bids').then(r => r.json()).catch(() => []),
    ]).then(([vacancies, bids]) => {
      setLatestVacancies(vacancies || [])
      setLatestBids(bids || [])
      setLoadingJB(false)
    })
  }, [])

  /* ── Auto-advance slider ── */
  useEffect(() => {
    if (slideTimeout.current) clearTimeout(slideTimeout.current)
    const delay = currentSlide === 0 ? 12000 : 5000 // Give the first slide 12 seconds, others 5 seconds
    slideTimeout.current = setTimeout(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlidesDynamic.length)
    }, delay)
    return () => { if (slideTimeout.current) clearTimeout(slideTimeout.current) }
  }, [currentSlide, heroSlidesDynamic.length])

  /* ── Auto-advance promo slider ── */
  const [promoProgress, setPromoProgress] = useState(0)
  const promoPaused = useRef(false)
  useEffect(() => {
    promoInterval.current = setInterval(() => {
      if (!promoPaused.current) {
        setPromoProgress(prev => {
          if (prev >= 100) {
            setPromoSlide(p => (p + 1) % promoSlidesDynamic.length)
            return 0
          }
          return prev + 2
        })
      }
    }, 80)
    return () => { if (promoInterval.current) clearInterval(promoInterval.current) }
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const prevSlide = useCallback(() => goToSlide((currentSlide - 1 + heroSlidesDynamic.length) % heroSlidesDynamic.length), [currentSlide, goToSlide, heroSlidesDynamic.length])
  const nextSlide = useCallback(() => goToSlide((currentSlide + 1) % heroSlidesDynamic.length), [currentSlide, goToSlide, heroSlidesDynamic.length])

  /* ── Hotel image navigation ── */
  const cycleHotelImage = useCallback((hotelIdx: number, dir: number) => {
    setHotelImageIndices(prev => {
      const curr = prev[hotelIdx] || 0
      return { ...prev, [hotelIdx]: (curr + dir + 3) % 3 }
    })
  }, [])

  /* ── Newsletter submit ── */
  const handleSubscribe = useCallback(async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: 'Invalid email', description: 'Please enter a valid email address.', variant: 'destructive' })
      return
    }
    setSubscribing(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        toast({ title: 'Subscribed!', description: 'You will receive our newsletter updates.' })
        setEmail('')
      } else {
        toast({ title: 'Error', description: data.message || 'Something went wrong.', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Network error. Please try again.', variant: 'destructive' })
    } finally {
      setSubscribing(false)
    }
  }, [email, toast])

  /* ── Booking submit ── */
  const handleBookingSubmit = useCallback(() => {
    if (!bookingForm.name.trim() || !bookingForm.email.trim() || !bookingForm.checkIn || !bookingForm.checkOut) {
      toast({ title: 'Missing fields', description: 'Please fill in all required fields.', variant: 'destructive' })
      return
    }
    toast({ title: 'Booking Requested!', description: `Your booking at ${bookingHotel} has been submitted. We will contact you shortly.` })
    setBookingOpen(false)
    setBookingForm({ name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '', roomType: '', requests: '' })
  }, [bookingForm, bookingHotel, toast])

  /* ── Paginated data slices ── */
  const serviceStart = servicePage * 4
  const visibleServices = serviceCards.slice(serviceStart, serviceStart + 4)
  const hotelStart = hotelPage * 3
  const visibleHotels = hotels.slice(hotelStart, hotelStart + 3)
  const projectStart = projectPage * 4
  const visibleProjects = dynamicProjects.slice(projectStart, projectStart + 4)
  const newsStart = newsPage * 6
  const visibleNews = homeNews.slice(newsStart, newsStart + 6)

  /* ── Jobs & Bids filtered & paginated slices ── */
  const jbFilterOptions = useMemo(() => {
    if (jbTab === 'vacancies') {
      const depts = [...new Set(latestVacancies.map((v: any) => v.department).filter(Boolean))]
      return ['All', ...depts]
    }
    const cats = [...new Set(latestBids.map((b: any) => b.category).filter(Boolean))]
    return ['All', ...cats]
  }, [jbTab, latestVacancies, latestBids])

  const jbData = useMemo(() => {
    const raw = jbTab === 'vacancies' ? latestVacancies : latestBids
    if (jbFilter === 'All' || !jbFilter) return raw
    if (jbTab === 'vacancies') return raw.filter((v: any) => v.department === jbFilter)
    // Bids: text search on title or reference
    const q = jbFilter.toLowerCase()
    return raw.filter((b: any) =>
      b.title?.toLowerCase().includes(q) || b.reference?.toLowerCase().includes(q) || b.category?.toLowerCase().includes(q)
    )
  }, [jbTab, latestVacancies, latestBids, jbFilter])

  const jbStart = jbPage * JB_PER_PAGE
  const jbVisible = jbData.slice(jbStart, jbStart + JB_PER_PAGE)

  return (
    <main>
      {/* ═══════════════════ 1. HERO IMAGE SLIDER ═══════════════════ */}
      <section className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
        {/* Slides */}
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.img
              initial={{ scale: 1 }}
              animate={{ scale: currentSlide === 0 ? 1.08 : 1.05 }}
              transition={{ duration: currentSlide === 0 ? 12 : 6, ease: 'linear' }}
              src={heroSlidesDynamic[currentSlide]?.image}
              alt={`Dessie City Slide ${currentSlide + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          {/* Slide tag badge */}
          {heroSlidesDynamic[currentSlide]?.tag && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 mb-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded border border-white/30 text-white text-xs font-bold tracking-widest shadow-xl"
            >
              {heroSlidesDynamic[currentSlide].tag}
            </motion.div>
          )}

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white text-center drop-shadow-2xl max-w-5xl tracking-tight leading-tight"
          >
            {heroSlidesDynamic[currentSlide]?.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-lg sm:text-xl md:text-2xl text-white/90 text-center max-w-3xl drop-shadow-lg font-light"
          >
            {heroSlidesDynamic[currentSlide]?.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-[#1a6b3c] hover:bg-[#155d33] text-white font-bold tracking-wider px-8"
              onClick={() => navigateTo('services')}
            >
              EXPLORE SERVICES
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white font-bold tracking-wider px-8 hover:bg-white/10 hover:text-white"
              onClick={() => navigateTo('about')}
            >
              LEARN MORE
            </Button>
          </motion.div>
        </div>

        {/* Arrow navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlidesDynamic.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ═══ Social Media Icons — Left Side ═══ */}
        <div className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2.5 slider-social-icons">
          {socialIcons.map((s) => (
            <Tooltip key={s.name}>
              <TooltipTrigger asChild>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="relative w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-125 hover:shadow-lg"
                  style={{ backgroundColor: s.color }}
                >
                  <div
                    className="w-3.5 h-3.5 text-white transition-colors duration-300 [&>svg]:w-full [&>svg]:h-full group-hover:text-[#1a1a1a]"
                    dangerouslySetInnerHTML={{ __html: s.svg }}
                  />
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                <p className="text-white bg-[#0d4a28] px-2 py-1 rounded-md text-xs font-bold">{s.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>

      {/* ═══════════════════ 2. CITIZEN SERVICES & OPPORTUNITIES ═══════════════════ */}
      <section id="services" className="py-8 bg-gradient-to-b from-white to-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Services (70%) */}
            <motion.div className="w-full lg:w-[70%]"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}>

            {/* Section Header */}
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0d4a28] flex items-center justify-center">
                    <Building className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-[#0d4a28] uppercase tracking-widest">Government Services</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0d4a28] tracking-tight">CITIZEN SERVICES</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-[#c8a415] via-[#c8a415]/60 to-transparent rounded-full mt-2" />
                <p className="mt-2 text-[#6b7280] text-sm">Fast, secure, and convenient government services.</p>
              </div>
              <Button variant="outline" size="sm"
                className="hidden sm:flex border-[#0d4a28] text-[#0d4a28] hover:bg-[#0d4a28] hover:text-white font-bold tracking-wider text-xs gap-1"
                onClick={() => navigateTo('services')}>
                ALL SERVICES <ArrowRight className="w-3 h-3" />
              </Button>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {visibleServices.map((card, i) => {
                  const Icon = card.icon
                  return (
                    <motion.div key={card.title}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                      <Dialog open={selectedService === card.title} onOpenChange={(open) => { if (!open) setSelectedService(null) }}>
                        <Card className="h-full border border-gray-100 hover:border-[#1a6b3c]/30 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white overflow-hidden relative"
                          onClick={() => setSelectedService(card.title)}>
                          
                          {/* Top colored accent line always slightly visible, full on hover */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0d4a28] via-[#1a6b3c] to-[#c8a415] transform scale-x-75 opacity-50 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-500 origin-left z-20" />

                          <CardContent className="p-6 flex flex-col h-full relative z-10">
                            <div className="flex items-start gap-4 mb-4">
                              {/* Always colorful icon container */}
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0d4a28]/10 to-[#1a6b3c]/5 border border-[#1a6b3c]/10 flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#0d4a28] group-hover:to-[#1a6b3c] group-hover:border-transparent transition-all duration-300 shadow-sm group-hover:shadow-[#1a6b3c]/30 group-hover:scale-105">
                                <Icon className="w-6 h-6 text-[#0d4a28] group-hover:text-white transition-colors duration-300" />
                              </div>
                              <div className="flex-1 min-w-0 pt-1">
                                <h3 className="font-extrabold text-gray-900 text-[15px] group-hover:text-[#0d4a28] transition-colors duration-300">{card.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed mt-1.5 line-clamp-2">{card.desc}</p>
                              </div>
                            </div>
                            
                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#c8a415]" />
                                Dessie City
                              </span>
                              
                              {/* Click to see button - Always visible but highlights on hover */}
                              <div className="flex items-center gap-1 text-[#0d4a28] text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#1a6b3c]/10 group-hover:bg-[#0d4a28] group-hover:text-white transition-all duration-300">
                                <span>VIEW DETAILS</span>
                                <ArrowRight className="w-3 h-3" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Service Details Dialog */}
                        <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden rounded-2xl">
                          {serviceDetails[card.title] && (
                            <>
                              <div className="bg-gradient-to-br from-[#0d4a28] to-[#1a6b3c] px-6 py-6 text-white relative overflow-hidden">
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
                                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />
                                <div className="relative">
                                  <span className="inline-block text-[10px] font-bold tracking-widest uppercase bg-[#c8a415] text-[#0d4a28] px-2.5 py-0.5 rounded-full mb-3">Service Details</span>
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center"><Icon className="w-6 h-6 text-white" /></div>
                                    <DialogTitle className="text-xl font-bold">{card.title}</DialogTitle>
                                  </div>
                                </div>
                              </div>
                              <div className="px-6 py-5 max-h-[60vh] overflow-y-auto space-y-4">
                                <p className="text-sm text-[#374151] leading-relaxed">{serviceDetails[card.title].fullDescription}</p>
                                <div>
                                  <h4 className="text-xs font-bold text-[#0d4a28] uppercase tracking-wider mb-2">Requirements</h4>
                                  <ul className="space-y-1.5">
                                    {serviceDetails[card.title].requirements.map((req, ri) => (
                                      <li key={ri} className="flex items-start gap-2 text-sm text-[#374151]">
                                        <CheckCircle className="w-4 h-4 text-[#1a6b3c] shrink-0 mt-0.5" /><span>{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="bg-[#f0fdf4] rounded-xl p-3 border border-[#1a6b3c]/10">
                                    <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-1">Fees</p>
                                    <p className="text-sm font-bold text-[#0d4a28]">{serviceDetails[card.title].fees}</p>
                                  </div>
                                  <div className="bg-[#fffbeb] rounded-xl p-3 border border-[#c8a415]/10">
                                    <p className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider mb-1">Processing Time</p>
                                    <p className="text-sm font-bold text-[#0d4a28]">{serviceDetails[card.title].processingTime}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-[#f8faf8] rounded-xl">
                                  <Phone className="w-4 h-4 text-[#1a6b3c] shrink-0" />
                                  <div>
                                    <p className="text-xs font-bold text-[#0d4a28]">{serviceDetails[card.title].contact}</p>
                                    <p className="text-xs text-[#6b7280]">{serviceDetails[card.title].hours}</p>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter className="px-6 py-4 bg-[#f8faf8] border-t border-[#e2e8e0] gap-2">
                                <Button className="bg-[#0d4a28] hover:bg-[#155d33] text-white text-sm font-bold"
                                  onClick={() => { setSelectedService(null); navigateTo('service-detail', { serviceId: card.title }) }}>
                                  Full Service Page <ArrowRight className="w-4 h-4 ml-1" />
                                </Button>
                                <Button variant="ghost" className="text-[#6b7280] text-sm" onClick={() => setSelectedService(null)}>Close</Button>
                              </DialogFooter>
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </motion.div>
                  )
                })}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs text-[#9ca3af]">
                  Showing {serviceStart + 1}–{Math.min(serviceStart + 4, serviceCards.length)} of {serviceCards.length} services
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setServicePage(p => Math.max(0, p - 1))} disabled={servicePage === 0}
                    className="w-8 h-8 rounded-lg border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.ceil(serviceCards.length / 4) }, (_, i) => (
                    <button key={i} onClick={() => setServicePage(i)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${servicePage === i ? 'bg-[#0d4a28] text-white shadow-md' : 'border border-[#e2e8e0] text-[#6b7280] hover:border-[#0d4a28] hover:text-[#0d4a28]'}`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => setServicePage(p => Math.min(Math.ceil(serviceCards.length / 4) - 1, p + 1))} disabled={servicePage >= Math.ceil(serviceCards.length / 4) - 1}
                    className="w-8 h-8 rounded-lg border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            <Button variant="outline" size="sm" className="sm:hidden w-full mt-6 border-[#0d4a28] text-[#0d4a28] font-bold"
              onClick={() => navigateTo('services')}>
              VIEW ALL SERVICES <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
            </motion.div>

            {/* Right Column: Vacancies & Bids (30%) */}
            <motion.div className="w-full lg:w-[30%] flex flex-col"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: 0.2 }}>
              
              {/* Card Container — warm light theme */}
              <div className="bg-gradient-to-br from-[#fefcf3] via-[#fef9e7] to-[#fdf6e3] rounded-2xl p-5 flex flex-col h-full shadow-lg border border-[#c8a415]/20 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c8a415]/[0.05] rounded-full" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#0d4a28]/[0.03] rounded-full" />
                
                {/* Header */}
                <div className="relative mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c8a415] to-[#b08e10] flex items-center justify-center shadow-md shadow-[#c8a415]/25">
                      <Briefcase className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#c8a415] uppercase tracking-[0.15em] block">Open Opportunities</span>
                      <h2 className="text-lg font-extrabold text-[#1a1a1a] tracking-tight leading-tight">
                        VACANCIES & BIDS
                      </h2>
                    </div>
                  </div>
                  <div className="h-0.5 w-full bg-gradient-to-r from-[#c8a415] via-[#c8a415]/30 to-transparent rounded-full" />
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 mb-5 bg-white rounded-xl p-1 border border-[#e2e8e0] shadow-sm self-stretch">
                  <button
                    onClick={() => { setJbTab('vacancies'); setJbPage(0); }}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      jbTab === 'vacancies' ? 'bg-[#0d4a28] text-white shadow-md' : 'text-[#6b7280] hover:text-[#0d4a28]'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    Vacancies
                    <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${jbTab === 'vacancies' ? 'bg-white/20 text-white' : 'bg-[#f0f0f0] text-[#6b7280]'}`}>
                      {latestVacancies.length}
                    </span>
                  </button>
                  <button
                    onClick={() => { setJbTab('bids'); setJbPage(0); }}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                      jbTab === 'bids' ? 'bg-[#0d4a28] text-white shadow-md' : 'text-[#6b7280] hover:text-[#0d4a28]'
                    }`}
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    Bids
                    <span className={`px-1.5 py-0.5 rounded-md text-[9px] ${jbTab === 'bids' ? 'bg-white/20 text-white' : 'bg-[#f0f0f0] text-[#6b7280]'}`}>
                      {latestBids.length}
                    </span>
                  </button>
                </div>

                {/* Content List */}
                <div className="flex-1 flex flex-col gap-3 relative">
                  {loadingJB ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="bg-white rounded-xl p-4 border border-[#e2e8e0] animate-pulse">
                        <div className="h-4 bg-gray-100 rounded w-3/4 mb-3"></div>
                        <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                      </div>
                    ))
                  ) : jbVisible.length > 0 ? (
                    jbVisible.map((item, i) => {
                      // Job type badge styling
                      const jobType = item.type || ''
                      const typeLabel = jobType || (jbTab === 'bids' ? 'Tender' : 'Full Time')
                      const typeLower = typeLabel.toLowerCase()
                      const typeStyle = typeLower.includes('remote') 
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : typeLower.includes('contract') 
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : typeLower.includes('part')
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : typeLower.includes('tender') || typeLower.includes('bid')
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'

                      return (
                        <div key={item.id || i} 
                             className="bg-white rounded-xl p-4 border border-[#e2e8e0] hover:shadow-md hover:border-[#c8a415]/40 transition-all cursor-pointer group"
                             onClick={() => navigateTo(jbTab === 'vacancies' ? 'vacancy-detail' : 'bids-detail', jbTab === 'vacancies' ? { vacancyId: item.id } : { bidId: item.id })}>
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${jbTab === 'vacancies' ? 'bg-[#0d4a28]/10' : 'bg-[#c8a415]/10'}`}>
                              {jbTab === 'vacancies' ? <Briefcase className="w-3.5 h-3.5 text-[#0d4a28]" /> : <Gavel className="w-3.5 h-3.5 text-[#c8a415]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[#1a1a1a] text-sm group-hover:text-[#0d4a28] transition-colors line-clamp-2 leading-snug">
                                {item.title}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                {/* Job type badge */}
                                <span className={`inline-flex items-center text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${typeStyle}`}>
                                  {typeLabel}
                                </span>
                                {/* Deadline */}
                                <span className="flex items-center gap-1 text-[#6b7280] text-[11px]">
                                  <CalendarDays className="w-3 h-3 text-[#c8a415]" /> 
                                  {item.deadline ? new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : item.closingDate ? new Date(item.closingDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Open'}
                                </span>
                              </div>
                              {/* Department/Category */}
                              <span className="inline-block mt-1.5 font-semibold text-[#0d4a28] text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-[#0d4a28]/8 rounded">
                                {item.department || item.category || 'General'}
                              </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0d4a28] transition-colors shrink-0 mt-1" />
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="bg-white rounded-xl p-8 border border-[#e2e8e0] text-center flex flex-col items-center justify-center flex-1">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                        {jbTab === 'vacancies' ? <Briefcase className="w-5 h-5 text-gray-300" /> : <Gavel className="w-5 h-5 text-gray-300" />}
                      </div>
                      <p className="text-sm font-medium text-gray-400">No open {jbTab} at the moment.</p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {jbData.length > JB_PER_PAGE && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <button onClick={() => setJbPage(p => Math.max(0, p - 1))} disabled={jbPage === 0}
                      className="w-7 h-7 rounded-lg border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] font-bold text-[#9ca3af]">
                      {jbPage + 1} / {Math.ceil(jbData.length / JB_PER_PAGE)}
                    </span>
                    <button onClick={() => setJbPage(p => Math.min(Math.ceil(jbData.length / JB_PER_PAGE) - 1, p + 1))} disabled={jbPage >= Math.ceil(jbData.length / JB_PER_PAGE) - 1}
                      className="w-7 h-7 rounded-lg border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {/* View All Button */}
                <button className="mt-4 w-full bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] hover:from-[#0a3d22] hover:to-[#155d33] text-white font-bold text-xs px-4 py-3 rounded-xl transition-all hover:scale-[1.02] shadow-md flex items-center justify-center gap-2 uppercase tracking-wider"
                  onClick={() => navigateTo(jbTab === 'vacancies' ? 'vacancies' : 'bids')}>
                  VIEW ALL {jbTab.toUpperCase()} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 2.5 LATEST NEWS ═══════════════════ */}
      <section id="latest-news" className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5 }}>
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#c62828] flex items-center justify-center">
                    <Newspaper className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-bold text-[#c62828] uppercase tracking-widest">{isAm ? 'የቅርብ ጊዜ ዝማኔዎች' : 'Latest Updates'}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a1a] tracking-tight">{isAm ? 'የቅርብ ጊዜ ዜናዎች' : 'LATEST NEWS'}</h2>
                <div className="h-1.5 w-24 bg-[#c62828] rounded-full mt-3" />
              </div>
              <button onClick={() => navigateTo('news')}
                className="flex items-center gap-2 text-sm font-bold text-[#c62828] hover:gap-3 transition-all border-2 border-[#c62828]/20 px-6 py-2.5 rounded-xl hover:bg-[#c62828] hover:text-white hover:border-[#c62828]">
                {isAm ? 'ሁሉም ዜናዎች ይመልከቱ' : 'VIEW ALL NEWS'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* News Grid (3 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleNews.map((item, i) => (
                <motion.div key={(item.id || item.title) + i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Card className="h-full flex flex-col cursor-pointer hover:shadow-2xl transition-all duration-300 border border-gray-100 shadow-md group bg-white overflow-hidden rounded-2xl"
                    onClick={() => item.id && !item.id.startsWith('static') ? navigateTo('news-detail', { newsId: item.id }) : navigateTo('news')}>
                    
                    {/* Large Image Cover */}
                    <div className="relative h-56 w-full overflow-hidden">
                      <img loading="lazy" src={item.image || '/news-council-1.png'} alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        onError={(e) => { 
                          const t = e.currentTarget as HTMLImageElement; 
                          if (t.src.indexOf('fallback') === -1) {
                            t.src = '/news-council-1.png?fallback=1'; 
                          }
                        }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 bg-[#c62828] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                        {item.category || 'News'}
                      </div>
                    </div>

                    <CardContent className="p-6 flex-1 flex flex-col">
                      {/* Meta info (Date & Author) */}
                      <div className="flex justify-between items-center text-xs font-semibold text-gray-500 mb-4 border-b border-gray-100 pb-3">
                        <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5 text-[#c62828]" /> {item.date}</span>
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-[#c62828]" /> {item.author || item.createdBy || 'Admin'}</span>
                      </div>
                      
                      {/* Title & Excerpt */}
                      <h4 className="font-extrabold text-[#1a1a1a] text-lg leading-tight group-hover:text-[#c62828] transition-colors line-clamp-2 mb-3">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                        {item.excerpt || item.title}
                      </p>

                      {/* Footer (Read More) */}
                      <div className="flex items-center justify-end pt-4 border-t border-gray-100 mt-auto">
                        <span className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-[#c62828] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                          {isAm ? 'ተጨማሪ' : 'READ MORE'} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 pt-6">
              <span className="text-sm font-semibold text-gray-500">
                Showing {newsStart + 1}–{Math.min(newsStart + 6, homeNews.length)} of {homeNews.length} news articles
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setNewsPage(p => Math.max(0, p - 1))} disabled={newsPage === 0}
                  className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#c62828] hover:bg-[#c62828] hover:text-white transition-all text-gray-500">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-2 mx-2">
                  {Array.from({ length: Math.ceil(homeNews.length / 6) }, (_, i) => (
                    <button key={i} onClick={() => setNewsPage(i)}
                      className={`transition-all rounded-full ${newsPage === i ? 'bg-[#c62828] w-8 h-2.5' : 'bg-gray-300 w-2.5 h-2.5 hover:bg-[#c62828]/50'}`} />
                  ))}
                </div>
                <button onClick={() => setNewsPage(p => Math.min(Math.ceil(homeNews.length / 6) - 1, p + 1))} disabled={newsPage >= Math.ceil(homeNews.length / 6) - 1}
                  className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center disabled:opacity-30 hover:border-[#c62828] hover:bg-[#c62828] hover:text-white transition-all text-gray-500">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════ 3.  HOTELS ═══════════════════ */}
      <section className="py-8 bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] text-center gov-section-title inline-block mb-8">
            HOTELS
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleHotels.map((hotel, hi) => {
              const globalIdx = hotelStart + hi
              const activeImg = hotelImageIndices[globalIdx] || 0
              const imgs = hotelImagesAll[globalIdx] || hotelImagesAll[0]
              return (
                <motion.div
                  key={hotel.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: hi * 0.1 }}
                >
                  <Card className="overflow-hidden border border-[#e2e8e0] hover:shadow-lg transition-shadow">
                    {/* Main image */}
                    <div className="relative h-52 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeImg}
                          src={imgs[activeImg]}
                          alt={`${hotel.name} photo ${activeImg + 1}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </AnimatePresence>
                      {/* Thumbnail arrows */}
                      <button
                        onClick={() => cycleHotelImage(globalIdx, -1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => cycleHotelImage(globalIdx, 1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Thumbnail strip */}
                    <div className="flex gap-1.5 px-3 py-2 bg-white">
                      <button
                        onClick={() => setHotelImageIndices(prev => ({ ...prev, [globalIdx]: 0 }))}
                        className={`w-16 h-12 rounded overflow-hidden border-2 transition-colors ${activeImg === 0 ? 'border-[#1a6b3c]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img loading="lazy" src={imgs[0]} alt="" className="w-full h-full object-cover" />
                      </button>
                      <button
                        onClick={() => setHotelImageIndices(prev => ({ ...prev, [globalIdx]: 1 }))}
                        className={`w-16 h-12 rounded overflow-hidden border-2 transition-colors ${activeImg === 1 ? 'border-[#1a6b3c]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img loading="lazy" src={imgs[1]} alt="" className="w-full h-full object-cover" />
                      </button>
                      <button
                        onClick={() => setHotelImageIndices(prev => ({ ...prev, [globalIdx]: 2 }))}
                        className={`w-16 h-12 rounded overflow-hidden border-2 transition-colors ${activeImg === 2 ? 'border-[#1a6b3c]' : 'border-transparent opacity-70 hover:opacity-100'}`}
                      >
                        <img loading="lazy" src={imgs[2]} alt="" className="w-full h-full object-cover" />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-[#1a1a1a] text-base">{hotel.name}</h3>
                        <div className="flex gap-0.5">
                          {Array.from({ length: hotel.stars }, (_, si) => (
                            <Star key={si} className="w-3.5 h-3.5 fill-[#c8a415] text-[#c8a415]" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-[#e8f5e9] text-[#1a6b3c] border-0">
                          <MapPin className="w-3 h-3 mr-1" /> {hotel.location}
                        </Badge>
                        <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-[#fef9e7] text-[#c8a415] border-0">
                          {hotel.price}
                        </Badge>
                      </div>
                      <p className="text-[#6b7280] text-xs leading-relaxed mb-3 line-clamp-2">{hotel.desc}</p>
                      <div className="flex items-center gap-3 text-[#6b7280] text-xs mb-3">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {hotel.phone}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {hotel.email}</span>
                      </div>
                      <div className="flex gap-2">
                        <Dialog open={bookingOpen && bookingHotel === hotel.name} onOpenChange={(open) => {
                          if (open) { setBookingHotel(hotel.name); setBookingOpen(true) }
                          else { setBookingOpen(false) }
                        }}>
                          <DialogTrigger asChild>
                            <Button className="flex-1 bg-[#1a6b3c] hover:bg-[#155d33] text-white font-semibold text-sm tracking-wider">
                              BOOK NOW
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-[#1a1a1a]">Book at {hotel.name}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-2">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="bk-name">Guest Name *</Label>
                                  <Input id="bk-name" placeholder="Full Name" value={bookingForm.name} onChange={e => setBookingForm(p => ({ ...p, name: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="bk-email">Email *</Label>
                                  <Input id="bk-email" type="email" placeholder="email@example.com" value={bookingForm.email} onChange={e => setBookingForm(p => ({ ...p, email: e.target.value }))} />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="bk-phone">Phone</Label>
                                <Input id="bk-phone" placeholder="+251 9XX XXX XXX" value={bookingForm.phone} onChange={e => setBookingForm(p => ({ ...p, phone: e.target.value }))} />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="bk-checkin">Check-in *</Label>
                                  <Input id="bk-checkin" type="date" value={bookingForm.checkIn} onChange={e => setBookingForm(p => ({ ...p, checkIn: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="bk-checkout">Check-out *</Label>
                                  <Input id="bk-checkout" type="date" value={bookingForm.checkOut} onChange={e => setBookingForm(p => ({ ...p, checkOut: e.target.value }))} />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="bk-guests">Guests</Label>
                                  <Input id="bk-guests" type="number" min="1" max="10" placeholder="2" value={bookingForm.guests} onChange={e => setBookingForm(p => ({ ...p, guests: e.target.value }))} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Room Type</Label>
                                  <Select value={bookingForm.roomType} onValueChange={v => setBookingForm(p => ({ ...p, roomType: v }))}>
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="standard">Standard</SelectItem>
                                      <SelectItem value="deluxe">Deluxe</SelectItem>
                                      <SelectItem value="suite">Suite</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="bk-requests">Special Requests</Label>
                                <Textarea id="bk-requests" placeholder="Any special requirements..." value={bookingForm.requests} onChange={e => setBookingForm(p => ({ ...p, requests: e.target.value }))} className="min-h-[80px]" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button className="bg-[#1a6b3c] hover:bg-[#155d33] text-white font-semibold tracking-wider" onClick={handleBookingSubmit}>
                                SUBMIT
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="outline"
                          className="flex-1 border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white font-semibold text-sm tracking-wider"
                          onClick={() => toast({ title: hotel.name, description: `Phone: ${hotel.phone} | Email: ${hotel.email}` })}
                        >
                          CONTACT
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
          <GreenPagination
            totalItems={hotels.length}
            perPage={3}
            currentPage={hotelPage}
            onPageChange={setHotelPage}
          />
        </div>
      </section>

      {/* ═══════════════════ 4. DESSIE AT A GLANCE ═══════════════════ */}
      <section className="py-6 bg-[#0d4a28]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center gov-heading-display mb-6">
            DESSIE AT A GLANCE
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
            {statCards.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                >
                  <Card className="stat-card bg-white/10 border border-white/10 backdrop-blur-sm">
                    <CardContent className="p-3 text-center">
                      <Icon className="w-5 h-5 text-[#c8a415] mx-auto mb-2" />
                      <div className="text-xl md:text-2xl font-extrabold text-white">
                        <AnimatedCounter value={s.value} suffix={s.suffix} />
                      </div>
                      <p className="text-white/60 text-[10px] mt-1 font-medium tracking-wide">{s.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">About Dessie City</h3>
              <p className="text-white/70 leading-relaxed">
                Dessie is a major city in the Amhara Region of Ethiopia, located in the South Wollo Zone.
                As a rapidly growing urban center, Dessie serves as a hub for commerce, education, and administration
                in the northeastern part of the country. With a population exceeding 450,000, the city is committed
                to delivering modern municipal services, fostering economic development, and improving the quality
                of life for all its residents through transparent governance and smart city initiatives.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img
                src="/dessie-city-hall.png"
                alt="Dessie City Hall"
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 4b. PROMOTIONAL SLIDER ═══════════════════ */}
      <section className="py-8 bg-gradient-to-b from-[#f0fdf4] to-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#c8a415] uppercase">Featured Partners</span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0d4a28] mt-2 tracking-tight">
                Promotions &amp; Offers
              </h3>
              <div className="w-12 h-0.5 bg-[#c8a415] mx-auto mt-3 rounded-full" />
            </motion.div>
          </div>

          {/* Carousel Container */}
          <div
            className="relative group"
            onMouseEnter={() => { promoPaused.current = true }}
            onMouseLeave={() => { promoPaused.current = false }}
          >
            {/* Large centered card display */}
            <div className="relative mx-auto max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={promoSlide}
                  initial={{ opacity: 0, x: 60, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -60, scale: 0.92 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
                  className="relative"
                >
                  <Card className="rounded-2xl overflow-hidden shadow-2xl border-none">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image side */}
                        <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[340px] bg-gray-50 overflow-hidden">
                          <motion.img
                            src={promoSlidesDynamic[promoSlide]?.image}
                            alt={promoSlidesDynamic[promoSlide]?.title}
                            className="w-full h-full object-cover"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="text-[9px] font-bold tracking-[0.12em] px-2.5 py-1 border-0 shadow-lg" style={{ backgroundColor: promoSlidesDynamic[promoSlide]?.accentColor || '#0d4a28', color: 'white' }}>
                              {promoSlidesDynamic[promoSlide]?.tag}
                            </Badge>
                          </div>
                        </div>
                        {/* Content side */}
                        {promoSlidesDynamic.length > 0 && (
                          <div className="p-6 md:p-8 flex flex-col justify-center relative overflow-hidden">
                            {/* Decorative circle */}
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-5" style={{ backgroundColor: promoSlidesDynamic[promoSlide]?.accentColor || '#0d4a28' }} />
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.25, duration: 0.5 }}
                            >
                              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0d4a28] mb-3 leading-tight">
                                {promoSlidesDynamic[promoSlide]?.title}
                              </h2>
                              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                                {promoSlidesDynamic[promoSlide]?.subtitle}
                              </p>
                              <Button className="w-fit bg-[#0d4a28] hover:bg-[#0a3a20] rounded-full px-6 shadow-md hover:shadow-lg transition-all group">
                                Learn More
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    {/* Progress bar */}
                    {promoSlidesDynamic.length > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5">
                        <motion.div
                          className="h-full rounded-r-full"
                          style={{ backgroundColor: promoSlidesDynamic[promoSlide]?.accentColor || '#c8a415' }}
                          animate={{ width: `${promoProgress}%` }}
                          transition={{ duration: 0.08, ease: 'linear' }}
                        />
                      </div>
                    )}
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Side peek cards (decorative) */}
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-[calc(50%-280px)] opacity-30 pointer-events-none">
                <div className="w-40 h-52 rounded-xl overflow-hidden shadow-lg rotate-[-3deg]">
                  {promoSlidesDynamic.length > 0 && <img loading="lazy" src={promoSlidesDynamic[(promoSlide - 1 + promoSlidesDynamic.length) % promoSlidesDynamic.length]?.image} alt="" className="w-full h-full object-cover" />}
                </div>
              </div>
              <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-[calc(50%-280px)] opacity-30 pointer-events-none">
                <div className="w-40 h-52 rounded-xl overflow-hidden shadow-lg rotate-[3deg]">
                  {promoSlidesDynamic.length > 0 && <img loading="lazy" src={promoSlidesDynamic[(promoSlide + 1) % promoSlidesDynamic.length]?.image} alt="" className="w-full h-full object-cover" />}
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => { setPromoSlide(prev => (prev - 1 + promoSlidesDynamic.length) % promoSlidesDynamic.length); setPromoProgress(0) }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-100 text-[#0d4a28] flex items-center justify-center transition-all hover:bg-[#0d4a28] hover:text-white hover:border-[#0d4a28] opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => { setPromoSlide(prev => (prev + 1) % promoSlidesDynamic.length); setPromoProgress(0) }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-100 text-[#0d4a28] flex items-center justify-center transition-all hover:bg-[#0d4a28] hover:text-white hover:border-[#0d4a28] opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {promoSlidesDynamic.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => { setPromoSlide(idx); setPromoProgress(0) }}
                className="relative flex items-center justify-center"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <span className={`block rounded-full transition-all duration-400 ${idx === promoSlide ? 'w-7 h-2.5' : 'w-2.5 h-2.5 hover:opacity-80'}`} style={{ backgroundColor: idx === promoSlide ? (slide.accent || '#c8a415') : '#d1d5db' }} />
                {idx === promoSlide && (
                  <motion.span
                    layoutId="promo-dot-ring"
                    className="absolute inset-0 rounded-full border-2"
                    style={{ borderColor: slide.accent || '#c8a415' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Thumbnail strip for mobile - show 4 bank promos as small circles */}
          <div className="flex items-center justify-center gap-3 mt-5 lg:hidden">
            {promoSlidesDynamic.slice(0, 4).map((slide, idx) => (
              <button
                key={idx}
                onClick={() => { setPromoSlide(idx); setPromoProgress(0) }}
                className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all shadow-sm ${idx === promoSlide ? 'border-[#c8a415] scale-110 shadow-md' : 'border-gray-200 opacity-60'}`}
                aria-label={slide.title}
              >
                <img loading="lazy" src={slide.image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 5. MAYOR'S MESSAGE ═══════════════════ */}
      <section className="py-8 bg-[#0d4a28] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#c8a415] rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        {/* Subtle pattern lines */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 21px)' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left: Mayor Photo — 2 cols */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 flex flex-col items-center lg:items-end"
            >
              <div className="relative">
                {/* Gold ring */}
                <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border-[3px] border-[#c8a415]/60 shadow-2xl shadow-black/30 relative z-10">
                  <img loading="lazy" src="/mayor-photo.png" alt="Hon. Samuel Mollalign" className="w-full h-full object-cover object-top" />
                </div>
                {/* Background accent */}
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-[#c8a415]/20 z-0" />
                {/* Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#c8a415] text-white rounded-full px-5 py-1.5 shadow-lg z-20 flex items-center gap-2">
                  <Landmark className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase">Mayor</span>
                </div>
              </div>
              {/* Social links */}
              <div className="flex items-center gap-2 mt-6">
                {socialIcons.filter((_, i) => [0, 2, 4].includes(i)).map((s) => (
                  <a key={s.name} href="#" onClick={(e) => e.preventDefault()} className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c8a415] flex items-center justify-center transition-all duration-300 hover:scale-110" title={s.name}>
                    <span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4" dangerouslySetInnerHTML={{ __html: s.svg }} />
                  </a>
                ))}
                <a href="mailto:mayor@dessiecity.gov.et" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c8a415] flex items-center justify-center transition-all duration-300 hover:scale-110" title="Email">
                  <Mail className="w-4 h-4 text-white" />
                </a>
              </div>
            </motion.div>

            {/* Right: Message — 3 cols */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-[#c8a415]" />
                <span className="text-[#c8a415] text-[10px] font-bold tracking-[0.25em] uppercase">From the Mayor&apos;s Desk</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-1 leading-tight">
                A MESSAGE FROM<br />
                <span className="text-[#c8a415]">HON. SAMUEL MOLLALIGN</span>
              </h2>
              <p className="text-white/50 text-xs font-semibold tracking-[0.15em] uppercase mb-6">Mayor of Dessie City Administration</p>

              {/* Quote mark */}
              <div className="relative mb-6">
                <span className="absolute -top-3 -left-2 text-6xl text-[#c8a415]/20 font-serif leading-none">&ldquo;</span>
                <p className="text-white/85 leading-[1.85] text-sm pl-6 border-l-2 border-[#c8a415]/40">
                  Dear citizens of Dessie, it is my great honor to welcome you to our city&apos;s official digital platform.
                  As we embrace the digital age, our administration is committed to bringing government services closer
                  to you through this portal. We are working tirelessly to transform Dessie into a smart city that
                  delivers efficient, transparent, and citizen-centric services. Together, we are building a Dessie
                  that future generations will be proud of.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  className="bg-[#c8a415] hover:bg-[#b8950f] text-white font-bold tracking-wider text-xs px-6 py-5 shadow-lg shadow-[#c8a415]/20"
                  onClick={() => navigateTo('mayor')}
                >
                  READ FULL MESSAGE <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold text-xs px-6 py-5"
                  onClick={() => navigateTo('structure')}
                >
                  VIEW LEADERSHIP & STRUCTURE
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* ═══════════════════ 7. FEATURED PROJECTS ═══════════════════ */}
      <section className="py-8 bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] gov-section-title inline-block">
              FEATURED PROJECTS
            </h2>
            <Button
              variant="outline"
              className="border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white font-semibold tracking-wider text-sm"
              onClick={() => navigateTo('projects')}
            >
              VIEW ALL
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleProjects.map((proj, i) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Card className="h-full border border-[#e2e8e0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer" onClick={() => navigateTo('projects')}>
                  <div className="h-36 overflow-hidden">
                    <img loading="lazy" src={proj.image} alt={proj.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-[#1a1a1a] text-sm mb-1">{proj.title}</h3>
                    <p className="text-[#6b7280] text-xs leading-relaxed line-clamp-2">{proj.desc}</p>
                    <button className="text-[#1a6b3c] font-semibold text-xs flex items-center gap-1 mt-2 hover:gap-2 transition-all">
                      LEARN MORE <ArrowRight className="w-3 h-3" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <GreenPagination
            totalItems={featuredProjects.length}
            perPage={4}
            currentPage={projectPage}
            onPageChange={setProjectPage}
          />
        </div>
      </section>

      {/* ═══════════════════ 8. INVEST IN DESSIE ═══════════════════ */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] text-center gov-section-title inline-block mb-8">
            INVEST IN DESSIE
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-start mb-8">
            <div className="space-y-4">
              {[
                { title: 'Strategic Location', desc: 'Located on the main corridor between Addis Ababa and the port of Djibouti, providing excellent logistics access.' },
                { title: 'Young Workforce', desc: 'A growing population with a median age of 23, offering an energetic and trainable labor pool.' },
                { title: 'Government Incentives', desc: 'Tax holidays, subsidized land rates, and streamlined licensing for qualifying investors.' },
                { title: 'Growing Industrial Sector', desc: 'New industrial zones and business parks under development to support manufacturing and agribusiness.' },
              ].map((b, i) => (
                <motion.div
                  key={b.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-[#1a6b3c]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a1a] text-base">{b.title}</h3>
                    <p className="text-[#6b7280] text-sm mt-1">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: 'ETB 2.8B', label: 'Annual City Budget' },
                { value: '15,000+', label: 'Registered Businesses' },
                { value: '500 ha', label: 'New Industrial Zone' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Card className="bg-[#f8faf8] border border-[#e2e8e0]">
                    <CardContent className="p-5 text-center">
                      <p className="text-3xl md:text-4xl font-extrabold text-[#1a6b3c]">{s.value}</p>
                      <p className="text-[#6b7280] text-sm mt-1 font-medium">{s.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 9. HERITAGE & HISTORICAL PLACES ═══════════════════ */}
      <section className="py-8 bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] gov-section-title inline-block">{isAm ? 'ቅርስና ታሪካዊ ቦታዎች' : 'HERITAGE & HISTORICAL PLACES'}</h2>
              <div className="h-0.5 w-16 bg-[#c8a415] rounded-full mt-1" />
            </div>
            <Button variant="outline" size="sm" className="border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white text-xs font-bold" onClick={() => navigateTo('tourism')}>VIEW ALL</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {heritagePlaces.slice(heritagePage * HERITAGE_PER_PAGE, (heritagePage + 1) * HERITAGE_PER_PAGE).map((place, i) => (
              <motion.div key={place.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                <Card className="h-full border border-[#e2e8e0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="h-44 overflow-hidden">
                    <img loading="lazy" src={place.image} alt={place.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-[#1a1a1a] text-sm mb-1">{place.name}</h3>
                    <p className="text-[#6b7280] text-xs leading-relaxed line-clamp-3">{place.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          {heritagePlaces.length > HERITAGE_PER_PAGE && (
            <div className="mt-5 flex items-center justify-center gap-2">
              <button onClick={() => setHeritagePage(p => Math.max(0, p - 1))} disabled={heritagePage === 0}
                className="w-8 h-8 rounded-lg border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.ceil(heritagePlaces.length / HERITAGE_PER_PAGE) }, (_, i) => (
                <button key={i} onClick={() => setHeritagePage(i)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${heritagePage === i ? 'bg-[#0d4a28] text-white' : 'border border-[#e2e8e0] text-[#6b7280] hover:border-[#0d4a28]'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setHeritagePage(p => Math.min(Math.ceil(heritagePlaces.length / HERITAGE_PER_PAGE) - 1, p + 1))} disabled={heritagePage >= Math.ceil(heritagePlaces.length / HERITAGE_PER_PAGE) - 1}
                className="w-8 h-8 rounded-lg border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ 9b. DESSIE CITY LANDMARKS ═══════════════════ */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] gov-section-title inline-block">{isAm ? 'የደሴ ከተማ ታዋቂ ቦታዎች' : 'DESSIE CITY LANDMARKS'}</h2>
              <div className="h-0.5 w-16 bg-[#c8a415] rounded-full mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cityLandmarks.slice(landmarkPage * LANDMARK_PER_PAGE, (landmarkPage + 1) * LANDMARK_PER_PAGE).map((landmark, i) => (
              <motion.div key={landmark.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <div className="bg-white rounded-xl overflow-hidden border border-[#e2e8e0] hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-40 overflow-hidden">
                    <img loading="lazy" src={landmark.image} alt={landmark.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white font-bold text-xs leading-tight">{landmark.name}</h3>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-[#6b7280] text-xs leading-relaxed line-clamp-2">{landmark.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {cityLandmarks.length > LANDMARK_PER_PAGE && (
            <div className="mt-5 flex items-center justify-center gap-2">
              <button onClick={() => setLandmarkPage(p => Math.max(0, p - 1))} disabled={landmarkPage === 0}
                className="w-8 h-8 rounded-lg border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.ceil(cityLandmarks.length / LANDMARK_PER_PAGE) }, (_, i) => (
                <button key={i} onClick={() => setLandmarkPage(i)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${landmarkPage === i ? 'bg-[#0d4a28] text-white' : 'border border-[#e2e8e0] text-[#6b7280] hover:border-[#0d4a28]'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setLandmarkPage(p => Math.min(Math.ceil(cityLandmarks.length / LANDMARK_PER_PAGE) - 1, p + 1))} disabled={landmarkPage >= Math.ceil(cityLandmarks.length / LANDMARK_PER_PAGE) - 1}
                className="w-8 h-8 rounded-lg border border-[#e2e8e0] flex items-center justify-center disabled:opacity-30 hover:border-[#0d4a28] hover:bg-[#0d4a28] hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ 10. WEATHER & CITY INFO ═══════════════════ */}
      <section className="py-6 bg-white border-y border-[#e2e8e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 items-center">
            {/* Weather Card */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-2 flex items-center gap-3 bg-gradient-to-r from-[#e8f5e9] to-[#f0fdf4] rounded-xl p-3 border border-[#1a6b3c]/10">
              <CloudSun className="w-10 h-10 text-[#1a6b3c] shrink-0" />
              <div>
                <p className="text-2xl font-extrabold text-[#1a1a1a] leading-none">24°C</p>
                <p className="text-xs text-[#6b7280]">Partly Cloudy · Dessie</p>
              </div>
            </div>
            {/* Weather Details */}
            <div className="flex flex-col items-center gap-0.5 bg-[#f8faf8] rounded-xl p-3 border border-[#e2e8e0]">
              <Droplets className="w-4 h-4 text-[#1a6b3c]" />
              <p className="text-sm font-bold text-[#1a1a1a]">62%</p>
              <p className="text-[9px] text-[#6b7280]">Humidity</p>
            </div>
            <div className="flex flex-col items-center gap-0.5 bg-[#f8faf8] rounded-xl p-3 border border-[#e2e8e0]">
              <Wind className="w-4 h-4 text-[#1a6b3c]" />
              <p className="text-sm font-bold text-[#1a1a1a]">12km/h</p>
              <p className="text-[9px] text-[#6b7280]">Wind</p>
            </div>
            <div className="flex flex-col items-center gap-0.5 bg-[#f8faf8] rounded-xl p-3 border border-[#e2e8e0]">
              <Sunrise className="w-4 h-4 text-[#c8a415]" />
              <p className="text-sm font-bold text-[#1a1a1a]">6:12AM</p>
              <p className="text-[9px] text-[#6b7280]">Sunrise</p>
            </div>
            <div className="flex flex-col items-center gap-0.5 bg-[#f8faf8] rounded-xl p-3 border border-[#e2e8e0]">
              <MapPin className="w-4 h-4 text-[#c62828]" />
              <p className="text-sm font-bold text-[#1a1a1a]">2,470m</p>
              <p className="text-[9px] text-[#6b7280]">Altitude</p>
            </div>
            <div className="flex flex-col items-center gap-0.5 bg-[#f8faf8] rounded-xl p-3 border border-[#e2e8e0]">
              <Users className="w-4 h-4 text-[#0d4a28]" />
              <p className="text-sm font-bold text-[#1a1a1a]">450K+</p>
              <p className="text-[9px] text-[#6b7280]">Population</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 11. NEWSLETTER ═══════════════════ */}
      <section className="py-6 bg-[#1a6b3c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-bold text-white mb-0.5">{isAm ? 'ወቅታዊ ሁን' : 'STAY INFORMED'}</h2>
              <p className="text-white/70 text-sm">{isAm ? 'ከደሴ ከተማ አስተዳደር የቅርብ ጊዜ ዜናዎች ያግኙ።' : 'Get the latest news and announcements from Dessie City Administration.'}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#c8a415] h-10 min-w-[220px]"
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              />
              <Button
                className="bg-[#c8a415] hover:bg-[#b39412] text-[#1a1a1a] font-bold h-10 px-5 shrink-0"
                onClick={handleSubscribe}
                disabled={subscribing}
              >
                {subscribing ? '...' : 'SUBSCRIBE'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ RESOURCES & DOCUMENTS + EMERGENCY ═══════════════════ */}
      <section id="resources-section" className="py-8 bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Resources — 2/3 */}
            <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] gov-section-title inline-block mb-2">
              RESOURCES &amp; {isAm ? 'ሰነዶች' : 'DOCUMENTS'}
            </h2>
            <p className="text-[#6b7280] text-sm mb-6">Access official documents, proclamations, regulations, and application forms</p>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {[
                { label: 'Proclamations', icon: Scale, color: 'bg-[#0d4a28]' },
                { label: 'Regulations', icon: BookOpen, color: 'bg-[#1a6b3c]' },
                { label: 'Documents', icon: FileText, color: 'bg-[#c8a415]' },
                { label: 'Application Forms', icon: ClipboardList, color: 'bg-[#6b7280]' },
              ].map((cat, idx) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.label}
                    onClick={() => { setResCategory(idx); setResPage(0) }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      resCategory === idx
                        ? `${cat.color} text-white shadow-md`
                        : 'bg-white text-[#555] border border-[#e2e8e0] hover:border-[#1a6b3c]/30 hover:text-[#1a6b3c]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                )
              })}
            </div>

            {/* Document List */}
            <Card className="overflow-hidden border border-[#e2e8e0]">
              {(() => {
                const allDocs: Record<number, { title: string; date: string; size: string; type: string }[]> = {
                  0: [
                    { title: 'City Administration Proclamation No. 1/2015', date: '2024-01-15', size: '2.4 MB', type: 'PDF' },
                    { title: 'Municipal Tax Proclamation No. 3/2018', date: '2024-02-20', size: '1.8 MB', type: 'PDF' },
                    { title: 'Urban Planning Proclamation No. 5/2020', date: '2024-03-10', size: '3.1 MB', type: 'PDF' },
                    { title: 'Public Health Proclamation No. 7/2019', date: '2024-04-05', size: '2.0 MB', type: 'PDF' },
                    { title: 'Environmental Protection Proclamation No. 9/2021', date: '2024-05-18', size: '1.5 MB', type: 'PDF' },
                    { title: 'Land Use & Management Proclamation No. 2/2016', date: '2024-06-22', size: '4.2 MB', type: 'PDF' },
                    { title: 'Business Licensing Proclamation No. 4/2017', date: '2024-07-30', size: '1.9 MB', type: 'PDF' },
                    { title: 'Infrastructure Development Proclamation No. 6/2020', date: '2024-08-14', size: '2.7 MB', type: 'PDF' },
                    { title: 'Public Service Delivery Proclamation No. 8/2019', date: '2024-09-25', size: '3.3 MB', type: 'PDF' },
                    { title: 'Housing & Shelter Proclamation No. 10/2022', date: '2024-10-12', size: '2.1 MB', type: 'PDF' },
                    { title: 'Transportation Proclamation No. 11/2022', date: '2024-11-03', size: '1.7 MB', type: 'PDF' },
                    { title: 'Water Supply & Sanitation Proclamation No. 12/2023', date: '2024-12-01', size: '2.8 MB', type: 'PDF' },
                  ],
                  1: [
                    { title: 'Building Construction Regulation', date: '2024-01-20', size: '1.6 MB', type: 'PDF' },
                    { title: 'Traffic & Transportation Regulation', date: '2024-02-15', size: '1.3 MB', type: 'PDF' },
                    { title: 'Waste Management Directive', date: '2024-03-08', size: '0.9 MB', type: 'PDF' },
                    { title: 'Market & Trade Regulation', date: '2024-04-12', size: '2.1 MB', type: 'PDF' },
                    { title: 'Parks & Greenery Maintenance Guideline', date: '2024-05-22', size: '1.1 MB', type: 'PDF' },
                    { title: 'Fire Safety & Prevention Regulation', date: '2024-06-15', size: '1.4 MB', type: 'PDF' },
                    { title: 'Noise Pollution Control Directive', date: '2024-07-10', size: '0.7 MB', type: 'PDF' },
                    { title: 'Street Vendor Management Regulation', date: '2024-08-28', size: '1.0 MB', type: 'PDF' },
                    { title: 'Public Event Permit Regulation', date: '2024-09-18', size: '0.8 MB', type: 'PDF' },
                    { title: 'Heritage Site Protection Regulation', date: '2024-10-30', size: '1.9 MB', type: 'PDF' },
                  ],
                  2: [
                    { title: 'Dessie City Five-Year Development Plan (2021-2025)', date: '2024-01-10', size: '5.8 MB', type: 'PDF' },
                    { title: 'Annual Budget Report 2023/2024', date: '2024-02-28', size: '3.4 MB', type: 'PDF' },
                    { title: 'City Performance Audit Report Q1 2024', date: '2024-04-15', size: '2.2 MB', type: 'PDF' },
                    { title: 'Infrastructure Master Plan', date: '2024-05-20', size: '8.1 MB', type: 'PDF' },
                    { title: 'Socio-Economic Survey Report 2023', date: '2024-06-30', size: '4.5 MB', type: 'PDF' },
                    { title: 'Environmental Impact Assessment Summary', date: '2024-07-25', size: '2.9 MB', type: 'PDF' },
                    { title: 'Urban Governance Policy Paper', date: '2024-08-15', size: '1.8 MB', type: 'PDF' },
                    { title: 'Digital Transformation Strategy', date: '2024-09-10', size: '3.7 MB', type: 'PDF' },
                    { title: 'Public Consultation Summary Report', date: '2024-10-20', size: '1.2 MB', type: 'PDF' },
                    { title: 'Citizen Satisfaction Survey Results', date: '2024-11-30', size: '2.0 MB', type: 'PDF' },
                    { title: 'Revenue Collection Analysis FY 2023', date: '2024-12-15', size: '1.5 MB', type: 'PDF' },
                  ],
                  3: [
                    { title: 'Business License Application Form', date: '2024-01-05', size: '0.3 MB', type: 'PDF' },
                    { title: 'Building Permit Application Form', date: '2024-01-05', size: '0.4 MB', type: 'PDF' },
                    { title: 'Birth Registration Form', date: '2024-01-05', size: '0.2 MB', type: 'PDF' },
                    { title: 'Marriage Registration Form', date: '2024-01-05', size: '0.3 MB', type: 'PDF' },
                    { title: 'Land Lease Application Form', date: '2024-01-05', size: '0.5 MB', type: 'PDF' },
                    { title: 'Tax Exemption Request Form', date: '2024-02-10', size: '0.2 MB', type: 'PDF' },
                    { title: 'Public Event Permit Application', date: '2024-02-10', size: '0.3 MB', type: 'PDF' },
                    { title: 'Complaint Submission Form', date: '2024-02-10', size: '0.2 MB', type: 'PDF' },
                    { title: 'Job Vacancy Application Template', date: '2024-03-01', size: '0.4 MB', type: 'DOCX' },
                    { title: 'Bid Participation Registration Form', date: '2024-03-01', size: '0.3 MB', type: 'PDF' },
                    { title: 'Property Transfer Application', date: '2024-03-15', size: '0.5 MB', type: 'PDF' },
                    { title: 'Water & Electricity Connection Request', date: '2024-03-15', size: '0.2 MB', type: 'PDF' },
                    { title: 'Health Facility License Application', date: '2024-04-01', size: '0.3 MB', type: 'PDF' },
                  ],
                }
                const docs = allDocs[resCategory] || []
                const totalPages = Math.ceil(docs.length / RES_PER_PAGE)
                const pageDocs = docs.slice(resPage * RES_PER_PAGE, (resPage + 1) * RES_PER_PAGE)
                return (
                  <>
                    {/* Header row */}
                    <div className="bg-[#0d4a28] text-white px-4 py-3 grid grid-cols-12 gap-2 text-[10px] font-bold tracking-wider uppercase">
                      <div className="col-span-6 sm:col-span-7">Document Title</div>
                      <div className="col-span-2 hidden sm:block text-center">Date</div>
                      <div className="col-span-2 text-center">Type</div>
                      <div className="col-span-4 sm:col-span-1 text-center">Action</div>
                    </div>
                    {/* Document rows */}
                    <div className="divide-y divide-[#e2e8e0]">
                      {pageDocs.map((doc, i) => (
                        <motion.div
                          key={`${resCategory}-${resPage}-${i}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: i * 0.04 }}
                          className="px-4 py-3 grid grid-cols-12 gap-2 items-center hover:bg-[#f0f7f1] transition-colors group cursor-pointer"
                        >
                          <div className="col-span-6 sm:col-span-7 flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${doc.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                              <FileText className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-medium text-[#1a1a1a] truncate group-hover:text-[#1a6b3c] transition-colors">{doc.title}</span>
                          </div>
                          <div className="col-span-2 hidden sm:block text-center text-[10px] text-[#6b7280]">{doc.date}</div>
                          <div className="col-span-2 text-center">
                            <Badge variant="secondary" className={`text-[9px] px-2 py-0.5 border-0 font-bold ${doc.type === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                              {doc.type}
                            </Badge>
                          </div>
                          <div className="col-span-4 sm:col-span-1 flex justify-center">
                            <button
                              className="w-7 h-7 rounded-md bg-[#e8f5e9] text-[#1a6b3c] flex items-center justify-center hover:bg-[#1a6b3c] hover:text-white transition-colors"
                              onClick={(e) => { e.stopPropagation(); toast({ title: 'Download started', description: `${doc.title}` }) }}
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="px-4 py-3 bg-[#fafafa] border-t border-[#e2e8e0] flex items-center justify-between">
                        <span className="text-[10px] text-[#6b7280]">
                          Showing {resPage * RES_PER_PAGE + 1}–{Math.min((resPage + 1) * RES_PER_PAGE, docs.length)} of {docs.length} documents
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setResPage(p => Math.max(0, p - 1))}
                            disabled={resPage === 0}
                            className="w-7 h-7 rounded-md border border-[#e2e8e0] flex items-center justify-center text-[#6b7280] hover:bg-[#1a6b3c] hover:text-white hover:border-[#1a6b3c] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          {Array.from({ length: totalPages }, (_, i) => (
                            <button
                              key={i}
                              onClick={() => setResPage(i)}
                              className={`w-7 h-7 rounded-md text-[10px] font-bold transition-all ${
                                resPage === i
                                  ? 'bg-[#1a6b3c] text-white shadow-sm'
                                  : 'text-[#6b7280] hover:bg-[#e8f5e9] hover:text-[#1a6b3c]'
                              }`}
                            >
                              {i + 1}
                            </button>
                          ))}
                          <button
                            onClick={() => setResPage(p => Math.min(totalPages - 1, p + 1))}
                            disabled={resPage === totalPages - 1}
                            className="w-7 h-7 rounded-md border border-[#e2e8e0] flex items-center justify-center text-[#6b7280] hover:bg-[#1a6b3c] hover:text-white hover:border-[#1a6b3c] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )
              })()}
            </Card>
          </motion.div>
            </div>{/* end resources col */}

            {/* Emergency Contacts — 1/3 */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                <h2 className="text-xl font-bold text-[#1a1a1a] gov-section-title inline-block mb-2">{isAm ? 'ድንገተኛ ጥሪዎች' : 'EMERGENCY CONTACTS'}</h2>
                <p className="text-[#6b7280] text-sm mb-4">{isAm ? '24/7 ድንገተኛ አገልግሎቶች' : '24/7 emergency services'}</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { label: 'Police Emergency', number: '911', icon: Shield, color: '#1a6b3c', bg: '#f0fdf4' },
                    { label: 'Fire Brigade', number: '939', icon: Zap, color: '#c62828', bg: '#fef2f2' },
                    { label: 'Medical Emergency', number: '907', icon: Heart, color: '#0369a1', bg: '#eff6ff' },
                    { label: 'Water Authority', number: '+251-33-111-2222', icon: Droplets, color: '#0369a1', bg: '#eff6ff' },
                    { label: 'Electricity', number: '+251-33-111-3333', icon: Zap, color: '#c8a415', bg: '#fffbeb' },
                    { label: 'Health Bureau', number: '+251-33-111-4444', icon: Stethoscope, color: '#c62828', bg: '#fef2f2' },
                  ].map(({ label, number, icon: Icon, color, bg }) => (
                    <a key={label} href={`tel:${number.replace(/[\s-]/g, '')}`}
                      className="flex items-center gap-2.5 p-2 bg-white rounded-lg border border-[#e2e8e0] hover:border-[#0d4a28]/30 hover:shadow-sm transition-all group">
                      <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
                        <Icon className="w-3.5 h-3.5" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-[#1a1a1a] truncate leading-tight">{label}</p>
                        <p className="text-[10px] font-bold leading-tight" style={{ color }}>{number}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>{/* end grid */}
        </div>
      </section>

      {/* ═══════════════════ 12. INTERACTIVE MAP ═══════════════════ */}
      <section className="py-8 bg-[#f8faf8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] text-center gov-section-title inline-block mb-8">
            EXPLORE DESSIE
          </h2>
          <div className="rounded-xl overflow-hidden shadow-lg mb-6 relative bg-[#e8f0e8]">
            {/* OpenStreetMap iframe - 100% reliable and no API key required */}
            <div className="w-full h-[350px] md:h-[450px] relative overflow-hidden rounded-xl">
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight={0} 
                marginWidth={0} 
                src="https://www.openstreetmap.org/export/embed.html?bbox=39.55%2C11.08%2C39.71%2C11.18&amp;layer=mapnik&amp;marker=11.1333%2C39.6333" 
                className="w-full h-full border-none"
              ></iframe>
              <a
                href="https://www.openstreetmap.org/?mlat=11.1333&mlon=39.6333#map=13/11.1333/39.6333"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#0d4a28] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" /> View Full Map
              </a>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Landmark, name: 'City Administration Office', address: 'Bole Road, Dessie' },
              { icon: Bus, name: 'Bus Station', address: 'Main Terminal, Dessie' },
              { icon: Stethoscope, name: 'Hospital', address: 'Piazza Area, Dessie' },
              { icon: Factory, name: 'Industrial Zone', address: 'Kombolcha Road, Dessie' },
            ].map((loc, i) => {
              const Icon = loc.icon
              return (
                <motion.div
                  key={loc.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                >
                  <Card className="border border-[#e2e8e0] hover:border-[#1a6b3c]/30 transition-colors">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#1a6b3c]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#1a1a1a] text-sm">{loc.name}</h4>
                        <p className="text-[#6b7280] text-xs mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" /> {loc.address}
                        </p>
                        <button
                          onClick={() => {
                            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ', Dessie, Ethiopia')}`
                            window.open(url, '_blank')
                          }}
                          className="text-[#1a6b3c] text-xs font-semibold mt-2 flex items-center gap-1 hover:gap-2 transition-all"
                        >
                          <Navigation className="w-3 h-3" /> GET DIRECTIONS
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
