import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItStartsSection = () => {
  const { t, lp } = useLanguage();

  return (
    <section className="bg-secondary px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('how.kicker')}</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">{t('how.title')}</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <li key={n} className="flex items-start gap-4">
              <span className="font-serif text-3xl leading-none text-accent" aria-hidden="true">{n}</span>
              <p className="leading-relaxed">{t(`how.${n}`)}</p>
            </li>
          ))}
        </ol>
        <Link
          to={lp('/contact')}
          className="mt-10 inline-block border-b-2 border-accent pb-1 font-semibold text-primary transition-colors hover:text-accent"
        >
          {t('how.cta')}
        </Link>
      </div>
    </section>
  );
};

export default HowItStartsSection;
