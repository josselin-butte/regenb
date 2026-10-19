import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export type ProgrammeCopy = {
  subtitle: string; caption: string; strands: [string, string];
  dimensions: { title: string; question: string; explanation: string }[];
};
export const PROG_INTRO_MS = 2200;

// Two strands crossing at four meeting points (x = 50, 120, 190, 260; y = 110).
const learning = 'M15 75 C50 75 50 145 85 145 C120 145 120 75 155 75 C190 75 190 145 225 145 C260 145 260 75 295 75';
const practice = 'M15 145 C50 145 50 75 85 75 C120 75 120 145 155 145 C190 145 190 75 225 75 C260 75 260 145 295 145';
const feedback = 'M260 98 C245 40 135 40 120 98';
const points = [50, 120, 190, 260];

function Drawing({ selected, vertical }: { selected: number; vertical?: boolean }) {
  const body = (
    <>
      <path d={practice} pathLength={1} className="prog-practice prog-line" />
      <path d={learning} pathLength={1} className="prog-learning prog-line" />
      <path d={feedback} className="prog-feedback" />
      <path d="M126 88 L120 98 L114 89" className="prog-feedback-head" />
      {points.map((x, i) => (
        <g key={x} className="prog-point" data-on={selected === i}>
          <circle cx={x} cy="110" r="13" className="prog-ring" />
          <circle cx={x} cy="110" r="7" className="prog-dot" />
        </g>
      ))}
    </>
  );
  return vertical ? (
    <svg viewBox="0 0 200 310" aria-hidden="true" focusable="false" className="prog-drawing prog-vertical">
      <g transform="translate(200 0) rotate(90)">{body}</g>
    </svg>
  ) : (
    <svg viewBox="0 0 310 200" aria-hidden="true" focusable="false" className="prog-drawing prog-horizontal">{body}</svg>
  );
}

export default function ProgrammeIllustration({ copy }: { copy: ProgrammeCopy }) {
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
      timer = window.setTimeout(() => setPhase('done'), PROG_INTRO_MS);
    }, { threshold: 0.3 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);

  const item = copy.dimensions[selected] ?? copy.dimensions[0];
  if (!item) return null;

  return (
    <div ref={root} className="prog mt-8 border-t border-border pt-8" data-phase={phase}>
      <h3 className="text-xl font-semibold text-primary sm:text-2xl">{copy.subtitle}</h3>
      <p className="mt-3 text-muted-foreground">{copy.caption}</p>
      <div className="prog-grid mt-6">
        <div>
          <Drawing selected={selected} />
          <Drawing selected={selected} vertical />
          <ul className="prog-legend mt-3 text-sm">
            <li><span className="prog-swatch prog-swatch-learning" aria-hidden="true" />{copy.strands[0]}</li>
            <li><span className="prog-swatch prog-swatch-practice" aria-hidden="true" />{copy.strands[1]}</li>
          </ul>
        </div>
        <div>
          <ul className="prog-choices">
            {copy.dimensions.map((d, i) => (
              <li key={d.title}>
                <Button type="button" variant="heroOutline" className="prog-choice-btn" aria-pressed={selected === i}
                  aria-controls="prog-detail" onClick={() => { setSelected(i); setPhase('done'); }}>{d.title}</Button>
              </li>
            ))}
          </ul>
          <div id="prog-detail" role="region" aria-live="polite" aria-label={item.title} className="mt-4 bg-secondary p-5">
            <p className="text-sm font-semibold">{item.title}</p>
            <h4 className="mt-2 text-lg font-semibold text-primary">{item.question}</h4>
            <p className="mt-2 text-foreground">{item.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
