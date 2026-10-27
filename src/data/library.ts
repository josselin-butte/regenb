export type BookTheme = 'regeneration' | 'systemes' | 'organisations' | 'terre' | 'marche';
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
    }
  ]
};
