import type { Lang } from '@/lib/routes';

export interface Audiobook {
  title: string;
  author: string;
  readBy: string;
  length: string;
  what: string;
  inLibrary: boolean;
  libraryTitle: string;
  listing: { label: string; url: string };
}
export interface AudiobookSelection { lead: string; closing: string; items: Audiobook[] }

export const audiobooks: Record<Lang, AudiobookSelection> = {
  "fr": {
    "lead": "Dans le train, sur la route des ateliers, en marchant : des livres qui s'écoutent. Ni classement ni liste complète, juste des compagnons de route. Beaucoup s'empruntent en médiathèque ou se commandent chez un libraire indépendant.",
    "closing": "Et vous, quel livre vous accompagne en ce moment ? Écrivez-moi, cette liste est faite pour s'allonger.",
    "items": [
      {
        "title": "Marcher, une philosophie",
        "author": "Frédéric Gros",
        "readBy": "Christophe Brault",
        "length": "6 h 07",
        "what": "Rimbaud, Nietzsche, Thoreau, Gandhi : ce que la marche fait à la pensée. Idéal à écouter… en marchant.",
        "inLibrary": true,
        "libraryTitle": "Marcher, une philosophie",
        "listing": {
          "label": "Audiolib",
          "url": "https://www.audiolib.fr/livre/marcher-une-philosophie-9791035401061/"
        }
      },
      {
        "title": "Manières d'être vivant",
        "author": "Baptiste Morizot",
        "readBy": "Pierre-François Garel",
        "length": "9 h 18",
        "what": "En pistant les loups, un philosophe repense nos liens avec le vivant. Postface d'Alain Damasio. Dense et lumineux.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Actes Sud Audio (fiche Audible)",
          "url": "https://www.audible.com/author/Alain-Damasio/B004MQH6OQ"
        }
      },
      {
        "title": "La Vie secrète des arbres",
        "author": "Peter Wohlleben",
        "readBy": "Thibault de Montalembert",
        "length": "7 h 06",
        "what": "Les arbres communiquent, s'entraident et prennent soin de leurs jeunes. On ne regarde plus une forêt de la même façon.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Audiolib",
          "url": "https://boutique.audiolib.fr/produit/817/9782367625492/la-vie-secrete-des-arbres"
        }
      },
      {
        "title": "L'homme qui plantait des arbres",
        "author": "Jean Giono",
        "readBy": "Jacques Bonnaffé",
        "length": "court",
        "what": "Un berger, une vallée aride, des décennies de patience. Le plus beau récit de régénération que je connaisse.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Gallimard (fiche Audible)",
          "url": "https://www.audible.fr/pd/Lhomme-qui-plantait-des-arbres-Livre-Audio/B016310OG4"
        }
      },
      {
        "title": "Dans les forêts de Sibérie",
        "author": "Sylvain Tesson",
        "readBy": "l'auteur",
        "length": "6 h 29",
        "what": "Six mois seul dans une cabane au bord du lac Baïkal. Le froid, le silence, le temps retrouvé.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Gallimard (fiche Audible)",
          "url": "https://www.audible.fr/pd/Dans-les-forets-de-Siberie-Livre-Audio/B00Y30N9YM"
        }
      },
      {
        "title": "Les mots sont des fenêtres (ou bien ce sont des murs)",
        "author": "Marshall B. Rosenberg",
        "readBy": "Antoine Tomé",
        "length": "",
        "what": "Les bases de la Communication NonViolente : écouter ce qui se vit derrière les mots, chez l'autre et chez soi.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Audiolib",
          "url": "https://boutique.audiolib.fr/produit/714/9782367622781/les-mots-sont-des-fenetres-ou-bien-ce-sont-des-murs"
        }
      },
      {
        "title": "Où atterrir ? – Où suis-je ?",
        "author": "Bruno Latour",
        "readBy": "Christophe Brault, avec Bruno Latour",
        "length": "",
        "what": "Deux courts essais pour se demander de quoi nous dépendons vraiment, et où nous vivons.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Fiche Audible",
          "url": "https://www.audible.fr/pd/Ou-atterrir-Ou-suis-je-Livre-Audio/B0973C7YJ6"
        }
      },
      {
        "title": "Walden ou la vie dans les bois",
        "author": "Henry David Thoreau",
        "readBy": "édition Thélème",
        "length": "13 h 17",
        "what": "Deux ans dans une cabane au bord d'un étang : le classique de la vie simple, en version intégrale.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Thélème (fiche Google Play)",
          "url": "https://play.google.com/store/audiobooks/details/Henry_David_Thoreau_Walden_ou_la_vie_dans_les_bois?id=AQAAAEDCikPKkM"
        }
      }
    ]
  },
  "en": {
    "lead": "On trains, on the road to workshops, on foot: books to listen to. Not a ranking, not a complete list, just travelling companions. Many can be borrowed from your library or ordered from an independent bookshop.",
    "closing": "And yours? Which book has travelled with you lately? Write to me: this list is meant to grow.",
    "items": [
      {
        "title": "Braiding Sweetgrass",
        "author": "Robin Wall Kimmerer",
        "readBy": "the author",
        "length": "16 h 44",
        "what": "A botanist and Potawatomi writer on what plants teach about gratitude and reciprocity. Even better in her own voice.",
        "inLibrary": true,
        "libraryTitle": "Braiding Sweetgrass",
        "listing": {
          "label": "Audiobook listing",
          "url": "https://www.amazon.com.au/Braiding-Sweetgrass-Indigenous-Scientific-Knowledge/dp/B01H47BRUS"
        }
      },
      {
        "title": "The Serviceberry",
        "author": "Robin Wall Kimmerer",
        "readBy": "the author",
        "length": "1 h 56",
        "what": "A wild shrub as a model for an economy built on gifts and sharing rather than scarcity. Under two hours.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Google Play",
          "url": "https://play.google.com/store/audiobooks/details/The_Serviceberry?id=AQAAAEBS33WfNM"
        }
      },
      {
        "title": "Entangled Life",
        "author": "Merlin Sheldrake",
        "readBy": "the author",
        "length": "9 h 32",
        "what": "Fungi as the hidden networks that connect forests, soils and bodies. A lesson in cooperation.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Apple Books",
          "url": "https://books.apple.com/us/audiobook/entangled-life-how-fungi-make-our-worlds-change-our/id1508660949"
        }
      },
      {
        "title": "Sand Talk",
        "author": "Tyson Yunkaporta",
        "readBy": "the author",
        "length": "7 h 49",
        "what": "How Indigenous patterns of thinking can help us see today's systems differently. Playful and surprising.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Google Play",
          "url": "https://play.google.com/store/audiobooks/details/Sand_Talk_How_Indigenous_Thinking_Can_Save_the_Wor?id=AQAAAEDs8HewiM"
        }
      },
      {
        "title": "Time to Think",
        "author": "Nancy Kline",
        "readBy": "the author",
        "length": "8 h 30",
        "what": "What happens when we truly listen without interrupting. Essential for anyone who accompanies others.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Audible",
          "url": "https://www.audible.co.uk/tag/genre/Consciousness-Thought-Audiobooks/adbl_rec_tag_5-21-2368"
        }
      },
      {
        "title": "The Art of Gathering",
        "author": "Priya Parker",
        "readBy": "Bernadette Dunne",
        "length": "9 h 21",
        "what": "Why so many meetings feel empty, and how a clear purpose changes the way we come together.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Audible",
          "url": "https://www.audible.com/author/Priya-Parker/B07FCNLNB2"
        }
      },
      {
        "title": "The Living Mountain",
        "author": "Nan Shepherd",
        "readBy": "Tilda Swinton",
        "length": "4 h 54",
        "what": "Walking into a mountain rather than up it. Perfect for the trail.",
        "inLibrary": false,
        "libraryTitle": "",
        "listing": {
          "label": "Audible",
          "url": "https://www.audible.com/pd/The-Living-Mountain-Audiobook/1786899361"
        }
      },
      {
        "title": "Doughnut Economics",
        "author": "Kate Raworth",
        "readBy": "the author",
        "length": "10 h 49",
        "what": "Seven shifts in economic thinking, clear enough to follow while walking.",
        "inLibrary": true,
        "libraryTitle": "Doughnut Economics",
        "listing": {
          "label": "Audible",
          "url": "https://www.audible.co.uk/author/Kate-Raworth/B001KID8AK"
        }
      },
      {
        "title": "Thinking in Systems",
        "author": "Donella Meadows",
        "readBy": "Tia Rider Sorensen",
        "length": "6 h 26",
        "what": "The classic primer on stocks, flows and leverage points.",
        "inLibrary": true,
        "libraryTitle": "Thinking in Systems",
        "listing": {
          "label": "Audible",
          "url": "https://www.audible.co.uk/author/Donella-H-Meadows/B001JPC6AC"
        }
      },
      {
        "title": "Active Hope (revised edition)",
        "author": "Joanna Macy & Chris Johnstone",
        "readBy": "C.S.E. Cooney",
        "length": "8 h 15",
        "what": "How to stay engaged with the state of the world without denial or despair.",
        "inLibrary": true,
        "libraryTitle": "Active Hope",
        "listing": {
          "label": "Listening Books",
          "url": "https://www.listening-books.org.uk/book/active-hope/10545"
        }
      },
      {
        "title": "Reinventing Organizations",
        "author": "Frédéric Laloux",
        "readBy": "Seamus Kennedy",
        "length": "14 h 18",
        "what": "Self-management, wholeness and purpose, told through real organisations.",
        "inLibrary": true,
        "libraryTitle": "Reinventing Organizations",
        "listing": {
          "label": "Author's site",
          "url": "https://www.reinventingorganizations.com/purchase.html"
        }
      },
      {
        "title": "A Philosophy of Walking",
        "author": "Frédéric Gros",
        "readBy": "Andrew B. Wehrlen",
        "length": "6 h 08",
        "what": "Rimbaud, Nietzsche, Thoreau, Gandhi: what walking does to thinking.",
        "inLibrary": true,
        "libraryTitle": "A Philosophy of Walking",
        "listing": {
          "label": "Audible",
          "url": "https://www.audible.com/pd/A-Philosophy-of-Walking-Audiobook/B0FSGMGVVZ"
        }
      },
      {
        "title": "The One-Straw Revolution",
        "author": "Masanobu Fukuoka",
        "readBy": "David Shih",
        "length": "5 h 07",
        "what": "Natural farming and the art of doing less.",
        "inLibrary": true,
        "libraryTitle": "The One-Straw Revolution",
        "listing": {
          "label": "Audiobooks.com",
          "url": "https://www.audiobooks.com/audiobook/one-straw-revolution-an-introduction-to-natural-farming/316039"
        }
      }
    ]
  }
};
