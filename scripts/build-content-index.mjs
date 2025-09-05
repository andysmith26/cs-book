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

function scanSkills() {
  const skillsDir = path.join(projectRoot, 'skills');
  const skills = [];

  if (!fs.existsSync(skillsDir)) {
    console.warn('Skills directory not found');
    return skills;
  }

  // Check for catalog file first
  const catalogPath = path.join(skillsDir, '_catalog.json');
  if (fs.existsSync(catalogPath)) {
    try {
      const catalogContent = fs.readFileSync(catalogPath, 'utf8');
      const catalog = JSON.parse(catalogContent);
      
      // For each skill in catalog, try to find the actual file
      for (const skill of catalog.skills || []) {
        const skillPath = path.join(skillsDir, ...skill.id.split('/'), 'index.md');
        
        if (fs.existsSync(skillPath)) {
          try {
            const content = fs.readFileSync(skillPath, 'utf8');
            const { data: metadata } = matter(content);
            
            skills.push({
              id: skill.id,
              path: `skills/${skill.id}/index.md`,
              title: metadata.title || skill.title,
              category: skill.category,
              apAlignment: skill.apAlignment || metadata.apAlignment || {},
              levels: metadata.levels || {},
              prerequisites: metadata.prerequisites || [],
              status: metadata.status || skill.status || 'draft',
              lastUpdated: metadata.lastUpdated || new Date().toISOString().split('T')[0]
            });
          } catch (error) {
            console.warn(`Error parsing skill ${skill.id}:`, error.message);
            // Include basic info from catalog even if file parsing fails
            skills.push({
              id: skill.id,
              path: `skills/${skill.id}/index.md`,
              title: skill.title,
              category: skill.category,
              apAlignment: skill.apAlignment || {},
              levels: {},
              prerequisites: [],
              status: skill.status || 'draft',
              lastUpdated: new Date().toISOString().split('T')[0]
            });
          }
        } else {
          console.warn(`Skill file not found for ${skill.id}`);
          // Include basic info from catalog even if file doesn't exist
          skills.push({
            id: skill.id,
            path: `skills/${skill.id}/index.md`,
            title: skill.title,
            category: skill.category,
            apAlignment: skill.apAlignment || {},
            levels: {},
            prerequisites: [],
            status: 'missing',
            lastUpdated: new Date().toISOString().split('T')[0]
          });
        }
      }
    } catch (error) {
      console.warn('Error reading skills catalog:', error.message);
    }
  }

  // Also scan for additional skill files not in catalog
  const scanSkillsRecursively = (dir, prefix = '') => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory() && !item.name.startsWith('_')) {
        scanSkillsRecursively(path.join(dir, item.name), prefix ? `${prefix}/${item.name}` : item.name);
      } else if (item.name === 'index.md') {
        const skillId = prefix;
        
        // Check if already included from catalog
        if (!skills.find(s => s.id === skillId)) {
          try {
            const content = fs.readFileSync(path.join(dir, item.name), 'utf8');
            const { data: metadata } = matter(content);
            
            skills.push({
              id: skillId,
              path: `skills/${skillId}/index.md`,
              title: metadata.title || skillId.split('/').pop(),
              category: metadata.category || skillId.split('/')[0],
              apAlignment: metadata.apAlignment || {},
              levels: metadata.levels || {},
              prerequisites: metadata.prerequisites || [],
              status: metadata.status || 'draft',
              lastUpdated: metadata.lastUpdated || new Date().toISOString().split('T')[0]
            });
          } catch (error) {
            console.warn(`Error parsing skill file ${skillId}:`, error.message);
          }
        }
      }
    }
  };

  scanSkillsRecursively(skillsDir);
  
  return skills;
}

function generateContentIndex() {
  console.log('Building content index...');
  
  const projects = scanProjects();
  const skills = scanSkills();
  
  const index = {
    projects,
    skills,
    generated: new Date().toISOString(),
    version: '1.0'
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
  console.log(`  Output: ${outputPath}`);
}

// Run the script
generateContentIndex();

