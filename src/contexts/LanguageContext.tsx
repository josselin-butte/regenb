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
  'partners.type.therapy': { fr: 'Thérapie', en: 'Therapy' },
  'partners.type.nature': { fr: 'Nature', en: 'Nature' },
  'partners.type.leadership': { fr: 'Leadership', en: 'Leadership' },
  'partners.type.permaculture': { fr: 'Permaculture', en: 'Permaculture' },
  'partners.type.hospitality': { fr: 'Accueil en nature', en: 'Nature retreat' },
  'partners.type.transformation': { fr: 'Transformation', en: 'Transformation' },
  
  // Partners Data
  'partners.celine.name': { fr: 'Céline Butté', en: 'Céline Butté' },
  'partners.celine.description': { fr: 'Psychothérapeute spécialisée en danse-mouvement thérapie, accompagnant l\'expression corporelle et émotionnelle à travers le mouvement.', en: 'Dance movement psychotherapist, supporting bodily and emotional expression through movement.' },
  
  'partners.xmnaturae.name': { fr: 'Eric Prido - XM Naturae', en: 'Eric Prido - XM Naturae' },
  'partners.xmnaturae.description': { fr: 'Accompagnement et formation aux pratiques de connexion avec la nature pour le développement personnel et professionnel.', en: 'Coaching and training in nature connection practices for personal and professional development.' },
  
  'partners.impact.name': { fr: 'Impact International', en: 'Impact International' },
  'partners.impact.description': { fr: 'Cabinet de conseil international spécialisé dans le développement du leadership et la transformation organisationnelle.', en: 'International consulting firm specializing in leadership development and organizational transformation.' },
  
  'partners.regenb.name': { fr: 'RegenB', en: 'RegenB' },
  'partners.regenb.description': { fr: 'Notre réseau international de coachs et facilitateurs dédiés au leadership régénératif et à l\'accompagnement avec le vivant.', en: 'Our international network of coaches and facilitators dedicated to regenerative leadership and accompanying with the living.' },
  
  'partners.alveoles.name': { fr: 'L\'Atelier des Alvéoles', en: 'L\'Atelier des Alvéoles' },
  'partners.alveoles.description': { fr: 'Centre de formation en permaculture proposant des formations pour concevoir des systèmes durables et régénératifs.', en: 'Permaculture training center offering courses to design sustainable and regenerative systems.' },

  'partners.oulan.name': { fr: 'La Ferme d’Oulan Bât', en: 'La Ferme d’Oulan Bât' },
  'partners.oulan.description': { fr: 'Élevage d’ânes des Pyrénées, camping en yourtes et randonnées avec âne de bât, dans un lieu paisible au cœur de la nature.', en: 'Pyrenean donkey breeding, yurt camping and pack donkey trekking in a peaceful farm setting surrounded by nature.' },

  'partners.earthconverse.name': { fr: 'Earth Converse', en: 'Earth Converse' },
  'partners.earthconverse.description': { fr: 'Un collectif qui accompagne les leaders autour de l’autorité intérieure, du leadership relationnel et de l’impact régénératif par le coaching et les pratiques en nature.', en: 'A collaborative supporting leaders through inner authority, relational leadership and regenerative impact with coaching and nature-based practice.' },

  'partners.ecodomaine.name': { fr: 'Éco-Domaine La Fontaine', en: 'Éco-Domaine La Fontaine' },
  'partners.ecodomaine.description': { fr: 'Un éco-domaine à Pornic dédié au tourisme régénératif, réunissant hôtel, restaurant locavore, spa et ferme en permaculture.', en: 'A regenerative tourism destination in Pornic bringing together a hotel, locavore restaurant, sensory spa and permaculture farm.' },

  'partners.inovon.name': { fr: 'inov-On Expérience', en: 'inov-On Experience' },
  'partners.inovon.description': { fr: 'Une équipe qui accompagne les organisations dans leur transformation managériale vers l’intelligence collective et l’autonomie.', en: 'A team supporting organizations in their managerial transformation towards collective intelligence and autonomy.' },
  
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
