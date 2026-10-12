import { describe, it, expect } from 'vitest';
import { localizePath, langFromPath } from '@/lib/routes';
describe('localized routes', () => {
  it('maps fr to en', () => {
    expect(localizePath('/', 'en')).toBe('/en');
    expect(localizePath('/boussole', 'en')).toBe('/en/compass');
    expect(localizePath('/carnet/thermiques', 'en')).toBe('/en/notebook/thermiques');
    expect(localizePath('/legal#cgv', 'en')).toBe('/en/legal#cgv');
    expect(localizePath('/#letter', 'en')).toBe('/en#letter');
  });
  it('maps en to fr', () => {
    expect(localizePath('/en', 'fr')).toBe('/');
    expect(localizePath('/en/compass', 'fr')).toBe('/boussole');
    expect(localizePath('/en/notebook', 'fr')).toBe('/carnet');
  });
  it('detects language from URL only', () => {
    expect(langFromPath('/')).toBe('fr');
    expect(langFromPath('/en/legal')).toBe('en');
  });
});
