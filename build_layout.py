import re

# 1. Create DetailedStatsSection
detailed_stats = """import { Users, Map, MapPin, HeartPulse, Stethoscope, School, GraduationCap, Banknote, TrendingUp, Activity, ShieldCheck, Award } from "lucide-react";
import { AnimatedSection, AnimatedCounter } from "./animations";

const DETAILED_STATS = [
  {
    category: "Demographics & Area",
    icon: Users,
    stats: [
      { label: "Total Population", value: 214056, suffix: "+", desc: "Growing at 2.4% annually", icon: Users, color: "#16A34A" },
      { label: "Total Area", value: 1437, suffix: " km²", desc: "Arable and mountainous terrain", icon: Map, color: "#7C3AED" },
      { label: "Administrative Kebeles", value: 37, suffix: "", desc: "Local governance units", icon: MapPin, color: "#2563EB" },
    ]
  },
  {
    category: "Healthcare Services",
    icon: HeartPulse,
    stats: [
      { label: "Primary Hospitals", value: 1, suffix: "", desc: "Comprehensive care facility", icon: HeartPulse, color: "#DC2626" },
      { label: "Health Centers", value: 8, suffix: "", desc: "Community-level medical services", icon: Stethoscope, color: "#0891B2" },
      { label: "Health Coverage", value: 85, suffix: "%", desc: "Access to basic healthcare", icon: Activity, color: "#059669" },
    ]
  },
  {
    category: "Education Sector",
    icon: School,
    stats: [
      { label: "Public Schools", value: 106, suffix: "+", desc: "Primary & Secondary education", icon: School, color: "#D97706" },
      { label: "Higher Education", value: 1, suffix: "", desc: "TVET / College facility", icon: GraduationCap, color: "#4F46E5" },
      { label: "Literacy Rate", value: 72, suffix: "%", desc: "Rising steadily each year", icon: Award, color: "#EA580C" },
    ]
  },
  {
    category: "Economy & Budget",
    icon: Banknote,
    stats: [
      { label: "Annual Budget", value: 200, suffix: "M ETB", desc: "Allocated for development", icon: Banknote, color: "#EAB308" },
      { label: "Local Businesses", value: 1200, suffix: "+", desc: "Registered SMEs and trades", icon: TrendingUp, color: "#2563EB" },
      { label: "Service Fulfillment", value: 94, suffix: "%", desc: "Budget utilization rate", icon: ShieldCheck, color: "#16A34A" },
    ]
  }
];

export function DetailedStatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0B3D2E] to-[#145A44] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 mb-3 backdrop-blur-sm">
            Woreda In Numbers
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Amhara Sayint <span className="text-[#EAB308]">Key Figures</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A comprehensive overview of our district's resources, infrastructure, and developmental progress.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DETAILED_STATS.map((group, i) => (
            <AnimatedSection key={group.category} delay={i * 100}>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 h-full flex flex-col hover:bg-white/15 transition-colors duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="bg-[#EAB308] rounded-xl p-2">
                    <group.icon className="w-5 h-5 text-[#0B3D2E]" />
                  </div>
                  <h3 className="font-bold text-white text-lg tracking-wide">{group.category}</h3>
                </div>
                
                <div className="flex flex-col gap-6 flex-1">
                  {group.stats.map((stat, j) => (
                    <div key={j} className="flex gap-4 items-start">
                      <div className="mt-1" style={{ color: stat.color }}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-white mb-0.5 flex items-baseline gap-1">
                          <AnimatedCounter target={stat.value} suffix={stat.suffix} spaceFormat={true} />
                        </div>
                        <div className="text-xs font-bold text-white/90 uppercase tracking-wide mb-1">{stat.label}</div>
                        <div className="text-[10px] text-white/60">{stat.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
"""

with open("src/components/detailed-stats-section.tsx", "w", encoding="utf-8") as f:
    f.write(detailed_stats)

print("Created DetailedStatsSection")

# 2. Modify PaginatedNewsSection so it doesn't take up the full screen width and fits well side-by-side
with open("src/components/paginated-news-section.tsx", "r", encoding="utf-8") as f:
    news_code = f.read()

# Change grid-cols-4 to grid-cols-2 for the news grid because it will be in a half-screen column
news_code = news_code.replace("lg:grid-cols-4", "lg:grid-cols-2")
with open("src/components/paginated-news-section.tsx", "w", encoding="utf-8") as f:
    f.write(news_code)

# 3. Modify CitizenServicesSection to fit side-by-side
with open("src/components/homepage-sections.tsx", "r", encoding="utf-8") as f:
    services_code = f.read()

# Make CitizenServicesSection return just the div so it can be composed inside a grid
# Currently it has:
# <section className="py-12 md:py-16 bg-gray-50">
#   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
services_code = services_code.replace('<section className="py-12 md:py-16 bg-gray-50">', '<div className="w-full h-full">')
services_code = services_code.replace('</section>', '</div>')
services_code = services_code.replace('<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">', '<div className="w-full h-full">')

# Also change grid-cols-4 to grid-cols-2 for CitizenServicesSection
services_code = services_code.replace('<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">', '<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">')

with open("src/components/homepage-sections.tsx", "w", encoding="utf-8") as f:
    f.write(services_code)

# 4. Assemble in page.tsx
with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    page_code = f.read()

# Import the new DetailedStatsSection
page_code = page_code.replace('import { HomeDashboardSection } from "@/components/home-dashboard-section";', 'import { HomeDashboardSection } from "@/components/home-dashboard-section";\nimport { DetailedStatsSection } from "@/components/detailed-stats-section";')

# We need to replace the old News and Numerical Figures Side-by-Side with the new layout
old_layout_pattern = r'\{\/\* News and Numerical Figures Side-by-Side \*\/\}.*?<\/section>'
import re

new_layout = """
          <DetailedStatsSection />

          {/* News and Services Side-by-Side */}
          <section className="py-16 bg-gray-50 border-t border-gray-100 relative">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* News Side (Left) */}
                <div className="w-full">
                  <PaginatedNewsSection onNavigate={onNavigate} />
                </div>
                
                {/* Services Side (Right) */}
                <div className="w-full">
                  <CitizenServicesSection onNavigate={onNavigate} />
                </div>
                
              </div>
            </div>
          </section>
"""

page_code = re.sub(old_layout_pattern, new_layout, page_code, flags=re.DOTALL)

# We also need to remove the standalone <CitizenServicesSection /> that was placed earlier
page_code = page_code.replace('          <CitizenServicesSection onNavigate={onNavigate} />\n', '', 1)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(page_code)

print("Updated page.tsx")
