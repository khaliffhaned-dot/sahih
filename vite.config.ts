import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load environment variables dynamically based on mode and process.cwd()
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    define: {
      // Inject environment variables for Cloud Run microservice architecture build with robust fallbacks
      __VERIFY_ENGINE_URL__: JSON.stringify(env.VERIFY_ENGINE_URL || process.env.VERIFY_ENGINE_URL || ''),
      __GEMINI_API_KEY__: JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''),
      'process.env.VERIFY_ENGINE_URL': JSON.stringify(env.VERIFY_ENGINE_URL || process.env.VERIFY_ENGINE_URL || ''),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
