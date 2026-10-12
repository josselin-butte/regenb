export type Lang = 'fr' | 'en';

export const SITE_ORIGIN = 'https://regenb.fr';

// French path (root) → English path (/en). Order matters: longer prefixes first.
const PAIRS: [string, string][] = [
  ['/accompagnement', '/en/services'],
  ['/boussole', '/en/compass'],
  ['/carnet', '/en/notebook'],
  ['/legal', '/en/legal'],
  ['/contact', '/en/contact'],
  ['/', '/en'],
];

const matchPrefix = (path: string, prefix: string) =>
  prefix === '/' ? path === '/' || path === '' : path === prefix || path.startsWith(prefix + '/');

export const langFromPath = (pathname: string): Lang =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr';

/** Convert any public path (with optional #hash) to the given language. */
export const localizePath = (path: string, lang: Lang): string => {
  const [base, hash] = path.split('#');
  const from = langFromPath(base) === 'en' ? 1 : 0;
  const to = lang === 'en' ? 1 : 0;
  let out = base;
  for (const pair of PAIRS) {
    if (matchPrefix(base, pair[from])) {
      const rest = pair[from] === '/' ? '' : base.slice(pair[from].length);
      out = pair[to] + rest;
      if (lang === 'fr' && pair[to] === '/' ) out = '/';
      break;
    }
  }
  return hash !== undefined ? `${out}#${hash}` : out;
};
