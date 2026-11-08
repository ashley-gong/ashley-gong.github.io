# ashley-gong.github.io

Personal site. Plain HTML + CSS, no dependencies, no JavaScript shipped.

- **Edit text:** `content.md` (format notes are at the top of the file). Editing it on github.com works — commit and the site redeploys in about a minute.
- **Edit styles / images:** `public/`
- **Preview locally:** `node build.mjs && python3 -m http.server 8000 -d dist`
- **Deploy:** automatic on push to `master` via `.github/workflows/deploy.yml`.
