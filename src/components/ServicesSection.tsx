import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    titleKey: 'services.leadership.title',
    descKey: 'services.leadership.desc',
  },
  {
    titleKey: 'services.reflective.title',
    descKey: 'services.reflective.desc',
  },
  {
    titleKey: 'services.nature.title',
    descKey: 'services.nature.desc',
  },
  {
    titleKey: 'services.retreats.title',
    descKey: 'services.retreats.desc',
  },
];

const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-background border-b-2 border-primary">
      <div className="grid lg:grid-cols-12">
        {/* Header */}
        <div className="lg:col-span-5 px-6 py-16 sm:px-10 lg:px-16 xl:px-24 lg:border-r-2 border-primary">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">Édition · 02</span>
          <h2 className="mt-5 text-4xl sm:text-6xl font-black uppercase leading-none text-primary">
            {t('services.title')}
          </h2>
          <p className="mt-8 text-xl font-medium text-primary">
            {t('services.subtitle')}
          </p>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            {t('services.intro')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="lg:col-span-7 grid sm:grid-cols-2">
          {services.map((service, index) => {
            return (
              <article
                key={service.titleKey}
                className={`group min-h-72 p-7 sm:p-9 flex flex-col justify-between border-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground ${index % 2 === 0 ? 'sm:border-r-2' : ''} ${index < 2 ? 'border-b-2' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-black text-accent">0{index + 1}</span>
                  <ArrowUpRight className="h-5 w-5 text-primary group-hover:text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase leading-tight text-primary group-hover:text-primary-foreground">
                    {t(service.titleKey)}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground group-hover:text-primary-foreground/75">
                    {t(service.descKey)}
                  </p>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent"
                  >
                    {t('services.learn')}
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
