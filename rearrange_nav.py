import re
f = open('src/components/header.tsx', 'r', encoding='utf-8')
content = f.read()
f.close()

tourism_regex = r'(\s*\{\s*label:\s*"Tourism & Heritage",\s*href:\s*"tourism",\s*icon:\s*MapPin\s*\},)'
services_regex = r'(\s*\{\s*label:\s*"Services",.*?\]\s*,\s*\})'

t_match = re.search(tourism_regex, content, re.DOTALL)
s_match = re.search(services_regex, content, re.DOTALL)

if t_match and s_match:
    # We need to swap them.
    tourism_block = t_match.group(1)
    services_block = s_match.group(1)
    content = content.replace(tourism_block, '')
    content = content.replace(services_block, services_block + tourism_block)
    f = open('src/components/header.tsx', 'w', encoding='utf-8')
    f.write(content)
    f.close()
    print('Swapped!')
else:
    print('Could not find matches')
