import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ElementIcon, { type Element } from '@/components/ElementIcon';

const TRAIL_PATH = 'M 40 84 C 280 30, 720 108, 960 52';
const STATION_FRACTIONS = [0.06, 0.5, 0.94];
// Approximate curve points, refined by measurement once mounted.
const FALLBACK_POINTS = [
  { x: 70, y: 76 },
  { x: 500, y: 74 },
  { x: 930, y: 55 },
];
const AUTOPLAY_MS = 6000;

interface Door {
  element: Element;
  to: string;
  lineKey: string | null;
  block: string;
  onOchre: boolean;
}

const DOORS: Door[] = [
  { element: 'earth', to: '/contact', lineKey: null, block: '#395641', onOchre: false },
  { element: 'water', to: '/supervision', lineKey: 'doors.2.line', block: '#5A7261', onOchre: false },
  { element: 'air', to: '/boussole', lineKey: 'doors.3.line', block: '#D5B544', onOchre: true },
];

const DoorsSection = () => {
  const { t, lp } = useLanguage();
  const [active, setActive] = useState(0);
  const [autoStopped, setAutoStopped] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [points, setPoints] = useState(FALLBACK_POINTS);
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Exact station positions on the curve (guarded: jsdom lacks SVG geometry).
  useEffect(() => {
    const path = pathRef.current;
    if (!path || typeof path.getTotalLength !== 'function') return;
    const len = path.getTotalLength();
    setPoints(
      STATION_FRACTIONS.map((f) => {
        const p = path.getPointAtLength(len * f);
        return { x: p.x, y: p.y };
      }),
    );
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => setInView(entries.some((e) => e.isIntersecting)), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const autoplay = !reduced && !autoStopped && inView;
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % DOORS.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, active]);

  const stopAutoplay = () => setAutoStopped(true);

  const select = (i: number) => {
    setActive(i);
    stopAutoplay();
  };

  const onTrailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (active + (e.key === 'ArrowRight' ? 1 : DOORS.length - 1)) % DOORS.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const door = DOORS[active];

  return (
    <section ref={rootRef} className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('doors.kicker')}</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">{t('doors.title')}</h2>

        {/* The trail */}
        <div className="relative mt-12 h-32 sm:h-36" onPointerDown={stopAutoplay} onFocusCapture={stopAutoplay}>
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
            <path d={TRAIL_PATH} fill="none" stroke="#E0E7D9" strokeWidth={34} strokeLinecap="round" />
            <path ref={pathRef} d={TRAIL_PATH} fill="none" stroke="#395641" strokeWidth={2} strokeDasharray="7 8" strokeLinecap="round" />
          </svg>
          {!reduced && (
            <span
              aria-hidden="true"
              className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D5B544] transition-all duration-[900ms] ease-in-out"
              style={{ left: `${points[active].x / 10}%`, top: `${points[active].y / 1.2}%` }}
            />
          )}
          <div role="tablist" aria-label={t('doors.title')} onKeyDown={onTrailKeyDown} className="absolute inset-0">
            {DOORS.map((d, i) => (
              <button
                key={d.element}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`doors-tab-${i}`}
                aria-selected={active === i}
                aria-controls="doors-panel"
                tabIndex={active === i ? 0 : -1}
                onClick={() => select(i)}
                className="absolute -translate-x-1/2 -translate-y-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                style={{ left: `${points[i].x / 10}%`, top: `${points[i].y / 1.2}%` }}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#395641] transition-all duration-300 sm:h-14 sm:w-14 ${
                    active === i ? 'scale-110 bg-[#E0E7D9]' : 'bg-[#F9F7F0]'
                  }`}
                >
                  <ElementIcon element={d.element} size={26} animated={false} drawOnView={false} />
                </span>
                <span
                  className={`absolute left-1/2 top-full mt-2 w-28 -translate-x-1/2 text-center text-xs leading-tight text-primary sm:text-sm ${
                    active === i ? 'font-semibold' : ''
                  }`}
                >
                  {t(`doors.station.${i + 1}`)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* The panel */}
        <div
          role="tabpanel"
          id="doors-panel"
          aria-labelledby={`doors-tab-${active}`}
          className="relative mt-16 overflow-hidden border border-[#C7CEC0] bg-[#F9F7F0]"
          onMouseEnter={stopAutoplay}
          onPointerDown={stopAutoplay}
          onFocusCapture={stopAutoplay}
        >
          <div className="flex flex-col md:grid md:grid-cols-[300px_1fr]">
            <div
              className="flex h-[72px] items-center justify-center transition-colors duration-500 md:h-auto md:min-h-[280px]"
              style={{ backgroundColor: door.block }}
            >
              <ElementIcon
                element={door.element}
                size={96}
                animated={false}
                drawOnView={false}
                className={`doors-panel-icon ${door.onOchre ? 'doors-panel-icon-on-ochre' : ''}`}
              />
            </div>
            <div key={active} className={`p-8 sm:p-10 ${reduced ? '' : 'doors-panel-in'}`}>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{t(`doors.panel.${active + 1}.eyebrow`)}</p>
              <h3 className="mt-3 font-serif text-2xl font-medium text-primary">{t(`doors.${active + 1}.title`)}</h3>
              <p className="mt-3 max-w-measure text-[15px] leading-relaxed text-muted-foreground">{t(`doors.${active + 1}.text`)}</p>
              {door.lineKey && <p className="mt-3 text-sm text-muted-foreground">{t(door.lineKey)}</p>}
              <Link
                to={lp(door.to)}
                className="mt-6 inline-block border-b-2 border-accent pb-1 font-semibold text-primary transition-colors hover:text-accent"
              >
                {t(`doors.${active + 1}.cta`)}
              </Link>
            </div>
          </div>
          {autoplay && <span key={active} aria-hidden="true" className="doors-progress" />}
        </div>

        <p className="mx-auto mt-12 max-w-measure text-center text-muted-foreground">
          {t('doors.curious')}{' '}
          <Link to={lp('/carnet')} className="border-b border-accent font-semibold text-primary transition-colors hover:text-accent">
            {t('doors.curious.link')}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default DoorsSection;
