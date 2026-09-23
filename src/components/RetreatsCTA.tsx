import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin } from 'lucide-react';
import retreatImage from '@/assets/retreat-cabin.jpg';

const RetreatsCTA = () => {
  const { t } = useLanguage();

  return (
    <section id="retreats" className="relative min-h-[42rem] overflow-hidden flex items-end">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={retreatImage}
          alt="Nature retreat cabin"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full grid lg:grid-cols-12 border-t-2 border-primary-foreground/50">
        <div className="lg:col-span-8 px-6 py-12 sm:px-10 lg:px-16 xl:px-24 bg-primary/90 lg:border-r-2 border-primary-foreground/50">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Immersion · 04</span>
          <h2 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-none text-primary-foreground">
            {t('cta.title')}
          </h2>
          <p className="mt-6 text-xl sm:text-2xl text-primary-foreground/80 max-w-2xl">
            {t('cta.subtitle')}
          </p>

        </div>
        <div className="lg:col-span-4 p-8 sm:p-10 bg-background flex flex-col justify-between gap-10">
          <div className="flex flex-wrap gap-4">
            <div className="inline-flex items-center px-4 py-2 border border-primary text-primary">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">2026</span>
            </div>
            <div className="inline-flex items-center px-4 py-2 border border-primary text-primary">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">France</span>
            </div>
          </div>

          <Button size="lg" asChild>
            <a href="/contact">{t('cta.button')}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RetreatsCTA;
