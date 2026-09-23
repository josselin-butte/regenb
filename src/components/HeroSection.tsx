import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="border-b border-border px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
      <div className="mx-auto max-w-measure">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('hero.eyebrow')}</p>
        <h1 className="mt-6 text-3xl sm:text-4xl">{t('hero.title')}</h1>
        <div className="mt-6 space-y-4 text-foreground">
          <p>{t('hero.sentence1')}</p>
          <p>{t('hero.sentence2')}</p>
        </div>
        <Button size="lg" asChild className="mt-8">
          <a href="/boussole">{t('hero.cta')}</a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
