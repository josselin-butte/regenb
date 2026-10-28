import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import ElementIcon from '@/components/ElementIcon';
import WavySeparator from '@/components/WavySeparator';
import EtapeDrawing from '@/components/EtapeDrawing';
import oulanBat from '@/assets/etapes-oulan-bat.jpg.asset.json';
import { Button } from '@/components/ui/button';
import { etapesContent, type EtapeKey } from './etapes-content';


const SHORT: Record<EtapeKey, string> = { arbas: 'Arbas', mazeimard: 'Mazeimard', medoc: 'Médoc' };

/** Seasonal thread: three independent Étapes, each reachable directly. Nothing is hidden behind it. */
const SeasonThread = ({ active, onPick }: { active: EtapeKey; onPick: (k: EtapeKey) => void }) => {
  const { language } = useLanguage();
  const c = etapesContent[language];
  const xs = [50, 150, 250];
  return (
    <nav aria-label={c.threadLabel} className="etapes-thread mt-12">
      <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-accent">{c.threadLabel}</p>
      <svg viewBox="0 0 300 40" className="etapes-thread-line mt-4" aria-hidden="true" focusable="false">
        <path d="M10 20 C30 8 40 32 60 20 S90 8 110 20 S140 32 160 20 S190 8 210 20 S240 32 260 20 S280 14 290 20" />
        {c.etapes.map((e, i) => (
          <circle key={e.key} cx={xs[i]} cy={20} r={active === e.key ? 7 : 5} className={active === e.key ? 'is-active' : ''} />
        ))}
      </svg>
      <ul className="grid grid-cols-3 gap-2 text-center">
        {c.etapes.map((e) => (
          <li key={e.key}>
            <a
              href={`#${e.key}`}
              onClick={() => onPick(e.key)}
              aria-current={active === e.key ? 'true' : undefined}
              className="etapes-thread-link inline-flex min-h-[44px] flex-col items-center justify-center px-1"
            >
              <span className="font-serif text-[15px] font-semibold sm:text-base">{e.season.split(' ')[0]}</span>
              <span className="text-xs text-muted-foreground sm:text-sm">{SHORT[e.key]}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center text-[15px] text-muted-foreground">{c.threadNote}</p>
    </nav>
  );
};

const Etapes = () => {
  const { language, t } = useLanguage();
  const c = etapesContent[language];
  const [active, setActive] = useState<EtapeKey>('arbas');
  const [chosen, setChosen] = useState<EtapeKey | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id as EtapeKey);
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    );
    c.etapes.forEach((e) => { const el = document.getElementById(e.key); if (el) io.observe(el); });
    return () => io.disconnect();
  }, [c.etapes]);

  const choose = (k: EtapeKey) => {
    setChosen(k);
    document.getElementById('ecrire')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const interest = chosen ? c.etapes.find((e) => e.key === chosen)?.interest : undefined;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="etapes">
        {/* Opening */}
        <section className="px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12">
          <div className="measure mx-auto">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{c.eyebrow}</p>
            <h1 className="text-balance mt-5 text-[2.1rem] font-semibold leading-[1.15] sm:text-5xl">{c.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground">{c.intro}</p>
            <p className="mt-8 border-l-2 border-accent pl-4 font-serif text-xl font-medium text-primary">{c.anchorLine}</p>
            <SeasonThread active={active} onPick={setActive} />
          </div>
        </section>

        {/* What you come looking for */}
        <section className="bg-secondary px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">{c.seekTitle}</h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-3">
              {c.seek.map((s, i) => (
                <li key={s.title}>
                  <ElementIcon element={s.element} size={40} delay={i * 0.25} />
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[15px] text-muted-foreground">{s.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-12 max-w-measure text-[15px]">{c.balance}</p>
          </div>
        </section>

        {/* The three Étapes */}
        {c.etapes.map((e, i) => (
          <div key={e.key}>
            {i > 0 && <WavySeparator className="px-5 sm:px-8 lg:px-12" />}
            <section id={e.key} aria-labelledby={`${e.key}-title`} className="etape scroll-mt-24 px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
              <div className={`mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-14`}>
                <div>
                  <p className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{e.season}</span>
                    <span className="etape-status border border-primary px-2 py-0.5 text-xs font-medium text-primary">{e.status}</span>
                  </p>
                  <h2 id={`${e.key}-title`} className="mt-4 text-3xl font-semibold sm:text-4xl">{e.title}</h2>
                  <p className="mt-2 font-medium text-primary">{e.place}</p>
                  <p className="text-[15px] text-muted-foreground">{e.hosts}</p>

                  <blockquote className="mt-8 border-l-2 border-accent pl-4 font-serif text-xl font-medium leading-snug text-primary sm:text-2xl">
                    {e.question}
                  </blockquote>

                  {e.why.map((p) => <p key={p.slice(0, 24)} className="mt-5 text-muted-foreground">{p}</p>)}

                  <dl className="etape-senses mt-8 grid gap-4 border-t border-border pt-6">
                    {(['listen', 'touch', 'see'] as const).map((k) => (
                      <div key={k} className="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                        <dt className="text-sm font-medium uppercase tracking-[0.12em] text-accent-foreground/80">{c.sensesLabels[k]}</dt>
                        <dd className="text-[15px]">{e.senses[k]}</dd>
                      </div>
                    ))}
                  </dl>
                  {e.note && <p className="mt-4 text-sm text-muted-foreground">{e.note}</p>}

                  <div className="mt-8 border-t border-border pt-6">
                    <p className="text-sm font-medium uppercase tracking-[0.12em] text-accent-foreground/80">{c.formatLabel}</p>
                    <p className="mt-2 text-[15px]">{e.format}</p>
                    <p className="mt-2 text-[15px] text-muted-foreground">{e.statusLine}</p>
                  </div>

                  <Button type="button" size="lg" className="mt-8" onClick={() => choose(e.key)}>{c.cta}</Button>
                </div>

                <figure className={`m-0 order-first md:sticky md:top-28 ${i % 2 ? '' : 'md:order-last'}`}>
                  {e.key === 'arbas' ? (
                    <img
                      src={`https://regenb.lovable.app${oulanBat.url}`}
                      alt={t('image.oulanbat')}
                      width={1025}
                      height={737}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[3/2] w-full bg-secondary p-6">
                      <EtapeDrawing place={e.key} />
                    </div>
                  )}
                  <figcaption className="mt-3 text-sm text-muted-foreground">{e.figureCaption}</figcaption>
                </figure>
              </div>
            </section>
          </div>
        ))}

        {/* What they share */}
        <section className="bg-primary px-5 py-14 text-primary-foreground sm:px-8 sm:py-20 lg:px-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-semibold text-primary-foreground sm:text-3xl">{c.commonTitle}</h2>
            <ul className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
              {c.common.map((x) => (
                <li key={x.title} className="border-t border-primary-foreground/25 pt-5">
                  <h3 className="font-serif text-lg font-semibold text-primary-foreground">{x.title}</h3>
                  <p className="mt-2 text-[15px] opacity-90">{x.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-12 max-w-measure">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{c.forWhomTitle}</p>
              <p className="mt-3 text-[15px] opacity-90">{c.forWhom}</p>
            </div>
          </div>
        </section>

        <div id="ecrire" className="scroll-mt-20">
          <EnquiryForm
            defaultTopic="etapes"
            title={c.formTitle}
            intro={c.formIntro}
            note={c.formNote}
            defaultMessage={interest}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Etapes;
