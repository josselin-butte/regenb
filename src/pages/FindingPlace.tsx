import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { matchesPlaceBand, PLACE_LAYERS, PlaceAudio, placeMix } from '@/lib/place-audio';
import PlaceSpectrum from '@/components/place/PlaceSpectrum';
import './FindingPlace.css';

const voiceClasses = ['place-ground', 'place-pulse', 'place-voice-tone', 'place-spark'];
export default function FindingPlace() {
  const { t, lp } = useLanguage();
  const [step, setStep] = useState(0);
  const [solo, setSolo] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [placed, setPlaced] = useState([false, false, false, false]);
  const [choice, setChoice] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [readyMessage, setReadyMessage] = useState(false);
  const [engine, setEngine] = useState<PlaceAudio | null>(null);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [soundOff, setSoundOff] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const engineRef = useRef<PlaceAudio | null>(null);
  const abort = useRef<AbortController | null>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const mix = useMemo(() => placeMix(step, solo, placed, choice), [step, solo, placed, choice]);
  const complete = placed.every(Boolean);
  useEffect(() => () => { abort.current?.abort(); engineRef.current?.dispose(); }, []);
  useEffect(() => { engine?.mix(mix); }, [engine, mix]);
  useEffect(() => { engine?.volume(soundOff ? 0 : volume); }, [engine, volume, soundOff]);
  useEffect(() => {
    if (!engine) return;
    const pauseHidden = () => { if (document.hidden) { void engine.pause(); setRunning(false); } };
    document.addEventListener('visibilitychange', pauseHidden);
    const state = () => { if (engine.context.state === 'suspended') setRunning(false); };
    engine.context.addEventListener('statechange', state);
    return () => { document.removeEventListener('visibilitychange', pauseHidden); engine.context.removeEventListener('statechange', state); };
  }, [engine]);
  useEffect(() => {
    setReadyMessage(false);
    if (!complete || step !== 3) return;
    const timer = setTimeout(() => setReadyMessage(true), 1800);
    return () => clearTimeout(timer);
  }, [complete, step]);

  const go = (next: number) => {
    setStep(Math.max(0, Math.min(5, next))); setStatus('');
    requestAnimationFrame(() => {
      title.current?.focus({ preventScroll: true });
      title.current?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  };
  const start = async (advance = true) => {
    if (loading) return;
    if (soundOff) { setRunning(true); if (advance) go(1); return; }
    if (engineRef.current) {
      try { await engineRef.current.resume(); setRunning(true); if (advance) go(1); }
      catch { setStatus('place.audioError'); }
      return;
    }
    setLoading(true);
    const controller = new AbortController(); abort.current = controller;
    let audio: PlaceAudio | null = null;
    try {
      audio = new PlaceAudio(); engineRef.current = audio;
      // Unlock during the tap, before any fetch/decode awaits (Safari).
      await audio.resume();
      await audio.load(controller.signal);
      if (controller.signal.aborted) return;
      setEngine(audio); setRunning(true); setStatus('');
      if (advance) go(1);
    } catch {
      if (!controller.signal.aborted) {
        audio?.dispose(); engineRef.current = null; setEngine(null);
        setSoundOff(true); setRunning(true); setStatus('place.audioError');
        if (advance) { setStep(1); requestAnimationFrame(() => title.current?.focus()); }
      }
    } finally { if (!controller.signal.aborted) setLoading(false); }
  };
  const togglePlay = async () => {
    if (running) { await engine?.pause(); setRunning(false); }
    else await start(false);
  };
  const toggleSound = () => {
    if (!soundOff) { engine?.volume(0); setSoundOff(true); }
    else { setSoundOff(false); if (!engine) { setRunning(false); } }
  };
  const place = (band: number, voice = selected) => {
    if (voice === null) { setStatus('place.selectHint'); return; }
    if (!matchesPlaceBand(voice, band)) { setStatus('place.hint'); return; }
    setPlaced(current => current.map((value, i) => i === voice ? true : value));
    setSelected(null); setStatus('place.placed');
  };
  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); setStatus('place.copied'); }
    catch { setStatus('place.copyFailed'); }
  };
  const share = async () => {
    const url = new URL(lp('/trouver-sa-place'), window.location.origin).href;
    if (!navigator.share) { await copy(url); return; }
    try { await navigator.share({ title: t('place.title'), text: choice === null ? t('place.description') : t(`place.practice.${choice}`), url }); }
    catch (error) { if (!(error instanceof DOMException && error.name === 'AbortError')) await copy(url); }
  };
  const restart = () => { setPlaced([false, false, false, false]); setChoice(null); setSolo(null); setSelected(null); void engine?.pause(); setRunning(false); go(0); };

  return <><Header /><main className="place-journey">
    <nav className="place-progress" aria-label={t('place.title')}>
      {Array.from({ length: 6 }, (_, i) => <Button key={i} variant="ghost" aria-label={t(`place.step.${i}`)} aria-current={i === step ? 'step' : undefined} disabled={i > step} onClick={() => go(i)}><span className="place-progress-mark" /></Button>)}
    </nav>
    <section className="place-panel" key={step} data-step={step}
      onTouchStart={event => { const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY }; }}
      onTouchEnd={event => {
        const point = event.changedTouches[0]; const origin = touch.current; touch.current = null;
        if (!origin || (event.target as HTMLElement).closest('button,input,a') || Math.abs(point.clientY - origin.y) > 45 || Math.abs(point.clientX - origin.x) < 70) return;
        if (point.clientX > origin.x && step > 0) go(step - 1);
        if (point.clientX < origin.x && step > 0 && step < 5 && (step !== 3 || complete)) go(step + 1);
      }}>
      <p className="text-xs uppercase text-muted-foreground">{t('place.title')} · {step + 1} / 6</p>
      <h1 ref={title} tabIndex={-1} className="scroll-mt-28 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">{t(step === 0 ? 'place.title' : `place.step.${step}`)}</h1>
      {step === 0 && <><p>{t('place.welcome')}</p><p className="text-sm text-muted-foreground">{t('place.placeholder')}</p><div><Button size="lg" disabled={loading} onClick={() => void start()}>{t(loading ? 'place.loading' : 'place.start')}</Button></div></>}
      {step > 0 && step < 5 && <PlaceSpectrum engine={engine} mix={mix} running={running} label={t('place.spectrum')} schematic={t('place.schematic')} />}
      {step === 1 && <><p>{t('place.crowded')}</p><p className="font-medium">{t('place.familiar')}</p></>}
      {step === 2 && <><p className="text-sm">{t('place.meet')}</p><div className="place-voices">{PLACE_LAYERS.map((voice, i) => <Button key={voice} variant={solo === i ? 'secondary' : 'outline'} className={`place-voice ${voiceClasses[i]}`} aria-pressed={solo === i} onClick={() => setSolo(i)}><span>{t(`place.${voice}`)}</span><small>{t(`place.${voice}.meaning`)}</small></Button>)}</div></>}
      {step === 3 && <><p className="text-sm">{t('place.placePrompt')}</p><div className="place-voices">{PLACE_LAYERS.map((voice, i) => <Button key={voice} draggable={!placed[i]} disabled={placed[i]} variant={selected === i ? 'secondary' : 'outline'} className={voiceClasses[i]} aria-pressed={selected === i} onClick={() => setSelected(i)} onDragStart={event => { setSelected(i); event.dataTransfer.setData('text/plain', String(i)); }}>{t(`place.${voice}`)}{placed[i] ? ' ✓' : ''}</Button>)}</div><div className="place-bands">{[3, 2, 1, 0].map(i => <Button key={i} variant="outline" className={`place-band ${voiceClasses[i]}`} onClick={() => place(i)} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); const raw = event.dataTransfer.getData('text/plain'); if (/^[0-3]$/.test(raw)) place(i, Number(raw)); }}><span>{t(`place.band.${i}`)}</span><span>{placed[i] ? t(`place.${PLACE_LAYERS[i]}`) : '—'}</span></Button>)}</div>{readyMessage && <p role="status">{t('place.complete')}</p>}</>}
      {step === 4 && <><p>{t('place.question')}</p><div className="place-voices">{[0, 1, 2, 3, 4].map(i => <Button key={i} variant={choice === i ? 'secondary' : 'outline'} className={voiceClasses[i] ?? ''} aria-pressed={choice === i} onClick={() => { setChoice(i); setStatus(''); }}>{t(i === 4 ? 'place.unknown' : `place.${PLACE_LAYERS[i]}`)}</Button>)}</div>{choice !== null && <article className="border-l-4 border-accent pl-4"><h2 className="text-lg">{t('place.practice')}</h2><p>{t(`place.practice.${choice}`)}</p><div className="place-actions mt-3"><Button variant="outline" onClick={() => void copy(t(`place.practice.${choice}`))}>{t('place.copy')}</Button><Button variant="outline" onClick={() => void share()}>{t('place.share')}</Button></div></article>}</>}
      {step === 5 && <><p>{t('place.further')}</p><div className="place-links"><Button asChild variant="link"><Link to={lp('/accompagnement')}>{t('place.workshops')}</Link></Button><Button asChild variant="link"><Link to={lp('/supervision')}>{t('place.supervision')}</Link></Button><Button asChild variant="link"><Link to={lp('/contact')}>{t('place.contact')}</Link></Button><Button variant="outline" onClick={restart}>{t('place.restart')}</Button></div></>}
      <p className="place-status" role="status">{status ? t(status) : ''}</p>
    </section>
    {step > 0 && <div className="place-navigation"><Button variant="outline" onClick={() => go(step - 1)}>{t('place.back')}</Button>{step < 5 && <Button disabled={step === 3 && !complete} onClick={() => go(step + 1)}>{t('place.next')}</Button>}</div>}
    <div className="place-controls" aria-label={t('place.spectrum')}>
      <Button variant="outline" disabled={loading} onClick={() => void togglePlay()} aria-label={t(running ? 'place.pause' : 'place.play')}>{running ? 'Ⅱ' : '▷'}</Button>
      <label>{t('place.volume')}<input type="range" min="0" max="1" step="0.05" value={volume} disabled={soundOff} onChange={event => setVolume(Number(event.target.value))} /></label>
      <Button variant={soundOff ? 'secondary' : 'outline'} aria-pressed={soundOff} onClick={toggleSound}>{t('place.soundOff')}</Button>
    </div>
    <p className="place-note">{t('place.note')}</p>
  </main><Footer /></>;
}