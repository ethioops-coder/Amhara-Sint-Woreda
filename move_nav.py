import re

with open("src/components/header.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# The Tourism item is:
#   { label: "Tourism & Heritage", href: "tourism", icon: MapPin },
tourism_str = '  { label: "Tourism & Heritage", href: "tourism", icon: MapPin },\n'

content = content.replace(tourism_str, '')

# We need to insert it after Government.
gov_str = '      { label: "Offices & Departments", href: "gov-offices", icon: Shield },\n    ],\n  },\n'
tourism_str_insert = '  { label: "Tourism & Heritage", href: "tourism", icon: MapPin },\n'

content = content.replace(gov_str, gov_str + tourism_str_insert)

with open("src/components/header.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Moved Tourism")
