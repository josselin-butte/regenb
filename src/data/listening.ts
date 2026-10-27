export interface Track {
  artist: string; artistEn?: string; title: string; titleEn?: string;
  album?: string; year?: string; fr: string; en: string; bandcamp?: string;
}
export interface Playlist {
  slug: string; slugEn: string; fr: { title: string; desc: string }; en: { title: string; desc: string };
  relatedNote?: string; qobuzPlaylistUrl?: string; tracks: Track[];
}
export interface ListeningData {
  intro: Record<'fr' | 'en', { title: string; eyebrow: string; lead: string }>;
  playlists: Playlist[];
}
export const listening: ListeningData = {
  "intro": {
    "fr": {
      "title": "Écoutes",
      "eyebrow": "Carnet · Musique",
      "lead": "La musique accompagne ma façon d'apprendre, de marcher et de faciliter. Ces écoutes ne sont pas des classements : ce sont des compagnons de route, réunis par moments plutôt que par genres. Il n'y a pas de lecteur intégré ici : chaque titre s'ouvre sur le service de votre choix."
    },
    "en": {
      "title": "Listening",
      "eyebrow": "Notebook · Music",
      "lead": "Music runs through the way I learn, walk and facilitate. These are not rankings but travelling companions, grouped by moments rather than by genre. There is no embedded player here: each track opens in the service of your choice."
    }
  },
  "playlists": [
    {
      "slug": "autour-du-feu",
      "slugEn": "around-the-fire",
      "fr": {
        "title": "Autour du feu",
        "desc": "Des cordes et des voix pour la veillée, quand la conversation ralentit et que chacun écoute."
      },
      "en": {
        "title": "Around the fire",
        "desc": "Strings and voices for the evening, when conversation slows down and everyone listens."
      },
      "relatedNote": "Ce que le feu fait à une conversation / Fire and conversation",
      "tracks": [
        {
          "artist": "Ali Farka Touré & Ry Cooder",
          "title": "Diaraby",
          "album": "Talking Timbuktu",
          "year": "1994",
          "fr": "Deux guitares, deux rives de l'Atlantique, une conversation sans traduction.",
          "en": "Two guitars from either side of the Atlantic, talking without translation."
        },
        {
          "artist": "Tinariwen",
          "title": "Tenere Taqhim Tossam",
          "album": "Tassili",
          "year": "2011",
          "fr": "Le blues du désert joué en acoustique, comme autour d'un feu de camp.",
          "en": "Desert blues played acoustic, as if around a campfire."
        },
        {
          "artist": "Cesária Évora",
          "title": "Sodade",
          "album": "Miss Perfumado",
          "year": "1992",
          "fr": "La nostalgie chantée pieds nus, sans jamais s'appesantir.",
          "en": "Longing, sung barefoot, never heavy."
        },
        {
          "artist": "Mercedes Sosa",
          "title": "Gracias a la vida",
          "album": "chanson de Violeta Parra / song by Violeta Parra",
          "year": "",
          "fr": "Un inventaire de gratitude, porté par une voix immense.",
          "en": "An inventory of gratitude, carried by an immense voice."
        },
        {
          "artist": "Lhasa de Sela",
          "title": "El Desierto",
          "album": "La Llorona",
          "year": "1997",
          "fr": "Une voix grave et un désert intérieur, pour quand les braises baissent.",
          "en": "A low voice and an inner desert, for when the embers die down.",
          "bandcamp": "https://lhasadesela.bandcamp.com/album/la-llorona"
        },
        {
          "artist": "Ballaké Sissoko & Vincent Segal",
          "title": "Chamber Music",
          "album": "Chamber Music",
          "year": "2009",
          "fr": "La kora et le violoncelle s'écoutent avant de jouer : une leçon de dialogue.",
          "en": "Kora and cello listen before they play: a lesson in dialogue.",
          "bandcamp": "https://sissokosegal.bandcamp.com/album/chamber-music"
        },
        {
          "artist": "Anouar Brahem",
          "title": "Le Pas du chat noir",
          "album": "Le Pas du chat noir (ECM)",
          "year": "2002",
          "fr": "Oud, piano, accordéon, et beaucoup d'espace entre les notes.",
          "en": "Oud, piano, accordion, and plenty of space between the notes."
        },
        {
          "artist": "Georges Brassens",
          "title": "Les Copains d'abord",
          "album": "Les Copains d'abord",
          "year": "1964",
          "fr": "Pour finir la soirée en chantant ensemble.",
          "en": "To end the evening singing together."
        }
      ]
    },
    {
      "slug": "marcher",
      "slugEn": "walking",
      "fr": {
        "title": "Marcher",
        "desc": "Pour la montée, le rythme du pas et les grands espaces, du départ au bivouac."
      },
      "en": {
        "title": "Walking",
        "desc": "For the climb, the rhythm of the stride and wide open spaces, from the trailhead to the bivouac."
      },
      "relatedNote": "Ce que les thermiques m'apprennent sur l'énergie d'un groupe / Thermals and group energy",
      "tracks": [
        {
          "artist": "Jean Ferrat",
          "title": "La Montagne",
          "album": "La Montagne",
          "year": "1964",
          "fr": "La montagne comme lieu de vie, et ce qu'on perd à la quitter.",
          "en": "The mountain as a place to live, and what is lost when people leave it."
        },
        {
          "artist": "Simon & Garfunkel",
          "title": "El Cóndor Pasa (If I Could)",
          "album": "Bridge over Troubled Water",
          "year": "1970",
          "fr": "Une mélodie des Andes pour les cols et les crêtes.",
          "en": "A tune from the Andes for passes and ridges."
        },
        {
          "artist": "Joni Mitchell",
          "title": "Both Sides Now",
          "album": "Clouds",
          "year": "1969",
          "fr": "Regarder les nuages des deux côtés : une chanson pour qui vole aussi.",
          "en": "Looking at clouds from both sides: a song for those who fly too."
        },
        {
          "artist": "Ralph Vaughan Williams",
          "title": "The Lark Ascending",
          "album": "",
          "year": "",
          "fr": "Un violon qui monte en spirale, comme une alouette dans une thermique.",
          "en": "A violin spiralling upwards, like a lark in a thermal."
        },
        {
          "artist": "Ludwig van Beethoven",
          "title": "Symphonie n° 6 « Pastorale », 2e mouvement",
          "titleEn": "Symphony No. 6 'Pastoral', 2nd movement",
          "album": "Scène au bord du ruisseau / Scene by the brook",
          "year": "",
          "fr": "La marche ralentit, on s'assoit au bord de l'eau.",
          "en": "The pace slows; time to sit by the water."
        },
        {
          "artist": "Edvard Grieg",
          "title": "Peer Gynt : « Au matin »",
          "titleEn": "Peer Gynt: 'Morning Mood'",
          "album": "",
          "year": "",
          "fr": "Le jour se lève sur le bivouac.",
          "en": "Daybreak over the bivouac."
        },
        {
          "artist": "Bon Iver",
          "title": "Holocene",
          "album": "Bon Iver, Bon Iver",
          "year": "2011",
          "fr": "Se sentir minuscule dans un grand paysage, et en être apaisé.",
          "en": "Feeling tiny in a vast landscape, and being at peace with it."
        },
        {
          "artist": "Arvo Pärt",
          "title": "Spiegel im Spiegel",
          "album": "",
          "year": "1978",
          "fr": "Un pas après l'autre, pour la descente tranquille.",
          "en": "One step after another, for the quiet way down."
        }
      ]
    },
    {
      "slug": "voix-et-souffle",
      "slugEn": "voice-and-breath",
      "fr": {
        "title": "Voix et souffle",
        "desc": "Des chœurs, des voix nues et le Hang : la musique qui naît du souffle et de l'écoute mutuelle."
      },
      "en": {
        "title": "Voice and breath",
        "desc": "Choirs, bare voices and the Hang: music born of breath and of listening to one another."
      },
      "relatedNote": "",
      "tracks": [
        {
          "artist": "Hildegard von Bingen (Gothic Voices, Emma Kirkby)",
          "title": "Columba aspexit",
          "album": "A Feather on the Breath of God",
          "year": "1982",
          "fr": "Une abbesse du XIIe siècle, compositrice et naturaliste, d'une liberté étonnante.",
          "en": "A twelfth-century abbess, composer and naturalist, astonishingly free."
        },
        {
          "artist": "Thomas Tallis",
          "title": "Spem in alium",
          "album": "",
          "year": "",
          "fr": "Quarante voix indépendantes qui forment un seul souffle : une image de l'intelligence collective.",
          "en": "Forty independent voices forming a single breath: a picture of collective intelligence."
        },
        {
          "artist": "Gregorio Allegri",
          "title": "Miserere mei, Deus",
          "album": "",
          "year": "",
          "fr": "Les aigus suspendus d'une œuvre longtemps réservée à la chapelle Sixtine.",
          "en": "The suspended high notes of a work long reserved for the Sistine Chapel."
        },
        {
          "artist": "Sergueï Rachmaninov",
          "artistEn": "Sergei Rachmaninoff",
          "title": "Vêpres, op. 37 : « Bogoroditse Devo »",
          "titleEn": "All-Night Vigil, Op. 37: 'Bogoroditse Devo'",
          "album": "",
          "year": "",
          "fr": "La profondeur des basses russes, a cappella.",
          "en": "The depth of Russian basses, a cappella."
        },
        {
          "artist": "Gabriel Fauré",
          "title": "Cantique de Jean Racine, op. 11",
          "album": "",
          "year": "",
          "fr": "Écrit par un Fauré d'à peine vingt ans, un classique des maîtrises.",
          "en": "Written by Fauré at barely twenty, a staple of boys' and children's choirs."
        },
        {
          "artist": "Le Mystère des Voix Bulgares",
          "title": "Pilentse pee",
          "album": "Le Mystère des Voix Bulgares",
          "year": "1975",
          "fr": "Des harmonies serrées qui font vibrer l'air comme une cloche.",
          "en": "Close harmonies that make the air ring like a bell."
        },
        {
          "artist": "Eric Whitacre",
          "title": "Lux Aurumque",
          "album": "",
          "year": "",
          "fr": "La lumière en accords, à chanter ou à écouter les yeux fermés.",
          "en": "Light turned into chords, to sing or to hear with eyes closed."
        },
        {
          "artist": "Hang Massive",
          "title": "Once Again",
          "album": "Once Again",
          "year": "2011",
          "fr": "Le Hang, né à Berne chez PANArt, joué à deux : rythme et résonance.",
          "en": "The Hang, born at PANArt in Bern, played by two: rhythm and resonance.",
          "bandcamp": "https://hangmassive.bandcamp.com/track/once-again-4"
        }
      ]
    }
  ]
};
