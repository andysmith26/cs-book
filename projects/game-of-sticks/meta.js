export const projectMeta = {
  id: 'game-of-sticks',
  title: 'Game of Sticks: Build an AI That Learns',

  courseFit: [
    { course: 'ai', unit: '02-reinforcement-learning' },
    { course: 'csp', unit: '03-algorithms-programming' },
    { course: 'math', unit: 'discrete-probability' },
  ],

  skillsRequired: [
    { skillId: 'programming/iteration', level: 1 },
    { skillId: 'programming/conditionals', level: 1 },
    { skillId: 'math/modular-arithmetic', level: 2 },
    { skillId: 'math/probability-basics', level: 2 },
    { skillId: 'ai/reinforcement-learning', level: 2 },
  ],

  skillsSuggested: [
    { skillId: 'math/pattern-recognition', level: 1 },
    { skillId: 'programming/arrays', level: 1 },
    { skillId: 'data/visualize', level: 1 },
    { skillId: 'tooling/debugging', level: 1 },
  ],

  prerequisites: ['programming/variables'],

  rubric: {
    criteria: [
      {
        description: 'Correctly implements game rules',
        skillId: 'programming/conditionals',
        levelTarget: 1,
        points: 20,
      },
      {
        description: 'Discovers and proves optimal strategy',
        skillId: 'math/modular-arithmetic',
        levelTarget: 2,
        points: 30,
      },
      {
        description:
          'Implements learning AI with probability distributions',
        skillId: 'ai/reinforcement-learning',
        levelTarget: 2,
        points: 30,
      },
      {
        description: 'Visualizes AI learning progress',
        skillId: 'data/visualize',
        levelTarget: 1,
        points: 20,
      },
    ],
  },

  evidence: {
    required: ['working-game', 'ai-implementation', 'pattern-proof'],
    format: ['live-demo', 'code-repo', 'written-analysis'],
  },

  status: 'current',
};