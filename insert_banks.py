import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    page_code = f.read()

# 1. Add import
if "import { BanksSliderSection }" not in page_code:
    import_stmt = 'import { BanksSliderSection } from "@/components/banks-slider-section";\n'
    # insert it after the last import of components
    page_code = re.sub(r'(import \{ .*? \} from "@/components/.*?";\n)(?!import \{ .*? \} from "@/components/.*?";)', r'\1' + import_stmt, page_code, count=1)

# 2. Add to layout
if "<BanksSliderSection />" not in page_code:
    old_layout = r'<DetailedStatsSection />\s*<MayorMessageSection onNavigate=\{onNavigate\} />'
    new_layout = '<DetailedStatsSection />\n\n          <BanksSliderSection />\n\n          <MayorMessageSection onNavigate={onNavigate} />'
    page_code = re.sub(old_layout, new_layout, page_code)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(page_code)
