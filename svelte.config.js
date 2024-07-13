import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-static';

const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
        paths: {
            base: '/wordle/'
        },
        files: {
            lib: './src/lib/'
        }
    }
};

export default config;
