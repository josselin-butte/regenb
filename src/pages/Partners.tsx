import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface Partner {
  id: string;
  nameKey: string;
  descriptionKey: string;
  typeKey: string;
  logo: string;
  url: string;
}

const partners: Partner[] = [
  {
    id: 'regenb-global',
    nameKey: 'partners.regenb.name',
    descriptionKey: 'partners.regenb.description',
    typeKey: 'partners.type.network',
    logo: '🌍',
    url: 'https://regenb.com',
  },
  {
    id: 'nature-coaching',
    nameKey: 'partners.naturecoaching.name',
    descriptionKey: 'partners.naturecoaching.description',
    typeKey: 'partners.type.training',
    logo: '🌿',
    url: '#',
  },
  {
    id: 'eco-retreats',
    nameKey: 'partners.ecoretreats.name',
    descriptionKey: 'partners.ecoretreats.description',
    typeKey: 'partners.type.venue',
    logo: '🏡',
    url: '#',
  },
  {
    id: 'leadership-institute',
    nameKey: 'partners.leadership.name',
    descriptionKey: 'partners.leadership.description',
    typeKey: 'partners.type.certification',
    logo: '🎓',
    url: '#',
  },
  {
    id: 'forest-therapy',
    nameKey: 'partners.foresttherapy.name',
    descriptionKey: 'partners.foresttherapy.description',
    typeKey: 'partners.type.association',
    logo: '🌲',
    url: '#',
  },
  {
    id: 'mindful-business',
    nameKey: 'partners.mindfulbusiness.name',
    descriptionKey: 'partners.mindfulbusiness.description',
    typeKey: 'partners.type.consulting',
    logo: '💼',
    url: '#',
  },
];

const Partners = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-6">
                {t('partners.page.title')}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground">
                {t('partners.page.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner) => (
                <Card
                  key={partner.id}
                  className="group bg-card hover:shadow-lg transition-all duration-300 border-border/50"
                >
                  <CardContent className="p-8">
                    {/* Logo & Type */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-5xl">{partner.logo}</div>
                      <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {t(partner.typeKey)}
                      </span>
                    </div>

                    {/* Name */}
                    <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">
                      {t(partner.nameKey)}
                    </h2>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6">
                      {t(partner.descriptionKey)}
                    </p>

                    {/* Link */}
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {t('partners.visit')}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-serif font-semibold mb-6">
              {t('partners.cta.title')}
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              {t('partners.cta.subtitle')}
            </p>
            <a
              href="mailto:josselin@regenb.com"
              className="inline-flex items-center px-6 py-3 bg-primary-foreground text-primary font-medium rounded-md hover:bg-primary-foreground/90 transition-colors"
            >
              {t('partners.cta.button')}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
