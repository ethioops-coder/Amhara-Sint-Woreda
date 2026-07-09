"use client";

import { useEffect, useState } from "react";
import { Eye, Users, TrendingUp, Globe } from "lucide-react";

interface Stats {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  todayVisits: number;
  monthVisits: number;
}

function Counter({ value, duration = 1500 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) return;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value, duration]);
  return <span>{display.toLocaleString()}</span>;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    // Record this visit
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: window.location.pathname }),
    }).then((r) => r.json()).then((data) => {
      if (data.success) {
        // Fetch full stats after recording
        fetch("/api/track")
          .then((r) => r.json())
          .then(setStats)
          .catch(() => {});
      }
    }).catch(() => {
      // Fallback — just fetch stats
      fetch("/api/track")
        .then((r) => r.json())
        .then(setStats)
        .catch(() => {});
    });
  }, []);

  if (!stats) return null;

  return (
    <div className="bg-gradient-to-r from-[#062B1F] to-[#0B3D2E] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {/* Total Visitors */}
          <div className="flex items-center gap-2.5 text-white/70">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wide leading-tight">Total Visitors</div>
              <div className="text-base font-bold text-white leading-tight">
                <Counter value={stats.uniqueVisitors} />
              </div>
            </div>
          </div>

          <div className="w-px h-8 bg-white/10 hidden sm:block" />

          {/* Page Views */}
          <div className="flex items-center gap-2.5 text-white/70">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Eye className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wide leading-tight">Page Views</div>
              <div className="text-base font-bold text-white leading-tight">
                <Counter value={stats.pageViews} />
              </div>
            </div>
          </div>

          <div className="w-px h-8 bg-white/10 hidden sm:block" />

          {/* Today */}
          <div className="flex items-center gap-2.5 text-white/70">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wide leading-tight">Today</div>
              <div className="text-base font-bold text-white leading-tight">
                <Counter value={stats.todayVisits} />
              </div>
            </div>
          </div>

          <div className="w-px h-8 bg-white/10 hidden sm:block" />

          {/* This Month */}
          <div className="flex items-center gap-2.5 text-white/70">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Globe className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <div className="text-xs text-white/40 uppercase tracking-wide leading-tight">This Month</div>
              <div className="text-base font-bold text-white leading-tight">
                <Counter value={stats.monthVisits} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
