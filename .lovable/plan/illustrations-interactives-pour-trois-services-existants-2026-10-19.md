# Illustrations interactives pour trois services existants

## Ce que l'inspection a confirmé
- Les trois services sont des sections de la page Accompagnement : `/accompagnement` (FR) et `/en/services` (EN). Une seule page, rendue en boucle à partir de `content.fr.services` / `content.en.services` dans `src/pages/Services.tsx`. Ordre : Facilitation (0), Conception de programmes (1), Coaching (2, avec la Boucle REGEN), Supervision (3, ancre `#supervision`), Médiation (4).
- Aucune ancre n'existe pour Facilitation, Conception ou Médiation.
- Traduction : objets `content[language]` dans Services.tsx, langue dérivée de l'URL. Aucun autre système.
- Design : tokens crème / forêt / sauge / ocre dans `src/index.css`, Work Sans + Inter auto-hébergés, coins carrés, sans ombres. Bouton `heroOutline` existant.
- Mouvement : la Boucle REGEN gère seule son animation (cède à toute autre animation visible, pause hors écran, reduced-motion). Les ElementIcon et les collines ont leurs propres animations CSS.
- CTA de la page : un seul bouton « Prendre 30 minutes » (mailto josselin@regenb.com) et le formulaire en bas de page. Aucun CTA par service. Je n'en ajoute aucun.
- Référence de comparaison : le site publié sur www.regenb.fr ne contient pas encore la Boucle REGEN (non publiée). Référence proposée : l'état actuel de l'aperçu (boucle validée), capturé avant toute modification, en FR/EN à 1280 et 375 px.
- Non inspecté : aucune donnée ni réglage du backend (non concerné).

## Principe commun aux trois illustrations
- Un nouveau composant isolé par service, placé dans sa section existante, après la description et avant « Format / Tarif ». Même emplacement que la Boucle REGEN dans le Coaching.
- Illustration SVG décorative (`aria-hidden`), textes réels en HTML. Quelques points sélectionnables (boutons) qui changent un court texte dans un panneau à hauteur fixe. Aucun texte qui défile tout seul.
- Textes FR/EN ajoutés dans `content.fr` / `content.en` de Services.tsx. Je proposerai les textes exacts à votre validation avant de les enregistrer, car ils n'existent pas encore.
- Aucun nouveau nom de méthode, aucune promesse de résultat.
- Mouvement : statique par défaut. Un seul mouvement lent et discret, seulement quand l'illustration est visible, l'onglet affiché, reduced-motion désactivé, et aucune autre animation visible (dont la Boucle REGEN). Bouton pause/reprise comme la boucle. Avec reduced-motion : aucun mouvement.
- Styles préfixés et limités à chaque composant dans `src/index.css`.

## Phase 1 (seule à approuver maintenant) : Facilitation
Fichiers :
- nouveau `src/components/FacilitationIllustration.tsx`
- `src/pages/Services.tsx` : textes FR/EN `facilitationVisual` + une ligne de rendu pour `i === 0`
- `src/index.css` : styles `.facil-*`
- nouveau `src/test/facilitation-illustration.test.tsx`
- `AGENTS.md`, `roadmap.md`

Composition :
```text
 voix A ─┐                ┌─ choix explicite ── prochain pas
 voix B ─┼─ possibilités ─┤
 voix C ─┘   (plusieurs)  └─ (les autres options restent visibles, en pointillé)
```
- Ordinateur : schéma horizontal (gauche → droite), largeur de la colonne de texte existante (680 px max). Trois points de départ distincts restent séparés jusqu'au bout ; ils ne fusionnent pas en un seul trait.
- Téléphone (375 px) : même schéma vertical (haut → bas), cibles de 44 px minimum, panneau en dessous.
- Points sélectionnables : Perspectives, Possibilités, Choix, Prochain pas. Le panneau affiche une phrase pour chacun.
- Mouvement : un léger tracé ocre parcourt lentement les chemins, sans marquer de progression ni d'ordre imposé.

Réutilisé sans modification : `Button`, tokens, polices, `content[language]`. La Boucle REGEN, `RegenLoop.tsx` et ses styles ne sont pas touchés.

Vérification :
- Captures avant/après en FR/EN à 1280 et 375 px ; comparaison de la Boucle REGEN et des autres sections (identiques).
- Clavier, focus visible, pause/reprise, reduced-motion, arrêt hors écran, cession à la Boucle REGEN quand elle est visible, aucun saut de mise en page.
- Tests du nouveau composant + tests REGEN existants.
- Aucune publication.

## Phases suivantes (approbation séparée)
- Phase 2, Conception de programmes : deux brins entrelacés (« Expériences d'apprentissage » / « Pratique réelle ») avec points de retour sélectionnables. Horizontal sur ordinateur, vertical sur téléphone. Même structure de fichiers (`ProgrammeIllustration.tsx`).
- Phase 3, Médiation : deux ou trois cercles autonomes autour d'un espace de dialogue partagé, qui ne se fondent jamais en un seul. Le mouvement reste à l'intérieur de chaque cercle. Même structure (`MediationIllustration.tsx`).

## Points à confirmer
- Les phrases du panneau Facilitation (FR/EN) : je les proposerai avant de les enregistrer, ou vous pouvez les fournir.
- Aucun CTA par service ne sera ajouté sans destination validée.
