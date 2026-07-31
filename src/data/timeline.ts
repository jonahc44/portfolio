/**
 * Education and experience, newest first. Rendered on the about page.
 * PLACEHOLDER: replace with your real history.
 */

export type TimelineEntry = {
  /** e.g. "2024 — Present" */
  period: string
  title: string
  org: string
  kind: 'education' | 'work' | 'other'
  /** Two or three bullets max. Lead with impact, not responsibilities. */
  points: Array<string>
}

export const timeline: Array<TimelineEntry> = [
  {
    period: '2024 — Present',
    title: 'B.S. Computer Science',
    org: 'Your University',
    kind: 'education',
    points: [
      'Coursework in data structures, algorithms, systems programming and databases.',
      'TODO: add GPA, honors, or relevant coursework worth calling out.',
    ],
  },
  {
    period: '2025 — Present',
    title: 'Software Engineering Intern',
    org: 'Company Name',
    kind: 'work',
    points: [
      'TODO: what you built, in one line.',
      'TODO: the measurable outcome — latency, adoption, bugs closed.',
    ],
  },
  {
    period: '2023 — Present',
    title: 'Independent projects',
    org: 'Self-directed',
    kind: 'other',
    points: [
      'Building and shipping side projects end to end — see the work page.',
    ],
  },
]
