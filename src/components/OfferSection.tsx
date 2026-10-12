import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const OfferSection = () => {
  const { t, lp } = useLanguage();

  const services = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`offer.s${n}.title`),
    who: t(`offer.s${n}.who`),
  }));

  return (
    <section id="offer" className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-measure">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('offer.kicker')}</p>
        <h2 className="mt-4 text-3xl text-primary-foreground sm:text-4xl">{t('offer.title')}</h2>
        <ul className="mt-10 divide-y divide-primary-foreground/20">
          {services.map((s) => (
            <li key={s.title} className="py-5 first:pt-0 last:pb-0">
              <p className="font-serif text-[20px] font-medium">{s.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed opacity-90">{s.who}</p>
            </li>
          ))}
        </ul>
        <Link
          to={lp('/accompagnement')}
          className="mt-10 inline-block border-b-2 border-accent pb-1 font-semibold transition-colors hover:text-accent"
        >
          {t('offer.seeAll')}
        </Link>
      </div>
    </section>
  );
};

export default OfferSection;
