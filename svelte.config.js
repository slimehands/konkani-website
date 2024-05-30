import { mdsvex } from "mdsvex";
import {preprocessMeltUI, sequence} from "@melt-ui/pp";
import adapter from '@sveltejs/adapter-static';
import {vitePreprocess} from '@sveltejs/vite-plugin-svelte';
/** @type {import('@sveltejs/kit').Config}*/
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [sequence([vitePreprocess(), preprocessMeltUI()]), mdsvex()],

  kit: {
    adapter: adapter()
  },

  extensions: [".svelte", ".svx"],
};
export default config;