import { useLanguage } from '@/contexts/LanguageContext';
import audioFr from '@/assets/boussole/boussole-intro-fr.mp3.asset.json';
import audioEn from '@/assets/boussole/boussole-intro-en.mp3.asset.json';

// Introduction audio for the Boussole page: one recording per language,
// no cross-language fallback, playback always started by the visitor.
// Local Vite does not proxy asset paths, so audio uses the published asset origin.
const ASSET_ORIGIN = 'https://regenb.lovable.app';
const SOURCES = { fr: `${ASSET_ORIGIN}${audioFr.url}`, en: `${ASSET_ORIGIN}${audioEn.url}` } as const;

export default function CompassAudio() {
  const { t, language } = useLanguage();
  const label = t('compass.audio.label');
  return (
    <div className="mt-8 max-w-[560px] border border-border p-4">
      <p className="font-sans text-sm">{label} · 1 min</p>
      <audio key={language} className="mt-3 block w-full" controls preload="none" aria-label={label}>
        <source src={SOURCES[language]} type="audio/mpeg" />
      </audio>
    </div>
  );
}
