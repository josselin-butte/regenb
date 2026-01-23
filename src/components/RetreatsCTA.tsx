import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import retreatImage from '@/assets/retreat-cabin.jpg';

const RetreatsCTA = () => {
  const { t } = useLanguage();

  return (
    <section id="retreats" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={retreatImage}
          alt="Nature retreat cabin"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-forest/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-primary-foreground mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl sm:text-2xl text-primary-foreground/80 mb-10">
            {t('cta.subtitle')}
          </p>

          {/* Info badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <div className="inline-flex items-center px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">2025</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">France</span>
            </div>
          </div>

          <Button variant="hero" size="lg" asChild>
            <a href="#contact">{t('cta.button')}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RetreatsCTA;
