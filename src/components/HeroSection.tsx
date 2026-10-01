import { useEffect, useRef } from 'react';

const RIDGE_FILL = 'M0 150 C160 146 300 128 420 118 C470 114 490 104 520 108 C600 118 700 122 820 104 C900 92 980 70 1060 34 C1080 26 1092 30 1104 44 C1140 84 1170 98 1205 92 C1230 88 1250 66 1276 60 C1290 57 1300 66 1312 78 C1380 124 1480 140 1584 142 L1584 190 L0 190 Z';
const RIDGE_LINE = 'M0 150 C160 146 300 128 420 118 C470 114 490 104 520 108 C600 118 700 122 820 104 C900 92 980 70 1060 34 C1080 26 1092 30 1104 44 C1140 84 1170 98 1205 92 C1230 88 1250 66 1276 60 C1290 57 1300 66 1312 78 C1380 124 1480 140 1584 142';

import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import dehors from '@/assets/home-dehors.webp.asset.json';

const HeroSection = () => {
  const { t, language } = useLanguage();
  const ridgeDesk = useRef<SVGPathElement>(null);
  const ridgeMob = useRef<SVGPathElement>(null);

  useEffect(() => {
    [ridgeDesk.current, ridgeMob.current].forEach((el) => {
      if (!el) return;
      el.style.setProperty('--ridge-len', String(el.getTotalLength()));
      el.classList.add('is-drawing');
    });
  }, []);

  useEffect(() => {
    const title = t('home.title');
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative px-5 pb-[96px] pt-[81px] sm:px-8 sm:pb-[118px] sm:pt-[89px] lg:px-12">
      <div className="-mx-5 mb-5 h-16 sm:-mx-8 sm:mb-7 sm:h-[110px] lg:-mx-12" aria-hidden="true">
        <svg viewBox="0 20 1584 140" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true" focusable="false" className="hidden h-full w-full sm:block">
          <circle className="hero-sun" cx="1130" cy="74" r="44" fill="#D6A63E"/>
          <path d={RIDGE_FILL} fill="#F9F7F0"/>
          <path ref={ridgeDesk} className="hero-ridge" d={RIDGE_LINE} fill="none" stroke="#103C23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
        </svg>
        <svg viewBox="700 20 884 140" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true" focusable="false" className="block h-full w-full sm:hidden">
          <circle className="hero-sun" cx="1130" cy="74" r="44" fill="#D6A63E"/>
          <path d={RIDGE_FILL} fill="#F9F7F0"/>
          <path ref={ridgeMob} className="hero-ridge" d={RIDGE_LINE} fill="none" stroke="#103C23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
        </svg>
      </div>
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
        <div className="max-w-measure">
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
        <img src={`https://regenb.lovable.app${dehors.url}`} alt={t('image.dehors')} width={1280} height={853} loading="eager" fetchPriority="high" className="aspect-[4/3] w-full object-cover lg:aspect-[4/5] lg:max-h-[520px]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-[70px]" aria-hidden="true">
        <svg viewBox="0 140 1584 50" preserveAspectRatio="none" aria-hidden="true" focusable="false" width="100%" height="100%" className="overflow-hidden">
          <g className="hero-hill-back"><path d="M-40 160 C120 150 240 136 360 142 C480 148 560 132 700 138 C840 144 960 156 1100 150 C1240 144 1380 152 1624 148 L1624 190 L-40 190 Z" fill="#E4EADB"/></g>
          <g className="hero-hill-front"><path d="M-40 176 C140 170 280 162 420 166 C580 171 700 180 860 177 C1020 174 1160 182 1320 180 C1440 179 1540 183 1624 182 L1624 190 L-40 190 Z" fill="#EFE8DC"/></g>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
