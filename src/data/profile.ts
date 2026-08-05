/**
 * Site-wide identity and contact info.
 */

export type Social = {
  label: string
  handle: string
  href: string
}

export const profile = {
  name: 'Jonah Cohen',
  handle: 'jonahc44',
  /** Shown under the hero name, in order. */
  roles: ['Software Engineer', 'Computer Science Student'],
  location: 'Ann Arbor, MI',
  education:
    'B.S.E. Computer Science, University of Michigan — expected December 2026',
  email: 'jonahc0508@gmail.com',
  /** One-liner used in the hero. Keep it under ~140 chars. */
  tagline:
    'I build fast, well-structured software — from autonomy stacks and game engines to the interfaces on top of them.',
  /** Longer bio for the about page. Each string renders as a paragraph. */
  bio: [
    "I'm a computer science student at the University of Michigan and the AI lead on UM::Autonomy, where I run a 30-person team across computer vision, navigation and controls, and task planning. Most of what I know about software came from watching a perception pipeline fail on the water and having to explain why.",
    'I like the parts of the stack most people skip: memory layouts, message boundaries, the reason a thing is slow. That shows up in a 2D game engine I wrote in C++ that resolves collisions between 100,000+ entities, and in a telemetry layer built on Zenoh and Protobuf that keeps 15+ distributed ROS2 nodes talking to shore.',
    "I work end to end when the project calls for it — the photo-sharing site I maintain is React and Next.js on top of a custom OAuth flow I designed against Firebase and Adobe's APIs. I care about software that's still understandable a year after it ships.",
  ],
  socials: [
    {
      label: 'GitHub',
      handle: '@jonahc44',
      href: 'https://github.com/jonahc44',
    },
    {
      label: 'LinkedIn',
      handle: '/in/jonah-cohen',
      href: 'https://www.linkedin.com/in/jonah-cohen-411862308',
    },
    {
      label: 'Email',
      handle: 'jonahc0508@gmail.com',
      href: 'mailto:jonahc0508@gmail.com',
    },
  ] satisfies Array<Social>,
  /** Set to false while you're not looking. Drives the status pill in the header. */
  openToWork: true,
} as const
