import { useLocation } from 'react-router-dom';
import Seo from '@/components/Seo';
import { SITE_ORIGIN } from '@/lib/routes';

type Entry = { title: string; description: string; noindex?: boolean; jsonLd?: object[] };

const org = {
  '@type': 'Organization',
  '@id': `${SITE_ORIGIN}/#org`,
  name: 'RegenB France',
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/favicon.png`,
  email: 'josselin@regenb.com',
};

const person = (jobTitle: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Josselin Butté',
  jobTitle,
  url: SITE_ORIGIN,
  worksFor: { '@id': `${SITE_ORIGIN}/#org`, '@type': 'Organization', name: 'RegenB France' },
  sameAs: ['https://www.linkedin.com/in/josselin-butt%C3%A9-96063a7/', 'https://lecontinuo.substack.com'],
});

const service = (names: string[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'RegenB France',
  url: SITE_ORIGIN,
  email: 'josselin@regenb.com',
  areaServed: { '@type': 'Country', name: 'France' },
  availableLanguage: ['French', 'English'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: names[0] === 'Facilitation' && names[2] === 'Coaching' ? 'Services' : 'Services',
    itemListElement: names.map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
  },
});

const course = (name: string, description: string, inLanguage: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name,
  description,
  inLanguage,
  provider: { '@type': 'Organization', name: 'RegenB France', url: SITE_ORIGIN },
  offers: { '@type': 'Offer', price: 147, priceCurrency: 'EUR', url, category: 'Paid' },
});

const D = {
  home: { fr: "Facilitateur et superviseur, j'accompagne équipes de direction, managers et accompagnants à décider plus clairement, au rythme du vivant.", en: 'Facilitator and supervisor, I help leadership teams, managers and practitioners make clearer decisions, at the pace of the living world.' },
  svc: { fr: "Cinq façons de travailler ensemble : facilitation, conception de programmes, coaching, supervision et médiation. Premier échange de 30 minutes.", en: 'Five ways to work together: facilitation, programme design, coaching, supervision and mediation. Start with a 30-minute conversation.' },
  compass: { fr: "Six modules autour de la terre, de l'eau, de l'air et du feu pour nommer les valeurs qui tiennent quand tout bouge. À votre rythme, en audio.", en: 'Six modules around earth, water, air and fire to name the values that hold when everything moves. At your own pace, with audio.' },
};

export const SEO: Record<string, Entry> = {
  '/': { title: 'Facilitation, supervision et coaching | Josselin Butté', description: D.home.fr, jsonLd: [person('Facilitateur et superviseur'), { '@context': 'https://schema.org', ...org }] },
  '/en': { title: 'Facilitation, supervision and coaching | Josselin Butté', description: D.home.en, jsonLd: [person('Facilitator and supervisor'), { '@context': 'https://schema.org', ...org }] },
  '/accompagnement': { title: 'Facilitation, coaching, supervision, médiation | RegenB France', description: D.svc.fr, jsonLd: [service(['Facilitation', 'Conception de programmes', 'Coaching', 'Supervision', 'Médiation'])] },
  '/en/services': { title: 'Facilitation, coaching, supervision, mediation | RegenB France', description: D.svc.en, jsonLd: [service(['Facilitation', 'Programme design', 'Coaching', 'Supervision', 'Mediation'])] },
  '/boussole': { title: 'La Boussole des valeurs, formation en ligne | RegenB France', description: D.compass.fr, jsonLd: [course('La Boussole des valeurs', D.compass.fr, 'fr', 'https://valuescourse.regenb.com/')] },
  '/en/compass': { title: 'The Values Compass, online course | RegenB France', description: D.compass.en, jsonLd: [course('The Values Compass', D.compass.en, 'en', 'https://valuescourse.regenb.com/')] },
  '/etapes': { title: 'Les étapes, séjours en petit groupe | RegenB France', description: "Quelques jours dehors pour marcher et relire sa pratique. Premier séjour au printemps 2027, à la ferme d'Oulan Bât, à Arbas." },
  '/en/journeys': { title: 'Journeys, small-group stays | RegenB France', description: 'A few days outdoors to walk and reflect on your practice. First journey in spring 2027, at the Oulan Bât farm in Arbas, France.' },
  '/carnet': { title: 'Carnet de recherche | Josselin Butté', description: "Les questions qui me font marcher : écoute des groupes, eau, attention, robustesse. Des notes de recherche reliant sciences du vivant et accompagnement." },
  '/en/notebook': { title: 'Research notebook | Josselin Butté', description: 'The questions that keep me walking: group listening, water, attention, robustness. Research notes linking the life sciences and the work of guiding.' },
  '/legal': { title: 'Mentions légales et conditions | RegenB France', description: 'Mentions légales, confidentialité et conditions générales de vente de RegenB France, EURL basée à Arbas (Haute-Garonne).' },
  '/en/legal': { title: 'Legal notice and terms | RegenB France', description: 'Legal notice, privacy and terms of sale for RegenB France, a company based in Arbas, France.' },
  '/contact': { title: 'Contact | Josselin Butté', description: 'Écrivez-moi pour parler de facilitation, de supervision, de coaching ou de la Boussole des valeurs.' },
  '/en/contact': { title: 'Contact | Josselin Butté', description: 'Write to me about facilitation, supervision, coaching or the Values Compass.' },
};

const NOINDEX = /^\/(en\/)?(cercle|circle|login|dashboard|lesson|lessons|learn|course)(\/|$)|^\/admin(\/|$)/;

/** Applies per-route metadata. Notebook entries set their own. */
const RouteSeo = () => {
  const { pathname } = useLocation();
  const path = pathname !== '/' ? pathname.replace(/\/$/, '') : '/';
  if (/^\/(carnet|en\/notebook)\/.+/.test(path)) return null;
  const entry = SEO[path];
  if (entry) return <Seo {...entry} />;
  return <Seo title="RegenB France" description={D.home.fr} noindex />;
};

export default RouteSeo;
