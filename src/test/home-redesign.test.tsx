import { cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import DoorsSection from '@/components/DoorsSection';
import HowItStartsSection from '@/components/HowItStartsSection';
import AboutSection from '@/components/AboutSection';
import HomeNotebookSection from '@/components/HomeNotebookSection';
import WaitlistSection from '@/components/WaitlistSection';
import { getEntries } from '@/lib/carnet';

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class { constructor(_fn: unknown) {} observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const renderAt = (ui: React.ReactElement, route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <LanguageProvider>{ui}</LanguageProvider>
    </MemoryRouter>,
  );

describe('home three doors', () => {
  it('links the three French doors to contact, supervision and boussole', () => {
    renderAt(<DoorsSection />);
    expect(screen.getByRole('link', { name: /Je porte une équipe ou une organisation/ })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /J’accompagne les autres/ })).toHaveAttribute('href', '/supervision');
    expect(screen.getByRole('link', { name: /J’ai besoin de mieux prendre soin de moi/ })).toHaveAttribute('href', '/boussole');
    expect(screen.getByRole('link', { name: 'Lire le Carnet' })).toHaveAttribute('href', '/carnet');
  });

  it('shows the stated prices and English destinations', () => {
    renderAt(<DoorsSection />, '/en');
    expect(screen.getByText('Supervision €680 excl. VAT · Le Cercle €350')).toBeInTheDocument();
    expect(screen.getByText('€77 incl. VAT')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /I lead a team or an organisation/ })).toHaveAttribute('href', '/en/contact');
    expect(screen.getByRole('link', { name: /I support others/ })).toHaveAttribute('href', '/en/supervision');
    expect(screen.getByRole('link', { name: /I need to take better care of myself/ })).toHaveAttribute('href', '/en/compass');
    expect(screen.getByRole('link', { name: 'Read the Notebook' })).toHaveAttribute('href', '/en/notebook');
  });
});

describe('home how it starts', () => {
  it('lists the three steps and links to contact', () => {
    renderAt(<HowItStartsSection />);
    const steps = screen.getByRole('list');
    expect(within(steps).getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByText('Je vous propose un premier pas, ou je vous oriente vers quelqu’un de mieux placé.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'M’écrire' })).toHaveAttribute('href', '/contact');
  });
});

describe('home about section', () => {
  it('keeps only the first paragraph, the Kimmerer quote and four principle titles', () => {
    renderAt(<AboutSection />);
    expect(screen.getByText(/Je m’appelle Josselin Butté/)).toBeInTheDocument();
    expect(screen.queryByText(/Je ne viens pas avec des réponses toutes faites/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Je travaille rarement seul/)).not.toBeInTheDocument();
    expect(screen.getByText(/Tout épanouissement est mutuel/)).toBeInTheDocument();
    expect(screen.getByText('Robin Wall Kimmerer, 2013')).toBeInTheDocument();
    expect(screen.getByText('Co-créer plutôt que prescrire')).toBeInTheDocument();
    expect(screen.getByText('Apprendre en faisant')).toBeInTheDocument();
    expect(screen.queryByText('Les solutions naissent du groupe, pas de l’expert.')).not.toBeInTheDocument();
  });
});

describe('home notebook section', () => {
  it('shows the three most recent notes with links in the current language', () => {
    renderAt(<HomeNotebookSection />);
    const expected = getEntries('fr').slice(0, 3);
    const cards = screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('/carnet/'));
    expect(cards).toHaveLength(3);
    expected.forEach((note, i) => expect(cards[i]).toHaveAttribute('href', `/carnet/${note.slug}`));
    expect(screen.getByRole('link', { name: 'Tout le Carnet' })).toHaveAttribute('href', '/carnet');
  });

  it('uses English slugs under /en/notebook', () => {
    renderAt(<HomeNotebookSection />, '/en');
    const expected = getEntries('en').slice(0, 3);
    const cards = screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('/en/notebook/'));
    expect(cards).toHaveLength(3);
    expected.forEach((note, i) => expect(cards[i]).toHaveAttribute('href', `/en/notebook/${note.slug}`));
  });
});

describe('home journeys line', () => {
  it('reduces to one line with a learn-more link', () => {
    renderAt(<WaitlistSection />);
    expect(screen.getByText('Quelques jours dehors, en petit groupe. Premier séjour au printemps 2027.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'En savoir plus' })).toHaveAttribute('href', '/etapes');
  });
});
