# Améliorer la Boucle REGEN existante

## Emplacement confirmé
Le bloc `#regen-loop` existe dans `src/pages/Services.tsx`, juste après la description du Coaching et avant ses détails pratiques, sur `/accompagnement` et `/en/services`. L’améliorer à cet endroit, sans doublon. Conserver son ancre, son titre accessible et l’arrivée sous l’en-tête. Le lien discret depuis l’accueil existe déjà et restera inchangé.

## Ce qui sera réalisé après approbation
- Remplacer uniquement les textes du bloc REGEN par les textes FR/EN exacts des consignes, y compris les phrases de soutien, le centre, le statut et la mise en contexte.
- Reprendre du HTML fourni la boucle organique, les cinq points sélectionnables et le panneau de question stable. Ne pas importer sa page, son logo, ses polices, ses couleurs brutes, ses sélecteurs ni son canvas : tracé décoratif en SVG, textes et boutons en HTML.
- Permettre de choisir librement chaque mouvement par clic, toucher, Entrée ou Espace. Annoncer la sélection sans déplacer le focus. Aucun ordre obligatoire, flèche, progression ni changement automatique du texte.
- Sur téléphone et dans les espaces étroits, afficher une boucle compacte, puis les cinq boutons pleine largeur. Réserver une hauteur suffisante au panneau pour éviter les sauts entre questions.
- Ajouter le contrôle « Mettre en pause / Pause movement », puis « Animer la boucle / Animate the loop ». Seul un petit trait doré pourra circuler en environ 22 secondes ; tous les textes resteront fixes.
- Respecter immédiatement les changements de préférence de mouvement réduit, conserver la pause explicite pendant la visite sans nouveau stockage, suspendre hors écran et lorsque l’onglet est masqué. Ne pas animer si un autre élément mobile du site est visible ; ne pas modifier les animations existantes.
- Garder les cinq mouvements et questions disponibles en présentation statique pour l’impression et lorsque l’interaction ne s’initialise pas après le chargement de l’application.

## Fichiers prévus et détails techniques
- **`src/components/RegenLoop.tsx` (nouveau)** : composant isolé recevant les textes localisés ; sélection, contrôles accessibles et gestion locale du mouvement.
- **`src/pages/Services.tsx`** : enrichir uniquement `content.fr.regen` et `content.en.regen`, puis remplacer le rendu actuel par ce composant au même emplacement.
- **`src/index.css`** : styles et animation strictement limités à la boucle, avec les tokens actuels ; aucune nouvelle palette ni règle globale.
- **`src/test/regen-loop.test.tsx` (nouveau)** : tests ciblés de sélection libre, absence de sélection automatique, durée de circuit et conditions d’arrêt/reprise, avec simulations contrôlées des préférences et de la visibilité.
- **`AGENTS.md`** : préciser la règle de maintien du composant dans le Coaching et de gestion locale du mouvement.
- **`roadmap.md`** : suivre uniquement cette amélioration bornée jusqu’à sa vérification.

Réutiliser le `Button` existant, qui produit des boutons natifs, les tokens crème/forêt/sauge/ocre, Work Sans et Inter auto-hébergés. Garder la localisation actuelle `content[language]` et la langue dérivée de l’URL. Aucune dépendance supplémentaire.

## Limite à traiter explicitement
Le site actuel est rendu par JavaScript dans une racine HTML vide. Sans JavaScript du tout, il ne peut afficher ni les services ni la boucle. Une véritable version statique sans JavaScript demanderait un rendu préalable ou un ajout HTML bilingue hors de cette racine, donc une extension du périmètre.

Ce plan **n’inclut pas** cette extension : le repli proposé couvre une application chargée mais une interaction indisponible, pas un navigateur dont JavaScript est entièrement désactivé. L’exigence stricte sans JavaScript reste bloquée et nécessitera une autorisation séparée ; elle ne sera pas annoncée comme satisfaite.

## Inchangé
Routes, navigation, accueil et son lien REGEN, autres descriptions, publics, formats, tarifs, dates, contact et formulaires, paiement, formation/CRM, consentement, intégrations, métadonnées et thème. Pas de soumission réelle, d’écriture de données ni de publication.

## Vérifications proposées
- Tests ciblés : sélection dans un ordre libre, animation sans changement de sélection, circuit de 22 secondes, pause explicite, préférence réduite initiale et modifiée en cours de visite, sortie d’écran, onglet masqué et nettoyage des observateurs.
- Contrôle navigateur sur les deux langues à 375 px et 1280 px : cinq choix, texte intégral, panneau stable, aucune superposition ni débordement, cibles d’au moins 44 px, clavier et focus visible.
- Arrivée directe sur les deux URLs avec `#regen-loop` et clic depuis les deux accueils ; une seule ancre et un seul bloc.
- Mesure du contraste des textes, contrôles et focus réellement affichés, vérification des couleurs et polices conservées.
- Vérification des erreurs du site et absence de nouvelles requêtes tierces. Aucun test de formulaire, achat, email ou système protégé.

Attendre votre approbation avant toute modification du site.