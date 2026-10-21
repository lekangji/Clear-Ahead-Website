import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./src/index.html', import.meta.url)),
        how: fileURLToPath(new URL('./src/how-it-works/index.html', import.meta.url)),
        project: fileURLToPath(new URL('./src/project/index.html', import.meta.url)),
        safety: fileURLToPath(new URL('./src/safety-privacy/index.html', import.meta.url)),
      },
    },
  },
});
