import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'; 

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@core': '/src/core', // Убедитесь, что путь корректный
      '@components': '/src/components',
      '@utils': '/src/utils',
    },
  },
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
  },
  build: {
    assetsDir: 'assets',
  },
});
