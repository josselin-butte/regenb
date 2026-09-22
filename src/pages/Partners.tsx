import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import xmNaturaeLogo from '@/assets/partners/xmnaturae-logo.png.asset.json';
import impactLogo from '@/assets/partners/impact-international-logo.png.asset.json';
import regenBLogo from '@/assets/partners/regenb-logo.jpg.asset.json';
import alveolesLogo from '@/assets/partners/alveoles-logo.png.asset.json';
import oulanBatLogo from '@/assets/partners/oulan-bat-logo.jpg.asset.json';
import earthConverseLogo from '@/assets/partners/earthconverse-logo.png.asset.json';
import ecodomaineLogo from '@/assets/partners/ecodomaine-fontaine-logo.png.asset.json';
import inovOnLogo from '@/assets/partners/inovon-experience-logo.png.asset.json';

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
    logo: regenBLogo.url,
    url: 'https://regenb.com',
  },
  {
    id: 'atelier-alveoles',
    nameKey: 'partners.alveoles.name',
    descriptionKey: 'partners.alveoles.description',
    typeKey: 'partners.type.permaculture',
    logo: alveolesLogo.url,
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
  {
    id: 'ecodomaine-la-fontaine',
    nameKey: 'partners.ecodomaine.name',
    descriptionKey: 'partners.ecodomaine.description',
    typeKey: 'partners.type.hospitality',
    logo: ecodomaineLogo.url,
    url: 'https://www.ecodomaine-la-fontaine.fr/',
  },
  {
    id: 'inov-on-experience',
    nameKey: 'partners.inovon.name',
    descriptionKey: 'partners.inovon.description',
    typeKey: 'partners.type.transformation',
    logo: inovOnLogo.url,
    url: 'https://www.inov-on-experience.fr/',
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
                    <div className="flex min-h-24 items-start justify-between gap-5 mb-6">
                      <div className="flex h-24 min-w-0 flex-1 items-center">
                        {partner.logo ? (
                          <>
                            <img
                              src={partner.logo}
                              alt={`${t(partner.nameKey)} logo`}
                              className="max-h-20 max-w-52 object-contain object-left"
                              onError={(event) => {
                                event.currentTarget.hidden = true;
                                const fallback = event.currentTarget.nextElementSibling;
                                if (fallback instanceof HTMLElement) fallback.hidden = false;
                              }}
                            />
                            <span hidden className="text-2xl font-serif font-semibold text-foreground">
                              {t(partner.nameKey)}
                            </span>
                          </>
                        ) : (
                          <span className="text-2xl font-serif font-semibold text-foreground">
                            {t(partner.nameKey)}
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 text-xs font-medium px-3 py-1 bg-primary/10 text-primary">
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
              className="inline-flex items-center px-6 py-3 bg-primary-foreground text-primary font-medium hover:bg-primary-foreground/90 transition-colors"
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
