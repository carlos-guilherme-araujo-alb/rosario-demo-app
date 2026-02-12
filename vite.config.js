import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/rosario-demo-app/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
