"use client"
import React from 'react';
import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { fetcherArray } from '@/lib/fetcher';
import { Users, Mail, Phone, Briefcase } from 'lucide-react';
import { useLang } from '@/lib/LangContext';

// Stable default list — defined outside component to avoid useMemo dependency churn
const DEFAULT_CABINET_EN = [
  { name: "Samuel Mollalign",     role: "City Mayor",      department: "Mayor's Office",    image: "/cabinet_samuel.svg",   email: "mayor@dessiecity.gov.et",     phone: "+251-33-111-XXXX" },
  { name: "Mr. Ashenafi Alemayhu",role: "Deputy Mayor",    department: "Urban Development", image: "/cabinet_ashenafi.png", email: "deputy@dessiecity.gov.et",    phone: "+251-33-111-XXXX" },
  { name: "Mr. Shemels Getachew", role: "Deputy Mayor",    department: "Urban Development", image: "/cabinet_shemels.png",  email: "urban@dessiecity.gov.et",     phone: "+251-33-111-XXXX" },
  { name: "Mr. Seid Kassawu",     role: "Cabinet Member",  department: "Education Bureau",  image: "/cabinet_seid.png",     email: "education@dessiecity.gov.et", phone: "+251-33-111-XXXX" },
  { name: "Dr. Selam Tesfaye",    role: "Cabinet Member",  department: "Health Bureau",     image: "/official_mekdes.svg",  email: "health@dessiecity.gov.et",    phone: "+251-33-111-XXXX" },
  { name: "Mr. Dawit Bekele",     role: "Cabinet Member",  department: "Trade & Industry",  image: "/official_tadesse.svg", email: "trade@dessiecity.gov.et",     phone: "+251-33-111-XXXX" },
  { name: "Ms. Makda Yoseph",     role: "Cabinet Member",  department: "Women & Children",  image: "/official_selamawit.svg",email: "women@dessiecity.gov.et",    phone: "+251-33-111-XXXX" },
]
const DEFAULT_CABINET_AM = [
  { name: "ሳሙኤል ሞላልኝ ደሳለ",    role: "የደሴ ከተማ አስተዳደር ተቀዳሚ ምክንቲባ", department: "የከንቲባ ጽ/ቤት",     image: "/cabinet_samuel.svg",    email: "mayor@dessiecity.gov.et",     phone: "+251-33-111-XXXX" },
  { name: "አቶ አሸናፊ ዓለማየሁ",     role: "ምክትል ከንቲባ",                  department: "የከተማ ልማት",       image: "/cabinet_ashenafi.png",  email: "deputy@dessiecity.gov.et",    phone: "+251-33-111-XXXX" },
  { name: "አቶ ሽመልስ ጌታቸው",      role: "ምክትል ከንቲባ",                  department: "የከተማ ልማት",       image: "/cabinet_shemels.png",   email: "urban@dessiecity.gov.et",     phone: "+251-33-111-XXXX" },
  { name: "አቶ ሰይድ ካሳው",        role: "የካቢኔ አባል",                   department: "ትምህርት ቢሮ",       image: "/cabinet_seid.png",      email: "education@dessiecity.gov.et", phone: "+251-33-111-XXXX" },
  { name: "ዶ/ር ሰላም ተስፋዬ",      role: "የካቢኔ አባል",                   department: "ጤና ጥበቃ",         image: "/official_mekdes.svg",   email: "health@dessiecity.gov.et",    phone: "+251-33-111-XXXX" },
  { name: "አቶ ዳዊት በቀለ",        role: "የካቢኔ አባል",                   department: "ንግድና ኢንዱስትሪ",    image: "/official_tadesse.svg",  email: "trade@dessiecity.gov.et",     phone: "+251-33-111-XXXX" },
  { name: "ወ/ሪት ማክዳ ዮሴፍ",      role: "የካቢኔ አባል",                   department: "ሴቶችና ህፃናት",      image: "/official_selamawit.svg",email: "women@dessiecity.gov.et",     phone: "+251-33-111-XXXX" },
]

// SVG avatar data-URI fallback — shown instantly, no network needed
function avatarDataUri(name: string) {
  const initials = name.split(' ').map(w => w[0] || '').join('').substring(0, 2).toUpperCase()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#0d4a28"/><circle cx="100" cy="85" r="45" fill="#1a6b3c"/><ellipse cx="100" cy="185" rx="65" ry="45" fill="#1a6b3c"/><text x="100" y="96" font-family="Arial,sans-serif" font-size="36" font-weight="700" fill="#c8a415" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`
}

export default function CabinetPage() {
  const { lang } = useLang();
  const isAm = lang === 'am';
  const [heroImage, setHeroImage] = useState('/smart-meeting-room.jpg')

  // Fetch page-level hero image from admin
  React.useEffect(() => {
    fetch('/api/admin/site-images')
      .then(r => r.json())
      .then((data: { key: string; url: string }[]) => {
        if (Array.isArray(data)) {
          const hero = data.find(d => d.key === 'cabinet-hero')
          if (hero?.url) setHeroImage(hero.url)
        }
      })
      .catch(() => {})
  }, [])

  const defaultCabinetMembers = isAm ? DEFAULT_CABINET_AM : DEFAULT_CABINET_EN

  const { data: dbData } = useSWR('/api/public/cabinet', fetcherArray, {
    revalidateOnFocus: false,
    dedupingInterval: 120000,
  });

  const cabinetMembers = useMemo(() => {
    if (dbData && dbData.length > 0) {
      const mapped = dbData
        .filter((m: any) => m.approvalStatus === 'approved')
        .map((m: any) => ({
          name: m.name,
          role: m.title || m.position || 'Cabinet Member',
          department: m.department || 'Cabinet Office',
          // Use photo from DB if set, otherwise fall back to a local avatar SVG
          image: (m.photo && m.photo.trim()) ? m.photo : avatarDataUri(m.name),
          email: m.email || 'info@dessiecity.gov.et',
          phone: m.phone || '+251-33-111-XXXX',
        }))
      if (mapped.length > 0) return mapped
    }
    return defaultCabinetMembers
  }, [dbData, defaultCabinetMembers])

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Dessie Cabinet" 
            className="w-full h-full object-cover brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d4a28]/90 to-[#1a6b3c]/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <Users className="w-5 h-5 text-[#c8a415]" />
              <span className="text-white font-semibold tracking-wider text-sm uppercase">
                {isAm ? 'አስተዳደር' : 'Administration'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              {isAm ? 'የከተማው ካቢኔ አባላት' : 'City Cabinet Members'}
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              {isAm 
                ? 'ለደሴ ከተማ እድገትና ብልፅግና ሌት ተቀን የሚሰሩ አመራሮች። የህዝብን ጥያቄ ለመመለስ ቁርጠኛ የሆኑ።' 
                : 'Dedicated leaders working tirelessly for the development and prosperity of Dessie City.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-10 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cabinetMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 relative pt-10 pb-6 px-6 flex flex-col items-center text-center group"
            >
              {/* Tricolor top border */}
              <div className="absolute top-0 left-0 w-full h-2 flex">
                <div className="h-full flex-1 bg-[#1a6b3c]" />
                <div className="h-full flex-1 bg-[#c8a415]" />
                <div className="h-full flex-1 bg-[#c62828]" />
              </div>

              {/* Photo & Badge */}
              <div className="relative mb-5">
                <div className="w-28 h-28 rounded-full overflow-hidden border-[3px] border-white shadow-md bg-[#0a2e19] flex items-center justify-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = avatarDataUri(member.name)
                    }}
                  />
                </div>
                {/* Department Badge */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#0d4a28] border-2 border-white flex items-center justify-center text-white shadow-sm">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              
              {/* Name & Role Pill */}
              <h3 className="text-[1.25rem] font-extrabold text-[#0d4a28] mb-2">{member.name}</h3>
              <div className="px-4 py-1.5 rounded-full bg-[#1a6b3c] text-white text-xs font-bold mb-4 shadow-sm">
                {member.role}
              </div>
              
              {/* Bio/Description */}
              <p className="text-[13px] text-gray-500 leading-relaxed mb-6 px-2">
                 {isAm 
                   ? `${member.department}ን በበላይነት ይመራሉ፣ የከተማዋን አስተዳደራዊ ስራዎች ያስተባብራሉ።` 
                   : `Oversees the ${member.department} and coordinates key initiatives for the city administration.`}
              </p>

              {/* Contact Info (Left aligned at bottom) */}
              <div className="mt-auto w-full flex flex-col gap-3 text-left border-t border-gray-100 pt-5">
                <div className="flex items-center gap-3 text-gray-500">
                  <Phone className="w-4 h-4 text-[#1a6b3c]" />
                  <span className="text-[13px] font-medium">{member.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Mail className="w-4 h-4 text-[#1a6b3c]" />
                  <span className="text-[13px] truncate font-medium">{member.email}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
