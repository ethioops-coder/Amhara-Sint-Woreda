import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    page_code = f.read()

# 1. Restore HeroSlider back to its original full width form in page.tsx
# Replace the new TopHeroLayout with just DidYouKnowBar and HeroSlider
search_hero_layout = """<div>
              <DidYouKnowBar />
              <div className="max-w-[1400px] mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Slider Side */}
                  <div className="lg:col-span-8 rounded-3xl overflow-hidden shadow-2xl h-full min-h-[400px]">
                    <HeroSlider />
                  </div>
                  {/* Numerical Figures Side */}
                  <div className="lg:col-span-4 bg-gradient-to-br from-[#0B3D2E] to-[#145A44] rounded-3xl p-6 shadow-2xl flex flex-col justify-center">
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-[#EAB308]" /> Key Figures
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {HERO_STATS.map((s, i) => (
                        <div key={i} className="bg-white/10 rounded-2xl p-4 border border-white/10 flex flex-col items-center justify-center text-center">
                          <s.icon className="w-6 h-6 text-[#EAB308] mb-2" strokeWidth={1.5} />
                          <div className="text-xl font-black text-white mb-1">
                            <AnimatedCounter target={s.value} suffix={s.suffix} spaceFormat={true} />
                          </div>
                          <div className="text-[9px] font-medium text-white/70 uppercase tracking-wider">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>"""

original_hero = """<div>
              <DidYouKnowBar />
              <HeroSlider />
            </div>"""

if search_hero_layout in page_code:
    page_code = page_code.replace(search_hero_layout, original_hero)
else:
    print("Could not find new hero layout block")

# Make HeroSlider full width again
page_code = page_code.replace('<section className="relative h-full min-h-[400px] w-full overflow-hidden">', '<section className="relative h-[60vh] min-h-[380px] max-h-[600px] overflow-hidden">')

# 2. Remove AtAGlanceSection from the page
page_code = page_code.replace('<AtAGlanceSection />\n', '')
page_code = page_code.replace('import { AtAGlanceSection } from "@/components/at-a-glance-section";\n', '')

# 3. Create NewsAndStats Layout
# Replace PaginatedNewsSection with a grid
news_and_stats = """
          {/* News and Numerical Figures Side-by-Side */}
          <section className="py-16 bg-white border-t border-gray-100 relative">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* News Side (Left) */}
                <div className="lg:col-span-8">
                  <PaginatedNewsSection onNavigate={onNavigate} />
                </div>
                
                {/* Numerical Figures Side (Right) */}
                <div className="lg:col-span-4 sticky top-24">
                  <div className="bg-gradient-to-br from-[#0B3D2E] to-[#145A44] rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/40 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="bg-[#EAB308] rounded-xl p-2.5">
                          <BarChart3 className="w-6 h-6 text-[#0B3D2E]" />
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight">
                          Key Figures
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {HERO_STATS.map((s, i) => (
                          <div key={i} className="bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-2xl p-5 border border-white/10 flex flex-col items-center text-center group cursor-default">
                            <s.icon className="w-8 h-8 text-[#EAB308] mb-3 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                            <div className="text-2xl font-black text-white mb-1">
                              <AnimatedCounter target={s.value} suffix={s.suffix} spaceFormat={true} />
                            </div>
                            <div className="text-[10px] font-bold text-white/70 uppercase tracking-widest">{s.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </section>
"""

page_code = page_code.replace('<PaginatedNewsSection onNavigate={onNavigate} />', news_and_stats)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(page_code)
print("Updated page.tsx layout")
