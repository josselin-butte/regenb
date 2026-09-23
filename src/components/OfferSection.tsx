import { useLanguage } from '@/contexts/LanguageContext';

const OfferSection = () => {
  const { t } = useLanguage();

  return (
    <section id="offer" className="border-b-2 border-primary bg-background px-6 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('offer.kicker')}</span>
          <h2 className="mt-5 text-4xl font-black uppercase leading-none text-primary sm:text-6xl">
            {t('offer.title')}
          </h2>
        </div>
        <div className="space-y-7 text-lg leading-relaxed text-foreground lg:col-span-7 lg:col-start-6 lg:text-xl">
          <p>{t('offer.text1')}</p>
          <p>{t('offer.text2')}</p>
          <p className="border-l-4 border-accent pl-6 font-semibold text-primary">{t('offer.text3')}</p>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;