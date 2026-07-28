// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Jost",
      cssVariable: "--font-sans",
      fallbacks: ["system-ui", "sans-serif"],
      weights: [300, 400, 500, 600],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Cormorant Garamond",
      cssVariable: "--font-serif",
      fallbacks: ["Georgia", "serif"],
      weights: [400, 500, 600],
      styles: ["normal", "italic"],
    },
  ],
});