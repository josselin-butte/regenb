import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'fs';
import { localizePath } from '@/lib/routes';
import { matchesPlaceBand, PlaceAudio, placeMix } from '@/lib/place-audio';

describe('Finding your place rules', () => {
  it('connects the two separate routes', () => {
    expect(localizePath('/trouver-sa-place', 'en')).toBe('/en/finding-your-place');
    expect(localizePath('/en/finding-your-place', 'fr')).toBe('/trouver-sa-place');
  });
  it('plays all four crowded voices together in step 1', () => {
    expect(placeMix(1, null, [false, false, false, false], null)).toEqual(Array(4).fill({ crowded: 0.24, niche: 0 }));
  });
  it('solos only the selected niche voice in step 2', () => {
    expect(placeMix(2, 2, [], null)).toEqual([{ crowded: 0, niche: 0 }, { crowded: 0, niche: 0 }, { crowded: 0, niche: 0.5 }, { crowded: 0, niche: 0 }]);
  });
  it('accepts only the matching band for each of the four voices', () => {
    for (let voice = 0; voice < 4; voice++) for (let band = 0; band < 4; band++) expect(matchesPlaceBand(voice, band)).toBe(voice === band);
    expect(matchesPlaceBand(4, 4)).toBe(false);
  });
  it('moves a placed voice from crowded to niche without removing other voices', () => {
    expect(placeMix(3, null, [true, false, false, false], null)).toEqual([{ crowded: 0, niche: 0.24 }, ...Array(3).fill({ crowded: 0.24, niche: 0 })]);
    expect(placeMix(3, null, [true, true, true, true], null)).toEqual(Array(4).fill({ crowded: 0, niche: 0.24 }));
  });
  it('uses a soft solo for the reflection and silence for the unknown choice', () => {
    expect(placeMix(4, null, [], 0)[0]).toEqual({ crowded: 0, niche: 0.25 });
    expect(placeMix(4, null, [], 4)).toEqual(Array(4).fill({ crowded: 0, niche: 0 }));
  });
  it('keeps the eight silent placeholder files equal and below 8 MB', () => {
    const files = ['ground', 'pulse', 'voice', 'spark'].flatMap(layer => ['crowded', 'niche'].map(mode => readFileSync(`public/audio/place/${layer}_${mode}.mp3`)));
    expect(files.reduce((sum, file) => sum + file.length, 0)).toBeLessThan(8_000_000);
    files.forEach(file => expect(file.equals(files[0])).toBe(true));
  });
  it('starts every source on the same clock, crossfades over 1.5 seconds and stops them on disposal', async () => {
    const starts: number[] = [];
    const ramps: [number, number][] = [];
    const stop = vi.fn();
    const close = vi.fn();
    class FakeContext {
      currentTime = 12;
      destination = {};
      createGain() { return { gain: { value: 0, cancelAndHoldAtTime: vi.fn(), linearRampToValueAtTime: (a: number, b: number) => ramps.push([a, b]) }, connect: vi.fn() }; }
      createAnalyser() { return { connect: vi.fn() }; }
      createBufferSource() { return { connect: vi.fn(), start: (value: number) => starts.push(value), stop, disconnect: vi.fn() }; }
      decodeAudioData() { return Promise.resolve({ length: 192000, sampleRate: 24000, duration: 8 }); }
      close = close;
    }
    vi.stubGlobal('AudioContext', FakeContext);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, arrayBuffer: async () => new ArrayBuffer(1) }));
    try {
      const audio = new PlaceAudio();
      await audio.load(new AbortController().signal);
      expect(starts).toEqual(Array(8).fill(12.08));
      audio.mix(placeMix(1, null, [], null));
      expect(ramps).toHaveLength(8);
      expect(ramps.every(([, end]) => end === 13.5)).toBe(true);
      audio.dispose();
      expect(stop).toHaveBeenCalledTimes(8);
      expect(close).toHaveBeenCalledOnce();
    } finally { vi.unstubAllGlobals(); }
  });
});