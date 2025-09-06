// /skills/programming/iteration/index.js

export const iterationSkill = {
  id: 'programming/iteration',
  title: 'Iteration',
  category: 'programming',

  apAlignment: {
    csaUnit: '04-iteration',
    cspBigIdea: 'Algorithms & Programming',
  },

  description: 'Repeat actions using loops and understand iteration patterns',

  levels: {
    1: 'Use counted and conditional loops to repeat actions a fixed/unknown number of times.',
    2: 'Traverse arrays/collections safely; avoid off-by-one; choose while/for/for-each appropriately.',
    3: 'Restructure nested loops for complexity/clarity; explain loop invariants.',
  },

  prerequisites: ['programming/variables', 'programming/conditionals'],

  learn: {
    explainer: `
      Loops let you repeat code efficiently. Three main types:
      
      for (int i = 0; i < 10; i++) { ... }     // counted loop
      while (condition) { ... }                // conditional loop  
      for (String item : collection) { ... }   // for-each loop
    `,
    references: [
      { title: 'For/while/for-each overview', url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html' },
    ],
  },

  practice: {
    shortDrill: 'loop-tracing-exercises',
    miniTask: 'count-occurrences-in-array',
    projectTask: 'animate-stepwise-random-walk',
  },

  projectsUsing: [
    'simulation',
    'data-processing',
    'animation',
  ],

  status: 'current',
};