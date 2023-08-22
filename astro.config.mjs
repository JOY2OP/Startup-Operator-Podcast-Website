import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), svelte()],
  
});