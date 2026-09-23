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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Titre */}
        <section className="border-b-2 border-primary px-6 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pt-44 xl:px-24 pb-14 sm:pb-16">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block bg-accent px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
              {t('legal.kicker')}
            </span>
            <h1 className="mt-8 text-5xl sm:text-6xl font-black uppercase leading-[0.9] text-primary">
              {t('legal.title')}
            </h1>
          </div>
        </section>

        {/* Sommaire ancré */}
        <nav
          aria-label={t('legal.title')}
          className="sticky top-16 sm:top-20 z-30 border-b-2 border-primary bg-background/95 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-3xl flex-wrap gap-x-8 gap-y-1 px-6 py-4 sm:px-10 lg:px-0">
            {anchors.map((anchor) => (
              <a
                key={anchor.id}
                href={`#${anchor.id}`}
                className="text-xs font-semibold uppercase tracking-wider text-foreground/80 hover:text-accent transition-colors"
              >
                {t(anchor.key)}
              </a>
            ))}
          </div>
        </nav>

        {/* Mentions légales */}
        <section id="mentions-legales" className="scroll-mt-32 sm:scroll-mt-36 border-b-2 border-primary px-6 py-14 sm:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-black uppercase leading-none text-primary sm:text-4xl">
              {t('legal.nav.mentions')}
            </h2>
            <div className="mt-8 space-y-7">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{t('legal.mentions.editor.title')}</h3>
                <p className="mt-3 leading-relaxed text-foreground">{t('legal.mentions.editor.text')}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{t('legal.mentions.publication.title')}</h3>
                <p className="mt-3 leading-relaxed text-foreground">{t('legal.mentions.publication.text')}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{t('legal.mentions.hosting.title')}</h3>
                <p className="mt-3 leading-relaxed text-foreground">{t('legal.mentions.hosting.text')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Confidentialité */}
        <section id="confidentialite" className="scroll-mt-32 sm:scroll-mt-36 border-b-2 border-primary bg-primary px-6 py-14 sm:px-10 lg:px-16 xl:px-24 text-primary-foreground">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-black uppercase leading-none sm:text-4xl">
              {t('legal.nav.privacy')}
            </h2>
            <div className="mt-8 space-y-7">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">{t('legal.privacy.data.title')}</h3>
                <p className="mt-3 leading-relaxed">{t('legal.privacy.data.text')}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">{t('legal.privacy.use.title')}</h3>
                <p className="mt-3 leading-relaxed">{t('legal.privacy.use.text')}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary-foreground/70">{t('legal.privacy.rights.title')}</h3>
                <p className="mt-3 leading-relaxed">{t('legal.privacy.rights.text')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CGV */}
        <section id="cgv" className="scroll-mt-32 sm:scroll-mt-36 border-b-2 border-primary px-6 py-14 sm:px-10 lg:px-16 xl:px-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-black uppercase leading-none text-primary sm:text-4xl">
              {t('legal.nav.cgv')}
            </h2>
            <div className="mt-8 space-y-7">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{t('legal.cgv.object.title')}</h3>
                <p className="mt-3 leading-relaxed text-foreground">{t('legal.cgv.object.text')}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{t('legal.cgv.order.title')}</h3>
                <p className="mt-3 leading-relaxed text-foreground">{t('legal.cgv.order.text')}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{t('legal.cgv.withdrawal.title')}</h3>
                <p className="mt-3 leading-relaxed text-foreground">{t('legal.cgv.withdrawal.text')}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">{t('legal.cgv.ip.title')}</h3>
                <p className="mt-3 leading-relaxed text-foreground">{t('legal.cgv.ip.text')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Legal;
