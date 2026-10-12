// Runs before `vite dev` and `vite build`; writes public/sitemap.xml from routes + notebook files.
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const BASE = "https://www.regenb.fr";
const pairs: [string, string][] = [
  ["/", "/en"],
  ["/accompagnement", "/en/services"],
  ["/etapes", "/en/journeys"],
  ["/boussole", "/en/compass"],
  ["/carnet", "/en/notebook"],
  ["/legal", "/en/legal"],
  ["/cookies", "/en/cookies"],
  ["/contact", "/en/contact"],
];
const dir = resolve("src/content/carnet");
const notes = new Map<string, { fr?: string; en?: string }>();
for (const f of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const raw = readFileSync(resolve(dir, f), "utf8");
  const get = (k: string) => raw.match(new RegExp(`^${k}:\\s*["']?([^"'\\n]+)`, "m"))?.[1]?.trim();
  const slug = get("slug") ?? f.replace(/\.md$/, "");
  const lang = get("lang") === "en" ? "en" : "fr";
  const key = get("fr") ?? slug;
  notes.set(key, { ...notes.get(key), [lang]: slug });
}
for (const [key, n] of notes) {
  const pair: [string, string] = [`/carnet/${n.fr ?? key}`, `/en/notebook/${n.en ?? n.fr ?? key}`];
  if (!pairs.some((p) => p[0] === pair[0])) pairs.push(pair);
}
const url = (loc: string, [fr, en]: [string, string]) => `  <url>
    <loc>${BASE}${loc}</loc>
    <xhtml:link rel="alternate" hreflang="fr" href="${BASE}${fr}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE}${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${fr}"/>
  </url>`;
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pairs.flatMap((p) => [url(p[0], p), url(p[1], p)]).join("\n")}
</urlset>
`;
writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${pairs.length * 2} URLs)`);
