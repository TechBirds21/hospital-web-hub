import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Proxy disabled - using fallback data in API service
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8000',
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       configure: (proxy, options) => {
  //         proxy.on('error', (err, req, res) => {
  //           console.warn('Backend proxy error (expected if backend not running):', err.code);
  //         });
  //       },
  //     },
  //   },
  // },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});