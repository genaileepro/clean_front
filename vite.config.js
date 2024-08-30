import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://mb.clean-room.co.kr',
        changeOrigin: true,
        secure: false,
      },
      '/partner': {
        target: 'https://pt.clean-room.co.kr',
        changeOrigin: true,
      },
    },
  },
});
