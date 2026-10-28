import { describe, it, expect } from 'vitest';
import { etapesContent } from '@/pages/etapes-content';

describe('Étapes content', () => {
  it('offers the same three independent Étapes in both languages, in seasonal order', () => {
    for (const lang of ['fr', 'en'] as const) {
      expect(etapesContent[lang].etapes.map((e) => e.key)).toEqual(['arbas', 'mazeimard', 'medoc']);
      etapesContent[lang].etapes.forEach((e) => {
        expect(e.question.length).toBeGreaterThan(10);
        expect(Object.values(e.senses).every(Boolean)).toBe(true);
      });
    }
  });
  it('never presents provisional Étapes as bookable', () => {
    const all = JSON.stringify(etapesContent).toLowerCase();
    expect(all).not.toMatch(/réserver|book now|inscrivez-vous/);
    expect(etapesContent.fr.etapes.slice(1).every((e) => e.status === 'En co-conception')).toBe(true);
  });
});
