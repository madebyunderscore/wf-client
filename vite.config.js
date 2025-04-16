import { defineConfig } from 'vite';
import { resolve } from 'path';
import fg from 'fast-glob';

// Auto-discover all JS and CSS files inside the doku folder
const jsFiles = fg.sync('client/**/doku/**/*.js').concat(fg.sync('client/**/doku/*.js'));
const cssFiles = fg.sync('client/**/doku/**/*.css');

// Manually include shared files that aren't under doku/
const extraShared = ['shared/swiper.css', 'shared/keen.css']; // You can also use swiper.css if preferred

// Build the input map for Vite
const input = {};

// First add JS files
jsFiles.forEach((file) => {
  const name = file.replace(/\.js$/, '');
  input[name] = resolve(__dirname, file);
});

// Then add CSS only if not already defined
cssFiles.concat(extraShared).forEach((file) => {
  const name = file.replace(/\.css$/, '');
  if (!input[name]) {
    input[name] = resolve(__dirname, file);
  }
});
console.log('Vite build input files:', Object.keys(input));
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