import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
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
  it('starts on the earth door and switches doors via the station tabs', () => {
    renderAt(<DoorsSection />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('link', { name: 'Parlons-en 30 minutes, gratuitement' })).toHaveAttribute('href', '/contact');
    fireEvent.click(tabs[1]);
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Supervision 680 € HT · Le Cercle 350 €')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Découvrir la supervision' })).toHaveAttribute('href', '/supervision');
    fireEvent.click(tabs[2]);
    expect(screen.getByText('77 € TTC')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Découvrir la Boussole' })).toHaveAttribute('href', '/boussole');
    expect(screen.getByRole('link', { name: 'Lire le Carnet' })).toHaveAttribute('href', '/carnet');
  });

  it('uses English station labels, eyebrows and destinations', () => {
    renderAt(<DoorsSection />, '/en');
    expect(screen.getByRole('tab', { name: 'I lead' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'I support others' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'I care for myself' })).toBeInTheDocument();
    expect(screen.getByText('Earth · Teams & organisations')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'I support others' }));
    expect(screen.getByText('Water · Those who support others')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Discover supervision' })).toHaveAttribute('href', '/en/supervision');
    fireEvent.click(screen.getByRole('tab', { name: 'I care for myself' }));
    expect(screen.getByRole('link', { name: 'Discover the Compass' })).toHaveAttribute('href', '/en/compass');
    expect(screen.getByRole('link', { name: 'Read the Notebook' })).toHaveAttribute('href', '/en/notebook');
  });

  it('moves between doors with the arrow keys', () => {
    renderAt(<DoorsSection />);
    const tabs = screen.getAllByRole('tab');
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(tabs[1], { key: 'ArrowLeft' });
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
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
