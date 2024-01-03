import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';

import manifest from './manifest';
import makeManifest from './utils/plugins/make-manifest';
import customDynamicImport from './utils/plugins/custom-dynamic-import';
import addHmr from './utils/plugins/add-hmr';
import watchRebuild from './utils/plugins/watch-rebuild';

import manifestConfig from './manifest.config';

import type { InputOption } from 'rollup';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');
const pagesDir = resolve(srcDir, 'pages');
const assetsDir = resolve(srcDir, 'assets');
const sharedDir = resolve(srcDir, 'shared');
const outDir = resolve(rootDir, 'dist');
const publicDir = resolve(rootDir, 'public');

const isDev = process.env.__DEV__ === 'true';
const isProduction = !isDev;

const enableHmrInBackgroundScript = true;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@root': rootDir,
      '@src': srcDir,
      '@pages': pagesDir,
      '@assets': assetsDir,
      '@shared': sharedDir,
    },
  },
  plugins: [
    react(),
    makeManifest(manifest, {
      isDev,
      contentScriptCssKey: regenerateCacheInvalidationKey(),
    }),
    customDynamicImport(),
    addHmr({
      background: enableHmrInBackgroundScript,
      view: true,
    }),
    watchRebuild(),
  ],
  publicDir,
  build: {
    outDir,
    /** Can slowDown build speed. */
    // sourcemap: isDev,
    minify: isProduction,
    modulePreload: false,
    reportCompressedSize: isProduction,
    rollupOptions: {
      input: generateRollupInputOptions(manifestConfig),
      output: {
        entryFileNames: 'src/pages/[name]/index.js',
        chunkFileNames: isDev
          ? 'assets/js/[name].js'
          : 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = path.parse(assetInfo.name);
          const assetFolder = dir.split('/').at(-1);
          const name = assetFolder + firstUpperCase(_name);

          if (name === 'Style') {
            // 专门处理 contentStyle
            return `assets/css/contentStyle${cacheInvalidationKey}.chunk.css`;
          }

          // 其他资源
          return `assets/[ext]/${name}.chunk.[ext]`;
        },
      },
    },
  },
});

function generateRollupInputOptions(
  config: typeof manifestConfig,
): InputOption {
  const input: InputOption = {};

  if (config.background) {
    input.background = resolve(pagesDir, 'background', 'index.ts');
  }

  if (config.content) {
    input.content = resolve(pagesDir, 'content', 'index.ts');
    input.contentStyle = resolve(pagesDir, 'content', 'style.pcss');
  }

  if (config.devtools) {
    input.devtools = resolve(pagesDir, 'devtools', 'index.html');
    input.panel = resolve(pagesDir, 'panel', 'index.html');
  }

  if (config.newtab) {
    input.newtab = resolve(pagesDir, 'newtab', 'index.html');
  }

  if (config.options) {
    input.options = resolve(pagesDir, 'options', 'index.html');
  }

  if (config.popup) {
    input.popup = resolve(pagesDir, 'popup', 'index.html');
  }

  return input;
}

function firstUpperCase(str: string) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, 'g');
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase());
}

let cacheInvalidationKey: string = generateKey();
function regenerateCacheInvalidationKey() {
  cacheInvalidationKey = generateKey();
  return cacheInvalidationKey;
}

function generateKey(): string {
  return `${(Date.now() / 100).toFixed()}`;
}
