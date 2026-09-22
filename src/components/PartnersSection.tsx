import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import xmNaturaeLogo from '@/assets/partners/xmnaturae-logo.png.asset.json';
import impactLogo from '@/assets/partners/impact-international-logo.png.asset.json';
import oulanBatLogo from '@/assets/partners/oulan-bat-logo.jpg.asset.json';
import earthConverseLogo from '@/assets/partners/earthconverse-logo.png.asset.json';

interface Partner {
  id: string;
  nameKey: string;
  descriptionKey: string;
  typeKey: string;
  logo?: string;
  url: string;
}

const partners: Partner[] = [
  {
    id: 'celine-butte',
    nameKey: 'partners.celine.name',
    descriptionKey: 'partners.celine.description',
    typeKey: 'partners.type.therapy',
    url: '#',
  },
  {
    id: 'xm-naturae',
    nameKey: 'partners.xmnaturae.name',
    descriptionKey: 'partners.xmnaturae.description',
    typeKey: 'partners.type.nature',
    logo: xmNaturaeLogo.url,
    url: 'https://www.xmnaturae.com/about-us',
  },
  {
    id: 'impact-international',
    nameKey: 'partners.impact.name',
    descriptionKey: 'partners.impact.description',
    typeKey: 'partners.type.leadership',
    logo: impactLogo.url,
    url: 'https://www.impactinternational.com/',
  },
  {
    id: 'regenb',
    nameKey: 'partners.regenb.name',
    descriptionKey: 'partners.regenb.description',
    typeKey: 'partners.type.network',
    url: 'https://regenb.com',
  },
  {
    id: 'atelier-alveoles',
    nameKey: 'partners.alveoles.name',
    descriptionKey: 'partners.alveoles.description',
    typeKey: 'partners.type.permaculture',
    url: 'https://alveoles.fr/atelier',
  },
  {
    id: 'ferme-oulan-bat',
    nameKey: 'partners.oulan.name',
    descriptionKey: 'partners.oulan.description',
    typeKey: 'partners.type.hospitality',
    logo: oulanBatLogo.url,
    url: 'https://www.lafermedoulanbat.fr/',
  },
  {
    id: 'earth-converse',
    nameKey: 'partners.earthconverse.name',
    descriptionKey: 'partners.earthconverse.description',
    typeKey: 'partners.type.leadership',
    logo: earthConverseLogo.url,
    url: 'https://earthconverse.com/',
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
                <div className="flex min-h-20 items-start justify-between gap-4 mb-4">
                  <div className="flex h-20 min-w-0 flex-1 items-center">
                    {partner.logo ? (
                      <>
                        <img
                          src={partner.logo}
                          alt={`${t(partner.nameKey)} logo`}
                          className="max-h-16 max-w-44 object-contain object-left"
                          onError={(event) => {
                            event.currentTarget.hidden = true;
                            const fallback = event.currentTarget.nextElementSibling;
                            if (fallback instanceof HTMLElement) fallback.hidden = false;
                          }}
                        />
                        <span hidden className="text-xl font-serif font-semibold text-foreground">
                          {t(partner.nameKey)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-serif font-semibold text-foreground">
                        {t(partner.nameKey)}
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 text-xs font-medium px-3 py-1 bg-primary/10 text-primary">
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
