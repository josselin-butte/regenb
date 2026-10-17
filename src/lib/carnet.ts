export type CarnetStatus = 'exploring' | 'settled';
export type CarnetLang = 'fr' | 'en';

export interface CarnetEntry {
  title: string;
  slug: string;
  /** Shared id across languages: the French slug. */
  key: string;
  date: string;
  /** Last modification date (frontmatter `updated`), defaults to date. */
  updated: string;
  status: CarnetStatus;
  lang: CarnetLang;
  origin: string;
  themes: string[];
  element?: 'earth' | 'water' | 'air' | 'fire';
  summary: string;
  description: string;
  body: string;
  readingTime: number;
}

const files = import.meta.glob('/src/content/carnet/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const unquote = (v: string) => v.trim().replace(/^["']|["']$/g, '');

// Minimal YAML frontmatter parser: scalars, inline [a, b] lists and "- item" lists.
const parse = (raw: string): CarnetEntry | null => {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return null;
  const data: Record<string, string | string[]> = {};
  let listKey: string | null = null;
  for (const line of m[1].split(/\r?\n/)) {
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && listKey) { (data[listKey] as string[]).push(unquote(item[1])); continue; }
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, k, v] = kv;
    if (v === '') { data[k] = []; listKey = k; continue; }
    listKey = null;
    if (v.startsWith('[')) data[k] = v.replace(/^\[|\]$/g, '').split(',').map(unquote).filter(Boolean);
    else data[k] = unquote(v);
  }
  const body = m[2].trim();
  if (!data.slug || !data.title) return null;
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    title: String(data.title),
    slug: String(data.slug),
    key: String(data.fr ?? data.slug),
    date: String(data.date ?? ''),
    updated: String(data.updated ?? data.date ?? ''),
    status: data.status === 'settled' ? 'settled' : 'exploring',
    lang: data.lang === 'en' ? 'en' : 'fr',
    origin: String(data.origin ?? ''),
    themes: Array.isArray(data.themes) ? data.themes : data.themes ? [String(data.themes)] : [],
    element: ['earth','water','air','fire'].includes(String(data.element)) ? (String(data.element) as CarnetEntry['element']) : undefined,
    summary: String(data.summary ?? ''),
    description: String(data.description ?? data.summary ?? ''),
    body,
    readingTime: Math.max(1, Math.ceil(words / 200)),
  };
};

const all: CarnetEntry[] = Object.values(files).map(parse).filter((e): e is CarnetEntry => !!e);

/** One entry per note (key), preferring the current language. Newest first. */
export const getEntries = (lang: CarnetLang): CarnetEntry[] => {
  const byKey = new Map<string, CarnetEntry>();
  for (const e of all) {
    const cur = byKey.get(e.key);
    if (!cur || (cur.lang !== lang && e.lang === lang)) byKey.set(e.key, e);
  }
  return [...byKey.values()].sort((a, b) => b.date.localeCompare(a.date));
};

/** Find the note shown at this slug in this language (any language's slug resolves to the same note). */
export const getEntry = (slug: string, lang: CarnetLang) => {
  const key = all.find((e) => e.slug === slug)?.key;
  return key ? getEntries(lang).find((e) => e.key === key) : undefined;
};

/** Slug to use for a note in the target language (falls back to the existing slug). */
export const translateSlug = (slug: string, lang: CarnetLang): string => {
  const key = all.find((e) => e.slug === slug)?.key;
  if (!key) return slug;
  return getEntries(lang).find((e) => e.key === key)?.slug ?? slug;
};

export const formatDate = (date: string, lang: CarnetLang) => {
  const d = new Date(`${date}T12:00:00`);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
