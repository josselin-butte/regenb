export type BookTheme = 'regeneration' | 'systemes' | 'organisations' | 'terre' | 'marche' | 'musique';
export interface Book {
  author: string; theme: BookTheme; isbnFr: string; isbnEn: string; relatedNote?: string;
  fr: { title: string; edition: string; what: string; when: string };
  en: { title: string; edition: string; what: string; when: string };
}
export interface LibraryData {
  intro: Record<'fr' | 'en', { title: string; eyebrow: string; lead: string }>;
  themes: Record<BookTheme, Record<'fr' | 'en', string>>;
  books: Book[];
}
export const library: LibraryData = {
  "intro": {
    "fr": {
      "title": "Bibliothèque",
      "eyebrow": "Carnet · Livres",
      "lead": "Les livres qui nourrissent mes accompagnements et les notes de ce Carnet. Pour chacun, ce qu'on y trouve, le moment où l'ouvrir, et un lien vers une librairie indépendante."
    },
    "en": {
      "title": "Library",
      "eyebrow": "Notebook · Books",
      "lead": "The books that feed my work and the notes in this Notebook. For each one: what you will find in it, when to open it, and a link to an independent bookshop."
    }
  },
  "themes": {
    "regeneration": {
      "fr": "Régénération",
      "en": "Regeneration"
    },
    "systemes": {
      "fr": "Systèmes vivants",
      "en": "Living systems"
    },
    "organisations": {
      "fr": "Organisations et facilitation",
      "en": "Organisations and facilitation"
    },
    "terre": {
      "fr": "Terre et terrain",
      "en": "Land and practice"
    },
    "marche": {
      "fr": "Marche",
      "en": "Walking"
    },
    "musique": {
      "fr": "Musique et écoute",
      "en": "Music and listening"
    }
  },
  "books": [
    {
      "author": "Daniel Christian Wahl",
      "theme": "regeneration",
      "fr": {
        "title": "Designing Regenerative Cultures",
        "edition": "Triarchy Press, 2016 (en anglais)",
        "what": "Un vaste panorama construit autour de questions plutôt que de réponses : comment concevoir des cultures capables de se renouveler, du local au planétaire.",
        "when": "Quand on a besoin de bonnes questions avant de chercher des solutions."
      },
      "en": {
        "title": "Designing Regenerative Cultures",
        "edition": "Triarchy Press, 2016",
        "what": "A wide-ranging survey built around questions rather than answers: how to design cultures able to renew themselves, from local to planetary scale.",
        "when": "When you need good questions before looking for solutions."
      },
      "isbnFr": "",
      "isbnEn": "9781909470774",
      "relatedNote": "Robustesse / Robustness"
    },
    {
      "author": "Kate Raworth",
      "theme": "regeneration",
      "fr": {
        "title": "La Théorie du donut",
        "edition": "Plon, 2018 (Doughnut Economics, 2017)",
        "what": "Un plancher social, un plafond écologique et l'espace sûr et juste entre les deux, en sept façons de penser l'économie autrement.",
        "when": "Quand une organisation se demande ce que « réussir » veut dire."
      },
      "en": {
        "title": "Doughnut Economics",
        "edition": "Random House Business, 2017",
        "what": "A social foundation, an ecological ceiling, and the safe and just space between them, in seven ways to think differently about economics.",
        "when": "When an organisation is asking what 'success' really means."
      },
      "isbnFr": "9782259268080",
      "isbnEn": "9781847941398"
    },
    {
      "author": "Robin Wall Kimmerer",
      "theme": "systemes",
      "fr": {
        "title": "Tresser les herbes sacrées",
        "edition": "Le Lotus et l'éléphant, 2021 (Braiding Sweetgrass, 2013)",
        "what": "Une botaniste potawatomi tresse savoirs autochtones, science et récits des plantes autour d'une idée : la réciprocité.",
        "when": "Quand on veut réapprendre la gratitude envers ce qui nous nourrit."
      },
      "en": {
        "title": "Braiding Sweetgrass",
        "edition": "Milkweed Editions, 2013",
        "what": "A Potawatomi botanist braids Indigenous knowledge, science and the stories of plants around one idea: reciprocity.",
        "when": "When you want to relearn gratitude for what sustains you."
      },
      "isbnFr": "9782016283967",
      "isbnEn": "9781571313560"
    },
    {
      "author": "Donella Meadows",
      "theme": "systemes",
      "fr": {
        "title": "Pour une pensée systémique",
        "edition": "Rue de l'échiquier, 2023 (Thinking in Systems, 2008)",
        "what": "Stocks, flux, boucles de rétroaction et points de levier, expliqués sans équations.",
        "when": "Quand un problème revient sans cesse malgré les solutions."
      },
      "en": {
        "title": "Thinking in Systems",
        "edition": "Chelsea Green, 2008",
        "what": "Stocks, flows, feedback loops and leverage points, explained without equations.",
        "when": "When a problem keeps coming back despite every fix."
      },
      "isbnFr": "9782374253770",
      "isbnEn": "9781603580557"
    },
    {
      "author": "Gregory Bateson",
      "theme": "systemes",
      "fr": {
        "title": "Vers une écologie de l'esprit",
        "edition": "Seuil, coll. Points (Steps to an Ecology of Mind, 1972)",
        "what": "Des essais qui placent l'esprit dans les relations plutôt que dans les têtes.",
        "when": "Quand on veut regarder les motifs qui relient plutôt que les éléments séparés."
      },
      "en": {
        "title": "Steps to an Ecology of Mind",
        "edition": "1972; University of Chicago Press, 2000",
        "what": "Essays that locate mind in relationships rather than inside heads.",
        "when": "When you want to see the patterns that connect rather than separate parts."
      },
      "isbnFr": "9782020257671",
      "isbnEn": "9780226039053"
    },
    {
      "author": "Joanna Macy & Chris Johnstone",
      "theme": "regeneration",
      "fr": {
        "title": "L'Espérance en mouvement",
        "edition": "Labor et Fides (Active Hope, 2012)",
        "what": "Le Travail qui relie en quatre temps : s'enraciner dans la gratitude, honorer sa peine pour le monde, porter un nouveau regard, aller de l'avant.",
        "when": "Quand l'état du monde pèse et qu'il faut retrouver l'élan d'agir."
      },
      "en": {
        "title": "Active Hope",
        "edition": "New World Library, 2012",
        "what": "The Work That Reconnects in four movements: gratitude, honouring our pain for the world, seeing with new eyes, going forth.",
        "when": "When the state of the world weighs heavy and you need to find the energy to act again."
      },
      "isbnFr": "9782830916577",
      "isbnEn": "9781577319726"
    },
    {
      "author": "Frédéric Laloux",
      "theme": "organisations",
      "fr": {
        "title": "Reinventing Organizations : vers des communautés de travail inspirées",
        "edition": "Diateino, édition française (2014 en anglais)",
        "what": "Une enquête sur des organisations qui fonctionnent par autogestion, plénitude et raison d'être évolutive.",
        "when": "Quand une équipe veut repenser sa manière de décider ensemble."
      },
      "en": {
        "title": "Reinventing Organizations",
        "edition": "Nelson Parker, 2014",
        "what": "A study of organisations built on self-management, wholeness and evolutionary purpose.",
        "when": "When a team wants to rethink how it decides together."
      },
      "isbnFr": "9782354561055",
      "isbnEn": "9782960133509"
    },
    {
      "author": "Sam Kaner et al.",
      "theme": "organisations",
      "fr": {
        "title": "Facilitator's Guide to Participatory Decision-Making",
        "edition": "Wiley, 4e édition (en anglais)",
        "what": "Le « diamant » de la décision participative : ouvrir, traverser la zone inconfortable du milieu, converger, avec des outils pour chaque phase.",
        "when": "Quand un groupe piétine juste avant de décider."
      },
      "en": {
        "title": "Facilitator's Guide to Participatory Decision-Making",
        "edition": "Wiley, 4th edition",
        "what": "The 'diamond' of participatory decision-making: diverge, cross the uncomfortable middle, converge, with tools for each phase.",
        "when": "When a group gets stuck just before deciding."
      },
      "isbnFr": "",
      "isbnEn": "9781119789062"
    },
    {
      "author": "Masanobu Fukuoka",
      "theme": "terre",
      "fr": {
        "title": "La Révolution d'un seul brin de paille",
        "edition": "Guy Trédaniel (The One-Straw Revolution, 1975 en japonais)",
        "what": "Un agriculteur japonais raconte l'agriculture du non-agir : ne pas labourer, observer, laisser la nature faire sa part.",
        "when": "Quand on veut faire moins et mieux, au jardin comme ailleurs."
      },
      "en": {
        "title": "The One-Straw Revolution",
        "edition": "New York Review Books, 2009 (first published 1975)",
        "what": "A Japanese farmer describes 'do-nothing' farming: no ploughing, close observation, letting nature do its share.",
        "when": "When you want to do less and do it better, in the garden and beyond."
      },
      "isbnFr": "9782844456243",
      "isbnEn": "9781590173138"
    },
    {
      "author": "Frédéric Gros",
      "theme": "marche",
      "fr": {
        "title": "Marcher, une philosophie",
        "edition": "Carnets Nord, 2009 ; Flammarion, coll. Champs, 2019",
        "what": "Des méditations sur la marche en compagnie de Rousseau, Thoreau, Nietzsche ou Rimbaud : flânerie, errance, pèlerinage.",
        "when": "Avant un départ, ou au retour, pour comprendre ce que les pieds ont appris."
      },
      "en": {
        "title": "A Philosophy of Walking",
        "edition": "Verso, 2014",
        "what": "Meditations on walking alongside Rousseau, Thoreau, Nietzsche and Rimbaud: strolling, wandering, pilgrimage.",
        "when": "Before setting off, or on the way back, to understand what your feet have learnt."
      },
      "isbnFr": "9782081494022",
      "isbnEn": "9781781682708",
      "relatedNote": "Marche et montagne / Walking and mountains"
    },
    {
      "author": "Bernie Krause",
      "theme": "musique",
      "fr": {
        "title": "Le grand orchestre des animaux",
        "edition": "Flammarion, coll. Champs sciences, 2018 (The Great Animal Orchestra, 2012)",
        "what": "Un ancien musicien de studio qui a passé des décennies à enregistrer les lieux sauvages. Son idée clé, la « biophonie » : dans un milieu en bonne santé, chaque espèce trouve sa place dans le paysage sonore, comme les pupitres d'un orchestre.",
        "when": "Quand on veut entendre la santé d'un lieu, ou d'un groupe, en écoutant qui a de la place pour se faire entendre."
      },
      "en": {
        "title": "The Great Animal Orchestra",
        "edition": "Little, Brown, 2012",
        "what": "A former studio musician who spent decades recording wild places. His key idea, 'biophony': in a healthy habitat each species finds its own band in the soundscape, like players in an orchestra.",
        "when": "When you want to hear the health of a place, or of a group, by listening to who has room to sound."
      },
      "isbnFr": "9782081445383",
      "isbnEn": "9780316192392"
    },
    {
      "author": "David George Haskell",
      "theme": "musique",
      "fr": {
        "title": "Sounds Wild and Broken",
        "edition": "Viking, 2022 (en anglais)",
        "what": "L'histoire du son sur Terre, des premiers chants animaux à la musique humaine, et une alerte : quand des voix disparaissent, le monde s'appauvrit aussi à l'oreille. Finaliste du prix Pulitzer.",
        "when": "Quand on veut comprendre pourquoi écouter, c'est déjà prendre soin du vivant."
      },
      "en": {
        "title": "Sounds Wild and Broken",
        "edition": "Viking, 2022",
        "what": "The story of sound on Earth, from the first animal songs to human music, and a warning: as voices disappear, the world becomes poorer to the ear. A Pulitzer Prize finalist.",
        "when": "When you want to understand why listening is already a way of caring for the living."
      },
      "isbnFr": "",
      "isbnEn": "9781984881540"
    },
    {
      "author": "R. Murray Schafer",
      "theme": "musique",
      "fr": {
        "title": "Le Paysage sonore",
        "edition": "Wildproject, 2010 ; poche, 2024 (The Tuning of the World, 1977)",
        "what": "Le texte fondateur de l'écologie sonore, par le compositeur à l'origine du World Soundscape Project. Il propose d'écouter le monde comme une vaste composition musicale, dont nous serions en partie les auteurs.",
        "when": "Quand on choisit un lieu pour un atelier, ou quand un endroit paraît bruyant et fatigant sans savoir pourquoi."
      },
      "en": {
        "title": "The Soundscape",
        "edition": "Destiny Books, 1994 (first published 1977)",
        "what": "The founding text of acoustic ecology, by the composer behind the World Soundscape Project. He invites us to hear the world as a vast musical composition, one we are partly composing ourselves.",
        "when": "When you choose a venue for a workshop, or when a place feels noisy and tiring without knowing why."
      },
      "isbnFr": "9782381140803",
      "isbnEn": "9780892814558"
    },
    {
      "author": "Pauline Oliveros",
      "theme": "musique",
      "fr": {
        "title": "Deep Listening",
        "edition": "iUniverse, 2005 (en anglais)",
        "what": "Des exercices simples, proposés par une compositrice, pour élargir l'attention : écouter tous les sons alentour, et s'écouter écouter. Beaucoup se pratiquent en groupe.",
        "when": "Quand on veut ouvrir une séance par l'écoute plutôt que par la parole."
      },
      "en": {
        "title": "Deep Listening",
        "edition": "iUniverse, 2005",
        "what": "Simple exercises from a composer to widen attention: listening to every sound around you, and to yourself listening. Many can be done in a group.",
        "when": "When you want to open a session with listening rather than with talking."
      },
      "isbnFr": "",
      "isbnEn": "9780595343652"
    },
    {
      "author": "Christopher Small",
      "theme": "musique",
      "fr": {
        "title": "Musicking",
        "edition": "Wesleyan University Press, 1998 (en anglais)",
        "what": "La musique n'est pas un objet mais quelque chose que l'on fait ensemble. Toutes les personnes présentes y prennent part, et chaque concert met en jeu les relations que ses participants veulent vivre.",
        "when": "Quand on se demande ce qu'une rencontre dit des relations qu'elle crée."
      },
      "en": {
        "title": "Musicking",
        "edition": "Wesleyan University Press, 1998",
        "what": "Music is not a thing but something we do together. Everyone present takes part, and every performance acts out the relationships its participants want to live.",
        "when": "When you are asking what a gathering says about the relationships it creates."
      },
      "isbnFr": "",
      "isbnEn": "9780819522573"
    },
    {
      "author": "Thomas Turino",
      "theme": "musique",
      "fr": {
        "title": "Music as Social Life",
        "edition": "University of Chicago Press, 2008 (en anglais)",
        "what": "Un ethnomusicologue distingue la musique jouée devant un public et la musique participative, où chacun prend part, et montre ce que chacune apporte à une communauté.",
        "when": "Quand on veut un atelier où personne n'est simple spectateur."
      },
      "en": {
        "title": "Music as Social Life",
        "edition": "University of Chicago Press, 2008",
        "what": "An ethnomusicologist contrasts music performed for an audience with participatory music, where everyone joins in, and shows what each does for a community.",
        "when": "When you want a workshop where nobody is just the audience."
      },
      "isbnFr": "",
      "isbnEn": "9780226816982"
    },
    {
      "author": "Stephen Nachmanovitch",
      "theme": "musique",
      "fr": {
        "title": "Free Play",
        "edition": "Tarcher / Penguin, 1990 (en anglais)",
        "what": "Un violoniste sur l'improvisation comme source intérieure de la création : le jeu, la pratique, les limites, les erreurs, et la confiance qui laisse naître du nouveau.",
        "when": "Quand le plan doit faire place à ce qui se passe vraiment dans la salle."
      },
      "en": {
        "title": "Free Play",
        "edition": "Tarcher / Penguin, 1990",
        "what": "A violinist on improvisation as the inner source of creation: play, practice, limits, mistakes, and the trust that lets something new appear.",
        "when": "When your plan needs to make room for what is really happening in the room."
      },
      "isbnFr": "",
      "isbnEn": "9780874776317"
    },
    {
      "author": "Frank J. Barrett",
      "theme": "musique",
      "fr": {
        "title": "Yes to the Mess",
        "edition": "Harvard Business Review Press, 2012 (en anglais)",
        "what": "Un pianiste de jazz, professeur de management, tire du jazz des leçons pour diriger : dire oui au désordre, alterner solo et accompagnement, apprendre en faisant.",
        "when": "Quand une équipe a tellement peur de l'erreur qu'elle n'essaie plus rien."
      },
      "en": {
        "title": "Yes to the Mess",
        "edition": "Harvard Business Review Press, 2012",
        "what": "A jazz pianist and management professor draws lessons from jazz for leaders: say yes to the mess, take turns soloing and supporting, learn by doing.",
        "when": "When a team is so afraid of mistakes that it no longer tries anything."
      },
      "isbnFr": "",
      "isbnEn": "9781422161104"
    }
  ]
};
