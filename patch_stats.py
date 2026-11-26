import sys

file_path = 'src/app/page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace AnimatedCounter signature and return
old_counter_sig = 'function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {'
new_counter_sig = 'function AnimatedCounter({ target, suffix = "", duration = 2000, spaceFormat = false }: { target: number; suffix?: string; duration?: number; spaceFormat?: boolean }) {'

old_counter_ret = 'return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;'
new_counter_ret = 'return <span ref={ref}>{spaceFormat ? count.toLocaleString().replace(/,/g, " ") : count.toLocaleString()}{suffix}</span>;'

content = content.replace(old_counter_sig, new_counter_sig)
content = content.replace(old_counter_ret, new_counter_ret)

# Replace the number rendering in QuickStats
old_number_render = """                {/* Number */}
                <div
                  className="text-3xl md:text-4xl font-black leading-none tabular-nums"
                  style={{ color: s.bg }}
                >
                  {s.display}
                </div>"""

new_number_render = """                {/* Number */}
                <div
                  className="text-4xl md:text-5xl font-black leading-tight tabular-nums drop-shadow-sm transition-all duration-300"
                  style={{ color: s.bg }}
                >
                  <AnimatedCounter target={s.value} suffix={s.display.includes("M") ? " M" : ""} spaceFormat={true} />
                </div>"""

content = content.replace(old_number_render, new_number_render)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Patched successfully.")
