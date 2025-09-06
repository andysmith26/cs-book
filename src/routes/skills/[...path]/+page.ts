import type { PageLoad } from './$types';

// replace markdown glob with JS-only glob and return a consistent { skill } payload
const modules = import.meta.glob('/skills/**/index.js');

export const load: PageLoad = async ({ params }) => {
  const full = params.path; // e.g. 'programming/variables'
  const key = `/skills/${full}/index.js`;
  const loader = modules[key];
  if (!loader) {
    console.warn(`No loader found for skill: ${full}`);
    return { notFound: true };
  }

  try {
    const mod = await loader();

    // Prefer default export; fall back to first matching named export that looks like a skill
    let skill = mod?.default;
    if (!skill) {
      const candidates = Object.values(mod).filter(
        (v) => v && typeof v === 'object' && v.id && v.title && v.category
      );
      skill = candidates[0] ?? null;
    }

    if (!skill || !skill.title) {
      console.warn(`Skill module loaded but invalid or missing title for ${full}:`, skill);
      return { notFound: true };
    }

    // Ensure canonical fields exist (minimal normalization)
    skill.prerequisites = skill.prerequisites ?? [];
    skill.levels = skill.levels ?? {};
    skill.learn = skill.learn ?? {};
    skill.practice = skill.practice ?? {};
    skill.projectsUsing = skill.projectsUsing ?? [];

    return { skill };
  } catch (error) {
    console.error(`Error loading skill ${full}:`, error);
    return { notFound: true };
  }
};
