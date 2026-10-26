import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VoiceQuote from '@/components/VoiceQuote';
import { useLanguage } from '@/contexts/LanguageContext';
import { voices } from '@/content/voices';

/**
 * Route temporaire de prévisualisation des citations (/dev/voices).
 * Non liée depuis le menu. Affiche chaque voix en variante inline,
 * puis la première en variante band.
 */
const DevVoices = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-16">
        <h1 className="font-serif text-3xl">
          {language === 'fr' ? 'Voix — prévisualisation' : 'Voices — preview'}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {language === 'fr'
            ? 'Page temporaire, non liée au menu. Variante inline pour chaque entrée, variante band en fin de page.'
            : 'Temporary page, not linked from the menu. Inline variant for each entry, band variant at the bottom.'}
        </p>

        <div className="mt-12 space-y-16">
          {voices.map((v) => (
            <div key={v.key}>
              <p className="mb-4 font-sans text-xs uppercase tracking-wide text-muted-foreground">
                {v.key}
              </p>
              <VoiceQuote voiceKey={v.key} variant="inline" />
            </div>
          ))}
        </div>
      </main>

      <p className="container mb-4 font-sans text-xs uppercase tracking-wide text-muted-foreground">
        variant=&quot;band&quot; — home.hero
      </p>
      <VoiceQuote voiceKey="home.hero" variant="band" />

      <Footer />
    </div>
  );
};

export default DevVoices;
