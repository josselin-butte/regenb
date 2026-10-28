import { useLocation } from 'react-router-dom';
import Seo from '@/components/Seo';
import { content } from '@/pages/Services';
import { localContent } from '@/pages/LocalPage';
import { breadcrumb, course, faqPage, person, professionalService, services, website } from '@/lib/structured-data';

type Entry = { title: string; description: string; noindex?: boolean; jsonLd?: object[] };

const svcFr = content.fr.services, svcEn = content.en.services;
const base = (lang: 'fr' | 'en', path: string) => [website(lang), breadcrumb(crumbs(path))];

/** Visible page names for breadcrumbs. */
const LABELS: Record<string, string> = {
  '/accompagnement': 'Accompagnement', '/en/services': 'Services',
  '/boussole': 'La Boussole des valeurs', '/en/compass': 'The Values Compass',
  '/etapes': 'Les étapes', '/en/journeys': 'Journeys',
  '/coaching': 'Coaching', '/en/coaching': 'Coaching',
  '/supervision': 'Supervision', '/en/supervision': 'Supervision',
  '/pyrenees': 'Dans les Pyrénées', '/en/pyrenees': 'In the Pyrenees',
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
  home: { fr: 'Facilitateur, coach et superviseur à Arbas, dans les Pyrénées. J’accompagne dirigeants, équipes et accompagnants, en Comminges, à Toulouse et à distance.', en: 'Facilitator, coach and supervisor in Arbas, French Pyrenees. I work with leaders, teams and practitioners in the Comminges, in Toulouse and online.' },
  coaching: { fr: 'Coaching de dirigeants et managers en Comminges, Ariège et Toulouse : séances en marchant dans les Pyrénées ou en visio. Premier échange de 30 minutes.', en: 'Leadership coaching from Arbas in the French Pyrenees: walking sessions in the Comminges, meetings in Toulouse or online, in English or French.' },
  supervision: { fr: 'Supervision pour coachs et facilitateurs, à distance ou en marchant dans les Pyrénées, et en groupe avec Le Cercle. 680 € HT les quatre séances.', en: 'Supervision for coaches and facilitators, online or walking in the French Pyrenees, and in a group with The Circle. €680 excl. VAT for four sessions.' },
  pyrenees: { fr: 'Où et comment je travaille dans les Pyrénées : Arbas, Comminges, Saint-Gaudens, Couserans, Luchon, Toulouse. Coaching, supervision, facilitation, étapes.', en: 'Where and how I work in the French Pyrenees: Arbas, the Comminges, Saint-Gaudens, Ariège, Luchon and Toulouse. Coaching, supervision, facilitation.' },
  svc: { fr: "Cinq façons de travailler ensemble : facilitation, conception de programmes, coaching, supervision et médiation. Premier échange de 30 minutes.", en: 'Five ways to work together: facilitation, programme design, coaching, supervision and mediation. Start with a 30-minute conversation.' },
  compass: { fr: "Six modules autour de la terre, de l'eau, de l'air et du feu pour nommer les valeurs qui tiennent quand tout bouge. À votre rythme, en audio.", en: 'Six modules around earth, water, air and fire to name the values that hold when everything moves. At your own pace, with audio.' },
};

/** Local pages: the ProfessionalService (with address) plus the page FAQ, built from visible text only. */
const local = (lang: 'fr' | 'en', kind: 'coaching' | 'supervision' | 'pyrenees', path: string) =>
  [professionalService(), faqPage(lang, localContent[kind][lang].faq, path)];

export const SEO: Record<string, Entry> = {
  '/': { title: 'Coaching, supervision et facilitation · Pyrénées | RegenB', description: D.home.fr, jsonLd: [person('fr'), professionalService()] },
  '/en': { title: 'Coaching, supervision and facilitation · Pyrenees | RegenB', description: D.home.en, jsonLd: [person('en'), professionalService()] },
  '/accompagnement': { title: 'Facilitation, coaching, supervision, médiation | RegenB', description: D.svc.fr, jsonLd: [professionalService(), ...services('fr', svcFr, '/accompagnement'), faqPage('fr', content.fr.faq, '/accompagnement')] },
  '/en/services': { title: 'Facilitation, coaching, supervision, mediation | RegenB', description: D.svc.en, jsonLd: [professionalService(), ...services('en', svcEn, '/en/services'), faqPage('en', content.en.faq, '/en/services')] },
  '/coaching': { title: 'Coach de dirigeants dans les Pyrénées et à Toulouse | RegenB', description: D.coaching.fr, jsonLd: local('fr', 'coaching', '/coaching') },
  '/en/coaching': { title: 'Leadership coaching in the French Pyrenees | RegenB', description: D.coaching.en, jsonLd: local('en', 'coaching', '/en/coaching') },
  '/supervision': { title: 'Supervision de coachs et facilitateurs · Pyrénées | RegenB', description: D.supervision.fr, jsonLd: local('fr', 'supervision', '/supervision') },
  '/en/supervision': { title: 'Supervision for coaches and facilitators, Pyrenees | RegenB', description: D.supervision.en, jsonLd: local('en', 'supervision', '/en/supervision') },
  '/pyrenees': { title: 'Coaching et supervision en Comminges, Pyrénées | RegenB', description: D.pyrenees.fr, jsonLd: local('fr', 'pyrenees', '/pyrenees') },
  '/en/pyrenees': { title: 'Coaching and facilitation in the French Pyrenees | RegenB', description: D.pyrenees.en, jsonLd: local('en', 'pyrenees', '/en/pyrenees') },
  '/boussole': { title: 'La Boussole des valeurs, formation en ligne | RegenB France', description: D.compass.fr, jsonLd: [course('fr', 'La Boussole des valeurs', D.compass.fr)] },
  '/en/compass': { title: 'The Values Compass, online course | RegenB France', description: D.compass.en, jsonLd: [course('en', 'The Values Compass', D.compass.en)] },
  '/etapes': { title: 'Les étapes : relire sa pratique dehors | RegenB', description: "Trois Étapes pour relire sa pratique avec un lieu : Arbas dans les Pyrénées au printemps 2027, Mazeimard en Creuse l'été, Saint-Laurent-Médoc à l'automne." },
  '/en/journeys': { title: 'Journeys: reflect on your practice outdoors | RegenB', description: 'Three journeys to reflect on your practice with a place: Arbas in the Pyrenees in spring 2027, Mazeimard in Creuse in summer, Saint-Laurent-Médoc in autumn.' },
  '/carnet': { title: 'Carnet de recherche | Josselin Butté', description: "Les questions qui me font marcher : écoute des groupes, eau, attention, robustesse. Des notes de recherche reliant sciences du vivant et accompagnement." },
  '/en/notebook': { title: 'Research notebook | Josselin Butté', description: 'The questions that keep me walking: group listening, water, attention, robustness. Research notes linking the life sciences and the work of guiding.' },
  '/mentions-legales': { title: 'Mentions légales | RegenB France', description: 'Éditeur, hébergement, propriété intellectuelle et médiation de la consommation de RegenB France.' },
  '/en/legal-notice': { title: 'Legal notice | RegenB France', description: 'Publisher, hosting, intellectual property and consumer mediation for RegenB France. The French version prevails.' },
  '/confidentialite': { title: 'Confidentialité | RegenB France', description: 'Utilisation de vos données et exercice de vos droits auprès de RegenB France.' },
  '/en/privacy': { title: 'Privacy | RegenB France', description: 'How your data is used and how to exercise your rights with RegenB France. The French version prevails.' },
  '/cgv': { title: 'Conditions générales de vente | RegenB France', description: 'Commande, accès, droit de rétractation et propriété intellectuelle de la formation La Boussole des valeurs.' },
  '/en/terms': { title: 'Terms of sale | RegenB France', description: 'Orders, access, withdrawal and intellectual property for The Values Compass. The French version prevails.' },
  '/cookies': { title: 'Cookies et confidentialité | RegenB France', description: 'Choisir les usages facultatifs, connaître le cookie de consentement et changer d’avis à tout moment.' },
  '/en/cookies': { title: 'Cookies and privacy | RegenB France', description: 'Choose optional purposes, learn about the consent cookie and change your mind at any time.' },
  '/contact': { title: 'Contact · Josselin Butté, Arbas (Haute-Garonne) | RegenB', description: 'Écrivez-moi pour parler de facilitation, de supervision, de coaching ou de la Boussole des valeurs.' },
  '/en/contact': { title: 'Contact · Josselin Butté, Arbas, French Pyrenees | RegenB', description: 'Write to me about facilitation, supervision, coaching or the Values Compass.' },
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
