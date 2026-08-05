"use client";
import type { PageId, NavItem } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import {
  Home as HomeIcon,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Phone,
  BookOpen,
  Globe,
  MapPin,
  UserCheck,
  Building,
  Shield,
  GraduationCap,
  HeartPulse,
  Tractor,
  Truck,
  Droplets,
  Scale,
  Banknote,
  Newspaper,
  Briefcase,
  Award,
  Calendar,
  Mail,
  Facebook,
  Send,
  Info,
  Settings,
  Bell,
  ImageIcon,
  Crown,
} from "lucide-react";

type ExtendedNavItem = NavItem & { icon?: any };

export const NAV_LINKS: ExtendedNavItem[] = [
    { label: "Home", href: "home", icon: HomeIcon },
  {
    label: "About",
    href: "about-overview",
    icon: Info,
    children: [
      { label: "History & Background", href: "about-history", icon: BookOpen },
      { label: "Overview", href: "about-overview", icon: Globe },
      { label: "Location & Geography", href: "about-location", icon: MapPin },
    ],
  },
  {
    label: "Government",
    href: "gov-leadership",
    icon: Crown,
    children: [
      { label: "Leadership", href: "gov-leadership", icon: UserCheck },
      { label: "Administrative Structure", href: "gov-structure", icon: Building },
      { label: "Offices & Departments", href: "gov-offices", icon: Shield },
    ],
  },
  {
    label: "Services",
    href: "svc-education",
    icon: Settings,
    children: [
      { label: "Education", href: "svc-education", icon: GraduationCap },
      { label: "Health", href: "svc-health", icon: HeartPulse },
      { label: "Agriculture", href: "svc-agriculture", icon: Tractor },
      { label: "Transport", href: "svc-transport", icon: Truck },
      { label: "Water & Sanitation", href: "svc-water", icon: Droplets },
      { label: "Justice & Security", href: "svc-justice", icon: Scale },
      { label: "Finance & Revenue", href: "svc-finance", icon: Banknote },
    ],
  },
  { label: "Tourism & Heritage", href: "tourism", icon: MapPin },
  { label: "Vacancy", href: "vacancy", icon: Briefcase },
  {
    label: "Announcements",
    href: "news-announcements",
    icon: Bell,
    children: [
      { label: "News", href: "news-news", icon: Newspaper },
      { label: "Bids & Tenders", href: "bids", icon: Briefcase },
      { label: "Events", href: "news-announcements", icon: Calendar },
      { label: "Announcements", href: "news-announcements", icon: Award },
    ],
  },
  { label: "Gallery", href: "gallery", icon: ImageIcon },
];

export default function Header({
  currentPage,
  onNavigate,
}: {
  currentPage: PageId;
  onNavigate: (p: PageId) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  const handleNav = (p: PageId) => {
    onNavigate(p);
    setMobileOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#0B3D2E] text-white text-xs hidden md:block relative z-[55]">
        <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/80">
              <Phone className="w-3.5 h-3.5" />
              <span>+251-33-111-XXXX</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/80">
              <Mail className="w-3.5 h-3.5" />
              <span>info@amharasayint.gov.et</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/60 text-[0.65rem] tracking-wider uppercase font-medium mr-1">
              Follow Us
            </span>
            <a
              href="#"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all hover:scale-110"
            >
              <Facebook className="w-3 h-3 text-white" />
            </a>
            <a
              href="#"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all hover:scale-110"
            >
              <Send className="w-3 h-3 text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-sm ${
          scrolled ? "py-1 shadow-md" : "py-2"
        }`}
      >
        {/* Tricolor stripe effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"></div>

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8 h-[60px] md:h-[72px]">
            <button
              onClick={() => handleNav("home")}
              className="flex items-center gap-2 group shrink-0"
            >
              <img
                src="/logo.png"
                alt="Amhara Sayint Logo"
                className="h-[44px] md:h-[52px] w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div className="hidden sm:block text-left leading-tight">
                <span className="text-[#0B3D2E] font-extrabold text-base md:text-lg tracking-wide uppercase">
                  Amhara Sayint
                </span>
                <br />
                <span className="text-[0.6rem] tracking-[0.1em] text-gray-500 uppercase font-semibold">
                  Woreda Administration
                </span>
              </div>
            </button>

            <nav className="hidden xl:flex items-center gap-2 xl:gap-4 mx-auto">
              {NAV_LINKS.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.children && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => {
                      if (item.children) {
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        );
                      } else {
                        handleNav(item.href);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[0.76rem] font-semibold tracking-wide transition-all uppercase ${
                      currentPage === item.href
                        ? "bg-[#0B3D2E] text-white shadow-md"
                        : "text-[#333] hover:text-[#0B3D2E] hover:bg-[#0B3D2E]/10"
                    }`}
                  >
                    {item.icon && <item.icon className="w-3.5 h-3.5 shrink-0" />}
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {/* Mega Menu Dropdown */}
                  {item.children && openDropdown === item.label && (
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[70] overflow-hidden transition-all duration-200 animate-in fade-in slide-in-from-top-2 ${
                        item.label === "Services" ? "min-w-[600px]" : "min-w-[260px]"
                      }`}
                    >
                      <div className="bg-gradient-to-r from-[#062B1F] to-[#0B3D2E] px-4 py-3 flex items-center gap-2">
                        {item.icon && <item.icon className="w-4 h-4 text-[#EAB308]" />}
                        <span className="text-white font-bold text-sm uppercase">
                          {item.label}
                        </span>
                      </div>
                      
                      <div className={`p-3 bg-white ${item.label === "Services" ? "grid grid-cols-2 gap-2" : "flex flex-col gap-1"}`}>
                        {item.children.map((child) => (
                          <button
                            key={child.href}
                            onClick={() => handleNav(child.href)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-left transition-all group border border-transparent hover:border-[#0B3D2E]/20 hover:bg-[#0B3D2E]/5 ${
                              currentPage === child.href
                                ? "text-[#0B3D2E] bg-[#0B3D2E]/5 border-[#0B3D2E]/20 font-bold"
                                : "text-gray-700"
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                              currentPage === child.href ? "bg-[#0B3D2E]" : "bg-[#0B3D2E]/10 group-hover:bg-[#0B3D2E]"
                            }`}>
                              <child.icon className={`w-4 h-4 ${
                                currentPage === child.href ? "text-white" : "text-[#0B3D2E] group-hover:text-white"
                              }`} />
                            </div>
                            <span className="font-medium group-hover:text-[#0B3D2E] leading-tight">
                              {child.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden text-[#0B3D2E] p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="xl:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
            <nav className="max-w-[1400px] mx-auto px-4 py-3 flex flex-col gap-1">
              {NAV_LINKS.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      if (item.children) {
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        );
                      } else {
                        handleNav(item.href);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-semibold transition-all uppercase ${
                      currentPage === item.href || (item.children && openDropdown === item.label)
                        ? "text-[#0B3D2E] bg-[#0B3D2E]/10"
                        : "text-gray-700 hover:text-[#0B3D2E] hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.label}
                    </div>
                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {item.children && openDropdown === item.label && (
                    <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-gray-100 pl-2">
                      {item.children.map((child) => (
                        <button
                          key={child.href}
                          onClick={() => handleNav(child.href)}
                          className={`flex items-center gap-2.5 text-sm px-4 py-2.5 rounded-lg transition-all ${
                            currentPage === child.href
                              ? "text-[#0B3D2E] bg-[#0B3D2E]/5 font-bold"
                              : "text-gray-600 hover:text-[#0B3D2E] hover:bg-gray-50"
                          }`}
                        >
                          <child.icon className="w-4 h-4" />
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}