import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const OfferSection = () => {
  const { t, lp } = useLanguage();

  const entries = [
    { key: 'c1', to: lp('/accompagnement') },
    { key: 'c2', to: `${lp('/accompagnement')}#supervision` },
  ];

  return (
    <section id="offer" className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-measure">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('offer.kicker')}</p>
        <h2 className="mt-4 text-3xl text-primary-foreground sm:text-4xl">{t('offer.title')}</h2>
        <ul className="mt-10 divide-y divide-primary-foreground/20">
          {entries.map((e) => (
            <li key={e.key} className="py-8 first:pt-0 last:pb-0">
              <h3 className="font-serif text-[20px] font-medium text-primary-foreground">{t(`offer.${e.key}.title`)}</h3>
              <p className="mt-2 text-[15px] leading-relaxed opacity-90">{t(`offer.${e.key}.text`)}</p>
              <p className="mt-2 text-[15px] leading-relaxed opacity-90">{t(`offer.${e.key}.line`)}</p>
              <Link
                to={e.to}
                className="mt-5 inline-block border-b-2 border-accent pb-1 font-semibold transition-colors hover:text-accent"
              >
                {t(`offer.${e.key}.cta`)}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to={lp('/accompagnement#regen-loop')}
          className="mt-8 inline-block text-sm underline decoration-accent underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"
        >
          {t('offer.regen')}
        </Link>
      </div>
    </section>
  );
};

export default OfferSection;
