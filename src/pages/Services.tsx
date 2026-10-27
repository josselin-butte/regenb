import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import RegenLoop from '@/components/RegenLoop';
import FacilitationIllustration from '@/components/FacilitationIllustration';
import ProgrammeIllustration from '@/components/ProgrammeIllustration';
import MediationIllustration from '@/components/MediationIllustration';
import SupervisionIllustration from '@/components/SupervisionIllustration';
import Footer from '@/components/Footer';
import VoicesBand from '@/components/VoicesBand';
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
      title: 'La Boucle REGEN',
      intro: 'Cinq mouvements pour rencontrer la complexité et trouver un prochain pas juste.',
      center: 'Votre situation', centerNote: 'Le point de départ. Le fil auquel revenir.',
      status: 'Cadre en développement', tapHint: 'Touchez une lettre pour explorer un mouvement.', pause: 'Mettre en pause', play: 'Animer la boucle',
      movements: [
        { label: 'R — Revenir au réel', question: 'Qu’est-ce qui se passe vraiment ?', support: 'Partir des faits, des ressentis et du contexte, sans chercher trop vite à résoudre.' },
        { label: 'E — Écouter et inclure le champ', question: 'Quoi — et qui — reste à entendre ?', support: 'Élargir le regard aux besoins, aux relations et aux voix encore absentes.' },
        { label: 'G — Guider son pouvoir avec discernement', question: 'Qu’est-ce qui est à vous de décider, d’influencer ou de laisser ?', support: 'Clarifier sa responsabilité, ses limites et ses possibilités d’action.' },
        { label: 'E — Explorer les tensions fécondes', question: 'Quelles vérités, valeurs ou contraintes demandent à être considérées ensemble ?', support: 'Accueillir plusieurs réalités sans forcer une réconciliation ni oublier les limites.' },
        { label: 'N — Nourrir le prochain pas', question: 'Quel pas concret est possible, avec quel soutien et quel temps de retour ?', support: 'Choisir une suite adaptée : agir, expérimenter, converser ou prendre du recul.' },
      ],
      closing: 'Cinq mouvements. Aucun chemin imposé.',
      closingNote: 'Revenir, écouter, ajuster : le mouvement reste le vôtre.',
      context: 'Un cadre de questionnement en cours d’expérimentation dans ma pratique. Il guide mon attention ; il ne prescrit pas votre chemin.',
    },
    facilitation: {
      subtitle: 'Faire place aux différences. Avancer ensemble.',
      caption: 'Un cadre pour écouter les différences, clarifier les choix et organiser la suite.',
      dimensions: [
        { title: 'Poser le cadre', question: 'Sur quoi devons-nous avancer, avec qui, et qui décidera ?', explanation: 'Clarifier l’intention, les rôles et le mode de décision.' },
        { title: 'Ouvrir les perspectives', question: 'Quelles voix, informations et tensions doivent être entendues ?', explanation: 'Rendre visibles les contributions, les différences et les points de désaccord.' },
        { title: 'Choisir une voie', question: 'Quelle option retenir, selon le mode de décision convenu ?', explanation: 'Formuler un choix, un arbitrage ou une expérimentation.' },
        { title: 'Organiser la suite', question: 'Qui fait quoi, avec quels moyens et quel point de suivi ?', explanation: 'Relier la séance aux responsabilités et aux prochains pas.' },
      ],
    },
    programme: {
      subtitle: 'Relier les apprentissages au travail réel.',
      caption: 'Une intention claire, des expériences utiles et des retours du terrain pour ajuster le parcours.',
      strands: ['Apprentissages', 'Pratique sur le terrain'] as [string, string],
      dimensions: [
        { title: 'Comprendre', question: 'Que doivent pouvoir faire les participants, et comment le constater ?', explanation: 'Clarifier le besoin, les capacités visées et les signes de progression.' },
        { title: 'Concevoir', question: 'Quelles expériences et quels rythmes serviront ces capacités ?', explanation: 'Articuler les formats, les séquences et les liens avec le terrain.' },
        { title: 'Expérimenter', question: 'Que révèle un premier essai auprès des participants ?', explanation: 'Mettre une séquence à l’épreuve et ajuster la conception.' },
        { title: 'Ancrer', question: 'Comment les acquis trouveront-ils une place dans le travail quotidien ?', explanation: 'Prévoir les pratiques de transfert et les retours d’expérience.' },
      ],
    },
    mediation: {
      subtitle: 'Un cadre pour se parler autrement.',
      caption: 'Exprimer ce qui se vit, entendre ce qui compte et explorer les suites possibles — sans imposer l’accord.',
      dimensions: [
        { title: 'Poser un cadre', question: 'Les conditions d’un échange libre et approprié sont-elles réunies ?', explanation: 'Examiner le consentement, les règles d’échange et les limites du cadre.' },
        { title: 'Entendre les vécus', question: 'Qu’est-ce que chaque personne a besoin de pouvoir exprimer ?', explanation: 'Faire une place aux récits distincts, sans les confondre ni les hiérarchiser d’avance.' },
        { title: 'Clarifier les besoins', question: 'Qu’est-ce qui compte, et quelles limites doivent être reconnues ?', explanation: 'Distinguer les besoins, les attentes et les limites de chacun.' },
        { title: 'Explorer les suites', question: 'Quelles suites sont acceptables pour les personnes concernées ?', explanation: 'Examiner un accord éventuel, des limites, une autre orientation ou l’arrêt de la démarche.' },
      ],
    },
    supervision: {
      subtitle: 'Prendre du recul, sans perdre le lien.',
      caption: 'Un espace de réflexion avec un superviseur pour explorer votre posture, ce qui se joue dans vos relations professionnelles et les choix qui engagent votre responsabilité.',
      instruction: 'Choisissez une perspective pour explorer votre pratique.',
      center: 'Votre pratique',
      takeaway: 'La supervision peut faire émerger des repères pour votre pratique : une hypothèse à vérifier, une limite à poser, une question à approfondir ou un ajustement à expérimenter.',
      dimensions: [
        { title: 'Votre vécu', question: 'Qu’est-ce que cette situation vient toucher chez vous ?', explanation: 'Explorer les émotions, les résonances et les présupposés qui influencent votre manière d’accompagner.' },
        { title: 'La relation', question: 'Qu’est-ce qui se joue entre vous et les personnes accompagnées ?', explanation: 'Examiner les attentes, les limites, votre positionnement et les dynamiques relationnelles.' },
        { title: 'Le contexte et le cadre', question: 'Quels mandats, rapports de pouvoir ou enjeux éthiques influencent votre pratique ?', explanation: 'Élargir le regard aux responsabilités, aux pressions organisationnelles et au système dans lequel vous intervenez.' },
        { title: 'Vos ressources', question: 'De quoi avez-vous besoin pour exercer avec présence et discernement ?', explanation: 'Identifier les appuis, les limites et les apprentissages qui peuvent soutenir votre pratique dans la durée.' },
      ],
    },
    services: [
      { title: 'Facilitation', who: 'équipes de direction, comités, collectifs qui doivent décider ensemble.', desc: "Séminaires, ateliers de stratégie, moments de décision. Je conçois le déroulé, je tiens le cadre, et je rends visibles les voix qu'on n'entend pas d'habitude. Le groupe repart avec des décisions claires : qui contribue, qui décide, et comment.", format: "d'une demi-journée à trois jours, en salle ou en extérieur.", fees: 'sur devis, après un premier échange.' },
      { title: 'Conception de programmes', who: 'directions RH, responsables formation, organisations qui lancent un parcours.', desc: "Programmes de leadership, parcours de formation, séminaires en plusieurs temps. Je construis avec vous l'architecture, les séquences et les supports, en partant de comportements observables plutôt que d'intentions.", format: 'quelques jours de conception, puis animation ou transmission à vos équipes.', fees: 'sur devis.' },
      { title: 'Coaching', who: 'dirigeants et managers dans une transition de rôle, une prise de poste ou une décision difficile.', desc: 'Un espace pour clarifier ce qui compte, comprendre ce qui se joue et retrouver votre pouvoir d’agir. Nous partons de situations réelles, regardons les relations et les tensions qui les traversent, puis choisissons une suite adaptée : une décision, une expérimentation, une conversation ou un temps de recul.', format: 'un cycle de séances, à distance ou en marchant, rythme défini ensemble.', fees: 'sur devis.' },
      { title: 'Supervision', who: 'facilitateurs, coachs, formateurs et accompagnants.', desc: 'Un temps pour regarder ce qui se passe en vous pendant que vous accompagnez les autres : ce qui vous a touché, ce que vous avez évité, ce que vous referiez autrement.', format: "quatre séances d'une heure sur quatre mois, à distance. Possible aussi en marchant, en Comminges. En groupe : Le Cercle, huit places, de décembre à février.", fees: '680 € HT les quatre séances. Le Cercle : inscriptions début novembre.' },
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
      { q: 'Travaillez-vous à distance ?', a: 'Oui. Le coaching et la supervision se font le plus souvent à distance, en français ou en anglais, ou en marchant dans les Pyrénées, depuis Arbas. La facilitation et la médiation, de préférence en présentiel.' },
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
      title: 'The REGEN Loop',
      intro: 'Five movements to meet complexity and find a wise next step.',
      center: 'Your situation', centerNote: 'The starting point. The thread to return to.',
      status: 'A developing framework', tapHint: 'Tap a letter to explore a movement.', pause: 'Pause movement', play: 'Animate the loop',
      movements: [
        { label: 'R — Root in reality', question: 'What is actually happening?', support: 'Start with facts, feelings and context, without rushing to solve.' },
        { label: 'E — Embrace the whole field', question: 'What — and who — still needs to be heard?', support: 'Widen attention to needs, relationships and voices that are not yet present.' },
        { label: 'G — Guide power wisely', question: 'What is yours to decide, influence or let go of?', support: 'Clarify responsibility, boundaries and possibilities for action.' },
        { label: 'E — Explore polarities', question: 'Which truths, values or constraints need to be considered together?', support: 'Make room for different realities without forcing reconciliation or losing sight of boundaries.' },
        { label: 'N — Nurture the next step', question: 'What concrete step is possible, with what support and when to review it?', support: 'Choose an appropriate response: action, an experiment, a conversation or time to reflect.' },
      ],
      closing: 'Five movements. No prescribed path.',
      closingNote: 'Return, listen, adjust: the movement remains yours.',
      context: 'A questioning framework being explored in my practice. It guides my attention; it does not prescribe your path.',
    },
    facilitation: {
      subtitle: 'Make room for differences. Move forward together.',
      caption: 'A framework for hearing different perspectives, clarifying choices and organising what follows.',
      dimensions: [
        { title: 'Set the frame', question: 'What needs to move forward, who needs to be involved, and who will decide?', explanation: 'Clarify the purpose, roles and decision-making process.' },
        { title: 'Open up perspectives', question: 'Which voices, information and tensions need to be heard?', explanation: 'Make contributions, differences and disagreements visible.' },
        { title: 'Choose a way forward', question: 'Which option should be taken, using the agreed decision-making process?', explanation: 'Articulate a choice, a trade-off or an experiment.' },
        { title: 'Organise what follows', question: 'Who does what, with which resources, and when will progress be reviewed?', explanation: 'Connect the session to responsibilities and next steps.' },
      ],
    },
    programme: {
      subtitle: 'Connect learning with real-world practice.',
      caption: 'A clear purpose, useful experiences and feedback from practice to refine the programme.',
      strands: ['Learning', 'Real-world practice'] as [string, string],
      dimensions: [
        { title: 'Understand', question: 'What should participants be able to do, and how will this be recognised?', explanation: 'Clarify the need, intended capabilities and signs of progress.' },
        { title: 'Design', question: 'Which experiences and rhythms will support these capabilities?', explanation: 'Connect formats, sessions and real-world practice.' },
        { title: 'Experiment', question: 'What does an initial trial with participants reveal?', explanation: 'Test a session and refine the design.' },
        { title: 'Embed', question: 'How will the learning find its place in everyday work?', explanation: 'Plan ways to apply learning and reflect on experience.' },
      ],
    },
    mediation: {
      subtitle: 'A framework for a different conversation.',
      caption: 'Express what is being experienced, hear what matters and explore possible next steps — without imposing agreement.',
      dimensions: [
        { title: 'Establish a framework', question: 'Are the conditions in place for a freely chosen and appropriate conversation?', explanation: 'Consider consent, ground rules and the limits of the process.' },
        { title: 'Hear each experience', question: 'What does each person need to be able to express?', explanation: 'Make room for distinct accounts without merging them or prejudging them.' },
        { title: 'Clarify needs', question: 'What matters, and which boundaries need to be recognised?', explanation: 'Distinguish each person’s needs, expectations and boundaries.' },
        { title: 'Explore what follows', question: 'Which next steps are acceptable to the people involved?', explanation: 'Consider a possible agreement, boundaries, a different route or ending the process.' },
      ],
    },
    supervision: {
      subtitle: 'Step back, without losing connection.',
      caption: 'A reflective space with a supervisor to explore how you show up in your work, what is happening in your professional relationships and the choices that engage your responsibility.',
      instruction: 'Choose a perspective to explore your practice.',
      center: 'Your practice',
      takeaway: 'Supervision can bring useful reference points for your practice: an assumption to explore, a boundary to set, a question to deepen or an adjustment to try.',
      dimensions: [
        { title: 'Your experience', question: 'What does this situation stir in you?', explanation: 'Explore the feelings, resonances and assumptions that influence how you work with others.' },
        { title: 'The relationship', question: 'What is happening between you and the people you work with?', explanation: 'Examine expectations, boundaries, your positioning and relational dynamics.' },
        { title: 'Context and boundaries', question: 'Which mandates, power dynamics or ethical issues influence your practice?', explanation: 'Consider responsibilities, organisational pressures and the wider system in which you work.' },
        { title: 'Your resources', question: 'What do you need to practise with presence and discernment?', explanation: 'Identify the support, boundaries and learning that can sustain your practice over time.' },
      ],
    },
    services: [
      { title: 'Facilitation', who: 'leadership teams, committees and groups that need to decide together.', desc: 'Off-sites, strategy workshops, decision points. I design the flow, hold the frame and bring out the voices that usually go unheard. The group leaves with clear decisions: who contributes, who decides, and how.', format: 'from half a day to three days, indoors or outdoors.', fees: 'on quotation, after a first conversation.' },
      { title: 'Programme design', who: 'HR and learning leaders, and organisations launching a programme.', desc: 'Leadership programmes, learning journeys, multi-part seminars. I build the architecture, sessions and materials with you, starting from observable behaviour rather than good intentions.', format: 'a few days of design, then delivery or handover to your teams.', fees: 'on quotation.' },
      { title: 'Coaching', who: 'leaders and managers in a role transition, a new position or a difficult decision.', desc: 'Space to clarify what matters, understand what is happening and reconnect with your capacity to act. We start with real situations, explore the relationships and tensions involved, and identify an appropriate next step: a decision, an experiment, a conversation or time to reflect.', format: 'a series of sessions, online or walking, at a pace we agree together.', fees: 'on quotation.' },
      { title: 'Supervision', who: 'facilitators, coaches, trainers and practitioners.', desc: "Time to look at what happens in you while you support others: what touched you, what you avoided, what you'd do differently.", format: 'four one-hour sessions over four months, online. Also possible walking, in the Comminges. In a group: The Circle, eight places, December to February.', fees: '€680 excl. VAT for the four sessions. The Circle: registration opens in early November.' },
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
      { q: 'Do you work online?', a: 'Yes. Coaching and supervision are most often online, in English or in French, or walking in the Pyrenees from Arbas. Facilitation and mediation, preferably in person.' },
      { q: 'How much does an engagement cost?', a: 'Individual supervision costs €680 for the four sessions. For everything else, I send a quotation after a first free 30-minute conversation.' },
      { q: "Where do I start if I don't know what I need?", a: "Take 30 minutes with me. You tell me what's going on, I tell you honestly whether I'm the right person, and if not, where to go instead." },
    ],
  },
};

const Services = () => {
  const { language, lp } = useLanguage();
  const { hash, key } = useLocation();
  const c = content[language];
  const mailto = `mailto:josselin@regenb.com?subject=${encodeURIComponent(c.subject)}`;

  useEffect(() => {
    if (hash !== '#regen-loop') return;
    const frame = requestAnimationFrame(() => {
      document.getElementById('regen-loop')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash, key, language]);

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
              {i === 0 && <FacilitationIllustration copy={c.facilitation} />}
              {i === 1 && <ProgrammeIllustration copy={c.programme} />}
              {i === 2 && <RegenLoop copy={c.regen} />}
              {i === 3 && <SupervisionIllustration copy={c.supervision} />}
              {i === 4 && <MediationIllustration copy={c.mediation} />}
              <dl className="mt-6 space-y-2 border-l-2 border-accent pl-4 text-[15px]">
                <div><dt className="inline font-medium">{c.labels.format}{language === 'fr' ? ' : ' : ': '}</dt><dd className="inline">{s.format}</dd></div>
                <div><dt className="inline font-medium">{c.labels.fees}{language === 'fr' ? ' : ' : ': '}</dt><dd className="inline">{s.fees}</dd></div>
              </dl>
              {(i === 2 || i === 3) && (
                <p className="mt-4 text-[15px]">
                  <Link to={lp(i === 2 ? '/coaching' : '/supervision')} className="text-primary underline decoration-accent underline-offset-4">
                    {i === 2
                      ? (language === 'fr' ? 'Le coaching en détail : en marchant dans les Pyrénées ou à distance' : 'Coaching in detail: walking in the Pyrenees or online')
                      : (language === 'fr' ? 'La supervision en détail : à distance, en marchant ou en groupe' : 'Supervision in detail: online, walking or in a group')}
                  </Link>
                </p>
              )}
            </div>
          </section>
        ))}

        <section className="bg-primary px-5 py-16 text-primary-foreground sm:px-8 sm:py-20 lg:px-12">
          <div className="measure mx-auto text-center">
            <h2 className="text-2xl font-semibold text-primary-foreground sm:text-3xl">{c.closingTitle}</h2>
            <p className="mt-4 opacity-90">{c.closingText}</p>
            <Button asChild size="lg" variant="secondary" className="mt-8 h-auto min-h-11 max-w-full whitespace-normal py-3 text-center">
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
      <VoicesBand compact initialVoice="Mary Parker Follett" />
      <Footer />
    </div>
  );
};

export default Services;
