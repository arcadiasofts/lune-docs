// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [mdx(), react()],
  site: 'https://developers.ckdebuggers.com/',

  build: {
    assets: 'assets',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
