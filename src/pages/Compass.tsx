import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompassAudio from '@/components/compass/CompassAudio';
import heroImg from '@/assets/boussole/boussole-hero.jpg.asset.json';
import earthImg from '@/assets/boussole/boussole-earth.jpg.asset.json';
import waterImg from '@/assets/boussole/boussole-water.jpg.asset.json';
import airImg from '@/assets/boussole/boussole-air.jpg.asset.json';
import fireImg from '@/assets/boussole/boussole-fire.jpg.asset.json';
import portraitImg from '@/assets/boussole/boussole-portrait.jpg.asset.json';
import closingImg from '@/assets/boussole/boussole-closing.jpg.asset.json';

// Page de vente de la formation Nature Values Compass
const BUY_URLS = { fr: 'https://valuescourse.regenb.com/?lang=fr', en: 'https://valuescourse.regenb.com/?lang=en' } as const;

const Compass = () => {
  const { t, language } = useLanguage();
  const BUY_URL = BUY_URLS[language];

  const steps = [1, 2, 3, 4, 5, 6];
  const howItems = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">{t('compass.kicker')}</p>
            </div>
            <div className="lg:col-span-9">
              <h1 className="mt-6 text-[2.1rem] leading-[1.15] sm:text-5xl lg:mt-0">{t('compass.title')}</h1>
              <div className="mt-8 gap-12 sm:columns-2 [&>p]:mb-4 [&>p]:break-inside-avoid">
                <p>{t('compass.lead1')}</p>
                <p>{t('compass.lead2')}</p>
              </div>
              <Button size="lg" asChild className="mt-8">
                <a href={BUY_URL} target="_blank" rel="noopener noreferrer">{t('compass.buy')}</a>
              </Button>
            </div>
            <figure className="mt-10 lg:col-span-12">
              <img src={heroImg.url} alt={t('compass.img.hero.alt')} className="max-h-[520px] w-full object-cover" />
            </figure>
          </div>
        </section>

        <section className="border-b border-border bg-secondary px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">{t('compass.why.kicker')}</p>
              <h2 className="mt-4 text-2xl sm:text-3xl">{t('compass.why.title')}</h2>
            </div>
            <div className="mt-6 lg:col-span-9 lg:mt-0">
              <p className="max-w-measure">{t('compass.why.text1')}</p>
              <p className="mt-6 max-w-measure border-l-2 border-primary pl-5 text-primary">{t('compass.why.text2')}</p>
              <p className="mt-6 max-w-measure">{t('compass.why.text3')}</p>
              <CompassAudio />
            </div>
          </div>
        </section>

        <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">{t('compass.steps.kicker')}</p>
              <h2 className="mt-4 text-2xl sm:text-3xl">{t('compass.steps.title')}</h2>
            </div>
            <ol className="mt-6 grid gap-x-12 border-t border-border sm:grid-cols-2 lg:col-span-9 lg:mt-0">
              {steps.map((step) => (
                <li key={step} className="flex gap-4 border-b border-border py-4">
                  <span className="shrink-0 text-accent">0{step}</span>
                  <span>{t(`compass.step${step}`)}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:col-span-9 lg:col-start-4">
              <img src={earthImg.url} alt={t('compass.img.earth.alt')} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <img src={waterImg.url} alt={t('compass.img.water.alt')} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <img src={airImg.url} alt={t('compass.img.air.alt')} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <img src={fireImg.url} alt={t('compass.img.fire.alt')} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-secondary px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">{t('compass.how.kicker')}</p>
              <h2 className="mt-4 text-2xl sm:text-3xl">{t('compass.how.title')}</h2>
            </div>
            <div className="mt-6 lg:col-span-9 lg:mt-0">
              <ul className="grid gap-4 sm:grid-cols-2 sm:gap-x-12">
                {howItems.map((item) => (
                  <li key={item} className="border-l-2 border-border pl-5">
                    {t(`compass.how.item${item}`)}
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-measure">{t('compass.who.text')}</p>
              <p className="mt-4 max-w-measure">{t('compass.who.text2')}</p>
              <figure className="mt-10 max-w-md">
                <img src={portraitImg.url} alt={t('compass.img.portrait.alt')} className="w-full object-cover" loading="lazy" />
              </figure>
            </div>
          </div>
        </section>

        <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
            <figure className="mb-10 lg:col-span-12">
              <img src={closingImg.url} alt={t('compass.img.closing.alt')} className="max-h-[420px] w-full object-cover" loading="lazy" />
            </figure>
            <div className="lg:col-span-8">
              <h2 className="text-2xl sm:text-3xl">{t('compass.cta.title')}</h2>
              <p className="mt-6 max-w-measure">{t('compass.cta.text')}</p>
            </div>
            <div className="mt-8 lg:col-span-4 lg:mt-0 lg:self-end">
              <p className="mb-2 text-sm text-muted-foreground">{t('compass.price')}</p>
              <p className="mb-4 text-sm text-muted-foreground">{t('compass.priceWhy')}</p>
              <Button size="lg" asChild className="w-full">
                <a href={BUY_URL} target="_blank" rel="noopener noreferrer">{t('compass.buy')}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Compass;
