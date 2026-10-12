import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConsentSettings } from '@/contexts/ConsentContext';
import { consentCopy } from '@/lib/consent-copy';
import { trackers, optionalTrackers } from '@/lib/trackers';
import LegalTranslationNotice from '@/components/LegalTranslationNotice';

export default function Cookies() {
  const { language } = useLanguage();
  const { openSettings } = useConsentSettings();
  const copy = consentCopy[language];
  return <div className="min-h-screen bg-background">
    <Header />
    <main className="px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-4xl">
        <div className="measure">
          <LegalTranslationNotice />
          <h1 className="text-3xl sm:text-4xl">{copy.policyTitle}</h1>
          <p className="mt-6">{copy.pageIntro}</p>
          {optionalTrackers().length === 0 && <p className="mt-4 font-medium text-primary">{copy.noOptional}</p>}
          <Button variant="outline" className="mt-6" onClick={openSettings}>{copy.settings}</Button>
        </div>
        <section className="mt-12 border-t border-border pt-6">
          <h2 className="text-xl">{copy.tableTitle}</h2>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-[14px] leading-snug">
              <thead><tr>{copy.cols.map(c => <th key={c} scope="col" className="border-b border-primary py-2 pr-4 font-medium text-primary">{c}</th>)}</tr></thead>
              <tbody>{trackers.map(t => <tr key={t.name}>
                <th scope="row" className="border-b border-border py-3 pr-4 align-top font-mono text-[13px] font-normal text-foreground">{t.name}</th>
                <td className="border-b border-border py-3 pr-4 align-top text-muted-foreground">{t.purpose[language]}</td>
                <td className="border-b border-border py-3 pr-4 align-top text-muted-foreground">{t.provider[language]}</td>
                <td className="border-b border-border py-3 pr-4 align-top text-muted-foreground">{t.lifetime[language]}</td>
                <td className="border-b border-border py-3 pr-4 align-top text-muted-foreground">{t.category === 'necessary' ? copy.catNecessary : copy.catConsent}</td>
              </tr>)}</tbody>
            </table>
          </div>
          <p className="measure mt-4 text-[15px] text-muted-foreground">{copy.tableNote}</p>
        </section>
        <div className="measure">
          <section className="mt-10 border-t border-border pt-6"><h2 className="text-xl">{copy.withdrawalTitle}</h2><p className="mt-3">{copy.renewal}</p><p className="mt-3">{copy.withdrawalText}</p></section>
          <p className="mt-10">{copy.contact} <a href="mailto:josselin@regenb.com" className="underline decoration-accent">josselin@regenb.com</a></p>
        </div>
      </div>
    </main>
    <Footer />
  </div>;
}
