import { useState } from 'react';
import { library, type BookTheme } from '@/data/library';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import SelectionLayout, { RelatedNote, SelectionLinks } from '@/components/carnet/SelectionLayout';
import { bookLinks, filterBooks, librarySchema } from '@/lib/carnet-selections';

export default function Library() {
  const { language, lp } = useLanguage();
  const [theme, setTheme] = useState<BookTheme | 'all'>('all');
  const books = filterBooks(library.books, theme);
  const filters: (BookTheme | 'all')[] = ['all', ...Object.keys(library.themes) as BookTheme[]];
  return <SelectionLayout wide intro={library.intro[language]} path={lp('/carnet/bibliotheque')}
    title={language === 'fr' ? 'Bibliothèque — Carnet RegenB France' : 'Library — RegenB France Notebook'}
    schemas={[librarySchema(library.books, language)]}>
    <div role="group" aria-label={language === 'fr' ? 'Filtrer par thème' : 'Filter by theme'} className="mt-10 flex flex-wrap gap-x-4 gap-y-2 border-y border-border py-4">
      {filters.map(filter => <Button key={filter} variant="link" aria-pressed={theme === filter} onClick={() => setTheme(filter)}
        className={`h-auto min-h-11 max-w-full whitespace-normal px-0 py-2 text-left text-sm ${theme === filter ? 'font-semibold underline decoration-accent decoration-2 underline-offset-4' : 'text-muted-foreground no-underline'}`}>
        {filter === 'all' ? language === 'fr' ? 'Tout' : 'All' : library.themes[filter][language]}
      </Button>)}
    </div>
    <p role="status" aria-live="polite" className="sr-only">{books.length} {language === 'fr' ? 'livres' : 'books'}</p>
    <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
      {books.map(book => <article key={book.isbnEn} className="min-w-0 border-l-2 border-primary pl-5 sm:pl-7">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{library.themes[book.theme][language]}</p>
        <h2 className="mt-4 text-2xl leading-snug text-primary">{book[language].title}</h2>
        <p className="mt-3">{book.author}</p>
        <p className="mt-1 text-sm text-muted-foreground">{book[language].edition}</p>
        <h3 className="mt-6 text-base font-semibold">{language === 'fr' ? "Ce qu'on y trouve" : "What you'll find"}</h3>
        <p className="mt-2 text-base">{book[language].what}</p>
        <h3 className="mt-5 text-base font-semibold">{language === 'fr' ? 'À ouvrir quand…' : 'Open it when…'}</h3>
        <p className="mt-2 text-base text-muted-foreground">{book[language].when}</p>
        <SelectionLinks links={bookLinks(book, language)} />
        <RelatedNote reference={book.relatedNote} />
      </article>)}
    </div>
  </SelectionLayout>;
}