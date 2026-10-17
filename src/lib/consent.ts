export type ConsentCategory = 'analytics' | 'external' | 'advertising';
export type ConsentChoices = Record<ConsentCategory, boolean>;
export interface ConsentRecord extends ConsentChoices {
  version: number;
  date: string;
  expires: string;
  advertisingAcceptance?: { date: string; version: number };
}

// Increment whenever the purposes or their providers change.
export const CONSENT_VERSION = 2;
export const CONSENT_COOKIE = 'regenb_consent';
export const REFUSE_ALL: ConsentChoices = { analytics: false, external: false, advertising: false };
export const ACCEPT_ALL: ConsentChoices = { analytics: true, external: true, advertising: true };
const listeners = new Set<(consent: ConsentRecord | null) => void>();
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('regenb-consent') : undefined;
if (channel) channel.onmessage = () => refreshConsent();

export function sixMonthsAfter(date: Date): Date {
  const result = new Date(date);
  const day = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + 6);
  const lastDay = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate();
  result.setUTCDate(Math.min(day, lastDay));
  return result;
}

export function parseConsent(value: string | undefined, now = new Date()): ConsentRecord | null {
  if (!value) return null;
  try {
    const record = JSON.parse(decodeURIComponent(value));
    const date = new Date(record.date);
    const expires = new Date(record.expires);
    if (record.version !== CONSENT_VERSION || typeof record.analytics !== 'boolean' ||
        typeof record.external !== 'boolean' || typeof record.advertising !== 'boolean' || typeof record.date !== 'string' ||
        typeof record.expires !== 'string' || !Number.isFinite(date.getTime()) ||
        date > now || expires <= now || expires.getTime() !== sixMonthsAfter(date).getTime()) return null;
    return record;
  } catch { return null; }
}

export function readConsent(): ConsentRecord | null {
  if (typeof document === 'undefined') return null;
  const cookie = document.cookie.split('; ').find(item => item.startsWith(`${CONSENT_COOKIE}=`));
  return parseConsent(cookie?.slice(CONSENT_COOKIE.length + 1));
}

export function getConsent(category: ConsentCategory): boolean {
  return readConsent()?.[category] === true;
}

export function onConsentChange(listener: (consent: ConsentRecord | null) => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

/** Every optional integration must register its start AND stop/cleanup here.
  * Meta PageView uses advertising consent; the hosting tracker remains CSP-blocked.
 * Do not register providers before documenting cookies and narrowing the CSP.
 */
export function registerOptionalService(category: ConsentCategory, start: () => (() => void)): () => void {
  let cleanup: (() => void) | undefined;
  const stop = () => {
    const previous = cleanup;
    cleanup = undefined;
    try { previous?.(); } catch { /* Continue withdrawal even if a vendor cleanup fails. */ }
  };
  const update = () => {
    if (getConsent(category)) {
      if (!cleanup) cleanup = start();
    } else stop();
  };
  update();
  const unsubscribe = onConsentChange(update);
  return () => { unsubscribe(); stop(); };
}

/** Delete only declared optional first-party cookies, never auth/consent/security cookies.
 * Cross-origin and HttpOnly cookies cannot be deleted by this site.
 */
export function deleteOptionalCookies(names: string[]): void {
  const host = location.hostname;
  const parts = host.split('.');
  const domains = ['', ...parts.slice(0, -1).map((_, i) => parts.slice(i).join('.'))];
  const segments = location.pathname.split('/').filter(Boolean);
  const paths = ['/', ...segments.map((_, i) => '/' + segments.slice(0, i + 1).join('/'))];
  for (const name of names) {
    if (name === CONSENT_COOKIE || !/^[\w-]+$/.test(name)) continue;
    for (const domain of domains) for (const path of paths) {
      document.cookie = `${name}=; Max-Age=0; Path=${path}; SameSite=Lax${domain ? `; Domain=${domain}` : ''}`;
    }
  }
}

export function saveConsent(choices: ConsentChoices, reload = () => location.reload()): ConsentRecord {
  const previous = readConsent();
  const now = new Date();
  const record: ConsentRecord = { ...choices, version: CONSENT_VERSION, date: now.toISOString(), expires: sixMonthsAfter(now).toISOString(),
    ...(choices.advertising ? { advertisingAcceptance: { date: now.toISOString(), version: CONSENT_VERSION } } : previous?.advertisingAcceptance ? { advertisingAcceptance: previous.advertisingAcceptance } : {}) };
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}; Path=/; Expires=${new Date(record.expires).toUTCString()}; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
  for (const listener of listeners) {
    try { listener(record); } catch { /* Notify the other services even if one fails. */ }
  }
  channel?.postMessage('changed');
  if ((previous?.analytics && !choices.analytics) || (previous?.external && !choices.external) || (previous?.advertising && !choices.advertising)) reload();
  return record;
}

/** Revalidate on return to the page and daily for long-lived tabs. */
export function refreshConsent(): void {
  const record = readConsent();
  for (const listener of listeners) listener(record);
}