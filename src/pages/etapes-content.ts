import type { Element } from '@/components/ElementIcon';

export type EtapeKey = 'arbas' | 'mazeimard' | 'medoc';

export type Etape = {
  key: EtapeKey;
  season: string;
  status: string;
  title: string;
  place: string;
  hosts: string;
  question: string;
  why: string[];
  senses: { listen: string; touch: string; see: string };
  format: string;
  statusLine: string;
  note?: string;
  figureCaption: string;
  interest: string;
};

export type EtapesCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  anchorLine: string;
  threadLabel: string;
  threadNote: string;
  seekTitle: string;
  seek: { element: Element; title: string; text: string }[];
  balance: string;
  sensesLabels: { listen: string; touch: string; see: string };
  formatLabel: string;
  cta: string;
  etapes: Etape[];
  commonTitle: string;
  common: { title: string; text: string }[];
  forWhomTitle: string;
  forWhom: string;
  formTitle: string;
  formIntro: string;
  formNote: string;
};

export const etapesContent: Record<'fr' | 'en', EtapesCopy> = {
  fr: {
    eyebrow: 'Les étapes',
    title: 'Des lieux à rencontrer. Une pratique à remettre en mouvement.',
    intro:
      "Quelques jours en petit groupe, loin des habitudes, pour travailler une question qui ne se règle pas seulement en en parlant. On marche, on regarde, on met les mains dans la matière. Et l'on revient à son travail avec d'autres repères pour agir.",
    anchorLine: 'Le lieu n’est pas un décor. Ce qui s’y vit nourrit le travail du groupe.',
    threadLabel: 'Trois saisons, trois lieux',
    threadNote: 'Trois propositions indépendantes. Vous pouvez rejoindre une seule Étape.',
    seekTitle: 'Ce que vous venez chercher',
    seek: [
      { element: 'earth', title: 'Déplacer votre regard', text: 'Vous accompagnez d’autres personnes et vous sentez le besoin de voir votre pratique depuis un autre endroit.' },
      { element: 'air', title: 'Penser avec les sens', text: 'Vous cherchez un espace où réfléchir passe aussi par la marche, l’observation et la rencontre.' },
      { element: 'water', title: 'Repartir avec des questions plus justes', text: 'Vous voulez revenir à votre travail avec des possibilités concrètes, pas avec une méthode de plus.' },
    ],
    balance: 'Un temps de travail et de respiration, nourri par le lieu. Ni une succession de conférences, ni une obligation de se transformer.',
    sensesLabels: { listen: 'À l’oreille', touch: 'Sous la main', see: 'Sous les yeux' },
    formatLabel: 'Le cadre',
    cta: 'Cette Étape m’appelle',
    etapes: [
      {
        key: 'arbas',
        season: 'Printemps 2027',
        status: 'En préparation',
        title: 'Alléger le bât',
        place: 'Ferme d’Oulan Bât · Arbas, Pyrénées',
        hosts: 'Avec Nico et Céline Salviac, et leurs ânes',
        question: 'Qu’est-ce que je porte, et qu’est-ce qui est vraiment à moi de porter ?',
        why: [
          'Au pied des Pyrénées, on part marcher avec des ânes. Il faut charger le bât, chercher l’équilibre, sentir ce qui pèse et ce qui gêne la marche.',
          'Le geste est simple. La question qu’il pose à notre manière de travailler l’est beaucoup moins : ce que l’on prend pour les autres, ce que l’on pourrait déposer, ce qui nous revient vraiment.',
        ],
        senses: {
          listen: 'Le pas des ânes sur le chemin, le calme du soir autour des yourtes.',
          touch: 'Le bât que l’on charge, que l’on ajuste, que l’on allège.',
          see: 'La vallée d’Arbas qui s’ouvre à mesure que l’on monte.',
        },
        format: 'Trois jours et deux nuits dans le camp de yourtes de la ferme. Huit personnes au plus. Des journées de marche, des temps en cercle, des soirées simples.',
        statusLine: 'Dates et tarif annoncés en décembre 2026.',
        figureCaption: 'Les yourtes d’Oulan Bât, en vallée d’Arbas.',
        interest: 'Bonjour Josselin, l’Étape « Alléger le bât » (Arbas, printemps 2027) m’intéresse.',
      },
      {
        key: 'mazeimard',
        season: 'Été 2027',
        status: 'En co-conception',
        title: 'Changer de regard',
        place: 'Mazeimard · Creuse',
        hosts: 'Avec Alain Freytet, paysagiste',
        question: 'Que devient une situation lorsque l’on prend le temps de la regarder autrement ?',
        why: [
          'Alain Freytet est paysagiste, carnet de croquis toujours à portée de main. Dans les granges de Mazeimard, il accueille déjà des séjours où l’on partage des idées autant que des efforts, comme le travail de la pierre sèche.',
          'Une Étape pour relier la lecture d’un paysage à la pratique de l’accompagnement : observer avant d’interpréter, changer de point de vue, faire place à ce que l’on ne remarquait plus.',
        ],
        senses: {
          listen: 'L’eau vive, près des sources de la Gartempe.',
          touch: 'La pierre sèche, le crayon sur le papier.',
          see: 'Le même paysage, autre selon l’endroit où l’on se tient.',
        },
        note: 'Dessiner est une invitation, pas une compétence demandée.',
        format: 'Juillet 2027 envisagé. Durée, accueil et tarif à construire avec Alain.',
        statusLine: 'Rencontre en préparation avec Alain Freytet.',
        figureCaption: 'Dessin en attendant les photographies de Mazeimard.',
        interest: 'Bonjour Josselin, l’Étape « Changer de regard » (Mazeimard, été 2027) m’intéresse.',
      },
      {
        key: 'medoc',
        season: 'Automne 2027',
        status: 'En co-conception',
        title: 'Cultiver les conditions du vivant',
        place: 'Saint-Laurent-Médoc · Gironde',
        hosts: 'Avec Éric Prido, ingénieur du vivant',
        question: 'Et si accompagner consistait moins à pousser qu’à créer les bonnes conditions ?',
        why: [
          'Éric Prido a longtemps travaillé l’eau et les rivières, au Canada puis en France. Sur sa ferme permacole expérimentale, on peut observer ce qui fait tenir un système : ce qui nourrit quoi, où les ressources se renouvellent, où elles s’épuisent.',
          'Puis nous revenons à nos propres manières de concevoir un programme, de soutenir une équipe ou d’accompagner le changement. Une ferme n’explique pas une organisation ; elle aide à poser de meilleures questions.',
        ],
        senses: {
          listen: 'La mare, la haie, le vivant qui s’affaire.',
          touch: 'La terre, les feuilles, ce qui se décompose et ce qui repart.',
          see: 'Où l’eau circule, où elle s’arrête, où elle manque.',
        },
        format: 'Automne 2027 envisagé. Durée, accueil et tarif à construire avec Éric.',
        statusLine: 'Rencontre en préparation avec Éric Prido.',
        figureCaption: 'Dessin en attendant les photographies de la ferme.',
        interest: 'Bonjour Josselin, l’Étape « Cultiver les conditions du vivant » (Saint-Laurent-Médoc, automne 2027) m’intéresse.',
      },
    ],
    commonTitle: 'Ce qui relie les trois Étapes',
    common: [
      { title: 'Une vraie question', text: 'Vous venez avec une situation de travail réelle. Ce qui se dit dans le groupe reste dans le groupe.' },
      { title: 'Un petit groupe', text: 'Peu de personnes, pour que chacune ait de la place, du temps et de l’attention.' },
      { title: 'Dehors, puis en cercle', text: 'On vit quelque chose avec le lieu, puis on prend le temps d’en parler et de relire sa pratique.' },
      { title: 'Des hôtes, pas des décors', text: 'Celles et ceux qui font vivre le lieu partagent leur regard. Nous apprenons d’eux autant que du paysage.' },
    ],
    forWhomTitle: 'Pour qui',
    forWhom: 'Facilitateurs, coachs, formateurs, concepteurs de programmes, managers : toutes celles et ceux qui accompagnent des personnes ou des groupes et veulent nourrir leur pratique.',
    formTitle: 'Quelle Étape vous appelle ?',
    formIntro: 'Dites-moi laquelle et, si vous le souhaitez, la question que vous aimeriez y apporter. Inutile de détailler vos situations clients.',
    formNote: 'Écrire ne vaut ni inscription ni engagement. Je vous recontacte quand le cadre, les dates et le tarif sont précisés.',
  },
  en: {
    eyebrow: 'Journeys',
    title: 'Places to meet. A practice back in motion.',
    intro:
      "A few days in a small group, away from habit, to work on a question you can't settle just by talking about it. We walk, we look, we get our hands into the material. And we return to our work with new bearings for action.",
    anchorLine: 'The place is not a backdrop. What we live there feeds the work of the group.',
    threadLabel: 'Three seasons, three places',
    threadNote: 'Three independent invitations. You can join just one journey.',
    seekTitle: 'What you come looking for',
    seek: [
      { element: 'earth', title: 'A shift in perspective', text: 'You support other people and feel the need to see your practice from somewhere else.' },
      { element: 'air', title: 'Thinking through the senses', text: 'You are looking for a space where reflection also happens through walking, observing and meeting.' },
      { element: 'water', title: 'Leaving with better questions', text: 'You want to return to your work with concrete possibilities, not one more method.' },
    ],
    balance: 'Time to work and time to breathe, nourished by the place. Neither a string of lectures nor a duty to transform.',
    sensesLabels: { listen: 'To the ear', touch: 'In the hand', see: 'To the eye' },
    formatLabel: 'The setting',
    cta: 'This journey calls me',
    etapes: [
      {
        key: 'arbas',
        season: 'Spring 2027',
        status: 'In preparation',
        title: 'Lightening the load',
        place: 'Oulan Bât farm · Arbas, Pyrenees',
        hosts: 'With Nico and Céline Salviac, and their donkeys',
        question: 'What am I carrying, and what is truly mine to carry?',
        why: [
          'At the foot of the Pyrenees, we set out walking with donkeys. The pack has to be loaded and balanced; you feel what weighs, and what gets in the way of walking.',
          'The gesture is simple. The question it asks of the way we work is far less so: what we take on for others, what we could set down, what really belongs to us.',
        ],
        senses: {
          listen: 'Donkeys’ hooves on the path, the evening quiet around the yurts.',
          touch: 'The pack you load, adjust and lighten.',
          see: 'The Arbas valley opening up as you climb.',
        },
        format: 'Three days and two nights in the farm’s yurt camp. Eight people at most. Days of walking, time in a circle, simple evenings.',
        statusLine: 'Dates and fees announced in December 2026.',
        figureCaption: 'The Oulan Bât yurts in the Arbas valley.',
        interest: 'Hello Josselin, I am interested in the “Lightening the load” journey (Arbas, spring 2027).',
      },
      {
        key: 'mazeimard',
        season: 'Summer 2027',
        status: 'Being co-designed',
        title: 'Seeing differently',
        place: 'Mazeimard · Creuse',
        hosts: 'With Alain Freytet, landscape architect',
        question: 'What becomes of a situation when we take the time to look at it differently?',
        why: [
          'Alain Freytet is a landscape architect who always keeps a sketchbook within reach. In the barns of Mazeimard he already hosts stays where ideas are shared as much as physical effort, such as dry-stone walling.',
          'A journey that links reading a landscape with the practice of supporting others: observing before interpreting, shifting viewpoint, making room for what we had stopped noticing.',
        ],
        senses: {
          listen: 'Running water, near the source of the Gartempe.',
          touch: 'Dry stone, pencil on paper.',
          see: 'The same landscape, different depending on where you stand.',
        },
        note: 'Drawing is an invitation, not a required skill.',
        format: 'July 2027 envisaged. Length, accommodation and fees to be shaped with Alain.',
        statusLine: 'Meeting in preparation with Alain Freytet.',
        figureCaption: 'A drawing, while we wait for photographs of Mazeimard.',
        interest: 'Hello Josselin, I am interested in the “Seeing differently” journey (Mazeimard, summer 2027).',
      },
      {
        key: 'medoc',
        season: 'Autumn 2027',
        status: 'Being co-designed',
        title: 'Cultivating the conditions for life',
        place: 'Saint-Laurent-Médoc · Gironde',
        hosts: 'With Éric Prido, ecosystem engineer',
        question: 'What if supporting others were less about pushing and more about creating the right conditions?',
        why: [
          'Éric Prido spent many years working with water and rivers, in Canada and then in France. On his experimental permaculture farm, you can observe what keeps a system going: what feeds what, where resources are renewed, where they run out.',
          'Then we return to our own ways of designing a programme, supporting a team or accompanying change. A farm does not explain an organisation; it helps us ask better questions.',
        ],
        senses: {
          listen: 'The pond, the hedge, living things at work.',
          touch: 'Soil, leaves, what breaks down and what starts again.',
          see: 'Where water flows, where it stops, where it is missing.',
        },
        format: 'Autumn 2027 envisaged. Length, accommodation and fees to be shaped with Éric.',
        statusLine: 'Meeting in preparation with Éric Prido.',
        figureCaption: 'A drawing, while we wait for photographs of the farm.',
        interest: 'Hello Josselin, I am interested in the “Cultivating the conditions for life” journey (Saint-Laurent-Médoc, autumn 2027).',
      },
    ],
    commonTitle: 'What the three journeys share',
    common: [
      { title: 'A real question', text: 'You bring a real work situation. What is said in the group stays in the group.' },
      { title: 'A small group', text: 'Few people, so that everyone has room, time and attention.' },
      { title: 'Outdoors, then in a circle', text: 'We live something with the place, then take time to talk it through and reflect on our practice.' },
      { title: 'Hosts, not backdrops', text: 'The people who care for each place share their way of seeing. We learn from them as much as from the landscape.' },
    ],
    forWhomTitle: 'For whom',
    forWhom: 'Facilitators, coaches, trainers, programme designers, managers: anyone who supports people or groups and wants to nourish their practice.',
    formTitle: 'Which journey calls you?',
    formIntro: 'Tell me which one and, if you like, the question you would bring. There is no need to describe client situations.',
    formNote: 'Writing is neither a registration nor a commitment. I will get back to you once the setting, dates and fees are clear.',
  },
};
