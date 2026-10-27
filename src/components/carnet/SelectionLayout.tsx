import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { useLanguage } from '@/contexts/LanguageContext';
import { breadcrumb, website } from '@/lib/structured-data';
import { shortDescription, relatedEntry, type SelectionLink } from '@/lib/carnet-selections';

export function SelectionLinks({ links }: { links: SelectionLink[] }) {
  return <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
    {links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.accessibleLabel}
      className="text-primary underline decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{link.label}</a>)}
  </div>;
}

export function RelatedNote({ reference }: { reference?: string }) {
  const { language, lp } = useLanguage();
  const entry = relatedEntry(reference, language);
  if (!entry) return null;
  return <p className="mt-8 text-sm text-muted-foreground">{language === 'fr' ? 'Lire aussi : ' : 'Read also: '}
    <Link to={lp(`/carnet/${entry.slug}`)} className="text-primary underline decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{entry.title}</Link>
  </p>;
}

export default function SelectionLayout({ intro, title, path, schemas, children, wide = false }: {
  intro: { title: string; eyebrow: string; lead: string }; title: string; path: string;
  schemas: object[]; children: ReactNode; wide?: boolean;
}) {
  const { language, lp, t } = useLanguage();
  return <div className="min-h-screen bg-background">
    <Seo title={title} description={shortDescription(intro.lead)} jsonLd={[
      website(language), breadcrumb([
        { name: language === 'fr' ? 'Accueil' : 'Home', path: lp('/') },
        { name: language === 'fr' ? 'Carnet' : 'Notebook', path: lp('/carnet') },
        { name: intro.title, path },
      ]), ...schemas,
    ]} />
    <Header />
    <main className="px-5 pb-24 pt-[121px] sm:px-8 sm:pt-[153px] lg:px-12">
      <div className={wide ? 'mx-auto max-w-5xl' : 'mx-auto max-w-[760px]'}>
        <Link to={lp('/carnet')} className="text-sm text-primary underline decoration-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{t('carnet.back')}</Link>
        <p className="mt-10 text-sm font-medium uppercase tracking-[0.18em] text-accent">{intro.eyebrow}</p>
        <h1 className="mt-6 text-[2.2rem] leading-[1.1] text-primary sm:text-5xl">{intro.title}</h1>
        <p className="mt-8 max-w-measure text-[20px] leading-relaxed">{intro.lead}</p>
        {children}
      </div>
    </main>
    <Footer />
  </div>;
}