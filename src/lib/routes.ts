import { translateSlug } from './carnet';

export type Lang = 'fr' | 'en';

export const SITE_ORIGIN = 'https://www.regenb.fr';

// French path (root) → English path (/en). Order matters: longer prefixes first.
const PAIRS: [string, string][] = [
  ['/accompagnement', '/en/services'],
  ['/etapes', '/en/journeys'],
  ['/coaching', '/en/coaching'],
  ['/supervision', '/en/supervision'],
  ['/pyrenees', '/en/pyrenees'],
  ['/boussole', '/en/compass'],
  ['/carnet/ecoutes', '/en/notebook/listening'],
  ['/carnet/bibliotheque', '/en/notebook/library'],
  ['/carnet', '/en/notebook'],
  ['/legal', '/en/legal'],
  ['/mentions-legales', '/en/legal-notice'],
  ['/confidentialite', '/en/privacy'],
  ['/cgv', '/en/terms'],
  ['/cookies', '/en/cookies'],
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
      if (pair[0] === '/carnet' && rest.length > 1) out = pair[to] + '/' + translateSlug(rest.slice(1), lang);
      if (lang === 'fr' && pair[to] === '/' ) out = '/';
      break;
    }
  }
  if (hash !== undefined && (base === '/carnet/ecoutes' || base === '/en/notebook/listening')) {
    const anchors: [string, string][] = [['autour-du-feu', 'around-the-fire'], ['marcher', 'walking'], ['voix-et-souffle', 'voice-and-breath']];
    const anchor = anchors.find(pair => pair[from] === hash);
    return `${out}#${anchor?.[to] ?? hash}`;
  }
  return hash !== undefined ? `${out}#${hash}` : out;
};
