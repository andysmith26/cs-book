// /skills/tooling/git-basics/index.js

export const gitBasicsSkill = {
  id: 'tooling/git-basics',
  title: 'Git & GitHub Basics',
  category: 'tooling',

  apAlignment: {},

  description: 'Use Git for version control and GitHub for collaboration',

  levels: {
    1: 'Clone/fork, commit, push; submit via GitHub link.',
    2: 'Branch for features; open pull requests; resolve simple conflicts.',
    3: 'Structure repos; write actionable commits and READMEs.',
  },

  prerequisites: [],

  learn: {
    explainer: `
      Git tracks changes to your code over time. Key workflow:
      1. Clone a repository: git clone <url>
      2. Make changes to files
      3. Stage changes: git add .
      4. Commit changes: git commit -m "Description"
      5. Push to GitHub: git push
    `,
    references: [
      { title: 'Git basics: add/commit/push', url: 'https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository' },
      { title: 'GitHub workflow guide', url: 'https://guides.github.com/introduction/flow/' },
    ],
  },

  practice: {
    conceptCheck: 'git-workflow-understanding',
    miniTask: 'make-change-on-branch-open-pr',
    projectTask: 'structure-repo-with-readme',
  },

  projectsUsing: [
    'all-coding-projects',
  ],

  status: 'current',
};