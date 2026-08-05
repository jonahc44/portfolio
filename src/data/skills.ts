/**
 * Skills, grouped for the about page. Kept to things worth defending in an
 * interview — a short honest list reads better than a long one.
 */

export type SkillGroup = {
  title: string
  items: Array<string>
}

export const skillGroups: Array<SkillGroup> = [
  {
    title: 'Languages',
    items: ['C', 'C++', 'Python', 'Java', 'TypeScript', 'JavaScript', 'Lua'],
  },
  {
    title: 'Robotics & Systems',
    items: ['ROS2', 'Zenoh', 'Protobuf', 'Gazebo', 'RViz', 'SDL2', 'Box2D'],
  },
  {
    title: 'Web',
    items: ['React', 'Next.js', 'Tailwind CSS', 'Firebase', 'OAuth'],
  },
  {
    title: 'Tools & Data',
    items: [
      'Git',
      'Docker',
      'Linux',
      'GitHub Actions',
      'NumPy',
      'Pandas',
    ],
  },
  {
    title: 'Certifications',
    items: ['CompTIA A+', 'Network+', 'Security+'],
  },
]
