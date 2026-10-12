import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { legacyLegalDestination } from '@/lib/legal';
import { localizePath } from '@/lib/routes';

describe('separate legal pages', () => {
  it('redirects /legal to /mentions-legales and its English equivalent', () => {
    expect(legacyLegalDestination('fr')).toBe('/mentions-legales');
    expect(legacyLegalDestination('en')).toBe('/en/legal-notice');
  });
  it('keeps legacy privacy and terms section links usable', () => {
    expect(legacyLegalDestination('fr', '#confidentialite')).toBe('/confidentialite');
    expect(legacyLegalDestination('en', '#confidentialite')).toBe('/en/privacy');
    expect(legacyLegalDestination('fr', '#cgv')).toBe('/cgv');
    expect(legacyLegalDestination('en', '#cgv')).toBe('/en/terms');
  });
  it.each([
    ['/mentions-legales', '/en/legal-notice'],
    ['/confidentialite', '/en/privacy'],
    ['/cgv', '/en/terms'],
    ['/cookies', '/en/cookies'],
  ])('maps %s and %s in both directions', (fr, en) => {
    expect(localizePath(fr, 'en')).toBe(en);
    expect(localizePath(en, 'fr')).toBe(fr);
  });
  it('indexes all eight separate pages, excluding legacy redirect URLs', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    for (const path of ['/mentions-legales', '/en/legal-notice', '/confidentialite', '/en/privacy', '/cgv', '/en/terms', '/cookies', '/en/cookies']) {
      expect(xml).toContain(`<loc>https://www.regenb.fr${path}</loc>`);
    }
    expect(xml).not.toContain('<loc>https://www.regenb.fr/legal</loc>');
    expect(xml).not.toContain('<loc>https://www.regenb.fr/en/legal</loc>');
  });
});