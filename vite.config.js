import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    react({ include: /src\/components\/react\/.*\.(jsx|tsx)$/ }),
    tailwindcss()
  ],
  assetsInclude: ['**/*.pdf', '**/*.glb'],
})
