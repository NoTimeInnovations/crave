import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // Enable PWA support in development mode for testing
      },
      manifest: {
        name: 'Cravings',
        short_name: 'Cravings',
        description: 'Discover the best food deals and offers in your neighborhood. From cozy cafes to fine dining, we bring you exclusive discounts that will make your taste buds happy and your wallet happier',
        theme_color: '#ea580c',
        icons: [
          {
            src: 'icon-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});