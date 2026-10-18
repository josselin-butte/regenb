import type { CarnetLang } from './carnet';

export interface CarnetAudioFields {
  audio_url_fr?: string;
  audio_url_en?: string;
  audio_duration_fr?: number;
  audio_duration_en?: number;
}

/** Never fall back to an audio recording in another language. */
export function getNoteAudio(entry: CarnetAudioFields, lang: CarnetLang) {
  const url = entry[`audio_url_${lang}`]?.trim();
  if (!url || !/^https:\/\//i.test(url)) return undefined;
  const minutes = entry[`audio_duration_${lang}`];
  const duration = typeof minutes === 'number' && Number.isFinite(minutes) && minutes > 0 ? minutes : undefined;
  return { url, duration };
}

export function audioIsoDuration(minutes: number): string {
  return `PT${Math.round(minutes * 60)}S`;
}