import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // 新しいバージョンをデプロイしたら、次回起動時に黙って入れ替える。
      // 祖父に「更新しますか?」を見せないための設定。
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: '四字熟語クイズ',
        short_name: '熟語クイズ',
        description: 'じいちゃんとクイズ大会をしよう!',
        lang: 'ja',
        // ホーム画面から全画面で起動し、アドレスバーとタブを出さない
        display: 'standalone',
        // orientation は指定しない。
        // Android の一部端末では landscape 固定の PWA がホーム画面から起動できない。
        start_url: '/',
        scope: '/',
        background_color: '#f7f4ee',
        theme_color: '#f7f4ee',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
