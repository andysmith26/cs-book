import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function isInside(parent, child) {
  const rel = path.relative(parent, child);
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

function findIndexJsFiles(baseDir) {
  const results = [];
  if (!fs.existsSync(baseDir)) return results;
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, {
      withFileTypes: true,
    })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith('_')) continue; // ignore underscored folders
        walk(full);
      } else if (entry.isFile() && entry.name === 'index.js') {
        results.push(full);
      }
    }
  };
  walk(baseDir);
  return results;
}

async function loadJsObject(filePath, allowedBase) {
  try {
    const resolved = path.resolve(filePath);
    if (!isInside(allowedBase, resolved)) {
      console.warn(
        `Refusing to load ${filePath} (outside ${allowedBase})`
      );
      return null;
    }
    const url = `file://${resolved}`;
    const mod = await import(url);
    const exports = Object.values(mod).filter(
      (e) => e && typeof e === 'object'
    );
    if (
      exports.length === 0 &&
      mod.default &&
      typeof mod.default === 'object'
    ) {
      exports.unshift(mod.default);
    }
    // pick first export that looks like a content object
    for (const ex of exports) {
      if (ex.id && ex.title) return ex;
    }
    return null;
  } catch (err) {
    console.warn(`Failed to import ${filePath}: ${err.message}`);
    return null;
  }
}

function normalizeSkill(skill, relPath) {
  // light normalization and required fields check
  if (!skill.id || !skill.title || !skill.category) {
    throw new Error(
      `Invalid skill object (missing id/title/category) at ${relPath}`
    );
  }
  return {
    id: String(skill.id),
    title: String(skill.title),
    category: String(skill.category),
    path: relPath,
    description: skill.description || undefined,
    apAlignment: skill.apAlignment || {},
    levels: skill.levels || {},
    prerequisites: Array.isArray(skill.prerequisites)
      ? skill.prerequisites
      : [],
    status: skill.status || 'current',
    lastUpdated:
      skill.lastUpdated || new Date().toISOString().split('T')[0],
    learn: skill.learn || undefined,
    practice: skill.practice || undefined,
    hasContent: true,
  };
}

function normalizeProject(proj, relPath) {
  if (!proj.id || !proj.title) {
    throw new Error(
      `Invalid project object (missing id/title) at ${relPath}`
    );
  }
  return {
    id: String(proj.id),
    title: String(proj.title),
    path: relPath,
    slug: String(proj.id), // Add slug field derived from id
    courseFit: Array.isArray(proj.courseFit) ? proj.courseFit : [],
    skillsRequired: Array.isArray(proj.skillsRequired)
      ? proj.skillsRequired
      : [],
    skillsSuggested: Array.isArray(proj.skillsSuggested)
      ? proj.skillsSuggested
      : [],
    prerequisites: Array.isArray(proj.prerequisites)
      ? proj.prerequisites
      : [],
    status: proj.status || 'current',
    tags: Array.isArray(proj.tags) ? proj.tags : [],
    legacySource: proj.legacySource || undefined,
    lastUpdated:
      proj.lastUpdated || new Date().toISOString().split('T')[0],
    timeToComplete: proj.timeToComplete || undefined,
    difficulty: proj.difficulty || undefined,
  };
}

async function buildIndex() {
  console.log('Building content index (JS-only) ...');

  const projectsDir = path.join(projectRoot, 'projects');
  const skillsDir = path.join(projectRoot, 'skills');

  const projectFiles = findIndexJsFiles(projectsDir);
  const skillFiles = findIndexJsFiles(skillsDir);

  const projects = [];
  for (const file of projectFiles) {
    const rel = path.relative(projectRoot, file).replace(/\\/g, '/');
    const obj = await loadJsObject(file, projectsDir);
    if (!obj) {
      console.warn(`No valid project export found in ${rel}`);
      continue;
    }
    try {
      projects.push(normalizeProject(obj, rel));
    } catch (err) {
      console.warn(err.message);
    }
  }

  const skills = [];
  for (const file of skillFiles) {
    const rel = path.relative(projectRoot, file).replace(/\\/g, '/');
    const obj = await loadJsObject(file, skillsDir);
    if (!obj) {
      console.warn(`No valid skill export found in ${rel}`);
      continue;
    }
    try {
      skills.push(normalizeSkill(obj, rel));
    } catch (err) {
      console.warn(err.message);
    }
  }

  // derive projectsUsing for skills (do not require it in skill sources)
  const skillToProjects = new Map();
  for (const s of skills) skillToProjects.set(s.id, []);
  for (const p of projects) {
    const collect = (list) => {
      if (!Array.isArray(list)) return;
      for (const ref of list) {
        const id = ref?.id || ref;
        if (!id) continue;
        if (!skillToProjects.has(id)) skillToProjects.set(id, []);
        skillToProjects.get(id).push(p.id);
      }
    };
    collect(p.skillsRequired);
    collect(p.skillsSuggested);
  }
  // attach projectsUsing (optional) to skill objects
  for (const sk of skills) {
    sk.projectsUsing = skillToProjects.get(sk.id) || [];
  }

  const index = {
    projects,
    skills,
    generated: new Date().toISOString(),
    version: '1.0-js-only',
  };

  const outDir = path.join(projectRoot, 'static', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'content-index.json');
  fs.writeFileSync(outPath, JSON.stringify(index, null, 2), 'utf8');

  console.log(
    `✓ Wrote ${outPath} — ${projects.length} projects, ${skills.length} skills.`
  );
}

buildIndex().catch((err) => {
  console.error('Error building content index:', err);
  process.exitCode = 1;
});
