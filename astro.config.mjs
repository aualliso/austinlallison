// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'fix-windows-astro-virtual-extension-bug',
        resolveId(id) {
          // Intercepts the extension glitch and maps it to an isolated virtual route
          if (id && id.includes('astro:server-app.js')) {
            return '\0astro:server-app-proxy';
          }
        },
        load(id) {
          // Serves a transparent pass-through bridge that routes cleanly back to Astro
          if (id === '\0astro:server-app-proxy') {
            return `export * from 'astro:server-app';`;
          }
        }
      }
    ],
    optimizeDeps: {
      // Protects the virtual module during standard client pre-bundling scans
      exclude: ['astro:server-app']
    },
    ssr: {
      optimizeDeps: {
        // Core Fix: Protects the virtual module during server-side re-optimization passes
        exclude: ['astro:server-app']
      }
    }
  }
});