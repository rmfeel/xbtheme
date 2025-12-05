import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/xbtheme/', // GitHub Pages 仓库名
  build: {
    outDir: 'docs', // 输出到 docs 目录 (GitHub Pages 支持)
    emptyOutDir: true,
  },
})
