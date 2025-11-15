import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/orion': {
        target: 'http://3.85.188.98:1026',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/orion/, ''),
      },
    },
  },
})
