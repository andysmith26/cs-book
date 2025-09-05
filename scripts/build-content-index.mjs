import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function scanProjects() {
  const projectsDir = path.join(projectRoot, 'projects');
  const projects = [];

  if (!fs.existsSync(projectsDir)) {
    console.warn('Projects directory not found');
    return projects;
  }

  const projectFolders = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const folder of projectFolders) {
    const projectPath = path.join(projectsDir, folder);
    const indexMdPath = path.join(projectPath, 'index.md');
    
    // Check for markdown file
    if (fs.existsSync(indexMdPath)) {
      try {
        const content = fs.readFileSync(indexMdPath, 'utf8');
        const { data: metadata } = matter(content);
        
        projects.push({
          slug: folder,
          path: `projects/${folder}/index.md`,
          title: metadata.title || folder,
          ...metadata
        });
      } catch (error) {
        console.warn(`Error parsing project ${folder}:`, error.message);
      }
    } else {
      // Check for Svelte component or JS file for interactive projects
      const svelteIndexPath = path.join(projectPath, 'index.svelte');
      const jsIndexPath = path.join(projectPath, 'index.js');
      
      if (fs.existsSync(svelteIndexPath) || fs.existsSync(jsIndexPath)) {
        // For interactive projects without markdown, create a basic entry
        console.warn(`Project ${folder} has components but no index.md - creating basic entry`);
        projects.push({
          slug: folder,
          path: `projects/${folder}/`,
          title: folder.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          status: 'component-only',
          tags: ['interactive'],
          type: 'interactive'
        });
      }
    }
  }

  return projects;
}

// Simplified skill schema helpers for JavaScript-only skills
const skillSchemaHelpers = {
  createSkillFromJavaScript: function(skillObject, filePath) {
    return {
      id: skillObject.id,
      title: skillObject.title,
      category: skillObject.category,
      path: filePath,
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
  },
  
  createSkillFromCatalog: function(catalogEntry, filePath) {
    return {
      id: catalogEntry.id,
      title: catalogEntry.title,
      category: catalogEntry.category,
      path: filePath,
      apAlignment: catalogEntry.apAlignment || {},
      levels: {},
      prerequisites: [],
      status: 'missing',
      lastUpdated: new Date().toISOString().split('T')[0],
      hasContent: false
    };
  }
};

async function loadJavaScriptSkill(skillPath) {
  try {
    // Use dynamic import to load the JavaScript skill file
    const fullPath = `file://${path.resolve(skillPath)}`;
    const module = await import(fullPath);
    
    // Look for exported skill objects
    const skillExports = Object.values(module).filter(exp => 
      exp && typeof exp === 'object' && exp.id && exp.title && exp.category
    );
    
    if (skillExports.length > 0) {
      return skillExports[0]; // Take the first valid skill export
    }
    
    return null;
  } catch (error) {
    console.warn(`Error loading JavaScript skill from ${skillPath}:`, error.message);
    return null;
  }
}

function scanSkills() {
  const skillsDir = path.join(projectRoot, 'skills');
  const skills = [];

  if (!fs.existsSync(skillsDir)) {
    console.warn('Skills directory not found');
    return skills;
  }

  // Check for catalog file first
  const catalogPath = path.join(skillsDir, '_catalog.json');
  let catalogSkills = [];
  
  if (fs.existsSync(catalogPath)) {
    try {
      const catalogContent = fs.readFileSync(catalogPath, 'utf8');
      const catalog = JSON.parse(catalogContent);
      catalogSkills = catalog.skills || [];
    } catch (error) {
      console.warn('Error reading skills catalog:', error.message);
    }
  }

  // Scan for JavaScript skill files only
  const scanSkillsRecursively = async (dir, prefix = '') => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory() && !item.name.startsWith('_')) {
        await scanSkillsRecursively(path.join(dir, item.name), prefix ? `${prefix}/${item.name}` : item.name);
      } else if (item.name === 'index.js') {
        const skillId = prefix;
        if (!skillId) continue; // Skip root level files
        
        const filePath = path.join(dir, item.name);
        const relativeFilePath = `skills/${skillId}/index.js`;
        
        // Check if already processed
        if (skills.find(s => s.id === skillId)) {
          continue;
        }
        
        // Process JavaScript skill
        try {
          const skillObject = await loadJavaScriptSkill(filePath);
          if (skillObject) {
            const skill = skillSchemaHelpers.createSkillFromJavaScript(skillObject, relativeFilePath);
            skills.push(skill);
          } else {
            console.warn(`No valid skill export found in ${filePath}`);
          }
        } catch (error) {
          console.warn(`Error parsing JavaScript skill ${skillId}:`, error.message);
        }
      }
    }
  };

  return scanSkillsRecursively(skillsDir).then(() => {
    // Add missing skills from catalog that weren't found as files
    for (const catalogEntry of catalogSkills) {
      if (!skills.find(s => s.id === catalogEntry.id)) {
        console.warn(`Skill file not found for ${catalogEntry.id}`);
        const skill = skillSchemaHelpers.createSkillFromCatalog(
          catalogEntry, 
          `skills/${catalogEntry.id}/index.js`
        );
        skills.push(skill);
      }
    }
    
    return skills;
  });
}

function generateContentIndex() {
  console.log('Building content index...');
  
  const projects = scanProjects();
  
  // scanSkills now returns a Promise
  return scanSkills().then(skills => {
    const index = {
      projects,
      skills,
      generated: new Date().toISOString(),
      version: '2.0'
    };

    // Ensure static/data directory exists
    const outputDir = path.join(projectRoot, 'static', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the index
    const outputPath = path.join(outputDir, 'content-index.json');
    fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));

    console.log(`✓ Generated content index with ${projects.length} projects and ${skills.length} skills`);
    console.log(`  Projects: ${projects.map(p => p.slug).join(', ')}`);
    console.log(`  All skills are JavaScript-based`);
    console.log(`  Output: ${outputPath}`);
  });
}

// Run the script
generateContentIndex();

