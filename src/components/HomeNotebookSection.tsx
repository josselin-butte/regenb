import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate, firstNoteImage, getEntries } from '@/lib/carnet';
import ElementIcon, { type Element } from '@/components/ElementIcon';

const TINT: Record<Element, string> = {
  earth: '#395641',
  water: '#5A7261',
  air: '#D5B544',
  fire: '#D5B544',
};

const HomeNotebookSection = () => {
  const { t, language, lp } = useLanguage();
  const notes = getEntries(language).slice(0, 3);
  const base = language === 'fr' ? '/carnet' : '/en/notebook';
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} data-phase={on ? 'on' : 'idle'} className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('homeNotes.kicker')}</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">{t('homeNotes.title')}</h2>
        <ul className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {notes.map((note, i) => {
            const image = firstNoteImage(note.body);
            return (
              <li key={note.key} className="home-note-card w-[80%] shrink-0 snap-center md:w-auto" style={{ ['--d' as string]: `${i * 0.15}s` }}>
                <Link
                  to={`${base}/${note.slug}`}
                  className="group flex h-full flex-col border border-border bg-background transition-all duration-300 hover:-translate-y-[3px] hover:border-[#395641] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    {image ? (
                      <img
                        src={image.src}
                        alt={image.alt || note.title}
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.08]"
                      />
                    ) : note.element ? (
                      <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: `${TINT[note.element]}2b` }}>
                        <ElementIcon element={note.element} size={44} label={t(`element.${note.element}`)} animated={false} drawOnView={false} />
                      </div>
                    ) : null}
                    {note.element && (
                      <span className="absolute left-2 top-2 bg-[#F9F7F0] px-2 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
                        {t(`element.${note.element}`)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm text-muted-foreground">{formatDate(note.date, language)}</p>
                    <h3 className="mt-2 font-serif text-[20px] font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                      {note.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {t('homeNotes.read')} · {note.readingTime} min
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          to={lp('/carnet')}
          className="mt-10 inline-block border-b-2 border-accent pb-1 font-semibold text-primary transition-colors hover:text-accent"
        >
          {t('homeNotes.cta')}
        </Link>
      </div>
    </section>
  );
};

export default HomeNotebookSection;
