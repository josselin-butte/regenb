import { describe, expect, it } from 'vitest';
import { parseCarnetEntry, type CarnetEntry } from '@/lib/carnet';
import { getNoteAudio, audioIsoDuration } from '@/lib/carnet-audio';
import { article } from '@/lib/structured-data';

const url = 'https://example.org/note-fr.mp3';
const raw = `---
title: "Note"
slug: "note"
lang: "fr"
date: "2026-10-18"
audio_url_fr: "${url}"
audio_duration_fr: 12.5
---
Texte.`;
const note = parseCarnetEntry(raw) as CarnetEntry;

describe('optional notebook audio', () => {
  it('reads language-specific URL and duration in minutes from frontmatter', () => {
    expect(note.audio_url_fr).toBe(url);
    expect(note.audio_duration_fr).toBe(12.5);
  });
  it('never supplies French audio on an English page', () => {
    expect(getNoteAudio(note, 'en')).toBeUndefined();
    expect(getNoteAudio(note, 'fr')).toEqual({ url, duration: 12.5 });
  });
  it('uses only the English recording for English', () => {
    expect(getNoteAudio({ ...note, audio_url_en: 'https://example.org/en.mp3', audio_duration_en: 9 }, 'en'))
      .toEqual({ url: 'https://example.org/en.mp3', duration: 9 });
  });
  it('adds precisely the requested AudioObject to the Article', () => {
    expect(article(note, '/carnet/note', '').associatedMedia).toEqual({
      '@type': 'AudioObject', contentUrl: url, duration: 'PT750S', inLanguage: 'fr', encodingFormat: 'audio/mpeg',
    });
    expect(audioIsoDuration(2)).toBe('PT120S');
  });
  it('omits associatedMedia entirely when the note has no audio', () => {
    const silent = { ...note, audio_url_fr: undefined };
    expect(getNoteAudio(silent, 'fr')).toBeUndefined();
    expect(article(silent, '/carnet/note', '')).not.toHaveProperty('associatedMedia');
  });
  it('rejects insecure or invalid recording URLs and invalid duration', () => {
    expect(getNoteAudio({ audio_url_fr: 'javascript:alert(1)' }, 'fr')).toBeUndefined();
    expect(getNoteAudio({ audio_url_fr: url, audio_duration_fr: -1 }, 'fr')?.duration).toBeUndefined();
  });
});