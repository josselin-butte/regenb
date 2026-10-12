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