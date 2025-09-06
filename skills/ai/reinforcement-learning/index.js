// /skills/ai/reinforcement-learning/index.js

export const reinforcementLearningSkill = {
  id: 'ai/reinforcement-learning',
  title: 'Reinforcement Learning Basics',
  category: 'ai',

  apAlignment: {
    cspBigIdea: 'Algorithms',
    aiStandard: 'K12-AI.3-5.DL.1',
  },

  description: 'Implement learning through trial, error, and reward',

  levels: {
    1: 'Understand reward/punishment concept',
    2: 'Implement basic Q-learning or probability adjustment',
    3: 'Optimize learning rates and exploration strategies',
    4: 'Apply RL to complex environments',
  },

  prerequisites: ['math/probability-basics', 'programming/arrays'],

  learn: {
    explainer: `
      Reinforcement learning: AI learns by trying actions and 
      remembering what worked. Like training a pet - reward 
      good behavior, discourage bad behavior.
    `,
    interactiveDemo: 'rl-ball-and-hat-simulator',
  },

  practice: {
    shortDrill: 'reward-calculation',
    conceptCheck: 'identify-rl-components',
    miniTask: 'train-simple-agent',
  },

  projectsUsing: ['game-of-sticks', 'smart-rockets', 'maze-solver'],

  status: 'current',
};
