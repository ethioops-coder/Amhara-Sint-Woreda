"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Users, School, Building2, MapPin, TreePine, Droplets,
  Home as HomeIcon, ChevronLeft, ChevronRight, ChevronDown, BarChart3, TrendingUp,
  Landmark, Stethoscope, Menu, X, Phone, Mail, MapPinned, ArrowUp,
  ArrowLeft, ArrowRight, Tractor, GraduationCap, Truck, Wheat,
  Briefcase, Newspaper, Award, UserCheck, FileText, Building, Shield,
  Scale, Flag, UsersRound, Siren, Banknote, PieChart, ClipboardList,
  HeartPulse, Baby, Eye, BookOpen, Globe, ThumbsUp, Clock,
  Image as ImageIcon, Camera, Facebook, Youtube, Linkedin,
  Github, Instagram, Twitter, ExternalLink, Calendar,
  Monitor, HardHat, Store, CheckCircle2, AlertCircle, Upload,
  Send, User, Map, ChevronUp, Zap, Layers, Target,
  FileCheck, CircleDollarSign, Sprout, Wrench, MessageSquare,
  Plus, Minus, Trash2, Edit3, Save, Settings, Crown, Heart,
  Compass, Share2, MessageCircle, Copy,
  Handshake, Megaphone, Leaf, UsersRound as People,
  Mountain, ArrowDown, Bell,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import CookieConsentBanner from "@/components/cookie-consent";
import VisitorCounter from "@/components/visitor-counter";
import SubscribeBanner from "@/components/subscribe-banner";
import { WoredaStatistics } from "@/components/woreda-statistics";
import { InternationalNewsFeed } from "@/components/international-news-feed";
import { HomeDashboardSection } from "@/components/home-dashboard-section";
import { PaginatedNewsSection } from "@/components/paginated-news-section";
import { VacancyPage } from "@/components/vacancy-page";
import {
  TopInfoBar,
  CitizenServicesSection,
  VacancyBidsSection,
  MayorMessageSection,
  FeaturedProjectsSection,
  EmergencyContactsSection,
} from "@/components/homepage-sections";

/* ─── Types ────────────────────────────────────────────────── */
type PageId =
  | "home" | "about-history" | "about-overview" | "about-location"
  | "gov-leadership" | "gov-structure" | "gov-offices"
  | "svc-education" | "svc-health" | "svc-agriculture"
  | "svc-transport" | "svc-water" | "svc-justice" | "svc-finance"
  | "svc-trade" | "svc-technology" | "svc-construction"
  | "news-news" | "news-bids" | "news-vacancy" | "news-announcements"
  | "gallery" | "vacancy" | "bids" | "contact" | "submit-cv";

interface ApplicationData {
  id: string; fullName: string; email: string; phone: string;
  dob: string; gender: string; address: string;
  education: string; institution: string; yearGraduated: string;
  experienceYears: string; currentEmployer: string; currentPosition: string;
  keyQualifications: string; coverLetterName: string; cvName: string;
  vacancyTitle: string; vacancyId: string; appliedAt: string; status: string;
}

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
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
          if (p < 1) requestAnimationFrame(step);
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
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Animated Leader Photo Component ──────────────────────── */
function LeaderPhoto({ name, avatar, size = 120, title, socials }: {
  name: string; avatar: string; size?: number; title: string;
  socials?: { platform: string; url: string; icon: string }[];
}) {
  const [hovered, setHovered] = useState(false);
  const iconMap: Record<string, React.ElementType> = { facebook: Facebook, telegram: Twitter, youtube: Youtube, linkedin: Linkedin, instagram: Instagram, twitter: Twitter };
  const colorMap: Record<string, string> = { facebook: "#1877F2", telegram: "#0088CC", youtube: "#FF0000", linkedin: "#0A66C2", instagram: "#E4405F", twitter: "#1DA1F2" };

  return (
    <div className="flex flex-col items-center text-center group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative mb-4">
        {/* Animated pulse rings */}
        <span className={`absolute inset-0 rounded-full border-2 border-[#EAB308]/40 transition-all duration-500 ${hovered ? "scale-110 opacity-60" : "scale-100 opacity-0"}`} style={{ width: size, height: size }} />
        <span className={`absolute inset-0 rounded-full border-2 border-[#0B3D2E]/30 transition-all duration-700 ${hovered ? "scale-125 opacity-40" : "scale-100 opacity-0"}`} style={{ width: size, height: size }} />

        {/* Photo circle */}
        <div className="relative overflow-hidden rounded-full shadow-xl border-4 border-white transition-all duration-500 group-hover:shadow-2xl group-hover:border-[#EAB308]/50 group-hover:scale-105"
          style={{ width: size, height: size }}>
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`} />
          <div className={`absolute bottom-2 left-0 right-0 text-white text-[10px] font-medium transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
            View Profile
          </div>
        </div>
      </div>
      <h3 className="font-bold text-[#0B3D2E] text-sm md:text-base mb-1 group-hover:text-[#EAB308] transition-colors">{name}</h3>
      <p className="text-[#EAB308] text-xs font-semibold mb-3">{title}</p>

      {/* Social links */}
      {socials && socials.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          {socials.map((s) => {
            const Icon = iconMap[s.icon.toLowerCase()] || Globe;
            const color = colorMap[s.icon.toLowerCase()] || "#0B3D2E";
            return (
              <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" title={s.platform}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: color + "15", color: color }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = color; (e.currentTarget as HTMLElement).style.color = "white"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = color + "15"; (e.currentTarget as HTMLElement).style.color = color; }}>
                <Icon className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Hero Slides ──────────────────────────────────────────── */
const SLIDES = [
  { image: "https://sfile.chatglm.cn/images-ppt/5d712c5b8f44.jpg", title: "Welcome to Amhara Sayint Woreda", subtitle: "A land of beauty, culture, and progress in South Wollo Zone, Amhara Region" },
  { image: "https://sfile.chatglm.cn/images-ppt/e2eed6eb06d5.jpg", title: "Majestic Highland Landscapes", subtitle: "Rolling highlands and fertile valleys stretching from the Blue Nile to Mount Tabor at 4,247m" },
  { image: "https://sfile.chatglm.cn/images-ppt/c9ebd2951a03.jpg", title: "Rich Natural Heritage", subtitle: "Diverse ecosystems and breathtaking scenery in the heart of the Amhara highlands" },
  { image: "https://sfile.chatglm.cn/images-ppt/b37b6e89b27a.jpg", title: "Vibrant Cultural Traditions", subtitle: "Ancient Orthodox heritage, Meskel celebrations, and time-honored customs define our community" },
  { image: "https://sfile.chatglm.cn/images-ppt/2c0bd22da89e.jpg", title: "The Blue Nile Canyon", subtitle: "The western boundary of the woreda features one of the most dramatic river canyons in all of Ethiopia" },
  { image: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg", title: "Agricultural Heartland", subtitle: "Supporting farmers with modern techniques across 1,437 km² of fertile highland terrain" },
  { image: "https://sfile.chatglm.cn/images-ppt/15e928c7ad4d.jpg", title: "Building the Future", subtitle: "Roads, schools, and health facilities connecting communities to opportunities" },
  { image: "https://sfile.chatglm.cn/images-ppt/395da4df6bb6.jpg", title: "Trade & Commerce", subtitle: "Local markets, cooperatives, and enterprises driving economic growth" },
  { image: "https://sfile.chatglm.cn/images-ppt/a842501dc00b.jpg", title: "Education & Youth Empowerment", subtitle: "Amhara Sayint TVET College and preparatory schools preparing the next generation" },
  { image: "https://sfile.chatglm.cn/images-ppt/5d19c0f98d58.jpg", title: "Our Vision", subtitle: "A prosperous, equitable, and self-reliant Amhara Sayint — rooted in tradition, reaching for the future" },
];

/* ─── Nav Links ────────────────────────────────────────────── */
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

/* ─── HEADER ───────────────────────────────────────────────── */
function Header({ currentPage, onNavigate }: { currentPage: PageId; onNavigate: (p: PageId) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const tRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const mE = (l: string) => { if (tRef.current) clearTimeout(tRef.current); setOpenDropdown(l); };
  const mL = () => { tRef.current = setTimeout(() => setOpenDropdown(null), 200); };
  const nav = (p: PageId) => { onNavigate(p); setMobileOpen(false); setOpenDropdown(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0B3D2E]/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-gradient-to-r from-[#062B1F] via-[#0B3D2E] to-[#145A44]"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[92px] md:h-[110px]">
          <button onClick={() => nav("home")} className="flex items-center gap-4 group shrink-0">
            <img src="/logo.png" alt="Amhara Sayint Woreda" className="h-[88px] w-auto rounded-2xl shadow-xl group-hover:scale-105 transition-transform object-contain ring-2 ring-white/20 ring-offset-2 ring-offset-[#0B3D2E]" />
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-xl md:text-2xl leading-tight">Amhara Sayint</h1>
              <p className="text-[#86EFAC] text-xs md:text-sm font-medium">Woreda Administration</p>
            </div>
          </button>
          <nav className="hidden lg:flex items-center gap-1.5">
            {NAV_LINKS.map((item) => (
              <div key={item.label} className="relative" onMouseEnter={() => item.children && mE(item.label)} onMouseLeave={mL}>
                <button onClick={() => item.children ? setOpenDropdown(openDropdown === item.label ? null : item.label) : nav(item.href)}
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[15px] font-semibold transition-all duration-200 ${currentPage === item.href ? "text-[#EAB308] bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10"}`}>
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
          <div className="flex items-center gap-2">
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
            <button onClick={() => nav("contact")} className="flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-semibold text-sm px-4 py-2.5 rounded-lg mt-3 transition-all">
              <Phone className="w-4 h-4" /> Contact Us
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ─── QUICK NAV BAR (Home) ──────────────────────────────── */
const QUICK_NAV_ITEMS = [
  { label: "Services", icon: Layers, href: "svc-education" as PageId },
  { label: "News & Events", icon: Newspaper, href: "news-news" as PageId },
  { label: "Vacancy", icon: Briefcase, href: "vacancy" as PageId },
  { label: "Bids & Tenders", icon: FileCheck, href: "bids" as PageId },
  { label: "Gallery", icon: ImageIcon, href: "gallery" as PageId },
  { label: "Announcements", icon: Award, href: "news-announcements" as PageId },
  { label: "Contact", icon: Phone, href: "contact" as PageId },
];
function QuickNavBar({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center gap-2.5 py-3.5 overflow-x-auto scrollbar-hide">
          {QUICK_NAV_ITEMS.map((item) => (
            <button key={item.label} onClick={() => onNavigate(item.href)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 hover:bg-[#0B3D2E] text-[#0B3D2E]/70 hover:text-white text-[13px] font-medium border border-gray-200 hover:border-[#0B3D2E] transition-all duration-200 whitespace-nowrap shrink-0">
              <item.icon className="w-4 h-4" />{item.label}
            </button>
          ))}
          <button onClick={() => onNavigate("contact")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-[13px] font-semibold border border-red-200 transition-all duration-200 whitespace-nowrap shrink-0 ml-auto">
            <Siren className="w-4 h-4" /> Emergency 991
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── HERO STATS SECTION (Below Slider) ─── */
const HERO_STATS = [
  { value: 214056, display: "214,056", label: "Population",       icon: Users,      bg: "#16A34A", light: "#DCFCE7" },
  { value: 37,     display: "37",      label: "Kebeles",          icon: MapPin,     bg: "#2563EB", light: "#DBEAFE" },
  { value: 106,    display: "106",     label: "Schools",          icon: School,     bg: "#D97706", light: "#FEF3C7" },
  { value: 8,      display: "8",       label: "Health Facilities", icon: HeartPulse, bg: "#DC2626", light: "#FEE2E2" },
  { value: 1437,   display: "1,437",   label: "Area km²",         icon: Map,        bg: "#7C3AED", light: "#EDE9FE" },
  { value: 200,    display: "200 M",   label: "Budget (ETB)",     icon: Banknote,   bg: "#0891B2", light: "#CFFAFE" },
];
function HeroStatsSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return (
    <section ref={ref} className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5">
          {HERO_STATS.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-2xl p-4 md:p-5 flex flex-col items-center gap-3 cursor-default group
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{
                backgroundColor: s.light,
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Colored icon circle */}
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0"
                style={{ backgroundColor: s.bg }}
              >
                <s.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              {/* Number */}
              <div
                className="text-2xl md:text-3xl font-black leading-none tabular-nums"
                style={{ color: s.bg }}
              >
                {s.display}
              </div>
              {/* Label */}
              <p className="text-[10px] md:text-xs font-semibold text-gray-500 uppercase tracking-wider text-center leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DID YOU KNOW BAR (Home) ─────────────────────────────── */
function DidYouKnowBar() {
  const facts = [
    "Sayint (Amhara Sayint) has 37 kebeles and a population of 214,056 (CSA 2007 census).",
    "The woreda covers 1,437.30 km\u00B2, bordered by the Blue Nile and Bashilo River.",
    "Mount Tabor (4,247m), the highest point in South Wollo Zone, lies on the border with Legambo.",
    "98% of inhabitants practice Orthodox Tewahedo, and 99.96% are Amhara (Amharic speaking).",
    "The historic Tadbaba Maryam monastery was founded during the reign of Emperor Minilik I.",
    "Emperor Tewodros II's mother, Atitegeb Wondbewossen, was a native of Amhara Sayint.",
    "Amhara Sayint TVET College offers technical and vocational training programs for the youth.",
    "106 schools and 3 preparatory schools serve students across the entire woreda.",
  ];
  const [idx, setIdx] = useState(0);
  useEffect(() => { const t = setInterval(() => setIdx((p) => (p + 1) % facts.length), 5000); return () => clearInterval(t); }, []);
  return (
    <div className="bg-amber-50 border-y border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
          <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider hidden sm:block">Did You Know?</span>
        </div>
        <p className="text-sm text-amber-800/80 font-medium transition-all duration-300">{facts[idx]}</p>
      </div>
    </div>
  );
}

/* ─── HERO SLIDER ──────────────────────────────────────────── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const tRef = useRef<NodeJS.Timeout | null>(null);
  const start = useCallback(() => { if (tRef.current) clearInterval(tRef.current); tRef.current = setInterval(() => setCurrent((p) => (p + 1) % SLIDES.length), 5000); }, []);
  useEffect(() => { start(); return () => { if (tRef.current) clearInterval(tRef.current); }; }, [start]);
  const goTo = (i: number) => { setCurrent(i); start(); };
  return (
    <section className="relative h-[60vh] min-h-[380px] max-h-[600px] overflow-hidden">
      {SLIDES.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === current ? 1 : 0 }}>
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/e2eed6eb06d5.jpg'; }} />
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
        {SLIDES.map((_, i) => (<button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 ${i === current ? "w-10 h-3 bg-[#EAB308]" : "w-3 h-3 bg-white/50 hover:bg-white/80"}`} />))}
      </div>
    </section>
  );
}

/* ─── NEWS FEED (Home) — Template-Inspired List Layout ── */
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return dateStr;
}
function NewsFeedSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [items, setItems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Always fetch fresh from API — never use stale localStorage cache
    fetch("/admin/api/news").then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        const published = data.filter((n: any) => n.status === "published").map((n: any) => ({ ...n, image: n.image || n.imageUrl }));
        if (published.length > 0) { setItems(published); return; }
      }
      // Fallback to default data only if API returns nothing
      setItems([
        { id: "1", title: "Amhara Sayint Launches New Water Supply Project", summary: "A major clean water initiative covering 8 kebeles has been approved with a budget of ETB 12 million, bringing safe drinking water to over 15,000 residents.", category: "Water", author: "Communications Office", status: "published", featured: true, date: "2026-06-28", image: "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg", initialLikes: 47, initialComments: 12 },
        { id: "2", title: "Annual Agricultural Exhibition a Great Success", summary: "Over 2,000 farmers participated in this year's exhibition showcasing modern farming techniques, improved seed varieties, and irrigation methods.", category: "Agriculture", author: "Agriculture Office", status: "published", featured: false, date: "2026-06-25", image: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg", initialLikes: 83, initialComments: 24 },
        { id: "3", title: "New Primary School Inaugurated in Kebele 05", summary: "The woreda administration inaugurated a fully equipped primary school serving 400 students with modern classrooms, a computer lab, and a library.", category: "Education", author: "Education Office", status: "published", featured: false, date: "2026-06-20", image: "https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg", initialLikes: 62, initialComments: 8 },
        { id: "4", title: "TVET College Enrolls Record 500 Students", summary: "Amhara Sayint TVET College has enrolled a record 500 students this academic year in construction, ICT, wood work, and agriculture programs.", category: "Education", author: "TVET College Office", status: "published", featured: false, date: "2026-06-15", image: "https://sfile.chatglm.cn/images-ppt/a842501dc00b.jpg", initialLikes: 95, initialComments: 31 },
        { id: "5", title: "Meskel Celebration Unites Community", summary: "Thousands of residents gathered for the annual Meskel celebration with Demera bonfire, prayer, and cultural performances across the woreda.", category: "Culture", author: "Culture & Tourism Office", status: "published", featured: false, date: "2026-06-10", image: "https://sfile.chatglm.cn/images-ppt/b37b6e89b27a.jpg", initialLikes: 128, initialComments: 45 },
        { id: "6", title: "Road Construction Connects Remote Kebeles", summary: "A new 18 km all-weather road now connects 5 previously isolated kebeles to the main town, improving access for over 8,000 residents.", category: "Infrastructure", author: "Road Authority", status: "published", featured: false, date: "2026-06-05", image: "https://sfile.chatglm.cn/images-ppt/15e928c7ad4d.jpg", initialLikes: 56, initialComments: 15 },
        { id: "7", title: "Health Campaign Reaches 10,000 Residents", summary: "A week-long health awareness campaign reached 10,000 residents with free screenings for diabetes, hypertension, and eye diseases.", category: "Health", author: "Communications Office", status: "published", featured: false, date: "2026-05-28", image: "https://sfile.chatglm.cn/images-ppt/40afb43a5118.jpg", initialLikes: 71, initialComments: 19 },
        { id: "8", title: "Youth Entrepreneurship Training Program Launch", summary: "The woreda launched a 3-month entrepreneurship training program for 200 youth, covering business planning, financial literacy, and digital skills.", category: "Youth", author: "Communications Office", status: "published", featured: false, date: "2026-05-20", image: "https://sfile.chatglm.cn/images-ppt/395da4df6bb6.jpg", initialLikes: 44, initialComments: 11 },
        { id: "9", title: "New Market Built in Ajibar Town", summary: "A modern market facility with 150 stalls, cold storage, and sanitation facilities was inaugurated to support local traders and farmers.", category: "Trade", author: "Communications Office", status: "published", featured: false, date: "2026-05-15", image: "https://sfile.chatglm.cn/images-ppt/395da4df6bb6.jpg", initialLikes: 67, initialComments: 22 },
      ]);
    }).catch(() => {
      setItems([
        { id: "1", title: "Amhara Sayint Launches New Water Supply Project", summary: "A major clean water initiative covering 8 kebeles has been approved with a budget of ETB 12 million, bringing safe drinking water to over 15,000 residents.", category: "Water", author: "Communications Office", status: "published", featured: true, date: "2026-06-28", image: "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg", initialLikes: 47, initialComments: 12 },
        { id: "2", title: "Annual Agricultural Exhibition a Great Success", summary: "Over 2,000 farmers participated in this year's exhibition showcasing modern farming techniques, improved seed varieties, and irrigation methods.", category: "Agriculture", author: "Agriculture Office", status: "published", featured: false, date: "2026-06-25", image: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg", initialLikes: 83, initialComments: 24 },
      ]);
    });
  }, []);

  const toggleLike = (id: string) => {
    setLiked(p => ({ ...p, [id]: !p[id] }));
    setLikes(p => ({ ...p, [id]: (p[id] || 0) + (liked[id] ? -1 : 1) }));
  };

  const featured = items.find(i => i.featured);
  const nonFeatured = items.filter(i => !i.featured);
  const totalPages = Math.ceil(nonFeatured.length / perPage);
  const pageItems = nonFeatured.slice((currentPage - 1) * perPage, currentPage * perPage);

  const categoryColors: Record<string, string> = {
    Water: "bg-blue-500", Agriculture: "bg-green-500", Education: "bg-indigo-500", Culture: "bg-amber-500",
    Infrastructure: "bg-orange-500", Health: "bg-rose-500", Youth: "bg-purple-500", Trade: "bg-teal-500",
  };

  const quickLinks = [
    { label: "Services", icon: Layers, href: "svc-education" as PageId, color: "#6366F1" },
    { label: "Vacancy", icon: Briefcase, href: "vacancy" as PageId, color: "#F59E0B" },
    { label: "Bids & Tenders", icon: FileCheck, href: "bids" as PageId, color: "#F43F5E" },
    { label: "Gallery", icon: ImageIcon, href: "gallery" as PageId, color: "#10B981" },
    { label: "Announcements", icon: Award, href: "news-announcements" as PageId, color: "#06B6D4" },
    { label: "Contact Us", icon: Phone, href: "contact" as PageId, color: "#EF4444" },
  ];

  return (
    <section className="py-10 md:py-14 bg-gray-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3D2E] mb-1">Latest News & Events</h2>
              <p className="text-[#0B3D2E]/50 text-sm">Stay informed about developments from Amhara Sayint Woreda</p>
            </div>
            <button onClick={() => onNavigate("news-news")} className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-[#16A34A] hover:text-[#15803d] transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main news column (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured card — compact */}
            {featured && (
              <AnimatedSection delay={100}>
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 h-52 sm:h-60" onClick={() => onNavigate("news-news")}>
                  <img src={featured.image || featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`${categoryColors[featured.category] || "bg-[#EAB308]"} text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider`}>{featured.category}</span>
                    <span className="bg-[#EAB308] text-[#0B3D2E] text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider">Featured</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="text-white font-extrabold text-lg sm:text-xl md:text-2xl mb-1.5 leading-tight drop-shadow-lg">{featured.title}</h3>
                    <p className="text-white/70 text-sm mb-2 line-clamp-1 max-w-2xl">{featured.summary}</p>
                    <div className="flex items-center gap-4 text-white/50 text-xs">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                      <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" />{(featured.initialLikes || 0) + (likes[featured.id] || 0)}</span>
                      <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" />{featured.initialComments || 0}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* News list */}
            <div className="space-y-3">
              {pageItems.map((item, i) => {
                const likeCount = (item.initialLikes || 0) + (likes[item.id] || 0);
                const isLiked = liked[item.id] || false;
                return (
                  <AnimatedSection key={item.id} delay={i * 50}>
                    <div className="bg-white rounded-xl border border-gray-100 p-3 md:p-4 flex gap-3 md:gap-4 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group cursor-pointer" onClick={() => onNavigate("news-news")}>
                      <div className="relative w-24 h-20 sm:w-32 sm:h-24 rounded-lg overflow-hidden shrink-0">
                        <img src={item.image || item.imageUrl || "https://sfile.chatglm.cn/images-ppt/31a73cdbeed8.jpg"} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg'; }} />
                        <span className={`absolute top-1.5 left-1.5 ${categoryColors[item.category] || "bg-[#EAB308]"} text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider`}>{item.category}</span>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div>
                          <h3 className="font-bold text-[#0B3D2E] text-sm leading-snug mb-1 group-hover:text-[#EAB308] transition-colors line-clamp-2">{item.title}</h3>
                          <p className="text-[#0B3D2E]/50 text-xs leading-relaxed line-clamp-1 hidden sm:block">{item.summary}</p>
                        </div>
                        <div className="flex items-center gap-3 text-[#0B3D2E]/35 text-xs">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
                          <span className="hidden sm:flex items-center gap-1"><MessageCircle className="w-3 h-3" />{item.initialComments || 0}</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                            className={`ml-auto flex items-center gap-1 transition-colors ${isLiked ? "text-red-500" : "text-[#0B3D2E]/30 hover:text-red-400"}`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500" : ""}`} />{likeCount}
                          </button>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold border border-gray-200 text-[#0B3D2E]/50 hover:bg-[#0B3D2E] hover:text-white hover:border-[#0B3D2E] transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                      currentPage === page ? "bg-[#0B3D2E] text-white shadow-md shadow-[#0B3D2E]/20" : "border border-gray-200 text-[#0B3D2E]/50 hover:bg-[#0B3D2E] hover:text-white hover:border-[#0B3D2E]"
                    }`}>
                    {page}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold border border-gray-200 text-[#0B3D2E]/50 hover:bg-[#0B3D2E] hover:text-white hover:border-[#0B3D2E] transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="text-center sm:hidden">
              <button onClick={() => onNavigate("news-news")} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#16A34A] hover:text-[#15803d] transition-colors">
                View All News <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sidebar (1/3) */}
          <div className="hidden lg:flex flex-col gap-5">
            {/* Quick Access */}
            <AnimatedSection delay={150}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-[#0B3D2E] px-5 py-3">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2"><Zap className="w-4 h-4 text-[#EAB308]" />Quick Access</h3>
                </div>
                <div className="p-3 grid grid-cols-2 gap-2">
                  {quickLinks.map((item) => (
                    <button key={item.label} onClick={() => onNavigate(item.href)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: item.color + "15" }}>
                        <item.icon className="w-4 h-4" style={{ color: item.color }} />
                      </div>
                      <span className="text-[11px] font-semibold text-[#0B3D2E]/70 group-hover:text-[#0B3D2E]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Emergency Hotline */}
            <AnimatedSection delay={200}>
              <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-5 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Siren className="w-5 h-5 animate-pulse" />
                  <h3 className="font-bold text-sm">Emergency Hotline</h3>
                </div>
                <p className="text-white/80 text-xs mb-3">For emergencies, call immediately:</p>
                <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                  <p className="text-2xl font-black tracking-wider">991</p>
                  <p className="text-[10px] text-white/60 mt-1">Free Emergency Number</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Location Card */}
            <AnimatedSection delay={250}>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-[#0B3D2E] px-5 py-3">
                  <h3 className="text-white font-bold text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-[#EAB308]" />Our Location</h3>
                </div>
                <div className="p-4">
                  <div className="rounded-xl overflow-hidden mb-3 border border-gray-100">
                    <iframe
                      title="Mini Map"
                      src="https://www.openstreetmap.org/export/embed.html?bbox=38.5%2C10.8%2C38.8%2C11.05&layer=mapnik&marker=10.92%2C38.65"
                      className="w-full h-[160px] border-0"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1.5 text-xs text-[#0B3D2E]/60">
                    <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#EAB308]" /> South Wollo Zone, Amhara</p>
                    <p className="flex items-center gap-2"><Compass className="w-3.5 h-3.5 text-[#EAB308]" /> 10.92° N, 38.65° E</p>
                    <button onClick={() => onNavigate("about-location")} className="text-[#16A34A] font-semibold hover:text-[#15803d] transition-colors flex items-center gap-1 mt-1">
                      View Full Map <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── TVET COLLEGE SECTION (Home) ───────────────────────── */
const TVET_PROGRAMS = [
  { sector: "Manufacturing", icon: Wrench, color: "#F59E0B", bg: "#FFFBEB", programs: ["Wood Work Technology", "Garment Production"] },
  { sector: "Construction", icon: HardHat, color: "#F97316", bg: "#FFF7ED", programs: ["Structural Construction", "Building Technology"] },
  { sector: "ICT", icon: Monitor, color: "#6366F1", bg: "#EEF2FF", programs: ["Web Development", "Computer Networking"] },
  { sector: "Agriculture", icon: Sprout, color: "#16A34A", bg: "#F0FDF4", programs: ["Animal Production", "Crop Production"] },
];
function TVETCollegeSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [activeSector, setActiveSector] = useState(0);
  const collegeStats = [
    { value: 500, label: "Students Enrolled", icon: Users, color: "#10B981" },
    { value: 8, label: "Training Programs", icon: BookOpen, color: "#6366F1" },
    { value: 4, label: "Sectors", icon: Layers, color: "#F59E0B" },
    { value: 4, label: "Certification Levels", icon: Award, color: "#F43F5E" },
  ];
  return (
    <section className="py-10 md:py-14 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#0B3D2E]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#EAB308]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#0B3D2E]/5 border border-[#0B3D2E]/10 rounded-full px-4 py-1.5 mb-3">
              <GraduationCap className="w-4 h-4 text-[#0B3D2E]" />
              <span className="text-[#0B3D2E] text-xs font-bold uppercase tracking-[0.15em]">Technical &amp; Vocational Education</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0B3D2E] mb-2 leading-tight">
              Amhara Sayint <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3D2E] to-[#EAB308]">TVET College</span>
            </h2>
            <p className="text-[#0B3D2E]/50 max-w-2xl mx-auto text-sm leading-relaxed">
              Equipping youth with market-relevant skills in manufacturing, construction, ICT, and agriculture.
            </p>
          </div>
        </AnimatedSection>

        {/* College Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {collegeStats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 80}>
              <div className="relative bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group overflow-hidden">
                <div className="absolute top-0 right-0 w-14 h-14 rounded-bl-[32px] opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: stat.color }} />
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: stat.color }}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black mb-1" style={{ color: stat.color }}>
                  <AnimatedCounter target={stat.value} suffix="+" />
                </div>
                <p className="text-gray-500 text-xs font-semibold">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Programs — Interactive Tabs */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <AnimatedSection delay={200}>
            <div className="space-y-3">
              {TVET_PROGRAMS.map((sector, i) => (
                <button key={sector.sector} onClick={() => setActiveSector(i)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-500 text-left group ${activeSector === i ? "bg-[#0B3D2E] border-[#0B3D2E] shadow-xl shadow-[#0B3D2E]/10 -translate-y-0.5" : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"}`}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300" style={{ backgroundColor: activeSector === i ? "rgba(255,255,255,0.1)" : sector.color + "12" }}>
                    <sector.icon className="w-7 h-7 transition-colors duration-300" style={{ color: activeSector === i ? "#EAB308" : sector.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-base transition-colors duration-300 ${activeSector === i ? "text-white" : "text-[#0B3D2E]"}`}>{sector.sector}</h3>
                    <p className={`text-xs mt-0.5 transition-colors duration-300 ${activeSector === i ? "text-white/50" : "text-[#0B3D2E]/40"}`}>{sector.programs.join(" · ")}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${activeSector === i ? "bg-[#EAB308]" : "bg-gray-50"}`}>
                    <ArrowRight className={`w-4 h-4 transition-all duration-300 ${activeSector === i ? "text-[#0B3D2E]" : "text-gray-300"}`} />
                  </div>
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="relative">
              {TVET_PROGRAMS.map((sector, i) => (
                <div key={sector.sector} className={`absolute inset-0 transition-all duration-500 ${activeSector === i ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-4 z-0"}`}>
                  <div className="h-full rounded-2xl overflow-hidden border border-gray-100 shadow-lg" style={{ backgroundColor: sector.bg }}>
                    <div className="p-8 md:p-10 flex flex-col justify-center h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: sector.color + "20" }}>
                          <sector.icon className="w-7 h-7" style={{ color: sector.color }} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-[#0B3D2E]">{sector.sector}</h3>
                          <p className="text-sm text-[#0B3D2E]/40 font-medium">{sector.programs.length} Training Programs</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {sector.programs.map((p) => (
                          <div key={p} className="flex items-center gap-3 bg-white/60 rounded-xl px-5 py-3.5 border border-white/80 hover:shadow-md transition-all duration-300 cursor-default">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: sector.color + "15" }}>
                              <CheckCircle2 className="w-4 h-4" style={{ color: sector.color }} />
                            </div>
                            <span className="font-semibold text-[#0B3D2E] text-sm">{p}</span>
                            <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: sector.color + "12", color: sector.color }}>Certificate</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => onNavigate("svc-education")} className="mt-6 inline-flex items-center gap-2 bg-[#0B3D2E] hover:bg-[#145A44] text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] w-fit">
                        View Full Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="h-full min-h-[320px]" />
            </div>
          </AnimatedSection>
        </div>

        {/* Enrollment Banner — 2026/27 Academic Year */}
        <AnimatedSection delay={400}>
          <div className="relative overflow-hidden bg-gradient-to-br from-[#062B1F] via-[#0B3D2E] to-[#0d4a38] rounded-2xl">
            {/* Animated background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-[5%] w-72 h-72 bg-[#EAB308]/[0.07] rounded-full blur-3xl animate-glow-pulse" />
              <div className="absolute bottom-0 right-[10%] w-96 h-96 bg-[#16A34A]/[0.08] rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#EAB308]/[0.03] rounded-full blur-3xl animate-spin-slow" />
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #EAB308 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            </div>

            <div className="relative z-10 px-6 sm:px-8 lg:px-10 py-8 md:py-10">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Image */}
                <div className="relative shrink-0">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden ring-4 ring-[#EAB308]/30 shadow-2xl shadow-[#EAB308]/10 animate-float">
                      <img src="https://sfile.chatglm.cn/images-ppt/a842501dc00b.jpg" alt="TVET College" className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute -inset-2 rounded-2xl border-2 border-[#EAB308]/20 animate-pulse" />
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-lg animate-float-delayed tracking-wider">NEW</div>
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-[#EAB308]/10 border border-[#EAB308]/20 rounded-full px-4 py-1.5 mb-4 animate-scale-in">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EAB308] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EAB308]"></span>
                    </span>
                    <GraduationCap className="w-3.5 h-3.5 text-[#EAB308]" />
                    <span className="text-[#EAB308] text-[10px] md:text-xs font-bold uppercase tracking-[0.15em]">Admissions Open 2026/27</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 leading-[1.1] tracking-tight">
                    Enroll Now for{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] via-[#FDE047] to-[#EAB308] animate-gradient-shift bg-[length:200%_200%]">2026/27</span>
                      <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#EAB308]/20 rounded-full -z-0" />
                    </span>{" "}
                    Academic Year
                  </h3>
                  <p className="text-white/55 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4">
                    Certificate &amp; Diploma programs · Level I–IV · Duration: 1–4 years · Hands-on practical training
                  </p>
                  <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                      <Phone className="w-4 h-4 text-[#EAB308]" />
                      <span className="text-white/70 text-xs md:text-sm font-medium">0334 470 0026 / 0027 / 0117</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-white/30 text-xs">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 500+ Students</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> 8 Programs</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Level I–IV</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="shrink-0">
                  <button
                    onClick={() => onNavigate("svc-education")}
                    className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#EAB308] via-[#FDE047] to-[#EAB308] hover:from-[#d4a30a] hover:via-[#EAB308] hover:to-[#d4a30a] text-[#0B3D2E] font-black text-base md:text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-[#EAB308]/25 hover:shadow-[#EAB308]/40 transition-all duration-500 hover:scale-105 animate-gradient-shift bg-[length:200%_200%]"
                  >
                    <span className="flex items-center justify-center w-8 h-8 bg-[#0B3D2E]/10 rounded-xl group-hover:bg-[#0B3D2E]/20 transition-all">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    Learn More
                  </button>
                </div>
              </div>

              {/* Scrolling programs marquee */}
              <div className="mt-8 overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#062B1F] to-transparent z-10 rounded-l-2xl" />
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d4a38] to-transparent z-10 rounded-r-2xl" />
                <div className="flex animate-marquee whitespace-nowrap">
                  {[...Array(2)].map((_, si) => (
                    <div key={si} className="flex items-center gap-6 mr-6">
                      {["Wood Work Technology", "Garment Production", "Structural Construction", "Building Technology", "Web Development", "Computer Networking", "Animal Production", "Crop Production"].map((p, i) => (
                        <span key={`${si}-${i}`} className="text-white/15 text-sm font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]/30" />{p}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── QUICK STATS (Home) ─── */
const KEY_STATS = [
  { label: "Population",       value: 214056, display: "214,056", icon: Users,      bg: "#16A34A", light: "#F0FDF4", border: "#BBF7D0" },
  { label: "Kebeles",          value: 37,     display: "37",      icon: MapPin,     bg: "#2563EB", light: "#EFF6FF", border: "#BFDBFE" },
  { label: "Schools",          value: 106,    display: "106",     icon: School,     bg: "#D97706", light: "#FFFBEB", border: "#FDE68A" },
  { label: "Health Facilities",value: 8,      display: "8",       icon: HeartPulse, bg: "#DC2626", light: "#FFF1F2", border: "#FECDD3" },
  { label: "Area (km²)",       value: 1437,   display: "1,437",   icon: Map,        bg: "#7C3AED", light: "#FAF5FF", border: "#DDD6FE" },
  { label: "Budget (ETB)",     value: 200,    display: "200 M",   icon: Banknote,   bg: "#0891B2", light: "#ECFEFF", border: "#A5F3FC" },
];
function QuickStats() {
  return (
    <section id="statistics-section" className="bg-gray-50 py-10 md:py-14 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="text-center mb-8 md:mb-10">
          <span className="inline-flex items-center gap-2 bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#0B3D2E]/15 mb-3">
            <BarChart3 className="w-3.5 h-3.5" /> Woreda at a Glance
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3D2E]">
            Key <span className="text-[#EAB308]">Statistics</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {KEY_STATS.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 70}>
              <div
                className="rounded-2xl p-5 md:p-6 flex flex-col items-center text-center gap-3 border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group"
                style={{ backgroundColor: s.light, borderColor: s.border }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: s.bg }}
                >
                  <s.icon className="w-6 h-6 text-white" />
                </div>

                {/* Number */}
                <div
                  className="text-3xl md:text-4xl font-black leading-none tabular-nums"
                  style={{ color: s.bg }}
                >
                  {s.display}
                </div>

                {/* Label */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide leading-tight">
                  {s.label}
                </p>

                {/* Bottom bar */}
                <div
                  className="h-1 w-8 rounded-full group-hover:w-12 transition-all duration-300"
                  style={{ backgroundColor: s.bg, opacity: 0.3 }}
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES OVERVIEW (Home) ─────────────────────────── */
const HOME_SERVICE_CARDS = [
  { title: "Education", desc: "106 schools, TVET college, 680+ teachers", icon: GraduationCap, color: "#1D4ED8", bg: "from-blue-500 to-indigo-600", image: "https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg", href: "svc-education" as PageId },
  { title: "Health", desc: "8 health facilities, 120+ health workers", icon: HeartPulse, color: "#DC2626", bg: "from-rose-500 to-pink-600", image: "https://sfile.chatglm.cn/images-ppt/10cf906e32cf.jpg", href: "svc-health" as PageId },
  { title: "Agriculture", desc: "28,500+ farm households, 120+ cooperatives", icon: Tractor, color: "#16A34A", bg: "from-emerald-500 to-teal-600", image: "https://sfile.chatglm.cn/images-ppt/30fee1e622be.jpg", href: "svc-agriculture" as PageId },
  { title: "Construction", desc: "85 km roads, 34 public buildings, 64 water points", icon: HardHat, color: "#EA580C", bg: "from-orange-500 to-red-600", image: "https://sfile.chatglm.cn/images-ppt/56336ff1a645.jpg", href: "svc-construction" as PageId },
  { title: "Trade & Commerce", desc: "850+ enterprises, 8 markets, 45 cooperatives", icon: Store, color: "#9333EA", bg: "from-purple-500 to-violet-600", image: "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg", href: "svc-trade" as PageId },
  { title: "Technology & ICT", desc: "12 computer labs, 5 internet centers, 1,200+ trained", icon: Monitor, color: "#0891B2", bg: "from-cyan-500 to-blue-600", image: "https://sfile.chatglm.cn/images-ppt/4db62da31bf6.png", href: "svc-technology" as PageId },
];
function ServicesOverviewSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-gray-50 to-white" id="services-section">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <AnimatedSection>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#0B3D2E]/5 border border-[#0B3D2E]/10 rounded-full px-4 py-1.5 mb-3">
              <Layers className="w-4 h-4 text-[#0B3D2E]" />
              <span className="text-[#0B3D2E] text-xs font-bold uppercase tracking-[0.15em]">Our Services</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0B3D2E] mb-2">What We <span className="text-[#EAB308]">Deliver</span></h2>
            <p className="text-[#0B3D2E]/50 max-w-2xl mx-auto text-sm">Comprehensive public services across education, health, agriculture, infrastructure, trade, and technology.</p>
          </div>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOME_SERVICE_CARDS.map((svc, i) => (
            <AnimatedSection key={svc.title} delay={i * 80}>
              <button onClick={() => onNavigate(svc.href)} className="w-full text-left bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-100 overflow-hidden group transition-all duration-500 hover:-translate-y-1.5">
                <div className="relative h-36 overflow-hidden">
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/e2eed6eb06d5.jpg'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${svc.bg} flex items-center justify-center shadow-lg`}>
                      <svc.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-base">{svc.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[#0B3D2E]/60 text-sm leading-relaxed">{svc.desc}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-bold" style={{ color: svc.color }}>
                    Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CULTURAL PLACES (Home) ─────────────────────────────── */
const CULTURAL_PLACES = [
  {
    title: "Tadbaba Maryam Monastery",
    subtitle: "The Tabernacle of Zion — ተድባበ ማርያም",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6d/TedbabeMariyam_Church.jpg",
    gallery: [
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Thesaurus_of_T%C3%A4dbab%C3%A4_Maryam.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Shields_gifted_to_T%C3%A4dbab%C3%A4_Maryam.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/Throne_of_King_Dawit_%28Unknown_King_David%29.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/56/Traditionally_crafted_umbrella_of_T%C3%A4dbab%C3%A4_Maryam.jpg",
    ],
    location: "28 km from Ajibar, Ta Guba Kebele",
    coordinates: "11.114°N, 38.753°E",
    tag: "UNESCO Heritage Candidate",
    tagColor: "bg-amber-100 text-amber-800",
    tagGradient: "from-amber-500 to-yellow-600",
    description: "Among the first four temples in Ethiopia where sacrificial offerings were implemented before the birth of Jesus Christ. The name combines two Ge'ez words: 'Tadbaba' meaning Tabernacle and 'Maryam/Tsion' meaning Zion — 'The Tabernacle of Zion'. According to the chronicle, the Ark arrived in 982 BCE, coinciding with the disappearance of the Ark of the Covenant during the reign of King Solomon (970-931 BCE). The current spectacular circular church was built by Emperor Gelawdewos after his victory at the Battle of Wayna Daga in 1543, where he personally cut off the head of Imam Ahmad ibn Ibrahim al-Ghazi.",
    longDescription: "The church is a circular complex with four magnificent doors (over 3m height) and 32 windows (over 2m height). By design, it is arranged in concentric circles with three sections — the innermost being the Holy of Holies (Qeddus Qeddusan), approximately 24 meters in diameter. The high priests are always selected from tribes of the priestly class, believed to be descendants of Jews. Deacons, only under the age of 9, are allowed to deliver service. Most relics and utilities are made of pure gold, including the incense burner. A rope is tied to the high priest when entering the Holy of Holies to enable assistants to safely pull the body out in the event of mishap.",
    highlights: ["Ark arrived ~982 BCE during King Solomon's era", "Circular church built by Emperor Gelawdewos (1543)", "Battle of Wayna Daga — defeated Ahmad al-Ghazi", "Treasures dating back to Old Testament times", "Pure gold relics, Aramaic & Ge'ez manuscripts", "Holy of Holies — 24m diameter inner sanctum", "Shield of King Kaleb, Cross of St. John the Baptist"],
    stats: [
      { label: "Founded", value: "~982 BCE", icon: Clock },
      { label: "Battle", value: "1543", icon: Shield },
      { label: "Treasures", value: "50+", icon: Crown },
      { label: "Diameter", value: "24m", icon: Compass },
    ],
    featured: true,
  },
  {
    title: "Mount Tabor (Tabor Terara)",
    subtitle: "Highest Peak in South Wollo — 4,247m",
    img: "https://sfile.chatglm.cn/images-ppt/4781a70c681c.jpg",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/4781a70c681c.jpg",
      "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg",
    ],
    location: "Border with Legambo, ~170 km East of Dessie",
    coordinates: "11.0°N, 39.0°E",
    tag: "Natural Landmark",
    tagColor: "bg-blue-100 text-blue-800",
    tagGradient: "from-blue-500 to-indigo-600",
    description: "The highest point in the entire South Wollo Zone at 4,247 meters (13,934 ft), Mount Tabor is one of the most iconic mountains in Amhara Sayint Woreda. It hosts different types of wildlife not found in other parts of Ethiopia, including endemic highland species adapted to the Afro-alpine environment. The mountain holds profound historical and spiritual significance in local Amhara culture, serving as a visible landmark from much of the surrounding region. Its dramatic peaks and valleys create breathtaking landscapes that attract nature enthusiasts, hikers, and researchers from across Ethiopia and beyond.",
    longDescription: "Mount Tabor's Afro-alpine ecosystem supports unique biodiversity including giant lobelia, Erica shrubs, and endemic grasses found nowhere else on Earth. The mountain serves as a watershed for multiple rivers that feed into the Blue Nile basin. Local communities hold annual ceremonies on its slopes, and it features prominently in Amhara oral traditions and spiritual practices. The panoramic views from the summit extend over 100 kilometers in all directions on clear days, encompassing the Blue Nile gorge, the South Wollo highlands, and the dramatic escarpments of the Ethiopian Rift Valley.",
    highlights: ["Highest peak in South Wollo Zone (4,247m)", "Endemic Afro-alpine wildlife & flora", "Watershed for Blue Nile basin rivers", "Panoramic 100km+ views from summit", "Annual spiritual ceremonies on slopes", "Prominent in Amhara oral traditions"],
    stats: [
      { label: "Elevation", value: "4,247m", icon: Mountain },
      { label: "Visibility", value: "100+ km", icon: Eye },
      { label: "Ecosystem", value: "Alpine", icon: TreePine },
      { label: "Species", value: "50+", icon: Sprout },
    ],
    featured: false,
  },
  {
    title: "Borena Sayint National Park",
    subtitle: "Where Culture Meets Wild Nature",
    img: "https://sfile.chatglm.cn/images-ppt/30fee1e622be.jpg",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/30fee1e622be.jpg",
      "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg",
    ],
    location: "Blue Nile (Abay) Canyon",
    coordinates: "11.2°N, 38.5°E",
    tag: "Nature & Culture",
    tagColor: "bg-emerald-100 text-emerald-800",
    tagGradient: "from-emerald-500 to-teal-600",
    description: "A stunning park offering a perfect mix of culture and nature. Beyond its diverse wildlife and dramatic, rugged cliffs plunging toward the Blue Nile (Abay) canyon, the park is famous for the traditional apiculture (beekeeping) practiced by the surrounding communities, providing deep insight into the region's ancient agricultural lifestyle. The canyon views from the cliff edges are among the most spectacular in all of Ethiopia.",
    longDescription: "The park's dramatic cliffs provide nesting sites for endangered birds of prey including Lammergeier (Bearded Vulture) and Ethiopian Wolf. The intersection of highland and lowland ecosystems creates extraordinary biodiversity. Traditional beekeeping communities maintain centuries-old apiculture practices, producing some of Ethiopia's finest honey. The park serves as a living museum of Ethiopian highland ecology and traditional resource management.",
    highlights: ["Dramatic cliffs plunging to the Abay canyon", "Traditional apiculture (beekeeping) communities", "Endangered Lammergeier & Ethiopian Wolf habitat", "Unique highland-lowland ecosystem intersection", "Centuries-old honey production traditions"],
    stats: [
      { label: "Area", value: "Large", icon: Map },
      { label: "Wildlife", value: "100+ sp", icon: UsersRound },
      { label: "Elevation", value: "500-3000m", icon: TrendingUp },
      { label: "Cliffs", value: "Dramatic", icon: Mountain },
    ],
    featured: false,
  },
  {
    title: "The Abay (Blue Nile) Canyon",
    subtitle: "Ethiopia's Grand Canyon — 2,500m Drop",
    img: "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg",
    gallery: [
      "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg",
      "https://sfile.chatglm.cn/images-ppt/30fee1e622be.jpg",
    ],
    location: "Western Boundary of the Woreda",
    coordinates: "11.0°N, 38.3°E",
    tag: "Natural Wonder",
    tagColor: "bg-violet-100 text-violet-800",
    tagGradient: "from-violet-500 to-purple-600",
    description: "The western boundary of Amhara Sayint is defined by the spectacular canyon of the Abay (Blue Nile) River. The elevation drops from over 3,000m highland plateaus down to just 500 metres at the canyon floor, creating one of the most dramatic elevation gradients in Ethiopia. The historic Daga ford provides an ancient crossing point connecting the woreda to Enbise Sar Midir in the Gojjam region, used for centuries by traders and travelers.",
    longDescription: "The Abay Canyon in this region rivals the Grand Canyon in scale and beauty. The 2,500-meter elevation change creates multiple climate zones within a few kilometers, supporting diverse ecosystems from cloud forest to semi-arid savanna. The canyon has been a natural barrier and highway for millennia — shaping trade routes, military campaigns, and cultural exchange between the Gojjam and Wollo regions. The Daga ford crossing remains one of the few practical routes across the Blue Nile in this stretch.",
    highlights: ["Spectacular 2,500m elevation drop", "From 3,000m plateaus to 500m canyon floor", "Historic Daga ford — ancient crossing point", "Multiple climate zones within few kilometers", "Connects Gojjam and Wollo since antiquity"],
    stats: [
      { label: "Drop", value: "2,500m", icon: ArrowDown },
      { label: "Top", value: "3,000m", icon: Mountain },
      { label: "Floor", value: "500m", icon: Map },
      { label: "Crossing", value: "Daga", icon: Compass },
    ],
    featured: false,
  },
];

function CulturalPlacesSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const featured = CULTURAL_PLACES.find(p => p.featured);
  const others = CULTURAL_PLACES.filter(p => !p.featured);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white via-gray-50/50 to-gray-50 relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200/50 rounded-full px-5 py-2 mb-4">
              <Landmark className="w-4 h-4 text-amber-600" />
              <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.15em]">Heritage & Treasures</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0B3D2E] mb-3">Cultural & Natural <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600">Heritage</span></h2>
            <p className="text-[#0B3D2E]/50 max-w-2xl mx-auto text-sm leading-relaxed">Ancient monasteries dating to King Solomon's era, dramatic canyons, and towering peaks — discover the extraordinary treasures of Amhara Sayint Woreda.</p>
          </div>
        </AnimatedSection>

        {/* Featured: Tadbaba Maryam — Full Width Hero Card */}
        {featured && (
          <AnimatedSection delay={100}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-amber-200/30 mb-8 group cursor-pointer" onClick={() => setExpandedCard(expandedCard === featured.title ? null : featured.title)}>
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
                  <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="eager" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1"><Crown className="w-3 h-3" /> Featured Heritage</span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full">{featured.tag}</span>
                  </div>
                  {/* Coordinates badge */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white/80 text-[10px] px-3 py-1.5 rounded-full">
                    <Compass className="w-3 h-3" />{featured.coordinates}
                  </div>
                </div>
                <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-white to-amber-50/30">
                  <div className="text-amber-600 text-xs font-bold uppercase tracking-[0.15em] mb-2">{featured.subtitle}</div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#0B3D2E] mb-3 leading-tight">{featured.title}</h3>
                  <p className="text-[#0B3D2E]/60 leading-relaxed mb-4 text-sm">{featured.description}</p>

                  {/* Stats row */}
                  {featured.stats && (
                    <div className="grid grid-cols-4 gap-2 mb-5">
                      {featured.stats.map((st) => (
                        <div key={st.label} className="bg-white/80 rounded-xl p-2.5 text-center border border-amber-100/50">
                          <st.icon className="w-4 h-4 mx-auto mb-1 text-amber-500" />
                          <div className="text-sm font-black text-[#0B3D2E]">{st.value}</div>
                          <div className="text-[9px] text-[#0B3D2E]/40 font-medium">{st.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Gallery thumbnails */}
                  {featured.gallery && featured.gallery.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {featured.gallery.slice(0, 4).map((g, gi) => (
                          <div key={gi} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-md">
                            <img src={g} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-amber-600 font-bold">{featured.gallery.length} photos</span>
                    </div>
                  )}

                  {/* Expand button */}
                  <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors">
                    {expandedCard === featured.title ? "Show Less" : "Read Full History"} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedCard === featured.title ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>
              {/* Expanded content */}
              {expandedCard === featured.title && featured.longDescription && (
                <div className="px-6 md:px-8 lg:px-10 pb-6 md:pb-8">
                  <div className="bg-white/80 rounded-2xl p-5 md:p-6 border border-amber-100/50">
                    <h4 className="font-bold text-[#0B3D2E] mb-3 flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber-500" /> Architecture & Religious Significance</h4>
                    <p className="text-[#0B3D2E]/60 text-sm leading-relaxed mb-4">{featured.longDescription}</p>
                    {/* Gallery grid */}
                    {featured.gallery && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {featured.gallery.map((g, gi) => (
                          <div key={gi} className="relative rounded-xl overflow-hidden aspect-square group/img">
                            <img src={g} alt={`Tadbaba Maryam treasure ${gi + 1}`} className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" loading="lazy" />
                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors flex items-end p-2">
                              <span className="text-white text-[10px] font-bold opacity-0 group-hover/img:opacity-100 transition-opacity">Treasure {gi + 1}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        )}

        {/* Other heritage sites — 3-column grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((place, i) => (
            <AnimatedSection key={place.title} delay={(i + 2) * 80}>
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group h-full flex flex-col" onClick={() => setExpandedCard(expandedCard === place.title ? null : place.title)}>
                <div className="h-48 relative overflow-hidden">
                  <img src={place.img} alt={place.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${place.tagColor}`}>{place.tag}</span>
                    </div>
                    <span className="text-[10px] font-medium text-white/80 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1"><MapPin className="w-3 h-3" />{place.location.split(",")[0]}</span>
                  </div>
                  {/* Stats overlay */}
                  {place.stats && (
                    <div className="absolute top-3 right-3 flex gap-1.5">
                      {place.stats.slice(0, 2).map((st) => (
                        <span key={st.label} className="bg-black/40 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1"><st.icon className="w-3 h-3" />{st.value}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <div className="text-[#0B3D2E]/40 text-[10px] font-bold uppercase tracking-wider mb-1">{place.subtitle}</div>
                  <h3 className="text-base md:text-lg font-extrabold text-[#0B3D2E] mb-2 group-hover:text-[#EAB308] transition-colors">{place.title}</h3>
                  <p className="text-[#0B3D2E]/60 leading-relaxed mb-3 text-xs line-clamp-3 flex-1">{place.description}</p>

                  {/* Highlights as compact pills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {place.highlights.slice(0, 3).map((h) => (
                      <span key={h} className="flex items-center gap-1 text-[10px] bg-gray-50 text-[#0B3D2E]/50 px-2 py-1 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-[#EAB308]" />{h.length > 35 ? h.substring(0, 35) + "..." : h}
                      </span>
                    ))}
                  </div>

                  {/* Gallery thumbnails */}
                  {place.gallery && place.gallery.length > 0 && (
                    <div className="flex items-center gap-2 mt-auto">
                      <div className="flex -space-x-1.5">
                        {place.gallery.slice(0, 2).map((g, gi) => (
                          <div key={gi} className="w-7 h-7 rounded-md overflow-hidden border-2 border-white shadow-sm">
                            <img src={g} alt="" className="w-full h-full object-cover" loading="lazy" />
                          </div>
                        ))}
                      </div>
                      <span className="text-[10px] text-[#0B3D2E]/30 font-medium">{place.gallery.length} photos</span>
                      <ChevronDown className={`w-3.5 h-3.5 ml-auto text-[#0B3D2E]/20 transition-transform ${expandedCard === place.title ? "rotate-180" : ""}`} />
                    </div>
                  )}
                </div>
                {/* Expanded content */}
                {expandedCard === place.title && place.longDescription && (
                  <div className="px-5 pb-5">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <p className="text-[#0B3D2E]/60 text-xs leading-relaxed">{place.longDescription}</p>
                      {place.gallery && place.gallery.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {place.gallery.map((g, gi) => (
                            <div key={gi} className="rounded-lg overflow-hidden aspect-video">
                              <img src={g} alt="" className="w-full h-full object-cover" loading="lazy" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Explore more */}
        <AnimatedSection delay={400}>
          <div className="text-center mt-10">
            <button onClick={() => onNavigate("about-history")}
              className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-[#0B3D2E] to-[#145A44] hover:from-[#145A44] hover:to-[#0B3D2E] text-white font-bold px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm">
              Explore Full History <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── GEOGRAPHIC MAP SECTION (Home) ──────────────────────── */
function GeoMapSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [activeTab, setActiveTab] = useState<"map" | "info">("map");
  const borderItems = [
    { dir: "South", name: "Debre Sina & Mehal Sayint" },
    { dir: "West", name: "East Gojjam (Blue Nile)" },
    { dir: "NW", name: "South Gondar (Bashilo R.)" },
    { dir: "North", name: "Magdala" },
    { dir: "East", name: "Tenta" },
    { dir: "SE", name: "Legambo (Mt. Tabor)" },
  ];
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3D2E] mb-2">Explore <span className="text-[#EAB308]">Our Woreda</span></h2>
            <p className="text-[#0B3D2E]/60 max-w-2xl mx-auto text-sm">Located in the heart of South Wollo Zone, bordered by the Blue Nile and home to Mount Tabor.</p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Map */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-100 group">
              <iframe
                title="Amhara Sayint Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=38.3%2C10.6%2C39.0%2C11.2&layer=mapnik&marker=10.92%2C38.65"
                className="w-full h-[300px] md:h-[380px] border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </div>
            {/* Info Panel */}
            <div className="lg:col-span-2 space-y-4">
              {/* Quick Facts */}
              <div className="bg-gradient-to-br from-[#0B3D2E] to-[#145A44] rounded-2xl p-6 text-white shadow-xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#EAB308]" /> Quick Facts</h3>
                <div className="space-y-2.5 text-sm">
                  {[
                    ["Coordinates", "10.92° N, 38.65° E"],
                    ["Elevation", "500m — 4,247m (Mt. Tabor)"],
                    ["Major Town", "Ajibar"],
                    ["Area", "1,437.30 km²"],
                    ["Zone", "South Wollo, Amhara"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-white/10 last:border-0">
                      <span className="text-white/60">{label}</span>
                      <span className="font-semibold text-[#EAB308]">{value}</span>
                    </div>
                  ))}
                </div>
                <a href="https://www.google.com/maps?q=10.92,38.65" target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all">
                  <ExternalLink className="w-4 h-4" /> Open in Google Maps
                </a>
              </div>
              {/* Borders */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-[#0B3D2E] mb-3 flex items-center gap-2"><Compass className="w-5 h-5 text-[#EAB308]" /> Neighboring Districts</h3>
                <div className="grid grid-cols-2 gap-2">
                  {borderItems.map((b) => (
                    <div key={b.dir} className="flex items-center gap-2 text-sm">
                      <span className="w-8 h-8 rounded-lg bg-[#0B3D2E] text-white text-[10px] font-bold flex items-center justify-center shrink-0">{b.dir}</span>
                      <span className="text-[#0B3D2E]/70 text-xs leading-tight">{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* CTA */}
              <button onClick={() => onNavigate("about-location")}
                className="w-full flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all">
                View Full Location Details <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── SERVICES OVERVIEW (Home) ─────────────────────────────── */
const SERVICE_CARDS = [
  { title: "Education", desc: "106 schools, 3 preparatory schools, and a TVET college providing quality education.", icon: GraduationCap, href: "svc-education" as PageId, color: "from-blue-500 to-indigo-600", img: "https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg" },
  { title: "Health", desc: "1 hospital and 7 health centers delivering comprehensive primary healthcare.", icon: HeartPulse, href: "svc-health" as PageId, color: "from-rose-500 to-pink-600", img: "https://sfile.chatglm.cn/images-ppt/40afb43a5118.jpg" },
  { title: "Agriculture", desc: "Supporting farming households with modern techniques across 1,437 km².", icon: Tractor, href: "svc-agriculture" as PageId, color: "from-green-500 to-emerald-600", img: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg" },
  { title: "Trade", desc: "Promoting enterprises, market linkages, and cooperative development.", icon: Store, href: "svc-trade" as PageId, color: "from-purple-500 to-violet-600", img: "https://sfile.chatglm.cn/images-ppt/b4f869ff3165.jpg" },
  { title: "Technology", desc: "Digital transformation, ICT training, and e-government services.", icon: Monitor, href: "svc-technology" as PageId, color: "from-cyan-500 to-teal-600", img: "https://sfile.chatglm.cn/images-ppt/31a73cdbeed8.jpg" },
  { title: "Construction", desc: "Roads, public buildings, and community facilities development.", icon: HardHat, href: "svc-construction" as PageId, color: "from-orange-500 to-amber-600", img: "https://sfile.chatglm.cn/images-ppt/ebc225438557.png" },
  { title: "Transport", desc: "Road networks and connectivity linking all 37 kebeles together.", icon: Truck, href: "svc-transport" as PageId, color: "from-sky-500 to-blue-600", img: "https://sfile.chatglm.cn/images-ppt/dd28c7e11c64.jpg" },
  { title: "Water", desc: "Clean water points and sanitation programs for communities.", icon: Droplets, href: "svc-water" as PageId, color: "from-blue-400 to-cyan-500", img: "https://sfile.chatglm.cn/images-ppt/279feef8509d.jpg" },
  { title: "Justice", desc: "Community policing, courts, and dispute resolution services.", icon: Scale, href: "svc-justice" as PageId, color: "from-slate-600 to-gray-700", img: "https://sfile.chatglm.cn/images-ppt/7f3715eb8025.jpg" },
  { title: "Finance", desc: "Revenue collection, budget management, and financial administration.", icon: Banknote, href: "svc-finance" as PageId, color: "from-emerald-500 to-green-600", img: "https://sfile.chatglm.cn/images-ppt/9c67be723339.jpg" },
];

function ServicesOverview({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section id="services-section" className="py-10 md:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection><div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3D2E] mb-2">Our <span className="text-[#EAB308]">Services</span></h2>
          <p className="text-[#0B3D2E]/60 max-w-2xl mx-auto text-sm">Comprehensive public services designed to improve the lives of every citizen</p>
        </div></AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SERVICE_CARDS.map((svc, i) => (
            <AnimatedSection key={svc.title} delay={i * 60}>
              <button onClick={() => onNavigate(svc.href)} className="w-full group text-left">
                <Card className="bg-white border border-gray-100 hover:border-[#EAB308]/30 hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                  <div className="h-28 relative overflow-hidden">
                    <img src={svc.img} alt={svc.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center shadow-lg`}><svc.icon className="w-5 h-5 text-white" /></div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-[#0B3D2E] text-sm mb-1 group-hover:text-[#EAB308] transition-colors">{svc.title}</h3>
                    <p className="text-[#0B3D2E]/60 text-xs leading-relaxed line-clamp-2">{svc.desc}</p>
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

/* ─── SUB PAGE LAYOUT ─────────────────────────────────────── */
function SubPage({ onNavigate, title, breadcrumb, badge, badgeColor, children }: { onNavigate: (p: PageId) => void; title: string; breadcrumb: string; badge: string; badgeColor?: string; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarItems: { label: string; href: PageId }[] = [];
  if (breadcrumb.startsWith("About")) sidebarItems.push({ label: "History", href: "about-history" }, { label: "Overview", href: "about-overview" }, { label: "Location", href: "about-location" });
  if (breadcrumb.startsWith("Government")) sidebarItems.push({ label: "Leadership", href: "gov-leadership" }, { label: "Structure", href: "gov-structure" }, { label: "Offices", href: "gov-offices" });
  if (breadcrumb.startsWith("Services")) sidebarItems.push({ label: "Education", href: "svc-education" }, { label: "Health", href: "svc-health" }, { label: "Agriculture", href: "svc-agriculture" }, { label: "Trade", href: "svc-trade" }, { label: "Technology", href: "svc-technology" }, { label: "Construction", href: "svc-construction" }, { label: "Transport", href: "svc-transport" }, { label: "Water", href: "svc-water" }, { label: "Justice", href: "svc-justice" }, { label: "Finance", href: "svc-finance" });

  return (
    <div className="min-h-screen pt-[92px] md:pt-[110px]">
      <div className="bg-gradient-to-r from-[#0B3D2E] via-[#145A44] to-[#0B3D2E] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/50 text-sm mb-2">Home / {breadcrumb}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{title}</h1>
          <Badge className={`${badgeColor || "bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/30"} text-sm font-medium`}>{badge}</Badge>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">{children}</div>
        <div className="w-full lg:w-72 shrink-0">
          <div className="lg:hidden mb-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-2 text-sm font-semibold text-[#0B3D2E] bg-white border border-gray-200 px-4 py-2.5 rounded-lg shadow-sm">
              {sidebarOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />} Navigation
            </button>
          </div>
          {(sidebarOpen || typeof window !== "undefined") && (
            <Card className="border-0 shadow-md lg:sticky lg:top-28 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-[#0B3D2E] px-5 py-4"><h3 className="text-white font-bold text-sm flex items-center gap-2"><Layers className="w-4 h-4 text-[#EAB308]" />Quick Navigation</h3></div>
                <nav className="p-3 flex flex-col gap-0.5">
                  {sidebarItems.map((item) => (
                    <button key={item.href} onClick={() => onNavigate(item.href)}
                      className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${title.toLowerCase().includes(item.label.toLowerCase()) ? "bg-[#0B3D2E] text-white shadow-sm" : "text-[#0B3D2E]/60 hover:bg-[#0B3D2E]/5 hover:text-[#0B3D2E]"}`}>
                      {item.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <AnimatedSection delay={delay}>
      <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6 md:p-8">{children}</CardContent>
      </Card>
    </AnimatedSection>
  );
}

/* ─── ABOUT: History ─────────────────────────────────────── */
function AboutHistoryPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const timeline = [
    { era: "Medieval Period (Pre-1900)", year: "Before 1900", desc: "The area that is now Amhara Sayint was part of the medieval Amhara kingdom, strategically positioned along ancient trade routes connecting the northern highlands to the Shewa region. The woreda gained renown for its exceptional horse breeding, supplying cavalry mounts to regional lords and serving as a vital waypoint for merchants transporting salt, gold, and textiles. Ancient rock-hewn churches and archaeological sites bear testimony to a civilization that dates back centuries, with local oral traditions preserving epic tales of warriors and saints." },
    { era: "Imperial Era (1900-1935)", year: "1900 - 1935", desc: "During the reign of Emperor Menelik II and later Emperor Haile Selassie I, Amhara Sayint was formally established as an administrative district within the Wollo province. The imperial government constructed the first formal government offices, introduced modern tax collection systems, and established the first primary school. The town grew into a modest administrative center, attracting merchants, artisans, and civil servants. Ethiopian Orthodox Tewahedo Church influence deepened during this period." },
    { era: "Italian Occupation (1935-1941)", year: "1935 - 1941", desc: "The five-year Italian occupation brought profound disruption. However, the people earned a distinguished reputation for fierce resistance against the fascist invaders. Local guerrilla fighters (Arbegnoch) operated from the rugged highland terrain, ambushing Italian patrols and maintaining communication with the broader Ethiopian resistance movement. Several local resistance leaders became celebrated figures, commemorated annually during patriotic celebrations." },
    { era: "Post-Liberation (1941-1974)", year: "1941 - 1974", desc: "Following liberation, Amhara Sayint experienced significant modernization. The imperial government expanded educational facilities, established agricultural extension services, and improved road connections to Dessie and other major towns. The woreda participated in Ethiopia's first limited parliamentary elections, sending representatives to the national assembly. The community's horse breeding traditions received official recognition, with annual horse fairs attracting traders from across the Amhara Region." },
    { era: "Derg Era (1974-1991)", year: "1974 - 1991", desc: "The 1974 Revolution brought radical transformation. Sweeping land reform abolished the feudal landholding system, redistributing land to tenant farmers and establishing producer cooperatives. The woreda suffered during the devastating 1984-85 famine, with loss of life and mass displacement. Civil conflict in the late 1980s further challenged the community. Despite hardships, community institutions like the Idir and traditional mutual support networks played crucial roles in survival." },
    { era: "Federal Era (1991-Present)", year: "1991 - Present", desc: "The establishment of the Federal Democratic Republic marked a new chapter. The woreda was reorganized under South Wollo Zone with an elected Woreda Council and Executive Committee. School enrollment increased from under 20% to over 85% at primary level, health facilities expanded from a single clinic to 23 institutions, and road connectivity reached 14 of 22 kebeles. The 2026/27 fiscal year budget reached ETB 85 million. Despite ongoing challenges, Amhara Sayint continues toward its vision of a prosperous, equitable, and self-reliant community." },
  ];
  return (
    <SubPage onNavigate={onNavigate} title="History & Background" breadcrumb="About / History" badge="About the Woreda">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><BookOpen className="w-6 h-6 text-[#EAB308]" /> Origins of Amhara Sayint</h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">Amhara Sayint (also known as Sayint) is one of the most historic woredas in the South Wollo Zone of the Amhara Region, Ethiopia. The name &ldquo;Sayint&rdquo; carries deep historical significance, referring to a place of gathering, administration, and strategic importance. Nestled in the rugged highlands of northern Ethiopia, the woreda has been a crossroads of civilizations for centuries.</p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">From its origins as a medieval settlement renowned for horse breeding, through the trials of foreign occupation and revolutionary upheaval, to its current position as a developing administrative district, the woreda has demonstrated remarkable resilience and an enduring commitment to community and progress.</p>
        </ContentCard>
        <ContentCard delay={100}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-6 flex items-center gap-2"><Clock className="w-6 h-6 text-[#EAB308]" /> Historical Timeline</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0B3D2E] via-[#EAB308] to-[#0B3D2E]"></div>
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.era} className="relative pl-12 md:pl-16">
                  <div className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#EAB308] border-4 border-[#F0FDF4] shadow-md z-10"></div>
                  <div className="bg-[#F0FDF4] rounded-xl p-5 border border-[#0B3D2E]/5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                      <span className="text-xs font-bold text-[#EAB308] bg-[#EAB308]/10 px-3 py-1 rounded-full w-fit">{item.year}</span>
                      <h3 className="font-bold text-[#0B3D2E] text-sm md:text-base">{item.era}</h3>
                    </div>
                    <p className="text-[#0B3D2E]/65 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentCard>
        <ContentCard delay={200}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Landmark className="w-6 h-6 text-[#EAB308]" /> Cultural Heritage</h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">The woreda is home to a rich cultural heritage reflecting the deep traditions of the Amhara people. Ethiopian Orthodox Tewahedo Christianity forms the spiritual foundation, with ancient churches serving as centers of worship, education, and communal gathering. The annual Meskel and Demera celebrations are major cultural events bringing together thousands of residents. Timkat (Epiphany) features the Tabot carried in procession to nearby water bodies.</p>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">Local crafts including pottery, weaving (netela and gabi), and blacksmithing continue through generations. Customary dispute resolution by respected elders (Shimagile), communal labor traditions (Debo), and the Idir burial society remain vital social safety nets. Traditional musical instruments like masinko, krar, and washint accompany stories of love, heroism, and faith.</p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">The woreda's cuisine includes injera from locally grown teff, doro wot, and traditional dishes during holidays. Coffee ceremonies are central to community gatherings, conflict resolution, and welcoming guests. The famous horse breeding tradition continues with annual fairs attracting visitors from across the region.</p>
        </ContentCard>
        <ContentCard delay={300}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Flag className="w-6 h-6 text-[#EAB308]" /> Resistance & Patriotism</h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">Amhara Sayint holds a special place in Ethiopia's history of resistance. During the Italian occupation of 1935-1941, the woreda's rugged terrain provided ideal conditions for guerrilla warfare. Local Patriots organized effective resistance cells that harassed Italian garrisons and sabotaged supply lines. Several local leaders emerged as heroic figures, commemorated annually on Patriots' Victory Day, March 12th.</p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">Monuments and memorial sites have been established, and oral history traditions ensure stories of courage are transmitted to younger generations. The woreda's contributions to Ethiopia's struggle for freedom remain a source of immense community pride.</p>
        </ContentCard>
        <ContentCard delay={400}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><TrendingUp className="w-6 h-6 text-[#EAB308]" /> Modern Development</h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">Since 1991, Amhara Sayint has embarked on ambitious development. Elected kebele councils, women's associations, youth groups, and farmer cooperatives now play active roles in identifying priorities. Key milestones include: school enrollment from under 20% to over 85%, health facilities expanded to 8 including 1 hospital, 64 clean water points, and 85 km of all-weather roads. The annual budget has grown significantly, reaching ETB 85 million for 2026/27.</p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">Despite challenges including climate variability, youth unemployment, and limited infrastructure, Amhara Sayint continues steady progress toward a prosperous, equitable, and self-reliant community.</p>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── ABOUT: Overview ────────────────────────────────────── */
function AboutOverviewPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Overview" breadcrumb="About / Overview" badge="General Information">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Globe className="w-6 h-6 text-[#EAB308]" /> About Amhara Sayint Woreda</h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">Amhara Sayint Woreda is an administrative district in the South Wollo Zone of the Amhara Regional State, Ethiopia. Covering approximately 1,437 square kilometers, it is home to an estimated 214,056 people across 37 kebeles. The administration is headquartered in the town of Ajibar. The woreda is bordered by the dramatic Blue Nile canyon to the west and features majestic highland peaks such as Mount Tabor (4,247m).</p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">The woreda operates under Ethiopia's federal governance structure, with administrative layers including the woreda council, executive committee, and kebele-level administrations responsible for delivering public services and managing development programs.</p>
        </ContentCard>
        <div className="grid md:grid-cols-2 gap-6">
          <ContentCard delay={100}>
            <h3 className="font-bold text-[#0B3D2E] mb-3">Key Facts</h3>
            <ul className="space-y-2 text-sm text-[#0B3D2E]/70">
              {[["Zone: South Wollo", "#EAB308"], ["Region: Amhara Regional State", "#EAB308"], ["Population: ~214,056", "#EAB308"], ["Area: ~1,245 km\u00B2", "#EAB308"], ["Kebeles: 22", "#EAB308"], ["Elevation: 1,500 - 3,200m", "#EAB308"], ["Capital Town: Amhara Sayint", "#EAB308"], ["Language: Amharic", "#EAB308"]].map(([t, c]) => (
                <li key={t} className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: c }} />{t}</li>
              ))}
            </ul>
          </ContentCard>
          <ContentCard delay={150}>
            <h3 className="font-bold text-[#0B3D2E] mb-3">Economy</h3>
            <ul className="space-y-2 text-sm text-[#0B3D2E]/70">
              {[["Primary: Agriculture (75%+)", "#10B981"], ["Crops: Teff, Barley, Wheat, Sorghum", "#10B981"], ["Livestock: Cattle, Sheep, Goats", "#10B981"], ["Growing: Small enterprises & trade", "#10B981"], ["Cooperatives: 120+ registered", "#10B981"], ["Annual Budget: ETB 85 Million", "#10B981"]].map(([t, c]) => (
                <li key={t} className="flex items-start gap-2"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: c }} />{t}</li>
              ))}
            </ul>
          </ContentCard>
        </div>
        <ContentCard delay={200}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Target className="w-6 h-6 text-[#EAB308]" /> Vision & Mission</h2>
          <div className="space-y-4">
            <div className="bg-[#F0FDF4] rounded-xl p-5 border border-[#0B3D2E]/5">
              <h3 className="font-bold text-[#0B3D2E] mb-2">Vision</h3>
              <p className="text-[#0B3D2E]/70 text-sm leading-relaxed">To see Amhara Sayint become a prosperous, equitable, and self-reliant woreda where all citizens enjoy improved livelihoods, quality education, accessible healthcare, and sustainable development within a democratic and transparent governance framework.</p>
            </div>
            <div className="bg-[#EAB308]/5 rounded-xl p-5 border border-[#EAB308]/10">
              <h3 className="font-bold text-[#0B3D2E] mb-2">Mission</h3>
              <p className="text-[#0B3D2E]/70 text-sm leading-relaxed">To deliver efficient, transparent, and accountable public services; promote sustainable agricultural and economic development; ensure equitable access to education, health, and clean water; and empower communities to participate actively in their own development through decentralized governance.</p>
            </div>
          </div>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── ABOUT: Location ────────────────────────────────────── */
function AboutLocationPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Location & Geography" breadcrumb="About / Location" badge="Geographic Profile">
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Interactive Map */}
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><MapPin className="w-6 h-6 text-[#EAB308]" /> Location on the Map</h2>
          <div className="rounded-xl overflow-hidden border-2 border-gray-200 shadow-md mb-4">
            <iframe
              title="Amhara Sayint Location Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.4%2C10.7%2C38.9%2C11.15&layer=mapnik&marker=10.92%2C38.65"
              className="w-full h-[400px] md:h-[500px] border-0"
              loading="lazy"
            />
          </div>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="https://www.google.com/maps?q=10.92,38.65" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 font-medium transition-colors border border-blue-200">
              <ExternalLink className="w-4 h-4" /> Open in Google Maps
            </a>
            <a href="https://www.openstreetmap.org/#map=12/10.92/38.65" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 font-medium transition-colors border border-green-200">
              <ExternalLink className="w-4 h-4" /> View Larger on OpenStreetMap
            </a>
          </div>
        </ContentCard>

        {/* Coordinates & Key Data */}
        <div className="grid md:grid-cols-2 gap-6">
          <ContentCard delay={100}>
            <h3 className="font-bold text-[#0B3D2E] mb-3 flex items-center gap-2"><MapPin className="w-5 h-5 text-[#EAB308]" /> Coordinates</h3>
            <div className="space-y-3 text-sm text-[#0B3D2E]/70">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Latitude</span><span className="font-bold text-[#0B3D2E]">10.92° N</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Longitude</span><span className="font-bold text-[#0B3D2E]">38.65° E</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Elevation Range</span><span className="font-bold text-[#0B3D2E]">500m - 4,247m</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Town Altitude</span><span className="font-bold text-[#0B3D2E]">~2,443m (8,015 ft)</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Major Town</span><span className="font-bold text-[#EAB308]">Ajibar</span>
              </div>
            </div>
          </ContentCard>
          <ContentCard delay={150}>
            <h3 className="font-bold text-[#0B3D2E] mb-3 flex items-center gap-2"><Globe className="w-5 h-5 text-[#EAB308]" /> Administrative Region</h3>
            <div className="space-y-3 text-sm text-[#0B3D2E]/70">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Country</span><span className="font-bold text-[#0B3D2E]">Ethiopia</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Region</span><span className="font-bold text-[#0B3D2E]">Amhara Regional State</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Zone</span><span className="font-bold text-[#0B3D2E]">South Wollo</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span>Total Area</span><span className="font-bold text-[#0B3D2E]">1,437.30 km²</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span>Pop. Density</span><span className="font-bold text-[#0B3D2E]">100.86 / km²</span>
              </div>
            </div>
          </ContentCard>
        </div>

        {/* Borders */}
        <ContentCard delay={200}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Compass className="w-6 h-6 text-[#EAB308]" /> Borders & Neighboring Districts</h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">Sayint (Amharic: ሣይንት), also known as Amhara Sayint (Amharic: አማራ ሣይንት), is bordered by six neighboring districts and two major rivers that form natural boundaries:</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { dir: "South", neighbor: "Debre Sina & Mehal Sayint", note: "Mehal Sayint was created by separating from the historic Amhara Sayint woreda" },
              { dir: "West", neighbor: "East Gojjam Zone", note: "Separated by the Blue Nile (Abay) River" },
              { dir: "Northwest", neighbor: "South Gondar Zone", note: "Separated by the Bashilo River" },
              { dir: "North", neighbor: "Magdala", note: "Historic site of Emperor Tewodros II's final stronghold" },
              { dir: "East", neighbor: "Tenta", note: "Within South Wollo Zone" },
              { dir: "Southeast", neighbor: "Legambo", note: "Mount Tabor (4,247m) lies on this border — highest in South Wollo" },
            ].map((b) => (
              <div key={b.dir} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white bg-[#0B3D2E] px-2.5 py-0.5 rounded-full">{b.dir}</span>
                  <span className="font-semibold text-[#0B3D2E] text-sm">{b.neighbor}</span>
                </div>
                <p className="text-xs text-[#0B3D2E]/50 mt-1">{b.note}</p>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* Terrain & Geography */}
        <ContentCard delay={250}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><TreePine className="w-6 h-6 text-[#EAB308]" /> Terrain & Natural Features</h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">The altitude of this district ranges dramatically from 500 metres (1,600 ft) above sea level at the bottom of the canyon of the Abay (Blue Nile) to 4,247 metres (13,934 ft) at Mount Tabor — the highest point in the entire South Wollo Zone. This extreme elevation range creates diverse agro-ecological zones, from tropical lowland gorges to temperate highland plateaus and Afro-alpine peaks.</p>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">The Abay (Blue Nile) forms the western boundary and is crossable at the Daga ford, which connects this woreda with Enbise Sar Midir in Misraq Gojjam. The Bashilo River separates the woreda from the South Gondar Zone to the northwest. Seasonal rivers and streams feed into these major waterways, supporting both rain-fed and irrigated agriculture across the woreda.</p>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              { label: "Lowest Point", value: "500m", desc: "Abay River canyon floor", icon: Droplets, color: "bg-blue-50 text-blue-600" },
              { label: "Highest Point", value: "4,247m", desc: "Mount Tabor (South Wollo peak)", icon: TreePine, color: "bg-emerald-50 text-emerald-600" },
              { label: "Daga Ford", value: "Crossing", desc: "Abay River crossing to Gojjam", icon: Map, color: "bg-amber-50 text-amber-600" },
            ].map((f) => (
              <div key={f.label} className={`${f.color} rounded-xl p-4 text-center`}>
                <f.icon className="w-8 h-8 mx-auto mb-2 opacity-70" />
                <div className="text-lg font-extrabold">{f.value}</div>
                <div className="text-xs font-bold opacity-80">{f.label}</div>
                <p className="text-[10px] opacity-60 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* Historical Landmarks */}
        <ContentCard delay={300}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Landmark className="w-6 h-6 text-[#EAB308]" /> Notable Historical Landmarks</h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-amber-50 via-yellow-50/30 to-amber-50 rounded-2xl p-6 border border-amber-200/40 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-200/20 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg"><Crown className="w-7 h-7 text-white" /></div>
                  <div>
                    <h3 className="font-black text-[#0B3D2E] text-lg">Tadbaba Maryam Monastery</h3>
                    <p className="text-amber-700 text-xs font-bold">The Tabernacle of Zion — ተድባበ ማርያም | Coordinates: 11.114°N, 38.753°E</p>
                  </div>
                </div>
                <p className="text-[#0B3D2E]/70 text-sm leading-relaxed mb-4">Tadbaba Maryam was among the first four temples in Ethiopia where sacrificial offerings were implemented before the birth of Jesus Christ. The name combines two Ge'ez words: <strong>Tadbaba</strong> meaning Tabernacle and <strong>Maryam/Tsion</strong> meaning Zion — <em>"The Tabernacle of Zion."</em> According to the chronicle of Tadbaba Maryam, the Ark arrived in <strong>982 BCE</strong>, coinciding with the disappearance of the Ark of the Covenant during the reign of King Solomon (970-931 BCE). The current spectacular circular church was built by <strong>Emperor Gelawdewos</strong> after his victory at the <strong>Battle of Wayna Daga in 1543</strong>, where he personally cut off the head of Imam Ahmad ibn Ibrahim al-Ghazi — a decisive battle that halted the Adal Sultanate's expansion into the Ethiopian highlands.</p>
                <div className="grid sm:grid-cols-4 gap-2 mb-4">
                  {[{ l: "Founded", v: "~982 BCE" }, { l: "Church Built", v: "Post-1543" }, { l: "Architecture", v: "Circular" }, { l: "Holy of Holies", v: "24m diameter" }].map(d => (
                    <div key={d.l} className="bg-white/60 rounded-xl p-2.5 text-center border border-amber-100/50">
                      <div className="text-sm font-black text-amber-700">{d.v}</div>
                      <div className="text-[9px] text-[#0B3D2E]/40 font-medium">{d.l}</div>
                    </div>
                  ))}
                </div>
                <h4 className="font-bold text-[#0B3D2E] text-sm mb-2 flex items-center gap-2"><Shield className="w-4 h-4 text-amber-500" /> Sacred Treasures (Museum)</h4>
                <p className="text-[#0B3D2E]/70 text-sm leading-relaxed mb-3">Tadbaba Maryam possesses a huge collection of treasures, some dating back to Old Testament times, now displayed in a museum inside the church compound. The most notable relics include:</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {["Ancient cross in the form of a Sheep (Na'wa Bagu — Behold the Lamb)", "Shield of King Kaleb used in defeating rebellious factions in Yemen", "Hebrew Synodus and liturgy in Aramaic language", "Gospel decorated with pure gold", "Hand cross used by St. John the Baptist", "Throne of King Dawit (Unknown King David)"].map((t, ti) => (
                    <div key={ti} className="flex items-start gap-1.5 text-xs text-[#0B3D2E]/60"><CheckCircle2 className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />{t}</div>
                  ))}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["https://upload.wikimedia.org/wikipedia/commons/6/6d/TedbabeMariyam_Church.jpg", "https://upload.wikimedia.org/wikipedia/commons/6/61/Thesaurus_of_T%C3%A4dbab%C3%A4_Maryam.jpg", "https://upload.wikimedia.org/wikipedia/commons/f/f5/Shields_gifted_to_T%C3%A4dbab%C3%A4_Maryam.jpg", "https://upload.wikimedia.org/wikipedia/commons/e/e1/Throne_of_King_Dawit_%28Unknown_King_David%29.jpg"].map((img, ii) => (
                    <div key={ii} className="rounded-lg overflow-hidden aspect-square border-2 border-white shadow-md"><img src={img} alt={`Tadbaba Maryam ${ii + 1}`} className="w-full h-full object-cover" loading="lazy" /></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-[#EAB308]/5 rounded-xl p-5 border border-[#EAB308]/10">
              <h3 className="font-bold text-[#0B3D2E] mb-2">Mount Tabor</h3>
              <p className="text-[#0B3D2E]/70 text-sm leading-relaxed">Standing at 4,247 metres (13,934 ft), Mount Tabor is the highest peak in the South Wollo Zone, located on the border with Legambo. It is a prominent natural landmark visible from much of the woreda and surrounding areas, featuring Afro-alpine vegetation and unique highland biodiversity.</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-bold text-[#0B3D2E] mb-2">Abay (Blue Nile) Canyon</h3>
              <p className="text-[#0B3D2E]/70 text-sm leading-relaxed">The western boundary of Amhara Sayint is defined by the spectacular canyon of the Abay (Blue Nile) River. At just 500 metres above sea level, the canyon floor contrasts dramatically with the highland plateaus above, creating one of the most dramatic elevation gradients in Ethiopia. The historic Daga ford provides a crossing point connecting the woreda to the Gojjam region.</p>
            </div>
          </div>
        </ContentCard>

        {/* Demographics Summary */}
        <ContentCard delay={350}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Users className="w-6 h-6 text-[#EAB308]" /> Demographics (2007 Census)</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Total Population", value: "214,056", note: "71,979 men / 72,993 women" },
              { label: "Urban Population", value: "5,474 (3.78%)", note: "Concentrated in Ajibar town" },
              { label: "Households", value: "34,999", note: "Average 4.14 persons per household" },
              { label: "Housing Units", value: "33,604", note: "" },
              { label: "Ethnicity (Amhara)", value: "99.96%", note: "Predominantly Amhara" },
              { label: "Language (Amharic)", value: "99.97%", note: "Amharic as first language" },
              { label: "Religion (Orthodox)", value: "98%", note: "Ethiopian Orthodox Tewahedo" },
              { label: "Religion (Muslim)", value: "2%", note: "" },
            ].map((d) => (
              <div key={d.label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="text-right min-w-0 flex-1">
                  <div className="text-xs text-[#0B3D2E]/50 font-medium">{d.label}</div>
                  {d.note && <div className="text-[10px] text-[#0B3D2E]/40">{d.note}</div>}
                </div>
                <div className="font-bold text-[#0B3D2E] text-sm shrink-0">{d.value}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#0B3D2E]/40 mt-4 italic">Source: 2007 National Census, Central Statistical Agency of Ethiopia (CSA)</p>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── GOVERNMENT: Leadership (ORG CHART STYLE) ────────── */
function GovLeadershipPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const woredaLeader = {
    name: "Ato Dereje Getachew", title: "Woreda Administrator",
    phone: "+251 33 440 1001", email: "admin@amharasint.gov.et",
    avatar: "https://ui-avatars.com/api/?name=Dereje+Getachew&background=0B3D2E&color=fff&size=200&bold=true&font-size=0.35",
    desc: "Chief Administrator of Amhara Sayint Woreda, leading development initiatives and coordinating all government departments.",
    deptLabel: "Woreda Administration", deptColor: "#059669",
  };
  const deputyLeader = {
    name: "Ato Tadesse Abebe", title: "Deputy Administrator",
    phone: "+251 33 440 1002", email: "deputy@amharasint.gov.et",
    avatar: "https://ui-avatars.com/api/?name=Tadesse+Abebe&background=145A44&color=fff&size=200&bold=true&font-size=0.35",
    desc: "Oversees social services, education, and health sectors. Supports the Administrator in day-to-day governance.",
    deptLabel: "Woreda Administration", deptColor: "#059669",
  };
  const councilSpeaker = {
    name: "W/ro Almaz Tesfaye", title: "Woreda Council Speaker",
    phone: "+251 33 440 1003", email: "council@amharasint.gov.et",
    avatar: "https://ui-avatars.com/api/?name=Almaz+Tesfaye&background=0B3D2E&color=fff&size=200&bold=true&font-size=0.35",
    desc: "Presides over the Woreda Council, facilitating legislative sessions and ensuring accountability.",
    deptLabel: "Woreda Council", deptColor: "#6366F1",
  };

  const sectorHeads = [
    { name: "W/ro Tigist Mekonnen", title: "Head of Education Office", phone: "+251 33 440 1005", email: "education@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Tigist+Mekonnen&background=1D4ED8&color=fff&size=200&bold=true", icon: GraduationCap, deptLabel: "Education Bureau", deptColor: "#1D4ED8", desc: "Leads education reform, manages 106 schools, and improves learning quality across all kebeles.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintEducation", icon: "facebook" }, { platform: "Telegram", url: "https://t.me/AmharaSintEdu", icon: "telegram" }] },
    { name: "Ato Fikadu Hailu", title: "Head of Agriculture Office", phone: "+251 33 440 1007", email: "agriculture@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Fikadu+Hailu&background=16A34A&color=fff&size=200&bold=true", icon: Tractor, deptLabel: "Agriculture Bureau", deptColor: "#16A34A", desc: "Manages agricultural extension, food security programs, and natural resource conservation.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintAgriculture", icon: "facebook" }, { platform: "Telegram", url: "https://t.me/AmharaSintAgri", icon: "telegram" }] },
    { name: "Dr. Alemayehu Bekele", title: "Head of Health Office", phone: "+251 33 440 1006", email: "health@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Alemayehu+Bekele&background=DC2626&color=fff&size=200&bold=true", icon: HeartPulse, deptLabel: "Health Bureau", deptColor: "#DC2626", desc: "Oversees public health programs, 8 health facilities, and community health extension workers.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintHealth", icon: "facebook" }, { platform: "Telegram", url: "https://t.me/AmharaSintHealth", icon: "telegram" }] },
    { name: "Ato Getachew Worku", title: "Head of Transport", phone: "+251 33 440 1009", email: "transport@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Getachew+Worku&background=0284C7&color=fff&size=200&bold=true", icon: Truck, deptLabel: "Transport Office", deptColor: "#0284C7", desc: "Leads road construction, rural connectivity, and transport infrastructure development.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintTransport", icon: "facebook" }] },
    { name: "Ato Nahom Tadesse", title: "Head of ICT & Technology", phone: "+251 33 440 1012", email: "tech@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Nahom+Tadesse&background=0891B2&color=fff&size=200&bold=true", icon: Monitor, deptLabel: "Technology Office", deptColor: "#0891B2", desc: "Manages ICT infrastructure, digital transformation, and computer lab maintenance.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintTech", icon: "facebook" }, { platform: "LinkedIn", url: "https://www.linkedin.com/in/meseret-akalu-76363121b/", icon: "linkedin" }] },
    { name: "Ato Yohannes Girma", title: "Head of Finance", phone: "+251 33 440 1004", email: "finance@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Yohannes+Girma&background=059669&color=fff&size=200&bold=true", icon: Banknote, deptLabel: "Finance & Revenue", deptColor: "#059669", desc: "Oversees budget planning, revenue collection, and economic development initiatives.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintFinance", icon: "facebook" }] },
    { name: "Ato Assefa Demeke", title: "Head of Justice", phone: "+251 33 440 1008", email: "justice@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Assefa+Demeke&background=475569&color=fff&size=200&bold=true", icon: Scale, deptLabel: "Justice Bureau", deptColor: "#475569", desc: "Manages legal affairs, conflict resolution, and community justice programs.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintJustice", icon: "facebook" }] },
    { name: "Ato Teshome Kebede", title: "Head of Construction", phone: "+251 33 440 1011", email: "construction@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Teshome+Kebede&background=EA580C&color=fff&size=200&bold=true", icon: HardHat, deptLabel: "Construction Office", deptColor: "#EA580C", desc: "Supervises public building projects, road construction, and water infrastructure.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintConstruction", icon: "facebook" }] },
  ];

  const managementHeads = [
    { name: "Ato Girma Ayele", title: "Head of Women & Children Affairs", phone: "+251 33 440 1013", email: "womenchildren@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Girma+Ayele&background=DB2777&color=fff&size=200&bold=true", icon: Heart, deptLabel: "Women & Children Bureau", deptColor: "#DB2777", desc: "Leads gender equality programs, children's rights protection, women's economic empowerment, and anti-violence campaigns across the woreda.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintWomen", icon: "facebook" }, { platform: "Telegram", url: "https://t.me/AmharaSintWomen", icon: "telegram" }] },
    { name: "W/ro Hiwot Abebe", title: "Head of Youth & Sports Office", phone: "+251 33 440 1014", email: "youthsports@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Hiwot+Abebe&background=7C3AED&color=fff&size=200&bold=true", icon: Award, deptLabel: "Youth & Sports Bureau", deptColor: "#7C3AED", desc: "Coordinates youth development programs, sports tournaments, talent identification, and entrepreneurship support for young people.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintYouth", icon: "facebook" }] },
    { name: "Ato Demeke Zeleke", title: "Head of Trade & Industry", phone: "+251 33 440 1015", email: "trade@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Demeke+Zeleke&background=B45309&color=fff&size=200&bold=true", icon: Store, deptLabel: "Trade & Industry Bureau", deptColor: "#B45309", desc: "Promotes local trade, supports small enterprises, manages market regulations, and attracts investment to the woreda.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintTrade", icon: "facebook" }, { platform: "Telegram", url: "https://t.me/AmharaSintTrade", icon: "telegram" }] },
    { name: "W/ro Meselech Assefa", title: "Head of Water & Energy", phone: "+251 33 440 1016", email: "water@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Meselech+Assefa&background=0369A1&color=fff&size=200&bold=true", icon: Droplets, deptLabel: "Water & Energy Bureau", deptColor: "#0369A1", desc: "Manages clean water supply, irrigation systems, rural electrification, and renewable energy initiatives across all kebeles.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintWater", icon: "facebook" }] },
    { name: "Ato Bekele Tadesse", title: "Head of Environmental Protection", phone: "+251 33 440 1017", email: "environment@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Bekele+Tadesse&background=15803D&color=fff&size=200&bold=true", icon: Leaf, deptLabel: "Environment Bureau", deptColor: "#15803D", desc: "Leads environmental conservation, climate resilience programs, forest management, and waste disposal regulation.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintEnv", icon: "facebook" }, { platform: "Telegram", url: "https://t.me/AmharaSintEnv", icon: "telegram" }] },
    { name: "Ato Solomon Mulugeta", title: "Head of Social Affairs", phone: "+251 33 440 1018", email: "social@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Solomon+Mulugeta&background=9333EA&color=fff&size=200&bold=true", icon: Handshake, deptLabel: "Social Affairs Bureau", deptColor: "#9333EA", desc: "Manages social safety nets, disability inclusion programs, elder care support, and community development initiatives.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintSocial", icon: "facebook" }] },
    { name: "W/ro Selamawit Girma", title: "Head of Communication Affairs", phone: "+251 33 440 1019", email: "communication@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Selamawit+Girma&background=DC2626&color=fff&size=200&bold=true", icon: Megaphone, deptLabel: "Communication Bureau", deptColor: "#DC2626", desc: "Leads public relations, government communications, media liaison, community awareness campaigns, and digital content strategy.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintCommunication", icon: "facebook" }, { platform: "Telegram", url: "https://t.me/amharasayintcommunication", icon: "telegram" }, { platform: "YouTube", url: "https://youtube.com/@UC9q-EOZGRREV8kr104kL-Hw", icon: "youtube" }, { platform: "Instagram", url: "https://instagram.com/amharasayintworedacomm", icon: "instagram" }] },
    { name: "Ato Zelalem Hailu", title: "Head of Cooperatives Office", phone: "+251 33 440 1020", email: "cooperatives@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Zelalem+Hailu&background=0F766E&color=fff&size=200&bold=true", icon: People, deptLabel: "Cooperatives Bureau", deptColor: "#0F766E", desc: "Supports farmer cooperatives, savings and credit groups, artisan associations, and cooperative union development.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintCoop", icon: "facebook" }] },
    { name: "W/ro Tigist Dabi", title: "Head of Labor & Skills", phone: "+251 33 440 1021", email: "labor@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Tigist+Dabi&background=C2410C&color=fff&size=200&bold=true", icon: Briefcase, deptLabel: "Labor & Skills Bureau", deptColor: "#C2410C", desc: "Oversees employment services, vocational skills training, labor rights protection, and workforce development programs.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintLabor", icon: "facebook" }, { platform: "Telegram", url: "https://t.me/AmharaSintLabor", icon: "telegram" }] },
    { name: "Ato Kassahun Worku", title: "Head of Urban Development", phone: "+251 33 440 1022", email: "urban@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Kassahun+Worku&background=4338CA&color=fff&size=200&bold=true", icon: Building2, deptLabel: "Urban Dev. Bureau", deptColor: "#4338CA", desc: "Manages urban planning, land administration, housing development, and municipal infrastructure in the town center.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintUrban", icon: "facebook" }] },
    { name: "W/ro Alemtsehay Girma", title: "Head of Culture & Tourism", phone: "+251 33 440 1023", email: "culture@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Alemtsehay+Girma&background=B91C1C&color=fff&size=200&bold=true", icon: Landmark, deptLabel: "Culture & Tourism Bureau", deptColor: "#B91C1C", desc: "Promotes cultural heritage, organizes festivals, develops tourism sites, and preserves historical landmarks of the woreda.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintCulture", icon: "facebook" }, { platform: "YouTube", url: "https://youtube.com/@UC9q-EOZGRREV8kr104kL-Hw", icon: "youtube" }] },
    { name: "Ato Yared Demissie", title: "Head of Disaster Risk Management", phone: "+251 33 440 1024", email: "disaster@amharasint.gov.et", avatar: "https://ui-avatars.com/api/?name=Yared+Demissie&background=991B1B&color=fff&size=200&bold=true", icon: Siren, deptLabel: "Disaster Mgmt Bureau", deptColor: "#991B1B", desc: "Coordinates disaster preparedness, emergency response, drought mitigation, and community resilience building programs.", socials: [{ platform: "Facebook", url: "https://facebook.com/AmharaSintDRM", icon: "facebook" }, { platform: "Telegram", url: "https://t.me/AmharaSintDRM", icon: "telegram" }] },
  ];

  const iconMap: Record<string, React.ElementType> = { facebook: Facebook, telegram: Twitter, linkedin: Linkedin, youtube: Youtube, instagram: Instagram };
  const colorMap: Record<string, string> = { facebook: "#1877F2", telegram: "#0088CC", linkedin: "#0A66C2", youtube: "#FF0000", instagram: "#E4405F" };

  const EthiopianFlagBar = () => (
    <div className="flex h-1.5 w-full rounded-t-xl overflow-hidden">
      <div className="flex-1 bg-green-600" />
      <div className="flex-1 bg-yellow-400" />
      <div className="flex-1 bg-red-600" />
    </div>
  );

  const LeaderCard = ({ leader, large }: { leader: any; large?: boolean }) => (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1">
      <EthiopianFlagBar />
      <div className="p-5 flex flex-col items-center text-center">
        <div className="relative mb-3">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-500" style={{ borderColor: leader.deptColor + "40" }}>
            <img src={leader.avatar} alt={leader.name} className="w-full h-full object-cover" />
          </div>
        </div>
        <h3 className="font-bold text-[#0B3D2E] text-sm md:text-base mb-0.5">{leader.name}</h3>
        <span className="inline-block text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 text-white" style={{ backgroundColor: leader.deptColor }}>{leader.title}</span>
        {leader.desc && <p className="text-[11px] md:text-xs text-[#0B3D2E]/60 leading-relaxed mb-3 px-1">{leader.desc}</p>}
        <div className="space-y-1 w-full text-left mb-3">
          <div className="flex items-center gap-2 text-[#0B3D2E]/60 text-xs"><Phone className="w-3 h-3 shrink-0 text-green-600" /><span className="truncate">{leader.phone}</span></div>
          <div className="flex items-center gap-2 text-[#0B3D2E]/60 text-xs"><Mail className="w-3 h-3 shrink-0 text-blue-600" /><span className="truncate">{leader.email}</span></div>
        </div>
        {leader.socials && (
          <div className="flex items-center justify-center gap-1.5">
            {leader.socials.map((s: any) => {
              const Icon = iconMap[s.icon] || Globe;
              const color = colorMap[s.icon] || leader.deptColor;
              return (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" title={s.platform}
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-md"
                  style={{ backgroundColor: color + "15", color: color }}>
                  <Icon className="w-3 h-3" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  const DeptCard = ({ dept }: { dept: typeof sectorHeads[0] }) => (
    <AnimatedSection>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group hover:-translate-y-1">
        <EthiopianFlagBar />
        <div className="p-5 flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-500" style={{ borderWidth: 3, borderColor: dept.deptColor + "40" }}>
              <img src={dept.avatar} alt={dept.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: dept.deptColor }}>
              <dept.icon className="w-3.5 h-3.5 text-white" />
            </div>
          </div>
          <h3 className="font-bold text-[#0B3D2E] text-sm mb-0.5">{dept.name}</h3>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 text-white" style={{ backgroundColor: dept.deptColor }}>{dept.title}</span>
          <p className="text-[11px] text-[#0B3D2E]/50 leading-relaxed mb-2.5 line-clamp-2">{dept.desc}</p>
          <div className="space-y-1 w-full text-left mb-2.5">
            <div className="flex items-center gap-2 text-[#0B3D2E]/50 text-[11px]"><Phone className="w-3 h-3 shrink-0 text-green-500" /><span className="truncate">{dept.phone}</span></div>
            <div className="flex items-center gap-2 text-[#0B3D2E]/50 text-[11px]"><Mail className="w-3 h-3 shrink-0 text-blue-500" /><span className="truncate">{dept.email}</span></div>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            {dept.socials.map((s: any) => {
              const Icon = iconMap[s.icon] || Globe;
              const color = colorMap[s.icon] || dept.deptColor;
              return (
                <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" title={s.platform}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: color + "15", color: color }}>
                  <Icon className="w-2.5 h-2.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );

  return (
    <SubPage onNavigate={onNavigate} title="Leadership" breadcrumb="Government / Leadership" badge="Woreda Leadership">
      <div className="space-y-10 max-w-7xl mx-auto">
        {/* Section 1: Executive Leadership */}
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-6 h-6 text-[#EAB308]" />
            <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E]">Amhara Sayint Woreda Executive Leadership</h2>
          </div>
          <p className="text-[#0B3D2E]/60 text-sm mb-6">Woreda Administration &amp; Cabinet Members</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <LeaderCard leader={woredaLeader} large />
            <LeaderCard leader={deputyLeader} large />
            <LeaderCard leader={councilSpeaker} large />
          </div>
        </AnimatedSection>

        {/* Connector line */}
        <div className="flex justify-center">
          <div className="w-0.5 h-10 bg-gradient-to-b from-[#0B3D2E]/30 to-[#EAB308]/50 rounded-full" />
        </div>

        {/* Section 2: Sector Heads & Department Leaders */}
        <AnimatedSection delay={100}>
          <div className="flex items-center gap-3 mb-2">
            <Building className="w-6 h-6 text-[#EAB308]" />
            <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E]">Sector Heads &amp; Department Leaders</h2>
          </div>
          <p className="text-[#0B3D2E]/60 text-sm mb-6">Bureau Heads &amp; Office Leaders</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectorHeads.map((dept) => (
              <DeptCard key={dept.name} dept={dept} />
            ))}
          </div>
        </AnimatedSection>

        {/* Section 3: Management & Support Services */}
        <div className="flex justify-center my-6">
          <div className="w-0.5 h-10 bg-gradient-to-b from-[#EAB308]/50 to-[#7C3AED]/50 rounded-full" />
        </div>
        <AnimatedSection delay={200}>
          <div className="flex items-center gap-3 mb-2">
            <Crown className="w-6 h-6 text-[#7C3AED]" />
            <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E]">Management &amp; Support Services</h2>
          </div>
          <p className="text-[#0B3D2E]/60 text-sm mb-6">Bureau Heads for Social Services, Development &amp; Support</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {managementHeads.map((dept) => (
              <DeptCard key={dept.name} dept={dept} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </SubPage>
  );
}

/* ─── GOVERNMENT: Structure ─────────────────────────────── */
function GovStructurePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Administrative Structure" breadcrumb="Government / Structure" badge="Governance">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Building className="w-6 h-6 text-[#EAB308]" /> Organizational Hierarchy</h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-6">Amhara Sayint Woreda follows a three-tier administrative structure as defined by Ethiopia's federal system. This ensures governance reaches every community while maintaining accountability at each level.</p>
          <div className="space-y-4">
            {[
              { level: "Woreda Council", desc: "The supreme legislative body with 45 elected representatives from all 22 kebeles. Responsible for approving budgets, development plans, and policies. Meets quarterly for regular sessions and as needed for extraordinary matters.", color: "#0B3D2E" },
              { level: "Executive Committee", desc: "Chaired by the Woreda Administrator with 9 members including heads of key departments. Implements council decisions, manages day-to-day administration, and coordinates inter-departmental activities.", color: "#145A44" },
              { level: "Judicial Bodies", desc: "Social courts (3) handling civil disputes, and the Woreda Court handling criminal and major civil cases. Traditional dispute resolution through Shimagile (elders) operates alongside formal courts.", color: "#1D4ED8" },
              { level: "Kebele Administration", desc: "22 kebele councils, each with 7-9 elected members. Responsible for local service delivery, community mobilization, and grassroots development planning. Each kebele has dedicated development agents for agriculture and health.", color: "#EAB308" },
              { level: "Kebele Service Centers", desc: "One-stop service centers in each kebele providing birth/marriage certificates, land certificates, tax payments, and referral services. These centers bring government closer to the people.", color: "#10B981" },
            ].map((item) => (
              <div key={item.level} className="relative pl-8">
                <div className="absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: item.color }}><ChevronRight className="w-3 h-3 text-white" /></div>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <h3 className="font-bold text-[#0B3D2E] text-sm mb-1">{item.level}</h3>
                  <p className="text-[#0B3D2E]/60 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── GOVERNMENT: Offices ───────────────────────────────── */
function GovOfficesPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const offices = [
    { name: "Woreda Administrator's Office", head: "Ato Dereje Getachew", staff: 12, icon: UserCheck, color: "#0B3D2E" },
    { name: "Education Office", head: "W/ro Tigist Mekonnen", staff: 45, icon: GraduationCap, color: "#1D4ED8" },
    { name: "Health Office", head: "Dr. Alemayehu Bekele", staff: 38, icon: HeartPulse, color: "#DC2626" },
    { name: "Agriculture Office", head: "Ato Fikadu Hailu", staff: 52, icon: Tractor, color: "#16A34A" },
    { name: "Finance & Revenue Office", head: "Ato Yohannes Girma", staff: 18, icon: Banknote, color: "#059669" },
    { name: "Justice Office", head: "Ato Assefa Demeke", staff: 15, icon: Scale, color: "#475569" },
    { name: "Transport & Roads Office", head: "Ato Getachew Worku", staff: 22, icon: Truck, color: "#0284C7" },
    { name: "ICT & Technology Office", head: "Ato Nahom Tadesse", staff: 8, icon: Monitor, color: "#7C3AED" },
    { name: "Construction Office", head: "Ato Teshome Kebede", staff: 16, icon: HardHat, color: "#EA580C" },
    { name: "Women & Children Affairs", head: "Ato Girma Ayele", staff: 8, icon: Heart, color: "#DB2777" },
    { name: "Youth & Sports Office", head: "W/ro Hiwot Abebe", staff: 6, icon: Award, color: "#7C3AED" },
    { name: "Trade & Industry Office", head: "Ato Demeke Zeleke", staff: 10, icon: Store, color: "#B45309" },
    { name: "Water & Energy Office", head: "W/ro Meselech Assefa", staff: 20, icon: Droplets, color: "#0369A1" },
    { name: "Environmental Protection Office", head: "Ato Bekele Tadesse", staff: 7, icon: Leaf, color: "#15803D" },
    { name: "Social Affairs Office", head: "Ato Solomon Mulugeta", staff: 9, icon: Handshake, color: "#9333EA" },
    { name: "Communication Affairs Office", head: "W/ro Selamawit Girma", staff: 5, icon: Megaphone, color: "#DC2626" },
    { name: "Cooperatives Office", head: "Ato Zelalem Hailu", staff: 11, icon: People, color: "#0F766E" },
    { name: "Labor & Skills Office", head: "W/ro Tigist Dabi", staff: 8, icon: Briefcase, color: "#C2410C" },
    { name: "Urban Development Office", head: "Ato Kassahun Worku", staff: 14, icon: Building2, color: "#4338CA" },
    { name: "Culture & Tourism Office", head: "W/ro Alemtsehay Girma", staff: 6, icon: Landmark, color: "#B91C1C" },
    { name: "Disaster Risk Management Office", head: "Ato Yared Demissie", staff: 10, icon: Siren, color: "#991B1B" },
  ];
  return (
    <SubPage onNavigate={onNavigate} title="Offices & Departments" breadcrumb="Government / Offices" badge="All Departments">
      <div className="space-y-8 max-w-5xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Shield className="w-6 h-6 text-[#EAB308]" /> All Offices & Departments</h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-6">Amhara Sayint Woreda has 21 departmental offices, each led by experienced professionals. Together they employ over 330 civil servants dedicated to public service delivery.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {offices.map((office) => (
              <div key={office.name} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: office.color + "15" }}>
                  <office.icon className="w-5 h-5" style={{ color: office.color }} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#0B3D2E] text-sm">{office.name}</h3>
                  <p className="text-[#0B3D2E]/50 text-xs">{office.head} • {office.staff} staff</p>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── SERVICE PAGE TEMPLATE ────────────────────────────── */
function ServicePageTemplate({ onNavigate, title, breadcrumb, badge, icon: Icon, color, image, description, services, stats, achievements }: {
  onNavigate: (p: PageId) => void; title: string; breadcrumb: string; badge: string;
  icon: React.ElementType; color: string; image: string; description: string;
  services: { name: string; desc: string }[]; stats: { label: string; value: string; icon: React.ElementType }[];
  achievements: string[];
}) {
  return (
    <SubPage onNavigate={onNavigate} title={title} breadcrumb={breadcrumb} badge={badge}>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Hero Image */}
        <AnimatedSection>
          <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden shadow-xl">
            <img src={image} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color }}><Icon className="w-6 h-6 text-white" /></div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">{title}</h2>
              </div>
              <p className="text-white/80 text-sm max-w-2xl">{description}</p>
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((st, i) => {
            const statColors = ["from-blue-500 to-indigo-600", "from-emerald-500 to-teal-600", "from-amber-500 to-orange-600", "from-rose-500 to-pink-600"];
            const statBgColors = ["from-blue-50 to-indigo-50", "from-emerald-50 to-teal-50", "from-amber-50 to-orange-50", "from-rose-50 to-pink-50"];
            return (
              <AnimatedSection key={st.label} delay={i * 80}>
                <div className={`relative bg-gradient-to-br ${statBgColors[i % 4]} rounded-2xl p-5 text-center border border-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden group`}>
                  <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${statColors[i % 4]} opacity-10 rounded-bl-[40px] group-hover:opacity-20 transition-opacity`} />
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center bg-gradient-to-br ${statColors[i % 4]} shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <st.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-xl md:text-2xl font-black bg-gradient-to-r ${statColors[i % 4]} bg-clip-text text-transparent mb-1`}>
                    {st.value}
                  </div>
                  <p className="text-xs text-gray-500 font-semibold">{st.label}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Services List */}
        <ContentCard delay={100}>
          <h3 className="text-lg font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><ClipboardList className="w-5 h-5" style={{ color }} /> Services Provided</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {services.map((s) => (
              <div key={s.name} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition-all">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color }} />
                <div><h4 className="font-semibold text-[#0B3D2E] text-sm">{s.name}</h4><p className="text-[#0B3D2E]/50 text-xs leading-relaxed">{s.desc}</p></div>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* Achievements */}
        <ContentCard delay={200}>
          <h3 className="text-lg font-bold text-[#0B3D2E] mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-[#EAB308]" /> Key Achievements</h3>
          <ul className="space-y-2">
            {achievements.map((a, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#0B3D2E]/70"><ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-[#EAB308]" />{a}</li>
            ))}
          </ul>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── SERVICE: Education ───────────────────────────────── */
function ServiceEducationPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Education Services" breadcrumb="Services / Education" badge="Education Sector" icon={GraduationCap} color="#1D4ED8"
    image="https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg"
    description="Providing quality education from early childhood through TVET and preparatory level across all 37 kebeles of Amhara Sayint Woreda, including the Amhara Sayint TVET College."
    stats={[
      { label: "Total Schools", value: "106", icon: School },
      { label: "TVET College", value: "1", icon: GraduationCap },
      { label: "Preparatory Schools", value: "3", icon: Building2 },
      { label: "Teachers", value: "680+", icon: UserCheck },
    ]}
    services={[
      { name: "Primary Education (Grades 1-8)", desc: "36 primary schools providing foundational education in all kebeles with qualified teachers and improved learning materials." },
      { name: "Secondary Education (Grades 9-12)", desc: "8 secondary schools and 3 preparatory schools serving students across the woreda, with science and social science streams." },
      { name: "Amhara Sayint TVET College", desc: "The woreda's own Technical and Vocational Education Training college offers certificate and diploma programs in construction, ICT, agriculture, and other market-relevant trades. The college plays a vital role in equipping youth with practical skills for employment and self-employment." },
      { name: "Preparatory Schools (Grade 11-12)", desc: "Three preparatory schools — located in the main town and key kebeles — prepare students for the national university entrance examination (EHEECE), with natural science and social science streams available." },
      { name: "Early Childhood Education", desc: "12 kindergarten and preschool centers preparing young children for formal education through play-based learning." },
      { name: "Adult Education & Literacy", desc: "22 adult literacy centers helping adults achieve basic literacy and numeracy skills, with integrated functional literacy programs." },
      { name: "Special Needs Education", desc: "Inclusive education programs in 8 schools with trained special needs teachers and accessible facilities." },
      { name: "School Feeding Program", desc: "Nutritious meals provided to 15,000+ students in food-insecure kebeles to improve attendance and learning outcomes." },
      { name: "Teacher Training & Development", desc: "Continuous professional development programs for all 680+ teachers, including subject-based pedagogy training and ICT integration." },
      { name: "Girls' Education Initiative", desc: "Scholarships, mentorship programs, and community awareness campaigns to increase female enrollment and retention rates." },
    ]}
    achievements={[
      "Primary enrollment increased from 20% to 85% over the past two decades",
      "Amhara Sayint TVET College established and expanding enrollment year-on-year",
      "Student-to-teacher ratio improved from 65:1 to 42:1 across all levels",
      "12 schools equipped with computer laboratories and internet connectivity",
      "Girls' enrollment reached 48% at primary level, up from 32% a decade ago",
      "3 students achieved regional top-10 rankings in national examinations last year",
    ]}
  />;
}

/* ─── SERVICE: Health ──────────────────────────────────── */
function ServiceHealthPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Health Services" breadcrumb="Services / Health" badge="Health Sector" icon={HeartPulse} color="#DC2626"
    image="https://sfile.chatglm.cn/images-ppt/10cf906e32cf.jpg"
    description="Comprehensive healthcare delivery ensuring the well-being of all 142,350 residents through 8 health facilities."
    stats={[
      { label: "Health Centers", value: "23", icon: Stethoscope },
      { label: "Health Workers", value: "120+", icon: UserCheck },
      { label: "Coverage Rate", value: "92%", icon: Target },
      { label: "Vaccinations/Year", value: "15K+", icon: Baby },
    ]}
    services={[
      { name: "Primary Health Care", desc: "Comprehensive primary care at 1 primary hospital, 4 health centers, and 18 health posts." },
      { name: "Maternal & Child Health", desc: "Antenatal care, delivery services, and immunization programs protecting mothers and children." },
      { name: "Disease Prevention & Control", desc: "Malaria prevention, HIV/AIDS testing and counseling, tuberculosis screening and treatment." },
      { name: "Health Extension Program", desc: "22 health extension workers providing preventive health services at kebele level." },
      { name: "Ambulance Service", desc: "3 ambulances providing emergency transport to health facilities for critical cases." },
      { name: "Mental Health Services", desc: "Counseling and mental health support at the primary hospital and 4 health centers." },
      { name: "Nutrition Programs", desc: "Therapeutic feeding for malnourished children and nutrition education for mothers." },
      { name: "Pharmacy & Drug Supply", desc: "Essential drugs and medical supplies available at all health institutions." },
    ]}
    achievements={[
      "Expanded from 1 clinic to 8 health facilities over three decades",
      "Under-5 mortality reduced by 60% since 2005",
      "92% of pregnant women now receive at least 4 antenatal care visits",
      "Immunization coverage reached 95% for basic childhood vaccines",
      "Malaria incidence reduced by 75% through prevention and treatment programs",
      "Skilled birth attendance increased from 15% to 65%",
    ]}
  />;
}

/* ─── SERVICE: Agriculture ─────────────────────────────── */
function ServiceAgriculturePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Agriculture Services" breadcrumb="Services / Agriculture" badge="Agriculture Sector" icon={Tractor} color="#16A34A"
    image="https://sfile.chatglm.cn/images-ppt/30fee1e622be.jpg"
    description="Supporting 28,500+ farming households with modern agricultural techniques, improved seeds, and extension services for sustainable food production."
    stats={[
      { label: "Farm Households", value: "28,500+", icon: Users },
      { label: "Cultivated Land", value: "85K ha", icon: Wheat },
      { label: "Extension Workers", value: "22", icon: Sprout },
      { label: "Cooperatives", value: "120+", icon: UsersRound },
    ]}
    services={[
      { name: "Crop Production Support", desc: "Distribution of improved seeds, fertilizers, and pesticides for major crops including teff, barley, wheat, and sorghum." },
      { name: "Agricultural Extension", desc: "22 development agents providing on-farm training and technical advice to farmers in all kebeles." },
      { name: "Livestock Development", desc: "Artificial insemination, veterinary services, and modern livestock management training for cattle, sheep, and goats." },
      { name: "Irrigation Development", desc: "Construction and maintenance of small-scale irrigation schemes serving 2,500+ households." },
      { name: "Soil Conservation", desc: "Terracing, bund construction, and afforestation programs to prevent soil erosion on 12,000 hectares." },
      { name: "Cooperative Support", desc: "Registration, training, and market linkage support for 120+ farmer cooperatives." },
      { name: "Agricultural Research", desc: "On-farm demonstrations and adaptive research trials for improved crop varieties and practices." },
      { name: "Market Information", desc: "Real-time price information and market linkage services connecting farmers to buyers." },
      { name: "Natural Resource Management", desc: "Watershed management, spring development, and community forestry programs." },
      { name: "Emergency Response", desc: "Seed and food assistance during drought periods and natural disasters." },
    ]}
    achievements={[
      "Crop yields increased by 35% through improved seed varieties and fertilizer use",
      "2,500+ households gained access to irrigation, enabling double-cropping",
      "120+ farmer cooperatives registered and actively operating",
      "Livestock vaccination coverage reached 85% of the total population",
      "12,000 hectares of degraded land rehabilitated through soil conservation",
      "Annual agricultural exhibition attracts 2,000+ farmers showcasing innovations",
    ]}
  />;
}

/* ─── SERVICE: Trade ──────────────────────────────────── */
function ServiceTradePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Trade & Commerce Services" breadcrumb="Services / Trade" badge="Trade Sector" icon={Store} color="#9333EA"
    image="https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg"
    description="Promoting economic growth through small enterprise development, market infrastructure, and cooperative strengthening."
    stats={[
      { label: "Small Enterprises", value: "850+", icon: Store },
      { label: "Markets", value: "8", icon: Building2 },
      { label: "Cooperatives", value: "45", icon: UsersRound },
      { label: "Jobs Created", value: "2,400+", icon: UserCheck },
    ]}
    services={[
      { name: "Business Registration & Licensing", desc: "Streamlined registration and licensing process for new businesses and small enterprises." },
      { name: "Market Development", desc: "Construction and management of 8 local markets providing trading spaces for 3,000+ vendors." },
      { name: "Cooperative Formation", desc: "Support for forming and strengthening savings, credit, and producer cooperatives." },
      { name: "Micro & Small Enterprise (MSE) Support", desc: "Training, mentoring, and access to credit for micro and small enterprises." },
      { name: "Trade Fair Participation", desc: "Organizing and supporting participation in regional and zonal trade fairs." },
      { name: "Consumer Protection", desc: "Price monitoring, quality control, and consumer rights enforcement." },
      { name: "Tourism Promotion", desc: "Promoting local cultural and natural attractions for tourism development." },
    ]}
    achievements={[
      "850+ micro and small enterprises operating across the woreda",
      "45 savings and credit cooperatives with ETB 15 million in collective savings",
      "2,400+ jobs created through MSE development programs in the past 3 years",
      "8 modern market centers constructed with vendor facilities and storage",
      "ETB 2.5 million in micro-credit disbursed to 500+ entrepreneurs last year",
      "3 cooperative unions established for market bargaining power",
    ]}
  />;
}

/* ─── SERVICE: Technology ──────────────────────────────── */
function ServiceTechnologyPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Technology & ICT Services" breadcrumb="Services / Technology" badge="Digital Services" icon={Monitor} color="#0891B2"
    image="https://sfile.chatglm.cn/images-ppt/4db62da31bf6.png"
    description="Driving digital transformation through ICT infrastructure, e-government services, and technology training for citizens."
    stats={[
      { label: "Computer Labs", value: "12", icon: Monitor },
      { label: "Internet Centers", value: "5", icon: Globe },
      { label: "ICT Trained", value: "1,200+", icon: UserCheck },
      { label: "Digital Services", value: "15+", icon: Zap },
    ]}
    services={[
      { name: "E-Government Services", desc: "Digital platforms for certificate requests, tax payments, and government correspondence." },
      { name: "ICT Training Programs", desc: "Computer literacy, internet skills, and software training for youth and government staff." },
      { name: "Internet Access Centers", desc: "5 public internet access points providing affordable connectivity to communities." },
      { name: "School Computer Labs", desc: "12 computer laboratories in secondary schools with basic IT infrastructure." },
      { name: "Digital Archive System", desc: "Electronic document management and archiving for all woreda offices." },
      { name: "Communication Infrastructure", desc: "Mobile network expansion coordination and telecom service improvement advocacy." },
      { name: "Website & Social Media", desc: "Official website and social media management for public communication and transparency." },
    ]}
    achievements={[
      "12 computer labs established in secondary schools serving 8,000+ students",
      "1,200+ youth and government staff completed basic ICT training programs",
      "5 public internet access centers operational in major towns",
      "15+ government services now available through digital platforms",
      "Official website launched receiving 500+ monthly visitors",
      "ICT infrastructure plan developed for complete digital transformation by 2028",
    ]}
  />;
}

/* ─── SERVICE: Construction ───────────────────────────── */
function ServiceConstructionPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Construction Services" breadcrumb="Services / Construction" badge="Infrastructure" icon={HardHat} color="#EA580C"
    image="https://sfile.chatglm.cn/images-ppt/56336ff1a645.jpg"
    description="Planning, designing, and constructing vital infrastructure including roads, public buildings, water facilities, and community centers."
    stats={[
      { label: "Roads Built (km)", value: "85", icon: Truck },
      { label: "Public Buildings", value: "34", icon: Building2 },
      { label: "Water Points", value: "64", icon: Droplets },
      { label: "Annual Budget", value: "28M ETB", icon: Banknote },
    ]}
    services={[
      { name: "Road Construction & Maintenance", desc: "Construction and maintenance of 85 km of all-weather roads connecting kebeles to the woreda center." },
      { name: "Public Building Construction", desc: "Schools, health centers, administrative offices, and community halls built to national standards." },
      { name: "Water Infrastructure", desc: "Drilling of boreholes, construction of spring developments, and rainwater harvesting systems." },
      { name: "Bridge & Culvert Construction", desc: "River crossings and drainage structures ensuring year-round road accessibility." },
      { name: "Urban Planning", desc: "Town planning, land use regulation, and infrastructure design for Amhara Sayint town." },
      { name: "Quality Control & Supervision", desc: "Construction quality assurance and building code enforcement for all projects." },
      { name: "Community Infrastructure", desc: "Markets, bus terminals, and public spaces development for community well-being." },
    ]}
    achievements={[
      "85 km of all-weather roads constructed connecting 14 of 22 kebeles",
      "34 public buildings constructed including 8 schools and 4 health centers",
      "64 clean water points developed providing safe water to 78% of the population",
      "12 bridges and 45 culverts constructed improving year-round accessibility",
      "Amhara Sayint town master plan developed and implementation underway",
      "ETB 28 million allocated to construction projects in the 2026/27 budget",
    ]}
  />;
}

/* ─── SERVICE: Transport ──────────────────────────────── */
function ServiceTransportPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Transport Services" breadcrumb="Services / Transport" badge="Transport Sector" icon={Truck} color="#0284C7"
    image="https://sfile.chatglm.cn/images-ppt/4781a70c681c.jpg"
    description="Developing and maintaining road networks and transport infrastructure to connect communities and facilitate economic activity."
    stats={[
      { label: "Road Network (km)", value: "85", icon: Map },
      { label: "Kebeles Connected", value: "14/22", icon: MapPin },
      { label: "Bridges", value: "12", icon: Building },
      { label: "Connectivity", value: "64%", icon: Target },
    ]}
    services={[
      { name: "Road Construction", desc: "Building new all-weather roads connecting remote kebeles to the woreda center and major highways." },
      { name: "Road Maintenance", desc: "Regular grading, drainage maintenance, and spot repairs on 85 km of existing road network." },
      { name: "Bridge Construction", desc: "12 bridges constructed over seasonal rivers ensuring year-round connectivity." },
      { name: "Transport Regulation", desc: "Licensing and regulation of public transport operators ensuring safety standards." },
      { name: "Traffic Management", desc: "Road safety programs, speed management, and accident prevention in populated areas." },
    ]}
    achievements={[
      "85 km of all-weather roads constructed, up from 12 km in 2005",
      "Road connectivity increased from 25% to 64% of kebeles",
      "12 bridges constructed eliminating isolation during rainy seasons",
      "Community road maintenance program engaging 500+ laborers seasonally",
    ]}
  />;
}

/* ─── SERVICE: Water ──────────────────────────────────── */
function ServiceWaterPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Water & Sanitation" breadcrumb="Services / Water" badge="Water Sector" icon={Droplets} color="#0891B2"
    image="https://sfile.chatglm.cn/images-ppt/ba8313230e3e.jpg"
    description="Ensuring access to clean, safe water and proper sanitation facilities for all communities across the woreda."
    stats={[
      { label: "Water Points", value: "64", icon: Droplets },
      { label: "Water Access", value: "78%", icon: Target },
      { label: "Sanitation Facilities", value: "3,500+", icon: Building },
      { label: "Beneficiaries", value: "110K+", icon: Users },
    ]}
    services={[
      { name: "Borehole Drilling", desc: "Drilling of deep and shallow boreholes equipped with hand pumps or motorized systems." },
      { name: "Spring Development", desc: "Protection and development of natural springs for reliable year-round water supply." },
      { name: "Rainwater Harvesting", desc: "Construction of rainwater collection systems for schools and public buildings." },
      { name: "Sanitation Promotion", desc: "Community-led total sanitation (CLTS) programs and latrine construction support." },
      { name: "Water Quality Testing", desc: "Regular water quality monitoring and testing to ensure safety standards." },
      { name: "Water Committee Training", desc: "Training community water committees in operation, maintenance, and financial management." },
    ]}
    achievements={[
      "64 clean water points developed serving 110,000+ residents",
      "Water access increased from 22% to 78% over two decades",
      "3,500+ household latrines constructed through CLTS programs",
      "Open defecation-free status achieved in 15 of 22 kebeles",
    ]}
  />;
}

/* ─── SERVICE: Justice ────────────────────────────────── */
function ServiceJusticePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Justice & Security" breadcrumb="Services / Justice" badge="Justice Sector" icon={Scale} color="#475569"
    image="https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg"
    description="Maintaining law and order through formal and customary justice systems, community policing, and conflict resolution."
    stats={[
      { label: "Social Courts", value: "3", icon: Scale },
      { label: "Police Officers", value: "45", icon: Shield },
      { label: "Cases Resolved/Yr", value: "800+", icon: FileCheck },
      { label: "Crime Rate", value: "Low", icon: CheckCircle2 },
    ]}
    services={[
      { name: "Social Courts", desc: "3 social courts handling civil disputes including land, family, and contract cases." },
      { name: "Community Policing", desc: "Community-police partnerships preventing crime and maintaining public safety." },
      { name: "Customary Dispute Resolution", desc: "Shimagile (elder) mediation for community-level disputes alongside formal courts." },
      { name: "Legal Aid Services", desc: "Free legal consultation and representation for vulnerable community members." },
      { name: "Public Education", desc: "Awareness programs on legal rights, obligations, and available justice services." },
    ]}
    achievements={[
      "800+ civil disputes resolved annually through social courts",
      "Crime rate maintained below regional average through community policing",
      "95% of cases resolved within statutory timeframes",
      "Traditional dispute resolution complements formal justice effectively",
    ]}
  />;
}

/* ─── SERVICE: Finance ────────────────────────────────── */
function ServiceFinancePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return <ServicePageTemplate onNavigate={onNavigate} title="Finance & Revenue" breadcrumb="Services / Finance" badge="Finance Sector" icon={Banknote} color="#059669"
    image="https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg"
    description="Managing the woreda's finances through transparent budgeting, efficient revenue collection, and accountable public expenditure."
    stats={[
      { label: "Annual Budget", value: "85M ETB", icon: Banknote },
      { label: "Revenue Collected", value: "18M ETB", icon: CircleDollarSign },
      { label: "Tax Payers", value: "8,500+", icon: Users },
      { label: "Staff", value: "18", icon: UserCheck },
    ]}
    services={[
      { name: "Budget Planning", desc: "Annual budget preparation aligned with the woreda's five-year development plan." },
      { name: "Revenue Collection", desc: "Collection of land tax, business tax, and other local revenues from 8,500+ taxpayers." },
      { name: "Expenditure Management", desc: "Transparent allocation and disbursement of funds to all departments and programs." },
      { name: "Financial Reporting", desc: "Regular financial reports to the woreda council and zonal finance bureau." },
      { name: "Internal Audit", desc: "Regular internal audits ensuring compliance and preventing financial irregularities." },
      { name: "Taxpayer Services", desc: "Tax assessment assistance, payment facilitation, and taxpayer education programs." },
    ]}
    achievements={[
      "Annual budget grown from ETB 12 million to ETB 85 million over 15 years",
      "Revenue collection efficiency improved from 45% to 72% of potential",
      "8,500+ registered taxpayers, up from 2,000 a decade ago",
      "Clean audit reports received for 5 consecutive years",
    ]}
  />;
}

/* ─── NEWS PAGE ──────────────────────────────────────── */
function NewsPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [items, setItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">("newest");
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const perPage = 5;

  const allNews = [
    { id: "1", title: "Amhara Sayint Launches New Water Supply Project", summary: "A major clean water initiative covering 8 kebeles has been approved with a budget of ETB 12 million, bringing safe drinking water to over 15,000 residents. The project includes 24 new water points and 2 reservoirs.", category: "Water", author: "Communications Office", featured: true, date: "2026-06-28", image: "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg", initialLikes: 47, initialComments: 12, views: 423 },
    { id: "2", title: "Annual Agricultural Exhibition a Great Success", summary: "Over 2,000 farmers participated in this year's exhibition showcasing modern farming techniques, improved seed varieties, and irrigation methods. Awards were given to top-performing cooperatives.", category: "Agriculture", author: "Agriculture Office", featured: false, date: "2026-06-25", image: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg", initialLikes: 83, initialComments: 24, views: 891 },
    { id: "3", title: "New Primary School Inaugurated in Kebele 05", summary: "The woreda administration inaugurated a fully equipped primary school serving 400 students with modern classrooms, a computer lab, and a library.", category: "Education", author: "Education Office", featured: false, date: "2026-06-20", image: "https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg", initialLikes: 62, initialComments: 8, views: 567 },
    { id: "4", title: "TVET College Enrolls Record 500 Students", summary: "Amhara Sayint TVET College has enrolled a record 500 students this academic year in construction, ICT, wood work, and agriculture programs.", category: "Education", author: "TVET College Office", featured: false, date: "2026-06-15", image: "https://sfile.chatglm.cn/images-ppt/a842501dc00b.jpg", initialLikes: 95, initialComments: 31, views: 1034 },
    { id: "5", title: "Meskel Celebration Unites Community", summary: "Thousands of residents gathered for the annual Meskel celebration with Demera bonfire, prayer, and cultural performances across the woreda.", category: "Culture", author: "Culture & Tourism Office", featured: false, date: "2026-06-10", image: "https://sfile.chatglm.cn/images-ppt/b37b6e89b27a.jpg", initialLikes: 128, initialComments: 45, views: 1456 },
    { id: "6", title: "Road Construction Connects Remote Kebeles", summary: "A new 18 km all-weather road now connects 5 previously isolated kebeles to the main town, improving access for over 8,000 residents.", category: "Infrastructure", author: "Road Authority", featured: false, date: "2026-06-05", image: "https://sfile.chatglm.cn/images-ppt/15e928c7ad4d.jpg", initialLikes: 56, initialComments: 15, views: 389 },
    { id: "7", title: "Health Campaign Reaches 10,000 Residents", summary: "A week-long health awareness campaign reached 10,000 residents with free screenings for diabetes, hypertension, and eye diseases.", category: "Health", author: "Communications Office", featured: false, date: "2026-05-28", image: "https://sfile.chatglm.cn/images-ppt/40afb43a5118.jpg", initialLikes: 71, initialComments: 19, views: 734 },
    { id: "8", title: "Youth Entrepreneurship Training Program Launch", summary: "The woreda launched a 3-month entrepreneurship training program for 200 youth, covering business planning, financial literacy, and digital skills.", category: "Youth", author: "Communications Office", featured: false, date: "2026-05-20", image: "https://sfile.chatglm.cn/images-ppt/395da4df6bb6.jpg", initialLikes: 44, initialComments: 11, views: 312 },
    { id: "9", title: "New Market Built in Ajibar Town", summary: "A modern market facility with 150 stalls, cold storage, and sanitation facilities was inaugurated to support local traders and farmers.", category: "Trade", author: "Communications Office", featured: false, date: "2026-05-15", image: "https://sfile.chatglm.cn/images-ppt/395da4df6bb6.jpg", initialLikes: 67, initialComments: 22, views: 523 },
    { id: "10", title: "Digital Literacy Program for Elders", summary: "A pilot program teaching basic smartphone and internet skills to 150 elders across 5 kebeles was launched in partnership with Ethio Telecom.", category: "Technology", author: "Technology Office", featured: false, date: "2026-05-10", image: "https://sfile.chatglm.cn/images-ppt/395da4df6bb6.jpg", initialLikes: 89, initialComments: 18, views: 678 },
    { id: "11", title: "Woreda Budget Approved for FY 2026/27", summary: "The woreda council approved an annual budget of ETB 200 million focusing on education, health, agriculture, and infrastructure development.", category: "Finance", author: "Finance Office", featured: false, date: "2026-05-05", image: "https://sfile.chatglm.cn/images-ppt/395da4df6bb6.jpg", initialLikes: 35, initialComments: 7, views: 445 },
    { id: "12", title: "Women's Cooperative Wins Regional Award", summary: "The Sint Women's Handicraft Cooperative won first place at the regional SME competition for their innovative woven textile products.", category: "Culture", author: "Culture & Tourism Office", featured: false, date: "2026-04-28", image: "https://sfile.chatglm.cn/images-ppt/b37b6e89b27a.jpg", initialLikes: 112, initialComments: 34, views: 921 },
  ];

  useEffect(() => {
    fetch("/admin/api/news").then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) {
        setItems(data.filter((n: any) => n.status === "published").map((n: any) => ({ ...n, image: n.image || n.imageUrl })));
      } else {
        setItems(allNews);
      }
    }).catch(() => setItems(allNews));
  }, []);

  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];
  const filtered = activeCategory === "All" ? items : items.filter(i => i.category === activeCategory);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === "oldest") return new Date(a.date).getTime() - new Date(b.date).getTime();
    return (b.initialLikes || 0) - (a.initialLikes || 0);
  });
  const totalPages = Math.ceil(sorted.length / perPage);
  const pageItems = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  useEffect(() => { setCurrentPage(1); }, [activeCategory, sortBy]);

  const toggleLike = (id: string) => {
    setLiked(p => ({ ...p, [id]: !p[id] }));
    setLikes(p => ({ ...p, [id]: (p[id] || 0) + (liked[id] ? -1 : 1) }));
  };

  const categoryColors: Record<string, string> = {
    Water: "bg-blue-500", Agriculture: "bg-green-500", Education: "bg-indigo-500", Culture: "bg-amber-500",
    Infrastructure: "bg-orange-500", Health: "bg-rose-500", Youth: "bg-purple-500", Trade: "bg-teal-500",
    Technology: "bg-cyan-500", Finance: "bg-emerald-500",
  };

  const featured = sorted.find(i => i.featured);

  // Calendar data
  const now = new Date();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const calendarDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  const eventDays = [5, 12, 20, 28];

  return (
    <div className="min-h-screen bg-gray-50/80 pt-[110px] md:pt-[130px]">
      {/* ── News Detail Modal ─────────────────────────────── */}
      {selectedNews && (
        <div className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={() => setSelectedNews(null)}>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Header image */}
            <div className="relative h-56 sm:h-72 overflow-hidden">
              <img src={selectedNews.image || selectedNews.imageUrl || "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg"} alt={selectedNews.title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button onClick={() => setSelectedNews(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all">
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className={`${categoryColors[selectedNews.category] || "bg-[#EAB308]"} text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider`}>{selectedNews.category}</span>
                {selectedNews.featured && <span className="bg-[#EAB308] text-[#0B3D2E] text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider">Featured</span>}
              </div>
            </div>
            {/* Content */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B3D2E] mb-3 leading-tight">{selectedNews.title}</h2>
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#0B3D2E]/40 mb-5 pb-5 border-b border-gray-100">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{selectedNews.date}</span>
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{selectedNews.author}</span>
                <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{selectedNews.views || 0} views</span>
                <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" />{selectedNews.initialComments || 0} comments</span>
              </div>
              {/* Full content */}
              <div className="prose prose-sm max-w-none text-[#0B3D2E]/70 leading-relaxed">
                <p className="text-base text-[#0B3D2E]/80 font-medium mb-4">{selectedNews.summary}</p>
                {selectedNews.content && selectedNews.content !== selectedNews.summary && (
                  <div className="text-sm leading-relaxed whitespace-pre-line">{selectedNews.content}</div>
                )}
                {/* Tags */}
                {selectedNews.tags && selectedNews.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedNews.tags.map((tag: string) => (
                      <span key={tag} className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                {/* Photo gallery */}
                {selectedNews.photos && selectedNews.photos.length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-sm font-bold text-[#0B3D2E] mb-3 flex items-center gap-2">
                      <Camera className="w-4 h-4" /> Photo Gallery ({selectedNews.photos.length} photos)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {selectedNews.photos.map((photo: {url: string; caption: string}, i: number) => (
                        <div key={i} className="group relative rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-all">
                          <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg'; }} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                            <p className="text-white text-[10px] leading-tight">{photo.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Share & like */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100">
                <button onClick={() => { setLiked(p => ({ ...p, [selectedNews.id]: !p[selectedNews.id] })); setLikes(p => ({ ...p, [selectedNews.id]: (p[selectedNews.id] || 0) + (liked[selectedNews.id] ? -1 : 1) })); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${liked[selectedNews.id] ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-400"}`}>
                  <Heart className={`w-4 h-4 ${liked[selectedNews.id] ? "fill-red-500" : ""}`} />
                  {(selectedNews.initialLikes || 0) + (likes[selectedNews.id] || 0)} Likes
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={() => { const shareUrl = `https://amhara-sint-woreda.onrender.com`; if (navigator.share) { navigator.share({ title: selectedNews.title, text: selectedNews.summary, url: shareUrl }); } else { navigator.clipboard.writeText(shareUrl); } }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[#0B3D2E] text-white hover:bg-[#145A44] transition-all">
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                  <button onClick={() => setSelectedNews(null)} className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B3D2E] mb-1">Latest News & Events</h1>
            <p className="text-[#0B3D2E]/50 text-sm">Stay informed with the latest from Amhara Sayint Woreda</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#0B3D2E]/40 font-medium">Sort:</span>
            {(["newest", "popular", "oldest"] as const).map(s => (
              <button key={s} onClick={() => setSortBy(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${sortBy === s ? "bg-[#0B3D2E] text-white shadow-sm" : "bg-white text-[#0B3D2E]/50 border border-gray-200 hover:bg-gray-100"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${activeCategory === cat ? "bg-[#0B3D2E] text-white shadow-md" : "bg-white text-[#0B3D2E]/60 border border-gray-200 hover:bg-[#0B3D2E]/5 hover:border-[#0B3D2E]/20"}`}>
              {cat}
              {cat !== "All" && <span className="ml-1.5 text-[10px] opacity-60">({items.filter(i => i.category === cat).length})</span>}
            </button>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured card */}
            {featured && currentPage === 1 && activeCategory === "All" && (
              <AnimatedSection>
                <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 h-64 sm:h-72 md:h-80" onClick={() => setSelectedNews(featured)}>
                  <img src={featured.image || featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg'; }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`${categoryColors[featured.category] || "bg-[#EAB308]"} text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider`}>News</span>
                    <span className="bg-[#EAB308] text-[#0B3D2E] text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-wider">Featured</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <h2 className="text-white font-extrabold text-lg sm:text-xl md:text-2xl mb-2 leading-tight drop-shadow-lg">{featured.title}</h2>
                    <p className="text-white/70 text-sm mb-3 line-clamp-2 max-w-2xl">{featured.summary}</p>
                    <div className="flex items-center gap-4 text-white/50 text-xs">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                      <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" />{(featured.initialLikes || 0) + (likes[featured.id] || 0)}</span>
                      <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" />{featured.initialComments || 0}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )}

            {/* News list */}
            {pageItems.map((item, i) => {
              if (featured && item.id === featured.id && currentPage === 1 && activeCategory === "All") return null;
              const likeCount = (item.initialLikes || 0) + (likes[item.id] || 0);
              const isLiked = liked[item.id] || false;
              return (
                <AnimatedSection key={item.id} delay={i * 50}>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 md:p-5 flex gap-4 md:gap-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group cursor-pointer" onClick={() => setSelectedNews(item)}>
                    <div className="relative w-28 h-24 sm:w-36 sm:h-28 md:w-40 md:h-28 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image || item.imageUrl || "https://sfile.chatglm.cn/images-ppt/31a73cdbeed8.jpg"} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg'; }} />
                      <span className={`absolute top-2 left-2 ${categoryColors[item.category] || "bg-[#EAB308]"} text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider`}>{item.category}</span>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <h3 className="font-bold text-[#0B3D2E] text-sm sm:text-base md:text-lg leading-snug mb-1.5 group-hover:text-[#EAB308] transition-colors line-clamp-2">{item.title}</h3>
                        <p className="text-[#0B3D2E]/50 text-xs sm:text-sm leading-relaxed line-clamp-2 hidden sm:block">{item.summary}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-[#0B3D2E]/35 text-xs">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.date}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{item.views || 0}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{item.initialComments || 0}</span>
                        <button onClick={(e) => { e.stopPropagation(); toggleLike(item.id); }}
                          className={`ml-auto flex items-center gap-1 transition-colors ${isLiked ? "text-red-500" : "text-[#0B3D2E]/30 hover:text-red-400"}`}>
                          <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500" : ""}`} />{likeCount}
                        </button>
                        <span className="flex items-center gap-1 text-[#0B3D2E]/40 font-semibold hover:text-[#EAB308] transition-colors">
                          See Details →
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border border-gray-200 text-[#0B3D2E]/50 hover:bg-[#0B3D2E] hover:text-white hover:border-[#0B3D2E] transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                      currentPage === page ? "bg-[#0B3D2E] text-white shadow-md shadow-[#0B3D2E]/20" : "border border-gray-200 text-[#0B3D2E]/50 hover:bg-[#0B3D2E] hover:text-white hover:border-[#0B3D2E]"
                    }`}>{page}</button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border border-gray-200 text-[#0B3D2E]/50 hover:bg-[#0B3D2E] hover:text-white hover:border-[#0B3D2E] transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="bg-[#0B3D2E] px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Calendar className="w-4 h-4 text-[#EAB308]" />
                  <span className="font-bold text-sm">{monthNames[now.getMonth()]} {now.getFullYear()}</span>
                </div>
                <span className="bg-[#EAB308] text-[#0B3D2E] text-[10px] font-black px-2 py-0.5 rounded-full">Today: {now.getDate()}</span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center">
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                    <span key={d} className="text-[10px] font-bold text-[#0B3D2E]/30 py-1">{d}</span>
                  ))}
                  {Array.from({ length: firstDay }, (_, i) => <span key={`e${i}`} />)}
                  {Array.from({ length: calendarDays }, (_, i) => {
                    const day = i + 1;
                    const isToday = day === now.getDate();
                    const hasEvent = eventDays.includes(day);
                    return (
                      <span key={day} className={`relative text-xs py-1.5 rounded-lg font-medium transition-all ${isToday ? "bg-[#0B3D2E] text-white font-bold" : "text-[#0B3D2E]/60 hover:bg-gray-50"}`}>
                        {day}
                        {hasEvent && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#EAB308]" />}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="bg-[#0B3D2E] px-5 py-3.5 flex items-center gap-2 text-white">
                <Zap className="w-4 h-4 text-[#EAB308]" />
                <span className="font-bold text-sm">Quick Access</span>
              </div>
              <div className="p-4 grid grid-cols-2 gap-2.5">
                {[
                  { label: "Services", icon: Layers, href: "svc-education" as PageId, bg: "bg-emerald-50", color: "text-emerald-600" },
                  { label: "News", icon: Newspaper, href: "news-news" as PageId, bg: "bg-red-50", color: "text-red-500" },
                  { label: "Vacancies", icon: Briefcase, href: "vacancy" as PageId, bg: "bg-purple-50", color: "text-purple-600" },
                  { label: "Tenders", icon: FileCheck, href: "bids" as PageId, bg: "bg-amber-50", color: "text-amber-600" },
                  { label: "Gallery", icon: ImageIcon, href: "gallery" as PageId, bg: "bg-orange-50", color: "text-orange-600" },
                  { label: "Education", icon: GraduationCap, href: "svc-education" as PageId, bg: "bg-blue-50", color: "text-blue-600" },
                  { label: "Events", icon: Calendar, href: "news-announcements" as PageId, bg: "bg-pink-50", color: "text-pink-600" },
                  { label: "Contact", icon: Phone, href: "contact" as PageId, bg: "bg-teal-50", color: "text-teal-600" },
                ].map(q => (
                  <button key={q.label} onClick={() => onNavigate(q.href)}
                    className={`flex items-center gap-2 ${q.bg} ${q.color} rounded-lg px-3 py-2.5 text-xs font-bold transition-all hover:shadow-md hover:scale-[1.03]`}>
                    <q.icon className="w-4 h-4" />{q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency */}
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white text-center shadow-lg">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                <Siren className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm mb-1">Emergency Hotline</h4>
              <p className="text-3xl font-black mb-1">991</p>
              <p className="text-white/60 text-xs">Available 24/7 for emergencies</p>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="bg-[#0B3D2E] px-5 py-3.5 flex items-center gap-2 text-white">
                <MapPin className="w-4 h-4 text-[#EAB308]" />
                <span className="font-bold text-sm">Our Location</span>
              </div>
              <div className="p-4">
                <div className="rounded-lg overflow-hidden mb-3 bg-gray-100 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-[#0B3D2E]/20 mx-auto mb-1" />
                    <p className="text-[10px] text-[#0B3D2E]/30">Amhara Sayint Woreda</p>
                    <p className="text-[10px] text-[#0B3D2E]/30">South Wollo, Amhara</p>
                  </div>
                </div>
                <p className="text-xs text-[#0B3D2E]/50 leading-relaxed">South Wollo Zone, Amhara National Regional State, Ethiopia. Located approximately 400 km north of Addis Ababa.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── BIDS PAGE ──────────────────────────────────────── */
function BidsPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [bids] = useState([
    { id: "b1", title: "Construction of Kebele 15-17 Road (Phase II)", description: "Construction of 18 km all-weather road with 3 bridges connecting Kebeles 15, 16, and 17.", budget: "ETB 15 Million", deadline: "2026-08-30", status: "open", image: "https://sfile.chatglm.cn/images-ppt/15e928c7ad4d.jpg" },
    { id: "b2", title: "Supply of Office Furniture for 5 New Schools", description: "Supply and delivery of desks, chairs, shelves, and office furniture for 5 newly constructed schools.", budget: "ETB 2.5 Million", deadline: "2026-08-15", status: "open", image: "https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg" },
    { id: "b3", title: "Water Supply System Expansion (Phase III)", description: "Drilling of 8 boreholes and construction of distribution systems in 4 kebeles.", budget: "ETB 10 Million", deadline: "2026-09-15", status: "open", image: "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg" },
  ]);
  return (
    <SubPage onNavigate={onNavigate} title="Bids & Tenders" breadcrumb="Announcements / Bids" badge="Procurement">
      <div className="space-y-6 max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="bg-gradient-to-r from-[#0B3D2E] to-[#145A44] rounded-2xl p-6 text-white mb-4">
            <h2 className="text-xl font-bold mb-1">Active Tenders</h2>
            <p className="text-white/70 text-sm">Participate in our procurement processes. All bids must comply with federal and regional procurement guidelines.</p>
          </div>
        </AnimatedSection>
        {bids.map((bid, i) => (
          <AnimatedSection key={bid.id} delay={i * 80}>
            <Card className="border-0 shadow-md hover:shadow-xl transition-all overflow-hidden group">
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-44 h-36 sm:h-auto shrink-0 overflow-hidden">
                  <img src={bid.image} alt={bid.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/15e928c7ad4d.jpg'; }} />
                </div>
                <div className="flex-1 p-5 md:p-6 relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#EAB308] to-[#CA8A04]" />
                  <div className="flex items-center gap-2 mb-1 pl-2"><Badge className="bg-green-100 text-green-700 text-xs">Open</Badge><span className="text-xs text-[#0B3D2E]/40">Deadline: {bid.deadline}</span></div>
                  <h3 className="font-bold text-[#0B3D2E] text-base mb-2 pl-2">{bid.title}</h3>
                  <p className="text-[#0B3D2E]/60 text-sm mb-3 pl-2">{bid.description}</p>
                  <div className="flex items-center gap-4 text-xs text-[#0B3D2E]/50 pl-2"><span className="font-bold text-[#0B3D2E] text-sm">{bid.budget}</span></div>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        ))}
      </div>
    </SubPage>
  );
}

/* ─── ANNOUNCEMENTS PAGE ─────────────────────────────── */
function AnnouncementsPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const announcements = [
    { title: "Public Holiday: Ethiopian New Year (Enkutatash)", date: "2026-09-11", type: "Holiday", desc: "All woreda offices will be closed on September 11-12 for Ethiopian New Year celebrations." },
    { title: "Community Meeting: Kebele 10 Development Plan", date: "2026-07-15", type: "Meeting", desc: "Residents of Kebele 10 are invited to participate in the annual development planning meeting." },
    { title: "Vaccination Campaign: Children Under 5", date: "2026-07-20", type: "Health", desc: "A nationwide vaccination campaign will be conducted at all health posts. Parents are urged to bring their children." },
    { title: "Tax Payment Deadline Extension", date: "2026-07-30", type: "Finance", desc: "The deadline for annual land and property tax payments has been extended to July 30, 2026." },
    { title: "Road Maintenance Notice: Amhara Sayint-Dessie Road", date: "2026-07-10", type: "Infrastructure", desc: "Maintenance work on the main road to Dessie will cause temporary delays. Plan travel accordingly." },
  ];
  return (
    <SubPage onNavigate={onNavigate} title="Announcements & Events" breadcrumb="Announcements" badge="Stay Informed">
      <div className="space-y-4 max-w-4xl mx-auto">
        {announcements.map((a, i) => {
          const typeConfig: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
            Holiday: { color: "#E11D48", bg: "from-rose-500 to-pink-600", icon: Flag },
            Meeting: { color: "#6366F1", bg: "from-indigo-500 to-violet-600", icon: Users },
            Health: { color: "#059669", bg: "from-emerald-500 to-teal-600", icon: HeartPulse },
            Finance: { color: "#D97706", bg: "from-amber-500 to-orange-600", icon: Banknote },
            Infrastructure: { color: "#2563EB", bg: "from-blue-500 to-indigo-600", icon: HardHat },
          };
          const cfg = typeConfig[a.type] || { color: "#0B3D2E", bg: "from-gray-600 to-gray-800", icon: Bell };
          const TypeIcon = cfg.icon;
          return (
            <AnimatedSection key={a.title} delay={i * 60}>
              <Card className="border-0 shadow-md hover:shadow-xl transition-all overflow-hidden group">
                <div className="flex items-stretch">
                  <div className={`w-2 bg-gradient-to-b ${cfg.bg} shrink-0`} />
                  <div className="flex-1 p-5 flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center shrink-0 border border-gray-200 group-hover:shadow-md transition-all">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>{new Date(a.date).toLocaleString('en', {month:'short'})}</span>
                      <span className="text-2xl font-black leading-none mt-0.5" style={{ color: cfg.color }}>{new Date(a.date).getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${cfg.bg} text-white`}>
                          <TypeIcon className="w-3 h-3" />{a.type}
                        </span>
                      </div>
                      <h3 className="font-bold text-[#0B3D2E] text-sm mb-1">{a.title}</h3>
                      <p className="text-[#0B3D2E]/50 text-xs leading-relaxed">{a.desc}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          );
        })}
      </div>
    </SubPage>
  );
}

/* ─── GALLERY PAGE ───────────────────────────────────── */
function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);
  const images = [
    { src: "https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg", title: "Woreda Administration Building", category: "Government" },
    { src: "https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg", title: "Natural Landscape", category: "Nature" },
    { src: "https://sfile.chatglm.cn/images-ppt/10cf906e32cf.jpg", title: "Community Gathering", category: "Community" },
    { src: "https://sfile.chatglm.cn/images-ppt/4781a70c681c.jpg", title: "Infrastructure Development", category: "Infrastructure" },
    { src: "https://sfile.chatglm.cn/images-ppt/30fee1e622be.jpg", title: "Agricultural Activities", category: "Agriculture" },
    { src: "https://sfile.chatglm.cn/images-ppt/56336ff1a645.jpg", title: "Road Construction", category: "Infrastructure" },
    { src: "https://sfile.chatglm.cn/images-ppt/4db62da31bf6.png", title: "Development Planning", category: "Government" },
    { src: "https://sfile.chatglm.cn/images-ppt/ba8313230e3e.jpg", title: "Education Facilities", category: "Education" },
  ];
  const categories = ["All", ...Array.from(new Set(images.map(i => i.category)))];
  const filtered = filter === "All" ? images : images.filter(i => i.category === filter);

  return (
    <div className="min-h-screen pt-[92px] md:pt-[110px]">
      <div className="bg-gradient-to-r from-[#0B3D2E] via-[#145A44] to-[#0B3D2E] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/50 text-sm mb-2">Home / Gallery</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Photo Gallery</h1>
          <Badge className="bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/30 text-sm font-medium"><Camera className="w-4 h-4 mr-1.5" />Explore Our Woreda</Badge>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === cat ? "bg-[#0B3D2E] text-white shadow-md" : "bg-white text-[#0B3D2E]/60 hover:bg-[#0B3D2E]/10 border border-gray-200"}`}>{cat}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <AnimatedSection key={img.src} delay={i * 50}>
              <div onClick={() => setSelected(img.src)} className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-square">
                <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://sfile.chatglm.cn/images-ppt/6c328167366f.jpg'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h3 className="text-white font-bold text-sm">{img.title}</h3>
                  <Badge className="bg-white/20 text-white text-[10px] w-fit mt-1">{img.category}</Badge>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white" onClick={() => setSelected(null)}><X className="w-8 h-8" /></button>
          <img src={selected} alt="Gallery" className="max-w-full max-h-[85vh] rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

/* ─── CONTACT PAGE ───────────────────────────────────── */
function ContactPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "", subject: "", message: "" });

  const SERVICE_CATEGORIES = [
    "General Inquiry",
    "Education Service",
    "Health Service",
    "Agriculture Support",
    "Water & Sanitation",
    "Road & Transport",
    "Justice & Security",
    "Finance & Revenue",
    "Trade & Commerce",
    "Construction",
    "Technology & ICT",
    "Job Vacancy",
    "Bid & Tender",
    "Land Administration",
    "Environmental Protection",
    "Women & Youth Affairs",
    "Complaint / Feedback",
    "Other",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setFormStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: `[${form.category}] ${form.subject}` }),
      });
      if (res.ok) {
        setFormStatus("success");
        setForm({ name: "", email: "", phone: "", category: "", subject: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
    setTimeout(() => setFormStatus("idle"), 4000);
  };

  return (
    <SubPage onNavigate={onNavigate} title="Contact Us" breadcrumb="Contact" badge="Get in Touch">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">

          {/* ── LEFT: Contact Info (existing) ─────────────── */}
          <ContentCard>
            <h2 className="text-lg font-bold text-[#0B3D2E] mb-5 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#EAB308]" /> Contact Information
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D2E]/5 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-[#0B3D2E]" /></div>
                <div><h4 className="font-bold text-[#0B3D2E] text-sm">Phone</h4><p className="text-[#0B3D2E]/60 text-sm">+251 33 440 1001 (Main)</p><p className="text-[#0B3D2E]/60 text-sm">+251 912 465 247 (Developer)</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D2E]/5 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-[#0B3D2E]" /></div>
                <div><h4 className="font-bold text-[#0B3D2E] text-sm">Email</h4><p className="text-[#0B3D2E]/60 text-sm">info@amharasint.gov.et</p></div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B3D2E]/5 flex items-center justify-center shrink-0"><MapPinned className="w-5 h-5 text-[#0B3D2E]" /></div>
                <div><h4 className="font-bold text-[#0B3D2E] text-sm">Address</h4><p className="text-[#0B3D2E]/60 text-sm">Amhara Sayint Town, South Wollo Zone, Amhara Region, Ethiopia</p></div>
              </div>
            </div>

            <h4 className="font-bold text-[#0B3D2E] text-sm mb-3">Follow Us</h4>
            <div className="flex gap-3 mb-6">
              {[
                { I: Facebook, label: "Facebook", url: "https://facebook.com/100066823706013", c: "#1877F2" },
                { I: Youtube, label: "YouTube", url: "https://youtube.com/@AmharaSint", c: "#FF0000" },
                { I: Twitter, label: "Telegram", url: "https://t.me/AmharaSint", c: "#0088CC" },
                { I: Instagram, label: "Instagram", url: "https://facebook.com/100066823706013", c: "#E4405F" },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl flex items-center justify-center transition-all hover:scale-110 shadow-md"
                  style={{ backgroundColor: s.c + "15", color: s.c }}><s.I className="w-5 h-5" /></a>
              ))}
            </div>

            <div className="bg-[#F0FDF4] rounded-xl p-4 border border-[#0B3D2E]/5">
              <h4 className="font-bold text-[#0B3D2E] text-sm mb-2">🕐 Office Hours</h4>
              <p className="text-[#0B3D2E]/60 text-xs">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-[#0B3D2E]/60 text-xs">Saturday: 8:00 AM - 12:00 PM</p>
              <p className="text-[#0B3D2E]/60 text-xs">Sunday & Public Holidays: Closed</p>
            </div>

            {/* Service categories quick list */}
            <div className="mt-5">
              <h4 className="font-bold text-[#0B3D2E] text-sm mb-3">📋 Available Services</h4>
              <div className="flex flex-wrap gap-1.5">
                {["Education", "Health", "Agriculture", "Water", "Transport", "Justice", "Finance", "Trade", "Construction", "ICT"].map(s => (
                  <span key={s} className="bg-[#0B3D2E]/5 text-[#0B3D2E]/70 text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#0B3D2E]/10">{s}</span>
                ))}
              </div>
            </div>
          </ContentCard>

          {/* ── RIGHT: Service Request Form ────────────────── */}
          <ContentCard>
            <h2 className="text-lg font-bold text-[#0B3D2E] mb-5 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#EAB308]" /> Send a Message / Service Request
            </h2>

            {formStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-emerald-700 text-lg">Message Sent!</h3>
                <p className="text-sm text-gray-500">We received your message and will respond within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Full Name *</label>
                    <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Your full name" required
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-600">Phone</label>
                    <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+251 9XX XXX XXX"
                      className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com" required
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Service Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]">
                    <option value="">— Select a category —</option>
                    {SERVICE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Subject */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Subject</label>
                  <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    placeholder="Brief subject of your message"
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-600">Message *</label>
                  <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Describe your request or question in detail..." required rows={5}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] resize-none" />
                </div>

                {formStatus === "error" && (
                  <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">Failed to send. Please try again.</p>
                )}

                <button type="submit" disabled={formStatus === "loading" || !form.name || !form.email || !form.message || !form.category}
                  className="w-full h-11 bg-[#0B3D2E] hover:bg-[#145A44] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                  {formStatus === "loading" ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Message</>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400">We will respond within 2 business days</p>
              </form>
            )}
          </ContentCard>

        </div>
      </div>
    </SubPage>
  );
}

/* ─── SUBMIT CV / DOCUMENT PAGE ─────────────────────── */
function SubmitCVPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [formStatus, setFormStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [docType, setDocType] = useState("cv");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("uploading");
    try {
      const fd = new FormData(e.currentTarget);
      const cvFile = fd.get("document") as File;

      // Upload file to server
      let storedName: string | null = null;
      if (cvFile && cvFile.size > 0) {
        const uploadFd = new FormData();
        uploadFd.append("file", cvFile);
        const res = await fetch("/admin/api/upload", { method: "POST", body: uploadFd });
        const uploadData = await res.json();
        storedName = uploadData.storedName || null;
      }

      const submission = {
        id: "doc_" + Date.now(),
        fullName: fd.get("fullName") as string,
        email: fd.get("email") as string,
        phone: fd.get("phone") as string,
        documentType: docType,
        department: fd.get("department") as string,
        message: fd.get("message") as string,
        documentName: cvFile?.name || "Not provided",
        documentFile: storedName,
        submittedAt: new Date().toISOString(),
        status: "Under Review",
      };

      // Save to server
      try {
        await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submission),
        });
      } catch {}

      // Save locally too
      try {
        const existing = JSON.parse(localStorage.getItem("amharasint_applications") || "[]");
        existing.push(submission);
        localStorage.setItem("amharasint_applications", JSON.stringify(existing));
      } catch {}

      setFormStatus("success");
      (e.target as HTMLFormElement).reset();
      setDocType("cv");
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch { setFormStatus("error"); }
  };

  return (
    <SubPage onNavigate={onNavigate} title="Submit CV & Documents" breadcrumb="Careers / Submit CV" badge="Join Our Team">
      <div className="max-w-2xl mx-auto space-y-6">
        <AnimatedSection>
          <div className="bg-gradient-to-r from-[#0B3D2E] to-[#145A44] rounded-2xl p-6 md:p-8 text-white">
            <h2 className="text-xl font-extrabold mb-2">Submit Your CV or Documents</h2>
            <p className="text-white/70 text-sm">You can submit your CV, resume, cover letter, or other documents to Amhara Sayint Woreda Administration. We will keep your information on file for future opportunities.</p>
          </div>
        </AnimatedSection>

        {formStatus === "success" && (
          <ContentCard>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3"><ThumbsUp className="w-7 h-7 text-green-600" /></div>
              <h3 className="font-bold text-green-800 text-lg mb-1">Document Submitted Successfully!</h3>
              <p className="text-green-600 text-sm">Thank you for your submission. We will review your documents and contact you if there is a matching opportunity.</p>
            </div>
          </ContentCard>
        )}

        <ContentCard>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-bold text-[#0B3D2E] mb-4 flex items-center gap-2 text-base"><User className="w-5 h-5 text-[#EAB308]" /> Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-semibold text-[#0B3D2E]/70 mb-1.5">Full Name *</label><input name="fullName" required className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="Enter your full name" /></div>
                <div><label className="block text-xs font-semibold text-[#0B3D2E]/70 mb-1.5">Email Address *</label><input name="email" type="email" required className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="your.email@example.com" /></div>
                <div><label className="block text-xs font-semibold text-[#0B3D2E]/70 mb-1.5">Phone Number *</label><input name="phone" type="tel" required className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white" placeholder="+251 9XX XXX XXX" /></div>
                <div><label className="block text-xs font-semibold text-[#0B3D2E]/70 mb-1.5">Preferred Department</label>
                  <select name="department" className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white">
                    <option value="">General / Any</option>
                    <option>Education Office</option>
                    <option>Health Office</option>
                    <option>Agriculture Office</option>
                    <option>Finance & Revenue</option>
                    <option>ICT & Technology</option>
                    <option>Construction</option>
                    <option>Transport</option>
                    <option>Water & Sanitation</option>
                    <option>Justice & Security</option>
                    <option>Trade & Commerce</option>
                    <option>Administration</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#0B3D2E] mb-4 flex items-center gap-2 text-base"><FileText className="w-5 h-5 text-[#EAB308]" /> Document Type</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { value: "cv", label: "CV / Resume", icon: "📄" },
                  { value: "cover-letter", label: "Cover Letter", icon: "✉️" },
                  { value: "application", label: "Application Form", icon: "📋" },
                  { value: "other", label: "Other Document", icon: "📎" },
                ].map(t => (
                  <button key={t.value} type="button" onClick={() => setDocType(t.value)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${docType === t.value ? "border-[#0B3D2E] bg-[#0B3D2E]/5 text-[#0B3D2E]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                    <span>{t.icon}</span>{t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#0B3D2E] mb-4 flex items-center gap-2 text-base"><Upload className="w-5 h-5 text-[#EAB308]" /> Upload Document *</h3>
              <div>
                <label className="block text-xs font-semibold text-[#0B3D2E]/70 mb-1.5">Upload your document (PDF, DOC, DOCX - max 10MB) *</label>
                <input name="document" type="file" accept=".pdf,.doc,.docx" required
                  className="w-full h-14 px-3 rounded-xl border-2 border-dashed border-gray-200 text-sm file:mr-3 file:py-2 file:px-5 file:rounded-lg file:border-0 file:bg-[#0B3D2E] file:text-white file:text-xs file:font-semibold file:cursor-pointer hover:border-[#0B3D2E]/30 transition-all bg-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#0B3D2E] mb-4 flex items-center gap-2 text-base"><MessageSquare className="w-5 h-5 text-[#EAB308]" /> Additional Message</h3>
              <textarea name="message" rows={3} placeholder="Any additional information or message you would like to include (optional)"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] transition-all bg-white resize-none" />
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <button type="submit" disabled={formStatus === "uploading"}
                className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] disabled:bg-gray-300 text-[#0B3D2E] font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed">
                {formStatus === "uploading" ? "Uploading..." : <><Send className="w-4 h-4" /> Submit Document</>}
              </button>
              <button type="button" onClick={() => onNavigate("vacancy")} className="text-sm text-[#0B3D2E]/50 hover:text-[#0B3D2E] transition-colors">View Open Vacancies Instead</button>
            </div>
          </form>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── FOOTER ─────────────────────────────────────────── */
function Footer({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <footer className="bg-[#062B1F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 md:py-14">
        <div className="grid md:grid-cols-4 gap-10 lg:gap-14">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Logo" className="h-16 w-auto rounded-xl" />
              <div><h3 className="text-white font-bold text-lg">Amhara Sayint</h3><p className="text-[#86EFAC] text-xs">Woreda Administration</p></div>
            </div>
            <p className="text-white/40 text-xs leading-relaxed mb-4">Dedicated to transparent governance and community development in South Wollo Zone, Amhara Region.</p>
            <div className="flex gap-2.5 mb-5">
              {[
                { I: Facebook, u: "https://facebook.com/100066823706013", label: "Facebook", bg: "#1877F2" },
                { I: Youtube, u: "https://youtube.com/@AmharaSint", label: "YouTube", bg: "#FF0000" },
                { I: Twitter, u: "https://t.me/AmharaSint", label: "Telegram", bg: "#0088CC" },
                { I: Instagram, u: "https://instagram.com/AmharaSint", label: "Instagram", bg: "#E4405F" },
                { I: Linkedin, u: "https://www.linkedin.com/in/meseret-akalu-76363121b/", label: "LinkedIn", bg: "#0A66C2" },
              ].map((s) => (
                <a key={s.u} href={s.u} target="_blank" rel="noopener noreferrer" title={s.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/40 transition-all duration-300 hover:scale-110 hover:text-white hover:shadow-lg"
                  style={{ backgroundColor: `${s.bg}15` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = s.bg; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 15px ${s.bg}40`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = `${s.bg}15`; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}>
                  <s.I className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "About", links: [{ l: "History", h: "about-history" as PageId }, { l: "Overview", h: "about-overview" as PageId }, { l: "Location", h: "about-location" as PageId }] },
            { title: "Government", links: [{ l: "Leadership", h: "gov-leadership" as PageId }, { l: "Structure", h: "gov-structure" as PageId }, { l: "Offices", h: "gov-offices" as PageId }] },
            { title: "Quick Links", links: [{ l: "Vacancies", h: "vacancy" as PageId }, { l: "News", h: "news-news" as PageId }, { l: "Contact", h: "contact" as PageId }, { l: "Gallery", h: "gallery" as PageId }] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-bold text-sm mb-5">{col.title}</h4>
              <ul className="space-y-3">{col.links.map((link) => (
                <li key={link.h}><button onClick={() => { onNavigate(link.h); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-white/40 hover:text-white text-[13px] transition-colors py-0.5">{link.l}</button></li>
              ))}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">2026 Amhara Sayint Woreda Administration. All rights reserved.</p>
          <p className="text-white/30 text-sm">Developed by <span className="text-[#86EFAC]">Meseret Akalu</span> | +251 912 465 247</p>
          <a href="/admin" className="text-white/30 hover:text-[#86EFAC] text-xs font-medium transition-colors flex items-center gap-1.5" title="Admin Panel">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Admin Panel
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── SCROLL TO TOP ─────────────────────────────────── */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => { const h = () => setShow(window.scrollY > 400); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#0B3D2E] hover:bg-[#145A44] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/10" aria-label="Scroll to top">
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

/* ─── PAGE ROUTER ───────────────────────────────────── */
function PageContent({ currentPage, onNavigate }: { currentPage: PageId; onNavigate: (p: PageId) => void }) {
  switch (currentPage) {
    case "about-history": return <AboutHistoryPage onNavigate={onNavigate} />;
    case "about-overview": return <AboutOverviewPage onNavigate={onNavigate} />;
    case "about-location": return <AboutLocationPage onNavigate={onNavigate} />;
    case "gov-leadership": return <GovLeadershipPage onNavigate={onNavigate} />;
    case "gov-structure": return <GovStructurePage onNavigate={onNavigate} />;
    case "gov-offices": return <GovOfficesPage onNavigate={onNavigate} />;
    case "svc-education": return <ServiceEducationPage onNavigate={onNavigate} />;
    case "svc-health": return <ServiceHealthPage onNavigate={onNavigate} />;
    case "svc-agriculture": return <ServiceAgriculturePage onNavigate={onNavigate} />;
    case "svc-trade": return <ServiceTradePage onNavigate={onNavigate} />;
    case "svc-technology": return <ServiceTechnologyPage onNavigate={onNavigate} />;
    case "svc-construction": return <ServiceConstructionPage onNavigate={onNavigate} />;
    case "svc-transport": return <ServiceTransportPage onNavigate={onNavigate} />;
    case "svc-water": return <ServiceWaterPage onNavigate={onNavigate} />;
    case "svc-justice": return <ServiceJusticePage onNavigate={onNavigate} />;
    case "svc-finance": return <ServiceFinancePage onNavigate={onNavigate} />;
    case "news-news": return <NewsPage onNavigate={onNavigate} />;
    case "news-bids": return <BidsPage onNavigate={onNavigate} />;
    case "news-vacancy": return <VacancyPage onNavigate={onNavigate} />;
    case "news-announcements": return <AnnouncementsPage onNavigate={onNavigate} />;
    case "gallery": return <GalleryPage />;
    case "vacancy": return <VacancyPage onNavigate={onNavigate} />;
    case "bids": return <BidsPage onNavigate={onNavigate} />;
    case "contact": return <ContactPage onNavigate={onNavigate} />;
    case "submit-cv": return <SubmitCVPage onNavigate={onNavigate} />;
    default:
      return (
        <div className="flex flex-col gap-16 md:gap-24 pb-24 bg-gray-50/30">
          <div>
            <DidYouKnowBar />
            <HeroSlider />
          </div>
          <CitizenServicesSection onNavigate={onNavigate} />
          <HomeDashboardSection onNavigate={onNavigate} />
          <PaginatedNewsSection onNavigate={onNavigate} />
          <MayorMessageSection onNavigate={onNavigate} />
          <FeaturedProjectsSection onNavigate={onNavigate} />
          <TVETCollegeSection onNavigate={onNavigate} />
          <ServicesOverviewSection onNavigate={onNavigate} />
          <CulturalPlacesSection onNavigate={onNavigate} />
          <EmergencyContactsSection />
          <GeoMapSection onNavigate={onNavigate} />
        </div>
      );
  }
}

/* ─── FLOATING SOCIAL SIDEBAR ────────────────────────── */
function SocialSidebar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const socials = [
    { I: Facebook, u: "https://facebook.com/100066823706013", label: "Facebook", bg: "#1877F2" },
    { I: Youtube, u: "https://youtube.com/@AmharaSint", label: "YouTube", bg: "#FF0000" },
    { I: Twitter, u: "https://t.me/AmharaSint", label: "Telegram", bg: "#0088CC" },
    { I: Instagram, u: "https://instagram.com/AmharaSint", label: "Instagram", bg: "#E4405F" },
    { I: Linkedin, u: "https://www.linkedin.com/in/meseret-akalu-76363121b/", label: "LinkedIn", bg: "#0A66C2" },
  ];

  useEffect(() => {
    const h = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed left-3 xl:left-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2.5">
      {socials.map((s, i) => (
        <a key={s.u} href={s.u} target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => setHovered(s.label)}
          onMouseLeave={() => setHovered(null)}
          className="group relative"
          style={{ animation: `slideInLeft 0.4s ease-out ${i * 80}ms both` }}>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 shadow-lg transition-all duration-300 hover:text-white"
            style={{
              backgroundColor: hovered === s.label ? s.bg : "#0B3D2Ecc",
              boxShadow: hovered === s.label ? `0 4px 20px ${s.bg}50` : "0 2px 10px rgba(0,0,0,0.15)",
              transform: hovered === s.label ? "translateX(6px) scale(1.1)" : "translateX(0) scale(1)",
            }}>
            <s.I className="w-[18px] h-[18px] transition-transform duration-300" style={{ transform: hovered === s.label ? "scale(1.2) rotate(-5deg)" : "scale(1)" }} />
          </div>
          <span className={`absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-xs font-bold text-white whitespace-nowrap transition-all duration-300 pointer-events-none ${hovered === s.label ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
            style={{ backgroundColor: s.bg }}>
            {s.label}
            <span className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 rotate-45" style={{ backgroundColor: s.bg }} />
          </span>
        </a>
      ))}
    </div>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────── */
export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageId>("home");
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopInfoBar onNavigate={setCurrentPage} />
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <SocialSidebar />
      <main className="flex-1">
        <PageContent currentPage={currentPage} onNavigate={setCurrentPage} />
      </main>
      <SubscribeBanner />
      <Footer onNavigate={setCurrentPage} />
      <VisitorCounter />
      <CookieConsentBanner />
      <ScrollToTop />
    </div>
  );
}
