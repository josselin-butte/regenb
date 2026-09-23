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
  'nav.about': { fr: 'Mon approche', en: 'My approach' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  
  // Hero
  'hero.tagline': { 
    fr: 'J’accompagne les leaders, coachs, superviseurs et accompagnants à transformer leur manière d’accompagner en s’alignant au vivant.', 
    en: 'I support leaders, coaches, supervisors and practitioners in transforming how they accompany others by aligning with the living world.' 
  },
  'hero.eyebrow': { fr: 'Josselin Butté · RegenB France', en: 'Josselin Butté · RegenB France' },
  'hero.title': { fr: 'L’ère du vivant', en: 'The age of living systems' },
  'hero.cta': { fr: 'Échanger avec moi', en: 'Start a conversation' },
  'hero.values': { fr: 'Identifier mes valeurs', en: 'Identify my values' },
  
  // About
  'about.kicker': { fr: 'Mon approche · 01', en: 'My approach · 01' },
  'about.title': { fr: 'Accompagner depuis le vivant', en: 'Accompanying from the living world' },
  'about.text1': { fr: 'Je m’appelle Josselin Butté. Avec RegenB France, j’explore une conviction simple : les réponses aux défis du leadership contemporain émergent lorsque chacun renoue avec le vivant.', en: 'I am Josselin Butté. Through RegenB France, I explore a simple conviction: answers to contemporary leadership challenges emerge when each person reconnects with the living world.' },
  'about.text2': { fr: 'Mon approche intégrative relie les sagesses ancestrales, les sciences du vivant et les pratiques contemporaines d’accompagnement. Je crée des espaces où chacun peut écouter, expérimenter et transformer sa manière d’agir.', en: 'My integrative approach connects ancestral wisdom, life sciences and contemporary practices. I create spaces where each person can listen, experiment and transform how they act.' },
  'about.visit': { fr: 'Visiter RegenB.com', en: 'Visit RegenB.com' },
  
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
