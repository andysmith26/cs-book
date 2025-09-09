import type { PageLoad } from './$types';

const modules = import.meta.glob('/projects/**/index.js');

export const load: PageLoad = async ({ params }) => {
  const entries = Object.entries(modules);
  const match = entries.find(([p]) => p.includes(`/projects/${params.slug}/index.js`));
  
  if (!match) {
    console.error(`No matching JS file found for slug: ${params.slug}`);
    return { notFound: true };
  }
  
  try {
    const mod = await match[1]();
    
    // Look for any export that looks like a project object
    let project = mod.default;
    if (!project) {
      // Find first export with id and title
      const candidates = Object.values(mod).filter(
        v => v && typeof v === 'object' && v.id && v.title
      );
      project = candidates[0];
    }
    
    if (!project) {
      console.error(`No valid project found in module for slug: ${params.slug}`);
      return { notFound: true };
    }
    
    return { project };
  } catch (error) {
    console.error(`Error loading project for slug: ${params.slug}`, error);
    return { notFound: true };
  }
};