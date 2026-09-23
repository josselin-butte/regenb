import { useLanguage } from '@/contexts/LanguageContext';

const WaitlistSection = () => {
  const { t } = useLanguage();

  return (
    <section id="waitlist" className="px-5 pb-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-measure border-t border-border pt-16 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('waitlist.kicker')}</p>
        <h2 className="mt-4 text-2xl sm:text-3xl">{t('waitlist.title')}</h2>
        <p className="mt-5 text-muted-foreground">{t('waitlist.text')}</p>
        <a
          href="mailto:josselin@regenb.com?subject=Liste%20d%27attente%20RegenB"
          className="mt-7 inline-block border-b-2 border-accent pb-1 font-semibold text-primary transition-colors hover:text-accent"
        >
          {t('waitlist.cta')}
        </a>
      </div>
    </section>
  );
};

export default WaitlistSection;
