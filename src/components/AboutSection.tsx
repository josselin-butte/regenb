import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ElementIcon from '@/components/ElementIcon';
import randonneeAsset from '@/assets/josselin-butte-randonnee.webp.asset.json';
import { voices } from '@/content/voices';

const AboutSection = () => {
  const { t, language } = useLanguage();
  const kimmerer = voices[0];
  const quote = language === 'fr' ? `« ${kimmerer.fr} »` : `“${kimmerer.en}”`;

  const principles = [
    { n: 1, element: 'earth' },
    { n: 2, element: 'air' },
    { n: 3, element: 'water' },
    { n: 4, element: 'fire' },
  ] as const;

  const [on, setOn] = useState(false);
  const [sel, setSel] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const tileRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onTilesKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (sel + (e.key === 'ArrowRight' ? 1 : principles.length - 1)) % principles.length;
    setSel(next);
    tileRefs.current[next]?.focus();
  };

  return (
    <section id="about" ref={ref} data-phase={on ? 'on' : 'idle'} className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:gap-14">
        <div className="overflow-hidden">
          <img
            src={`https://regenb.lovable.app${randonneeAsset.url}`}
            alt={t('image.randonnee')}
            width={1000}
            height={666}
            loading="lazy"
            decoding="async"
            className="about-photo w-full object-cover object-[30%_center]"
          />
        </div>
        <div className="max-w-measure">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('about.kicker')}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{t('nav.about')}</h2>
          <p className="mt-6">{t('about.p1')}</p>
          <blockquote className="mt-10 border-l-2 border-accent pl-6">
            <p className="font-serif text-xl leading-snug text-primary">{quote}</p>
            <footer className="mt-2 text-sm text-muted-foreground">{kimmerer.name}, {kimmerer.year}</footer>
          </blockquote>
          <div role="tablist" aria-label={t('about.guide.kicker')} onKeyDown={onTilesKeyDown} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {principles.map((p, i) => (
              <button
                key={p.n}
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={sel === i}
                aria-controls="about-principle"
                tabIndex={sel === i ? 0 : -1}
                onClick={() => setSel(i)}
                onMouseEnter={() => setSel(i)}
                onFocus={() => setSel(i)}
                className={`about-tile flex flex-col items-start gap-3 border p-4 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  sel === i ? 'border-[#395641] bg-[#395641] text-[#F9F7F0]' : 'border-border bg-background text-primary'
                }`}
              >
                <ElementIcon element={p.element} size={28} animated={false} drawOnView={false} />
                <span className="font-serif text-[15px] font-medium leading-snug">{t(`about.guide.${p.n}.title`)}</span>
              </button>
            ))}
          </div>
          <p id="about-principle" role="tabpanel" key={sel} className="about-desc mt-4 border-l-2 border-[#D5B544] pl-4 text-[15px] leading-relaxed text-muted-foreground">
            {t(`about.guide.${sel + 1}.text`)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
