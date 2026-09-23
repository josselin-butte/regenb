import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import heroImage from '@/assets/hero-forest.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[92vh] pt-16 sm:pt-20 bg-background overflow-hidden">
      <div className="grid min-h-[calc(92vh-5rem)] lg:grid-cols-12 border-b-2 border-primary">
        <div className="relative z-10 lg:col-span-7 px-6 py-14 sm:px-10 sm:py-20 lg:px-16 xl:px-24 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-primary">
          <div>
            <span className="inline-block bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground animate-fade-in">
              {t('hero.eyebrow')}
            </span>
            <h1 className="mt-8 max-w-4xl text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.86] text-primary animate-fade-in">
              {t('hero.title')}
            </h1>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 md:items-end">
            <p className="text-xl sm:text-2xl font-medium leading-tight text-primary animate-fade-in">
              {t('hero.tagline')}
            </p>
            <div className="flex flex-col gap-3 animate-fade-in">
            <Button variant="hero" size="lg" asChild>
                <a href="/contact">{t('hero.cta')}<ArrowUpRight /></a>
            </Button>
              <a className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4" href="https://nature-values-quest.lovable.app" target="_blank" rel="noopener noreferrer">
                {t('hero.values')}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="relative min-h-[45vh] lg:col-span-5">
          <img src={heroImage} alt="Une forêt ancienne baignée de lumière" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute bottom-0 left-0 bg-primary px-5 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground">RegenB France</div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 hidden sm:block animate-bounce">
        <a
          href="#about"
          className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
