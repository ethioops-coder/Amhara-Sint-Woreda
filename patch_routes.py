import os

# 1. Update header.tsx
header_path = 'src/components/header.tsx'
with open(header_path, 'r', encoding='utf-8') as f:
    header = f.read()

tourism_link = """  { label: "Home", href: "home", icon: HomeIcon },
  { label: "Tourism & Heritage", href: "tourism", icon: MapPin },"""

if "Tourism & Heritage" not in header:
    header = header.replace('{ label: "Home", href: "home", icon: HomeIcon },', tourism_link)
    with open(header_path, 'w', encoding='utf-8') as f:
        f.write(header)
    print("Updated header.tsx")

# 2. Update page.tsx
page_path = 'src/app/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page = f.read()

# Add tourism to PageId type if not there
if '| "tourism"' not in page:
    page = page.replace('type PageId =\n  | "home"', 'type PageId =\n  | "home" | "tourism"')

# Import TourismPage
if "import { TourismPage }" not in page:
    page = page.replace('import { VacancyPage } from "@/components/vacancy-page";', 
                        'import { VacancyPage } from "@/components/vacancy-page";\nimport { TourismPage } from "@/components/tourism-page";')

# Update PageContent cases
case_tourism = """    case "tourism": return <TourismPage onNavigate={onNavigate} />;
    default:"""

if 'case "tourism":' not in page:
    page = page.replace('    default:', case_tourism)

# Modify CulturalPlacesSection in page.tsx to add "Explore All Tourism" button
old_cultural_places = """        <AnimatedSection delay={200}>
          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate("gallery")}
              className="group inline-flex items-center gap-3 bg-[#0B3D2E] hover:bg-[#124b38] text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-[#0B3D2E]/20 hover:shadow-2xl hover:shadow-[#0B3D2E]/30 transition-all duration-300"
            >
              <Image className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              View Full Heritage Gallery
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </AnimatedSection>"""

new_cultural_places = """        <AnimatedSection delay={200}>
          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate("tourism")}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-amber-500/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <MapPin className="w-5 h-5 group-hover:bounce transition-transform" />
              Explore All Tourism Destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </AnimatedSection>"""

if 'onClick={() => onNavigate("tourism")}' not in page:
    page = page.replace(old_cultural_places, new_cultural_places)

# Modify homepage spacing in PageContent
old_spacing = """          <div className="flex flex-col gap-16 md:gap-24 pb-24">"""
new_spacing = """          <div className="flex flex-col gap-20 md:gap-32 pb-32">"""
page = page.replace(old_spacing, new_spacing)

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page)
print("Updated page.tsx")
