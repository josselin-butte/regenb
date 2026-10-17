import { type ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Seo from '@/components/Seo';
import { crumbs } from '@/components/RouteSeo';
import { article, breadcrumb, website } from '@/lib/structured-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ElementIcon from '@/components/ElementIcon';
import StatusChip from '@/components/carnet/StatusChip';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate, getEntry } from '@/lib/carnet';
import NotFound from './NotFound';

const setMeta = (selector: string, attr: string, key: string, value: string) => {
  let el = document.head.querySelector(selector);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', value);
};

// [13] or [17, 25] -> bracketed links to #ref-N
const linkCitations = (md: string) =>
  md.replace(/\[(\d+(?:\s*[,;]\s*\d+)*)\](?![(:])/g, (_, nums: string) =>
    '\\[' + nums.split(/\s*[,;]\s*/).map((n) => `[${n}](#ref-${n})`).join(', ') + '\\]');

const REF_HEADING = /^##\s+(Références|References|Sources)\s*$/im;

const mdComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-14 text-2xl leading-snug text-primary before:mb-4 before:block before:h-[2px] before:w-10 before:bg-accent before:content-['']">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="mt-10 text-xl text-primary">{children}</h3>,
  p: ({ children }) => <p className="mt-5">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6">{children}</ol>,
  blockquote: ({ children }) => <blockquote className="mt-6 border-l-2 border-accent pl-5 italic">{children}</blockquote>,
  a: ({ href = '', children }) => {
    if (href.startsWith('#ref-')) return <a href={href} className="carnet-cite text-[0.8em] text-muted-foreground no-underline hover:text-primary">{children}</a>;
    const external = /^https?:/.test(href);
    return <a href={href} className="text-primary underline decoration-accent" {...(external ? { target: '_blank', rel: 'noopener' } : {})}>{children}</a>;
  },
};

const refComponents: Components = {
  ...mdComponents,
  ol: ({ children, start }) => <ol start={start} className="mt-4 list-decimal space-y-2 pl-6 text-[15px]">{children}</ol>,
  a: ({ href = '', children }) => (
    <a href={href} target="_blank" rel="noopener" className="break-all text-primary underline decoration-accent">{children}</a>
  ),
};

const Box = ({ label, kind, children }: { label: string; kind: 'essentiel' | 'accompagnement'; children: ReactNode }) => (
  <aside className={kind === 'essentiel' ? 'mt-10 bg-secondary p-8' : 'mt-10 border-l-[3px] border-primary bg-background py-6 pl-6 pr-2'}>
    <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{label}</p>
    <div className="[&>p:first-child]:mt-3">{children}</div>
  </aside>
);

const CarnetEntry = () => {
  const { slug = '' } = useParams();
  const { t, language, lp } = useLanguage();
  const entry = getEntry(slug, language);


  if (!entry) return <NotFound />;
  if (entry.slug !== slug) return <Navigate to={lp(`/carnet/${entry.slug}`)} replace />;

  // Split references off, then split custom boxes.
  const refMatch = entry.body.match(REF_HEADING);
  const main = refMatch ? entry.body.slice(0, refMatch.index) : entry.body;
  const refs = refMatch ? entry.body.slice((refMatch.index ?? 0) + refMatch[0].length) : '';
  const parts = linkCitations(main).split(/^:::(essentiel|accompagnement)\s*$([\s\S]*?)^:::\s*$/m);

  // Number reference items so citations can target #ref-N
  // Number by source line so repeated renders (StrictMode) can't double-count.
  const refLines = new Map<number, number>();
  refs.split('\n').forEach((l, i) => { const m = l.match(/^(\d+)\.\s/); if (m) refLines.set(i + 1, Number(m[1])); });
  const numberedRefComponents: Components = {
    ...refComponents,
    li: ({ children, node }) => { const n = refLines.get(node?.position?.start.line ?? -1); return <li id={n ? `ref-${n}` : undefined} className="scroll-mt-28 break-words">{children}</li>; },
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${entry.title} | Josselin Butté`}
        description={entry.description}
        ogType="article"
        jsonLd={[
          website(language),
          breadcrumb(crumbs(lp(`/carnet/${entry.slug}`), entry.title)),
          article(entry, lp(`/carnet/${entry.slug}`), refs),
        ]}
      />
      <Header />
      <main className="px-5 pb-24 pt-[113px] sm:px-8 sm:pt-[137px] lg:px-12">
        <article lang={entry.lang} className="carnet-article mx-auto max-w-measure">
          <Link to={lp('/carnet')} lang={language} className="carnet-noprint text-sm text-primary underline decoration-accent">{t('carnet.back')}</Link>
          {entry.element && <ElementIcon element={entry.element} size={40} animated={false} className="mt-10 block" />}
          <p lang={language} className={`${entry.element ? 'mt-5' : 'mt-10'} text-sm font-medium uppercase tracking-[0.18em] text-accent`}>{t('carnet.noteEyebrow')}</p>
          <h1 className="mt-5 text-[2.1rem] leading-[1.12] tracking-tight text-primary sm:text-[2.75rem]">{entry.title}</h1>
          <p className="mt-6 text-[20px] leading-relaxed">{entry.summary}</p>
          <p lang={language} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <span>{formatDate(entry.date, language)}</span>
            <StatusChip status={entry.status} />
            <span>{entry.readingTime} {t('carnet.minutes')}</span>
            {entry.origin && <span lang={entry.lang}>{entry.origin}</span>}
          </p>

          {entry.lang !== language && (
            <p lang={language} className="mt-8 bg-secondary px-5 py-4 text-[15px]">{t('carnet.otherLangNote')}</p>
          )}

          <div className="mt-6 text-[18px] leading-[1.7]">
            {parts.map((part, i) => {
              if (i % 3 === 0) return part.trim() ? <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={mdComponents}>{part}</ReactMarkdown> : null;
              if (i % 3 === 1) return null;
              const kind = parts[i - 1] as 'essentiel' | 'accompagnement';
              return (
                <Box key={i} kind={kind} label={t(`carnet.box.${kind}`)}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>{part}</ReactMarkdown>
                </Box>
              );
            })}
          </div>

          {refs.trim() && (
            <section className="mt-16 border-t border-border pt-8">
              <h2 lang={language} className="text-xl text-primary">{t('carnet.references')}</h2>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={numberedRefComponents}>{refs}</ReactMarkdown>
            </section>
          )}

          <section lang={language} className="carnet-noprint mt-16 border-t border-border pt-10">
            <h2 className="text-2xl text-primary">{t('carnet.cta.title')}</h2>
            <p className="mt-4">{t('carnet.cta.text')}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild><a href="https://lecontinuo.substack.com" target="_blank" rel="noopener noreferrer">{t('carnet.cta.letter')}</a></Button>
              <Button size="lg" variant="outline" asChild><a href="mailto:josselin@regenb.com">{t('carnet.cta.write')}</a></Button>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default CarnetEntry;
