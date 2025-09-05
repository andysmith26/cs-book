# JavaScript Skill Schema

This document describes the JavaScript-based skill schema for WoodstockCS skills.

## Overview

All skills are defined as JavaScript modules that export skill objects. This format provides:

- **Rich Content**: Support for complex learning materials, explanations, and practice activities
- **Structured Data**: Programmatic access to skill metadata and relationships
- **Type Safety**: Clear schema definitions for consistency
- **Future Extensibility**: Easy to add new fields and functionality

## Schema Structure

```typescript
interface SkillSchema {
  id: string;                    // Required: unique skill identifier
  title: string;                 // Required: display title
  category: string;              // Required: skill category
  path: string;                  // Required: file path
  
  // Core metadata
  description?: string;          // Rich description
  apAlignment?: APAlignment;     // AP/CSA/CSP alignment
  levels?: SkillLevel;          // Learning levels (1, 2, 3, 4)
  prerequisites?: string[];      // Required prerequisite skills
  status: SkillStatus;          // draft | current | deprecated | missing
  
  // Rich content
  learn?: LearnSection;         // Learning resources and explanations
  practice?: PracticeSection;   // Practice activities
  projectsUsing?: string[];     // Projects that use this skill
  
  hasContent: boolean;          // Whether actual content exists
}
```

## Level System

Skills use numbered levels (1, 2, 3, 4) to indicate increasing complexity:

```javascript
levels: {
  1: 'Calculate remainders and identify when remainder is 0',
  2: 'Use modular arithmetic to find patterns in game positions',
  3: 'Apply modular arithmetic to cryptography or hash functions',
  4: 'Prove properties using modular arithmetic',
}
```

## File Format

All skills are defined in `skills/category/skill-name/index.js` files:

```javascript
// skills/math/modular-arithmetic/index.js

export const modularArithmeticSkill = {
  id: 'math/modular-arithmetic',
  title: 'Modular Arithmetic',
  category: 'math',
  
  apAlignment: {
    cspBigIdea: 'Algorithms',
    mathStandard: 'HSA.APR.1',
  },
  
  description: 'Use remainder operations to identify patterns and cycles in sequences',
  
  levels: {
    1: 'Calculate remainders and identify when remainder is 0',
    2: 'Use modular arithmetic to find patterns in game positions',
    3: 'Apply modular arithmetic to cryptography or hash functions',
    4: 'Prove properties using modular arithmetic',
  },
  
  prerequisites: ['programming/operators', 'math/division'],
  
  learn: {
    explainer: `
      Modular arithmetic finds the remainder after division.
      17 mod 4 = 1 (because 17 = 4×4 + 1)
      
      In Game of Sticks, positions where (n-1) mod 4 = 0 are losing positions!
    `,
    references: [
      { title: 'Khan Academy: Modular Arithmetic', url: '...' },
      { title: 'Interactive Modulo Visualizer', url: '...' },
    ],
  },
  
  practice: {
    shortDrill: 'modulo-calculator-drill',
    apStyle: 'pattern-finding-mcq',
    miniTask: 'find-cycle-length',
  },
  
  projectsUsing: ['game-of-sticks', 'cryptography-basics', 'hash-tables'],
  status: 'current',
};
```

## Rich Content Sections

### Learn Section
Provides learning resources and explanations:

```javascript
learn: {
  explainer: `Multi-line explanation with examples...`,
  references: [
    { title: 'Resource Title', url: 'https://...' }
  ],
  interactiveDemo: 'demo-component-name'
}
```

### Practice Section
Defines practice activities:

```javascript
practice: {
  shortDrill: 'quick-practice-activity',
  conceptCheck: 'understanding-check',
  miniTask: 'small-coding-task',
  projectTask: 'larger-project-based-task',
  apStyle: 'ap-exam-style-question'
}
```

## Build Process

The build script (`scripts/build-content-index.mjs`):

1. **Scans for JavaScript files**: Looks for `index.js` files in the skills directory
2. **Loads and validates**: Uses dynamic imports to load skill objects
3. **Generates index**: Creates a unified content index for consumption

## Usage

### Adding a New Skill

1. Create directory: `skills/category/skill-name/`
2. Create file: `skills/category/skill-name/index.js`
3. Export skill object with required fields
4. Run `npm run build:index` to rebuild the index

### Validation

Run the build script to validate all skills:

```bash
npm run build:index
```

Any validation errors will be reported in the console.

## Benefits

1. **Consistent Format**: Single format eliminates complexity and confusion
2. **Rich Content**: Support for detailed explanations, examples, and practice activities
3. **Programmatic Access**: Easy to consume and manipulate skill data
4. **Type Safety**: Clear schema definitions prevent errors
5. **Future-Proof**: Easy to extend with new fields and functionality

## Migration Complete

All existing skills have been converted to the JavaScript format, providing:
- Consistent structure across all skills
- Enhanced content capabilities
- Simplified build and validation process