// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel(),
	i18n: {
		locales: ['en', 'es', 'pt-br'],
		defaultLocale: 'en',
		routing: {
			prefixDefaultLocale: false,
		},
		fallback: {
			'pt-br': 'es',
			es: 'en',
		},
	},
	vite: {
		plugins: [tailwindcss(), react()],
		ssr: {
			noExternal: ['react-tweet']
		}
	},
	integrations: [react(), mdx()]
});
