import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface Translations {
  [key: string]: {
    fr: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { fr: 'Accueil', en: 'Home' },
  'nav.about': { fr: 'Qui je suis', en: 'About me' },
  'nav.offer': { fr: 'Ce que je propose', en: 'What I offer' },
  'nav.letter': { fr: 'La lettre', en: 'The letter' },
  'nav.compass': { fr: 'Ma boussole', en: 'My compass' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  
  // Hero
  'hero.eyebrow': { fr: 'Josselin Butté · RegenB France', en: 'Josselin Butté · RegenB France' },
  'hero.title': { fr: 'L’ère du vivant', en: 'The age of living systems' },
  'hero.sentence1': { fr: 'J’accompagne les leaders, coachs, superviseurs et accompagnants à transformer leur manière d’accompagner en s’alignant au vivant.', en: 'I support leaders, coaches, supervisors and practitioners in transforming how they accompany others by aligning with the living world.' },
  'hero.sentence2': { fr: 'Quand l’ancienne histoire ne tient plus, je vous aide à écouter ce qui cherche à émerger et à lui donner forme.', en: 'When the old story no longer holds, I help you listen to what is seeking to emerge and give it shape.' },
  'hero.cta': { fr: 'Trouver mon cap avec la boussole', en: 'Find my bearings with the compass' },
  'image.dehors': { fr: 'Josselin Butté marche sur un sentier de montagne', en: 'Josselin Butté walking a mountain path' },
  'image.portrait': { fr: 'Portrait de Josselin Butté', en: 'Portrait of Josselin Butté' },
  'image.groupe': { fr: 'Josselin Butté avec un groupe en atelier', en: 'Josselin Butté with a group in a workshop' },
  'image.paysage': { fr: 'Crêtes des Pyrénées dans la brume du matin', en: 'Pyrenees ridges in the morning mist' },
  'image.ecoute': { fr: 'Un moment d’écoute dans la nature', en: 'A moment of listening in nature' },
  
  // About
  'about.p1': { fr: 'Je m’appelle Josselin Butté. Avec RegenB France, je pars d’une conviction\u00A0: les réponses aux défis du leadership d’aujourd’hui ne viennent pas d’une seule personne. Elles émergent quand un groupe apprend à s’écouter, à décider ensemble et à renouer avec le vivant.', en: 'I’m Josselin Butté. Through RegenB France, I start from one conviction: the answers to today’s leadership challenges don’t come from one person. They emerge when a group learns to listen, to decide together and to reconnect with the living world.' },
  'about.p2': { fr: 'Je ne viens pas avec des réponses toutes faites. J’apporte un cadre, des questions et une attention à la manière dont le groupe travaille. Vous apportez votre expérience, vos tensions et ce qui cherche à émerger. Ce que nous construisons ensemble vous appartient.', en: 'I don’t arrive with ready-made answers. I bring a frame, questions and attention to how the group works. You bring your experience, your tensions and what is seeking to emerge. What we build together belongs to you.' },
  'about.p3': { fr: 'Je travaille rarement seul\u00A0: je conçois mes accompagnements avec des partenaires, des lieux d’accueil et des praticiens d’autres métiers. Mon approche relie les sagesses anciennes, les sciences du vivant et les pratiques d’accompagnement. Elle s’enrichit de chaque groupe que je rencontre.', en: 'I rarely work alone: I design my work with partners, host venues and practitioners from other fields. My approach connects ancestral wisdom, the life sciences and the practice of accompaniment, and it grows with every group I meet.' },
  'about.guide.kicker': { fr: 'Ce qui guide ma pratique', en: 'What guides my practice' },
  'about.guide.1.title': { fr: 'Co-créer plutôt que prescrire', en: 'Co-create rather than prescribe' },
  'about.guide.1.text': { fr: 'Les solutions naissent du groupe, pas de l’expert.', en: 'Solutions come from the group, not the expert.' },
  'about.guide.2.title': { fr: 'Rendre les décisions claires', en: 'Make decisions clear' },
  'about.guide.2.text': { fr: 'Dire qui contribue, qui tranche et comment, avant d’en débattre.', en: 'Say who contributes, who decides and how, before the debate.' },
  'about.guide.3.title': { fr: 'Traiter l’organisation comme un vivant', en: 'Treat the organisation as a living system' },
  'about.guide.3.text': { fr: 'Prendre soin des liens autant que des résultats.', en: 'Care for relationships as much as for results.' },
  'about.guide.4.title': { fr: 'Apprendre en faisant', en: 'Learn by doing' },
  'about.guide.4.text': { fr: 'Essayer, observer, ajuster ensemble.', en: 'Try, observe, adjust together.' },

  // Offer
  'offer.kicker': { fr: 'Ce que je propose · 02', en: 'What I offer · 02' },
  'offer.title': { fr: 'Transformer sa manière d’accompagner', en: 'Transform how you accompany' },
  'offer.text1': { fr: 'Je propose des espaces de réflexion, d’exploration et de mise en mouvement pour celles et ceux qui accompagnent des personnes, des équipes et des organisations.', en: 'I offer spaces for reflection, exploration and movement to those who support people, teams and organisations.' },
  'offer.text2': { fr: 'Mon travail relie leadership avec le vivant, pratique réflexive intégrative et expériences au contact de la nature. Chaque accompagnement part de votre réalité et de ce qui demande à évoluer.', en: 'My work connects living-systems leadership, integrative reflective practice and experiences in contact with nature. Each engagement begins with your reality and what is asking to evolve.' },
  'offer.text3': { fr: 'L’intention : retrouver une manière d’agir plus juste, plus vivante et profondément ancrée.', en: 'The intention: to find a way of acting that is more grounded, more alive and more deeply aligned.' },

  // Letter
  'letter.kicker': { fr: 'La lettre · 03', en: 'The letter · 03' },
  'letter.title': { fr: 'Recevoir des nouvelles du vivant', en: 'News from the living world' },
  'letter.text': { fr: 'Des réflexions, des ressources et les prochaines propositions de RegenB France, directement dans votre boîte mail.', en: 'Reflections, resources and the next RegenB France offerings, delivered directly to your inbox.' },
  'letter.label': { fr: 'Votre adresse e-mail', en: 'Your email address' },
  'letter.placeholder': { fr: 'vous@exemple.fr', en: 'you@example.com' },
  'letter.submit': { fr: 'M’inscrire', en: 'Subscribe' },
  'letter.error': { fr: 'Saisissez une adresse e-mail valide.', en: 'Enter a valid email address.' },
  'letter.success': { fr: 'Merci. Votre intérêt est bien enregistré pour cette visite.', en: 'Thank you. Your interest has been noted for this visit.' },

  // Waitlist
  'waitlist.kicker': { fr: 'Prochaine étape · 04', en: 'Next step · 04' },
  'waitlist.title': { fr: 'Être parmi les premiers informés', en: 'Be among the first to know' },
  'waitlist.text': { fr: 'Une nouvelle étape se prépare. Rejoignez la liste d’attente pour être informé dès qu’elle prendra forme.', en: 'A new chapter is taking shape. Join the waiting list to hear about it as soon as it is ready.' },
  'waitlist.cta': { fr: 'Rejoindre la liste', en: 'Join the list' },
  
  // Footer
  'tagline': { fr: 'Accompagner au rythme du vivant', en: 'Guiding at the pace of the living world' },
  'home.title': { fr: 'Josselin Butté · RegenB France — Accompagner au rythme du vivant', en: 'Josselin Butté · RegenB France — Guiding at the pace of the living world' },
  'footer.rights': { fr: 'Tous droits réservés', en: 'All rights reserved' },
  'footer.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'footer.terms': { fr: 'Mentions légales', en: 'Terms' },


  // Contact Page
  'contact.title': { fr: 'Parlons de votre transition', en: 'Let’s talk about your transition' },
  'contact.subtitle': { fr: 'Je serai heureux d’échanger avec vous sur votre parcours et ce qui cherche à émerger.', en: 'I would be glad to discuss your journey and what is seeking to emerge.' },
  
  'contact.info.title': { fr: 'Échangeons', en: 'Let’s connect' },
  'contact.info.description': { fr: 'Une question sur mes accompagnements ? Vous pouvez m’écrire directement ou utiliser le formulaire.', en: 'A question about my work? You can email me directly or use the form.' },
  'contact.info.email': { fr: 'E-mail', en: 'Email' },
  'contact.info.location': { fr: 'Localisation', en: 'Location' },
  
  'contact.form.title': { fr: 'Écrivez-moi', en: 'Write to me' },
  'contact.form.name': { fr: 'Nom complet', en: 'Full Name' },
  'contact.form.name.placeholder': { fr: 'Votre nom', en: 'Your name' },
  'contact.form.email': { fr: 'Adresse e-mail', en: 'Email Address' },
  'contact.form.email.placeholder': { fr: 'votre@email.com', en: 'your@email.com' },
  'contact.form.subject': { fr: 'Sujet', en: 'Subject' },
  'contact.form.subject.placeholder': { fr: 'De quoi souhaitez-vous parler ?', en: 'What would you like to discuss?' },
  'contact.form.message': { fr: 'Message', en: 'Message' },
  'contact.form.message.placeholder': { fr: 'Décrivez votre demande...', en: 'Describe your request...' },
  'contact.form.submit': { fr: 'Envoyer le message', en: 'Send Message' },
  'contact.form.sending': { fr: 'Envoi en cours...', en: 'Sending...' },
  
  'contact.success.title': { fr: 'Message envoyé !', en: 'Message Sent!' },
  'contact.success.description': { fr: 'Merci pour votre message. Je vous répondrai dans les plus brefs délais.', en: 'Thank you for your message. I will get back to you as soon as possible.' },
  'contact.success.button': { fr: 'Envoyer un autre message', en: 'Send another message' },
  
  'contact.toast.title': { fr: 'Succès', en: 'Success' },
  'contact.toast.description': { fr: 'Votre message a été envoyé avec succès.', en: 'Your message has been sent successfully.' },

  // Compass Page (/boussole)
  'compass.kicker': { fr: 'Formation en ligne', en: 'Online course' },
  'compass.title': { fr: 'Nature Values Compass', en: 'Nature Values Compass' },
  'compass.lead1': { fr: 'J’ai créé Nature Values Compass comme un parcours en ligne pour revenir à l’essentiel : vos valeurs profondes, mises à l’épreuve du vivant.', en: 'I created Nature Values Compass as an online journey to return to what matters: your core values, tested against the living world.' },
  'compass.lead2': { fr: 'À votre rythme, vous explorez ce qui vous anime, ce qui vous freine, et ce qui demande à émerger dans votre manière d’accompagner.', en: 'At your own pace, you explore what moves you, what holds you back, and what is asking to emerge in how you accompany others.' },
  'compass.buy': { fr: 'Acheter la boussole', en: 'Get the compass' },
  'compass.why.kicker': { fr: 'Pourquoi cette boussole', en: 'Why this compass' },
  'compass.why.title': { fr: 'Retrouver son nord', en: 'Finding true north' },
  'compass.why.text1': { fr: 'Quand l’ancienne histoire ne tient plus, on cherche des réponses à l’extérieur. Cette boussole invite à l’inverse : revenir à ce qui vous anime déjà, et l’écouter sérieusement.', en: 'When the old story no longer holds, we tend to look for answers outside. This compass invites the opposite: returning to what already moves you, and listening to it seriously.' },
  'compass.why.text2': { fr: 'La nature y joue le rôle de miroir : elle ralentit, décentre et rend visible ce que le quotidien recouvre. Pas besoin d’aller au sommet d’une montagne — un parc, un jardin ou une fenêtre suffisent.', en: 'Nature acts as a mirror: it slows you down, decentres you and makes visible what daily life covers up. No need to climb a mountain — a park, a garden or a window are enough.' },
  'compass.steps.kicker': { fr: 'Ce que vous allez explorer', en: 'What you will explore' },
  'compass.steps.title': { fr: 'Six pas, une même direction', en: 'Six steps, one direction' },
  'compass.step1': { fr: 'Prendre contact avec la nature comme miroir', en: 'Meeting nature as a mirror' },
  'compass.step2': { fr: 'Identifier vos valeurs profondes', en: 'Identifying your core values' },
  'compass.step3': { fr: 'Reconnaître les histoires qui ne tiennent plus', en: 'Recognising the stories that no longer hold' },
  'compass.step4': { fr: 'Tester vos valeurs sur le terrain de votre pratique', en: 'Testing your values in your practice' },
  'compass.step5': { fr: 'Écrire l’histoire suivante', en: 'Writing the next story' },
  'compass.step6': { fr: 'Ancrer de nouveaux repères au quotidien', en: 'Anchoring new bearings in daily life' },
  'compass.how.kicker': { fr: 'Comment ça se déroule', en: 'How it works' },
  'compass.how.title': { fr: 'En ligne, à votre rythme', en: 'Online, at your own pace' },
  'compass.how.item1': { fr: 'Un parcours en ligne, accessible dès votre inscription', en: 'An online journey, available as soon as you enrol' },
  'compass.how.item2': { fr: 'Des exercices guidés, à faire chez vous et en pleine nature', en: 'Guided exercises, to do at home and outdoors' },
  'compass.how.item3': { fr: 'À votre rythme : quelques heures ou plusieurs semaines', en: 'At your own pace: a few hours or several weeks' },
  'compass.how.item4': { fr: 'Des outils que vous garderez pour la suite de votre pratique', en: 'Tools you will keep for the rest of your practice' },
  'compass.who.text': { fr: 'Elle s’adresse aux leaders, coachs, superviseurs et accompagnants qui sentent que leur manière d’accompagner demande un recentrage — et qui veulent l’ancrer dans quelque chose de vivant, pas de théorique.', en: 'It is for leaders, coaches, supervisors and practitioners who feel their way of accompanying needs re-grounding — and who want to anchor it in something alive, not theoretical.' },
  'compass.cta.title': { fr: 'Retrouvez votre nord', en: 'Find your north' },
  'compass.cta.text': { fr: 'Rejoignez Nature Values Compass et commencez dès aujourd’hui à clarifier ce qui vous guide.', en: 'Join Nature Values Compass and start clarifying today what guides you.' },

  // Legal Page (/legal)
  'legal.kicker': { fr: 'Informations', en: 'Information' },
  'legal.title': { fr: 'Informations légales', en: 'Legal information' },
  'legal.nav.mentions': { fr: 'Mentions légales', en: 'Legal notice' },
  'legal.nav.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'legal.nav.cgv': { fr: 'CGV', en: 'Terms of sale' },
  'legal.mentions.editor.title': { fr: 'Éditeur', en: 'Publisher' },
  'legal.mentions.editor.text': { fr: 'Ce site est édité par RegenB France, EURL au capital de 500 euros — 8 route de Barat, 31160 Arbas. SIREN 1026 298 47 (RCS Toulouse, NAF 9609Z). TVA : FR10102629847. Directeur de la publication : Josselin Butté. Contact : josselin@regenb.com.', en: 'This site is published by RegenB France, a private limited company (EURL) with capital of €500 — 8 route de Barat, 31160 Arbas, France. SIREN 1026 298 47 (RCS Toulouse, NAF 9609Z). VAT: FR10102629847. Editorial director: Josselin Butté. Contact: josselin@regenb.com.' },
  'legal.mentions.hosting.title': { fr: 'Hébergement', en: 'Hosting' },
  'legal.mentions.hosting.text': { fr: 'Ce site est hébergé par Lovable, Inc., 2261 Market Street, San Francisco, CA 94114, États-Unis. Le nom de domaine regenb.fr est géré via GoDaddy.', en: 'This site is hosted by Lovable, Inc., 2261 Market Street, San Francisco, CA 94114, USA. The regenb.fr domain name is managed via GoDaddy.' },
  'legal.privacy.data.title': { fr: 'Vos données', en: 'Your data' },
  'legal.privacy.data.text': { fr: 'Je collecte uniquement les données que vous me transmettez volontairement : votre adresse e-mail et, via le formulaire de contact, votre nom, votre e-mail et votre message. Elles servent uniquement à vous répondre et à vous envoyer les informations auxquelles vous avez consenti ; elles ne sont ni vendues ni partagées. Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et d’effacement : écrivez-moi à josselin@regenb.com.', en: 'I collect only the data you share voluntarily: your email address and, via the contact form, your name, email and message. It is used solely to reply to you and to send the information you have consented to; it is never sold or shared. Under GDPR, you have the right to access, rectify and erase your data: write to me at josselin@regenb.com.' },
  'legal.cgv.order.title': { fr: 'Commande et accès', en: 'Order and access' },
  'legal.cgv.order.text': { fr: 'Les présentes conditions régissent la vente de la formation en ligne Nature Values Compass. Après paiement, vous recevez un accès personnel et non transférable à la formation.', en: 'These terms govern the sale of the online course Nature Values Compass. After payment, you receive personal, non-transferable access to the course.' },
  'legal.cgv.withdrawal.title': { fr: 'Droit de rétractation', en: 'Right of withdrawal' },
  'legal.cgv.withdrawal.text': { fr: 'Vous disposez d’un délai de quatorze jours pour vous rétracter, sauf si vous avez commencé la formation avant la fin de ce délai. Écrivez-moi à josselin@regenb.com.', en: 'You have fourteen days to withdraw, unless you have started the course before the end of that period. Write to me at josselin@regenb.com.' },
  'legal.cgv.ip.title': { fr: 'Propriété intellectuelle', en: 'Intellectual property' },
  'legal.cgv.ip.text': { fr: 'L’ensemble des contenus du site et de la formation est protégé. Toute reproduction sans autorisation est interdite.', en: 'All content on the site and in the course is protected. Any reproduction without authorisation is prohibited.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'regenb-lang';

const getInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en') return saved;
  } catch { /* ignore */ }
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return nav.toLowerCase().startsWith('fr') ? 'fr' : 'en';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
