export const cyoaProject = {
  id: 'cyoa',
  title: 'Choose Your Own Adventure (CYOA)',
  courseFit: [
    { course: 'csp', unit: '03-algorithms-programming' },
    { course: 'csp', unit: '04-computer-systems-networks' },
  ],
  skillsRequired: [
    { id: 'web/html-basics', level: 1 },
    { id: 'web/hyperlink-graphs', level: 1 },
  ],
  skillsSuggested: [
    { id: 'web/css-basics', level: 1 },
    { id: 'tooling/git-basics', level: 1 },
  ],
  status: 'current',
  tags: ['html', 'css', 'ux', 'narrative'],
  legacySource: 'instructions/cyoa/',
  lastUpdated: '2025-09-05',
  timeToComplete: '1 week',
  difficulty: 'beginner',
  brief:
    'Create a multi-page branching narrative website with clear navigation and no dead ends.',
  preflight:
    'Sketch your link graph. Ensure every page has a way forward and back.',
  buildSteps: [
    'index.html introduces the story and choices.',
    'Create branch pages; ensure consistent nav/breadcrumbs.',
    'Validate HTML; basic responsive CSS.',
  ],
  rubric:
    'Semantic HTML and valid structure (web/html-basics L1); Navigable link graph (web/hyperlink-graphs L1)',
  submit: 'GitHub Pages URL.',
};

export default cyoaProject;
