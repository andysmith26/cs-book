// Unified skill schema that supports both index.md and index.js formats

export interface SkillLevel {
  [key: string]: string;
  1?: string;
  2?: string;
  3?: string;
  4?: string;
  L1?: string;
  L2?: string;
  L3?: string;
}

export interface APAlignment {
  csaUnit?: string;
  cspBigIdea?: string;
  mathStandard?: string;
  aiStandard?: string;
  [key: string]: string | undefined;
}

export interface LearnSection {
  explainer?: string;
  references?: Array<{
    title: string;
    url: string;
  }>;
  interactiveDemo?: string;
}

export interface PracticeSection {
  shortDrill?: string;
  apStyle?: string;
  miniTask?: string;
  conceptCheck?: string;
}

export interface SkillSchema {
  id: string;
  title: string;
  category: string;
  path: string;
  
  // Core metadata
  description?: string;
  apAlignment?: APAlignment;
  levels?: SkillLevel;
  prerequisites?: string[];
  status: 'draft' | 'current' | 'deprecated' | 'missing' | 'component-only';
  lastUpdated?: string;
  
  // Rich content (primarily from .js files)
  learn?: LearnSection;
  practice?: PracticeSection;
  projectsUsing?: string[];
  
  // Source information
  source: 'markdown' | 'javascript' | 'catalog';
  hasContent?: boolean;
}

/**
 * Normalize levels from different formats to a consistent structure
 */
export function normalizeLevels(levels: any): SkillLevel {
  if (!levels) return {};
  
  const normalized: SkillLevel = {};
  
  // Handle numbered keys (1, 2, 3, 4) from JS files
  for (let i = 1; i <= 4; i++) {
    if (levels[i]) {
      normalized[i.toString()] = levels[i];
    }
  }
  
  // Handle L1, L2, L3 keys from markdown files
  ['L1', 'L2', 'L3'].forEach(key => {
    if (levels[key]) {
      normalized[key] = levels[key];
    }
  });
  
  // Handle any other string keys
  Object.keys(levels).forEach(key => {
    if (!['1', '2', '3', '4', 'L1', 'L2', 'L3'].includes(key)) {
      normalized[key] = levels[key];
    }
  });
  
  return normalized;
}

/**
 * Create a unified skill object from markdown frontmatter
 */
export function createSkillFromMarkdown(
  id: string,
  metadata: any,
  path: string
): SkillSchema {
  return {
    id,
    title: metadata.title || id.split('/').pop() || 'Untitled',
    category: metadata.category || id.split('/')[0] || 'uncategorized',
    path,
    description: metadata.description,
    apAlignment: metadata.apAlignment || {},
    levels: normalizeLevels(metadata.levels),
    prerequisites: metadata.prerequisites || [],
    status: metadata.status || 'draft',
    lastUpdated: metadata.lastUpdated,
    source: 'markdown',
    hasContent: true
  };
}

/**
 * Create a unified skill object from JavaScript export
 */
export function createSkillFromJavaScript(
  skillObject: any,
  path: string
): SkillSchema {
  return {
    id: skillObject.id,
    title: skillObject.title,
    category: skillObject.category,
    path,
    description: skillObject.description,
    apAlignment: skillObject.apAlignment || {},
    levels: normalizeLevels(skillObject.levels),
    prerequisites: skillObject.prerequisites || [],
    status: skillObject.status || 'current',
    lastUpdated: new Date().toISOString().split('T')[0],
    learn: skillObject.learn,
    practice: skillObject.practice,
    projectsUsing: skillObject.projectsUsing || [],
    source: 'javascript',
    hasContent: true
  };
}

/**
 * Create a basic skill object from catalog entry (when file is missing)
 */
export function createSkillFromCatalog(
  catalogEntry: any,
  path: string
): SkillSchema {
  return {
    id: catalogEntry.id,
    title: catalogEntry.title,
    category: catalogEntry.category,
    path,
    apAlignment: catalogEntry.apAlignment || {},
    levels: {},
    prerequisites: [],
    status: 'missing',
    lastUpdated: new Date().toISOString().split('T')[0],
    source: 'catalog',
    hasContent: false
  };
}