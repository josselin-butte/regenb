import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export type FacilitationCopy = {
  subtitle: string; caption: string;
  dimensions: { title: string; question: string; explanation: string }[];
};
export const FACIL_INTRO_MS = 2200;

// Each selectable dimension highlights one part of the drawing.
const parts = ['frame', 'open', 'choose', 'follow'] as const;
const voices = [40, 110, 180];
const options = [30, 80, 140, 190];
const openLines = voices.flatMap((y, v) => options.filter((_, o) => o === v || o === v + 1).map(oy => `M28 ${y} C80 ${y} 90 ${oy} 140 ${oy}`));

export default function FacilitationIllustration({ copy }: { copy: FacilitationCopy }) {
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'drawing' | 'done'>('idle');
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') { setPhase('done'); return; }
    let timer: number | undefined;
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      observer.disconnect();
      setPhase(p => (p === 'idle' ? 'drawing' : p));
      timer = window.setTimeout(() => setPhase('done'), FACIL_INTRO_MS);
    }, { threshold: 0.3 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);

  const choose = (index: number) => { setSelected(index); setPhase('done'); };
  const item = copy.dimensions[selected] ?? copy.dimensions[0];
  if (!item) return null;

  return (
    <div ref={root} className="facil mt-8 border-t border-border pt-8" data-active={parts[selected]} data-phase={phase}>
      <h3 className="text-xl font-semibold text-primary sm:text-2xl">{copy.subtitle}</h3>
      <p className="mt-3 text-muted-foreground">{copy.caption}</p>
      <div className="facil-grid mt-6">
        <svg viewBox="0 0 320 220" aria-hidden="true" focusable="false" className="facil-drawing">
          <rect x="6" y="8" width="308" height="204" pathLength={1} className="facil-frame facil-line" />
          <g className="facil-open">
            {openLines.map(d => <path key={d} d={d} pathLength={1} className="facil-line" />)}
            {voices.map(y => <circle key={y} cx="22" cy={y} r="7" className="facil-voice" />)}
            {options.map(y => <circle key={y} cx="146" cy={y} r="5" className="facil-option" />)}
          </g>
          <g className="facil-choose">
            <path d="M151 80 C190 80 195 110 226 110" pathLength={1} className="facil-line" />
            <path d="M151 140 C190 140 195 110 226 110" pathLength={1} className="facil-line" />
            <path d="M151 30 C185 30 200 50 220 56" className="facil-unchosen" />
            <path d="M151 190 C185 190 200 170 220 164" className="facil-unchosen" />
            <rect x="226" y="100" width="20" height="20" className="facil-choice" />
          </g>
          <g className="facil-follow">
            <path d="M246 110 L292 110" pathLength={1} className="facil-line" />
            <path d="M284 102 L294 110 L284 118" pathLength={1} className="facil-line" />
          </g>
        </svg>
        <div>
          <ul className="facil-choices">
            {copy.dimensions.map((d, i) => (
              <li key={d.title}>
                <Button type="button" variant="heroOutline" className="facil-choice-btn" aria-pressed={selected === i}
                  aria-controls="facil-detail" onClick={() => choose(i)}>{d.title}</Button>
              </li>
            ))}
          </ul>
          <div id="facil-detail" role="region" aria-live="polite" aria-label={item.title} className="mt-4 bg-secondary p-5">
            <p className="text-sm font-semibold">{item.title}</p>
            <h4 className="mt-2 text-lg font-semibold text-primary">{item.question}</h4>
            <p className="mt-2 text-foreground">{item.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
