import { afterEach, describe, expect, it, vi } from 'vitest';
import { ACCEPT_ALL, CONSENT_COOKIE, CONSENT_VERSION, REFUSE_ALL, readConsent, refreshConsent, saveConsent } from '@/lib/consent';
import { isPublicPixelPath, META_PIXEL_ID, registerMetaPixel, reportMetaPageView } from '@/lib/meta-pixel';

let stop: (() => void) | undefined;
afterEach(() => {
  stop?.(); stop = undefined;
  delete window.fbq; delete window._fbq;
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`;
  history.replaceState({}, '', '/');
});

describe('consent-gated browser Meta Pixel', () => {
  it('sends nothing before a choice, refusal, or analytics/external-only acceptance', () => {
    stop = registerMetaPixel();
    expect(window.fbq).toBeUndefined();
    saveConsent(REFUSE_ALL);
    saveConsent({ analytics: true, external: true, advertising: false });
    expect(window.fbq).toBeUndefined();
    expect(document.head.querySelector('script[data-meta-pixel]')).toBeNull();
  });
  it('initialises only Pixel 2072978403507203 and sends only PageView after advertising consent', () => {
    stop = registerMetaPixel();
    saveConsent({ analytics: false, external: false, advertising: true });
    expect(window.fbq?.queue).toEqual([
      ['set', 'autoConfig', false, '2072978403507203'],
      ['init', '2072978403507203'], ['consent', 'grant'], ['track', 'PageView'],
    ]);
    expect(META_PIXEL_ID).toBe('2072978403507203');
    reportMetaPageView();
    expect(window.fbq?.queue.filter(args => args[0] === 'track')).toHaveLength(1);
    history.replaceState({}, '', '/en/notebook');
    reportMetaPageView();
    expect(window.fbq?.queue.filter(args => args[0] === 'track')).toHaveLength(2);
  });
  it('withdrawal revokes before reload, clears cookies, and preserves acceptance evidence', () => {
    stop = registerMetaPixel();
    saveConsent(ACCEPT_ALL);
    const acceptance = readConsent()?.advertisingAcceptance;
    expect(acceptance?.version).toBe(CONSENT_VERSION);
    document.cookie = '_fbp=example; Path=/';
    document.cookie = '_fbc=example; Path=/';
    const dispatch = vi.fn();
    if (window.fbq) window.fbq.callMethod = dispatch;
    saveConsent(REFUSE_ALL, () => expect(dispatch).toHaveBeenCalledWith('consent', 'revoke'));
    expect(document.cookie).not.toContain('_fbp=');
    expect(document.cookie).not.toContain('_fbc=');
    expect(readConsent()?.advertisingAcceptance).toEqual(acceptance);
    dispatch.mockClear(); reportMetaPageView();
    expect(dispatch).not.toHaveBeenCalled();
  });
  it('reacts to a refusal saved in another tab', () => {
    stop = registerMetaPixel(); saveConsent(ACCEPT_ALL);
    const dispatch = vi.fn();
    if (window.fbq) window.fbq.callMethod = dispatch;
    document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify({ ...readConsent(), advertising: false }))}; Path=/`;
    refreshConsent();
    expect(dispatch).toHaveBeenCalledWith('consent', 'revoke');
  });
  it('never reports learner, admin, authentication or checkout routes', () => {
    for (const path of ['/admin/settings', '/dashboard', '/en/learn/lesson', '/checkout', '/login']) expect(isPublicPixelPath(path)).toBe(false);
    for (const path of ['/', '/en', '/accompagnement', '/carnet/la-robustesse']) expect(isPublicPixelPath(path)).toBe(true);
  });
});