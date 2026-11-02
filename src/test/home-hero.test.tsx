import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import HeroSection from '@/components/HeroSection';
import DoorsSection from '@/components/DoorsSection';

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', class { constructor(_fn: unknown) {} observe() {} unobserve() {} disconnect() {} });
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const renderAt = (ui: React.ReactElement, route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <LanguageProvider>{ui}</LanguageProvider>
    </MemoryRouter>,
  );

describe('home hero', () => {
  it('shows the new French sentence with three audience links', () => {
    renderAt(<HeroSection />);
    expect(screen.getByRole('button', { name: 'celles et ceux qui dirigent' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'celles et ceux qui accompagnent' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'les personnes qui ont besoin de redéfinir ce qui compte vraiment pour se remettre en mouvement.' })).toBeInTheDocument();
    expect(screen.getByText(/Depuis la vallée d’Arbas, dans les Pyrénées, ailleurs et à distance\./)).toBeInTheDocument();
  });

  it('shows the new English sentence under /en', () => {
    renderAt(<HeroSection />, '/en');
    expect(screen.getByRole('button', { name: 'people who lead' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'people who support others' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'anyone who needs to redefine what truly matters to get moving again.' })).toBeInTheDocument();
    expect(screen.getByText(/From the Arbas Valley in the Pyrenees, elsewhere and online, in English and French\./)).toBeInTheDocument();
  });

  it('selects the matching door in the path component and scrolls to it', () => {
    renderAt(
      <>
        <HeroSection />
        <DoorsSection />
      </>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'celles et ceux qui accompagnent' }));
    expect(screen.getByRole('tab', { name: 'J’accompagne' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Supervision 680 € HT · Le Cercle 350 €')).toBeInTheDocument();
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'celles et ceux qui dirigent' }));
    expect(screen.getByRole('tab', { name: 'Je dirige' })).toHaveAttribute('aria-selected', 'true');
  });

  it('turns the four element icons into labelled buttons', () => {
    renderAt(<HeroSection />);
    expect(screen.getByRole('button', { name: 'Terre' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Eau' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Air' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Feu' })).toBeInTheDocument();
  });

  it('element buttons select doors; fire scrolls to the Carnet section', () => {
    renderAt(
      <>
        <HeroSection />
        <DoorsSection />
      </>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Air' }));
    expect(screen.getByRole('tab', { name: 'Je prends soin de moi' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Feu' }));
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('shows a scroll cue with the doors title', () => {
    renderAt(<HeroSection />);
    expect(screen.getByRole('button', { name: 'Par où voulez-vous commencer ?' })).toBeInTheDocument();
  });
});
