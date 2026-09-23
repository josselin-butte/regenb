import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="border-b border-border bg-secondary px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">{t('about.kicker')}</p>
          <h2 className="mt-4 text-2xl sm:text-3xl">{t('about.title')}</h2>
        </div>
        <div className="mt-6 gap-12 sm:columns-2 lg:col-span-9 lg:mt-0 [&>p]:mb-4 [&>p]:break-inside-avoid">
          <p>{t('about.text1')}</p>
          <p>{t('about.text2')}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
