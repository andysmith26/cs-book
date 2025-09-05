import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md', '.svx'],
  preprocess: [
    mdsvex(mdsvexConfig)
  ],
  kit: {
    adapter: adapter({
      // fallback: '200.html' // enable if you want SPA-style fallback
    }),
    prerender: {
      handleHttpError: 'warn'
    },
    alias: {
      '$shared': 'src/lib/shared'
    }
  }
};

export default config;
