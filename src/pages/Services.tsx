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
    regen: {
      title: 'La Boucle REGEN — revenir au réel, trouver un prochain pas juste',
      intro: 'Un cadre de questionnement que je développe pour ma pratique. Il invite à rencontrer une situation dans sa complexité, à clarifier son pouvoir d’agir et à choisir une suite soutenable. Il guide mon attention ; il ne prescrit pas votre chemin.',
      movements: [
        { label: 'R — Revenir au réel', question: 'Qu’est-ce qui se passe vraiment ?' },
        { label: 'E — Écouter et inclure le champ', question: 'Quoi — et qui — reste à entendre ?' },
        { label: 'G — Guider son pouvoir avec discernement', question: 'Qu’est-ce qui est à vous de décider, d’influencer ou de laisser ?' },
        { label: 'E — Explorer les tensions', question: 'Quelles vérités, valeurs ou contraintes demandent à être considérées ensemble ?' },
        { label: 'N — Nourrir le prochain pas', question: 'Quel pas concret est possible, avec quel soutien et quel temps de retour ?' },
      ],
      closing: 'Ces mouvements ne sont pas des étapes imposées. Le point de départ est ce que vous souhaitez travailler ; une nouvelle compréhension peut inviter à revenir en arrière, à agir ou à faire une pause.',
    },
    services: [
      { title: 'Facilitation', who: 'équipes de direction, comités, collectifs qui doivent décider ensemble.', desc: "Séminaires, ateliers de stratégie, moments de décision. Je conçois le déroulé, je tiens le cadre, et je rends visibles les voix qu'on n'entend pas d'habitude. Le groupe repart avec des décisions claires : qui contribue, qui décide, et comment.", format: "d'une demi-journée à trois jours, en salle ou en extérieur.", fees: 'sur devis, après un premier échange.' },
      { title: 'Conception de programmes', who: 'directions RH, responsables formation, organisations qui lancent un parcours.', desc: "Programmes de leadership, parcours de formation, séminaires en plusieurs temps. Je construis avec vous l'architecture, les séquences et les supports, en partant de comportements observables plutôt que d'intentions.", format: 'quelques jours de conception, puis animation ou transmission à vos équipes.', fees: 'sur devis.' },
      { title: 'Coaching', who: 'dirigeants et managers dans une transition de rôle, une prise de poste ou une décision difficile.', desc: 'Un espace pour clarifier ce qui compte, comprendre ce qui se joue et retrouver votre pouvoir d’agir. Nous partons de situations réelles, regardons les relations et les tensions qui les traversent, puis choisissons une suite adaptée : une décision, une expérimentation, une conversation ou un temps de recul.', format: 'un cycle de séances, à distance ou en marchant, rythme défini ensemble.', fees: 'sur devis.' },
      { title: 'Supervision', who: 'facilitateurs, coachs, formateurs et accompagnants.', desc: 'Un temps pour regarder ce qui se passe en vous pendant que vous accompagnez les autres : ce qui vous a touché, ce que vous avez évité, ce que vous referiez autrement.', format: "quatre séances d'une heure sur quatre mois, à distance. En groupe : Le Cercle, huit places, de décembre à février.", fees: '680 € HT les quatre séances. Le Cercle : inscriptions début novembre.' },
      { title: 'Médiation', who: 'équipes, binômes ou associés pris dans une tension qui dure.', desc: "Des entretiens individuels d'abord, puis un temps commun, pour que chacun puisse dire ce qu'il vit et entendre l'autre. Le cadre est confidentiel, et l'objectif est de pouvoir retravailler ensemble.", format: 'deux à quatre rencontres, en présentiel de préférence.', fees: 'sur devis.' },
    ] as Service[],
    closingTitle: 'Par où commencer',
    closingText: 'Le plus simple est d\'en parler trente minutes. Vous me dites ce qui se passe, je vous dis honnêtement si je suis la bonne personne.',
    button: 'Prendre 30 minutes',
    subject: 'Prendre 30 minutes',
    compassPre: "Vous préférez apprendre seul·e d'abord ? ",
    compassLink: 'La Boussole des valeurs, formation en ligne.',
    faqTitle: 'Questions fréquentes',
    faq: [
      { q: "Qu'est-ce que la supervision pour les coachs et les facilitateurs ?", a: "Un temps régulier pour regarder ce qui se passe en vous pendant que vous accompagnez les autres : ce qui vous a touché, ce que vous avez évité, ce que vous ramenez qui n'est pas à vous. Quatre séances d'une heure sur quatre mois, à distance, ou en groupe avec Le Cercle." },
      { q: 'Travaillez-vous à distance ?', a: 'Oui. Le coaching et la supervision se font le plus souvent à distance, en français ou en anglais. La facilitation et la médiation, de préférence en présentiel.' },
      { q: 'Combien coûte un accompagnement ?', a: "La supervision individuelle coûte 680 € les quatre séances. Pour le reste, je fais un devis après un premier échange de 30 minutes, gratuit." },
      { q: "Par où commencer si je ne sais pas ce dont j'ai besoin ?", a: "Prenez 30 minutes avec moi. Vous me dites ce qui se passe, je vous dis honnêtement si je suis la bonne personne, et sinon vers qui aller." },
    ],
  },
  en: {
    eyebrow: 'Services',
    title: 'Supporting people, teams and organisations',
    intro:
      "I work with leadership teams, managers and people whose job is to support others. Every engagement starts from your reality: what's at stake, what's stuck, and what's asking to change.",
    labels: { who: 'For whom', format: 'Format', fees: 'Fees' },
    regen: {
      title: 'The REGEN Loop — meet reality, find a wise next step',
      intro: 'A questioning framework I am developing for my practice. It invites a fuller understanding of a complex situation, clearer agency and a sustainable next step. It guides my attention; it does not prescribe your path.',
      movements: [
        { label: 'R — Root in reality', question: 'What is actually happening?' },
        { label: 'E — Embrace the whole field', question: 'What — and who — still needs to be heard?' },
        { label: 'G — Guide power wisely', question: 'What is yours to decide, influence or let go of?' },
        { label: 'E — Explore tensions', question: 'Which truths, values or constraints need to be considered together?' },
        { label: 'N — Nurture the next step', question: 'What concrete step is possible, with what support and when to review it?' },
      ],
      closing: 'These movements are not prescribed steps. The starting point is what you want to work on; new understanding may invite you to return, act or pause.',
    },
    services: [
      { title: 'Facilitation', who: 'leadership teams, committees and groups that need to decide together.', desc: 'Off-sites, strategy workshops, decision points. I design the flow, hold the frame and bring out the voices that usually go unheard. The group leaves with clear decisions: who contributes, who decides, and how.', format: 'from half a day to three days, indoors or outdoors.', fees: 'on quotation, after a first conversation.' },
      { title: 'Programme design', who: 'HR and learning leaders, and organisations launching a programme.', desc: 'Leadership programmes, learning journeys, multi-part seminars. I build the architecture, sessions and materials with you, starting from observable behaviour rather than good intentions.', format: 'a few days of design, then delivery or handover to your teams.', fees: 'on quotation.' },
      { title: 'Coaching', who: 'leaders and managers in a role transition, a new position or a difficult decision.', desc: 'Space to clarify what matters, understand what is happening and reconnect with your capacity to act. We start with real situations, explore the relationships and tensions involved, and identify an appropriate next step: a decision, an experiment, a conversation or time to reflect.', format: 'a series of sessions, online or walking, at a pace we agree together.', fees: 'on quotation.' },
      { title: 'Supervision', who: 'facilitators, coaches, trainers and practitioners.', desc: "Time to look at what happens in you while you support others: what touched you, what you avoided, what you'd do differently.", format: 'four one-hour sessions over four months, online. In a group: The Circle, eight places, December to February.', fees: '€680 excl. VAT for the four sessions. The Circle: registration opens in early November.' },
      { title: 'Mediation', who: 'teams, pairs or business partners caught in a lasting tension.', desc: "Individual conversations first, then a shared session, so that each person can say what they're living and hear the other. The frame is confidential, and the aim is to be able to work together again.", format: 'two to four meetings, preferably in person.', fees: 'on quotation.' },
    ] as Service[],
    closingTitle: 'Where to start',
    closingText: "The simplest way is a thirty-minute conversation. You tell me what's going on, and I'll tell you honestly whether I'm the right person.",
    button: '30 minutes to talk',
    subject: '30 minutes to talk',
    compassPre: 'Prefer to start on your own? ',
    compassLink: 'The Values Compass, online course.',
    faqTitle: 'Frequently asked questions',
    faq: [
      { q: 'What is supervision for coaches and facilitators?', a: "A regular time to look at what happens in you while you support others: what touched you, what you avoided, what you bring back that isn't yours. Four one-hour sessions over four months, online, or in a group with The Circle." },
      { q: 'Do you work online?', a: 'Yes. Coaching and supervision are most often online, in English or in French. Facilitation and mediation, preferably in person.' },
      { q: 'How much does an engagement cost?', a: 'Individual supervision costs €680 for the four sessions. For everything else, I send a quotation after a first free 30-minute conversation.' },
      { q: "Where do I start if I don't know what I need?", a: "Take 30 minutes with me. You tell me what's going on, I tell you honestly whether I'm the right person, and if not, where to go instead." },
    ],
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
            id={i === 3 ? 'supervision' : undefined}
            className={`border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12 ${i % 2 === 1 ? 'bg-secondary' : ''}`}
          >
            <div className="measure mx-auto">
              <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{s.title}</h2>
              <p className="mt-4"><span className="font-medium">{c.labels.who}</span>{language === 'fr' ? ' : ' : ': '}{s.who}</p>
              <p className="mt-4 text-muted-foreground">{s.desc}</p>
              {i === 2 && (
                <section id="regen-loop" aria-labelledby="regen-loop-title" className="mt-8 scroll-mt-28 border-t border-border pt-8">
                  <h3 id="regen-loop-title" className="text-xl font-semibold text-primary sm:text-2xl">{c.regen.title}</h3>
                  <p className="mt-4 text-muted-foreground">{c.regen.intro}</p>
                  <ol className="mt-6 list-none space-y-5" role="list">
                    {c.regen.movements.map((movement) => (
                      <li key={movement.label}>
                        <h4 className="text-base font-semibold">{movement.label}</h4>
                        <p className="mt-1 text-muted-foreground">{movement.question}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 text-muted-foreground">{c.regen.closing}</p>
                </section>
              )}
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
        <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="measure mx-auto">
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{c.faqTitle}</h2>
            {c.faq.map((f) => (
              <div key={f.q} className="mt-8">
                <h3 className="text-lg font-semibold">{f.q}</h3>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
        <EnquiryForm />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
