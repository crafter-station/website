// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss(), react()],
		ssr: {
			noExternal: ['react-tweet']
		}
	},
	integrations: [react(), mdx()]
});
