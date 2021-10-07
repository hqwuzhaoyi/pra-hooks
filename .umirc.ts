import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'pra-hooks',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  publicPath: '/pra-hooks/',
  base: '/pra-hooks/',
  resolve: {
    includes: [
      'docs',
      'packages/pra-hooks/src',
      'packages/use-backforth',
      'packages/Carousel',
    ],
  },
  // more config: https://d.umijs.org/config
});
