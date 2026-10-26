import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import ecoute from '@/assets/home-ecoute.webp.asset.json';
import ContinuoSignup from '@/components/ContinuoSignup';
import VoiceQuote from '@/components/VoiceQuote';

const NewsletterSection = () => {
  const { t } = useLanguage();

  return (
    <section id="letter" className="px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-measure text-center">
        <img src={`https://regenb.lovable.app${ecoute.url}`} alt={t('image.ecoute')} width={1600} height={1200} loading="lazy" className="mx-auto mb-7 aspect-[3/2] w-full max-w-[420px] object-cover" />
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('letter.kicker')}</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">{t('letter.title')}</h2>
        <p className="mx-auto mt-6">{t('letter.text')}</p>
        <div className="mx-auto mt-8 text-left">
          <VoiceQuote voiceKey="home.continuo" variant="inline" />
        </div>
        <ContinuoSignup />
        <Button asChild size="lg" className="mt-8">
          <a href="https://lecontinuo.substack.com" target="_blank" rel="noopener">
            {t('letter.cta')}
          </a>
        </Button>
      </div>
    </section>
  );
};

export default NewsletterSection;
