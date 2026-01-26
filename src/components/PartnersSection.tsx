import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
];

const PartnersSection = () => {
  const { t } = useLanguage();

  // Show only first 3 partners on homepage
  const featuredPartners = partners.slice(0, 3);

  return (
    <section id="partners" className="py-20 sm:py-28 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-6">
            {t('partners.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('partners.subtitle')}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPartners.map((partner) => (
            <Card
              key={partner.id}
              className="group bg-card hover:shadow-lg transition-all duration-300 border-border/50"
            >
              <CardContent className="p-6">
                {/* Logo & Type */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{partner.logo}</div>
                  <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {t(partner.typeKey)}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                  {t(partner.nameKey)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
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
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA to full page */}
        <div className="text-center">
          <Button variant="outline" asChild>
            <Link to="/partenariats">
              {t('partners.seeAll')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
