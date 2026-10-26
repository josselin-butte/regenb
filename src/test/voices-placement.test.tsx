import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ConsentProvider } from '@/contexts/ConsentContext';
import Etapes from '@/pages/Etapes';
import Compass from '@/pages/Compass';
import { CONSENT_COOKIE } from '@/lib/consent';

vi.stubGlobal('ResizeObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
});
vi.stubGlobal('IntersectionObserver', class {
  observe() {}
  unobserve() {}
  disconnect() {}
});

afterEach(() => {
  cleanup();
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`;
});

const open = (path: string, Page: React.ComponentType) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <ConsentProvider>
          <Page />
        </ConsentProvider>
      </LanguageProvider>
    </MemoryRouter>
  );

const before = (a: Element, b: Element) =>
  !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

const quote = (container: HTMLElement) => {
  const q = container.querySelector('main figure blockquote');
  if (!q) throw new Error('citation absente');
  return q;
};

describe('Citation sur /etapes', () => {
  it('sits after the introduction and before the journey programme', () => {
    const { container } = open('/etapes', Etapes);
    const main = container.querySelector('main')!;
    const q = quote(container);
    const intro = [...main.querySelectorAll('p')].find((p) =>
      p.textContent!.startsWith("Une étape, c'est un petit groupe")
    )!;
    const programme = main.querySelector('h2')!;
    expect(intro).toBeTruthy();
    expect(before(intro, q)).toBe(true);
    expect(before(q, programme)).toBe(true);
    expect(q.getAttribute('lang')).toBe('fr');
    expect(q.textContent).toContain('la montagne se donne le plus pleinement');
  });
});

describe('Quote on /en/journeys', () => {
  it('sits after the introduction and before the journey programme', () => {
    const { container } = open('/en/journeys', Etapes);
    const main = container.querySelector('main')!;
    const q = quote(container);
    const intro = [...main.querySelectorAll('p')].find((p) =>
      p.textContent!.startsWith('A journey is a small group')
    )!;
    const programme = main.querySelector('h2')!;
    expect(intro).toBeTruthy();
    expect(before(intro, q)).toBe(true);
    expect(before(q, programme)).toBe(true);
    expect(q.getAttribute('lang')).toBe('en');
    expect(q.textContent).toContain('the mountain gives itself most completely');
  });
});

describe('Citation sur /boussole', () => {
  it('sits right after the title block and before the six steps', () => {
    const { container } = open('/boussole', Compass);
    const main = container.querySelector('main')!;
    const q = quote(container);
    const title = [...main.querySelectorAll('h2')].find(
      (h) => h.textContent === 'Retrouver son nord'
    )!;
    const steps = main.querySelector('ol')!;
    expect(title).toBeTruthy();
    expect(before(title, q)).toBe(true);
    expect(before(q, steps)).toBe(true);
    expect(q.getAttribute('lang')).toBe('fr');
    expect(q.textContent).toContain('Ce temps, c’est maintenant');
    expect(main.querySelector('audio')).toBeTruthy();
  });
});

describe('Quote on /en/compass', () => {
  it('sits right after the title block and before the six steps', () => {
    const { container } = open('/en/compass', Compass);
    const main = container.querySelector('main')!;
    const q = quote(container);
    const title = [...main.querySelectorAll('h2')].find(
      (h) => h.textContent === 'Finding true north'
    )!;
    const steps = main.querySelector('ol')!;
    expect(title).toBeTruthy();
    expect(before(title, q)).toBe(true);
    expect(before(q, steps)).toBe(true);
    expect(q.getAttribute('lang')).toBe('en');
    expect(q.textContent).toContain('That time is now');
    expect(main.querySelector('audio')).toBeTruthy();
  });
});
