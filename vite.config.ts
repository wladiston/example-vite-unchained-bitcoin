import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `unchained-bitcoin` package needs those polyfills to work on the browser
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  resolve: {
    alias: {
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      crypto: "crypto-browserify",
      util: "rollup-plugin-node-polyfills/polyfills/util",
      process: "rollup-plugin-node-polyfills/polyfills/process-es6",
    },
  },
  build: {
    rollupOptions: {
      plugins: [inject({ Buffer: ["Buffer", "Buffer"] }), rollupNodePolyFill()],
    },
  },
});
