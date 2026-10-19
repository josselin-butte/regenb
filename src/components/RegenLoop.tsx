import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

export type RegenCopy = {
  title: string; intro: string; center: string; centerNote: string; status: string; tapHint: string;
  closing: string; closingNote: string; context: string; pause: string; play: string;
  movements: { label: string; question: string; support: string }[];
};
export const REGEN_CIRCUIT_MS = 22000;
export const canAnimateLoop = (visible: boolean, hidden: boolean, reduced: boolean, paused: boolean, competing: boolean) =>
  visible && !hidden && !reduced && !paused && !competing;
let visitorPaused = false;
const loopPath = 'M200 50 A150 150 0 1 1 199.99 50 Z';

export default function RegenLoop({ copy }: { copy: RegenCopy }) {
  const [selected, setSelected] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(visitorPaused);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [competing, setCompeting] = useState(false);
  const diagram = useRef<HTMLDivElement>(null);
  const stroke = useRef<SVGPathElement>(null);
  const animation = useRef<Animation>();
  const running = canAnimateLoop(visible, hidden, reduced, paused, competing);

  useEffect(() => {
    setReady(true);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReduced(media.matches);
    const updateVisibility = () => setHidden(document.hidden);
    updatePreference(); updateVisibility();
    media.addEventListener('change', updatePreference);
    document.addEventListener('visibilitychange', updateVisibility);
    const element = diagram.current;
    const observer = typeof IntersectionObserver === 'undefined' ? undefined : new IntersectionObserver(
      entries => setVisible(entries.some(entry => entry.isIntersecting)), { threshold: 0.15 },
    );
    if (element) observer?.observe(element);
    // Yield locally to any other currently visible site animation; do not alter it.
    const checkOtherMotion = () => {
      const others = document.getAnimations?.() ?? [];
      setCompeting(others.some(other => {
        if (other.playState !== 'running' || other === animation.current) return false;
        const target = (other.effect as KeyframeEffect | null)?.target;
        if (!(target instanceof Element) || element?.contains(target)) return false;
        const rect = target.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
      }));
    };
    checkOtherMotion();
    const timer = window.setInterval(checkOtherMotion, 250);
    return () => {
      observer?.disconnect(); window.clearInterval(timer);
      media.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const path = stroke.current;
    if (!path?.animate) return;
    const motion = path.animate([{ strokeDashoffset: 0 }, { strokeDashoffset: -100 }], {
      duration: REGEN_CIRCUIT_MS, iterations: Infinity, easing: 'linear',
    });
    motion.pause(); animation.current = motion;
    return () => { motion.cancel(); animation.current = undefined; };
  }, []);
  useEffect(() => {
    if (running) animation.current?.play();
    else animation.current?.pause();
  }, [running]);

  const movement = copy.movements[selected] ?? copy.movements[0];
  if (!movement) return null;
  return (
    <section id="regen-loop" aria-labelledby="regen-loop-title" className="regen-loop mt-8 scroll-mt-28 border-t border-border pt-8">
      <h3 id="regen-loop-title" className="text-xl font-semibold text-primary sm:text-2xl">{copy.title}</h3>
      <p className="mt-4 text-muted-foreground">{copy.intro}</p>
      <div className={`regen-interactive ${ready ? '' : 'regen-unready'}`}>
        <div className="regen-diagram" ref={diagram}>
          <div className="regen-orbit">
            <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" className="regen-path">
              <path d={loopPath} className="regen-path-band" />
              <path d={loopPath} className="regen-path-line" />
              <path d={loopPath} pathLength={100} ref={stroke} className="regen-path-marker" data-running={running} />
            </svg>
            <div className="regen-center">
              <p className="font-serif text-xl font-semibold text-primary">{copy.center}</p>
              <p className="mt-3 text-sm text-muted-foreground">{copy.centerNote}</p>
            </div>
          </div>
          <ul className="regen-choices" aria-label={copy.title}>
            {copy.movements.map((item, index) => (
              <li key={item.label}>
                <Button type="button" variant="heroOutline" className="regen-choice" aria-label={item.label} aria-pressed={selected === index}
                  aria-controls="regen-question" onClick={() => setSelected(index)}>
                  <span className="regen-letter" aria-hidden="true">{item.label.charAt(0)}</span>
                  <span>{item.label.slice(4)}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-center text-sm">{copy.tapHint}</p>
        <p className="mt-4 text-center text-sm text-muted-foreground">{copy.status}</p>
        <div id="regen-question" role="region" aria-label={movement.label} aria-live="polite" aria-atomic="true" className="regen-detail mt-6 bg-secondary p-5 sm:p-6">
          <p className="mb-2 text-sm font-semibold">{movement.label}</p>
          <h4 className="text-lg font-semibold text-primary">{movement.question}</h4>
          <p className="mt-3 text-foreground">{movement.support}</p>
        </div>
        <Button type="button" variant="heroOutline" className="mt-5 min-h-11" disabled={reduced}
          aria-pressed={!paused && !reduced} onClick={() => { visitorPaused = !paused; setPaused(visitorPaused); }}>
          {paused || reduced ? copy.play : copy.pause}
        </Button>
      </div>
      <ul className={`regen-static mt-6 space-y-5 ${ready ? 'regen-ready' : ''}`}>
        {copy.movements.map(item => <li key={item.label}><h4 className="font-semibold">{item.label}</h4><p className="mt-1">{item.question}</p><p className="mt-2 text-muted-foreground">{item.support}</p></li>)}
      </ul>
      <p className="mt-6 font-medium">{copy.closing}</p>
      <p className="mt-2 text-sm text-muted-foreground">{copy.closingNote}</p>
      <p className="mt-5 text-sm text-muted-foreground">{copy.context}</p>
    </section>
  );
}