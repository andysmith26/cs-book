// /skills/oop/classes-objects/index.js

export const classesObjectsSkill = {
  id: 'oop/classes-objects',
  title: 'Classes & Objects',
  category: 'oop',

  apAlignment: {
    csaUnit: '05-writing-classes',
  },

  description: 'Create and use classes to model objects with state and behavior',

  levels: {
    1: 'Instantiate objects and access fields/methods.',
    2: 'Design a class with state and behavior; enforce encapsulation.',
    3: 'Decompose a system into cooperating classes with clear contracts.',
  },

  prerequisites: ['programming/variables', 'programming/methods'],

  learn: {
    explainer: `
      Classes are blueprints for creating objects. An object is an instance of a class
      that has its own state (fields) and behavior (methods).
      
      In Java: class Car { ... }  →  Car myCar = new Car();
    `,
    references: [
      { title: 'Java class & object basics', url: 'https://docs.oracle.com/javase/tutorial/java/javaOO/' },
      { title: 'Greenfoot/Processing docs: creating objects', url: 'https://www.greenfoot.org/doc' },
    ],
  },

  practice: {
    conceptCheck: 'identify-class-vs-object',
    miniTask: 'write-simple-car-class',
    projectTask: 'design-cooperating-classes',
  },

  projectsUsing: [
    'greenfoot-scenarios',
    'processing-animations',
  ],

  status: 'current',
};