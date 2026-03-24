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
	adapter: vercel({
		includeFiles: ['node_modules/@takumi-rs/wasm/pkg/takumi_wasm_bg.wasm']
	}),
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
			noExternal: ['react-tweet', '@takumi-rs/image-response', '@takumi-rs/wasm', '@takumi-rs/helpers'],
			external: ['@takumi-rs/core']
		}
	},
	integrations: [react(), mdx()]
});
