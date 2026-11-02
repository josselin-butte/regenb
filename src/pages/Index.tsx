import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DoorsSection from '@/components/DoorsSection';
import HowItStartsSection from '@/components/HowItStartsSection';
import AboutSection from '@/components/AboutSection';
import HomeNotebookSection from '@/components/HomeNotebookSection';
import VoicesBand from '@/components/VoicesBand';
import NewsletterSection from '@/components/NewsletterSection';
import WaitlistSection from '@/components/WaitlistSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <DoorsSection />
        <HowItStartsSection />
        <AboutSection />
        <HomeNotebookSection />
        <VoicesBand />
        <NewsletterSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
