import re
import glob

# Files to check for padding
files = [
    "src/app/page.tsx",
    "src/components/detailed-stats-section.tsx",
    "src/components/paginated-news-section.tsx",
    "src/components/home-dashboard-section.tsx",
    "src/components/homepage-sections.tsx",
    "src/components/header.tsx"
]

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    # Reduce padding y
    content = re.sub(r'py-24', 'py-12', content)
    content = re.sub(r'py-20', 'py-10', content)
    content = re.sub(r'py-16', 'py-10', content)
    content = re.sub(r'py-12 md:py-16', 'py-8 md:py-10', content)
    content = re.sub(r'py-12', 'py-8', content)
    
    # Reduce margin bottom
    content = re.sub(r'mb-16', 'mb-10', content)
    content = re.sub(r'mb-12', 'mb-8', content)
    content = re.sub(r'mb-10', 'mb-6', content)
    
    # Reduce margin top
    content = re.sub(r'mt-16', 'mt-10', content)
    content = re.sub(r'mt-12', 'mt-8', content)
    content = re.sub(r'mt-10', 'mt-6', content)

    # Gap reductions for grids
    content = re.sub(r'gap-12', 'gap-8', content)

    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

print("Minimized spaces successfully!")
