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
      after: ['Je ne vends ni ne loue jamais vos données. Avec votre accord publicitaire uniquement, le Pixel Meta transmet les pages consultées, des identifiants de navigateur, l’adresse IP et les informations du navigateur à Meta Platforms Ireland Limited pour la mesure et l’attribution des publicités Facebook/Instagram. Aucun nom, e-mail, contenu de formulaire ou événement de conversion n’est transmis. Les cookies _fbp et _fbc durent trois mois ; la conservation chez Meta suit sa politique de confidentialité. Vous pouvez retirer votre accord via « Gérer mes cookies » en pied de page.'] },
    { title: 'Formulaire Continuo intégré', paragraphs: ['Le formulaire Substack ne se charge qu’après votre accord pour les contenus externes. Substack Inc. (États-Unis) reçoit alors votre adresse IP, les informations de votre navigateur et ses propres traceurs de fonctionnement, sécurité et attribution ; votre e-mail lui est transmis uniquement si vous vous abonnez. La confirmation et la désinscription sont gérées par Substack. Aucun événement Lead ni donnée de ce formulaire n’est envoyé à Meta. Le retrait via « Gérer mes cookies » retire immédiatement le formulaire et recharge le site ; ce site ne peut pas effacer les cookies du domaine Substack. Voir également la politique de confidentialité de Substack : https://substack.com/privacy.'] },
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
    { title: 'Cookies', paragraphs: ['Voir la page Cookies.', 'Date de mise à jour : 17 octobre 2026.'] },
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
      after: ['I never sell or rent your data. Only with advertising consent, the Meta Pixel sends visited pages, browser identifiers, your IP address and browser information to Meta Platforms Ireland Limited for Facebook/Instagram advertising measurement and attribution. No name, email, form content or conversion event is sent. The _fbp and _fbc cookies last three months; Meta retention follows its privacy policy. Withdraw consent through Cookie settings in the footer.'] },
    { title: 'Embedded Continuo form', paragraphs: ['The Substack form loads only after external-content consent. Substack Inc. (United States) then receives your IP address, browser information and its own operation, security and attribution trackers; your email is sent to Substack only if you subscribe. Substack handles confirmation and unsubscription. No Lead event or data from this form is sent to Meta. Withdrawal through Cookie settings immediately removes the form and reloads this site; this site cannot erase cookies on the Substack domain. See also Substack’s privacy policy: https://substack.com/privacy.'] },
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
    { title: 'Cookies', paragraphs: ['See the Cookies page.', 'Last updated: 17 October 2026.'] },
  ],
};

export const TERMS_VERSION = 'v1 — 12 octobre 2026';

export const termsContent: Record<'fr' | 'en', LegalBlock[]> = {
  fr: [
    { title: '1. Objet et champ', paragraphs: ['Les présentes conditions s\'appliquent à la vente en ligne de la formation numérique « [NOM OFFICIEL DU COURS] » par RegenB France EURL (coordonnées : voir mentions légales) à des consommateurs et à des professionnels.'] },
    { title: '2. Contenu', paragraphs: ['Six modules de trois sections, textes, enregistrements audio FR/EN, cahiers téléchargeables, accès via un espace personnel.', 'Configuration requise : navigateur récent, connexion internet.'] },
    { title: '3. Prix', paragraphs: ['77 € hors taxes, soit 92,40 € toutes taxes comprises (TVA 20 %).', 'Le prix applicable est celui affiché au moment de la commande.'] },
    { title: '4. Commande', paragraphs: ['Étapes : choix de la formule, vérification du récapitulatif, acceptation des CGV, choix concernant le droit de rétractation, clic sur « Commander avec obligation de paiement », paiement sécurisé via Stripe.', 'Une confirmation est envoyée par e-mail avec les CGV en PDF.'] },
    { title: '5. Accès', paragraphs: ['Personnel, non transférable, pour une durée [illimitée tant que la formation est proposée / de X mois].'] },
    { title: '6. Droit de rétractation', paragraphs: [
      `Vous disposez de 14 jours à compter de la conclusion du contrat pour vous rétracter, sans motif et sans frais, via le bouton « Renoncer au contrat ici » disponible dans votre espace et en pied de page, ou par e-mail à ${EMAIL} (modèle de formulaire ci-dessous). Remboursement sous 14 jours par le même moyen de paiement.`,
      "Exception : si vous demandez expressément l'accès immédiat à la formation avant la fin de ce délai ET reconnaissez que vous perdez ainsi votre droit de rétractation (deux cases distinctes lors de la commande), le droit de rétractation ne peut plus être exercé dès que l'accès est ouvert (art. L221-28 13° du Code de la consommation). Cet accord vous est confirmé par e-mail. Si vous ne cochez pas ces cases, l'accès s'ouvre à l'issue du délai de 14 jours.",
      `Modèle de formulaire de rétractation (annexe du Code de la consommation) : « À l'attention de RegenB France, 8 route de Barat, 31160 Arbas, ${EMAIL} : je vous notifie par la présente ma rétractation du contrat portant sur la formation ci-dessous : commandée le [ ] ; nom ; adresse ; date ; signature (si papier). »`,
    ] },
    { title: '7. Garantie légale de conformité', paragraphs: [`Le contenu numérique bénéficie de la garantie légale de conformité (art. L224-25-12 et suivants du Code de la consommation) pendant toute la durée de fourniture. Signalez tout défaut à ${EMAIL}.`] },
    { title: '8. Propriété intellectuelle', paragraphs: ['Usage strictement personnel, aucune diffusion ou reproduction.'] },
    { title: '9. Données personnelles', paragraphs: ['Voir la politique de confidentialité.'] },
    { title: '10. Réclamations et médiation', paragraphs: [`Réclamation écrite à ${EMAIL} ; à défaut de solution, médiateur gratuit : [NOM, ADRESSE, SITE].`] },
    { title: '11. Droit applicable', paragraphs: ['Droit français ; le consommateur conserve la protection des règles impératives de son pays de résidence.', `Version et date : ${TERMS_VERSION}.`] },
  ],
  en: [
    { title: '1. Purpose and scope', paragraphs: ['These terms apply to the online sale of the digital course “[OFFICIAL COURSE NAME]” by RegenB France EURL (contact details: see legal notice) to consumers and professionals.'] },
    { title: '2. Content', paragraphs: ['Six modules of three sections each, texts, audio recordings in French and English, downloadable workbooks, access through a personal area.', 'Requirements: a recent browser and an internet connection.'] },
    { title: '3. Price', paragraphs: ['€77 excluding VAT, i.e. €92.40 including VAT (20% VAT).', 'The applicable price is the one displayed at the time of the order.'] },
    { title: '4. Order', paragraphs: ['Steps: choice of package, review of the order summary, acceptance of these terms, choice regarding the right of withdrawal, click on “Order with obligation to pay”, secure payment via Stripe.', 'A confirmation is sent by email with these terms attached as a PDF.'] },
    { title: '5. Access', paragraphs: ['Personal and non-transferable, for [an unlimited period as long as the course is offered / X months].'] },
    { title: '6. Right of withdrawal', paragraphs: [
      `You have 14 days from the conclusion of the contract to withdraw, without giving a reason and at no cost, using the “Withdraw from the contract here” button in your personal area and in the footer, or by email to ${EMAIL} (model form below). You are refunded within 14 days using the same payment method.`,
      'Exception: if you expressly ask for immediate access to the course before the end of this period AND acknowledge that you thereby lose your right of withdrawal (two separate boxes when ordering), the right of withdrawal can no longer be exercised once access has been opened (art. L221-28 13° of the French Consumer Code). This agreement is confirmed to you by email. If you do not tick these boxes, access opens at the end of the 14-day period.',
      `Model withdrawal form (annex to the French Consumer Code): “To RegenB France, 8 route de Barat, 31160 Arbas, France, ${EMAIL}: I hereby give notice that I withdraw from the contract for the course below: ordered on [ ]; name; address; date; signature (if on paper).”`,
    ] },
    { title: '7. Legal guarantee of conformity', paragraphs: [`The digital content is covered by the legal guarantee of conformity (art. L224-25-12 and following of the French Consumer Code) for the entire supply period. Report any defect to ${EMAIL}.`] },
    { title: '8. Intellectual property', paragraphs: ['Strictly personal use; no distribution or reproduction.'] },
    { title: '9. Personal data', paragraphs: ['See the privacy policy.'] },
    { title: '10. Complaints and mediation', paragraphs: [`Written complaint to ${EMAIL}; if no solution is found, free mediator: [NAME, ADDRESS, WEBSITE].`] },
    { title: '11. Governing law', paragraphs: ['French law; consumers keep the protection of the mandatory rules of their country of residence.', `Version and date: ${TERMS_VERSION}.`] },
  ],
};
