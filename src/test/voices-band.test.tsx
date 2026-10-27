import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import VoicesBand, { VOICE_ENTER_MS, VOICE_EXIT_MS, VOICE_INTERVAL_MS } from '@/components/VoicesBand';
import { voices } from '@/content/voices';

vi.mock('@/contexts/LanguageContext', () => ({ useLanguage: () => ({ language: 'fr' }) }));
let intersect: (entries: { isIntersecting: boolean }[]) => void;
let preference: () => void;
let media: { matches: boolean; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn> };
let now: number;
let callbacks: Map<number, FrameRequestCallback>;
let id: number;

beforeEach(() => {
  now = 0; id = 0; callbacks = new Map();
  media = { matches: false, addEventListener: vi.fn((_, fn) => { preference = fn; }), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', () => media);
  vi.stubGlobal('IntersectionObserver', class { constructor(fn: typeof intersect) { intersect = fn; } observe() {} disconnect() {} });
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => { callbacks.set(++id, fn); return id; });
  vi.stubGlobal('cancelAnimationFrame', (key: number) => callbacks.delete(key));
  Object.defineProperty(document, 'hidden', { configurable: true, value: false });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
function advance(ms: number) {
  for (let elapsed = 0; elapsed < ms; elapsed += 10) {
    now += 10;
    act(() => { const pending = [...callbacks.values()]; callbacks.clear(); pending.forEach(fn => fn(now)); });
  }
}
function start() {
  const view = render(<VoicesBand />);
  act(() => intersect([{ isIntersecting: true }]));
  advance(10);
  return view;
}
const current = () => screen.getAllByRole('button').find(button => button.getAttribute('aria-pressed') === 'true')?.getAttribute('aria-label');

describe('homepage voices controls', () => {
  it('starts with Kimmerer and provides the same twelve selectable voices from bilingual data', () => {
    render(<VoicesBand />);
    expect(current()).toBe('Robin Wall Kimmerer');
    expect(voices).toHaveLength(12);
    for (const voice of voices) {
      expect(voice.fr.length).toBeGreaterThan(0); expect(voice.en.length).toBeGreaterThan(0);
      fireEvent.click(screen.getByRole('button', { name: voice.name }));
      expect(current()).toBe(voice.name);
    }
  });
  it('changes every 7000 ms, fading out for 600 ms and in for 800 ms', () => {
    start();
    expect(VOICE_INTERVAL_MS).toBe(7000); expect(VOICE_EXIT_MS).toBe(600); expect(VOICE_ENTER_MS).toBe(800);
    advance(6990); expect(current()).toBe('Robin Wall Kimmerer');
    advance(10); expect(current()).toBe('Simone Weil');
    advance(7000); expect(current()).toBe('Lynn Margulis');
  });
  it('pauses explicitly and resumes the remaining time', () => {
    start(); advance(3000);
    fireEvent.click(screen.getByRole('button', { name: 'Mettre en pause' }));
    advance(9000); expect(current()).toBe('Robin Wall Kimmerer');
    fireEvent.click(screen.getByRole('button', { name: 'Reprendre' }));
    advance(4020); expect(current()).toBe('Simone Weil');
  });
  it('pauses while hovered', () => {
    start(); const region = screen.getByRole('region');
    fireEvent.mouseEnter(region); advance(9000); expect(current()).toBe('Robin Wall Kimmerer');
    fireEvent.mouseLeave(region); advance(7020); expect(current()).toBe('Simone Weil');
  });
  it('pauses while keyboard focus is inside', () => {
    start(); fireEvent.focus(screen.getByRole('button', { name: 'Robin Wall Kimmerer' }));
    advance(9000); expect(current()).toBe('Robin Wall Kimmerer');
  });
  it('pauses offscreen', () => {
    start(); act(() => intersect([{ isIntersecting: false }]));
    advance(9000); expect(current()).toBe('Robin Wall Kimmerer');
    act(() => intersect([{ isIntersecting: true }])); advance(7020); expect(current()).toBe('Simone Weil');
  });
  it('pauses in a hidden tab', () => {
    start(); Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    fireEvent(document, new Event('visibilitychange')); advance(9000);
    expect(current()).toBe('Robin Wall Kimmerer');
  });
  it('never rotates with reduced motion and still permits manual selection', () => {
    media.matches = true; start(); advance(20000); expect(current()).toBe('Robin Wall Kimmerer');
    fireEvent.click(screen.getByRole('button', { name: 'Nina Simone' })); expect(current()).toBe('Nina Simone');
    act(() => { media.matches = false; preference(); }); advance(7020); expect(current()).toBe('Robin Wall Kimmerer');
  });
  it('supports left and right swipes without treating vertical scrolling as a swipe', () => {
    render(<VoicesBand />); const region = screen.getByRole('region');
    const swipe = (x: number, y: number) => {
      fireEvent.touchStart(region, { touches: [{ clientX: 150, clientY: 50 }] });
      fireEvent.touchEnd(region, { changedTouches: [{ clientX: x, clientY: y }] });
    };
    swipe(60, 50); expect(current()).toBe('Simone Weil');
    swipe(240, 50); expect(current()).toBe('Robin Wall Kimmerer');
    swipe(60, 200); expect(current()).toBe('Robin Wall Kimmerer');
  });
  it('stops the clock on unmount', () => {
    const view = start(); expect(callbacks.size).toBe(1); view.unmount(); expect(callbacks.size).toBe(0);
  });
});