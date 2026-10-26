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

const describePage = (path: string, titles: Record<string, string>) => {
  it('places one quote per service, after the description and before the details', () => {
    const { container } = open(path);

    for (const [title, citeStart] of Object.entries(titles)) {
      const sec = sectionByTitle(container, title);
      const desc = sec.querySelector('p.text-muted-foreground');
      const dl = sec.querySelector('dl');
      const quotes = quotesIn(sec).filter((f) =>
        f.querySelector('cite')!.textContent!.startsWith(citeStart)
      );
      expect(quotes, title).toHaveLength(1);
      expect(desc, title).not.toBeNull();
      expect(dl, title).not.toBeNull();
      expect(before(desc!, quotes[0]), title).toBe(true);
      expect(before(quotes[0], dl!), title).toBe(true);
    }
  });

  it('keeps the six voices in the page and nowhere else', () => {
    const { container } = open(path);
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

    const closing = sectionByTitle(container, titles.closing);
    const faq = sectionByTitle(container, titles.faq);
    expect(quotesIn(closing)).toHaveLength(0);
    expect(quotesIn(faq)).toHaveLength(0);
  });

  it('puts the Le Cercle voice after the supervision voice and before the fees', () => {
    const { container } = open(path);
    const sec = sectionByTitle(container, titles.supervision);
    const dl = sec.querySelector('dl')!;
    const weil = quotesIn(sec).find((f) => f.querySelector('cite')!.textContent!.startsWith('Simone Weil'))!;
    const mankiller = quotesIn(sec).find((f) => f.querySelector('cite')!.textContent!.startsWith('Wilma Mankiller'))!;
    expect(weil).toBeTruthy();
    expect(mankiller).toBeTruthy();
    expect(before(weil, mankiller)).toBe(true);
    expect(before(mankiller, dl)).toBe(true);
  });
};

describe('Citations sur /accompagnement', () => {
  describePage('/accompagnement', {
    facilitation: 'Facilitation',
    programmes: 'Conception de programmes',
    coaching: 'Coaching',
    supervision: 'Supervision',
    mediation: 'Médiation',
    closing: 'Par où commencer',
    faq: 'Questions fréquentes',
  } as Record<string, string>);
});

describe('Quotes on /en/services', () => {
  describePage('/en/services', {
    facilitation: 'Facilitation',
    programmes: 'Programme design',
    coaching: 'Coaching',
    supervision: 'Supervision',
    mediation: 'Mediation',
    closing: 'Where to start',
    faq: 'Frequently asked questions',
  } as Record<string, string>);
});
