#!/usr/bin/env python3
"""Generate the enhanced page.tsx for Amhara Sint Woreda website."""

import os

PARTS = []

# ============================================================
# PART 1: Imports, Types, Utilities
# ============================================================
PARTS.append(r'''"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Users, School, Heart, Building2, MapPin, TreePine, Droplets,
  Home as HomeIcon, ChevronRight, ChevronDown, BarChart3, TrendingUp,
  Landmark, Stethoscope, Menu, X, Phone, Mail, MapPinned, ArrowUp,
  ArrowLeft, ArrowRight, Tractor, GraduationCap, Truck, Wheat,
  Briefcase, Newspaper, Award, UserCheck, FileText, Building, Shield,
  Scale, Flag, UsersRound, Siren, Banknote, PieChart, ClipboardList,
  HeartPulse, Baby, Eye, BookOpen, Globe, ThumbsUp, Clock,
  Image as ImageIcon, Camera, Facebook, Youtube, Linkedin,
  Github, Instagram, Twitter, ExternalLink, Calendar,
  Monitor, HardHat, Store, CheckCircle2, AlertCircle, Upload,
  Send, User, Map, ChevronUp, Zap, Layers, Target, HandshakeIcon,
  FileCheck, CircleDollarSign, Sprout, Wrench, MessageSquare,
  Plus, Minus, Trash2, Edit3, Save, Settings,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import CookieConsentBanner from "@/components/cookie-consent";

/* ─── Types ────────────────────────────────────────────────── */
type PageId =
  | "home" | "about-history" | "about-overview" | "about-location"
  | "gov-leadership" | "gov-structure" | "gov-offices"
  | "svc-education" | "svc-health" | "svc-agriculture"
  | "svc-transport" | "svc-water" | "svc-justice" | "svc-finance"
  | "svc-trade" | "svc-technology" | "svc-construction"
  | "news-news" | "news-bids" | "news-vacancy" | "news-announcements"
  | "gallery" | "vacancy" | "bids" | "contact";

interface ApplicationData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  education: string;
  institution: string;
  yearGraduated: string;
  experienceYears: string;
  currentEmployer: string;
  currentPosition: string;
  keyQualifications: string;
  coverLetterName: string;
  cvName: string;
  vacancyTitle: string;
  vacancyId: string;
  appliedAt: string;
  status: string;
}
''')

# ============================================================
# PART 2: Animated Counter, AnimatedSection
# ============================================================
PARTS.append(r'''
/* ─── Animated Counter ─────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const start = performance.now();
        const step = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Animated Section ──────────────────────────────────────── */
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Pulse Ring Animation for leader photos ──────────────── */
function PulseRing({ color = "#0B3D2E" }: { color?: string }) {
  return (
    <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: color }} />
  );
}
''')

# ============================================================
# PART 3: Hero Slides, Nav Links, Header
# ============================================================
PARTS.append(r'''
/* ─── Hero Slider Images ────────────────────────────────────── */
const SLIDES = [
  { image: "https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg", title: "Welcome to Amhara Sint Woreda", subtitle: "A land of beauty, culture, and progress in South Wollo Zone, Amhara Region" },
  { image: "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg", title: "Rich Natural Heritage", subtitle: "Highland landscapes, fertile valleys, and diverse ecosystems" },
  { image: "https://sfile.chatglm.cn/images-ppt/10cf906e32cf.jpg", title: "Vibrant Community Life", subtitle: "Strong traditions, unity, and communal spirit define our people" },
  { image: "https://sfile.chatglm.cn/images-ppt/4781a70c681c.jpg", title: "Growing Together", subtitle: "Investing in education, health, and infrastructure for all citizens" },
  { image: "https://sfile.chatglm.cn/images-ppt/30fee1e622be.jpg", title: "Agricultural Heartland", subtitle: "Supporting farmers and sustainable development across the woreda" },
  { image: "https://sfile.chatglm.cn/images-ppt/56336ff1a645.jpg", title: "Building the Future", subtitle: "Modern infrastructure connecting communities to opportunities" },
  { image: "https://sfile.chatglm.cn/images-ppt/4db62da31bf6.png", title: "Our Vision", subtitle: "A prosperous, equitable, and self-reliant Amhara Sint" },
  { image: "https://sfile.chatglm.cn/images-ppt/ba8313230e3e.jpg", title: "Transparent Governance", subtitle: "Committed to accountability and service excellence" },
];

/* ─── Navigation Data ──────────────────────────────────────── */
interface NavItem { label: string; href: PageId; children?: { label: string; href: PageId; icon: React.ElementType }[]; }

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "home" },
  {
    label: "About", href: "about-overview",
    children: [
      { label: "History & Background", href: "about-history", icon: BookOpen },
      { label: "Overview", href: "about-overview", icon: Globe },
      { label: "Location & Geography", href: "about-location", icon: MapPin },
    ],
  },
  {
    label: "Government", href: "gov-leadership",
    children: [
      { label: "Leadership", href: "gov-leadership", icon: UserCheck },
      { label: "Administrative Structure", href: "gov-structure", icon: Building },
      { label: "Offices & Departments", href: "gov-offices", icon: Shield },
    ],
  },
  {
    label: "Services", href: "svc-education",
    children: [
      { label: "Education", href: "svc-education", icon: GraduationCap },
      { label: "Health", href: "svc-health", icon: HeartPulse },
      { label: "Agriculture", href: "svc-agriculture", icon: Tractor },
      { label: "Trade & Commerce", href: "svc-trade", icon: Store },
      { label: "Technology", href: "svc-technology", icon: Monitor },
      { label: "Construction", href: "svc-construction", icon: HardHat },
      { label: "Transport", href: "svc-transport", icon: Truck },
      { label: "Water & Sanitation", href: "svc-water", icon: Droplets },
      { label: "Justice & Security", href: "svc-justice", icon: Scale },
      { label: "Finance & Revenue", href: "svc-finance", icon: Banknote },
    ],
  },
  { label: "Vacancy", href: "vacancy" },
  {
    label: "Announcements", href: "news-announcements",
    children: [
      { label: "News", href: "news-news", icon: Newspaper },
      { label: "Bids & Tenders", href: "bids", icon: Briefcase },
      { label: "Events", href: "news-announcements", icon: Calendar },
      { label: "Announcements", href: "news-announcements", icon: Award },
    ],
  },
  { label: "Gallery", href: "gallery" },
];
''')

# ============================================================
# PART 4: Header Component
# ============================================================
PARTS.append(r'''
/* ─── HEADER WITH DROPDOWN NAV ──────────────────────────────── */
function Header({ currentPage, onNavigate }: { currentPage: PageId; onNavigate: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpenDropdown(label); };
  const handleMouseLeave = () => { timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200); };
  const handleNav = (p: PageId) => { onNavigate(p); setMobileOpen(false); setOpenDropdown(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0B3D2E]/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-gradient-to-r from-[#062B1F] via-[#0B3D2E] to-[#145A44]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[90px] md:h-[105px]">
          <button onClick={() => handleNav("home")} className="flex items-center gap-4 group shrink-0">
            <img src="/logo.png" alt="Amhara Sint Woreda Logo" className="h-[84px] w-auto rounded-2xl shadow-xl group-hover:scale-105 transition-transform object-contain ring-2 ring-white/20 ring-offset-2 ring-offset-[#0B3D2E]" />
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-xl md:text-2xl leading-tight">Amhara Sint</h1>
              <p className="text-[#86EFAC] text-xs md:text-sm font-medium -mt-0.5">Woreda Administration</p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => item.children && handleMouseEnter(item.label)} onMouseLeave={handleMouseLeave}>
                <button onClick={() => { if (item.children) { setOpenDropdown(openDropdown === item.label ? null : item.label); } else { handleNav(item.href); } }}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[15px] font-semibold transition-all duration-200 ${currentPage === item.href ? "text-[#EAB308] bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10"}`}>
                  {item.label}
                  {item.children && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />}
                </button>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-[#0a3327]/95 backdrop-blur-lg border border-white/15 rounded-2xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                    {item.children.map((child) => (
                      <button key={child.href} onClick={() => handleNav(child.href)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium transition-all duration-150 ${currentPage === child.href ? "text-[#EAB308] bg-white/10" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
                        <child.icon className="w-4 h-4 shrink-0" />
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={() => handleNav("contact")} className="hidden md:inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold text-[15px] px-6 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
              <Phone className="w-[18px] h-[18px]" /> Contact Us
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Toggle menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-[#0B3D2E] border-t border-white/10 shadow-xl max-h-[80vh] overflow-y-auto">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <div key={item.label}>
                <button onClick={() => { if (item.children) { setOpenDropdown(openDropdown === item.label ? null : item.label); } else { handleNav(item.href); } }}
                  className="w-full flex items-center justify-between text-white/80 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg text-sm font-medium transition-all">
                  {item.label}
                  {item.children && <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />}
                </button>
                {item.children && openDropdown === item.label && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <button key={child.href} onClick={() => handleNav(child.href)}
                        className={`flex items-center gap-2.5 text-sm px-4 py-2 rounded-lg transition-all ${currentPage === child.href ? "text-[#EAB308] bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                        <child.icon className="w-4 h-4" /> {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => handleNav("contact")} className="flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-semibold text-sm px-4 py-2.5 rounded-lg mt-2 transition-all">
              <Phone className="w-4 h-4" /> Contact Us
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
''')

# ============================================================
# PART 5: Hero Slider
# ============================================================
PARTS.append(r'''
/* ─── HERO SLIDER ──────────────────────────────────────────── */
function HeroSlider() {
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
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {SLIDES.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: i === current ? 1 : 0 }}>
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">{slide.title}</h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 drop-shadow-md">{slide.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => document.getElementById("statistics-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  Explore Statistics <ChevronRight className="w-5 h-5" />
                </button>
                <button onClick={() => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-all">
                  Our Services <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all z-20">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all z-20">
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 ${i === current ? "w-10 h-3 bg-[#EAB308]" : "w-3 h-3 bg-white/50 hover:bg-white/80"}`} />
        ))}
      </div>

      {/* Social Sidebar */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-20">
        {[
          { icon: Facebook, href: "https://facebook.com/AmharaSint", color: "#1877F2" },
          { icon: Youtube, href: "https://youtube.com/@AmharaSint", color: "#FF0000" },
          { icon: Twitter, href: "https://t.me/AmharaSint", color: "#1DA1F2" },
          { icon: Instagram, href: "https://instagram.com/AmharaSint", color: "#E4405F" },
        ].map((s) => (
          <a key={s.color} href={s.href} target="_blank" rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-all duration-300"
            style={{ ["--hover-bg" as string]: s.color }}>
            <s.icon className="w-4 h-4" />
          </a>
        ))}
      </div>
    </section>
  );
}
''')

# ============================================================
# PART 6: Home page sections (News, Stats, Services Overview)
# ============================================================
PARTS.append(r'''
/* ─── NEWS FEED SECTION (Home) ─────────────────────────────── */
function NewsFeedSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [newsItems, setNewsItems] = useState<any[]>([]);
  useEffect(() => {
    try { const d = localStorage.getItem("amharasint_news"); if (d) setNewsItems(JSON.parse(d).slice(0, 3)); } catch {}
    if (newsItems.length === 0) {
      setNewsItems([
        { id: "1", title: "Amhara Sint Launches New Water Supply Project", summary: "A major clean water initiative covering 8 kebeles has been approved with a budget of ETB 12 million.", category: "Water", author: "Communications Office", status: "published", featured: true, date: "2026-06-28" },
        { id: "2", title: "Annual Agricultural Exhibition a Great Success", summary: "Over 2,000 farmers participated in this year's agricultural exhibition showcasing modern farming techniques.", category: "Agriculture", author: "Agriculture Office", status: "published", featured: false, date: "2026-06-25" },
        { id: "3", title: "New Primary School Inaugurated in Kebele 05", summary: "The woreda administration inaugurated a fully equipped primary school serving 400 students.", category: "Education", author: "Education Office", status: "published", featured: false, date: "2026-06-20" },
      ]);
    }
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-2">Latest News & Updates</h2>
            <p className="text-[#0B3D2E]/60 max-w-2xl mx-auto">Stay informed about the latest developments, events, and announcements from Amhara Sint Woreda</p>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-3 gap-6">
          {newsItems.map((item, i) => (
            <AnimatedSection key={item.id} delay={i * 100}>
              <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full overflow-hidden group cursor-pointer" onClick={() => onNavigate("news-news")}>
                <div className="h-48 bg-gradient-to-br from-[#0B3D2E] to-[#145A44] relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-[#EAB308] text-[#0B3D2E] text-xs font-bold">{item.category}</Badge>
                  </div>
                  <Newspaper className="absolute top-4 right-4 w-12 h-12 text-white/20" />
                </div>
                <CardContent className="p-5">
                  <p className="text-xs text-[#0B3D2E]/40 mb-2">{item.date}</p>
                  <h3 className="font-bold text-[#0B3D2E] mb-2 group-hover:text-[#EAB308] transition-colors">{item.title}</h3>
                  <p className="text-sm text-[#0B3D2E]/60 line-clamp-2">{item.summary}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── QUICK STATS (Home) ──────────────────────────────────── */
const KEY_STATS = [
  { label: "Population", value: 142350, suffix: "", icon: Users, bg: "bg-gradient-to-br from-emerald-50 to-green-50", color: "from-emerald-500 to-green-600" },
  { label: "Kebeles", value: 22, suffix: "", icon: MapPin, bg: "bg-gradient-to-br from-blue-50 to-indigo-50", color: "from-blue-500 to-indigo-600" },
  { label: "Schools", value: 47, suffix: "", icon: School, bg: "bg-gradient-to-br from-amber-50 to-yellow-50", color: "from-amber-500 to-yellow-600" },
  { label: "Health Centers", value: 23, suffix: "", icon: HeartPulse, bg: "bg-gradient-to-br from-rose-50 to-pink-50", color: "from-rose-500 to-pink-600" },
];

function QuickStats() {
  return (
    <section id="statistics-section" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#0B3D2E] mb-4">Woreda by the <span className="text-[#EAB308]">Numbers</span></h2>
            <p className="text-[#0B3D2E]/60 max-w-2xl mx-auto text-base md:text-lg">A comprehensive overview of Amhara Sint Woreda&apos;s key development indicators</p>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {KEY_STATS.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 80}>
              <Card className={`${stat.bg} border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full`}>
                <CardContent className="p-5 md:p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-1">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={2200} />
                  </div>
                  <p className="text-[#0B3D2E]/60 text-xs md:text-sm font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STATISTICS SECTION (Detailed) ───────────────────────── */
const DETAILED_STATS = [
  { label: "Total Area", value: 1245, suffix: " km\u00B2", icon: Map, progress: 78 },
  { label: "Primary Enrollment", value: 85, suffix: "%", icon: GraduationCap, progress: 85 },
  { label: "Health Coverage", value: 92, suffix: "%", icon: HeartPulse, progress: 92 },
  { label: "Clean Water Access", value: 78, suffix: "%", icon: Droplets, progress: 78 },
  { label: "Road Connectivity", value: 64, suffix: "%", icon: Truck, progress: 64 },
  { label: "Agricultural Households", value: 28500, suffix: "+", icon: Tractor, progress: 75 },
  { label: "Registered Cooperatives", value: 120, suffix: "+", icon: UsersRound, progress: 60 },
  { label: "Annual Budget (ETB M)", value: 85, suffix: "M", icon: Banknote, progress: 70 },
];

function StatisticsSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-2">Detailed Statistics</h2>
            <p className="text-[#0B3D2E]/60">Comprehensive data on our woreda&apos;s development across all sectors</p>
          </div>
        </AnimatedSection>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DETAILED_STATS.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 60}>
              <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 h-full">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B3D2E]/5 flex items-center justify-center"><stat.icon className="w-5 h-5 text-[#0B3D2E]" /></div>
                    <span className="text-sm font-semibold text-[#0B3D2E]/70">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-[#0B3D2E] mb-2"><AnimatedCounter target={stat.value} suffix={stat.suffix} /></div>
                  <Progress value={stat.progress} className="h-2 bg-gray-100" />
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
''')

# ============================================================
# PART 7: Services Overview (Home) + Service Cards
# ============================================================
PARTS.append(r'''
/* ─── SERVICE CARDS DATA ───────────────────────────────────── */
const SERVICE_CARDS = [
  { title: "Education", desc: "47 schools providing quality education from primary to secondary level with ongoing expansion programs.", icon: GraduationCap, href: "svc-education" as PageId, color: "from-blue-500 to-indigo-600", image: "https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg" },
  { title: "Health", desc: "23 health institutions delivering comprehensive primary healthcare services across all kebeles.", icon: HeartPulse, href: "svc-health" as PageId, color: "from-rose-500 to-pink-600", image: "https://sfile.chatglm.cn/images-ppt/10cf906e32cf.jpg" },
  { title: "Agriculture", desc: "Supporting 28,500+ farming households with modern techniques, inputs, and extension services.", icon: Tractor, href: "svc-agriculture" as PageId, color: "from-green-500 to-emerald-600", image: "https://sfile.chatglm.cn/images-ppt/30fee1e622be.jpg" },
  { title: "Trade & Commerce", desc: "Promoting small enterprises, market linkages, and cooperative development for economic growth.", icon: Store, href: "svc-trade" as PageId, color: "from-purple-500 to-violet-600", image: "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg" },
  { title: "Technology", desc: "Digital transformation initiatives, ICT training, and e-government services for modern governance.", icon: Monitor, href: "svc-technology" as PageId, color: "from-cyan-500 to-teal-600", image: "https://sfile.chatglm.cn/images-ppt/4db62da31bf6.png" },
  { title: "Construction", desc: "Infrastructure development including roads, public buildings, and community facilities.", icon: HardHat, href: "svc-construction" as PageId, color: "from-orange-500 to-amber-600", image: "https://sfile.chatglm.cn/images-ppt/56336ff1a645.jpg" },
  { title: "Transport", desc: "Road networks, public transport, and connectivity infrastructure linking communities.", icon: Truck, href: "svc-transport" as PageId, color: "from-sky-500 to-blue-600", image: "https://sfile.chatglm.cn/images-ppt/4781a70c681c.jpg" },
  { title: "Water & Sanitation", desc: "64 clean water points and sanitation programs ensuring safe water access for communities.", icon: Droplets, href: "svc-water" as PageId, color: "from-blue-400 to-cyan-500", image: "https://sfile.chatglm.cn/images-ppt/ba8313230e3e.jpg" },
  { title: "Justice & Security", desc: "Maintaining law and order through community policing, courts, and dispute resolution.", icon: Scale, href: "svc-justice" as PageId, color: "from-slate-600 to-gray-700", image: "https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg" },
  { title: "Finance & Revenue", desc: "Revenue collection, budget management, and financial administration services.", icon: Banknote, href: "svc-finance" as PageId, color: "from-emerald-500 to-green-600", image: "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg" },
];

function ServicesOverview({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section id="services-section" className="py-16 md:py-20 bg-[#0B3D2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Our <span className="text-[#EAB308]">Services</span></h2>
            <p className="text-white/60 max-w-2xl mx-auto">Comprehensive public services designed to improve the lives of every citizen in Amhara Sint Woreda</p>
          </div>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {SERVICE_CARDS.map((svc, i) => (
            <AnimatedSection key={svc.title} delay={i * 60}>
              <button onClick={() => onNavigate(svc.href)} className="w-full group">
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-[#EAB308]/30 transition-all duration-300 h-full overflow-hidden">
                  <div className="h-28 relative overflow-hidden">
                    <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center shadow-lg`}>
                      <svc.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-white text-sm mb-1 group-hover:text-[#EAB308] transition-colors">{svc.title}</h3>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{svc.desc}</p>
                  </CardContent>
                </Card>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
''')

print(f"Parts 1-7 ready ({sum(len(p) for p in PARTS)} chars so far)")
with open("/home/z/my-project/scripts/page_parts_1.py", "w") as f:
    f.write("# Auto-generated parts 1-7\n")
    f.write(f"PARTS_COUNT = {len(PARTS)}\n")