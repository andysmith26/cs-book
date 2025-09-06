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
    // Access the named export (e.g., mod.asteroidsProject)
    const projectKey = `${params.slug}Project`; // Construct the expected export name explicitly
    if (!mod[projectKey]) {
      console.error(`No project export found in module for slug: ${params.slug}`);
      return { notFound: true };
    }
    const project = mod[projectKey];
    return { project };
  } catch (error) {
    console.error(`Error loading project for slug: ${params.slug}`, error);
    return { notFound: true };
  }
};