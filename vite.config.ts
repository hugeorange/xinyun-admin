import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

import Unocss from 'unocss/vite'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), Unocss({}), legacy({ targets: ['defaults', 'not IE 11'] })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/xinyun-admin/',
})
