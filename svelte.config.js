import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    mdsvex({
      extensions: ['.md', '.svx']
    })
  ],
  kit: {
    adapter: adapter({
      // fallback: '200.html' // enable if you want SPA-style fallback
    }),
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
