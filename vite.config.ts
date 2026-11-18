import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// Sibling pages (Shop / PDP / Collections / Lookbook / About / Help /
			// Account / Wishlist / Search / legal) are built by other agents and
			// don't exist yet — their links 404 during prerender. Ignore 404s
			// only; anything else still fails the build.
			prerender: {
				handleHttpError: ({ status, path, message }) => {
					if (status === 404) {
						console.warn(`[prerender] ignoring 404 for ${path} (page not built yet)`);
						return;
					}
					throw new Error(message);
				}
			},
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: true,
				strict: true
			})
		})
	]
});
