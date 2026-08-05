import os
import re

directories_to_scan = ['src', 'public', 'data', 'README.md']
extensions_to_scan = {'.tsx', '.ts', '.css', '.json', '.md'}

replacements = [
    (re.compile(r'Amhara Sint', re.IGNORECASE), 'Amhara Sayint'),
    (re.compile(r'amharasint', re.IGNORECASE), 'amharasayint'),
    (re.compile(r'AmharaSint', re.IGNORECASE), 'AmharaSayint'),
    (re.compile(r'amhara-sint', re.IGNORECASE), 'amhara-sayint'),
    (re.compile(r'Amhara-Sint', re.IGNORECASE), 'Amhara-Sayint')
]

for item in directories_to_scan:
    if os.path.isfile(item):
        files_to_process = [item]
    else:
        files_to_process = []
        for root, dirs, files in os.walk(item):
            for file in files:
                if any(file.endswith(ext) for ext in extensions_to_scan):
                    files_to_process.append(os.path.join(root, file))
                    
    for file_path in files_to_process:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            # Apply replacements carefully
            # Because "Amhara Sint" could be replaced to "Amhara Sayint"
            # We want to preserve casing.
            # A safer way to preserve case:
            # wait, my regex re.IGNORECASE will replace 'amhara sint' with 'Amhara Sayint'.
            # Let's be more precise.
            content = content.replace("Amhara Sint", "Amhara Sayint")
            content = content.replace("amhara sint", "amhara sayint")
            content = content.replace("AMHARA SINT", "AMHARA SAYINT")
            
            content = content.replace("amharasint", "amharasayint")
            content = content.replace("Amharasint", "Amharasayint")
            content = content.replace("AmharaSint", "AmharaSayint")
            
            content = content.replace("amhara-sint", "amhara-sayint")
            content = content.replace("Amhara-Sint", "Amhara-Sayint")

            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {file_path}")
        except Exception as e:
            print(f"Failed to process {file_path}: {e}")
