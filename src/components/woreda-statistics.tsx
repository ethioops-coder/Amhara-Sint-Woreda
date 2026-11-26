"use client";
import React, { useEffect, useState, useRef } from "react";
import { Users, School, HeartPulse, MapPin, Map, Banknote, Tractor, Droplets } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Cell } from "recharts";

const stats = [
  { label: "Total Population", value: 156940, icon: Users, color: "#10B981" },
  { label: "Total Area (km²)", value: 1437, icon: Map, color: "#3B82F6" },
  { label: "Active Kebeles", value: 37, icon: MapPin, color: "#F59E0B" },
  { label: "Educational Institutions", value: 106, icon: School, color: "#6366F1" },
  { label: "Health Facilities", value: 8, icon: HeartPulse, color: "#EF4444" },
  { label: "Annual Budget (M ETB)", value: 200, icon: Banknote, color: "#14B8A6" },
];

const populationData = [
  { year: "1994", pop: 193616 },
  { year: "2007", pop: 144972 },
  { year: "2012", pop: 156940 },
  { year: "2018", pop: 165000 },
  { year: "2024", pop: 178000 },
];

const budgetData = [
  { sector: "Education", amount: 85, fill: "#6366F1" },
  { sector: "Health", amount: 45, fill: "#EF4444" },
  { sector: "Agriculture", amount: 40, fill: "#10B981" },
  { sector: "Infrastructure", amount: 30, fill: "#F59E0B" },
];

function Counter({ end, duration = 2000 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let startTime: number | null = null;
        const animate = (time: number) => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / duration, 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);
  
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function WoredaStatistics() {
  return (
    <section id="statistics-section" className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-100/50 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-2">Amhara Sayint by the Numbers</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Amazing Numerical Figures</h3>
          <p className="text-slate-600">Discover the growth, infrastructure, and community demographics that define our Woreda.</p>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
          {stats.map((s, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100/60 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center text-center group relative overflow-hidden">
              {/* Animated subtle background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br" style={{ backgroundImage: `linear-gradient(to bottom right, transparent, ${s.color})` }} />
              
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm relative" style={{ backgroundColor: `${s.color}15` }}>
                <s.icon size={32} style={{ color: s.color }} className="relative z-10" />
                <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ backgroundColor: s.color, animationDuration: '3s' }} />
              </div>
              <h4 className="text-5xl font-black mb-3 tracking-tight bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${s.color}, #1e293b)` }}>
                <Counter end={s.value} />
                {s.label.includes("Budget") && "M"}
              </h4>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Population Growth Chart */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Users className="text-emerald-500" /> Population Growth (2018-2024)
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={populationData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [value.toLocaleString(), "Population"]}
                  />
                  <Area type="monotone" dataKey="pop" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorPop)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Budget Allocation Chart */}
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <h4 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Banknote className="text-blue-500" /> Budget Allocation by Sector (Millions ETB)
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                  <YAxis dataKey="sector" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 600}} dx={-10} />
                  <Tooltip 
                    cursor={{fill: '#F8FAFC'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value}M ETB`, "Budget"]}
                  />
                  <Bar dataKey="amount" radius={[0, 8, 8, 0]} barSize={32}>
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
