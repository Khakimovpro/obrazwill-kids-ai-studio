import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode, isSsrBuild }) => {
    const env = loadEnv(mode, '.', '');

    const base = {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };

    if (isSsrBuild) {
      return {
        ...base,
        build: {
          // SSR bundle goes to dist/server/ so it doesn't mix with client assets
          ssr: true,
          outDir: 'dist/server',
          rollupOptions: {
            input: path.resolve(__dirname, 'entry-server.tsx'),
            output: {
              // Predictable name so prerender.mjs can import it reliably
              entryFileNames: 'entry-server.js',
            },
          },
        },
      };
    }

    return base;
});
