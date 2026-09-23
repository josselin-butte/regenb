import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Lien de paiement (Stripe) de la formation Nature Values Compass — à remplacer
const BUY_URL = 'https://buy.stripe.com/REMPLACER_PAR_VOTRE_LIEN';

const Compass = () => {
  const { t } = useLanguage();

  const steps = [1, 2, 3, 4, 5, 6];
  const howItems = [1, 2, 3, 4];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
          <div className="mx-auto max-w-measure">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('compass.kicker')}</p>
            <h1 className="mt-6 text-3xl sm:text-4xl">{t('compass.title')}</h1>
            <div className="mt-6 space-y-4">
              <p>{t('compass.lead1')}</p>
              <p>{t('compass.lead2')}</p>
            </div>
            <Button size="lg" asChild className="mt-8">
              <a href={BUY_URL} target="_blank" rel="noopener noreferrer">{t('compass.buy')}</a>
            </Button>
          </div>
        </section>

        <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-measure">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('compass.why.kicker')}</p>
            <h2 className="mt-4 text-2xl sm:text-3xl">{t('compass.why.title')}</h2>
            <div className="mt-6 space-y-4">
              <p>{t('compass.why.text1')}</p>
              <p className="border-l-2 border-primary pl-5 text-primary">{t('compass.why.text2')}</p>
            </div>
          </div>
        </section>

        <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-measure">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('compass.steps.kicker')}</p>
            <h2 className="mt-4 text-2xl sm:text-3xl">{t('compass.steps.title')}</h2>
            <ol className="mt-6 border-t border-border">
              {steps.map((step) => (
                <li key={step} className="flex gap-4 border-b border-border py-4">
                  <span className="shrink-0 text-primary">0{step}</span>
                  <span>{t(`compass.step${step}`)}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-measure">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('compass.how.kicker')}</p>
            <h2 className="mt-4 text-2xl sm:text-3xl">{t('compass.how.title')}</h2>
            <ul className="mt-6 space-y-3">
              {howItems.map((item) => (
                <li key={item} className="border-l-2 border-border pl-5">
                  {t(`compass.how.item${item}`)}
                </li>
              ))}
            </ul>
            <p className="mt-6">{t('compass.who.text')}</p>
          </div>
        </section>

        <section className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-measure">
            <h2 className="text-2xl sm:text-3xl">{t('compass.cta.title')}</h2>
            <p className="mt-6">{t('compass.cta.text')}</p>
            <Button size="lg" asChild className="mt-8">
              <a href={BUY_URL} target="_blank" rel="noopener noreferrer">{t('compass.buy')}</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Compass;
