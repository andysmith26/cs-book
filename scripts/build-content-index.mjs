import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Function to read and parse project markdown files
function parseProjects() {
  const projectsDir = path.join(rootDir, 'projects');
  const projectDirs = fs.readdirSync(projectsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const projects = [];

  for (const slug of projectDirs) {
    const projectPath = path.join(projectsDir, slug);
    const indexFile = path.join(projectPath, 'index.md');
    
    if (fs.existsSync(indexFile)) {
      try {
        const content = fs.readFileSync(indexFile, 'utf8');
        const { data: frontmatter } = matter(content);
        
        projects.push({
          slug,
          path: `projects/${slug}/index.md`,
          title: frontmatter.title || slug,
          courseFit: frontmatter.courseFit || [],
          skillsRequired: frontmatter.skillsRequired || [],
          skillsSuggested: frontmatter.skillsSuggested || [],
          prerequisites: frontmatter.prerequisites || [],
          status: frontmatter.status || 'draft',
          tags: frontmatter.tags || [],
          legacySource: frontmatter.legacySource,
          lastUpdated: frontmatter.lastUpdated
        });
      } catch (error) {
        console.warn(`Warning: Could not parse project ${slug}:`, error.message);
      }
    }
  }

  return projects;
}

// Function to read skills catalog
function parseSkills() {
  const skillsCatalogPath = path.join(rootDir, 'skills', '_catalog.json');
  
  if (!fs.existsSync(skillsCatalogPath)) {
    console.warn('Skills catalog not found at:', skillsCatalogPath);
    return [];
  }

  try {
    const catalogContent = fs.readFileSync(skillsCatalogPath, 'utf8');
    const catalog = JSON.parse(catalogContent);
    return catalog.skills || [];
  } catch (error) {
    console.warn('Warning: Could not parse skills catalog:', error.message);
    return [];
  }
}

// Main function to build content index
function buildContentIndex() {
  console.log('Building content index...');

  const projects = parseProjects();
  const skills = parseSkills();

  const contentIndex = {
    version: "1.0",
    generatedAt: new Date().toISOString(),
    projects,
    skills
  };

  // Ensure static/data directory exists
  const outputDir = path.join(rootDir, 'static', 'data');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write content index
  const outputPath = path.join(outputDir, 'content-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(contentIndex, null, 2));

  console.log(`Content index generated: ${outputPath}`);
  console.log(`- Projects: ${projects.length}`);
  console.log(`- Skills: ${skills.length}`);
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  buildContentIndex();
}