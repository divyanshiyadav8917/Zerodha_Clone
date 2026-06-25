import re
from pathlib import Path

css_path = Path(r'd:\Zerodha_Clone\dashboard\src\index.css')
text = css_path.read_text(encoding='utf-8')

pattern = re.compile(r'([^{]+)\{([^{}]*)\}')
parts = []
last_end = 0
seen = set()

for match in pattern.finditer(text):
    selector = match.group(1).strip()
    if not selector or selector.startswith('@'):
        continue
    if selector in seen:
        parts.append(text[last_end:match.start()])
        last_end = match.end()
        continue

    parts.append(text[last_end:match.start()])
    parts.append(match.group(0))
    last_end = match.end()
    seen.add(selector)

parts.append(text[last_end:])
css_path.write_text(''.join(parts), encoding='utf-8')
