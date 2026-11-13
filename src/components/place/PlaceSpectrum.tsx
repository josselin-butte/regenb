import { useEffect, useRef } from 'react';
import { PlaceAudio, PlaceMix } from '@/lib/place-audio';

type Props = { engine: PlaceAudio | null; mix: PlaceMix; running: boolean; label: string; schematic: string };
export default function PlaceSpectrum({ engine, mix, running, label, schematic }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const styles = getComputedStyle(canvas);
    const colors = ['--primary', '--destructive', '--muted-foreground', '--accent'].map(token => `hsl(${styles.getPropertyValue(token).trim()})`);
    let frame = 0;
    let visible = true;
    const draw = (time = 0) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const moving = running && visible && !document.hidden && !reduced.matches;
      const data = new Uint8Array(256);
      mix.forEach((value, i) => {
        if (!value.crowded && !value.niche) return;
        engine?.analysers[i]?.getByteFrequencyData(data);
        const measured = data.some(n => n > 0);
        ctx.fillStyle = colors[i];
        ctx.globalAlpha = 0.45;
        for (let n = 0; n < 80; n++) {
          const f = n / 80;
          const center = value.crowded ? 0.48 : (i + 0.5) / 4;
          const envelope = Math.exp(-Math.pow((f - center) / 0.075, 2));
          const amplitude = measured ? data[Math.floor(f * 255)] / 255 : envelope * (moving ? 0.85 + 0.15 * Math.sin(time / 650 + n / 5 + i) : 0.9);
          const width = amplitude * canvas.width * 0.8;
          ctx.fillRect((canvas.width - width) / 2, canvas.height * (1 - f), width, 3);
        }
      });
      ctx.globalAlpha = 1;
      if (moving) frame = requestAnimationFrame(draw);
    };
    const refresh = () => { cancelAnimationFrame(frame); draw(); };
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; refresh(); });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', refresh);
    reduced.addEventListener('change', refresh);
    draw();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', refresh); reduced.removeEventListener('change', refresh); };
  }, [engine, mix, running]);
  return <figure className="place-spectrum"><canvas ref={ref} width={640} height={220} role="img" aria-label={label} /><figcaption className="text-xs text-muted-foreground">{schematic}</figcaption></figure>;
}
