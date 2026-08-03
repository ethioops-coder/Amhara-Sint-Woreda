import sys

# 1. Patch src/app/page.tsx to move HomeDashboardSection UP
file_path_page = 'src/app/page.tsx'
with open(file_path_page, 'r', encoding='utf-8') as f:
    content_page = f.read()

# Current order:
# <CitizenServicesSection onNavigate={onNavigate} />
# <HomeDashboardSection onNavigate={onNavigate} />
old_order = """          <CitizenServicesSection onNavigate={onNavigate} />
          <HomeDashboardSection onNavigate={onNavigate} />"""
new_order = """          <HomeDashboardSection onNavigate={onNavigate} />
          <CitizenServicesSection onNavigate={onNavigate} />"""

content_page = content_page.replace(old_order, new_order)
with open(file_path_page, 'w', encoding='utf-8') as f:
    f.write(content_page)

# 2. Patch src/components/animations.tsx
file_path_anim = 'src/components/animations.tsx'
with open(file_path_anim, 'r', encoding='utf-8') as f:
    content_anim = f.read()

old_anim_sig = """export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {"""
new_anim_sig = """export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  spaceFormat = false,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  spaceFormat?: boolean;
}) {"""

old_anim_ret = """  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}"""
new_anim_ret = """  return <span ref={ref}>{spaceFormat ? count.toLocaleString().replace(/,/g, ' ') : count.toLocaleString()}{suffix}</span>;
}"""

content_anim = content_anim.replace(old_anim_sig, new_anim_sig)
content_anim = content_anim.replace(old_anim_ret, new_anim_ret)

with open(file_path_anim, 'w', encoding='utf-8') as f:
    f.write(content_anim)

# 3. Patch src/components/home-dashboard-section.tsx
file_path_dash = 'src/components/home-dashboard-section.tsx'
with open(file_path_dash, 'r', encoding='utf-8') as f:
    content_dash = f.read()

# import AnimatedCounter
content_dash = content_dash.replace(
    'import { AnimatedSection } from "./animations";',
    'import { AnimatedSection, AnimatedCounter } from "./animations";'
)

# add stats
old_stats = """const stats = [
  { label: "Population", value: 214056, icon: Users, color: "#10B981" },
  { label: "Area (km²)", value: 1437, icon: Map, color: "#3B82F6" },
  { label: "Kebeles", value: 37, icon: MapPin, color: "#F59E0B" },
  { label: "Schools", value: 106, icon: School, color: "#6366F1" },
];"""
new_stats = """const stats = [
  { label: "Population", value: 214056, icon: Users, color: "#10B981" },
  { label: "Area (km²)", value: 1437, icon: Map, color: "#3B82F6" },
  { label: "Kebeles", value: 37, icon: MapPin, color: "#F59E0B" },
  { label: "Schools", value: 106, icon: School, color: "#6366F1" },
  { label: "Health Posts", value: 8, icon: HeartPulse, color: "#DC2626" },
  { label: "Budget (M)", value: 200, icon: Banknote, color: "#0891B2" },
];"""
content_dash = content_dash.replace(old_stats, new_stats)

# fix area symbol fallback if it was Area (km) in file
if "Area (km)" in content_dash:
    content_dash = content_dash.replace(
"""const stats = [
  { label: "Population", value: 214056, icon: Users, color: "#10B981" },
  { label: "Area (km)", value: 1437, icon: Map, color: "#3B82F6" },
  { label: "Kebeles", value: 37, icon: MapPin, color: "#F59E0B" },
  { label: "Schools", value: 106, icon: School, color: "#6366F1" },
];""", new_stats)

# update layout
old_grid = 'className="grid grid-cols-2 gap-4 mb-8 relative z-10"'
new_grid = 'className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8 relative z-10"'
content_dash = content_dash.replace(old_grid, new_grid)

# change rendering
old_render = '<span className="text-xl font-black text-white">{s.value.toLocaleString()}</span>'
new_render = '<span className="text-xl font-black text-white"><AnimatedCounter target={s.value} spaceFormat /></span>'
content_dash = content_dash.replace(old_render, new_render)

with open(file_path_dash, 'w', encoding='utf-8') as f:
    f.write(content_dash)

print("Patched dashboard and animations.")
