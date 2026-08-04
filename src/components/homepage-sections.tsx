"use client";
import { useState, useEffect } from "react";
import {
  Phone, Mail, MapPin, Clock, Siren, FileText, Landmark, Users,
  Briefcase, FileCheck, GraduationCap, HeartPulse, Droplets, Building2,
  Scale, Banknote, ArrowRight, ChevronRight, Megaphone, Star,
  HardHat, Tractor, Wrench, Target, CheckCircle2, Calendar,
} from "lucide-react";
import type { PageId } from "@/lib/types";
import { AnimatedSection } from "./animations";

/* ─── TOP INFO BAR ─────────────────────────────────── */
export function TopInfoBar({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <div className="hidden md:block bg-[#062B1F] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10 text-xs text-white/50">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#EAB308]" />Ajibar Town, South Wollo Zone, Amhara</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#EAB308]" />+251 33 XXX XXXX</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#EAB308]" />info@amharasint.gov.et</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#EAB308]" />Mon–Fri: 8:30 AM – 5:30 PM</span>
          </div>
          <button onClick={() => onNavigate("contact")}
            className="flex items-center gap-1.5 text-[#EAB308] hover:text-white font-semibold transition-colors">
            <Siren className="w-3.5 h-3.5" /> Emergency: 991
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── CITIZEN SERVICES SECTION ─────────────────────── */
const CITIZEN_SERVICES = [
  { title: "Birth Registration", desc: "Register births and obtain official certificates.", icon: Users, color: "#16A34A", href: "svc-health" as PageId },
  { title: "Business License", desc: "Apply for and renew business operating licenses.", icon: Building2, color: "#2563EB", href: "svc-trade" as PageId },
  { title: "Land Services", desc: "Land registration, title deeds, and land use info.", icon: Landmark, color: "#D97706", href: "about-location" as PageId },
  { title: "Education Enrollment", desc: "School enrollment and certificate verification.", icon: GraduationCap, color: "#7C3AED", href: "svc-education" as PageId },
  { title: "Health Services", desc: "Access clinics, vaccination, and health records.", icon: HeartPulse, color: "#DC2626", href: "svc-health" as PageId },
  { title: "Water & Sanitation", desc: "Water connection, sanitation project applications.", icon: Droplets, color: "#0891B2", href: "svc-water" as PageId },
  { title: "Justice & Legal", desc: "Legal aid, dispute resolution, and court access.", icon: Scale, color: "#0B3D2E", href: "svc-justice" as PageId },
  { title: "Finance & Revenue", desc: "Tax payment, revenue, and financial services.", icon: Banknote, color: "#B45309", href: "svc-finance" as PageId },
];

export function CitizenServicesSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <span className="inline-block bg-[#0B3D2E]/8 text-[#0B3D2E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#0B3D2E]/15 mb-3">
            Government Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-3">
            Citizen <span className="text-[#EAB308]">Services</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            Fast, secure, and convenient government services for all citizens.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CITIZEN_SERVICES.map((svc, i) => (
            <AnimatedSection key={svc.title} delay={i * 60}>
              <button onClick={() => onNavigate(svc.href)}
                className="w-full bg-white rounded-2xl p-6 flex flex-col items-center text-center gap-4 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: svc.color }}
                >
                  <svc.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0B3D2E] text-base mb-1">{svc.title}</h3>
                  <p className="text-xs text-gray-500">{svc.desc}</p>
                </div>
                <span className="text-xs font-semibold text-[#EAB308] flex items-center gap-1">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── VACANCY + BIDS SECTION ─────────────────────── */
const VACANCIES = [
  { title: "Public Health Officer", type: "Full-Time", dept: "Health Bureau", deadline: "Aug 18", icon: HeartPulse, color: "#DC2626" },
  { title: "Agriculture Extension Officer", type: "Full-Time", dept: "Agriculture Office", deadline: "Aug 22", icon: Tractor, color: "#16A34A" },
  { title: "Revenue Collection Officer", type: "Full-Time", dept: "Finance & Revenue", deadline: "Aug 25", icon: Banknote, color: "#D97706" },
  { title: "Infrastructure Engineer", type: "Full-Time", dept: "Construction Office", deadline: "Aug 30", icon: HardHat, color: "#0891B2" },
];
const BIDS = [
  { title: "Construction of Kebele 12 Health Post", ref: "ASW/BID/001/2026", deadline: "Aug 20", budget: "ETB 850,000", icon: HardHat },
  { title: "Supply of Agricultural Inputs & Equipment", ref: "ASW/BID/002/2026", deadline: "Aug 23", budget: "ETB 1.2M", icon: Tractor },
  { title: "Road Grading & Maintenance Contract", ref: "ASW/BID/003/2026", deadline: "Aug 28", budget: "ETB 2.4M", icon: Wrench },
];

export function VacancyBidsSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="py-8 md:py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <span className="inline-block bg-[#EAB308]/10 text-[#92400E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#EAB308]/30 mb-3">
            Open Opportunities
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-2">
            Vacancies &amp; <span className="text-[#EAB308]">Bids</span>
          </h2>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Vacancies */}
          <AnimatedSection delay={100}>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#0B3D2E] text-lg flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#EAB308]" /> Vacancies
                  <span className="bg-[#EAB308] text-[#0B3D2E] text-xs font-black px-2 py-0.5 rounded-full">{VACANCIES.length}</span>
                </h3>
                <button onClick={() => onNavigate("vacancy")} className="text-xs font-bold text-[#0B3D2E] hover:text-[#EAB308] flex items-center gap-1 transition-colors">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {VACANCIES.map((v, i) => (
                  <button key={i} onClick={() => onNavigate("vacancy")}
                    className="w-full flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md hover:border-[#EAB308]/40 transition-all duration-200 text-left group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: v.color + "15" }}>
                      <v.icon className="w-5 h-5" style={{ color: v.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0B3D2E] text-sm truncate group-hover:text-[#EAB308] transition-colors">{v.title}</p>
                      <p className="text-xs text-gray-400">{v.dept}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">{v.type}</span>
                      <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 justify-end"><Calendar className="w-3 h-3" />{v.deadline}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Bids */}
          <AnimatedSection delay={150}>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 h-full">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-[#0B3D2E] text-lg flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-[#EAB308]" /> Bids &amp; Tenders
                  <span className="bg-[#0B3D2E] text-white text-xs font-black px-2 py-0.5 rounded-full">{BIDS.length}</span>
                </h3>
                <button onClick={() => onNavigate("bids")} className="text-xs font-bold text-[#0B3D2E] hover:text-[#EAB308] flex items-center gap-1 transition-colors">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {BIDS.map((b, i) => (
                  <button key={i} onClick={() => onNavigate("bids")}
                    className="w-full flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md hover:border-[#0B3D2E]/20 transition-all duration-200 text-left group">
                    <div className="w-10 h-10 rounded-xl bg-[#0B3D2E]/8 flex items-center justify-center shrink-0">
                      <b.icon className="w-5 h-5 text-[#0B3D2E]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0B3D2E] text-sm leading-snug group-hover:text-[#EAB308] transition-colors">{b.title}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{b.ref}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-[#16A34A]">{b.budget}</p>
                      <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 justify-end"><Calendar className="w-3 h-3" />Deadline: {b.deadline}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ─── MAYOR'S MESSAGE SECTION ─────────────────────── */
export function MayorMessageSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-[#0B3D2E] to-[#145A44]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="text-white">
              <span className="inline-block bg-[#EAB308]/20 text-[#EAB308] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                From the Administration
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                A Message From<br />The <span className="text-[#EAB308]">Woreda Leadership</span>
              </h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
                &ldquo;Dear citizens of Amhara Sayint, it is our great honor to welcome you to our woreda's official digital platform. As we embrace the digital age, our administration is committed to bringing government services closer to you. We are working tirelessly to transform Amhara Sayint into a model woreda that delivers efficient, transparent, and citizen-centric services. Together, we are building an Amhara Sayint that future generations will be proud of.&rdquo;
              </p>
              <button onClick={() => onNavigate("gov-leadership")}
                className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl">
                View Leadership &amp; Structure <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6 mt-8 lg:mt-0">
              {/* Woreda Administrator */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[3/4] group">
                <img src="/team/admin.jpg" alt="Woreda Administrator" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="text-white font-bold text-sm md:text-lg">Administrator Name</p>
                  <p className="text-[#EAB308] text-xs md:text-sm font-medium">Woreda Administrator</p>
                </div>
              </div>

              {/* Team Lead */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[3/4] mt-8 group">
                <img src="/team/lead.jpg" alt="Team Lead" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="text-white font-bold text-sm md:text-lg">Team Lead Name</p>
                  <p className="text-[#EAB308] text-xs md:text-sm font-medium">Project Team Lead</p>
                </div>
              </div>
            </div>
            
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ─── FEATURED PROJECTS SECTION ─────────────────────── */
const PROJECTS = [
  { title: "Smart Woreda Infrastructure", desc: "Digital transformation of all woreda services.", progress: 65, icon: Target, color: "#2563EB" },
  { title: "Affordable Housing Program", desc: "500 housing units for low-income residents.", progress: 40, icon: Building2, color: "#16A34A" },
  { title: "Road Network Expansion", desc: "Expanding arterial roads across 12 kebeles.", progress: 78, icon: HardHat, color: "#D97706" },
  { title: "Water & Sanitation Project", desc: "Clean water access for 25,000 residents.", progress: 55, icon: Droplets, color: "#0891B2" },
];

export function FeaturedProjectsSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="py-8 md:py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-6">
          <span className="inline-block bg-[#EAB308]/10 text-[#92400E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#EAB308]/30 mb-3">
            Development Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-2">
            Featured <span className="text-[#EAB308]">Projects</span>
          </h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((proj, i) => (
            <AnimatedSection key={proj.title} delay={i * 70}>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-md" style={{ backgroundColor: proj.color + "15" }}>
                  <proj.icon className="w-6 h-6" style={{ color: proj.color }} />
                </div>
                <h3 className="font-bold text-[#0B3D2E] text-base mb-2 leading-snug">{proj.title}</h3>
                <p className="text-xs text-gray-500 mb-4 flex-1">{proj.desc}</p>
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="font-bold" style={{ color: proj.color }}>{proj.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${proj.progress}%`, backgroundColor: proj.color }} />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EMERGENCY CONTACTS SECTION ─────────────────────── */
export function EmergencyContactsSection() {
  const contacts = [
    { label: "Police Emergency", number: "991", icon: Siren, color: "#DC2626" },
    { label: "Fire Brigade", number: "939", icon: Siren, color: "#EA580C" },
    { label: "Medical Emergency", number: "907", icon: HeartPulse, color: "#16A34A" },
    { label: "Water Authority", number: "+251 33 111 2222", icon: Droplets, color: "#0891B2" },
  ];

  return (
    <section className="py-10 md:py-8 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-8">
          <span className="inline-block bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-200 mb-3 flex items-center gap-2 justify-center w-fit mx-auto">
            <Siren className="w-3.5 h-3.5" /> Emergency Contacts
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0B3D2E] mb-2">
            24/7 <span className="text-red-600">Emergency Services</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contacts.map((c, i) => (
            <AnimatedSection key={c.label} delay={i * 60}>
              <a href={`tel:${c.number}`}
                className="bg-white rounded-2xl p-5 border-2 border-gray-200 hover:border-red-300 hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center gap-3 group">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: c.color + "15" }}>
                  <c.icon className="w-6 h-6" style={{ color: c.color }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0B3D2E] mb-1">{c.label}</p>
                  <p className="text-2xl font-black" style={{ color: c.color }}>{c.number}</p>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
