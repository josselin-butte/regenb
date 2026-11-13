import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getEntry } from '@/lib/carnet';
import { listeningSound, type ListeningSound } from '@/data/listening-band';
import ecoute from '@/assets/home-ecoute.webp.asset.json';

const ASSET_ORIGIN = 'https://regenb.lovable.app';
const NOTE_KEY = 'ecouter-la-ou-le-soin-commence';
const CAPACITIES = ['earth', 'water', 'fire', 'air', 'space'] as const;

/** Homepage band: listening as the thread through the five capacities. */
const ListeningBand = ({ sound = listeningSound }: { sound?: ListeningSound | null }) => {
  const { t, language, lp } = useLanguage();
  const note = getEntry(NOTE_KEY, language);

  return (
    <section id="ecoute" aria-labelledby="ecoute-title" className="bg-secondary px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-14">
        <div className="overflow-hidden">
          <img
            src={`${ASSET_ORIGIN}${ecoute.url}`}
            alt={t('image.ecoute')}
            width={1600}
            height={1200}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <div className="max-w-measure">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('listen.kicker')}</p>
          <h2 id="ecoute-title" className="mt-4 text-3xl sm:text-4xl">{t('listen.title')}</h2>
          <p className="mt-6">{t('listen.text')}</p>

          <div className="mt-10">
            <svg aria-hidden="true" viewBox="0 0 300 12" preserveAspectRatio="none" className="block h-3 w-full text-accent">
              <path d="M0 6 Q 15 0 30 6 T 60 6 T 90 6 T 120 6 T 150 6 T 180 6 T 210 6 T 240 6 T 270 6 T 300 6" fill="none" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <ul aria-label={t('listen.capacities')} className="mt-4 grid grid-cols-5 gap-2 text-center">
              {CAPACITIES.map((c) => (
                <li key={c} className="text-xs leading-snug sm:text-sm">
                  <span className="block font-semibold text-primary">{t(`listen.${c}`)}</span>
                  <span className="mt-1 block text-muted-foreground">{t(`listen.${c}.verb`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {sound?.src && (
            <figure className="mt-10">
              <audio controls preload="none" src={`${ASSET_ORIGIN}${sound.src}`} className="w-full">
                {t('listen.audioFallback')}
              </audio>
              <figcaption className="mt-2 text-sm text-muted-foreground">{sound.caption[language]}</figcaption>
            </figure>
          )}

          {note && (
            <Link
              to={lp(`/carnet/${note.slug}`)}
              className="mt-10 inline-block border-b-2 border-accent pb-1 font-semibold text-primary transition-colors hover:text-accent"
            >
              {t('listen.cta')}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListeningBand;
