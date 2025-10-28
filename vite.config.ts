import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import type { IncomingMessage, ServerResponse } from "http";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    fs: {
      allow: [
        path.resolve(__dirname),
        path.resolve(__dirname, 'node_modules'),
      ],
    },
  },
  plugins: [
    react(),
    nodePolyfills(),
    // Ensure correct content-type for wasm and serve UMD bundle correctly
    {
      name: 'fhe-sdk-middleware',
      configureServer(server: any) {
        server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
          if (req.url) {
            // Set correct MIME type for WASM files
            if (req.url.endsWith('.wasm')) {
              res.setHeader('Content-Type', 'application/wasm');
            }
            // Set correct MIME type for UMD bundle
            if (req.url.includes('.umd.cjs')) {
              res.setHeader('Content-Type', 'application/javascript');
            }
          }
          next();
        });
      },
    },
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.wasm"],
  define: {
    global: "globalThis",
  },
  build: {
    // Production build optimizations
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-toast',
            '@radix-ui/react-alert-dialog',
          ],
          // Use SDK web entry to avoid bundle global dependency
          'vendor-fhe': ['@zama-fhe/relayer-sdk/web', 'ethers', 'viem'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development',
  },
  optimizeDeps: {
    // Pre-bundle the SDK web entry explicitly
    include: ['react', 'react-dom', 'ethers', '@zama-fhe/relayer-sdk/web'],
    exclude: ['@zama-fhe/relayer-sdk'],
    esbuildOptions: {
      loader: {
        '.wasm': 'file',
      },
    },
  },
  worker: {
    format: 'es',
  },
}));
