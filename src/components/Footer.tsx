import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <footer id="contact" className="border-t border-border px-5 py-14 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-base font-semibold text-foreground">Josselin Butté · RegenB France</p>
            <p className="mt-3 max-w-measure text-muted-foreground">{t('footer.tagline')}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Navigation</p>
            <ul className="mt-4 space-y-2">
              <li><a href="/#about" className="hover:text-primary">{t('nav.about')}</a></li>
              <li><a href="/#offer" className="hover:text-primary">{t('nav.offer')}</a></li>
              <li><a href="/#letter" className="hover:text-primary">{t('nav.letter')}</a></li>
              <li><a href="/boussole" className="hover:text-primary">{t('nav.compass')}</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="mailto:josselin@regenb.com" className="text-primary underline">josselin@regenb.com</a>
              </li>
              <li>
                <a href="https://regenb.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  RegenB.com
                </a>
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
            <a href="/legal#mentions-legales" className="hover:text-primary">{t('footer.terms')}</a>
            <a href="/legal#confidentialite" className="hover:text-primary">{t('footer.privacy')}</a>
            <a href="/legal#cgv" className="hover:text-primary">{t('legal.nav.cgv')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
