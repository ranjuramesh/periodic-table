import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/periodic-table/',
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,  // Fail if port is in use (instead of auto-incrementing)
  },
})
