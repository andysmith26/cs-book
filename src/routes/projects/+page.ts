import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch('/data/content-index.json');
  const index = await res.json();
  return { index };
};
