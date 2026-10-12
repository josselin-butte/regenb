import { describe, it, expect } from 'vitest';
import { trackers, optionalTrackers } from '@/lib/trackers';
import { CONSENT_COOKIE } from '@/lib/consent';

describe('cookie table', () => {
  it('lists the consent cookie as strictly necessary, 6 months', () => {
    const c = trackers.find(t => t.name === CONSENT_COOKIE)!;
    expect(c.category).toBe('necessary');
    expect(c.lifetime.fr).toBe('6 mois');
  });
  it('currently has no optional tracker', () => {
    expect(optionalTrackers()).toHaveLength(0);
  });
  it('flags a consent-category tracker as optional', () => {
    expect(optionalTrackers([{ ...trackers[0], name: 'x', category: 'analytics' }])).toHaveLength(1);
  });
});
