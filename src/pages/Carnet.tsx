import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatusChip from '@/components/carnet/StatusChip';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate, getEntries } from '@/lib/carnet';

const Carnet = () => {
  const { t, language } = useLanguage();
  const entries = getEntries(language);

  useEffect(() => {
    document.title = `${t('carnet.eyebrow')} · RegenB France`;
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-5 pb-24 pt-[121px] sm:px-8 sm:pt-[153px] lg:px-12">
        <div className="mx-auto max-w-[760px]">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('carnet.eyebrow')}</p>
          <h1 className="mt-6 text-[2.2rem] leading-[1.1] tracking-tight text-primary sm:text-5xl">{t('carnet.title')}</h1>
          <div className="mt-8 max-w-measure space-y-5">
            <p>{t('carnet.intro1')}</p>
            <p>{t('carnet.intro2')}</p>
          </div>

          {entries.length === 0 ? (
            <p className="mt-16 border-t border-border pt-10 text-muted-foreground">{t('carnet.empty')}</p>
          ) : (
            <ul className="mt-16 divide-y divide-border border-y border-border">
              {entries.map((e) => (
                <li key={e.slug} className="py-8">
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                    <span>{formatDate(e.date, language)}</span>
                    <StatusChip status={e.status} />
                    <span>{e.readingTime} {t('carnet.minutes')}</span>
                    {e.themes.length > 0 && <span>{e.themes.join(' · ')}</span>}
                    {e.lang !== language && (
                      <span className="bg-secondary px-2 py-0.5 text-[12px]">{t('carnet.otherLangBadge')}</span>
                    )}
                  </p>
                  <h2 className="mt-3 text-2xl leading-snug">
                    <Link to={`/carnet/${e.slug}`} className="text-primary hover:underline hover:decoration-accent">{e.title}</Link>
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground" lang={e.lang}>{e.summary}</p>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-10 max-w-measure text-[13px] leading-relaxed text-muted-foreground">{t('carnet.ai')}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Carnet;
