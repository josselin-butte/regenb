import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-2 md:gap-16">
        <div className="order-2 md:order-1">
          <div className="border border-border bg-secondary p-8 sm:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('about.guide.kicker')}</p>
            <ul className="mt-6 divide-y divide-border">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="py-5 first:pt-0 last:pb-0">
                  <p className="font-display text-[20px] font-semibold leading-snug text-primary">{t(`about.guide.${n}.title`)}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{t(`about.guide.${n}.text`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="order-1 max-w-[500px] md:order-2">
          <h2 className="text-3xl sm:text-4xl">{t('nav.about')}</h2>
          <p className="mt-6">{t('about.p1')}</p>
          <p className="mt-4">{t('about.p2')}</p>
          <p className="mt-4">{t('about.p3')}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
