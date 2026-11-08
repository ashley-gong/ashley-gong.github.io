// Builds docs/index.html and docs/mystuff.html from content.json.
// No dependencies: run with `node build.mjs`.
import { readFileSync, writeFileSync } from "node:fs";

const c = JSON.parse(readFileSync(new URL("content.json", import.meta.url)));

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

// Escapes text, then turns [label](url) into links. Only http(s) and
// relative URLs are allowed, so content can never inject script.
const md = (s) =>
  esc(s).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, url) =>
    /^(https?:\/\/|[\w.-]+\.html$)/.test(url) ? `<a href="${url}">${label}</a>` : m
  );

const link = (title, url) =>
  url ? `<a class="item-title" href="${esc(url)}">${esc(title)}</a>` : `<b class="item-title">${esc(title)}</b>`;

const icons = {
  github:
    "M12 1.27a11 11 0 0 0-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 0 1 .64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 0 1 0-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 0 1 0 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0 0 12 1.27",
  linkedin:
    "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
};
const icon = (name, url) =>
  `<a class="icon" href="${esc(url)}" aria-label="${name}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}"/></svg></a>`;

const page = (body) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self'; base-uri 'none'; form-action 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="description" content="${esc(c.description)}">
<title>${esc(c.name)}</title>
<link rel="icon" href="favicon.svg">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap">
<link rel="stylesheet" href="style.css">
</head>
<body>
<nav><a href="index.html">home</a><a href="mystuff.html">my stuff</a></nav>
${body}
</body>
</html>
`;

const h = c.home;
const home = page(`<main class="card">
  <div>
    <h1>${esc(h.greeting)}</h1>
    <p class="lead">${md(h.bio)}</p>
    <p class="icons">${icon("github", h.github)}${icon("linkedin", h.linkedin)}</p>
    <p>${esc(h.email)}</p>
  </div>
  <img src="${esc(h.photo)}" alt="${esc(c.name)}" width="250" height="328">
</main>`);

const section = (s) => `<section>
  <h2>${esc(s.title)}</h2>
  ${s.note ? `<p class="note">${md(s.note)}</p>` : ""}
  ${(s.paragraphs || []).map((p) => `<p>${md(p)}</p>`).join("\n  ")}
  ${(s.items || []).map((i) => `<p class="item">${link(i.title, i.link)} • ${md(i.text)}</p>`).join("\n  ")}
</section>`;

const m = c.mystuff;
const mystuff = page(`<main class="stuff">
<p class="intro">${md(m.intro)}</p>
${m.sections.map(section).join("\n")}
</main>`);

writeFileSync(new URL("docs/index.html", import.meta.url), home);
writeFileSync(new URL("docs/mystuff.html", import.meta.url), mystuff);
console.log("Built docs/index.html and docs/mystuff.html");
