import { describe, expect, it } from 'vitest';
import { audiobooks } from '@/data/audiobooks';
import { library } from '@/data/library';
import { audiobookSchema, matchingLibraryBook } from '@/lib/audiobooks';
import { localizePath } from '@/lib/routes';

describe('Library audiobook rules', () => {
  it('keeps the distinct eight French and thirteen English selections', () => {
    expect(audiobooks.fr.items).toHaveLength(8);
    expect(audiobooks.en.items).toHaveLength(13);
    expect(audiobooks.fr.items[0].title).toBe('Marcher, une philosophie');
    expect(audiobooks.en.items[0].title).toBe('Braiding Sweetgrass');
  });
  it('matches only titles in the current language, omitting missing books', () => {
    expect(matchingLibraryBook(audiobooks.fr.items[0], library.books, 'fr')?.author).toBe('Frédéric Gros');
    expect(matchingLibraryBook(audiobooks.fr.items[0], library.books, 'en')).toBeUndefined();
    expect(matchingLibraryBook(audiobooks.en.items[0], [], 'en')).toBeUndefined();
    expect(audiobooks.en.items.filter(item => matchingLibraryBook(item, library.books, 'en'))).toHaveLength(7);
  });
  it('translates the section anchor in both directions without affecting other pages', () => {
    expect(localizePath('/carnet/bibliotheque#a-ecouter-en-chemin', 'en')).toBe('/en/notebook/library#listen-on-the-way');
    expect(localizePath('/en/notebook/library#listen-on-the-way', 'fr')).toBe('/carnet/bibliotheque#a-ecouter-en-chemin');
    expect(localizePath('/carnet#about', 'en')).toBe('/en/notebook#about');
  });
  it('describes each language as Books in audiobook format with optional narrators', () => {
    for (const lang of ['fr', 'en'] as const) {
      const schema = audiobookSchema(audiobooks[lang], lang);
      expect(schema.numberOfItems).toBe(lang === 'fr' ? 8 : 13);
      expect(schema.itemListElement.every(entry => entry.item['@type'] === 'Book' && entry.item.bookFormat === 'https://schema.org/AudiobookFormat' && entry.item.inLanguage === lang)).toBe(true);
    }
    const schema = audiobookSchema({ lead: '', closing: '', items: [{ ...audiobooks.fr.items[0], readBy: '' }] }, 'fr');
    expect(schema.itemListElement[0].item).not.toHaveProperty('readBy');
  });
  it('keeps the supplied author/category listing URLs unchanged', () => {
    expect(audiobooks.fr.items[1].listing.url).toBe('https://www.audible.com/author/Alain-Damasio/B004MQH6OQ');
    expect(audiobooks.en.items[4].listing.url).toBe('https://www.audible.co.uk/tag/genre/Consciousness-Thought-Audiobooks/adbl_rec_tag_5-21-2368');
  });
});