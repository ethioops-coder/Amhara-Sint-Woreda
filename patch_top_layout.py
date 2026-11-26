import re

# 1. Modify AtAGlanceSection to ONLY be the "About" section, removing the stats from it.
with open("src/components/at-a-glance-section.tsx", "r", encoding="utf-8") as f:
    at_a_glance_code = f.read()

# We need to extract KEY_STATS from it and put it in page.tsx
key_stats_match = re.search(r'const KEY_STATS = \[.*?\];', at_a_glance_code, re.DOTALL)
key_stats_code = key_stats_match.group(0) if key_stats_match else ""

# Remove the stats cards rendering from AtAGlanceSection
# It starts with: {/* Title removed to avoid duplication */}
# And ends before: {/* Side-by-Side Information */}
start_idx = at_a_glance_code.find("{/* Title removed to avoid duplication */}")
end_idx = at_a_glance_code.find("{/* Side-by-Side Information */}")
if start_idx != -1 and end_idx != -1:
    at_a_glance_code = at_a_glance_code[:start_idx] + at_a_glance_code[end_idx:]

with open("src/components/at-a-glance-section.tsx", "w", encoding="utf-8") as f:
    f.write(at_a_glance_code)

# 2. Modify page.tsx
with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    page_code = f.read()

# Add KEY_STATS to page.tsx just before HeroSlider
if key_stats_code and "const KEY_STATS" not in page_code:
    # insert before HeroSlider
    page_code = page_code.replace("function HeroSlider() {", key_stats_code + "\n\nfunction HeroSlider() {")

# We want the HeroSlider and the new numerical figures next to each other.
# We will create a new component `TopHeroLayout` or just inline it in PageContent.
hero_slider_usage = """<div>
              <DidYouKnowBar />
              <HeroSlider />
            </div>"""

new_hero_layout = """<div>
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
                      {KEY_STATS.map((s, i) => (
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

page_code = page_code.replace(hero_slider_usage, new_hero_layout)

# Also, HeroSlider needs to have h-full instead of fixed h-[60vh] so it matches the grid height
page_code = page_code.replace('<section className="relative h-[60vh] min-h-[380px] max-h-[600px] overflow-hidden">', '<section className="relative h-full min-h-[400px] w-full overflow-hidden">')

# We need to make sure we import BarChart3 in page.tsx if not already
if "BarChart3" not in page_code:
    page_code = page_code.replace('import {', 'import { BarChart3,', 1)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(page_code)

print("Patched layout")
