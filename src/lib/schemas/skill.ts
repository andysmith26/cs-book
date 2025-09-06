// Skill schema for JavaScript-based skill definitions

export interface SkillLevel {
  [key: string]: string;
  1?: string;
  2?: string;
  3?: string;
  4?: string;
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
  projectTask?: string;
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
  status: 'draft' | 'current' | 'deprecated' | 'missing';
  lastUpdated?: string;
  
  // Rich content
  learn?: LearnSection;
  practice?: PracticeSection;
  projectsUsing?: string[];
  
  hasContent: boolean;
}

/**
 * Create a skill object from JavaScript export
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
    levels: skillObject.levels || {},
    prerequisites: skillObject.prerequisites || [],
    status: skillObject.status || 'current',
    lastUpdated: new Date().toISOString().split('T')[0],
    learn: skillObject.learn,
    practice: skillObject.practice,
    projectsUsing: skillObject.projectsUsing || [],
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
    hasContent: false
  };
}