import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnquiryForm from '@/components/EnquiryForm';
import { Button } from '@/components/ui/button';

/**
 * Local service pages (coaching, supervision, Pyrenees hub), FR at the root and EN under /en.
 * Only facts already stated elsewhere on the site, plus the walking supervision format
 * confirmed by Josselin. Do not add testimonials, venues or prices that are not real.
 */
export type LocalKind = 'coaching' | 'supervision' | 'pyrenees';

type SubBlock = { h3: string; text: string };
type PageLink = { label: string; to: string };
type Block = { id?: string; h2: string; paragraphs?: string[]; subs?: SubBlock[]; links?: PageLink[] };
type Faq = { q: string; a: string };
type PageCopy = {
  eyebrow: string;
  h1: string;
  intro: string;
  blocks: Block[];
  closingTitle: string;
  closingText: string;
  button: string;
  subject: string;
  faqTitle: string;
  faq: Faq[];
  topic?: 'coaching' | 'supervision' | 'etapes';
};

export const ADDRESS = { street: '8 route de Barat', postalCode: '31160', locality: 'Arbas', region: 'Haute-Garonne' };

export const localContent: Record<LocalKind, Record<'fr' | 'en', PageCopy>> = {
  coaching: {
    fr: {
      eyebrow: 'Coaching · Pyrénées, Toulouse, à distance',
      h1: 'Coaching de dirigeants dans les Pyrénées, en marchant ou à distance',
      intro:
        'Je suis coach de dirigeants et je vis à Arbas, en Comminges, au pied du Cagire. J’accompagne dirigeants et managers dans une transition de rôle, une prise de poste ou une décision difficile. Nous pouvons travailler en marchant sur les sentiers des Pyrénées, à Toulouse, ou à distance.',
      blocks: [
        {
          h2: 'Pour qui',
          paragraphs: [
            'Des dirigeants et des managers qui changent de rôle, prennent un poste ou portent une décision difficile. Des personnes qui ont déjà beaucoup réfléchi seules et qui ont besoin d’un espace pour clarifier ce qui compte, comprendre ce qui se joue et retrouver leur pouvoir d’agir.',
          ],
        },
        {
          h2: 'Comment se déroule un cycle de coaching',
          paragraphs: [
            'Tout commence par un échange de 30 minutes, gratuit. Vous me dites ce qui se passe, je vous dis honnêtement si je suis la bonne personne. Ensuite, nous convenons d’un cycle de séances et de son rythme.',
            'Chaque séance part d’une situation réelle. Nous regardons les relations et les tensions qui la traversent, puis nous choisissons une suite adaptée : une décision, une expérimentation, une conversation ou un temps de recul.',
          ],
          subs: [
            {
              h3: 'En marchant, en Comminges',
              text: 'Nous partons d’Arbas ou d’un départ de sentier choisi ensemble, dans la vallée d’Arbas ou autour du Cagire. Le rythme de la marche laisse de la place à ce qui ne se dit pas facilement autour d’une table. Les parcours restent simples ; nous les adaptons à la météo et à votre forme.',
            },
            {
              h3: 'À distance, partout en France',
              text: 'En visio, en français ou en anglais. Vous pouvez alterner : la plupart des séances à distance, et une séance en marchant de temps en temps.',
            },
          ],
          links: [{ label: 'Découvrir la Boucle REGEN, le cadre de questionnement que j’utilise', to: '/accompagnement#regen-loop' }],
        },
        {
          h2: 'Où je vous accompagne : Comminges, Ariège, Toulouse',
          paragraphs: [
            'Je reçois à Arbas, sur rendez-vous, et je me déplace dans les Pyrénées centrales : Saint-Gaudens et le Comminges, le Couserans et l’Ariège, le Luchonnais, les Hautes-Pyrénées. Toulouse est à environ 1 h 15 de route : nous pouvons nous y retrouver, ou vous pouvez venir marcher une demi-journée en montagne.',
          ],
          links: [{ label: 'Voir où et comment je travaille dans les Pyrénées', to: '/pyrenees' }],
        },
        {
          h2: 'Tarif et premier échange',
          paragraphs: ['Le coaching est sur devis, après un premier échange de 30 minutes, gratuit.'],
        },
      ],
      closingTitle: 'Par où commencer',
      closingText: 'Le plus simple est d’en parler trente minutes, à distance ou en marchant.',
      button: 'Prendre 30 minutes',
      subject: 'Coaching – prendre 30 minutes',
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Je suis à Toulouse : faut-il venir à Arbas ?', a: 'Non. Nous pouvons travailler à distance ou nous retrouver à Toulouse. Vous pouvez aussi alterner avec une séance en marchant : Arbas est à environ 1 h 15 de Toulouse.' },
        { q: 'Faut-il être bon marcheur ?', a: 'Non. Nous choisissons un parcours à votre mesure. Le but est de parler et de prendre du recul, pas de faire une performance.' },
        { q: 'Que se passe-t-il s’il pleut ?', a: 'Nous adaptons : un parcours plus court, un abri, une séance en intérieur à Arbas ou à distance.' },
        { q: 'Le coaching est-il possible en anglais ?', a: 'Oui, en français ou en anglais, en marchant comme à distance.' },
      ],
      topic: 'coaching',
    },
    en: {
      eyebrow: 'Coaching · Pyrenees, Toulouse, online',
      h1: 'Leadership coaching in the French Pyrenees, walking or online',
      intro:
        'I am a leadership coach living in Arbas, in the Comminges area, at the foot of Mont Cagire. I work with leaders and managers through a role transition, a new position or a difficult decision. We can work while walking on Pyrenean trails, in Toulouse, or online.',
      blocks: [
        {
          h2: 'Who it is for',
          paragraphs: [
            'Leaders and managers who are changing role, starting a new position or carrying a difficult decision. People who have already thought a lot on their own and need space to clarify what matters, understand what is happening and reconnect with their capacity to act.',
          ],
        },
        {
          h2: 'How a coaching cycle works',
          paragraphs: [
            'We start with a free 30-minute conversation. You tell me what is going on, and I tell you honestly whether I am the right person. Then we agree on a series of sessions and their pace.',
            'Each session starts from a real situation. We look at the relationships and tensions involved, then choose an appropriate next step: a decision, an experiment, a conversation or time to reflect.',
          ],
          subs: [
            { h3: 'Walking, in the Comminges', text: 'We set off from Arbas or from a trailhead we choose together, in the Arbas valley or around Mont Cagire. The pace of walking makes room for what is hard to say across a table. Routes stay simple and adapt to the weather and to you.' },
            { h3: 'Online, wherever you are', text: 'By video, in English or French. You can combine both: most sessions online, with a walking session from time to time.' },
          ],
          links: [{ label: 'Discover the REGEN Loop, the questioning framework I use', to: '/en/services#regen-loop' }],
        },
        {
          h2: 'Where we can work: Comminges, Ariège, Toulouse',
          paragraphs: [
            'I welcome clients in Arbas by appointment and travel across the central Pyrenees: Saint-Gaudens and the Comminges, the Couserans and Ariège, the Luchon area and the Hautes-Pyrénées. Toulouse is about 1 h 15 by road: we can meet there, or you can come for a half-day walk in the mountains.',
          ],
          links: [{ label: 'See where and how I work in the Pyrenees', to: '/en/pyrenees' }],
        },
        { h2: 'Fees and a first conversation', paragraphs: ['Coaching is on quotation, after a free 30-minute first conversation.'] },
      ],
      closingTitle: 'Where to start',
      closingText: 'The simplest way is a thirty-minute conversation, online or walking.',
      button: '30 minutes to talk',
      subject: 'Coaching – 30 minutes to talk',
      faqTitle: 'Frequently asked questions',
      faq: [
        { q: 'I live in Toulouse. Do I have to come to Arbas?', a: 'No. We can work online or meet in Toulouse. You can also add a walking session from time to time: Arbas is about 1 h 15 from Toulouse.' },
        { q: 'Do I need to be a strong walker?', a: 'No. We choose a route that suits you. The point is to talk and step back, not to perform.' },
        { q: 'What if it rains?', a: 'We adapt: a shorter route, a shelter, an indoor session in Arbas or an online session.' },
        { q: 'Is coaching available in English?', a: 'Yes, in English or French, walking or online.' },
      ],
      topic: 'coaching',
    },
  },
  supervision: {
    fr: {
      eyebrow: 'Supervision · Pyrénées et à distance',
      h1: 'Supervision des coachs, facilitateurs et accompagnants, depuis les Pyrénées',
      intro:
        'Je suis superviseur et facilitateur, installé à Arbas, en Comminges. La supervision est un temps pour regarder ce qui se passe en vous pendant que vous accompagnez les autres : ce qui vous a touché, ce que vous avez évité, ce que vous referiez autrement. Nous travaillons à distance ou en marchant dans les Pyrénées.',
      blocks: [
        {
          h2: 'À quoi sert la supervision',
          paragraphs: [
            'Un espace de réflexion pour explorer votre posture, ce qui se joue dans vos relations professionnelles et les choix qui engagent votre responsabilité.',
            'La supervision peut faire émerger des repères pour votre pratique : une hypothèse à vérifier, une limite à poser, une question à approfondir ou un ajustement à expérimenter.',
          ],
        },
        {
          h2: 'Supervision individuelle : quatre séances',
          paragraphs: ['Quatre séances d’une heure sur quatre mois, à distance. 680 € HT les quatre séances.'],
        },
        {
          h2: 'Supervision en marchant, en Comminges',
          paragraphs: [
            'Vous pouvez faire une ou plusieurs séances en marchant, depuis Arbas, seul·e ou en petit groupe de pairs. Marcher côte à côte change souvent la manière de parler de sa pratique : moins de face-à-face, plus d’espace pour ce qui émerge. Dates et tarif convenus lors du premier échange.',
          ],
        },
        {
          h2: 'Supervision collective : Le Cercle',
          paragraphs: ['Un groupe de huit personnes au plus, de décembre à février. Inscriptions début novembre.'],
        },
        {
          h2: 'Pour qui',
          paragraphs: [
            'Facilitateurs, coachs, formateurs et accompagnants, du Comminges, de Toulouse, de toute l’Occitanie ou d’ailleurs. En français ou en anglais.',
          ],
          links: [{ label: 'Voir où et comment je travaille dans les Pyrénées', to: '/pyrenees' }],
        },
      ],
      closingTitle: 'Par où commencer',
      closingText: 'Prenons trente minutes pour voir quel format vous convient : à distance, en marchant ou en groupe.',
      button: 'Prendre 30 minutes',
      subject: 'Supervision – prendre 30 minutes',
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Qu’est-ce que la supervision pour les coachs et les facilitateurs ?', a: 'Un temps régulier pour regarder ce qui se passe en vous pendant que vous accompagnez les autres : ce qui vous a touché, ce que vous avez évité, ce que vous ramenez qui n’est pas à vous.' },
        { q: 'Faut-il venir à Arbas ?', a: 'Non. La supervision individuelle se fait à distance. La marche est une option pour qui le souhaite ; Arbas est à environ 1 h 15 de Toulouse.' },
        { q: 'Combien coûte la supervision ?', a: 'La supervision individuelle coûte 680 € HT les quatre séances. Pour la supervision en marchant et Le Cercle, les modalités sont précisées lors du premier échange.' },
        { q: 'La supervision est-elle possible en anglais ?', a: 'Oui, en français ou en anglais.' },
      ],
      topic: 'supervision',
    },
    en: {
      eyebrow: 'Supervision · Pyrenees and online',
      h1: 'Supervision for coaches, facilitators and practitioners',
      intro:
        'I am a supervisor and facilitator based in Arbas, in the Comminges area of the French Pyrenees. Supervision is time to look at what happens in you while you support others: what touched you, what you avoided, what you would do differently. We work online or while walking in the Pyrenees.',
      blocks: [
        {
          h2: 'What supervision is for',
          paragraphs: [
            'A reflective space to explore how you show up in your work, what is happening in your professional relationships and the choices that engage your responsibility.',
            'Supervision can bring useful reference points for your practice: an assumption to explore, a boundary to set, a question to deepen or an adjustment to try.',
          ],
        },
        { h2: 'Individual supervision: four sessions', paragraphs: ['Four one-hour sessions over four months, online. €680 excl. VAT for the four sessions.'] },
        {
          h2: 'Walking supervision in the Comminges',
          paragraphs: [
            'You can hold one or more sessions while walking from Arbas, on your own or in a small group of peers. Walking side by side often changes the way we talk about our practice: less face-to-face, more room for what emerges. Dates and fees agreed in the first conversation.',
          ],
        },
        { h2: 'Group supervision: The Circle', paragraphs: ['A group of eight people at most, from December to February. Registration opens in early November.'] },
        {
          h2: 'Who it is for',
          paragraphs: ['Facilitators, coaches, trainers and practitioners, from the Pyrenees, Toulouse, the rest of Occitanie or further afield. In English or French.'],
          links: [{ label: 'See where and how I work in the Pyrenees', to: '/en/pyrenees' }],
        },
      ],
      closingTitle: 'Where to start',
      closingText: 'Let’s take thirty minutes to see which format suits you: online, walking or in a group.',
      button: '30 minutes to talk',
      subject: 'Supervision – 30 minutes to talk',
      faqTitle: 'Frequently asked questions',
      faq: [
        { q: 'What is supervision for coaches and facilitators?', a: 'A regular time to look at what happens in you while you support others: what touched you, what you avoided, what you bring back that is not yours.' },
        { q: 'Do I have to come to Arbas?', a: 'No. Individual supervision takes place online. Walking is an option if you would like it; Arbas is about 1 h 15 from Toulouse.' },
        { q: 'How much does supervision cost?', a: 'Individual supervision costs €680 excl. VAT for the four sessions. For walking supervision and The Circle, the details are set out in the first conversation.' },
        { q: 'Is supervision available in English?', a: 'Yes, in English or French.' },
      ],
      topic: 'supervision',
    },
  },
  pyrenees: {
    fr: {
      eyebrow: 'Arbas · Comminges · Haute-Garonne',
      h1: 'Accompagner dans les Pyrénées, depuis Arbas en Comminges',
      intro:
        'Je vis et travaille à Arbas, en Haute-Garonne, au pied du Cagire. C’est d’ici que j’accompagne des dirigeants, des équipes et des accompagnants : en marchant, en salle, ou à distance quand c’est plus simple.',
      blocks: [
        {
          h2: 'Pourquoi travailler dehors, en montagne',
          paragraphs: [
            'Marcher ensemble ralentit la conversation et ouvre le regard. Le paysage donne de la place à ce qui ne se dit pas facilement autour d’une table. On ne part pas pour s’évader : on revient avec une décision plus claire ou une question mieux posée.',
          ],
        },
        {
          h2: 'Les lieux où nous pouvons travailler',
          subs: [
            { h3: 'À Arbas, sur rendez-vous', text: `${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.locality}. Pour un premier échange, une séance de coaching ou de supervision.` },
            { h3: 'Sur les sentiers de la vallée d’Arbas et du Cagire', text: 'Pour les séances en marchant, avec des parcours simples adaptés à chacun et à la météo.' },
            { h3: 'À la ferme d’Oulan Bât', text: 'Chez Nico et Céline Salviac, dans leur camp de yourtes, pour les étapes de quelques jours en petit groupe.' },
            { h3: 'Chez vous, dans les Pyrénées ou à Toulouse', text: 'Pour la facilitation de séminaires et la médiation, de préférence en présentiel.' },
          ],
        },
        {
          h2: 'Coaching, supervision et facilitation dans la région',
          links: [
            { label: 'Coaching de dirigeants, en marchant ou à distance', to: '/coaching' },
            { label: 'Supervision des coachs et facilitateurs', to: '/supervision' },
            { label: 'Facilitation, conception de programmes et médiation', to: '/accompagnement' },
            { label: 'Les étapes : quelques jours dehors pour relire sa pratique', to: '/etapes' },
          ],
        },
        {
          h2: 'Venir à Arbas',
          paragraphs: [
            'Arbas se trouve en Comminges, entre Saint-Gaudens et Saint-Girons. Toulouse est à environ 1 h 15 de route. Je me déplace en Comminges, dans le Couserans et l’Ariège, le Luchonnais, les Hautes-Pyrénées et à Toulouse.',
          ],
        },
        {
          h2: 'Les étapes, au printemps 2027',
          paragraphs: ['Trois jours et deux nuits à la ferme d’Oulan Bât, huit personnes au plus. Dates et tarif annoncés en décembre 2026.'],
          links: [{ label: 'En savoir plus sur les étapes', to: '/etapes' }],
        },
      ],
      closingTitle: 'Par où commencer',
      closingText: 'Dites-moi ce qui se passe. Nous verrons ensemble si nous nous retrouvons à Arbas, sur un sentier ou à distance.',
      button: 'Prendre 30 minutes',
      subject: 'Pyrénées – prendre 30 minutes',
      faqTitle: 'Questions fréquentes',
      faq: [
        { q: 'Recevez-vous à Arbas ?', a: `Oui, sur rendez-vous, au ${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.locality}.` },
        { q: 'Vous déplacez-vous ?', a: 'Oui, en Comminges, dans le Couserans et l’Ariège, le Luchonnais, les Hautes-Pyrénées et à Toulouse, surtout pour la facilitation et la médiation.' },
        { q: 'Peut-on tout faire à distance ?', a: 'Le coaching et la supervision, oui, en français ou en anglais. La facilitation et la médiation se font de préférence en présentiel.' },
      ],
    },
    en: {
      eyebrow: 'Arbas · Comminges · Haute-Garonne',
      h1: 'Working with you in the French Pyrenees, from Arbas',
      intro:
        'I live and work in Arbas, in the Haute-Garonne, at the foot of Mont Cagire. From here I work with leaders, teams and practitioners: walking, in a room, or online when that is simpler.',
      blocks: [
        {
          h2: 'Why work outdoors, in the mountains',
          paragraphs: [
            'Walking together slows the conversation down and widens the view. The landscape makes room for what is hard to say across a table. You do not go to escape: you come back with a clearer decision or a better question.',
          ],
        },
        {
          h2: 'Where we can work',
          subs: [
            { h3: 'In Arbas, by appointment', text: `${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.locality}, France. For a first conversation, a coaching or supervision session.` },
            { h3: 'On the trails of the Arbas valley and Mont Cagire', text: 'For walking sessions, on simple routes adapted to each person and to the weather.' },
            { h3: 'At the Oulan Bât farm', text: 'At Nico and Céline Salviac’s yurt camp, for small-group journeys of a few days.' },
            { h3: 'At your place, in the Pyrenees or Toulouse', text: 'For facilitated seminars and mediation, preferably in person.' },
          ],
        },
        {
          h2: 'Coaching, supervision and facilitation in the region',
          links: [
            { label: 'Leadership coaching, walking or online', to: '/en/coaching' },
            { label: 'Supervision for coaches and facilitators', to: '/en/supervision' },
            { label: 'Facilitation, programme design and mediation', to: '/en/services' },
            { label: 'Journeys: a few days outdoors to reflect on your practice', to: '/en/journeys' },
          ],
        },
        {
          h2: 'Getting to Arbas',
          paragraphs: [
            'Arbas lies in the Comminges, between Saint-Gaudens and Saint-Girons. Toulouse is about 1 h 15 by road. I travel across the Comminges, the Couserans and Ariège, the Luchon area, the Hautes-Pyrénées and Toulouse.',
          ],
        },
        {
          h2: 'Journeys, in spring 2027',
          paragraphs: ['Three days and two nights at the Oulan Bât farm, eight people at most. Dates and fees announced in December 2026.'],
          links: [{ label: 'Read more about the journeys', to: '/en/journeys' }],
        },
      ],
      closingTitle: 'Where to start',
      closingText: 'Tell me what is going on. Together we will see whether we meet in Arbas, on a trail or online.',
      button: '30 minutes to talk',
      subject: 'Pyrenees – 30 minutes to talk',
      faqTitle: 'Frequently asked questions',
      faq: [
        { q: 'Can I meet you in Arbas?', a: `Yes, by appointment, at ${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.locality}, France.` },
        { q: 'Do you travel?', a: 'Yes, across the Comminges, the Couserans and Ariège, the Luchon area, the Hautes-Pyrénées and Toulouse, especially for facilitation and mediation.' },
        { q: 'Can everything be done online?', a: 'Coaching and supervision, yes, in English or French. Facilitation and mediation preferably in person.' },
      ],
    },
  },
};

const LocalPage = ({ kind }: { kind: LocalKind }) => {
  const { language, lp } = useLanguage();
  const c = localContent[kind][language];
  const mailto = `mailto:josselin@regenb.com?subject=${encodeURIComponent(c.subject)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
          <div className="measure mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-accent">{c.eyebrow}</p>
            <h1 className="mt-5 text-[2.1rem] font-semibold leading-[1.15] sm:text-5xl">{c.h1}</h1>
            <p className="mt-6 text-muted-foreground">{c.intro}</p>
          </div>
        </section>

        {c.blocks.map((b, i) => (
          <section key={b.h2} id={b.id} className={`border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12 ${i % 2 === 1 ? 'bg-secondary' : ''}`}>
            <div className="measure mx-auto">
              <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{b.h2}</h2>
              {b.paragraphs?.map((p) => <p key={p} className="mt-4 text-muted-foreground">{p}</p>)}
              {b.subs?.map((s) => (
                <div key={s.h3} className="mt-8">
                  <h3 className="text-lg font-semibold">{s.h3}</h3>
                  <p className="mt-2 text-muted-foreground">{s.text}</p>
                </div>
              ))}
              {b.links && (
                <ul className="mt-6 space-y-2">
                  {b.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-primary underline decoration-accent underline-offset-4">{l.label}</Link>
                    </li>
                  ))}
                </ul>
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
              <Link to={lp('/accompagnement')} className="underline decoration-accent underline-offset-4">
                {language === 'fr' ? 'Voir toutes les façons de travailler ensemble' : 'See all the ways we can work together'}
              </Link>
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
        <EnquiryForm defaultTopic={c.topic} />
      </main>
      <Footer />
    </div>
  );
};

export default LocalPage;
