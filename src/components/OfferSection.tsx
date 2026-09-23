import { useLanguage } from '@/contexts/LanguageContext';

const OfferSection = () => {
  const { t } = useLanguage();

  return (
    <section id="offer" className="bg-primary px-5 py-20 text-primary-foreground sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="max-w-[500px] md:ml-auto">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('offer.kicker')}</p>
          <h2 className="mt-4 text-3xl text-primary-foreground sm:text-4xl">{t('offer.title')}</h2>
          <div className="mt-8 space-y-6">
            <p className="border-l-2 border-accent pl-6">{t('offer.text1')}</p>
            <p className="border-l-2 border-accent pl-6">{t('offer.text2')}</p>
          </div>
        </div>
        <div>
          <p className="border border-primary-foreground/20 p-8 font-serif text-2xl leading-snug sm:p-12 sm:text-3xl">
            {t('offer.text3')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
