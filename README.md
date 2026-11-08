# ashley-gong.github.io

Personal site. Plain HTML + CSS, no dependencies, no JavaScript shipped.

- **Edit text:** `content.json` (links are written `[label](https://...)`)
- **Edit styles:** `docs/style.css`
- **Rebuild:** `node build.mjs` (regenerates `docs/index.html`)
- **Preview:** `python3 -m http.server 8000 -d docs`
- **Deploy:** commit and push; GitHub Pages serves `master` → `/docs`.
