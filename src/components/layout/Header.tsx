"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, Facebook, Twitter, Linkedin, Instagram, Youtube, 
  Search, Sun, Moon, Menu, ChevronDown, ChevronRight, Languages,
  Home as HomeIcon, Info, Crown, Settings, Bell, PhoneCall, Newspaper,
  Briefcase, Gavel, FolderOpen, Mountain, Hotel, Baby, FileCheck,
  Building, MapPin, Receipt, Heart, Stethoscope, GraduationCap,
  Bus, Droplets, MessageSquareWarning, CalendarDays, ArrowRight, 
  ShieldCheck, Scale, Leaf, Landmark, Factory, Wheat, Lightbulb, 
  Users, Monitor, FileText, Send, Video, MessageCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useLang } from '@/lib/LangContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

type NavItem = {
  id: string;
  label: string;
  children?: NavItem[];
  items?: NavItem[];
};

export default function Header({ navItems }: { navItems: NavItem[] }) {
  const { lang, toggle } = useLang();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [accentColor, setAccentColor] = useState('#1a6b3c');
  const accentColors = [
    { color: '#1a6b3c', label: 'Government Green' },
    { color: '#0d47a1', label: 'Royal Blue' },
    { color: '#c8a415', label: 'Golden' },
    { color: '#6b21a8', label: 'Royal Purple' },
    { color: '#c62828', label: 'Heritage Red' },
  ];

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };
  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const navIcons: Record<string, React.ElementType> = {
    'HOME': HomeIcon, 'ABOUT': Info, 'MAYOR': Crown,
    'SERVICES': Settings, 'ANNOUNCEMENTS': Bell, 'CONTACT': PhoneCall,
    'News & Media': Newspaper, 'Vacancies': Briefcase, 'Bids & Tenders': Gavel,
    'City Projects': FolderOpen, 'Tourism & Culture': Mountain, 'Hotels': Hotel,
    'All Services': Settings, 'Smart City': Monitor, 
    'Structure': Building, 'Cabinet Members': Users, "Mayor's Profile": Crown,
    'Birth Registration': Baby, 'Business License': FileCheck,
    'Building Permit': Building, 'Land Services': MapPin, 'Tax Payment': Receipt,
    'Health Services': Stethoscope, 'Education': GraduationCap,
    'Transportation': Bus, 'Water & Electricity': Droplets,
    'Complaints': MessageSquareWarning, 'Appointments': CalendarDays,
  };

  const navLabel = (label: string): string => {
    if (lang === 'en') return label;
    const map: Record<string, string> = {
      'HOME': 'ዋና ገጽ', 'ABOUT': 'ስለ ከተማ', 'MAYOR': 'ከንቲባ',
      'SERVICES': 'አገልግሎቶች', 'ANNOUNCEMENTS': 'ማስታወቂያዎች', 'CONTACT': 'ያግኙን',
      'All Services': 'ሁሉም አገልግሎቶች', 'News & Media': 'ዜናዎች',
      'Vacancies': 'ክፍት ቦታዎች', 'Bids & Tenders': 'ጨረታዎች',
      'City Projects': 'የከተማ ፕሮጀክቶች', 'Tourism & Culture': 'ቱሪዝምና ባህል',
      'Hotels': 'ሆቴሎች', 'Hotels & Stay': 'ሆቴሎች',
      'Birth Registration': 'የልደት ምዝገባ',
      'Business License': 'የንግድ ፈቃድ', 'Building Permit': 'የግንባታ ፈቃድ',
      'Land Services': 'የመሬት አገልግሎቶች', 'Tax Payment': 'ግብር ክፍያ',
      'Health Services': 'የጤና አገልግሎቶች', 'Education': 'ትምህርት',
      'Transportation': 'ትራንስፖርት', 'Water & Electricity': 'ውሃና ኤሌክትሪክ',
      'Complaints & Feedback': 'ቅሬታዎች', 'Appointments': 'ቀጠሮዎች',
      "Mayor's Profile": 'የከንቲባ ፕሮፋይል', 'Cabinet Members': 'ካቢኔ አባላት',
      'About Dessie': 'ስለ ደሴ', 'Transparency': 'ግልጽነት',
      "Mayor's Office": 'የከንቲባ ቢሮ', 'Contact Us': 'ያግኙን',
      'Request Service': 'አገልግሎት ጥያቄ', 'Agriculture': 'ግብርና',
      'Digital Services': 'ዲጂታል አገልግሎቶች', 'ID & Documents': 'መታወቂያና ሰነዶች',
      'Marriage Registration': 'የጋብቻ ምዝገባ', 'Smart City': 'ስማርት ሲቲ',
      'Structure': 'መዋቅር',
    };
    return map[label] || label;
  };

  const resolveHref = (id: string, label: string) => {
    if (id === 'home' || id === 'HOME') return '/';
    if (id === 'service-detail') return `/services/${encodeURIComponent(label)}`;
    if (id === 'vacancy-detail') return `/vacancies/${encodeURIComponent(label)}`;
    if (id === 'news-detail') return `/news/${encodeURIComponent(label)}`;
    if (id === 'bids-detail') return `/bids/${encodeURIComponent(label)}`;
    if (id === 'vacancy') return '/vacancies';
    return `/${id.toLowerCase()}`;
  };

  const isActive = (id: string, label?: string) => {
    const href = resolveHref(id, label || '');
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const navigateTo = (href: string) => {
    router.push(href);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    setSearchOpen(false);
    if (q.includes('news') || q.includes('press')) navigateTo('/news');
    else if (q.includes('job') || q.includes('vacancy')) navigateTo('/vacancies');
    else if (q.includes('bid') || q.includes('tender')) navigateTo('/bids');
    else if (q.includes('hotel') || q.includes('stay')) navigateTo('/hotels');
    else if (q.includes('service') || q.includes('license')) navigateTo('/services');
    else if (q.includes('mayor') || q.includes('cabinet')) navigateTo('/mayor');
    else if (q.includes('project')) navigateTo('/projects');
    else if (q.includes('about')) navigateTo('/about');
    else if (q.includes('contact')) navigateTo('/contact');
    else if (q.includes('tourism')) navigateTo('/tourism');
    else navigateTo('/services');
  };

  return (
    <>
      <div className="bg-[#0d4a28] text-white text-xs hidden md:block relative z-[55]">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/60">
              <Phone className="w-3 h-3" />
              <span>+251-33-111-XXXX</span>
            </span>
            <span className="flex items-center gap-1.5 text-white/60">
              <Mail className="w-3 h-3" />
              <span>info@dessiecity.gov.et</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-[0.65rem] tracking-wider uppercase font-medium mr-1">Follow Us</span>
            {[
              { Icon: Facebook, href: 'https://www.facebook.com/DessieCityAdministrationCommunicationAffairsOffice/' },
              { Icon: Send, href: 'https://t.me/dessiecityadminstration' },
              { Icon: Video, href: 'https://vm.tiktok.com/ZMkdcEx16/' },
              { Icon: Youtube, href: 'https://youtu.be/y5y5l_PaKfM?si=inJ8KYCEipJ6pDWBb' },
              { Icon: Twitter, href: 'https://twitter.com/Dessieadmcom?s=09' },
              { Icon: MessageCircle, href: 'https://chat.whatsapp.com/CosS5afsqLH1OtlwPaNrNa' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/meseret-akalu-76363121b/' }
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all hover:scale-110">
                <Icon className="w-3 h-3 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 !bg-[#ffffff] shadow-sm">
        <div className="tricolor-stripe" />
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0 cursor-pointer">
            <Image src="/official-logo.png" alt="Dessie City Administration Logo" width={150} height={56} className="h-12 md:h-14 w-auto object-contain" priority />
            <div className="leading-tight hidden sm:block">
              <span className="text-[#0d4a28] font-extrabold text-base md:text-lg tracking-wide">DESSIE</span>
              <br />
              <span className="text-[0.55rem] md:text-[0.6rem] tracking-[0.1em] text-[#555] uppercase font-semibold">City Administration</span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5 ml-auto">
            {navItems.map((item) => {
              const NavIcon = navIcons[item.label] || HomeIcon;
              const hasDropdown = (item.children && item.children.length > 0) || (item.items && item.items.length > 0);
              const subItems = item.children || item.items || [];
              const isCurrent = isActive(item.id, item.label);
              
              return (
                <div key={item.label} className="relative"
                  onMouseEnter={() => (hasDropdown || item.label === 'CONTACT') ? handleDropdownEnter(item.label) : undefined}
                  onMouseLeave={() => (hasDropdown || item.label === 'CONTACT') ? handleDropdownLeave() : undefined}>
                  <Link href={resolveHref(item.id, item.label)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[0.76rem] font-semibold transition-all ${isCurrent ? 'text-white bg-[#1a6b3c] shadow-md' : 'text-[#333] hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/8'}`}>
                    <NavIcon className="w-3.5 h-3.5 shrink-0" />
                    {navLabel(item.label)}
                    {(hasDropdown || item.label === 'CONTACT') && <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Desktop dropdown panel — force-show for CONTACT even if hasDropdown=false */}
                  {(hasDropdown || item.label === 'CONTACT') && (
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-[#e2e8e0] rounded-2xl shadow-2xl z-[70] overflow-hidden transition-all duration-200 origin-top ${openDropdown === item.label ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`} style={{ minWidth: item.label === 'SERVICES' ? '700px' : item.label === 'CONTACT' ? '440px' : '240px' }} onMouseEnter={() => handleDropdownEnter(item.label)} onMouseLeave={() => handleDropdownLeave()}>
                      <div className="bg-gradient-to-r from-[#0d4a28] to-[#1a6b3c] px-4 py-3 flex items-center gap-2">
                        <NavIcon className="w-4 h-4 text-[#c8a415]" />
                        <span className="text-white font-bold text-sm">{navLabel(item.label)}</span>
                      </div>

                      {item.label === 'CONTACT' ? (
                        <div className="flex bg-white">
                          <div className="w-2/5 relative shrink-0 min-h-[200px]">
                            <img src="/dessie-city-hall-day.png" alt="Contact Dessie" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d4a28]/90 via-[#0d4a28]/40 to-transparent flex flex-col justify-end p-4">
                              <span className="text-white font-bold text-[0.85rem] leading-tight">Get in Touch</span>
                              <span className="text-white/80 text-[0.7rem] mt-1">+251-33-111-XXXX</span>
                              <span className="text-white/60 text-[0.65rem]">info@dessiecity.gov.et</span>
                            </div>
                          </div>
                          <div className="w-3/5 p-2 bg-slate-50/50 flex flex-col gap-0.5">
                            {[
                              { label: 'Contact Us',       id: 'contact',  icon: PhoneCall },
                              { label: 'Send Message',     id: 'contact',  icon: Send },
                              { label: 'Request Service',  id: 'services', icon: Settings },
                              { label: 'Report a Problem', id: 'contact',  icon: MessageSquareWarning },
                              { label: 'Find Our Office',  id: 'contact',  icon: MapPin },
                            ].map(ci => {
                              const CIcon = ci.icon;
                              return (
                                <Link key={ci.label} href={resolveHref(ci.id, ci.label)} onClick={() => setOpenDropdown(null)}
                                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all hover:bg-white hover:shadow-sm group border border-transparent hover:border-gray-100">
                                  <div className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-[#1a6b3c] flex items-center justify-center shrink-0 transition-all">
                                    <CIcon className="w-3.5 h-3.5 text-[#0d4a28] group-hover:text-white" />
                                  </div>
                                  <span className="font-medium text-gray-700 group-hover:text-[#1a6b3c] text-[13px]">{navLabel(ci.label)}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ) : item.label === 'SERVICES' ? (
                        <div className="p-3 grid grid-cols-2 gap-2 min-w-[320px] bg-white">
                          {[
                            { label: 'Education', icon: GraduationCap, href: '/services/education' },
                            { label: 'Agriculture', icon: Wheat, href: '/services/agriculture' },
                            { label: 'Health', icon: Stethoscope, href: '/services/health' },
                            { label: 'Trade & Industry', icon: Factory, href: '/services/trade' },
                            { label: 'Infrastructure', icon: Building, href: '/services/infrastructure' },
                            { label: 'Land & Housing', icon: MapPin, href: '/services/land' },
                            { label: 'Civil Services', icon: Heart, href: '/services/civil' },
                            { label: 'Finance & Taxes', icon: Receipt, href: '/services/finance' },
                            { label: 'Utilities', icon: Droplets, href: '/services/utilities' },
                            { label: 'Social & Tourism', icon: Users, href: '/services/social' },
                          ].map((svc) => (
                            <Link key={svc.label} href={svc.href} onClick={() => setOpenDropdown(null)} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-left transition-all hover:bg-[#1a6b3c]/8 hover:text-[#1a6b3c] group border border-transparent hover:border-[#1a6b3c]/20">
                              <div className="w-8 h-8 rounded-lg bg-[#0d4a28]/8 group-hover:bg-[#1a6b3c] flex items-center justify-center shrink-0 transition-all">
                                <svc.icon className="w-4 h-4 text-[#0d4a28] group-hover:text-white" />
                              </div>
                              <span className="font-medium text-gray-700 group-hover:text-[#1a6b3c] leading-tight">{navLabel(svc.label)}</span>
                            </Link>
                          ))}
                        </div>
                      ) : item.label === 'ABOUT' ? (
                        <div className="flex bg-white min-w-[450px]">
                           <div className="w-2/5 relative shrink-0">
                              <Image src="/dessie-city-hall.png" alt="Dessie" fill className="object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0d4a28]/90 via-[#0d4a28]/40 to-transparent flex flex-col justify-end p-4">
                                 <span className="text-white font-bold text-[0.85rem] leading-tight shadow-sm">Discover Dessie City</span>
                                 <span className="text-white/80 text-[0.65rem] mt-1 font-medium">Heart of South Wollo</span>
                              </div>
                           </div>
                           <div className="w-3/5 p-2 bg-slate-50/50">
                             {subItems.map((child) => {
                               const ChildIcon = navIcons[child.label] || FileText;
                               return (
                                 <Link key={child.label} href={resolveHref(child.id, child.label)} onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all hover:bg-white hover:shadow-sm hover:text-[#1a6b3c] group border border-transparent hover:border-gray-100">
                                   <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-[#1a6b3c] flex items-center justify-center shrink-0 transition-all">
                                     <ChildIcon className="w-4 h-4 text-[#0d4a28] group-hover:text-white" />
                                   </div>
                                   <span className="font-medium text-gray-700 group-hover:text-[#1a6b3c]">{navLabel(child.label)}</span>
                                 </Link>
                               );
                             })}
                           </div>
                        </div>
                      ) : item.label === 'MAYOR' ? (
                        <div className="flex bg-white min-w-[450px]">
                           <div className="w-2/5 relative shrink-0">
                              <Image src="/mayor-photo.png" alt="Mayor" fill className="object-cover object-top" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0d4a28]/90 via-[#0d4a28]/20 to-transparent flex flex-col justify-end p-4">
                                 <span className="text-white font-bold text-[0.85rem] leading-tight shadow-sm">Office of the Mayor</span>
                                 <span className="text-white/80 text-[0.65rem] mt-1 font-medium">Leadership & Vision</span>
                              </div>
                           </div>
                           <div className="w-3/5 p-3 bg-slate-50/50 flex flex-col gap-4">
                             {/* Leadership Section */}
                             <div>
                               <div className="text-[0.65rem] font-bold text-[#1a6b3c]/70 uppercase tracking-wider px-2 mb-1.5">Leadership & Vision</div>
                               <div className="space-y-1">
                                 {subItems.filter((child: any) => child.label === "Mayor's Profile" || child.label === "Smart City").map((child: any) => {
                                   const ChildIcon = navIcons[child.label] || FileText;
                                   return (
                                     <Link key={child.label} href={resolveHref(child.id, child.label)} onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all hover:bg-white hover:shadow-sm hover:text-[#1a6b3c] group border border-transparent hover:border-gray-100">
                                       <div className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-[#1a6b3c] flex items-center justify-center shrink-0 transition-all">
                                         <ChildIcon className="w-3.5 h-3.5 text-[#0d4a28] group-hover:text-white" />
                                       </div>
                                       <span className="font-medium text-gray-700 group-hover:text-[#1a6b3c]">{navLabel(child.label)}</span>
                                     </Link>
                                   );
                                 })}
                               </div>
                             </div>
                             
                             {/* Administration Section (Cabinet & Structure) */}
                             <div>
                               <div className="text-[0.65rem] font-bold text-[#1a6b3c]/70 uppercase tracking-wider px-2 mb-1.5">City Administration</div>
                               <div className="space-y-1">
                                 {subItems.filter((child: any) => child.label === "Structure" || child.label === "Cabinet Members").map((child: any) => {
                                   const ChildIcon = navIcons[child.label] || FileText;
                                   return (
                                     <Link key={child.label} href={resolveHref(child.id, child.label)} onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all hover:bg-white hover:shadow-sm hover:text-[#1a6b3c] group border border-transparent hover:border-gray-100">
                                       <div className="w-7 h-7 rounded-full bg-white shadow-sm border border-gray-100 group-hover:bg-[#1a6b3c] flex items-center justify-center shrink-0 transition-all">
                                         <ChildIcon className="w-3.5 h-3.5 text-[#0d4a28] group-hover:text-white" />
                                       </div>
                                       <span className="font-medium text-gray-700 group-hover:text-[#1a6b3c]">{navLabel(child.label)}</span>
                                     </Link>
                                   );
                                 })}
                               </div>
                             </div>
                           </div>
                        </div>
                      ) : (
                        <div className="p-2">
                          {subItems.map((child) => {
                            const ChildIcon = navIcons[child.label] || FileText;
                            return (
                              <Link key={child.label} href={resolveHref(child.id, child.label)} onClick={() => setOpenDropdown(null)} className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all hover:bg-[#1a6b3c]/8 hover:text-[#1a6b3c] group">
                                <div className="w-8 h-8 rounded-xl bg-[#0d4a28]/8 group-hover:bg-[#1a6b3c] flex items-center justify-center shrink-0 transition-all">
                                  <ChildIcon className="w-4 h-4 text-[#0d4a28] group-hover:text-white" />
                                </div>
                                <span className="font-medium text-gray-700 group-hover:text-[#1a6b3c]">{navLabel(child.label)}</span>
                                <ChevronRight className="w-3.5 h-3.5 ml-auto text-gray-400 group-hover:text-[#1a6b3c]" />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Search className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Search className="w-5 h-5 text-[#0d4a28]" /> Search Dessie City
                        </h3>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} placeholder="Search services, news, vacancies, bids..." className="pl-10 h-12 text-base" autoFocus />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>
            </TooltipProvider>


            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle dark mode">
                    {theme === 'dark' ? <Sun className="w-4 h-4 text-[#c8a415]" /> : <Moon className="w-4 h-4 text-[#1a6b3c]" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Theme</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="xl:hidden h-11 w-11">
                  <Menu className="w-6 h-6" style={{ color: accentColor }} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 pt-10 overflow-y-auto">

                <nav className="flex flex-col gap-0.5">
                  {navItems.map((item) => {
                    const NavIcon = navIcons[item.label] || HomeIcon;
                    const hasDropdown = (item.children && item.children.length > 0) || (item.items && item.items.length > 0);
                    return (
                      <div key={item.label} className="flex flex-col">
                        <button onClick={() => hasDropdown ? setOpenDropdown(openDropdown === item.label ? null : item.label) : navigateTo(resolveHref(item.id, item.label))} className={`w-full px-3 py-3 text-left flex items-center gap-3 rounded-xl transition-colors ${isActive(item.id) ? 'text-white bg-[#1a6b3c] font-semibold' : 'text-gray-700 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/8'}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive(item.id) ? 'bg-white/20' : 'bg-[#0d4a28]/10'}`}>
                            <NavIcon className={`w-4 h-4 ${isActive(item.id) ? 'text-white' : 'text-[#0d4a28]'}`} />
                          </div>
                          <span className="flex-1 text-sm font-medium">{navLabel(item.label)}</span>
                          {hasDropdown && <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />}
                        </button>
                        
                        {/* Mobile Submenu Rendering */}
                        {hasDropdown && openDropdown === item.label && (
                          <div className="flex flex-col gap-1 pl-11 pr-2 py-2 mt-1">
                            {item.label === 'SERVICES' ? (
                              [
                                { label: 'Education', icon: GraduationCap, href: '/services/education' },
                                { label: 'Agriculture', icon: Wheat, href: '/services/agriculture' },
                                { label: 'Health', icon: Stethoscope, href: '/services/health' },
                                { label: 'Trade & Industry', icon: Factory, href: '/services/trade' },
                                { label: 'Infrastructure', icon: Building, href: '/services/infrastructure' },
                                { label: 'Land & Housing', icon: MapPin, href: '/services/land' },
                                { label: 'Civil Services', icon: Heart, href: '/services/civil' },
                                { label: 'Finance & Taxes', icon: Receipt, href: '/services/finance' },
                                { label: 'Utilities', icon: Droplets, href: '/services/utilities' },
                                { label: 'Social & Tourism', icon: Users, href: '/services/social' },
                              ].map((svc) => (
                                <button key={svc.label} onClick={() => navigateTo(svc.href)} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5 rounded-lg flex items-center gap-2.5 transition-colors">
                                  <svc.icon className="w-3.5 h-3.5 text-[#0d4a28]/70" />
                                  <span className="font-medium">{navLabel(svc.label)}</span>
                                </button>
                              ))
                            ) : (
                              (item.children || item.items || []).map((child) => {
                                const ChildIcon = navIcons[child.label] || FileText;
                                return (
                                  <button key={child.label} onClick={() => navigateTo(resolveHref(child.id, child.label))} className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-[#1a6b3c] hover:bg-[#1a6b3c]/5 rounded-lg flex items-center gap-2.5 transition-colors">
                                    <ChildIcon className="w-3.5 h-3.5 text-[#0d4a28]/70" />
                                    <span className="font-medium">{navLabel(child.label)}</span>
                                  </button>
                                );
                              })
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
