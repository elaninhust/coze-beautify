import packageJson from './package.json';
import manifestConfig from './manifest.config';

/**
 * After changing, please reload the extension at `chrome://extensions`
 */
const defaultManifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  permissions: ['storage'],
  icons: {
    '128': 'icon-128.png',
  },
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'icon-128.png',
        'icon-34.png',
      ],
      matches: ['*://*/*'],
    },
  ],
};

function generateManifest(
  config: typeof manifestConfig,
): chrome.runtime.ManifestV3 {
  const manifest = defaultManifest;

  if (config.background) {
    manifest.background = {
      service_worker: 'src/pages/background/index.js',
      type: 'module',
    };
  }

  if (config.content) {
    manifest.content_scripts = [
      {
        matches: ['http://*/*', 'https://*/*', '<all_urls>'],
        js: ['src/pages/content/index.js'],
        // KEY for cache invalidation
        css: ['assets/css/contentStyle<KEY>.chunk.css'],
      },
    ];
  }

  if (config.devtools) {
    manifest.devtools_page = 'src/pages/devtools/index.html';
  }

  if (config.newtab) {
    manifest.chrome_url_overrides = {
      newtab: 'src/pages/newtab/index.html',
    };
  }

  if (config.options) {
    manifest.options_page = 'src/pages/options/index.html';
  }

  if (config.popup) {
    manifest.action = {
      default_popup: 'src/pages/popup/index.html',
      default_icon: 'icon-34.png',
    };
  }

  return manifest;
}

export default generateManifest(manifestConfig);
