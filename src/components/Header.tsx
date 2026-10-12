import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import logoHeader from '@/assets/logo-header-regenb.png';

const Header = () => {
  const { language, setLanguage, t, lp } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onCarnet = /^\/(carnet|en\/notebook)(\/|$)/.test(useLocation().pathname);
  const carnetCls = onCarnet ? 'text-primary underline decoration-accent underline-offset-4' : 'text-foreground hover:text-primary';

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navItems = [
    { key: 'nav.about', href: '/#about' },
    { key: 'nav.offer', href: '/accompagnement' },
    { key: 'nav.letter', href: '/#letter' },
  ];

  return (
    <header className="carnet-noprint fixed left-0 right-0 top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href={lp('/')} className="flex items-center" aria-label="Josselin Butté — accueil">
          <img src={logoHeader} alt="RegenB France" className="h-12 w-auto sm:h-14" />
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a key={item.key} href={lp(item.href)} className="text-sm text-foreground hover:text-primary">
              {t(item.key)}
            </a>
          ))}
          <a href={lp('/boussole')} className="text-sm text-primary underline decoration-accent">
            {t('nav.compass')}
          </a>
          <Link to={lp('/carnet')} className={`text-sm ${carnetCls}`} aria-current={onCarnet ? 'page' : undefined}>
            {t('nav.carnet')}
          </Link>
          <button
            type="button"
            onClick={toggleLanguage}
            className="text-sm text-foreground hover:text-primary"
            aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="border border-border px-3 py-1 text-sm text-foreground md:hidden"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? 'Fermer' : 'Menu'}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:px-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={lp(item.href)}
                onClick={() => setIsMenuOpen(false)}
                className="text-foreground hover:text-primary"
              >
                {t(item.key)}
              </a>
            ))}
            <a href={lp('/boussole')} onClick={() => setIsMenuOpen(false)} className="text-primary underline decoration-accent">
              {t('nav.compass')}
            </a>
            <Link to={lp('/carnet')} onClick={() => setIsMenuOpen(false)} className={carnetCls} aria-current={onCarnet ? 'page' : undefined}>
              {t('nav.carnet')}
            </Link>
            <button
              type="button"
              onClick={toggleLanguage}
              className="self-start text-foreground hover:text-primary"
              aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              {language === 'fr' ? 'English' : 'Français'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
