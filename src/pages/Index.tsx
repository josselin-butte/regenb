import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import OfferSection from '@/components/OfferSection';
import NewsletterSection from '@/components/NewsletterSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <OfferSection />
        <NewsletterSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
