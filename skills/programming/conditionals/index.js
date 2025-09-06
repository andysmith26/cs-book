// /skills/programming/conditionals/index.js

export const conditionalsSkill = {
  id: 'programming/conditionals',
  title: 'Conditionals',
  category: 'programming',

  apAlignment: {
    csaUnit: '03-booleans-if',
    cspBigIdea: 'Algorithms & Programming',
  },

  description:
    'Control program flow using boolean expressions and conditional statements',

  levels: {
    1: 'Write simple if/else statements using boolean expressions.',
    2: 'Combine logical operators; structure nested conditionals for clarity.',
    3: 'Refactor complex conditionals using guard clauses or polymorphism.',
  },

  prerequisites: ['programming/variables'],

  learn: {
    explainer: `
      Conditionals let your program make decisions based on data.
      Use if/else to execute different code paths:
      
      if (score >= 90) {
          grade = "A";
      } else if (score >= 80) {
          grade = "B";
      } else {
          grade = "C";
      }
    `,
    references: [
      {
        title: 'If/else basics in Java',
        url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html',
      },
      {
        title: 'Boolean operators (&&, ||, !)',
        url: 'https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op2.html',
      },
    ],
  },

  practice: {
    shortDrill: 'boolean-expression-evaluation',
    miniTask: 'method-returns-different-strings',
    projectTask: 'number-guessing-game',
  },

  status: 'current',
};
