import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const DoorsSection = () => {
  const { t, lp } = useLanguage();

  const doors = [
    { n: 1, to: lp('/contact'), line: null },
    { n: 2, to: lp('/supervision'), line: t('doors.2.line') },
    { n: 3, to: lp('/boussole'), line: t('doors.3.line') },
  ];

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('doors.kicker')}</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">{t('doors.title')}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {doors.map((door) => (
            <Link
              key={door.n}
              to={door.to}
              className="group flex flex-col border border-border bg-background p-8 transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <h3 className="font-serif text-[20px] font-medium leading-snug text-primary">{t(`doors.${door.n}.title`)}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{t(`doors.${door.n}.text`)}</p>
              {door.line && <p className="mt-3 text-sm text-muted-foreground">{door.line}</p>}
              <span className="mt-auto inline-block self-start border-b-2 border-accent pb-1 pt-6 font-semibold text-primary transition-colors group-hover:text-accent">
                {t(`doors.${door.n}.cta`)}
              </span>
            </Link>
          ))}
        </div>
        <p className="mx-auto mt-12 max-w-measure text-center text-muted-foreground">
          {t('doors.curious')}{' '}
          <Link to={lp('/carnet')} className="border-b border-accent font-semibold text-primary transition-colors hover:text-accent">
            {t('doors.curious.link')}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default DoorsSection;
