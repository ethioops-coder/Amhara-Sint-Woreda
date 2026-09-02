'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLang } from '@/lib/LangContext'
import {
  FileText, Calendar, Briefcase, DollarSign, Clock, Building2, Gavel,
  ChevronRight, AlertTriangle, Search, Image as ImageIcon, X, ZoomIn,
  Newspaper, Bell, Download, Play, ArrowRight, Filter, Grid3X3,
} from 'lucide-react'

interface AnnouncementsPageProps {
  navigateTo: (page: import('@/lib/types').PageId, extra?: any) => void
}

const fadeInUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }

/* ─── Status Badge ─── */
function StatusBadge({ status }: { status: string }) {
  if (status === 'Open') return <Badge className="bg-[#1a6b3c] text-white text-[10px] font-bold">● OPEN</Badge>
  if (status === 'Closed') return <Badge className="bg-gray-200 text-gray-500 text-[10px] font-bold">● CLOSED</Badge>
  return <Badge className="bg-[#c8a415] text-white text-[10px] font-bold">● AWARDED</Badge>
}

/* ─── Category color map ─── */
const catColor: Record<string, string> = {
  Technology: '#0d4a28', Economy: '#1a6b3c', Finance: '#c8a415',
  Infrastructure: '#4a6741', Social: '#2d6a4f', Important: '#c62828', General: '#1a6b3c',
}

/* ─── Static fallback data ─── */
const staticNews = [
  { id: 'smart-city-launch', title: 'Smart City Initiative Phase II Launch', date: 'Jul 10, 2025', category: 'Technology', image: '/news-smart-city.png', excerpt: 'The city administration announces the second phase of the Smart City Initiative, bringing enhanced digital governance, IoT-enabled infrastructure monitoring, and expanded e-services for all residents.' },
  { id: 'industrial-zone', title: 'New Industrial Zone Approved for Kebele 08', date: 'Jul 8, 2025', category: 'Economy', image: '/news-industry.png', excerpt: 'City council has approved the establishment of a new industrial zone in Kebele 08, expected to create over 5,000 jobs and attract significant investment to the region.' },
  { id: 'annual-budget', title: 'Annual Budget FY 2025/26 Released', date: 'Jul 5, 2025', category: 'Finance', image: '/news-meeting.png', excerpt: 'The municipal budget for the upcoming fiscal year has been published, with increased allocations for infrastructure, education, health services, and digital transformation.' },
  { id: 'road-construction', title: 'Major Road Construction Update', date: 'Jul 2, 2025', category: 'Infrastructure', image: '/news-infrastructure.png', excerpt: 'Progress report on the ongoing road construction projects across the city, including the Dessie-Woldiya highway expansion now 75% complete.' },
  { id: 'youth-program', title: 'Youth Employment Program Results', date: 'Jun 28, 2025', category: 'Social', image: '/news-health.png', excerpt: 'Over 5,000 youth have benefited from the city employment program, with 3,200 successfully placed in permanent positions across various departments.' },
  { id: 'council-meeting', title: 'City Council Q3 2025 Session Summary', date: 'Jun 25, 2025', category: 'General', image: '/news-council-1.png', excerpt: 'Highlights from the third-quarter city council session including new bylaws, infrastructure approvals, and citizen service upgrades announced.' },
]

const staticVacancies = [
  { id: 'v1', title: 'Senior Urban Planner', department: 'Planning & Development', type: 'Full-Time', salary: 'ETB 25,000 – 35,000', deadline: 'Aug 15, 2025', status: 'Open' },
  { id: 'v2', title: 'IT Systems Administrator', department: 'Digital Services', type: 'Full-Time', salary: 'ETB 20,000 – 28,000', deadline: 'Aug 10, 2025', status: 'Open' },
  { id: 'v3', title: 'Civil Engineer', department: 'Infrastructure', type: 'Contract', salary: 'ETB 30,000 – 45,000', deadline: 'Jul 30, 2025', status: 'Open' },
  { id: 'v4', title: 'Public Relations Officer', department: 'Communication', type: 'Full-Time', salary: 'ETB 18,000 – 24,000', deadline: 'Jul 25, 2025', status: 'Closed' },
  { id: 'v5', title: 'Finance Analyst', department: 'Finance', type: 'Full-Time', salary: 'ETB 22,000 – 30,000', deadline: 'Aug 5, 2025', status: 'Open' },
  { id: 'v6', title: 'Health Officer', department: 'Health Bureau', type: 'Permanent', salary: 'ETB 18,000 – 26,000', deadline: 'Aug 20, 2025', status: 'Open' },
]

const staticBids = [
  { id: 'b1', title: 'Road Construction — Kebele 05 to 07', reference: 'DCA/PROC/2025/038', category: 'Construction', deadline: 'Aug 20, 2025', budget: 'ETB 45,000,000', status: 'Open' },
  { id: 'b2', title: 'Office Furniture Supply', reference: 'DCA/PROC/2025/039', category: 'Supply', deadline: 'Aug 5, 2025', budget: 'ETB 2,500,000', status: 'Open' },
  { id: 'b3', title: 'IT Equipment Procurement', reference: 'DCA/PROC/2025/040', category: 'Technology', deadline: 'Jul 28, 2025', budget: 'ETB 8,000,000', status: 'Closed' },
  { id: 'b4', title: 'Water Pipeline Extension Project', reference: 'DCA/PROC/2025/041', category: 'Construction', deadline: 'Sep 1, 2025', budget: 'ETB 62,000,000', status: 'Open' },
  { id: 'b5', title: 'Street Lighting Upgrade', reference: 'DCA/PROC/2025/042', category: 'Infrastructure', deadline: 'Aug 25, 2025', budget: 'ETB 18,500,000', status: 'Open' },
  { id: 'b6', title: 'Waste Management Fleet', reference: 'DCA/PROC/2025/043', category: 'Environment', deadline: 'Sep 10, 2025', budget: 'ETB 30,000,000', status: 'Open' },
]

/* ─── Gallery images using existing public assets ─── */
const galleryImages = [
  { src: '/dessie-city-hall.png',         caption: 'Dessie City Hall',              tag: 'Government' },
  { src: '/dessie-city-hall-day.png',     caption: 'City Hall — Day View',          tag: 'Government' },
  { src: '/dessie-city-hall-night.png',   caption: 'City Hall — Night Illumination',tag: 'Government' },
  { src: '/dessie-conference-hall.png',   caption: 'Conference Hall',               tag: 'Events' },
  { src: '/dessie-service-center.png',    caption: 'One-Stop Service Center',       tag: 'Services' },
  { src: '/dessie-service-counter.png',   caption: 'Service Counter',               tag: 'Services' },
  { src: '/smart-meeting-room.jpg',       caption: 'Smart Meeting Room',            tag: 'Technology' },
  { src: '/smart-cctv.png',              caption: 'Security Control Center',        tag: 'Technology' },
  { src: '/smart-service-center.png',    caption: 'Digital Service Hub',            tag: 'Technology' },
  { src: '/smart-mesob-building.png',    caption: 'Mesob Smart Complex',            tag: 'Architecture' },
  { src: '/heritage-church.png',         caption: 'Saint Mary Church',              tag: 'Heritage' },
  { src: '/heritage-market.png',         caption: 'Historic Dessie Market',         tag: 'Heritage' },
  { src: '/heritage-landscape.png',      caption: 'Dessie Highland Landscape',      tag: 'Nature' },
  { src: '/heritage-waterfall.png',      caption: 'Tossa Waterfall',               tag: 'Nature' },
  { src: '/heritage-memorial.png',       caption: 'Battle Memorial Site',           tag: 'Heritage' },
  { src: '/heritage-fortress.png',       caption: 'Historic Fortress',              tag: 'Heritage' },
  { src: '/city-aerial.png',             caption: 'Aerial View of Dessie',          tag: 'City' },
  { src: '/building-hospital.png',       caption: 'Dessie Referral Hospital',       tag: 'Infrastructure' },
  { src: '/building-university.png',     caption: 'Wollo University',               tag: 'Education' },
  { src: '/building-stadium.png',        caption: 'Dessie Stadium',                 tag: 'Sports' },
  { src: '/building-alamude.png',        caption: 'Alamude Building',               tag: 'Architecture' },
  { src: '/building-commercial.png',     caption: 'Commercial District',            tag: 'Economy' },
  { src: '/news-council-1.png',          caption: 'City Council Session',           tag: 'Events' },
  { src: '/news-council-2.jpg',          caption: 'Council Meeting',                tag: 'Events' },
  { src: '/news-library-opening.jpg',    caption: 'Library Opening Ceremony',       tag: 'Events' },
  { src: '/news-ceremony.png',           caption: 'Official Ceremony',              tag: 'Events' },
  { src: '/project-smart-city.png',      caption: 'Smart City Project',             tag: 'Projects' },
  { src: '/project-road.png',            caption: 'Road Construction',              tag: 'Projects' },
  { src: '/project-healthcare.png',      caption: 'Healthcare Project',             tag: 'Projects' },
  { src: '/team-meeting.png',            caption: 'Administration Team',            tag: 'Government' },
]

const galleryTags = ['All', 'Government', 'Events', 'Services', 'Technology', 'Heritage', 'Nature', 'Infrastructure', 'Projects', 'City', 'Architecture', 'Education', 'Sports', 'Economy']

type Tab = 'news' | 'vacancies' | 'bids' | 'gallery'

export default function AnnouncementsPage({ navigateTo }: AnnouncementsPageProps) {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const [tab, setTab] = useState<Tab>('news')
  const [search, setSearch] = useState('')
  const [galleryTag, setGalleryTag] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [dbNews, setDbNews] = useState<any[]>([])
  const [dbVacancies, setDbVacancies] = useState<any[]>([])
  const [dbBids, setDbBids] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/admin/news').then(r => r.ok ? r.json() : []).then((d: any[]) => {
      if (d?.length) setDbNews(d.filter(a => a.approvalStatus === 'approved' || a.status === 'published'))
    }).catch(() => {})
    fetch('/api/vacancies').then(r => r.ok ? r.json() : []).then((d: any[]) => {
      if (d?.length) setDbVacancies(d)
    }).catch(() => {})
    fetch('/api/bids').then(r => r.ok ? r.json() : []).then((d: any[]) => {
      if (d?.length) setDbBids(d)
    }).catch(() => {})
  }, [])

  const news = dbNews.length > 0 ? dbNews.map((a: any) => ({
    id: a.id, title: a.title, date: new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: a.category || 'General',
    image: a.image || '/news-meeting.png',
    excerpt: a.excerpt || '',
  })) : staticNews

  const vacancies = dbVacancies.length > 0 ? dbVacancies : staticVacancies
  const bids = dbBids.length > 0 ? dbBids : staticBids

  const filteredNews = news.filter(n => !search || n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase()))
  const filteredVacancies = vacancies.filter(v => !search || v.title.toLowerCase().includes(search.toLowerCase()))
  const filteredBids = bids.filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()))
  const filteredGallery = galleryImages.filter(g => galleryTag === 'All' || g.tag === galleryTag)

  // Lightbox keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox(i => i !== null ? Math.min(i + 1, filteredGallery.length - 1) : null)
      if (e.key === 'ArrowLeft') setLightbox(i => i !== null ? Math.max(i - 1, 0) : null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, filteredGallery.length])

  const featured = filteredNews[0]
  const restNews = filteredNews.slice(1)

  const tabs: { id: Tab; label: string; labelAm: string; icon: React.ElementType; count?: number }[] = [
    { id: 'news',      label: 'News & Media',   labelAm: 'ዜናዎች',      icon: Newspaper,  count: news.length },
    { id: 'vacancies', label: 'Vacancies',       labelAm: 'ክፍት ቦታዎች',  icon: Briefcase,  count: vacancies.filter(v => v.status === 'Open').length },
    { id: 'bids',      label: 'Bids & Tenders',  labelAm: 'ጨረታዎች',     icon: Gavel,      count: bids.filter(b => b.status === 'Open').length },
    { id: 'gallery',   label: 'Photo Gallery',   labelAm: 'ፎቶ ጋለሪ',    icon: Grid3X3,    count: galleryImages.length },
  ]

  return (
    <div className="min-h-screen bg-[#f8faf8]">

      {/* ═══ HERO BANNER ═══ */}
      <section className="relative bg-[#0d4a28] overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d4a28]/80 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <Bell className="w-3.5 h-3.5 text-[#c8a415]" />
              <span className="text-white text-xs font-bold tracking-widest uppercase">{isAm ? 'ዜናና ሚዲያ' : 'News & Media Center'}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
              {isAm ? 'ማስታወቂያዎችና ዜናዎች' : 'Announcements & News'}
            </h1>
            <p className="text-white/70 text-base max-w-xl mx-auto">
              {isAm ? 'ከደሴ ከተማ አስተዳደር የሚወጡ ዜናዎች፣ ክፍት ቦታዎችና ጨረታዎች' : 'Official news, vacancies, tenders, and media from Dessie City Administration'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ TAB BAR ═══ */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map(t => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => { setTab(t.id); setSearch('') }}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all
                    ${tab === t.id ? 'border-[#0d4a28] text-[#0d4a28] bg-[#0d4a28]/4' : 'border-transparent text-gray-500 hover:text-[#0d4a28] hover:bg-gray-50'}`}
                >
                  <Icon className="w-4 h-4" />
                  {isAm ? t.labelAm : t.label}
                  {t.count !== undefined && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tab === t.id ? 'bg-[#0d4a28] text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {t.count}
                    </span>
                  )}
                </button>
              )
            })}

            {/* Search - right side */}
            {tab !== 'gallery' && (
              <div className="ml-auto flex items-center pl-4 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <Input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={isAm ? 'ፈልግ...' : 'Search...'}
                    className="pl-9 h-8 w-40 sm:w-56 text-xs border-gray-200"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">

          {/* ═══════════ NEWS TAB ═══════════ */}
          {tab === 'news' && (
            <motion.div key="news" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {filteredNews.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-semibold">{isAm ? 'ዜናዎች አልተገኙም' : 'No news found'}</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Featured story */}
                  {featured && !search && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                      onClick={() => navigateTo('news-detail', { newsId: featured.id })}>
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-full min-h-[280px]">
                          <img src={featured.image || '/news-meeting.png'} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={e => { e.currentTarget.src = '/news-meeting.png' }} />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest"
                              style={{ backgroundColor: catColor[featured.category] || '#1a6b3c' }}>
                              {featured.category}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-[#c8a415] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Featured</span>
                          </div>
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                            <Calendar className="w-3.5 h-3.5" />
                            {featured.date}
                          </div>
                          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0d4a28] mb-4 leading-tight group-hover:text-[#1a6b3c] transition-colors">
                            {featured.title}
                          </h2>
                          <p className="text-gray-600 leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                          <span className="inline-flex items-center gap-2 text-[#1a6b3c] font-bold text-sm group-hover:gap-3 transition-all">
                            {isAm ? 'ተጨማሪ አንብብ' : 'Read Full Story'} <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* News grid */}
                  <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={stagger} initial="hidden" animate="visible">
                    {(search ? filteredNews : restNews).map((item, i) => (
                      <motion.div key={item.id} variants={fadeInUp}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
                        onClick={() => navigateTo('news-detail', { newsId: item.id })}>
                        <div className="relative h-48 overflow-hidden">
                          <img src={item.image || '/news-meeting.png'} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={e => { e.currentTarget.src = '/news-meeting.png' }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                              style={{ backgroundColor: catColor[item.category] || '#1a6b3c' }}>
                              {item.category}
                            </span>
                          </div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 drop-shadow-md">{item.title}</h3>
                          </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                          <p className="text-xs text-gray-500 line-clamp-2 flex-1 leading-relaxed">{item.excerpt}</p>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                            <span className="flex items-center gap-1.5 text-[11px] text-gray-400">
                              <Calendar className="w-3 h-3" /> {item.date}
                            </span>
                            <span className="text-[11px] text-[#1a6b3c] font-bold flex items-center gap-1">
                              {isAm ? 'አንብብ' : 'Read'} <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {/* ═══════════ VACANCIES TAB ═══════════ */}
          {tab === 'vacancies' && (
            <motion.div key="vacancies" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-[#0d4a28]">{filteredVacancies.filter(v => v.status === 'Open').length}</span> {isAm ? 'ክፍት ቦታዎች' : 'open positions'}
                </p>
              </div>
              <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" variants={stagger} initial="hidden" animate="visible">
                {filteredVacancies.map(item => (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Card className={`h-full border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-2xl overflow-hidden ${item.status === 'Closed' ? 'opacity-60' : ''}`}>
                      {/* Top accent bar */}
                      <div className="h-1.5 w-full" style={{ background: item.status === 'Open' ? 'linear-gradient(to right, #0d4a28, #1a6b3c)' : '#e5e7eb' }} />
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-3">
                          <StatusBadge status={item.status} />
                          <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{(item as any).type}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-[#0d4a28] mb-3 leading-snug">{item.title}</h3>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Building2 className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                            {(item as any).department}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <DollarSign className="w-3.5 h-3.5 text-[#1a6b3c] shrink-0" />
                            {(item as any).salary}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5 text-[#c8a415] shrink-0" />
                            {isAm ? 'የማስጠናቀቂያ ቀን:' : 'Deadline:'} {(item as any).deadline}
                          </div>
                        </div>
                        <Button
                          className={`mt-4 w-full text-xs h-9 font-bold rounded-xl ${item.status === 'Open' ? 'bg-[#0d4a28] hover:bg-[#1a6b3c] text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                          disabled={item.status !== 'Open'}
                          onClick={() => navigateTo('vacancy-detail', { vacancyId: item.id })}
                        >
                          {item.status === 'Open' ? (isAm ? 'ዝርዝር ይመልከቱ' : 'VIEW & APPLY') : (isAm ? 'ተዘጋ' : 'CLOSED')}
                          {item.status === 'Open' && <ChevronRight className="w-3.5 h-3.5 ml-1" />}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ═══════════ BIDS TAB ═══════════ */}
          {tab === 'bids' && (
            <motion.div key="bids" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-gray-500">
                  <span className="font-bold text-[#0d4a28]">{filteredBids.filter(b => b.status === 'Open').length}</span> {isAm ? 'ክፍት ጨረታዎች' : 'open tenders'}
                </p>
              </div>
              <motion.div className="grid sm:grid-cols-2 gap-5" variants={stagger} initial="hidden" animate="visible">
                {filteredBids.map(item => (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Card className={`h-full border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-2xl overflow-hidden ${item.status === 'Closed' ? 'opacity-60' : ''}`}>
                      <div className="h-1.5 w-full" style={{ background: item.status === 'Open' ? 'linear-gradient(to right, #c8a415, #0d4a28)' : '#e5e7eb' }} />
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <StatusBadge status={item.status} />
                          <span className="text-[10px] font-bold text-[#1a6b3c] bg-[#1a6b3c]/10 px-2 py-1 rounded-full">{(item as any).category}</span>
                          <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{(item as any).reference}</span>
                        </div>
                        <h3 className="text-base font-extrabold text-[#0d4a28] mb-3 leading-snug">{item.title}</h3>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <DollarSign className="w-3.5 h-3.5 text-[#c8a415] shrink-0" />
                            {isAm ? 'ወጪ:' : 'Budget:'} <span className="font-bold text-[#0d4a28]">{(item as any).budget}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5 text-[#c8a415] shrink-0" />
                            {isAm ? 'የማስጠናቀቂያ ቀን:' : 'Deadline:'} {(item as any).deadline}
                          </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                          <Button
                            className={`flex-1 text-xs h-9 font-bold rounded-xl ${item.status === 'Open' ? 'bg-[#0d4a28] hover:bg-[#1a6b3c] text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            disabled={item.status !== 'Open'}
                            onClick={() => navigateTo('bids-detail', { bidId: item.id })}
                          >
                            {item.status === 'Open' ? (isAm ? 'ዝርዝር' : 'VIEW DETAILS') : 'CLOSED'}
                            {item.status === 'Open' && <ChevronRight className="w-3.5 h-3.5 ml-1" />}
                          </Button>
                          {item.status === 'Open' && (
                            <Button variant="outline" className="h-9 px-3 border-gray-200 rounded-xl" title="Download documents">
                              <Download className="w-3.5 h-3.5 text-[#1a6b3c]" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ═══════════ GALLERY TAB ═══════════ */}
          {tab === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Tag filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {galleryTags.map(t => (
                  <button key={t} onClick={() => setGalleryTag(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all
                      ${galleryTag === t ? 'bg-[#0d4a28] text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-[#0d4a28] hover:text-[#0d4a28]'}`}>
                    {t}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-400 mb-4">{filteredGallery.length} {isAm ? 'ፎቶዎች' : 'photos'} · {isAm ? 'ሙሉ ምስል ለማየት ጠቅ ያድርጉ' : 'Click to enlarge'}</p>

              {/* Masonry-style grid */}
              <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3" variants={stagger} initial="hidden" animate="visible">
                {filteredGallery.map((img, i) => (
                  <motion.div key={img.src + i} variants={fadeInUp}
                    onClick={() => setLightbox(i)}
                    className="group relative overflow-hidden rounded-xl cursor-pointer bg-gray-100 aspect-square shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                    <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={e => { (e.currentTarget as HTMLImageElement).src = '/dessie-logo.png' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white text-[10px] font-semibold leading-tight truncate">{img.caption}</p>
                      <span className="text-[9px] text-[#c8a415] font-bold">{img.tag}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ═══ LIGHTBOX ═══ */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}>
            <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/60 hover:text-white z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? Math.max(i - 1, 0) : null) }}
              disabled={lightbox === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20">
              ‹
            </button>
            <button onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? Math.min(i + 1, filteredGallery.length - 1) : null) }}
              disabled={lightbox === filteredGallery.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-20">
              ›
            </button>
            <motion.div key={lightbox} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.2 }}
              className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <img src={filteredGallery[lightbox]?.src} alt={filteredGallery[lightbox]?.caption}
                className="w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                onError={e => { (e.currentTarget as HTMLImageElement).src = '/dessie-logo.png' }} />
              <div className="mt-3 text-center">
                <p className="text-white font-semibold">{filteredGallery[lightbox]?.caption}</p>
                <p className="text-[#c8a415] text-xs font-bold mt-1">{filteredGallery[lightbox]?.tag}</p>
                <p className="text-white/40 text-xs mt-2">{lightbox + 1} / {filteredGallery.length} · Use ← → keys to navigate</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
