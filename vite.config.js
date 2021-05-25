import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

const folderLookup = [
  { package: '@agrc/dart-board', folder: 'dartboard', entry: 'Dartboard.jsx'},
  { package: '@agrc/helpers', folder: 'helpers', entry: 'index.js'},
  { package: '@agrc/layer-selector', folder: 'layer-selector', entry: 'LayerSelector.js'},
  { package: '@agrc/mouse-trap', folder: 'mouse-trap', entry: 'index.js'},
  { package: '@agrc/sherlock', folder: 'sherlock', entry: 'index.js'}
];

const item = folderLookup.find(x => x.package === process.env.LERNA_PACKAGE_NAME);
const entry = path.resolve(item.folder, `../src/${item.entry}`);
console.log(entry);
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: entry,
      name: item.folder
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom', '@agrc/helpers'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          '@agrc/helpers': '@agrc/helpers'
        }
      }
    },
    plugins: [reactRefresh()]
  }
});
