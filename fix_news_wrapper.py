import re

with open("src/components/paginated-news-section.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Replace <section className="py-16 bg-white"> and its closing tag with empty string
# Actually we can just replace it with <div className="w-full"> and </div>
content = content.replace('<section className="py-16 bg-white">', '<div className="w-full h-full">')
content = content.replace('</section>', '</div>')
content = content.replace('<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">', '<div className="w-full">')

with open("src/components/paginated-news-section.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed wrapper")
