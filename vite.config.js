import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/xbtheme/', // GitHub Pages 仓库名
  build: {
    outDir: 'public', // 输出到 public 目录
    emptyOutDir: true,
  },
})
