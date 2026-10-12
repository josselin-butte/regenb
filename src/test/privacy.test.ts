import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { privacyPolicy } from '../../scripts/privacy-policy';

describe('consent-free public site', () => {
  const policy = privacyPolicy();
  const sources = policy.split('; ')[0].replace('script-src ', '').split(' ');
  const allowed = (url: string) => sources.some(source => {
    const candidate = new URL(url);
    const rule = new URL(source.replace('*.', ''));
    const hostMatches = source.includes('*.')
      ? candidate.hostname.endsWith(`.${rule.hostname}`)
      : candidate.hostname === rule.hostname;
    return candidate.protocol === rule.protocol && hostMatches && candidate.pathname.startsWith(rule.pathname);
  });

  it('blocks Lovable analytics before any visitor choice', () => {
    expect(allowed('https://www.regenb.fr/~flock.js')).toBe(false);
    expect(allowed('https://regenb.lovable.app/~flock.js')).toBe(false);
  });
  it('blocks marketing, replay, pixels and A/B loaders', () => {
    for (const url of ['https://www.googletagmanager.com/gtag/js', 'https://connect.facebook.net/en_US/fbevents.js', 'https://static.hotjar.com/c/hotjar.js', 'https://www.clarity.ms/tag/site', 'https://cdn.optimizely.com/js/site.js']) {
      expect(allowed(url)).toBe(false);
    }
  });
  it('allows the actual app on the official domain and Lovable preview', () => {
    expect(allowed('https://www.regenb.fr/assets/index.js')).toBe(true);
    expect(allowed('https://id-preview--example.lovable.app/assets/index.js')).toBe(true);
  });
  it('blocks all embedded frames while the site has no opted-in embeds', () => {
    expect(policy.split('; ')).toContain("frame-src 'none'");
  });
  it('serves fonts only from the site itself', () => {
    expect(policy.split('; ')).toContain("font-src 'self'");
  });
  it('does not persist the sidebar preference', () => {
    const sidebar = readFileSync('src/components/ui/sidebar.tsx', 'utf8');
    expect(sidebar).not.toMatch(/document\.cookie\s*=|localStorage\.setItem|sessionStorage\.setItem/);
  });
});