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
    <div className="bg-gradient-to-r from-[#0a2e1f] via-[#0B3D2E] to-[#0a2e1f] border-t border-white/10 py-5">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-4">

        {/* Small circle */}
        <div className="relative flex items-center justify-center">
          {/* Pulse ring */}
          <div className="absolute w-16 h-16 rounded-full bg-[#EAB308]/15 animate-ping" style={{ animationDuration: "3s" }} />
          {/* Border ring */}
          <div className="absolute w-14 h-14 rounded-full border border-[#EAB308]/30" />
          {/* Main circle */}
          <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#EAB308] to-[#CA8A04] shadow-lg shadow-[#EAB308]/30 flex flex-col items-center justify-center">
            <Eye className="w-3 h-3 text-[#0B3D2E]" />
            <span className="text-[#0B3D2E] font-black text-[9px] leading-none mt-0.5 tabular-nums">
              <AnimatedNumber value={total} />
            </span>
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-white font-bold text-sm leading-tight">
            <AnimatedNumber value={total} /> <span className="text-[#EAB308]">Visitors</span>
          </p>
          <p className="text-white/40 text-xs">Total page visitors</p>
        </div>

      </div>
    </div>
  );
}
