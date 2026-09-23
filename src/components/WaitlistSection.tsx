import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const WaitlistSection = () => {
  const { t } = useLanguage();

  return (
    <section id="waitlist" className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-measure">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('waitlist.kicker')}</p>
        <h2 className="mt-4 text-2xl sm:text-3xl">{t('waitlist.title')}</h2>
        <p className="mt-6">{t('waitlist.text')}</p>
        <Button variant="outline" size="lg" asChild className="mt-8">
          <a href="mailto:josselin@regenb.com?subject=Liste%20d%27attente%20RegenB">{t('waitlist.cta')}</a>
        </Button>
      </div>
    </section>
  );
};

export default WaitlistSection;
