// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://austinlallison.com',

  // Needs `site` above, which is already set, so this just works.
  // Emits /sitemap-index.xml at build time.
  integrations: [sitemap()],

  prefetch: {
    /* ClientRouter turns prefetching on by ITSELF, with prefetchAll:
       true — every internal link on the page, not only the ones marked
       with data-astro-prefetch. That default is wrong for the album.

       Each pane's print strip links to /photography/<slug>?plate=NN.
       Those are five distinct URLs to the browser even though they all
       resolve to the same static file, so running a cursor across the
       fan downloads one document five times, and up to twenty across
       the four panes.

       Opt-in instead. The only links worth warming are the four "step
       back to the desk" links, which carry data-astro-prefetch and are
       the ones the pull-back animation depends on being cached. */
    prefetchAll: false,
  },

  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'fix-windows-astro-virtual-extension-bug',
        /* Scoped to the dev server. This hooks an Astro INTERNAL
           (astro:server-app), and the site builds static with no
           adapter, so the module should never appear in a build —
           but "should never" is how a build breaks after an upgrade.
           If the dev-server glitch is ever fixed upstream, this whole
           plugin can go. */
        apply: 'serve',
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
        },
      },
    ],
    optimizeDeps: {
      // Protects the virtual module during standard client pre-bundling scans
      exclude: ['astro:server-app'],
    },
    ssr: {
      optimizeDeps: {
        // Core Fix: Protects the virtual module during server-side re-optimization passes
        exclude: ['astro:server-app'],
      },
    },
  },
});
