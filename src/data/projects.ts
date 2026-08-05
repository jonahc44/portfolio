/**
 * Project catalogue. This is the single source of truth for both the home page
 * ("selected work") and the /projects index.
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
    slug: 'game-engine',
    title: '2D Game Engine',
    tagline: 'A from-scratch C++ engine that resolves 100,000+ entities.',
    summary:
      'A custom 2D game engine built in modern C++ on SDL2 and Box2D. Collision detection runs on a spatial hash, which is what makes interactions between 100,000+ entities tractable instead of quadratic. An embedded Lua environment exposes a scripting API for component management, and RapidJSON handles engine configuration so scenes scale without recompiling.',
    stack: ['C++', 'SDL2', 'Box2D', 'Lua', 'RapidJSON'],
    year: 2026,
    status: 'live',
    links: {},
    featured: true,
  },
  {
    slug: 'autonomy-perception-stack',
    title: 'Autonomous Surface Vessel Stack',
    tagline: 'Perception and telemetry for a competition autonomous boat.',
    summary:
      'The AI stack behind UM::Autonomy’s competition vessel. Deep-learning object detection and LiDAR point cloud classification run as ROS2 nodes in Docker, feeding navigation and task planning. Telemetry and command traffic move over Zenoh and Protobuf — a low-latency bidirectional layer across 15+ distributed nodes — and the whole thing is validated in Gazebo and RViz before it touches water.',
    stack: ['Python', 'ROS2', 'Docker', 'Zenoh', 'Protobuf', 'Gazebo'],
    year: 2024,
    status: 'wip',
    links: {},
    featured: true,
  },
  {
    slug: 'photo-website',
    title: 'Photographer Website',
    tagline: 'Full-stack photo sharing with a hand-rolled OAuth flow.',
    summary:
      'A photo-sharing site in React and Next.js with a responsive TailwindCSS interface. The interesting half is the auth: a custom OAuth flow against Firebase Auth and the Adobe APIs, hardened against CSRF and XSS with cryptographic state validation and HTTP-only signed cookies. Adobe handles upload and image processing, Firebase Storage handles the data, and GitHub Actions deploys the whole stack to Firebase Hosting.',
    stack: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Firebase'],
    year: 2025,
    status: 'live',
    links: {
      repo: 'https://github.com/jonahc44/photo-website',
    },
    featured: true,
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
