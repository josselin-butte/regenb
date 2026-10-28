import { useEffect, useRef, useState } from 'react';

/** Quiet line drawings for Étapes that have no photograph yet. Brand palette only, one-time draw-in. */
export default function EtapeDrawing({ place }: { place: 'mazeimard' | 'medoc' }) {
  const ref = useRef<SVGSVGElement>(null);
  const [phase, setPhase] = useState<'idle' | 'drawing' | 'done'>('idle');

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined' || !ref.current) { setPhase('done'); return; }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      setPhase('drawing');
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 300 200" className="etape-drawing" data-phase={phase} aria-hidden="true" focusable="false">
      {place === 'mazeimard' ? (
        <>
          {/* Low summer sun, rolling Creuse hills, a stone barn, a dry-stone wall and a sketchbook line. */}
          <circle cx="232" cy="52" r="15" className="ed-sun" />
          <path pathLength={1} className="ed-line ed-soft" d="M0 112 C40 92 76 90 112 104 C150 118 186 86 230 88 C262 90 284 100 300 108" />
          <path pathLength={1} className="ed-line" d="M0 138 C50 122 96 126 140 136 C190 148 236 128 300 132" />
          <path pathLength={1} className="ed-line ed-fill" d="M58 138 V104 L88 82 L118 104 V138 Z" />
          <path pathLength={1} className="ed-line ed-soft" d="M78 140 V120 H98 V140" />
          <path pathLength={1} className="ed-line" d="M150 158 q6 -8 14 -1 q7 -9 15 0 q8 -8 15 0 q7 -9 15 0 q8 -8 16 0 q7 -8 14 0" />
          <path pathLength={1} className="ed-line ed-soft" d="M150 166 q8 -6 16 0 q8 -7 15 0 q8 -6 16 0 q8 -7 15 0 q8 -6 15 0" />
          <path pathLength={1} className="ed-line ed-water" d="M10 178 q12 -6 24 0 t24 0 t24 0 t24 0" />
          <path pathLength={1} className="ed-line ed-soft" d="M226 176 l40 -26" />
          <path pathLength={1} className="ed-line ed-ochre" d="M262 152 l6 -4" />
        </>
      ) : (
        <>
          {/* Flat Médoc horizon, a low autumn sun, a forest garden, a fruit hedge and a pond with water paths. */}
          <circle cx="62" cy="70" r="15" className="ed-sun" />
          <path pathLength={1} className="ed-line ed-soft" d="M0 122 H300" />
          <path pathLength={1} className="ed-line" d="M168 122 V94 M168 98 C150 98 146 74 162 68 C164 54 186 52 190 66 C206 68 204 96 186 98 H168" />
          <path pathLength={1} className="ed-line" d="M228 122 V84 M228 88 C214 88 208 66 222 60 C226 46 246 46 248 60 C262 64 258 88 240 88 H228" />
          <path pathLength={1} className="ed-line ed-soft" d="M118 122 q6 -14 12 0 q6 -14 12 0 q6 -14 12 0" />
          <path pathLength={1} className="ed-line ed-soft" d="M256 122 q6 -12 12 0 q6 -12 12 0 q6 -12 12 0" />
          <path pathLength={1} className="ed-line" d="M40 160 C40 146 80 140 112 144 C146 148 156 160 140 170 C120 182 50 180 40 160 Z" />
          <path pathLength={1} className="ed-line ed-water" d="M62 160 q8 -5 16 0 t16 0 t16 0" />
          <path pathLength={1} className="ed-line ed-water" d="M152 160 C186 150 210 168 244 160 C266 155 282 162 300 158" />
          <circle cx="180" cy="84" r="3.5" className="ed-sun" /><circle cx="196" cy="76" r="3.5" className="ed-sun" /><circle cx="238" cy="70" r="3.5" className="ed-sun" />
        </>
      )}
    </svg>
  );
}
