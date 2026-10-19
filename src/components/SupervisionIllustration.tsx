import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export type SupervisionCopy = {
  subtitle: string; caption: string; instruction: string; center: string; takeaway: string;
  dimensions: { title: string; question: string; explanation: string }[];
};
export const SUP_INTRO_MS = 2200;
// Internal keys only; never shown, no order implied.
const parts = ['experience', 'relationship', 'context', 'resources'] as const;

export default function SupervisionIllustration({ copy }: { copy: SupervisionCopy }) {
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
      timer = window.setTimeout(() => setPhase('done'), SUP_INTRO_MS);
    }, { threshold: 0.3 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);

  const item = copy.dimensions[selected] ?? copy.dimensions[0];
  if (!item) return null;

  return (
    <div ref={root} className="sup mt-8 border-t border-border pt-8" data-active={parts[selected]} data-phase={phase}>
      <h3 className="text-xl font-semibold text-primary sm:text-2xl">{copy.subtitle}</h3>
      <p className="mt-3 text-muted-foreground">{copy.caption}</p>
      <div className="sup-grid mt-6">
        <figure className="sup-figure">
          {/* A situation at the centre; open, offset arcs and a few links widen the field. No wheel, no target. */}
          <svg viewBox="0 0 320 230" aria-hidden="true" focusable="false" className="sup-drawing">
            <g className="sup-context">
              <path d="M70 50 C122 28 200 26 250 50" pathLength={1} className="sup-reveal" />
              <path d="M40 182 C96 210 170 214 222 200" pathLength={1} className="sup-reveal" />
              <path d="M286 84 C304 104 306 136 290 160" pathLength={1} className="sup-reveal" />
            </g>
            <g className="sup-relationship">
              <path d="M146 112 C124 102 104 90 82 84" pathLength={1} className="sup-reveal" />
              <path d="M178 112 C200 118 220 128 240 132" pathLength={1} className="sup-reveal" />
              <circle cx="78" cy="83" r="6" className="sup-node" />
              <circle cx="244" cy="133" r="6" className="sup-node" />
            </g>
            <g className="sup-resources">
              <path d="M152 124 C142 146 124 164 108 176" pathLength={1} className="sup-reveal" />
              <path d="M172 124 C186 146 200 164 214 178" pathLength={1} className="sup-reveal" />
              <rect x="102" y="172" width="11" height="11" className="sup-node" />
              <rect x="209" y="174" width="11" height="11" className="sup-node" />
            </g>
            {/* Reflective dialogue with a supervisor: beside, at the same level, never above. */}
            <path d="M56 128 C80 136 112 128 140 118" pathLength={1} className="sup-dialogue sup-reveal" />
            <circle cx="50" cy="128" r="6" className="sup-node sup-supervisor" />
            <g className="sup-experience">
              <path d="M138 96 C148 84 176 84 186 98" />
            </g>
            <g className="sup-center">
              <path d="M146 112 L162 100 L178 112 L162 126 Z M162 100 L162 126" />
              <circle cx="146" cy="112" r="5" /><circle cx="162" cy="100" r="5" />
              <circle cx="178" cy="112" r="5" /><circle cx="162" cy="126" r="5" />
            </g>
          </svg>
          <figcaption className="sup-center-label">{copy.center}</figcaption>
        </figure>
        <div>
          <p className="text-sm text-muted-foreground">{copy.instruction}</p>
          <ul className="sup-choices mt-3">
            {copy.dimensions.map((d, i) => (
              <li key={d.title}>
                <Button type="button" variant="heroOutline" className="sup-choice-btn" aria-pressed={selected === i}
                  aria-controls="sup-detail" onClick={() => { setSelected(i); setPhase('done'); }}>{d.title}</Button>
              </li>
            ))}
          </ul>
          <div id="sup-detail" role="region" aria-live="polite" aria-label={item.title} className="mt-4 bg-background p-5">
            <p className="text-sm font-semibold">{item.title}</p>
            <h4 className="mt-2 text-lg font-semibold text-primary">{item.question}</h4>
            <p className="mt-2 text-foreground">{item.explanation}</p>
          </div>
        </div>
      </div>
      <p className="mt-6 text-muted-foreground">{copy.takeaway}</p>
    </div>
  );
}
