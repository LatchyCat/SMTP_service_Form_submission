import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    // Add this section to ensure public files are copied
    copyPublicDir: true
  },
  server: {
    port: 3000,
    host: true
  }
})
