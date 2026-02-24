import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      base: '/AI-Internship-Advisor/',
      plugins: [react()],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
          },
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
