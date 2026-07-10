"use client";
import { useState } from "react";
import {
  ChevronRight, MapPinned, Phone, Mail, Facebook, Youtube, Linkedin, Github, Instagram, Twitter,
} from "lucide-react";
import type { PageId } from "@/lib/types";

function NewsletterWidget() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      if (res.ok) { setStatus("success"); setEmail(""); } else { setStatus("error"); }
    } catch { setStatus("error"); }
  };
  return (
    <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
      <div className="flex">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" required className="flex-1 min-w-0 h-9 bg-white/10 border border-white/15 rounded-l-lg px-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#EAB308]/50" />
        <button type="submit" disabled={status === "loading"} className="h-9 px-3 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-semibold text-xs rounded-r-lg transition-colors disabled:opacity-60 shrink-0">{status === "loading" ? "..." : "Join"}</button>
      </div>
      {status === "success" && <p className="text-[#86EFAC] text-xs">Subscribed successfully!</p>}
      {status === "error" && <p className="text-red-300 text-xs">Something went wrong. Try again.</p>}
    </form>
  );
}

export default function Footer({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const goPage = (p: PageId) => { onNavigate(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #062B1F 0%, #0B3D2E 30%, #0D4A35 50%, #0B3D2E 70%, #062B1F 100%)" }}>
      <div className="h-1 bg-gradient-to-r from-[#EAB308] via-[#FACC15] to-[#EAB308]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="Amhara Sayint Woreda Logo" className="h-16 w-auto rounded-xl shadow-lg ring-2 ring-white/20" />
              <div><h3 className="text-white font-bold text-base leading-tight">Amhara Sayint</h3><p className="text-[#86EFAC] text-xs font-medium">Woreda Administration</p></div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">Committed to transparency, development, and the well-being of every citizen.</p>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">About</h4>
            <ul className="space-y-2.5">
              {([{ label: "History & Background", href: "about-history" as PageId }, { label: "Overview", href: "about-overview" as PageId }, { label: "Location", href: "about-location" as PageId }]).map((l) => (
                <li key={l.href}><button onClick={() => goPage(l.href)} className="text-white/50 hover:text-[#EAB308] text-sm transition-colors flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5" />{l.label}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {([{ label: "Education", href: "svc-education" as PageId }, { label: "Health", href: "svc-health" as PageId }, { label: "Agriculture", href: "svc-agriculture" as PageId }, { label: "Transport", href: "svc-transport" as PageId }]).map((l) => (
                <li key={l.href}><button onClick={() => goPage(l.href)} className="text-white/50 hover:text-[#EAB308] text-sm transition-colors flex items-center gap-1.5"><ChevronRight className="w-3.5 h-3.5" />{l.label}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5"><MapPinned className="w-4 h-4 text-[#EAB308] mt-0.5 shrink-0" /><p className="text-white/50 text-sm">Amhara Sayint Town, South Wollo Zone, Amhara, Ethiopia</p></div>
              <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-[#EAB308] shrink-0" /><p className="text-white/50 text-sm">+251 33 XXX XXXX</p></div>
              <div className="flex items-center gap-2.5"><Mail className="w-4 h-4 text-[#EAB308] shrink-0" /><p className="text-white/50 text-sm">info@amharasint.gov.et</p></div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Newsletter</h4>
            <p className="text-white/50 text-sm mb-3">Stay updated with the latest from Amhara Sayint.</p>
            <NewsletterWidget />
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Follow Us</h4>
            <div className="flex flex-wrap gap-2.5">
              {([
                { icon: Facebook, url: "https://facebook.com/AmharaSint", color: "bg-[#1877F2] hover:bg-[#1565C0]" },
                { icon: Youtube, url: "https://youtube.com/@AmharaSint", color: "bg-[#FF0000] hover:bg-[#CC0000]" },
                { icon: Linkedin, url: "https://www.linkedin.com/in/meseret-akalu-76363121b/", color: "bg-[#0A66C2] hover:bg-[#084F97]" },
                { icon: Github, url: "https://github.com/AmharaSint", color: "bg-[#333] hover:bg-[#24292F]" },
                { icon: Instagram, url: "https://instagram.com/AmharaSint", color: "bg-[#E4405F] hover:bg-[#C13584]" },
                { icon: Twitter, url: "https://twitter.com/AmharaSint", color: "bg-[#1DA1F2] hover:bg-[#0D8BD9]" },
              ]).map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}><s.icon className="w-4.5 h-4.5" /></a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col items-center gap-3">
          <p className="text-white/40 text-xs">&copy; {new Date().getFullYear()} Amhara Sayint Woreda Administration. All rights reserved.</p>
          <div className="flex items-center gap-3 bg-[#EAB308]/15 border border-[#EAB308]/25 rounded-full px-5 py-2.5 hover:bg-[#EAB308]/25 transition-all duration-300 group">
            <div className="w-8 h-8 rounded-full bg-[#EAB308] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"><span className="text-[#0B3D2E] font-extrabold text-xs">MA</span></div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm leading-tight">Developed by Meseret Akalu</span>
              <span className="text-[#EAB308] font-semibold text-xs leading-tight">+251 912 465 247</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
