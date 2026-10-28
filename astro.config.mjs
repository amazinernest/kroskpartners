import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kroskpartners.com',
  output: 'static',
  build: {
    format: 'directory'
  }
});
