'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Target, UserCog, Landmark, Coins, HardHat, HeartHandshake, Scale,
  Cpu, Briefcase, Building2, Leaf, TrendingUp, BookOpen, Calendar,
  ChevronRight, Award, Shield, Users, Star, Quote, FileText, Clock,
  GraduationCap, MapPin, Phone, Mail, Facebook, Linkedin, X,
  ChevronLeft, ChevronDown, Building, Stethoscope, Zap, Bus, Receipt,
  FileCheck, ArrowRight, Twitter, Globe, Music
} from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import { useLang } from '@/lib/LangContext'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}

const socialIcons = [
  { name: 'Facebook', color: '#1877F2', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
  { name: 'X (Twitter)', color: '#000000', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
  { name: 'Telegram', color: '#2CA5E0', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>' },
  { name: 'LinkedIn', color: '#0A66C2', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>' },
  { name: 'YouTube', color: '#FF0000', svg: '<svg viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>' },
]

const mayorInfo = {
  name: 'Samuel Molalign Desalegn',
  title: 'Mayor of Dessie City',
  photo: '/mayor-photo.png',
  email: 'mayor@dessiecity.gov.et',
  phone: '+251 33 111 0001',
  appointed: '2023',
  term: '5 Years',
  location: 'Dessie, Amhara',
  bio: 'Brings over two decades of public service experience to the mayor\'s office. A dedicated leader and a native of Dessie, he has held various leadership positions in regional administration. His administration focuses on smart city transformation, youth empowerment, sustainable urban development, and transparent governance.',
  social: { facebook: '#', telegram: '#', linkedin: '#', email: 'mayor@dessiecity.gov.et', phone: '+251 33 111 0001' }
}

const deputyInfo = {
  name: 'Ato Getachew Hailu',
  title: 'Deputy Mayor',
  photo: '/official-deputy.png',
  email: 'deputy@dessiecity.gov.et',
  phone: '+251 33 111 0002',
  bio: 'Oversees cross-departmental coordination and represents the city in regional government affairs. Assists the Mayor in strategic decision-making and ensures implementation of council resolutions across all 12 kebeles.',
  social: { facebook: '#', telegram: '#', linkedin: '#', email: 'deputy@dessiecity.gov.et', phone: '+251 33 111 0002' }
}

const cabinetMembers = [
  {
    name: 'Ato Abebe Kebede', title: 'Head of Finance & Revenue', icon: Coins, color: '#1a6b3c', photo: '/official_abebe.png',
    email: 'finance@dessiecity.gov.et', phone: '+251 33 111 1001', office: 'Finance Building, 3rd Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Directs municipal revenue collection, budgeting, financial reporting, and audit compliance. 15+ years in public finance management.',
    achievements: ['Increased revenue collection by 35% in 2024', 'Digitized tax payment system', 'Published first citizen budget report']
  },
  {
    name: 'W/ro Hiwot Alemu', title: 'Head of Education', icon: GraduationCap, color: '#c8a415', photo: '/official_hiwot.png',
    email: 'education@dessiecity.gov.et', phone: '+251 33 111 1002', office: 'Education Bureau, 2nd Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Oversees 45+ schools, educational programs, scholarship initiatives, and adult literacy campaigns across all sub-cities.',
    achievements: ['Built 8 new schools in 2024', 'Launched digital learning program', '100% primary enrollment achieved']
  },
  {
    name: 'Ato Dawit Assefa', title: 'Head of Infrastructure', icon: HardHat, color: '#1a6b3c', photo: '/official_dawit.png',
    email: 'infrastructure@dessiecity.gov.et', phone: '+251 33 111 1003', office: 'Infrastructure Office, 1st Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Leads road construction, water systems, public buildings, and urban planning. Managing 200+ staff across multiple project sites.',
    achievements: ['Completed 45km road upgrade', 'Water coverage reached 85%', 'Launched smart infrastructure monitoring']
  },
  {
    name: 'W/ro Mekdes Tadesse', title: 'Head of Health', icon: Stethoscope, color: '#c8a415', photo: '/official_mekdes.png',
    email: 'health@dessiecity.gov.et', phone: '+251 33 111 1004', office: 'Health Bureau, 2nd Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Manages 8 hospitals, 15 health centers, public health programs, clinics, and disease prevention initiatives.',
    achievements: ['Inaugurated 200-bed hospital wing', 'Vaccination rate reached 95%', 'Launched telemedicine pilot program']
  },
  {
    name: 'Ato Tadesse Girma', title: 'Head of Trade & Industry', icon: Briefcase, color: '#1a6b3c', photo: '/official_tadesse.png',
    email: 'trade@dessiecity.gov.et', phone: '+251 33 111 1005', office: 'Trade & Industry Office, 1st Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Promotes investment, supports 15,000+ businesses, and manages market regulations and licensing.',
    achievements: ['Attracted ETB 2B new investment', 'Issued 3,000+ business licenses', 'Launched MSME support program']
  },
  {
    name: 'W/ro Selamawit Bekele', title: 'Head of Social Affairs', icon: HeartHandshake, color: '#c8a415', photo: '/official_selamawit.png',
    email: 'social@dessiecity.gov.et', phone: '+251 33 111 1006', office: 'Social Affairs Bureau, 1st Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Manages youth programs, women\'s affairs, disability inclusion, and community development across all sub-cities.',
    achievements: ['Supported 5,000 youth with training', 'Launched women empowerment fund', 'Built 3 community centers']
  },
  {
    name: 'Ato Yonas Tesfaye', title: 'City Manager', icon: UserCog, color: '#1a6b3c', photo: '/official_yonas.png',
    email: 'manager@dessiecity.gov.et', phone: '+251 33 111 1007', office: 'City Manager\'s Office, 2nd Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Manages day-to-day city operations, budget implementation of ETB 2.8B, and inter-departmental workflows with 25 staff.',
    achievements: ['Improved service delivery by 40%', 'Digitized 30+ government processes', 'Reduced citizen wait times by 60%']
  },
  {
    name: 'W/ro Tigist Mekonnen', title: 'City Council Speaker', icon: Landmark, color: '#c8a415', photo: '/official_tigist.png',
    email: 'council@dessiecity.gov.et', phone: '+251 33 111 1008', office: 'City Council Hall',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Presides over city council sessions with 47 elected members and ensures legislative process integrity and transparency.',
    achievements: ['Passed 28 proclamations', 'Held 48 public hearings', 'Increased citizen participation by 50%']
  },
  {
    name: 'Ato Fitsum Belete', title: 'Head of Legal Affairs', icon: Scale, color: '#1a6b3c', photo: '/official_fitsum.png',
    email: 'legal@dessiecity.gov.et', phone: '+251 33 111 1009', office: 'Legal Affairs, 1st Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Advises on municipal law, land disputes, regulatory compliance, and legislative drafting. 12 years of legal experience.',
    achievements: ['Resolved 500+ land disputes', 'Drafted 15 city regulations', 'Established legal aid clinic']
  },
  {
    name: 'W/ro Nardos Tadesse', title: 'Head of Urban Planning', icon: Building2, color: '#c8a415', photo: '/official_nardos.png',
    email: 'planning@dessiecity.gov.et', phone: '+251 33 111 1010', office: 'Planning Bureau, 2nd Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Develops and enforces city master plans, zoning regulations, and land use policies for Dessie\'s 254 km² area.',
    achievements: ['Updated city master plan 2024', 'Zoned 50 hectares for industry', 'Green building code implemented']
  },
  {
    name: 'Ato Henok Mulugeta', title: 'Head of Transport', icon: Bus, color: '#1a6b3c', photo: '/official_henok.png',
    email: 'transport@dessiecity.gov.et', phone: '+251 33 111 1011', office: 'Transport Office, Ground Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Manages public transportation network, road maintenance, traffic systems, and parking management.',
    achievements: ['Launched 5 new bus routes', 'Installed 200 traffic signals', 'Road maintenance covered 95%']
  },
  {
    name: 'W/ro Bethlehem Hailu', title: 'Head of Water & Energy', icon: Zap, color: '#c8a415', photo: '/official_bethlehem.png',
    email: 'water@dessiecity.gov.et', phone: '+251 33 111 1012', office: 'Water & Energy Bureau, 1st Floor',
    social: { facebook: '#', telegram: '#', linkedin: '#' },
    bio: 'Oversees water supply, sanitation, electricity distribution, and renewable energy projects serving 450,000 residents.',
    achievements: ['New water treatment plant operational', 'Electricity coverage reached 92%', 'Launched solar street light project']
  },
]

const orgStructure = {
  mayor: { title: 'Mayor', icon: Landmark, name: mayorInfo.name, bio: mayorInfo.bio, photo: mayorInfo.photo },
  deputy: { title: 'Deputy Mayor', icon: UserCog, name: deputyInfo.name, bio: deputyInfo.bio, photo: deputyInfo.photo },
  offices: [
    { title: "Mayor's Office", icon: Building, count: 15, desc: 'Executive support, protocol, communications, and strategic planning' },
    { title: 'City Council', icon: Users, count: 47, desc: 'Legislative body with elected representatives from all kebeles' },
    { title: "City Manager's Office", icon: FileCheck, count: 25, desc: 'Operational coordination, performance monitoring, and inter-departmental liaison' },
  ],
  departments: [
    { title: 'Finance & Revenue', icon: Receipt, head: 'Ato Abebe Kebede', staff: 120 },
    { title: 'Education', icon: GraduationCap, head: 'W/ro Hiwot Alemu', staff: 85 },
    { title: 'Infrastructure', icon: HardHat, head: 'Ato Dawit Assefa', staff: 200 },
    { title: 'Health', icon: Stethoscope, head: 'W/ro Mekdes Tadesse', staff: 150 },
    { title: 'Trade & Industry', icon: Briefcase, head: 'Ato Tadesse Girma', staff: 60 },
    { title: 'Social Affairs', icon: HeartHandshake, head: 'W/ro Selamawit Bekele', staff: 75 },
    { title: 'Legal Affairs', icon: Scale, head: 'Ato Fitsum Belete', staff: 35 },
    { title: 'Urban Planning', icon: Building2, head: 'W/ro Nardos Tadesse', staff: 45 },
    { title: 'Transport', icon: Bus, head: 'Ato Henok Mulugeta', staff: 90 },
    { title: 'Water & Energy', icon: Zap, head: 'W/ro Bethlehem Hailu', staff: 110 },
    { title: 'Agriculture', icon: Leaf, head: 'Ato Mulugeta Alemayehu', staff: 40 },
    { title: 'Culture & Tourism', icon: Music, head: 'W/ro Sara Hailu', staff: 30 },
  ],
  subCities: [
    { name: 'Sub-City 01 (Arada)', population: '45,000', kebeles: 4 },
    { name: 'Sub-City 02 (Piazza)', population: '52,000', kebeles: 4 },
    { name: 'Sub-City 03 (Mekelle Sefer)', population: '38,000', kebeles: 4 },
    { name: 'Sub-City 04 (Gofa Mazoria)', population: '48,000', kebeles: 4 },
    { name: 'Sub-City 05 (Tabor)', population: '42,000', kebeles: 4 },
    { name: 'Sub-City 06 (Bole)', population: '55,000', kebeles: 4 },
    { name: 'Sub-City 07 (Kazanchis)', population: '40,000', kebeles: 4 },
    { name: 'Sub-City 08 (Gulele)', population: '35,000', kebeles: 4 },
  ]
}

const priorities = [
  { title: 'Smart City Transformation', icon: Cpu, desc: 'Digital infrastructure, e-governance, and data-driven decision making.' },
  { title: 'Youth Employment', icon: Briefcase, desc: 'Creating 50,000 new job opportunities through skills training and investment attraction.' },
  { title: 'Infrastructure Development', icon: Building2, desc: 'Expanding roads, water supply, sanitation, and public transportation networks.' },
  { title: 'Public Service Reform', icon: Shield, desc: 'Streamlining bureaucratic processes and improving service delivery efficiency.' },
  { title: 'Environmental Protection', icon: Leaf, desc: 'Green spaces, waste management, air quality monitoring, and climate resilience.' },
  { title: 'Investment Promotion', icon: TrendingUp, desc: 'Creating a business-friendly environment to attract domestic and foreign investment.' },
]

const speeches = [
  { title: 'State of the City Address', date: 'July 2025', icon: Star },
  { title: 'Investment Summit Keynote', date: 'June 2025', icon: TrendingUp },
  { title: 'Budget Presentation', date: 'May 2025', icon: Coins },
]

/* Org Tree Node */
function OrgNode({ icon: Icon, title, subtitle, color = '#0d4a28', size = 'md', highlight = false, clickable = false, onClick }: {
  icon: any; title: string; subtitle?: string; color?: string; size?: 'sm' | 'md' | 'lg'; highlight?: boolean; clickable?: boolean; onClick?: () => void
}) {
  const sizes = { sm: 'px-3 py-2', md: 'px-4 py-3', lg: 'px-6 py-4' }
  const iconSizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' }
  const titleSizes = { sm: 'text-[10px]', md: 'text-xs', lg: 'text-sm' }
  return (
    <div
      onClick={onClick}
      className={`${sizes[size]} rounded-xl border-2 ${highlight ? 'border-[#c8a415] bg-[#c8a415]/5 shadow-md shadow-[#c8a415]/10' : `border-[#e2e8e0] bg-white`} ${clickable ? 'hover:shadow-md hover:border-[#1a6b3c]/30 cursor-pointer' : ''} transition-all flex items-center gap-2.5 w-full`}
    >
      <div className={`w-8 h-8 ${size === 'lg' ? 'w-10 h-10' : ''} rounded-lg flex items-center justify-center shrink-0`} style={{ backgroundColor: `${color}15` }}>
        <Icon className={`${iconSizes[size]}`} style={{ color }} />
      </div>
      <div className="min-w-0">
        <p className={`font-bold ${titleSizes[size]} ${highlight ? 'text-[#0d4a28]' : 'text-[#1a1a1a]'} truncate`}>{title}</p>
        {subtitle && <p className="text-[10px] text-[#6b7280] truncate">{subtitle}</p>}
      </div>
      {clickable && <ChevronRight className="w-3.5 h-3.5 text-[#6b7280] ml-auto shrink-0" />}
    </div>
  )
}

function VLine() {
  return <div className="w-px h-6 bg-[#1a6b3c]/20 mx-auto" />
}

/* Social Icons Component */
function SocialLinks({ social, size = 'sm' }: { social: Record<string, string>; size?: 'sm' | 'md' }) {
  const sz = size === 'sm' ? 'w-7 h-7' : 'w-8 h-8'
  const iconSz = size === 'sm' ? '[&>svg]:w-3 [&>svg]:h-3' : '[&>svg]:w-3.5 [&>svg]:h-3.5'
  return (
    <div className="flex items-center gap-1.5">
      {social.facebook && (
        <a href={social.facebook} onClick={(e) => e.preventDefault()} className={`${sz} rounded-full bg-[#e8f5e9] hover:bg-[#1877F2] flex items-center justify-center transition-all group`} title="Facebook">
          <span className={`text-[#1877F2] group-hover:text-white transition-colors ${iconSz}`} dangerouslySetInnerHTML={{ __html: socialIcons[0].svg }} />
        </a>
      )}
      {social.telegram && (
        <a href={social.telegram} onClick={(e) => e.preventDefault()} className={`${sz} rounded-full bg-[#e8f5e9] hover:bg-[#2CA5E0] flex items-center justify-center transition-all group`} title="Telegram">
          <span className={`text-[#2CA5E0] group-hover:text-white transition-colors ${iconSz}`} dangerouslySetInnerHTML={{ __html: socialIcons[2].svg }} />
        </a>
      )}
      {social.linkedin && (
        <a href={social.linkedin} onClick={(e) => e.preventDefault()} className={`${sz} rounded-full bg-[#e8f5e9] hover:bg-[#0A66C2] flex items-center justify-center transition-all group`} title="LinkedIn">
          <span className={`text-[#0A66C2] group-hover:text-white transition-colors ${iconSz}`} dangerouslySetInnerHTML={{ __html: socialIcons[3].svg }} />
        </a>
      )}
      {social.email && (
        <a href={`mailto:${social.email}`} className={`${sz} rounded-full bg-[#e8f5e9] hover:bg-[#1a6b3c] flex items-center justify-center transition-all group`} title="Email">
          <Mail className={`w-3 h-3 text-[#1a6b3c] group-hover:text-white transition-colors`} />
        </a>
      )}
      {social.phone && (
        <a href={`tel:${social.phone}`} className={`${sz} rounded-full bg-[#e8f5e9] hover:bg-[#1a6b3c] flex items-center justify-center transition-all group`} title="Phone">
          <Phone className={`w-3 h-3 text-[#1a6b3c] group-hover:text-white transition-colors`} />
        </a>
      )}
    </div>
  )
}

type DbCabinetMember = {
  id: string
  name: string
  title: string
  department: string
  photo?: string | null
  bio: string
  email?: string | null
  phone?: string | null
  socialLinks?: string | null
  order?: number
}

export default function MayorPage() {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const [cabinetPage, setCabinetPage] = useState(0)
  const CABINET_PER_PAGE = 4
  const [dbCabinet, setDbCabinet] = useState<DbCabinetMember[]>([])
  const [dbMayorInfo, setDbMayorInfo] = useState<{ name: string; photo: string; title: string } | null>(null)
  const [dbSpeeches, setDbSpeeches] = useState<{ title: string; date: string; icon: any }[]>([])
  const [selectedMember, setSelectedMember] = useState<any | null>(null)
  const [selectedOrg, setSelectedOrg] = useState<{ title: string; bio: string; photo: string; name: string; role?: string; email?: string; phone?: string; social?: any } | null>(null)

  useEffect(() => {
    // Fetch cabinet members
    fetch('/api/admin/cabinet-members')
      .then(r => r.json())
      .then((data: DbCabinetMember[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setDbCabinet(data)
          // Detect mayor from title/department
          const mayor = data.find(m =>
            m.title?.toLowerCase().includes('mayor') || m.department?.toLowerCase().includes('mayor') || m.order === 1
          )
          if (mayor) {
            setDbMayorInfo({
              name: mayor.name,
              photo: mayor.photo || '/mayor-photo.png',
              title: mayor.title,
            })
          }
        }
      })
      .catch(() => { })

    // Fetch news for speeches
    fetch('/api/admin/news')
      .then(r => r.json())
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          // Filter or just take the latest 3 for speeches
          const latest = data.slice(0, 3).map(news => ({
            title: news.title,
            date: new Date(news.createdAt).toLocaleDateString(),
            icon: FileText
          }))
          setDbSpeeches(latest)
        }
      })
      .catch(() => { })
  }, [])

  // Use DB data if available, fallback to hardcoded have aded  ADDDD VXCVCV
  const displayCabinet = dbCabinet.length > 0 ? dbCabinet : cabinetMembers
  const mayorName = dbMayorInfo?.name || mayorInfo.name
  const mayorPhoto = dbMayorInfo?.photo || mayorInfo.photo

  const displaySpeeches = dbSpeeches.length > 0 ? dbSpeeches : speeches

  const totalCabinetPages = Math.ceil(displayCabinet.length / CABINET_PER_PAGE)
  const pageMembers = displayCabinet.slice(cabinetPage * CABINET_PER_PAGE, (cabinetPage + 1) * CABINET_PER_PAGE)

  return (
    <main>
      {/* Page Banner */}
      <section className="bg-[#0d4a28] py-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-1/4 w-40 h-40 rounded-full border border-white/20" />
          <div className="absolute bottom-6 left-1/3 w-24 h-24 rounded-full border border-white/20" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <p className="text-[#c8a415] text-sm tracking-[0.2em] font-semibold mb-3 uppercase">{isAm ? 'አመራር' : 'Leadership'}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wide mb-4">{isAm ? 'የከንቲባ ቢሮ' : 'OFFICE OF THE MAYOR'}</h1>
          <Separator className="w-20 mx-auto bg-[#c8a415] h-0.5 mb-4" />
          <p className="text-white/70 text-sm tracking-widest uppercase">{isAm ? 'ዋና ገጽ / ከንቲባ' : 'Home / Mayor'}</p>
        </motion.div>
      </section>

      {/* ═══ MAYOR — FULL PROFILE CARD ═══ */}
      <section className="bg-white py-10 md:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="bg-gradient-to-br from-[#f8faf8] to-white rounded-3xl border border-[#e2e8e0] overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Photo side */}
                <div className="md:col-span-2 bg-gradient-to-b from-[#0d4a28] to-[#1a6b3c] p-8 flex flex-col items-center justify-center relative">
                  <div className="relative">
                    <img src={mayorPhoto} alt={mayorName} className="w-44 h-56 md:w-52 md:h-64 rounded-2xl object-cover object-top shadow-2xl border-[3px] border-[#c8a415]/50" />
                    <div className="absolute -bottom-3 -right-3 bg-[#c8a415] text-white rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold tracking-wider">MAYOR</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <SocialLinks social={mayorInfo.social} size="md" />
                  </div>
                </div>
                {/* Info side */}
                <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                  <Badge className="bg-[#c8a415]/10 text-[#c8a415] border-[#c8a415]/30 font-medium px-4 py-1.5 mb-4 w-fit">
                    <Award className="w-3 h-3 mr-1.5" /> Elected Official
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-[#0d4a28] mb-1">{mayorName}</h2>
                  <p className="text-[#1a6b3c] font-semibold text-lg md:text-xl mb-4">{dbMayorInfo?.title || mayorInfo.title}</p>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Appointed: {mayorInfo.appointed}</span>
                    <span className="text-border">|</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Term: {mayorInfo.term}</span>
                    <span className="text-border">|</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {mayorInfo.location}</span>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-muted-foreground leading-relaxed text-sm">{mayorInfo.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-[#f8faf8] rounded-lg px-3 py-2">
                      <Phone className="w-3.5 h-3.5 text-[#1a6b3c]" /> {mayorInfo.phone}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-[#f8faf8] rounded-lg px-3 py-2">
                      <Mail className="w-3.5 h-3.5 text-[#1a6b3c]" /> {mayorInfo.email}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ DEPUTY MAYOR — FULL PROFILE CARD ═══ */}
      <section className="bg-[#f8faf8] py-12 md:py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="bg-white rounded-3xl border border-[#e2e8e0] overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Photo */}
                <div className="md:col-span-2 bg-gradient-to-b from-[#1a6b3c] to-[#2d8a4e] p-8 flex flex-col items-center justify-center">
                  <div className="relative">
                    <img src={deputyInfo.photo} alt={deputyInfo.name} className="w-40 h-52 md:w-48 md:h-60 rounded-2xl object-cover object-top shadow-2xl border-2 border-white/20" />
                    <div className="absolute -bottom-3 -right-3 bg-white text-[#1a6b3c] rounded-xl px-3 py-1.5 shadow-lg flex items-center gap-1.5">
                      <UserCog className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold tracking-wider">DEPUTY</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <SocialLinks social={deputyInfo.social} size="md" />
                  </div>
                </div>
                {/* Info */}
                <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                  <Badge className="bg-[#1a6b3c]/10 text-[#1a6b3c] border-[#1a6b3c]/20 font-medium px-4 py-1.5 mb-4 w-fit">
                    Deputy Mayor
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0d4a28] mb-1">{deputyInfo.name}</h2>
                  <p className="text-[#1a6b3c] font-semibold text-lg mb-4">{deputyInfo.title}</p>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-5">{deputyInfo.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-[#f8faf8] rounded-lg px-3 py-2">
                      <Phone className="w-3.5 h-3.5 text-[#1a6b3c]" /> {deputyInfo.phone}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-[#f8faf8] rounded-lg px-3 py-2">
                      <Mail className="w-3.5 h-3.5 text-[#1a6b3c]" /> {deputyInfo.email}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mayor's Message */}
      <section className="bg-white py-10 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">MAYOR&apos;S MESSAGE</h2>
            </motion.div>
            <motion.div variants={fadeInUp} className="bg-[#f8faf8] rounded-2xl shadow-lg p-8 md:p-10 relative">
              <Quote className="absolute top-6 left-6 w-10 h-10 text-[#1a6b3c]/10" />
              <div className="space-y-5 text-muted-foreground leading-relaxed relative z-10">
                <p>Welcome to the official digital portal of Dessie City Administration. It is my great honor to serve the people of Dessie and to share our city&apos;s remarkable story of growth, resilience, and ambition with you through this platform.</p>
                <p>Our vision is clear — to transform Dessie into a model smart city in Ethiopia. Through digital governance, modern infrastructure, and citizen-centered services, we are building a city that is not only efficient and transparent but also inclusive and equitable for every resident.</p>
                <p>I invite every citizen to actively participate in shaping our city&apos;s future. Use this portal to access services, share your feedback, and stay informed. Together, we will build a Dessie that future generations will be proud of.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-border flex items-center gap-3">
                <img src={mayorPhoto} alt={mayorName} className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#1a6b3c]/20" />
                <div>
                  <p className="font-semibold text-[#0d4a28] text-sm">{mayorName}</p>
                  <p className="text-xs text-muted-foreground">{dbMayorInfo?.title || mayorInfo.title}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* ═══ EXECUTIVE CABINET MEMBERS — WITH PAGINATION ═══ */}
      <section className="bg-[#f8faf8] py-10 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <Badge className="bg-[#0d4a28] text-white mb-3 text-xs tracking-wider font-semibold px-3 py-1">EXECUTIVE</Badge>
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">CABINET MEMBERS</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm">Dedicated leaders delivering excellence in municipal governance. Click any member for full details.</p>
            </motion.div>

            {/* Member Cards Grid with pagination */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <AnimatePresence mode="wait">
                {pageMembers.map((member: any, idx) => {
                  const Icon = member.icon || Users
                  const cardColor = member.color || '#1a6b3c'
                  const photoSrc = member.photo || '/official-deputy.png'
                  const socialData = member.social || (member.socialLinks ? (() => { try { return JSON.parse(member.socialLinks) } catch { return {} } })() : {})
                  const emailDisplay = member.email ? String(member.email).split('@')[0] : ''
                  const phoneDisplay = member.phone ? String(member.phone).split(' ').slice(-1)[0] : ''
                  return (
                    <motion.div
                      key={`${cabinetPage}-${member.name}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 }}
                    >
                      <Card className="h-full border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 relative rounded-[20px] pt-10 pb-6 px-6 flex flex-col items-center text-center cursor-pointer group" onClick={() => setSelectedMember({ ...member, color: cardColor, photo: photoSrc, social: socialData })}>
                        {/* Tricolor top border */}
                        <div className="absolute top-0 left-0 w-full h-2 flex">
                          <div className="h-full flex-1 bg-[#1a6b3c]" />
                          <div className="h-full flex-1 bg-[#c8a415]" />
                          <div className="h-full flex-1 bg-[#c62828]" />
                        </div>

                        {/* Photo & Badge */}
                        <div className="relative mb-5">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-white shadow-md bg-[#0a2e19] flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                            <img src={photoSrc} alt={member.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=0a2e19&color=fff' }} />
                          </div>
                          {/* Department Badge */}
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: cardColor }}>
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                        
                        {/* Name & Role Pill */}
                        <h3 className="text-[1.1rem] font-extrabold text-[#0d4a28] mb-2">{member.name}</h3>
                        <div className="px-4 py-1.5 rounded-full text-white text-[10px] font-bold mb-4 shadow-sm" style={{ backgroundColor: cardColor }}>
                          {member.title}
                        </div>
                        
                        {/* Brief bio preview */}
                        <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-6 px-2">{member.bio}</p>

                        {/* Contact Info (Left aligned at bottom) */}
                        <div className="mt-auto w-full flex flex-col gap-2.5 text-left border-t border-gray-100 pt-4">
                          <div className="flex items-center gap-3 text-gray-500">
                            <Phone className="w-3.5 h-3.5 text-[#1a6b3c]" />
                            <span className="text-[11px] font-medium">{phoneDisplay || '+251 33 111 XXXX'}</span>
                          </div>
                          <div className="flex items-center gap-3 text-gray-500">
                            <Mail className="w-3.5 h-3.5 text-[#1a6b3c]" />
                            <span className="text-[11px] truncate font-medium">{emailDisplay ? `${emailDisplay}@dessiecity.gov.et` : 'contact@dessiecity.gov.et'}</span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCabinetPage(p => Math.max(0, p - 1))}
                disabled={cabinetPage === 0}
                className="w-8 h-8 rounded-full bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#155d33] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalCabinetPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCabinetPage(i)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${cabinetPage === i ? 'bg-[#1a6b3c] text-white shadow-md' : 'text-[#6b7280] hover:bg-[#e8f5e9] hover:text-[#1a6b3c]'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCabinetPage(p => Math.min(totalCabinetPages - 1, p + 1))}
                disabled={cabinetPage === totalCabinetPages - 1}
                className="w-8 h-8 rounded-full bg-[#1a6b3c] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#155d33] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Priorities */}
      <section className="bg-white py-10 md:py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block">KEY PRIORITIES</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {priorities.map((item) => (
                <motion.div key={item.title} variants={fadeInUp}>
                  <Card className="h-full border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-[#1a6b3c]/5 to-transparent blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700" />
                    <CardContent className="p-8 relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-[#1a6b3c]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-7 h-7 text-[#1a6b3c]" />
                      </div>
                      <h3 className="font-extrabold text-xl text-[#0d4a28] mb-3">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent Speeches / Announcements */}
      <section className="bg-[#f8faf8] py-10 md:py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <Badge className="bg-[#c8a415]/10 text-[#c8a415] border-[#c8a415]/30 mb-3 px-3 py-1 font-semibold uppercase tracking-widest text-[10px]">News & Press</Badge>
              <h2 className="gov-section-title text-2xl md:text-3xl font-bold text-[#0d4a28] inline-block block">LATEST ANNOUNCEMENTS</h2>
            </motion.div>
            <div className="space-y-4">
              {displaySpeeches.map((speech, index) => (
                <motion.div key={speech.title + index} variants={fadeInUp}>
                  <Card className="border-0 shadow-sm hover:shadow-lg hover:border-[#1a6b3c]/30 border border-transparent transition-all overflow-hidden group">
                    <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#1a6b3c] to-[#c8a415] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-5 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <speech.icon className="w-6 h-6 text-[#1a6b3c]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#0d4a28] text-lg truncate mb-1">{speech.title}</h3>
                          <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium"><Calendar className="w-3.5 h-3.5 text-[#c8a415]" /> {speech.date}</p>
                        </div>
                      </div>
                      <button className="flex items-center justify-between gap-2 bg-[#f0fdf4] hover:bg-[#1a6b3c] text-[#1a6b3c] hover:text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors w-full md:w-auto flex-shrink-0 mt-4 md:mt-0">
                        READ MORE <ChevronRight className="w-4 h-4" />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ MEMBER DETAIL DIALOG ═══ */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0">
          {selectedMember && (
            <>
              <div className="bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] p-6 flex flex-col sm:flex-row items-center gap-5">
                <img src={selectedMember.photo || '/official-deputy.png'} alt={selectedMember.name} className="w-24 h-24 rounded-2xl object-cover object-top shadow-xl border-2 border-white/20" />
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-white">{selectedMember.name}</h3>
                  <p className="text-[#c8a415] text-sm font-semibold mt-1">{selectedMember.title}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                    {selectedMember.icon && (
                      <div className="w-6 h-6 rounded-md flex items-center justify-center text-white" style={{ backgroundColor: selectedMember.color || '#1a6b3c' }}>
                        <selectedMember.icon className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {selectedMember.social && Object.keys(selectedMember.social).length > 0 && (
                      <SocialLinks social={selectedMember.social} size="sm" />
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-[#1a6b3c] tracking-wider uppercase mb-2">Biography</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedMember.bio}</p>
                </div>
                {selectedMember.achievements && (
                  <div>
                    <h4 className="text-xs font-bold text-[#1a6b3c] tracking-wider uppercase mb-2">Key Achievements</h4>
                    <ul className="space-y-2">
                      {selectedMember.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Award className="w-3.5 h-3.5 text-[#c8a415] mt-0.5 shrink-0" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  {selectedMember.office && (
                    <div className="bg-[#f8faf8] rounded-lg p-3">
                      <p className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider">Office</p>
                      <p className="text-xs text-[#1a1a1a] font-medium mt-1">{selectedMember.office}</p>
                    </div>
                  )}
                  {selectedMember.email && (
                    <div className="bg-[#f8faf8] rounded-lg p-3">
                      <p className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider">Email</p>
                      <p className="text-xs text-[#1a1a1a] font-medium mt-1">{selectedMember.email}</p>
                    </div>
                  )}
                  {selectedMember.phone && (
                    <div className="bg-[#f8faf8] rounded-lg p-3">
                      <p className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider">Phone</p>
                      <p className="text-xs text-[#1a1a1a] font-medium mt-1">{selectedMember.phone}</p>
                    </div>
                  )}
                  <div className="bg-[#f8faf8] rounded-lg p-3">
                    <p className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider">Department</p>
                    <p className="text-xs text-[#1a1a1a] font-medium mt-1">{selectedMember.department || selectedMember.title}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══ ORG ITEM DETAIL DIALOG (Mayor/Deputy) ═══ */}
      <Dialog open={!!selectedOrg} onOpenChange={() => setSelectedOrg(null)}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
          {selectedOrg && (
            <>
              <div className="bg-gradient-to-br from-[#0d4a28] via-[#0d4a28] to-[#1a6b3c] p-8 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-[#c8a415]/10 translate-y-1/2 -translate-x-1/2" />
                <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
                  <div className="relative">
                    <img src={selectedOrg.photo} alt={selectedOrg.name} className="w-28 h-36 rounded-2xl object-cover object-top shadow-2xl border-[3px] border-[#c8a415]/40" />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#c8a415] text-white rounded-full px-4 py-1 shadow-lg">
                      <span className="text-[8px] font-bold tracking-[0.15em]">{selectedOrg.title}</span>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-white">{selectedOrg.name}</h3>
                    {selectedOrg.role && <p className="text-[#c8a415] text-sm font-semibold mt-1">{selectedOrg.role}</p>}
                    {selectedOrg.social && <div className="mt-4"><SocialLinks social={selectedOrg.social} size="md" /></div>}
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-[#1a6b3c] tracking-wider uppercase mb-2 flex items-center gap-1.5"><UserCog className="w-3.5 h-3.5" /> Biography</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedOrg.bio}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-3">
                  {selectedOrg.email && (
                    <div className="bg-[#f0fdf4] rounded-xl p-3.5 hover:shadow-sm transition-shadow">
                      <p className="text-[9px] text-[#6b7280] font-bold uppercase tracking-wider mb-1">Email</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#0d4a28] font-medium">
                        <Mail className="w-3.5 h-3.5 text-[#1a6b3c]" /> {selectedOrg.email}
                      </div>
                    </div>
                  )}
                  {selectedOrg.phone && (
                    <div className="bg-[#f0fdf4] rounded-xl p-3.5 hover:shadow-sm transition-shadow">
                      <p className="text-[9px] text-[#6b7280] font-bold uppercase tracking-wider mb-1">Phone</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#0d4a28] font-medium">
                        <Phone className="w-3.5 h-3.5 text-[#1a6b3c]" /> {selectedOrg.phone}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  )
}
