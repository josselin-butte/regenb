/**
 * Optional field recording for the homepage listening band.
 * Upload the file to Lovable Assets, then set `src` to its published asset path
 * (for example `/__l5e/assets-v1/<id>/arbas-ruisseau.mp3`). While `src` is empty,
 * the band shows no player. Playback is native, never automatic, and same-origin
 * asset paths are already allowed by the media-src policy.
 */
export interface ListeningSound {
  src: string;
  /** Short caption, e.g. "Arbas, the stream, a November morning". */
  caption: { fr: string; en: string };
}

export const listeningSound: ListeningSound | null = null;
