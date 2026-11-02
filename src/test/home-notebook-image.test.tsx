import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import HomeNotebookSection from '@/components/HomeNotebookSection';
import { firstNoteImage } from '@/lib/carnet';

const { IMAGE_ALT, IMAGE_SRC } = vi.hoisted(() => ({
  IMAGE_ALT: 'Josselin au col de la Hourquette',
  IMAGE_SRC: 'https://www.regenb.fr/__l5e/assets-v1/00000000-0000-0000-0000-000000000000/photo.webp',
}));

vi.mock('@/lib/carnet', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/carnet')>();
  const real = actual.getEntries('fr');
  const withImage = { ...real[0], body: `Une première ligne.\n\n![${IMAGE_ALT}](${IMAGE_SRC})\n\n${real[0].body}` };
  return { ...actual, getEntries: (lang: 'fr' | 'en') => (lang === 'fr' ? [withImage, ...real.slice(1)] : actual.getEntries(lang)) };
});

const stubMotion = () => {
  vi.stubGlobal('IntersectionObserver', class { constructor(_fn: unknown) {} observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
};
stubMotion();
afterEach(() => { cleanup(); vi.unstubAllGlobals(); stubMotion(); });

const renderHome = () =>
  render(
    <MemoryRouter initialEntries={['/']}>
      <LanguageProvider>
        <HomeNotebookSection />
      </LanguageProvider>
    </MemoryRouter>,
  );

describe('home notebook card image rule', () => {
  it('takes the first Markdown image of a note body', () => {
    expect(firstNoteImage(`Avant.\n\n![${IMAGE_ALT}](${IMAGE_SRC})\n\n![deuxième](https://exemple.org/autre.webp)`)).toEqual({
      alt: IMAGE_ALT,
      src: IMAGE_SRC,
    });
  });

  it('finds no image when the note has none', () => {
    expect(firstNoteImage('Un texte sans image, ni lien : [lien](https://exemple.org).')).toBeUndefined();
  });

  it('shows the first image at the top of the card, 3:2, cover, lazy', () => {
    const { container } = renderHome();
    const first = container.querySelectorAll('li > a')[0];
    const img = first.querySelector('img');
    expect(img).not.toBeNull();
    expect(img).toHaveAttribute('src', IMAGE_SRC);
    expect(img).toHaveAttribute('alt', IMAGE_ALT);
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img?.parentElement?.className).toContain('aspect-[3/2]');
    expect(img?.className).toContain('object-cover');
    expect(first.querySelector('svg')).toBeNull();
  });

  it('keeps the element icon when the note has no image', () => {
    const { container } = renderHome();
    const second = container.querySelectorAll('li > a')[1];
    expect(second.querySelector('img')).toBeNull();
    expect(second.querySelector('svg')).not.toBeNull();
  });
});
