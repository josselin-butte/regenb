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
  ...[
    ['ajs_anonymous_id', '1 an / 1 year'],
    ['cf_clearance', '1 an / 1 year'],
    ['__cf_bm (Substack)', '30 minutes'],
    ['AWSALBTG / AWSALBTGCORS', '7 jours / 7 days'],
    ['cookie_storage_key', '90 jours / 90 days'],
    ['disable_html_pixels / disable_experiments', 'Session'],
    ['substack_ref / substack_ref_url (localStorage, sessionStorage)', 'Session ou durée gérée par Substack / Session or Substack-managed duration'],
  ].map(([name, duration]): Tracker => ({
    name,
    purpose: { fr: 'Formulaire Continuo : fonctionnement, sécurité, attribution et préférences du service tiers ; uniquement après accord pour les contenus externes', en: 'Continuo form: third-party operation, security, attribution and preferences; only after external-content consent' },
    provider: { fr: 'Substack et ses prestataires (dans le formulaire intégré)', en: 'Substack and its providers (inside the embedded form)' },
    lifetime: { fr: duration, en: duration }, category: 'external',
  })),
  {
    name: '_fbp',
    purpose: { fr: 'Reconnaître le navigateur pour mesurer les pages vues et les publicités Facebook/Instagram', en: 'Recognise the browser to measure page views and Facebook/Instagram advertising' },
    provider: { fr: 'Meta Platforms Ireland Limited', en: 'Meta Platforms Ireland Limited' },
    lifetime: { fr: '3 mois', en: '3 months' },
    category: 'advertising',
  },
  {
    name: '_fbc',
    purpose: { fr: 'Relier une visite à un clic publicitaire Facebook/Instagram, si présent', en: 'Link a visit to a Facebook/Instagram ad click, when present' },
    provider: { fr: 'Meta Platforms Ireland Limited', en: 'Meta Platforms Ireland Limited' },
    lifetime: { fr: '3 mois', en: '3 months' },
    category: 'advertising',
  },
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
