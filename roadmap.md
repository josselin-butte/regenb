# Refonte Josselin Butté

- [x] Prompt 3 : douze contrôles navigateur (quatre pages × 360/768/1280 px), sélecteur dans les deux sens, 24 recherches musicales/langue, 10 liens livres/langue, tous les filtres au clavier et au toucher, notes liées réellement ouvertes, métadonnées rendues/JSON-LD/sitemap et six contrôles des cartes Carnet. Aucun défaut confirmé, aucune correction de page ; 25 tests passent, compilation OK. Premier chargement sans choix : zéro cookie et zéro ressource externe ; après refus : seul regenb_consent. Consentement/Pixel existants conservés, donc pas de promesse d’absence de suivi après accord publicitaire. Destinations des catalogues tiers, validateur SEO externe et lecteur d’écran non testés ; seuls ce suivi et des scripts temporaires de contrôle ont changé. Rien publié.

- [x] Écoutes/Bibliothèque FR/EN : deux données typées identiques aux JSON fournis, deux pages et présentation locale, liens/configuration/JSON-LD centralisés, quatre routes et cartes d’accès, filtres et sitemap (32 URLs). Consentement global conservé après clarification ; aucun style global, note, formulaire ou menu modifié. 38 tests passent ; navigateur 1280/390px : quatre pages, filtres, ancres, sélecteur de langue et accès depuis Carnet vérifiés, aucun débordement ni incident, aucune ressource externe avant choix. Compilation OK. Liens des services externes non visités et lecteur d’écran non testé ; rien publié.

- [x] Bande compacte uniquement avant Footer sur Services et Carnet FR/EN, départ Follett/Margulis et cycle 9 secondes. VoicesBand.tsx : variante réutilisant le même minuteur et les mêmes pauses, sans points ni sources ; Services.tsx/Carnet.tsx : une insertion chacun ; index.css : styles limités à la variante ; voices-band.test.tsx : quatre tests ajoutés (départs, 9 secondes, pause/reprise, mouvement réduit) ; AGENTS.md/mémoire : règles. 18 tests passent (14 bande + 4 routes), compilation OK. Navigateur sur quatre routes à 1280/375px : emplacement unique avant footer, départ, hors écran, rotation, pause/reprise, douze citations sans débordement ni changement de hauteur ; mouvement réduit sur quatre routes ; accueil conserve ses points, aucune variante compacte sur Boussole. Aucun incident navigateur. 64px ordinateur ; 96px et retour à la ligne sur mobile pour préserver la lecture des citations intégrales avec le nom. Lecteur d'écran et audit exhaustif non vérifiés ; aucun formulaire envoyé ; rien publié.

- [x] Accueil : bande bilingue de douze voix après HeroSection ; fichiers : Index.tsx (insertion), VoicesBand.tsx (rotation/pauses/dialogue/balayage), voices.ts (textes exacts), index.css (styles isolés), voices-band.test.tsx (10 tests), AGENTS.md et mémoire (règles). Tests 10/10 ; navigateur FR/EN 1280/375px : douze voix, rotation, pause/reprise, hauteur stable, sources et Échap ; mouvement réduit et sélection manuelle vérifiés ; aucun nouvel incident. 180px ordinateur / 208px mobile pour préserver les longues citations. Points mobiles de 20×44px avec espacement, compromis pour douze choix. Débordement anglais préexistant dans HeroSection et son bouton Boussole, laissé intact conformément à la consigne ; validation intégrale accessibilité, lecteur d'écran et liens sources externes non effectuée. Rien publié.

- [x] SV-01 Facilitation illustration only (FR/EN, preview, not published).
- [x] SV-03 Programme design illustration only (FR/EN, preview, not published).
- [x] SV-04 Mediation illustration only (FR/EN, preview, not published).
- [x] SV-02 Supervision illustration only (FR/EN, preview, not published); no supervision-specific contact button (owner's choice — the shared contact button serves it).
- [x] Le Cercle: no dedicated page or link — email is enough for now (owner's decision 2026-10-19).
- [ ] Supervision caption wrapping at very large text (awaiting owner approval for a styles-only fix).
- [x] Enhance existing REGEN loop only: FR/EN native selection and pause, 22-second decoration, 12 passing focused/route tests, browser checks at 375/1280px for keyboard, stable panels and anchor navigation; no publishing. True no-JavaScript rendering excluded by approved scope.

- [x] WB-05 only: bilingual REGEN block after coaching description and one homepage link; direct/internal anchors verified FR/EN at 390/1280px, five visible movements, no overflow/runtime errors, four route tests passed; not published.

- [x] Add optional language-specific notebook audio, player, list badge, Article media and upload instructions (14 tests passed; browser playback verified using temporary MP3 interception, real storage blocked)
- [ ] Create public carnet-audio bucket (blocked by workspace public_buckets_blocked policy; owner/admin must allow public buckets)

- [x] Add standard contact Lead once after confirmed visible success; 47 tests passed, real CRM test returned 200 and browser Lead transmission returned 200 for Pixel 2072978403507203
- [x] Verify published contact Lead transmission: 2026-10-17 isolated Meta bot-blocking of HeadlessChrome; same published site with normal Chrome user-agent sends PageView and one Lead to /tr (200), Pixel 2072978403507203, after confirmed Message envoyé !, without form data or refresh duplicate. No app code changed; Events Manager receipt remains unverified (no connected Meta account).

- [x] Add official Continuo Substack form behind external-content consent, without Lead as chosen; 36 tests passed and real iframe/withdrawal checked without submitting a subscription
- [ ] Publish consent-gated Continuo form and verify the live deployment on continuation

- [x] Add advertising-consent-gated Meta PageView and disclosures; 33 tests and browser acceptance/refusal/withdrawal checks passed
- [x] Verify published Meta Pixel deployment: www.regenb.fr passed exact ID/PageView, before-choice/refusal blocking, advertising-only acceptance, withdrawal/reload and English settings checks

- [x] Split legal pages FR/EN, update footer/sitemap and verify redirects and French-precedence notice (28 tests passed, eight pages verified)
- [ ] Legal notice: confirm course storage provider, address and server region (awaiting user information; supplied bracketed placeholder retained)

- [x] Consent: bilingual first-visit banner, equal choices, purpose settings and permanent footer access
- [x] Consent: first-party six-month versioned choice, gated loaders and withdrawal cleanup/reload (no optional providers currently installed)
- [x] Consent: bilingual cookies information, 21 passing automated checks and private-window test plan; preview flow verified, publication/hosted retest still required

- [x] Privacy: prevent optional tracking before consent and remove unnecessary storage
- [x] Privacy: verify external embeds and fresh-visitor network behaviour (production policy tested against published HTML; publish required)

- [x] Intégrer le logo fourni et la nouvelle identité visuelle
- [x] Réécrire tous les contenus FR/EN à la première personne
- [x] Recomposer la page d’accueil en revue vivante
- [x] Harmoniser les pages Partenaires et Contact
- [x] Mettre à jour les métadonnées et le favicon
- [x] Vérifier ordinateur, mobile, FR/EN et interactions
- [x] Retirer les services, partenaires, retraites et anciennes dates
- [x] Réorganiser l’accueil : boussole, présentation, proposition, lettre et liste d’attente
- [x] Créer la page /boussole (formation Nature Values Compass, une colonne, bouton d’achat)
- [x] Créer la page /legal avec trois ancres (mentions légales, confidentialité, CGV)
- [x] Ajouter SIREN, NAF, TVA et siège social (8 route de Barat, 31160 Arbas) aux mentions légales
- [x] Lien d’achat de la boussole pointant vers https://valuescourse.regenb.com/
- [x] Hébergeur ajouté aux mentions légales (Lovable, domaine chez GoDaddy)
- [x] Métadonnées par page + JSON-LD
- [x] sitemap.xml (généré au build) + robots.txt

- [x] Add English notes dry-toilets and robustness
- [ ] Boussole : icônes d'éléments sur les cartes de modules (en attente : éléments par pas)
- [ ] Séparateurs ondulés animés (WavySeparator) (en attente : remplacer les traits droits ?)
- [x] Accueil : quatre icônes sous le sous-titre
- [x] Boussole : sept photos et deux enregistrements d'introduction hébergés, liens publics permanents vérifiés (photos 200 image/jpeg, MP3 200 audio/mpeg sur www.regenb.fr) ; photo « feu » convertie PNG 1,9 Mo -> JPEG 135 Ko, original retiré
- [ ] Boussole : refonte de la page avec ces visuels et ces audios (en attente : accord de démarrage). Portrait = Josselin Butté, à nommer dans la description alternative ; formulation FR/EN de l'intro rapprochée : phrase commune ajoutée en preview (compass.why.text3), « Beaucoup l'ont suivie » ne subsiste que dans l'audio français
- [x] Boussole page: 7 photos (hero, 4 elements, portrait, closing) + FR/EN intro audio players placed; CSP img-src/media-src widened to www.regenb.fr/regenb.fr (root cause of missing pictures after publish: regenb.lovable.app now redirects to the primary domain, which the policy did not allow); 70 tests passed, FR/EN desktop+mobile verified; not published.
