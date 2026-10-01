import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const { t, language } = useLanguage();

  useEffect(() => {
    const title = t('home.title');
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative px-5 pb-24 pt-20 sm:px-8 sm:pb-[150px] sm:pt-28 lg:px-12">
      <div className="relative z-10 mx-auto max-w-measure">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('hero.eyebrow')}</p>
        <h1 className="mt-7 text-[2.4rem] leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {t('tagline')}
        </h1>
        <p className="mt-8 text-xl leading-relaxed">{t('hero.sentence1')}</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t('hero.sentence2')}</p>
        <Button size="lg" asChild className="mt-10">
          <Link to="/boussole">{t('hero.cta')}</Link>
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72px] sm:h-[120px]" aria-hidden="true">
        <svg viewBox="0 290 1584 106" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true" focusable="false">
          <path d="M0 330 C120 318 210 300 300 306 C380 312 430 290 520 296 C620 303 700 318 820 312 C940 306 1010 322 1120 326 C1230 330 1330 318 1420 322 C1490 325 1540 330 1584 328 L1584 396 L0 396 Z" fill="#E4EADB"/>
          <path d="M0 360 C140 352 260 340 380 346 C520 353 640 366 800 362 C960 358 1080 368 1240 366 C1380 364 1480 370 1584 368 L1584 396 L0 396 Z" fill="#EFE8DC"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
