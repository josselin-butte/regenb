import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  'hero.cta': { fr: 'Découvrir ma boussole', en: 'Discover my compass' },
  
  // About
  'about.kicker': { fr: 'Qui je suis · 01', en: 'About me · 01' },
  'about.title': { fr: 'Josselin Butté', en: 'Josselin Butté' },
  'about.text1': { fr: 'Je m’appelle Josselin Butté. Avec RegenB France, j’explore une conviction simple : les réponses aux défis du leadership contemporain émergent lorsque chacun renoue avec le vivant.', en: 'I am Josselin Butté. Through RegenB France, I explore a simple conviction: answers to contemporary leadership challenges emerge when each person reconnects with the living world.' },
  'about.text2': { fr: 'Mon approche intégrative relie les sagesses ancestrales, les sciences du vivant et les pratiques contemporaines d’accompagnement. Je crée des espaces où chacun peut écouter, expérimenter et transformer sa manière d’agir.', en: 'My integrative approach connects ancestral wisdom, life sciences and contemporary practices. I create spaces where each person can listen, experiment and transform how they act.' },
  'about.visit': { fr: 'Visiter RegenB.com', en: 'Visit RegenB.com' },

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
  'footer.tagline': { fr: 'S\'aligner au vivant pour mieux accompagner', en: 'Aligning with the living to better accompany' },
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
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr');

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
