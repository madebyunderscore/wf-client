import { defineConfig } from 'vite';
import { resolve } from 'path';
import fg from 'fast-glob';

// Auto-discover all JS and CSS files inside the doku folder
const jsFiles = fg.sync('client/**/doku/**/*.js');
const cssFiles = fg.sync('client/**/doku/**/*.css');

// Manually include shared files that aren't under doku/
const extraShared = ['shared/swiper.css']; // You can also use swiper.css if preferred

// Build the input map for Vite
const input = {};
[...jsFiles, ...cssFiles, ...extraShared].forEach((file) => {
  const name = file.replace(/\.(js|css)$/, ''); // strip extension
  input[name] = resolve(__dirname, file);
});

export default defineConfig({
  build: {
    rollupOptions: {
      input,
      output: {
        // JS outputs
        entryFileNames: '[name].min.js',
        assetFileNames: (assetInfo) => {
          const path = assetInfo.name.replace(/\.(css|js)$/, '');
          return `${path}.min.[ext]`;
        },
      },
    },
    outDir: 'dist',
    minify: 'esbuild',
  },
});