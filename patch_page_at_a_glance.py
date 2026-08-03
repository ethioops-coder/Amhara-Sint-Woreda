import sys

file_path = 'src/app/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Import
import_statement = 'import { AtAGlanceSection } from "@/components/at-a-glance-section";\n'
# Insert right after HomeDashboardSection import
content = content.replace('import { HomeDashboardSection } from "@/components/home-dashboard-section";', 
                          'import { HomeDashboardSection } from "@/components/home-dashboard-section";\n' + import_statement)

# 2. Insert component in PageContent
old_page_content = """          <div>
            <DidYouKnowBar />
            <HeroSlider />
          </div>"""
new_page_content = """          <div>
            <DidYouKnowBar />
            <HeroSlider />
          </div>
          <AtAGlanceSection />"""
content = content.replace(old_page_content, new_page_content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched page.tsx successfully.")
