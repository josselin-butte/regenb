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
  'nav.services': { fr: 'Mes accompagnements', en: 'My work' },
  'nav.about': { fr: 'Mon approche', en: 'My approach' },
  'nav.partners': { fr: 'Partenaires', en: 'Partners' },
  'nav.retreats': { fr: 'Retraites', en: 'Retreats' },
  'nav.contact': { fr: 'Contact', en: 'Contact' },
  
  // Hero
  'hero.tagline': { 
    fr: 'J’accompagne les leaders, coachs, superviseurs et accompagnants à transformer leur manière d’accompagner en s’alignant au vivant.', 
    en: 'I support leaders, coaches, supervisors and practitioners in transforming how they accompany others by aligning with the living world.' 
  },
  'hero.eyebrow': { fr: 'Josselin Butté · RegenB France', en: 'Josselin Butté · RegenB France' },
  'hero.title': { fr: 'L’ère du vivant', en: 'The age of living systems' },
  'hero.cta': { fr: 'Découvrir mes accompagnements', en: 'Discover my work' },
  'hero.secondary': { fr: 'Prochaines retraites', en: 'Upcoming retreats' },
  'hero.values': { fr: 'Identifier mes valeurs', en: 'Identify my values' },
  
  // Services
  'services.title': { fr: 'Mes accompagnements', en: 'My work' },
  'services.subtitle': { fr: 'Quatre chemins pour transformer votre pratique', en: 'Four paths to transform your practice' },
  'services.intro': { fr: 'Si vous sentez que l’ancienne histoire ne tient plus, vous n’êtes pas « perdu », vous êtes en transition. Je vous aide à écrire l’histoire suivante, pour la vivre à chaque instant.', en: 'If you feel the old story no longer holds, you are not “lost”; you are in transition. I help you write the next story, so you can live it in every moment.' },
  
  'services.leadership.title': { fr: 'Leadership avec le Vivant', en: 'Leadership with the Living' },
  'services.leadership.desc': { fr: 'Je vous aide à développer un leadership régénératif inspiré par les systèmes vivants et les écosystèmes naturels.', en: 'I help you develop regenerative leadership inspired by living systems and natural ecosystems.' },
  
  'services.reflective.title': { fr: 'Pratique Réflexive Intégrative', en: 'Integrative Reflective Practice' },
  'services.reflective.desc': { fr: 'Je crée des espaces de réflexion et de supervision pour approfondir votre pratique d’accompagnement.', en: 'I create spaces for reflection and supervision to deepen your practice.' },
  
  'services.nature.title': { fr: 'Accompagner avec la Nature', en: 'Accompanying with Nature' },
  'services.nature.desc': { fr: 'Je propose des formations en ligne pour intégrer la nature comme partenaire dans vos accompagnements.', en: 'I offer online courses to integrate nature as a partner in your practice.' },
  
  'services.retreats.title': { fr: 'Retraites & Weekends', en: 'Retreats & Weekends' },
  'services.retreats.desc': { fr: 'Je vous accueille en pleine nature pour vous ressourcer et transformer votre relation au vivant.', en: 'I welcome you into nature to restore and transform your relationship with the living world.' },
  
  'services.learn': { fr: 'En savoir plus', en: 'Learn more' },
  
  // About
  'about.kicker': { fr: 'Mon approche · 01', en: 'My approach · 01' },
  'about.title': { fr: 'Accompagner depuis le vivant', en: 'Accompanying from the living world' },
  'about.text1': { fr: 'Je m’appelle Josselin Butté. Avec RegenB France, j’explore une conviction simple : les réponses aux défis du leadership contemporain émergent lorsque chacun renoue avec le vivant.', en: 'I am Josselin Butté. Through RegenB France, I explore a simple conviction: answers to contemporary leadership challenges emerge when each person reconnects with the living world.' },
  'about.text2': { fr: 'Mon approche intégrative relie les sagesses ancestrales, les sciences du vivant et les pratiques contemporaines d’accompagnement. Je crée des espaces où chacun peut écouter, expérimenter et transformer sa manière d’agir.', en: 'My integrative approach connects ancestral wisdom, life sciences and contemporary practices. I create spaces where each person can listen, experiment and transform how they act.' },
  'about.visit': { fr: 'Visiter RegenB.com', en: 'Visit RegenB.com' },
  
  // CTA
  'cta.title': { fr: 'Et si la suite s’écrivait dehors ?', en: 'What if the next chapter began outdoors?' },
  'cta.subtitle': { fr: 'Je vous invite à vivre ma prochaine retraite en pleine nature.', en: 'I invite you to experience my next retreat in the heart of nature.' },
  'cta.button': { fr: 'Réserver ma place', en: 'Book my spot' },
  
  // Footer
  'footer.tagline': { fr: 'S\'aligner au vivant pour mieux accompagner', en: 'Aligning with the living to better accompany' },
  'footer.rights': { fr: 'Tous droits réservés', en: 'All rights reserved' },
  'footer.privacy': { fr: 'Confidentialité', en: 'Privacy' },
  'footer.terms': { fr: 'Mentions légales', en: 'Terms' },

  // Partners Section
  'partners.title': { fr: 'Mon écosystème', en: 'My ecosystem' },
  'partners.subtitle': { fr: 'Je collabore avec des professionnels et des lieux engagés dans la transition vers le vivant.', en: 'I collaborate with professionals and places committed to the transition toward living systems.' },
  'partners.visit': { fr: 'Visiter le site', en: 'Visit website' },
  'partners.seeAll': { fr: 'Découvrir tous mes partenaires', en: 'Discover all my partners' },
  
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
  'partners.regenb.description': { fr: 'Le réseau international auquel je contribue, réunissant des coachs et facilitateurs dédiés au leadership régénératif.', en: 'The international network I contribute to, bringing together coaches and facilitators dedicated to regenerative leadership.' },
  
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
  'partners.page.title': { fr: 'Mon écosystème de partenaires', en: 'My partner ecosystem' },
  'partners.page.subtitle': { fr: 'Découvrez les personnes, organisations et lieux avec lesquels je collabore pour transformer l’accompagnement et le leadership.', en: 'Discover the people, organizations and places I collaborate with to transform coaching and leadership.' },
  
  'partners.cta.title': { fr: 'Devenir partenaire', en: 'Become a partner' },
  'partners.cta.subtitle': { fr: 'Vous partagez ma vision d’un accompagnement aligné au vivant ? Échangeons sur une collaboration.', en: 'Do you share my vision of practice aligned with the living world? Let’s discuss a collaboration.' },
  'partners.cta.button': { fr: 'Me contacter', en: 'Contact me' },

  // Contact Page
  'contact.title': { fr: 'Parlons de votre transition', en: 'Let’s talk about your transition' },
  'contact.subtitle': { fr: 'Je serai heureux d’échanger avec vous sur votre parcours et ce qui cherche à émerger.', en: 'I would be glad to discuss your journey and what is seeking to emerge.' },
  
  'contact.info.title': { fr: 'Échangeons', en: 'Let’s connect' },
  'contact.info.description': { fr: 'Une question sur mes accompagnements ou mes retraites ? Vous pouvez m’écrire directement ou utiliser le formulaire.', en: 'A question about my work or retreats? You can email me directly or use the form.' },
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
