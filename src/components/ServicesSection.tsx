import { useLanguage } from '@/contexts/LanguageContext';
import { TreeDeciduous, Brain, Monitor, Mountain, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: TreeDeciduous,
    titleKey: 'services.leadership.title',
    descKey: 'services.leadership.desc',
    gradient: 'from-forest to-forest-light',
  },
  {
    icon: Brain,
    titleKey: 'services.reflective.title',
    descKey: 'services.reflective.desc',
    gradient: 'from-earth to-terracotta',
  },
  {
    icon: Monitor,
    titleKey: 'services.nature.title',
    descKey: 'services.nature.desc',
    gradient: 'from-sage to-muted',
  },
  {
    icon: Mountain,
    titleKey: 'services.retreats.title',
    descKey: 'services.retreats.desc',
    gradient: 'from-primary to-forest',
  },
];

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 sm:py-32 bg-gradient-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-semibold text-foreground mb-6">
            {t('services.title')}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6">
            {t('services.subtitle')}
          </p>
          <p className="text-base sm:text-lg text-muted-foreground/90 italic">
            {t('services.intro')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.titleKey}
                className="group relative overflow-hidden border-0 shadow-soft hover:shadow-elevated transition-all duration-500 bg-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 sm:p-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${service.gradient} text-primary-foreground mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground mb-4">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {t(service.descKey)}
                  </p>

                  {/* Link */}
                  <a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                  >
                    {t('services.learn')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </a>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-muted/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
