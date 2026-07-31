/**
 * Site-wide identity and contact info.
 * PLACEHOLDER: fill in the fields marked TODO with your real details.
 */

export type Social = {
  label: string
  handle: string
  href: string
}

export const profile = {
  /** TODO: add your surname if you want the full name displayed. */
  name: 'Jonah',
  handle: 'jonahc44',
  /** Shown under the hero name, in order. */
  roles: ['Software Engineer', 'Computer Science Student'],
  /** TODO: your city / region. */
  location: 'United States',
  /** TODO: current school + expected graduation. */
  education: 'B.S. Computer Science — in progress',
  email: 'jonahc0508@gmail.com',
  /** One-liner used in the hero. Keep it under ~140 chars. */
  tagline:
    'I build fast, well-structured software — from low-level systems to the interfaces on top of them.',
  /** Longer bio for the about page. Each string renders as a paragraph. */
  bio: [
    "I'm a software engineer and computer science student who likes the parts of the stack most people skip: memory layouts, data flow, the reason a thing is slow. I care about software that's understandable a year after it ships.",
    'Most of my time goes into building things end to end — designing the model, writing the code, and then rewriting the half that turned out wrong. I work mainly in TypeScript, Python, and C/C++, and I pick up whatever a problem actually needs.',
    "Outside of coursework I'm usually reading source code, breaking something on purpose to see how it fails, or over-engineering a side project like this one.",
  ],
  /** TODO: point these at your real accounts. */
  socials: [
    {
      label: 'GitHub',
      handle: '@jonahc44',
      href: 'https://github.com/jonahc44',
    },
    {
      label: 'LinkedIn',
      handle: '/in/jonahc44',
      href: 'https://linkedin.com/in/jonahc44',
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
