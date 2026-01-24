import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowDown, Leaf } from 'lucide-react';
import heroImage from '@/assets/hero-forest.jpg';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Forest landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 mb-8 bg-primary-foreground/10 backdrop-blur-sm animate-float">
            <Leaf className="w-8 h-8 text-primary-foreground" />
          </div>

          {/* Logo */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-semibold text-primary-foreground mb-6 animate-fade-in">
            RegenB <span className="text-primary-foreground/80">France</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 font-light leading-relaxed mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('hero.tagline')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="lg" asChild>
              <a href="#services">{t('hero.cta')}</a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="#retreats">{t('hero.secondary')}</a>
            </Button>
          </div>
          
          {/* Values CTA */}
          <div className="mt-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="https://nature-values-quest.lovable.app" target="_blank" rel="noopener noreferrer">
                {t('hero.values')}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#services"
          className="flex items-center justify-center w-10 h-10 bg-primary-foreground/20 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/30 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
