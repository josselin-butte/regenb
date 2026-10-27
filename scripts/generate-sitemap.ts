// Runs before `vite dev` and `vite build`; writes public/sitemap.xml from routes + notebook files.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import { resolve } from "path";

const BASE = "https://www.regenb.fr";
const pairs: [string, string][] = [
  ["/", "/en"],
  ["/accompagnement", "/en/services"],
  ["/etapes", "/en/journeys"],
  ["/coaching", "/en/coaching"],
  ["/supervision", "/en/supervision"],
  ["/pyrenees", "/en/pyrenees"],
  ["/boussole", "/en/compass"],
  ["/carnet", "/en/notebook"],
  ["/carnet/ecoutes", "/en/notebook/listening"],
  ["/carnet/bibliotheque", "/en/notebook/library"],
  ["/mentions-legales", "/en/legal-notice"],
  ["/confidentialite", "/en/privacy"],
  ["/cgv", "/en/terms"],
  ["/cookies", "/en/cookies"],
  ["/contact", "/en/contact"],
];
// lastmod = last git commit touching the page's own source files (shared header/footer/translations excluded).
const PAGE_FILES: Record<string, string[]> = {
  "/": ["src/pages/Index.tsx", "src/components/HeroSection.tsx", "src/components/AboutSection.tsx", "src/components/OfferSection.tsx", "src/components/NewsletterSection.tsx", "src/components/WaitlistSection.tsx", "src/components/ContinuoSignup.tsx"],
  "/accompagnement": ["src/pages/Services.tsx", "src/components/EnquiryForm.tsx"],
  "/etapes": ["src/pages/Etapes.tsx"],
  "/coaching": ["src/pages/LocalPage.tsx"],
  "/supervision": ["src/pages/LocalPage.tsx"],
  "/pyrenees": ["src/pages/LocalPage.tsx"],
  "/boussole": ["src/pages/Compass.tsx"],
  "/carnet": ["src/pages/Carnet.tsx"],
  "/carnet/ecoutes": ["src/pages/Listening.tsx", "src/data/listening.ts"],
  "/carnet/bibliotheque": ["src/pages/Library.tsx", "src/data/library.ts"],
  "/mentions-legales": ["src/pages/Legal.tsx", "src/lib/legal.ts"],
  "/confidentialite": ["src/pages/Legal.tsx", "src/lib/legal.ts"],
  "/cgv": ["src/pages/Legal.tsx", "src/lib/legal.ts"],
  "/cookies": ["src/pages/Cookies.tsx", "src/lib/trackers.ts"],
  "/contact": ["src/pages/Contact.tsx"],
};
const gitDate = (files: string[]) => {
  if (!files.length) return undefined;
  try { return execSync(`git log -1 --format=%cs -- ${files.join(" ")}`, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim() || undefined; }
  catch { return undefined; }
};
// Without git (e.g. some build environments), keep the dates already in the committed sitemap.
const previous = new Map<string, string>();
const out = resolve("public/sitemap.xml");
if (existsSync(out)) for (const m of readFileSync(out, "utf8").matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) previous.set(m[1], m[2]);
const max = (a?: string, b?: string) => (!a ? b : !b ? a : a > b ? a : b);
const lastmod = new Map<string, string | undefined>();
const dir = resolve("src/content/carnet");
const notes = new Map<string, { fr?: string; en?: string; frMod?: string; enMod?: string }>();
for (const f of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
  const raw = readFileSync(resolve(dir, f), "utf8");
  const get = (k: string) => raw.match(new RegExp(`^${k}:\\s*["']?([^"'\\n]+)`, "m"))?.[1]?.trim();
  const slug = get("slug") ?? f.replace(/\.md$/, "");
  const lang = get("lang") === "en" ? "en" : "fr";
  const key = get("fr") ?? slug;
  // Same rule as the Article dateModified: frontmatter `updated`, else `date`.
  const mod = get("updated") ?? get("date");
  notes.set(key, { ...notes.get(key), [lang]: slug, [`${lang}Mod`]: mod });
}
for (const [fr, en] of pairs) {
  const d = gitDate(PAGE_FILES[fr] ?? []);
  lastmod.set(fr, d); lastmod.set(en, d);
}
const notePairs: [string, string | null][] = [];
for (const [, n] of notes) {
  if (!n.fr) continue;
  const frPath = `/carnet/${n.fr}`;
  // An English URL is listed only when the English note exists, so hreflang never points to French text.
  const enPath = n.en ? `/en/notebook/${n.en}` : null;
  notePairs.push([frPath, enPath]);
  lastmod.set(frPath, n.frMod);
  if (enPath) lastmod.set(enPath, n.enMod);
  lastmod.set("/carnet", max(lastmod.get("/carnet"), n.frMod));
  lastmod.set("/en/notebook", max(lastmod.get("/en/notebook"), n.enMod ?? n.frMod));
}
const url = (loc: string, [fr, en]: [string, string | null]) => {
  const mod = lastmod.get(loc) ?? previous.get(BASE + loc);
  return [
    `  <url>`,
    `    <loc>${BASE}${loc}</loc>`,
    mod ? `    <lastmod>${mod}</lastmod>` : null,
    `    <xhtml:link rel="alternate" hreflang="fr" href="${BASE}${fr}"/>`,
    en ? `    <xhtml:link rel="alternate" hreflang="en" href="${BASE}${en}"/>` : null,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${fr}"/>`,
    `  </url>`,
  ].filter(Boolean).join("\n");
};
const all: [string, string | null][] = [...pairs, ...notePairs];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${all.flatMap((p) => (p[1] ? [url(p[0], p), url(p[1], p)] : [url(p[0], p)])).join("\n")}
</urlset>
`;
writeFileSync(out, xml);
console.log(`sitemap.xml written (${(xml.match(/<url>/g) ?? []).length} URLs)`);
