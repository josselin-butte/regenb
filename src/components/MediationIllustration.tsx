import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export type MediationCopy = {
  subtitle: string; caption: string;
  dimensions: { title: string; question: string; explanation: string }[];
};
export const MED_INTRO_MS = 2200;
const parts = ['frame', 'hear', 'needs', 'follow'] as const;

export default function MediationIllustration({ copy }: { copy: MediationCopy }) {
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
      timer = window.setTimeout(() => setPhase('done'), MED_INTRO_MS);
    }, { threshold: 0.3 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, []);

  const item = copy.dimensions[selected] ?? copy.dimensions[0];
  if (!item) return null;

  return (
    <div ref={root} className="med mt-8 border-t border-border pt-8" data-active={parts[selected]} data-phase={phase}>
      <h3 className="text-xl font-semibold text-primary sm:text-2xl">{copy.subtitle}</h3>
      <p className="mt-3 text-muted-foreground">{copy.caption}</p>
      <div className="med-grid mt-6">
        {/* Two autonomous trajectories and a subtle third; a shared space between them that never merges them. */}
        <svg viewBox="0 0 300 190" aria-hidden="true" focusable="false" className="med-drawing">
          <rect x="95" y="40" width="110" height="110" pathLength={1} className="med-space med-intro" />
          <g className="med-hear">
            <path d="M30 20 C80 50 80 140 30 170" className="med-path" />
            <path d="M270 20 C220 50 220 140 270 170" className="med-path" />
            <path d="M120 8 C135 18 165 18 180 8" className="med-path med-third" />
          </g>
          <g className="med-needs">
            <path d="M66 82 L80 82 M66 108 L80 108" />
            <path d="M234 82 L220 82 M234 108 L220 108" />
          </g>
          <g className="med-follow">
            <path d="M150 150 L150 182" /><path d="M150 150 C140 165 120 172 110 182" /><path d="M150 150 C160 165 180 172 190 182" />
          </g>
        </svg>
        <div>
          <ul className="med-choices">
            {copy.dimensions.map((d, i) => (
              <li key={d.title}>
                <Button type="button" variant="heroOutline" className="med-choice-btn" aria-pressed={selected === i}
                  aria-controls="med-detail" onClick={() => { setSelected(i); setPhase('done'); }}>{d.title}</Button>
              </li>
            ))}
          </ul>
          <div id="med-detail" role="region" aria-live="polite" aria-label={item.title} className="mt-4 bg-secondary p-5">
            <p className="text-sm font-semibold">{item.title}</p>
            <h4 className="mt-2 text-lg font-semibold text-primary">{item.question}</h4>
            <p className="mt-2 text-foreground">{item.explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
