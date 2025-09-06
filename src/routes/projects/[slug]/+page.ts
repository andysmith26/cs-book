import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

const modules = import.meta.glob('/projects/**/index.md');

export const load: PageLoad = async ({ params }) => {
  try {
    const entries = Object.entries(modules);
    const match = entries.find(([p]) => p.includes(`/projects/${params.slug}/index.md`));
    
    if (!match) {
      // Check for interactive projects without markdown
      const interactiveProjectPath = `/projects/${params.slug}/index.svelte`;
      const jsProjectPath = `/projects/${params.slug}/index.js`;
      
      try {
        // Try to import the interactive project
        const interactiveModules = import.meta.glob('/projects/**/index.svelte');
        const jsModules = import.meta.glob('/projects/**/index.js');
        
        const interactiveMatch = Object.entries(interactiveModules).find(([p]) => 
          p.includes(`/projects/${params.slug}/index.svelte`)
        );
        
        const jsMatch = Object.entries(jsModules).find(([p]) => 
          p.includes(`/projects/${params.slug}/index.js`)
        );
        
        if (interactiveMatch) {
          const mod = await interactiveMatch[1]();
          return { 
            type: 'interactive', 
            mod,
            slug: params.slug
          };
        }
        
        if (jsMatch) {
          const mod = await jsMatch[1]();
          return { 
            type: 'js-config', 
            mod,
            slug: params.slug
          };
        }
      } catch (e) {
        console.warn(`Error loading interactive project ${params.slug}:`, e);
      }
      
      // Project not found
      throw error(404, {
        message: `Project "${params.slug}" not found`,
        hint: 'Check the project name in the URL or browse all projects from the projects page.'
      });
    }
    
    const mod = await match[1]();
    
    // Validate that the module has expected structure
    if (!mod || typeof mod !== 'object') {
      throw error(500, {
        message: `Project "${params.slug}" failed to load properly`,
        hint: 'The project file may be corrupted or have invalid frontmatter.'
      });
    }
    
    return { 
      type: 'markdown',
      mod,
      slug: params.slug
    };
    
  } catch (e) {
    if (e.status) {
      // Re-throw SvelteKit errors
      throw e;
    }
    
    // Handle unexpected errors
    console.error(`Unexpected error loading project ${params.slug}:`, e);
    throw error(500, {
      message: `Unexpected error loading project "${params.slug}"`,
      hint: 'This may be a temporary issue. Please try again later.'
    });
  }
};
