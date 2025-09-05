import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  // If you later deploy to GitHub Pages under a subpath, set base accordingly
  // base: '/woodstockcs.github.io/',
  server: {
    fs: {
      // allow reading markdown content from project root
      allow: ['.']
    }
  }
});
