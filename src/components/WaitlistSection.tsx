import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const WaitlistSection = () => {
  const { t } = useLanguage();

  return (
    <section id="waitlist" className="border-b-2 border-primary bg-accent px-6 py-20 sm:px-10 lg:px-16 lg:py-28 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-foreground">{t('waitlist.kicker')}</span>
          <h2 className="mt-5 text-4xl font-black uppercase leading-none text-primary sm:text-6xl lg:text-7xl">{t('waitlist.title')}</h2>
          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-accent-foreground sm:text-xl">{t('waitlist.text')}</p>
        </div>
        <div className="lg:col-span-3 lg:col-start-10">
          <Button variant="default" size="lg" asChild className="w-full">
            <a href="mailto:josselin@regenb.com?subject=Liste%20d%27attente%20RegenB">
              {t('waitlist.cta')}<ArrowUpRight />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;