import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ConsentProvider } from '@/contexts/ConsentContext';
import Services from '@/pages/Services';
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

const open = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <ConsentProvider>
          <Services />
        </ConsentProvider>
      </LanguageProvider>
    </MemoryRouter>
  );

/** true si a apparaît avant b dans le document */
const before = (a: Element, b: Element) =>
  !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

const sectionByTitle = (container: HTMLElement, title: string) => {
  const sec = [...container.querySelectorAll('main > section')].find(
    (s) => s.querySelector('h2')?.textContent === title
  );
  if (!sec) throw new Error(`section introuvable : ${title}`);
  return sec;
};

const quotesIn = (sec: Element) =>
  [...sec.querySelectorAll('figure')].filter((f) => f.querySelector('cite'));

type Page = {
  path: string;
  services: { section: string; cite: string }[];
  supervision: string;
  closing: string;
  faq: string;
};

const FR: Page = {
  path: '/accompagnement',
  services: [
    { section: 'Facilitation', cite: 'Nanyehi (Nancy Ward)' },
    { section: 'Conception de programmes', cite: 'Florence Nightingale' },
    { section: 'Coaching', cite: 'Ruth Bader Ginsburg' },
    { section: 'Supervision', cite: 'Simone Weil' },
    { section: 'Médiation', cite: 'Audre Lorde' },
  ],
  supervision: 'Supervision',
  closing: 'Par où commencer',
  faq: 'Questions fréquentes',
};

const EN: Page = {
  path: '/en/services',
  services: [
    { section: 'Facilitation', cite: 'Nanyehi (Nancy Ward)' },
    { section: 'Programme design', cite: 'Florence Nightingale' },
    { section: 'Coaching', cite: 'Ruth Bader Ginsburg' },
    { section: 'Supervision', cite: 'Simone Weil' },
    { section: 'Mediation', cite: 'Audre Lorde' },
  ],
  supervision: 'Supervision',
  closing: 'Where to start',
  faq: 'Frequently asked questions',
};

const describePage = (page: Page) => {
  it('places one quote per service, after the description and before the details', () => {
    const { container } = open(page.path);

    for (const { section, cite } of page.services) {
      const sec = sectionByTitle(container, section);
      const desc = sec.querySelector('p.text-muted-foreground');
      const dl = sec.querySelector('dl');
      const quotes = quotesIn(sec).filter((f) =>
        f.querySelector('cite')!.textContent!.startsWith(cite)
      );
      expect(quotes, section).toHaveLength(1);
      expect(desc, section).not.toBeNull();
      expect(dl, section).not.toBeNull();
      expect(before(desc!, quotes[0]), section).toBe(true);
      expect(before(quotes[0], dl!), section).toBe(true);
    }
  });

  it('keeps the six voices in the page and nowhere else', () => {
    const { container } = open(page.path);
    const cites = [...container.querySelectorAll('main cite')].map((c) =>
      c.textContent!.split(',')[0]
    );
    expect(cites).toEqual([
      'Nanyehi (Nancy Ward)',
      'Florence Nightingale',
      'Ruth Bader Ginsburg',
      'Simone Weil',
      'Wilma Mankiller',
      'Audre Lorde',
    ]);

    expect(quotesIn(sectionByTitle(container, page.closing))).toHaveLength(0);
    expect(quotesIn(sectionByTitle(container, page.faq))).toHaveLength(0);
  });

  it('puts the Le Cercle voice after the supervision voice and before the fees', () => {
    const { container } = open(page.path);
    const sec = sectionByTitle(container, page.supervision);
    const dl = sec.querySelector('dl')!;
    const weil = quotesIn(sec).find((f) =>
      f.querySelector('cite')!.textContent!.startsWith('Simone Weil')
    )!;
    const mankiller = quotesIn(sec).find((f) =>
      f.querySelector('cite')!.textContent!.startsWith('Wilma Mankiller')
    )!;
    expect(weil).toBeTruthy();
    expect(mankiller).toBeTruthy();
    expect(before(weil, mankiller)).toBe(true);
    expect(before(mankiller, dl)).toBe(true);
  });
};

describe('Citations sur /accompagnement', () => describePage(FR));
describe('Quotes on /en/services', () => describePage(EN));
