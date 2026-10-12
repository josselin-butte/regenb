import { describe, it, expect } from 'vitest';
import { localizePath, langFromPath } from '@/lib/routes';
describe('localized routes', () => {
  it('maps fr to en', () => {
    expect(localizePath('/', 'en')).toBe('/en');
    expect(localizePath('/boussole', 'en')).toBe('/en/compass');
    expect(localizePath('/carnet/la-robustesse', 'en')).toBe('/en/notebook/robustness');
    expect(localizePath('/legal#cgv', 'en')).toBe('/en/legal#cgv');
    expect(localizePath('/#letter', 'en')).toBe('/en#letter');
    expect(localizePath('/cookies', 'en')).toBe('/en/cookies');
  });
  it('maps en to fr', () => {
    expect(localizePath('/en', 'fr')).toBe('/');
    expect(localizePath('/en/compass', 'fr')).toBe('/boussole');
    expect(localizePath('/en/notebook', 'fr')).toBe('/carnet');
    expect(localizePath('/en/cookies', 'fr')).toBe('/cookies');
  });
  it('detects language from URL only', () => {
    expect(langFromPath('/')).toBe('fr');
    expect(langFromPath('/en/legal')).toBe('en');
  });
});

describe('bilingual notebook slugs', () => {
  it('maps thermiques <-> thermals', () => {
    expect(localizePath('/carnet/thermiques', 'en')).toBe('/en/notebook/thermals');
    expect(localizePath('/en/notebook/thermals', 'fr')).toBe('/carnet/thermiques');
  });
});
