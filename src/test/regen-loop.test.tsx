import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RegenLoop, { canAnimateLoop, REGEN_CIRCUIT_MS, type RegenCopy } from '@/components/RegenLoop';

const copy: RegenCopy = {
  title: 'Loop', intro: '', center: '', centerNote: '', status: '', tapHint: '', closing: '', closingNote: '', context: '',
  pause: 'Pause', play: 'Play',
  movements: ['R', 'E1', 'G', 'E2', 'N'].map(label => ({ label, question: `Question ${label}`, support: `Support ${label}` })),
};
let intersect: (entries: { isIntersecting: boolean }[]) => void;
let preference: () => void;
let media: { matches: boolean; addEventListener: ReturnType<typeof vi.fn>; removeEventListener: ReturnType<typeof vi.fn> };
const disconnect = vi.fn();
const play = vi.fn(); const pause = vi.fn(); const cancel = vi.fn();
const animate = vi.fn((_frames: unknown, _options: unknown) => ({ play, pause, cancel }));

beforeEach(() => {
  vi.useFakeTimers(); vi.clearAllMocks();
  media = { matches: false, addEventListener: vi.fn((_, fn) => { preference = fn; }), removeEventListener: vi.fn() };
  vi.stubGlobal('matchMedia', () => media);
  vi.stubGlobal('IntersectionObserver', class {
    constructor(fn: typeof intersect) { intersect = fn; }
    observe() {} disconnect = disconnect;
  });
  Object.defineProperty(document, 'hidden', { configurable: true, value: false });
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe('REGEN conversation rules', () => {
  it('allows direct selection of any movement without traversing earlier movements', () => {
    render(<RegenLoop copy={copy} />);
    fireEvent.click(screen.getByRole('button', { name: 'N' }));
    expect(screen.getByRole('region', { name: 'N' }).textContent).toBe('Question NSupport N');
    fireEvent.click(screen.getByRole('button', { name: 'G' }));
    expect(screen.getByRole('region', { name: 'G' }).textContent).toBe('Question GSupport G');
    expect(screen.getByRole('button', { name: 'G' }).getAttribute('aria-pressed')).toBe('true');
  });
  it('uses a 22-second decorative circuit and never automatically selects a movement', () => {
    render(<RegenLoop copy={copy} />);
    act(() => { intersect([{ isIntersecting: true }]); vi.advanceTimersByTime(44000); });
    expect(REGEN_CIRCUIT_MS).toBe(22000);
    expect(animate.mock.calls[0]?.[1]).toEqual({ duration: 22000, iterations: Infinity, easing: 'linear' });
    expect(screen.getByRole('region', { name: 'R' }).textContent).toBe('Question RSupport R');
  });
  it('stops when offscreen and resumes when visible', () => {
    render(<RegenLoop copy={copy} />);
    act(() => intersect([{ isIntersecting: true }])); expect(play).toHaveBeenCalled();
    pause.mockClear(); act(() => intersect([{ isIntersecting: false }])); expect(pause).toHaveBeenCalled();
  });
  it('stops when the tab is hidden', () => {
    render(<RegenLoop copy={copy} />); act(() => intersect([{ isIntersecting: true }]));
    pause.mockClear(); Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    fireEvent(document, new Event('visibilitychange')); expect(pause).toHaveBeenCalled();
  });
  it('honours reduced motion initially and when the preference changes', () => {
    media.matches = true; render(<RegenLoop copy={copy} />);
    act(() => intersect([{ isIntersecting: true }])); expect(play).not.toHaveBeenCalled();
    act(() => { media.matches = false; preference(); }); expect(play).toHaveBeenCalled();
    pause.mockClear(); act(() => { media.matches = true; preference(); }); expect(pause).toHaveBeenCalled();
  });
  it('yields to competing visible animation', () => {
    expect(canAnimateLoop(true, false, false, false, true)).toBe(false);
    expect(canAnimateLoop(true, false, false, false, false)).toBe(true);
  });
  it('cleans up animation, observers and preference listeners', () => {
    const view = render(<RegenLoop copy={copy} />); view.unmount();
    expect(disconnect).toHaveBeenCalled(); expect(cancel).toHaveBeenCalled();
    expect(media.removeEventListener).toHaveBeenCalledWith('change', preference);
  });
  it('preserves explicit pause across preference changes and remounts during the visit', () => {
    const view = render(<RegenLoop copy={copy} />); act(() => intersect([{ isIntersecting: true }]));
    fireEvent.click(screen.getByRole('button', { name: 'Pause' })); play.mockClear();
    act(() => { media.matches = true; preference(); media.matches = false; preference(); });
    expect(play).not.toHaveBeenCalled(); view.unmount();
    render(<RegenLoop copy={copy} />); act(() => intersect([{ isIntersecting: true }]));
    expect(play).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Play' })); expect(play).toHaveBeenCalled();
  });
});