export const asteroidsProject = {
  id: 'asteroids',
  title: 'Asteroids',
  courseFit: [{ course: 'csa', unit: '09-inheritance' }],
  skillsRequired: [
    { id: 'oop/classes-objects', level: 2 },
    { id: 'oop/inheritance', level: 2 },
    { id: 'programming/conditionals', level: 2 },
    { id: 'programming/iteration', level: 2 },
  ],
  skillsSuggested: [
    { id: 'oop/polymorphism', level: 1 },
    { id: 'tooling/git-basics', level: 1 },
  ],
  prerequisites: [
    { type: 'skill', id: 'programming/methods', level: 1 },
  ],
  status: 'current',
  tags: ['java', 'greenfoot', 'oop', 'game'],
  legacySource: 'instructions/Asteroids/',
  lastUpdated: '2025-09-05',
  timeToComplete: '2-3 weeks',
  difficulty: 'intermediate',
  brief:
    'Build a simplified Asteroids game in Java/Greenfoot demonstrating classes/objects, inheritance, conditionals, and iteration.',
  preflight:
    "Tick the checklist above. Review any skills you're unsure about.",
  buildSteps: [
    'Design your class diagram (Ship, Asteroid, Bullet, World).',
    'Implement base behaviors; then extend with specialized subclasses.',
    'Add game loop rules (spawn, collide, score).',
  ],
  rubric:
    'Inheritance hierarchy designed and used (oop/inheritance L2); Loop logic drives game reliably (programming/iteration L2); Class responsibilities clear (oop/classes-objects L2)',
  submit: 'GitHub repo link, short demo video, one-page poster.',
};

export default asteroidsProject;
