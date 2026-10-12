import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Navigate, useLocation } from 'react-router-dom';
import LegalTranslationNotice from '@/components/LegalTranslationNotice';
import { legacyLegalDestination, noticeContent, privacyContent, termsContent, type LegalBlock, type LegalPageKind } from '@/lib/legal';

export function LegacyLegalRedirect() {
  const { language } = useLanguage();
  const { hash } = useLocation();
  return <Navigate replace to={legacyLegalDestination(language, hash)} />;
}

const Legal = ({ kind }: { kind: LegalPageKind }) => {
  const { t, language, lp } = useLanguage();
  const title = t(kind === 'notice' ? 'legal.nav.mentions' : kind === 'privacy' ? 'legal.nav.privacy' : 'legal.nav.cgv');
  const blocks: LegalBlock[] = kind === 'notice' ? noticeContent[language] : kind === 'privacy' ? privacyContent[language]
    : termsContent[language];
  const renderText = (text: string) => text.split(/(josselin@regenb\.com|https:\/\/lovable\.dev|www\.cnil\.fr|page Cookies|Cookies page|mentions légales|legal notice|politique de confidentialité|privacy policy)/).map((part, i) => part === 'josselin@regenb.com'
    ? <a key={i} href="mailto:josselin@regenb.com" className="underline decoration-accent">{part}</a>
    : part === 'https://lovable.dev' || part === 'www.cnil.fr' ? <a key={i} href={part.startsWith('http') ? part : `https://${part}`} target="_blank" rel="noopener noreferrer" className="underline decoration-accent">{part}</a>
    : part === 'mentions légales' || part === 'legal notice' ? <a key={i} href={lp('/mentions-legales')} className="underline decoration-accent">{part}</a>
    : part === 'politique de confidentialité' || part === 'privacy policy' ? <a key={i} href={lp('/confidentialite')} className="underline decoration-accent">{part}</a>
    : part === 'page Cookies' || part === 'Cookies page' ? <a key={i} href={lp('/cookies')} className="underline decoration-accent">{part}</a> : part);
  const links = [
    { path: '/mentions-legales', label: t('legal.nav.mentions') },
    { path: '/confidentialite', label: t('legal.nav.privacy') },
    { path: '/cookies', label: 'Cookies' },
    { path: '/cgv', label: t('legal.nav.cgv') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36 lg:px-12">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">{t('legal.kicker')}</p>
            </div>
            <div className="lg:col-span-9">
              <LegalTranslationNotice />
              <h1 className="mt-6 text-[2.1rem] leading-[1.15] sm:text-5xl lg:mt-0">{title}</h1>
              <nav aria-label={t('legal.title')} className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                {links.filter(link => lp(link.path) !== window.location.pathname).map((link) => (
                  <a key={link.path} href={lp(link.path)} className="text-primary underline decoration-accent">
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {blocks.map((block, index) => (
          <section
            key={block.title}
            className={`scroll-mt-24 border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12 ${
              index % 2 === 1 ? 'bg-secondary' : ''
            }`}
          >
            <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-3">
                <h2 className="text-xl sm:text-2xl">{block.title}</h2>
              </div>
              <div className={`mt-5 lg:col-span-9 lg:mt-0 ${block.table ? '' : 'measure'}`}>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mb-3 text-[15px] leading-relaxed text-muted-foreground break-words">{renderText(paragraph)}</p>
                ))}
                {block.table && (
                  <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
                    <table className="w-full min-w-[640px] border-collapse text-left text-[14px] leading-snug">
                      <thead>
                        <tr>{block.table.head.map(h => <th key={h} scope="col" className="border-b border-primary py-2 pr-4 align-bottom font-medium text-primary">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {block.table.rows.map(row => (
                          <tr key={row[0]}>{row.map((cell, i) => i === 0
                            ? <th key={i} scope="row" className="border-b border-border py-3 pr-4 align-top font-medium text-foreground">{cell}</th>
                            : <td key={i} className="border-b border-border py-3 pr-4 align-top text-muted-foreground">{cell}</td>)}</tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {block.after?.map(paragraph => (
                  <p key={paragraph} className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
