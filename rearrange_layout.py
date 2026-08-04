import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    page_code = f.read()

# Replace the layout
old_layout_pattern = r'          <HomeDashboardSection onNavigate=\{onNavigate\} \/>\s*<DetailedStatsSection \/>\s*\{\/\* News and Services Side-by-Side \*\/.*?<\/section>'

new_layout = """          {/* News and Services Side-by-Side (Moved to First Section) */}
          <section className="py-10 bg-gray-50 border-t border-gray-100 relative">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                
                {/* Services Side (Left) */}
                <div className="w-full">
                  <CitizenServicesSection onNavigate={onNavigate} />
                </div>

                {/* News Side (Right) */}
                <div className="w-full">
                  <PaginatedNewsSection onNavigate={onNavigate} />
                </div>
                
              </div>
            </div>
          </section>

          <HomeDashboardSection onNavigate={onNavigate} />
          
          <DetailedStatsSection />"""

# We'll use re.DOTALL to match across newlines
page_code = re.sub(old_layout_pattern, new_layout, page_code, flags=re.DOTALL)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(page_code)

print("Rearranged sections successfully!")
