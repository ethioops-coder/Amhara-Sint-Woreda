"use client"
import React from 'react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useSWR from 'swr';
import { fetcherArray } from '@/lib/fetcher';
import { Users, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useLang } from '@/lib/LangContext';

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

  const defaultCabinetMembers = [
    {
      name: isAm ? "ሳሙኤል ሞላልኝ ደሳለ" : "Samuel Mollalign",
      role: isAm ? "የደሴ ከተማ አስተዳደር ተቀዳሚ ምክንቲባ" : "City Mayor",
      department: isAm ? "የከንቲባ ጽ/ቤት" : "Mayor's Office",
      image: "/cabinet_samuel.png",
      email: "mayor@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "አቶ አሸናፊ ዓለማየሁ" : "Mr. Ashenafi Alemayhu",
      role: isAm ? "ምክትል ከንቲባ" : "Deputy Mayor",
      department: isAm ? "የከተማ ልማት" : "Urban Development",
      image: "/cabinet_ashenafi.png",
      email: "deputy@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "አቶ ሽመልስ ጌታቸው" : "Mr. Shemels Getachew",
      role: isAm ? "ምክትል ከንቲባ" : "Deputy Mayor",
      department: isAm ? "የከተማ ልማት" : "Urban Development",
      image: "/cabinet_shemels.png",
      email: "deputy@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "አቶ ሰይድ ካሳው" : "Mr. Seid Kassawu",
      role: isAm ? "የካቢኔ አባል" : "Cabinet Member",
      department: isAm ? "ትምህርት ቢሮ" : "Education Bureau",
      image: "/cabinet_seid.png",
      email: "education@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "ዶ/ር ሰላም ተስፋዬ" : "Dr. Selam Tesfaye",
      role: isAm ? "የካቢኔ አባል" : "Cabinet Member",
      department: isAm ? "ጤና ጥበቃ" : "Health Bureau",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      email: "health@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "አቶ ዳዊት በቀለ" : "Mr. Dawit Bekele",
      role: isAm ? "የካቢኔ አባል" : "Cabinet Member",
      department: isAm ? "ንግድና ኢንዱስትሪ" : "Trade & Industry",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      email: "trade@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    },
    {
      name: isAm ? "ወ/ሪት ማክዳ ዮሴፍ" : "Ms. Makda Yoseph",
      role: isAm ? "የካቢኔ አባል" : "Cabinet Member",
      department: isAm ? "ሴቶችና ህፃናት" : "Women & Children",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      email: "women@dessiecity.gov.et",
      phone: "+251-33-111-XXXX"
    }
  ];

  const { data: dbData } = useSWR('/api/admin/cabinet-members', fetcherArray);

  const cabinetMembers = useMemo(() => {
    if (dbData && dbData.length > 0) {
      const mapped = dbData.filter((m: any) => m.approvalStatus === 'approved').map((m: any) => ({
        name: m.name,
        role: m.title || m.position,
        department: m.department || "Cabinet Office",
        image: m.photo || m.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        email: m.email || "info@dessiecity.gov.et",
        phone: m.phone || "+251-33-111-XXXX"
      }));
      if (mapped.length > 0) return mapped;
    }
    return defaultCabinetMembers;
  }, [dbData, defaultCabinetMembers]);

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
                      e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=0a2e19&color=fff';
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
