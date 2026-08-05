'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { useLang } from '@/lib/LangContext'
import {
  Users, Mountain, MapPin, Building2, Eye, Target, ArrowRight, History, Sparkles
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

function useSiteSettings() {
  const [data, setData] = useState({ population: '450,000+', elevation: '2,470m', area: '25.4 km²', kebeles: '12' })
  useEffect(() => {
    // Simulated fetch
  }, [])
  return data
}

export default function AboutPage() {
  const { lang } = useLang()
  const isAm = lang === 'am'
  const settings = useSiteSettings()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const stats = [
    { icon: Users, label: isAm ? 'ህዝብ' : 'Population', val: settings.population },
    { icon: Mountain, label: isAm ? 'ከፍታ' : 'Elevation', val: settings.elevation },
    { icon: MapPin, label: isAm ? 'ስፋት' : 'Area', val: settings.area },
    { icon: Building2, label: isAm ? 'ቀበሌዎች' : 'Kebeles', val: settings.kebeles },
  ]

  const ideologies = [
    {
      title: isAm ? 'ራዕይ' : 'Our Vision',
      desc: isAm ? 'ደሴን በኢትዮጵያ ውስጥ የዘመናዊ ከተማ ሞዴል ማድረግ።' : 'To forge Dessie into Ethiopia\'s premier smart city—a beacon of sustainable innovation, good governance, and an unparalleled quality of life.',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1547471080-7fc2caa6f561?q=80&w=2070&auto=format&fit=crop',
      color: 'from-[#0d4a28]/90 to-[#1a6b3c]/80'
    },
    {
      title: isAm ? 'ተልዕኮ' : 'Our Mission',
      desc: isAm ? 'ግልጽ እና ቀልጣፋ የአስተዳደር አገልግሎት በመስጠት የኢኮኖሚ ዕድገትን ማምጣት።' : 'To deliver citizen-centric municipal services with radical transparency, driving local economic prosperity while preserving our rich cultural heritage.',
      icon: Target,
      image: 'https://images.unsplash.com/photo-1523805009056-11f810b4976c?q=80&w=2000&auto=format&fit=crop',
      color: 'from-[#c8a415]/90 to-[#d4b42b]/80'
    }
  ]

  return (
    <main className="bg-[#f8faf8] overflow-hidden" ref={containerRef}>

      {/* Parallax Hero Section */}
      <section className="relative h-[75vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
          <Image
            src="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=2069&auto=format&fit=crop"
            alt="Dessie City"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#f8faf8] opacity-90" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-2xl">
              {isAm ? 'ስለ ደሴ ከተማ' : 'DISCOVER DESSIE'}
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              The vibrant heart of the Amhara Highlands. A legacy of robust commerce meeting a future of smart, sustainable transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating Glassmorphism Stats Bar */}
      <section className="relative z-20 -mt-24 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 md:p-8"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a6b3c]/10 to-[#c8a415]/10 flex items-center justify-center mb-4 text-[#1a6b3c]">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-1">{stat.val}</h3>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-12 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="order-2 lg:order-1 relative">
              <div className="relative h-[500px] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image src="/dessie-city-hall.png" alt="Dessie City Hall" fill className="object-cover" />
                <div className="absolute inset-0 bg-[#0d4a28]/10" />
              </div>
              {/* Floating accent card */}
              <motion.div variants={fadeInUp} className="absolute -bottom-10 -right-10 hidden md:block bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-xs">
                <History className="w-10 h-10 text-[#c8a415] mb-4" />
                <h4 className="font-bold text-xl text-gray-900 mb-2">Established 1882</h4>
                <p className="text-sm text-gray-600 leading-relaxed">A historic administrative center that has evolved into a bustling metropolitan hub.</p>
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={staggerContainer} className="order-1 lg:order-2">
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a6b3c]/10 mb-6">
                <Sparkles className="w-4 h-4 text-[#1a6b3c]" />
                <span className="text-[#1a6b3c] font-bold tracking-widest uppercase text-xs">Our Heritage & Future</span>
              </motion.div>

              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
                Where History Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c]">Innovation</span>
              </motion.h2>

              <motion.p variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed mb-6">
                Dessie has long stood as a pivotal commercial crossroad in Ethiopia. Blessed with a pleasant subtropical climate, the city weaves together a rich tapestry of culture, trade, and resilient community spirit.
              </motion.p>

              <motion.p variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed mb-10">
                Today, the city administration is spearheading a monumental shift and  By integrating digital governance and smart infrastructure, we are transforming Dessie into an inclusive, efficient, and forward-looking metropolis—ensuring prosperity for all its diverse residents.
              </motion.p>

              <motion.button variants={fadeInUp} className="group flex items-center gap-3 text-[#1a6b3c] font-bold text-lg hover:text-[#0d4a28] transition-colors">
                Explore Municipal Projects
                <div className="w-10 h-10 rounded-full bg-[#1a6b3c]/10 flex items-center justify-center group-hover:bg-[#1a6b3c] group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Vision & Mission (Elevated Design) */}
      <section className="py-10 px-4 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#c8a415] font-bold tracking-widest uppercase text-xs mb-3 block">Our Guiding Principles</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">THE FOUNDATION</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {ideologies.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative h-[450px] rounded-[2.5rem] overflow-hidden"
              >
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} mix-blend-multiply opacity-80 group-hover:opacity-90 transition-opacity duration-500`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute inset-0 p-10 md:p-12 flex flex-col justify-end">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 mb-6 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
