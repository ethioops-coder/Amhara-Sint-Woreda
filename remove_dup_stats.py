import re

with open("src/components/home-dashboard-section.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace the "At a Glance" title with "Recent Updates"
content = re.sub(
    r'<span className="text-\[\#EAB308\]">Glance</span>',
    r'<span className="text-[#EAB308]">Updates</span>',
    content
)
content = re.sub(
    r'At a <span className="text-\[\#EAB308\]">',
    r'Recent <span className="text-[#EAB308]">',
    content
)
content = re.sub(
    r'Woreda Dashboard',
    r'Announcements',
    content
)

# We want to remove COLUMN 2: Woreda Statistics
# It starts with {/* COLUMN 2: Woreda Statistics */}
# And ends before {/* COLUMN 3: Vacancies & Bids */}

start_idx = content.find("{/* COLUMN 2: Woreda Statistics */}")
end_idx = content.find("{/* COLUMN 3: Vacancies & Bids */}")

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + content[end_idx:]

# Change the grid to 1 column or 2 columns where Vacancies is left and Bids is right?
# The parent was: <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
# Let's keep the grid but inside the Vacancies & Bids column, we split them?
# Currently Vacancies and Bids are stacked vertically in flex-col.
# If we change the parent to not be a grid or change Vacancies and Bids to sit side by side on desktop.
# Let's change the parent to a simple block or flex, or change grid-cols-1 lg:grid-cols-2 to grid-cols-1.

# Find lg:col-span-1 for COLUMN 3 and change it or remove grid-cols-1 lg:grid-cols-2
content = content.replace(
    '<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">',
    '<div className="max-w-4xl mx-auto">'
)
content = content.replace(
    '<AnimatedSection delay={300} className="lg:col-span-1">',
    '<AnimatedSection delay={300}>'
)

# Let's make the Vacancies & Bids side-by-side on desktop
content = content.replace(
    '<div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xl shadow-slate-200/50 h-full flex flex-col gap-6">',
    '<div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row gap-8">'
)

# And remove the divider line between them
content = content.replace(
    '<div className="w-full h-[1px] bg-gray-100" />',
    '<div className="hidden md:block w-[1px] bg-gray-100" />\n              <div className="md:hidden w-full h-[1px] bg-gray-100" />'
)

with open("src/components/home-dashboard-section.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated home-dashboard-section.tsx")
