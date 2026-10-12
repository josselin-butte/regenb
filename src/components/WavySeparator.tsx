import { useEffect, useRef } from 'react';

// Only the upper visible separator moves.
const visible = new Set<HTMLDivElement>();
const update = () => {
  let top: HTMLDivElement | null = null;
  visible.forEach((el) => {
    if (!top || el.getBoundingClientRect().top < top.getBoundingClientRect().top) top = el;
  });
  document.querySelectorAll<HTMLDivElement>('.wavy-sep').forEach((el) => {
    el.classList.toggle('is-flowing', el === top);
  });
};

const WAVE = 24; // wavelength
const path = `M0 6 ${Array.from({ length: 120 }, () => `q${WAVE / 4} -5 ${WAVE / 2} 0 t${WAVE / 2} 0`).join(' ')}`;

const WavySeparator = ({ className = '' }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) visible.add(el);
      else visible.delete(el);
      update();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      visible.delete(el);
      update();
    };
  }, []);

  return (
    <div ref={ref} className={`wavy-sep w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg height="12" width={WAVE * 120} viewBox={`0 0 ${WAVE * 120} 12`} className="wavy-sep-line block" fill="none" focusable="false">
        <path d={path} stroke="#395641" strokeWidth={1.5} strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default WavySeparator;
