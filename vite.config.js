import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/rosario-mobile/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
