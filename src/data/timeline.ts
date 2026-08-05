/**
 * Education and experience, newest first. Rendered on the about page.
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
    period: 'January 2025 — Present',
    title: 'Computer Consultant II',
    org: 'University of Michigan',
    kind: 'work',
    points: [
      'Debug the hardware–software interface across 30+ campus facilities, diagnosing RS232 serial communication and network topology failures.',
      'Run real-time incident response over Slack, tightening how resources get allocated during outages.',
    ],
  },
  {
    period: 'October 2024 — Present',
    title: 'AI Lead',
    org: 'UM::Autonomy',
    kind: 'work',
    points: [
      'Lead a 30-person AI team across three subteams — computer vision, navigation and controls, and task planning — with weekly design reviews and code walkthroughs on every pipeline.',
      'Directed integration of deep-learning object detection and LiDAR point cloud classification in ROS2, Python and Docker, improving perception reliability for competition tasks.',
      'Designed a low-latency telemetry and command architecture on Zenoh and Protobuf for reliable bidirectional traffic across 15+ distributed ROS2 nodes.',
    ],
  },
  {
    period: 'Expected December 2026',
    title: 'B.S.E. Computer Science',
    org: 'University of Michigan, Ann Arbor',
    kind: 'education',
    points: [
      'Coursework in data structures, computer organization, practical data science, linear algebra and cybersecurity.',
      'CompTIA A+, Network+ and Security+ certified.',
    ],
  },
]
