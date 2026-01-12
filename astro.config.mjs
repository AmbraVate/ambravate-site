import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://ambravate.com',
  output: 'static',
  integrations: [sitemap(), react(), tailwind()],
});
