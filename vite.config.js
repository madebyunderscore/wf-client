import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: {
        'doku/main': resolve(__dirname, 'doku/main.js'),
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