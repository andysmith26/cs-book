// /skills/web/hyperlink-graphs/index.js

export const hyperlinkGraphsSkill = {
  id: 'web/hyperlink-graphs',
  title: 'Hyperlink & Navigation',
  category: 'web',

  apAlignment: {
    cspBigIdea: 'Computer Systems & Networks',
  },

  description: 'Design navigable website structures using hyperlinks and understanding information architecture',

  levels: {
    1: 'Create internal/external links and a simple branching structure.',
    2: 'Design navigable graphs (breadcrumbs, back-links) minimizing dead ends.',
    3: 'Model complex flows; visualize and test link graphs for UX clarity.',
  },

  prerequisites: ['web/html-basics'],

  learn: {
    explainer: `
      Web navigation is about creating logical paths between pages:
      
      <a href="page.html">Internal link</a>
      <a href="https://example.com">External link</a>
      <a href="../parent/file.html">Relative path</a>
      
      Think of your site as a graph where nodes are pages and edges are links.
    `,
    references: [
      { title: 'Internal vs external links, relative paths', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks' },
      { title: 'Information architecture basics', url: 'https://www.usability.gov/what-and-why/information-architecture.html' },
    ],
  },

  practice: {
    conceptCheck: 'link-types-and-paths',
    miniTask: 'turn-sketch-into-6-page-link-graph',
    projectTask: 'design-complex-site-navigation',
  },

  projectsUsing: [
    'multi-page-website',
    'documentation-site',
  ],

  status: 'current',
};