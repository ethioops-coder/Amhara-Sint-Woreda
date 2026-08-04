with open("src/components/homepage-sections.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "export function CulturalPlacesSection" in line or "/* \?\?\? VACANCY + BIDS SECTION" in line:
        # The end of CitizenServicesSection is just before this
        break

# The lines before i should be the end of CitizenServicesSection
if lines[84].strip() == "</div>":
    lines[84] = "    </section>\n"
if lines[85].strip() == "</div>":
    lines[85] = ""

with open("src/components/homepage-sections.tsx", "w", encoding="utf-8") as f:
    f.writelines(lines)
