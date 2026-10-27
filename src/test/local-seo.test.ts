import { describe, it, expect } from 'vitest';
import { localizePath } from '@/lib/routes';
import { SEO } from '@/components/RouteSeo';
import { localContent } from '@/pages/LocalPage';
import { professionalService } from '@/lib/structured-data';

const LOCAL: [string, string][] = [['/coaching', '/en/coaching'], ['/supervision', '/en/supervision'], ['/pyrenees', '/en/pyrenees']];

describe('local SEO pages', () => {
  it('pair FR and EN URLs both ways', () => {
    for (const [fr, en] of LOCAL) {
      expect(localizePath(fr, 'en')).toBe(en);
      expect(localizePath(en, 'fr')).toBe(fr);
    }
    expect(localizePath('/en/services', 'fr')).toBe('/accompagnement');
  });
  it('have titles of 60 characters or fewer and descriptions under 160', () => {
    for (const [path, entry] of Object.entries(SEO)) {
      expect(entry.title.length, path).toBeLessThanOrEqual(60);
      expect(entry.description.length, path).toBeLessThanOrEqual(160);
    }
  });
  it('name the place in the French titles of the local pages', () => {
    for (const [fr] of LOCAL) expect(SEO[fr].title).toMatch(/Pyrénées|Comminges/);
  });
  it('use one H1 per language and keep the published supervision price', () => {
    for (const kind of ['coaching', 'supervision', 'pyrenees'] as const) {
      expect(localContent[kind].fr.h1.length).toBeGreaterThan(20);
      expect(localContent[kind].en.h1.length).toBeGreaterThan(20);
    }
    expect(localContent.supervision.fr.blocks.map((b) => b.paragraphs?.join(' ')).join(' ')).toContain('680 € HT');
  });
  it('publish the Arbas address in the business schema', () => {
    const svc = professionalService() as { address: { streetAddress: string; postalCode: string; addressLocality: string } };
    expect(svc.address).toMatchObject({ streetAddress: '8 route de Barat', postalCode: '31160', addressLocality: 'Arbas' });
  });
});
