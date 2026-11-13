import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import ListeningBand from '@/components/ListeningBand';
import { getEntry, firstNoteImage, translateSlug } from '@/lib/carnet';

afterEach(cleanup);

const renderAt = (ui: React.ReactElement, route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <LanguageProvider>{ui}</LanguageProvider>
    </MemoryRouter>,
  );

describe('homepage listening band', () => {
  it('renders in French with the five capacities and a link to the note', () => {
    const { container } = renderAt(<ListeningBand />);
    expect(screen.getByRole('heading', { level: 2, name: 'Écouter, c’est là où le soin commence' })).toBeInTheDocument();
    const items = screen.getByRole('list', { name: 'L’écoute à travers les cinq capacités' }).querySelectorAll('li');
    expect(items).toHaveLength(5);
    expect(screen.getByRole('link', { name: 'Lire la note du Carnet' })).toHaveAttribute('href', '/carnet/ecouter-la-ou-le-soin-commence');
    expect(screen.getByRole('img', { name: 'Un moment d’écoute dans la nature' })).toBeInTheDocument();
    expect(container.querySelector('audio')).toBeNull();
  });

  it('renders in English and links to the English note', () => {
    renderAt(<ListeningBand />, '/en');
    expect(screen.getByRole('heading', { level: 2, name: 'Listening is where care begins' })).toBeInTheDocument();
    expect(screen.getByText('Listening · 04')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read the Notebook note' })).toHaveAttribute('href', '/en/notebook/listening-where-care-begins');
  });

  it('shows a native player, never autoplaying, once a sound is set', () => {
    const { container } = renderAt(<ListeningBand sound={{ src: '/__l5e/assets-v1/x/arbas.mp3', caption: { fr: 'Arbas, le ruisseau', en: 'Arbas, the stream' } }} />);
    const audio = container.querySelector('audio');
    expect(audio).not.toBeNull();
    expect(audio).toHaveAttribute('controls');
    expect(audio).toHaveAttribute('preload', 'none');
    expect(audio).not.toHaveAttribute('autoplay');
    expect(screen.getByText('Arbas, le ruisseau')).toBeInTheDocument();
  });
});

describe('listening note', () => {
  it('exists in both languages, paired, with references and a cover image', () => {
    const fr = getEntry('ecouter-la-ou-le-soin-commence', 'fr');
    const en = getEntry('ecouter-la-ou-le-soin-commence', 'en');
    expect(fr?.title).toBe('Écouter, c’est là où le soin commence');
    expect(en?.slug).toBe('listening-where-care-begins');
    expect(translateSlug('listening-where-care-begins', 'fr')).toBe('ecouter-la-ou-le-soin-commence');
    for (const note of [fr!, en!]) {
      expect(note.body).toMatch(/## Réf[ée]rences|## References/);
      expect(firstNoteImage(note.body)?.src).toContain('etapes-oulan-bat.jpg');
    }
  });
});
