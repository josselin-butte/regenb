import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const WAVE_X = `M -100 40 q 25 -14 50 0 ${'t 50 0 '.repeat(32)}`;
const WAVE_X2 = `M -100 84 q 25 -14 50 0 ${'t 50 0 '.repeat(32)}`;
const WAVE_Y = `M 22 -100 q -14 25 0 50 ${'t 0 50 '.repeat(32)}`;
const WAVE_Y2 = `M 44 -100 q -14 25 0 50 ${'t 0 50 '.repeat(32)}`;

const HowItStartsSection = () => {
  const { t, lp } = useLanguage();
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLElement>(null);

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
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} data-phase={on ? 'on' : 'idle'} className="relative overflow-hidden bg-secondary px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="relative mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('how.kicker')}</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">{t('how.title')}</h2>

        <div className="relative mt-10">
          {/* Stream band under the stones: horizontal on desktop, vertical on mobile */}
          <div className="how-stream left-0 right-0 top-0 hidden h-20 sm:block" aria-hidden="true">
            <svg viewBox="0 0 1400 120" preserveAspectRatio="none" className="h-full w-full" focusable="false">
              <g className="how-waves" fill="none" stroke="#F9F7F0" strokeWidth={2} strokeLinecap="round">
                <path d={WAVE_X} />
                <path d={WAVE_X2} />
              </g>
            </svg>
          </div>
          <div className="how-stream bottom-0 left-0 top-0 w-[88px] sm:hidden" aria-hidden="true">
            <svg viewBox="0 0 64 1400" preserveAspectRatio="none" className="h-full w-full" focusable="false">
              <g className="how-waves-v" fill="none" stroke="#F9F7F0" strokeWidth={2} strokeLinecap="round">
                <path d={WAVE_Y} />
                <path d={WAVE_Y2} />
              </g>
            </svg>
          </div>

          {/* Ochre hop line, drawn after the stones rise */}
          <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-20 sm:block" aria-hidden="true" focusable="false">
            <path className="how-hop" pathLength={1} d="M 166 42 Q 333 2 500 42 Q 667 2 834 42" fill="none" stroke="#D5B544" strokeWidth={2.5} strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 88 1120" preserveAspectRatio="none" className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[88px] sm:hidden" aria-hidden="true" focusable="false">
            <path className="how-hop" pathLength={1} d="M 44 60 Q 70 320 44 580 Q 18 840 44 1090" fill="none" stroke="#D5B544" strokeWidth={2.5} strokeLinecap="round" />
          </svg>

          <ol className="relative grid gap-10 sm:grid-cols-3 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <li key={n} className="flex items-center gap-5 sm:flex-col sm:gap-0 sm:text-center">
                <span className="how-stone relative block h-16 w-24 shrink-0 sm:mt-2" style={{ ['--d' as string]: `${(n - 1) * 0.7}s` }} aria-hidden="true">
                  <span className="absolute inset-x-0 bottom-0 h-12 rounded-[50%] bg-[#5A7261]" />
                  <span className="absolute inset-x-2 bottom-2 h-12 rounded-[50%] bg-[#395641]" />
                  <span className="absolute inset-0 flex items-center justify-center font-serif text-2xl leading-none text-[#D5B544]">{n}</span>
                </span>
                <p className="how-step-text leading-relaxed sm:mt-5" style={{ ['--d' as string]: `${(n - 1) * 0.7}s` }}>
                  {t(`how.${n}`)}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <Link to={lp('/contact')} className="how-cta mt-12 inline-block border-b-2 border-accent px-4 py-2 font-semibold text-primary">
          {t('how.cta')}
        </Link>
      </div>
    </section>
  );
};

export default HowItStartsSection;
