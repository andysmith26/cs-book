// /skills/math/modular-arithmetic/index.js

export const modularArithmeticSkill = {
  id: 'math/modular-arithmetic',
  title: 'Modular Arithmetic',
  category: 'math',

  apAlignment: {
    cspBigIdea: 'Algorithms',
    mathStandard: 'HSA.APR.1',
  },

  description:
    'Use remainder operations to identify patterns and cycles in sequences',

  levels: {
    1: 'Calculate remainders and identify when remainder is 0',
    2: 'Use modular arithmetic to find patterns in game positions',
    3: 'Apply modular arithmetic to cryptography or hash functions',
    4: 'Prove properties using modular arithmetic',
  },

  prerequisites: ['programming/operators', 'math/division'],

  learn: {
    explainer: `
      Modular arithmetic finds the remainder after division.
      17 mod 4 = 1 (because 17 = 4×4 + 1)
      
      In Game of Sticks, positions where (n-1) mod 4 = 0 are losing positions!
    `,
    references: [
      { title: 'Khan Academy: Modular Arithmetic', url: '...' },
      { title: 'Interactive Modulo Visualizer', url: '...' },
    ],
  },

  practice: {
    shortDrill: 'modulo-calculator-drill',
    apStyle: 'pattern-finding-mcq',
    miniTask: 'find-cycle-length',
  },

  projectsUsing: [
    'game-of-sticks',
    'cryptography-basics',
    'hash-tables',
  ],

  status: 'current',
};
