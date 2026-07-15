import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://me.vkfolio.com',
  outDir: './docs',
  integrations: [mdx()],
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  server: {
    host: true,
    port: 4321,
  },
});
