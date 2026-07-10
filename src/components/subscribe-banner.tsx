"use client";

import { useState } from "react";
import { Bell, Send, CheckCircle2 } from "lucide-react";

export default function SubscribeBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0B3D2E] via-[#145A44] to-[#0B3D2E] border-t border-white/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Left — label */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#EAB308]/20 flex items-center justify-center">
              <Bell className="w-4 h-4 text-[#EAB308]" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Stay Updated</p>
              <p className="text-white/40 text-xs leading-tight hidden sm:block">Get latest news & announcements</p>
            </div>
          </div>

          {/* Right — form */}
          {status === "success" ? (
            <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium px-4 py-2 rounded-xl">
              <CheckCircle2 className="w-4 h-4" />
              Subscribed successfully!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full sm:w-auto max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-9 bg-white/10 border border-white/20 rounded-lg px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EAB308]/60 focus:bg-white/15 transition-all min-w-0"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="h-9 px-4 bg-[#EAB308] hover:bg-[#CA8A04] disabled:bg-[#EAB308]/50 text-[#0B3D2E] font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shrink-0 shadow-md hover:shadow-lg"
              >
                {status === "loading" ? (
                  <div className="w-3.5 h-3.5 border-2 border-[#0B3D2E]/30 border-t-[#0B3D2E] rounded-full animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                Subscribe
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-400 text-xs">Failed. Try again.</p>
          )}

        </div>
      </div>
    </div>
  );
}
