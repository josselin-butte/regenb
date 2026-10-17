import { afterEach, describe, expect, it, vi } from 'vitest';
import { ACCEPT_ALL, CONSENT_COOKIE, CONSENT_VERSION, REFUSE_ALL, deleteOptionalCookies, getConsent, onConsentChange, parseConsent, readConsent, registerOptionalService, saveConsent, sixMonthsAfter } from '@/lib/consent';

afterEach(() => {
  document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`;
  vi.useRealTimers();
});

describe('consent rules', () => {
  it('defaults both optional purposes to OFF before a choice', () => {
    expect(readConsent()).toBeNull();
    expect(getConsent('analytics')).toBe(false);
    expect(getConsent('external')).toBe(false);
  });
  it('stores refusal with date and banner version in regenb_consent', () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-12T19:48:00Z'));
    saveConsent(REFUSE_ALL);
    expect(document.cookie).toContain('regenb_consent=');
    expect(readConsent()).toEqual({ analytics: false, external: false, advertising: false, version: CONSENT_VERSION, date: '2026-10-12T19:48:00.000Z', expires: '2027-04-12T19:48:00.000Z' });
  });
  it('stores acceptance for exactly six calendar months, then asks again', () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-12T19:48:00Z'));
    const record = saveConsent(ACCEPT_ALL);
    const cookie = encodeURIComponent(JSON.stringify(record));
    expect(parseConsent(cookie, new Date('2027-04-12T19:47:59Z'))?.analytics).toBe(true);
    expect(parseConsent(cookie, new Date('2027-04-12T19:48:00Z'))).toBeNull();
  });
  it('clamps six-month expiry at the end of shorter months', () => {
    expect(sixMonthsAfter(new Date('2026-08-31T10:00:00Z')).toISOString()).toBe('2027-02-28T10:00:00.000Z');
  });
  it('rejects an old banner version and malformed consent', () => {
    const record = saveConsent(ACCEPT_ALL);
    expect(parseConsent(encodeURIComponent(JSON.stringify({ ...record, version: CONSENT_VERSION - 1 })))).toBeNull();
    expect(parseConsent('%invalid')).toBeNull();
    expect(parseConsent(encodeURIComponent(JSON.stringify({ ...record, analytics: 'yes' })))).toBeNull();
  });
  it('grants each purpose independently and notifies subscribers', () => {
    const listener = vi.fn(); const unsubscribe = onConsentChange(listener);
    saveConsent({ analytics: false, external: true, advertising: false });
    expect(getConsent('analytics')).toBe(false);
    expect(getConsent('external')).toBe(true);
    expect(listener).toHaveBeenCalledWith(expect.objectContaining({ analytics: false, external: true, advertising: false }));
    unsubscribe();
  });
  it('does not start optional services before consent and stops before withdrawal reload', () => {
    const sequence: string[] = [];
    const start = vi.fn(() => { sequence.push('start'); return () => sequence.push('stop'); });
    const unregister = registerOptionalService('analytics', start);
    expect(start).not.toHaveBeenCalled();
    saveConsent({ analytics: false, external: true, advertising: false });
    expect(start).not.toHaveBeenCalled();
    saveConsent(ACCEPT_ALL);
    expect(start).toHaveBeenCalledTimes(1);
    saveConsent(REFUSE_ALL, () => sequence.push('reload'));
    expect(sequence).toEqual(['start', 'stop', 'reload']);
    expect(readConsent()?.analytics).toBe(false);
    unregister();
  });
  it('deletes declared optional cookies while preserving consent and necessary cookies', () => {
    saveConsent(ACCEPT_ALL);
    document.cookie = 'optional_test=123; Path=/';
    document.cookie = 'auth_session=necessary; Path=/';
    deleteOptionalCookies(['optional_test', CONSENT_COOKIE]);
    expect(document.cookie).not.toContain('optional_test=');
    expect(document.cookie).toContain('auth_session=necessary');
    expect(readConsent()?.analytics).toBe(true);
    document.cookie = 'auth_session=; Max-Age=0; Path=/';
  });
});