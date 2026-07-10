#!/usr/bin/env python3
"""Generate the complete enhanced page.tsx"""
import os

output_path = "/home/z/my-project/src/app/page.tsx"

content = r'''"use client";

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

type PageId =
  | "home" | "about-history" | "about-overview" | "about-location"
  | "gov-leadership" | "gov-structure" | "gov-offices"
  | "svc-education" | "svc-health" | "svc-agriculture"
  | "svc-transport" | "svc-water" | "svc-justice" | "svc-finance"
  | "svc-trade" | "svc-technology" | "svc-construction"
  | "news-news" | "news-bids" | "news-vacancy" | "news-announcements"
  | "gallery" | "vacancy" | "bids" | "contact";

interface ApplicationData {
  id: string; fullName: string; email: string; phone: string;
  dob: string; gender: string; address: string;
  education: string; institution: string; yearGraduated: string;
  experienceYears: string; currentEmployer: string; currentPosition: string;
  keyQualifications: string; coverLetterName: string; cvName: string;
  vacancyTitle: string; vacancyId: string; appliedAt: string; status: string;
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */
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
          setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
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

/* ═══════════════════════════════════════════════════════════════
   ANIMATED SECTION
   ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   HERO SLIDES
   ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   NAV LINKS
   ═══════════════════════════════════════════════════════════════ */
interface NavItem { label: string; href: PageId; children?: { label: string; href: PageId; icon: React.ElementType }[]; }
const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "home" },
  { label: "About", href: "about-overview", children: [
    { label: "History & Background", href: "about-history", icon: BookOpen },
    { label: "Overview", href: "about-overview", icon: Globe },
    { label: "Location & Geography", href: "about-location", icon: MapPin },
  ]},
  { label: "Government", href: "gov-leadership", children: [
    { label: "Leadership", href: "gov-leadership", icon: UserCheck },
    { label: "Administrative Structure", href: "gov-structure", icon: Building },
    { label: "Offices & Departments", href: "gov-offices", icon: Shield },
  ]},
  { label: "Services", href: "svc-education", children: [
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
  ]},
  { label: "Vacancy", href: "vacancy" },
  { label: "Announcements", href: "news-announcements", children: [
    { label: "News", href: "news-news", icon: Newspaper },
    { label: "Bids & Tenders", href: "bids", icon: Briefcase },
    { label: "Events", href: "news-announcements", icon: Calendar },
    { label: "Announcements", href: "news-announcements", icon: Award },
  ]},
  { label: "Gallery", href: "gallery" },
];

/* ═══════════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════════ */
function Header({ currentPage, onNavigate }: { currentPage: PageId; onNavigate: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h);
  }, []);
  const mEnter = (l: string) => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setOpenDropdown(l); };
  const mLeave = () => { timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200); };
  const nav = (p: PageId) => { onNavigate(p); setMobileOpen(false); setOpenDropdown(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0B3D2E]/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-gradient-to-r from-[#062B1F] via-[#0B3D2E] to-[#145A44]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[90px] md:h-[108px]">
          <button onClick={() => nav("home")} className="flex items-center gap-4 group shrink-0">
            <img src="/logo.png" alt="Amhara Sint Woreda" className="h-[86px] w-auto rounded-2xl shadow-xl group-hover:scale-105 transition-transform object-contain ring-2 ring-white/20 ring-offset-2 ring-offset-[#0B3D2E]" />
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-xl md:text-2xl leading-tight">Amhara Sint</h1>
              <p className="text-[#86EFAC] text-xs md:text-sm font-medium">Woreda Administration</p>
            </div>
          </button>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => item.children && mEnter(item.label)} onMouseLeave={mLeave}>
                <button onClick={() => item.children ? setOpenDropdown(openDropdown === item.label ? null : item.label) : nav(item.href)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[15px] font-semibold transition-all duration-200 ${currentPage === item.href ? "text-[#EAB308] bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10"}`}>
                  {item.label}{item.children && <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />}
                </button>
                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-[#0a3327]/95 backdrop-blur-lg border border-white/15 rounded-2xl shadow-2xl py-2 z-[100]">
                    {item.children.map((c) => (
                      <button key={c.href} onClick={() => nav(c.href)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium transition-all ${currentPage === c.href ? "text-[#EAB308] bg-white/10" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
                        <c.icon className="w-4 h-4 shrink-0" />{c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => nav("contact")} className="hidden md:inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold text-[15px] px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105">
              <Phone className="w-[18px] h-[18px]" /> Contact Us
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg" aria-label="Toggle menu">
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
                <button onClick={() => item.children ? setOpenDropdown(openDropdown === item.label ? null : item.label) : nav(item.href)}
                  className="w-full flex items-center justify-between text-white/80 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg text-sm font-medium transition-all">
                  {item.label}{item.children && <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />}
                </button>
                {item.children && openDropdown === item.label && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.children.map((c) => (
                      <button key={c.href} onClick={() => nav(c.href)} className={`flex items-center gap-2.5 text-sm px-4 py-2 rounded-lg transition-all ${currentPage === c.href ? "text-[#EAB308] bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}>
                        <c.icon className="w-4 h-4" />{c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={() => nav("contact")} className="flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-semibold text-sm px-4 py-2.5 rounded-lg mt-2 transition-all">
              <Phone className="w-4 h-4" /> Contact Us
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SLIDER
   ═══════════════════════════════════════════════════════════════ */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const start = useCallback(() => { if (timerRef.current) clearInterval(timerRef.current); timerRef.current = setInterval(() => setCurrent((p) => (p + 1) % SLIDES.length), 5000); }, []);
  useEffect(() => { start(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [start]);
  const goTo = (i: number) => { setCurrent(i); start(); };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {SLIDES.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="text-center max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">{slide.title}</h2>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 drop-shadow-md">{slide.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => document.getElementById("statistics-section")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">Explore Statistics <ChevronRight className="w-5 h-5" /></button>
                <button onClick={() => document.getElementById("services-section")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white font-bold px-8 py-3.5 rounded-xl transition-all">Our Services <ArrowRight className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all z-20"><ChevronLeft className="w-6 h-6" /></button>
      <button onClick={() => goTo((current + 1) % SLIDES.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all z-20"><ChevronRight className="w-6 h-6" /></button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 ${i === current ? "w-10 h-3 bg-[#EAB308]" : "w-3 h-3 bg-white/50 hover:bg-white/80"}`} />
        ))}
      </div>
      {/* Social sidebar on left */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 z-20">
        {[{ I: Facebook, h: "https://facebook.com/AmharaSint" }, { I: Youtube, h: "https://youtube.com/@AmharaSint" }, { I: Twitter, h: "https://t.me/AmharaSint" }, { I: Instagram, h: "https://instagram.com/AmharaSint" }].map((s) => (
          <a key={s.h} href={s.h} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:scale-110 transition-all duration-300"><s.I className="w-4 h-4" /></a>
        ))}
      </div>
    </section>
  );
}
'''

# Write first part
with open(output_path, 'w') as f:
    f.write(content)

print(f"Written {len(content)} chars to {output_path}")