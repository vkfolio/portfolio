// rooms.ts: shared project metadata for nav, og tags, related-rooms.

export type Room = {
  slug: string;
  title: string;
  desc: string;
  group: 'oss' | 'personal';
  groupLabel: string;
  accent: string;
  accentSoft: string;
  accentInk: string;
  year: string;
  role: string;
  fieldNote?: string;
  links?: { label: string; href: string }[];
};

export const ROOMS: Room[] = [
  {
    slug: 'vclaw',
    title: 'VClaw',
    desc: 'A local-first fleet of AI-controlled machines.',
    group: 'personal',
    groupLabel: 'Personal · local-first AI',
    accent: '#4F46E5',
    accentSoft: '#E0E7FF',
    accentInk: '#312E81',
    year: '2026',
    role: 'Solo: full-stack, native, design',
    fieldNote: 'why-i-built-vclaw',
    links: [
      { label: 'vclaw.vkfolio.com', href: 'https://vclaw.vkfolio.com' },
      { label: 'github.com/vkfolio/vclaw_fleet', href: 'https://github.com/vkfolio/vclaw_fleet' },
    ],
  },
  {
    slug: 'vizlang-studio',
    title: 'VizLang Studio',
    desc: 'Visual debugger for LangGraph agents.',
    group: 'oss',
    groupLabel: 'OSS · dev tools',
    accent: '#1F8054',
    accentSoft: '#E4F1EA',
    accentInk: '#0F4A2E',
    year: '2025',
    role: 'Personal R&D',
    fieldNote: 'why-i-built-vizlang',
    links: [
      { label: 'VS Code Marketplace', href: 'https://marketplace.visualstudio.com' },
      { label: 'github.com/vkfolio/Vizlang', href: 'https://github.com/vkfolio/Vizlang' },
    ],
  },
  {
    slug: 'oriosearch',
    title: 'OrioSearch',
    desc: 'Self-hosted, Tavily-compatible web search API.',
    group: 'oss',
    groupLabel: 'OSS · infrastructure',
    accent: '#C04A2B',
    accentSoft: '#F5E6DE',
    accentInk: '#6B2412',
    year: '2025',
    role: 'Personal R&D',
    fieldNote: 'private-knowledge-graphs',
    links: [{ label: 'github.com/vkfolio/orio-search', href: 'https://github.com/vkfolio/orio-search' }],
  },
  {
    slug: 'olla-chat',
    title: 'Olla Chat',
    desc: 'VS Code chat for Ollama.',
    group: 'oss',
    groupLabel: 'OSS · dev tools',
    accent: '#5C3FBF',
    accentSoft: '#EBE4F7',
    accentInk: '#2E1D6E',
    year: '2024',
    role: 'Personal R&D',
    links: [{ label: 'VS Code Marketplace', href: 'https://marketplace.visualstudio.com' }],
  },
  {
    slug: 'pydebug',
    title: 'PyDebug Visualizer Helper',
    desc: 'Visualise Python data structures while debugging.',
    group: 'oss',
    groupLabel: 'OSS · dev tools',
    accent: '#3776AB',
    accentSoft: '#E1ECF4',
    accentInk: '#1E4A6E',
    year: '2024',
    role: 'Personal R&D',
    links: [{ label: 'VS Code Marketplace', href: 'https://marketplace.visualstudio.com' }],
  },
  {
    slug: 'stateviz',
    title: 'StateViz',
    desc: 'VS Code state-tree visualiser.',
    group: 'oss',
    groupLabel: 'OSS · dev tools',
    accent: '#D97706',
    accentSoft: '#FBEFD9',
    accentInk: '#7A3E04',
    year: '2024',
    role: 'Personal R&D',
    links: [{ label: 'VS Code Marketplace', href: 'https://marketplace.visualstudio.com' }],
  },
  {
    slug: 'a2ui-vue',
    title: 'A2UI Vue',
    desc: 'Vue 3 renderer for Google’s A2UI protocol.',
    group: 'oss',
    groupLabel: 'OSS · UI runtimes',
    accent: '#41B883',
    accentSoft: '#E1F5EA',
    accentInk: '#1F6F4B',
    year: '2025',
    role: 'Personal R&D',
    links: [{ label: 'github.com/vkfolio/a2ui-vue', href: 'https://github.com/vkfolio/a2ui-vue' }],
  },
  {
    slug: 'sable',
    title: 'Sable',
    desc: 'A small, deliberate UI library.',
    group: 'oss',
    groupLabel: 'OSS · UI runtimes',
    accent: '#475569',
    accentSoft: '#E6E9ED',
    accentInk: '#1E2A38',
    year: '2024',
    role: 'Personal R&D',
    fieldNote: 'why-i-built-sable',
    links: [{ label: 'github.com/vkfolio/sable', href: 'https://github.com/vkfolio/sable' }],
  },
  {
    slug: 'mogo',
    title: 'Mogo',
    desc: 'Personal creative-tools R&D.',
    group: 'personal',
    groupLabel: 'Personal R&D',
    accent: '#EE368F',
    accentSoft: '#FBE2EE',
    accentInk: '#8E1B58',
    year: '2024 –',
    role: 'Personal research',
  },
  {
    slug: 'mycards',
    title: 'MyCardsAndDocs',
    desc: 'iOS: IDs and documents, offline-only.',
    group: 'personal',
    groupLabel: 'Personal · iOS',
    accent: '#007AFF',
    accentSoft: '#DFEDFF',
    accentInk: '#003A75',
    year: '2024',
    role: 'iOS · solo',
    links: [{ label: 'App Store · id6746961420', href: 'https://apps.apple.com/us/app/mycardsanddocs/id6746961420' }],
  },
];

export const ROOM_GROUPS = [
  { id: 'oss', label: 'Open source', desc: 'Tools I keep needing.' },
  { id: 'personal', label: 'Personal R&D', desc: 'Research, not products.' },
] as const;

export const findRoom = (slug: string) => ROOMS.find((r) => r.slug === slug);
