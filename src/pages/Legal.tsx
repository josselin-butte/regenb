import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Legal = () => {
  const { t } = useLanguage();

  const anchors = [
    { id: 'mentions-legales', key: 'legal.nav.mentions' },
    { id: 'confidentialite', key: 'legal.nav.privacy' },
    { id: 'cgv', key: 'legal.nav.cgv' },
  ];

  const blocks = [
    {
      id: 'mentions-legales',
      titleKey: 'legal.nav.mentions',
      items: ['legal.mentions.editor', 'legal.mentions.publication', 'legal.mentions.hosting'],
    },
    {
      id: 'confidentialite',
      titleKey: 'legal.nav.privacy',
      items: ['legal.privacy.data', 'legal.privacy.use', 'legal.privacy.rights'],
    },
    {
      id: 'cgv',
      titleKey: 'legal.nav.cgv',
      items: ['legal.cgv.object', 'legal.cgv.order', 'legal.cgv.withdrawal', 'legal.cgv.ip'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-36 lg:px-12">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('legal.kicker')}</p>
            </div>
            <div className="lg:col-span-9">
              <h1 className="mt-6 text-[2.1rem] leading-[1.15] sm:text-5xl lg:mt-0">{t('legal.title')}</h1>
              <nav aria-label={t('legal.title')} className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-8">
                {anchors.map((anchor) => (
                  <a key={anchor.id} href={`#${anchor.id}`} className="text-primary underline">
                    {t(anchor.key)}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {blocks.map((block, index) => (
          <section
            key={block.id}
            id={block.id}
            className={`scroll-mt-24 border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12 ${
              index % 2 === 1 ? 'bg-secondary' : ''
            }`}
          >
            <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-3">
                <h2 className="text-2xl sm:text-3xl">{t(block.titleKey)}</h2>
              </div>
              <div className="mt-6 gap-12 sm:columns-2 lg:col-span-9 lg:mt-0">
                {block.items.map((item) => (
                  <div key={item} className="mb-6 break-inside-avoid">
                    <h3 className="text-base">{t(`${item}.title`)}</h3>
                    <p className="mt-2">{t(`${item}.text`)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
