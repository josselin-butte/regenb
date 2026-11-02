import { useEffect, useRef } from 'react';

const RIDGE_FILL = 'M0 150 C160 146 300 128 420 118 C470 114 490 104 520 108 C600 118 700 122 820 104 C900 92 980 70 1060 34 C1080 26 1092 30 1104 44 C1140 84 1170 98 1205 92 C1230 88 1250 66 1276 60 C1290 57 1300 66 1312 78 C1380 124 1480 140 1584 142 L1584 190 L0 190 Z';
const RIDGE_LINE = 'M0 150 C160 146 300 128 420 118 C470 114 490 104 520 108 C600 118 700 122 820 104 C900 92 980 70 1060 34 C1080 26 1092 30 1104 44 C1140 84 1170 98 1205 92 C1230 88 1250 66 1276 60 C1290 57 1300 66 1312 78 C1380 124 1480 140 1584 142';

import { useLanguage } from '@/contexts/LanguageContext';
import ElementIcon, { type Element } from '@/components/ElementIcon';
import josselin from '@/assets/josselin-butte-pyrenees.webp.asset.json';

export const SELECT_DOOR_EVENT = 'regenb:select-door';

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
};

const goToDoor = (i: number) => {
  window.dispatchEvent(new CustomEvent(SELECT_DOOR_EVENT, { detail: i }));
  scrollToId('doors');
};

const ELEMENTS: { el: Element; target: number | 'carnet' }[] = [
  { el: 'earth', target: 0 },
  { el: 'water', target: 1 },
  { el: 'air', target: 2 },
  { el: 'fire', target: 'carnet' },
];

const HeroSection = () => {
  const { t } = useLanguage();
  const ridgeDesk = useRef<SVGPathElement>(null);
  const ridgeMob = useRef<SVGPathElement>(null);

  useEffect(() => {
    [ridgeDesk.current, ridgeMob.current].forEach((el) => {
      if (!el || typeof el.getTotalLength !== 'function') return;
      el.style.setProperty('--ridge-len', String(el.getTotalLength()));
      el.classList.add('is-drawing');
    });
  }, []);

  const phrase = (key: string, door: number, n: number) => (
    <button type="button" className={`hero-link hero-link-${n}`} onClick={() => goToDoor(door)}>
      {t(key)}
    </button>
  );

  return (
    <section className="relative px-5 pb-14 pt-20 sm:px-8 sm:pb-16 sm:pt-[88px] lg:px-12">
      <div className="-mx-5 mb-5 h-14 sm:-mx-8 sm:mb-6 sm:h-20 lg:-mx-12" aria-hidden="true">
        <svg viewBox="0 20 1584 140" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true" focusable="false" className="hidden h-full w-full sm:block">
          <circle className="hero-sun" cx="1130" cy="74" r="44" fill="#D5B544" />
          <path d={RIDGE_FILL} fill="#F9F7F0" />
          <path ref={ridgeDesk} className="hero-ridge" d={RIDGE_LINE} fill="none" stroke="#103C23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg viewBox="700 20 884 140" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true" focusable="false" className="block h-full w-full sm:hidden">
          <circle className="hero-sun" cx="1130" cy="74" r="44" fill="#D5B544" />
          <path d={RIDGE_FILL} fill="#F9F7F0" />
          <path ref={ridgeMob} className="hero-ridge" d={RIDGE_LINE} fill="none" stroke="#103C23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="relative z-10 mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
        <div className="max-w-measure">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('hero.eyebrow')}</p>
          <h1 className="mt-6 text-[2.4rem] leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">{t('tagline')}</h1>
          <p className="mt-7 text-xl leading-relaxed">
            {t('hero.s1.a')}
            {phrase('hero.s1.lead', 0, 1)}
            {t('hero.s1.b')}
            {phrase('hero.s1.support', 1, 2)}
            {t('hero.s1.c')}
            {phrase('hero.s1.redefine', 2, 3)}
            {t('hero.s1.d')}
          </p>
          <div className="mt-8 flex items-start gap-7">
            {ELEMENTS.map(({ el, target }, i) => (
              <button
                key={el}
                type="button"
                onClick={() => (target === 'carnet' ? scrollToId('carnet') : goToDoor(target))}
                className="hero-el group flex flex-col items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <span className={`hero-el-icon hero-el-${el}`}>
                  <ElementIcon element={el} size={28} delay={i * 0.25} animated={false} />
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-primary">
                  {t(`element.${el}`)}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollToId('doors')}
            className="mt-10 inline-flex items-center gap-3 text-sm font-medium text-primary transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <span className="hero-cue-dot inline-block h-2.5 w-2.5 rounded-full bg-[#D5B544]" aria-hidden="true" />
            {t('doors.title')}
          </button>
        </div>
        <img
          src={`https://regenb.lovable.app${josselin.url}`}
          alt={t('image.josselin')}
          width={1200}
          height={900}
          loading="eager"
          fetchPriority="high"
          className="hero-portrait order-first aspect-[4/3] w-full object-cover object-[50%_18%] lg:order-none lg:aspect-[4/5] lg:max-h-[460px]"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-[70px]" aria-hidden="true">
        <svg viewBox="0 140 1584 50" preserveAspectRatio="none" aria-hidden="true" focusable="false" width="100%" height="100%" className="overflow-hidden">
          <g className="hero-hill-back"><path d="M-40 160 C120 150 240 136 360 142 C480 148 560 132 700 138 C840 144 960 156 1100 150 C1240 144 1380 152 1624 148 L1624 190 L-40 190 Z" fill="#E4EADB" /></g>
          <g className="hero-hill-front"><path d="M-40 176 C140 170 280 162 420 166 C580 171 700 180 860 177 C1020 174 1160 182 1320 180 C1440 179 1540 183 1624 182 L1624 190 L-40 190 Z" fill="#EFE8DC" /></g>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
