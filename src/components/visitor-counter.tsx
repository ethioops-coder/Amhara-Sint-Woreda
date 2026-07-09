"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) return;
    const start = performance.now();
    const duration = 1800;
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
    // Record visit + get updated total
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
    <div className="bg-[#062B1F] border-t border-white/10 py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <Users className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <span className="text-white/50 text-sm">Total Visitors:</span>
        <span className="text-white font-extrabold text-lg tabular-nums">
          <AnimatedNumber value={total} />
        </span>
      </div>
    </div>
  );
}
