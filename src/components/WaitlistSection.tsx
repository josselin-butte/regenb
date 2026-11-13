import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import marche from '@/assets/home-groupe.webp.asset.json';

const WaitlistSection = () => {
  const { t, lp } = useLanguage();

  return (
    <section id="waitlist" className="px-5 pb-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-measure border-t border-border pt-16 text-center">
        <img src={`https://regenb.lovable.app${marche.url}`} alt={t('image.marche')} width={1600} height={1200} loading="lazy" className="mx-auto mb-7 aspect-[3/2] w-full max-w-[420px] object-cover" />
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('waitlist.kicker')}</p>
        <h2 className="mt-4 text-2xl sm:text-3xl">{t('waitlist.title')}</h2>
        <p className="mt-5 text-muted-foreground">{t('waitlist.text')}</p>
        <Link
          to={lp('/etapes')}
          className="mt-7 inline-block border-b-2 border-accent pb-1 font-semibold text-primary transition-colors hover:text-accent"
        >
          {t('waitlist.cta')}
        </Link>
      </div>
    </section>
  );
};

export default WaitlistSection;
