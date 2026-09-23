import { useLanguage } from '@/contexts/LanguageContext';

const OfferSection = () => {
  const { t } = useLanguage();

  return (
    <section id="offer" className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-measure">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('offer.kicker')}</p>
        <h2 className="mt-4 text-2xl sm:text-3xl">{t('offer.title')}</h2>
        <div className="mt-6 space-y-4">
          <p>{t('offer.text1')}</p>
          <p>{t('offer.text2')}</p>
          <p className="border-l-2 border-primary pl-5 text-primary">{t('offer.text3')}</p>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
