import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const WaitlistSection = () => {
  const { t } = useLanguage();

  return (
    <section id="waitlist" className="border-b border-border px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">{t('waitlist.kicker')}</p>
          <h2 className="mt-4 text-2xl sm:text-3xl">{t('waitlist.title')}</h2>
        </div>
        <div className="mt-6 lg:col-span-6 lg:mt-0">
          <p className="max-w-measure">{t('waitlist.text')}</p>
        </div>
        <div className="mt-8 lg:col-span-3 lg:mt-0">
          <Button variant="outline" size="lg" asChild className="w-full">
            <a href="mailto:josselin@regenb.com?subject=Liste%20d%27attente%20RegenB">{t('waitlist.cta')}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
