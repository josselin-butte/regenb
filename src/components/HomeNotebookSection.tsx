import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate, getEntries } from '@/lib/carnet';
import ElementIcon from '@/components/ElementIcon';

const HomeNotebookSection = () => {
  const { t, language, lp } = useLanguage();
  const notes = getEntries(language).slice(0, 3);
  const base = language === 'fr' ? '/carnet' : '/en/notebook';

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('homeNotes.kicker')}</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">{t('homeNotes.title')}</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {notes.map((note) => (
            <li key={note.key}>
              <Link
                to={`${base}/${note.slug}`}
                className="group flex h-full flex-col border border-border bg-background p-8 transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                {note.element && <ElementIcon element={note.element} size={32} label={t(`element.${note.element}`)} />}
                <p className="mt-4 text-sm text-muted-foreground">{formatDate(note.date, language)}</p>
                <h3 className="mt-2 font-serif text-[20px] font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                  {note.title}
                </h3>
              </Link>
            </li>
          ))}
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
