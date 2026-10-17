import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import { Button } from '@/components/ui/button';

type Service = { title: string; who: string; desc: string; format: string; fees: string };

export const content = {
  fr: {
    eyebrow: 'Accompagnement',
    title: 'Accompagner des personnes, des équipes et des organisations',
    intro:
      "Je travaille avec des équipes de direction, des managers et des professionnels de l'accompagnement. Chaque collaboration part de votre réalité : ce qui se joue, ce qui bloque, ce qui demande à évoluer.",
    labels: { who: 'Pour qui', format: 'Format', fees: 'Tarif' },
    services: [
      { title: 'Facilitation', who: 'équipes de direction, comités, collectifs qui doivent décider ensemble.', desc: "Séminaires, ateliers de stratégie, moments de décision. Je conçois le déroulé, je tiens le cadre, et je rends visibles les voix qu'on n'entend pas d'habitude. Le groupe repart avec des décisions claires : qui contribue, qui décide, et comment.", format: "d'une demi-journée à trois jours, en salle ou en extérieur.", fees: 'sur devis, après un premier échange.' },
      { title: 'Conception de programmes', who: 'directions RH, responsables formation, organisations qui lancent un parcours.', desc: "Programmes de leadership, parcours de formation, séminaires en plusieurs temps. Je construis avec vous l'architecture, les séquences et les supports, en partant de comportements observables plutôt que d'intentions.", format: 'quelques jours de conception, puis animation ou transmission à vos équipes.', fees: 'sur devis.' },
      { title: 'Coaching', who: 'dirigeants et managers dans une transition de rôle, une prise de poste ou une décision difficile.', desc: 'Un espace pour clarifier ce qui compte, ce qui vous retient et ce que vous voulez tenter. Les séances partent de situations réelles et se terminent par un engagement concret.', format: 'un cycle de séances, à distance ou en marchant, rythme défini ensemble.', fees: 'sur devis.' },
      { title: 'Supervision', who: 'facilitateurs, coachs, formateurs et accompagnants.', desc: 'Un temps pour regarder ce qui se passe en vous pendant que vous accompagnez les autres : ce qui vous a touché, ce que vous avez évité, ce que vous referiez autrement.', format: "quatre séances d'une heure sur quatre mois, à distance. En groupe : Le Cercle, huit places, de décembre à février.", fees: '480 € les quatre séances. Le Cercle : inscriptions début novembre.' },
      { title: 'Médiation', who: 'équipes, binômes ou associés pris dans une tension qui dure.', desc: "Des entretiens individuels d'abord, puis un temps commun, pour que chacun puisse dire ce qu'il vit et entendre l'autre. Le cadre est confidentiel, et l'objectif est de pouvoir retravailler ensemble.", format: 'deux à quatre rencontres, en présentiel de préférence.', fees: 'sur devis.' },
    ] as Service[],
    closingTitle: 'Par où commencer',
    closingText: 'Le plus simple est d\'en parler trente minutes. Vous me dites ce qui se passe, je vous dis honnêtement si je suis la bonne personne.',
    button: 'Prendre 30 minutes',
    subject: 'Prendre 30 minutes',
    compassPre: "Vous préférez apprendre seul·e d'abord ? ",
    compassLink: 'La Boussole des valeurs, formation en ligne.',
  },
  en: {
    eyebrow: 'Services',
    title: 'Supporting people, teams and organisations',
    intro:
      "I work with leadership teams, managers and people whose job is to support others. Every engagement starts from your reality: what's at stake, what's stuck, and what's asking to change.",
    labels: { who: 'For whom', format: 'Format', fees: 'Fees' },
    services: [
      { title: 'Facilitation', who: 'leadership teams, committees and groups that need to decide together.', desc: 'Off-sites, strategy workshops, decision points. I design the flow, hold the frame and bring out the voices that usually go unheard. The group leaves with clear decisions: who contributes, who decides, and how.', format: 'from half a day to three days, indoors or outdoors.', fees: 'on quotation, after a first conversation.' },
      { title: 'Programme design', who: 'HR and learning leaders, and organisations launching a programme.', desc: 'Leadership programmes, learning journeys, multi-part seminars. I build the architecture, sessions and materials with you, starting from observable behaviour rather than good intentions.', format: 'a few days of design, then delivery or handover to your teams.', fees: 'on quotation.' },
      { title: 'Coaching', who: 'leaders and managers in a role transition, a new position or a difficult decision.', desc: "A space to get clear on what matters, what's holding you back and what you want to try. Sessions start from real situations and end with a concrete commitment.", format: 'a series of sessions, online or walking, at a pace we agree together.', fees: 'on quotation.' },
      { title: 'Supervision', who: 'facilitators, coaches, trainers and practitioners.', desc: "Time to look at what happens in you while you support others: what touched you, what you avoided, what you'd do differently.", format: 'four one-hour sessions over four months, online. In a group: The Circle, eight places, December to February.', fees: '€480 for the four sessions. The Circle: registration opens in early November.' },
      { title: 'Mediation', who: 'teams, pairs or business partners caught in a lasting tension.', desc: "Individual conversations first, then a shared session, so that each person can say what they're living and hear the other. The frame is confidential, and the aim is to be able to work together again.", format: 'two to four meetings, preferably in person.', fees: 'on quotation.' },
    ] as Service[],
    closingTitle: 'Where to start',
    closingText: "The simplest way is a thirty-minute conversation. You tell me what's going on, and I'll tell you honestly whether I'm the right person.",
    button: '30 minutes to talk',
    subject: '30 minutes to talk',
    compassPre: 'Prefer to start on your own? ',
    compassLink: 'The Values Compass, online course.',
  },
};

const Services = () => {
  const { language, lp } = useLanguage();
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

        {c.services.map((s, i) => (
          <section
            key={s.title}
            className={`border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12 ${i % 2 === 1 ? 'bg-secondary' : ''}`}
          >
            <div className="measure mx-auto">
              <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{s.title}</h2>
              <p className="mt-4"><span className="font-medium">{c.labels.who}</span>{language === 'fr' ? ' : ' : ': '}{s.who}</p>
              <p className="mt-4 text-muted-foreground">{s.desc}</p>
              <dl className="mt-6 space-y-2 border-l-2 border-accent pl-4 text-[15px]">
                <div><dt className="inline font-medium">{c.labels.format}{language === 'fr' ? ' : ' : ': '}</dt><dd className="inline">{s.format}</dd></div>
                <div><dt className="inline font-medium">{c.labels.fees}{language === 'fr' ? ' : ' : ': '}</dt><dd className="inline">{s.fees}</dd></div>
              </dl>
            </div>
          </section>
        ))}

        <section className="bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-20 lg:px-12">
          <div className="measure mx-auto text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl">{c.closingTitle}</h2>
            <p className="mt-4 opacity-90">{c.closingText}</p>
            <Button asChild size="lg" variant="secondary" className="mt-8">
              <a href={mailto}>{c.button}</a>
            </Button>
            <p className="mt-6 text-sm opacity-90">
              {c.compassPre}
              <Link to={lp('/boussole')} className="underline decoration-accent underline-offset-4">{c.compassLink}</Link>
            </p>
          </div>
        </section>
        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
