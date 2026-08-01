"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight, Calendar, Heart, Newspaper, Briefcase, FileCheck, Users, Map, MapPin, School, HeartPulse, Banknote, HardHat, Tractor, Wrench } from "lucide-react";
import type { PageId } from "@/lib/types";
import { AnimatedSection } from "./animations";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";

// Mock Data
const stats = [
  { label: "Population", value: 214056, icon: Users, color: "#10B981" },
  { label: "Area (km²)", value: 1437, icon: Map, color: "#3B82F6" },
  { label: "Kebeles", value: 37, icon: MapPin, color: "#F59E0B" },
  { label: "Schools", value: 106, icon: School, color: "#6366F1" },
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
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    fetch("/admin/api/news")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const published = data.filter((n: any) => n.status === "published").map((n: any) => ({ ...n, image: n.image || n.imageUrl }));
          if (published.length > 0) { setNews(published); return; }
        }
        setNews([
          { id: "1", title: "Amhara Sayint Launches New Water Supply Project", category: "Water", date: "2026-06-28", image: "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg" },
          { id: "2", title: "Annual Agricultural Exhibition a Great Success", category: "Agriculture", date: "2026-06-25", image: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg" },
          { id: "3", title: "New Primary School Inaugurated in Kebele 05", category: "Education", date: "2026-06-20", image: "https://sfile.chatglm.cn/images-ppt/b60b21cb0921.jpg" },
        ]);
      })
      .catch(() => {
        setNews([
          { id: "1", title: "Amhara Sayint Launches New Water Supply Project", category: "Water", date: "2026-06-28", image: "https://sfile.chatglm.cn/images-ppt/35f5cc0fa1a7.jpg" },
          { id: "2", title: "Annual Agricultural Exhibition a Great Success", category: "Agriculture", date: "2026-06-25", image: "https://sfile.chatglm.cn/images-ppt/4f86eab1aa4a.jpg" },
        ]);
      });
  }, []);

  return (
    <section className="py-12 md:py-16 bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="inline-block bg-[#0B3D2E]/10 text-[#0B3D2E] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#0B3D2E]/20 mb-3">
              Woreda Dashboard
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E]">
              At a <span className="text-[#EAB308]">Glance</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* COLUMN 1: Latest News */}
          <AnimatedSection delay={100} className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xl shadow-slate-200/50 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#0B3D2E] text-lg flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-emerald-600" /> Latest News
                </h3>
                <button onClick={() => onNavigate("news-news")} className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              
              <div className="flex flex-col gap-5 flex-1">
                {news.slice(0, 3).map((item) => (
                  <div key={item.id} className="group cursor-pointer flex gap-4 items-center" onClick={() => onNavigate("news-news")}>
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1 block">{item.category}</span>
                      <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-emerald-600 transition-colors line-clamp-2 mb-1">{item.title}</h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3 h-3" /> {item.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* COLUMN 2: Woreda Statistics */}
          <AnimatedSection delay={200} className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#0B3D2E] to-[#145A44] rounded-3xl p-6 border border-[#145A44] shadow-xl h-full flex flex-col relative overflow-hidden">
              <div className="absolute -top-[20%] -right-[20%] w-[60%] h-[60%] bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#EAB308]" /> Key Figures
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                {stats.map((s, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/20 transition-colors cursor-default">
                    <s.icon className="w-6 h-6 mb-2" style={{ color: s.color }} />
                    <span className="text-xl font-black text-white">{s.value.toLocaleString()}</span>
                    <span className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Mini sparkline chart for population growth */}
              <div className="mt-auto relative z-10">
                <p className="text-xs text-emerald-200 font-semibold mb-2 flex justify-between">
                  <span>Population Growth</span>
                  <span>+15% (5y)</span>
                </p>
                <div className="h-16 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={populationData}>
                      <defs>
                        <linearGradient id="colorSpark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <YAxis domain={['dataMin - 10000', 'dataMax + 10000']} hide />
                      <Area type="monotone" dataKey="pop" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorSpark)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* COLUMN 3: Vacancies & Bids */}
          <AnimatedSection delay={300} className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xl shadow-slate-200/50 h-full flex flex-col gap-6">
              
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

              <div className="w-full h-[1px] bg-gray-100" />

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
