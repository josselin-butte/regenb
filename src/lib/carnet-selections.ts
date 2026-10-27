import type { Track, Playlist } from '@/data/listening';
import type { Book, BookTheme } from '@/data/library';
import { getEntries } from '@/lib/carnet';

export type SelectionLang = 'fr' | 'en';
export interface SelectionLink { label: string; href: string; accessibleLabel: string }

/** Remove a provider here to remove its links everywhere. No provider is loaded by these links. */
export const listeningProviders = {
  qobuz: {
    label: { fr: 'Qobuz', en: 'Qobuz' },
    search: (query: string, lang: SelectionLang) => `https://www.qobuz.com/${lang === 'fr' ? 'fr-fr' : 'us-en'}/search?q=${encodeURIComponent(query)}`,
  },
  youtube: {
    label: { fr: 'YouTube (gratuit)', en: 'YouTube (free)' },
    search: (query: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
  },
  bandcamp: { label: { fr: "Bandcamp — soutenir l'artiste", en: 'Bandcamp — support the artist' } },
};

export const trackText = (track: Track, lang: SelectionLang) => ({
  title: lang === 'en' ? track.titleEn || track.title : track.title,
  artist: lang === 'en' ? track.artistEn || track.artist : track.artist,
  // Supplied bilingual album descriptions retain their exact language-specific wording.
  album: track.album?.includes(' / ') ? track.album.split(' / ')[lang === 'fr' ? 0 : 1] : track.album,
});

export function trackLinks(track: Track, lang: SelectionLang): SelectionLink[] {
  const { title, artist } = trackText(track, lang);
  const query = `${artist} ${title}`;
  return Object.entries(listeningProviders).flatMap(([provider, config]) => {
    const href = 'search' in config ? config.search(query, lang) : track.bandcamp;
    if (!href) return [];
    return [{ label: config.label[lang], href, accessibleLabel: lang === 'fr'
      ? `Écouter ${title} de ${artist} sur ${provider === 'youtube' ? 'YouTube' : provider === 'qobuz' ? 'Qobuz' : 'Bandcamp'} (nouvel onglet)`
      : `Listen to ${title} by ${artist} on ${provider === 'youtube' ? 'YouTube' : provider === 'qobuz' ? 'Qobuz' : 'Bandcamp'} (new tab)` }];
  });
}

const independentBookshop = (isbn: string) => `https://www.librairiesindependantes.com/product/search/?query=${encodeURIComponent(isbn)}`;
export function bookLinks(book: Book, lang: SelectionLang): SelectionLink[] {
  const title = book[lang].title;
  if (lang === 'fr') {
    const isbn = book.isbnFr || book.isbnEn;
    return isbn ? [{ label: 'Trouver chez un libraire indépendant', href: independentBookshop(isbn), accessibleLabel: `Trouver ${title} de ${book.author} chez un libraire indépendant (nouvel onglet)` }] : [];
  }
  return book.isbnEn ? [
    { label: 'Book details (Open Library)', href: `https://openlibrary.org/isbn/${book.isbnEn}`, accessibleLabel: `Book details for ${title} by ${book.author} on Open Library (new tab)` },
    { label: 'Order from an independent bookshop in France', href: independentBookshop(book.isbnEn), accessibleLabel: `Order ${title} by ${book.author} from an independent bookshop in France (new tab)` },
  ] : [];
}

// Editorial references in the supplied data are labels, not canonical slugs.
const noteAliases: Record<string, string> = {
  'Ce que le feu fait à une conversation / Fire and conversation': 'le-feu-et-la-conversation',
  "Ce que les thermiques m'apprennent sur l'énergie d'un groupe / Thermals and group energy": 'thermiques',
  'Robustesse / Robustness': 'la-robustesse',
};
export function relatedEntry(reference: string | undefined, lang: SelectionLang) {
  if (!reference) return undefined;
  const entries = getEntries(lang);
  const key = noteAliases[reference] ?? reference;
  return entries.find(entry => entry.lang === lang && (entry.key === key || entry.slug === key || entry.title === key));
}

export const filterBooks = (books: Book[], theme: BookTheme | 'all') => theme === 'all' ? books : books.filter(book => book.theme === theme);
export const shortDescription = (lead: string) => {
  if (lead.length < 155) return lead;
  const first = lead.split(/(?<=\.)\s/)[0];
  if (first.length < 155) return first;
  return `${lead.slice(0, 153).replace(/\s+\S*$/, '')}…`;
};

export const playlistSchema = (playlist: Playlist, lang: SelectionLang) => ({
  '@context': 'https://schema.org', '@type': 'ItemList', name: playlist[lang].title,
  numberOfItems: playlist.tracks.length,
  itemListElement: playlist.tracks.map((track, index) => {
    const text = trackText(track, lang);
    return { '@type': 'ListItem', position: index + 1, item: { '@type': 'MusicRecording', name: text.title, byArtist: { '@type': 'MusicGroup', name: text.artist } } };
  }),
});
export const librarySchema = (books: Book[], lang: SelectionLang) => ({
  '@context': 'https://schema.org', '@type': 'ItemList', name: lang === 'fr' ? 'Bibliothèque' : 'Library', numberOfItems: books.length,
  itemListElement: books.map((book, index) => ({ '@type': 'ListItem', position: index + 1, item: {
    '@type': 'Book', name: book[lang].title, author: { '@type': 'Person', name: book.author },
    isbn: lang === 'fr' ? book.isbnFr || book.isbnEn : book.isbnEn,
    inLanguage: lang === 'fr' && book.isbnFr ? 'fr' : 'en',
  } })),
});