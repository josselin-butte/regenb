import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">{t('hero.eyebrow')}</p>
        </div>
        <div className="lg:col-span-9">
          <h1 className="mt-6 text-[2.1rem] leading-[1.15] sm:text-5xl lg:mt-0 lg:text-6xl">{t('hero.title')}</h1>
          <div className="mt-8 gap-10 sm:columns-2 sm:gap-12 [&>p]:mb-4 [&>p]:break-inside-avoid">
            <p className="max-w-measure">{t('hero.sentence1')}</p>
            <p className="max-w-measure">{t('hero.sentence2')}</p>
          </div>
          <Button size="lg" asChild className="mt-8">
            <a href="/boussole">{t('hero.cta')}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
