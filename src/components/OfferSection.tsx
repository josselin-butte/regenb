import { useLanguage } from '@/contexts/LanguageContext';

const OfferSection = () => {
  const { t } = useLanguage();

  return (
    <section id="offer" className="border-b border-border px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('offer.kicker')}</p>
          <h2 className="mt-4 text-2xl sm:text-3xl">{t('offer.title')}</h2>
        </div>
        <div className="mt-6 lg:col-span-9 lg:mt-0">
          <div className="gap-12 sm:columns-2 [&>p]:mb-4 [&>p]:break-inside-avoid">
            <p>{t('offer.text1')}</p>
            <p>{t('offer.text2')}</p>
          </div>
          <p className="mt-6 max-w-measure border-l-2 border-primary pl-5 text-primary">{t('offer.text3')}</p>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
