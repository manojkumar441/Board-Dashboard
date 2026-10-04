import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/Board-Dashboard",
  server: {
    port: 5173,
    host: true
  }
});
