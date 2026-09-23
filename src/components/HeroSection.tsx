import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
      <div className="mx-auto max-w-measure">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('hero.eyebrow')}</p>
        <h1 className="mt-7 text-[2.4rem] leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {t('hero.title')}
        </h1>
        <p className="mt-8 text-xl leading-relaxed">{t('hero.sentence1')}</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('hero.sentence2')}</p>
        <Button size="lg" asChild className="mt-10">
          <a href="/boussole">{t('hero.cta')}</a>
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
