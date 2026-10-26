import { afterEach, describe, expect, it, vi } from 'vitest';
import type { ComponentType, ReactNode } from 'react';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ConsentProvider } from '@/contexts/ConsentContext';
import Carnet from '@/pages/Carnet';
import CarnetEntry from '@/pages/CarnetEntry';
import { CONSENT_COOKIE } from '@/lib/consent';
import { parseCarnetEntry } from '@/lib/carnet';

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

const open = (path: string) => {
  const Page: ComponentType = path.includes('/carnet/') ? CarnetEntry : Carnet;
  const element: ReactNode = <Page />;
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LanguageProvider>
        <ConsentProvider>
          <Routes>
            <Route path="/carnet/:slug" element={element} />
            <Route path="*" element={<Carnet />} />
          </Routes>
        </ConsentProvider>
      </LanguageProvider>
    </MemoryRouter>
  );
};

const before = (a: Element, b: Element) =>
  !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

const quote = (container: HTMLElement) => {
  const q = container.querySelector('main figure blockquote');
  if (!q) throw new Error('citation absente');
  return q;
};

describe('Citation sur l’index du carnet', () => {
  it('sits below the title block and above the thread list', () => {
    const { container } = open('/carnet');
    const main = container.querySelector('main')!;
    const q = quote(container);
    const h1 = main.querySelector('h1')!;
    const threads = [...main.querySelectorAll('p')].find(
      (p) => p.textContent === 'Les fils que je suis'
    )!;
    expect(threads).toBeTruthy();
    expect(before(h1, q)).toBe(true);
    expect(before(q, threads)).toBe(true);
    expect(q.getAttribute('lang')).toBe('fr');
    expect(q.textContent).toContain('Le récit est radical');
  });
});

describe('Quote on the notebook index', () => {
  it('sits below the title block and above the thread list', () => {
    const { container } = open('/en/notebook');
    const main = container.querySelector('main')!;
    const q = quote(container);
    const h1 = main.querySelector('h1')!;
    const threads = [...main.querySelectorAll('p')].find(
      (p) => p.textContent === 'Threads I follow'
    )!;
    expect(threads).toBeTruthy();
    expect(before(h1, q)).toBe(true);
    expect(before(q, threads)).toBe(true);
    expect(q.getAttribute('lang')).toBe('en');
    expect(q.textContent).toContain('Narrative is radical');
  });
});

const NOTES = [
  {
    fr: '/carnet/le-feu-et-la-conversation',
    en: '/en/notebook/fire-and-conversation',
    summaryFr: 'Cet été, dans les Pyrénées',
    summaryEn: 'This summer, in the Pyrenees',
    quoteFr: 'vieilles légendes',
    quoteEn: 'old legends were told',
  },
  {
    fr: '/carnet/thermiques',
    en: '/en/notebook/thermals',
    summaryFr: 'En parapente, on vole',
    summaryEn: 'In paragliding, you fly on an invisible energy',
    quoteFr: 'forme spécialisée du toucher',
    quoteEn: 'specialized form of touch',
  },
  {
    fr: '/carnet/toilettes-seches',
    en: '/en/notebook/dry-toilets',
    summaryFr: 'Chez nous, nous avons remplacé',
    summaryEn: 'At home, we replaced our flush toilet',
    quoteFr: 'L’eau est très précieuse',
    quoteEn: 'The water is very precious',
  },
  {
    fr: '/carnet/la-robustesse',
    en: '/en/notebook/robustness',
    summaryFr: 'La robustesse est partout en France',
    summaryEn: 'Robustness is everywhere in France',
    quoteFr: 'en tissant des réseaux',
    quoteEn: 'by networking',
  },
];

describe('Citations sur les notes (FR)', () => {
  it.each(NOTES)('sits after the title and before the summary of $fr', ({ fr, summaryFr, quoteFr }) => {
    const { container } = open(fr);
    const main = container.querySelector('main')!;
    const q = quote(container);
    const h1 = main.querySelector('h1')!;
    const summary = [...main.querySelectorAll('p')].find((p) =>
      p.textContent!.startsWith(summaryFr)
    )!;
    expect(summary).toBeTruthy();
    expect(before(h1, q)).toBe(true);
    expect(before(q, summary)).toBe(true);
    expect(q.getAttribute('lang')).toBe('fr');
    expect(q.textContent).toContain(quoteFr);
  });
});

describe('Quotes on the notes (EN)', () => {
  it.each(NOTES)('sits after the title and before the summary of $en', ({ en, summaryEn, quoteEn }) => {
    const { container } = open(en);
    const main = container.querySelector('main')!;
    const q = quote(container);
    const h1 = main.querySelector('h1')!;
    const summary = [...main.querySelectorAll('p')].find((p) =>
      p.textContent!.startsWith(summaryEn)
    )!;
    expect(summary).toBeTruthy();
    expect(before(h1, q)).toBe(true);
    expect(before(q, summary)).toBe(true);
    expect(q.getAttribute('lang')).toBe('en');
    expect(q.textContent).toContain(quoteEn);
  });
});

describe('Frontmatter voice field', () => {
  it('is optional and read when present', () => {
    const withoutVoice = parseCarnetEntry(
      '---\ntitle: "Test"\nslug: "test"\nlang: "fr"\nsummary: "s"\n---\nCorps.\n'
    );
    expect(withoutVoice?.voice).toBeUndefined();

    const withVoice = parseCarnetEntry(
      '---\ntitle: "Test"\nslug: "test"\nlang: "fr"\nvoice: "notebook.fire"\nsummary: "s"\n---\nCorps.\n'
    );
    expect(withVoice?.voice).toBe('notebook.fire');
  });
});
