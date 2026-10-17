import { SITE_ORIGIN } from '@/lib/routes';
import type { CarnetEntry } from '@/lib/carnet';

/** JSON-LD builders. Only facts visible on the site; never invent prices, ratings or reviews. */
type Lang = 'fr' | 'en';
const CTX = 'https://schema.org';
export const PERSON_ID = `${SITE_ORIGIN}/#person`;
export const ORG_ID = `${SITE_ORIGIN}/#service`;

export const website = (lang: Lang) => ({
  '@context': CTX, '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`,
  name: 'RegenB France', url: SITE_ORIGIN, inLanguage: lang, publisher: { '@id': ORG_ID },
});

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': CTX, '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: SITE_ORIGIN + it.path })),
});

export const person = (lang: Lang) => ({
  '@context': CTX, '@type': 'Person', '@id': PERSON_ID,
  name: 'Josselin Butté',
  jobTitle: lang === 'en' ? 'Facilitator, coach and supervisor' : 'Facilitateur, coach et superviseur',
  url: SITE_ORIGIN,
  sameAs: ['https://www.linkedin.com/in/josselin-butt%C3%A9-96063a7/', 'https://lecontinuo.substack.com'],
  knowsLanguage: ['fr', 'en'],
  knowsAbout: lang === 'en'
    ? ['facilitation', 'supervision', 'coaching', 'mediation', 'programme design', 'collective intelligence', 'regenerative design']
    : ['facilitation', 'supervision', 'coaching', 'médiation', 'conception de programmes', 'intelligence collective', 'design régénératif'],
  worksFor: { '@id': ORG_ID },
});

export const professionalService = () => ({
  '@context': CTX, '@type': 'ProfessionalService', '@id': ORG_ID,
  name: 'RegenB France', url: SITE_ORIGIN, logo: `${SITE_ORIGIN}/favicon-v2-512.png`,
  founder: { '@id': PERSON_ID },
  email: 'josselin@regenb.com',
  areaServed: { '@type': 'Country', name: 'France' },
  availableLanguage: ['French', 'English'],
});

export const services = (lang: Lang, items: { title: string; desc: string }[], pagePath: string) =>
  items.map((s) => ({
    '@context': CTX, '@type': 'Service', name: s.title, description: s.desc, inLanguage: lang,
    url: SITE_ORIGIN + pagePath, provider: { '@id': ORG_ID, '@type': 'ProfessionalService', name: 'RegenB France' },
    ...(s.title === 'Supervision'
      ? { offers: { '@type': 'Offer', price: 480, priceCurrency: 'EUR', description: lang === 'en' ? '€480 for the four sessions' : '480 € les quatre séances' } }
      : {}),
  }));

/** No Offer: the compass page shows no price, and price is required in an Offer. */
export const course = (lang: Lang, name: string, description: string) => ({
  '@context': CTX, '@type': 'Course', name, description,
  inLanguage: ['fr', 'en'],
  provider: { '@id': ORG_ID, '@type': 'ProfessionalService', name: 'RegenB France', url: SITE_ORIGIN },
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', inLanguage: lang },
});

export const article = (entry: CarnetEntry, path: string) => ({
  '@context': CTX, '@type': 'Article',
  headline: entry.title, description: entry.description,
  datePublished: entry.date, dateModified: entry.updated || entry.date,
  inLanguage: entry.lang, url: SITE_ORIGIN + path, mainEntityOfPage: SITE_ORIGIN + path,
  author: { '@id': PERSON_ID, '@type': 'Person', name: 'Josselin Butté', url: SITE_ORIGIN },
  publisher: { '@id': ORG_ID, '@type': 'ProfessionalService', name: 'RegenB France', url: SITE_ORIGIN },
  citation: Array.from(new Set(entry.body.match(/https?:\/\/[^\s)>\]]+/g) ?? [])).map((u) => u.replace(/[.,;]+$/, '')),
});
