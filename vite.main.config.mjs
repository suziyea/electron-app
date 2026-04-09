import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  build: {
    outDir: '.vite/build',
    lib: {
      entry: 'src/main/index.js',
      formats: ['cjs'],
      fileName: 'main'
    }
  }
});
