import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConsentSettings } from '@/contexts/ConsentContext';
import { consentCopy } from '@/lib/consent-copy';
import LegalTranslationNotice from '@/components/LegalTranslationNotice';

export default function Cookies() {
  const { language } = useLanguage();
  const { openSettings } = useConsentSettings();
  const copy = consentCopy[language];
  return <div className="min-h-screen bg-background">
    <Header />
    <main className="px-5 pb-16 pt-32 sm:px-8 sm:pt-40">
      <div className="measure mx-auto">
        <LegalTranslationNotice />
        <h1 className="text-3xl sm:text-4xl">{copy.policyTitle}</h1>
        <p className="mt-6">{copy.policyIntro}</p>
        <section className="mt-10 border-t border-border pt-6"><h2 className="text-xl">{copy.storageTitle}</h2><p className="mt-3">{copy.storageText}</p><p className="mt-3">{copy.renewal}</p></section>
        <section className="mt-10 border-t border-border pt-6"><h2 className="text-xl">{copy.analytics}</h2><p className="mt-3">{copy.analyticsText}</p></section>
        <section className="mt-10 border-t border-border pt-6"><h2 className="text-xl">{copy.external}</h2><p className="mt-3">{copy.externalText}</p></section>
        <section className="mt-10 border-t border-border pt-6"><h2 className="text-xl">{copy.withdrawalTitle}</h2><p className="mt-3">{copy.withdrawalText}</p><Button variant="outline" className="mt-5" onClick={openSettings}>{copy.settings}</Button></section>
        <p className="mt-10">{copy.contact} <a href="mailto:josselin@regenb.com" className="underline decoration-accent">josselin@regenb.com</a></p>
      </div>
    </main>
    <Footer />
  </div>;
}