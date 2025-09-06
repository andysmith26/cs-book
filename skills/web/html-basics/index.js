// /skills/web/html-basics/index.js

export const htmlBasicsSkill = {
  id: 'web/html-basics',
  title: 'HTML Basics',
  category: 'web',

  apAlignment: {
    cspBigIdea: 'Computer Systems & Networks',
  },

  description:
    'Structure web pages using HTML elements and semantic markup',

  levels: {
    1: 'Structure a page with semantic elements and valid nesting; link assets.',
    2: 'Compose multi-page sites with consistent layout and accessible markup.',
    3: 'Author reusable fragments; reason about document outline and ARIA basics.',
  },

  prerequisites: [],

  learn: {
    explainer: `
      HTML (HyperText Markup Language) structures web content using elements:
      
      <h1>Title</h1>
      <p>Paragraph with <a href="url">link</a></p>
      <img src="image.jpg" alt="Description">
      
      Use semantic elements like <header>, <main>, <nav>, <article>
    `,
    references: [
      {
        title: 'HTML elements and document structure',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      },
      { title: 'HTML validator', url: 'https://validator.w3.org/' },
    ],
  },

  practice: {
    conceptCheck: 'semantic-vs-presentational-markup',
    miniTask: 'build-simple-multi-section-page',
    projectTask: 'validate-accessible-markup',
  },

  status: 'current',
};
