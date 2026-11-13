export const PLACE_LAYERS = ['ground', 'pulse', 'voice', 'spark'] as const;
export type PlaceMix = { crowded: number; niche: number }[];
export function placeMix(step: number, solo: number | null, placed: boolean[], choice: number | null): PlaceMix {
  return PLACE_LAYERS.map((_, i) => {
    if (step === 1) return { crowded: 0.24, niche: 0 };
    if (step === 2) return { crowded: 0, niche: solo === i ? 0.5 : 0 };
    if (step === 3) return { crowded: placed[i] ? 0 : 0.24, niche: placed[i] ? 0.24 : 0 };
    if (step === 4) return { crowded: 0, niche: choice === i ? 0.25 : 0 };
    return { crowded: 0, niche: 0 };
  });
}
export const matchesPlaceBand = (voice: number, band: number) => voice >= 0 && voice < 4 && voice === band;

export class PlaceAudio {
  context: AudioContext;
  master: GainNode;
  analysers: AnalyserNode[] = [];
  gains: GainNode[][] = [];
  sources: AudioBufferSourceNode[] = [];
  private disposed = false;
  constructor() {
    const Audio = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Audio) throw new Error('Audio unavailable');
    this.context = new Audio();
    this.master = this.context.createGain();
    this.master.gain.value = 0.6;
    this.master.connect(this.context.destination);
  }
  async load(signal: AbortSignal) {
    const urls = PLACE_LAYERS.flatMap(layer => ['crowded', 'niche'].map(mode => `/audio/place/${layer}_${mode}.mp3`));
    const buffers = await Promise.all(urls.map(async url => {
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error('Audio load failed');
      return this.context.decodeAudioData(await response.arrayBuffer());
    }));
    if (this.disposed || signal.aborted) return;
    if (buffers.some(buffer => buffer.length !== buffers[0].length || buffer.sampleRate !== buffers[0].sampleRate)) throw new Error('Unequal loops');
    const start = this.context.currentTime + 0.08;
    PLACE_LAYERS.forEach((_, i) => {
      const analyser = this.context.createAnalyser();
      analyser.fftSize = 512;
      analyser.connect(this.master);
      this.analysers.push(analyser);
      this.gains.push([0, 1].map(version => {
        const gain = this.context.createGain();
        gain.gain.value = 0;
        gain.connect(analyser);
        const source = this.context.createBufferSource();
        source.buffer = buffers[i * 2 + version];
        source.loop = true;
        source.loopEnd = buffers[0].duration;
        source.connect(gain);
        source.start(start);
        this.sources.push(source);
        return gain;
      }));
    });
  }
  mix(values: PlaceMix) {
    const now = this.context.currentTime;
    this.gains.forEach((pair, i) => pair.forEach((gain, version) => {
      gain.gain.cancelAndHoldAtTime?.(now);
      if (!gain.gain.cancelAndHoldAtTime) {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
      }
      gain.gain.linearRampToValueAtTime(version === 0 ? values[i].crowded : values[i].niche, now + 1.5);
    }));
  }
  volume(value: number) { this.master.gain.setTargetAtTime(value, this.context.currentTime, 0.06); }
  resume() { return this.context.resume(); }
  pause() { return this.context.suspend(); }
  dispose() {
    this.disposed = true;
    this.sources.forEach(source => { source.stop(); source.disconnect(); });
    this.sources = [];
    void this.context.close();
  }
}
