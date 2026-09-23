import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import groupImage from '@/assets/group-nature.jpg';
import patternImage from '@/assets/pattern-organic.jpg';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-primary text-primary-foreground border-b-2 border-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <img src={patternImage} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 grid lg:grid-cols-12">
          {/* Image */}
          <div className="relative lg:col-span-5 min-h-[28rem] lg:min-h-[44rem] border-b-2 lg:border-b-0 lg:border-r-2 border-primary-foreground/30">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={groupImage}
                alt="Un temps d’accompagnement en pleine nature"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 px-6 py-16 sm:px-10 lg:px-16 xl:px-24 flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">{t('about.kicker')}</span>
            <h2 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-none text-primary-foreground">
              {t('about.title')}
            </h2>
            
            <div className="mt-10 grid gap-7 sm:grid-cols-2 sm:gap-10 mb-10">
              <p className="text-lg text-primary-foreground leading-relaxed">
                {t('about.text1')}
              </p>
              <p className="text-lg text-primary-foreground/75 leading-relaxed">
                {t('about.text2')}
              </p>
            </div>

            <Button variant="heroOutline" size="lg" asChild className="self-start">
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
    </section>
  );
};

export default AboutSection;
