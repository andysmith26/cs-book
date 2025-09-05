import type { PageLoad } from './$types';
const modules = import.meta.glob('/skills/**/index.md');

export const load: PageLoad = async ({ params }) => {
  const full = params.path; // e.g. 'oop/inheritance'
  const key = `/skills/${full}/index.md`;
  const loader = modules[key];
  if (!loader) return { notFound: true };
  const mod = await loader();
  return { mod };
};
