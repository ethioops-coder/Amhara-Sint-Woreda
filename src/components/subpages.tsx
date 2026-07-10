"use client";
import { useState, useEffect, useRef } from "react";
import {
  ChevronRight, BookOpen, Globe, MapPin, TreePine, Landmark, UserCheck, Building, Shield,
  GraduationCap, HeartPulse, Tractor, Truck, Droplets, Scale, Banknote, Newspaper, Briefcase,
  Award, PieChart, Baby, Wheat, UsersRound, Users, Siren, ClipboardList, Flag, Phone, Mail, MapPinned,
  Facebook, Youtube, Linkedin, Github, Instagram, Twitter, ExternalLink, Image as ImageIcon, Camera, School, X,
  Upload, FileText, Clock, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Send,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedSection } from "./animations";
import type { PageId } from "@/lib/types";

/* ─── SIDEBAR ──────────────────────────────────────────────── */
export function Sidebar({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const goPage = (p: PageId) => {
    onNavigate(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const socialLinks = [
    { label: "Facebook", icon: Facebook, url: "https://facebook.com/AmharaSint", color: "hover:bg-[#1877F2] hover:text-white" },
    { label: "YouTube", icon: Youtube, url: "https://youtube.com/@AmharaSint", color: "hover:bg-[#FF0000] hover:text-white" },
    { label: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/meseret-akalu-76363121b/", color: "hover:bg-[#0A66C2] hover:text-white" },
    { label: "GitHub", icon: Github, url: "https://github.com/AmharaSint", color: "hover:bg-[#333] hover:text-white" },
    { label: "Instagram", icon: Instagram, url: "https://instagram.com/AmharaSint", color: "hover:bg-[#E4405F] hover:text-white" },
    { label: "Twitter / X", icon: Twitter, url: "https://twitter.com/AmharaSint", color: "hover:bg-[#1DA1F2] hover:text-white" },
    { label: "Telegram", icon: ExternalLink, url: "https://t.me/AmharaSint", color: "hover:bg-[#0088CC] hover:text-white" },
  ];
  return (
    <aside className="space-y-6">
      {/* Quick Links */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0B3D2E] to-[#145A44] px-5 py-3.5">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Links</h4>
        </div>
        <div className="p-4 space-y-1.5">
          <button onClick={() => goPage("bids")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#0B3D2E]/70 hover:text-[#0B3D2E] hover:bg-[#EAB308]/10 hover:text-[#A16207] transition-all duration-200 group">
            <Briefcase className="w-4 h-4 text-[#EAB308] group-hover:scale-110 transition-transform" />
            Bids & Tenders
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#0B3D2E]/30" />
          </button>
          <button onClick={() => goPage("vacancy")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#0B3D2E]/70 hover:text-[#0B3D2E] hover:bg-[#EAB308]/10 hover:text-[#A16207] transition-all duration-200 group">
            <ClipboardList className="w-4 h-4 text-[#EAB308] group-hover:scale-110 transition-transform" />
            Vacancy
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#0B3D2E]/30" />
          </button>
          <button onClick={() => goPage("news-news")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#0B3D2E]/70 hover:text-[#0B3D2E] hover:bg-[#EAB308]/10 hover:text-[#A16207] transition-all duration-200 group">
            <Newspaper className="w-4 h-4 text-[#EAB308] group-hover:scale-110 transition-transform" />
            Latest News
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#0B3D2E]/30" />
          </button>
          <button onClick={() => goPage("gallery")} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#0B3D2E]/70 hover:text-[#0B3D2E] hover:bg-[#EAB308]/10 hover:text-[#A16207] transition-all duration-200 group">
            <ImageIcon className="w-4 h-4 text-[#EAB308] group-hover:scale-110 transition-transform" />
            Photo Gallery
            <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#0B3D2E]/30" />
          </button>
        </div>
      </div>
      {/* Social Media */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#EAB308] to-[#CA8A04] px-5 py-3.5">
          <h4 className="text-[#0B3D2E] font-bold text-sm uppercase tracking-wider">Follow Us</h4>
        </div>
        <div className="p-4 grid grid-cols-2 gap-2.5">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-100 text-[#0B3D2E]/60 text-xs font-medium transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${social.color}`}
            >
              <social.icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{social.label}</span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ─── SUB PAGE WRAPPER ──────────────────────────────────────── */
export function SubPage({
  title,
  breadcrumb,
  badge,
  badgeColor,
  onNavigate,
  children,
}: {
  title: string;
  breadcrumb: string;
  badge: string;
  badgeColor?: string;
  onNavigate: (p: PageId) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0B3D2E] via-[#145A44] to-[#0B3D2E] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/50 text-sm mb-2">Home / {breadcrumb}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{title}</h1>
          <Badge className={`${badgeColor || "bg-[#EAB308]/20 text-[#EAB308] border-[#EAB308]/30"} text-sm font-medium`}>{badge}</Badge>
        </div>
      </div>
      {/* Content with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">{children}</div>
        <div className="w-full lg:w-72 shrink-0">
          <Sidebar onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

/* ─── Content Card ──────────────────────────────────────────── */
export function ContentCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <AnimatedSection delay={delay}>
      <Card className="bg-white border-0 shadow-md hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6 md:p-8">{children}</CardContent>
      </Card>
    </AnimatedSection>
  );
}

/* ─── ABOUT: History & Background ───────────────────────────── */
export function AboutHistoryPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="History & Background" breadcrumb="About / History" badge="About the Woreda">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#EAB308]" /> Origins of Amhara Sayint
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            Amhara Sayint is one of the historic woredas in the South Wollo Zone of the Amhara Region, Ethiopia. The name &ldquo;Sayint&rdquo; carries deep historical significance in the local Amharic context, referring to a place of gathering and administration. The woreda was formally established during the imperial era and has since evolved through various administrative reorganizations under the Derg regime and the current federal system.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            Throughout its history, Amhara Sayint has been known for its strategic location along trade routes connecting the highlands to the lowlands. The area has witnessed significant historical events, including resistance movements and community-led development initiatives that have shaped the character of the woreda.
          </p>
        </ContentCard>
        <ContentCard delay={100}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <Landmark className="w-6 h-6 text-[#EAB308]" /> Cultural Heritage
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            The woreda is home to a rich cultural heritage that includes traditional Ethiopian Orthodox Christian practices, unique musical traditions, and vibrant festival celebrations. The community maintains strong ties to customary dispute resolution mechanisms and communal labor traditions such as &ldquo;Debo&rdquo; and &ldquo;Idir.&rdquo;
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            Local crafts, including pottery, weaving, and blacksmithing, continue to be practiced and passed down through generations. The woreda&apos;s cultural identity is further enriched by its connection to the broader Amhara cultural sphere while maintaining its own unique local traditions and practices.
          </p>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── ABOUT: Overview ──────────────────────────────────────── */
export function AboutOverviewPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Overview" breadcrumb="About / Overview" badge="General Information">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#EAB308]" /> About Amhara Sayint Woreda
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            Amhara Sayint Woreda is an administrative district located in the South Wollo Zone of the Amhara Regional State, Ethiopia. Covering an area of approximately 1,245 square kilometers, the woreda is home to an estimated population of 142,350 people spread across 22 kebeles (local administrative units). The woreda administration is headquartered in the town of Amhara Sayint.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            The woreda operates under the federal governance structure of Ethiopia, with administrative layers including the woreda council, executive committee, and kebele-level administrations. The local government is responsible for delivering public services, managing development programs, and maintaining law and order within its jurisdiction.
          </p>
        </ContentCard>
        <div className="grid md:grid-cols-2 gap-6">
          <ContentCard delay={100}>
            <h3 className="font-bold text-[#0B3D2E] mb-3">Key Facts</h3>
            <ul className="space-y-2 text-sm text-[#0B3D2E]/70">
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#EAB308] mt-0.5 shrink-0" />Zone: South Wollo</li>
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#EAB308] mt-0.5 shrink-0" />Region: Amhara Regional State</li>
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#EAB308] mt-0.5 shrink-0" />Population: ~142,350</li>
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#EAB308] mt-0.5 shrink-0" />Area: ~1,245 km&sup2;</li>
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#EAB308] mt-0.5 shrink-0" />Kebeles: 22</li>
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#EAB308] mt-0.5 shrink-0" />Elevation: 1,500 - 3,200m</li>
            </ul>
          </ContentCard>
          <ContentCard delay={150}>
            <h3 className="font-bold text-[#0B3D2E] mb-3">Economy</h3>
            <ul className="space-y-2 text-sm text-[#0B3D2E]/70">
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />Primary: Agriculture (75%+)</li>
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />Crops: Teff, Barley, Wheat, Sorghum</li>
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />Livestock: Cattle, Sheep, Goats</li>
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />Growing: Small enterprises & trade</li>
              <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />Cooperatives: 120+ registered</li>
            </ul>
          </ContentCard>
        </div>
      </div>
    </SubPage>
  );
}

/* ─── ABOUT: Location ─────────────────────────────────────── */
export function AboutLocationPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Location & Geography" breadcrumb="About / Location" badge="Geographic Profile">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-[#EAB308]" /> Geographic Location
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            Amhara Sayint Woreda is situated in the South Wollo Zone of the Amhara Regional State, in the northern highlands of Ethiopia. The woreda is characterized by its diverse topography, featuring deep river gorges, rolling highland plateaus, and fertile agricultural valleys that drain into the Blue Nile basin.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            The landscape ranges from 1,500 meters in the lowland river valleys to over 3,200 meters in the highland peaks, creating distinct agro-ecological zones that support diverse agricultural activities. The area is fed by several seasonal rivers and streams, making it a critical watershed for the larger region.
          </p>
        </ContentCard>
        <ContentCard delay={100}>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <TreePine className="w-6 h-6 text-[#EAB308]" /> Climate & Environment
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            The woreda experiences a tropical highland climate with two main rainy seasons. The &ldquo;Kiremt&rdquo; (main rainy season) runs from June to September, while the &ldquo;Belg&rdquo; (short rains) occur from February to April. Average annual rainfall ranges from 800 to 1,200 mm, supporting both rain-fed and irrigated agriculture.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            Forest coverage stands at approximately 18%, with ongoing reforestation and soil conservation efforts aimed at reversing historical deforestation. The woreda is home to several endemic plant species and serves as a habitat for diverse wildlife, including birds and small mammals unique to the Ethiopian highland ecosystem.
          </p>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── GOVERNMENT: Leadership ───────────────────────────────── */
export function GovLeadershipPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Leadership" breadcrumb="Government / Leadership" badge="Woreda Leadership">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-[#EAB308]" /> Woreda Administration
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            Amhara Sayint Woreda is led by an elected Woreda Council and an Executive Committee headed by the Woreda Administrator (Chief Executive). The leadership team is responsible for implementing development plans, delivering public services, and ensuring good governance at the local level.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            The administration operates under the principles of democratic governance, transparency, and accountability. Regular council meetings are held to discuss development priorities, budget allocations, and policy decisions that affect the community.
          </p>
        </ContentCard>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Woreda Administrator", desc: "Chief executive officer responsible for overall administration and policy implementation.", icon: Shield },
            { title: "Deputy Administrator", desc: "Supports the administrator and oversees specific departments and programs.", icon: UsersRound },
            { title: "Woreda Council", desc: "Elected legislative body that approves budgets, plans, and policies for the woreda.", icon: Landmark },
            { title: "Kebele Administrations", desc: "22 local councils responsible for community-level governance and service delivery.", icon: Building },
          ].map((role, i) => (
            <ContentCard key={role.title} delay={i * 100}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B3D2E] to-[#10B981] flex items-center justify-center shrink-0 shadow-md">
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B3D2E] mb-1">{role.title}</h3>
                  <p className="text-[#0B3D2E]/60 text-sm leading-relaxed">{role.desc}</p>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>
      </div>
    </SubPage>
  );
}

/* ─── GOVERNMENT: Structure ─────────────────────────────────── */
export function GovStructurePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Administrative Structure" breadcrumb="Government / Structure" badge="Governance">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <Building className="w-6 h-6 text-[#EAB308]" /> Organizational Hierarchy
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            The administrative structure of Amhara Sayint Woreda follows the three-tier governance system of Ethiopia: the Woreda Council at the top, followed by sectoral offices and departments, and finally the Kebele administrations at the community level.
          </p>
          <div className="space-y-4">
            {[
              { level: "Tier 1: Woreda Council", desc: "Supreme decision-making body with elected representatives from all kebeles. Meets regularly to approve plans, budgets, and policies." },
              { level: "Tier 2: Executive Committee", desc: "Implements council decisions. Chaired by the Woreda Administrator with heads of major departments." },
              { level: "Tier 3: Sectoral Offices", desc: "Specialized departments including Education, Health, Agriculture, Finance, and Infrastructure offices." },
              { level: "Tier 4: Kebele Administration", desc: "22 local government units that deliver services directly to communities and collect local data." },
            ].map((tier, i) => (
              <div key={tier.level} className="flex items-start gap-4 p-4 rounded-xl bg-[#F0FDF4]">
                <div className="w-10 h-10 rounded-lg bg-[#0B3D2E] text-white flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                <div>
                  <h4 className="font-bold text-[#0B3D2E] mb-1">{tier.level}</h4>
                  <p className="text-[#0B3D2E]/60 text-sm">{tier.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── GOVERNMENT: Offices ──────────────────────────────────── */
export function GovOfficesPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const offices = [
    { name: "Woreda Administrator&apos;s Office", head: "Chief Administrator", icon: Shield },
    { name: "Finance & Economic Development Office", head: "Head of Finance", icon: Banknote },
    { name: "Education Office", head: "Head of Education", icon: GraduationCap },
    { name: "Health Office", head: "Head of Health", icon: HeartPulse },
    { name: "Agriculture & Natural Resources Office", head: "Head of Agriculture", icon: Tractor },
    { name: "Road & Transport Office", head: "Head of Transport", icon: Truck },
    { name: "Water, Mines & Energy Office", head: "Head of Water", icon: Droplets },
    { name: "Justice & Security Office", head: "Head of Justice", icon: Scale },
    { name: "Women & Children Affairs Office", head: "Head of Women Affairs", icon: Users },
    { name: "Youth & Sports Office", head: "Head of Youth Affairs", icon: Award },
    { name: "Trade & Industry Office", head: "Head of Trade", icon: Briefcase },
    { name: "Information & Communication Office", head: "Head of Information", icon: Newspaper },
  ];
  return (
    <SubPage onNavigate={onNavigate} title="Offices & Departments" breadcrumb="Government / Offices" badge="Government Offices">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          {offices.map((office, i) => (
            <ContentCard key={office.name} delay={i * 60}>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B3D2E] to-[#10B981] flex items-center justify-center shrink-0 shadow">
                  <office.icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#0B3D2E] text-sm truncate">{office.name}</h3>
                  <p className="text-[#0B3D2E]/50 text-xs">{office.head}</p>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>
      </div>
    </SubPage>
  );
}

/* ─── SERVICE: Education ────────────────────────────────────── */
export function ServiceEducationPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Education Services" breadcrumb="Services / Education" badge="Education Sector">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-[#EAB308]" /> Education in Amhara Sayint
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            The Amhara Sayint Woreda Education Office oversees 55 educational institutions serving the community, including 47 primary schools (grades 1-8) and 8 secondary schools (grades 9-12). The education sector is one of the largest employers in the woreda, with over 600 teachers and administrative staff.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            The woreda is committed to achieving universal primary education and improving transition rates to secondary education. Current initiatives include school construction programs, teacher training, curriculum improvement, and community awareness campaigns to increase enrollment, particularly for girls and children in remote areas.
          </p>
        </ContentCard>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { stat: "47", label: "Primary Schools" },
            { stat: "8", label: "Secondary Schools" },
            { stat: "600+", label: "Teachers" },
            { stat: "38,000+", label: "Students Enrolled" },
            { stat: "85%", label: "Primary Enrollment" },
            { stat: "62%", label: "Secondary Enrollment" },
          ].map((s, i) => (
            <ContentCard key={s.label} delay={i * 80}>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#0B3D2E] mb-1">{s.stat}</div>
                <p className="text-[#0B3D2E]/60 text-sm">{s.label}</p>
              </div>
            </ContentCard>
          ))}
        </div>
        <ContentCard delay={200}>
          <h3 className="font-bold text-[#0B3D2E] mb-3">Current Programs</h3>
          <ul className="space-y-2 text-sm text-[#0B3D2E]/70">
            {["School feeding program for rural schools", "Girls&apos; education acceleration initiative", "Alternative basic education (ABE) centers", "Community-based school management committees", "Digital literacy and ICT integration program"].map((item) => (
              <li key={item} className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />{item}</li>
            ))}
          </ul>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── SERVICE: Health ───────────────────────────────────────── */
export function ServiceHealthPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Health Services" breadcrumb="Services / Health" badge="Health Sector">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-[#EAB308]" /> Healthcare in Amhara Sayint
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            The woreda&apos;s health system consists of 1 primary hospital, 4 health centers, and 18 health posts strategically distributed across all 22 kebeles. The Health Extension Program (HEP) forms the backbone of community health delivery, with over 40 health extension workers providing preventive and basic curative services at the kebele level.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            Key health indicators have shown improvement in recent years, including reductions in maternal and child mortality, increased immunization coverage, and expanded access to antenatal care. The woreda is working towards universal health coverage through community-based health insurance schemes.
          </p>
        </ContentCard>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { stat: "1", label: "Primary Hospital" },
            { stat: "4", label: "Health Centers" },
            { stat: "18", label: "Health Posts" },
            { stat: "40+", label: "Health Workers" },
            { stat: "92%", label: "Immunization Rate" },
            { stat: "78%", label: "ANC Coverage" },
          ].map((s, i) => (
            <ContentCard key={s.label} delay={i * 80}>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#0B3D2E] mb-1">{s.stat}</div>
                <p className="text-[#0B3D2E]/60 text-sm">{s.label}</p>
              </div>
            </ContentCard>
          ))}
        </div>
        <ContentCard delay={200}>
          <h3 className="font-bold text-[#0B3D2E] mb-3">Health Programs</h3>
          <ul className="space-y-2 text-sm text-[#0B3D2E]/70">
            {["Health Extension Program (HEP)", "Maternal & child health services", "Immunization & vaccination campaigns", "Malaria prevention & control", "HIV/AIDS awareness & testing", "Community-based health insurance (CBHI)", "Nutrition screening & supplementation"].map((item) => (
              <li key={item} className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />{item}</li>
            ))}
          </ul>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── SERVICE: Agriculture ─────────────────────────────────── */
export function ServiceAgriculturePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Agriculture Services" breadcrumb="Services / Agriculture" badge="Agriculture Sector">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <Tractor className="w-6 h-6 text-[#EAB308]" /> Agriculture in Amhara Sayint
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            Agriculture is the backbone of Amhara Sayint&apos;s economy, employing over 75% of the population. The woreda supports a diverse farming system that includes cereal crop production, livestock rearing, horticulture, and increasingly, apiculture (beekeeping) and spice cultivation.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            The Agriculture and Natural Resources Office provides extension services, improved seed distribution, fertilizer access, soil conservation training, and veterinary services to farmers across all kebeles. Climate-smart agriculture practices are being promoted to build resilience against increasing weather variability.
          </p>
        </ContentCard>
        <div className="grid md:grid-cols-2 gap-6">
          <ContentCard delay={100}>
            <h3 className="font-bold text-[#0B3D2E] mb-3 flex items-center gap-2"><Wheat className="w-5 h-5 text-[#EAB308]" /> Major Crops</h3>
            <ul className="space-y-2 text-sm text-[#0B3D2E]/70">
              {["Teff (staple crop)", "Barley & Wheat", "Sorghum & Maize", "Fava Beans & Peas", "Chickpeas & Lentils", "Potatoes & Vegetables"].map((item) => (
                <li key={item} className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />{item}</li>
              ))}
            </ul>
          </ContentCard>
          <ContentCard delay={150}>
            <h3 className="font-bold text-[#0B3D2E] mb-3 flex items-center gap-2"><Baby className="w-5 h-5 text-[#EAB308]" /> Livestock</h3>
            <ul className="space-y-2 text-sm text-[#0B3D2E]/70">
              {["Cattle (oxen, cows)", "Sheep & Goats", "Poultry", "Donkeys & Mules (transport)", "Beekeeping (apiculture)", "Modern dairy farming initiatives"].map((item) => (
                <li key={item} className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />{item}</li>
              ))}
            </ul>
          </ContentCard>
        </div>
      </div>
    </SubPage>
  );
}

/* ─── SERVICE: Transport ──────────────────────────────────── */
export function ServiceTransportPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Transport Services" breadcrumb="Services / Transport" badge="Infrastructure">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <Truck className="w-6 h-6 text-[#EAB308]" /> Transport & Roads
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            Amhara Sayint Woreda has made significant progress in expanding its road network to connect remote kebeles to the woreda capital and zonal centers. The road infrastructure development is a top priority, with both all-weather gravel roads and dry-weather roads being constructed and maintained.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            The woreda currently has approximately 85 km of all-weather roads, with an ambitious target of reaching 150 km within the next five years. Rural accessibility remains a challenge, and the administration is working with regional and federal authorities to secure funding for road construction projects.
          </p>
        </ContentCard>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { stat: "85 km", label: "All-Weather Roads (current)", pct: 57 },
            { stat: "150 km", label: "All-Weather Roads (target)", pct: 100 },
            { stat: "12", label: "Bridges Constructed", pct: 60 },
            { stat: "14 / 22", label: "Kebeles Road Connected", pct: 64 },
          ].map((s, i) => (
            <ContentCard key={s.label} delay={i * 100}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-[#0B3D2E]">{s.label}</span>
                <span className="text-sm font-bold text-[#EAB308]">{s.stat}</span>
              </div>
              <div className="h-3 bg-[#0B3D2E]/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#0B3D2E] to-[#10B981]" style={{ width: `${s.pct}%` }} />
              </div>
            </ContentCard>
          ))}
        </div>
      </div>
    </SubPage>
  );
}

/* ─── SERVICE: Water ───────────────────────────────────────── */
export function ServiceWaterPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Water & Sanitation" breadcrumb="Services / Water" badge="Water Sector">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <Droplets className="w-6 h-6 text-[#EAB308]" /> Water Supply & Sanitation
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            Access to clean water remains one of the most critical challenges in Amhara Sayint Woreda. The Water, Mines & Energy Office manages 64 clean water access points, including hand-dug wells, protected springs, and boreholes equipped with hand pumps. Despite this progress, many rural communities still rely on unprotected water sources.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            The woreda is implementing an ambitious water supply expansion program with support from regional and international partners. The goal is to achieve 85% clean water coverage within the next five years, combined with comprehensive sanitation and hygiene promotion activities.
          </p>
        </ContentCard>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { stat: "64", label: "Water Points" },
            { stat: "52%", label: "Clean Water Coverage" },
            { stat: "85%", label: "Target Coverage (5yr)" },
            { stat: "35%", label: "Sanitation Coverage" },
            { stat: "18", label: "New Projects Planned" },
            { stat: "22", label: "Kebeles Served" },
          ].map((s, i) => (
            <ContentCard key={s.label} delay={i * 80}>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#0B3D2E] mb-1">{s.stat}</div>
                <p className="text-[#0B3D2E]/60 text-sm">{s.label}</p>
              </div>
            </ContentCard>
          ))}
        </div>
      </div>
    </SubPage>
  );
}

/* ─── SERVICE: Justice ─────────────────────────────────────── */
export function ServiceJusticePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Justice & Security" breadcrumb="Services / Justice" badge="Justice Sector">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <Scale className="w-6 h-6 text-[#EAB308]" /> Justice & Security Services
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            Amhara Sayint Woreda maintains a justice system that includes a woreda court, social courts, and alternative dispute resolution mechanisms. The Justice Office works to ensure the rule of law, protect citizens&apos; rights, and provide accessible justice services to all community members.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            Community-based dispute resolution through elders and local mediators remains an important part of the justice landscape, particularly for civil and family matters. The woreda also maintains law enforcement through the local police department, which works to maintain peace and security across all kebeles.
          </p>
        </ContentCard>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Woreda Court", desc: "Handles major civil and criminal cases within the woreda jurisdiction.", icon: Scale },
            { title: "Social Courts", desc: "Community-level courts for minor disputes, family law, and local matters.", icon: Building },
            { title: "Police Department", desc: "Maintains public safety, prevents crime, and enforces laws.", icon: Siren },
            { title: "Legal Aid", desc: "Free legal consultation and support for vulnerable community members.", icon: Shield },
          ].map((s, i) => (
            <ContentCard key={s.title} delay={i * 100}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B3D2E] to-[#10B981] flex items-center justify-center shrink-0 shadow">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B3D2E] mb-1">{s.title}</h3>
                  <p className="text-[#0B3D2E]/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>
      </div>
    </SubPage>
  );
}

/* ─── SERVICE: Finance ───────────────────────────────────── */
export function ServiceFinancePage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Finance & Revenue" breadcrumb="Services / Finance" badge="Finance Sector">
      <div className="space-y-8 max-w-4xl mx-auto">
        <ContentCard>
          <h2 className="text-xl md:text-2xl font-bold text-[#0B3D2E] mb-4 flex items-center gap-2">
            <Banknote className="w-6 h-6 text-[#EAB308]" /> Finance & Revenue
          </h2>
          <p className="text-[#0B3D2E]/70 leading-relaxed mb-4">
            The Finance and Economic Development Office manages the woreda&apos;s budget, revenue collection, and financial planning. The office is responsible for collecting local taxes, fees, and duties, as well as managing the disbursement of funds to various departments and development programs.
          </p>
          <p className="text-[#0B3D2E]/70 leading-relaxed">
            The woreda budget is funded through a combination of federal and regional government transfers, local revenue collection, and donor support for specific development projects. Transparency and accountability in financial management are key priorities, with regular audits and public financial reporting.
          </p>
        </ContentCard>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { stat: "120+", label: "Registered Cooperatives" },
            { stat: "5,000+", label: "Tax-Paying Households" },
            { stat: "85%", label: "Budget Utilization Rate" },
            { stat: "22", label: "Revenue Collection Points" },
            { stat: "150+", label: "Micro Enterprises Supported" },
            { stat: "3", label: "Financial Audits Per Year" },
          ].map((s, i) => (
            <ContentCard key={s.label} delay={i * 80}>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-[#0B3D2E] mb-1">{s.stat}</div>
                <p className="text-[#0B3D2E]/60 text-sm">{s.label}</p>
              </div>
            </ContentCard>
          ))}
        </div>
      </div>
    </SubPage>
  );
}

/* ─── NEWS: Latest News ───────────────────────────────────── */
export function NewsPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const newsItems = [
    { date: "June 28, 2026", title: "New Primary School Construction Completed in Gonder Ber Kebele", summary: "A new 8-classroom primary school has been completed and handed over to the community, serving over 400 students.", icon: School },
    { date: "June 15, 2026", title: "Health Center Expansion Project Launched", summary: "Construction has begun on expanding the main health center to include maternity and pediatric wards.", icon: HeartPulse },
    { date: "June 5, 2026", title: "Road Construction Connecting 3 Remote Kebeles Approved", summary: "The regional government has approved funding for 25 km of new all-weather roads.", icon: Truck },
    { date: "May 22, 2026", title: "Annual Agricultural Input Distribution Campaign", summary: "Over 10,000 households received improved seeds and fertilizer for the planting season.", icon: Tractor },
    { date: "May 10, 2026", title: "Woreda Council Approves Annual Budget", summary: "The council approved a budget of ETB 85 million for the fiscal year 2026/27.", icon: PieChart },
    { date: "April 28, 2026", title: "Clean Water Project Benefits 5,000 Residents", summary: "Five new deep boreholes with solar-powered pumps now provide clean water access.", icon: Droplets },
  ];
  return (
    <SubPage onNavigate={onNavigate} title="Latest News" breadcrumb="News / Latest News" badge="News & Updates">
      <div className="max-w-4xl mx-auto space-y-4">
        {newsItems.map((item, i) => (
          <ContentCard key={item.title} delay={i * 60}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0B3D2E] to-[#10B981] flex items-center justify-center shrink-0 shadow">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[#EAB308] text-xs font-semibold mb-1">{item.date}</p>
                <h3 className="font-bold text-[#0B3D2E] text-sm md:text-base mb-1">{item.title}</h3>
                <p className="text-[#0B3D2E]/60 text-sm leading-relaxed">{item.summary}</p>
              </div>
            </div>
          </ContentCard>
        ))}
      </div>
    </SubPage>
  );
}

/* ─── NEWS: Bids ──────────────────────────────────────────── */
export function BidsPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Bid Announcements" breadcrumb="News / Bids" badge="Procurement">
      <div className="max-w-4xl mx-auto space-y-4">
        {[
          { deadline: "July 30, 2026", title: "Construction of All-Weather Road (Kebele A to Kebele B)", budget: "ETB 15 Million", status: "Open" },
          { deadline: "July 20, 2026", title: "Supply of Medical Equipment for Health Center Expansion", budget: "ETB 3.2 Million", status: "Open" },
          { deadline: "July 15, 2026", title: "Office Furniture Procurement for Woreda Administration", budget: "ETB 850,000", status: "Open" },
          { deadline: "June 30, 2026", title: "Borehole Drilling in 5 Kebeles (Water Supply Project)", budget: "ETB 8 Million", status: "Closed" },
          { deadline: "June 15, 2026", title: "School Construction (4 Classroom Blocks)", budget: "ETB 12 Million", status: "Awarded" },
        ].map((item, i) => (
          <ContentCard key={item.title} delay={i * 60}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={item.status === "Open" ? "bg-green-100 text-green-700 border-green-200" : item.status === "Closed" ? "bg-gray-100 text-gray-600" : "bg-amber-100 text-amber-700 border-amber-200"}>{item.status}</Badge>
                  <span className="text-xs text-[#0B3D2E]/50">Deadline: {item.deadline}</span>
                </div>
                <h3 className="font-bold text-[#0B3D2E] text-sm md:text-base mb-1">{item.title}</h3>
                <p className="text-[#EAB308] text-sm font-semibold">{item.budget}</p>
              </div>
            </div>
          </ContentCard>
        ))}
      </div>
    </SubPage>
  );
}

/* ─── NEWS: Vacancy ────────────────────────────────────────── */
interface VacancyData { id: string; title: string; department: string; type: string; salary?: string; deadline: string; description?: string; requirements?: string; status?: string; }

export function VacancyPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [vacancies, setVacancies] = useState<VacancyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [applyId, setApplyId] = useState<string | null>(null);
  const [applyForm, setApplyForm] = useState({ fullName: "", email: "", phone: "", education: "", experience: "", coverLetter: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/vacancies")
      .then(r => r.json())
      .then(d => { setVacancies(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => { setVacancies([]); setLoading(false); });
  }, []);

  const handleApply = async (vacancy: VacancyData) => {
    if (!cvFile) { setSubmitResult({ success: false, message: "Please upload your CV" }); return; }
    if (!applyForm.fullName || !applyForm.email || !applyForm.phone) {
      setSubmitResult({ success: false, message: "Please fill in all required fields" }); return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("vacancyId", vacancy.id);
      fd.append("vacancyTitle", vacancy.title);
      fd.append("fullName", applyForm.fullName);
      fd.append("email", applyForm.email);
      fd.append("phone", applyForm.phone);
      fd.append("education", applyForm.education);
      fd.append("experience", applyForm.experience);
      fd.append("coverLetter", applyForm.coverLetter);
      fd.append("cv", cvFile);
      const res = await fetch("/api/vacancies", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitResult({ success: true, message: "Application submitted successfully! We will contact you soon." });
        setApplyForm({ fullName: "", email: "", phone: "", education: "", experience: "", coverLetter: "" });
        setCvFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setSubmitResult({ success: false, message: data.error || "Failed to submit. Please try again." });
      }
    } catch {
      setSubmitResult({ success: false, message: "Network error. Please check your connection." });
    }
    setSubmitting(false);
  };

  const openApply = (id: string) => { setApplyId(id); setSubmitResult(null); setApplyForm({ fullName: "", email: "", phone: "", education: "", experience: "", coverLetter: "" }); setCvFile(null); };

  return (
    <SubPage onNavigate={onNavigate} title="Job Vacancies" breadcrumb="News / Vacancy" badge="Careers">
      <div className="max-w-4xl mx-auto space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-[3px] border-[#0B3D2E]/20 border-t-[#0B3D2E] rounded-full animate-spin" /></div>
        ) : vacancies.length === 0 ? (
          <ContentCard><div className="text-center py-10"><Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" /><p className="text-gray-500">No open vacancies at the moment. Check back soon!</p></div></ContentCard>
        ) : vacancies.map((v, i) => (
          <ContentCard key={v.id} delay={i * 60}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-[#0B3D2E] text-white text-xs">{v.type}</Badge>
                  <Badge variant="secondary" className="text-xs">{v.department}</Badge>
                  {v.salary && <Badge className="bg-[#EAB308]/15 text-[#A16207] text-xs border-[#EAB308]/30">{v.salary}</Badge>}
                </div>
                <h3 className="font-bold text-[#0B3D2E] text-sm md:text-base mb-1.5">{v.title}</h3>
                <div className="flex items-center gap-3 text-xs text-[#0B3D2E]/50">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Deadline: {v.deadline}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setExpandedId(expandedId === v.id ? null : v.id)} className="flex items-center gap-1 text-xs font-medium text-[#0B3D2E] hover:text-[#145A44] px-3 py-1.5 rounded-lg hover:bg-[#F0FDF4] transition-all">
                  Details {expandedId === v.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => openApply(v.id)} className="flex items-center gap-1.5 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-semibold text-xs px-4 py-1.5 rounded-lg transition-all shadow-sm hover:shadow-md">
                  Apply Now
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedId === v.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-fade-in-up">
                {v.description && <div><h4 className="font-semibold text-[#0B3D2E] text-sm mb-1">Job Description</h4><p className="text-[#0B3D2E]/60 text-sm leading-relaxed whitespace-pre-wrap">{v.description}</p></div>}
                {v.requirements && <div><h4 className="font-semibold text-[#0B3D2E] text-sm mb-1">Requirements</h4><p className="text-[#0B3D2E]/60 text-sm leading-relaxed whitespace-pre-wrap">{v.requirements}</p></div>}
              </div>
            )}

            {/* Apply Form */}
            {applyId === v.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in-up">
                <h4 className="font-bold text-[#0B3D2E] text-base mb-4 flex items-center gap-2"><Send className="w-4 h-4 text-[#EAB308]" />Apply for: {v.title}</h4>
                {submitResult && (
                  <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${submitResult.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                    {submitResult.success ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    {submitResult.message}
                  </div>
                )}
                <div className="grid md:grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">Full Name *</label><input type="text" value={applyForm.fullName} onChange={e => setApplyForm({ ...applyForm, fullName: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" placeholder="Your full name" /></div>
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">Email *</label><input type="email" value={applyForm.email} onChange={e => setApplyForm({ ...applyForm, email: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20" placeholder="your@email.com" /></div>
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">Phone *</label><input type="tel" value={applyForm.phone} onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20" placeholder="+251 9XX XXX XXX" /></div>
                  <div><label className="block text-xs font-medium text-gray-600 mb-1">Education</label><input type="text" value={applyForm.education} onChange={e => setApplyForm({ ...applyForm, education: e.target.value })} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20" placeholder="BSc in ..." /></div>
                </div>
                <div className="mt-3"><label className="block text-xs font-medium text-gray-600 mb-1">Work Experience</label><textarea value={applyForm.experience} onChange={e => setApplyForm({ ...applyForm, experience: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20" placeholder="Brief work experience..." /></div>
                <div className="mt-3"><label className="block text-xs font-medium text-gray-600 mb-1">Cover Letter</label><textarea value={applyForm.coverLetter} onChange={e => setApplyForm({ ...applyForm, coverLetter: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20" placeholder="Why are you interested in this position?" /></div>
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Upload CV (PDF, DOC, DOCX) *</label>
                  <div className="flex items-center gap-3">
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" onChange={e => setCvFile(e.target.files?.[0] || null)} className="hidden" id="cv-upload" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-[#0B3D2E] hover:text-[#0B3D2E] transition-colors">
                      <Upload className="w-4 h-4" />{cvFile ? cvFile.name : "Choose CV File"}
                    </button>
                    {cvFile && <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle className="w-3.5 h-3.5" />{cvFile.name}</span>}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button onClick={() => handleApply(v)} disabled={submitting} className="flex items-center gap-2 bg-[#0B3D2E] hover:bg-[#145A44] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-all shadow-sm disabled:opacity-50">
                    {submitting ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</> : <><Send className="w-4 h-4" />Submit Application</>}
                  </button>
                  <button onClick={() => { setApplyId(null); setSubmitResult(null); }} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                </div>
              </div>
            )}
          </ContentCard>
        ))}
        <ContentCard delay={400}>
          <div className="bg-[#F0FDF4] rounded-xl p-6 text-center">
            <h3 className="font-bold text-[#0B3D2E] mb-2">How to Apply</h3>
            <p className="text-[#0B3D2E]/60 text-sm">Click &quot;Apply Now&quot; on any vacancy above to submit your application online. You can also submit in person at the Woreda Administration Office, Amhara Sayint Town, or email: info@amharasint.gov.et</p>
          </div>
        </ContentCard>
      </div>
    </SubPage>
  );
}

/* ─── NEWS: Announcements ──────────────────────────────────── */
export function AnnouncementsPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Announcements" breadcrumb="News / Announcements" badge="Public Notices">
      <div className="max-w-4xl mx-auto space-y-4">
        {[
          { date: "June 25, 2026", title: "Public Holiday Notice - Eid al-Adha", summary: "All woreda offices will be closed for the Eid al-Adha public holiday.", icon: Flag },
          { date: "June 20, 2026", title: "Community Meeting on New Development Plan", summary: "All residents are invited to attend the public consultation on the 5-year development plan.", icon: UsersRound },
          { date: "June 12, 2026", title: "Tax Payment Deadline Extended", summary: "The deadline for annual property and income tax payments has been extended to August 30.", icon: Banknote },
          { date: "June 1, 2026", title: "New Kebele Boundaries Announced", summary: "Following the recent census, adjustments to kebele administrative boundaries take effect.", icon: MapPin },
          { date: "May 28, 2026", title: "Vaccination Campaign for Livestock", summary: "Free livestock vaccination campaign across all kebeles. All farmers encouraged to participate.", icon: Baby },
        ].map((item, i) => (
          <ContentCard key={item.title} delay={i * 60}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EAB308] to-[#F59E0B] flex items-center justify-center shrink-0 shadow">
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-[#EAB308] text-xs font-semibold mb-1">{item.date}</p>
                <h3 className="font-bold text-[#0B3D2E] text-sm md:text-base mb-1">{item.title}</h3>
                <p className="text-[#0B3D2E]/60 text-sm leading-relaxed">{item.summary}</p>
              </div>
            </div>
          </ContentCard>
        ))}
      </div>
    </SubPage>
  );
}

/* ─── CONTACT PAGE ─────────────────────────────────────────── */
export function ContactPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <SubPage onNavigate={onNavigate} title="Contact Us" breadcrumb="Contact" badge="Get In Touch">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[
            { title: "Office Location", detail: "Amhara Sayint Town\nSouth Wollo Zone\nAmhara Region, Ethiopia", icon: MapPinned, color: "from-[#0B3D2E] to-[#10B981]" },
            { title: "Phone", detail: "+251 33 XXX XXXX\n\nOffice Hours:\nMon-Fri, 8:00 AM - 5:00 PM", icon: Phone, color: "from-[#EAB308] to-[#F59E0B]" },
            { title: "Email", detail: "info@amharasint.gov.et\n\nFor general inquiries\nand service requests", icon: Mail, color: "from-[#DC2626] to-[#EF4444]" },
          ].map((c, i) => (
            <ContentCard key={c.title} delay={i * 100}>
              <div className="text-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <c.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-[#0B3D2E] mb-2">{c.title}</h3>
                <p className="text-[#0B3D2E]/55 text-sm whitespace-pre-line">{c.detail}</p>
              </div>
            </ContentCard>
          ))}
        </div>
        <ContentCard delay={300}>
          <h2 className="text-xl font-bold text-[#0B3D2E] mb-4">Key Office Contacts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#0B3D2E]/10">
                  <th className="text-left py-3 px-4 font-bold text-[#0B3D2E]">Office</th>
                  <th className="text-left py-3 px-4 font-bold text-[#0B3D2E]">Contact Person</th>
                  <th className="text-left py-3 px-4 font-bold text-[#0B3D2E]">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0B3D2E]/5">
                {[
                  { office: "Woreda Administrator", person: "Chief Administrator", phone: "+251 33 XXX XXXX" },
                  { office: "Education Office", person: "Head of Education", phone: "+251 33 XXX XXXX" },
                  { office: "Health Office", person: "Head of Health", phone: "+251 33 XXX XXXX" },
                  { office: "Agriculture Office", person: "Head of Agriculture", phone: "+251 33 XXX XXXX" },
                  { office: "Finance Office", person: "Head of Finance", phone: "+251 33 XXX XXXX" },
                ].map((row) => (
                  <tr key={row.office} className="hover:bg-[#F0FDF4] transition-colors">
                    <td className="py-3 px-4 text-[#0B3D2E] font-medium">{row.office}</td>
                    <td className="py-3 px-4 text-[#0B3D2E]/60">{row.person}</td>
                    <td className="py-3 px-4 text-[#0B3D2E]/60">{row.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ContentCard>
      </div>
    </SubPage>
  );
}
