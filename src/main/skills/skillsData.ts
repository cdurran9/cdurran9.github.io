import { PROFILE } from '../../profile';

// Skill levels are rough years of hands-on experience, out of MAX_LEVEL.
export const MAX_LEVEL = 12;

export type Skill = { name: string; level: number };

export type SkillGroup = {
  id: 'frontend' | 'backend' | 'other';
  title: string;
  tag?: string;
  skills: Skill[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    tag: 'Primary',
    skills: [
      { name: 'React', level: 5 },
      { name: 'TypeScript', level: 7 },
      { name: 'GraphQL', level: 4 },
      { name: 'Angular', level: 3 },
      { name: 'Svelte', level: 2 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Infra',
    skills: [
      { name: 'Java', level: 4 },
      { name: 'Spring Boot', level: 4 },
      { name: 'PostgreSQL', level: 4 },
      { name: 'Kafka', level: 3 },
      { name: 'RabbitMQ', level: 3 },
      { name: 'AWS', level: 3 },
      { name: 'C#', level: 4 },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    skills: [
      { name: 'Godot / GDScript', level: 4 },
      { name: 'Python', level: 2 },
      { name: 'Claude Code', level: 2 },
      { name: 'Codex', level: 1 },
      { name: 'Ruby', level: 1 },
    ],
  },
];

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const yearsSince = (start: Date, now: Date) =>
  Math.floor((now.getTime() - start.getTime()) / YEAR_MS);

/** Overall level = full years in the industry; "next level" = days to the next anniversary. */
export function careerStats(now: Date) {
  const level = yearsSince(PROFILE.careerStart, now);
  const next = new Date(PROFILE.careerStart);
  next.setFullYear(PROFILE.careerStart.getFullYear() + level + 1);
  return {
    level,
    nextLevelDays: Math.ceil((next.getTime() - now.getTime()) / DAY_MS),
  };
}

export const topLevel = (id: SkillGroup['id']) =>
  Math.max(...(SKILL_GROUPS.find((g) => g.id === id)?.skills.map((s) => s.level) ?? [0]));
