import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import { Button } from '@/components/ui/button';

/** Le Cercle: online group supervision, winter 2026-2027. Facts supplied by Josselin on 2026-11-11. */
export const cercleContent = {
  fr: {
    eyebrow: 'Supervision collective · en ligne',
    badge: 'Inscriptions ouvertes',
    h1: 'Le Cercle',
    lead: 'Huit personnes qui accompagnent les autres. Trois rencontres de deux heures, en ligne, cet hiver. Pour prendre soin de soi et de sa pratique.',
    factsLabel: 'L’essentiel',
    facts: ['Jeudi 17 décembre 2026', 'Jeudi 21 janvier 2027', 'Jeudi 11 mars 2027', 'De 18 h à 20 h, heure de Paris', 'En ligne, en visio', '8 personnes au plus', '350 € HT les trois rencontres', 'En français'],
    button: 'Réserver ma place',
    subject: 'Le Cercle – réserver ma place',
    sections: [
      { h2: 'Pour qui', text: 'Facilitateurs, coachs, formateurs, accompagnants, et managers qui accompagnent une équipe. Vous passez vos journées à écouter les autres. Il reste rarement un espace pour regarder ce que vous portez, vous.' },
      { h2: 'Ce qu’on y fait', text: 'Chacun peut apporter une situation de sa pratique : un moment qui vous a touché, une question restée ouverte, un choix à faire. On la regarde ensemble, avec attention et sans jugement. Vous repartez avec un repère concret pour la suite.' },
      { h2: 'Pourquoi la supervision', text: 'La supervision a trois fonctions, décrites par Brigid Proctor en 1986 : apprendre, garder la qualité de son travail, et se restaurer. La troisième est souvent celle qu’on oublie. Le Cercle lui fait une vraie place.' },
      { h2: 'Pourquoi en groupe', text: 'Ce que vit l’autre éclaire souvent ce que je vis. À huit, chacun a le temps de parler et d’être écouté.' },
    ],
    registerTitle: 'S’inscrire',
    registerText: 'Les places sont attribuées dans l’ordre des demandes. Cliquez sur « Réserver ma place » et laissez votre nom et votre e-mail. Je vous confirme votre place et les modalités de paiement par e-mail.',
    faqTitle: 'Questions fréquentes',
    faq: [
      { q: 'Faut-il déjà connaître la supervision ?', a: 'Non. Il suffit d’accompagner des personnes ou des groupes dans votre travail.' },
      { q: 'Faut-il venir à Arbas ?', a: 'Non. Les trois rencontres ont lieu en ligne.' },
      { q: 'Et la supervision individuelle ?', a: 'Elle reste possible : quatre séances d’une heure, 680 € HT.', link: { label: 'La supervision individuelle', to: '/supervision' } },
    ],
    closing: { title: 'Et dehors ?', text: 'Les Étapes, des rencontres de terrain en 2027.', to: '/etapes' },
    formTitle: 'Réserver ma place',
  },
  en: {
    eyebrow: 'Group supervision · online',
    badge: 'Registration open',
    h1: 'Le Cercle (The Circle)',
    lead: 'Eight people who support others. Three two-hour sessions, online, this winter. To take care of yourself and your practice.',
    factsLabel: 'Key facts',
    facts: ['Thursday 17 December 2026', 'Thursday 21 January 2027', 'Thursday 11 March 2027', '6–8 pm Paris time', 'Online, by video call', '8 people at most', '€350 excl. VAT for all three sessions', 'In French'],
    button: 'Book my place',
    subject: 'Le Cercle – book my place',
    sections: [
      { h2: 'Who it’s for', text: 'Facilitators, coaches, trainers, practitioners, and managers who support a team. You spend your days listening to others. There’s rarely space to look at what you carry yourself.' },
      { h2: 'What we do', text: 'Everyone can bring a situation from their practice: a moment that touched you, a question still open, a choice to make. We look at it together, with care and without judgement. You leave with one concrete reference point for what comes next.' },
      { h2: 'Why supervision', text: 'Supervision has three functions, described by Brigid Proctor in 1986: learning, keeping the quality of your work, and restoring yourself. The third is the one we often forget. Le Cercle gives it real room.' },
      { h2: 'Why a group', text: 'What someone else is living often sheds light on what I’m living. With eight people, everyone has time to speak and be heard.' },
    ],
    registerTitle: 'Registration',
    registerText: 'Places are given in the order requests arrive. Click “Book my place” and leave your name and email. I’ll confirm your place and how to pay by email.',
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'Do I need to know supervision already?', a: 'No. You only need to support people or groups in your work.' },
      { q: 'Do I need to come to Arbas?', a: 'No. All three sessions are online.' },
      { q: 'What about individual supervision?', a: 'Still available: four one-hour sessions, €680 excl. VAT.', link: { label: 'Individual supervision', to: '/en/supervision' } },
    ],
    closing: { title: 'And outdoors?', text: 'Les Étapes, field journeys in 2027.', to: '/en/journeys' },
    formTitle: 'Book my place',
  },
};

const FORM_ID = 'reserver';

const Cercle = () => {
  const { language } = useLanguage();
  const c = cercleContent[language];
  const book = (
    <Button asChild size="lg" className="h-auto min-h-11 max-w-full whitespace-normal py-3">
      <a href={`#${FORM_ID}`}>{c.button}</a>
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
          <div className="measure mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">{c.eyebrow}</p>
            <p className="mt-4 inline-block border border-primary px-3 py-1 text-sm font-medium text-primary">{c.badge}</p>
            <h1 className="mt-4 text-[2.1rem] font-semibold leading-[1.15] sm:text-5xl">{c.h1}</h1>
            <p className="mt-5 text-muted-foreground">{c.lead}</p>
            <div className="mt-8 border-l-2 border-accent bg-secondary p-5 sm:p-6" aria-label={c.factsLabel} role="region">
              <ul className="grid gap-x-6 gap-y-1.5 text-[15px] sm:grid-cols-2">
                {c.facts.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <div className="mt-5">{book}</div>
            </div>
          </div>
        </section>

        {c.sections.map((s, i) => (
          <section key={s.h2} className={`border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12 ${i % 2 === 1 ? 'bg-secondary' : ''}`}>
            <div className="measure mx-auto">
              <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{s.h2}</h2>
              <p className="mt-4 text-muted-foreground">{s.text}</p>
            </div>
          </section>
        ))}

        <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="measure mx-auto">
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{c.registerTitle}</h2>
            <p className="mt-4 text-muted-foreground">{c.registerText}</p>
            <div className="mt-6">{book}</div>
          </div>
        </section>

        <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="measure mx-auto">
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{c.faqTitle}</h2>
            {c.faq.map((f) => (
              <div key={f.q} className="mt-8">
                <h3 className="text-lg font-semibold">{f.q}</h3>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
                {'link' in f && f.link && (
                  <p className="mt-2"><Link to={f.link.to} className="text-primary underline decoration-accent underline-offset-4">{f.link.label}</Link></p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary px-5 py-12 text-primary-foreground sm:px-8 sm:py-16 lg:px-12">
          <div className="measure mx-auto">
            <Link to={c.closing.to} className="block underline-offset-4 hover:underline">
              <span className="text-xl font-semibold">{c.closing.title}</span>{' '}
              <span className="opacity-90">{c.closing.text}</span>
            </Link>
          </div>
        </section>

        <div id={FORM_ID} className="scroll-mt-24">
          <EnquiryForm defaultTopic="supervision" title={c.formTitle} defaultMessage={c.subject} optionalMessage />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cercle;
