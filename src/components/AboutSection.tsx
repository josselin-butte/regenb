import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-measure">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('about.kicker')}</p>
        <h2 className="mt-4 text-2xl sm:text-3xl">{t('about.title')}</h2>
        <div className="mt-6 space-y-4">
          <p>{t('about.text1')}</p>
          <p>{t('about.text2')}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
