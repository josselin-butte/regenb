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
  'nav.services': { fr: 'Nos Services', en: 'Our Services' },
  'nav.about': { fr: 'À Propos', en: 'About' },
  'nav.retreats': { fr: 'Retraites', en: 'Retreats' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  
  // Hero
  'hero.tagline': { 
    fr: 'Nous accompagnons tous les leaders, coachs, superviseurs et accompagnants à transformer leur manière d\'accompagner en s\'alignant au vivant.', 
    en: 'We support leaders, coaches, supervisors and practitioners in transforming how they accompany others by aligning with the living world.' 
  },
  'hero.cta': { fr: 'Découvrir nos services', en: 'Discover our services' },
  'hero.secondary': { fr: 'Prochaines retraites', en: 'Upcoming retreats' },
  
  // Services
  'services.title': { fr: 'Nos Services', en: 'Our Services' },
  'services.subtitle': { fr: 'Quatre chemins pour transformer votre pratique', en: 'Four paths to transform your practice' },
  
  'services.leadership.title': { fr: 'Leadership avec le Vivant', en: 'Leadership with the Living' },
  'services.leadership.desc': { fr: 'Développez un leadership régénératif inspiré par les systèmes vivants et les écosystèmes naturels.', en: 'Develop regenerative leadership inspired by living systems and natural ecosystems.' },
  
  'services.reflective.title': { fr: 'Pratique Réflexive Intégrative', en: 'Integrative Reflective Practice' },
  'services.reflective.desc': { fr: 'Approfondissez votre pratique d\'accompagnement grâce à des espaces de réflexion et de supervision enrichis.', en: 'Deepen your coaching practice through enriched spaces for reflection and supervision.' },
  
  'services.nature.title': { fr: 'Accompagner avec la Nature', en: 'Accompanying with Nature' },
  'services.nature.desc': { fr: 'Formations en ligne pour intégrer la nature comme partenaire dans vos accompagnements.', en: 'Online courses to integrate nature as a partner in your practice.' },
  
  'services.retreats.title': { fr: 'Retraites & Weekends', en: 'Retreats & Weekends' },
  'services.retreats.desc': { fr: 'Immersions en pleine nature pour ressourcer et transformer votre relation au vivant.', en: 'Nature immersions to restore and transform your relationship with the living world.' },
  
  'services.learn': { fr: 'En savoir plus', en: 'Learn more' },
  
  // About
  'about.title': { fr: 'Notre Philosophie', en: 'Our Philosophy' },
  'about.text1': { fr: 'Chez RegenB France, nous croyons que les réponses aux défis du leadership moderne se trouvent dans notre reconnexion au vivant.', en: 'At RegenB France, we believe the answers to modern leadership challenges lie in our reconnection with the living world.' },
  'about.text2': { fr: 'Notre approche intégrative combine les sagesses ancestrales, les sciences du vivant et les pratiques contemporaines d\'accompagnement.', en: 'Our integrative approach combines ancestral wisdom, life sciences and contemporary coaching practices.' },
  'about.visit': { fr: 'Visiter RegenB.com', en: 'Visit RegenB.com' },
  
  // CTA
  'cta.title': { fr: 'Prêt à transformer votre pratique ?', en: 'Ready to transform your practice?' },
  'cta.subtitle': { fr: 'Rejoignez notre prochaine retraite en pleine nature', en: 'Join our next nature retreat' },
  'cta.button': { fr: 'Réserver ma place', en: 'Book my spot' },
  
  // Footer
  'footer.tagline': { fr: 'S\'aligner au vivant pour mieux accompagner', en: 'Aligning with the living to better accompany' },
  'footer.rights': { fr: 'Tous droits réservés', en: 'All rights reserved' },
  'footer.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'footer.terms': { fr: 'Mentions légales', en: 'Terms' },
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
