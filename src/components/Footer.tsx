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
              <li><a href={lp("/coaching")} className="hover:text-primary">Coaching</a></li>
              <li><a href={lp("/supervision")} className="hover:text-primary">Supervision</a></li>
              <li><a href={lp("/pyrenees")} className="hover:text-primary">{language === 'fr' ? 'Dans les Pyrénées' : 'In the Pyrenees'}</a></li>
              <li><a href={lp("/#letter")} className="hover:text-primary">{t('nav.letter')}</a></li>
              <li><a href={lp("/boussole")} className="hover:text-primary">{t('nav.compass')}</a></li>
              <li><a href={lp("/carnet")} className="hover:text-primary">{t('nav.carnet')}</a></li>
              <li><a href={lp("/contact")} className="hover:text-primary">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:josselin@regenb.com" className="text-primary underline decoration-accent">josselin@regenb.com</a>
              </li>
              <li>
                <address className="not-italic text-muted-foreground">8 route de Barat, 31160 Arbas{language === 'en' ? ', France' : ''}</address>
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
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={lp("/mentions-legales")} className="hover:text-primary">{t('legal.nav.mentions')}</a>
            <a href={lp("/confidentialite")} className="hover:text-primary">{t('footer.privacy')}</a>
            <a href={lp("/cgv")} className="hover:text-primary">{t('legal.nav.cgv')}</a>
            <a href={lp("/cookies")} className="hover:text-primary">Cookies</a>
            <Button variant="link" className="h-auto justify-start whitespace-normal p-0 text-sm font-normal" onClick={openSettings}>{consentCopy[language].settings}</Button>
            <a href={language === 'fr' ? 'https://valuescourse.regenb.com/renoncer' : 'https://valuescourse.regenb.com/renoncer?lang=en'} className="font-medium text-primary underline underline-offset-4">{language === 'fr' ? 'Renoncer au contrat ici' : 'Withdraw from the contract here'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
