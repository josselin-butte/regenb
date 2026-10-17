import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import Contact from '@/pages/Contact';
import { CONSENT_COOKIE, REFUSE_ALL, saveConsent } from '@/lib/consent';
import { contactLeadAfterSuccess, registerMetaPixel } from '@/lib/meta-pixel';

const { invoke } = vi.hoisted(() => ({ invoke: vi.fn() }));
vi.mock('@/integrations/supabase/client', () => ({ supabase: { functions: { invoke } } }));
vi.mock('@/components/Header', () => ({ default: () => null }));
vi.mock('@/components/Footer', () => ({ default: () => null }));
vi.mock('@/hooks/use-toast', () => ({ useToast: () => ({ toast: vi.fn() }) }));
vi.mock('@/contexts/LanguageContext', () => ({ useLanguage: () => ({ language: 'fr', t: (key: string) => ({
  'contact.form.name': 'Nom', 'contact.form.email': 'E-mail', 'contact.form.message': 'Message',
  'contact.form.submit': 'Envoyer le message', 'contact.success.title': 'Message envoyé !',
}[key] ?? key) }) }));
let stop: (() => void) | undefined;
const leads = () => window.fbq?.queue.filter(args => args[0] === 'track' && args[1] === 'Lead') ?? [];
const accept = () => saveConsent({ analytics: false, external: false, advertising: true });
const fill = () => {
  fireEvent.change(screen.getByLabelText('Nom'), { target: { value: 'Test Contact' } });
  fireEvent.change(screen.getByLabelText('E-mail'), { target: { value: 'contact-test@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Automated contact flow test.' } });
};
beforeEach(() => { invoke.mockReset(); stop = registerMetaPixel(); });
afterEach(() => {
  cleanup(); stop?.(); stop = undefined;
  delete window.fbq; delete window._fbq;
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`;
});
describe('contact standard Lead', () => {
  it('sends exactly once after confirmed success is rendered, with no form parameters', async () => {
    accept();
    let resolve: ((value: unknown) => void) | undefined;
    invoke.mockImplementation(() => new Promise(r => { resolve = r; }));
    render(<Contact />); fill();
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer le message' }));
    await waitFor(() => expect(invoke).toHaveBeenCalledTimes(1));
    expect(leads()).toHaveLength(0);
    const dispatch = vi.fn((...args: unknown[]) => {
      if (args[1] === 'Lead') expect(screen.getByRole('heading', { name: 'Message envoyé !' })).toBeTruthy();
    });
    if (window.fbq) window.fbq.callMethod = dispatch;
    resolve?.({ data: { ok: true }, error: null });
    await waitFor(() => expect(dispatch).toHaveBeenCalledWith('track', 'Lead'));
    expect(dispatch.mock.calls.filter(args => args[1] === 'Lead')).toEqual([['track', 'Lead']]);
  });
  it('does not fire on page load or invalid submission', async () => {
    accept(); render(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer le message' }));
    await waitFor(() => expect(screen.getAllByRole('alert').length).toBeGreaterThan(0));
    expect(invoke).not.toHaveBeenCalled(); expect(leads()).toHaveLength(0);
  });
  it.each([
    { data: null, error: new Error('Failed') },
    { data: { ok: false }, error: null },
  ])('does not fire when sending fails or success is not confirmed: %j', async response => {
    accept(); invoke.mockResolvedValue(response); render(<Contact />); fill();
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer le message' }));
    await screen.findByRole('alert'); expect(leads()).toHaveLength(0);
  });
  it('does not replay a successful submission made without advertising consent', async () => {
    invoke.mockResolvedValue({ data: { ok: true }, error: null }); render(<Contact />); fill();
    fireEvent.click(screen.getByRole('button', { name: 'Envoyer le message' }));
    await screen.findByRole('heading', { name: 'Message envoyé !' });
    expect(window.fbq).toBeUndefined(); accept(); expect(leads()).toHaveLength(0);
  });
  it('consumes each callback once and blocks after withdrawal', () => {
    accept(); const success = contactLeadAfterSuccess(); success(); success();
    expect(leads()).toEqual([['track', 'Lead']]);
    const pending = contactLeadAfterSuccess(); saveConsent(REFUSE_ALL, () => {}); pending();
    accept(); pending(); expect(leads()).toHaveLength(0);
  });
});