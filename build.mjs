// Builds dist/ from content/ (a checkout of the private content repo) and public/.
// content/content.md is the page text; every other file in content/ (e.g. the
// photo) is copied into dist/. No dependencies: run with `node build.mjs`. See the
// note at the top of content.md for the (small) Markdown format it understands.
import { readFileSync, writeFileSync, rmSync, cpSync, existsSync } from "node:fs";

const root = new URL("./", import.meta.url);
const SETTINGS = ["name", "description", "github", "linkedin", "email", "photo"];

// ---------- parse content.md ----------

function parse(text) {
  const c = { greeting: "", bio: [], sections: [] };
  let section = null; // null = intro
  let item = null; // current ### entry
  let para = [];

  const flush = () => {
    if (!para.length) return;
    const p = para.join(" ");
    para = [];
    if (item) item.paras.push(p);
    else if (section) section.blocks.push({ type: "p", text: p });
    else c.bio.push(p);
  };

  const lines = text.replace(/<!--[\s\S]*?-->/g, "").split(/\r?\n/);
  lines.forEach((raw, n) => {
    const line = raw.trim();
    let m;
    if (!line) return flush();
    if ((m = line.match(/^# (.+)/))) {
      flush();
      c.greeting = m[1];
    } else if ((m = line.match(/^## (.+)/))) {
      flush();
      item = null;
      section = { title: m[1], blocks: [] };
      c.sections.push(section);
    } else if ((m = line.match(/^### (.+)/)) || (m = line.match(/^[-*] (.+)/))) {
      flush();
      if (!section) throw new Error(`content.md line ${n + 1}: "${line}" must come after a ## section`);
      const isItem = line.startsWith("###");
      const block = { type: isItem ? "item" : "row", ...splitWhen(m[1]), paras: [] };
      section.blocks.push(block);
      item = isItem ? block : null;
    } else if (!section && (m = line.match(/^(\w+):\s+(.+)$/)) && SETTINGS.includes(m[1])) {
      flush();
      c[m[1]] = m[2];
    } else {
      para.push(line);
    }
  });
  flush();

  if (!c.greeting) throw new Error('content.md needs a "# greeting" line');
  return c;
}

// "2024 | text" -> { when: "2024", text: "text" }; the "when |" part is optional.
function splitWhen(s) {
  const m = s.match(/^([^[|]*?)\s*\|\s*(.+)$/);
  return m ? { when: m[1], text: m[2] } : { when: "", text: s };
}

// ---------- render ----------

const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

// Escapes text first, then applies [links](url), **bold** and *italic*.
// Only http(s), mailto, relative .html and #anchor URLs become links, so
// content can never inject script.
const md = (s) =>
  esc(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, label, url) =>
      /^(https?:\/\/|mailto:|[\w.-]+\.html$|#[\w-]+$)/.test(url) ? `<a href="${url}">${label}</a>` : m
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const icons = {
  github:
    "M12 1.27a11 11 0 0 0-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 0 1 .64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 0 1 0-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 0 1 0 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0 0 12 1.27",
  linkedin:
    "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z",
};
const icon = (name, url) =>
  url
    ? `<a class="icon" href="${esc(url)}" aria-label="${name}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${icons[name]}"/></svg></a>`
    : "";

// A title that is exactly one link gets an ↗ inside the link.
const title = (s) => md(s.replace(/^\[(.+)\]\((\S+)\)$/, "[$1 ↗]($2)"));

const block = (b) => {
  const body =
    b.type === "item"
      ? `<h3>${title(b.text)}</h3>${b.paras.map((p) => `<p>${md(p)}</p>`).join("")}`
      : md(b.text).replace(/ · /g, ' <span class="sep">·</span> ');
  return `    <li><span class="when">${esc(b.when)}</span><div>${body}</div></li>`;
};

// Consecutive rows/items are grouped into one two-column list.
const section = (s) => {
  const out = [];
  let list = null;
  for (const b of s.blocks) {
    if (b.type === "p") {
      if (list) out.push(`  <ul class="rows">\n${list.join("\n")}\n  </ul>`), (list = null);
      out.push(`  <p>${md(b.text)}</p>`);
    } else (list ||= []).push(block(b));
  }
  if (list) out.push(`  <ul class="rows">\n${list.join("\n")}\n  </ul>`);
  return `<section id="${slug(s.title)}">\n  <h2>${esc(s.title)}</h2>\n${out.join("\n")}\n</section>`;
};

const page = (c) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self'; base-uri 'none'; form-action 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta name="description" content="${esc(c.description || c.name || "")}">
<title>${esc(c.name || "")}</title>
<link rel="icon" href="favicon.svg">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap">
<link rel="stylesheet" href="style.css">
</head>
<body>
<nav>${c.sections.map((s) => `<a href="#${slug(s.title)}">${esc(s.title)}</a>`).join("")}</nav>
<main>
<header class="card">
  <div>
    <h1>${esc(c.greeting)}</h1>
    ${c.bio.map((p) => `<p class="lead">${md(p)}</p>`).join("\n    ")}
    <p class="icons">${icon("github", c.github)}${icon("linkedin", c.linkedin)}</p>
    ${c.email ? `<p>${esc(c.email)}</p>` : ""}
  </div>
  ${c.photo ? `<img src="${esc(c.photo)}" alt="${esc(c.name || "")}" width="250" height="328">` : ""}
</header>
${c.sections.map(section).join("\n")}
</main>
</body>
</html>
`;

// ---------- write dist/ ----------

const contentDir = new URL("content/", root);
const contentFile = new URL("content.md", contentDir);
if (!existsSync(contentFile)) throw new Error("content/content.md not found (the private content repo goes in content/)");
const content = parse(readFileSync(contentFile, "utf8"));
rmSync(new URL("dist", root), { recursive: true, force: true });
cpSync(new URL("public", root), new URL("dist", root), { recursive: true });
// Copy content assets, skipping the Markdown source and repo metadata.
cpSync(contentDir, new URL("dist", root), {
  recursive: true,
  filter: (src) => !/(^|\/)(\.git|\.github|README\.md|content\.md)$/.test(src),
});
writeFileSync(new URL("dist/index.html", root), page(content));
console.log("Built dist/");
