import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <footer id="contact" className="border-t border-border px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-measure">
        <p className="text-base font-semibold text-foreground">Josselin Butté · RegenB France</p>
        <p className="mt-3 text-muted-foreground">{t('footer.tagline')}</p>

        <ul className="mt-8 space-y-2">
          <li>
            <a href="mailto:josselin@regenb.com" className="text-primary underline">
              josselin@regenb.com
            </a>
          </li>
          <li>
            <a href="https://regenb.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              RegenB.com
            </a>
          </li>
          <li>
            <a href="/#about" className="text-foreground hover:text-primary">
              {t('nav.about')}
            </a>
          </li>
          <li>
            <button type="button" onClick={toggleLanguage} className="text-foreground hover:text-primary">
              {language === 'fr' ? 'Switch to English' : 'Passer en Français'}
            </button>
          </li>
        </ul>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Josselin Butté · RegenB France. {t('footer.rights')}.</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
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
