import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/josselin-butte-logo.png.asset.json';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navItems = [
    { key: 'nav.services', href: '/#services' },
    { key: 'nav.about', href: '/#about' },
    { key: 'nav.partners', href: '/partenariats' },
    { key: 'nav.retreats', href: '/#retreats' },
    { key: 'nav.contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b-2 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3" aria-label="Josselin Butté — accueil">
            <img src={logo.url} alt="Josselin Butté" className="h-7 w-auto max-w-44 object-contain" />
            <span className="hidden sm:block border-l border-primary pl-3 text-[10px] font-semibold uppercase tracking-widest text-primary">
              RegenB France
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-wider text-foreground/80 hover:text-accent transition-colors duration-200"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          {/* Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 text-sm font-medium"
              aria-label={language === 'fr' ? 'Switch to English' : 'Passer en français'}
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </Button>
            <Button variant="default" size="sm" asChild>
              <a href="/contact">{t('nav.contact')}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center space-x-1.5 text-sm font-medium text-muted-foreground"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'fr' ? 'English' : 'Français'}</span>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <a href="/contact">{t('nav.contact')}</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
