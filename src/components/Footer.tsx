import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/josselin-butte-logo.png.asset.json';

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="bg-background inline-flex px-4 py-3 mb-6">
              <img src={logo.url} alt="Josselin Butté" className="h-8 w-auto max-w-56 object-contain" />
            </div>
            <p className="text-primary-foreground/80 max-w-md mb-6">
              {t('footer.tagline')}
            </p>
            <a
              href="https://regenb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              RegenB.com
              <ExternalLink className="w-3 h-3 ml-1.5" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#retreats" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {t('nav.retreats')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:josselin@regenb.com"
                  className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  josselin@regenb.com
                </a>
              </li>
              <li>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="inline-flex items-center px-0 text-primary-foreground/80 hover:text-primary hover:bg-primary-foreground transition-colors"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === 'fr' ? 'Switch to English' : 'Passer en Français'}
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} Josselin Butté · RegenB France. {t('footer.rights')}.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
