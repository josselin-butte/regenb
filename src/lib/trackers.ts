import { CONSENT_COOKIE, type ConsentCategory } from './consent';

/**
 * Single source of truth for every cookie / storage entry this site can set.
 * The /cookies table is rendered from this list. Any optional service registered
 * through registerOptionalService must declare its cookies here with its category.
 */
export type TrackerCategory = 'necessary' | ConsentCategory;
type Bi = { fr: string; en: string };
export interface Tracker { name: string; purpose: Bi; provider: Bi; lifetime: Bi; category: TrackerCategory }

export const trackers: Tracker[] = [
  {
    name: CONSENT_COOKIE,
    purpose: { fr: 'Mémoriser votre choix sur les cookies (et la version du bandeau)', en: 'Remember your cookie choice (and the banner version)' },
    provider: { fr: 'RegenB France (ce site)', en: 'RegenB France (this site)' },
    lifetime: { fr: '6 mois', en: '6 months' },
    category: 'necessary',
  },
  {
    name: '__cf_bm',
    purpose: { fr: 'Sécurité : distinguer les visiteurs des robots malveillants', en: 'Security: tell visitors apart from malicious bots' },
    provider: { fr: 'Cloudflare (hébergement)', en: 'Cloudflare (hosting)' },
    lifetime: { fr: '30 minutes', en: '30 minutes' },
    category: 'necessary',
  },
];

export const optionalTrackers = (list: Tracker[] = trackers) => list.filter(t => t.category !== 'necessary');
