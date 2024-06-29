import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-static';

const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        paths: {
            base: '/wordle'
        }
    }
};

export default config;
