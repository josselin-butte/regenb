import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import oulanBat from '@/assets/etapes-oulan-bat.jpg.asset.json';
import { Button } from '@/components/ui/button';

const content = {
  fr: {
    eyebrow: 'Les étapes',
    title: 'Quelques jours dehors, pour relire sa pratique',
    intro:
      "Une étape, c'est un petit groupe, quelques jours de marche, et du temps pour regarder ce qu'on porte dans son travail. On ne part pas pour s'évader : on part pour revenir avec quelque chose de plus clair.",
    springTitle: "Printemps 2027 · La ferme d'Oulan Bât, Arbas",
    springText:
      'Trois jours et deux nuits au pied des Pyrénées, à la ferme de Nico et Céline Salviac, dans leur camp de yourtes, avec leurs ânes. Huit personnes au plus. Des journées de marche, des temps en cercle, et des soirées simples.',
    springLine: 'Dates et tarif annoncés en décembre 2026.',
    button: 'Être prévenu·e en premier',
    subject: 'Étape de printemps 2027',
    closing: 'Chaque étape est complète en elle-même. On peut en faire une seule.',
  },
  en: {
    eyebrow: 'Journeys',
    title: 'A few days outdoors, to reflect on your practice',
    intro:
      "A journey is a small group, a few days of walking, and time to look at what you carry in your work. You don't go to escape: you go to come back with something clearer.",
    springTitle: 'Spring 2027 · The Oulan Bât farm, Arbas',
    springText:
      'Three days and two nights at the foot of the Pyrenees, at Nico and Céline Salviac’s farm, in their yurt camp, with their donkeys. Eight people at most. Days of walking, time in a circle, and simple evenings.',
    springLine: 'Dates and fees announced in December 2026.',
    button: 'Be the first to know',
    subject: 'Spring 2027 journey',
    closing: 'Each journey is complete in itself. You can come to just one.',
  },
};

const Etapes = () => {
  const { language, t } = useLanguage();
  const c = content[language];
  const mailto = `mailto:josselin@regenb.com?subject=${encodeURIComponent(c.subject)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
          <div className="measure mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">{c.eyebrow}</p>
            <h1 className="mt-5 text-[2.1rem] font-semibold leading-[1.15] sm:text-5xl">{c.title}</h1>
            <p className="mt-6 text-muted-foreground">{c.intro}</p>
          </div>
        </section>

        <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-2 md:gap-12">
            <div className="max-w-[500px]">
              <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{c.springTitle}</h2>
              <p className="mt-4 text-muted-foreground">{c.springText}</p>
              <p className="mt-6 border-l-2 border-accent pl-4 text-[15px]">{c.springLine}</p>
              <Button asChild size="lg" className="mt-8">
                <a href={mailto}>{c.button}</a>
              </Button>
            </div>
            <img
              src={`https://regenb.lovable.app${oulanBat.url}`}
              alt={t('image.oulanbat')}
              width={1025}
              height={737}
              loading="lazy"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <p className="measure mx-auto text-center text-[15px] text-muted-foreground">{c.closing}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Etapes;
