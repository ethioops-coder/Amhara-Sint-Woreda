"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  School, Stethoscope, Droplets, Building2, TreePine, Users, GraduationCap, HeartPulse,
  Tractor, Truck, Scale, BarChart3, Landmark, ChevronRight, ArrowLeft, ArrowRight, Newspaper,
  ThumbsUp, Clock, Eye, Facebook, Youtube, Linkedin, Github, Instagram, Twitter, ExternalLink,
  Map, MapPin,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedCounter, AnimatedSection } from "./animations";
import type { PageId } from "@/lib/types";

/* ─── SLIDES ──────────────────────────────────────────────── */
const SLIDES = [
  { image: "https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg", title: "Welcome to Amhara Sayint Woreda", subtitle: "A land of beauty, culture, and progress in South Wollo Zone, Amhara Region" },
  { image: "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg", title: "Rich Natural Heritage", subtitle: "Highland landscapes, fertile valleys, and diverse ecosystems" },
  { image: "https://sfile.chatglm.cn/images-ppt/10cf906e32cf.jpg", title: "Vibrant Community Life", subtitle: "Strong traditions, unity, and communal spirit define our people" },
  { image: "https://sfile.chatglm.cn/images-ppt/4781a70c681c.jpg", title: "Growing Together", subtitle: "Investing in education, health, and infrastructure for all citizens" },
  { image: "https://sfile.chatglm.cn/images-ppt/30fee1e622be.jpg", title: "Agricultural Heartland", subtitle: "Supporting farmers and sustainable development across the woreda" },
  { image: "https://sfile.chatglm.cn/images-ppt/56336ff1a645.jpg", title: "Building the Future", subtitle: "Modern infrastructure connecting communities to opportunities" },
  { image: "https://sfile.chatglm.cn/images-ppt/4db62da31bf6.png", title: "Our Vision", subtitle: "A prosperous, equitable, and self-reliant Amhara Sayint" },
  { image: "https://sfile.chatglm.cn/images-ppt/ba8313230e3e.jpg", title: "Transparent Governance", subtitle: "Committed to accountability and service excellence" },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => { setCurrent((p) => (p + 1) % SLIDES.length); }, 5000);
  }, []);
  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);
  const goTo = (idx: number) => { setCurrent(idx); startTimer(); };
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);
  return (
    <section className="relative h-[100vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Left Side Social Media Bar */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3 pl-3 md:pl-5">
        {[
          { icon: Facebook, url: "https://facebook.com/AmharaSayint", color: "bg-[#1877F2] hover:bg-[#1565C0]", label: "Facebook" },
          { icon: Youtube, url: "https://youtube.com/@AmharaSayint", color: "bg-[#FF0000] hover:bg-[#CC0000]", label: "YouTube" },
          { icon: Linkedin, url: "https://www.linkedin.com/in/meseret-akalu-76363121b/", color: "bg-[#0A66C2] hover:bg-[#084F97]", label: "LinkedIn" },
          { icon: Github, url: "https://github.com/AmharaSayint", color: "bg-[#333] hover:bg-[#24292F]", label: "GitHub" },
          { icon: Instagram, url: "https://instagram.com/AmharaSayint", color: "bg-[#E4405F] hover:bg-[#C13584]", label: "Instagram" },
          { icon: Twitter, url: "https://twitter.com/AmharaSayint", color: "bg-[#1DA1F2] hover:bg-[#0D8BD9]", label: "Twitter/X" },
          { icon: ExternalLink, url: "https://t.me/AmharaSayint", color: "bg-[#0088CC] hover:bg-[#006699]", label: "Telegram" },
        ].map((social, idx) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.label}
            className={`group relative w-9 h-9 md:w-10 md:h-10 rounded-full ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-x-1 hover:scale-110`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <social.icon className="w-4 h-4 md:w-[18px] md:h-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            {/* Tooltip */}
            <span className="absolute left-full ml-2 px-2.5 py-1 bg-black/80 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {social.label}
              <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-black/80" />
            </span>
          </a>
        ))}
      </div>
      {SLIDES.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: i === current ? 1 : 0 }}>
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg animate-fade-in-up">{slide.title}</h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 drop-shadow-md">{slide.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => document.getElementById("statistics-section")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all">Explore Statistics<ChevronRight className="w-5 h-5" /></button>
                <button onClick={() => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition-all backdrop-blur-sm">Our Services</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={prev} className="absolute left-14 md:left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/20" aria-label="Previous slide"><ArrowLeft className="w-5 h-5" /></button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-all border border-white/20" aria-label="Next slide"><ArrowRight className="w-5 h-5" /></button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "bg-[#EAB308] w-8" : "bg-white/40 hover:bg-white/60 w-2.5"}`} aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}

const KEY_STATS = [
  { icon: School,      label: "Primary Schools",    value: 47,    bg: "#16A34A", light: "#F0FDF4", borderColor: "#BBF7D0", color: "from-[#059669] to-[#10B981]" },
  { icon: School,      label: "Secondary Schools",  value: 8,     bg: "#0891B2", light: "#ECFEFF", borderColor: "#A5F3FC", color: "from-[#0891B2] to-[#06B6D4]" },
  { icon: Stethoscope, label: "Health Centers",     value: 5,     bg: "#DC2626", light: "#FFF1F2", borderColor: "#FECDD3", color: "from-[#DC2626] to-[#EF4444]" },
  { icon: Stethoscope, label: "Health Posts",       value: 18,    bg: "#E11D48", light: "#FFF1F2", borderColor: "#FECDD3", color: "from-[#E11D48] to-[#F43F5E]" },
  { icon: Droplets,    label: "Clean Water Points", value: 64,    bg: "#0284C7", light: "#F0F9FF", borderColor: "#BAE6FD", color: "from-[#0284C7] to-[#0EA5E9]" },
  { icon: Building2,   label: "Kebeles",            value: 22,    bg: "#7C3AED", light: "#FAF5FF", borderColor: "#DDD6FE", color: "from-[#7C3AED] to-[#8B5CF6]" },
  { icon: TreePine,    label: "Forest Coverage",    value: 18, suffix: "%", bg: "#16A34A", light: "#F0FDF4", borderColor: "#BBF7D0", color: "from-[#16A34A] to-[#22C55E]" },
  { icon: Users,       label: "Households",         value: 28470, bg: "#D97706", light: "#FFFBEB", borderColor: "#FDE68A", color: "from-[#D97706] to-[#F59E0B]" },
];

export function StatisticsSection() {
  return (
    <section id="statistics-section" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <AnimatedSection className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#0B3D2E]/15 mb-4">
            <BarChart3 className="w-3.5 h-3.5" /> Key Statistics
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-3">
            Woreda by the <span className="text-[#EAB308]">Numbers</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
            A snapshot of Amhara Sayint Woreda's development indicators
          </p>
        </AnimatedSection>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {KEY_STATS.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 80}>
              <div
                className="rounded-2xl p-6 md:p-7 flex flex-col items-center text-center gap-4 border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-default group"
                style={{ backgroundColor: stat.light, borderColor: stat.borderColor }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: stat.bg }}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </div>

                {/* Animated number */}
                <div
                  className="text-4xl md:text-5xl font-black leading-none tabular-nums"
                  style={{ color: stat.bg }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix || ""} duration={2200} />
                </div>

                {/* Label */}
                <p className="text-sm font-semibold text-gray-500 leading-snug">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuickStats() {
  return (
    <section className="py-14 md:py-16 bg-[#0B3D2E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <div className="text-center mb-10">
          <span className="text-[#EAB308]/70 text-xs font-bold uppercase tracking-[0.25em]">Core Metrics</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: "Population", value: 142350, suffix: "",    icon: Users,     color: "#34D399" },
            { label: "Area (km²)", value: 1245,   suffix: "",    icon: Map,       color: "#818CF8" },
            { label: "Growth Rate",value: 2.8,    suffix: "%",   icon: BarChart3, color: "#FCD34D" },
            { label: "Kebeles",    value: 22,      suffix: "",    icon: MapPin,    color: "#F9A8D4" },
          ].map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 100}>
              <div className="flex flex-col items-center text-center gap-3 group cursor-default">
                {/* Icon circle */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-white/10 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: s.color + "20", borderColor: s.color + "40" }}
                >
                  <s.icon className="w-6 h-6" style={{ color: s.color }} />
                </div>

                {/* Big number */}
                <div
                  className="text-4xl md:text-5xl font-black leading-none tabular-nums"
                  style={{ color: s.color }}
                >
                  <AnimatedCounter target={s.value} suffix={s.suffix} duration={2000} />
                </div>

                {/* Divider */}
                <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: s.color, opacity: 0.4 }} />

                {/* Label */}
                <p className="text-white/55 text-sm font-semibold">{s.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICE_CARDS = [
  { icon: GraduationCap, title: "Education", desc: "106 schools serving the community", color: "from-emerald-500 to-green-500", href: "svc-education" as PageId },
  { icon: HeartPulse, title: "Health", desc: "8 health facilities across the woreda", color: "from-red-500 to-rose-500", href: "svc-health" as PageId },
  { icon: Tractor, title: "Agriculture", desc: "Supporting 75% of the population", color: "from-amber-500 to-yellow-500", href: "svc-agriculture" as PageId },
  { icon: Truck, title: "Transport", desc: "Expanding road infrastructure", color: "from-violet-500 to-purple-500", href: "svc-transport" as PageId },
  { icon: Droplets, title: "Water & Sanitation", desc: "64 clean water access points", color: "from-sky-500 to-cyan-500", href: "svc-water" as PageId },
  { icon: Scale, title: "Justice & Security", desc: "Ensuring safety and rule of law", color: "from-orange-500 to-red-500", href: "svc-justice" as PageId },
];

export function ServicesOverview({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section id="services-section" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium bg-[#EAB308]/10 text-[#A16207]"><Building2 className="w-4 h-4 mr-1.5" />Our Services</Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B3D2E] mb-4">What We <span className="text-[#EAB308]">Deliver</span></h2>
          <p className="text-[#0B3D2E]/60 max-w-2xl mx-auto text-base md:text-lg">Key services and development programs driving progress in Amhara Sayint Woreda</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICE_CARDS.map((svc, i) => (
            <AnimatedSection key={svc.title} delay={i * 100}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full group cursor-pointer" onClick={() => { onNavigate(svc.href); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                <CardContent className="p-6 md:p-7">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${svc.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}><svc.icon className="w-7 h-7 text-white" /></div>
                  <h3 className="text-lg font-bold text-[#0B3D2E] mb-2">{svc.title}</h3>
                  <p className="text-[#0B3D2E]/55 text-sm leading-relaxed">{svc.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#EAB308] text-sm font-semibold group-hover:gap-2 transition-all">Learn More <ChevronRight className="w-4 h-4" /></div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

const NEWS_FEED = [
  { image: "https://sfile.chatglm.cn/images-ppt/634822b7ff39.jpg", title: "New Primary School Construction Completed in Gonder Ber Kebele", summary: "A new 8-classroom primary school has been completed and handed over to the community, serving over 400 students from the surrounding areas.", author: "Communication Office", date: "June 28, 2026", likes: 142, category: "Education" },
  { image: "https://sfile.chatglm.cn/images-ppt/93701603d414.png", title: "Health Center Expansion Project Launched in Amhara Sayint Town", summary: "Construction has begun on expanding the main health center to include maternity and pediatric wards.", author: "Health Office", date: "June 25, 2026", likes: 98, category: "Health" },
  { image: "https://sfile.chatglm.cn/images-ppt/e31dc4b12d41.jpg", title: "Annual Agricultural Input Distribution Campaign Reaches 10,000 Households", summary: "Over 10,000 farming households across all 22 kebeles have received improved seeds and fertilizer.", author: "Agriculture Office", date: "June 22, 2026", likes: 215, category: "Agriculture" },
  { image: "https://sfile.chatglm.cn/images-ppt/6710c8032383.jpeg", title: "Road Construction Connecting 3 Remote Kebeles Approved", summary: "The regional government has approved funding for 25 km of new all-weather roads.", author: "Road & Transport Office", date: "June 18, 2026", likes: 176, category: "Infrastructure" },
  { image: "https://sfile.chatglm.cn/images-ppt/10cf906e32cf.jpg", title: "Woreda Council Approves Record Annual Budget of ETB 85 Million", summary: "The council approved a budget of ETB 85 million for the fiscal year 2026/27.", author: "Finance Office", date: "June 15, 2026", likes: 134, category: "Governance" },
  { image: "https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg", title: "Clean Water Project Benefits 5,000 Residents in 5 Kebeles", summary: "Five new deep boreholes with solar-powered pumps now provide clean water access.", author: "Water Office", date: "June 10, 2026", likes: 203, category: "Water" },
];

export function NewsFeedSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(Object.fromEntries(NEWS_FEED.map((n) => [n.title, n.likes])));
  const toggleLike = (title: string) => {
    setLiked((prev) => {
      const isLiked = prev[title];
      setLikeCounts((counts) => ({ ...counts, [title]: (counts[title] || 0) + (isLiked ? -1 : 1) }));
      return { ...prev, [title]: !isLiked };
    });
  };
  return (
    <section className="py-16 md:py-20 bg-[#F0FDF4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm font-medium bg-[#EAB308]/10 text-[#A16207]"><Newspaper className="w-4 h-4 mr-1.5" />Latest News & Updates</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-3">What&apos;s <span className="text-[#EAB308]">Happening</span></h2>
          <p className="text-[#0B3D2E]/60 max-w-2xl mx-auto text-base">Stay informed with the latest developments from Amhara Sayint Woreda</p>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {NEWS_FEED.slice(0, 2).map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 100}>
              <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
                <div className="relative h-52 md:h-64 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3"><Badge className="bg-[#0B3D2E] text-white text-xs">{item.category}</Badge></div>
                </div>
                <CardContent className="p-5 md:p-6">
                  <h3 className="font-bold text-[#0B3D2E] text-base md:text-lg mb-2 line-clamp-2 group-hover:text-[#145A44] transition-colors">{item.title}</h3>
                  <p className="text-[#0B3D2E]/55 text-sm leading-relaxed mb-4 line-clamp-3">{item.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[#0B3D2E]/50">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{item.author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{item.date}</span>
                    </div>
                    <button onClick={() => toggleLike(item.title)} className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full transition-all ${liked[item.title] ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-400"}`}>
                      <ThumbsUp className={`w-4 h-4 ${liked[item.title] ? "fill-red-500" : ""}`} />{likeCounts[item.title]}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {NEWS_FEED.slice(2, 6).map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 80}>
              <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group h-full">
                <div className="relative h-36 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2"><Badge className="bg-[#0B3D2E] text-white text-[10px]">{item.category}</Badge></div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-[#0B3D2E] text-sm mb-1.5 line-clamp-2 group-hover:text-[#145A44] transition-colors">{item.title}</h3>
                  <p className="text-[#0B3D2E]/50 text-xs leading-relaxed mb-3 line-clamp-2">{item.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] text-[#0B3D2E]/45">
                      <span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{item.author}</span>
                      <span>{item.date}</span>
                    </div>
                    <button onClick={() => toggleLike(item.title)} className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-all ${liked[item.title] ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400 hover:text-red-400"}`}>
                      <ThumbsUp className={`w-3 h-3 ${liked[item.title] ? "fill-red-500" : ""}`} />{likeCounts[item.title]}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => { onNavigate("news-news"); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex items-center gap-2 bg-[#0B3D2E] hover:bg-[#145A44] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-lg">View All News<ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </section>
  );
}
