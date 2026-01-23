import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import groupImage from '@/assets/group-nature.jpg';
import patternImage from '@/assets/pattern-organic.jpg';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 sm:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img
          src={patternImage}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden shadow-nature">
              <img
                src={groupImage}
                alt="Group coaching session in nature"
                className="w-full h-auto aspect-square object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-sage/40 blur-2xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-terracotta/20 blur-2xl" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-8">
              {t('about.title')}
            </h2>
            
            <div className="space-y-6 mb-10">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.text1')}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.text2')}
              </p>
            </div>

            <Button variant="outline" size="lg" asChild>
              <a
                href="https://regenb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                {t('about.visit')}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
