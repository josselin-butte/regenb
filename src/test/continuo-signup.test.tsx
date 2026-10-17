import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ConsentProvider } from '@/contexts/ConsentContext';
import { CONSENT_COOKIE, REFUSE_ALL, saveConsent } from '@/lib/consent';
import ContinuoSignup from '@/components/ContinuoSignup';
import { act } from 'react';

afterEach(() => { cleanup(); document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`; delete window.fbq; });
const open = () => render(<MemoryRouter><LanguageProvider><ConsentProvider><ContinuoSignup /></ConsentProvider></LanguageProvider></MemoryRouter>);
describe('Continuo external consent', () => {
  it('does not load Substack before choice or with advertising-only consent', () => {
    open(); expect(document.querySelector('iframe')).toBeNull();
    act(() => { saveConsent({ analytics: false, external: false, advertising: true }); });
    expect(document.querySelector('iframe')).toBeNull();
  });
  it('loads the official form only with external consent and removes it before withdrawal reload', () => {
    open();
    act(() => { saveConsent({ analytics: false, external: true, advertising: false }); });
    expect(document.querySelector('iframe')?.src).toBe('https://lecontinuo.substack.com/embed');
    act(() => { saveConsent(REFUSE_ALL, () => expect(document.querySelector('iframe')?.src).toBe('about:blank')); });
    expect(document.querySelector('iframe')).toBeNull();
  });
  it('never sends Lead when the frame loads or emits an apparent success message', () => {
    const dispatch = vi.fn(); window.fbq = Object.assign(dispatch, { queue: [], loaded: true, version: '2.0', push: dispatch }) as unknown as NonNullable<Window['fbq']>;
    open();
    act(() => { saveConsent({ analytics: false, external: true, advertising: true }); });
    window.dispatchEvent(new MessageEvent('message', { origin: 'https://lecontinuo.substack.com', data: { success: true } }));
    expect(dispatch).not.toHaveBeenCalled();
  });
});