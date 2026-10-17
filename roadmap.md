# Refonte Josselin Butté

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
