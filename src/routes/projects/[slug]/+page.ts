import type { PageLoad } from './$types';

const modules = import.meta.glob('/projects/**/index.md');

export const load: PageLoad = async ({ params }) => {
  const entries = Object.entries(modules);
  const match = entries.find(([p]) => p.includes(`/projects/${params.slug}/index.md`));
  if (!match) return { notFound: true };
  const mod = await match[1]();
  return { mod };
};
