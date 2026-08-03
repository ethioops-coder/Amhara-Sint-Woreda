import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    page_code = f.read()

hero_stats_code = """const HERO_STATS = [
  { label: "Population", value: 214056, suffix: "+", icon: Users },
  { label: "Area", value: 1437, suffix: " km²", icon: Map },
  { label: "Kebeles", value: 37, suffix: "", icon: MapPin },
  { label: "Hospitals", value: 1, suffix: "", icon: HeartPulse },
  { label: "Health Centers", value: 8, suffix: "", icon: Stethoscope },
  { label: "Schools", value: 106, suffix: "+", icon: School },
  { label: "Universities/TVET", value: 1, suffix: "", icon: GraduationCap },
  { label: "Annual Budget", value: 200, suffix: "M ETB", icon: Banknote },
];"""

# Replace KEY_STATS in the new layout section with HERO_STATS
if "HERO_STATS.map" not in page_code:
    # Find the newly added section
    search_str = "{KEY_STATS.map((s, i) => ("
    replace_str = "{HERO_STATS.map((s, i) => ("
    page_code = page_code.replace(search_str, replace_str)
    
    # insert HERO_STATS right above HeroSlider
    page_code = page_code.replace("function HeroSlider() {", hero_stats_code + "\n\nfunction HeroSlider() {")

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(page_code)
print("Fixed stats array")
