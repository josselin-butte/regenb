import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { voices } from '@/content/voices';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogDescription, DialogPortal, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export const VOICE_INTERVAL_MS = 7000;
export const VOICE_EXIT_MS = 600;
export const VOICE_ENTER_MS = 800;

type VoicesBandProps = { compact?: boolean; initialVoice?: typeof voices[number]['name'] };

export default function VoicesBand({ compact = false, initialVoice = 'Robin Wall Kimmerer' }: VoicesBandProps) {
  const { language } = useLanguage();
  const fr = language === 'fr';
  const [index, setIndex] = useState(() => Math.max(0, voices.findIndex(voice => voice.name === initialVoice)));
  const interval = compact ? 9000 : VOICE_INTERVAL_MS;
  const [phase, setPhase] = useState('still');
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const band = useRef<HTMLElement>(null);
  const progress = useRef<HTMLProgressElement>(null);
  const elapsed = useRef(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const running = visible && !hidden && !reduced && !paused && !hovered && !focused && !sourcesOpen;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setReduced(media.matches);
    const visibility = () => setHidden(document.hidden);
    const observer = new IntersectionObserver(entries => setVisible(entries[0]?.isIntersecting ?? false));
    if (band.current) observer.observe(band.current);
    media.addEventListener('change', preference);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', preference);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    if (reduced) { setPhase('still'); elapsed.current = 0; }
  }, [reduced]);

  useEffect(() => {
    if (!running) return;
    let previous: number | undefined;
    let frame = 0;
    const tick = (now: number) => {
      if (previous !== undefined) elapsed.current += now - previous;
      previous = now;
      if (elapsed.current >= interval) {
        elapsed.current = 0;
        setIndex(current => (current + 1) % voices.length);
        setPhase('enter');
      } else if (elapsed.current >= interval - VOICE_EXIT_MS) {
        setPhase('exit');
      } else if (elapsed.current >= VOICE_ENTER_MS) {
        setPhase('still');
      }
      if (progress.current) progress.current.value = elapsed.current;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, interval]);

  function select(next: number) {
    setIndex((next + voices.length) % voices.length);
    elapsed.current = 0;
    if (progress.current) progress.current.value = 0;
    setPhase('still');
  }

  const voice = voices[index];
  return (
    <section ref={band} aria-roledescription="carousel" aria-label={fr ? 'Voix de femmes' : "Women's voices"}
      className={`voices-band bg-secondary text-foreground${compact ? ' voices-compact' : ''}`} data-running={running} data-reduced={reduced}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      onTouchStart={event => { const start = event.touches[0]; if (start) touch.current = { x: start.clientX, y: start.clientY }; }}
      onTouchEnd={event => {
        const end = event.changedTouches[0]; const start = touch.current; touch.current = null;
        if (!start || !end) return;
        const delta = end.clientX - start.x;
        if (Math.abs(delta) > 40 && Math.abs(delta) > Math.abs(end.clientY - start.y)) select(index + (delta < 0 ? 1 : -1));
      }}>
      <div className="voices-copy" aria-live="off">
        <blockquote key={index} lang={language} className="voices-quote font-serif text-balance" data-phase={phase}>
          {voice[language]}
          {compact && <span className="voices-inline-name font-sans"> — {voice.name}</span>}
        </blockquote>
      </div>
      {!compact && <><div className="voices-attribution font-sans text-xs">
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="h-px w-5 bg-accent" />{voice.name} · {voice.year}</span>
        <Dialog open={sourcesOpen} onOpenChange={setSourcesOpen}>
          <DialogTrigger asChild><Button variant="link" className="min-h-11 px-2 text-xs underline decoration-accent">{fr ? 'Les voix · Sources' : 'The voices · Sources'}</Button></DialogTrigger>
          <DialogPortal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/30" />
            <DialogPrimitive.Content className="voices-dialog fixed left-1/2 top-1/2 z-50 max-h-[85dvh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border bg-background p-6 text-foreground">
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="font-serif text-xl">{fr ? 'Les voix · Sources' : 'The voices · Sources'}</DialogTitle>
                <DialogClose asChild><Button variant="link" className="min-h-11">{fr ? 'Fermer' : 'Close'}</Button></DialogClose>
              </div>
              <DialogDescription className="sr-only">{fr ? 'Douze citations et leurs références.' : 'Twelve quotes and their references.'}</DialogDescription>
              <ol className="mt-4 space-y-5">
                {voices.map(item => <li key={item.name}>
                  <blockquote lang={language} className="font-serif">{item[language]}</blockquote>
                  <p className="mt-1 text-sm">{item.name} · {item.year}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm underline decoration-accent">{item.work}</a>
                </li>)}
              </ol>
              <p className="mt-6 text-sm">{fr ? 'Traductions RegenB, sauf mention contraire.' : 'Translations by RegenB unless stated otherwise.'}</p>
            </DialogPrimitive.Content>
          </DialogPortal>
        </Dialog>
      </div>
      <div className="voices-dots" role="group" aria-label={fr ? 'Choisir une voix' : 'Choose a voice'}>
        {voices.map((item, position) => <Button key={item.name} variant="ghost" className="voices-dot" aria-label={item.name}
          aria-pressed={position === index} onClick={() => select(position)}>
          <span className="voices-dot-mark" aria-hidden="true">
            {position === index && <progress ref={progress} max={VOICE_INTERVAL_MS} value={elapsed.current} />}
          </span>
        </Button>)}
      </div></>}
      <Button variant="link" className="voices-pause min-h-11" onClick={() => setPaused(current => !current)}
        aria-label={paused ? (fr ? 'Reprendre' : 'Play') : (fr ? 'Mettre en pause' : 'Pause')}>
        {paused ? (fr ? 'Reprendre' : 'Play') : (fr ? 'Pause' : 'Pause')}
      </Button>
    </section>
  );
}