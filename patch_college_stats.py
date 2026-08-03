import sys

file_path = 'src/app/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace AnimatedCounter in College Stats to use spaceFormat
old_stat_render = '<AnimatedCounter target={stat.value} suffix="+" />'
new_stat_render = '<AnimatedCounter target={stat.value} suffix="+" spaceFormat={true} />'

content = content.replace(old_stat_render, new_stat_render)

# Just in case, replace any other generic AnimatedCounter calls without spaceFormat
# (We already updated the one in QuickStats). Wait, the QuickStats one was:
# <AnimatedCounter target={s.value} suffix={s.display.includes("M") ? " M" : ""} spaceFormat={true} />
# That was done in the previous script.

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("College Stats Patched successfully.")
