import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    root: 'frontend',

    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/.*\/api\/.*/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24, // 24 hours
                },
              },
            },
            {
              urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                },
              },
            },
          ],
          cleanupOutdatedCaches: true,
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'ToolsWonder',
          short_name: 'ToolsWonder',
          description: 'Your Daily Tools, All in One Place - Over 35+ online tools for image editing, document conversion, calculations, and more',
          theme_color: '#3b82f6',
          background_color: '#f8fafc',
          display: 'standalone',
          orientation: 'portrait',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: 'android/android-launchericon-192-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'android/android-launchericon-512-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'android/android-launchericon-192-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
      }),
    ],

    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    build: {
      outDir: '../dist',      // ✅ IMPORTANT
      emptyOutDir: true,      // ✅ cleans old builds
    },

    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'frontend'),
      },
    },
  };
});
