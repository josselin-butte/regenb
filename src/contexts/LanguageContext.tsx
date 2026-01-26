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
  'nav.partners': { fr: 'Partenaires', en: 'Partners' },
  'nav.retreats': { fr: 'Retraites', en: 'Retreats' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  
  // Hero
  'hero.tagline': { 
    fr: 'Nous accompagnons tous les leaders, coachs, superviseurs et accompagnants à transformer leur manière d\'accompagner en s\'alignant au vivant.', 
    en: 'We support leaders, coaches, supervisors and practitioners in transforming how they accompany others by aligning with the living world.' 
  },
  'hero.cta': { fr: 'Découvrir nos services', en: 'Discover our services' },
  'hero.secondary': { fr: 'Prochaines retraites', en: 'Upcoming retreats' },
  'hero.values': { fr: 'Identifier mes valeurs', en: 'Identify my values' },
  
  // Services
  'services.title': { fr: 'Nos Services', en: 'Our Services' },
  'services.subtitle': { fr: 'Quatre chemins pour transformer votre pratique', en: 'Four paths to transform your practice' },
  'services.intro': { fr: 'Si vous sentez que l\'ancienne histoire ne tient plus, vous n\'êtes pas \'perdu\', vous êtes en transition. Tous les accompagnements vous aident à écrire l\'histoire suivante, pour la vivre à chaque instant.', en: 'If you feel the old story no longer holds, you are not \'lost\', you are in transition. All our support helps you write the next story, to live it in every moment.' },
  
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

  // Partners Section
  'partners.title': { fr: 'Nos Partenaires', en: 'Our Partners' },
  'partners.subtitle': { fr: 'Un réseau de professionnels engagés pour accompagner la transition vers le vivant', en: 'A network of engaged professionals supporting the transition to living systems' },
  'partners.visit': { fr: 'Visiter le site', en: 'Visit website' },
  'partners.seeAll': { fr: 'Voir tous nos partenaires', en: 'See all our partners' },
  
  // Partner Types
  'partners.type.network': { fr: 'Réseau', en: 'Network' },
  'partners.type.training': { fr: 'Formation', en: 'Training' },
  'partners.type.venue': { fr: 'Lieu d\'accueil', en: 'Venue' },
  'partners.type.certification': { fr: 'Certification', en: 'Certification' },
  'partners.type.association': { fr: 'Association', en: 'Association' },
  'partners.type.consulting': { fr: 'Conseil', en: 'Consulting' },
  
  // Partners Data
  'partners.regenb.name': { fr: 'RegenB Global', en: 'RegenB Global' },
  'partners.regenb.description': { fr: 'Notre réseau international de coachs et facilitateurs dédiés au leadership régénératif et à l\'accompagnement avec le vivant.', en: 'Our international network of coaches and facilitators dedicated to regenerative leadership and accompanying with the living.' },
  
  'partners.naturecoaching.name': { fr: 'Nature Coaching Academy', en: 'Nature Coaching Academy' },
  'partners.naturecoaching.description': { fr: 'Centre de formation spécialisé dans l\'intégration de la nature dans les pratiques d\'accompagnement professionnel.', en: 'Training center specialized in integrating nature into professional coaching practices.' },
  
  'partners.ecoretreats.name': { fr: 'Éco-Retraites', en: 'Eco-Retreats' },
  'partners.ecoretreats.description': { fr: 'Lieux d\'accueil en pleine nature sélectionnés pour leur engagement écologique et leur capacité à favoriser la reconnexion au vivant.', en: 'Nature venues selected for their ecological commitment and ability to foster reconnection with the living.' },
  
  'partners.leadership.name': { fr: 'Institut du Leadership Vivant', en: 'Living Leadership Institute' },
  'partners.leadership.description': { fr: 'Organisme de certification pour les approches de leadership inspirées par les systèmes vivants et la pensée régénérative.', en: 'Certification body for leadership approaches inspired by living systems and regenerative thinking.' },
  
  'partners.foresttherapy.name': { fr: 'Association Forest Therapy France', en: 'Forest Therapy France Association' },
  'partners.foresttherapy.description': { fr: 'Association promouvant les bienfaits thérapeutiques de l\'immersion en forêt et les pratiques de sylvothérapie.', en: 'Association promoting the therapeutic benefits of forest immersion and forest therapy practices.' },
  
  'partners.mindfulbusiness.name': { fr: 'Mindful Business Consulting', en: 'Mindful Business Consulting' },
  'partners.mindfulbusiness.description': { fr: 'Cabinet de conseil accompagnant les entreprises dans leur transition vers des modèles plus durables et régénératifs.', en: 'Consulting firm supporting businesses in their transition to more sustainable and regenerative models.' },
  
  // Partners Page
  'partners.page.title': { fr: 'Nos Partenaires', en: 'Our Partners' },
  'partners.page.subtitle': { fr: 'Découvrez les organisations et professionnels avec lesquels nous collaborons pour transformer l\'accompagnement et le leadership.', en: 'Discover the organizations and professionals we collaborate with to transform coaching and leadership.' },
  
  'partners.cta.title': { fr: 'Devenir partenaire', en: 'Become a partner' },
  'partners.cta.subtitle': { fr: 'Vous partagez notre vision d\'un accompagnement aligné au vivant ? Rejoignez notre réseau de partenaires.', en: 'Do you share our vision of coaching aligned with the living? Join our partner network.' },
  'partners.cta.button': { fr: 'Nous contacter', en: 'Contact us' },

  // Contact Page
  'contact.title': { fr: 'Contactez-nous', en: 'Contact Us' },
  'contact.subtitle': { fr: 'Nous serions ravis d\'échanger avec vous sur votre parcours de transformation.', en: 'We would love to discuss your transformation journey with you.' },
  
  'contact.info.title': { fr: 'Restons en contact', en: 'Let\'s Stay Connected' },
  'contact.info.description': { fr: 'Que vous ayez des questions sur nos services, nos retraites ou que vous souhaitiez simplement échanger, n\'hésitez pas à nous contacter.', en: 'Whether you have questions about our services, retreats, or simply want to connect, don\'t hesitate to reach out.' },
  'contact.info.email': { fr: 'E-mail', en: 'Email' },
  'contact.info.location': { fr: 'Localisation', en: 'Location' },
  
  'contact.form.title': { fr: 'Envoyez-nous un message', en: 'Send us a message' },
  'contact.form.name': { fr: 'Nom complet', en: 'Full Name' },
  'contact.form.name.placeholder': { fr: 'Votre nom', en: 'Your name' },
  'contact.form.email': { fr: 'Adresse e-mail', en: 'Email Address' },
  'contact.form.email.placeholder': { fr: 'votre@email.com', en: 'your@email.com' },
  'contact.form.subject': { fr: 'Sujet', en: 'Subject' },
  'contact.form.subject.placeholder': { fr: 'Comment pouvons-nous vous aider ?', en: 'How can we help you?' },
  'contact.form.message': { fr: 'Message', en: 'Message' },
  'contact.form.message.placeholder': { fr: 'Décrivez votre demande...', en: 'Describe your request...' },
  'contact.form.submit': { fr: 'Envoyer le message', en: 'Send Message' },
  'contact.form.sending': { fr: 'Envoi en cours...', en: 'Sending...' },
  
  'contact.success.title': { fr: 'Message envoyé !', en: 'Message Sent!' },
  'contact.success.description': { fr: 'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.', en: 'Thank you for your message. We will get back to you as soon as possible.' },
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
