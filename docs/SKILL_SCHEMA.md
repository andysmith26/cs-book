# Unified Skill Schema

This document describes the unified skill schema that supports both `index.md` (markdown) and `index.js` (JavaScript) skill files.

## Overview

The WoodstockCS site now supports skills defined in two formats:

1. **Markdown format** (`index.md`): YAML frontmatter with markdown content
2. **JavaScript format** (`index.js`): Rich JavaScript objects with embedded content

The unified schema normalizes both formats into a consistent structure while preserving the unique features of each format.

## Schema Structure

```typescript
interface SkillSchema {
  id: string;                    // Required: unique skill identifier
  title: string;                 // Required: display title
  category: string;              // Required: skill category
  path: string;                  // Required: file path
  
  // Core metadata
  description?: string;          // Rich description (mainly from JS files)
  apAlignment?: APAlignment;     // AP/CSA/CSP alignment
  levels?: SkillLevel;          // Learning levels (normalized)
  prerequisites?: string[];      // Required prerequisite skills
  status: SkillStatus;          // draft | current | deprecated | missing
  lastUpdated?: string;         // ISO date string
  
  // Rich content (primarily from JS files)
  learn?: LearnSection;         // Learning resources and explanations
  practice?: PracticeSection;   // Practice activities
  projectsUsing?: string[];     // Projects that use this skill
  
  // Source tracking
  source: 'markdown' | 'javascript' | 'catalog';
  hasContent?: boolean;         // Whether actual content exists
}
```

## Level Normalization

The schema normalizes different level formats:

### Markdown Format (L1, L2, L3)
```yaml
levels:
  L1: 'Write simple if/else statements using boolean expressions.'
  L2: 'Combine logical operators; structure nested conditionals for clarity.'
  L3: 'Refactor complex conditionals using guard clauses or polymorphism.'
```

### JavaScript Format (1, 2, 3, 4)
```javascript
levels: {
  1: 'Calculate remainders and identify when remainder is 0',
  2: 'Use modular arithmetic to find patterns in game positions',
  3: 'Apply modular arithmetic to cryptography or hash functions',
  4: 'Prove properties using modular arithmetic',
}
```

Both are preserved in the unified schema as-is, allowing consumers to handle the different formats appropriately.

## File Formats

### Markdown Skills (`index.md`)

```markdown
---
title: 'Conditionals'
category: 'programming'
apAlignment:
  csaUnit: '03-booleans-if'
  cspBigIdea: 'Algorithms & Programming'
levels:
  L1: 'Write simple if/else statements using boolean expressions.'
  L2: 'Combine logical operators; structure nested conditionals for clarity.'
  L3: 'Refactor complex conditionals using guard clauses or polymorphism.'
prerequisites: ['programming/variables']
status: 'current'
lastUpdated: '2025-09-05'
---

### Learn
- If/else basics in Java
- Boolean operators (&&, ||, !)

### Practice
- Write a method that returns different strings based in input value
- Implement a simple number-guessing game
```

### JavaScript Skills (`index.js`)

```javascript
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

## Build Process

The build script (`scripts/build-content-index.mjs`) now:

1. **Scans for both formats**: Looks for both `index.md` and `index.js` files
2. **Processes JavaScript**: Uses dynamic imports to load and validate JS skill exports
3. **Normalizes data**: Converts both formats into the unified schema
4. **Preserves rich content**: Maintains `learn`, `practice`, and `projectsUsing` sections from JS files
5. **Tracks sources**: Records whether each skill came from markdown, JavaScript, or catalog

## Usage

To add a new skill:

### Simple Skill (Markdown)
Create `skills/category/skill-name/index.md` with frontmatter.

### Rich Skill (JavaScript)
Create `skills/category/skill-name/index.js` with an exported skill object.

### Validation
Run `npm run build:index` to rebuild the index and `node scripts/test-skill-schema.mjs` to validate.

## Benefits

1. **Backward Compatibility**: Existing markdown skills continue to work unchanged
2. **Rich Content Support**: JavaScript skills can include complex learning materials and practice activities
3. **Consistent API**: All skills are normalized into a predictable structure
4. **Source Tracking**: Consumers can handle different source types appropriately
5. **Future Extensibility**: Easy to add new skill formats or fields

## Migration

No migration is required. The unified schema:
- Preserves all existing markdown skills as-is
- Automatically includes JavaScript skills that were previously ignored
- Maintains backward compatibility with existing consumers