#!/usr/bin/env python3
"""Apply all changes to page.tsx on the reverted V28 version."""

import re

PATH = "/home/z/my-project/src/app/page.tsx"

with open(PATH, "r") as f:
    content = f.read()

# ── 1. Add Copy to imports ──
content = content.replace(
    'Compass, Share2, MessageCircle,\n} from "lucide-react";',
    'Compass, Share2, MessageCircle, Copy,\n} from "lucide-react";'
)

# ── 2. Add EnrollmentBanner before TVETCollegeSection ──
enrollment_banner = '''/* ─── ENROLLMENT BANNER (Home) ─────────────────────────── */
function EnrollmentBanner({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#062B1F] via-[#0B3D2E] to-[#0d4a38]">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[5%] w-72 h-72 bg-[#EAB308]/[0.07] rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-0 right-[10%] w-96 h-96 bg-[#16A34A]/[0.08] rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EAB308]/[0.03] rounded-full blur-3xl animate-spin-slow" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, #EAB308 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
          {/* Image */}
          <div className="relative shrink-0">
            <div className="relative">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden ring-4 ring-[#EAB308]/30 shadow-2xl shadow-[#EAB308]/10 animate-float">
                <img src="https://sfile.chatglm.cn/images-ppt/a842501dc00b.jpg" alt="TVET College" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -inset-2 rounded-2xl border-2 border-[#EAB308]/20 animate-pulse" />
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-rose-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-lg animate-float-delayed tracking-wider">NEW</div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#EAB308]/10 border border-[#EAB308]/20 rounded-full px-4 py-1.5 mb-4 animate-scale-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EAB308] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EAB308]"></span>
              </span>
              <GraduationCap className="w-3.5 h-3.5 text-[#EAB308]" />
              <span className="text-[#EAB308] text-[10px] md:text-xs font-bold uppercase tracking-[0.15em]">Admissions Open 2026/27</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.8rem] font-black text-white mb-3 leading-[1.1] tracking-tight">
              Enroll Now for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#EAB308] via-[#FDE047] to-[#EAB308] animate-gradient-shift bg-[length:200%_200%]">2026/27</span>
                <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#EAB308]/20 rounded-full -z-0" />
              </span>{" "}
              Academic Year
            </h2>
            <p className="text-white/55 text-sm md:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4">
              Certificate &amp; Diploma programs · Level I–IV · Duration: 1–4 years · Hands-on practical training
            </p>
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
                <Phone className="w-4 h-4 text-[#EAB308]" />
                <span className="text-white/70 text-xs md:text-sm font-medium">0334 470 0026 / 0027 / 0117</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-white/30 text-xs">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 500+ Students</span>
                <span>·</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> 8 Programs</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Level I–IV</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="shrink-0">
            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => onNavigate("svc-education")}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#EAB308] via-[#FDE047] to-[#EAB308] hover:from-[#d4a30a] hover:via-[#EAB308] hover:to-[#d4a30a] text-[#0B3D2E] font-black text-base md:text-lg px-8 py-4 rounded-2xl shadow-2xl shadow-[#EAB308]/25 hover:shadow-[#EAB308]/40 transition-all duration-500 hover:scale-105 animate-gradient-shift bg-[length:200%_200%]"
            >
              {hovered && <span className="absolute -inset-1 bg-[#EAB308]/20 rounded-2xl blur-xl -z-10 transition-opacity duration-500" />}
              Learn More
              <span className="flex items-center justify-center w-8 h-8 bg-[#0B3D2E]/10 rounded-xl group-hover:bg-[#0B3D2E]/20 transition-all">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* Scrolling programs marquee */}
        <div className="mt-8 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#062B1F] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d4a38] to-transparent z-10" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, si) => (
              <div key={si} className="flex items-center gap-6 mr-6">
                {["Wood Work Technology", "Garment Production", "Structural Construction", "Building Technology", "Web Development", "Computer Networking", "Animal Production", "Crop Production"].map((p, i) => (
                  <span key={`${si}-${i}`} className="text-white/15 text-sm font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]/30" />{p}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

'''

content = content.replace(
    "/* ─── TVET COLLEGE SECTION (Home) ───────────────────────── */\n",
    enrollment_banner + "/* ─── TVET COLLEGE SECTION (Home) ───────────────────────── */\n"
)

# ── 3. Redesign TVETCollegeSection ──
old_tvet = '''function TVETCollegeSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#0B3D2E] via-[#0a3327] to-[#062B1F] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAB308]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#145A44]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#EAB308]/10 border border-[#EAB308]/20 rounded-full px-4 py-1.5 mb-4">
              <GraduationCap className="w-4 h-4 text-[#EAB308]" />
              <span className="text-[#EAB308] text-xs font-bold uppercase tracking-wider">Technical & Vocational Education</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Amhara Sint <span className="text-[#EAB308]">TVET College</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto">Equipping youth with market-relevant skills in manufacturing, construction, ICT, and agriculture. Programs range from Level I to Level IV certification.</p>
          </div>
        </AnimatedSection>

        {/* Programs grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {TVET_PROGRAMS.map((sector, i) => (
            <AnimatedSection key={sector.sector} delay={i * 100}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#EAB308]/30 transition-all duration-500 group cursor-pointer h-full hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#EAB308]/5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: sector.color + "20" }}>
                  <sector.icon className="w-7 h-7" style={{ color: sector.color }} />
                </div>
                <h3 className="font-bold text-white text-lg mb-1 group-hover:text-[#EAB308] transition-colors">{sector.sector}</h3>
                <div className="w-8 h-0.5 rounded-full mb-3" style={{ backgroundColor: sector.color + "60" }} />
                <ul className="space-y-2">
                  {sector.programs.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: sector.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom info strip */}
        <AnimatedSection delay={400}>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img src="https://sfile.chatglm.cn/images-ppt/a842501dc00b.jpg" alt="TVET College" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#EAB308]/30" />
              <div>
                <h4 className="font-bold text-white text-lg">Enroll Now for 2026/27 Academic Year</h4>
                <p className="text-white/50 text-sm">Certificate & Diploma programs · Level I–IV · Duration: 1–4 years</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Phone className="w-4 h-4" />
                <span>0334 470 0026 / 0027 / 0117</span>
              </div>
              <button onClick={() => onNavigate("svc-education")} className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}'''

new_tvet = '''function TVETCollegeSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const [activeSector, setActiveSector] = useState(0);
  const collegeStats = [
    { value: 500, label: "Students Enrolled", icon: Users, color: "#10B981" },
    { value: 8, label: "Training Programs", icon: BookOpen, color: "#6366F1" },
    { value: 4, label: "Sectors", icon: Layers, color: "#F59E0B" },
    { value: 4, label: "Certification Levels", icon: Award, color: "#F43F5E" },
  ];
  return (
    <section className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-[#0B3D2E]/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#EAB308]/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#0B3D2E]/5 border border-[#0B3D2E]/10 rounded-full px-4 py-1.5 mb-5">
              <GraduationCap className="w-4 h-4 text-[#0B3D2E]" />
              <span className="text-[#0B3D2E] text-xs font-bold uppercase tracking-[0.15em]">Technical &amp; Vocational Education</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B3D2E] mb-4 leading-tight">
              Amhara Sint <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B3D2E] to-[#EAB308]">TVET College</span>
            </h2>
            <p className="text-[#0B3D2E]/50 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Equipping youth with market-relevant skills in manufacturing, construction, ICT, and agriculture. Programs range from Level I to Level IV certification with hands-on practical training.
            </p>
          </div>
        </AnimatedSection>

        {/* College Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {collegeStats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 80}>
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-lg hover:border-[#EAB308]/20 transition-all duration-500 group hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" style={{ backgroundColor: stat.color + "12" }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl md:text-3xl font-black text-[#0B3D2E] mb-1">
                  <AnimatedCounter target={stat.value} suffix="+" />
                </div>
                <p className="text-[#0B3D2E]/40 text-xs font-medium">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Programs — Interactive Tabs */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <AnimatedSection delay={200}>
            <div className="space-y-3">
              {TVET_PROGRAMS.map((sector, i) => (
                <button key={sector.sector} onClick={() => setActiveSector(i)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-500 text-left group ${activeSector === i ? "bg-[#0B3D2E] border-[#0B3D2E] shadow-xl shadow-[#0B3D2E]/10 -translate-y-0.5" : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-md"}`}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300" style={{ backgroundColor: activeSector === i ? "rgba(255,255,255,0.1)" : sector.color + "12" }}>
                    <sector.icon className="w-7 h-7 transition-colors duration-300" style={{ color: activeSector === i ? "#EAB308" : sector.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-base transition-colors duration-300 ${activeSector === i ? "text-white" : "text-[#0B3D2E]"}`}>{sector.sector}</h3>
                    <p className={`text-xs mt-0.5 transition-colors duration-300 ${activeSector === i ? "text-white/50" : "text-[#0B3D2E]/40"}`}>{sector.programs.join(" · ")}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${activeSector === i ? "bg-[#EAB308]" : "bg-gray-50"}`}>
                    <ArrowRight className={`w-4 h-4 transition-all duration-300 ${activeSector === i ? "text-[#0B3D2E]" : "text-gray-300"}`} />
                  </div>
                </button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="relative">
              {TVET_PROGRAMS.map((sector, i) => (
                <div key={sector.sector} className={`absolute inset-0 transition-all duration-500 ${activeSector === i ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-4 z-0"}`}>
                  <div className="h-full rounded-2xl overflow-hidden border border-gray-100 shadow-lg" style={{ backgroundColor: sector.bg }}>
                    <div className="p-8 md:p-10 flex flex-col justify-center h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: sector.color + "20" }}>
                          <sector.icon className="w-7 h-7" style={{ color: sector.color }} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-[#0B3D2E]">{sector.sector}</h3>
                          <p className="text-sm text-[#0B3D2E]/40 font-medium">{sector.programs.length} Training Programs</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {sector.programs.map((p) => (
                          <div key={p} className="flex items-center gap-3 bg-white/60 rounded-xl px-5 py-3.5 border border-white/80 hover:shadow-md transition-all duration-300 cursor-default">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: sector.color + "15" }}>
                              <CheckCircle2 className="w-4 h-4" style={{ color: sector.color }} />
                            </div>
                            <span className="font-semibold text-[#0B3D2E] text-sm">{p}</span>
                            <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: sector.color + "12", color: sector.color }}>Certificate</span>
                          </div>
                        ))}
                      </div>
                      <button onClick={() => onNavigate("svc-education")} className="mt-6 inline-flex items-center gap-2 bg-[#0B3D2E] hover:bg-[#145A44] text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] w-fit">
                        View Full Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="h-full min-h-[400px]" />
            </div>
          </AnimatedSection>
        </div>

        {/* CTA strip */}
        <AnimatedSection delay={400}>
          <div className="bg-gradient-to-r from-[#0B3D2E] via-[#145A44] to-[#0B3D2E] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 animate-gradient-shift bg-[length:200%_200%]" style={{ background: "linear-gradient(135deg, #0B3D2E, #145A44, #0a3327, #0B3D2E)", backgroundSize: "200% 200%" }} />
            <div className="relative z-10 flex items-center gap-4">
              <img src="https://sfile.chatglm.cn/images-ppt/a842501dc00b.jpg" alt="TVET" className="w-14 h-14 rounded-xl object-cover ring-2 ring-[#EAB308]/30 animate-float-delayed" />
              <div>
                <h4 className="font-bold text-white text-base md:text-lg">Ready to Build Your Future?</h4>
                <p className="text-white/45 text-sm">Apply now for the 2026/27 academic year — Limited seats available!</p>
              </div>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2 text-white/35 text-sm">
                <Phone className="w-4 h-4 text-[#EAB308]" />
                <span>0334 470 0026 / 0027 / 0117</span>
              </div>
              <button onClick={() => onNavigate("svc-education")} className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] font-bold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 whitespace-nowrap animate-pulse-glow">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}'''

content = content.replace(old_tvet, new_tvet)

# ── 4. Update homepage render order ──
old_home = '''default:
      return (
        <>
          <QuickStats />
          <DidYouKnowBar />
          <HeroSlider />
          <HeroStatsSection />
          <NewsFeedSection onNavigate={onNavigate} />
          <TVETCollegeSection onNavigate={onNavigate} />
          <CulturalPlacesSection onNavigate={onNavigate} />
          <GeoMapSection onNavigate={onNavigate} />
          <ServicesOverview onNavigate={onNavigate} />
        </>
      );'''

new_home = '''default:
      return (
        <>
          <QuickStats />
          <EnrollmentBanner onNavigate={onNavigate} />
          <NewsFeedSection onNavigate={onNavigate} />
          <DidYouKnowBar />
          <HeroSlider />
          <HeroStatsSection />
          <TVETCollegeSection onNavigate={onNavigate} />
          <CulturalPlacesSection onNavigate={onNavigate} />
          <GeoMapSection onNavigate={onNavigate} />
          <ServicesOverview onNavigate={onNavigate} />
        </>
      );'''

content = content.replace(old_home, new_home)

# ── 5. Update news section — better spacing + share dropdown ──
content = content.replace(
    '    <section className="py-16 md:py-20 bg-gray-50">\n      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">\n        <AnimatedSection>\n          <div className="text-center mb-10">\n            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-2">Latest News & Updates</h2>\n            <p className="text-[#0B3D2E]/60 max-w-2xl mx-auto">Stay informed about the latest developments from Amhara Sint Woreda</p>',
    '    <section className="py-20 md:py-28 bg-gray-50">\n      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10">\n        <AnimatedSection>\n          <div className="text-center mb-14">\n            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B3D2E] mb-3">Latest News & Updates</h2>\n            <p className="text-[#0B3D2E]/60 max-w-2xl mx-auto text-base">Stay informed about the latest developments from Amhara Sint Woreda</p>'
)

content = content.replace(
    '        <div className="space-y-6">',
    '        <div className="space-y-8">'
)

# News card: border + rounded + more padding
content = content.replace(
    '                <Card className="bg-white border-0 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group">',
    '                <Card className="bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden group rounded-2xl">'
)

# Author header padding
content = content.replace(
    '                  <div className="flex items-center gap-3 px-5 pt-5 pb-3">',
    '                  <div className="flex items-center gap-3 px-6 pt-6 pb-4">'
)

# Author avatar size
content = content.replace(
    'className="w-11 h-11 rounded-full object-cover ring-2 ring-[#0B3D2E]/10"',
    'className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0B3D2E]/10"'
)

# Content area padding
content = content.replace(
    '                  <div className="px-5 pt-4 pb-2">\n                    <h3 className="font-extrabold text-[#0B3D2E] text-lg mb-2',
    '                  <div className="px-6 pt-5 pb-3">\n                    <h3 className="font-extrabold text-[#0B3D2E] text-lg mb-3'
)

# Action bar padding
content = content.replace(
    '                  <div className="px-5 py-3 border-t border-gray-100">\n                    <div className="flex items-center justify-between">',
    '                  <div className="px-6 py-4 border-t border-gray-100">\n                    <div className="flex items-center justify-between gap-3">'
)

# Like button
content = content.replace(
    'className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isLiked ? "bg-red-50 text-red-500" : "bg-gray-50 text-[#0B3D2E]/50 hover:bg-red-50 hover:text-red-500"}`}',
    'className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isLiked ? "bg-red-50 text-red-500" : "bg-gray-50 text-[#0B3D2E]/50 hover:bg-red-50 hover:text-red-500"}`}'
)
content = content.replace(
    '<Heart className={`w-4 h-4 transition-transform duration-300 ${isLiked ? "fill-red-500 scale-110" : ""}',
    '<Heart className={`w-[18px] h-[18px] transition-transform duration-300 ${isLiked ? "fill-red-500 scale-110" : ""}'
)

# Comment button
content = content.replace(
    'className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isCommentOpen ? "bg-blue-50 text-blue-500" : "bg-gray-50 text-[#0B3D2E]/50 hover:bg-blue-50 hover:text-blue-500"}`}',
    'className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isCommentOpen ? "bg-blue-50 text-blue-500" : "bg-gray-50 text-[#0B3D2E]/50 hover:bg-blue-50 hover:text-blue-500"}`}'
)
content = content.replace(
    '<MessageCircle className="w-4 h-4" />',
    '<MessageCircle className="w-[18px] h-[18px]" />'
)

# Share button
content = content.replace(
    'className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${isShareOpen ? "bg-green-50 text-green-600" : "bg-gray-50 text-[#0B3D2E]/50 hover:bg-green-50 hover:text-green-600"}`}',
    'className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isShareOpen ? "bg-green-50 text-green-600" : "bg-gray-50 text-[#0B3D2E]/50 hover:bg-green-50 hover:text-green-600"}`}'
)
content = content.replace(
    '<Share2 className="w-4 h-4" />',
    '<Share2 className="w-[18px] h-[18px]" />'
)

# Share dropdown: replace Instagram with WhatsApp, better animation, add Copy
old_share = '''                          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 min-w-[200px] animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <p className="text-[10px] font-bold text-[#0B3D2E]/40 uppercase tracking-wider px-2 mb-2">Share to</p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {[
                                { icon: Facebook, label: "Facebook", color: "#1877F2", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
                                { icon: Twitter, label: "Telegram", color: "#0088CC", url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(item.title)}` },
                                { icon: Instagram, label: "Instagram", color: "#E4405F", url: "#" },
                                { icon: Linkedin, label: "LinkedIn", color: "#0A66C2", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
                              ].map((s) => (
                                <a
                                  key={s.label}
                                  href={s.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => { if (s.url === "#") e.preventDefault(); setShareOpen(null); }}
                                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group/share"
                                >
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover/share:scale-110" style={{ backgroundColor: s.color + "15" }}>
                                    <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                                  </div>
                                  <span className="text-xs font-medium text-[#0B3D2E]/70">{s.label}</span>
                                </a>
                              ))}
                            </div>
                            <button
                              onClick={() => { navigator.clipboard?.writeText(shareUrl); setShareOpen(null); }}
                              className="w-full mt-2 text-center text-xs font-medium text-[#0B3D2E]/50 hover:text-[#0B3D2E] py-2 rounded-lg hover:bg-gray-50 transition-all"
                            >
                              Copy Link
                            </button>
                          </div>'''

new_share = '''                          <div className="absolute bottom-full right-0 mb-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 min-w-[220px] animate-scale-in">
                            <p className="text-[10px] font-bold text-[#0B3D2E]/40 uppercase tracking-wider px-2 mb-2">Share to</p>
                            <div className="grid grid-cols-2 gap-1.5">
                              {[
                                { icon: Facebook, label: "Facebook", color: "#1877F2", url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
                                { icon: Twitter, label: "Telegram", color: "#0088CC", url: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(item.title)}` },
                                { icon: Linkedin, label: "LinkedIn", color: "#0A66C2", url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
                                { icon: MessageCircle, label: "WhatsApp", color: "#25D366", url: `https://wa.me/?text=${encodeURIComponent(item.title + " " + shareUrl)}` },
                              ].map((s) => (
                                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" onClick={() => setShareOpen(null)}
                                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group/share">
                                  <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover/share:scale-110" style={{ backgroundColor: s.color + "15" }}>
                                    <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                                  </div>
                                  <span className="text-xs font-medium text-[#0B3D2E]/70">{s.label}</span>
                                </a>
                              ))}
                            </div>
                            <button onClick={() => { navigator.clipboard?.writeText(shareUrl); setShareOpen(null); }}
                              className="w-full mt-2 text-center text-xs font-medium text-[#0B3D2E]/50 hover:text-[#0B3D2E] py-2 rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-1.5">
                              <Copy className="w-3.5 h-3.5" /> Copy Link
                            </button>
                          </div>'''

content = content.replace(old_share, new_share)

# ── 6. QuickStats spacing ──
content = content.replace(
    '    <section id="statistics-section" className="bg-white border-b border-gray-100">\n      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">\n        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">',
    '    <section id="statistics-section" className="bg-white border-b border-gray-100">\n      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-7 md:py-8">\n        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5">'
)

# ── 7. QuickNavBar spacing ──
content = content.replace(
    '    <div className="bg-white border-b border-gray-100">\n      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">\n        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">',
    '    <div className="bg-white border-b border-gray-100">\n      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">\n        <div className="flex items-center gap-2.5 py-3.5 overflow-x-auto scrollbar-hide">'
)
content = content.replace(
    'className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 hover:bg-[#0B3D2E] text-[#0B3D2E]/70 hover:text-white text-sm font-medium border border-gray-200 hover:border-[#0B3D2E] transition-all duration-200 whitespace-nowrap shrink-0"',
    'className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-50 hover:bg-[#0B3D2E] text-[#0B3D2E]/70 hover:text-white text-[13px] font-medium border border-gray-200 hover:border-[#0B3D2E] transition-all duration-200 whitespace-nowrap shrink-0"'
)
content = content.replace(
    'className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-sm font-semibold border border-red-200 transition-all duration-200 whitespace-nowrap shrink-0 ml-auto"',
    'className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-[13px] font-semibold border border-red-200 transition-all duration-200 whitespace-nowrap shrink-0 ml-auto"'
)

# ── 8. Header nav spacing + social media icons ──
content = content.replace(
    '          <nav className="hidden lg:flex items-center gap-1">',
    '          <nav className="hidden lg:flex items-center gap-1.5">'
)
content = content.replace(
    'className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-[15px] font-semibold',
    'className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-[15px] font-semibold'
)

# Add social media icons in header
content = content.replace(
    '          <div className="flex items-center gap-3">\n            <button onClick={() => nav("contact")}',
    '          <div className="flex items-center gap-2">\n            <div className="hidden md:flex items-center gap-1 mr-1">\n              {[{ I: Facebook, u: "https://facebook.com/100066823706013" }, { I: Youtube, u: "https://youtube.com/@AmharaSint" }, { I: Twitter, u: "https://t.me/AmharaSint" }, { I: Instagram, u: "https://instagram.com/AmharaSint" }].map((s) => (\n                <a key={s.u} href={s.u} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"><s.I className="w-3.5 h-3.5" /></a>\n              ))}\n            </div>\n            <button onClick={() => nav("contact")}'
)

# ── 9. Footer: spacing + social links ──
content = content.replace(
    '    <footer className="bg-[#062B1F] border-t border-white/5">\n      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">\n        <div className="grid md:grid-cols-4 gap-8">',
    '    <footer className="bg-[#062B1F] border-t border-white/5">\n      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 md:py-20">\n        <div className="grid md:grid-cols-4 gap-10 lg:gap-14">'
)

# Footer social icons
content = content.replace(
    '            <div className="flex gap-2">\n              {[  { I: Facebook, u: "https://facebook.com/100066823706013" }, { I: Youtube, u: "https://youtube.com/@AmharaSint" }, { I: Twitter, u: "https://t.me/AmharaSint" }, { I: Instagram, u: "https://facebook.com/100066823706013" }].map((s) => (\n                <a key={s.u} href={s.u} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"><s.I className="w-4 h-4" /></a>\n              ))}\n            </div>',
    '            <div className="flex gap-2.5 mb-5">\n              {[\n                { I: Facebook, u: "https://facebook.com/100066823706013", label: "Facebook" },\n                { I: Youtube, u: "https://youtube.com/@AmharaSint", label: "YouTube" },\n                { I: Twitter, u: "https://t.me/AmharaSint", label: "Telegram" },\n                { I: Instagram, u: "https://instagram.com/AmharaSint", label: "Instagram" },\n                { I: Linkedin, u: "https://linkedin.com/company/amhara-sint-woreda", label: "LinkedIn" },\n              ].map((s) => (\n                <a key={s.u} href={s.u} target="_blank" rel="noopener noreferrer" title={s.label} className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-[#EAB308]/20 hover:scale-110 transition-all duration-300"><s.I className="w-4 h-4" /></a>\n              ))}\n            </div>'
)

# Footer column headings & links
content = content.replace(
    '              <h4 className="text-white font-bold text-sm mb-4">{col.title}</h4>\n              <ul className="space-y-2">',
    '              <h4 className="text-white font-bold text-sm mb-5">{col.title}</h4>\n              <ul className="space-y-3">'
)
content = content.replace(
    'className="text-white/40 hover:text-white text-xs transition-colors"',
    'className="text-white/40 hover:text-white text-[13px] transition-colors py-0.5"'
)

# Footer bottom bar
content = content.replace(
    '        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">\n          <p className="text-white/30 text-xs">2026 Amhara Sint Woreda Administration. All rights reserved.</p>\n          <p className="text-white/30 text-xs">Developed by <span className="text-[#86EFAC]">Meseret Akalu</span> | +251 912 465 247</p>',
    '        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">\n          <p className="text-white/30 text-sm">2026 Amhara Sint Woreda Administration. All rights reserved.</p>\n          <p className="text-white/30 text-sm">Developed by <span className="text-[#86EFAC]">Meseret Akalu</span> | +251 912 465 247</p>'
)

with open(PATH, "w") as f:
    f.write(content)

print(f"Done! File now has {len(content.splitlines())} lines")