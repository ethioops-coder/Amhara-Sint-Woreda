"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) return;
    const start = performance.now();
    const duration = 2000;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{display.toLocaleString()}</span>;
}

export default function VisitorCounter() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: window.location.pathname }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.totalVisits !== undefined) setTotal(data.totalVisits);
        else fetch("/api/track").then((r) => r.json()).then((d) => setTotal(d.totalVisits ?? 0));
      })
      .catch(() => {
        fetch("/api/track").then((r) => r.json()).then((d) => setTotal(d.totalVisits ?? 0)).catch(() => {});
      });
  }, []);

  if (total === null) return null;

  return (
    <div className="bg-gradient-to-r from-[#0a2e1f] via-[#0B3D2E] to-[#0a2e1f] border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-4">

        {/* Circular badge */}
        <div className="relative flex items-center justify-center">
          {/* Outer glow ring */}
          <div className="absolute w-40 h-40 rounded-full bg-[#EAB308]/10 animate-ping" style={{ animationDuration: "3s" }} />
          {/* Mid ring */}
          <div className="absolute w-36 h-36 rounded-full border-2 border-[#EAB308]/30" />
          {/* Inner ring */}
          <div className="absolute w-32 h-32 rounded-full border border-[#EAB308]/20" />

          {/* Main circle */}
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#EAB308] to-[#CA8A04] shadow-2xl shadow-[#EAB308]/40 flex flex-col items-center justify-center gap-0.5">
            <Eye className="w-5 h-5 text-[#0B3D2E] mb-0.5" />
            <span className="text-[#0B3D2E] font-black text-xl leading-none tabular-nums">
              <AnimatedNumber value={total} />
            </span>
            <span className="text-[#0B3D2E]/70 text-[9px] font-bold uppercase tracking-widest leading-none">
              Visitors
            </span>
          </div>
        </div>

        {/* Label below */}
        <div className="text-center">
          <p className="text-white/70 text-sm font-semibold tracking-wide">Total Page Visitors</p>
          <p className="text-white/30 text-xs mt-0.5">Amhara Sint Woreda Official Portal</p>
        </div>

      </div>
    </div>
  );
}
