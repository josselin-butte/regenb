export type LegalPageKind = 'notice' | 'privacy' | 'terms';
export const FRENCH_PREVAILS = 'This translation is provided for convenience; the French version prevails.';

export function legacyLegalDestination(language: 'fr' | 'en', hash = ''): string {
  if (hash === '#confidentialite') return language === 'fr' ? '/confidentialite' : '/en/privacy';
  if (hash === '#cgv') return language === 'fr' ? '/cgv' : '/en/terms';
  return language === 'fr' ? '/mentions-legales' : '/en/legal-notice';
}

export const noticeContent = {
  fr: [
    { title: 'Éditeur du site', paragraphs: [
      'RegenB France, EURL au capital de 500 €',
      'Siège social : 8 route de Barat, 31160 Arbas, France',
      'SIREN 102 629 847 — RCS Toulouse — Code NAF 9609Z',
      'N° TVA intracommunautaire : FR10102629847',
      'Téléphone : 0781844214 — E-mail : josselin@regenb.com',
      'Directeur de la publication : Josselin Butté, gérant',
    ] },
    { title: 'Hébergement', paragraphs: [
      'Lovable Labs Incorporated, 1 Lincoln Street, Boston, MA 02111, États-Unis — https://lovable.dev',
      'Stockage des données de la formation : [Supabase Inc. / Lovable Cloud — adresse — région des serveurs]',
      'Nom de domaine : GoDaddy',
    ] },
    { title: 'Propriété intellectuelle', paragraphs: ['Les textes, enregistrements audio, photographies, cahiers et contenus de formation sont la propriété de RegenB France ou de Josselin Butté. Toute reproduction ou diffusion sans autorisation écrite est interdite.'] },
    { title: 'Médiation de la consommation', paragraphs: ['Conformément aux articles L612-1 et suivants du Code de la consommation, vous pouvez recourir gratuitement au médiateur après une réclamation écrite préalable adressée à RegenB France.'] },
  ],
  en: [
    { title: 'Website publisher', paragraphs: [
      'RegenB France, a single-member limited liability company (EURL) with share capital of €500',
      'Registered office: 8 route de Barat, 31160 Arbas, France',
      'SIREN 102 629 847 — Toulouse Trade and Companies Register (RCS) — NAF code 9609Z',
      'Intra-community VAT number: FR10102629847',
      'Telephone: 0781844214 — Email: josselin@regenb.com',
      'Publication director: Josselin Butté, manager',
    ] },
    { title: 'Hosting', paragraphs: [
      'Lovable Labs Incorporated, 1 Lincoln Street, Boston, MA 02111, United States — https://lovable.dev',
      'Course data storage: [Supabase Inc. / Lovable Cloud — address — server region]',
      'Domain name: GoDaddy',
    ] },
    { title: 'Intellectual property', paragraphs: ['The texts, audio recordings, photographs, workbooks and course content are the property of RegenB France or Josselin Butté. Any reproduction or distribution without written authorisation is prohibited.'] },
    { title: 'Consumer mediation', paragraphs: ['Under articles L612-1 and following of the French Consumer Code, you may refer your dispute to a mediator free of charge after first submitting a written complaint to RegenB France.'] },
  ],
};
export type LegalTable = { head: string[]; rows: string[][] };
export type LegalBlock = { title: string; paragraphs: string[]; table?: LegalTable; after?: string[] };

const EMAIL = 'josselin@regenb.com';

export const privacyContent: Record<'fr' | 'en', LegalBlock[]> = {
  fr: [
    { title: 'Qui est responsable ?', paragraphs: [
      `RegenB France EURL, 8 route de Barat, 31160 Arbas — contact : ${EMAIL}.`,
      "Je n'ai pas désigné de délégué à la protection des données (non obligatoire pour mon activité).",
    ] },
    { title: 'Quelles données, pourquoi, sur quelle base, combien de temps ?', paragraphs: [], table: {
      head: ['Traitement', 'Données', 'Base légale', 'Durée'],
      rows: [
        ['Répondre à vos messages (formulaire de contact)', 'nom, e-mail, message', 'intérêt légitime / mesures précontractuelles', "le temps de l'échange, puis 3 ans après le dernier contact"],
        ['Vente et accès à la formation Boussole', 'nom, e-mail, compte, progression, réponses aux cahiers, historique de commande', 'exécution du contrat', "durée de l'accès + 5 ans (prescription) ; factures 10 ans (obligation comptable)"],
        ['Paiement', 'traité directement par Stripe ; je ne vois ni ne stocke vos numéros de carte', 'exécution du contrat', 'selon Stripe'],
        ['Lettre Continuo', 'e-mail, préférences', 'consentement, retirable à tout moment via le lien de désinscription', "jusqu'à désinscription"],
        ['Accompagnements (coaching, supervision, facilitation, médiation)', 'coordonnées, éléments échangés pour la mission', 'contrat / mesures précontractuelles', 'durée de la mission + 5 ans'],
        ['Sécurité et fonctionnement du site', 'journaux techniques, adresse IP', 'intérêt légitime', '[12 mois max]'],
        ["[Mesure d'audience, si conservée]", 'données de navigation', 'consentement', '13 mois max (traceurs), 25 mois (statistiques)'],
      ] },
      after: ['Je ne vends ni ne loue jamais vos données. Je n\'utilise aucune décision automatisée ni profilage.'] },
    { title: 'Qui reçoit vos données ?', paragraphs: [
      'Des prestataires agissant pour mon compte ou des responsables indépendants :',
      "Lovable Labs Inc. (hébergement, États-Unis) ; [Supabase / Lovable Cloud] (base de données, [région]) ; Stripe Payments Europe Ltd (paiement, Irlande) ; [prestataire d'e-mails] ; Substack Inc. (lettre Continuo, États-Unis) ; mon expert-comptable pour les factures.",
    ] },
    { title: "Transferts hors de l'Union européenne", paragraphs: [
      'Certains prestataires sont situés aux États-Unis. Les transferts sont encadrés par [le Data Privacy Framework UE–États-Unis lorsque le prestataire est certifié / les clauses contractuelles types de la Commission européenne] — [À VÉRIFIER pour chaque prestataire].',
    ] },
    { title: 'Vos droits', paragraphs: [
      'Accès, rectification, effacement, limitation, opposition, portabilité, retrait du consentement à tout moment, et directives sur le sort de vos données après votre décès.',
      `Écrivez à ${EMAIL} ; je réponds sous un mois.`,
      'Vous pouvez aussi introduire une réclamation auprès de la CNIL (www.cnil.fr, 3 place de Fontenoy, 75007 Paris).',
    ] },
    { title: 'Cookies', paragraphs: ['Voir la page Cookies.', 'Date de mise à jour : 12 octobre 2026.'] },
  ],
  en: [
    { title: 'Who is responsible?', paragraphs: [
      `RegenB France EURL, 8 route de Barat, 31160 Arbas, France — contact: ${EMAIL}.`,
      "I haven't appointed a data protection officer (not required for my activity).",
    ] },
    { title: 'What data, why, on what basis, for how long?', paragraphs: [], table: {
      head: ['Processing', 'Data', 'Legal basis', 'Retention'],
      rows: [
        ['Replying to your messages (contact form)', 'name, email, message', 'legitimate interest / pre-contractual steps', 'for the duration of our exchange, then 3 years after the last contact'],
        ['Sale of and access to the Compass course', 'name, email, account, progress, workbook answers, order history', 'performance of the contract', 'duration of access + 5 years (limitation period); invoices 10 years (accounting obligation)'],
        ['Payment', 'handled directly by Stripe; I never see or store your card numbers', 'performance of the contract', 'as set by Stripe'],
        ['Continuo letter', 'email, preferences', 'consent, which you can withdraw at any time via the unsubscribe link', 'until you unsubscribe'],
        ['Accompaniment (coaching, supervision, facilitation, mediation)', 'contact details, information shared for the assignment', 'contract / pre-contractual steps', 'duration of the assignment + 5 years'],
        ['Website security and operation', 'technical logs, IP address', 'legitimate interest', '[12 months max]'],
        ['[Audience measurement, if kept]', 'browsing data', 'consent', '13 months max (trackers), 25 months (statistics)'],
      ] },
      after: ['I never sell or rent your data. I use no automated decision-making or profiling.'] },
    { title: 'Who receives your data?', paragraphs: [
      'Service providers acting on my behalf, or independent controllers:',
      'Lovable Labs Inc. (hosting, United States); [Supabase / Lovable Cloud] (database, [region]); Stripe Payments Europe Ltd (payment, Ireland); [email provider]; Substack Inc. (Continuo letter, United States); my accountant, for invoices.',
    ] },
    { title: 'Transfers outside the European Union', paragraphs: [
      'Some providers are based in the United States. These transfers are covered by [the EU–US Data Privacy Framework where the provider is certified / the European Commission’s standard contractual clauses] — [TO BE CHECKED for each provider].',
    ] },
    { title: 'Your rights', paragraphs: [
      'Access, rectification, erasure, restriction, objection, portability, withdrawal of consent at any time, and instructions on what happens to your data after your death.',
      `Write to ${EMAIL}; I reply within one month.`,
      'You can also lodge a complaint with the CNIL, the French data protection authority (www.cnil.fr, 3 place de Fontenoy, 75007 Paris, France).',
    ] },
    { title: 'Cookies', paragraphs: ['See the Cookies page.', 'Last updated: 12 October 2026.'] },
  ],
};
