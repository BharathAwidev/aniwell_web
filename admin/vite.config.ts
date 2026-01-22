import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  server: {
    port: 5173,
    host: true,
    open: true,
    
    // 🔥 ADD THIS PROXY CONFIGURATION
    proxy: {
      '/api': {
        target: 'http://apitaskmgt.biyss.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      }
    }
  },
  
  // Optional: For better imports
  resolve: {
    alias: {
      '@': '/src',
      '@lib': '/src/lib',
    }
  }
})