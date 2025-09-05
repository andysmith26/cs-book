import { defineMDSveXConfig as defineConfig } from 'mdsvex';

const config = defineConfig({
  extensions: ['.md', '.svx'],
  layout: {
    project: './src/lib/layouts/ProjectLayout.svelte',
    _: './src/lib/layouts/DefaultLayout.svelte'
  },
  rehypePlugins: [],
  remarkPlugins: [],
  smartypants: {
    dashes: 'oldschool'
  },
  highlight: {
    highlighter: null // We can add code highlighting later if needed
  }
});

export default config;
