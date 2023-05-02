//import { resolve } from 'path'

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mapbox-vanilla/',
  assetsInclude: ['**/*.geojson'],
  build: {
    emptyOutDir: true,
    // assetsInclude: ['**/*.geojson'],
  //   rollupOptions: {
  //     output: {
        
  //       assetFileNames: ({ name }) => {
  //         // if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
  //         //     return 'assets/images/[name]-[hash][extname]';
  //         // }

  //         // if (/\.css$/.test(name ?? '')) {
  //         //     return 'assets/css/[name]-[hash][extname]';
  //         // }
  //         if (/\.geojson$/.test(name ?? '')) {
  //           return 'assets/data/[name]-[hash][extname]';
  //         }
  //         // default value
  //         // ref: https://rollupjs.org/guide/en/#outputassetfilenames
  //         return 'assets/[name]-[hash][extname]';
  //       },
  //     },
  //   },
  },
});
