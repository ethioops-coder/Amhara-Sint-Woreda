'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/lib/LangContext'
import {
  Home, Info, Crown, Wrench, Bell, Phone,
  Newspaper, Briefcase, Gavel, FolderOpen, Mountain, Hotel,
  FileText, Building2, MapPin, Receipt, Heart, Stethoscope,
  GraduationCap, Bus, Zap, MessageSquare, Calendar, Users,
  ChevronRight, X, Globe, Shield, BookOpen,
} from 'lucide-react'

/* ─── Types ─── */
interface SubItem {
  id: string
  label: string
  icon?: React.ElementType
  href?: string
}
interface MenuItem {
  id: string
  label: string
  labelAm?: string
  icon: React.ElementType
  color: string
  children?: SubItem[]
}

/* ─── Menu definition ─── */
const MENU: MenuItem[] = [
  {
    id: 'home', label: 'Home', labelAm: 'ዋና ገጽ',
    icon: Home, color: '#0d4a28',
  },
  {
    id: 'about', label: 'About', labelAm: 'ስለ ደሴ',
    icon: Info, color: '#1a6b3c',
    children: [
      { id: 'about', label: 'About Dessie', labelAm: 'ስለ ደሴ ከተማ', icon: Globe } as any,
      { id: 'mayor', label: "Mayor's Profile", labelAm: 'የከንቲባ ፕሮፋይል', icon: Crown } as any,
      { id: 'structure', label: 'City Structure', labelAm: 'መዋቅር', icon: Building2 } as any,
      { id: 'cabinet', label: 'Cabinet Members', labelAm: 'ካቢኔ አባላት', icon: Users } as any,
      { id: 'smart-city', label: 'Smart City', labelAm: 'ስማርት ሲቲ', icon: Shield } as any,
    ],
  },
  {
    id: 'services', label: 'Services', labelAm: 'አገልግሎቶች',
    icon: Wrench, color: '#155d33',
    children: [
      { id: 'services', label: 'All Services', icon: Wrench } as any,
      { id: '/services/Birth Registration', label: 'Birth Registration', icon: FileText } as any,
      { id: '/services/Business License', label: 'Business License', icon: Briefcase } as any,
      { id: '/services/Building Permit', label: 'Building Permit', icon: Building2 } as any,
      { id: '/services/Land Services', label: 'Land Services', icon: MapPin } as any,
      { id: '/services/Tax Payment', label: 'Tax Payment', icon: Receipt } as any,
      { id: '/services/Health Services', label: 'Health Services', icon: Stethoscope } as any,
      { id: '/services/Education', label: 'Education', icon: GraduationCap } as any,
      { id: '/services/Transportation', label: 'Transportation', icon: Bus } as any,
      { id: '/services/Water & Electricity', label: 'Water & Electricity', icon: Zap } as any,
      { id: '/services/Complaints', label: 'Complaints', icon: MessageSquare } as any,
      { id: '/services/Appointments', label: 'Appointments', icon: Calendar } as any,
    ],
  },
  {
    id: 'news', label: 'News & Media', labelAm: 'ዜናዎች',
    icon: Newspaper, color: '#0d4a28',
    children: [
      { id: 'news', label: 'Latest News', icon: Newspaper } as any,
      { id: 'announcements', label: 'Announcements', icon: Bell } as any,
      { id: 'vacancies', label: 'Vacancies', icon: Briefcase } as any,
      { id: 'bids', label: 'Bids & Tenders', icon: Gavel } as any,
    ],
  },
  {
    id: 'projects', label: 'Projects', labelAm: 'ፕሮጀክቶች',
    icon: FolderOpen, color: '#1a6b3c',
    children: [
      { id: 'projects', label: 'All Projects', icon: FolderOpen } as any,
      { id: 'transparency', label: 'Transparency', icon: BookOpen } as any,
    ],
  },
  {
    id: 'tourism', label: 'Tourism', labelAm: 'ቱሪዝም',
    icon: Mountain, color: '#155d33',
    children: [
      { id: 'tourism', label: 'Heritage & Tourism', icon: Mountain } as any,
      { id: 'hotels', label: 'Hotels & Stay', icon: Hotel } as any,
    ],
  },
  {
    id: 'contact', label: 'Contact', labelAm: 'ያግኙን',
    icon: Phone, color: '#0d4a28',
  },
]

/* ─── Amharic label helper ─── */
function getLabel(item: { label: string; labelAm?: string }, isAm: boolean) {
  return isAm && item.labelAm ? item.labelAm : item.label
}

/* ─── Main component ─── */
export default function QuickNavBar() {
  const router = useRouter()
  const { lang } = useLang()
  const isAm = lang === 'am'
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        barRef.current && !barRef.current.contains(e.target as Node) &&
        panelRef.current && !panelRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function navigate(id: string) {
    setActiveMenu(null)
    if (id.startsWith('/')) { router.push(id); return }
    if (id === 'home') { router.push('/'); return }
    router.push(`/${id}`)
  }

  function toggleMenu(id: string) {
    const item = MENU.find(m => m.id === id)
    if (!item?.children?.length) {
      navigate(id)
      return
    }
    setActiveMenu(prev => prev === id ? null : id)
  }

  const activeItem = MENU.find(m => m.id === activeMenu)

  return (
    <div className="relative z-30 bg-white shadow-sm border-b border-gray-100">
      {/* ─── Tab bar ─── */}
      <div
        ref={barRef}
        className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {MENU.map(item => {
          const Icon = item.icon
          const isActive = activeMenu === item.id
          return (
            <button
              key={item.id}
              onClick={() => toggleMenu(item.id)}
              className={`
                flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-3.5 text-xs sm:text-sm font-semibold
                border-b-2 transition-all duration-200 whitespace-nowrap
                ${isActive
                  ? 'border-[#0d4a28] text-[#0d4a28] bg-[#0d4a28]/5'
                  : 'border-transparent text-gray-600 hover:text-[#0d4a28] hover:border-[#0d4a28]/30 hover:bg-gray-50'
                }
              `}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{getLabel(item, isAm)}</span>
              {item.children?.length ? (
                <motion.span
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-0.5"
                >
                  <ChevronRight className="w-3 h-3 rotate-90" />
                </motion.span>
              ) : null}
            </button>
          )
        })}
      </div>

      {/* ─── Sub-menu panel ─── */}
      <AnimatePresence>
        {activeItem?.children && (
          <motion.div
            ref={panelRef}
            key={activeItem.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden border-t border-gray-100 bg-gradient-to-r from-[#f8faf8] to-white"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              {/* Panel header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1 h-5 rounded-full"
                    style={{ backgroundColor: activeItem.color }}
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {getLabel(activeItem, isAm)}
                  </span>
                </div>
                <button
                  onClick={() => setActiveMenu(null)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-gray-500" />
                </button>
              </div>

              {/* Sub-items grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {activeItem.children.map((child, i) => {
                  const ChildIcon = (child as any).icon || ChevronRight
                  return (
                    <motion.button
                      key={child.id + i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.18 }}
                      onClick={() => navigate(child.id)}
                      className="
                        flex items-center gap-2 px-3 py-2.5 rounded-lg text-left
                        bg-white border border-gray-100 hover:border-[#0d4a28]/30
                        hover:bg-[#0d4a28]/5 hover:shadow-sm
                        transition-all duration-150 group
                      "
                    >
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ backgroundColor: `${activeItem.color}18` }}
                      >
                        <ChildIcon
                          className="w-3.5 h-3.5 transition-colors"
                          style={{ color: activeItem.color }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-[#0d4a28] leading-tight">
                        {(child as any).labelAm && isAm ? (child as any).labelAm : child.label}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
