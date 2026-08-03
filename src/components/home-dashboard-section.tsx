"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, Heart, Newspaper, Briefcase, FileCheck, Users, Map, MapPin, School, HeartPulse, Banknote, HardHat, Tractor, Wrench } from "lucide-react";
import type { PageId } from "@/lib/types";
import { AnimatedSection, AnimatedCounter } from "./animations";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";

// Mock Data
const stats = [
  { label: "Population", value: 214056, icon: Users, color: "#10B981" },
  { label: "Area (km²)", value: 1437, icon: Map, color: "#3B82F6" },
  { label: "Kebeles", value: 37, icon: MapPin, color: "#F59E0B" },
  { label: "Schools", value: 106, icon: School, color: "#6366F1" },
  { label: "Health Posts", value: 8, icon: HeartPulse, color: "#DC2626" },
  { label: "Budget (M)", value: 200, icon: Banknote, color: "#0891B2" },
];

const populationData = [
  { year: "2018", pop: 185000 },
  { year: "2019", pop: 192000 },
  { year: "2020", pop: 198000 },
  { year: "2021", pop: 202000 },
  { year: "2022", pop: 206000 },
  { year: "2023", pop: 210000 },
  { year: "2024", pop: 214056 },
];

const VACANCIES = [
  { title: "Public Health Officer", dept: "Health Bureau", deadline: "Aug 18", icon: HeartPulse, color: "#DC2626" },
  { title: "Agriculture Extension Officer", dept: "Agriculture Office", deadline: "Aug 22", icon: Tractor, color: "#16A34A" },
];

const BIDS = [
  { title: "Construction of Kebele 12 Health Post", budget: "ETB 850,000", icon: HardHat, color: "#0B3D2E" },
  { title: "Supply of Agricultural Inputs", budget: "ETB 1.2M", icon: Tractor, color: "#0B3D2E" },
];

export function HomeDashboardSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="py-8 md:py-10 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="inline-block bg-[#0B3D2E]/10 text-[#0B3D2E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#0B3D2E]/20 mb-3">
              Announcements
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E]">
              Recent <span className="text-[#EAB308]">Updates</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="max-w-4xl mx-auto">
          


          {/* COLUMN 3: Vacancies & Bids */}
          <AnimatedSection delay={300}>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-8">
              
              {/* Vacancies Sub-section */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#0B3D2E] text-base flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#EAB308]" /> Urgent Vacancies
                  </h3>
                  <button onClick={() => onNavigate("vacancy")} className="text-[10px] font-bold text-gray-400 hover:text-[#0B3D2E] uppercase transition-colors">
                    See All
                  </button>
                </div>
                <div className="space-y-3">
                  {VACANCIES.map((v, i) => (
                    <div key={i} onClick={() => onNavigate("vacancy")} className="group cursor-pointer flex gap-3 items-center bg-gray-50 rounded-2xl p-3 border border-gray-100 hover:border-[#EAB308]/40 transition-colors">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: v.color + "15" }}>
                        <v.icon className="w-5 h-5" style={{ color: v.color }} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0B3D2E] text-xs group-hover:text-[#EAB308] transition-colors">{v.title}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5 flex items-center gap-1"><Calendar className="w-3 h-3" /> Ends: {v.deadline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:block w-[1px] bg-gray-100" />
              <div className="md:hidden w-full h-[1px] bg-gray-100" />

              {/* Bids Sub-section */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#0B3D2E] text-base flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#EAB308]" /> Active Bids
                  </h3>
                  <button onClick={() => onNavigate("bids")} className="text-[10px] font-bold text-gray-400 hover:text-[#0B3D2E] uppercase transition-colors">
                    See All
                  </button>
                </div>
                <div className="space-y-3">
                  {BIDS.map((b, i) => (
                    <div key={i} onClick={() => onNavigate("bids")} className="group cursor-pointer flex gap-3 items-center bg-gray-50 rounded-2xl p-3 border border-gray-100 hover:border-[#0B3D2E]/20 transition-colors">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[#0B3D2E]/5">
                        <b.icon className="w-5 h-5 text-[#0B3D2E]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0B3D2E] text-xs group-hover:text-[#EAB308] transition-colors">{b.title}</h4>
                        <p className="text-[10px] text-[#16A34A] font-bold mt-0.5">{b.budget}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
}
