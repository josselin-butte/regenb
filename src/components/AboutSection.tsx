import { useLanguage } from '@/contexts/LanguageContext';
import ElementIcon from '@/components/ElementIcon';
import randonneeAsset from '@/assets/josselin-butte-randonnee.webp.asset.json';
import { voices } from '@/content/voices';

const AboutSection = () => {
  const { t, language } = useLanguage();
  const kimmerer = voices[0];
  const quote = language === 'fr' ? `« ${kimmerer.fr} »` : `“${kimmerer.en}”`;

  const principles = [
    { n: 1, element: 'earth' },
    { n: 2, element: 'air' },
    { n: 3, element: 'water' },
    { n: 4, element: 'fire' },
  ] as const;

  return (
    <section id="about" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:gap-14">
        <img
          src={`https://regenb.lovable.app${randonneeAsset.url}`}
          alt={t('image.randonnee')}
          width={1000}
          height={666}
          loading="lazy"
          decoding="async"
          className="w-full object-cover object-[30%_center]"
        />
        <div className="max-w-measure">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('about.kicker')}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{t('nav.about')}</h2>
          <p className="mt-6">{t('about.p1')}</p>
          <blockquote className="mt-10 border-l-2 border-accent pl-6">
            <p className="font-serif text-xl leading-snug text-primary">{quote}</p>
            <footer className="mt-2 text-sm text-muted-foreground">{kimmerer.name}, {kimmerer.year}</footer>
          </blockquote>
          <ul className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {principles.map((p) => (
              <li key={p.n} className="flex flex-col items-start gap-3">
                <ElementIcon element={p.element} size={28} label={t(`element.${p.element}`)} />
                <p className="font-serif text-[15px] font-medium leading-snug text-primary">{t(`about.guide.${p.n}.title`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
