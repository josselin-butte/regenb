# Ajouter un enregistrement à une note

## Prérequis

La création du bucket public `carnet-audio` a été refusée par la règle de confidentialité de l’espace de travail. Un propriétaire ou administrateur doit autoriser les buckets publics dans **Workspace settings → Privacy & Security** (la rubrique peut être sous **Security**). Le bucket n’a donc pas encore été créé. Une fois cette autorisation donnée, créer `carnet-audio` dans **Cloud → Storage**, en mode **Public**, ou demander une seule fois sa création ici.

Les fichiers sont publics : n’y envoyer que les enregistrements destinés aux visiteurs, jamais de données confidentielles. Aucun droit d’écriture anonyme ou depuis le site n’est nécessaire : gérer les fichiers depuis Cloud avec les droits du projet.

## Pour chaque MP3

1. Dans ce projet, ouvrir **Cloud → Storage → carnet-audio**.
2. Envoyer le MP3 avec **Upload** ou par glisser-déposer. Choisir un nom distinct par langue, par exemple `le-feu-et-la-conversation-fr-v1.mp3` et `fire-and-conversation-en-v1.mp3`. Utiliser des noms sans espaces ni accents.
3. Ouvrir le fichier ou son menu et copier son URL publique si cette action est proposée. Vérifier cette URL dans une fenêtre privée : elle doit lire ou télécharger le MP3 sans connexion. La documentation Lovable confirme l’accès public par URL mais ne documente pas précisément le libellé de l’action de copie dans l’interface actuelle.
4. Ouvrir le **Code Editor** de Lovable. La modification directe nécessite un abonnement payant ; un dépôt GitHub connecté permet également de modifier ces fichiers hors de Lovable.
5. Ouvrir le fichier de la note dans `src/content/carnet/`. Pour le feu : `le-feu-et-la-conversation.md` en français, `fire-and-conversation.md` en anglais.
6. Ajouter les lignes correspondantes dans le bloc situé entre les deux lignes `---` au début du fichier. Remplacer le texte d’exemple par l’URL publique complète et la durée réelle :

   Français :
   ```yaml
   audio_url_fr: "COLLER_L_URL_PUBLIQUE_DU_MP3_FR"
   audio_duration_fr: 12.5
   ```

   Anglais :
   ```yaml
   audio_url_en: "COLLER_L_URL_PUBLIQUE_DU_MP3_EN"
   audio_duration_en: 11
   ```

   Les durées sont en minutes : `12.5` signifie 12 minutes 30 secondes. Utiliser un point, pas une virgule. L’URL doit commencer par `https://`. Les quatre champs peuvent aussi être réunis dans un seul des deux fichiers : les versions liées les partagent, mais n’affichent que l’enregistrement de la langue courante. Fournir la durée pour avoir le label complet et la durée dans les données pour les moteurs de recherche.
7. Mettre à jour `updated: "YYYY-MM-DD"` dans chaque version concernée pour refléter cette modification réelle.
8. Enregistrer. Vérifier la note dans la prévisualisation : label, durée, lecture, langue et tag **Audio** sur l’index. Une langue sans URL reste sans lecteur ni badge.
9. Publier les modifications du site. L’envoi du MP3 seul n’ajoute pas le lecteur : le fichier de la note doit aussi être enregistré et publié.

Pour remplacer un enregistrement, préférer un nouveau nom (`v2`) et modifier l’URL pour éviter un ancien fichier en cache. Pour retirer l’audio, supprimer ses deux champs URL/durée. Le texte de la note n’a pas besoin de changer.

## Vérifications effectuées

- 14 tests automatisés : lecture des champs, isolation FR/EN, durée ISO 8601, Article avec/sans AudioObject, URLs sécurisées et CSP limitée au bucket.
- Lecteur natif vérifié avec un MP3 temporaire intercepté uniquement dans le navigateur de test : aucune requête audio avant lecture, lecture effective après lancement, badge et données Article présents.
- Les notes existantes n’ont reçu aucun fichier audio ni modification de contenu.
- L’hébergement réel et l’envoi autonome restent à vérifier après autorisation puis création du bucket public.