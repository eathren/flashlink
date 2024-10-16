import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType: 'prompt',
  manifest: {
    name: 'FlashLink',
    short_name: 'FlashLink',
    theme_color: '#000000',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '/',
    scope: '/',
    orientation: 'portrait',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },

      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon'
      }
    ]
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
