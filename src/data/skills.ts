/**
 * Skills, grouped for the about page and the home page marquee.
 * PLACEHOLDER: trim this to what you'd actually be comfortable defending in an
 * interview — a short honest list reads better than a long one.
 */

export type SkillGroup = {
  title: string
  items: Array<string>
}

export const skillGroups: Array<SkillGroup> = [
  {
    title: 'Languages',
    items: ['TypeScript', 'Python', 'C', 'C++', 'Java', 'SQL', 'Bash'],
  },
  {
    title: 'Web',
    items: ['React', 'Node.js', 'Tailwind CSS', 'REST', 'Vite'],
  },
  {
    title: 'Systems & Data',
    items: ['Linux', 'PostgreSQL', 'Docker', 'Git', 'Data structures'],
  },
  {
    title: 'Currently learning',
    items: ['Rust', 'Distributed systems', 'WebGL'],
  },
]

/** Flat list used by the scrolling ticker on the home page. */
export const skillTicker = skillGroups
  .filter((g) => g.title !== 'Currently learning')
  .flatMap((g) => g.items)
