import { describe, expect, it } from 'vitest';
import { listening } from '@/data/listening';
import { library } from '@/data/library';
import { bookLinks, filterBooks, librarySchema, playlistSchema, relatedEntry, shortDescription, trackLinks, trackText } from '@/lib/carnet-selections';
import { localizePath } from '@/lib/routes';

describe('notebook selection rules', () => {
  it('contains three playlists of eight tracks and ten books', () => {
    expect(listening.playlists.map(p => p.tracks.length)).toEqual([8, 8, 8]);
    expect(library.books).toHaveLength(10);
  });
  it('maps each selection page to its exact bilingual equivalent', () => {
    expect(localizePath('/carnet/ecoutes', 'en')).toBe('/en/notebook/listening');
    expect(localizePath('/en/notebook/listening', 'fr')).toBe('/carnet/ecoutes');
    expect(localizePath('/carnet/bibliotheque', 'en')).toBe('/en/notebook/library');
    expect(localizePath('/en/notebook/library', 'fr')).toBe('/carnet/bibliotheque');
  });
  it('maps all three playlist anchors', () => {
    expect(localizePath('/carnet/ecoutes#autour-du-feu', 'en')).toBe('/en/notebook/listening#around-the-fire');
    expect(localizePath('/carnet/ecoutes#marcher', 'en')).toBe('/en/notebook/listening#walking');
    expect(localizePath('/en/notebook/listening#voice-and-breath', 'fr')).toBe('/carnet/ecoutes#voix-et-souffle');
  });
  it('encodes search text using the selected title and artist', () => {
    const track = { title: 'Vêpres', artist: 'Sergueï', titleEn: 'Vigil', artistEn: 'Sergei', fr: '', en: '' };
    expect(trackLinks(track, 'fr')[0].href).toBe('https://www.qobuz.com/fr-fr/search?q=Sergue%C3%AF%20V%C3%AApres');
    expect(trackLinks(track, 'en')[0].href).toBe('https://www.qobuz.com/us-en/search?q=Sergei%20Vigil');
    expect(trackLinks(track, 'en')[1].href).toBe('https://www.youtube.com/results?search_query=Sergei%20Vigil');
    expect(trackText({ ...track, titleEn: undefined, artistEn: undefined }, 'en').title).toBe('Vêpres');
  });
  it('adds Bandcamp only when supplied and preserves the direct URL', () => {
    const track = listening.playlists[0].tracks[0];
    expect(trackLinks(track, 'fr')).toHaveLength(2);
    expect(trackLinks({ ...track, bandcamp: 'https://lhasadesela.bandcamp.com/album/la-llorona' }, 'fr')[2].href).toBe('https://lhasadesela.bandcamp.com/album/la-llorona');
  });
  it('leaves whole-playlist links absent initially', () => {
    expect(listening.playlists.map(p => Boolean(p.qobuzPlaylistUrl))).toEqual([false, false, false]);
  });
  it('uses French ISBN when present and falls back to English', () => {
    expect(bookLinks(library.books[1], 'fr')[0].href).toBe('https://www.librairiesindependantes.com/product/search/?query=9782259268080');
    expect(bookLinks(library.books[0], 'fr')[0].href).toBe('https://www.librairiesindependantes.com/product/search/?query=9781909470774');
  });
  it('uses only English ISBN for English book links', () => {
    expect(bookLinks(library.books[1], 'en').map(link => link.href)).toEqual(['https://openlibrary.org/isbn/9781847941398', 'https://www.librairiesindependantes.com/product/search/?query=9781847941398']);
  });
  it('filters each theme and restores all books', () => {
    expect(filterBooks(library.books, 'all')).toHaveLength(10);
    expect(filterBooks(library.books, 'regeneration')).toHaveLength(3);
    expect(filterBooks(library.books, 'systemes')).toHaveLength(3);
    expect(filterBooks(library.books, 'organisations')).toHaveLength(2);
    expect(filterBooks(library.books, 'terre')).toHaveLength(1);
    expect(filterBooks(library.books, 'marche')).toHaveLength(1);
  });
  it('resolves only existing related notes in the correct language', () => {
    expect(relatedEntry(listening.playlists[0].relatedNote, 'fr')?.slug).toBe('le-feu-et-la-conversation');
    expect(relatedEntry(listening.playlists[1].relatedNote, 'en')?.slug).toBe('thermals');
    expect(relatedEntry(library.books[0].relatedNote, 'en')?.slug).toBe('robustness');
    expect(relatedEntry('Marche et montagne / Walking and mountains', 'fr')).toBeUndefined();
    expect(relatedEntry('', 'en')).toBeUndefined();
  });
  it('describes recording artists and the actual book edition language', () => {
    const playlist = playlistSchema(listening.playlists[0], 'en');
    expect(playlist.itemListElement[0].item.name).toBe('Diaraby');
    expect(playlist.itemListElement[0].item.byArtist.name).toBe('Ali Farka Touré & Ry Cooder');
    const books = librarySchema(library.books, 'fr');
    expect(books.itemListElement[0].item.inLanguage).toBe('en');
    expect(books.itemListElement[1].item.inLanguage).toBe('fr');
    expect(books.itemListElement[1].item.isbn).toBe('9782259268080');
  });
  it('keeps descriptions below 155 characters', () => {
    for (const intro of [...Object.values(listening.intro), ...Object.values(library.intro)]) expect(shortDescription(intro.lead).length).toBeLessThan(155);
  });
});