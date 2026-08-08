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
    links: {
      repo: 'https://github.com/jonahc44/game_engine',
    },
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
  {
    slug: 'h753-node',
    title: 'STM32H7 Telemetry Node',
    tagline: 'A bare-metal FreeRTOS node that sleeps until the DMA wakes it.',
    summary:
      'Firmware for an STM32H753 telemetry node, written in C on FreeRTOS. Ingestion, crypto, and transmit each run as their own task. The receive path uses UART idle-line detection with DMA into a ring buffer placed in a non-cacheable SRAM region, so the ingest task spends its time blocked on a thread flag rather than polling — the DMA interrupt is what wakes it. Built with CMake against a CubeMX-generated HAL.',
    stack: ['C', 'FreeRTOS', 'STM32 HAL', 'DMA', 'CMake'],
    year: 2026,
    status: 'wip',
    links: {
      repo: 'https://github.com/jonahc44/h753-node',
    },
    featured: false,
  },
  {
    slug: 'rp64-nixos',
    title: 'RockPro64 NixOS Host',
    tagline: 'A declarative single-board Linux host with CAN bus on SPI.',
    summary:
      'The whole configuration for a RockPro64 running NixOS, as a flake. The interesting part is the hardware: an MCP2515 CAN controller hangs off SPI, brought up through a device-tree overlay and a systemd oneshot that raises can0 at 500 kbit/s. Secrets are managed with sops-nix and decrypted against the host SSH key, and impermanence keeps the root filesystem disposable — the machine is reproducible from the repo alone.',
    stack: ['Nix', 'NixOS', 'SocketCAN', 'systemd', 'sops-nix'],
    year: 2026,
    status: 'live',
    links: {
      repo: 'https://github.com/jonahc44/rp64-nixos',
    },
    featured: false,
  },
  {
    slug: 'ai-tutor',
    title: 'AI Tutor',
    tagline: 'A split chat-and-editor interface for learning to code.',
    summary:
      'A browser workspace that puts a conversation next to a code editor, so an explanation and the code it refers to stay on screen together. Built on Next.js and React 19 with a Radix and Tailwind component layer. Still early — the interface is in place and the tutoring loop behind it is the part I am building out.',
    stack: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Radix UI'],
    year: 2026,
    status: 'wip',
    links: {
      repo: 'https://github.com/jonahc44/ai-tutor',
    },
    featured: false,
  },
  {
    slug: 'qb-model',
    title: 'How Important Is the Quarterback?',
    tagline: 'A win-rate model that predicts a season to within 1.71 games.',
    summary:
      'An inference model that takes a team’s quarterback statistics for a season and predicts its regular-season win rate — a way to ask whether a QB is playing to standard, or whether the rest of the roster is over- or underperforming relative to them. I pulled 2006–2024 passing and rushing data from Pro Football Reference (~2,800 player-seasons), regrouped it by team and year, weighted rate stats like QBR by games played, and normalized counting stats per game so the move to a 17-game season didn’t skew older years. Ridge regression with cross-validated alpha and polynomial features lands at 1.71 games of mean absolute error, down from 2.25 for the baseline.',
    stack: ['Python', 'pandas', 'scikit-learn', 'Plotly', 'Jekyll'],
    year: 2025,
    status: 'live',
    links: {
      repo: 'https://github.com/jonahc44/qb-model',
      writeup: 'https://jonahc44.github.io/qb-model/',
    },
    featured: false,
  },
  {
    slug: 'discord-music-bot',
    title: 'Discord Music Bot',
    tagline: 'YouTube and Spotify playback in voice chat.',
    summary:
      'A TypeScript Discord bot that resolves YouTube and Spotify links, queues them, and streams the audio into a voice channel. Written against discord.js with slash commands registered at deploy time and a small queue model wrapping each track. No longer maintained — the upstream extraction libraries it depended on stopped working.',
    stack: ['TypeScript', 'Node.js', 'discord.js'],
    year: 2024,
    status: 'archived',
    links: {
      repo: 'https://github.com/jonahc44/DiscordBot',
    },
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
