import re

# 1. Update PaginatedNewsSection for 5 items, single column, horizontal layout
with open("src/components/paginated-news-section.tsx", "r", encoding="utf-8") as f:
    news_code = f.read()

# Change itemsPerPage
news_code = re.sub(r'const itemsPerPage = \d+;', 'const itemsPerPage = 5;', news_code)

# Change grid layout to 1 column
news_code = news_code.replace('<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">', '<div className="grid grid-cols-1 gap-4">')

# Make the card horizontal (flex-row instead of flex-col)
news_code = news_code.replace('h-full flex flex-col group cursor-pointer"', 'flex flex-row items-stretch group cursor-pointer"')
# Change image container to fixed width
news_code = news_code.replace('className="relative h-48 overflow-hidden"', 'className="relative w-1/3 min-h-[140px] overflow-hidden hidden sm:block"')
# Adjust padding in content
news_code = news_code.replace('className="p-6 flex flex-col flex-1"', 'className="p-4 flex flex-col flex-1 justify-center"')

with open("src/components/paginated-news-section.tsx", "w", encoding="utf-8") as f:
    f.write(news_code)


# 2. Update CitizenServicesSection to be a full section again
with open("src/components/homepage-sections.tsx", "r", encoding="utf-8") as f:
    sections_code = f.read()

# It currently has:
# <div className="w-full h-full">
#   <div className="w-full h-full">
# ...
#   </div>
# </div>
# And grid is grid-cols-1 sm:grid-cols-2 gap-4

sections_code = sections_code.replace('export function CitizenServicesSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {\n  return (\n    <div className="w-full h-full">\n      <div className="w-full h-full">', 'export function CitizenServicesSection({ onNavigate }: { onNavigate: (p: PageId) => void }) {\n  return (\n    <section className="py-12 md:py-16 bg-gray-50">\n      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">')

# Find the closing divs for CitizenServicesSection and replace with </section>
# It's right before VACANCY + BIDS SECTION
citizen_services_pattern = r'(        </div>\n      </div>\n    )</div>(\n  \);\n}\n\n/\* "\?"\?"\? VACANCY \+ BIDS SECTION)'
sections_code = re.sub(citizen_services_pattern, r'\1</section>\2', sections_code)

# Restore grid to 4 columns
sections_code = sections_code.replace('<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">', '<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">')

with open("src/components/homepage-sections.tsx", "w", encoding="utf-8") as f:
    f.write(sections_code)


# 3. Update HomeDashboardSection so it fits nicely on the right
with open("src/components/home-dashboard-section.tsx", "r", encoding="utf-8") as f:
    dash_code = f.read()

# Make it w-full instead of having max-w-7xl or max-w-4xl
dash_code = dash_code.replace('<section className="py-8 md:py-10 bg-gray-50 border-t border-gray-100">', '<div className="w-full h-full">')
dash_code = dash_code.replace('</section>', '</div>')
dash_code = dash_code.replace('<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">', '<div className="w-full h-full">')
dash_code = dash_code.replace('<div className="max-w-4xl mx-auto">', '<div className="w-full">')
# Change flex-row to flex-col inside the dashboard
dash_code = dash_code.replace('flex flex-col md:flex-row gap-8', 'flex flex-col gap-8')

with open("src/components/home-dashboard-section.tsx", "w", encoding="utf-8") as f:
    f.write(dash_code)


# 4. Rearrange page.tsx
with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    page_code = f.read()

old_layout_pattern = r'          \{\/\* News and Services Side-by-Side.*?<DetailedStatsSection \/>'

new_layout = """          {/* Services Section (Full Width) */}
          <CitizenServicesSection onNavigate={onNavigate} />

          {/* News and Vacancy Side-by-Side */}
          <section className="py-10 bg-white relative">
            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                
                {/* News Side (Left) */}
                <div className="w-full">
                  <PaginatedNewsSection onNavigate={onNavigate} />
                </div>
                
                {/* Vacancy/Bids Side (Right) */}
                <div className="w-full">
                  <HomeDashboardSection onNavigate={onNavigate} />
                </div>
                
              </div>
            </div>
          </section>
          
          <DetailedStatsSection />"""

page_code = re.sub(old_layout_pattern, new_layout, page_code, flags=re.DOTALL)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(page_code)

print("Restructured News, Services, and Vacancies!")
