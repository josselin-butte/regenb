import type { Audiobook, AudiobookSelection } from '@/data/audiobooks';
import type { Book } from '@/data/library';
import type { Lang } from '@/lib/routes';

export const audiobookSectionId = (lang: Lang) => lang === 'fr' ? 'a-ecouter-en-chemin' : 'listen-on-the-way';
export const audiobookCardId = (lang: Lang, index: number) => `${audiobookSectionId(lang)}-${index + 1}`;
export const libraryBookId = (book: Book) => `library-book-${book.isbnEn}`;
export const matchingLibraryBook = (item: Audiobook, books: Book[], lang: Lang) =>
  item.libraryTitle ? books.find(book => book[lang].title === item.libraryTitle) : undefined;

export const audiobookSchema = (selection: AudiobookSelection, lang: Lang) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: lang === 'fr' ? 'À écouter en chemin' : 'Listening on the way',
  numberOfItems: selection.items.length,
  itemListElement: selection.items.map((item, index) => ({
    '@type': 'ListItem', position: index + 1,
    item: {
      '@type': 'Book', name: item.title,
      author: { '@type': 'Person', name: item.author },
      ...(item.readBy ? { readBy: { '@type': 'Person', name: item.readBy } } : {}),
      bookFormat: 'https://schema.org/AudiobookFormat', inLanguage: lang,
    },
  })),
});