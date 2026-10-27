import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { listening } from '@/data/listening';
import { useLanguage } from '@/contexts/LanguageContext';
import SelectionLayout, { RelatedNote, SelectionLinks } from '@/components/carnet/SelectionLayout';
import { Button } from '@/components/ui/button';
import { playlistSchema, trackLinks, trackText } from '@/lib/carnet-selections';

export default function Listening() {
  const { language, lp } = useLanguage();
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, [hash, language]);
  return <SelectionLayout intro={listening.intro[language]} path={lp('/carnet/ecoutes')}
    title={language === 'fr' ? 'Écoutes — Carnet RegenB France' : 'Listening — RegenB France Notebook'}
    schemas={listening.playlists.map(playlist => playlistSchema(playlist, language))}>
    <nav aria-label={language === 'fr' ? 'Playlists' : 'Playlists'} className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-y border-border py-5 text-sm">
      {listening.playlists.map(playlist => <a key={playlist.slug} href={`#${language === 'fr' ? playlist.slug : playlist.slugEn}`}
        className="text-primary underline decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{playlist[language].title}</a>)}
    </nav>
    {listening.playlists.map(playlist => <section key={playlist.slug} id={language === 'fr' ? playlist.slug : playlist.slugEn} className="mt-16 scroll-mt-32 sm:scroll-mt-40">
      <h2 className="text-3xl leading-snug text-primary">{playlist[language].title}</h2>
      <p className="mt-4 max-w-measure">{playlist[language].desc}</p>
      <ol className="mt-8 divide-y divide-border border-y border-border">
        {playlist.tracks.map((track, index) => {
          const text = trackText(track, language);
          return <li key={`${track.artist}-${track.title}`} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-7 sm:gap-5">
            <span aria-hidden="true" className="pt-0.5 text-sm text-accent">{String(index + 1).padStart(2, '0')}</span>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold leading-snug text-primary">{text.title}</h3>
              <p className="mt-1">{text.artist}</p>
              {(text.album || track.year) && <p className="mt-1 text-sm text-muted-foreground">{[text.album, track.year].filter(Boolean).join(' · ')}</p>}
              <p className="mt-3 italic text-muted-foreground">{track[language]}</p>
              <SelectionLinks links={trackLinks(track, language)} />
            </div>
          </li>;
        })}
      </ol>
      {playlist.qobuzPlaylistUrl && <Button asChild variant="outline" className="mt-6 h-auto whitespace-normal text-left">
        <a href={playlist.qobuzPlaylistUrl} target="_blank" rel="noopener noreferrer" aria-label={language === 'fr' ? `Écouter toute la playlist ${playlist.fr.title} sur Qobuz (nouvel onglet)` : `Play the whole playlist ${playlist.en.title} on Qobuz (new tab)`}>
          {language === 'fr' ? 'Écouter toute la playlist sur Qobuz' : 'Play the whole playlist on Qobuz'}
        </a>
      </Button>}
      <RelatedNote reference={playlist.relatedNote} />
    </section>)}
  </SelectionLayout>;
}