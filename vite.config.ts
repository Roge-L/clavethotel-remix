import { reactRouter } from "@react-router/dev/vite";
import { cloudflareDevProxy } from "@react-router/dev/vite/cloudflare";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [cloudflareDevProxy(), reactRouter(), tsconfigPaths()],
  build: {
    // Cloudflare Pages serves these with a 1-year immutable cache (see
    // public/_headers), so content-hashed filenames are what make that safe.
    assetsInlineLimit: 4096,
  },
});
