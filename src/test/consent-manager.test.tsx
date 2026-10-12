import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ConsentProvider } from '@/contexts/ConsentContext';
import ConsentManager from '@/components/ConsentManager';
import { CONSENT_COOKIE, readConsent } from '@/lib/consent';

vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
afterEach(() => { cleanup(); document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`; });
const open = (path = '/') => render(<MemoryRouter initialEntries={[path]}><LanguageProvider><ConsentProvider><ConsentManager /></ConsentProvider></LanguageProvider></MemoryRouter>);

describe('visitor consent choices', () => {
  it('closing the first banner records refusal for both purposes', () => {
    open(); fireEvent.click(screen.getByRole('button', { name: 'Fermer et tout refuser' }));
    expect(readConsent()).toMatchObject({ analytics: false, external: false });
  });
  it('customisation starts OFF and saves only the selected purpose', () => {
    open(); fireEvent.click(screen.getByRole('button', { name: 'Personnaliser' }));
    const analytics = screen.getByRole('switch', { name: 'Mesure d’audience' });
    const external = screen.getByRole('switch', { name: 'Contenus externes (vidéos, cartes)' });
    expect(analytics).not.toBeChecked(); expect(external).not.toBeChecked();
    fireEvent.click(external); fireEvent.click(screen.getByRole('button', { name: 'Enregistrer mes choix' }));
    expect(readConsent()).toMatchObject({ analytics: false, external: true });
  });
  it('accept all grants both purposes', () => {
    open('/en'); fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    expect(readConsent()).toMatchObject({ analytics: true, external: true });
  });
});