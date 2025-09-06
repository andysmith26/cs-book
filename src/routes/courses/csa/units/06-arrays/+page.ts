import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/data/content-index.json');
  const index = await res.json();
  const skills = index.skills.filter((s) => ['programming/arrays','programming/iteration','oop/classes-objects'].includes(s.id));
  const projects = index.projects.filter((p) => p.slug === 'chemotaxis');
  return { skills, projects };
};
