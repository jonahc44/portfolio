/**
 * Project catalogue. This is the single source of truth for both the home page
 * ("selected work") and the /projects index.
 *
 * PLACEHOLDER: every entry below is a template. Replace with real work — the
 * shape is what matters, the content is yours.
 */

export type ProjectStatus = 'live' | 'wip' | 'archived'

export type Project = {
  /** URL-safe id. Will become the detail route param when detail pages land. */
  slug: string
  title: string
  /** One line, shown on the card. */
  tagline: string
  /** A short paragraph, shown on the card back / detail page. */
  summary: string
  /** Technologies, in the order you want them read. */
  stack: Array<string>
  year: number
  status: ProjectStatus
  links: {
    repo?: string
    demo?: string
    writeup?: string
  }
  /** Featured projects surface on the home page, ordered by array position. */
  featured: boolean
}

export const projects: Array<Project> = [
  {
    slug: 'placeholder-systems-project',
    title: 'Project One',
    tagline: 'A systems-level thing that does something hard, quickly.',
    summary:
      'Replace this with a real project. Say what problem it solves, the one interesting engineering decision you made, and the result — a number is better than an adjective.',
    stack: ['C++', 'CMake', 'Linux'],
    year: 2026,
    status: 'live',
    links: {
      repo: 'https://github.com/jonahc44',
    },
    featured: true,
  },
  {
    slug: 'placeholder-web-app',
    title: 'Project Two',
    tagline: 'A full-stack application with a real user on the other end.',
    summary:
      'Replace this with a real project. Mention scale or constraints if they were interesting — concurrent users, dataset size, latency budget.',
    stack: ['TypeScript', 'React', 'PostgreSQL'],
    year: 2026,
    status: 'wip',
    links: {
      repo: 'https://github.com/jonahc44',
      demo: '#',
    },
    featured: true,
  },
  {
    slug: 'placeholder-tool',
    title: 'Project Three',
    tagline: 'A developer tool built to scratch a personal itch.',
    summary:
      'Replace this with a real project. Small tools make good portfolio entries when you can explain exactly why the existing options did not fit.',
    stack: ['Python', 'CLI'],
    year: 2025,
    status: 'live',
    links: {
      repo: 'https://github.com/jonahc44',
    },
    featured: true,
  },
  {
    slug: 'placeholder-coursework',
    title: 'Project Four',
    tagline: 'Coursework worth showing, rebuilt past the grade.',
    summary:
      'Replace this with a real project. Academic work counts when you took it further than the assignment required.',
    stack: ['Java', 'Algorithms'],
    year: 2025,
    status: 'archived',
    links: {},
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

/** Every distinct stack entry, sorted, for the /projects filter bar. */
export const allStackTags = [
  ...new Set(projects.flatMap((p) => p.stack)),
].sort((a, b) => a.localeCompare(b))

export const statusLabels: Record<ProjectStatus, string> = {
  live: 'Live',
  wip: 'In progress',
  archived: 'Archived',
}
