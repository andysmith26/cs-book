// /projects/game-of-sticks/index.js

export const gameOfSticksProject = {
  id: 'game-of-sticks',
  title: 'Game of Sticks: Build an AI That Learns',

  courseFit: [
    { course: 'ai', unit: '02-reinforcement-learning' },
    { course: 'csp', unit: '03-algorithms-programming' },
    { course: 'math', unit: 'discrete-probability' },
  ],

  skillsRequired: [
    { skillId: 'programming/iteration', level: 1 },
    { skillId: 'programming/conditionals', level: 1 },
    { skillId: 'math/modular-arithmetic', level: 2 },
    { skillId: 'math/probability-basics', level: 2 },
    { skillId: 'ai/reinforcement-learning', level: 2 },
  ],

  skillsSuggested: [
    { skillId: 'math/pattern-recognition', level: 1 },
    { skillId: 'programming/arrays', level: 1 },
    { skillId: 'data/visualize', level: 1 },
    { skillId: 'tooling/debugging', level: 1 },
  ],

  prerequisites: ['programming/variables'],

  rubric: {
    criteria: [
      {
        description: 'Correctly implements game rules',
        skillId: 'programming/conditionals',
        levelTarget: 1,
        points: 20,
      },
      {
        description: 'Discovers and proves optimal strategy',
        skillId: 'math/modular-arithmetic',
        levelTarget: 2,
        points: 30,
      },
      {
        description:
          'Implements learning AI with probability distributions',
        skillId: 'ai/reinforcement-learning',
        levelTarget: 2,
        points: 30,
      },
      {
        description: 'Visualizes AI learning progress',
        skillId: 'data/visualize',
        levelTarget: 1,
        points: 20,
      },
    ],
  },

  evidence: {
    required: ['working-game', 'ai-implementation', 'pattern-proof'],
    format: ['live-demo', 'code-repo', 'written-analysis'],
  },

  status: 'current',

  brief:
    "Build an interactive game where you play against an AI that learns and improves its strategy over time. The Game of Sticks is a simple two-player game that's perfect for exploring concepts in artificial intelligence, pattern recognition, and reinforcement learning.",
  gameRules: [
    'Start with 21 sticks',
    'Players take turns removing 1, 2, or 3 sticks',
    'The player forced to take the last stick loses',
    'Can you find the winning strategy?',
  ],
  interactiveDemo:
    'GameBoard component (placeholder for Svelte integration)',
  learningObjectives: [
    'Understand Game Theory: Discover optimal strategies through play and analysis',
    'Implement AI Logic: Build different AI personalities from random to strategic',
    'Explore Machine Learning: Create an AI that learns from experience',
    'Practice Problem Solving: Find patterns and prove mathematical strategies',
  ],
  buildSteps: [
    'Play and Understand: Play the game manually (pencil and paper); Record outcomes and look for patterns; Develop hypotheses about winning strategies',
    'Code the Game: Implement basic game rules and validation; Create a simple user interface; Add a random AI opponent',
    'Smart Strategy: Research optimal strategy (hint: think about multiples of 4); Implement a "smart" AI that plays optimally; Test against the smart AI',
    'Learning AI: Design a learning system that tracks move outcomes; Implement probability-based decision making; Train AI through repeated games',
    'Analysis and Extension: Visualize AI learning progress; Write mathematical proof of optimal strategy; Extend to other similar games (e.g., different starting numbers)',
  ],
  assessmentRubric:
    'Game Implementation (25%): Correctly implements rules and user interface; Strategic Analysis (25%): Discovers and explains optimal strategy; AI Development (30%): Implements effective learning algorithm; Mathematical Proof (20%): Provides rigorous proof of strategy',
  extensions: [
    'Variable Starting Numbers: How does strategy change with different starting stick counts?',
    'Multi-Player: Adapt the game for 3+ players',
    'Network Play: Allow players to compete online',
    'Tournament Mode: Run AI vs AI tournaments to test different strategies',
    'Visualization: Create graphs showing AI learning curves',
  ],
  submit:
    "Code Repository: Well-documented GitHub repo with implementation; Strategy Analysis: Written explanation of optimal strategy with mathematical proof; AI Performance Report: Data showing learning AI's improvement; Demo Video: 3-minute video demonstrating game and AI capabilities",
  resources: [
    'Game Theory Basics (placeholder link)',
    'Reinforcement Learning Introduction (placeholder link)',
    'Mathematical Proof Techniques (placeholder link)',
  ],
};
