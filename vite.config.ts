import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path-browserify';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  }
})
