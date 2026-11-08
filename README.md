# ashley-gong.github.io

Personal site. Plain HTML + CSS, no dependencies, no JavaScript shipped.

- **Text and photo:** live in a private repo, `ashley-gong/site-content` (`content.md` + images). Editing there on github.com triggers a redeploy here in about a minute.
- **Styles / icons:** `public/`
- **Deploy:** automatic on push to `master` via `.github/workflows/deploy.yml`, which pulls in the private content with a read-only deploy key (`CONTENT_DEPLOY_KEY` secret).
