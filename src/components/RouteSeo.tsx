import { useLocation } from 'react-router-dom';
import Seo from '@/components/Seo';
import { content } from '@/pages/Services';
import { breadcrumb, course, person, professionalService, services, website } from '@/lib/structured-data';

type Entry = { title: string; description: string; noindex?: boolean; jsonLd?: object[] };

const svcFr = content.fr.services, svcEn = content.en.services;
const base = (lang: 'fr' | 'en', path: string) => [website(lang), breadcrumb(crumbs(path))];

/** Visible page names for breadcrumbs. */
const LABELS: Record<string, string> = {
  '/accompagnement': 'Accompagnement', '/en/services': 'Services',
  '/boussole': 'La Boussole des valeurs', '/en/compass': 'The Values Compass',
  '/etapes': 'Les étapes', '/en/journeys': 'Journeys',
  '/carnet': 'Carnet de recherche', '/en/notebook': 'Research notebook',
  '/mentions-legales': 'Mentions légales', '/en/legal-notice': 'Legal notice',
  '/confidentialite': 'Confidentialité', '/en/privacy': 'Privacy',
  '/cgv': 'Conditions générales de vente', '/en/terms': 'Terms of sale',
  '/cookies': 'Cookies', '/en/cookies': 'Cookies',
  '/contact': 'Contact', '/en/contact': 'Contact',
};

export const crumbs = (path: string, last?: string) => {
  const en = path === '/en' || path.startsWith('/en/');
  const items = [{ name: en ? 'Home' : 'Accueil', path: en ? '/en' : '/' }];
  const segs = path.split('/').filter(Boolean).slice(en ? 1 : 0);
  let acc = en ? '/en' : '';
  segs.forEach((seg, i) => {
    acc += '/' + seg;
    const name = i === segs.length - 1 && last ? last : LABELS[acc];
    if (name) items.push({ name, path: acc });
  });
  return items;
};

const D = {
  home: { fr: "Facilitateur et superviseur, j'accompagne équipes de direction, managers et accompagnants à décider plus clairement, au rythme du vivant.", en: 'Facilitator and supervisor, I help leadership teams, managers and practitioners make clearer decisions, at the pace of the living world.' },
  svc: { fr: "Cinq façons de travailler ensemble : facilitation, conception de programmes, coaching, supervision et médiation. Premier échange de 30 minutes.", en: 'Five ways to work together: facilitation, programme design, coaching, supervision and mediation. Start with a 30-minute conversation.' },
  compass: { fr: "Six modules autour de la terre, de l'eau, de l'air et du feu pour nommer les valeurs qui tiennent quand tout bouge. À votre rythme, en audio.", en: 'Six modules around earth, water, air and fire to name the values that hold when everything moves. At your own pace, with audio.' },
};

export const SEO: Record<string, Entry> = {
  '/': { title: 'Facilitation, supervision et coaching | Josselin Butté', description: D.home.fr, jsonLd: [person('fr'), professionalService()] },
  '/en': { title: 'Facilitation, supervision and coaching | Josselin Butté', description: D.home.en, jsonLd: [person('en'), professionalService()] },
  '/accompagnement': { title: 'Facilitation, coaching, supervision, médiation | RegenB France', description: D.svc.fr, jsonLd: [professionalService(), ...services('fr', svcFr, '/accompagnement')] },
  '/en/services': { title: 'Facilitation, coaching, supervision, mediation | RegenB France', description: D.svc.en, jsonLd: [professionalService(), ...services('en', svcEn, '/en/services')] },
  '/boussole': { title: 'La Boussole des valeurs, formation en ligne | RegenB France', description: D.compass.fr, jsonLd: [course('fr', 'La Boussole des valeurs', D.compass.fr)] },
  '/en/compass': { title: 'The Values Compass, online course | RegenB France', description: D.compass.en, jsonLd: [course('en', 'The Values Compass', D.compass.en)] },
  '/etapes': { title: 'Les étapes, séjours en petit groupe | RegenB France', description: "Quelques jours dehors pour marcher et relire sa pratique. Premier séjour au printemps 2027, à la ferme d'Oulan Bât, à Arbas." },
  '/en/journeys': { title: 'Journeys, small-group stays | RegenB France', description: 'A few days outdoors to walk and reflect on your practice. First journey in spring 2027, at the Oulan Bât farm in Arbas, France.' },
  '/carnet': { title: 'Carnet de recherche | Josselin Butté', description: "Les questions qui me font marcher : écoute des groupes, eau, attention, robustesse. Des notes de recherche reliant sciences du vivant et accompagnement." },
  '/en/notebook': { title: 'Research notebook | Josselin Butté', description: 'The questions that keep me walking: group listening, water, attention, robustness. Research notes linking the life sciences and the work of guiding.' },
  '/mentions-legales': { title: 'Mentions légales | RegenB France', description: 'Éditeur, hébergement, propriété intellectuelle et médiation de la consommation de RegenB France.' },
  '/en/legal-notice': { title: 'Legal notice | RegenB France', description: 'Publisher, hosting, intellectual property and consumer mediation for RegenB France. The French version prevails.' },
  '/confidentialite': { title: 'Confidentialité | RegenB France', description: 'Utilisation de vos données et exercice de vos droits auprès de RegenB France.' },
  '/en/privacy': { title: 'Privacy | RegenB France', description: 'How your data is used and how to exercise your rights with RegenB France. The French version prevails.' },
  '/cgv': { title: 'Conditions générales de vente | RegenB France', description: 'Commande, accès, droit de rétractation et propriété intellectuelle de la formation Nature Values Compass.' },
  '/en/terms': { title: 'Terms of sale | RegenB France', description: 'Orders, access, withdrawal and intellectual property for Nature Values Compass. The French version prevails.' },
  '/cookies': { title: 'Cookies et confidentialité | RegenB France', description: 'Choisir les usages facultatifs, connaître le cookie de consentement et changer d’avis à tout moment.' },
  '/en/cookies': { title: 'Cookies and privacy | RegenB France', description: 'Choose optional purposes, learn about the consent cookie and change your mind at any time.' },
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
  const lang = path === '/en' || path.startsWith('/en/') ? 'en' : 'fr';
  if (entry) return <Seo {...entry} jsonLd={entry.noindex ? entry.jsonLd : [...base(lang, path), ...(entry.jsonLd ?? [])]} />;
  return <Seo title="RegenB France" description={D.home.fr} noindex />;
};

export default RouteSeo;
