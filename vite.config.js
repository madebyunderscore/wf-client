import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'doku/main': 'doku/main.js',
      },
      formats: ['es'],
    },
    outDir: 'dist',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        entryFileNames: '[name].min.js',
      },
    },
  },
});