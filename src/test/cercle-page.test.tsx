import { describe, it, expect } from 'vitest';
import { localizePath } from '@/lib/routes';
import { SEO } from '@/components/RouteSeo';
import { cercleContent } from '@/pages/Cercle';
import { readFileSync } from 'fs';

describe('Le Cercle page', () => {
  it('switches language both ways', () => {
    expect(localizePath('/le-cercle', 'en')).toBe('/en/the-circle');
    expect(localizePath('/en/the-circle', 'fr')).toBe('/le-cercle');
  });
  it('is indexable with its own SEO on both routes', () => {
    expect(SEO['/le-cercle'].noindex).toBeFalsy();
    expect(SEO['/en/the-circle'].description).toContain('€350 excl. VAT');
    expect(SEO['/le-cercle'].description).toContain('350 € HT');
  });
  it('is in the sitemap', () => {
    const xml = readFileSync('public/sitemap.xml', 'utf8');
    expect(xml).toContain('<loc>https://www.regenb.fr/le-cercle</loc>');
    expect(xml).toContain('<loc>https://www.regenb.fr/en/the-circle</loc>');
  });
  it('shows the three dates and price', () => {
    expect(cercleContent.fr.facts).toEqual(expect.arrayContaining(['Jeudi 17 décembre 2026', 'Jeudi 21 janvier 2027', 'Jeudi 11 mars 2027', '350 € HT les trois rencontres']));
    expect(cercleContent.en.facts).toContain('€350 excl. VAT for all three sessions');
  });
});
