import { defineConfig } from 'vite';

export default defineConfig({
  // Configuration options go here
  preview: {
    port: 3000
  },
  server: {
    port: 3000 
  },
  build: {
    assetsDir: 'assets',
  },
});
