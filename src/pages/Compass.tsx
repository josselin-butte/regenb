import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import compassImage from '@/assets/retreat-cabin.jpg';

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
        {/* Hero */}
        <section className="border-b-2 border-primary px-6 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pt-44 xl:px-24 pb-16 sm:pb-20">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
              {t('compass.kicker')}
            </span>
            <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-[0.9] text-primary">
              {t('compass.title')}
            </h1>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-foreground sm:text-xl">
              <p>{t('compass.lead1')}</p>
              <p>{t('compass.lead2')}</p>
            </div>
            <Button variant="hero" size="lg" asChild className="mt-9">
              <a href={BUY_URL} target="_blank" rel="noopener noreferrer">
                {t('compass.buy')}<ArrowRight />
              </a>
            </Button>
          </div>
        </section>

        {/* Image */}
        <section className="border-b-2 border-primary">
          <img
            src={compassImage}
            alt="Un abri en pleine nature, posé au milieu des arbres"
            className="h-64 w-full object-cover sm:h-96"
          />
        </section>

        {/* Pourquoi */}
        <section className="border-b-2 border-primary px-6 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('compass.why.kicker')}</span>
            <h2 className="mt-5 text-3xl font-black uppercase leading-none text-primary sm:text-5xl">
              {t('compass.why.title')}
            </h2>
            <div className="mt-7 space-y-5 text-lg leading-relaxed text-foreground">
              <p>{t('compass.why.text1')}</p>
              <p className="border-l-4 border-accent pl-6 font-semibold text-primary">{t('compass.why.text2')}</p>
            </div>
          </div>
        </section>

        {/* Étapes */}
        <section className="border-b-2 border-primary px-6 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('compass.steps.kicker')}</span>
            <h2 className="mt-5 text-3xl font-black uppercase leading-none text-primary sm:text-5xl">
              {t('compass.steps.title')}
            </h2>
            <ol className="mt-9">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className={`flex items-baseline gap-6 border-t-2 border-primary/20 py-5 ${index === steps.length - 1 ? 'border-b-2' : ''}`}
                >
                  <span className="text-2xl font-black text-accent">0{step}</span>
                  <span className="text-lg font-medium leading-snug text-primary">{t(`compass.step${step}`)}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Format */}
        <section className="border-b-2 border-primary bg-primary px-6 py-16 sm:px-10 sm:py-20 lg:px-16 xl:px-24 text-primary-foreground">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/70">{t('compass.how.kicker')}</span>
            <h2 className="mt-5 text-3xl font-black uppercase leading-none sm:text-5xl">
              {t('compass.how.title')}
            </h2>
            <ul className="mt-9 space-y-4">
              {howItems.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-2 h-3 w-3 shrink-0 bg-accent" />
                  <span className="text-lg leading-snug">{t(`compass.how.item${item}`)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-9 text-lg leading-relaxed text-primary-foreground/90">{t('compass.who.text')}</p>
          </div>
        </section>

        {/* CTA achat */}
        <section className="border-b-2 border-primary bg-accent px-6 py-20 sm:px-10 sm:py-24 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-4xl font-black uppercase leading-none text-primary sm:text-6xl">
              {t('compass.cta.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-accent-foreground sm:text-xl">
              {t('compass.cta.text')}
            </p>
            <Button variant="default" size="lg" asChild className="mt-9">
              <a href={BUY_URL} target="_blank" rel="noopener noreferrer">
                {t('compass.buy')}<ArrowRight />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Compass;
