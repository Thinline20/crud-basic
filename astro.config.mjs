import node from "@astrojs/node";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: "standalone",
  }),
  integrations: [tailwind(), solidJs()],
  output: "server",
  vite: {
    optimizeDeps: {
      exclude: ["oslo"],
    },
  },
});
