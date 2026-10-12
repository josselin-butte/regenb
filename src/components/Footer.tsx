import { useLanguage } from '@/contexts/LanguageContext';
import { useConsentSettings } from '@/contexts/ConsentContext';
import { consentCopy } from '@/lib/consent-copy';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { t, language, setLanguage, lp } = useLanguage();
  const { openSettings } = useConsentSettings();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <footer id="contact" className="carnet-noprint border-t border-border px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-base font-semibold text-foreground">Josselin Butté · RegenB France</p>
            <p className="mt-3 max-w-measure text-muted-foreground">{t('tagline')}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Navigation</p>
            <ul className="mt-4 space-y-2">
              <li><a href={lp("/#about")} className="hover:text-primary">{t('nav.about')}</a></li>
              <li><a href={lp("/accompagnement")} className="hover:text-primary">{t('nav.offer')}</a></li>
              <li><a href={lp("/#letter")} className="hover:text-primary">{t('nav.letter')}</a></li>
              <li><a href={lp("/boussole")} className="hover:text-primary">{t('nav.compass')}</a></li>
              <li><a href={lp("/carnet")} className="hover:text-primary">{t('nav.carnet')}</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:josselin@regenb.com" className="text-primary underline decoration-accent">josselin@regenb.com</a>
              </li>
              <li>
                <button type="button" onClick={toggleLanguage} className="hover:text-primary">
                  {language === 'fr' ? 'Switch to English' : 'Passer en Français'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Josselin Butté · RegenB France. {t('footer.rights')}.</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <a href={lp("/legal#mentions-legales")} className="hover:text-primary">{t('footer.terms')}</a>
            <a href={lp("/legal#confidentialite")} className="hover:text-primary">{t('footer.privacy')}</a>
            <a href={lp("/legal#cgv")} className="hover:text-primary">{t('legal.nav.cgv')}</a>
            <Button variant="link" className="h-auto justify-start whitespace-normal p-0 text-sm font-normal" onClick={openSettings}>{consentCopy[language].settings}</Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
