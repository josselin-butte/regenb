import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { library, type BookTheme } from '@/data/library';
import { audiobooks } from '@/data/audiobooks';
import landscape from '@/assets/home-paysage.webp.asset.json';
import { SITE_ORIGIN } from '@/lib/routes';
import { audiobookCardId, audiobookSchema, audiobookSectionId, libraryBookId, matchingLibraryBook } from '@/lib/audiobooks';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import SelectionLayout, { RelatedNote, SelectionLinks } from '@/components/carnet/SelectionLayout';
import { bookLinks, filterBooks, librarySchema } from '@/lib/carnet-selections';

export default function Library() {
  const { language, lp } = useLanguage();
  const { hash } = useLocation();
  const [theme, setTheme] = useState<BookTheme | 'all'>('all');
  const books = filterBooks(library.books, theme);
  const audio = audiobooks[language];
  const sectionId = audiobookSectionId(language);
  const filters: (BookTheme | 'all')[] = ['all', ...Object.keys(library.themes) as BookTheme[]];

  useEffect(() => {
    if (!hash) return;
    let cancelled = false;
    let frame = 0;
    const scroll = () => {
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
      const id = decodeURIComponent(hash.slice(1));
      if (id.startsWith('library-book-')) setTheme('all');
      document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'instant' });
      });
    };
    void document.fonts.ready.then(scroll);
    return () => { cancelled = true; cancelAnimationFrame(frame); };
  }, [hash, language, theme]);

  useEffect(() => {
    const description = language === 'fr'
      ? "Les livres qui nourrissent mes accompagnements, et ceux que j'écoute en chemin."
      : 'The books that feed my work, and the ones I listen to on the road.';
    const changed: { el: HTMLMetaElement; previous: string | null; created: boolean }[] = [];
    for (const [attr, key, value] of [
      ['name', 'description', description],
      ['property', 'og:description', description],
      ['name', 'twitter:description', description],
      ['property', 'og:image', SITE_ORIGIN + landscape.url],
    ]) {
      let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      const created = !el;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      changed.push({ el, previous: el.getAttribute('content'), created });
      el.content = value;
    }
    return () => changed.forEach(({ el, previous, created }) => {
      if (created) el.remove();
      else if (previous !== null) el.content = previous;
      else el.removeAttribute('content');
    });
  }, [language]);

  return <SelectionLayout wide intro={library.intro[language]} path={lp('/carnet/bibliotheque')}
    title={language === 'fr' ? 'Bibliothèque — Carnet RegenB France' : 'Library — RegenB France Notebook'}
    schemas={[librarySchema(library.books, language), audiobookSchema(audio, language)]}>
    <p className="mt-4 text-sm text-muted-foreground">
      {language === 'fr' ? "Certains de ces livres s'écoutent aussi : voir " : 'Some of these books are also audiobooks: see '}
      <a href={`#${sectionId}`} className="text-primary underline decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
        {language === 'fr' ? 'À écouter en chemin' : 'Listening on the way'}
      </a>
    </p>
    <div role="group" aria-label={language === 'fr' ? 'Filtrer par thème' : 'Filter by theme'} className="mt-10 flex flex-wrap gap-x-4 gap-y-2 border-y border-border py-4">
      {filters.map(filter => <Button key={filter} variant="link" aria-pressed={theme === filter} onClick={() => setTheme(filter)}
        className={`h-auto min-h-11 max-w-full whitespace-normal px-0 py-2 text-left text-sm ${theme === filter ? 'font-semibold underline decoration-accent decoration-2 underline-offset-4' : 'text-muted-foreground no-underline'}`}>
        {filter === 'all' ? language === 'fr' ? 'Tout' : 'All' : library.themes[filter][language]}
      </Button>)}
    </div>
    <p role="status" aria-live="polite" className="sr-only">{books.length} {language === 'fr' ? 'livres' : 'books'}</p>
    <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
      {books.map(book => {
        const audioIndex = audio.items.findIndex(item => item.libraryTitle === book[language].title);
        return <article key={book.isbnEn} id={libraryBookId(book)} className="min-w-0 scroll-mt-28 border-l-2 border-primary pl-5 sm:pl-7">
        <p className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          {library.themes[book.theme][language]}
          {audioIndex >= 0 && <a href={`#${audiobookCardId(language, audioIndex)}`} className="py-2 text-primary underline decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">Audio</a>}
        </p>
        <h2 className="mt-4 text-2xl leading-snug text-primary">{book[language].title}</h2>
        <p className="mt-3">{book.author}</p>
        <p className="mt-1 text-sm text-muted-foreground">{book[language].edition}</p>
        <h3 className="mt-6 text-base font-semibold">{language === 'fr' ? "Ce qu'on y trouve" : "What you'll find"}</h3>
        <p className="mt-2 text-base">{book[language].what}</p>
        <h3 className="mt-5 text-base font-semibold">{language === 'fr' ? 'À ouvrir quand…' : 'Open it when…'}</h3>
        <p className="mt-2 text-base text-muted-foreground">{book[language].when}</p>
        <SelectionLinks links={bookLinks(book, language)} />
        <RelatedNote reference={book.relatedNote} />
      </article>; })}
    </div>
    <section id={sectionId} aria-labelledby={`${sectionId}-title`} className="mt-20 scroll-mt-28 border-t border-border pt-12">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{language === 'fr' ? 'Carnet · Livres audio' : 'Notebook · Audiobooks'}</p>
      <h2 id={`${sectionId}-title`} className="mt-6 font-serif text-3xl leading-snug text-primary sm:text-4xl">{language === 'fr' ? 'À écouter en chemin' : 'Listening on the way'}</h2>
      <p className="mt-8 max-w-measure font-sans text-xl leading-relaxed">{audio.lead}</p>
      <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
        {audio.items.map((item, index) => {
          const book = item.inLibrary ? matchingLibraryBook(item, library.books, language) : undefined;
          return <article key={item.title} id={audiobookCardId(language, index)} className="min-w-0 scroll-mt-28 border-l-2 border-primary pl-5 sm:pl-7">
            <h3 className="text-2xl font-semibold leading-snug text-primary">{item.title}</h3>
            <p className="mt-3">{item.author}</p>
            <p className="mt-1 text-sm text-muted-foreground">{[item.readBy ? `${language === 'fr' ? 'Lu par' : 'Read by'} ${item.readBy}` : '', item.length].filter(Boolean).join(' · ')}</p>
            <p className="mt-6 text-base">{item.what}</p>
            <SelectionLinks links={[{ label: item.listing.label, href: item.listing.url, accessibleLabel: `${item.listing.label} (${language === 'fr' ? 'nouvel onglet' : 'new tab'})` }]} />
            {book && <p className="mt-4 text-sm"><a href={`#${libraryBookId(book)}`} onClick={() => setTheme('all')} className="inline-block py-2 text-primary underline decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{language === 'fr' ? 'Aussi dans la Bibliothèque' : 'Also in the Library'}</a></p>}
          </article>;
        })}
      </div>
      <p className="mt-12 max-w-measure text-muted-foreground">{audio.closing}</p>
    </section>
  </SelectionLayout>;
}