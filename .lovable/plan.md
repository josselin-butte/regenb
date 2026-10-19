# Boucle REGEN : roue compacte sur smartphone

## Constat
- Sous 768 px, la boucle (320 px max) s'affiche au-dessus de cinq rangées pleine largeur (lettre + titre). À partir de 768 px, les cinq boutons sont posés autour de la boucle : c'est la version tablette/ordinateur, inchangée.

## Proposition
Point de rupture smartphone uniquement : sous 768 px. Rien ne change à 768 px et plus (tablette et ordinateur).

1. Roue fluide : largeur min(100 %, 340 px), environ 280–340 px selon l'écran, avec une marge intérieure pour que les boutons ne débordent pas.
2. Les cinq boutons existants deviennent des pastilles rondes de 48 × 48 px posées sur le tracé (haut, droite, bas droite, bas gauche, gauche), lettre seule visible. Même liste, mêmes boutons : aucun doublon. Le nom accessible reste le titre complet (« E — Écouter et inclure le champ », etc.).
3. État choisi signalé autrement que par la couleur : pastille pleine + anneau épais extérieur ; le titre complet apparaît aussi dans le panneau.
4. « Votre situation » reste au centre, zone resserrée pour rester à l'écart des pastilles.
5. Sous la roue, consigne courte : FR « Touchez une lettre pour explorer un mouvement. » / EN « Tap a letter to explore a movement. » (smartphone seulement).
6. Panneau unique sous la roue : lettre + titre complet, question, phrase d'appui. Hauteur minimale stable, mais il s'agrandit si le texte est long ou zoomé. Toucher une lettre met seulement le panneau à jour : pas de défilement, pas de déplacement du focus, pas d'avance automatique.
7. Seul le trait doré bouge ; bouton pause/reprise conservé ; réduction des mouvements et pause explicite inchangées.

## Fichiers
- src/components/RegenLoop.tsx : titre du mouvement dans le panneau, consigne mobile.
- src/pages/Services.tsx : texte de la consigne FR/EN dans les textes REGEN.
- src/index.css : règles sous 768 px seulement.
- src/test/regen-loop.test.tsx : vérifier noms accessibles distincts des deux E.

## Vérifications prévues
FR et EN à 320, 375, 390, 430 px ; 768 et 1280 px pour régressions ; toucher les cinq lettres, clavier et focus visible, pause/reprise, réduction des mouvements, rotation portrait/paysage, absence de débordement. Aucune publication.
