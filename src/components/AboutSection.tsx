import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-2 md:order-1">
          <div className="border border-border bg-secondary p-8 sm:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('about.kicker')}</p>
            <p className="mt-6 font-serif text-2xl leading-snug text-primary sm:text-3xl">{t('about.title')}</p>
          </div>
        </div>
        <div className="order-1 max-w-[500px] md:order-2">
          <h2 className="text-3xl sm:text-4xl">{t('about.title')}</h2>
          <p className="mt-6">{t('about.text1')}</p>
          <p className="mt-4">{t('about.text2')}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
