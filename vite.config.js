import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mb.clean-room.co.kr',
        changeOrigin: true,
      },
      '/partner': {
        target: 'https://pt.clean-room.co.kr',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/partner/, ''),
      },
    },
  },
});
