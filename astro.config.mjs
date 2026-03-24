// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.crafterstation.com',
	output: 'server',
	adapter: vercel(),
	i18n: {
		locales: ['en', 'es', 'pt', 'zh'],
		defaultLocale: 'en',
		routing: {
			prefixDefaultLocale: false,
		},
		fallback: {
			zh: 'en',
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
