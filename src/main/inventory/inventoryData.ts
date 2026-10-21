export type InventoryItem = {
  id: string;
  name: string;
  /** Short line under the name in the details pane. */
  tagline: string;
  /** Shown on the right of the row, like an item count. */
  tag: string;
  description: string;
  highlights?: string[];
  stack?: string[];
  image?: { src: string; alt: string; width: number; height: number };
  /** A drawn illustration used in place of a screenshot. */
  art?: 'site-card';
  links?: { label: string; href: string }[];
};

export type InventoryTab = {
  id: 'professional' | 'personal';
  label: string;
  /** Optional line above the item list, e.g. where the work was done. */
  caption?: string;
  items: InventoryItem[];
};

const img = (file: string) => `${import.meta.env.BASE_URL}inventory/${file}`;
const repo = (name: string) => `https://github.com/cdurran9/${name}`;

export const INVENTORY: InventoryTab[] = [
  {
    id: 'professional',
    label: 'Professional',
    caption: 'ReliaQuest · Senior Software Engineer · 2021–Present',
    items: [
      {
        id: 'greymatter-ai',
        name: 'GreyMatter Incident Response UI',
        tagline: "Unified UI for investigating all threat alerts",
        tag: 'Frontend',
        description:
          'Built a UI to unify and streamline the investigation workflow ' +
          'by grouping actionable items in the list view, displaying relevant ' +
          'info and call to action buttons, and bringing detailed data views ' +
          'and AI workflow reviews into easy-access sliding panes '
          ,
        highlights: [
          'Brought down average time spent on investigation to minutes',
          'Dynamic actions help suggest quick remediation steps',
        ],
        image: {
          src: img('greymatter-ai.jpg'),
          alt: 'GreyMatter incident view with an AI summary and step-by-step AI investigation',
          width: 1600,
          height: 1071,
        },
      },
      {
        id: 'greymatter-drp',
        name: 'Digital Risk Protection',
        tagline: 'Bringing a new product into GreyMatter',
        tag: 'Frontend',
        description:
          "Led the frontend integration of ReliaQuest's Digital Risk Protection " +
          'platform into GreyMatter, surfacing threats like impersonating domains with ' +
          'their risk factors, reputation data and matched assets.',
        highlights: ['A new upsell product that brought in several million in revenue in the first year'],
        image: {
          src: img('greymatter-drp.jpg'),
          alt: 'Digital Risk Protection alert for an impersonating domain, with risk factors and reputation data',
          width: 1086,
          height: 616,
        },
      },
      {
        id: 'global-hunts',
        name: 'Global Threat Hunting',
        tagline: 'Hunt across every customer at once',
        tag: 'Frontend',
        description:
          'Sole frontend engineer on a tool that lets the threat hunting team run ' +
          'simultaneous hunts across all customer environments, instead of one ' +
          'customer at a time.',
        highlights: [
          'Saves hundreds of hours per hunt',
          'Led to several early detections of threat actors in customer environments',
        ],
      },
      {
        id: 'reporting',
        name: 'Self-Service Reporting',
        tagline: 'Customer-built reports on security KPIs',
        tag: 'Frontend',
        description:
          'Engineered the frontend for a fully customizable reporting page where ' +
          'customers build and view reports on the KPIs behind their security ' +
          'posture.',
        highlights: [
          'Saves Customer Success time otherwise spent pulling metrics and building slides',
          'Contributes to customer retention',
        ],
      },
    ],
  },
  {
    id: 'personal',
    label: 'Personal',
    items: [
      {
        id: 'portfolio',
        name: 'This Site',
        art: 'site-card',
        tagline: 'A Persona 5-inspired portfolio',
        tag: '2026',
        description:
          'I love the bombastic UI of Persona 5 and wanted to try imitating it. All my portfolio information is here, but presented in a (hopefully) somewhat novel way. Plus game UI is just so much fun to emulate and learn from, I couldn\'t pass up the opportunity.',
        stack: ['React', 'TypeScript', 'Vite', 'CSS'],
        links: [
          { label: 'Repo', href: repo('cdurran9.github.io') },
        ],
      },
      {
        id: 'trust-no-one',
        name: 'Trust No One',
        tagline: 'Brackeys Game Jam 2026.2 entry',
        tag: '2026',
        description:
          'A 3D first-person jam game built in Godot (still WIP, though the due date has passed). Sneak around your office stealing contraband items from your coworkers and incinerating them for a nice bonus! Just don\'t let them see you, or they\'ll take their stuff back.',
        stack: ['Godot', 'GDScript', 'Shaders'],
        image: {
          src: img('trust-no-one.jpg'),
          alt: 'Trust No One gameplay: a box to pick up, NPCs in the background, a timer and money counter',
          width: 1600,
          height: 902,
        },
        links: [{ label: 'Repo', href: repo('trust-no-one') }],
      },
      {
        id: 'habit-game',
        name: 'Habit Game',
        tagline: 'An RPG for building habits',
        tag: '2026',
        description:
          'A project for purely personal use, I wanted to try making my personal habits easier and more satisfying to track. So each habit is tied to one or more RPG-like stats, and progress unlocks rewards I create for myself. Also still a work in progress, as I want to add even more gamification and visual reward to staying on streaks and gaining levels.',
        stack: ['React', 'TypeScript', 'Supabase', 'Framer Motion'],
        image: {
          src: img('habit-game.jpg'),
          alt: 'Habit Game: a habits list beside a sidebar of leveled RPG stats',
          width: 1600,
          height: 1017,
        },
        links: [{ label: 'Repo', href: repo('habit-game') }],
      },
      {
        id: 'spellbook',
        name: 'Spellbook',
        tagline: 'D&D 5e spell manager',
        tag: '2023',
        description:
          'A personal project to teach myself SvelteKit, which I used to track my spell resources in a D&D game with friends. It holds the spells I know, and I can track which ones are prepared and how many slots I\'ve used. This is persisted in a Supabase database so it stays tracked across game sessions.',
        stack: ['Svelte', 'TypeScript'],
        image: {
          src: img('spellbook.jpg'),
          alt: 'Spellbook cast view with spell slot trackers and spell cards',
          width: 1600,
          height: 616,
        },
        links: [{ label: 'Repo', href: repo('spellbook') }],
      },
      {
        id: 'shared-steam-games',
        name: 'Shared Steam Games',
        tagline: 'What can the whole group play?',
        tag: '2023',
        description:
          'Compares Steam libraries across a group of friends and shows the games ' +
          'everyone owns, or how many of the group own each one. Gave me some practice in SvelteKit and the Steam API, as well as assisted us a bit in finally picking a game for game night instead of hemming and hawing for two hours.',
        stack: ['SvelteKit', 'TypeScript'],
        image: {
          src: img('shared-steam-games.jpg'),
          alt: 'Shared Steam Games: a grid of games owned by all four friends',
          width: 1600,
          height: 813,
        },
        links: [{ label: 'Repo', href: repo('shared-steam-games') }],
      },
      {
        id: 'gif-me-a-break',
        name: 'GIF Me a Break',
        tagline: 'Multiplayer meme factory party game',
        tag: '2021',
        description:
          'A browser party game inspired by Jackbox. I used the GIPHY API to serve random GIFs to each player, and they picked a GIF to go with a funny caption written by another player. Played it once to some success, but never did make it out of the proof of concept phase.',
        stack: ['React', 'Redux Toolkit', 'Socket.IO', 'Express', 'MUI', 'GIPHY API'],
        links: [{ label: 'Repo', href: repo('gif-me-a-break') }],
      },
    ],
  },
];
