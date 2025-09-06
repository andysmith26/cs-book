// /skills/programming/arrays/index.js

export const arraysSkill = {
  id: 'programming/arrays',
  title: 'Arrays',
  category: 'programming',

  apAlignment: {
    csaUnit: '06-arrays',
  },

  description:
    'Store and manipulate collections of data using arrays',

  levels: {
    1: 'Declare, allocate, index, and update arrays of primitives/objects.',
    2: 'Traverse with indices and for-each; write search/count/transform patterns.',
    3: 'Design array-based models with invariants and clear ownership of state.',
  },

  prerequisites: ['programming/variables', 'programming/iteration'],

  learn: {
    explainer: `
      Arrays store multiple values of the same type in a single variable.
      Access elements by index: arr[0] is the first element.
      Arrays have fixed size once created: int[] numbers = new int[10];
    `,
    references: [
      {
        title: 'Array declaration and traversal patterns',
        url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html',
      },
    ],
  },

  practice: {
    shortDrill: 'array-indexing-practice',
    miniTask: 'reverse-array-in-place',
    projectTask: 'compute-running-totals',
  },

  status: 'current',
};
