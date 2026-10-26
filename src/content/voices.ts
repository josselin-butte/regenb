// Voix de femmes — citations sourcées, bilingues.
// Les champs placement_* sont des repères éditoriaux (commentaires), pas utilisés par le code.

export interface Voice {
  key: string;
  name: string;
  year: string;
  quote: { fr: string; en: string };
  note: { fr: string; en: string };
  originalEs?: string;
  sourceLabel: string;
  sourceUrl: string;
  rights: 'short-quotation' | 'public-domain';
}

export const voices: Voice[] = [
  {
    key: 'home.hero',
    // placement_en: Hero · “The age of living systems”
    // placement_fr: Hero · « L’ère du vivant »
    name: 'Rigoberta Menchú Tum',
    year: '1992',
    quote: {
      en: 'The Earth is the root and the source of our culture. She keeps our memories, she receives our ancestors.',
      fr: 'La Terre est la racine et la source de notre culture. Elle garde notre mémoire, elle accueille nos ancêtres.',
    },
    originalEs: 'La tierra es raíz y fuente de nuestra cultura. Ella contiene nuestra memoria, ella acoge a nuestros antepasados.',
    note: {
      en: 'English translation: Nobel Foundation',
      fr: 'Traduction RegenB depuis l’espagnol',
    },
    sourceLabel: 'NobelPrize.org (Spanish)',
    sourceUrl: 'https://www.nobelprize.org/prizes/peace/1992/tum/26034-nobel-lecture-spanish/',
    rights: 'short-quotation',
  },
  {
    key: 'home.cocreate',
    // placement_en: Principle · Co-create rather than prescribe
    // placement_fr: Principe · Co-créer plutôt que prescrire
    name: 'Mary Parker Follett',
    year: '1924',
    quote: {
      en: 'The remedy for coercion is not consent but co-action.',
      fr: 'Le remède à la coercition n’est pas le consentement, mais la co-action.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Internet Archive (full text)',
    sourceUrl: 'https://archive.org/stream/creativeexperien00foll/creativeexperien00foll_djvu.txt',
    rights: 'public-domain',
  },
  {
    key: 'home.decisions',
    // placement_en: Principle · Make decisions clear
    // placement_fr: Principe · Rendre les décisions claires
    name: 'Elinor Ostrom',
    year: '2009',
    quote: {
      en: 'A core goal of public policy should be to facilitate the development of institutions that bring out the best in humans.',
      fr: 'Un objectif central de l’action publique devrait être de faciliter l’émergence d’institutions qui font ressortir le meilleur des êtres humains.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'NobelPrize.org lecture (PDF)',
    sourceUrl: 'https://www.nobelprize.org/uploads/2018/06/ostrom_lecture.pdf',
    rights: 'short-quotation',
  },
  {
    key: 'home.living',
    // placement_en: Principle · Treat the organisation as a living system
    // placement_fr: Principe · Traiter l’organisation comme un vivant
    name: 'Robin Wall Kimmerer',
    year: '2013',
    quote: {
      en: 'Through reciprocity the gift is replenished. All of our flourishing is mutual.',
      fr: 'Par la réciprocité, le don se renouvelle. Notre épanouissement est toujours mutuel.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Wikiquote (with page)',
    sourceUrl: 'https://en.wikiquote.org/wiki/Robin_Wall_Kimmerer',
    rights: 'short-quotation',
  },
  {
    key: 'home.learn',
    // placement_en: Principle · Learn by doing
    // placement_fr: Principe · Apprendre en faisant
    name: 'Donella Meadows',
    year: '2001',
    quote: {
      en: 'We can’t control systems or figure them out. But we can dance with them!',
      fr: 'Nous ne pouvons ni contrôler les systèmes ni en percer tous les secrets. Mais nous pouvons danser avec eux !',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Donella Meadows Project',
    sourceUrl: 'https://donellameadows.org/archives/dancing-with-systems/',
    rights: 'short-quotation',
  },
  {
    key: 'home.about',
    // placement_en: About me · ancient wisdom and the life sciences
    // placement_fr: Qui je suis · sagesses anciennes et sciences du vivant
    name: 'Rachel Carson',
    year: '1954',
    quote: {
      en: 'I believe that the more clearly we can focus our attention on the wonders and realities of the universe about us, the less taste we shall have for destruction.',
      fr: 'Je crois que plus nous saurons porter clairement notre attention sur les merveilles et les réalités de l’univers qui nous entoure, moins nous aurons de goût pour la destruction.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Course reader (Lost Woods excerpt)',
    sourceUrl: 'http://www.brontaylor.com/courses/pdf/Carson,Rachel--NatureReligion.pdf',
    rights: 'short-quotation',
  },
  {
    key: 'home.continuo',
    // placement_en: Continuo, my letter
    // placement_fr: Continuo, ma lettre
    name: 'Abigail Adams',
    year: '1776',
    quote: {
      en: 'I desire you would Remember the Ladies, and be more generous and favourable to them than your ancestors.',
      fr: 'Je souhaite que vous vous souveniez des dames, et que vous soyez plus généreux et plus favorable envers elles que vos ancêtres.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Massachusetts Historical Society',
    sourceUrl: 'https://www.masshist.org/digitaladams/archive/doc?id=L17760331aa',
    rights: 'public-domain',
  },
  {
    key: 'services.facilitation',
    // placement_en: Facilitation · making unheard voices visible
    // placement_fr: Facilitation · rendre visibles les voix qu’on n’entend pas
    name: 'Nanyehi (Nancy Ward)',
    year: '1781',
    quote: {
      en: 'You know that women are always looked upon as nothing; but we are your mothers; you are our sons. Our cry is all for peace; let it continue. … Let your women hear our words.',
      fr: 'Vous savez que les femmes sont toujours considérées comme rien ; mais nous sommes vos mères ; vous êtes nos fils. Notre cri est tout entier pour la paix ; qu’elle dure. … Que vos femmes entendent nos paroles.',
    },
    note: {
      en: 'As recorded in English by the treaty commissioners, 1781',
      fr: 'Traduction RegenB',
    },
    sourceLabel: 'Colonial Williamsburg',
    sourceUrl: 'https://www.colonialwilliamsburg.org/discover/18th-century-people/stories-of-american-indian-life/nanyehi-nancy-ward-a-beloved-woman-of-chota/',
    rights: 'public-domain',
  },
  {
    key: 'services.programmes',
    // placement_en: Programme design · observable behaviours
    // placement_fr: Conception de programmes · comportements observables
    name: 'Florence Nightingale',
    year: '1859',
    quote: {
      en: 'The most important practical lesson that can be given to nurses is to teach them what to observe—how to observe—what symptoms indicate improvement—what the reverse.',
      fr: 'La leçon pratique la plus importante que l’on puisse donner aux infirmières est de leur apprendre quoi observer, comment observer, quels signes indiquent une amélioration, lesquels l’inverse.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'UPenn Digital Library (full text)',
    sourceUrl: 'https://digital.library.upenn.edu/women/nightingale/nursing/nursing.html',
    rights: 'public-domain',
  },
  {
    key: 'services.coaching',
    // placement_en: Coaching · transitions and hard decisions
    // placement_fr: Coaching · transitions et décisions difficiles
    name: 'Ruth Bader Ginsburg',
    year: '2015',
    quote: {
      en: 'Fight for the things that you care about, but do it in a way that will lead others to join you.',
      fr: 'Battez-vous pour ce qui compte pour vous, mais faites-le d’une manière qui donnera envie aux autres de vous rejoindre.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'The Harvard Crimson',
    sourceUrl: 'https://www.thecrimson.com/article/2015/5/31/ginsburg-radcliffe-medal-2015/',
    rights: 'short-quotation',
  },
  {
    key: 'services.supervision',
    // placement_en: Supervision · what happens in you as you support others
    // placement_fr: Supervision · ce qui se passe en vous quand vous accompagnez
    name: 'Simone Weil',
    year: '1942',
    quote: {
      en: 'Attention is the rarest and purest form of generosity.',
      fr: 'L’attention est la forme la plus rare et la plus pure de la générosité.',
    },
    note: { en: 'Translated from the French by RegenB', fr: '' },
    sourceLabel: 'Wikiquote NL (with page)',
    sourceUrl: 'https://nl.wikiquote.org/wiki/Simone_Weil',
    rights: 'public-domain',
  },
  {
    key: 'services.cercle',
    // placement_en: Le Cercle · supervision group, eight places
    // placement_fr: Le Cercle · supervision en groupe, huit places
    name: 'Wilma Mankiller',
    year: '2004',
    quote: {
      en: 'I learned a lot about community and reciprocity by observing how our extended family and neighbours depended on one another for support and survival.',
      fr: 'J’ai beaucoup appris sur la communauté et la réciprocité en observant combien notre famille élargie et nos voisins comptaient les uns sur les autres pour se soutenir et survivre.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Wilma Mankiller Foundation',
    sourceUrl: 'https://www.wilmamankiller.com/stories/wilma-in-her-words',
    rights: 'short-quotation',
  },
  {
    key: 'services.mediation',
    // placement_en: Mediation · saying what you live, hearing the other
    // placement_fr: Médiation · dire ce qu’on vit, entendre l’autre
    name: 'Audre Lorde',
    year: '1977',
    quote: {
      en: 'What is most important to me must be spoken, made verbal and shared, even at the risk of having it bruised or misunderstood.',
      fr: 'Ce qui compte le plus pour moi doit être dit, mis en mots et partagé, même au risque d’être meurtri ou mal compris.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Iowa State AWPC',
    sourceUrl: 'https://awpc.cattcenter.iastate.edu/communication/transformation-silence-language-and-action-dec-28-1977',
    rights: 'short-quotation',
  },
  {
    key: 'journeys.intro',
    // placement_en: Journeys · a few days outdoors
    // placement_fr: Les étapes · quelques jours dehors
    name: 'Nan Shepherd',
    year: '1944',
    quote: {
      en: 'Often the mountain gives itself most completely when I have no destination … but have gone out merely to be with the mountain as one visits a friend with no intention but to be with him.',
      fr: 'Souvent, la montagne se donne le plus pleinement quand je n’ai pas de destination … et que je suis sortie simplement pour être avec elle, comme on rend visite à un ami sans autre intention que d’être avec lui.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Resurgence',
    sourceUrl: 'https://www.resurgence.org/magazine/article3886-a-meditation-on-mountains.html',
    rights: 'short-quotation',
  },
  {
    key: 'compass.north',
    // placement_en: Compass page · Finding true north
    // placement_fr: Page Boussole · Retrouver son nord
    name: 'Wangari Maathai',
    year: '2004',
    quote: {
      en: 'In the course of history, there comes a time when humanity is called to shift to a new level of consciousness, to reach a higher moral ground. A time when we have to shed our fear and give hope to each other. That time is now.',
      fr: 'Au cours de l’histoire, vient un temps où l’humanité est appelée à passer à un nouveau niveau de conscience, à atteindre un terrain moral plus élevé. Un temps où nous devons nous défaire de notre peur et nous donner de l’espoir les uns aux autres. Ce temps, c’est maintenant.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'NobelPrize.org lecture',
    sourceUrl: 'https://www.nobelprize.org/prizes/peace/2004/maathai/lecture/',
    rights: 'short-quotation',
  },
  {
    key: 'notebook.index',
    // placement_en: Notebook · “The questions that keep me walking”
    // placement_fr: Carnet · « Les questions qui me font marcher »
    name: 'Toni Morrison',
    year: '1993',
    quote: {
      en: 'Narrative is radical, creating us at the very moment it is being created.',
      fr: 'Le récit est radical : il nous crée au moment même où il est en train d’être créé.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'NobelPrize.org lecture',
    sourceUrl: 'https://www.nobelprize.org/prizes/literature/1993/morrison/lecture/',
    rights: 'short-quotation',
  },
  {
    key: 'notebook.fire',
    // placement_en: Note · What fire does to a conversation
    // placement_fr: Note · Ce que le feu fait à une conversation
    name: 'Zitkála-Šá (Gertrude Simmons Bonnin)',
    year: '1900',
    quote: {
      en: 'I loved best the evening meal, for that was the time old legends were told. … As each in turn began to tell a legend, I pillowed my head in my mother’s lap; and lying flat upon my back, I watched the stars as they peeped down upon me, one by one.',
      fr: 'Ce que je préférais, c’était le repas du soir, car c’était l’heure où l’on racontait les vieilles légendes. … Tandis que chacun, à son tour, commençait une légende, je posais la tête sur les genoux de ma mère et, allongée sur le dos, je regardais les étoiles apparaître au-dessus de moi, une à une.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Project Gutenberg',
    sourceUrl: 'https://www.gutenberg.org/ebooks/10376',
    rights: 'public-domain',
  },
  {
    key: 'notebook.thermals',
    // placement_en: Note · What thermals teach me about a group’s energy
    // placement_fr: Note · Ce que les thermiques m’apprennent sur l’énergie d’un groupe
    name: 'Evelyn Glennie',
    year: '2015',
    quote: {
      en: 'Hearing is basically a specialized form of touch. … For some reason we tend to make a distinction between hearing a sound and feeling a vibration, in reality they are the same thing.',
      fr: 'L’ouïe est au fond une forme spécialisée du toucher. … Pour une raison ou une autre, nous distinguons entendre un son et sentir une vibration ; en réalité, c’est la même chose.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Evelyn Glennie',
    sourceUrl: 'https://www.evelyn.co.uk/hearing-essay/',
    rights: 'short-quotation',
  },
  {
    key: 'notebook.water',
    // placement_en: Note · What our toilets say about our relationship with water
    // placement_fr: Note · Ce que nos toilettes disent de notre rapport à l’eau
    name: 'Josephine Mandamin',
    year: '2015',
    quote: {
      en: 'When we walk with the water, we pray for the water. The water that we carry, we pray for it, and we pray to it; we speak to it. … The water is very precious.',
      fr: 'Quand nous marchons avec l’eau, nous prions pour l’eau. L’eau que nous portons, nous prions pour elle, et nous la prions ; nous lui parlons. … L’eau est très précieuse.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'Ontario Heritage Trust',
    sourceUrl: 'https://www.heritagetrust.on.ca/heritagematters/articles/walking-with-the-water',
    rights: 'short-quotation',
  },
  {
    key: 'notebook.robustness',
    // placement_en: Note · Robustness: roots, contributions and limits
    // placement_fr: Note · La robustesse : racines, apports et limites
    name: 'Lynn Margulis',
    year: '1986',
    quote: {
      en: 'Life did not take over the globe by combat, but by networking. Life forms multiplied and complexified by co-opting others, not just by killing them.',
      fr: 'La vie n’a pas conquis la planète par le combat, mais en tissant des réseaux. Les formes de vie se sont multipliées et complexifiées en s’associant à d’autres, pas seulement en les tuant.',
    },
    note: { en: '', fr: 'Traduction RegenB' },
    sourceLabel: 'LibQuotes (with context)',
    sourceUrl: 'https://libquotes.com/lynn-margulis/quote/lbi4x3w',
    rights: 'short-quotation',
  },
];

export const getVoice = (key: string): Voice | undefined =>
  voices.find((v) => v.key === key);
