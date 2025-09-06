// /skills/oop/inheritance/index.js

export const inheritanceSkill = {
  id: 'oop/inheritance',
  title: 'Inheritance',
  category: 'oop',

  apAlignment: {
    csaUnit: '09-inheritance',
  },

  description: 'Use inheritance to create specialized classes that extend base functionality',

  levels: {
    1: 'Create a simple subclass that extends a concrete superclass and overrides one method correctly.',
    2: 'Design a shallow hierarchy with appropriate fields/methods; use super and override with correct access and contracts.',
    3: 'Refactor a hierarchy for reuse; choose inheritance vs composition and justify.',
  },

  prerequisites: ['oop/classes-objects', 'programming/methods'],

  learn: {
    explainer: `
      Inheritance lets you create specialized classes based on existing classes.
      The subclass inherits all non-private fields and methods from the superclass
      and can override methods to change behavior.
      
      Example: class Student extends Person { ... }
    `,
    references: [
      { title: 'Official Java tutorials on inheritance', url: 'https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html' },
      { title: 'Greenfoot docs: subclassing Actor', url: 'https://www.greenfoot.org/doc' },
    ],
  },

  practice: {
    conceptCheck: 'inheritance-vs-composition',
    miniTask: 'extend-actor-add-movement',
    projectTask: 'refactor-similar-classes-superclass',
  },

  projectsUsing: [
    'greenfoot-scenarios',
    'game-entities',
  ],

  status: 'current',
};