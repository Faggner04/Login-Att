import pathlib
import re

root = pathlib.Path('.')
paths = sorted(root.glob('docs/*.md')) + sorted(root.glob('scripts/*'))
replacements = [
    (re.compile(r'npx json-server --watch bancoDeDados\.json --port 3000'), 'npx json-server --watch data/bancoDeDados.json --port 3000'),
    (re.compile(r'npx json-server --watch bancoDeDados\.json'), 'npx json-server --watch data/bancoDeDados.json'),
    (re.compile(r'\bEXECUTAR_TESTES_WINDOWS\.bat\b'), 'scripts/EXECUTAR_TESTES_WINDOWS.bat'),
    (re.compile(r'\bEXECUTAR_TESTES\.sh\b'), 'scripts/EXECUTAR_TESTES.sh'),
    (re.compile(r'\bbancoDeDados\.json\b'), 'data/bancoDeDados.json'),
]

for p in paths:
    text = p.read_text(encoding='utf-8')
    new_text = text
    for pattern, replacement in replacements:
        new_text = pattern.sub(replacement, new_text)
    if new_text != text:
        p.write_text(new_text, encoding='utf-8')
        print(f'updated {p}')
