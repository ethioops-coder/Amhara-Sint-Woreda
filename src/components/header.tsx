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
} from "lucide-react";

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "home" },
  {
    label: "About",
    href: "about-overview",
    children: [
      { label: "History & Background", href: "about-history", icon: BookOpen },
      { label: "Overview", href: "about-overview", icon: Globe },
      { label: "Location & Geography", href: "about-location", icon: MapPin },
    ],
  },
  {
    label: "Government",
    href: "gov-leadership",
    children: [
      { label: "Leadership", href: "gov-leadership", icon: UserCheck },
      { label: "Administrative Structure", href: "gov-structure", icon: Building },
      { label: "Offices & Departments", href: "gov-offices", icon: Shield },
    ],
  },
  {
    label: "Services",
    href: "svc-education",
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
  { label: "Vacancy", href: "vacancy" },
  {
    label: "Announcements",
    href: "news-announcements",
    children: [
      { label: "News", href: "news-news", icon: Newspaper },
      { label: "Bids & Tenders", href: "bids", icon: Briefcase },
      { label: "Events", href: "news-announcements", icon: Calendar },
      { label: "Announcements", href: "news-announcements", icon: Award },
    ],
  },
  { label: "Gallery", href: "gallery" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B3D2E] shadow-lg shadow-black/20"
          : "bg-gradient-to-r from-[#062B1F] via-[#0B3D2E] to-[#145A44]"
      }`}
    >
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-[68px] md:h-[80px]">
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 group shrink-0"
          >
            <img
              src="/logo.png"
              alt="Amhara Sint Woreda Logo"
              className="h-[52px] w-auto rounded-xl shadow-lg group-hover:scale-105 transition-transform object-contain ring-2 ring-white/20"
            />
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-base md:text-lg leading-tight">
                Amhara Sint
              </h1>
              <p className="text-[#86EFAC] text-[10px] md:text-xs font-medium -mt-0.5">
                Woreda Administration
              </p>
            </div>
          </button>

          <nav className="hidden lg:flex items-center justify-center flex-1 gap-1 xl:gap-2 mx-auto">
            {NAV_LINKS.map((item) => (
              <div
                key={item.label}
                className="relative"
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
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] xl:text-sm font-semibold tracking-wide transition-all duration-200 ${
                    currentPage === item.href
                      ? "text-[#EAB308] bg-white/10 shadow-sm"
                      : "text-white/80 hover:text-white hover:bg-white/10 hover:shadow-sm"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {item.children && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-[#0B3D2E] border border-white/15 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-[100]">
                    {item.children.map((child) => (
                      <button
                        key={child.href}
                        onClick={() => handleNav(child.href)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 ${
                          currentPage === child.href
                            ? "text-[#EAB308] bg-white/10"
                            : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
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
            <button
              onClick={() => handleNav("contact")}
              className="hidden md:inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
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
                  className="w-full flex items-center justify-between text-white/80 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                {item.children && openDropdown === item.label && (
                  <div className="ml-4 mt-1 flex flex-col gap-1">
                    {item.children.map((child) => (
                      <button
                        key={child.href}
                        onClick={() => handleNav(child.href)}
                        className={`flex items-center gap-2.5 text-sm px-4 py-2 rounded-lg transition-all ${
                          currentPage === child.href
                            ? "text-[#EAB308] bg-white/10"
                            : "text-white/60 hover:text-white hover:bg-white/5"
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
            <button
              onClick={() => handleNav("contact")}
              className="flex items-center justify-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-semibold text-sm px-4 py-2.5 rounded-lg mt-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}