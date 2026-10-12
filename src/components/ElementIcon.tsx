import { useEffect, useRef, useState } from 'react';

export type Element = 'earth' | 'water' | 'air' | 'fire';

interface ElementIconProps {
  element: Element;
  size?: number;
  animated?: boolean;
  drawOnView?: boolean;
  label?: string;
  className?: string;
  /** Draw-in delay in seconds. */
  delay?: number;
}

const OCHRE = '#D5B544';

const paths: Record<Element, JSX.Element> = {
  earth: (
    <>
      <path pathLength={1} d="M2 40 L16 22 L24 30 L34 14 L46 40" />
      <path pathLength={1} d="M0 46 H48" />
    </>
  ),
  water: (
    <g className="ei-water">
      <path pathLength={1} d="M0 12 q6 -7 12 0 t12 0 t12 0 t12 0" />
      <path pathLength={1} d="M0 26 q6 -7 12 0 t12 0 t12 0 t12 0" />
      <path pathLength={1} d="M0 40 q6 -7 12 0 t12 0 t12 0 t12 0" />
    </g>
  ),
  air: (
    <>
      <path pathLength={1} d="M8 48 C30 48 40 40 34 32 C28 24 12 30 16 22 C20 14 38 18 36 8" />
      <g className="ei-air-arrow">
        <path pathLength={1} stroke={OCHRE} d="M40 30 v-8 M36 25 l4 -4 l4 4" />
      </g>
    </>
  ),
  fire: (
    <g className="ei-fire">
      <path pathLength={1} d="M24 4 C32 16 40 22 38 34 C36 44 28 50 24 50 C18 50 10 44 10 34 C10 26 16 22 18 14 C22 20 24 24 24 4" />
      <path pathLength={1} stroke={OCHRE} d="M24 48 C20 46 18 42 20 36 C22 32 24 30 24 26 C28 32 30 36 28 42 C27 45 26 47 24 48" />
    </g>
  ),
};

const ElementIcon = ({ element, size = 48, animated = true, drawOnView = true, label, className, delay = 0 }: ElementIconProps) => {
  const ref = useRef<SVGSVGElement>(null);
  const [state, setState] = useState<'idle' | 'drawing' | 'done'>(drawOnView ? 'idle' : 'done');

  useEffect(() => {
    if (!drawOnView || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('drawing');
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [drawOnView]);

  const classes = [
    'element-icon',
    drawOnView && state !== 'done' ? `ei-draw ei-${state}` : '',
    animated && state === 'done' ? 'ei-animated' : '',
    className ?? '',
  ].join(' ');

  return (
    <svg
      ref={ref}
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="#395641"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      className={classes}
      style={{ ['--ei-delay' as string]: `${delay}s` }}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      onAnimationEnd={(e) => {
        if (state === 'drawing' && e.animationName === 'ei-draw') setState('done');
      }}
    >
      {paths[element]}
    </svg>
  );
};

export default ElementIcon;
