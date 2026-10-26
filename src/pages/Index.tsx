import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import OfferSection from '@/components/OfferSection';
import NewsletterSection from '@/components/NewsletterSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';
import VoiceQuote from '@/components/VoiceQuote';
import { useLanguage } from '@/contexts/LanguageContext';
import paysage from '@/assets/home-paysage.webp.asset.json';

const Index = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <VoiceQuote voiceKey="home.hero" variant="band" />
        <AboutSection />
        <OfferSection />
        <img src={`https://regenb.lovable.app${paysage.url}`} alt={t('image.paysage')} width={1600} height={1200} loading="lazy" className="block h-[220px] w-full object-cover object-center lg:h-[420px]" />
        <NewsletterSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
