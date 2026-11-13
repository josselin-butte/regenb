import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Library from '@/pages/Library';
import type { ReactNode } from 'react';

vi.mock('@/components/carnet/SelectionLayout', () => ({
  default: ({ children }: { children: ReactNode }) => <main>{children}</main>,
  SelectionLinks: () => null,
  RelatedNote: () => null,
}));

beforeEach(() => {
  Object.defineProperty(document, 'fonts', { configurable: true, value: { ready: Promise.resolve() } });
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(cleanup);

describe('Library filters after fragment navigation', () => {
  it.each([
    ['fr', '/carnet/bibliotheque', 'Régénération', 'a-ecouter-en-chemin', 8],
    ['en', '/en/notebook/library', 'Regeneration', 'listen-on-the-way', 13],
  ])('keeps the selected theme with a book fragment and leaves %s audiobooks unfiltered', async (_lang, path, filter, sectionId, audioCount) => {
    const { container } = render(<MemoryRouter initialEntries={[`${path}#library-book-9781781682708`]}>
      <LanguageProvider><Library /></LanguageProvider>
    </MemoryRouter>);
    await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled());
    fireEvent.click(screen.getByRole('button', { name: filter }));
    await new Promise(resolve => setTimeout(resolve, 40));
    expect(container.querySelectorAll('article[id^="library-book-"]')).toHaveLength(3);
    expect(container.querySelector(`#${sectionId}`)?.querySelectorAll('article')).toHaveLength(audioCount);
    expect(screen.getByRole('button', { name: filter })).toHaveAttribute('aria-pressed', 'true');
  });
  it.each([
    ['fr', '/carnet/bibliotheque', 'Musique et écoute'],
    ['en', '/en/notebook/library', 'Music and listening'],
  ])('shows the eight music and listening books in %s', async (_lang, path, filter) => {
    const { container } = render(<MemoryRouter initialEntries={[path]}>
      <LanguageProvider><Library /></LanguageProvider>
    </MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: filter }));
    await waitFor(() => expect(container.querySelectorAll('article[id^="library-book-"]')).toHaveLength(8));
    expect(screen.getByRole('button', { name: filter })).toHaveAttribute('aria-pressed', 'true');
  });
});
